import React from "react";
import { AlertTriangle, FlaskConical } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Image } from "@/components/ui/image";

const materials = [
  { img: "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/5f3b7d710_generated_image.png", name: "Rice Straw", tag: "Primary feedstock", text: "Rice straw is the main agricultural waste considered in the project.", primary: true },
  { img: "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/f8770749a_generated_image.png", name: "Corn Residues", tag: "Potential feedstock", text: "Stalks and cob residues from corn cultivation.", primary: false },
  { img: "https://media.base44.com/images/public/6aa984306229dbd9fde008fd/b398fe0ee_generated_image.png", name: "Wheat Straw", tag: "Potential feedstock", text: "Straw remaining from wheat harvesting.", primary: false },
  { icon: "🌿", name: "Other Biomass", tag: "Requires testing", text: "Other biomass types may be considered but must be evaluated first.", primary: false },
];

const forbidden = [
  { icon: "🚫", label: "Plastics" },
  { icon: "🔩", label: "Metals" },
  { icon: "🔋", label: "Batteries" },
  { icon: "💻", label: "Electronic waste" },
  { icon: "☣️", label: "Treated or contaminated materials" },
  { icon: "❓", label: "Unknown chemicals" },
];

export default function Materials() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-mint/20 py-16 md:py-24">
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Materials"
            title="What can go into AgriLoop?"
            subtitle="AgriLoop is designed for agricultural biomass. Some feedstocks are confirmed, others are potential and require testing."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="group h-full overflow-hidden rounded-3xl bg-white border border-forest/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="relative h-44 overflow-hidden">
                    {m.img ? (
                      <Image src={m.img} alt={m.name} className="w-full h-full group-hover:scale-105 transition-transform duration-500" fittingType="fill" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-mint/30 to-beige text-6xl">{m.icon}</div>
                    )}
                    {m.primary && (
                      <span className="absolute top-3 left-3 rounded-full bg-energy px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-charcoal">Primary</span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald2">{m.tag}</span>
                    <h3 className="mt-1 font-heading font-bold text-lg text-forest">{m.name}</h3>
                    <p className="mt-1.5 text-sm text-charcoal/65 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl bg-mint/20 border border-emerald2/20 p-5 max-w-3xl mx-auto">
              <FlaskConical className="h-5 w-5 text-emerald2 mt-0.5 shrink-0" />
              <p className="text-sm text-forest/80">
                <span className="font-semibold">Scientific note:</span> Feedstock suitability must be evaluated and tested before use. Not every type of biomass is automatically suitable.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Forbidden */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            eyebrow="Safety"
            title="AgriLoop is designed for agricultural biomass"
            subtitle="The following materials should never be put inside the system."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {forbidden.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/60 p-5 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-red-900">{f.label}</p>
                    <p className="text-xs text-red-700/70">Do not process</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 p-5 max-w-3xl mx-auto">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-900/80">
                Processing non-biomass materials can damage the system, produce harmful emissions, and create safety hazards. Only use tested agricultural biomass.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}