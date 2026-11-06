"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if device supports touch or reduced motion
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    const particles: Particle[] = [];
    let isHoveringInteractive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.08), transparent 70%)`;
      }

      // Add a particle trail on movement (rate limited)
      if (Math.random() < 0.4 && particles.length < 35) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2.5 + 1,
          alpha: 0.6,
          color: Math.random() > 0.5 ? "139, 92, 246" : "196, 181, 253",
        });
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, input, textarea, [role='button'], .interactive");
        isHoveringInteractive = !!interactive;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      // Smooth ring lerp
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${
          isHoveringInteractive ? 1.6 : 1
        })`;
        cursorRingRef.current.style.borderColor = isHoveringInteractive
          ? "rgba(196, 181, 253, 0.7)"
          : "rgba(139, 92, 246, 0.35)";
      }

      // Render particle trail
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dynamic violet cursor spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      />

      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-10"
      />

      {/* Cursor center dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_10px_#8B5CF6] z-50"
      />

      {/* Cursor smooth trailing ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 -ml-5 -mt-5 h-10 w-10 rounded-full border border-violet-500/40 transition-colors duration-200 z-40"
      />
    </div>
  );
}
