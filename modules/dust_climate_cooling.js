export function calculateDustLoading(impactEnergyMegatons) {
    const dustMassTg = 0.01 * Math.pow(impactEnergyMegatons, 0.8);
    return { stratosphericDustMassTg: dustMassTg, opticalDepthDelta: dustMassTg * 0.05 };
}
