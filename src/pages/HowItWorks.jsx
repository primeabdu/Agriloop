import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import LeafParticles from "@/components/LeafParticles";

const steps = [
  { n: "01", icon: "🌾", title: "Collect", text: "Agricultural waste such as rice straw is collected from the field." },
  { n: "02", icon: "🧰", title: "Prepare", text: "The biomass is prepared before entering the system." },
  { n: "03", icon: "🌡️", title: "Measure", text: "Sensors collect important process information such as moisture and temperature." },
  { n: "04", icon: "🔥", title: "Process", text: "The biomass enters the controlled thermal conversion stage." },
  { n: "05", icon: "🌱", title: "Biochar", text: "A solid biochar product is produced from the biomass." },
  { n: "06", icon: "⚡", title: "Gas & Energy", text: "Pyrolysis gas can be treated and used for energy recovery where safely implemented." },
  { n: "07", icon: "📡", title: "Monitor", text: "The ESP32 and sensors collect and transmit process data." },
];

export default function HowItWorks() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-mint/20 py-16 md:py-24">
        <LeafParticles count={10} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <SectionHeading
            eyebrow="How It Works"
            title="From waste to resource, step by step"
            subtitle="Seven clear stages take agricultural biomass through the AgriLoop system into biochar, energy, and data."
          />
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald2/40 via-emerald2/20 to-transparent md:-translate-x-1/2" />
            <div className="space-y-8">
              {steps.map((s, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={s.n} delay={0.05}>
                    <div className={`relative flex md:items-center gap-6 ${left ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="hidden md:block md:w-1/2" />
                      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-forest to-emerald2 text-cream font-mono font-bold text-sm shadow-lg ring-4 ring-cream"
                        >
                          {s.n}
                        </motion.span>
                      </div>
                      <div className={`pl-16 md:pl-0 md:w-1/2 ${left ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <div className="rounded-3xl bg-white border border-forest/10 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                          <div className="text-3xl">{s.icon}</div>
                          <h3 className="mt-3 font-heading font-bold text-xl text-forest">{s.title}</h3>
                          <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">{s.text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Adaptive control loop */}
      <section className="py-20 bg-gradient-to-b from-forest to-forest text-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Adaptive Control"
            title="Sensor feedback drives smart decisions"
            subtitle="Instead of relying only on fixed settings, AgriLoop can use sensor feedback to support adaptive control."
            light
          />
          <Reveal className="mt-14">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {["Sensors", "ESP32", "Decision", "System Response"].map((n, i) => (
                <React.Fragment key={n}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="rounded-2xl bg-cream/10 border border-cream/15 backdrop-blur px-6 py-4 text-center"
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-mint">Stage {i + 1}</p>
                    <p className="mt-1 font-heading font-semibold text-lg">{n}</p>
                  </motion.div>
                  {i < 3 && <ArrowRight className="h-6 w-6 text-cyanaccent rotate-90 md:rotate-0" />}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-cream/60 italic max-w-2xl mx-auto">
              A continuous feedback loop — the system responds to live sensor data rather than running blind.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}