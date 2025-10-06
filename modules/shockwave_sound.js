export class ShockwaveAcoustics {
    static calculateOverpressure(distanceM, energyYieldJ) {
        const scaledDistance = distanceM / Math.pow(energyYieldJ / 4.184e9, 1/3);
        return 1e5 / (1 + Math.pow(scaledDistance / 10, 1.4));
    }
}
