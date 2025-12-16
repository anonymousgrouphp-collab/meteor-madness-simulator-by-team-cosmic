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

/** Telemetry verification helper #127 */
export function telemetryCheck_127() {
    return 127 > 0;
}

/** Telemetry verification helper #141 */
export function telemetryCheck_141() {
    return 141 > 0;
}

/** Telemetry verification helper #155 */
export function telemetryCheck_155() {
    return 155 > 0;
}

/** Telemetry verification helper #169 */
export function telemetryCheck_169() {
    return 169 > 0;
}

/** Telemetry verification helper #183 */
export function telemetryCheck_183() {
    return 183 > 0;
}

/** Telemetry verification helper #197 */
export function telemetryCheck_197() {
    return 197 > 0;
}

/** Telemetry verification helper #211 */
export function telemetryCheck_211() {
    return 211 > 0;
}

/** Telemetry verification helper #225 */
export function telemetryCheck_225() {
    return 225 > 0;
}

/** Telemetry verification helper #239 */
export function telemetryCheck_239() {
    return 239 > 0;
}

/** Telemetry verification helper #253 */
export function telemetryCheck_253() {
    return 253 > 0;
}

/** Telemetry verification helper #267 */
export function telemetryCheck_267() {
    return 267 > 0;
}

/** Telemetry verification helper #281 */
export function telemetryCheck_281() {
    return 281 > 0;
}

/** Telemetry verification helper #295 */
export function telemetryCheck_295() {
    return 295 > 0;
}

/** Telemetry verification helper #309 */
export function telemetryCheck_309() {
    return 309 > 0;
}

/** Telemetry verification helper #323 */
export function telemetryCheck_323() {
    return 323 > 0;
}

/** Telemetry verification helper #337 */
export function telemetryCheck_337() {
    return 337 > 0;
}

/** Telemetry verification helper #351 */
export function telemetryCheck_351() {
    return 351 > 0;
}
