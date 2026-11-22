// Aquarium decorations in the "polished flat" style: light from the upper left, two opaque tones per
// surface (base + shadow band on the right), no outlines, gradients, highlights or texture lines.
// Every object is buried in the front sand layer instead of casting a shadow.
// Design: docs/superpowers/specs/2026-11-22-aquarium-decorations-design.md
//
// Geometry assumes the 800x400 scene the renderer always draws (as the previous decorations did).

const W = 800;
const H = 400;

// ---------- colours ----------

const DEFAULT_BG = '#0a192f';
const DEFAULT_SAND = '#c4a574';

// '#abc' / 'abc' / '#aabbcc' -> '#aabbcc'; anything else -> fallback (keeps user input from producing NaN colours)
function normalizeHex(hex, fallback) {
  const s = String(hex || '').trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(s)) return '#' + s.split('').map(c => c + c).join('').toLowerCase();
  if (/^[0-9a-f]{6}$/i.test(s)) return '#' + s.toLowerCase();
  return fallback;
}

const channels = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
const toHex = rgb => '#' + rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

// shift every channel by `amount` (same rule as renderer's adjustColor)
const shade = (hex, amount) => toHex(channels(hex).map(v => v + amount));
// blend a towards b by t (0..1); used to sink background plants into the water colour
const mix = (a, b, t) => { const ca = channels(a), cb = channels(b); return toHex(ca.map((v, i) => v * (1 - t) + cb[i] * t)); };

// ---------- sand: three gentle wave layers; the front one covers the base of every object ----------

const SAND_LAYERS = [
  { base: H - 42, a1: 3.0, l1: 420, p1: 0.6, a2: 1.4, l2: 170, p2: 2.1, tone: -50 }, // back, darkest
  { base: H - 33, a1: 2.6, l1: 380, p1: 2.4, a2: 1.2, l2: 150, p2: 0.4, tone: -17 },
  { base: H - 24, a1: 2.4, l1: 460, p1: 4.0, a2: 1.0, l2: 190, p2: 1.3, tone: 10 },  // front, lightest
];
const surf = (L, x) => L.base + L.a1 * Math.sin(x / L.l1 * 2 * Math.PI + L.p1) + L.a2 * Math.sin(x / L.l2 * 2 * Math.PI + L.p2);
// height of the front sand surface at x: objects are placed relative to it so they sit IN the sand
const surfaceY = x => surf(SAND_LAYERS[2], x);
const backSurfaceY = x => surf(SAND_LAYERS[0], x);
const layerPath = L => {
  let d = `M0 ${surf(L, 0).toFixed(1)}`;
  for (let x = 10; x <= W; x += 10) d += `L${x} ${surf(L, x).toFixed(1)}`;
  return d + `V${H}H0Z`;
};

