import React from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Gauge,
  Wind,
  Scale,
  Cloud,
  CircleDot,
  Wifi,
  Copy,
  Check,
} from "lucide-react";
import SensorChart from "./SensorChart";
import DataSourceSwitcher from "./DataSourceSwitcher";
import SensorInputForm from "./SensorInputForm";

const CARDS = [
  { key: "t1", label: "T1 · Heat Source", unit: "°C", icon: Thermometer, color: "from-energy to-emerald2" },
  { key: "t2", label: "T2 · Reactor Core", unit: "°C", icon: Thermometer, color: "from-forest to-emerald2" },
  { key: "t3", label: "T3 · Gas Out", unit: "°C", icon: Thermometer, color: "from-cyanaccent to-forest" },
  { key: "moisture", label: "Moisture", unit: "%", icon: Droplets, color: "from-cyanaccent to-emerald2" },
  { key: "pressure", label: "Pressure", unit: "kPa", icon: Gauge, color: "from-emerald2 to-forest" },
  { key: "gas_flow", label: "Gas Flow", unit: "L/min", icon: Wind, color: "from-mint to-cyanaccent" },
  { key: "load", label: "Feed Load", unit: "g", icon: Scale, color: "from-forest to-mint" },
  { key: "emission", label: "Emission", unit: "ppm", icon: Cloud, color: "from-charcoal to-forest" },
  { key: "oxygen", label: "Oxygen", unit: "%", icon: CircleDot, color: "from-cyanaccent to-emerald2" },
];

function LiveConnectionPanel({ endpoint }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="rounded-3xl bg-gradient-to-br from-forest to-emerald2 p-5 text-cream shadow-lg">
      <div className="flex items-center gap-2">
        <Wifi className="h-4 w-4 text-mint" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-mint">ESP32 Connection</span>
      </div>
      <p className="mt-3 text-sm text-cream/80 leading-relaxed">
        Point your ESP32 (or Arduino + WiFi shield) to POST JSON sensor readings to this endpoint:
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-charcoal/40 backdrop-blur px-3 py-2.5">
        <code className="flex-1 text-xs text-mint break-all">{endpoint}</code>
        <button onClick={copy} className="text-mint/80 hover:text-mint" aria-label="Copy endpoint">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="mt-3 text-[11px] leading-snug text-cream/70 bg-charcoal/30 rounded-xl p-3 overflow-x-auto">{`{
  "waste_type": "Rice Straw",
  "t1": 420, "t2": 480, "t3": 380,
  "moisture": 12, "pressure": 101,
  "gas_flow": 5, "emission": 120,
  "oxygen": 18, "load": 500
}`}</pre>
      <p className="mt-2 text-[11px] text-cream/50">
        Live ingestion requires the AgriLoop ingest backend function (Builder+). Readings are stored in the SensorReading log and streamed here in real time.
      </p>
    </div>
  );
}

export default function LiveSensorsTab({ sensor }) {
  const { mode, setMode, current, setCurrent, history, streaming, toggleStream, logReading, loadingLive, liveEndpoint } = sensor;
  const chartData = history.map((h, i) => ({
    label: `${i + 1}`,
    T1: h.t1,
    T2: h.t2,
    T3: h.t3,
    Moisture: h.moisture,
    Pressure: h.pressure,
    "Gas Flow": h.gas_flow,
    Load: h.load,
  }));

  const badge =
    mode === "live" ? { text: "LIVE", dot: "bg-red-500" } :
    mode === "demo" && streaming ? { text: "DEMO STREAM", dot: "bg-cyanaccent" } :
    { text: "MANUAL", dot: "bg-emerald2" };

  return (
    <div className="space-y-6">
      <DataSourceSwitcher mode={mode} setMode={setMode} streaming={streaming} toggleStream={toggleStream} />

      {mode === "live" && <LiveConnectionPanel endpoint={liveEndpoint} />}

      {loadingLive && (
        <p className="text-sm text-charcoal/60 text-center py-4">Loading stored readings…</p>
      )}

      <SensorInputForm
        current={current}
        setCurrent={setCurrent}
        onLog={logReading}
        mode={mode}
        streaming={streaming}
        onToggleStream={toggleStream}
      />

      {/* Sensor cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl bg-white border border-forest/10 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-cream`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-charcoal/50">
                  <span className={`h-1.5 w-1.5 rounded-full ${badge.dot} ${mode !== "manual" ? "animate-pulse" : ""}`} />
                  {badge.text}
                </span>
              </div>
              <p className="mt-3 text-xs text-charcoal/55">{c.label}</p>
              <p className="mt-0.5 font-heading font-bold text-2xl text-forest">
                {current[c.key]}
                <span className="ml-1 text-xs font-mono font-normal text-charcoal/40">{c.unit}</span>
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
          <h4 className="font-heading font-semibold text-forest mb-3">Temperature (T1 · T2 · T3)</h4>
          <SensorChart
            data={chartData}
            fields={[
              { key: "T1", label: "T1", color: "#F4B942" },
              { key: "T2", label: "T2", color: "#2E8B57" },
              { key: "T3", label: "T3", color: "#4FD1C5" },
            ]}
            yLabel="°C"
          />
        </div>
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
          <h4 className="font-heading font-semibold text-forest mb-3">Moisture & Pressure</h4>
          <SensorChart
            data={chartData}
            fields={[
              { key: "Moisture", label: "Moisture %", color: "#4FD1C5" },
              { key: "Pressure", label: "Pressure kPa", color: "#12372A" },
            ]}
          />
        </div>
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
          <h4 className="font-heading font-semibold text-forest mb-3">Gas Flow</h4>
          <SensorChart
            data={chartData}
            fields={[{ key: "Gas Flow", label: "Gas Flow L/min", color: "#2E8B57" }]}
          />
        </div>
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
          <h4 className="font-heading font-semibold text-forest mb-3">Feed Load</h4>
          <SensorChart
            data={chartData}
            fields={[{ key: "Load", label: "Load g", color: "#F4B942" }]}
          />
        </div>
      </div>

      {/* System log */}
      <div className="rounded-3xl bg-charcoal text-mint/90 p-5 shadow-sm overflow-hidden">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyanaccent mb-3">System Log</p>
        <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-xs">
          {history.slice(-8).reverse().map((h, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-cyanaccent/60">{new Date(h.ts).toLocaleTimeString()}</span>
              <span className="text-mint/80">T1={h.t1} T2={h.t2} T3={h.t3} M={h.moisture} P={h.pressure} G={h.gas_flow} L={h.load}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}