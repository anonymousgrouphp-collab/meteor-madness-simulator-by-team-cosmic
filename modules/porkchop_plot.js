export function computePorkchopGrid(launchDates, arrivalDates, deltaVFn) {
    return launchDates.map(l => arrivalDates.map(a => deltaVFn(l, a)));
}
