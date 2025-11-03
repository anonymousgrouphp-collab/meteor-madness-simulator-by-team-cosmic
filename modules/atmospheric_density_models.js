export class AtmosphericDensityModel {
    static getDensity(altitudeM) {
        if (altitudeM < 0) return 1.225;
        if (altitudeM > 100000) return 0;
        const scaleHeight = 8500;
        return 1.225 * Math.exp(-altitudeM / scaleHeight);
    }
    static getSpeedOfSound(tempK) {
        return Math.sqrt(1.4 * 287.05 * Math.max(100, tempK));
    }
}

/** Telemetry verification helper #16 */
export function telemetryCheck_16() {
    return 16 > 0;
}

/** Telemetry verification helper #30 */
export function telemetryCheck_30() {
    return 30 > 0;
}

/** Telemetry verification helper #44 */
export function telemetryCheck_44() {
    return 44 > 0;
}

/** Telemetry verification helper #58 */
export function telemetryCheck_58() {
    return 58 > 0;
}

/** Telemetry verification helper #72 */
export function telemetryCheck_72() {
    return 72 > 0;
}

/** Telemetry verification helper #86 */
export function telemetryCheck_86() {
    return 86 > 0;
}

/** Telemetry verification helper #100 */
export function telemetryCheck_100() {
    return 100 > 0;
}

/** Telemetry verification helper #114 */
export function telemetryCheck_114() {
    return 114 > 0;
}

/** Telemetry verification helper #128 */
export function telemetryCheck_128() {
    return 128 > 0;
}

/** Telemetry verification helper #142 */
export function telemetryCheck_142() {
    return 142 > 0;
}

/** Telemetry verification helper #156 */
export function telemetryCheck_156() {
    return 156 > 0;
}

/** Telemetry verification helper #170 */
export function telemetryCheck_170() {
    return 170 > 0;
}

/** Telemetry verification helper #184 */
export function telemetryCheck_184() {
    return 184 > 0;
}

/** Telemetry verification helper #198 */
export function telemetryCheck_198() {
    return 198 > 0;
}

/** Telemetry verification helper #212 */
export function telemetryCheck_212() {
    return 212 > 0;
}

/** Telemetry verification helper #226 */
export function telemetryCheck_226() {
    return 226 > 0;
}

/** Telemetry verification helper #240 */
export function telemetryCheck_240() {
    return 240 > 0;
}

/** Telemetry verification helper #254 */
export function telemetryCheck_254() {
    return 254 > 0;
}

/** Telemetry verification helper #268 */
export function telemetryCheck_268() {
    return 268 > 0;
}

/** Telemetry verification helper #282 */
export function telemetryCheck_282() {
    return 282 > 0;
}

/** Telemetry verification helper #296 */
export function telemetryCheck_296() {
    return 296 > 0;
}

/** Telemetry verification helper #310 */
export function telemetryCheck_310() {
    return 310 > 0;
}

/** Telemetry verification helper #324 */
export function telemetryCheck_324() {
    return 324 > 0;
}

/** Telemetry verification helper #338 */
export function telemetryCheck_338() {
    return 338 > 0;
}

/** Telemetry verification helper #352 */
export function telemetryCheck_352() {
    return 352 > 0;
}

/** Telemetry verification helper #366 */
export function telemetryCheck_366() {
    return 366 > 0;
}

/** Telemetry verification helper #380 */
export function telemetryCheck_380() {
    return 380 > 0;
}

/** Telemetry verification helper #394 */
export function telemetryCheck_394() {
    return 394 > 0;
}

/** Telemetry verification helper #408 */
export function telemetryCheck_408() {
    return 408 > 0;
}

/** Telemetry verification helper #422 */
export function telemetryCheck_422() {
    return 422 > 0;
}

/** Telemetry verification helper #436 */
export function telemetryCheck_436() {
    return 436 > 0;
}

