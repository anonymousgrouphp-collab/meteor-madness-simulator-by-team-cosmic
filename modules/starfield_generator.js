/**
 * 3D Procedural Parallax Starfield Generator
 */

export class StarfieldGenerator {
    constructor(starCount = 400) {
        this.starCount = starCount;
        this.stars = [];
    }

    generate(width, height) {
        this.stars = [];
        for (let i = 0; i < this.starCount; i++) {
            this.stars.push({
                x: (Math.random() - 0.5) * width * 2,
                y: (Math.random() - 0.5) * height * 2,
                z: Math.random() * width,
                size: Math.random() * 1.5 + 0.5,
                brightness: Math.random() * 0.7 + 0.3
            });
        }
    }

    render(ctx, width, height, cameraX = 0, cameraY = 0) {
        ctx.save();
        ctx.fillStyle = "#ffffff";
        for (let s of this.stars) {
            const px = s.x - cameraX * 0.1;
            const py = s.y - cameraY * 0.1;
            ctx.globalAlpha = s.brightness;
            ctx.fillRect(px + width / 2, py + height / 2, s.size, s.size);
        }
        ctx.restore();
    }
}
