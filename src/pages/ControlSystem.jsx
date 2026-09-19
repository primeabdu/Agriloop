import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, Thermometer, Brain, Sparkles, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import LeafParticles from "@/components/LeafParticles";
import { Image } from "@/components/ui/image";
import { useSensorData } from "@/hooks/useSensorData";
import ControlFlowTab from "@/components/control/ControlFlowTab";
import LiveSensorsTab from "@/components/control/LiveSensorsTab";
import TemperatureMappingTab from "@/components/control/TemperatureMappingTab";
import AdaptivePyrolysisTab from "@/components/control/AdaptivePyrolysisTab";
import AIOptimizerTab from "@/components/control/AIOptimizerTab";
import EnergyRecoveryTab from "@/components/control/EnergyRecoveryTab";

const HERO_IMG =
  "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/d013de8fb_generated_image.png";

const TABS = [
  { id: "flow", label: "Control Flow", icon: Cpu },
  { id: "sensors", label: "Live Sensors", icon: Activity },
  { id: "temp", label: "Temperature Mapping", icon: Thermometer },
  { id: "adaptive", label: "Adaptive Pyrolysis", icon: Brain },
  { id: "optimizer", label: "AI Optimizer", icon: Sparkles },
  { id: "energy", label: "Energy Recovery", icon: Zap },
];

export default function ControlSystem() {
  const sensor = useSensorData();
  const [active, setActive] = useState("flow");

  const renderTab = () => {
    switch (active) {
      case "flow":
        return <ControlFlowTab />;
      case "sensors":
        return <LiveSensorsTab sensor={sensor} />;
      case "temp":
        return <TemperatureMappingTab sensor={sensor} />;
      case "adaptive":
        return <AdaptivePyrolysisTab sensor={sensor} />;
      case "optimizer":
        return <AIOptimizerTab sensor={sensor} />;
      case "energy":
        return <EnergyRecoveryTab sensor={sensor} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest via-forest to-emerald2 text-cream">
        <LeafParticles count={12} />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyanaccent/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-28 md:pt-36 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-mint"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyanaccent animate-pulse" />
              AgriLoop · Process Control Unit
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 font-heading font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            >
              The AgriLoop <span className="bg-gradient-to-r from-mint to-cyanaccent bg-clip-text text-transparent">Control System</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-cream/75 leading-relaxed"
            >
              A sensor-driven adaptive control loop — enter data manually, stream it live from your
              ESP32 over WiFi, or run the demo. Visualize the full process, estimate outputs, and
              recover energy.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 border border-cream/10"
          >
            <Image src={HERO_IMG} alt="AgriLoop reactor" className="w-full h-[280px] md:h-[360px]" fittingType="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Tabs + content */}
      <section className="relative bg-cream min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 -mt-8">
          {/* Sticky tab bar */}
          <div className="sticky top-16 md:top-20 z-30 rounded-2xl bg-cream/90 backdrop-blur-xl border border-forest/10 shadow-lg p-2 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {TABS.map((t) => {
                const Icon = t.icon;
                const on = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      on ? "text-cream" : "text-charcoal/60 hover:text-forest"
                    }`}
                  >
                    {on && (
                      <motion.span layoutId="tab-active" className="absolute inset-0 rounded-xl bg-gradient-to-r from-forest to-emerald2" />
                    )}
                    <Icon className="relative h-4 w-4" />
                    <span className="relative whitespace-nowrap">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {renderTab()}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}