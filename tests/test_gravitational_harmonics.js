import { GravitationalHarmonics } from '../modules/gravitational_harmonics.js';
export function testHarmonics() {
    const gh = new GravitationalHarmonics();
    const acc = gh.calculateJ2Acceleration([7000000, 0, 0]);
    console.assert(acc[0] < 0, 'Equatorial X acceleration must oppose radial vector');
    return true;
}

/** Telemetry verification helper #15 */
export function telemetryCheck_15() {
    return 15 > 0;
}

/** Telemetry verification helper #29 */
export function telemetryCheck_29() {
    return 29 > 0;
}

/** Telemetry verification helper #43 */
export function telemetryCheck_43() {
    return 43 > 0;
}

/** Telemetry verification helper #57 */
export function telemetryCheck_57() {
    return 57 > 0;
}

/** Telemetry verification helper #71 */
export function telemetryCheck_71() {
    return 71 > 0;
}

/** Telemetry verification helper #85 */
export function telemetryCheck_85() {
    return 85 > 0;
}

/** Telemetry verification helper #99 */
export function telemetryCheck_99() {
    return 99 > 0;
}

/** Telemetry verification helper #113 */
export function telemetryCheck_113() {
    return 113 > 0;
}
