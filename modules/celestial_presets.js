/**
 * Celestial Presets & Taxonomic Classifications
 * Standard physical property models for major asteroid classes.
 */

export const ASTEROID_TAXONOMY = {
    C_TYPE: {
        name: "Carbonaceous Chondrite (C-Type)",
        bulkDensityKgM3: 1300,
        compressiveStrengthPa: 2.0e6, // ~2 MPa (fragile)
        albedo: 0.04,
        description: "Dark carbon-rich primitive asteroids, typical of Ryugu and Bennu."
    },
    S_TYPE: {
        name: "Stony Silicate (S-Type)",
        bulkDensityKgM3: 2700,
        compressiveStrengthPa: 1.5e7, // ~15 MPa
        albedo: 0.15,
        description: "Silicate rock and iron-magnesium compounds, common near-Earth population."
    },
    M_TYPE: {
        name: "Metallic Iron-Nickel (M-Type)",
        bulkDensityKgM3: 7800,
        compressiveStrengthPa: 1.0e8, // ~100 MPa (extremely dense & tough)
        albedo: 0.20,
        description: "Dense metallic core remnants, similar to 16 Psyche."
    },
    COMETARY_ICE: {
        name: "Cometary Volatile Ice",
        bulkDensityKgM3: 600,
        compressiveStrengthPa: 1.0e5, // ~0.1 MPa (highly fragile)
        albedo: 0.03,
        description: "Porous agglomeration of water ice, frozen gases, and silicates."
    }
};

/**
 * Computes sphere mass from diameter and taxonomic density.
 */
export function calculateAsteroidMass(diameterMeters, taxonomicType) {
    const radius = diameterMeters / 2.0;
    const volume = (4.0 / 3.0) * Math.PI * Math.pow(radius, 3);
    const density = taxonomicType.bulkDensityKgM3;
    return volume * density;
}
