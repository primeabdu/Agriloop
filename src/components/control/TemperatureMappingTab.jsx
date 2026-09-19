import React from "react";
import { motion } from "framer-motion";
import { Thermometer, ArrowUp, ArrowDown, Info } from "lucide-react";
import SensorChart from "./SensorChart";

export default function TemperatureMappingTab({ sensor }) {
  const { current, history } = sensor;
  const chartData = history.map((h, i) => ({
    label: `${i + 1}`,
    T1: h.t1,
    T2: h.t2,
    T3: h.t3,
  }));

  const points = [
    { key: "t3", label: "T3 · Gas Out", sub: "Top of reactor", icon: ArrowUp, color: "from-cyanaccent to-forest" },
    { key: "t2", label: "T2 · Reactor Core", sub: "Mid biomass bed", icon: Thermometer, color: "from-forest to-emerald2" },
    { key: "t1", label: "T1 · Heat Source", sub: "Bottom / heat input", icon: ArrowDown, color: "from-energy to-emerald2" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Reactor diagram */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-6 shadow-sm">
          <h4 className="font-heading font-semibold text-forest mb-4">Multi-point Reactor Profile</h4>
          <div className="flex flex-col items-center">
            {/* Gas out */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono text-cyanaccent">GAS OUT ↑</span>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-1 flex h-12 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-cyanaccent/40 to-forest/30 border border-cyanaccent/40 text-forest font-heading font-bold"
              >
                T3 · {current.t3}°C
              </motion.div>
            </div>
            {/* Reactor body */}
            <div className="my-2 w-56 rounded-3xl bg-gradient-to-b from-forest/80 to-emerald2/80 p-4 text-center shadow-lg">
              <p className="text-xs font-mono uppercase tracking-widest text-mint">Reactor</p>
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mt-2 flex h-24 items-center justify-center rounded-2xl bg-charcoal/30 backdrop-blur text-cream font-heading font-bold text-xl"
              >
                T2 · {current.t2}°C
              </motion.div>
              <p className="mt-2 text-[11px] text-mint/70">Biomass bed · core temperature</p>
            </div>
            {/* Heat source */}
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-12 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-energy/60 to-emerald2/40 border border-energy/40 text-charcoal font-heading font-bold"
            >
              T1 · {current.t1}°C
            </motion.div>
            <span className="mt-1 text-xs font-mono text-energy">Heat Source ↓</span>
          </div>
        </div>

        {/* Profile chart + explanation */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
            <h4 className="font-heading font-semibold text-forest mb-3">Temperature Profile Over Time</h4>
            <SensorChart
              data={chartData}
              fields={[
                { key: "T1", label: "T1 Heat", color: "#F4B942" },
                { key: "T2", label: "T2 Core", color: "#2E8B57" },
                { key: "T3", label: "T3 Gas", color: "#4FD1C5" },
              ]}
              yLabel="°C"
              height={240}
            />
          </div>
          <div className="rounded-3xl bg-mint/20 border border-emerald2/20 p-5">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-emerald2 mt-0.5" />
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Instead of a single "the temperature is 500°C" reading, AgriLoop maps a full
                <span className="font-semibold text-forest"> temperature profile</span> across the reactor —
                studying the gradient from heat source to gas out. This makes the process
                scientifically stronger and reveals heat transfer behaviour a single sensor cannot.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Point cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white border border-forest/10 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-cream`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-charcoal/55">{p.sub}</p>
                  <p className="font-heading font-semibold text-forest text-sm">{p.label}</p>
                </div>
              </div>
              <p className="mt-3 font-heading font-bold text-3xl text-forest">{current[p.key]}<span className="text-base font-normal text-charcoal/40">°C</span></p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}