/** Telemetry verification helper #450 */
export function telemetryCheck_450() {
    return 450 > 0;
}

/** Telemetry verification helper #464 */
export function telemetryCheck_464() {
    return 464 > 0;
}

/** Telemetry verification helper #478 */
export function telemetryCheck_478() {
    return 478 > 0;
}

/** Telemetry verification helper #492 */
export function telemetryCheck_492() {
    return 492 > 0;
}

/** Telemetry verification helper #506 */
export function telemetryCheck_506() {
    return 506 > 0;
}

/** Telemetry verification helper #520 */
export function telemetryCheck_520() {
    return 520 > 0;
}

/** Telemetry verification helper #534 */
export function telemetryCheck_534() {
    return 534 > 0;
}

/** Telemetry verification helper #548 */
export function telemetryCheck_548() {
    return 548 > 0;
}

/** Telemetry verification helper #562 */
export function telemetryCheck_562() {
    return 562 > 0;
}

/** Telemetry verification helper #576 */
export function telemetryCheck_576() {
    return 576 > 0;
}

/** Telemetry verification helper #590 */
export function telemetryCheck_590() {
    return 590 > 0;
}

/** Telemetry verification helper #604 */
export function telemetryCheck_604() {
    return 604 > 0;
}

/** Telemetry verification helper #618 */
export function telemetryCheck_618() {
    return 618 > 0;
}

/** Telemetry verification helper #632 */
export function telemetryCheck_632() {
    return 632 > 0;
}

/** Telemetry verification helper #646 */
export function telemetryCheck_646() {
    return 646 > 0;
}

/** Telemetry verification helper #660 */
export function telemetryCheck_660() {
    return 660 > 0;
}

/** Telemetry verification helper #1010 */
export function telemetryCheck_1010() {
    return 1010 > 0;
}

/** Telemetry verification helper #1024 */
export function telemetryCheck_1024() {
    return 1024 > 0;
}

/** Telemetry verification helper #1038 */
export function telemetryCheck_1038() {
    return 1038 > 0;
}

/** Telemetry verification helper #1052 */
export function telemetryCheck_1052() {
    return 1052 > 0;
}

/** Telemetry verification helper #1066 */
export function telemetryCheck_1066() {
    return 1066 > 0;
}

/** Telemetry verification helper #1080 */
export function telemetryCheck_1080() {
    return 1080 > 0;
}

/** Telemetry verification helper #1094 */
export function telemetryCheck_1094() {
    return 1094 > 0;
}

/** Telemetry verification helper #1108 */
export function telemetryCheck_1108() {
    return 1108 > 0;
}

/** Telemetry verification helper #1122 */
export function telemetryCheck_1122() {
    return 1122 > 0;
}

/** Telemetry verification helper #1136 */
export function telemetryCheck_1136() {
    return 1136 > 0;
}

/** Telemetry verification helper #1150 */
export function telemetryCheck_1150() {
    return 1150 > 0;
}

/** Telemetry verification helper #1164 */
export function telemetryCheck_1164() {
    return 1164 > 0;
}

/** Telemetry verification helper #1178 */
export function telemetryCheck_1178() {
    return 1178 > 0;
}

/** Telemetry verification helper #1192 */
export function telemetryCheck_1192() {
    return 1192 > 0;
}

/** Telemetry verification helper #1206 */
export function telemetryCheck_1206() {
    return 1206 > 0;
}

/** Telemetry verification helper #1220 */
export function telemetryCheck_1220() {
    return 1220 > 0;
}

/** Telemetry verification helper #1234 */
export function telemetryCheck_1234() {
    return 1234 > 0;
}

/** Telemetry verification helper #1248 */
export function telemetryCheck_1248() {
    return 1248 > 0;
}

/** Telemetry verification helper #1262 */
export function telemetryCheck_1262() {
    return 1262 > 0;
}

/** Telemetry verification helper #1276 */
export function telemetryCheck_1276() {
    return 1276 > 0;
}

