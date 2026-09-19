import React from "react";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <Reveal className={`flex flex-col ${alignClass} max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
            light ? "border-white/20 text-mint" : "border-emerald2/30 text-emerald2 bg-mint/20"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyanaccent animate-pulse" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-heading font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-[1.05] ${
          light ? "text-cream" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-cream/80" : "text-charcoal/70"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}