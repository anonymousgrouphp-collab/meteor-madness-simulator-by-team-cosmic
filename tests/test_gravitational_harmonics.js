import { GravitationalHarmonics } from '../modules/gravitational_harmonics.js';
export function testHarmonics() {
    const gh = new GravitationalHarmonics();
    const acc = gh.calculateJ2Acceleration([7000000, 0, 0]);
    console.assert(acc[0] < 0, 'Equatorial X acceleration must oppose radial vector');
    return true;
}
