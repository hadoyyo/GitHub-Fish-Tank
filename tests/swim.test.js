const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFishRoute, planSwim, MARGIN } = require('../lib/swim');

const rand = seed => { const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const W = 800, H = 400;
const bounds = { minY: 50, maxY: 300 };

// linear interpolation of an SMIL keyTimes/values pair
function at(keyTimes, values, t) {
  for (let i = 1; i < keyTimes.length; i++) {
    if (t <= keyTimes[i]) { const k = (t - keyTimes[i - 1]) / (keyTimes[i] - keyTimes[i - 1] || 1); return values[i - 1] + (values[i] - values[i - 1]) * k; }
  }
  return values[values.length - 1];
}

const plans = Array.from({ length: 10 }, (_, index) => {
  const route = buildFishRoute(index, W, H, bounds, rand);
  return { index, route, swim: planSwim(route) };
});

for (const { index, route, swim } of plans) {
  test(`fish ${index}: never faces against its swimming direction`, () => {
    const N = 8000;
    let checked = 0;
    for (let i = 1; i < N; i++) {
      const t0 = (i - 1) / N, t1 = i / N;
      const vx = swim.positionAt(t1).x - swim.positionAt(t0).x;
      const facing = at(swim.facing.keyTimes, swim.facing.values, (t0 + t1) / 2);
      if (Math.abs(vx) < 1e-4 || Math.abs(facing) < 0.02) continue; // holding still or edge-on mid-turn
      assert.equal(Math.sign(vx), Math.sign(facing), `t=${t1.toFixed(4)} vx=${vx.toFixed(3)} facing=${facing.toFixed(3)}`);
      checked++;
    }
    assert.ok(checked > N * 0.8, `checked ${checked}`);
  });

  test(`fish ${index}: turns at the points where it reverses, stays in the tank, loops seamlessly`, () => {
    assert.equal(swim.turns.length, route.legs.length);
    for (const t of swim.turns.slice(0, -1)) {
      const x = swim.positionAt(t).x, before = swim.positionAt(t - 0.004).x, after = swim.positionAt(t + 0.004).x;
      assert.ok((x - before) * (after - x) <= 1e-6, `turn at t=${t.toFixed(4)} is a reversal`);
    }
    for (let i = 0; i <= 2000; i++) {
      const p = swim.positionAt(i / 2000);
      assert.ok(p.x >= MARGIN - 0.5 && p.x <= W - MARGIN + 0.5, `x=${p.x}`);
      assert.ok(p.y >= bounds.minY - 0.5 && p.y <= bounds.maxY + 0.5, `y=${p.y}`);
    }
    const a = swim.positionAt(0), b = swim.positionAt(1);
    assert.ok(Math.hypot(a.x - b.x, a.y - b.y) < 0.05, 'route is a closed loop');
    assert.ok(swim.duration > 40 && swim.duration < 400, `duration ${swim.duration}`);
  });
}

test('fish turn all over the tank, not only at the glass', () => {
  const turnXs = plans.flatMap(({ swim }) => swim.turns.slice(0, -1).map(t => swim.positionAt(t).x));
  const mid = turnXs.filter(x => x > W * 0.3 && x < W * 0.7);
  assert.ok(mid.length >= turnXs.length * 0.2, `${mid.length} of ${turnXs.length} turns in the middle`);
  const legsPerFish = plans.map(p => p.route.legs.length);
  assert.ok(new Set(legsPerFish).size > 1, 'loops differ in length');
});

test('routes are deterministic', () => {
  const a = buildFishRoute(4, W, H, bounds, rand), b = buildFishRoute(4, W, H, bounds, rand);
  assert.equal(a.d, b.d);
});

test('pitch stays gentle and SMIL lists are consistent', () => {
  for (const { swim } of plans) {
    assert.ok(swim.pitch.values.every(v => Math.abs(v) <= 12));
    assert.equal(swim.motion.keyPoints.length, swim.motion.keyTimes.length);
    assert.equal(swim.motion.keySplines.length, swim.motion.keyTimes.length - 1);
    assert.equal(swim.facing.keyTimes.length, swim.facing.values.length);
    for (const list of [swim.motion.keyPoints, swim.motion.keyTimes, swim.facing.keyTimes, swim.pitch.keyTimes]) {
      assert.equal(list[0], 0); assert.equal(list[list.length - 1], 1);
      for (let i = 1; i < list.length; i++) assert.ok(list[i] >= list[i - 1], 'monotonic');
    }
    for (let i = 1; i < swim.motion.keyTimes.length; i++) assert.ok(swim.motion.keyTimes[i] > swim.motion.keyTimes[i - 1], 'strictly increasing keyTimes');
  }
});
