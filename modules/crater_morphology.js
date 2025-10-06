export class CraterMorphology {
    static calculateCrater(energyJoules, targetDensity = 2600) {
        const transientRadius = 0.58 * Math.pow(energyJoules, 0.28);
        const finalDiameter = 1.25 * transientRadius * 2;
        return { finalDiameter, depth: finalDiameter / 5 };
    }
}
