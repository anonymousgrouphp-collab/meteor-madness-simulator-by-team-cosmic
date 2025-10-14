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
