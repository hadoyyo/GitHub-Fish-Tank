// Wandering swim for one fish: a long, seeded, closed loop of "legs". Each leg is swum in one horizontal
// direction and ends with a turn, and the turns happen anywhere in the tank, not only at the glass.
// Legs differ in length, depth, speed and in whether the fish pauses before turning, so with 8-14 legs
// per loop (2-4 minutes) the route does not read as a fixed track.
//
// The SVG is animated with SMIL only (it must work as a static README image), so the whole loop is
// planned here: motion gets explicit keyPoints/keyTimes, and the facing (flip) and pitch animations are
// derived from the same timeline, so a fish never swims backwards and always turns where it stops.

const TURN_SECONDS = 0.8;        // how long the fish takes to turn around (edge-on in the middle)
const PITCH_DAMPING = 0.55;      // nose follows the route's slope, softened
const PITCH_LIMIT = 12;          // degrees
const PITCH_SAMPLES_PER_SECOND = 1;

const MARGIN = 90;               // keeps the largest fish inside the glass
const MIN_LEG = 110;             // shortest swim between two turns (px)
const MAX_SLOPE = 0.45;          // steepest climb/dive along a leg (dy/dx)

const EASE_IN = '0.5 0 0.75 0.75';   // starts at rest, ends at cruising speed (slope 1)
const EASE_OUT = '0.25 0.25 0.5 1';  // starts at cruising speed, comes to rest
const EASE_IN_OUT = '0.42 0 0.58 1'; // a leg made of a single segment
const LINEAR = '0 0 1 1';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const bez = (a, b, c, d, t) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;
const dbez = (a, b, c, d, t) => 3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t * t * (d - c);

/**
 * Seeded wandering route.
 * @param {number} index  fish index (seed)
 * @param {number} width  tank width
 * @param {number} height tank height (unused, kept for the call signature)
 * @param {{minY:number,maxY:number}} swimBounds
 * @param {(seed:number)=>number} rand  deterministic 0..1
 * @returns {{segments: Array<{p0,c1,c2,p1}>, d: string, legs: Array<{segments:number,dir:number,speed:number,hold:number}>}}
 */
