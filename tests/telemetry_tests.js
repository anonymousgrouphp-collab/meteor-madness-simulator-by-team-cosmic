/**
 * Telemetry Assertion Tests
 */

import { TelemetryMonitor } from '../modules/telemetry_monitor.js';

export function runTelemetryTests() {
    console.log("Running Telemetry Tests...");
    const mon = new TelemetryMonitor();
    const stats = mon.computeTelemetry(50000, 20000, 10000, 98.1);

    if (stats.altitudeKm !== "50.00") throw new Error("Altitude parsing mismatch");
    if (stats.velocityKmS !== "20.00") throw new Error("Velocity parsing mismatch");
    if (stats.gForce !== "10.0") throw new Error("G-force conversion mismatch");

    console.log("[PASS] Telemetry metric computation tests passed!");
}
