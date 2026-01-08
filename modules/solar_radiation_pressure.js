export const SOLAR_CONSTANT_1AU = 1361; // W/m^2
export const SPEED_OF_LIGHT = 299792458; // m/s
export function calculateSolarRadiationPressure(distanceAU, areaM2, reflectivity = 0.1) {
    const flux = SOLAR_CONSTANT_1AU / (distanceAU * distanceAU);
    const pressure = (flux / SPEED_OF_LIGHT) * (1 + reflectivity);
    return pressure * areaM2;
}
