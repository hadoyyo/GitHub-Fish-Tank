const test = require('node:test');
const assert = require('node:assert/strict');
const { planSwim } = require('../lib/swim');
const { buildFishRoute } = require('../lib/renderer');

const rand = seed => { const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const bounds = { minY: 50, maxY: 300 };

// linear interpolation of an SMIL keyTimes/values pair
function at(keyTimes, values, t) {
  for (let i = 1; i < keyTimes.length; i++) {
    if (t <= keyTimes[i]) { const k = (t - keyTimes[i - 1]) / (keyTimes[i] - keyTimes[i - 1] || 1); return values[i - 1] + (values[i] - values[i - 1]) * k; }
  }
  return values[values.length - 1];
}

for (let index = 0; index < 8; index++) {
  const startFromRight = index % 2 === 1;
  test(`fish ${index}: never faces against its swimming direction`, () => {
    const route = buildFishRoute(index, 800, 400, bounds, rand, startFromRight);
    const swim = planSwim(route, 50);
    const sideSign = startFromRight ? -1 : 1; // facing factor +1 = original orientation (nose right)
    let checked = 0;
    for (let i = 1; i < 4000; i++) {
      const t0 = (i - 1) / 4000, t1 = i / 4000;
      const vx = swim.positionAt(t1).x - swim.positionAt(t0).x;
      const facing = at(swim.facing.keyTimes, swim.facing.values, (t0 + t1) / 2) * sideSign;
      if (Math.abs(vx) < 1e-4 || Math.abs(facing) < 0.02) continue; // standing still or edge-on mid-turn
      assert.equal(Math.sign(vx), Math.sign(facing), `t=${t1.toFixed(4)} vx=${vx.toFixed(3)} facing=${facing.toFixed(3)}`);
      checked++;
    }
    assert.ok(checked > 3500);
  });

  test(`fish ${index}: turns happen at the far ends of the route`, () => {
    const route = buildFishRoute(index, 800, 400, bounds, rand, startFromRight);
    const swim = planSwim(route, 50);
    const xs = Array.from({ length: 2001 }, (_, i) => swim.positionAt(i / 2000).x);
    const far = startFromRight ? Math.min(...xs) : Math.max(...xs);
    assert.ok(Math.abs(swim.positionAt(0.5).x - far) < 0.5, 'far end reached exactly at the half of the cycle');
    assert.ok(Math.abs(swim.positionAt(0).x - swim.positionAt(1).x) < 0.05, 'route is a closed loop');
  });
}

test('pitch stays gentle and SMIL lists are consistent', () => {
  const route = buildFishRoute(3, 800, 400, bounds, rand, true);
  const swim = planSwim(route, 47);
  assert.ok(swim.pitch.values.every(v => Math.abs(v) <= 12));
  assert.equal(swim.motion.keyPoints.length, swim.motion.keyTimes.length);
  assert.equal(swim.motion.keySplines.length, swim.motion.keyTimes.length - 1);
  for (const list of [swim.motion.keyPoints, swim.motion.keyTimes, swim.facing.keyTimes, swim.pitch.keyTimes]) {
    assert.equal(list[0], 0); assert.equal(list[list.length - 1], 1);
    for (let i = 1; i < list.length; i++) assert.ok(list[i] >= list[i - 1], 'monotonic');
  }
});
