export class GravitationalHarmonics {
    constructor(mu = 3.986004418e14, re = 6378137.0, j2 = 1.08263e-3) {
        this.mu = mu;
        this.re = re;
        this.j2 = j2;
    }
    calculateJ2Acceleration(r_vec) {
        const [x, y, z] = r_vec;
        const r2 = x*x + y*y + z*z;
        const r = Math.sqrt(r2);
        if (r < this.re) return [0, 0, 0];
        const factor = (1.5 * this.j2 * this.mu * Math.pow(this.re, 2)) / Math.pow(r, 5);
        const z2_r2 = (z*z) / r2;
        return [
            factor * x * (5 * z2_r2 - 1),
            factor * y * (5 * z2_r2 - 1),
            factor * z * (5 * z2_r2 - 3)
        ];
    }
}
