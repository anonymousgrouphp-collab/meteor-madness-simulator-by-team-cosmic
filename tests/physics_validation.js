/**
 * Physics Validation Suite
 * Validates Keplerian velocities, atmospheric density, and RK4 integrator precision.
 */

import { calculateCircularVelocity, calculateEscapeVelocity, EARTH_RADIUS_METERS } from '../modules/orbital_physics.js';
import { getAtmosphericDensity } from '../modules/atmospheric_drag.js';
import { RK4Integrator } from '../modules/runge_kutta.js';

function assertApprox(actual, expected, tolerance = 0.01, testName = "") {
    const diff = Math.abs(actual - expected);
    const maxDiff = Math.abs(expected * tolerance);
    if (diff > maxDiff) {
        throw new Error(`[FAIL] ${testName}: expected ~${expected}, got ${actual} (diff: ${diff})`);
    }
    console.log(`[PASS] ${testName}`);
}

export function runPhysicsTests() {
    console.log("Running Physics Validation Tests...");

    // 1. Low Earth Orbit (~400 km) circular speed should be ~7.67 km/s
    const rLeo = EARTH_RADIUS_METERS + 400000;
    const vLeo = calculateCircularVelocity(rLeo);
    assertApprox(vLeo, 7670, 0.02, "LEO Circular Velocity (~7.67 km/s)");

    // 2. Earth surface escape velocity should be ~11.19 km/s
    const vEsc = calculateEscapeVelocity(EARTH_RADIUS_METERS);
    assertApprox(vEsc, 11186, 0.01, "Earth Surface Escape Velocity (~11.19 km/s)");

    // 3. Sea level atmospheric density should match standard 1.225 kg/m^3
    const rho0 = getAtmosphericDensity(0);
    assertApprox(rho0, 1.225, 0.001, "Sea Level Air Density (1.225 kg/m^3)");

    // 4. Test RK4 integrator on simple exponential decay dy/dt = -y
    const y0 = 1.0;
    const dt = 0.1;
    const y1 = RK4Integrator.step(0, y0, dt, (t, y) => -y);
    const analyticalY1 = Math.exp(-0.1);
    assertApprox(y1, analyticalY1, 0.0001, "RK4 Numerical Accuracy on exp(-t)");

    console.log("All physics validation tests passed successfully!");
}
