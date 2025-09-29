/**
 * Blast Damage & Energy Yield Model
 * Calculates kinetic energy release, TNT equivalents, and blast overpressure footprints.
 */

export const JOULES_PER_MEGATON_TNT = 4.184e15; // J
export const JOULES_PER_KILOTON_TNT = 4.184e12; // J

/**
 * Calculates kinetic impact energy: E = 0.5 * m * v^2
 * 
 * @param {number} massKg - Mass in kg
 * @param {number} velocityMs - Velocity in m/s
 * @returns {number} Energy in Joules
 */
export function calculateKineticEnergy(massKg, velocityMs) {
    return 0.5 * massKg * velocityMs * velocityMs;
}

/**
 * Converts energy in Joules to Megatons TNT equivalent.
 */
export function energyToMegatonsTNT(energyJoules) {
    return energyJoules / JOULES_PER_MEGATON_TNT;
}

/**
 * Estimates transient crater diameter (Schmidt-Holsapple scaling):
 * D_tc ~= 1.161 * (rho_i / rho_t)^0.33 * D_i^0.78 * v_i^0.44 * g^-0.22
 */
export function estimateCraterDiameterMeters(impactorDiameterM, impactVelocityMs, impactorDensity = 2700, targetDensity = 2500) {
    const g = 9.81;
    const densityRatio = Math.pow(impactorDensity / targetDensity, 0.33);
    const sizeFactor = Math.pow(impactorDiameterM, 0.78);
    const velFactor = Math.pow(impactVelocityMs, 0.44);
    const gravFactor = Math.pow(g, -0.22);
    
    return 1.161 * densityRatio * sizeFactor * velFactor * gravFactor;
}
