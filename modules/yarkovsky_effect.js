export function calculateYarkovskyDrift(diameterM, bulkDensity, spinRateRadS, thermalInertia) {
    // Semi-major axis drift rate da/dt (AU/Myr)
    const mass = (Math.PI / 6) * Math.pow(diameterM, 3) * bulkDensity;
    const driftRate = (1.5e-4 / (diameterM * bulkDensity)) * (thermalInertia / 200);
    return { da_dt_AU_per_Myr: driftRate };
}
