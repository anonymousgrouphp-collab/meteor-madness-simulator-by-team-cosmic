export function calculateBreakupSpinPeriod(densityKgM3) {
    const G = 6.6743e-11;
    const criticalOmega = Math.sqrt((4/3) * Math.PI * G * densityKgM3);
    return (2 * Math.PI) / criticalOmega; // seconds (~2.2 hours barrier)
}
