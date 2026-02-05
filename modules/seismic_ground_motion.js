export function calculateMomentMagnitude(energyJoules, seismicEfficiency = 1e-4) {
    const seismicEnergy = energyJoules * seismicEfficiency;
    return (2.0 / 3.0) * Math.log10(seismicEnergy) - 5.87;
}
