export function calculateTisserandParameter(semiMajorAxisAU, eccentricity, inclinationDeg, aJupiterAU = 5.2044) {
    const incRad = (inclinationDeg * Math.PI) / 180;
    return (aJupiterAU / semiMajorAxisAU) + 2 * Math.sqrt((semiMajorAxisAU / aJupiterAU) * (1 - eccentricity * eccentricity)) * Math.cos(incRad);
}
