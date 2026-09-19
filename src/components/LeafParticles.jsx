import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function LeafParticles({ count = 14, className = "" }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 12,
        size: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {leaves.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: `${l.left}%`, top: "-40px" }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["-40px", "110vh"],
            x: [0, l.drift, 0],
            rotate: [0, 180, 360],
            opacity: [0, l.opacity, l.opacity, 0],
          }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={l.size} height={l.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Z"
              fill="#2E8B57"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}