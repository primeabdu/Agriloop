import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-forest text-cream/80 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest to-emerald2/30" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint/20">
                <Leaf className="h-5 w-5 text-mint" />
              </span>
              <span className="font-heading font-bold text-xl text-cream">
                Agri<span className="text-mint">Loop</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
              A smart agricultural waste-to-biochar and energy recovery system — turning biomass
              waste into useful resources while collecting valuable process data.
            </p>
            <p className="mt-4 text-xs font-mono uppercase tracking-widest text-mint/60">
              Prototype V1 · Scientific Research Project
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/furnace" className="hover:text-mint transition-colors">The Furnace</Link></li>
              <li><Link to="/how-it-works" className="hover:text-mint transition-colors">How It Works</Link></li>
              <li><Link to="/components" className="hover:text-mint transition-colors">Components</Link></li>
              <li><Link to="/control-system" className="hover:text-mint transition-colors">Control System</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream mb-4">Project</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/materials" className="hover:text-mint transition-colors">Materials</Link></li>
              <li><Link to="/outputs" className="hover:text-mint transition-colors">Outputs</Link></li>
              <li><span className="hover:text-mint transition-colors cursor-default">Environmental Impact</span></li>
              <li><span className="hover:text-mint transition-colors cursor-default">Safety Notes</span></li>
            </ul>
            <div className="flex gap-3 mt-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 hover:bg-mint/20 transition-colors cursor-pointer"><Mail className="h-4 w-4" /></span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 hover:bg-mint/20 transition-colors cursor-pointer"><Github className="h-4 w-4" /></span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 hover:bg-mint/20 transition-colors cursor-pointer"><Twitter className="h-4 w-4" /></span>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} AgriLoop. A scientific environmental research project.</p>
          <p className="font-mono">SYS_STATUS: ACTIVE · Data shown is demo unless stated otherwise.</p>
        </div>
      </div>
    </footer>
  );
}