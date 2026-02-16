export function calculateOrbitalResonance(period1, period2) {
    const ratio = period1 / period2;
    return { periodRatio: ratio.toFixed(4) };
}
