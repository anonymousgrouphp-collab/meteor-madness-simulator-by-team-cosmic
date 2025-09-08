/**
 * Atmospheric Drag & Aerodynamics Module
 * Computes altitude-dependent air density and hypersonic drag forces.
 */

export const SEA_LEVEL_DENSITY = 1.225; // kg/m^3
export const ATMOSPHERIC_SCALE_HEIGHT = 8500; // meters (~8.5 km)

/**
 * Calculates atmospheric density using barometric exponential falloff.
 * rho(h) = rho_0 * exp(-h / H)
 * 
 * @param {number} altitudeMeters - Altitude above sea level in meters
 * @returns {number} Air density in kg/m^3
 */
export function getAtmosphericDensity(altitudeMeters) {
    if (altitudeMeters < 0) return SEA_LEVEL_DENSITY;
    if (altitudeMeters > 120000) return 0; // Karman line & upper mesosphere cutoff
    return SEA_LEVEL_DENSITY * Math.exp(-altitudeMeters / ATMOSPHERIC_SCALE_HEIGHT);
}

/**
 * Computes hypersonic aerodynamic drag force:
 * F_drag = 0.5 * rho * v^2 * C_d * Area
 * 
 * @param {number} density - Air density (kg/m^3)
 * @param {number} velocity - Object velocity (m/s)
 * @param {number} dragCoefficient - Drag coefficient Cd (~1.2 to 2.0 for blunt bodies)
 * @param {number} crossSectionalArea - Effective frontal area (m^2)
 * @returns {number} Drag force in Newtons (N)
 */
export function calculateDragForce(density, velocity, dragCoefficient, crossSectionalArea) {
    return 0.5 * density * velocity * velocity * dragCoefficient * crossSectionalArea;
}

/**
 * Computes instantaneous deceleration due to atmospheric drag:
 * a_drag = F_drag / mass
 */
export function calculateDragDeceleration(density, velocity, dragCoefficient, crossSectionalArea, mass) {
    if (mass <= 0) throw new Error("Mass must be strictly positive");
    const force = calculateDragForce(density, velocity, dragCoefficient, crossSectionalArea);
    return force / mass;
}
