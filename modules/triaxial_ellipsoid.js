export function getTriaxialNormal(x, y, z, a, b, c) {
    return { nx: (2*x)/(a*a), ny: (2*y)/(b*b), nz: (2*z)/(c*c) };
}
