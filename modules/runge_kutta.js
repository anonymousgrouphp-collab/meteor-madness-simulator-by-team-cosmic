/**
 * Runge-Kutta 4th Order (RK4) Numerical Integrator
 * Provides high-order numerical integration for non-linear orbital and entry equations,
 * eliminating the truncation drift common to basic Euler integration.
 */

export class RK4Integrator {
    /**
     * Advances a 1D or vector state using 4th-order Runge-Kutta.
     * 
     * @param {number} t - Current time
     * @param {number} y - Current state value
     * @param {number} dt - Time step delta
     * @param {Function} derivativeFn - Function f(t, y) returning dy/dt
     * @returns {number} Updated state value at t + dt
     */
    static step(t, y, dt, derivativeFn) {
        const k1 = derivativeFn(t, y);
        const k2 = derivativeFn(t + 0.5 * dt, y + 0.5 * dt * k1);
        const k3 = derivativeFn(t + 0.5 * dt, y + 0.5 * dt * k2);
        const k4 = derivativeFn(t + dt, y + dt * k3);

        return y + (dt / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
    }

    /**
     * Vector step for [x, y, vx, vy] state vector.
     */
    static stepStateVector(t, state, dt, derivativeVectorFn) {
        const k1 = derivativeVectorFn(t, state);
        
        const stateK2 = state.map((val, idx) => val + 0.5 * dt * k1[idx]);
        const k2 = derivativeVectorFn(t + 0.5 * dt, stateK2);

        const stateK3 = state.map((val, idx) => val + 0.5 * dt * k2[idx]);
        const k3 = derivativeVectorFn(t + 0.5 * dt, stateK3);

        const stateK4 = state.map((val, idx) => val + dt * k3[idx]);
        const k4 = derivativeVectorFn(t + dt, stateK4);

        return state.map((val, idx) => val + (dt / 6.0) * (k1[idx] + 2.0 * k2[idx] + 2.0 * k3[idx] + k4[idx]));
    }
}
