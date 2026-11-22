// Swim timeline for one fish on its closed route (8 cubic segments: 4 out to the far end, 4 back).

const TURN_SECONDS = 0.7;        // how long the fish takes to turn around (edge-on in the middle)
const PITCH_DAMPING = 0.55;      // nose follows the route's slope, softened
const PITCH_LIMIT = 12;          // degrees
const PITCH_SAMPLES = 60;

const EASE_IN = '0.5 0 0.75 0.75';   // starts at rest, ends at cruising speed (slope 1)
const EASE_OUT = '0.25 0.25 0.5 1';  // starts at cruising speed, comes to rest
const LINEAR = '0 0 1 1';

const bez = (a, b, c, d, t) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;
const dbez = (a, b, c, d, t) => 3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t * t * (d - c);

// arc-length lookup table of one cubic segment
function measure(seg, steps = 64) {
  const ts = [0], ls = [0];
  let prev = seg.p0, len = 0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const p = { x: bez(seg.p0.x, seg.c1.x, seg.c2.x, seg.p1.x, t), y: bez(seg.p0.y, seg.c1.y, seg.c2.y, seg.p1.y, t) };
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    ts.push(t); ls.push(len); prev = p;
  }
  return { ts, ls, len };
}

// SMIL spline timing: y for a given x of the unit cubic with control points (x1,y1),(x2,y2)
function splineAt(spline, x) {
  const [x1, y1, x2, y2] = spline.split(' ').map(Number);
  let lo = 0, hi = 1, p = x;
  for (let i = 0; i < 40; i++) { p = (lo + hi) / 2; if (bez(0, x1, x2, 1, p) < x) lo = p; else hi = p; }
  return bez(0, y1, y2, 1, p);
}

/**
 * @param {{segments: Array<{p0,c1,c2,p1}>}} route  8 cubic segments, segment 3 ends at the far end
 * @param {number} duration  seconds per full cycle
 */
function planSwim(route, duration) {
  const segs = route.segments;
  const tables = segs.map(s => measure(s));
  const cum = [0];
  tables.forEach(t => cum.push(cum[cum.length - 1] + t.len));
  const total = cum[cum.length - 1], half = cum[4];

  // vertex i reached at keyTimes[i]; each half takes 0.5 of the cycle, split by length (constant cruising speed)
  const keyPoints = cum.map(c => c / total);
  const keyTimes = cum.map((c, i) => (i <= 4 ? 0.5 * c / half : 0.5 + 0.5 * (c - half) / (total - half)));
  keyPoints[keyPoints.length - 1] = 1; keyTimes[keyTimes.length - 1] = 1;
  const keySplines = segs.map((_, i) => (i === 0 || i === 4 ? EASE_IN : i === 3 || i === 7 ? EASE_OUT : LINEAR));

  // position / direction at cycle time t (0..1), mirroring the browser's SMIL evaluation
  const at = t => {
    let i = 0;
    while (i < segs.length - 1 && t > keyTimes[i + 1]) i++;
    const local = (t - keyTimes[i]) / (keyTimes[i + 1] - keyTimes[i]);
    const f = keyPoints[i] + splineAt(keySplines[i], Math.max(0, Math.min(1, local))) * (keyPoints[i + 1] - keyPoints[i]);
    const s = f * total;
    let k = 0;
    while (k < segs.length - 1 && s > cum[k + 1]) k++;
    const { ts, ls } = tables[k], l = s - cum[k];
    let j = 1;
    while (j < ls.length - 1 && ls[j] < l) j++;
    const u = ts[j - 1] + (ts[j] - ts[j - 1]) * ((l - ls[j - 1]) / (ls[j] - ls[j - 1] || 1));
    const g = segs[k];
    return {
      x: bez(g.p0.x, g.c1.x, g.c2.x, g.p1.x, u), y: bez(g.p0.y, g.c1.y, g.c2.y, g.p1.y, u),
      dx: dbez(g.p0.x, g.c1.x, g.c2.x, g.p1.x, u), dy: dbez(g.p0.y, g.c1.y, g.c2.y, g.p1.y, u),
    };
  };

  // facing factor (multiplies the fish's original x-scale): edge-on (0) exactly at both turns
  const w = Math.min(0.02, TURN_SECONDS / 2 / duration);
  const facing = { keyTimes: [0, w, 0.5 - w, 0.5, 0.5 + w, 1 - w, 1], values: [0, 1, 1, 0, -1, -1, 0] };

  // pitch: the nose follows the slope of the route (same sign on both legs because the rotation is applied
  // outside the mirror), damped and clamped
  const pitchTimes = Array.from({ length: PITCH_SAMPLES + 1 }, (_, i) => i / PITCH_SAMPLES);
  const pitch = {
    keyTimes: pitchTimes,
    values: pitchTimes.map(t => {
      const d = at(t);
      const deg = Math.abs(d.dx) < 1e-6 ? 0 : Math.atan(d.dy / d.dx) * 180 / Math.PI * PITCH_DAMPING;
      return Math.round(Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, deg)) * 10) / 10;
    }),
  };
  pitch.values[pitch.values.length - 1] = pitch.values[0]; // seamless loop

  return { motion: { keyPoints, keyTimes, keySplines }, facing, pitch, positionAt: t => { const p = at(t); return { x: p.x, y: p.y }; } };
}

module.exports = { planSwim };
