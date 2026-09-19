import React from "react";
import { Hand, Wifi, FlaskConical, Radio } from "lucide-react";

const MODES = [
  { id: "manual", label: "Manual", icon: Hand, desc: "Enter sensor readings by hand." },
  { id: "live", label: "Live ESP32", icon: Wifi, desc: "Stream readings from your ESP32 over WiFi." },
  { id: "demo", label: "Demo", icon: FlaskConical, desc: "Simulated streaming feed for demonstration." },
];

export default function DataSourceSwitcher({ mode, setMode, streaming, toggleStream }) {
  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Radio className="h-4 w-4 text-emerald2" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald2">Data Source</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MODES.map((m) => {
          const active = mode === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`relative text-left rounded-2xl p-4 border transition-all ${
                active
                  ? "border-emerald2 bg-mint/30 shadow-md"
                  : "border-forest/10 bg-white/60 hover:border-emerald2/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-gradient-to-br from-forest to-emerald2 text-cream" : "bg-mint/30 text-forest"}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-heading font-semibold text-forest text-sm">{m.label}</span>
                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald2" />
                )}
              </div>
              <p className="mt-2 text-xs text-charcoal/60 leading-snug">{m.desc}</p>
            </button>
          );
        })}
      </div>

      {mode === "demo" && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-forest/5 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-forest">Simulated streaming</p>
            <p className="text-xs text-charcoal/60">New reading every 2 seconds.</p>
          </div>
          <button
            onClick={toggleStream}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${streaming ? "bg-emerald2" : "bg-forest/20"}`}
            aria-label="Toggle demo stream"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-cream shadow transition-transform duration-200 ${streaming ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}