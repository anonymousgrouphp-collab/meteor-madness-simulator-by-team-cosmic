export function calculateRadarCrossSection(diameterM, radarAlbedo = 0.14) {
    const geometricArea = Math.PI * Math.pow(diameterM / 2, 2);
    return geometricArea * radarAlbedo;
}
