"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// A print run in reverse: the photo appears as an ink halftone on paper
// and dissolves into full colour as uMix goes 0 -> 1.
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uMix;
uniform float uCell;
uniform vec2 uUVScale;
uniform vec2 uUVOffset;

void main() {
  vec2 uv = vUv * uUVScale + uUVOffset;
  vec3 tex = texture2D(uTex, uv).rgb;
  float lum = dot(tex, vec3(0.299, 0.587, 0.114));

  // rotated print grid in screen space
  float c = cos(0.28);
  float s = sin(0.28);
  vec2 p = mat2(c, -s, s, c) * gl_FragCoord.xy;
  vec2 cell = mod(p, uCell) - 0.5 * uCell;
  float radius = 0.68 * uCell * (1.0 - lum);
  float dotMask = 1.0 - smoothstep(radius - 0.9, radius + 0.9, length(cell));

  vec3 paper = vec3(0.984, 0.980, 0.973);
  vec3 ink = vec3(0.095, 0.082, 0.059);
  vec3 halftone = mix(paper, ink, dotMask);

  gl_FragColor = vec4(mix(halftone, tex, uMix), 1.0);
}
`;

/**
 * Halftone hover: hovering a journal print shows it as newsprint
 * (ink dots on paper) that dissolves into the full-colour photo.
 * One shared WebGL canvas is re-parented onto whichever frame is
 * hovered; three.js loads lazily on first hover. Skipped for touch
 * devices and reduced-motion users.
 */
export default function HalftoneHover() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const container = document.querySelector<HTMLElement>(".journal");
    if (!container) return;

    let disposed = false;
    let building = false;

    type State = {
      THREE: typeof import("three");
      renderer: import("three").WebGLRenderer;
      scene: import("three").Scene;
      camera: import("three").OrthographicCamera;
      uniforms: {
        uTex: { value: import("three").Texture | null };
        uMix: { value: number };
        uCell: { value: number };
        uUVScale: { value: import("three").Vector2 };
        uUVOffset: { value: import("three").Vector2 };
      };
      material: import("three").ShaderMaterial;
      geometry: import("three").PlaneGeometry;
      loader: import("three").TextureLoader;
      cache: Map<string, import("three").Texture>;
    };
    let state: State | null = null;
    let current: HTMLElement | null = null; // the hovered .j-open
    let tween: gsap.core.Tween | null = null;

    const ensure = async () => {
      if (state || building || disposed) return;
      building = true;
      const THREE = await import("three");
      if (disposed) {
        building = false;
        return;
      }
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      } catch {
        building = false;
        return;
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.domElement.className = "ht-canvas";

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uTex: { value: null as import("three").Texture | null },
        uMix: { value: 0 },
        uCell: { value: 7 * dpr },
        uUVScale: { value: new THREE.Vector2(1, 1) },
        uUVOffset: { value: new THREE.Vector2(0, 0) },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      state = {
        THREE,
        renderer,
        scene,
        camera,
        uniforms,
        material,
        geometry,
        loader: new THREE.TextureLoader(),
        cache: new Map(),
      };
      building = false;
    };

    const render = () => {
      if (state) state.renderer.render(state.scene, state.camera);
    };

    const show = (btn: HTMLElement) => {
      if (!state) return;
      const frame = btn.querySelector<HTMLElement>(".j-frame");
      const img = frame?.querySelector("img");
      if (!frame || !img) return;
      const src = img.currentSrc || img.src;

      const start = (tex: import("three").Texture) => {
        if (disposed || current !== btn || !state) return;
        const w = frame.clientWidth;
        const h = frame.clientHeight;
        state.renderer.setSize(w, h, false);
        // cover-fit the texture into the frame
        const texImg = tex.image as { width: number; height: number };
        const texAspect = texImg.width / texImg.height;
        const frameAspect = w / h;
        if (texAspect > frameAspect) {
          const sx = frameAspect / texAspect;
          state.uniforms.uUVScale.value.set(sx, 1);
          state.uniforms.uUVOffset.value.set((1 - sx) / 2, 0);
        } else {
          const sy = texAspect / frameAspect;
          state.uniforms.uUVScale.value.set(1, sy);
          state.uniforms.uUVOffset.value.set(0, (1 - sy) / 2);
        }
        state.uniforms.uTex.value = tex;
        state.uniforms.uMix.value = 0;
        frame.appendChild(state.renderer.domElement);
        tween?.kill();
        // ink dots dissolve into the full-colour photo
        tween = gsap.to(state.uniforms.uMix, {
          value: 1,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: render,
        });
        render();
      };

      const cached = state.cache.get(src);
      if (cached) {
        start(cached);
      } else {
        state.loader.load(src, (tex) => {
          if (!state || disposed) return;
          tex.colorSpace = state.THREE.SRGBColorSpace;
          state.cache.set(src, tex);
          start(tex);
        });
      }
    };

    const hide = () => {
      if (!state) return;
      const canvas = state.renderer.domElement;
      tween?.kill();
      tween = gsap.to(state.uniforms.uMix, {
        value: 0,
        duration: 0.3,
        ease: "power1.in",
        onUpdate: render,
        onComplete: () => canvas.remove(),
      });
    };

    const onOver = async (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".j-open");
      if (!btn || btn === current) return;
      current = btn;
      await ensure();
      if (current === btn) show(btn);
    };
    const onOut = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".j-open");
      if (!btn || btn !== current) return;
      const to = e.relatedTarget as Node | null;
      if (to && btn.contains(to)) return;
      current = null;
      hide();
    };

    container.addEventListener("pointerover", onOver);
    container.addEventListener("pointerout", onOut);

    return () => {
      disposed = true;
      container.removeEventListener("pointerover", onOver);
      container.removeEventListener("pointerout", onOut);
      tween?.kill();
      if (state) {
        state.cache.forEach((t) => t.dispose());
        state.geometry.dispose();
        state.material.dispose();
        state.renderer.dispose();
        state.renderer.domElement.remove();
        state = null;
      }
    };
  }, []);

  return null;
}
