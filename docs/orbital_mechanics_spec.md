# Keplerian Orbital Mechanics Specification

## Overview
This specification details the mathematical formulas employed in the orbital dynamics
engine of the Meteor Madness simulator.

## 1. Vis-Viva Equation
The vis-viva equation governs the speed of an orbiting celestial body at any point in its Keplerian orbit:

$$v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$$

Where:
- $v$: Orbital velocity of the secondary body (m/s)
- $\mu = GM$: Standard gravitational parameter ($3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$ for Earth)
- $r$: Current radial distance from the primary focus (m)
- $a$: Semi-major axis of the orbit (m)

## 2. Velocity Regimes
- **Circular Orbit ($r = a$):**
  $$v_{circ} = \sqrt{\frac{\mu}{r}}$$
- **Escape Velocity ($a \to \infty$):**
  $$v_{esc} = \sqrt{\frac{2\mu}{r}} = \sqrt{2} \cdot v_{circ}$$
- **Hyperbolic Trajectory ($a < 0$):**
  $$v_{hyp} = \sqrt{\mu \left( \frac{2}{r} + \frac{1}{|a|} \right)}$$
