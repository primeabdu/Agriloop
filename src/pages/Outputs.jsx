import React, { useState, useEffect } from "react";
import { Leaf, Zap, Activity, Thermometer, Droplet, Gauge, Wind, Scale } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Image } from "@/components/ui/image";

const BIOCHAR_IMG = "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/97e8d73fa_generated_image.png";

const dataPoints = [
  { icon: Thermometer, label: "Temperature" },
  { icon: Droplet, label: "Moisture" },
  { icon: Gauge, label: "Pressure" },
  { icon: Wind, label: "Gas Flow" },
  { icon: Scale, label: "Load" },
  { icon: Activity, label: "Emission Indicators" },
];

function useCounter(target, active, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function DemoCard({ icon: Icon, label, value, unit, color }) {
  const [active, setActive] = useState(false);
  const n = useCounter(value, active);
  return (
    <div
      ref={(el) => {
        if (el && !active) {
          const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { once: true });
          obs.observe(el);
        }
      }}
      className="rounded-2xl bg-white border border-forest/10 p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-emerald2" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-cyanaccent">Demo</span>
      </div>
      <p className="mt-3 text-xs font-mono uppercase tracking-widest text-charcoal/50">{label}</p>
      <p className="mt-1 font-heading font-bold text-2xl text-forest">
        {n.toFixed(1)} <span className="text-sm font-normal text-charcoal/50">{unit}</span>
      </p>
    </div>
  );
}

export default function Outputs() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-mint/20 py-16 md:py-24">
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Outputs"
            title="What comes out of the system"
            subtitle="Three valuable outputs: a carbon-rich solid product, potential energy recovery, and useful process data."
          />

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {/* Biochar */}
            <Reveal>
              <div className="h-full overflow-hidden rounded-3xl bg-white border border-forest/10 shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-52 overflow-hidden">
                  <Image src={BIOCHAR_IMG} alt="Biochar" className="w-full h-full" fittingType="fill" />
                  <span className="absolute top-3 left-3 rounded-full bg-forest/80 backdrop-blur px-3 py-1 text-xs font-mono text-mint">SOLID PRODUCT</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald2" />
                    <h3 className="font-heading font-bold text-xl text-forest">Biochar</h3>
                  </div>
                  <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
                    Biochar is the main solid product generated from the biomass conversion process — a carbon-rich material with potential soil applications.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Energy */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl bg-gradient-to-br from-energy/20 to-beige border border-white/50 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-energy" />
                  <h3 className="font-heading font-bold text-xl text-forest">Energy Recovery</h3>
                </div>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                  Useful energy can potentially be recovered from pyrolysis gases where the system safely implements gas treatment and energy recovery.
                </p>
                <div className="mt-5 flex-1 flex items-center justify-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs font-mono text-charcoal/60">
                      <span>Pyrolysis Gas</span><span>Recovery</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="h-8 flex-1 rounded-lg bg-energy/30" />
                      <span className="text-energy text-xl">→</span>
                      <div className="h-8 flex-1 rounded-lg bg-energy/60" />
                      <span className="text-energy text-xl">→</span>
                      <div className="h-8 flex-1 rounded-lg bg-energy animate-pulse" />
                    </div>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-charcoal/50">Where safely implemented</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Data */}
            <Reveal delay={0.2}>
              <div className="h-full rounded-3xl bg-white border border-forest/10 p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyanaccent" />
                  <h3 className="font-heading font-bold text-xl text-forest">Process Data</h3>
                </div>
                <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
                  Data collected from sensors during the process:
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {dataPoints.map((d) => (
                    <div key={d.label} className="flex items-center gap-2 rounded-lg bg-mint/15 px-3 py-2">
                      <d.icon className="h-4 w-4 text-emerald2" />
                      <span className="text-xs font-medium text-forest">{d.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] font-mono uppercase tracking-widest text-cyanaccent">Experiment Pending · Demo Data</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Smart monitoring demo cards */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Smart Monitoring"
            title="A glimpse of the control interface"
            subtitle="Example sensor readings from the AgriLoop control system. Numbers shown are simulated."
          />
          <Reveal className="mt-12">
            <div className="rounded-3xl bg-gradient-to-br from-forest to-emerald2/80 p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-mono text-mint">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyanaccent animate-pulse" /> LIVE STREAM
                </span>
                <span className="rounded-full bg-energy px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-charcoal">Demo Data</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <DemoCard icon={Thermometer} label="Temperature" value={412} unit="°C" />
                <DemoCard icon={Droplet} label="Moisture" value={14.6} unit="%" />
                <DemoCard icon={Gauge} label="Pressure" value={1.02} unit="bar" />
                <DemoCard icon={Wind} label="Gas Flow" value={3.4} unit="L/m" />
                <DemoCard icon={Scale} label="Load" value={2.8} unit="kg" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}