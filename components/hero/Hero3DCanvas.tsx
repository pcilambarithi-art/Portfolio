"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold our tech objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner Icosahedron wireframe (neural core)
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      roughness: 0.3,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Outer dodecahedron ring
    const outerGeo = new THREE.DodecahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 3. Floating particle constellation around the core
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x8b5cf6);
    const c2 = new THREE.Color(0xc4b5fd);
    const c3 = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.2 + 1.2;

      const sinPhi = Math.sin(phi);
      positions[i * 3] = r * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particleSystem);

    // 4. Floating geometric nodes (tech shards)
    const shardGroup = new THREE.Group();
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.9,
    });

    const shardGeo = new THREE.TetrahedronGeometry(0.18, 0);
    const shards: THREE.Mesh[] = [];

    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 12) * Math.PI * 2;
      const dist = 2.6 + (i % 3) * 0.4;
      mesh.position.set(
        Math.cos(angle) * dist,
        Math.sin(angle) * dist * 0.7,
        (Math.random() - 0.5) * 1.5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      shardGroup.add(mesh);
      shards.push(mesh);
    }
    mainGroup.add(shardGroup);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 3, 20);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 20);
    cyanLight.position.set(-3, -2, 2);
    scene.add(cyanLight);

    // Mouse interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.5;
      targetRotationX = -y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        innerMesh.rotation.y = elapsedTime * 0.12;
        innerMesh.rotation.x = elapsedTime * 0.08;

        outerMesh.rotation.y = -elapsedTime * 0.09;
        outerMesh.rotation.z = elapsedTime * 0.05;

        particleSystem.rotation.y = elapsedTime * 0.04;
        particleSystem.rotation.x = -elapsedTime * 0.02;

        shardGroup.rotation.z = elapsedTime * 0.06;
        shards.forEach((s, idx) => {
          s.rotation.x += 0.01;
          s.rotation.y += 0.015;
          s.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.0015;
        });

        // Mouse smooth easing
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      shardGeo.dispose();
      shardMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center pointer-events-none select-none"
    >
      {/* Ambient glowing radial backdrop behind the 3D canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18)_0%,rgba(16,16,25,0)_70%)] blur-2xl -z-10" />
    </div>
  );
}
