# Canvas Rendering & Particle Pool Optimization

## 1. Zero-Allocation Rendering
Creating Javascript objects (`new Particle()`) inside a 60fps `requestAnimationFrame` loop
triggers frequent V8 Garbage Collection (GC) sweeps resulting in micro-stutters and frame drops.

## 2. Swap-Back Object Pool Strategy
The `ParticlePool` pre-allocates an array of 2,000 particle records during initialization.
Active particles are kept contiguously at the front of the array. When a particle expires,
it is swapped with the last active element in $O(1)$ time without memory reallocation.
