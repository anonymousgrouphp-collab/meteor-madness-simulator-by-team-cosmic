/**
 * Ablation Assertion Tests
 */

import { calculateMassAblationRate } from '../modules/thermal_ablation.js';

export function runAblationTests() {
    console.log("Running Ablation Tests...");
    const rate = calculateMassAblationRate(0.01, 15000, 3.14);
    if (rate <= 0) throw new Error("Ablation rate must be strictly positive during hypersonic flight");
    console.log("[PASS] Ablation calculation valid: " + rate.toFixed(1) + " kg/s");
}
