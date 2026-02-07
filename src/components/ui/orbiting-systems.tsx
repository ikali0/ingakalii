 "use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { Shield, Brain, Scale, Code, Database } from "lucide-react";

/* ------------------ Types ------------------ */

type GlowColor = "cyan" | "purple" | "green";

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  icon: React.ElementType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

/* ------------------ Config ------------------ */

const skillsConfig: SkillConfig[] = [
  // Inner orbit
  {
    id: "governance",
    orbitRadius: 110,
    size: 46,
    speed: 0.8,
    icon: Scale,
    phaseShift: 0,
    glowColor: "green",
    label: "AI Governance",
  },
  {
    id: "security",
    orbitRadius: 110,
    size: 46,
    speed: 0.8,
    icon: Shield,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "green",
    label: "Adversarial Security",
  },
  {
    id: "llm",
    orbitRadius: 110,
    size: 46,
    speed: 0.8,
    icon: Brain,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "green",
    label: "LLM Systems",
  },

  // Outer orbit
  {
    id: "engineering",
    orbitRadius: 190,
    size: 52,
    speed: -0.5,
    icon: Code,
    phaseShift: 0,
    glowColor: "cyan",
    label: "Systems Engineering",
  },
  {
    id: "mlops",
    orbitRadius: 190,
    size: 48,
    speed: -0.5,
    icon: Database,
    phaseShift: Math.PI,
    glowColor: "purple",
    label: "ML Infrastructure",
  },
];

/* ------------------ Glow Colors ------------------ */

const glowColors = {
  cyan: "#06B6D4",
  purple: "#9333EA",
  green: "#10B981",
};

/* ------------------ Orbit Path ------------------ */

const OrbitPath = memo(
  ({ radius, color }: { radius: number; color: string }) => (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        border: `1px solid ${color}40`,
        boxShadow: `inset 0 0 30px ${color}20`,
      }}
    />
  )
);

OrbitPath.displayName = "OrbitPath";

/* ------------------ Orbiting Skill ------------------ */

const OrbitingSkill = memo(
  ({
    config,
    angle,
  }: {
    config: SkillConfig;
    angle: number;
  }) => {
    const [hovered, setHovered] = useState(false);
    const { orbitRadius, size, icon: Icon, glowColor, label } = config;

    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;

    const color = glowColors[glowColor];

    return (
      <div
        className="absolute top-1/2 left-1/2 transition-transform duration-300"
        style={{
          width: size,
          height: size,
          transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
          zIndex: hovered ? 20 : 10,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative w-full h-full flex items-center justify-center rounded-full bg-gray-900/90 backdrop-blur-sm transition-all duration-300"
          style={{
            boxShadow: hovered
              ? `0 0 30px ${color}60`
              : `0 0 15px ${color}30`,
          }}
        >
          <Icon
            size={size * 0.5}
            className="text-white"
            strokeWidth={1.5}
          />

          {hovered && (
            <div className="absolute -bottom-8 whitespace-nowrap text-xs bg-black/90 px-2 py-1 rounded text-white">
              {label}
            </div>
          )}
        </div>
      </div>
    );
  }
);

OrbitingSkill.displayName = "OrbitingSkill";

/* ------------------ Main Component ------------------ */

export default function OrbitingSystems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const [tick, setTick] = useState(0); // lightweight re-render trigger

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      timeRef.current += deltaTime;

      setTick((prev) => (prev + 1) % 1000); // controlled lightweight updates
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[420px] h-[420px] flex items-center justify-center"
    >
      {/* Central Core */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-2xl z-10">
        <Brain size={32} className="text-cyan-400" />
      </div>

      {/* Orbit paths */}
      <OrbitPath radius={110} color="#10B981" />
      <OrbitPath radius={190} color="#06B6D4" />

      {/* Skills */}
      {skillsConfig.map((config) => {
        const angle =
          timeRef.current * config.speed + config.phaseShift;

        return (
          <OrbitingSkill
            key={config.id}
            config={config}
            angle={angle}
          />
        );
      })}
    </div>
  );
}
