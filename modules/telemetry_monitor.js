/**
 * Telemetry Monitor & Stats Calculator
 * Computes instantaneous dynamic pressure, g-force deceleration, and time-to-impact.
 */

export class TelemetryMonitor {
    constructor() {
        this.records = [];
    }

    computeTelemetry(altitudeM, velocityMs, massKg, decelerationMs2) {
        const dynamicPressureKPa = (0.5 * (massKg / 1000) * velocityMs * velocityMs) / 1e6;
        const gForce = decelerationMs2 / 9.80665;
        const timeToImpactSec = velocityMs > 0 ? altitudeM / velocityMs : 0;

        return {
            altitudeKm: (altitudeM / 1000).toFixed(2),
            velocityKmS: (velocityMs / 1000).toFixed(2),
            gForce: gForce.toFixed(1),
            dynamicPressureKPa: dynamicPressureKPa.toFixed(2),
            timeToImpactSec: timeToImpactSec.toFixed(1)
        };
    }
}
