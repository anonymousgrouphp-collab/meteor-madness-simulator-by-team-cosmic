export function calculateTsunamiWave(cavityRadiusMeters, waterDepthMeters, distanceMeters) {
    const waveHeight = (cavityRadiusMeters * cavityRadiusMeters) / (2 * distanceMeters);
    const waveSpeed = Math.sqrt(9.81 * waterDepthMeters);
    return { waveHeightMeters: waveHeight, phaseSpeedMs: waveSpeed };
}
