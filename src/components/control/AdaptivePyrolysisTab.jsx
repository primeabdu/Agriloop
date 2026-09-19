import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Leaf, Zap, AlertTriangle, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { estimateProcess, ESTIMATE_DISCLAIMER } from "@/lib/pyrolysisEstimate";
import SensorInputForm from "./SensorInputForm";

export default function AdaptivePyrolysisTab({ sensor }) {
  const { current, setCurrent, mode, streaming, toggleStream, logReading } = sensor;
  const est = estimateProcess(current);
  const [narrative, setNarrative] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    setLoading(true);
    try {
      const prompt = `You are the AgriLoop process analyst. Given the current sensor/input data below, explain in clear, creative, simple language how the adaptive pyrolysis system would respond, and give a practical operating recommendation. Do NOT claim the system is optimized or trained — frame it as an illustrative estimate.

Feedstock: ${current.waste_type}
Moisture: ${current.moisture}%
Reactor core temp (T2): ${current.t2}°C
Heat source (T1): ${current.t1}°C
Gas out (T3): ${current.t3}°C
Pressure: ${current.pressure} kPa
Gas flow: ${current.gas_flow} L/min
Oxygen: ${current.oxygen}%
Feed load: ${current.load} g

Estimated outputs (rule-based, illustrative):
- Operation time: ~${est.operationTime} min
- Biochar yield: ~${est.biocharYieldPct}% of dry mass (~${est.biocharMass} g)
- Energy recovered: ~${est.energyRecovered} kJ

Return JSON with "narrative" (a short markdown explanation, 3-5 sentences) and "recommendation" (one actionable sentence).`;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            narrative: { type: "string" },
            recommendation: { type: "string" },
          },
        },
      });
      setNarrative(res);
    } catch (e) {
      setNarrative({ narrative: "Could not reach the analysis service right now. The rule-based estimates below are still valid.", recommendation: "Retry the AI analysis in a moment." });
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Clock, label: "Est. Operation Time", value: est.operationTime, unit: "min", color: "from-forest to-emerald2" },
    { icon: Leaf, label: "Biochar Yield", value: est.biocharYieldPct, unit: "% dry", color: "from-emerald2 to-mint" },
    { icon: Leaf, label: "Biochar Mass", value: est.biocharMass, unit: "g", color: "from-mint to-cyanaccent" },
    { icon: Zap, label: "Energy Recovered", value: est.energyRecovered, unit: "kJ", color: "from-energy to-emerald2" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <SensorInputForm
          current={current}
          setCurrent={setCurrent}
          onLog={logReading}
          mode={mode}
          streaming={streaming}
          onToggleStream={toggleStream}
        />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white border border-forest/10 p-4 shadow-sm"
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-cream`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-xs text-charcoal/55">{s.label}</p>
                  <p className="font-heading font-bold text-2xl text-forest">{s.value}<span className="ml-1 text-xs font-mono font-normal text-charcoal/40">{s.unit}</span></p>
                </motion.div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-forest to-emerald2 p-5 text-cream shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-mint" />
              <h4 className="font-heading font-semibold">AI Process Analysis</h4>
            </div>
            <p className="mt-2 text-xs text-cream/70">Get a reasoned, plain-language interpretation of the current run.</p>
            <Button
              onClick={runAI}
              disabled={loading}
              className="mt-3 rounded-full bg-cream text-forest hover:bg-mint/80"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Analyzing…" : "Run AI Analysis"}
            </Button>

            {narrative && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl bg-charcoal/30 backdrop-blur p-4 text-sm text-cream/90 leading-relaxed"
              >
                <p>{narrative.narrative}</p>
                {narrative.recommendation && (
                  <p className="mt-2 text-mint font-medium">→ {narrative.recommendation}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-2xl bg-energy/10 border border-energy/30 p-4">
        <AlertTriangle className="h-4 w-4 text-energy shrink-0 mt-0.5" />
        <p className="text-xs text-charcoal/70 leading-relaxed">{ESTIMATE_DISCLAIMER}</p>
      </div>
    </div>
  );
}