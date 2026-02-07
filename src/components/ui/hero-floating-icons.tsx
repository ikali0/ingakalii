/**
 * Hero Floating Icons - 3D animated orbiting icons with depth and vibrancy
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBrain,
  faBalanceScale,
  faLightbulb,
  faGraduationCap,
  faComments,
  faCode,
  faRobot,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

interface OrbitingIcon {
  id: string;
  icon: typeof faShieldHalved;
  orbitRadius: number;
  speed: number;
  phaseShift: number;
  size: "sm" | "md" | "lg";
  color: "primary" | "accent" | "neural";
  zOffset: number; // For 3D depth effect
}

const icons: OrbitingIcon[] = [
  // Inner orbit - faster
  { id: "shield", icon: faShieldHalved, orbitRadius: 180, speed: 0.3, phaseShift: 0, size: "lg", color: "primary", zOffset: 0 },
  { id: "brain", icon: faBrain, orbitRadius: 180, speed: 0.3, phaseShift: Math.PI * 0.66, size: "lg", color: "accent", zOffset: 0 },
  { id: "scale", icon: faBalanceScale, orbitRadius: 180, speed: 0.3, phaseShift: Math.PI * 1.33, size: "lg", color: "neural", zOffset: 0 },
  
  // Middle orbit
  { id: "lightbulb", icon: faLightbulb, orbitRadius: 280, speed: -0.2, phaseShift: 0.5, size: "md", color: "accent", zOffset: 20 },
  { id: "code", icon: faCode, orbitRadius: 280, speed: -0.2, phaseShift: Math.PI + 0.5, size: "md", color: "primary", zOffset: 20 },
  
  // Outer orbit - slower
  { id: "grad", icon: faGraduationCap, orbitRadius: 380, speed: 0.12, phaseShift: 0.8, size: "sm", color: "neural", zOffset: 40 },
  { id: "robot", icon: faRobot, orbitRadius: 380, speed: 0.12, phaseShift: Math.PI * 0.8, size: "sm", color: "primary", zOffset: 40 },
  { id: "comments", icon: faComments, orbitRadius: 380, speed: 0.12, phaseShift: Math.PI * 1.6, size: "md", color: "accent", zOffset: 40 },
  { id: "database", icon: faDatabase, orbitRadius: 380, speed: 0.12, phaseShift: Math.PI * 0.4, size: "sm", color: "neural", zOffset: 40 },
];

const sizeMap = {
  sm: { container: "w-10 h-10", icon: "w-4 h-4" },
  md: { container: "w-14 h-14", icon: "w-6 h-6" },
  lg: { container: "w-16 h-16", icon: "w-7 h-7" },
};

const colorMap = {
  primary: "from-primary/20 to-primary/5 text-primary border-primary/30 shadow-primary/20",
  accent: "from-accent/20 to-accent/5 text-accent border-accent/30 shadow-accent/20",
  neural: "from-neural/20 to-neural/5 text-neural border-neural/30 shadow-neural/20",
};

export default function HeroFloatingIcons() {
  const timeRef = useRef(0);
  const [positions, setPositions] = useState<{ x: number; y: number; scale: number; opacity: number }[]>(
    icons.map(() => ({ x: 0, y: 0, scale: 1, opacity: 1 }))
  );

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      timeRef.current += deltaTime;

      const newPositions = icons.map((icon) => {
        const angle = timeRef.current * icon.speed + icon.phaseShift;
        const x = Math.cos(angle) * icon.orbitRadius;
        const y = Math.sin(angle) * icon.orbitRadius * 0.4; // Elliptical orbit for 3D effect
        
        // 3D depth: icons at "back" are smaller and more transparent
        const depthFactor = (Math.sin(angle) + 1) / 2; // 0 to 1
        const scale = 0.6 + depthFactor * 0.5;
        const opacity = 0.4 + depthFactor * 0.6;

        return { x, y: y - icon.zOffset * depthFactor, scale, opacity };
      });

      setPositions(newPositions);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs for vibrancy */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neural/5 rounded-full blur-3xl" />

      {/* Orbit paths */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20">
        <ellipse cx="400" cy="200" rx="180" ry="72" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="400" cy="200" rx="280" ry="112" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="400" cy="200" rx="380" ry="152" fill="none" stroke="hsl(var(--neural))" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Orbiting icons */}
      <div className="absolute top-1/2 left-1/2">
        {icons.map((icon, index) => {
          const pos = positions[index];
          const sizes = sizeMap[icon.size];
          const colors = colorMap[icon.color];

          return (
            <motion.div
              key={icon.id}
              className="absolute"
              style={{
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                opacity: pos.opacity,
                zIndex: Math.round(pos.scale * 10),
              }}
            >
              <div
                className={`${sizes.container} rounded-full bg-gradient-to-br ${colors} border backdrop-blur-md flex items-center justify-center shadow-lg transition-shadow duration-300`}
                style={{
                  transform: "translate(-50%, -50%)",
                }}
              >
                <FontAwesomeIcon icon={icon.icon} className={sizes.icon} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
