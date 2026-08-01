export function calculateNuclearStandoffImpulse(yieldMt, standoffDistanceM) {
    const fluence = (yieldMt * 4.184e15 * 0.5) / (4 * Math.PI * standoffDistanceM * standoffDistanceM);
    return fluence * 1e-4;
}
