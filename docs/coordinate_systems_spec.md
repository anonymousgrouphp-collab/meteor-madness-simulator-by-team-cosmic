# Coordinate Systems & Projections Specification

## 1. Earth-Centered Earth-Fixed (ECEF)
Positions in orbit and upper atmosphere are resolved in Cartesian space:
- Origin: Earth Center of Mass
- Z-Axis: True geographic North Pole
- X-Axis: Intersection of Prime Meridian and Equator

## 2. Orthographic Viewport Mapping
For rendering the spherical Earth globe onto the 2D HTML5 canvas viewport:
$$x = R \cos(\phi) \sin(\lambda - \lambda_0)$$
$$y = -R [\cos(\phi_0) \sin(\phi) - \sin(\phi_0) \cos(\phi) \cos(\lambda - \lambda_0)]$$
Where $\cos(c) \ge 0$ defines the visible front hemisphere.
