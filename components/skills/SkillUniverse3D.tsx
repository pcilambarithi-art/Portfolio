"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { skillsData, Skill } from "@/data/skills";

export default function SkillUniverse3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // Create glowing background dust particles
    const dustCount = 150;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 12;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.4,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    universeGroup.add(dustPoints);

    // Skill nodes creation
    const sphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const nodeMeshes: THREE.Mesh[] = [];
    const skillMeshMap = new Map<THREE.Mesh, Skill>();

    skillsData.forEach((skill) => {
      const coords = skill.coordinates || [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2,
      ];

      const colorHex = skill.color ? parseInt(skill.color.replace("#", "0x")) : 0x8b5cf6;
      const sphereMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.2,
        metalness: 0.8,
        emissive: colorHex,
        emissiveIntensity: 0.4,
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(coords[0], coords[1], coords[2]);
      universeGroup.add(mesh);
      nodeMeshes.push(mesh);
      skillMeshMap.set(mesh, skill);

      // Create a small 2D text label sprite for the node
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 24px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(skill.name, 128, 40);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.85,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(coords[0], coords[1] + 0.28, coords[2]);
        sprite.scale.set(1.1, 0.28, 1);
        universeGroup.add(sprite);
      }
    });

    // Create faint connective neural links between nodes that share close proximity
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.16,
    });

    for (let i = 0; i < nodeMeshes.length; i++) {
      for (let j = i + 1; j < nodeMeshes.length; j++) {
        const dist = nodeMeshes[i].position.distanceTo(nodeMeshes[j].position);
        if (dist < 2.5) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodeMeshes[i].position,
            nodeMeshes[j].position,
          ]);
          const line = new THREE.Line(lineGeo, lineMat);
          universeGroup.add(line);
        }
      }
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 20);
    pointLight.position.set(2, 4, 5);
    scene.add(pointLight);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationVelocityX = 0.002;
    let rotationVelocityY = 0.003;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        universeGroup.rotation.y += deltaX * 0.006;
        universeGroup.rotation.x += deltaY * 0.006;
        rotationVelocityX = deltaY * 0.001;
        rotationVelocityY = deltaX * 0.001;
        prevMouseX = clientX;
        prevMouseY = clientY;
      }

      // Raycasting for hovering
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const skill = skillMeshMap.get(hitMesh);
        if (skill) {
          setHoveredSkill(skill);
          setTooltipPos({ x: clientX - rect.left, y: clientY - rect.top });
          document.body.style.cursor = "pointer";
          return;
        }
      }

      setHoveredSkill(null);
      document.body.style.cursor = isDragging ? "grabbing" : "default";
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = "default";
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      if (!isDragging) {
        universeGroup.rotation.y += 0.002;
        universeGroup.rotation.x += 0.0008;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      sphereGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] rounded-3xl bg-[#08080D]/90 border border-white/[0.08] overflow-hidden shadow-2xl flex items-center justify-center">
      {/* 3D Canvas mount point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Instructions Banner */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-mono backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
        Interactive 3D Skill Universe &bull; Drag to rotate, hover node to inspect
      </div>

      {/* Node Hover Tooltip */}
      {hoveredSkill && (
        <div
          className="absolute z-30 pointer-events-none p-3.5 rounded-2xl bg-[#101019]/95 backdrop-blur-xl border border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.3)] max-w-xs transition-all duration-150"
          style={{
            left: `${Math.min(tooltipPos.x + 15, 600)}px`,
            top: `${Math.max(tooltipPos.y - 70, 20)}px`,
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: hoveredSkill.color || "#8B5CF6" }}
            />
            <span className="text-sm font-bold text-white">{hoveredSkill.name}</span>
            {hoveredSkill.badge && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-500/20 text-violet-300 font-mono">
                {hoveredSkill.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">{hoveredSkill.description}</p>
        </div>
      )}
    </div>
  );
}
