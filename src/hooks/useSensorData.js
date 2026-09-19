import { useState, useEffect, useRef, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { WASTE_TYPES } from "@/lib/pyrolysisEstimate";

export const LIVE_ENDPOINT =
  "https://agri-loop-tech.base44.app/functions/ingestSensorReading";

const FIELDS = [
  "waste_type",
  "t1",
  "t2",
  "t3",
  "moisture",
  "pressure",
  "gas_flow",
  "emission",
  "oxygen",
  "load",
  "energy_recovered",
];

const blank = (waste_type = "Rice Straw") => ({
  waste_type,
  t1: 420,
  t2: 480,
  t3: 380,
  moisture: 12,
  pressure: 101,
  gas_flow: 5,
  emission: 120,
  oxygen: 18,
  load: 500,
  energy_recovered: 0,
});

const pick = (r) =>
  FIELDS.reduce((acc, k) => {
    acc[k] = r[k];
    return acc;
  }, {});

export function useSensorData() {
  const [mode, setMode] = useState("manual");
  const [current, setCurrent] = useState(blank());
  const [history, setHistory] = useState([{ ...blank(), ts: Date.now() }]);
  const [streaming, setStreaming] = useState(false);
  const [loadingLive, setLoadingLive] = useState(false);
  const currentRef = useRef(current);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Reset streaming when leaving demo mode.
  useEffect(() => {
    if (mode !== "demo") setStreaming(false);
  }, [mode]);

  // Live mode: load recent readings from the entity and subscribe to new ones.
  useEffect(() => {
    if (mode !== "live") return;
    let active = true;
    setLoadingLive(true);
    (async () => {
      try {
        const recs = await base44.entities.SensorReading.list("-created_date", 30);
        if (!active) return;
        const mapped = recs
          .map((r) => ({ ...pick(r), ts: new Date(r.created_date).getTime() }))
          .reverse();
        setHistory(mapped.length ? mapped : [{ ...blank(), ts: Date.now() }]);
        if (mapped.length) setCurrent((prev) => ({ ...prev, ...mapped[mapped.length - 1] }));
      } catch (e) {
        /* entity unavailable — keep blank */
      } finally {
        if (active) setLoadingLive(false);
      }
    })();

    let unsub = () => {};
    try {
      unsub = base44.entities.SensorReading.subscribe((event) => {
        if (event.type !== "create") return;
        const r = event.data;
        const entry = { ...pick(r), ts: new Date(r.created_date).getTime() };
        setHistory((h) => [...h, entry].slice(-30));
        setCurrent((prev) => ({ ...prev, ...entry }));
      });
    } catch (e) {
      /* subscribe unsupported */
    }
    return () => {
      active = false;
      unsub();
    };
  }, [mode]);

  // Demo mode: simulate a streaming sensor feed.
  useEffect(() => {
    if (mode !== "demo" || !streaming) return;
    const id = setInterval(() => {
      const prev = currentRef.current;
      const drift = (v, amp, min, max) =>
        Math.max(min, Math.min(max, v + (Math.random() - 0.5) * amp));
      const next = {
        ...prev,
        t1: Math.round(drift(prev.t1, 12, 380, 460)),
        t2: Math.round(drift(prev.t2, 14, 440, 540)),
        t3: Math.round(drift(prev.t3, 10, 320, 420)),
        moisture: Math.round(drift(prev.moisture, 1.5, 5, 25) * 10) / 10,
        pressure: Math.round(drift(prev.pressure, 1.2, 95, 110) * 10) / 10,
        gas_flow: Math.round(drift(prev.gas_flow, 0.6, 2, 9) * 10) / 10,
        emission: Math.round(drift(prev.emission, 12, 60, 240)),
        oxygen: Math.round(drift(prev.oxygen, 0.8, 14, 21) * 10) / 10,
        load: Math.round(drift(prev.load, 6, 400, 600)),
      };
      currentRef.current = next;
      setCurrent(next);
      setHistory((h) => [...h, { ...next, ts: Date.now() }].slice(-30));
    }, 2000);
    return () => clearInterval(id);
  }, [mode, streaming]);

  const logReading = useCallback(async () => {
    const entry = { ...current, ts: Date.now() };
    setHistory((h) => [...h, entry].slice(-30));
    try {
      await base44.entities.SensorReading.create({ ...current, source_mode: "manual" });
    } catch (e) {
      /* entity create unavailable — keep in-memory */
    }
  }, [current]);

  const toggleStream = useCallback(() => {
    setStreaming((s) => {
      const next = !s;
      if (next && history.length <= 1) {
        setHistory((h) => [...h, { ...currentRef.current, ts: Date.now() }]);
      }
      return next;
    });
  }, [history.length]);

  return {
    mode,
    setMode,
    current,
    setCurrent,
    history,
    streaming,
    toggleStream,
    logReading,
    loadingLive,
    liveEndpoint: LIVE_ENDPOINT,
  };
}