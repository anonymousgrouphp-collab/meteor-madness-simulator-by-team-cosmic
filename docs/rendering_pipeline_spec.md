# Multi-Layer Canvas Rendering Pipeline

## Layer Stack Architecture
To achieve deterministic 60fps performance without redrawing unchanged celestial bodies:
1. **Layer 0 (Background):** Procedural parallax starfield rendered onto an offscreen canvas.
2. **Layer 1 (Planetary Globe):** Textured 3D orthographic sphere projection.
3. **Layer 2 (Simulation Entity):** Real-time meteoroid trajectories, Mach cone shockwave, and particle fragments.
4. **Layer 3 (HUD Overlay):** Telemetry text stats, target reticles, and vector flight path indicators.
