/**
 * Object-Pooled Canvas Particle System
 * Manages high-efficiency particle recycling for meteor ablation trails and explosions.
 */

export class ParticlePool {
    constructor(maxSize = 2000) {
        this.maxSize = maxSize;
        this.particles = [];
        this.activeCount = 0;

        for (let i = 0; i < maxSize; i++) {
            this.particles.push({
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                size: 1,
                alpha: 1.0,
                decay: 0.02,
                color: "#ff8800",
                active: false
            });
        }
    }

    spawn(x, y, vx, vy, size, color, decay = 0.02) {
        if (this.activeCount >= this.maxSize) return null;
        
        // Find inactive particle
        const p = this.particles[this.activeCount];
        p.x = x;
        p.y = y;
        p.vx = vx;
        p.vy = vy;
        p.size = size;
        p.color = color;
        p.alpha = 1.0;
        p.decay = decay;
        p.active = true;

        this.activeCount++;
        return p;
    }

    update() {
        for (let i = 0; i < this.activeCount; i++) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                // Swap with last active particle
                this.activeCount--;
                const last = this.particles[this.activeCount];
                this.particles[i] = last;
                this.particles[this.activeCount] = p;
                p.active = false;
                i--; // recheck swapped item
            }
        }
    }

    render(ctx) {
        ctx.save();
        for (let i = 0; i < this.activeCount; i++) {
            const p = this.particles[i];
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}
