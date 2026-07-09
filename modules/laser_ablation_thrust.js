export function calculateLaserAblationThrust(laserPowerWatts, couplingCoeff = 2e-5) {
    return laserPowerWatts * couplingCoeff;
}
