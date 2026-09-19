import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Thermometer, Droplet, Gauge, Wind, Scale, Flame, ShieldCheck, Recycle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const components = [
  { id: "reactor", icon: Flame, name: "Pyrolysis Reactor", pos: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", planned: false,
    desc: "The main chamber where biomass undergoes controlled thermal conversion to produce biochar and gas." },
  { id: "temp", icon: Thermometer, name: "Temperature Sensors", pos: "top-[18%] left-[22%]", planned: false,
    desc: "Measure internal temperatures throughout the process to support monitoring and control." },
  { id: "moisture", icon: Droplet, name: "Moisture Measurement", pos: "top-[18%] right-[22%]", planned: true,
    desc: "Tracks biomass moisture content before and during processing." },
  { id: "pressure", icon: Gauge, name: "Pressure Sensor", pos: "top-1/2 left-[8%] -translate-y-1/2", planned: false,
    desc: "Monitors pressure conditions inside the reactor." },
  { id: "gasflow", icon: Wind, name: "Gas Flow Sensor", pos: "top-1/2 right-[8%] -translate-y-1/2", planned: true,
    desc: "Measures gas flow in the treatment and recovery path." },
  { id: "load", icon: Scale, name: "Load Cell", pos: "bottom-[18%] left-[22%]", planned: true,
    desc: "Measures the mass of biomass and biochar during processing." },
  { id: "esp32", icon: Cpu, name: "ESP32 Controller", pos: "bottom-[18%] right-[22%]", planned: false,
    desc: "The ESP32 collects sensor information and supports monitoring and control of the system." },
  { id: "treatment", icon: Recycle, name: "Gas Treatment / Energy Recovery", pos: "bottom-[6%] left-1/2 -translate-x-1/2", planned: true,
    desc: "A path for treating pyrolysis gas and recovering energy where safely implemented." },
  { id: "safety", icon: ShieldCheck, name: "Safety Mechanisms", pos: "top-[6%] left-1/2 -translate-x-1/2", planned: true,
    desc: "Planned safeguards to support safe operation of the prototype." },
];

export default function Components() {
  const [active, setActive] = useState(null);
  const activeComp = components.find((c) => c.id === active);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-mint/20 py-16 md:py-24">
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Components"
            title="Inside the AgriLoop system"
            subtitle="An exploded view of the main components. Click any part to learn more. Planned components are marked."
          />

          <div className="mt-14 grid lg:grid-cols-3 gap-8 items-start">
            {/* Diagram */}
            <Reveal className="lg:col-span-2">
              <div className="relative rounded-3xl bg-white border border-forest/10 shadow-xl p-6 md:p-10">
                <div className="relative mx-auto aspect-square max-w-[520px]">
                  {/* central reactor body */}
                  <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-mint/30 to-beige border-2 border-emerald2/30" />
                  <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-energy/30 to-forest/40 border border-energy/40 flex items-center justify-center">
                    <Flame className="h-10 w-10 text-energy" />
                  </div>
                  {/* connecting lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="50" y1="50" x2="22" y2="18" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="78" y2="18" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="8" y2="50" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="92" y2="50" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="22" y2="82" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="78" y2="82" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="50" y2="6" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                    <line x1="50" y1="50" x2="50" y2="94" stroke="#2E8B57" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
                  </svg>

                  {components.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActive(c.id)}
                      style={{ position: "absolute" }}
                      className={`${c.pos} group`}
                      aria-label={c.name}
                    >
                      <span
                        className={`relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border shadow-md transition-all ${
                          active === c.id
                            ? "bg-gradient-to-br from-forest to-emerald2 border-forest text-cream scale-110"
                            : "bg-white border-forest/15 text-forest hover:border-emerald2 hover:scale-105"
                        }`}
                      >
                        <c.icon className="h-5 w-5 md:h-6 md:w-6" />
                        {c.planned && (
                          <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-energy border-2 border-white" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-charcoal/60">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-energy" /> Planned Component</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald2" /> Installed / Core</span>
                </div>
              </div>
            </Reveal>

            {/* Info panel */}
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-white border border-forest/10 shadow-xl p-6 min-h-[300px] sticky top-24">
                <AnimatePresence mode="wait">
                  {activeComp ? (
                    <motion.div
                      key={activeComp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-emerald2 text-cream">
                          <activeComp.icon className="h-6 w-6" />
                        </div>
                        <button onClick={() => setActive(null)} className="text-charcoal/40 hover:text-charcoal">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <h3 className="mt-4 font-heading font-bold text-xl text-forest">{activeComp.name}</h3>
                      <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{activeComp.desc}</p>
                      <span
                        className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest ${
                          activeComp.planned ? "bg-energy/20 text-charcoal" : "bg-mint/30 text-emerald2"
                        }`}
                      >
                        {activeComp.planned ? "Planned Component" : "Installed / Core"}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center py-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/20 text-emerald2">
                        <Cpu className="h-7 w-7" />
                      </div>
                      <p className="mt-4 font-semibold text-forest">Select a component</p>
                      <p className="mt-1 text-sm text-charcoal/60">Click any node in the diagram to view its details.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}