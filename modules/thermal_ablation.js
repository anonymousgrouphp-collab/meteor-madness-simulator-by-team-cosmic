/**
 * Thermal Ablation & Mass Loss Module
 * Computes vaporization rate during hypersonic atmospheric entry.
 */

export const HEAT_OF_ABLATION_SILICATE = 6.0e6; // J/kg

/**
 * Calculates instantaneous mass ablation rate:
 * dm/dt = - (Lambda * rho * A * v^3) / (2 * Q)
 * 
 * @param {number} airDensity - kg/m^3
 * @param {number} velocity - m/s
 * @param {number} crossSectionArea - m^2
 * @param {number} heatTransferCoeff - Lambda (~0.05 - 0.2)
 * @param {number} heatOfAblation - Q in J/kg
 * @returns {number} Mass loss rate in kg/s
 */
export function calculateMassAblationRate(airDensity, velocity, crossSectionArea, heatTransferCoeff = 0.1, heatOfAblation = HEAT_OF_ABLATION_SILICATE) {
    const energyFlux = 0.5 * heatTransferCoeff * airDensity * crossSectionArea * Math.pow(velocity, 3);
    return energyFlux / heatOfAblation;
}
