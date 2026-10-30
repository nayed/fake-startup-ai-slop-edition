/* Seeded randomness shared by the slot machine and Slopr.
   The same seed text always produces the same sequence. */

/* FNV-1a: any string becomes a 32-bit seed. */
export function hashSeed(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/* mulberry32: tiny seeded PRNG returning floats in [0, 1). */
export function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED_CHARS = 'abcdefghijkmnpqrstuvwxyz23456789';

export function randomSeed() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => SEED_CHARS[b % SEED_CHARS.length]).join('');
}

/* A seeded toolkit: rand() in [0, 1), pick(array), int(min, max) inclusive. */
export function seeded(seedText) {
  const rand = mulberry32(hashSeed(seedText));
  return {
    rand,
    pick: (arr) => arr[Math.floor(rand() * arr.length)],
    int: (min, max) => min + Math.floor(rand() * (max - min + 1)),
  };
}
