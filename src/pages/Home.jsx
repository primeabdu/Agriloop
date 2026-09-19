import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Recycle, Leaf, Zap, Cpu, ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProcessFlow from "@/components/ProcessFlow";
import LeafParticles from "@/components/LeafParticles";
import AiAssistant from "@/components/AiAssistant";
import { Image } from "@/components/ui/image";

const HERO_IMG = "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/d013de8fb_generated_image.png";

const whyCards = [
  { icon: Recycle, title: "Waste Valorization", text: "Turning agricultural waste into useful resources instead of burning or discarding it.", color: "from-forest to-emerald2" },
  { icon: Leaf, title: "Biochar", text: "Producing a valuable carbon-rich solid product from biomass conversion.", color: "from-emerald2 to-mint" },
  { icon: Zap, title: "Energy Recovery", text: "Exploring useful recovery of process energy from pyrolysis gases.", color: "from-energy to-emerald2" },
  { icon: Cpu, title: "Smart Monitoring", text: "Using sensors and an ESP32-based controller for data-driven monitoring.", color: "from-cyanaccent to-forest" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-mint/20">
        <LeafParticles count={12} />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald2/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyanaccent/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-12 md:pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald2/30 bg-mint/20 px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-emerald2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyanaccent animate-pulse" />
              AgriLoop · Prototype V1
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 font-heading font-bold tracking-tight text-forest text-4xl md:text-5xl lg:text-6xl leading-[1.04]"
            >
              Turning Agricultural Waste Into{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald2 to-cyanaccent bg-clip-text text-transparent">
                  Useful Resources
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-charcoal/70 leading-relaxed"
            >
              AgriLoop is a smart agricultural waste-to-biochar and energy recovery system designed
              to transform biomass waste into useful products while collecting valuable process data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/furnace"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-forest to-emerald2 px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-forest/20 hover:shadow-xl hover:scale-[1.03] transition-all"
              >
                Explore the Furnace
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/60 backdrop-blur px-6 py-3.5 text-sm font-semibold text-forest hover:bg-white transition-all"
              >
                <Play className="h-4 w-4" />
                See How It Works
              </Link>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-forest/20 border border-white/50">
              <Image
                src={HERO_IMG}
                alt="Agricultural waste transforming into biochar"
                className="w-full h-[360px] md:h-[480px]"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-cream/80 backdrop-blur-md px-4 py-3 border border-white/40">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-emerald2">Waste → Carbon</p>
                  <p className="text-sm font-semibold text-forest">The AgriLoop transformation</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-mint">
                  <Leaf className="h-4 w-4" />
                </span>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 rounded-2xl bg-energy px-3 py-2 text-xs font-mono font-semibold text-charcoal shadow-lg rotate-3">
              BIOCHAR · CARBON-RICH
            </div>
          </motion.div>
        </div>

        {/* Visual flow */}
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pb-20">
          <Reveal className="rounded-3xl bg-white/50 backdrop-blur border border-forest/10 p-8 md:p-12 shadow-xl shadow-forest/5">
            <p className="text-center text-xs font-mono uppercase tracking-[0.25em] text-emerald2 mb-8">
              The AgriLoop Cycle
            </p>
            <ProcessFlow />
          </Reveal>
        </div>
      </section>

      {/* WHY AGRILOOP */}
      <section className="relative py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Why AgriLoop"
            title="A smarter end for agricultural waste"
            subtitle="AgriLoop explores how biomass waste can become a source of useful materials, energy, and data — not just a problem to burn."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl bg-white border border-forest/10 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} shadow-lg`}>
                    <c.icon className="h-7 w-7 text-cream" />
                  </div>
                  <h3 className="mt-5 font-heading font-bold text-lg text-forest">{c.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE → PROCESS → AFTER */}
      <section className="relative py-20 bg-gradient-to-b from-forest to-forest text-cream overflow-hidden">
        <LeafParticles count={10} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-emerald2/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="The Transformation"
            title="Before · Process · After"
            subtitle="Follow agricultural waste through the AgriLoop system into useful outputs."
            light
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3 items-stretch">
            {[
              { tag: "Before", icon: "🌾", title: "Agricultural Waste", text: "Biomass such as rice straw is collected instead of burned or discarded.", tone: "from-energy/20 to-transparent" },
              { tag: "Process", icon: "🔥", title: "AgriLoop System", text: "Controlled thermal conversion monitored by sensors and the ESP32 controller.", tone: "from-energy/40 to-forest/40" },
              { tag: "After", icon: "🌱", title: "Biochar + Energy + Data", text: "A carbon-rich solid product, potential energy recovery, and valuable process data.", tone: "from-mint/30 to-emerald2/30" },
            ].map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.12}>
                <div className={`relative h-full rounded-3xl bg-gradient-to-br ${s.tone} border border-cream/15 p-8 backdrop-blur-sm`}>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-mint">{s.tag}</span>
                  <div className="mt-4 text-5xl">{s.icon}</div>
                  <h3 className="mt-4 font-heading font-bold text-2xl text-cream">{s.title}</h3>
                  <p className="mt-3 text-sm text-cream/75 leading-relaxed">{s.text}</p>
                  {i < 2 && (
                    <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-forest">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="relative py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Environmental Impact"
            title="From agricultural waste to circular resources"
            subtitle="AgriLoop supports a circular approach — valorizing waste, producing biochar, exploring energy recovery, and monitoring with data."
          />
          <Reveal className="mt-14 flex flex-col items-center">
            <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 items-center">
              {[
                { icon: "🌾", label: "Agricultural Waste" },
                { icon: "🔥", label: "AgriLoop" },
                { icon: "🌱", label: "Biochar" },
                { icon: "🌍", label: "Soil Application" },
                { icon: "♻️", label: "Agri Cycle" },
              ].map((n, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white border border-emerald2/20 shadow-lg text-3xl"
                  >
                    {n.icon}
                  </motion.div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-forest max-w-[6rem]">{n.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-2xl text-center text-sm text-charcoal/60 italic">
              Agricultural waste valorization · Biochar production · Energy recovery · Data-driven monitoring · Circular economy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 bg-gradient-to-br from-forest via-emerald2 to-forest text-cream overflow-hidden">
        <LeafParticles count={14} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,209,197,0.18),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
              Waste shouldn't be the end of the story.
            </h2>
            <p className="mt-5 text-lg text-cream/80 max-w-2xl mx-auto">
              AgriLoop explores how agricultural waste can become a source of useful materials,
              energy, and data.
            </p>
            <Link
              to="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-4 text-sm font-semibold text-forest shadow-xl hover:scale-[1.03] transition-transform"
            >
              Explore AgriLoop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <AiAssistant />
    </>
  );
}