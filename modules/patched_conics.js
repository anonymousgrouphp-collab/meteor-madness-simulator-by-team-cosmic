export function calculateSphereOfInfluence(semiMajorAxisM, secondaryMassKg, primaryMassKg) {
    return semiMajorAxisM * Math.pow(secondaryMassKg / primaryMassKg, 0.4);
}