function buildFishRoute(index, width, height, swimBounds, rand) {
  let seed = index * 1009 + 17;
  const rnd = () => rand(seed++);
  const between = (a, b) => a + (b - a) * rnd();
  const { minY, maxY } = swimBounds;
  const L = MARGIN, R = width - MARGIN;
  const minLeg = Math.min(MIN_LEG, (R - L) / 3);

  // --- where the fish turns: alternating directions, built heading right and mirrored for half the fish
  const legCount = 2 * (4 + Math.floor(rnd() * 4));          // 8, 10, 12 or 14 legs
  // leg length first (some short hesitations, mostly long cruises), then fit it into the tank: a leg that
  // would hit the glass turns a little before it, every other one turns wherever it ends
  const legLength = () => (rnd() < 0.3 ? between(minLeg, minLeg * 1.8) : between(minLeg, (R - L) * 0.9));
  const xs = [between(L, R - minLeg)];
  for (let i = 1; i < legCount; i++) {
    const prev = xs[i - 1];
    if (i % 2) {                                                      // heading right
      const lo = (i === legCount - 1 ? Math.max(prev, xs[0]) : prev) + minLeg;
      xs.push(clamp(prev + legLength(), lo, R - rnd() * 25));
    } else {                                                          // heading left
      xs.push(clamp(prev - legLength(), L + rnd() * 25, prev - minLeg));
    }
  }
  xs.push(xs[0]);

  // --- how deep: a home depth per fish, every turn somewhere around it
  const home = minY + ((index * 0.618 + 0.1) % 1) * (maxY - minY);
  const roam = 35 + rnd() * 55;
  const ys = xs.map(() => clamp(home + (rnd() - 0.5) * 2 * roam, minY, maxY));
  ys[ys.length - 1] = ys[0];

  const dir0 = rnd() < 0.5 ? 1 : -1;
  const X = x => (dir0 > 0 ? x : width - x);
  const baseSpeed = 20 + rnd() * 12;                           // px/s

  const segments = [], legs = [];
  for (let i = 0; i < legCount; i++) {
    const a = { x: X(xs[i]), y: ys[i] }, b = { x: X(xs[i + 1]), y: ys[i + 1] };
    const len = Math.abs(b.x - a.x);
    const k = Math.min(3, 1 + Math.floor(len / 170 * (0.5 + rnd() * 0.6)));

    // waypoints along the leg: x keeps going one way, y wanders
    const pts = [a];
    for (let j = 1; j < k; j++) {
      const f = j / k + (rnd() - 0.5) * 0.2 / k;
      pts.push({ x: a.x + (b.x - a.x) * f, y: clamp(a.y + (b.y - a.y) * f + (rnd() - 0.5) * 2 * Math.min(roam, 45), minY, maxY) });
    }
    pts.push(b);

    // y as a smooth function of x (cubic Hermite): x is linear in each segment, so the fish never backs up
    const sec = j => (pts[j + 1].y - pts[j].y) / (pts[j + 1].x - pts[j].x);
    const slopes = pts.map((_, j) => (j === 0 || j === k ? (rnd() - 0.5) * 0.2 : clamp((sec(j - 1) + sec(j)) / 2, -MAX_SLOPE, MAX_SLOPE)));
    for (let j = 0; j < k; j++) {
      const p0 = pts[j], p1 = pts[j + 1], h = p1.x - p0.x;
      segments.push({
        p0, p1,
        c1: { x: p0.x + h / 3, y: clamp(p0.y + slopes[j] * h / 3, minY, maxY) },
        c2: { x: p1.x - h / 3, y: clamp(p1.y - slopes[j + 1] * h / 3, minY, maxY) },
      });
    }

    legs.push({
      segments: k,
      dir: Math.sign(b.x - a.x),
      speed: baseSpeed * between(0.65, 1.4),
      // sometimes the fish hangs in the water for a moment before turning (not at the loop seam)
      hold: i < legCount - 1 && rnd() < 0.45 ? between(0.4, 1.8) : 0,
    });
  }

  const r2 = v => Math.round(v * 100) / 100;
  const d = `M ${r2(segments[0].p0.x)},${r2(segments[0].p0.y)}` +
    segments.map(g => ` C ${r2(g.c1.x)},${r2(g.c1.y)} ${r2(g.c2.x)},${r2(g.c2.y)} ${r2(g.p1.x)},${r2(g.p1.y)}`).join('');

  return { segments, d, legs };
}

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
 * One SMIL timeline for motion, facing and pitch.
 * @param {ReturnType<typeof buildFishRoute>} route
 * @returns {{duration:number, motion, facing, pitch, turns:number[], positionAt:(t:number)=>{x:number,y:number}}}
 *   facing values: +1 = nose right (the shape's own orientation), -1 = nose left, 0 = edge-on
 */
function planSwim(route) {
  const segs = route.segments;
  const tables = segs.map(s => measure(s));
  const cum = [0];
  tables.forEach(t => cum.push(cum[cum.length - 1] + t.len));
  const total = cum[cum.length - 1];

  // walk the legs: each segment takes length/speed seconds, a hold repeats the last keyPoint
  const keyPoints = [0], secs = [0], keySplines = [], turnSecs = [];
  let time = 0, s = 0;
  for (const leg of route.legs) {
    for (let j = 0; j < leg.segments; j++, s++) {
      time += tables[s].len / leg.speed;
      keyPoints.push(cum[s + 1] / total); secs.push(time);
      keySplines.push(leg.segments === 1 ? EASE_IN_OUT : j === 0 ? EASE_IN : j === leg.segments - 1 ? EASE_OUT : LINEAR);
    }
    turnSecs.push(time + leg.hold / 2);
    if (leg.hold > 0) {
      time += leg.hold;
      keyPoints.push(keyPoints[keyPoints.length - 1]); secs.push(time); keySplines.push(LINEAR);
    }
  }
  const duration = time;
  const keyTimes = secs.map(v => v / duration);
  keyPoints[keyPoints.length - 1] = 1; keyTimes[keyTimes.length - 1] = 1;
  const turns = turnSecs.map(v => v / duration);               // last one is the loop seam (t = 1 ≡ 0)

  // position / direction at cycle time t (0..1), mirroring the browser's SMIL evaluation
  const at = t => {
    let i = 0;
    while (i < keySplines.length - 1 && t > keyTimes[i + 1]) i++;
    const local = (t - keyTimes[i]) / (keyTimes[i + 1] - keyTimes[i]);
    const f = keyPoints[i] + splineAt(keySplines[i], clamp(local, 0, 1)) * (keyPoints[i + 1] - keyPoints[i]);
    const dist = f * total;
    let k = 0;
    while (k < segs.length - 1 && dist > cum[k + 1]) k++;
    const { ts, ls } = tables[k], l = dist - cum[k];
    let j = 1;
    while (j < ls.length - 1 && ls[j] < l) j++;
    const u = ts[j - 1] + (ts[j] - ts[j - 1]) * ((l - ls[j - 1]) / (ls[j] - ls[j - 1] || 1));
    const g = segs[k];
    return {
      x: bez(g.p0.x, g.c1.x, g.c2.x, g.p1.x, u), y: bez(g.p0.y, g.c1.y, g.c2.y, g.p1.y, u),
      dx: dbez(g.p0.x, g.c1.x, g.c2.x, g.p1.x, u), dy: dbez(g.p0.y, g.c1.y, g.c2.y, g.p1.y, u),
    };
  };

  // facing: edge-on (0) exactly at every turn, the old direction before it and the new one after it
  const w = TURN_SECONDS / 2 / duration;
  const legs = route.legs;
  const facing = { keyTimes: [0, w], values: [0, legs[0].dir] };
  for (let i = 0; i < legs.length - 1; i++) {
    facing.keyTimes.push(turns[i] - w, turns[i], turns[i] + w);
    facing.values.push(legs[i].dir, 0, legs[i + 1].dir);
  }
  facing.keyTimes.push(1 - w, 1);
  facing.values.push(legs[legs.length - 1].dir, 0);

  // pitch: the nose follows the slope of the route (same sign on both directions because the rotation is
  // applied outside the mirror), damped and clamped
  const n = Math.max(60, Math.ceil(duration * PITCH_SAMPLES_PER_SECOND));
  const pitchTimes = Array.from({ length: n + 1 }, (_, i) => i / n);
  const pitch = {
    keyTimes: pitchTimes,
    values: pitchTimes.map(t => {
      const p = at(t);
      const deg = Math.abs(p.dx) < 1e-6 ? 0 : Math.atan(p.dy / p.dx) * 180 / Math.PI * PITCH_DAMPING;
      return Math.round(clamp(deg, -PITCH_LIMIT, PITCH_LIMIT) * 10) / 10;
    }),
  };
  pitch.values[pitch.values.length - 1] = pitch.values[0]; // seamless loop

  return {
    duration, turns,
    motion: { keyPoints, keyTimes, keySplines },
    facing, pitch,
    positionAt: t => { const p = at(t); return { x: p.x, y: p.y }; },
  };
}

module.exports = { buildFishRoute, planSwim, MARGIN };
