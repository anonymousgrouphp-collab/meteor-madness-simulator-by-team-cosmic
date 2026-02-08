export function calculateThermalRadiation(energyMegatonsTNT, distanceKm) {
    const radiantFlux = (4e14 * energyMegatonsTNT) / (4 * Math.PI * Math.pow(distanceKm * 1000, 2));
    return { radiantExposureJ_m2: radiantFlux };
}
