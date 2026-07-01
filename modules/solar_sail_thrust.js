export function calculateSolarSailThrust(sailAreaM2, distanceAU, pitchAngleDeg) {
    const rad = (pitchAngleDeg * Math.PI) / 180;
    const pressure = 9.08e-6 / (distanceAU * distanceAU);
    return 2 * pressure * sailAreaM2 * Math.pow(Math.cos(rad), 2);
}
