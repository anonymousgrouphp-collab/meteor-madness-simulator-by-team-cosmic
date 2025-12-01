/**
 * Hypersonic Shockwave Renderer
 * Draws dynamic Mach cones and blast overpressure rings.
 */

export function drawMachCone(ctx, headX, headY, tailX, tailY, machNumber, baseRadius) {
    if (machNumber <= 1.0) return;

    const machAngle = Math.asin(1.0 / machNumber);
    const length = Math.hypot(headX - tailX, headY - tailY);
    const angle = Math.atan2(headY - tailY, headX - tailX);

    ctx.save();
    ctx.translate(headX, headY);
    ctx.rotate(angle);

    ctx.strokeStyle = "rgba(255, 180, 50, 0.4)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-length, length * Math.tan(machAngle));
    ctx.moveTo(0, 0);
    ctx.lineTo(-length, -length * Math.tan(machAngle));
    ctx.stroke();

    ctx.restore();
}
