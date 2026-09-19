import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { WASTE_TYPES } from "@/lib/pyrolysisEstimate";
import { Save, Play, Pause } from "lucide-react";

const NUMERIC = [
  { key: "t1", label: "T1 · Heat Source", unit: "°C" },
  { key: "t2", label: "T2 · Reactor Core", unit: "°C" },
  { key: "t3", label: "T3 · Gas Out", unit: "°C" },
  { key: "moisture", label: "Moisture", unit: "%" },
  { key: "pressure", label: "Pressure", unit: "kPa" },
  { key: "gas_flow", label: "Gas Flow", unit: "L/min" },
  { key: "emission", label: "Emission", unit: "ppm" },
  { key: "oxygen", label: "Oxygen", unit: "%" },
  { key: "load", label: "Feed / Load", unit: "g" },
];

export default function SensorInputForm({ current, setCurrent, onLog, mode, streaming, onToggleStream }) {
  const setField = (key, value) =>
    setCurrent((prev) => ({ ...prev, [key]: key === "waste_type" ? value : Number(value) }));

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur border border-forest/10 p-5 shadow-sm">
      <div className="grid gap-4">
        <div>
          <Label className="text-xs font-mono uppercase tracking-widest text-emerald2">Waste / Feedstock</Label>
          <Select value={current.waste_type} onValueChange={(v) => setField("waste_type", v)}>
            <SelectTrigger className="mt-1.5 bg-white border-forest/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WASTE_TYPES.map((w) => (
                <SelectItem key={w.name} value={w.name}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {NUMERIC.map((f) => (
            <div key={f.key}>
              <Label className="text-xs text-charcoal/60">{f.label}</Label>
              <div className="relative mt-1">
                <Input
                  type="number"
                  value={current[f.key]}
                  onChange={(e) => setField(f.key, e.target.value)}
                  className="pr-10 bg-white border-forest/15"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-charcoal/40">
                  {f.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {mode === "manual" && (
            <Button
              onClick={onLog}
              className="rounded-full bg-gradient-to-r from-forest to-emerald2 text-cream hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              Log Reading
            </Button>
          )}
          {mode === "demo" && (
            <Button
              onClick={onToggleStream}
              variant="outline"
              className="rounded-full border-forest/20 text-forest hover:bg-mint/30"
            >
              {streaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {streaming ? "Pause Stream" : "Start Stream"}
            </Button>
          )}
          {mode === "live" && (
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Configure your ESP32 to POST JSON readings to the endpoint shown in the connection panel.
              Incoming readings appear here automatically.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}