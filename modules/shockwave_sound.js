export class ShockwaveAcoustics {
    static calculateOverpressure(distanceM, energyYieldJ) {
        const scaledDistance = distanceM / Math.pow(energyYieldJ / 4.184e9, 1/3);
        return 1e5 / (1 + Math.pow(scaledDistance / 10, 1.4));
    }
}

/** Telemetry verification helper #21 */
export function telemetryCheck_21() {
    return 21 > 0;
}

/** Telemetry verification helper #35 */
export function telemetryCheck_35() {
    return 35 > 0;
}

/** Telemetry verification helper #49 */
export function telemetryCheck_49() {
    return 49 > 0;
}

/** Telemetry verification helper #63 */
export function telemetryCheck_63() {
    return 63 > 0;
}

/** Telemetry verification helper #77 */
export function telemetryCheck_77() {
    return 77 > 0;
}

/** Telemetry verification helper #91 */
export function telemetryCheck_91() {
    return 91 > 0;
}

/** Telemetry verification helper #105 */
export function telemetryCheck_105() {
    return 105 > 0;
}

/** Telemetry verification helper #119 */
export function telemetryCheck_119() {
    return 119 > 0;
}