// deterministic grains inside the front layer, packed into two paths (one per opacity)
function grains(sand) {
  let s = 7;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const d = ['', ''];
  for (let i = 0; i < 150; i++) {
    const x = rnd() * W, top = surfaceY(x) + 4, y = top + rnd() * (H - 3 - top), r = +(0.5 + rnd() * 1.1).toFixed(1);
    d[i % 2] += `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  }
  const c = shade(sand, -40);
  return `<path d="${d[0]}" fill="${c}" opacity=".45"/><path d="${d[1]}" fill="${c}" opacity=".7"/>`;
}

// ---------- plants: slow, eased sway from the base ----------

const blade = (x, h, bend, w) => `M${x - w / 2} 0Q${x - w / 2 + bend * .25} ${-h * .55} ${x + bend} ${-h}Q${x + w / 2 + bend * .35} ${-h * .5} ${x + w / 2} 0Z`;
const EASE = '.45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1';
const sway = i => `<animateTransform attributeName="transform" type="skewX" values="0;${2 + i % 2 * .5};0;${-(1.5 + i % 3 * .5)};0" keyTimes="0;.25;.5;.75;1" calcMode="spline" keySplines="${EASE}" dur="${6.5 + i * .75}s" begin="${-i * 1.3}s" repeatCount="indefinite"/>`;
const place = (x, y, scale, inner) => `<g transform="translate(${x},${(+y).toFixed(1)})${scale === 1 ? '' : ` scale(${scale})`}">${inner}</g>`;

// vallisneria-like grass (front plane, green set)
const GRASS_BLADES = [[-10, 92, -14, 7], [-4, 110, 6, 8], [3, 80, 16, 7], [8, 64, -4, 6], [-15, 58, -18, 6]];
const grass = (c1, c2) => GRASS_BLADES.map((b, i) => `<g><path d="${blade(...b)}" fill="${i % 2 ? c1 : c2}"/>${sway(i)}</g>`).join('');

// Amazon sword: rosette of broad lance-shaped leaves; whole blade in base tone, right half in shade on top
function sword(c, sh) {
  const leaves = [[-50, 14, 28, 10], [-28, 17, 34, 11.5], [-9, 19, 38, 12], [10, 18, 35, 11.5], [30, 15, 30, 10.5], [52, 12, 24, 9]];
  return leaves.map(([ang, a, b, w], i) => {
    const tip = a + b;
    const right = `M0 ${-a}C${w * 1.1} ${-(a + b * .35)} ${w * .6} ${-(a + b * .85)} 0 ${-tip}Z`;
    const left = `M0 ${-a}C${-w * 1.1} ${-(a + b * .35)} ${-w * .6} ${-(a + b * .85)} 0 ${-tip}Z`;
    return `<g transform="rotate(${ang})"><g><path d="M0 2V${-a - 2}" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><path d="${left} ${right}" fill="${c}"/><path d="${right}" fill="${sh}"/>${sway(i)}</g></g>`;
  }).join('');
}

// Ludwigia-like stem plant (background, green set): stems with pairs of oval leaves
function stemPlant(c, sh, stems) {
  return stems.map(([x, h, lean], i) => {
    let g = `<path d="M${x} 2Q${x + lean * .3} ${-h * .5} ${x + lean} ${-h}" stroke="${c}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    for (let y = 10; y < h - 2; y += 9) {
      const t = y / h, px = x + lean * t * t, r = 5.2 - t * 1.6;
      g += `<ellipse cx="${(px - r * .9).toFixed(1)}" cy="${-y}" rx="${r.toFixed(1)}" ry="2.3" fill="${c}" transform="rotate(28 ${px.toFixed(1)} ${-y})"/>`;
      g += `<ellipse cx="${(px + r * .9).toFixed(1)}" cy="${-y}" rx="${r.toFixed(1)}" ry="2.3" fill="${sh}" transform="rotate(-28 ${px.toFixed(1)} ${-y})"/>`;
    }
    return `<g>${g}${sway(i + 2)}</g>`;
  }).join('');
}
const STEMS_CORNER = [[-7, 74, -4], [0, 96, 3], [8, 62, 6]];
const STEMS_SMALL = [[-13, 50, -7], [-4, 88, -5], [5, 68, 4], [13, 46, 7]];

