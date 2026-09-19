import React from "react";
import { motion } from "framer-motion";
import { Gauge, Cpu, SlidersHorizontal, Database, Brain, TrendingUp, Target, AlertTriangle } from "lucide-react";
import { estimateProcess, computeEfficiencyScore } from "@/lib/pyrolysisEstimate";

const STAGE1 = [
  { icon: Gauge, label: "Sensors", desc: "Collect real-time readings." },
  { icon: SlidersHorizontal, label: "Rules", desc: "Transparent control rules." },
  { icon: Cpu, label: "Controller", desc: "ESP32 acts on the rules." },
];
const STAGE2 = [
  { icon: Database, label: "Historical Data", desc: "Log every run." },
  { icon: Brain, label: "Machine Learning", desc: "Train on real trials." },
  { icon: TrendingUp, label: "Prediction", desc: "Forecast yield & energy." },
  { icon: Target, label: "Optimization", desc: "Tune for best outcomes." },
];

function ScoreRing({ score }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative h-36 w-36">
      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#12372A15" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#2E8B57"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading font-bold text-4xl text-forest">{score}</span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/50">/ 100</span>
      </div>
    </div>
  );
}

export default function AIOptimizerTab({ sensor }) {
  const { current } = sensor;
  const est = estimateProcess(current);
  const { score, factors } = computeEfficiencyScore(current, est);

  return (
    <div className="space-y-6">
      {/* Roadmap */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-6 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald2">Stage 1 · Now</span>
          <h4 className="mt-1 font-heading font-semibold text-forest">Traditional Control</h4>
          <div className="mt-4 flex items-center gap-2">
            {STAGE1.map((s, i) => {
              const Icon = s.icon;
              return (
                <React.Fragment key={s.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 text-center"
                  >
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-emerald2 text-cream shadow-md">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2 text-xs font-semibold text-forest">{s.label}</p>
                    <p className="text-[11px] text-charcoal/55">{s.desc}</p>
                  </motion.div>
                  {i < STAGE1.length - 1 && <span className="text-emerald2">→</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-forest to-emerald2 p-6 text-cream shadow-lg">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-mint">Stage 2 · Future</span>
          <h4 className="mt-1 font-heading font-semibold">AI Pyrolysis Optimizer</h4>
          <div className="mt-4 flex items-center gap-2">
            {STAGE2.map((s, i) => {
              const Icon = s.icon;
              return (
                <React.Fragment key={s.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 text-center"
                  >
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cream/15 backdrop-blur text-mint border border-mint/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2 text-xs font-semibold text-cream">{s.label}</p>
                    <p className="text-[11px] text-cream/60">{s.desc}</p>
                  </motion.div>
                  {i < STAGE2.length - 1 && <span className="text-mint">→</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Efficiency score */}
      <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <ScoreRing score={score} />
          <p className="mt-2 font-heading font-semibold text-forest">AgriLoop Efficiency Score</p>
          <p className="text-xs text-charcoal/55">Live estimate from current data</p>
        </div>
        <div className="space-y-3 w-full">
          {factors.map((f) => (
            <div key={f.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal/70">{f.key}</span>
                <span className="font-mono font-semibold text-forest">{f.value}</span>
              </div>
              <div className="mt-1 h-2.5 rounded-full bg-forest/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: f.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${f.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-start gap-2 pt-2">
            <AlertTriangle className="h-4 w-4 text-energy shrink-0 mt-0.5" />
            <p className="text-xs text-charcoal/65 leading-relaxed">
              Equal weights are used as a placeholder. Final factor weights must be determined from
              real experiments before any reported score is considered final.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}