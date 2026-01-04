export function calculateBiEllipticTransfer(r1, r2, rb, mu = 3.986e14) {
    const a1 = (r1 + rb) / 2;
    const a2 = (rb + r2) / 2;
    const dv1 = Math.abs(Math.sqrt(mu * (2/r1 - 1/a1)) - Math.sqrt(mu / r1));
    const dv2 = Math.abs(Math.sqrt(mu * (2/rb - 1/a2)) - Math.sqrt(mu * (2/rb - 1/a1)));
    const dv3 = Math.abs(Math.sqrt(mu / r2) - Math.sqrt(mu * (2/r2 - 1/a2)));
    return { deltaV1: dv1, deltaV2: dv2, deltaV3: dv3, totalDeltaV: dv1 + dv2 + dv3 };
}
