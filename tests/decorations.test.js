const test = require('node:test');
const assert = require('node:assert/strict');
const { renderDecorations, shade, normalizeHex } = require('../lib/decorations');
const { generateAquariumSVG } = require('../lib/renderer');

const STATS = [
  { language: 'JavaScript', percentage: 38 }, { language: 'Python', percentage: 24 },
  { language: 'TypeScript', percentage: 16 }, { language: 'CSS', percentage: 12 }, { language: 'HTML', percentage: 10 },
];
const ALL_OFF = { showRocks: false, showPlants: false, showPlantsAlt: false, showCastle: false, showShip: false, showChest: false, showAnubias: false, showShell: false, showStatue: false };

// markers taken from the geometry of each object
const CASTLE_DOOR = 'M-8 6V-15A8 8 0 0 1 8-15V6Z';
const SHIP_HULL = 'M-74-14Q-66 4-42 10H48L60-24H-50Q-62-24-74-14Z';
const CHEST_BODY = 'M-24 -22H24V2H-24Z';
const ANUBIAS_LOG = 'M-31-5Q-31-15-23-15H25Q34-13 34-5Q34 4 25 4H-23Q-31 4-31-5Z';
const CLAM_FRONT = 'M-27-9.5C-29.8-9.2';
const STATUE_HEAD = 'M-16 8V-48Q-16-57-7-58H9Q17-57 17-48V8Z';

// minimal well-formedness check: every opened tag is closed in order
function assertWellFormed(svg) {
  const stack = [];
  for (const m of svg.matchAll(/<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^'">])*?)(\/?)>/g)) {
    const [, close, name, , self] = m;
    if (self) continue;
    if (close) assert.equal(stack.pop(), name, `unexpected </${name}>`);
    else stack.push(name);
  }
  assert.deepEqual(stack, [], 'unclosed tags');
}
function assertIdsResolve(svg) {
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate id');
  for (const [, ref] of svg.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(ref), `url(#${ref}) has no target`);
}

test('default scene: castle, chest, clam, rocks and green plants; well-formed, ids unique', () => {
  const svg = renderDecorations({ bgColor: '#4ecdc4', sandColor: '#c4a574' });
  assertWellFormed(svg);
  assertIdsResolve(svg);
  for (const m of [CASTLE_DOOR, CHEST_BODY, CLAM_FRONT]) assert.ok(svg.includes(m));
  for (const m of [SHIP_HULL, ANUBIAS_LOG, STATUE_HEAD]) assert.ok(!svg.includes(m));
  assert.ok(svg.includes('fill="#6aa84f"'), 'green sword plant');
});

test('alternative options replace their pair', () => {
  const svg = renderDecorations({ bgColor: '#0a192f', showCastle: false, showShip: true, showChest: false, showAnubias: true, showShell: false, showStatue: true, showPlants: false, showPlantsAlt: true });
  assertWellFormed(svg);
  assertIdsResolve(svg);
  for (const m of [SHIP_HULL, ANUBIAS_LOG, STATUE_HEAD]) assert.ok(svg.includes(m));
  for (const m of [CASTLE_DOOR, CHEST_BODY, CLAM_FRONT]) assert.ok(!svg.includes(m));
  assert.ok(svg.includes('fill="#c8483c"'), 'red sword plant');
  assert.ok(!svg.includes('fill="#6aa84f"'), 'no green sword plant');
});

test('both options of a pair on: the original one wins (old renderer precedence)', () => {
  const svg = renderDecorations({ showCastle: true, showShip: true, showChest: true, showAnubias: true, showShell: true, showStatue: true, showPlants: true, showPlantsAlt: true });
  for (const m of [CASTLE_DOOR, CHEST_BODY, CLAM_FRONT]) assert.ok(svg.includes(m));
  for (const m of [SHIP_HULL, ANUBIAS_LOG, STATUE_HEAD]) assert.ok(!svg.includes(m));
  assert.ok(!svg.includes('fill="#c8483c"'));
});

test('everything off: only the sand remains', () => {
  const svg = renderDecorations({ ...ALL_OFF, sandColor: '#c4a574' });
  assertWellFormed(svg);
  assert.ok(!svg.includes('<clipPath'));
  assert.ok(!svg.includes('<animateTransform'));
  assert.equal((svg.match(/<path d="M0 /g) || []).length, 3, 'three sand layers');
});

test('sand tones are derived from the sand colour, also for dark and grey sand', () => {
  for (const sand of ['#2b2d42', '#8d99ae', '#d8ebb5']) {
    const svg = renderDecorations({ ...ALL_OFF, sandColor: sand });
    for (const tone of [-50, -17, 10]) assert.ok(svg.includes(`fill="${shade(sand, tone)}"`), `${sand} ${tone}`);
  }
});

test('short or invalid colours never produce NaN', () => {
  assert.equal(normalizeHex('#fff', '#000000'), '#ffffff');
  assert.equal(normalizeHex('abc', '#000000'), '#aabbcc');
  assert.equal(normalizeHex('zzz', '#123456'), '#123456');
  for (const bgColor of ['#fff', 'zzz', '#12']) {
    const svg = renderDecorations({ bgColor, sandColor: 'nope' });
    assert.ok(!svg.includes('NaN'), bgColor);
  }
});

test('the small background plant moves left when the anubias is shown', () => {
  assert.match(renderDecorations({ showChest: false, showAnubias: false }), /translate\(402,/);
  const withAnubias = renderDecorations({ showChest: false, showAnubias: true });
  assert.match(withAnubias, /translate\(366,/);
  assert.doesNotMatch(withAnubias, /translate\(402,/);
});

test('no shadows, filters, stylesheets or external references', () => {
  const svg = renderDecorations({ bgColor: '#4ecdc4' });
  assert.ok(!/<style|<filter|href=|<image/.test(svg));
  assert.ok(!svg.includes('opacity=".34"'), 'cast shadows were dropped');
});

test('full renderer output stays well-formed and keeps legend and bubbles', () => {
  for (const bgColor of ['#4ecdc4', '#0a192f']) {
    const svg = generateAquariumSVG(STATS, { bgColor, showFrame: false });
    assertWellFormed(svg);
    assertIdsResolve(svg);
    assert.ok(svg.includes('LANGUAGES'), 'original legend');
    assert.ok(svg.includes('fill="#adf"'), 'original bubbles');
    assert.ok(!svg.includes('sandGrad'), 'old sand gradient removed');
  }
});
