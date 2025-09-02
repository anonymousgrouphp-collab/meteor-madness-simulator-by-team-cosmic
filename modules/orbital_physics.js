/**
 * Orbital Physics Module
 * Implements Keplerian orbital state vectors and vis-viva velocity calculations
 * for celestial body trajectory simulation.
 */

export const GRAVITATIONAL_CONSTANT = 6.67430e-11; // m^3 kg^-1 s^-2
export const EARTH_MASS = 5.9722e24; // kg
export const EARTH_RADIUS_METERS = 6371000; // m
export const EARTH_MU = GRAVITATIONAL_CONSTANT * EARTH_MASS; // ~3.986004418e14 m^3 s^-2

/**
 * Calculates instantaneous orbital velocity using the Vis-Viva equation:
 * v^2 = GM * (2/r - 1/a)
 * 
 * @param {number} r - Distance from the center of mass (meters)
 * @param {number} a - Semi-major axis of the orbit (meters)
 * @param {number} mu - Standard gravitational parameter (m^3/s^2)
 * @returns {number} Orbital velocity in m/s
 */
export function calculateVisVivaVelocity(r, a, mu = EARTH_MU) {
    if (r <= 0) throw new Error("Orbital radius must be strictly positive");
    const vSquared = mu * ((2 / r) - (1 / a));
    return vSquared > 0 ? Math.sqrt(vSquared) : 0;
}

/**
 * Calculates escape velocity at a given distance from Earth center.
 * v_esc = sqrt(2 * GM / r)
 */
export function calculateEscapeVelocity(r, mu = EARTH_MU) {
    if (r <= 0) throw new Error("Distance must be strictly positive");
    return Math.sqrt((2 * mu) / r);
}

/**
 * Calculates circular orbit velocity at a given orbital radius.
 * v_circ = sqrt(GM / r)
 */
export function calculateCircularVelocity(r, mu = EARTH_MU) {
    if (r <= 0) throw new Error("Distance must be strictly positive");
    return Math.sqrt(mu / r);
}
