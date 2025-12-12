/**
 * Multi-Layer Atmospheric Profile
 * Covers standard lapse rates across Troposphere, Stratosphere, and Mesosphere.
 */

export const ATMOSPHERIC_LAYERS = [
    { name: "Troposphere", baseAltM: 0, topAltM: 11000, lapseRate: -0.0065, baseTempK: 288.15 },
    { name: "Tropopause", baseAltM: 11000, topAltM: 20000, lapseRate: 0.0, baseTempK: 216.65 },
    { name: "Stratosphere 1", baseAltM: 20000, topAltM: 32000, lapseRate: 0.001, baseTempK: 216.65 },
    { name: "Stratosphere 2", baseAltM: 32000, topAltM: 47000, lapseRate: 0.0028, baseTempK: 228.65 },
    { name: "Mesosphere", baseAltM: 47000, topAltM: 71000, lapseRate: -0.0028, baseTempK: 270.65 }
];

export function getTemperatureAtAltitude(altitudeM) {
    for (const layer of ATMOSPHERIC_LAYERS) {
        if (altitudeM >= layer.baseAltM && altitudeM < layer.topAltM) {
            return layer.baseTempK + layer.lapseRate * (altitudeM - layer.baseAltM);
        }
    }
    return 210.0; // Mesopause / upper cutoff default
}