// Rotala-like red stem plant (red set, replaces the grass)
const RED = { leaf: '#d2533f', leafSh: '#a33a2e', stem: '#8e2f25' };
function redPlant(c, sh, st) {
  const stems = [[-9, 96, -9], [-2, 118, 2], [5, 104, 10], [11, 74, 13]];
  return stems.map(([x, h, lean], i) => {
    let g = `<path d="M${x} 2Q${(x + lean * .25).toFixed(1)} ${(-h * .5).toFixed(1)} ${x + lean} ${-h}" stroke="${st}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    for (let y = 12; y < h - 4; y += 8) {
      const t = y / h, px = x + lean * t * t, r = 7 - t * 3;
      g += `<ellipse cx="${(px - r * .8).toFixed(1)}" cy="${-y}" rx="${r.toFixed(1)}" ry="1.9" fill="${c}" transform="rotate(42 ${px.toFixed(1)} ${-y})"/>`;
      g += `<ellipse cx="${(px + r * .8).toFixed(1)}" cy="${-y}" rx="${r.toFixed(1)}" ry="1.9" fill="${sh}" transform="rotate(-42 ${px.toFixed(1)} ${-y})"/>`;
    }
    const tx = x + lean, ty = -h;
    g += `<ellipse cx="${tx - 2.2}" cy="${ty - 1}" rx="3.6" ry="1.7" fill="${c}" transform="rotate(62 ${tx} ${ty})"/><ellipse cx="${tx + 2.2}" cy="${ty - 1}" rx="3.6" ry="1.7" fill="${sh}" transform="rotate(-62 ${tx} ${ty})"/>`;
    return `<g>${g}${sway(i + 1)}</g>`;
  }).join('');
}

// long slender red ribbons straight from the sand (red set, replaces the background stem plants)
const TAPE_BLADES = [[-18, 92, -22, 5], [-12, 124, -15, 5.6], [-6, 152, -6, 6], [0, 138, 7, 6], [6, 162, 15, 5.6], [12, 116, 21, 5.2], [17, 84, 26, 4.6]];
const redTape = (c, sh) => TAPE_BLADES.map((b, i) => `<g><path d="${blade(...b)}" fill="${i % 2 ? sh : c}"/>${sway(i)}</g>`).join('');

// staghorn coral: every branch drawn twice, shadow tone nudged right and base tone on top
const CORAL = { base: '#e8806f', shade: '#bf5a4b' };
const CORAL_BRANCHES = ['M0 6C0-8-1-17-3-27', 'M-1-7C-8-13-13-19-15-31', 'M-3-17C2-25 4-33 3-43', 'M0-4C8-10 13-16 15-27', 'M11-14C17-18 21-22 23-29', 'M-11-17C-17-19-21-23-23-29'];
function coral(w = 7) {
  const p = (c, dx) => CORAL_BRANCHES.map(d => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" transform="translate(${dx},0)"/>`).join('');
  return p(CORAL.shade, 1.6) + p(CORAL.base, -.4);
}

// ---------- objects; `id()` returns a fresh, document-unique id ----------

// stones share the castle's brightness so all stone things read as one material
const STONE = { base: '#8d97a4', shade: '#6b7584', edge: '#545d6b', light: '#9aa4b0', hole: '#3d4450' };
const stone = (id, d, band, base = STONE.base) => {
  const k = id();
  return `<clipPath id="${k}"><path d="${d}"/></clipPath><path d="${d}" fill="${base}"/><path d="${band}" fill="${STONE.shade}" clip-path="url(#${k})"/>`;
};
// boulder with a pebble in front of its left foot
const rock1 = id =>
  stone(id, 'M-24 6C-27-8-18-24-2-25C13-26 25-14 24 6Z', 'M5-28C13-19 16-7 13 8H30V-28Z') +
  stone(id, 'M-36 6C-37-3-32-10-25-10C-18-10-13-3-14 6Z', 'M-19-12C-16-6-15 0-16 8H-10V-12Z', STONE.light);
// cluster of three
const rock2 = id =>
  stone(id, 'M1 6C0-8 8-18 19-18C30-18 36-8 35 6Z', 'M22-20C28-12 30-4 29 8H40V-20Z') +
  stone(id, 'M-21 6C-23-4-16-13-6-13C3-13 8-5 7 6Z', 'M-1-15C3-9 4-2 3 8H12V-15Z', STONE.light) +
  stone(id, 'M-33 6C-33 0-30-5-26-5C-22-5-19 0-19 6Z', 'M-24-6C-22-2-22 2-22 8H-16V-6Z');
// two flat slabs stacked; the top one leaves a dark seam on the bottom one
function rock3(id) {
  const bottom = 'M-34 6C-35-4-26-9-4-9C18-9 34-6 33 6Z', top = 'M-20-6C-21-13-12-17 2-17C15-17 22-13 20-6C12-3-12-3-20-6Z';
  const k = id();
  return stone(id, bottom, 'M12-12C19-7 22-1 22 8H40V-12Z') +
    `<clipPath id="${k}"><path d="${bottom}"/></clipPath><ellipse cx="1" cy="-6" rx="21" ry="2.6" fill="${STONE.edge}" clip-path="url(#${k})"/>` +
    stone(id, top, 'M8-19C13-14 14-9 13-3H26V-19Z', STONE.light);
}

// castle: two opaque tones per block, merlons take the tone of the wall under them and overlap it by 1px,
// the central tower reaches 3px down behind the keep (both avoid anti-aliasing seams on dark water)
const CASTLE = { base: '#8496a6', shade: '#67798d', hole: '#1a2230' };
function castle() {
  const blocks = [ // back to front: side towers, central tower, keep
    [-48, -66, 24, 66, [-48, -39, -30]], [24, -66, 24, 66, [24, 33, 42]],
    [-11, -92, 22, 42, [-11, -3, 5]], [-24, -50, 48, 50, [-24, -13.5, -3, 7.5, 18]],
  ];
  const rect = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  let g = '';
  for (const [x, y, w, h, merlons] of blocks) {
    const band = +(x + w * .62).toFixed(2);
    const hh = h + (y + h === 0 ? 6 : 3);
    g += rect(x, y, w, hh, CASTLE.base) + rect(band, y, +(x + w - band).toFixed(2), hh, CASTLE.shade);
    for (const mx of merlons) {
      if (mx + 6 <= band) g += rect(mx, y - 7, 6, 8, CASTLE.base);
      else if (mx >= band) g += rect(mx, y - 7, 6, 8, CASTLE.shade);
      else g += rect(mx, y - 7, 6, 8, CASTLE.base) + rect(band, y - 7, +(mx + 6 - band).toFixed(2), 8, CASTLE.shade);
    }
  }
  g += `<path d="M-8 6V-15A8 8 0 0 1 8-15V6Z" fill="${CASTLE.hole}"/>`;
  for (const d of ['M-39-42v-7a3 3 0 0 1 6 0v7z', 'M33-42v-7a3 3 0 0 1 6 0v7z', 'M-3-72v-8a3 3 0 0 1 6 0v8z']) g += `<path d="${d}" fill="${CASTLE.hole}"/>`;
  return g;
}

// shipwreck: tilted hull, broken mast, stern cabin
const WOOD = { wood: '#8f6a4b', woodSh: '#6c4d36', edge: '#4e3626', hole: '#2a1c12' };
function ship(id) {
  const hull = 'M-74-14Q-66 4-42 10H48L60-24H-50Q-62-24-74-14Z', cabin = 'M22-40H50V-24H22Z', roof = 'M19-44H53V-39H19Z';
  const mast = 'M-11-24V-74L-8-81L-5.5-75L-3-82V-24Z', bowsprit = 'M-72-15L-92-27L-90-30L-70-19Z';
  const [km, kc, kh] = [id(), id(), id()];
  return `<g transform="rotate(-7)"><path d="${bowsprit}" fill="${WOOD.wood}"/>` +
    `<clipPath id="${km}"><path d="${mast}"/></clipPath><path d="${mast}" fill="${WOOD.wood}"/><rect x="-6.8" y="-84" width="5" height="62" fill="${WOOD.woodSh}" clip-path="url(#${km})"/>` +
    `<clipPath id="${kc}"><path d="${cabin}"/></clipPath><path d="${cabin}" fill="${WOOD.wood}"/><rect x="39" y="-41" width="12" height="18" fill="${WOOD.woodSh}" clip-path="url(#${kc})"/>` +
    `<path d="${roof}" fill="${WOOD.edge}"/><rect x="27" y="-36" width="6" height="6" rx="1" fill="${WOOD.hole}"/>` +
    `<clipPath id="${kh}"><path d="${hull}"/></clipPath><path d="${hull}" fill="${WOOD.wood}"/>` +
    `<g clip-path="url(#${kh})"><path d="M-80-6Q-10 2 70-10V20H-80Z" fill="${WOOD.woodSh}"/><rect x="-80" y="-25" width="150" height="3" fill="${WOOD.edge}"/></g>` +
    `<circle cx="-34" cy="-13" r="3.2" fill="${WOOD.hole}"/><circle cx="-16" cy="-12" r="3.2" fill="${WOOD.hole}"/><circle cx="2" cy="-12" r="3.2" fill="${WOOD.hole}"/>` +
    `<path d="M24-12L29-17L33-13L38-16L37-8L32-5L26-7Z" fill="${WOOD.hole}"/></g>`;
}

// treasure chest + two coins on the sand next to it
const CHEST = { wood: '#a0714b', woodSh: '#7d5639', edge: '#5a3c28', gold: '#e0a83e', goldSh: '#b8862f', hole: '#2a1c12' };
function chest(id) {
  const body = 'M-24 -22H24V2H-24Z';
  const lid = 'M-25.5 -21V-29C-25.5 -37.5 -14.5 -41.5 0 -41.5C14.5 -41.5 25.5 -37.5 25.5 -29V-21Z';
  const k = id();
  return `<clipPath id="${k}"><path d="${body}"/><path d="${lid}"/></clipPath>` +
    `<path d="${body}" fill="${CHEST.wood}"/><path d="${lid}" fill="${CHEST.wood}"/>` +
    `<g clip-path="url(#${k})"><rect x="6" y="-43" width="21" height="47" fill="${CHEST.woodSh}"/><rect x="-26" y="-22" width="52" height="2.5" fill="${CHEST.edge}"/>` +
    `<rect x="-17" y="-40" width="5" height="42" fill="${CHEST.gold}"/><rect x="12" y="-40" width="5" height="42" fill="${CHEST.goldSh}"/></g>` +
    `<rect x="-5" y="-27" width="10" height="11" rx="2" fill="${CHEST.gold}"/>` +
    `<circle cx="0" cy="-23.2" r="1.7" fill="${CHEST.hole}"/><rect x="-.7" y="-23" width="1.4" height="3.6" rx=".7" fill="${CHEST.hole}"/>`;
}
const coins = () => `<ellipse cx="0" cy="1.2" rx="4" ry="1.6" fill="${CHEST.gold}"/><ellipse cx="7" cy="2.6" rx="3.2" ry="1.3" fill="${CHEST.goldSh}"/>`;

// anubias on a driftwood log (layout and colours of the user's original anubias)
function anubias(id) {
  const log = 'M-31-5Q-31-15-23-15H25Q34-13 34-5Q34 4 25 4H-23Q-31 4-31-5Z';
  const stub = 'M14-13L22-24Q24-26 26-24L27-22L20-12Z';
  const C = { leaf: '#3f6b3f', leafSh: '#2f5530', stalk: '#3e7a30', base: '#316126' };
  // oval blade from (bx,by) to (tx,ty): whole blade in base tone, the half facing down in shade on top
  const leaf = (bx, by, tx, ty, w) => {
    const dx = tx - bx, dy = ty - by, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
    const up = ny < 0 ? 1 : -1;
    const P = (t, k) => `${(bx + dx * t + nx * w * k).toFixed(1)} ${(by + dy * t + ny * w * k).toFixed(1)}`;
    const half = sgn => `M${bx} ${by}C${P(.15, sgn * 1.05)} ${P(.8, sgn * .95)} ${tx} ${ty}Z`;
    return `<path d="${half(up)} ${half(-up)}" fill="${C.leaf}"/><path d="${half(-up)}" fill="${C.leafSh}"/>`;
  };
  // [stalk end x,y, leaf tip x,y, half-width]; the blade starts ~3px before the stalk end so no stalk tip shows
  const stalks = [[-14, -19, -36, -3, 9], [-3, -38, -27, -43, 9.5], [7, -36, 30, -25, 10], [12, -20, 30, -10, 8]];
  const leaves = stalks.map(([sx, sy, tx, ty, w], i) => {
    const L = Math.hypot(tx - sx, ty - sy), bx = +(sx - (tx - sx) / L * 2.8).toFixed(1), by = +(sy - (ty - sy) / L * 2.8).toFixed(1);
    return `<g><path d="M0 0Q${(sx * .2).toFixed(1)} ${(sy * .6).toFixed(1)} ${sx} ${sy}" stroke="${C.stalk}" stroke-width="2.2" fill="none" stroke-linecap="butt"/>${leaf(bx, by, tx, ty, w)}${sway(i)}</g>`;
  }).join('');
  // dark-green star of tapered roots spreading over the log: slim at the junction, thick in the body
  const roots = [[-15, 7], [-9, 11], [-2, 12], [6, 11], [13, 8], [17, 3]].map(([x, y]) => {
    const L = Math.hypot(x, y), nx = -y / L, ny = x / L, w = 3;
    const P = (t, k) => `${(x * t + nx * w * k).toFixed(1)} ${(y * t + ny * w * k).toFixed(1)}`;
    return `<path d="M${P(0, .45)}Q${P(.45, .8)} ${x} ${y}Q${P(.45, -.8)} ${P(0, -.45)}Z" fill="${C.base}"/>`;
  }).join('') + `<ellipse cx="0" cy="-.3" rx="3" ry="1.8" fill="${C.base}"/>`;
  const k = id();
  return `<clipPath id="${k}"><path d="${log}"/></clipPath><path d="${stub}" fill="${WOOD.woodSh}"/><path d="${log}" fill="${WOOD.wood}"/>` +
    `<g clip-path="url(#${k})"><path d="M-40-4Q0-1 40-6V12H-40Z" fill="${WOOD.woodSh}"/></g>` +
    `<ellipse cx="-27" cy="-5.5" rx="4.6" ry="9" fill="${WOOD.woodSh}"/><ellipse cx="-27" cy="-5.5" rx="2.4" ry="5" fill="${WOOD.wood}"/>` +
    `<g transform="translate(-3,-14)">${roots}${leaves}</g>`;
}

// open clam with a pearl
const SHELL = { base: '#ead5b2', shade: '#c8ab84' };
const PEARL = { base: '#f3efe7', shade: '#d6cfc2' };
function fanPath(cx, cy, r, peak, a0, a1, n, hinge, ky = 1) {
  const P = (a, rr) => [cx + rr * Math.cos(a * Math.PI / 180), cy + rr * Math.sin(a * Math.PI / 180) * ky].map(v => v.toFixed(1)).join(' ');
  const step = (a1 - a0) / n;
  let d = `M${cx - hinge} ${cy}L${P(a0, r)}`;
  for (let k = 0; k < n; k++) { const s0 = a0 + k * step; d += `Q${P(s0 + step / 2, peak)} ${P(s0 + step, r)}`; }
  return d + `L${cx + hinge} ${cy}Z`;
}
const CLAM_TOP = fanPath(0, -7, 28, 33, -168, -12, 6, 7, 1.5);
const CLAM_FRONT = 'M-27-9.5C-29.8-9.2-30.4-5.5-28-2Q-22 2-15 2Q-8 5 0 3Q8 5 15 2Q22 2 28-2C30.4-5.5 29.8-9.2 27-9.5Q14-5 0-5Q-14-5-27-9.5Z';
function clam(id) {
  const [kt, kp, kf] = [id(), id(), id()];
  return `<clipPath id="${kt}"><path d="${CLAM_TOP}"/></clipPath><path d="${CLAM_TOP}" fill="${SHELL.base}"/>` +
    `<path d="M9-64C17-44 18-22 13-5H45V-64Z" fill="${SHELL.shade}" clip-path="url(#${kt})"/>` +
    `<ellipse cx="0" cy="-8.5" rx="27" ry="4.8" fill="${SHELL.shade}"/>` +
    `<clipPath id="${kp}"><circle cx="0" cy="-14" r="8.5"/></clipPath><circle cx="0" cy="-14" r="8.5" fill="${PEARL.shade}"/>` +
    `<circle cx="-2.2" cy="-15.4" r="8.5" fill="${PEARL.base}" clip-path="url(#${kp})"/>` +
    `<clipPath id="${kf}"><path d="${CLAM_FRONT}"/></clipPath><path d="${CLAM_FRONT}" fill="${SHELL.base}"/>` +
    `<path d="M12-10C17-6 18-2 17 4H40V-10Z" fill="${SHELL.shade}" clip-path="url(#${kf})"/>`;
}

// stone head sunk to the chin
function statue(id) {
  const head = 'M-16 8V-48Q-16-57-7-58H9Q17-57 17-48V8Z';
  const k = id();
  return `<g transform="rotate(4)"><rect x="-20" y="-41" width="5" height="22" rx="2" fill="${STONE.base}"/>` +
    `<clipPath id="${k}"><path d="${head}"/></clipPath><path d="${head}" fill="${STONE.base}"/>` +
    `<g clip-path="url(#${k})"><rect x="6" y="-60" width="12" height="70" fill="${STONE.shade}"/><rect x="-17" y="-43" width="35" height="4.5" fill="${STONE.edge}"/>` +
    `<rect x="-13" y="-38.5" width="9" height="4" rx="1.5" fill="${STONE.hole}"/><rect x="4" y="-38.5" width="9" height="4" rx="1.5" fill="${STONE.hole}"/></g>` +
    `<path d="M-3.5-38L-5.5-20Q0-16.5 5.5-20L3.5-38Z" fill="${STONE.base}"/><path d="M0-38H3.5L5.5-20Q3-18 0-17.8Z" fill="${STONE.shade}"/>` +
    `<rect x="-6" y="-13" width="13" height="2.4" rx="1.2" fill="${STONE.hole}"/><rect x="16" y="-41" width="5" height="22" rx="2" fill="${STONE.shade}"/></g>`;
}

// ---------- the scene ----------

/**
 * Sand + decorations, drawn between the water background and the bubbles/fish.
 * Mutually exclusive pairs keep the renderer's old precedence: castle > ship, chest > anubias,
 * shell > statue, plants > plantsAlt.
 * @returns {string} SVG markup
 */
function renderDecorations(options = {}) {
  const {
    bgColor, sandColor,
    showRocks = true, showPlants = true, showPlantsAlt = false,
    showCastle = true, showShip = false, showChest = true, showAnubias = false,
    showShell = true, showStatue = false,
  } = options;
  const bg = normalizeHex(bgColor, DEFAULT_BG);
  const sand = normalizeHex(sandColor, DEFAULT_SAND);
  let n = 0;
  const id = () => `dc-${n++}`;

  const castleOn = showCastle, shipOn = !showCastle && showShip;
  const chestOn = showChest, anubiasOn = !showChest && showAnubias;
  const shellOn = showShell, statueOn = !showShell && showStatue;
  const green = showPlants, red = !showPlants && showPlantsAlt, plants = green || red;

  // background plants stand behind the back sand layer, coloured partly with the water.
  // Red is complementary to cyan water, so it is hazed less or it turns grey.
  const haze = red ? .28 : .45;
  const back = (c) => mix(c, bg, haze);
  const smallBackX = anubiasOn ? 366 : 402; // moves left so it does not blend with the anubias leaves
  let backPlants = '';
  if (green) {
    backPlants += place(252, backSurfaceY(252) + 4, .62, grass(back('#3f8a5a'), back('#2f7049')));
    backPlants += place(762, backSurfaceY(762) + 4, 1.85, stemPlant(back('#5fa15a'), back('#417e43'), STEMS_CORNER));
    backPlants += place(smallBackX, backSurfaceY(smallBackX) + 4, 1.45, stemPlant(back('#5fa15a'), back('#417e43'), STEMS_SMALL));
  } else if (red) {
    backPlants += place(252, backSurfaceY(252) + 4, .62, redPlant(back(RED.leaf), back(RED.leafSh), back(RED.stem)));
    backPlants += place(762, backSurfaceY(762) + 4, 1.15, redTape(back('#c95a44'), back('#9c3e30')));
    backPlants += place(smallBackX, backSurfaceY(smallBackX) + 4, .85, redTape(back('#c95a44'), back('#9c3e30')));
  }

  let objects = '';
  if (castleOn) objects += place(180, surfaceY(180) + 4, 1, castle());
  if (shipOn) objects += place(168, surfaceY(164) - 3, 1.3, ship(id));
  if (chestOn) objects += place(441, surfaceY(441) + 3, 1, chest(id));
  if (anubiasOn) objects += place(441, surfaceY(441) - 1, 1.4, anubias(id));
  if (showRocks) {
    objects += place(48, surfaceY(48) - 2, 1.3, rock1(id));
    objects += place(342, surfaceY(342) - 2, 1.3, rock2(id));
    objects += place(665, surfaceY(665) - 2, 1.3, rock3(id));
  }
  if (plants) objects += place(504, surfaceY(504) - 2, .7, coral(8)) + place(533, surfaceY(533) - 2, 1.35, coral());
  if (shellOn) objects += place(600, surfaceY(600) - 2, 1, clam(id));
  if (statueOn) objects += place(600, surfaceY(600) + 2, 1.25, statue(id));
  if (green) {
    objects += place(284, surfaceY(284) + 3, 1.05, sword('#6aa84f', '#4d8a3c'));
    objects += place(80, surfaceY(80) + 3, 1.1, grass('#3f8a5a', '#2f7049'));
    objects += place(720, surfaceY(720) + 3, 1.15, grass('#3f8a5a', '#2f7049'));
  } else if (red) {
    objects += place(284, surfaceY(284) + 3, 1.05, sword('#c8483c', '#9a3329'));
    objects += place(80, surfaceY(80) + 3, 1.05, redPlant(RED.leaf, RED.leafSh, RED.stem));
    objects += place(720, surfaceY(720) + 3, 1.1, redPlant(RED.leaf, RED.leafSh, RED.stem));
  }

  const [l0, l1, l2] = SAND_LAYERS;
  return backPlants +
    `<path d="${layerPath(l0)}" fill="${shade(sand, l0.tone)}"/>` +
    `<path d="${layerPath(l1)}" fill="${shade(sand, l1.tone)}"/>` +
    objects +
    `<path d="${layerPath(l2)}" fill="${shade(sand, l2.tone)}"/>` +
    (chestOn ? place(474, surfaceY(474), 1, coins()) : '') +
    grains(sand);
}

module.exports = { renderDecorations, surfaceY, normalizeHex, shade, mix, SAND_LAYERS };
