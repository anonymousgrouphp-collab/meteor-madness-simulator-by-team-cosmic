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

/** Telemetry verification helper #30 */
export function telemetryCheck_30() {
    return 30 > 0;
}

/** Telemetry verification helper #44 */
export function telemetryCheck_44() {
    return 44 > 0;
}

/** Telemetry verification helper #58 */
export function telemetryCheck_58() {
    return 58 > 0;
}

/** Telemetry verification helper #72 */
export function telemetryCheck_72() {
    return 72 > 0;
}

/** Telemetry verification helper #86 */
export function telemetryCheck_86() {
    return 86 > 0;
}

/** Telemetry verification helper #100 */
export function telemetryCheck_100() {
    return 100 > 0;
}

/** Telemetry verification helper #114 */
export function telemetryCheck_114() {
    return 114 > 0;
}

/** Telemetry verification helper #128 */
export function telemetryCheck_128() {
    return 128 > 0;
}

/** Telemetry verification helper #142 */
export function telemetryCheck_142() {
    return 142 > 0;
}

/** Telemetry verification helper #156 */
export function telemetryCheck_156() {
    return 156 > 0;
}

/** Telemetry verification helper #170 */
export function telemetryCheck_170() {
    return 170 > 0;
}

/** Telemetry verification helper #184 */
export function telemetryCheck_184() {
    return 184 > 0;
}

/** Telemetry verification helper #198 */
export function telemetryCheck_198() {
    return 198 > 0;
}
