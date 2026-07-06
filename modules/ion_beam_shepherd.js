export function calculateIonBeamForce(thrustNewtons, distanceM, beamDivergenceDeg) {
    const beamAngleRad = (beamDivergenceDeg * Math.PI) / 180;
    const efficiency = Math.cos(beamAngleRad / 2);
    return thrustNewtons * efficiency;
}
