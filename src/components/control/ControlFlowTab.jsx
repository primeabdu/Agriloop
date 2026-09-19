import React from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  ShieldCheck,
  Cpu,
  Brain,
  SlidersHorizontal,
  Flame,
  RefreshCw,
} from "lucide-react";

const STEPS = [
  { icon: Gauge, label: "Sensors", desc: "Temperature, moisture, pressure, gas-flow, oxygen & load readings." },
  { icon: ShieldCheck, label: "Signal Validation", desc: "Range checks and noise filtering before any decision." },
  { icon: Cpu, label: "ESP32 / Controller", desc: "Process Control Unit — not a simple ON/OFF switch." },
  { icon: Brain, label: "Process Analysis", desc: "Live interpretation of the current reactor state." },
  { icon: SlidersHorizontal, label: "Adaptive Control", desc: "Adjusts operating conditions to the feedstock and data." },
  { icon: Flame, label: "Reactor", desc: "Thermal conversion runs under the computed setpoints." },
];

export default function ControlFlowTab() {
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
        {/* Flow column */}
        <div className="relative">
          <div className="space-y-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-4 rounded-2xl bg-white/70 backdrop-blur border border-forest/10 p-4 shadow-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-emerald2 text-cream shadow-md">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald2">0{i + 1}</span>
                      <h4 className="font-heading font-semibold text-forest">{s.label}</h4>
                    </div>
                    <p className="mt-0.5 text-sm text-charcoal/65 leading-snug">{s.desc}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="absolute -bottom-2.5 left-6 text-emerald2/50">↓</span>
                  )}
                </motion.div>
              );
            })}

            {/* New sensor data node */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: STEPS.length * 0.08 }}
              className="relative flex items-center gap-4 rounded-2xl bg-gradient-to-br from-mint/40 to-cyanaccent/20 border border-emerald2/30 p-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyanaccent text-charcoal shadow-md">
                <RefreshCw className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-heading font-semibold text-forest">New Sensor Data</h4>
                <p className="mt-0.5 text-sm text-charcoal/65 leading-snug">Fresh readings loop back to the start — a continuous adaptive cycle.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Loop diagram */}
        <div className="hidden lg:block w-72 sticky top-28">
          <div className="relative rounded-3xl bg-gradient-to-br from-forest to-emerald2 p-6 text-cream overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyanaccent/20 blur-2xl" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-mint">The Control Loop</p>
            <h3 className="mt-2 font-heading font-bold text-xl leading-snug">A continuous, sensor-driven feedback cycle</h3>
            <p className="mt-3 text-sm text-cream/75 leading-relaxed">
              AgriLoop does not run a fixed recipe. Every reactor action is shaped by fresh sensor
              data, validated, analysed, and fed straight back in.
            </p>
            <div className="mt-5 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-mint/50"
              >
                <RefreshCw className="h-8 w-8 text-mint" />
              </motion.div>
            </div>
            <p className="mt-4 text-center text-xs font-mono text-mint">Sensors → Control → Reactor → ↺</p>
          </div>
        </div>
      </div>
    </div>
  );
}