import { CraterMorphology } from '../modules/crater_morphology.js';
export function testCrater() {
    const res = CraterMorphology.calculateCrater(4.184e15);
    console.assert(res.finalDiameter > 0, 'Final crater diameter must be positive');
    console.assert(res.depth > 0, 'Crater depth must be non-zero');
    return true;
}
