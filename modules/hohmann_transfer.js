export function calculateHohmannTransfer(r1, r2, mu = 3.986e14) {
    const aTransfer = (r1 + r2) / 2.0;
    const v1 = Math.sqrt(mu / r1);
    const vTransfer1 = Math.sqrt(mu * (2/r1 - 1/aTransfer));
    const deltaV1 = Math.abs(vTransfer1 - v1);
    const v2 = Math.sqrt(mu / r2);
    const vTransfer2 = Math.sqrt(mu * (2/r2 - 1/aTransfer));
    const deltaV2 = Math.abs(v2 - vTransfer2);
    const transferTime = Math.PI * Math.sqrt(Math.pow(aTransfer, 3) / mu);
    return { deltaV1, deltaV2, totalDeltaV: deltaV1 + deltaV2, transferTimeSec: transferTime };
}
