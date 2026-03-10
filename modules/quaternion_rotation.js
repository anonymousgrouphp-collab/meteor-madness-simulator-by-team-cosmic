export class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) { this.w = w; this.x = x; this.y = y; this.z = z; }
    multiply(q) {
        return new Quaternion(
            this.w*q.w - this.x*q.x - this.y*q.y - this.z*q.z,
            this.w*q.x + this.x*q.w + this.y*q.z - this.z*q.y,
            this.w*q.y - this.x*q.z + this.y*q.w + this.z*q.x,
            this.w*q.z + this.x*q.y - this.y*q.x + this.z*q.w
        );
    }
}
