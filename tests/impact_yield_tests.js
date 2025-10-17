/**
 * Impact Yield Assertion Tests
 */

import { calculateKineticEnergy, energyToMegatonsTNT, estimateCraterDiameterMeters } from '../modules/blast_damage_model.js';

function assert(condition, message) {
    if (!condition) throw new Error("[FAIL] " + message);
    console.log("[PASS] " + message);
}

export function runImpactTests() {
    console.log("Running Impact Yield Validation Tests...");

    // 10km asteroid at 20km/s (~1.3e15 kg)
    const mass = 1.3e15;
    const velocity = 20000;
    const energyJoules = calculateKineticEnergy(mass, velocity);
    const megatons = energyToMegatonsTNT(energyJoules);

    assert(megatons > 5e7 && megatons < 1e8, "Chicxulub yield falls within ~60-80 million Mt TNT");

    // Crater diameter for 10km impactor
    const craterSize = estimateCraterDiameterMeters(10000, velocity);
    assert(craterSize > 120000 && craterSize < 220000, "Crater diameter matches ~150-180 km crater scale");

    console.log("Impact tests completed successfully!");
}
