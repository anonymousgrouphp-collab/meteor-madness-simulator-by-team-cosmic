export function calculateGravityGradientTorque(mu, r, Ix, Iy, Iz) {
    return (3 * mu / (2 * Math.pow(r, 3))) * (Iz - Ix);
}
