import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Wind, Filter, Zap, RotateCw, SlidersHorizontal } from "lucide-react";
import { Input as UiInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SensorChart from "./SensorChart";
import { estimateEnergyFromGas } from "@/lib/pyrolysisEstimate";

const FLOW = [
  { icon: Wind, label: "Pyrolysis Gas", color: "from-cyanaccent/40 to-forest/30" },
  { icon: Filter, label: "Gas Conditioning", color: "from-mint to-cyanaccent/40" },
  { icon: Flame, label: "Controlled Combustion", color: "from-energy to-emerald2/40" },
  { icon: Zap, label: "Heat", color: "from-energy/60 to-energy" },
  { icon: RotateCw, label: "Reactor", color: "from-forest to-emerald2" },
];

export default function EnergyRecoveryTab({ sensor }) {
  const { current, setCurrent } = sensor;
  const [gas, setGas] = useState({ gas_flow: current.gas_flow, ch4: 45, co: 25, h2: 15, minutes: 30 });

  const update = (k, v) => setGas((p) => ({ ...p, [k]: Number(v) }));
  const recovered = estimateEnergyFromGas(gas);

  const heatSeries = React.useMemo(() => {
    const arr = [];
    const perMin = recovered / Math.max(gas.minutes, 1);
    for (let i = 0; i <= gas.minutes; i += 3) {
      arr.push({ label: `${i}m`, Heat: Math.round(perMin * i) });
    }
    return arr;
  }, [recovered, gas.minutes]);

  return (
    <div className="space-y-6">
      {/* Flow diagram */}
      <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-6 shadow-sm">
        <h4 className="font-heading font-semibold text-forest mb-5 text-center">Energy Recovery Loop</h4>
        <div className="flex flex-wrap items-center justify-center gap-y-4">
          {FLOW.map((s, i) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={s.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} border border-white/40 shadow-md text-forest`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-2 text-[11px] font-semibold text-forest text-center max-w-[6rem]">{s.label}</span>
                </motion.div>
                {i < FLOW.length - 1 && (
                  <>
                    <span className="text-emerald2 text-xl mx-1 hidden sm:inline">→</span>
                    <span className="text-emerald2 text-xl sm:hidden">↓</span>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs text-charcoal/60 max-w-2xl mx-auto">
          Instead of venting pyrolysis gases, AgriLoop conditions and combusts them in a controlled
          way to recover heat — which feeds back into the reactor, reducing external energy demand.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Inputs */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-emerald2" />
            <h4 className="font-heading font-semibold text-forest">Gas Composition & Run</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "gas_flow", l: "Gas Flow (L/min)" },
              { k: "ch4", l: "CH₄ (%)" },
              { k: "co", l: "CO (%)" },
              { k: "h2", l: "H₂ (%)" },
              { k: "minutes", l: "Run Time (min)" },
            ].map((f) => (
              <div key={f.k}>
                <Label className="text-xs text-charcoal/60">{f.l}</Label>
                <UiInput
                  type="number"
                  value={gas[f.k]}
                  onChange={(e) => update(f.k, e.target.value)}
                  className="mt-1 bg-white border-forest/15"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-energy/20 to-emerald2/20 border border-energy/30 p-4">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald2">Estimated Heat Recovered</p>
            <p className="mt-1 font-heading font-bold text-4xl text-forest">
              {recovered.toLocaleString()}<span className="text-lg font-normal text-charcoal/40 ml-1">kJ</span>
            </p>
            <p className="mt-1 text-xs text-charcoal/55">Illustrative estimate from gas composition & flow.</p>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-6 shadow-sm">
          <h4 className="font-heading font-semibold text-forest mb-3">Recovered Heat Over Time</h4>
          <SensorChart
            data={heatSeries}
            fields={[{ key: "Heat", label: "Heat kJ", color: "#F4B942" }]}
            height={260}
          />
          <p className="mt-3 text-xs text-charcoal/55">
            This recovered energy value feeds back into the AgriLoop Efficiency Score on the AI Optimizer tab.
          </p>
        </div>
      </div>
    </div>
  );
}