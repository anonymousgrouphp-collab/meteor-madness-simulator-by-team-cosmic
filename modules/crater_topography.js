/**
 * Crater Topography & Morphological Scaling
 */

export function calculateCraterDimensions(finalDiameterMeters) {
    // Simple-to-complex crater transition occurs at ~3.2 km on Earth
    const isComplex = finalDiameterMeters > 3200;
    
    // Depth-to-diameter: ~1/5 for simple craters, ~1/10 to 1/20 for complex craters
    const depthMeters = isComplex 
        ? 1.02 * Math.pow(finalDiameterMeters, 0.301) * 10 
        : finalDiameterMeters / 5.0;

    const rimHeightMeters = 0.04 * finalDiameterMeters;
    const ejectaRadiusMeters = finalDiameterMeters * 2.5;

    return {
        isComplex,
        diameterKm: (finalDiameterMeters / 1000).toFixed(2),
        depthMeters: depthMeters.toFixed(1),
        rimHeightMeters: rimHeightMeters.toFixed(1),
        ejectaRadiusKm: (ejectaRadiusMeters / 1000).toFixed(2)
    };
}
