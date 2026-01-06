export function calculateGravityAssist(vInfIn, b, planetMass, planetRadius, mu) {
    const delta = 2 * Math.atan(mu / (b * vInfIn * vInfIn));
    const periapsis = (mu / (vInfIn * vInfIn)) * (1 / Math.sin(delta / 2) - 1);
    const safe = periapsis > planetRadius;
    return { turnAngleRad: delta, periapsisAltitudeM: periapsis - planetRadius, isSafe: safe };
}
