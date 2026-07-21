"use client";

import { useEffect, useRef } from "react";

/**
 * Ink dust — a quiet WebGL field behind the hero. Tiny ink and
 * blue-pencil particles drift on the paper and lean toward the cursor.
 * Loads three.js lazily, pauses off-screen, skips entirely for
 * reduced-motion users, and disposes cleanly on unmount.
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
        return; // no WebGL — the paper stays plain
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
      camera.position.z = 16;

      // Soft round sprite for the dots.
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.6, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const sprite = new THREE.CanvasTexture(c);

      const group = new THREE.Group();
      scene.add(group);

      const makeCloud = (
        count: number,
        color: number,
        opacity: number,
        size: number
      ) => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const phase = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 22;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 11;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
          phase[i] = Math.random() * Math.PI * 2;
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
          color,
          map: sprite,
          size,
          transparent: true,
          opacity,
          depthWrite: false,
          sizeAttenuation: true,
        });
        group.add(new THREE.Points(geo, mat));
        return { geo, mat, phase, count };
      };

      const clouds = [
        makeCloud(320, 0x18150f, 0.24, 0.2), // ink
        makeCloud(80, 0x2438cc, 0.5, 0.26), // blue-pencil
      ];

      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const timer = new THREE.Timer();
      let running = false;

      const loop = () => {
        if (!running || disposed) return;
        timer.update();
        const t = timer.getElapsed();
        for (const cl of clouds) {
          const arr = cl.geo.attributes.position.array as Float32Array;
          for (let i = 0; i < cl.count; i++) {
            arr[i * 3] += Math.cos(t * 0.22 + cl.phase[i]) * 0.0012;
            arr[i * 3 + 1] += Math.sin(t * 0.35 + cl.phase[i]) * 0.0016;
          }
          cl.geo.attributes.position.needsUpdate = true;
        }
        group.rotation.z = Math.sin(t * 0.05) * 0.04;
        group.position.x += (target.x * 0.9 - group.position.x) * 0.03;
        group.position.y += (-target.y * 0.6 - group.position.y) * 0.03;
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
        clouds.forEach((cl) => {
          cl.geo.dispose();
          cl.mat.dispose();
        });
        sprite.dispose();
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
