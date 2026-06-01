const MOD = 0x1000000;
const MULT = 999983;
const BASE_OFFSET = (() => {
    const targetHex = 0xBF235E;
    const targetDiv = 42;
    const hash = getStationHash("O");
    let offset = (targetHex - (targetDiv * MULT) - hash) % MOD;
    // Ensure positive modulo result
    if (offset < 0) offset += MOD;
    console.log("BASE_OFFSET: " + offset.toString(16).toUpperCase().padStart(6, '0'));
    return offset;
})();

let a = MULT, b = MOD, x0 = 1, x1 = 0;
while (b) {
    let q = Math.floor(a / b);
    [a, b, x0, x1] = [b, a - q * b, x1, x0 - q * x1];
}
const INV_MULT = ((x0 % MOD) + MOD) % MOD;

const toHex = n => n.toString(16).toUpperCase().padStart(6, '0');
const toInt = s => parseInt(s.trim().toUpperCase().replace(/^#/, ''), 16);

function getStationHash(name) {
    let str = name.trim().toUpperCase();
    if (str.length === 0) return 0;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash | 0;
    }
    return Math.abs(hash) % MOD;
}

function getStationOffset(name) {
    return (BASE_OFFSET + getStationHash(name)) % MOD;
}

function normalize(s) {
    let t = s.trim();
    return t === "" ? "Unknown" : t;
}

function encode(stationRaw, div) {
    let station = normalize(stationRaw);
    let offset = getStationOffset(station);
    return toHex((div * MULT + offset) % MOD);
}

function decode(stationRaw, hexStr) {
    let station = normalize(stationRaw);
    let offset = getStationOffset(station);
    let num = toInt(hexStr);
    let raw = ((num - offset) % MOD + MOD) % MOD;
    return (raw * INV_MULT) % MOD % 100;
}

function getLuminance(hexColor) {
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b);
}

function formatDiv(n) { return n.toString().padStart(2, '0'); }

window.HexConv = {
    encode,
    decode,
    toHex,
    getLuminance,
    formatDiv,
    normalize
};