"use client";

import { useEffect, useRef } from "react";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Ink diffusing in water: domain-warped fbm noise, masked into two soft
// blooms (top-right in the accent blue, a fainter echo lower-left), both
// breathing slowly and leaning toward the cursor.
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(19.7, 7.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);

  // slow domain warp: the ink keeps re-settling
  vec2 q = vec2(
    fbm(p * 1.6 + uTime * 0.030),
    fbm(p * 1.6 - uTime * 0.022)
  );
  float n = fbm(p * 2.1 + q * 1.25 + vec2(0.0, uTime * 0.012));

  // main bloom: top-right, pulled gently by the cursor
  vec2 c1 = vec2(uAspect * 0.82, 0.86) + uMouse * 0.10;
  float m1 = smoothstep(1.05, 0.05, distance(p, c1));
  float ink1 = smoothstep(0.32, 0.85, n) * m1;

  // faint echo: lower-left, drifting opposite the cursor
  vec2 c2 = vec2(uAspect * 0.08, 0.12) - uMouse * 0.06;
  float m2 = smoothstep(0.75, 0.05, distance(p, c2));
  float ink2 = smoothstep(0.4, 0.9, fbm(p * 1.8 - q + uTime * 0.01)) * m2;

  vec3 blue = vec3(0.141, 0.220, 0.800);   // editor's blue
  vec3 lite = vec3(0.580, 0.635, 1.000);   // its wash
  vec3 col = mix(lite, blue, clamp(ink1 + ink2 * 0.5, 0.0, 1.0));

  float a = clamp(ink1 * 0.30 + ink2 * 0.14, 0.0, 0.34);
  gl_FragColor = vec4(col, a);
}
`;

/**
 * Ink-flow wash: a quiet WebGL layer behind the hero. Loads three.js
 * lazily, pauses off-screen, skips entirely for reduced-motion users,
 * and disposes cleanly on unmount.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = ref.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
      } catch {
        return; // no WebGL, the paper stays plain
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        target.y = (0.5 - (e.clientY - r.top) / r.height) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h, false);
        uniforms.uAspect.value = w / h;
      };
      resize();
      window.addEventListener("resize", resize);

      const timer = new THREE.Timer();
      let running = false;

      const loop = () => {
        if (!running || disposed) return;
        timer.update();
        uniforms.uTime.value = timer.getElapsed();
        // the wash leans toward the cursor, unhurried
        const m = uniforms.uMouse.value;
        m.x += (target.x - m.x) * 0.02;
        m.y += (target.y - m.y) * 0.02;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };

      // Only spend frames while the hero is on screen.
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          loop();
        } else if (!entry.isIntersecting) {
          running = false;
        }
      });
      io.observe(host);

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={ref} className="hero-canvas" aria-hidden="true" />;
}