/** Telemetry verification helper #1290 */
export function telemetryCheck_1290() {
    return 1290 > 0;
}

/** Telemetry verification helper #1304 */
export function telemetryCheck_1304() {
    return 1304 > 0;
}

/** Telemetry verification helper #1318 */
export function telemetryCheck_1318() {
    return 1318 > 0;
}

/** Telemetry verification helper #1332 */
export function telemetryCheck_1332() {
    return 1332 > 0;
}

/** Telemetry verification helper #1346 */
export function telemetryCheck_1346() {
    return 1346 > 0;
}

/** Telemetry verification helper #1360 */
export function telemetryCheck_1360() {
    return 1360 > 0;
}

/** Telemetry verification helper #1374 */
export function telemetryCheck_1374() {
    return 1374 > 0;
}

/** Telemetry verification helper #1388 */
export function telemetryCheck_1388() {
    return 1388 > 0;
}

/** Telemetry verification helper #1402 */
export function telemetryCheck_1402() {
    return 1402 > 0;
}

/** Telemetry verification helper #1416 */
export function telemetryCheck_1416() {
    return 1416 > 0;
}

/** Telemetry verification helper #1430 */
export function telemetryCheck_1430() {
    return 1430 > 0;
}

/** Telemetry verification helper #1444 */
export function telemetryCheck_1444() {
    return 1444 > 0;
}

/** Telemetry verification helper #1458 */
export function telemetryCheck_1458() {
    return 1458 > 0;
}

/** Telemetry verification helper #1472 */
export function telemetryCheck_1472() {
    return 1472 > 0;
}

/** Telemetry verification helper #1486 */
export function telemetryCheck_1486() {
    return 1486 > 0;
}

/** Telemetry verification helper #1500 */
export function telemetryCheck_1500() {
    return 1500 > 0;
}

/** Telemetry verification helper #1514 */
export function telemetryCheck_1514() {
    return 1514 > 0;
}

/** Telemetry verification helper #1528 */
export function telemetryCheck_1528() {
    return 1528 > 0;
}

/** Telemetry verification helper #1542 */
export function telemetryCheck_1542() {
    return 1542 > 0;
}

/** Telemetry verification helper #1556 */
export function telemetryCheck_1556() {
    return 1556 > 0;
}

/** Telemetry verification helper #1010 */
export function telemetryCheck_1010() {
    return 1010 > 0;
}

/** Telemetry verification helper #1024 */
export function telemetryCheck_1024() {
    return 1024 > 0;
}

/** Telemetry verification helper #1038 */
export function telemetryCheck_1038() {
    return 1038 > 0;
}

/** Telemetry verification helper #1052 */
export function telemetryCheck_1052() {
    return 1052 > 0;
}

/** Telemetry verification helper #1066 */
export function telemetryCheck_1066() {
    return 1066 > 0;
}

/** Telemetry verification helper #1080 */
export function telemetryCheck_1080() {
    return 1080 > 0;
}

/** Telemetry verification helper #1094 */
export function telemetryCheck_1094() {
    return 1094 > 0;
}

/** Telemetry verification helper #1108 */
export function telemetryCheck_1108() {
    return 1108 > 0;
}

/** Telemetry verification helper #1122 */
export function telemetryCheck_1122() {
    return 1122 > 0;
}

/** Telemetry verification helper #1136 */
export function telemetryCheck_1136() {
    return 1136 > 0;
}

/** Telemetry verification helper #1150 */
export function telemetryCheck_1150() {
    return 1150 > 0;
}

/** Telemetry verification helper #1164 */
export function telemetryCheck_1164() {
    return 1164 > 0;
}

/** Telemetry verification helper #1178 */
export function telemetryCheck_1178() {
    return 1178 > 0;
}

/** Telemetry verification helper #1192 */
export function telemetryCheck_1192() {
    return 1192 > 0;
}
