"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export default function Tilt3D({ children, className = "", intensity = 12, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const glareX = useSpring(50, { stiffness: 300, damping: 30 });
  const glareY = useSpring(50, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * intensity * 2);
    rotateX.set((0.5 - y) * intensity * 2);
    glareX.set(x * 100);
    glareY.set(y * 100);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(1.03);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Glare overlay */}
      {glare && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
