/**
 * Geodetic & Viewport Projection Math
 * Transforms Latitude, Longitude, and Altitude to canvas Cartesian vectors.
 */

export function latLonToCanvas(latDeg, lonDeg, centerLatDeg, centerLonDeg, radiusPx) {
    const latRad = (latDeg * Math.PI) / 180;
    const lonRad = (lonDeg * Math.PI) / 180;
    const centerLatRad = (centerLatDeg * Math.PI) / 180;
    const centerLonRad = (centerLonDeg * Math.PI) / 180;

    // Orthographic spherical projection
    const cosC = Math.sin(centerLatRad) * Math.sin(latRad) + 
                 Math.cos(centerLatRad) * Math.cos(latRad) * Math.cos(lonRad - centerLonRad);

    const isVisible = cosC >= 0;

    const x = radiusPx * Math.cos(latRad) * Math.sin(lonRad - centerLonRad);
    const y = -radiusPx * (Math.cos(centerLatRad) * Math.sin(latRad) - 
                          Math.sin(centerLatRad) * Math.cos(latRad) * Math.cos(lonRad - centerLonRad));

    return { x, y, visible: isVisible };
}
