import React from "react";
import { motion } from "framer-motion";

const steps = [
  { icon: "🌾", label: "Agricultural Waste", color: "from-energy/30 to-beige" },
  { icon: "🔥", label: "AgriLoop Furnace", color: "from-energy/40 to-forest" },
  { icon: "🌱", label: "Biochar", color: "from-mint to-emerald2/40" },
  { icon: "⚡", label: "Energy Recovery", color: "from-cyanaccent/40 to-emerald2/40" },
  { icon: "📊", label: "Process Data", color: "from-cyanaccent/30 to-forest/40" },
];

export default function ProcessFlow({ compact = false }) {
  return (
    <div className={`flex ${compact ? "flex-row flex-wrap justify-center gap-3" : "flex-col md:flex-row"} items-center justify-center gap-y-4`}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            <div className={`flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg border border-white/40 backdrop-blur-sm text-3xl md:text-4xl`}>
              {s.icon}
            </div>
            <span className="mt-2.5 text-xs md:text-sm font-semibold text-forest text-center max-w-[7rem]">
              {s.label}
            </span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
              className={`${compact ? "hidden" : "block"} mx-1 md:mx-2`}
            >
              <span className="text-emerald2 text-2xl md:text-3xl font-light md:hidden">↓</span>
              <span className="text-emerald2 text-2xl md:text-3xl font-light hidden md:inline">→</span>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}