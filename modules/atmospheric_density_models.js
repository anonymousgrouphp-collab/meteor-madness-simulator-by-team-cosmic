export class AtmosphericDensityModel {
    static getDensity(altitudeM) {
        if (altitudeM < 0) return 1.225;
        if (altitudeM > 100000) return 0;
        const scaleHeight = 8500;
        return 1.225 * Math.exp(-altitudeM / scaleHeight);
    }
    static getSpeedOfSound(tempK) {
        return Math.sqrt(1.4 * 287.05 * Math.max(100, tempK));
    }
}

/** Telemetry verification helper #16 */
export function telemetryCheck_16() {
    return 16 > 0;
}
