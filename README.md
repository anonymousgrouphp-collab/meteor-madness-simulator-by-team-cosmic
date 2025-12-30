# Meteor Madness Simulator (Team Cosmic)

An interactive, high-precision celestial physics simulator and orbital trajectory visualization engine.

## Features
- **High-Precision Orbit Mechanics:** 4th-order Runge-Kutta (RK4) numerical integration for Keplerian trajectories.
- **Hypersonic Aerodynamics:** Barometric exponential atmospheric density model with dynamic drag deceleration.
- **Impact Scaling Laws:** Schmidt-Holsapple transient crater diameter and blast overpressure footprints.
- **Historical Event Presets:** Validated calibration datasets for Chelyabinsk (2013), Tunguska (1908), and Chicxulub (K-Pg).
- **Procedural Audio & Visuals:** Web Audio API sound synthesis, 3D parallax starfield, and zero-allocation particle pools.

## Architecture
- `modules/`: Modular ES6 physics, telemetry, and rendering engines.
- `presets/`: Historical and near-Earth asteroid calibration configurations.
- `docs/`: In-depth mathematical specifications and derivations.
- `tests/`: Automated physics validation and assertions.
