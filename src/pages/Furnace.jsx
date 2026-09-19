import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sprout, Cpu } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Image } from "@/components/ui/image";

const FURNACE_IMG = "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/39aa9ce88_generated_image.png";

const cards = [
  { icon: "🌾", title: "Input", text: "Agricultural biomass such as rice straw enters the system.", tone: "from-energy/20 to-beige" },
  { icon: "🔥", title: "Process", text: "Controlled thermal conversion inside the reactor.", tone: "from-energy/40 to-forest" },
  { icon: "🌱", title: "Output", text: "Biochar, potential energy recovery, and process data.", tone: "from-mint to-emerald2/40" },
];

const diagram = [
  { label: "Biomass", icon: "🌾" },
  { label: "Preparation", icon: "🧰" },
  { label: "Reactor", icon: "🔥" },
  { label: "Biochar + Gas", icon: "🌱" },
  { label: "Cooling / Treatment", icon: "❄️" },
  { label: "Energy Recovery", icon: "⚡" },
];

export default function Furnace() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-mint/20 py-16 md:py-24">
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-energy/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald2/30 bg-mint/20 px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-emerald2">
              <Flame className="h-3.5 w-3.5" /> The AgriLoop Furnace
            </span>
            <h1 className="mt-5 font-heading font-bold text-forest text-4xl md:text-5xl leading-[1.05]">
              The core of the system
            </h1>
            <p className="mt-5 text-lg text-charcoal/70 leading-relaxed">
              The AgriLoop furnace is the main part of the system where agricultural biomass is
              processed through controlled thermal conversion. It is designed to transform biomass
              into useful products while sensors collect valuable process data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-forest/5 border border-forest/10 px-4 py-2 text-xs font-mono text-forest">REACTOR · CONTROLLED</span>
              <span className="rounded-full bg-forest/5 border border-forest/10 px-4 py-2 text-xs font-mono text-forest">SENSOR-MONITORED</span>
              <span className="rounded-full bg-energy/20 border border-energy/30 px-4 py-2 text-xs font-mono text-charcoal">PROTOTYPE V1</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-forest/20 border border-white/50">
              <Image src={FURNACE_IMG} alt="AgriLoop furnace reactor cross-section illustration" className="w-full h-[340px] md:h-[460px]" fittingType="fill" />
              <div className="absolute bottom-4 left-4 rounded-xl bg-cream/85 backdrop-blur px-3 py-2 text-xs font-mono text-forest border border-white/40">
                Illustration · Not the physical prototype
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three cards */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className={`h-full rounded-3xl bg-gradient-to-br ${c.tone} border border-white/50 p-8 shadow-lg hover:-translate-y-1 transition-all`}>
                <div className="text-4xl">{c.icon}</div>
                <h3 className="mt-4 font-heading font-bold text-2xl text-forest">{c.title}</h3>
                <p className="mt-2 text-charcoal/70 leading-relaxed">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What does the furnace do */}
      <section className="py-20 bg-gradient-to-b from-mint/20 to-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="What it does"
            title="What does the furnace do?"
            subtitle="In simple terms: it converts biomass into biochar and gas through a controlled thermal process — without complicated engineering language."
          />
          <Reveal className="mt-14">
            <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2 justify-center">
              {diagram.map((d, i) => (
                <React.Fragment key={i}>
                  <div className="flex-1 min-w-[140px] rounded-2xl bg-white border border-forest/10 p-5 text-center shadow-sm hover:shadow-md transition-all">
                    <div className="text-3xl">{d.icon}</div>
                    <p className="mt-2 text-sm font-semibold text-forest">{d.label}</p>
                  </div>
                  {i < diagram.length - 1 && (
                    <div className="flex items-center justify-center text-emerald2 text-2xl font-light">
                      <span className="md:hidden">↓</span>
                      <span className="hidden md:inline">→</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Sprout, title: "Produces biochar", text: "A carbon-rich solid product from the biomass." },
              { icon: Flame, title: "Generates gas", text: "Pyrolysis gases that can be treated where safely implemented." },
              { icon: Cpu, title: "Collects data", text: "Sensors and ESP32 monitor the process throughout." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white border border-forest/10 p-6 shadow-sm">
                <f.icon className="h-7 w-7 text-emerald2" />
                <h4 className="mt-3 font-semibold text-forest">{f.title}</h4>
                <p className="mt-1 text-sm text-charcoal/65">{f.text}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-12 text-center">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-forest to-emerald2 px-6 py-3.5 text-sm font-semibold text-cream shadow-lg hover:scale-[1.03] transition-transform">
              See the full process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}