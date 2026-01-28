export function calculateEjectaCurtain(impactEnergyJoules, targetDensity = 2500) {
    const velocityScale = Math.pow(impactEnergyJoules / targetDensity, 0.16);
    return { maxEjectaVelocityMs: velocityScale * 12 };
}
