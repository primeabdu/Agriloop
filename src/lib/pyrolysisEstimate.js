// Transparent, illustrative estimation helpers for the AgriLoop control system.
// IMPORTANT: these are rule-based engineering estimates for demonstration and
// prototyping only. They are NOT a trained machine-learning model and must not
// be presented as "optimized" conditions until calibrated against real trials.

export const WASTE_TYPES = [
  { name: "Rice Straw", biocharYield: 0.35, defaultMoisture: 12, calorific: 14 },
  { name: "Wheat Straw", biocharYield: 0.33, defaultMoisture: 13, calorific: 15 },
  { name: "Corn Stalk", biocharYield: 0.30, defaultMoisture: 15, calorific: 14 },
  { name: "Sugarcane Bagasse", biocharYield: 0.32, defaultMoisture: 18, calorific: 16 },
  { name: "Coconut Shell", biocharYield: 0.38, defaultMoisture: 8, calorific: 18 },
  { name: "Wood Chips", biocharYield: 0.28, defaultMoisture: 10, calorific: 17 },
  { name: "Palm Kernel Shell", biocharYield: 0.40, defaultMoisture: 7, calorific: 19 },
];

export const ESTIMATE_DISCLAIMER =
  "Illustrative estimate from a rule-based model — not a trained/optimized algorithm. Values must be calibrated against real experimental data before any reporting.";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export function getWasteType(name) {
  return WASTE_TYPES.find((w) => w.name === name) || WASTE_TYPES[0];
}

// Returns a transparent estimate of process outputs from current sensor/input data.
export function estimateProcess(c) {
  const wt = getWasteType(c.waste_type);
  const moistureFrac = clamp(c.moisture / 100, 0, 0.6);
  const dryMass = Math.max(0, (c.load || 0) * (1 - moistureFrac)); // grams
  const biocharMass = dryMass * wt.biocharYield; // grams
  const biocharYieldPct = wt.biocharYield * 100;

  // Operation time grows with moisture, feed mass, and distance from a 450°C target.
  const operationTime = clamp(
    25 + moistureFrac * 70 + (c.load / 1000) * 15 + Math.abs((c.t2 || 0) - 450) / 12,
    15,
    180
  ); // minutes

  // Illustrative energy recovered from pyrolysis gas over the run.
  const energyRecovered = clamp(
    (c.gas_flow || 0) * wt.calorific * operationTime * 0.06,
    0,
    50000
  ); // kJ

  return {
    wasteType: wt,
    biocharMass: Math.round(biocharMass),
    biocharYieldPct: Math.round(biocharYieldPct * 10) / 10,
    operationTime: Math.round(operationTime),
    energyRecovered: Math.round(energyRecovered),
    dryMass: Math.round(dryMass),
  };
}

// AgriLoop Efficiency Score — equal-weighted placeholder (weights pending experiments).
export function computeEfficiencyScore(c, est) {
  const yieldScore = clamp((est.biocharMass / Math.max(c.load || 1, 1)) / 0.4 * 100, 0, 100);
  const energyScore = clamp((est.energyRecovered / Math.max(est.operationTime * 50, 1)) * 100, 0, 100);
  const temps = [c.t1, c.t2, c.t3].filter((v) => typeof v === "number");
  const spread = temps.length ? Math.max(...temps) - Math.min(...temps) : 0;
  const stabilityScore = clamp(100 - spread / 4, 0, 100);
  const emissionScore = clamp(100 - (c.emission || 0) / 5, 0, 100);

  const factors = [
    { key: "Biochar Yield", value: Math.round(yieldScore), color: "#2E8B57" },
    { key: "Energy Recovery", value: Math.round(energyScore), color: "#F4B942" },
    { key: "Process Stability", value: Math.round(stabilityScore), color: "#4FD1C5" },
    { key: "Emission Control", value: Math.round(emissionScore), color: "#12372A" },
  ];
  const score = Math.round(factors.reduce((s, f) => s + f.value, 0) / factors.length);
  return { score, factors };
}

// Energy recovery from gas composition (illustrative).
export function estimateEnergyFromGas({ gas_flow = 0, ch4 = 0, co = 0, h2 = 0, minutes = 30 }) {
  // Approximate heat of combustion contributions (illustrative kJ/L).
  const heat = (ch4 * 33 + co * 12 + h2 * 11) / 100;
  const recovered = clamp(gas_flow * minutes * heat * 0.6, 0, 50000);
  return Math.round(recovered);
}