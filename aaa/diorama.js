/* ==========================================================================
   DUSTIN DO DIORAMA
   A tile-framed 3D scene with editable gold balloon letters.

   HOW TO EDIT
   Everything you are meant to change lives in the CONFIG block just below.
   Change a value, save this file, refresh the page. Colors are ordinary CSS
   hex codes. Sizes and positions are measured in tiles (1 = one tile).
   Nothing below the line "END OF CONFIG" needs to be touched.

   The settings panel under the scene (diorama-panel.js) changes 25 of these
   live. When you like what you see, copy its export text and type the values
   in here to make them permanent.
   ========================================================================== */
(function () {
'use strict';

var CONFIG = {

  // ---------------------------------------------------------------- TEXT
  text: 'Hello. Welcome,\nFRIEND!',   // words shown when the page loads (\n starts a new line)
  maxChars: 24,             // longest line the text box accepts
  maxLines: 3,              // most lines of text

  // ---------------------------------------------------------------- FRAME
  frame: {
    tilesWide: 16,          // whole frame, in tiles
    tilesHigh: 11,
    borderTiles: 1,         // thickness of the tile border (1 leaves a 14 x 9 opening)
    lipDepth: 1,            // how deep the tiled inner edge goes back, in tiles (the shoebox depth)
    grout: 0.06,            // width of the caulk line between tiles
    tileColor: '#ffffff',
    groutColor: '#b7b5af',
    widthPercent: 100,      // how wide the frame is drawn, as a percent of the space it has     [panel]
    smudges: 18,            // how many smudges and fingerprints are on the tiles and grout
    smudgeOpacity: 0.3,     // 0 = spotless, 1 = very grubby                          [panel]
    smudgeColors: ['#e0532a', '#f0c22e']   // orange-red and yellow
  },

  // ---------------------------------------------------------------- VIEWING ANGLE (mouse + tilt)
  view: {
    maxAngleX: 11,          // degrees you can peek left/right. 10-15 feels good       [panel]
    maxAngleY: 6,           // degrees you can peek up/down
    distance: 26,           // how far the viewer sits from the frame. Bigger = flatter, calmer perspective
    eyeHeight: 0.8,         // viewer height above the frame's center. Higher = see more grass
    stiffness: 38,          // how quickly the view follows the mouse or tilt
    damping: 11,            // higher = less wobble after moving
    invertMouse: false,     // true = scene follows the mouse the other way
    tilt: true,             // false = never use the phone's motion sensors
    tiltRange: 16,          // degrees of phone tilt that give the full viewing angle
    invertTiltX: false,     // flip these if tilt feels backwards on your phone
    invertTiltY: false
  },

  // ---------------------------------------------------------------- LOOK
  look: {
    exposure: 1.0,          // overall brightness
    skyTop: '#3f9df0',
    skyMid: '#86cbf7',
    horizon: '#e4f4fb',     // sky color at the horizon, and the color distant layers fade toward
    grassDeep: '#237d33',   // grass in shade
    grassMid: '#4fbb3a',
    grassLight: '#9be35a',  // sunlit tips
    shadow: 0.62,           // how dark the shaded sides and shadows are (0 = flat, 1 = deep)   [panel]
    hazeFore: 0,            // atmospheric haze on each depth layer, in percent                 [panel]
    hazeMid: 15,            //                                                                  [panel]
    hazeBack: 33,           //                                                                  [panel]
    foreRise: 1.2,          // how much the foreground climbs as it goes back. More = the foreground fills more of the view
    windStrength: 1.0       // 0 = perfectly still grass
  },

  // ---------------------------------------------------------------- THE THREE FOREGROUND HILLS
  // x = left/right, z = how far back, width/depth = footprint, height = how tall.
  hills: [
    { x: -7.6, z: -15.0, width: 9.5, depth: 8.0, height: 3.3 },   // large, left
    { x:  8.2, z: -13.5, width: 7.5, depth: 6.5, height: 2.4 },   // medium, right
    { x: -1.6, z: -8.5, width: 4.4, depth: 3.8, height: 1.3 }     // small, center-left, the closest to the camera
  ],

  // ---------------------------------------------------------------- SUN
  sun: {
    x: -4.5,                // where the sun sits in the opening (tiles from center; negative = left)  [panel]
    y: 2.9,
    color: '#fff3c4',
    rayColor: '#ffdf7a',
    rays: 12,               // how many rays in the main layer                         [panel]
    rays2: 9,               // how many in the second layer, which spins the other way  [panel]
    rayMin: 0.6,            // shortest a ray gets, in tiles                           [panel]
    rayMax: 9,              // longest a ray gets, in tiles                            [panel]
    rayWidth: 1.0,          // 1 = like the reference picture, 2 = fat wedges          [panel]
    rayGlow: 1.0,           // brightness of the rays                                  [panel]
    raySpeed: 1.0           // how quickly rays change length, width and brightness    [panel]
  },

  // ---------------------------------------------------------------- CLOUDS
  clouds: {
    speed: 1.0,             // drift to the right. 0 = still                           [panel]
    opacity: 0.9,           // how solid the puffy clouds are overall                  [panel]
    cirrus: 9,              // thin wispy clouds, high up
    cumulus: 5              // puffy cartoon clouds, lower down
  },

  // ---------------------------------------------------------------- GOLD BALLOON LETTERS
  letters: {
    size: 2.6,              // biggest letter size in tiles (shrinks automatically to fit)   [panel]
    archWidth: 11.4,        // the widest a line is allowed to get
    blockHeight: 5.6,       // the tallest the whole block of lines is allowed to get
    archRadius: 10,         // smaller = tighter arch, bigger = flatter
    y: 0.9,                 // height of the word block (tiles from frame center)
    z: -4.2,                // how far back the words float
    rotateMax: 15,          // each letter slowly turns up to this many degrees on all three axes   [panel]
    rotateSpeed: 1.0,       // how quickly letters drift between rotations                           [panel]
    color: [1.0, 0.68, 0.22], // gold (red, green, blue from 0 to 1)
    roughness: 0.13,        // 0 = mirror, 0.4 = brushed
    shine: 1.45,            // strength of reflections
    glow: 0.4,              // soft fantasy rim glow
    puff: 0.92,             // how inflated the letters are
    crease: 1.22,           // 1 = round tube, 2 = sharp pinched seam
    wrinkle: 1.0,           // strength of the stretch marks at the seams
    crumple: 1.0,           // strength of the big soft foil dents
    floatAmount: 1.0,       // how much each letter bobs on its own
    strokeRef: 0.09
  },

  // ---------------------------------------------------------------- FUZZY PASTEL SHAPES
  // Shapes are scattered by a recipe: bigger ones toward the sides and back of the foreground,
  // smaller ones in the middle, a few on the hilltops and a few far away in the mid-ground.
  shapes: {
    count: 11,              // how many shapes in total                                [panel]
    minSize: 1.5,           // height of the smallest shapes, in tiles                 [panel]
    maxScale: 2.3,          // the largest shapes are this many times the smallest     [panel]
    seed: 7,                // the layout. Same number = same layout every visit       [panel]
    fuzz: 0.16,             // length of the fur, in tiles. 0 = smooth                 [panel]
    furWidth: 0.38,         // thickness of each strand. 0.2 = fine hair, 0.6 = chunky  [panel]
    richness: 1.2,          // color strength. 1 = as listed below, 1.5 = vivid        [panel]
    nearest: 2.6,           // closest a shape may sit to the frame
    types: ['cube', 'sphere', 'pyramid', 'ring', 'cylinder', 'cone'],
    colors: ['#f29cc2', '#8fc3f7', '#f7d76a', '#b89cf2', '#8fe0bb', '#f7b185', '#ee9be0']
  },

  // ---------------------------------------------------------------- MOTION FEEL
  motion: {
    hoverLean: 0.16,        // how far a shape leans away when it is startled
    hopHeight: 4.6,         // launch speed of a clicked shape
    gravity: 17,
    wordBounce: 4.6,        // launch speed of the words when clicked
    caretBlinkSeconds: 1.06
  },

  // ---------------------------------------------------------------- TEXT BOX + CARET
  ui: {
    caretAlwaysVisible: false  // true = the gold block caret blinks even when the text box is not in use
  },

  // ---------------------------------------------------------------- PERFORMANCE
  // "desktop" is used for mouse devices, "mobile" for touch-first devices.
  quality: {
    adaptive: true,         // true = automatically turn things down when the frame rate drops
    minFps: 45,             // below this, the scene steps down one level
    desktop: {
      pixelRatio: 2,        // sharpness cap. 1 = fastest, 2 = crisp on retina screens
      antialias: true,      // smooth edges
      grassBlades: true,    // individual blades of grass. false = soft shaded grass only   [panel]
      bladeCount: 30000,    // number of blades                                              [panel]
      flowers: 520,
      bloom: true,          // soft glow on the sun and gold highlights                     [panel]
      sparkles: 16,         // twinkles on the letters
      fuzzLayers: 8,        // layers the fur is drawn in. More = fuller fur, slower. 0 = flat velvet shading only
      letterDetail: 46      // smoothness of the balloon letters (30 = chunky, 60 = very smooth)
    },
    mobile: {
      pixelRatio: 1.5,
      antialias: true,
      grassBlades: true,
      bladeCount: 12000,
      flowers: 260,
      bloom: false,
      sparkles: 10,
      fuzzLayers: 5,
      letterDetail: 36
    }
  },

  posterImage: 'poster.jpg' // still image shown if the browser cannot run 3D
};

/* ============================== END OF CONFIG ============================== */

// Optional: a page can override settings without editing this file by defining
// window.DIORAMA_OPTIONS = { text: 'Hello', quality: { adaptive: false } } before this script.
(function merge(into, from) {
  if (!from) return;
  for (var k in from) {
    if (from[k] && typeof from[k] === 'object' && !Array.isArray(from[k]) && into[k] && typeof into[k] === 'object') merge(into[k], from[k]);
    else into[k] = from[k];
  }
})(CONFIG, window.DIORAMA_OPTIONS);

var T = window.THREE;
var FONT = window.DIORAMA_FONT;

function start() {
var root = document.getElementById('diorama') || document.querySelector('.diorama');
if (!root) return;

// ---------------------------------------------------------------- environment checks
function showFallback() {
  root.classList.add('dio-fallback');
  if (CONFIG.posterImage) root.style.backgroundImage = 'url("' + CONFIG.posterImage + '")';
}
var canvas = document.createElement('canvas');
canvas.setAttribute('aria-hidden', 'true');
var glOK = false;
try { glOK = !!(T && FONT && window.WebGL2RenderingContext && document.createElement('canvas').getContext('webgl2')); } catch (e) { glOK = false; }
if (!glOK) { showFallback(); return; }

var mqCoarse = window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false;
var IS_TOUCH = mqCoarse || ('ontouchstart' in window && navigator.maxTouchPoints > 0 && !window.matchMedia('(hover: hover)').matches);
var REDUCED = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
var Q = JSON.parse(JSON.stringify(IS_TOUCH ? CONFIG.quality.mobile : CONFIG.quality.desktop)); // live quality settings
var CALM = REDUCED ? 0.3 : 1; // scales idle motion when the visitor prefers reduced motion

// ---------------------------------------------------------------- small helpers
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
function rng(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function color(hex) { return new T.Color(hex); }

// Caps how bright a material's highlights can get, so one glinting pixel cannot flood the bloom.
function capHighlights(material, max) {
  material.onBeforeCompile = function (sh) {
    sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', 'outgoingLight *= min(1.0, ' + max.toFixed(2) + ' / max(max(outgoingLight.r, outgoingLight.g), max(outgoingLight.b, 0.001)));\n#include <opaque_fragment>');
  };
  return material;
}

// A damped spring: the source of every bounce, wobble and ease in the scene.
function Spring(k, c, x) { this.k = k; this.c = c; this.x = x || 0; this.v = 0; this.t = x || 0; }
Spring.prototype.step = function (dt) {
  var h = dt / 2;
  for (var i = 0; i < 2; i++) {
    this.v += (-this.k * (this.x - this.t) - this.c * this.v) * h;
    this.x += this.v * h;
  }
  return this.x;
};
Spring.prototype.snap = function (x) { this.x = x; this.t = x; this.v = 0; };

// ---------------------------------------------------------------- frame measurements
var F = CONFIG.frame, V = CONFIG.view, LOOK = CONFIG.look, SUN = CONFIG.sun;
var HW = F.tilesWide / 2, HH = F.tilesHigh / 2;          // half size of the whole frame
var OW = HW - F.borderTiles, OH = HH - F.borderTiles;     // half size of the opening
var TILE_T = 0.1;                                         // tile thickness
var LIP_BACK = TILE_T + F.lipDepth;                       // where the tiled lip ends and the world begins
var GROUND0 = -OH;                                        // ground level at the front edge
root.style.aspectRatio = F.tilesWide + ' / ' + F.tilesHigh;
root.style.setProperty('--dio-ui-bottom', ((F.borderTiles + 0.5) / F.tilesHigh * 100) + '%');

// ---------------------------------------------------------------- renderer, scene, camera
var renderer;
try {
  renderer = new T.WebGLRenderer({ canvas: canvas, antialias: !!Q.antialias, alpha: false, powerPreference: 'high-performance' });
} catch (e) { showFallback(); return; }
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.NeutralToneMapping;
renderer.toneMappingExposure = LOOK.exposure;
renderer.setClearColor(color(LOOK.horizon), 1);
root.insertBefore(canvas, root.firstChild);

var scene = new T.Scene();
var camera = new T.PerspectiveCamera(30, F.tilesWide / F.tilesHigh, 1, 400);
camera.matrixAutoUpdate = false;

// The camera is an off-axis "window" projection: the tile frame stays glued to the edges of the
// canvas while everything behind it shifts in perspective as the viewer's eye moves.
var eye = new T.Vector3(0, V.eyeHeight, V.distance);
function updateCamera() {
  var near = Math.max(1, eye.z - 1.6), far = eye.z + 330, s = near / eye.z;
  camera.projectionMatrix.makePerspective((-HW - eye.x) * s, (HW - eye.x) * s, (HH - eye.y) * s, (-HH - eye.y) * s, near, far);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  camera.matrix.makeTranslation(eye.x, eye.y, eye.z);
  camera.matrixWorld.copy(camera.matrix);
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
}
updateCamera();

// ---------------------------------------------------------------- shared shader pieces
var hazeColor = color(LOOK.horizon);
var U = {
  uTime: { value: 0 },
  uHazeColor: { value: hazeColor },
  uPointer: { value: new T.Vector3(0, 0, 0) },     // x, z on the ground, strength
  uGust: { value: new T.Vector4(1, -999, 0, 5) },  // direction, front position, strength, width
  uWind: { value: LOOK.windStrength * (REDUCED ? 0.35 : 1) },
  uDetail: { value: null }
};
// Each depth layer fades toward the horizon color by its own fixed amount (set in CONFIG.look).
var GLSL_HAZE = 'uniform vec3 uHazeColor; uniform float uHazeAmt;\nvec3 haze(vec3 c, vec3 wp) { return mix(c, uHazeColor, uHazeAmt); }';
var GLSL_END = '#include <tonemapping_fragment>\n#include <colorspace_fragment>';
// How a blade of grass (or a flower stem) leans: steady wind, the pointer pushing it, and swipe gusts.
var GLSL_SWAY = [
  'uniform float uTime; uniform vec3 uPointer; uniform vec4 uGust; uniform float uWind;',
  'vec2 swayAt(vec3 rootPos, float rnd) {',
  '  float ph = dot(rootPos.xz, vec2(0.42, 0.27)) + rnd * 6.2831;',
  '  vec2 b = vec2(0.30, 0.09) * (sin(uTime * 1.5 + ph) * 0.6 + sin(uTime * 2.6 + ph * 1.9) * 0.3 + 0.35) * uWind;',
  '  vec2 dp = rootPos.xz - uPointer.xy;',
  '  b += normalize(dp + vec2(1e-4)) * uPointer.z * exp(-dot(dp, dp) / 1.7) * 0.95;',
  '  float g = (rootPos.x - uGust.y) / uGust.w;',
  '  b.x += uGust.x * uGust.z * exp(-g * g) * 1.15;',
  '  float l = length(b);',
  '  return l > 1.15 ? b * (1.15 / l) : b;',
  '}'
].join('\n');

// A small repeating noise image used to mottle the grass. Built in code so there is nothing to download.
function makeDetailTexture() {
  var N = 256, data = new Uint8Array(N * N * 4);
  function layer(period, seed) {
    var g = new Float32Array(period * period), r = rng(seed);
    for (var i = 0; i < g.length; i++) g[i] = r();
    return function (x, y) {
      var fx = x / N * period, fy = y / N * period, x0 = Math.floor(fx), y0 = Math.floor(fy);
      var tx = fx - x0, ty = fy - y0; tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
      var x1 = (x0 + 1) % period, y1 = (y0 + 1) % period; x0 %= period; y0 %= period;
      return lerp(lerp(g[y0 * period + x0], g[y0 * period + x1], tx), lerp(g[y1 * period + x0], g[y1 * period + x1], tx), ty);
    };
  }
  var a1 = layer(4, 11), a2 = layer(8, 12), a3 = layer(16, 13), b1 = layer(64, 21), b2 = layer(128, 22), c1 = layer(16, 31), c2 = layer(32, 32);
  function stretch(v) { return clamp((v - 0.5) * 1.9 + 0.5, 0, 1) * 255; }
  for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
    var i = (y * N + x) * 4;
    data[i] = stretch(a1(x, y) * 0.5 + a2(x, y) * 0.3 + a3(x, y) * 0.2);
    data[i + 1] = stretch(b1(x, y) * 0.5 + b2(x, y) * 0.5);
    data[i + 2] = stretch(c1(x, y) * 0.6 + c2(x, y) * 0.4);
    data[i + 3] = 255;
  }
  var tex = new T.DataTexture(data, N, N, T.RGBAFormat);
  tex.wrapS = tex.wrapT = T.RepeatWrapping;
  tex.minFilter = T.LinearMipmapLinearFilter; tex.magFilter = T.LinearFilter;
  tex.generateMipmaps = true; tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  tex.needsUpdate = true;
  return tex;
}
U.uDetail.value = makeDetailTexture();

// ---------------------------------------------------------------- reflections (what the gold and the tiles mirror)
// Behind the frame: blue sky, green ground and the sun. In front of it: a soft, bright room with two light panels.
var sunWorld = new T.Vector3(), SUN_DEPTH = 125;   // the sun sits behind everything, even the painted background hills
function placeSun() {
  var depth = SUN_DEPTH, k = (V.distance + depth) / V.distance;
  sunWorld.set(SUN.x * k, V.eyeHeight + (SUN.y - V.eyeHeight) * k, -depth);
}
placeSun();
var sunDir = sunWorld.clone().normalize();
// The direction the landscape is lit from: side-on from the sun's side, so every shape has a sunny half and a
// shaded half, and shadows stretch across the grass away from the sun.
var keyDir = new T.Vector3(SUN.x < 0 ? -0.74 : 0.74, 0.6, 0.12).normalize();

(function buildEnvironment() {
  var envScene = new T.Scene();
  var mat = new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false,
    uniforms: {
      uTop: { value: color(LOOK.skyTop) }, uMid: { value: color(LOOK.skyMid) }, uHor: { value: color(LOOK.horizon) },
      uGrass: { value: color(LOOK.grassMid) }, uSun: { value: sunDir }, uSunCol: { value: color(SUN.color) }
    },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'varying vec3 vDir; uniform vec3 uTop, uMid, uHor, uGrass, uSun, uSunCol;',
      'float panel(vec3 d, vec3 c, vec3 r, vec3 u, vec2 size) {',
      '  float f = dot(d, c); if (f <= 0.0) return 0.0;',
      '  vec2 p = vec2(dot(d, r), dot(d, u)) / f;',
      '  return (1.0 - smoothstep(size.x * 0.8, size.x, abs(p.x))) * (1.0 - smoothstep(size.y * 0.8, size.y, abs(p.y)));',
      '}',
      'void main() {',
      '  vec3 d = normalize(vDir);',
      '  vec3 sky = mix(uHor * 1.25, uMid * 1.15, smoothstep(0.0, 0.25, d.y));',
      '  sky = mix(sky, uTop * 1.1, smoothstep(0.2, 0.9, d.y));',
      '  vec3 grd = mix(uHor * 1.15, mix(uGrass, vec3(0.95, 0.9, 0.55), 0.35) * 0.8, smoothstep(0.02, 0.5, -d.y));',
      '  vec3 back = mix(grd, sky, smoothstep(-0.04, 0.03, d.y));',
      '  float s = max(dot(d, uSun), 0.0);',
      '  back += uSunCol * (pow(s, 500.0) * 34.0 + pow(s, 30.0) * 1.6);',
      '  vec3 room = mix(vec3(0.07, 0.07, 0.08), vec3(0.36, 0.37, 0.39), smoothstep(-0.55, 0.2, d.y));',
      '  room = mix(room, vec3(1.7, 1.72, 1.76), smoothstep(0.45, 0.92, d.y));',
      '  room += vec3(8.2, 8.2, 8.3) * panel(d, normalize(vec3(-0.62, 0.46, 0.64)), vec3(0.72, 0.0, 0.7), vec3(0.0, 1.0, 0.0), vec2(0.34, 0.5));',
      '  room += vec3(5.0, 5.2, 5.6) * panel(d, normalize(vec3(0.74, 0.16, 0.65)), vec3(0.66, 0.0, -0.75), vec3(0.0, 1.0, 0.0), vec2(0.2, 0.62));',
      '  room += vec3(3.2) * panel(d, normalize(vec3(0.08, 0.72, 0.69)), vec3(1.0, 0.0, 0.0), vec3(0.0, 0.69, -0.72), vec2(0.7, 0.12));',
      '  room += vec3(5.2, 5.3, 5.6) * panel(d, normalize(vec3(-0.15, 0.1, 1.0)), vec3(1.0, 0.0, 0.15), vec3(0.0, 1.0, -0.1), vec2(0.13, 0.15));',   // windows for the tiles to catch
      '  room += vec3(3.4, 3.5, 3.7) * panel(d, normalize(vec3(0.2, -0.08, 1.0)), vec3(1.0, 0.0, -0.2), vec3(0.0, 1.0, 0.08), vec2(0.07, 0.13));',
      '  gl_FragColor = vec4(mix(back, room, smoothstep(-0.12, 0.12, d.z)), 1.0);',
      '}'
    ].join('\n'),
    toneMapped: false
  });
  envScene.add(new T.Mesh(new T.SphereGeometry(50, 48, 32), mat));
  var pmrem = new T.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(envScene, 0.015, 0.1, 100).texture;
  pmrem.dispose(); mat.dispose();
})();

var keyLight = new T.DirectionalLight(0xffffff, 2.3); keyLight.position.set(-6, 9, 15); scene.add(keyLight);
var rimLight = new T.DirectionalLight(color(SUN.color), 1.5); rimLight.position.copy(sunDir).multiplyScalar(20).add(new T.Vector3(0, 6, 0)); scene.add(rimLight);

// ---------------------------------------------------------------- the tile frame
(function buildFrame() {
  var W = F.tilesWide, H = F.tilesHigh, B = F.borderTiles, g = F.grout, th = TILE_T;
  var rows = Math.max(1, Math.round(F.lipDepth)), lipTile = F.lipDepth / rows;
  var geo = new T.RoundedBoxGeometry(1 - g, 1 - g, th, 3, 0.03);
  var count = W * H - (W - 2 * B) * (H - 2 * B) + rows * 2 * ((W - 2 * B) + (H - 2 * B));
  var mat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08, metalness: 0, envMapIntensity: 1.0 });
  mat.onBeforeCompile = function (sh) {
    // glazed tiles are very slightly domed, which is what makes each one catch the light differently
    sh.vertexShader = sh.vertexShader.replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nif (objectNormal.z > 0.9) objectNormal = normalize(objectNormal + vec3(position.xy * 0.085, 0.0));');
    sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', 'outgoingLight *= min(1.0, 1.7 / max(max(outgoingLight.r, outgoingLight.g), max(outgoingLight.b, 0.001)));\n#include <opaque_fragment>');
  };
  var tiles = new T.InstancedMesh(geo, mat, count);
  var d = new T.Object3D(), r = rng(7), n = 0, base = color(F.tileColor), c = new T.Color();
  function put() {
    d.rotation.x += (r() - 0.5) * 0.02; d.rotation.y += (r() - 0.5) * 0.02;   // real tiles are never set perfectly flat
    d.updateMatrix(); tiles.setMatrixAt(n, d.matrix);
    var v = (0.97 + r() * 0.03) * 0.45; c.copy(base).multiplyScalar(v); c.b *= 0.992 + r() * 0.008; tiles.setColorAt(n, c); n++;   // the 0.45 leaves headroom so reflections read brighter than the tile
  }
  var i, j, k;
  for (j = 0; j < H; j++) for (i = 0; i < W; i++) {
    if (i >= B && i < W - B && j >= B && j < H - B) continue;
    d.position.set(i + 0.5 - HW, j + 0.5 - HH, -th / 2); d.rotation.set(0, 0, 0); d.scale.set(1, 1, 1); put();
  }
  for (k = 0; k < rows; k++) {
    var z = -th - (k + 0.5) * lipTile;
    for (i = 0; i < W - 2 * B; i++) {
      d.scale.set(1, lipTile, 1);
      d.position.set(i + 0.5 - OW, -OH - th / 2, z); d.rotation.set(-Math.PI / 2, 0, 0); put();
      d.position.set(i + 0.5 - OW, OH + th / 2, z); d.rotation.set(Math.PI / 2, 0, 0); put();
    }
    for (j = 0; j < H - 2 * B; j++) {
      d.scale.set(lipTile, 1, 1);
      d.position.set(-OW - th / 2, j + 0.5 - OH, z); d.rotation.set(0, Math.PI / 2, 0); put();
      d.position.set(OW + th / 2, j + 0.5 - OH, z); d.rotation.set(0, -Math.PI / 2, 0); put();
    }
  }
  tiles.instanceMatrix.needsUpdate = true; tiles.instanceColor.needsUpdate = true;
  tiles.frustumCulled = false; tiles.renderOrder = -3;   // drawn first: the frame hides a lot of sky and grass behind it
  scene.add(tiles);

  // The caulk: a slightly recessed body the tiles sit on.
  var gi = 0.032, zb = -(LIP_BACK + 0.03), gm = new T.MeshStandardMaterial({ color: color(F.groutColor), roughness: 0.96, metalness: 0, envMapIntensity: 0.7 });
  function slab(x0, x1, y0, y1) {
    var m = new T.Mesh(new T.BoxGeometry(x1 - x0, y1 - y0, -gi - zb), gm);
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (zb - gi) / 2); m.renderOrder = -3; scene.add(m);
  }
  slab(-HW, HW, -HH, -OH - gi); slab(-HW, HW, OH + gi, HH);
  slab(-HW, -OW - gi, -OH - gi, OH + gi); slab(OW + gi, HW, -OH - gi, OH + gi);
})();

// ---------------------------------------------------------------- smudges and fingerprints on the tiles
// Small orange-red and yellow marks, some straddling the grout, so the wall looks lived with.
var smudgeMats = [];
function setSmudgeOpacity(v) { F.smudgeOpacity = clamp(v, 0, 1); for (var i = 0; i < smudgeMats.length; i++) { smudgeMats[i].opacity = F.smudgeOpacity * smudgeMats[i].userData.k; smudgeMats[i].visible = F.smudgeOpacity > 0.004; } }
(function buildSmudges() {
  var n = F.smudges | 0; if (n < 1) return;
  function lattice(seed, per) {
    var g = new Float32Array((per + 1) * (per + 1)), r = rng(seed), w = per + 1; for (var i = 0; i < g.length; i++) g[i] = r();
    return function (u, v) {
      var fx = clamp(u, 0, 0.9999) * per, fy = clamp(v, 0, 0.9999) * per, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
      tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
      return lerp(lerp(g[y0 * w + x0], g[y0 * w + x0 + 1], tx), lerp(g[(y0 + 1) * w + x0], g[(y0 + 1) * w + x0 + 1], tx), ty);
    };
  }
  function paint(kind, hex, seed) {
    var S = 128, c = document.createElement('canvas'); c.width = c.height = S;
    var ctx = c.getContext('2d'), img = ctx.createImageData(S, S), col = new T.Color(hex), n1 = lattice(seed, 6), n2 = lattice(seed + 9, 24), x, y;
    var R = Math.round(Math.pow(col.r, 1 / 2.2) * 255), G = Math.round(Math.pow(col.g, 1 / 2.2) * 255), B = Math.round(Math.pow(col.b, 1 / 2.2) * 255);
    for (y = 0; y < S; y++) for (x = 0; x < S; x++) {
      var u = x / S * 2 - 1, v = y / S * 2 - 1, a;
      if (kind === 0) {             // fingerprint: an oval of curved ridges
        var m = 1 - smooth(0.5, 0.95, Math.sqrt(u * u / 0.5 + v * v));
        var rr = Math.sqrt((u - 0.08) * (u - 0.08) * 1.3 + (v + 0.3) * (v + 0.3)) + (n1((u + 1) / 2, (v + 1) / 2) - 0.5) * 0.16;
        a = m * (0.22 + 0.78 * smooth(-0.25, 0.55, Math.sin(rr * 40))) * (0.45 + 0.55 * n1((v + 1) / 2, (u + 1) / 2));
      } else {                      // smear: a streaky swipe
        var ms = 1 - smooth(0.45, 1.0, Math.sqrt(u * u + v * v / 0.14));
        a = ms * (0.3 + 0.7 * n2((u + 1) / 2 * 0.3 + 0.2, (v + 1) / 2)) * (0.5 + 0.5 * n1((u + 1) / 2, 0.5));
      }
      var i = (y * S + x) * 4; img.data[i] = R; img.data[i + 1] = G; img.data[i + 2] = B; img.data[i + 3] = 255 * clamp(a, 0, 1);
    }
    ctx.putImageData(img, 0, 0);
    var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }
  var cols = F.smudgeColors, texs = [], i, r = rng(311);
  for (i = 0; i < 6; i++) {
    var m = new T.MeshBasicMaterial({ map: paint(i % 2, cols[(i >> 1) % cols.length], 50 + i * 7), transparent: true, depthWrite: false });
    m.userData.k = 0.75 + r() * 0.5; smudgeMats.push(m);
  }
  var geo = new T.PlaneGeometry(1, 1), W = F.tilesWide, H = F.tilesHigh, B = F.borderTiles, ring = [];
  for (var j = 0; j < H; j++) for (i = 0; i < W; i++) if (!(i >= B && i < W - B && j >= B && j < H - B)) ring.push([i + 0.5 - HW, j + 0.5 - HH]);
  for (i = 0; i < n; i++) {
    var cell = ring[(r() * ring.length) | 0], mat = smudgeMats[(r() * smudgeMats.length) | 0], s = 0.2 + r() * 0.3;
    var mesh = new T.Mesh(geo, mat);
    mesh.position.set(clamp(cell[0] + (r() - 0.5) * 0.95, -HW + 0.2, HW - 0.2), clamp(cell[1] + (r() - 0.5) * 0.95, -HH + 0.2, HH - 0.2), 0.014);
    mesh.rotation.z = r() * 6.283; mesh.scale.set(s * (0.8 + r() * 0.6), s, 1); mesh.renderOrder = 20;
    scene.add(mesh);
  }
  setSmudgeOpacity(F.smudgeOpacity);
})();

// ---------------------------------------------------------------- the land: three layers of depth
// Foreground: real 3D ground with three distinct hills, no haze.
// Mid-ground: a second, flatter 3D ridge further back, slightly hazy.
// Background: a flat painted strip of very low hills, the haziest.
var HAZE = { fore: { value: LOOK.hazeFore / 100 }, mid: { value: LOOK.hazeMid / 100 }, back: { value: LOOK.hazeBack / 100 } };
var SHADOW = { value: LOOK.shadow };
var FORE_END = 25, MID_NEAR = 31, MID_FAR = 62, BACK_Z = -96;   // distances into the scene

function hillBump(x, z, h) {
  var dx = (x - h.x) / h.width, dz = (z - h.z) / h.depth, d = Math.sqrt(dx * dx + dz * dz);
  return d >= 1 ? 0 : h.height * Math.pow(0.5 * (1 + Math.cos(Math.PI * d)), 1.12);
}
function foreY(x, z) {
  var d = -z, bank = smooth(LIP_BACK - 0.1, LIP_BACK + 2.0, d);
  var y = GROUND0 - 0.07 + 0.34 * bank + Math.max(0, d - 6) * 0.02 + LOOK.foreRise * smooth(4, FORE_END, d);
  y += (Math.sin(x * 0.42 + 1.0) * Math.cos(z * 0.36 + 0.3) * 0.1 + Math.sin(x * 0.17 - z * 0.13 + 2.0) * 0.16) * bank;
  for (var i = 0; i < CONFIG.hills.length; i++) y += hillBump(x, z, CONFIG.hills[i]);
  return y - smooth(FORE_END - 0.5, FORE_END + 5.5, d) * 8;   // the foreground falls away behind its hills, so the next layer reads as separate
}
function midY(x, z) {
  var d = -z;
  var rise = smooth(MID_NEAR, MID_NEAR + 15, d);   // a plain that climbs gently out from behind the foreground, then rolls
  var y = -2.9 + (d - 40) * 0.03 + (Math.sin(x * 0.075 + 0.9) * 0.8 + Math.sin(x * 0.135 - 1.1) * 0.3 + Math.cos(z * 0.12 + x * 0.03) * 0.22) * rise;
  return y - (1 - rise) * 2.3 - smooth(MID_FAR - 8, MID_FAR, d) * 7;
}
function groundY(x, z) { return -z < FORE_END + 5.75 ? foreY(x, z) : midY(x, z); }
function groundNormal(x, z, out) {
  var e = 0.06, dx = (groundY(x + e, z) - groundY(x - e, z)) / (2 * e), dz = (groundY(x, z + e) - groundY(x, z - e)) / (2 * e), l = Math.sqrt(dx * dx + 1 + dz * dz);
  out[0] = -dx / l; out[1] = 1 / l; out[2] = -dz / l; return out;
}
// How sunlit a patch of ground is (0 = turned away from the sun, 1 = facing it).
function sunlitAt(x, z) { var n = groundNormal(x, z, [0, 0, 0]); return smooth(0.45, 0.86, (n[0] * keyDir.x + n[1] * keyDir.y + n[2] * keyDir.z) * 0.5 + 0.5); }

var MAX_BLOBS = 24, blobs = [];
for (var bi = 0; bi < MAX_BLOBS; bi++) blobs.push(new T.Vector4(0, 0, 1, 0));
var shadowDir = new T.Vector2(-keyDir.x, -keyDir.z).normalize();   // which way shadows fall across the ground
var SHADE = { uBlobs: { value: blobs }, uBlobCount: { value: 0 }, uShadowDir: { value: shadowDir }, uShadow: SHADOW };
var GLSL_SHADE = [
  'uniform vec4 uBlobs[MAX_BLOBS]; uniform int uBlobCount; uniform vec2 uShadowDir; uniform float uShadow;',
  'float blobShade(vec2 p) {',      // soft shadows cast by the shapes and the words, stretched away from the sun
  '  float sh = 1.0;',
  '  for (int i = 0; i < MAX_BLOBS; i++) {',
  '    if (i >= uBlobCount) break;',
  '    vec4 b = uBlobs[i]; vec2 q = p - b.xy - uShadowDir * b.z * 0.9;',
  '    float d = length(vec2(dot(q, uShadowDir) / 2.0, dot(q, vec2(-uShadowDir.y, uShadowDir.x)))) / b.z;',
  '    sh *= 1.0 - b.w * (1.0 - smoothstep(0.5, 1.0, d));',
  '  }',
  '  return sh;',
  '}',
  'vec3 shadeTint(float sh) { return mix(mix(vec3(1.0), vec3(0.1, 0.24, 0.32), min(uShadow * 1.3, 1.0)), vec3(1.0), sh); }',
  'float slopeLight(float lit) { return mix(1.0 - 0.6 * uShadow, 1.06, lit); }'
].join('\n');

function groundMaterial(haze) {
  return new T.ShaderMaterial({
    uniforms: {
      uTime: U.uTime, uDetail: U.uDetail, uHazeColor: U.uHazeColor, uHazeAmt: haze, uPointer: U.uPointer, uGust: U.uGust,
      uDeep: { value: color(LOOK.grassDeep) }, uMid: { value: color(LOOK.grassMid) }, uLight: { value: color(LOOK.grassLight) },
      uLightDir: { value: keyDir }, uBlobs: SHADE.uBlobs, uBlobCount: SHADE.uBlobCount, uShadowDir: SHADE.uShadowDir, uShadow: SHADE.uShadow, uFront: { value: LIP_BACK }
    },
    defines: { MAX_BLOBS: MAX_BLOBS },
    vertexShader: 'varying vec3 vW; varying vec3 vN; void main(){ vW = position; vN = normal; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'varying vec3 vW; varying vec3 vN;',
      'uniform sampler2D uDetail; uniform float uTime; uniform vec3 uDeep, uMid, uLight, uLightDir, uPointer; uniform vec4 uGust; uniform float uFront;',
      GLSL_HAZE, GLSL_SHADE,
      'void main() {',
      '  vec3 n = normalize(vN); vec2 p = vW.xz;',
      '  float pat = texture2D(uDetail, p * 0.033).r;',
      '  float mid = texture2D(uDetail, p * 0.17 + 0.37).b;',
      '  float fuzz = texture2D(uDetail, p * vec2(1.7, 0.95)).g;',
      '  float fine = texture2D(uDetail, p * vec2(5.3, 2.9) + 0.21).g;',
      '  float wave = sin(dot(p, vec2(0.55, 0.22)) - uTime * 1.15 + pat * 5.0) * 0.5 + 0.5;',
      '  float tone = pat * 0.62 + mid * 0.13 + fuzz * 0.12 + fine * 0.06 + wave * 0.07;',
      '  vec3 c = mix(uDeep, uMid, smoothstep(0.22, 0.55, tone));',
      '  c = mix(c, uLight, smoothstep(0.5, 0.92, tone));',
      '  c *= slopeLight(smoothstep(0.45, 0.86, dot(n, uLightDir) * 0.5 + 0.5));',   // hillsides turned from the sun go dark
      '  vec3 v = normalize(cameraPosition - vW);',
      '  c += uLight * pow(1.0 - max(dot(n, v), 0.0), 3.0) * 0.14;',
      '  float g = (p.x - uGust.y) / uGust.w; c += uLight * uGust.z * exp(-g * g) * 0.16;',
      '  vec2 dp = p - uPointer.xy; c += uLight * uPointer.z * exp(-dot(dp, dp) / 1.4) * 0.12;',
      '  c *= shadeTint(blobShade(p));',
      '  c *= mix(0.55, 1.0, smoothstep(0.0, 3.4, -vW.z - uFront));',                 // the frame shading the front of the box
      '  gl_FragColor = vec4(haze(c, vW), 1.0);',
      GLSL_END,
      '}'
    ].join('\n')
  });
}
function buildTerrain(d0, d1, nx, nz, power, haze, order) {
  var pos = new Float32Array((nx + 1) * (nz + 1) * 3), nor = new Float32Array(pos.length), idx = [], p = 0, i, j, n = [0, 0, 0];
  for (j = 0; j <= nz; j++) {
    var z = -d0 - (d1 - d0) * Math.pow(j / nz, power), hw = 9.5 + 0.6 * -z;
    for (i = 0; i <= nx; i++) {
      var x = (i / nx * 2 - 1) * hw; groundNormal(x, z, n);
      pos[p] = x; pos[p + 1] = groundY(x, z); pos[p + 2] = z; nor[p] = n[0]; nor[p + 1] = n[1]; nor[p + 2] = n[2]; p += 3;
    }
  }
  for (j = 0; j < nz; j++) for (i = 0; i < nx; i++) { var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1; idx.push(a, b, c, b, c + 1, c); }
  var geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('normal', new T.BufferAttribute(nor, 3)); geo.setIndex(idx);
  var mesh = new T.Mesh(geo, groundMaterial(haze)); mesh.frustumCulled = false; mesh.renderOrder = order; scene.add(mesh);
  return mesh;
}
buildTerrain(LIP_BACK - 0.06, FORE_END + 5.7, 130, 120, 1.5, HAZE.fore, 1);
buildTerrain(MID_NEAR, MID_FAR, 90, 30, 1.0, HAZE.mid, 2);

// The background: one flat sheet with its hills painted on by a tiny shader. Costs almost nothing to draw.
(function buildBackdrop() {
  var mat = new T.ShaderMaterial({
    alphaToCoverage: true,
    uniforms: { uMid: { value: color(LOOK.grassMid) }, uLight: { value: color(LOOK.grassLight) }, uDeep: { value: color(LOOK.grassDeep) }, uHazeColor: U.uHazeColor, uHazeAmt: HAZE.back, uShadow: SHADOW },
    vertexShader: 'varying vec2 vP; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xy; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: [
      'varying vec2 vP; uniform vec3 uMid, uLight, uDeep, uHazeColor; uniform float uHazeAmt, uShadow;',
      'void main() {',
      '  float x = vP.x, y = vP.y;',
      '  float r1 = 2.1 + sin(x * 0.043 + 0.6) * 0.95 + sin(x * 0.097 + 2.0) * 0.3 + sin(x * 0.019 + 4.0) * 0.55;',   // the far ridge line
      '  float r2 = -0.4 + sin(x * 0.036 + 2.7) * 0.75 + sin(x * 0.081 + 0.4) * 0.28;',                                // a nearer swell
      '  float e = fwidth(y) * 1.3 + 0.001;',
      '  float alpha = 1.0 - smoothstep(r1 - e, r1 + e, y);',
      '  if (alpha < 0.02) discard;',
      '  float s1 = cos(x * 0.043 + 0.6) * 0.041 + cos(x * 0.097 + 2.0) * 0.029;',                                      // slope: positive climbs to the right
      '  float s2 = cos(x * 0.036 + 2.7) * 0.027 + cos(x * 0.081 + 0.4) * 0.023;',
      '  vec3 far = mix(uMid, uLight, 0.42) * (1.0 - uShadow * 0.3 * smoothstep(-0.01, 0.04, -s1));',
      '  vec3 near = mix(uMid, uLight, 0.2) * (1.0 - uShadow * 0.34 * smoothstep(-0.01, 0.04, -s2));',
      '  vec3 c = mix(far, near, 1.0 - smoothstep(r2 - e, r2 + e, y));',
      '  c *= 0.9 + 0.1 * smoothstep(-6.0, 2.0, y);',
      '  gl_FragColor = vec4(mix(c, uHazeColor, uHazeAmt), alpha);',
      GLSL_END,
      '}'
    ].join('\n')
  });
  var m = new T.Mesh(new T.PlaneGeometry(300, 34), mat); m.position.set(0, -8, BACK_Z); m.frustumCulled = false; m.renderOrder = 3; scene.add(m);
})();

// ---------------------------------------------------------------- individual grass blades (optional layer, foreground only)
var bladeMesh = null;
function buildBlades() {
  if (bladeMesh || !Q.grassBlades || Q.bladeCount < 1) return;
  var n = Q.bladeCount, r = rng(99), dNear = LIP_BACK + 0.12, dFar = 21, wide = IS_TOUCH ? 1.55 : 1;
  var list = new Array(n), i;
  for (i = 0; i < n; i++) {
    var d = dNear + (dFar - dNear) * Math.pow(r(), 1.5), z = -d, x = (r() * 2 - 1) * (8.2 + 0.52 * d);
    list[i] = { x: x, z: z, d: d, yaw: (r() - 0.5) * 2.0, rnd: r(),
      h: (0.2 + 0.22 * r()) * (1 + d * 0.035) * (1 - smooth(dFar * 0.72, dFar, d)) * smooth(dNear, dNear + 0.5, d + 0.25),
      w: 0.05 * (1 + d * 0.075) * wide };
  }
  list.sort(function (a, b) { return a.d - b.d; }); // nearest first, so the GPU can skip hidden pixels
  var rootArr = new Float32Array(n * 3), info = new Float32Array(n * 4), litArr = new Float32Array(n);
  for (i = 0; i < n; i++) {
    var b = list[i];
    rootArr[i * 3] = b.x; rootArr[i * 3 + 1] = groundY(b.x, b.z) - 0.02; rootArr[i * 3 + 2] = b.z;
    info[i * 4] = b.yaw; info[i * 4 + 1] = b.h; info[i * 4 + 2] = b.w; info[i * 4 + 3] = b.rnd;
    litArr[i] = sunlitAt(b.x, b.z);
  }
  var geo = new T.InstancedBufferGeometry();
  geo.setAttribute('position', new T.BufferAttribute(new Float32Array([
    -0.5, 0, 0, 0.5, 0, 0, -0.4, 0.36, 0, 0.4, 0.36, 0, -0.24, 0.7, 0, 0.24, 0.7, 0, 0, 1, 0]), 3));
  geo.setIndex([0, 1, 3, 0, 3, 2, 2, 3, 5, 2, 5, 4, 4, 5, 6]);
  geo.setAttribute('aRoot', new T.InstancedBufferAttribute(rootArr, 3));
  geo.setAttribute('aInfo', new T.InstancedBufferAttribute(info, 4));
  geo.setAttribute('aLit', new T.InstancedBufferAttribute(litArr, 1));
  geo.instanceCount = n;
  var mat = new T.ShaderMaterial({
    side: T.DoubleSide, defines: { MAX_BLOBS: MAX_BLOBS },
    uniforms: {
      uTime: U.uTime, uPointer: U.uPointer, uGust: U.uGust, uWind: U.uWind, uDetail: U.uDetail, uHazeColor: U.uHazeColor, uHazeAmt: HAZE.fore,
      uBlobs: SHADE.uBlobs, uBlobCount: SHADE.uBlobCount, uShadowDir: SHADE.uShadowDir, uShadow: SHADE.uShadow,
      uDeep: { value: color(LOOK.grassDeep) }, uMid: { value: color(LOOK.grassMid) }, uLight: { value: color(LOOK.grassLight) }, uFront: { value: LIP_BACK }
    },
    vertexShader: [
      'attribute vec3 aRoot; attribute vec4 aInfo; attribute float aLit; uniform sampler2D uDetail;',
      'varying float vT; varying vec3 vW; varying float vTone; varying vec3 vShade;',
      GLSL_SWAY, GLSL_SHADE,
      'void main() {',
      '  float t = position.y, h = aInfo.y;',
      '  vec2 side = vec2(cos(aInfo.x), sin(aInfo.x));',
      '  vec2 b = swayAt(aRoot, aInfo.w); float bl = length(b);',
      '  vec3 p = aRoot;',
      '  p.xz += side * position.x * aInfo.z + b * t * t * h;',
      '  p.y += h * t * (1.0 - 0.3 * bl * bl * t);',
      '  vW = p; vT = t; vTone = texture2D(uDetail, aRoot.xz * 0.033).r * 0.6 + aInfo.w * 0.4;',
      '  vShade = shadeTint(blobShade(aRoot.xz)) * slopeLight(aLit);',
      '  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying float vT; varying vec3 vW; varying float vTone; varying vec3 vShade; uniform vec3 uDeep, uMid, uLight; uniform float uFront;',
      GLSL_HAZE,
      'void main() {',
      '  vec3 c = mix(uDeep * 0.9, uMid, smoothstep(0.0, 0.6, vT));',
      '  c = mix(c, uLight, smoothstep(0.4, 1.0, vT) * (0.45 + 0.55 * vTone));',
      '  c *= (0.84 + 0.3 * vTone) * vShade;',
      '  c *= mix(0.6, 1.0, smoothstep(0.0, 3.4, -vW.z - uFront));',
      '  gl_FragColor = vec4(haze(c, vW), 1.0);',
      GLSL_END,
      '}'
    ].join('\n')
  });
  bladeMesh = new T.Mesh(geo, mat); bladeMesh.frustumCulled = false; bladeMesh.renderOrder = -1; scene.add(bladeMesh);
}
function setBladeCount(n) {   // rebuilds the grass with a different number of blades
  if (bladeMesh) { scene.remove(bladeMesh); bladeMesh.geometry.dispose(); bladeMesh.material.dispose(); bladeMesh = null; }
  Q.bladeCount = Math.max(0, n | 0);
  if (Q.grassBlades) buildBlades();
}
function setBlades(on) {
  Q.grassBlades = !!on;
  if (on) buildBlades();
  if (bladeMesh) bladeMesh.visible = !!on;
}

// ---------------------------------------------------------------- tiny flowers
var flowerGeo = null, flowerTotal = 0;
(function buildFlowers() {
  var n = Math.max(CONFIG.quality.desktop.flowers, CONFIG.quality.mobile.flowers, Q.flowers) | 0;
  if (n < 1) return;
  flowerTotal = n;
  var r = rng(5), clusters = [], i;
  for (i = 0; i < 56; i++) { var d = LIP_BACK + 0.6 + 21 * Math.pow(r(), 1.2); clusters.push([(r() * 2 - 1) * (7.6 + 0.5 * d), -d]); }
  var rootArr = new Float32Array(n * 3), info = new Float32Array(n * 4);
  for (i = 0; i < n; i++) {
    var c = clusters[(r() * clusters.length) | 0], a = r() * 6.283, rad = Math.sqrt(-2 * Math.log(1 - r() * 0.98)) * 0.75;
    var x = c[0] + Math.cos(a) * rad, z = clamp(c[1] + Math.sin(a) * rad * 0.8, -FORE_END + 1, -LIP_BACK - 0.25), dd = -z;
    rootArr[i * 3] = x; rootArr[i * 3 + 1] = groundY(x, z); rootArr[i * 3 + 2] = z;
    info[i * 4] = (0.075 + r() * 0.05) * (1 + dd * 0.035);      // flower size
    info[i * 4 + 1] = (0.2 + r() * 0.16) * (1 + dd * 0.02);     // stem height
    info[i * 4 + 2] = r();
    info[i * 4 + 3] = Math.floor(r() * 4);                       // which petal color
  }
  var geo = new T.InstancedBufferGeometry();
  // head quad (z = 0) and stem quad (z = 1)
  geo.setAttribute('position', new T.BufferAttribute(new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0, -1, 0, 1, 1, 0, 1, 1, 1, 1, -1, 1, 1]), 3));
  geo.setIndex([4, 5, 6, 4, 6, 7, 0, 1, 2, 0, 2, 3]);
  geo.setAttribute('aRoot', new T.InstancedBufferAttribute(rootArr, 3));
  geo.setAttribute('aInfo', new T.InstancedBufferAttribute(info, 4));
  geo.instanceCount = Math.min(n, Q.flowers);
  var mat = new T.ShaderMaterial({
    side: T.DoubleSide, alphaToCoverage: true,
    uniforms: { uTime: U.uTime, uPointer: U.uPointer, uGust: U.uGust, uWind: U.uWind, uHazeColor: U.uHazeColor, uHazeAmt: HAZE.fore, uStem: { value: color(LOOK.grassMid) } },
    vertexShader: [
      'attribute vec3 aRoot; attribute vec4 aInfo;',
      'varying vec2 vUv; varying float vPart; varying vec3 vW; varying vec2 vKind;',
      GLSL_SWAY,
      'void main() {',
      '  float h = aInfo.y; vec2 b = swayAt(aRoot, aInfo.z) * 0.8; float bl = length(b);',
      '  vec3 p;',
      '  if (position.z < 0.5) {',
      '    p = aRoot + vec3(b.x * h, h * (1.0 - 0.3 * bl * bl), b.y * h);',
      '    p.xy += position.xy * aInfo.x; p.z += 0.02;',
      '  } else {',
      '    float t = position.y;',
      '    p = aRoot + vec3(b.x * h * t * t + position.x * 0.011, h * t * (1.0 - 0.3 * bl * bl * t), b.y * h * t * t);',
      '  }',
      '  vUv = position.xy; vPart = position.z; vW = p; vKind = vec2(aInfo.w, aInfo.z);',
      '  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec2 vUv; varying float vPart; varying vec3 vW; varying vec2 vKind; uniform vec3 uStem;',
      GLSL_HAZE,
      'void main() {',
      '  vec3 c; float alpha = 1.0;',
      '  if (vPart > 0.5) { c = uStem * 0.8; }',
      '  else {',
      '    float r = length(vUv), a = atan(vUv.y, vUv.x) + vKind.y * 6.2831;',
      '    float edge = 0.5 + 0.46 * pow(abs(cos(a * 2.5)), 0.65);',
      '    alpha = 1.0 - smoothstep(edge - fwidth(r) * 1.5, edge, r);',
      '    if (alpha < 0.5) discard;',
      '    vec3 petal = vKind.x < 0.5 ? vec3(1.0) : vKind.x < 1.5 ? vec3(1.0, 0.62, 0.8) : vKind.x < 2.5 ? vec3(1.0, 0.9, 0.42) : vec3(0.8, 0.68, 1.0);',
      '    vec3 heart = vKind.x > 1.5 && vKind.x < 2.5 ? vec3(1.0, 0.5, 0.12) : vec3(1.0, 0.76, 0.12);',
      '    c = mix(heart, petal * (0.86 + 0.14 * r / edge), smoothstep(0.2, 0.3, r));',
      '  }',
      '  gl_FragColor = vec4(haze(c, vW), alpha);',
      GLSL_END,
      '}'
    ].join('\n')
  });
  var mesh = new T.Mesh(geo, mat); mesh.frustumCulled = false; scene.add(mesh);
  flowerGeo = geo;
})();

// ---------------------------------------------------------------- sky
(function buildSky() {
  var mat = new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false,
    uniforms: { uTop: { value: color(LOOK.skyTop) }, uMid: { value: color(LOOK.skyMid) }, uHor: { value: color(LOOK.horizon) }, uSun: { value: sunDir }, uSunCol: { value: color(SUN.color) } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'varying vec3 vDir; uniform vec3 uTop, uMid, uHor, uSun, uSunCol;',
      'void main() {',
      '  vec3 d = normalize(vDir); float h = clamp(d.y / 0.3, 0.0, 1.0);',
      '  vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.3, h)); c = mix(c, uTop, smoothstep(0.25, 1.0, h));',
      '  float s = max(dot(d, uSun), 0.0); c += uSunCol * (pow(s, 90.0) * 0.07 + pow(s, 10.0) * 0.03);',
      '  gl_FragColor = vec4(c, 1.0);',
      GLSL_END,
      '}'
    ].join('\n')
  });
  var sky = new T.Mesh(new T.SphereGeometry(250, 32, 20), mat); sky.frustumCulled = false; sky.renderOrder = 50; scene.add(sky);
})();

// ---------------------------------------------------------------- the sun and its rays
// The rays are soft, see-through triangles. Each one keeps changing its own length (from tiny to very long),
// width and brightness, so the sun never looks the same twice.
var SUN_REACH = 16;   // the sun's sheet reaches this many tiles from its center; the longest ray cannot go further
var sunUniforms = {
  uTime: U.uTime, uCol: { value: color(SUN.color) }, uRayCol: { value: color(SUN.rayColor) }, uCalm: { value: CALM }, uGain: { value: 0.035 },
  uCount: { value: SUN.rays }, uCount2: { value: SUN.rays2 }, uLen: { value: new T.Vector2(SUN.rayMin / SUN_REACH, SUN.rayMax / SUN_REACH) },
  uWidth: { value: SUN.rayWidth }, uGlow: { value: SUN.rayGlow }, uSpeed: { value: SUN.raySpeed }
};
var sunMesh = (function buildSun() {
  var k = (V.distance + SUN_DEPTH) / V.distance, size = SUN_REACH * 2 * k;
  var mat = new T.ShaderMaterial({
    transparent: true, depthWrite: false, blending: T.AdditiveBlending, uniforms: sunUniforms,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv * 2.0 - 1.0; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'varying vec2 vUv; uniform float uTime, uCalm, uGain, uCount, uCount2, uWidth, uGlow, uSpeed; uniform vec2 uLen; uniform vec3 uCol, uRayCol;',
      'float h1(float n) { return fract(sin(n * 127.1) * 43758.5453); }',
      'float wander(float x) { float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(h1(i), h1(i + 1.0), f); }',
      // One ring of rays. spin sets which way and how fast it turns; every ray fades in and out and changes width and length on its own.
      'float rayLayer(float a, float r, float t, float n, float spin, float seed, float reach) {',
      '  float seg = 6.2831853 / n, rot = t * spin * uCalm;',
      '  float k = floor((a - rot) / seg + 0.5), da = (a - rot) - k * seg, id = mod(k + n, n) + seed;',
      '  float grow = wander(id * 17.31 + t * 0.21), wide = wander(id * 7.77 + 40.0 + t * 0.33), bright = wander(id * 3.3 + 90.0 + t * 0.45);',
      '  float len = mix(uLen.x, uLen.y, pow(grow, 1.7)) * reach, r0 = 0.05, u = (r - r0) / max(len, 0.002);',
      '  float halfBase = r0 * tan(min(seg * 0.34 * uWidth * (0.3 + 1.2 * wide), 1.2));',
      '  float hw = halfBase * max(1.0 - u, 0.0), soft = hw * 0.75 + 0.0025;',
      '  float ray = (1.0 - smoothstep(hw - soft, hw + soft, abs(r * sin(da)))) * smoothstep(-0.02, 0.1, u) * (1.0 - smoothstep(0.5, 1.0, u));',
      '  return ray * (0.06 + 0.94 * bright * bright) * uGlow;',
      '}',
      'void main() {',
      '  float r = length(vUv), a = atan(vUv.y, vUv.x), t = uTime * uSpeed;',
      '  float disc = 1.0 - smoothstep(0.0255, 0.0285, r);',
      '  float halo = exp(-r * 58.0) * 0.55 + exp(-r * 20.0) * (0.1 + 0.05 * sin(t * 0.9));',
      '  float ray = rayLayer(a, r, t, max(floor(uCount + 0.5), 1.0), 0.07, 0.0, 1.0) + 0.75 * rayLayer(a, r, t, max(floor(uCount2 + 0.5), 1.0), -0.05, 50.0, 0.62);',
      '  vec3 c = uCol * (disc * 3.0 + halo * 1.7 * uGain) + uRayCol * ray * 0.9 * uGain;',
      '  gl_FragColor = vec4(c, 1.0);',
      GLSL_END,
      '}'
    ].join('\n')
  });
  var sun = new T.Mesh(new T.PlaneGeometry(size, size), mat); sun.position.copy(sunWorld); sun.renderOrder = -5; sun.frustumCulled = false; scene.add(sun);
  return sun;
})();
function setSunX(x) {
  SUN.x = x; placeSun(); sunDir.copy(sunWorld).normalize(); sunMesh.position.copy(sunWorld);
  rimLight.position.copy(sunDir).multiplyScalar(20).add(new T.Vector3(0, 6, 0));
}

// ---------------------------------------------------------------- clouds: high wisps and low puffy cumulus, all drifting right
var clouds = [], CLOUDS = CONFIG.clouds;
(function buildClouds() {
  // Paints one soft, wispy cloud from layered noise: long streaks, feathered to nothing at the edges.
  function cirrusTexture(seed) {
    var Wc = 384, Hc = 192, c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
    var ctx = c.getContext('2d'), img = ctx.createImageData(Wc, Hc), r = rng(seed * 977), layers = [], o, x, y;
    for (o = 0; o < 5; o++) {
      var per = 4 << o, g = new Float32Array((per + 1) * (per + 1));
      for (x = 0; x < g.length; x++) g[x] = r();
      layers.push({ per: per, g: g });
    }
    function fbm(u, v) {
      var sum = 0, amp = 0.5, tot = 0;
      for (var o = 0; o < 5; o++) {
        var L2 = layers[o], fx = u * L2.per, fy = v * L2.per, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0, w = L2.per + 1;
        tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
        x0 = Math.min(x0, L2.per - 1); y0 = Math.min(y0, L2.per - 1);
        sum += amp * lerp(lerp(L2.g[y0 * w + x0], L2.g[y0 * w + x0 + 1], tx), lerp(L2.g[(y0 + 1) * w + x0], L2.g[(y0 + 1) * w + x0 + 1], tx), ty);
        tot += amp; amp *= 0.55;
      }
      return sum / tot;
    }
    for (y = 0; y < Hc; y++) for (x = 0; x < Wc; x++) {
      var u = x / Wc, v = y / Hc, dx = (u - 0.5) / 0.5, dy = (v - 0.52) / 0.42;
      var mask = clamp(1 - (dx * dx + dy * dy), 0, 1); mask = mask * mask * (3 - 2 * mask);
      var n = fbm(u * 0.42 + 0.1, v * 0.95) * 0.65 + fbm(u * 0.9 + 0.05, v * 0.9 + 0.05) * 0.35;  // stretched sideways = wispy
      var a = smooth(0.42, 0.72, n * (0.55 + 0.75 * mask)) * mask;
      var lit = 0.9 + 0.1 * clamp((fbm(u * 0.42 + 0.1, v * 0.95 - 0.04) - n) * 9 + 0.6, 0, 1);
      var i = (y * Wc + x) * 4;
      img.data[i] = 255 * lit; img.data[i + 1] = 255 * lit; img.data[i + 2] = 255 * Math.min(1, lit + 0.04); img.data[i + 3] = 255 * a * 0.9;
    }
    ctx.putImageData(img, 0, 0);
    var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }
  // Paints one cartoon cumulus: flat bottom, a big billowing head on the right (the way it is heading)
  // and smaller puffs trailing off to the left.
  function cumulusTexture(seed) {
    var Wc = 512, Hc = 256, c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
    var x = c.getContext('2d'), r = rng(seed * 313 + 5), base = 200, puffs = [], i, n = 15, g;
    for (i = 0; i < n; i++) {     // a row of overlapping billows along the flat base, growing toward the right
      var t = i / (n - 1), rad = lerp(15, 68, Math.pow(t, 1.35)) * (0.88 + r() * 0.26);
      puffs.push([lerp(58, 400, Math.pow(t, 0.8)) + (r() - 0.5) * 8, base - rad * 0.58, rad]);
    }
    puffs.push([322 + r() * 22, base - 104 - r() * 12, 50 + r() * 9], [396 + r() * 12, base - 96 - r() * 8, 44 + r() * 8], [258 + r() * 18, base - 76 - r() * 8, 38 + r() * 8]);
    puffs.push([40, base - 7, 12], [24, base - 5, 8]);
    for (i = 0; i < puffs.length; i++) {          // the white body, with soft edges
      var p = puffs[i]; g = x.createRadialGradient(p[0], p[1], 0, p[0], p[1], p[2]);
      var hard = lerp(0.25, 0.88, clamp((p[0] - 40) / 360, 0, 1));   // feathery on the left tail, crisper on the leading right
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(hard, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.beginPath(); x.arc(p[0], p[1], p[2], 0, 6.2832); x.fill();
    }
    x.globalCompositeOperation = 'source-atop';   // shading, only where there is cloud
    g = x.createLinearGradient(0, base - 150, 0, base);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(206,222,246,0)'); g.addColorStop(1, 'rgba(160,186,228,0.9)');
    x.fillStyle = g; x.fillRect(0, 0, Wc, Hc);
    for (i = 0; i < puffs.length; i++) {          // each puff lit from the upper left, so it reads as a round billow
      p = puffs[i]; g = x.createRadialGradient(p[0] - p[2] * 0.32, p[1] - p[2] * 0.38, 0, p[0] - p[2] * 0.1, p[1] - p[2] * 0.1, p[2] * 1.05);
      g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(0.55, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.beginPath(); x.arc(p[0], p[1], p[2], 0, 6.2832); x.fill();
    }
    x.globalCompositeOperation = 'destination-out';
    g = x.createLinearGradient(0, 0, Wc, 0);            // see-through tail on the left, nearly solid head on the right
    g.addColorStop(0, 'rgba(0,0,0,0.85)'); g.addColorStop(0.45, 'rgba(0,0,0,0.5)'); g.addColorStop(0.8, 'rgba(0,0,0,0.14)'); g.addColorStop(1, 'rgba(0,0,0,0.1)');
    x.fillStyle = g; x.fillRect(0, 0, Wc, Hc);
    // slice the bottom flat, with a slightly soft edge
    g = x.createLinearGradient(0, base - 7, 0, base + 1); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
    x.fillStyle = g; x.fillRect(0, base - 7, Wc, Hc);
    var tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; return tex;
  }
  var r = rng(42), i, w, mat, m;
  var wisps = [cirrusTexture(1), cirrusTexture(2), cirrusTexture(3)], nC = CLOUDS.cirrus | 0;
  for (i = 0; i < nC; i++) {
    w = 17 + r() * 18; mat = new T.MeshBasicMaterial({ map: wisps[i % 3], transparent: true, depthWrite: false, opacity: 0.7 + r() * 0.25 });
    mat.color.setRGB(1.3, 1.3, 1.28);
    m = new T.Mesh(new T.PlaneGeometry(w, w * 0.42), mat);
    // spread across the sky, with a few extra high on the left to balance the picture
    m.position.set(i % 3 === 0 ? -62 + r() * 44 : (i / nC * 2 - 1) * 60 + (r() - 0.5) * 14, 9.5 + r() * 6.5, -62 - r() * 16);
    m.renderOrder = -7 + i * 0.01; scene.add(m); clouds.push({ mesh: m, speed: (0.22 + r() * 0.2) * CALM, push: 0, kind: 0 });   // drawn before the sun, so the sun shines through the wisps
  }
  var puffy = [cumulusTexture(1), cumulusTexture(2), cumulusTexture(3)], nP = CLOUDS.cumulus | 0;
  for (i = 0; i < nP; i++) {
    w = 15 + r() * 10; mat = new T.MeshBasicMaterial({ map: puffy[i % 3], transparent: true, depthWrite: false });
    mat.color.setRGB(1.32, 1.32, 1.32); mat.opacity = CLOUDS.opacity;
    m = new T.Mesh(new T.PlaneGeometry(w, w * 0.5), mat);
    m.position.set(((i + 0.5) / nP * 2 - 1) * 58 + (r() - 0.5) * 16, 5.4 + r() * 3.4, -44 - i * 3.2 - r() * 2);
    m.renderOrder = -3 + i * 0.01; scene.add(m); clouds.push({ mesh: m, speed: (0.5 + r() * 0.3) * CALM, push: 0, kind: 1 });
  }
})();

// ---------------------------------------------------------------- fuzzy pastel shapes
// Each shape is "inflated" from a simple mathematical description so every edge is pillowy.
function softMax(a, k) { var s = 0; for (var i = 0; i < a.length; i++) s += Math.exp(k * a[i]); return Math.log(s) / k; }
var SOFT = {
  cube: function (x, y, z) { var a = 0.5; return softMax([x - a, -x - a, y - a, -y - a, z - a, -z - a], 9); },
  pyramid: function (x, y, z) { var s = 0.49, c = 0.872, h = 0.62 * s; return softMax([-y - 0.42, c * x + s * y - h, -c * x + s * y - h, c * z + s * y - h, -c * z + s * y - h], 10); },
  cylinder: function (x, y, z) { return softMax([y - 0.55, -y - 0.55, Math.sqrt(x * x + z * z) - 0.43], 11); },
  cone: function (x, y, z) { var s = 0.42, c = 0.9075; return softMax([-y - 0.45, c * Math.sqrt(x * x + z * z) + s * y - 0.62 * s], 10); }
};
function softGeo(sdf) {
  var src = new T.IcosahedronGeometry(1, 12).attributes.position, n = src.count;
  var P = new Float32Array(n * 3), N = new Float32Array(n * 3), v = new T.Vector3(), minY = 1e9, maxY = -1e9, e = 0.003, i, k;
  for (i = 0; i < n; i++) {
    v.fromBufferAttribute(src, i).normalize();
    var lo = 0, hi = 3;
    for (k = 0; k < 20; k++) { var m = (lo + hi) / 2; if (sdf(v.x * m, v.y * m, v.z * m) < 0) lo = m; else hi = m; }
    var t = (lo + hi) / 2, x = v.x * t, y = v.y * t, z = v.z * t;
    var gx = sdf(x + e, y, z) - sdf(x - e, y, z), gy = sdf(x, y + e, z) - sdf(x, y - e, z), gz = sdf(x, y, z + e) - sdf(x, y, z - e);
    var l = Math.sqrt(gx * gx + gy * gy + gz * gz) || 1;
    P[i * 3] = x; P[i * 3 + 1] = y; P[i * 3 + 2] = z; N[i * 3] = gx / l; N[i * 3 + 1] = gy / l; N[i * 3 + 2] = gz / l;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  var sc = 1 / (maxY - minY);
  for (i = 0; i < n; i++) { P[i * 3] *= sc; P[i * 3 + 1] = (P[i * 3 + 1] - minY) * sc; P[i * 3 + 2] *= sc; }
  var g = new T.BufferGeometry();
  g.setAttribute('position', new T.BufferAttribute(P, 3)); g.setAttribute('normal', new T.BufferAttribute(N, 3));
  g.computeBoundingSphere(); g.computeBoundingBox();
  return g;
}
var shapeGeoCache = {};
function shapeGeo(type) {
  if (shapeGeoCache[type]) return shapeGeoCache[type];
  var g;
  if (type === 'sphere') { g = new T.SphereGeometry(0.5, 44, 30); g.translate(0, 0.5, 0); }
  else if (type === 'ring') { g = new T.TorusGeometry(0.33, 0.17, 24, 60); g.translate(0, 0.5, 0); }   // stands upright like a doughnut on its edge
  else g = softGeo(SOFT[type] || SOFT.cube);
  shapeGeoCache[type] = g;
  return g;
}

// The fuzzy look: a velvety, cuddly surface. The body is shaded softly with a clear dark side,
// then a few thin "shells" just outside it carry short tufts, which gives the fluffy outline.
var M = CONFIG.motion, SH = CONFIG.shapes, shapes = [], shapeMeshes = [];
var FUZZ = { len: { value: SH.fuzz }, width: { value: SH.furWidth }, rich: { value: SH.richness }, grain: { value: IS_TOUCH ? 17 : 24 } };
function fuzzMaterial(col, shell, size, haze) {
  return new T.ShaderMaterial({
    uniforms: {
      uColor: { value: col }, uShell: { value: shell }, uSize: { value: size }, uBaseY: { value: 0 },
      uFuzz: FUZZ.len, uFurW: FUZZ.width, uRich: FUZZ.rich, uGrain: FUZZ.grain, uShadow: SHADOW, uLightDir: { value: keyDir }, uHazeColor: U.uHazeColor, uHazeAmt: haze
    },
    vertexShader: [
      'uniform float uShell, uFuzz, uSize; varying vec3 vN; varying vec3 vW; varying vec3 vO;',
      'void main() {',
      '  vO = position * uSize;',
      '  vec4 w = modelMatrix * vec4(position + normal * (uShell * uFuzz / uSize), 1.0);',
      '  vW = w.xyz; vN = normalize(normalMatrix * normal);',
      '  gl_Position = projectionMatrix * viewMatrix * w;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 uColor, uLightDir; uniform float uShell, uSize, uBaseY, uRich, uGrain, uShadow, uFurW, uFuzz; varying vec3 vN; varying vec3 vW; varying vec3 vO;',
      GLSL_HAZE,
      'float fh(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }',
      'float fnoise(vec3 x) { vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);',
      '  return mix(mix(mix(fh(i), fh(i + vec3(1, 0, 0)), f.x), mix(fh(i + vec3(0, 1, 0)), fh(i + vec3(1, 1, 0)), f.x), f.y),',
      '             mix(mix(fh(i + vec3(0, 0, 1)), fh(i + vec3(1, 0, 1)), f.x), mix(fh(i + vec3(0, 1, 1)), fh(i + vec3(1, 1, 1)), f.x), f.y), f.z); }',
      'void main() {',
      // fur: space is divided into little cells with one strand in each. Higher layers keep a thinner core of the strand,
      // so every strand tapers to a tip, and each layer is nudged downward so the fur droops a little.
      '  vec3 q = (vO + vec3(0.0, uShell * uFuzz * 0.7, 0.0)) * uGrain, cell = floor(q);',
      '  float g = fh(cell + 7.3);',
      '  vec3 off = fract(q) - 0.5 - (vec3(fh(cell), fh(cell + 3.1), fh(cell + 5.7)) - 0.5) * 0.45;',
      '  if (uShell > 0.0 && length(off) > uFurW * (1.05 - uShell * 0.8) * (0.7 + 0.6 * g)) discard;',
      '  vec3 n = normalize(vN), v = normalize(cameraPosition - vW);',
      '  float lum = dot(uColor, vec3(0.299, 0.587, 0.114));',
      '  vec3 base = max(mix(vec3(lum), uColor, uRich), 0.0);',
      '  float lit = smoothstep(-0.18, 0.62, dot(n, uLightDir));',                         // soft edge between the sunny side and the shaded side
      '  vec3 dark = base * mix(vec3(1.0), vec3(0.3, 0.27, 0.52), uShadow);',            // the shaded side: darker and a little cooler
      '  dark = mix(vec3(dot(dark, vec3(0.299, 0.587, 0.114))), dark, 1.0 + 0.45 * uShadow);',
      '  vec3 c = mix(dark, base * 1.07, lit);',
      '  c += vec3(0.16, 0.34, 0.12) * max(-n.y, 0.0) * 0.22;',                          // a little green bounced up from the grass
      '  float rim = pow(1.0 - max(dot(n, v), 0.0), 2.3);',
      '  c += (base * 0.45 + 0.3) * rim * (0.1 + 0.32 * lit);',                          // velvet sheen toward the edges
      '  c *= (0.62 + 0.2 * g) + uShell * 0.52;',                                        // dark down at the roots, bright at the tips
      '  c *= mix(1.0 - 0.4 * uShadow, 1.0, smoothstep(0.0, 0.42 * uSize, vW.y - uBaseY));', // darker where it meets the ground
      '  gl_FragColor = vec4(haze(c, vW), 1.0);',
      GLSL_END,
      '}'
    ].join('\n')
  });
}
var noRaycast = function () {};
function makeShape(spec) {
  var col = color(spec.color), geo = shapeGeo(spec.type), group = new T.Group(), haze = spec.layer === 1 ? HAZE.mid : HAZE.fore;
  var gn = groundNormal(spec.x, spec.z, [0, 0, 0]);   // the slope under the shape: it leans by half of it, so it sits into the hill
  var baseY = groundY(spec.x, spec.z) - spec.size * (0.05 + 0.2 * Math.sqrt(Math.max(0, 1 - gn[1] * gn[1]))), layers = Math.max(0, Q.fuzzLayers | 0), mats = [], mesh = null, i;
  for (i = 0; i <= layers; i++) {
    var mat = fuzzMaterial(col, layers ? i / layers : 0, spec.size, haze), m = new T.Mesh(geo, mat);
    mat.uniforms.uBaseY.value = baseY;
    m.scale.setScalar(spec.size); m.rotation.y = spec.turn; group.add(m); mats.push(mat);
    if (i === 0) mesh = m; else { m.raycast = noRaycast; m.userData.shell = i; }
  }
  group.position.set(spec.x, baseY, spec.z); scene.add(group);
  var o = {
    group: group, mesh: mesh, mats: mats, x: spec.x, z: spec.z, size: spec.size, baseY: baseY, foot: spec.size * (spec.type === 'ring' ? 0.4 : spec.type === 'sphere' ? 0.42 : 0.55),
    squash: new Spring(170, 8.5), leanX: new Spring(85, 9), leanZ: new Spring(85, 9), shiver: new Spring(300, 9),
    y: 0, vy: 0, air: false, press: 0, hover: false, awayX: 0, awayZ: 0, ph: shapes.length * 1.7 + 0.4,
    tiltX: Math.atan2(gn[2], gn[1]) * 0.5, tiltZ: -Math.atan2(gn[0], gn[1]) * 0.5
  };
  mesh.userData.shape = o; shapes.push(o); shapeMeshes.push(mesh);
}

// Decides where every shape goes. The same seed always gives the same arrangement.
function scatterShapes() {
  var r = rng((SH.seed | 0) * 7919 + 101), n = clamp(SH.count | 0, 0, 20);
  var nMid = n >= 10 ? 3 : n >= 7 ? 2 : n >= 4 ? 1 : 0, nFore = n - nMid;
  var minS = SH.minSize, maxS = SH.minSize * Math.max(1, SH.maxScale), out = [], i, j, tries;
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = (r() * (i + 1)) | 0, t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var types = shuffled(SH.types), cols = shuffled(SH.colors);
  function clear(x, z, rad) { for (var k = 0; k < out.length; k++) { var dx = x - out[k].x, dz = z - out[k].z; if (Math.sqrt(dx * dx + dz * dz) < (rad + out[k].size * 0.55) * 0.95) return false; } return true; }
  function add(x, z, size, layer) { out.push({ type: types[out.length % types.length], color: cols[out.length % cols.length], x: x, z: z, size: size, layer: layer, turn: r() * 6.283 }); }
  function sized(t) { return lerp(minS, maxS, clamp(t, 0, 1)); }

  // 1. hilltops: big shapes crown the two side hills, a small one sits on the little middle hill
  var crown = [0.82 + r() * 0.18, 0.55 + r() * 0.25, r() * 0.15], H = CONFIG.hills;
  for (i = 0; i < Math.min(H.length, 3, nFore); i++) add(H[i].x + (r() - 0.5) * H[i].width * 0.22, H[i].z + (r() - 0.5) * H[i].depth * 0.2, sized(crown[i]), 0);

  // 2. the rest of the foreground: big toward the sides and the back, small in the middle and up close
  var m = nFore - out.length, near = SH.nearest, far = FORE_END - 4, depthSlots = [];
  for (i = 0; i < m; i++) depthSlots.push(i);
  depthSlots = shuffled(depthSlots);
  for (i = 0; i < m; i++) {
    for (tries = 0; tries < 40; tries++) {
      var xn = clamp(((i + r()) / m) * 2 - 1 + (tries > 8 ? (r() - 0.5) * 0.5 : 0), -1, 1), back = (depthSlots[i] + r()) / m;
      if (tries > 16) back = r();
      var big = smooth(0.5, 0.95, Math.abs(xn)) * smooth(0.3, 0.75, back);
      var size = sized(big * (0.7 + 0.3 * r()) + r() * 0.1);
      var d = Math.max(lerp(near, far, back), near + size * 0.55), x = xn * 6.3 * (V.distance + d) / V.distance;
      if (clear(x, -d, size * 0.55)) { add(x, -d, size, 0); break; }
    }
  }
  // 3. two or three far away on the mid-ground hills
  for (j = 0; j < nMid; j++) add(((j + 0.5) / nMid * 2 - 1) * 15 + (r() - 0.5) * 6, -(MID_NEAR + 9 + r() * 13), sized(0.75 + r() * 0.25), 1);
  return out;
}
function rebuildShapes() {
  var i, j;
  for (i = 0; i < shapes.length; i++) { scene.remove(shapes[i].group); for (j = 0; j < shapes[i].mats.length; j++) shapes[i].mats[j].dispose(); }
  shapes.length = 0; shapeMeshes.length = 0;
  var specs = scatterShapes();
  for (i = 0; i < specs.length; i++) makeShape(specs[i]);
  setFuzzLayers(Q.fuzzLayers);
}
function setFuzzLayers(n) {   // how many of the fuzz layers are drawn (fewer = faster)
  Q.fuzzLayers = Math.max(0, n | 0);
  for (var i = 0; i < shapes.length; i++) shapes[i].group.children.forEach(function (m) { if (m.userData.shell) m.visible = m.userData.shell <= Q.fuzzLayers; });
}
rebuildShapes();

function startleShape(o, fromX, fromZ) {
  var dx = o.x - fromX, dz = o.z - fromZ, l = Math.sqrt(dx * dx + dz * dz) || 1;
  if (l < 0.15) { dx = 0; dz = -1; l = 1; }
  o.awayX = dx / l; o.awayZ = dz / l;
  o.shiver.v += (Math.random() < 0.5 ? -1 : 1) * 7;
  o.squash.v -= 0.9;
}
function pressShape(o) { if (o.press <= 0 && !o.air) o.press = 0.11; }
function updateShapes(dt, t) {
  for (var i = 0; i < shapes.length; i++) {
    var o = shapes[i];
    o.squash.t = o.hover ? -0.07 : 0;
    o.leanX.t = o.hover ? o.awayX * M.hoverLean : 0;
    o.leanZ.t = o.hover ? o.awayZ * M.hoverLean : 0;
    if (o.press > 0) {                       // squish down, then let go
      o.press -= dt; o.squash.t = -0.36;
      if (o.press <= 0) { o.vy = M.hopHeight * Math.sqrt(Math.max(1, o.size / 1.6)); o.air = true; o.squash.v += 5; }
    }
    if (o.air) {                             // the soft hop and landing
      o.vy -= M.gravity * dt; o.y += o.vy * dt;
      if (o.y <= 0) {
        o.y = 0;
        if (o.vy < -1.3) { o.squash.v += Math.max(o.vy, -6) * 0.85; o.vy = -o.vy * 0.34; }
        else { o.vy = 0; o.air = false; }
      }
    }
    var sq = o.squash.step(dt) + Math.sin(t * 1.25 + o.ph) * 0.014 * CALM;
    var sy = clamp(1 + sq, 0.45, 1.6), sxz = 1 / Math.sqrt(sy);
    o.group.position.y = o.baseY + o.y;
    o.group.scale.set(sxz, sy, sxz);
    o.group.rotation.set(o.tiltX + o.leanZ.step(dt), 0, o.tiltZ - o.leanX.step(dt) + o.shiver.step(dt) * 0.12);
  }
}

// ---------------------------------------------------------------- balloon letters: turning font outlines into inflated foil
var L = CONFIG.letters, UPM = FONT.unitsPerEm, CAP = FONT.capHeight / UPM, glyphCache = {};

// Reads one character's outline from the font data and flattens its curves into short straight pieces.
function outlineOf(ch) {
  var g = FONT.glyphs[ch], i;
  if (!g) {
    if (/\s/.test(ch)) return { adv: 0.3, contours: [] };
    var pts = [];                              // a character the font does not have becomes a plain round balloon
    for (i = 0; i < 44; i++) { var a = i / 44 * Math.PI * 2; pts.push([0.37 + Math.cos(a) * 0.3, CAP / 2 + Math.sin(a) * 0.3]); }
    return { adv: 0.74, contours: [pts] };
  }
  var contours = [], cur = null, x = 0, y = 0, re = /([MLQCZ])([^MLQCZ]*)/g, m, s, t, u;
  function push(px, py) {
    var last = cur[cur.length - 1];
    if (!last || Math.abs(last[0] - px) + Math.abs(last[1] - py) > 1e-5) cur.push([px, py]);
    x = px; y = py;
  }
  while ((m = re.exec(g[1]))) {
    var a2 = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(function (n) { return Number(n) / UPM; }) : [];
    if (m[1] === 'M') { cur = []; contours.push(cur); push(a2[0], a2[1]); }
    else if (!cur) continue;
    else if (m[1] === 'L') push(a2[0], a2[1]);
    else if (m[1] === 'Q') { var x0 = x, y0 = y; for (s = 1; s <= 6; s++) { t = s / 6; u = 1 - t; push(u * u * x0 + 2 * u * t * a2[0] + t * t * a2[2], u * u * y0 + 2 * u * t * a2[1] + t * t * a2[3]); } }
    else if (m[1] === 'C') { var cx = x, cy = y; for (s = 1; s <= 8; s++) { t = s / 8; u = 1 - t; push(u * u * u * cx + 3 * u * u * t * a2[0] + 3 * u * t * t * a2[2] + t * t * t * a2[4], u * u * u * cy + 3 * u * u * t * a2[1] + 3 * u * t * t * a2[3] + t * t * t * a2[5]); } }
  }
  return { adv: g[0] / UPM, contours: contours.filter(function (c) { return c.length > 2; }) };
}

// Inflates a flat outline into a foil balloon.
// 1. Measure, on a fine grid, how far each point is from the outline (the seam).
// 2. Solve the "stretched membrane" equation so the surface swells the way a real balloon does:
//    fat in the middle of each stroke, pinched to nothing at the seam.
// 3. Stitch a front and a back skin together along the seam.
function inflate(contours, adv) {
  var segs = [], minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9, i, j, k, c, n;
  for (c = 0; c < contours.length; c++) {
    var pts = contours[c]; n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      if (Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) < 1e-6) continue;
      segs.push(p[0], p[1], q[0], q[1]);
      if (p[0] < minx) minx = p[0]; if (p[0] > maxx) maxx = p[0]; if (p[1] < miny) miny = p[1]; if (p[1] > maxy) maxy = p[1];
    }
  }
  if (!segs.length) return null;
  var cell = 1 / Q.letterDetail, pad = 2 * cell, x0 = minx - pad, y0 = miny - pad;
  var nx = Math.ceil((maxx - minx + 2 * pad) / cell) + 1, ny = Math.ceil((maxy - miny + 2 * pad) / cell) + 1, N = nx * ny;
  var D = new Float32Array(N), BX = new Float32Array(N), BY = new Float32Array(N), Uh = new Float32Array(N), ns = segs.length;

  for (j = 0; j < ny; j++) for (i = 0; i < nx; i++) {
    var px = x0 + i * cell, py = y0 + j * cell, best = 1e9, nbx = 0, nby = 0, wn = 0;
    for (k = 0; k < ns; k += 4) {
      var ax = segs[k], ay = segs[k + 1], bx = segs[k + 2], by = segs[k + 3], dx = bx - ax, dy = by - ay;
      var t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy); t = t < 0 ? 0 : t > 1 ? 1 : t;
      var qx = ax + dx * t, qy = ay + dy * t, dd = (px - qx) * (px - qx) + (py - qy) * (py - qy);
      if (dd < best) { best = dd; nbx = qx; nby = qy; }
      var left = dx * (py - ay) - (px - ax) * dy;
      if (ay <= py) { if (by > py && left > 0) wn++; } else if (by <= py && left < 0) wn--;
    }
    var d = Math.max(Math.sqrt(best), 1e-5);
    k = j * nx + i; D[k] = wn !== 0 ? d : -d; BX[k] = nbx; BY[k] = nby;
  }

  // membrane solve (successive over-relaxation with sub-cell accurate edges)
  var inside = [], TE = new Float32Array(N), TW = new Float32Array(N), TN = new Float32Array(N), TS = new Float32Array(N);
  function frac(d0, d1) { return d1 > 0 ? 1 : clamp(d0 / (d0 - d1), 0.08, 1); }
  for (k = 0; k < N; k++) if (D[k] > 0) {
    inside.push(k);
    TE[k] = frac(D[k], D[k + 1]); TW[k] = frac(D[k], D[k - 1]); TN[k] = frac(D[k], D[k + nx]); TS[k] = frac(D[k], D[k - nx]);
  }
  var ni = inside.length, it;
  for (it = 0; it < 150; it++) for (i = 0; i < ni; i++) {
    k = inside[i];
    var te = TE[k], tw = TW[k], tn = TN[k], ts = TS[k];
    var num = 0.5 + Uh[k + 1] / (te * (te + tw)) + Uh[k - 1] / (tw * (te + tw)) + Uh[k + nx] / (tn * (tn + ts)) + Uh[k - nx] / (ts * (tn + ts));
    Uh[k] += 1.72 * (num / (1 / (te * tw) + 1 / (tn * ts)) - Uh[k]);
  }
  var ref = L.strokeRef, zmax = 0.21;
  function zOf(k) {
    var r = Math.sqrt(Math.max(2 * Uh[k], 0)) * cell;
    var z = L.puff * ref * Math.pow(r / ref, L.crease);
    return zmax * Math.tanh(z / zmax);
  }

  // skin: walk every grid square and keep the part that is inside the letter
  var vid = new Int32Array(N).fill(-1), hid = new Int32Array(N).fill(-1), wid = new Int32Array(N).fill(-1);
  var P = [], S = [], I = [], ox = adv / 2, oy = CAP / 2;
  function nodeV(k) {
    if (vid[k] < 0) { vid[k] = P.length / 3; P.push(x0 + (k % nx) * cell - ox, y0 + Math.floor(k / nx) * cell - oy, zOf(k)); S.push(BX[k] - ox, BY[k] - oy, D[k]); }
    return vid[k];
  }
  function edgeH(k) { // seam point between k and its right neighbour
    if (hid[k] < 0) { var t = D[k] / (D[k] - D[k + 1]), x = x0 + (k % nx + t) * cell - ox, y = y0 + Math.floor(k / nx) * cell - oy; hid[k] = P.length / 3; P.push(x, y, 0); S.push(x, y, 0); }
    return hid[k];
  }
  function edgeV(k) { // seam point between k and the neighbour above
    if (wid[k] < 0) { var t = D[k] / (D[k] - D[k + nx]), x = x0 + (k % nx) * cell - ox, y = y0 + (Math.floor(k / nx) + t) * cell - oy; wid[k] = P.length / 3; P.push(x, y, 0); S.push(x, y, 0); }
    return wid[k];
  }
  var poly = [];
  for (j = 0; j < ny - 1; j++) for (i = 0; i < nx - 1; i++) {
    var a = j * nx + i, b = a + 1, cc = a + nx + 1, dn = a + nx;
    var ia = D[a] > 0, ib = D[b] > 0, ic = D[cc] > 0, id = D[dn] > 0;
    if (!ia && !ib && !ic && !id) continue;
    poly.length = 0;
    if (ia) poly.push(nodeV(a)); if (ia !== ib) poly.push(edgeH(a));
    if (ib) poly.push(nodeV(b)); if (ib !== ic) poly.push(edgeV(b));
    if (ic) poly.push(nodeV(cc)); if (ic !== id) poly.push(edgeH(dn));
    if (id) poly.push(nodeV(dn)); if (id !== ia) poly.push(edgeV(a));
    var apart = D[a] + D[b] + D[cc] + D[dn] <= 0;
    if (ia && ic && !ib && !id && apart) { I.push(poly[0], poly[1], poly[5], poly[3], poly[4], poly[2]); continue; }
    if (ib && id && !ia && !ic && apart) { I.push(poly[0], poly[1], poly[2], poly[3], poly[4], poly[5]); continue; }
    for (k = 1; k < poly.length - 1; k++) I.push(poly[0], poly[k], poly[k + 1]);
  }
  var nv = P.length / 3, pos = new Float32Array(nv * 6), seam = new Float32Array(nv * 6), idx = new Uint32Array(I.length * 2);
  for (i = 0; i < nv; i++) {
    pos[i * 3] = pos[(nv + i) * 3] = P[i * 3]; pos[i * 3 + 1] = pos[(nv + i) * 3 + 1] = P[i * 3 + 1];
    pos[i * 3 + 2] = P[i * 3 + 2]; pos[(nv + i) * 3 + 2] = -P[i * 3 + 2];
    for (k = 0; k < 3; k++) seam[i * 3 + k] = seam[(nv + i) * 3 + k] = S[i * 3 + k];
  }
  for (i = 0; i < I.length; i += 3) {
    idx[i] = I[i]; idx[i + 1] = I[i + 1]; idx[i + 2] = I[i + 2];
    idx[I.length + i] = I[i] + nv; idx[I.length + i + 1] = I[i + 2] + nv; idx[I.length + i + 2] = I[i + 1] + nv;
  }
  var geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.BufferAttribute(pos, 3));
  geo.setAttribute('aSeam', new T.BufferAttribute(seam, 3));
  geo.setIndex(new T.BufferAttribute(idx, 1));
  geo.computeVertexNormals(); geo.computeBoundingBox(); geo.computeBoundingSphere();
  geo.userData.frontCount = nv;
  return geo;
}
function buildGlyph(ch) {
  if (glyphCache[ch]) return glyphCache[ch];
  var o = outlineOf(ch), res = { adv: o.adv, geo: null };
  if (o.contours.length) res.geo = inflate(o.contours, o.adv);
  glyphCache[ch] = res;
  return res;
}

// The gold foil. A standard metal material plus two additions: seam wrinkles / foil dents, and a soft rim glow.
var goldUniforms = { uWrinkle: { value: new T.Vector4(0, 0.03, 46, 0) }, uGlow: { value: L.glow } };
var goldMat = new T.MeshStandardMaterial({ metalness: 1, roughness: L.roughness, envMapIntensity: L.shine });
goldMat.color.setRGB(L.color[0], L.color[1], L.color[2]);
goldMat.onBeforeCompile = function (sh) {
  sh.uniforms.uWrinkle = goldUniforms.uWrinkle; sh.uniforms.uGlow = goldUniforms.uGlow;
  sh.vertexShader = 'attribute vec3 aSeam;\nvarying vec3 vSeam;\nvarying vec3 vObj;\n' +
    sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvSeam = aSeam; vObj = position;');
  sh.fragmentShader = [
    'varying vec3 vSeam; varying vec3 vObj; uniform vec4 uWrinkle; uniform float uGlow;',
    'float dioHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }',
    'float dioNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(dioHash(i), dioHash(i + vec2(1.0, 0.0)), f.x), mix(dioHash(i + vec2(0.0, 1.0)), dioHash(i + vec2(1.0, 1.0)), f.x), f.y); }',
    ''
  ].join('\n') + sh.fragmentShader
    .replace('#include <normal_fragment_maps>', [
      '#include <normal_fragment_maps>',
      '{',
      '  float nearSeam = exp(-max(vSeam.z, 0.0) / uWrinkle.y);',
      '  float wr = (dioNoise(vSeam.xy * uWrinkle.z) * 0.6 + dioNoise(vSeam.xy * uWrinkle.z * 2.37 + 9.1) * 0.4) * nearSeam;',
      '  float cr = dioNoise(vObj.xy * 4.2 + vObj.z * 3.0) * 0.7 + dioNoise(vObj.xy * 9.5 + 3.3) * 0.3;',
      '  float bumpH = wr * uWrinkle.x + cr * uWrinkle.w;',
      '  vec3 sp = -vViewPosition; vec3 sx = dFdx(sp), sy = dFdy(sp);',
      '  vec3 r1 = cross(sy, normal), r2 = cross(normal, sx);',
      '  float det = dot(sx, r1);',
      '  vec3 grad = sign(det) * (dFdx(bumpH) * r1 + dFdy(bumpH) * r2);',
      '  normal = normalize(abs(det) * normal - grad);',
      '}'
    ].join('\n'))
    .replace('#include <opaque_fragment>', [
      '{ float fr = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.5); outgoingLight *= min(1.0, 5.0 / max(max(outgoingLight.r, outgoingLight.g), max(outgoingLight.b, 0.001))); outgoingLight += vec3(1.0, 0.78, 0.36) * fr * uGlow; }',
      '#include <opaque_fragment>'
    ].join('\n'));
};
var caretMat = capHighlights(new T.MeshStandardMaterial({ metalness: 1, roughness: L.roughness + 0.04, envMapIntensity: L.shine }), 5);
caretMat.color.copy(goldMat.color);

// ---------------------------------------------------------------- the words: letters on stacked arches, plus the gold block caret
var word = new T.Group(); word.position.set(0, L.y, L.z); scene.add(word);
var letters = [], dying = [], letterScale = new Spring(110, 14, L.size), LINE_H = 1.14;
var ROT = { max: L.rotateMax * Math.PI / 180, speed: L.rotateSpeed };

// The caret is deliberately not a balloon: a plain, sharp-edged gold block that blinks on and off like any text cursor.
var caret = { on: false, idx: 0, adv: 0.5, clock: 0, fresh: true, px: new Spring(1, 1), py: new Spring(1, 1), rz: new Spring(1, 1), holder: new T.Group(), turn: null };
caret.holder.add(new T.Mesh(new T.BoxGeometry(0.38, CAP * 1.08, 0.2), caretMat));
caret.holder.visible = false; word.add(caret.holder);

function cleanText(str) {   // at most maxLines lines of maxChars characters
  return String(str == null ? '' : str).replace(/\r/g, '').split('\n').slice(0, CONFIG.maxLines)
    .map(function (line) { return Array.from(line).slice(0, CONFIG.maxChars).join(''); }).join('\n');
}
function newTurn() { return { a: 0, b: 0, t: 1, d: 1 }; }
// One axis of a letter's slow wandering rotation: ease from one random angle to the next, lingering near the extremes.
function stepTurn(s, dt) {
  s.t += dt * ROT.speed / s.d;
  if (s.t >= 1) { s.a = s.b; s.b = (Math.random() < 0.5 ? -1 : 1) * (0.35 + 0.65 * Math.random()); s.t = 0; s.d = 3.4 + Math.random() * 4.4; }
  return (s.a + (s.b - s.a) * (s.t * s.t * (3 - 2 * s.t))) * ROT.max * CALM;
}
function makeLetter(ch) {
  var nl = ch === '\n', g = nl ? { adv: 0, geo: null } : buildGlyph(ch), holder = new T.Group(), mesh = null, r = Math.random;
  if (g.geo) { mesh = new T.Mesh(g.geo, goldMat); mesh.userData.word = true; holder.add(mesh); }
  holder.scale.setScalar(0.001); word.add(holder);
  return {
    ch: ch, nl: nl, adv: g.adv, holder: holder, mesh: mesh, fresh: true, delay: 0.0001,
    px: new Spring(95, 12), py: new Spring(95, 12), rz: new Spring(95, 12),
    pop: new Spring(210, 11, 0.001), wob: new Spring(120, 5.5),
    turn: [newTurn(), newTurn(), newTurn()], ph: [r() * 6.283, r() * 6.283]
  };
}

// Works out where every letter (and the caret, when it is showing) sits. Each line is its own centered arch.
function layout(instant) {
  var lines = [[]], i, k, gap = 0.02, widest = 0.001, it;
  for (i = 0; i <= letters.length; i++) {
    if (caret.on && i === Math.min(caret.idx, letters.length)) lines[lines.length - 1].push(caret);
    if (i < letters.length) { if (letters[i].nl) lines.push([]); else lines[lines.length - 1].push(letters[i]); }
  }
  var totals = lines.map(function (ln) { var t = 0; for (var j = 0; j < ln.length; j++) t += ln[j].adv; t += gap * Math.max(0, ln.length - 1); if (t > widest) widest = t; return t; });
  var S = Math.min(L.size, L.archWidth / widest, L.blockHeight / (lines.length * LINE_H));
  letterScale.t = S; if (instant) letterScale.snap(S);
  var R = L.archRadius, drop = 0;
  for (k = 0; k < lines.length; k++) {
    var s = 0, yOff = ((lines.length - 1) / 2 - k) * LINE_H * S;
    for (i = 0; i < lines[k].length; i++) {
      it = lines[k][i]; var phi = (s + it.adv / 2 - totals[k] / 2) * S / R; s += it.adv + gap;
      it.tx = R * Math.sin(phi); it.ty = R * Math.cos(phi) - R; it.tr = -phi;
      if (it.ty < drop) drop = it.ty;
      it.ty += yOff;
    }
  }
  for (k = 0; k < lines.length; k++) for (i = 0; i < lines[k].length; i++) {
    it = lines[k][i]; it.ty -= drop / 2;
    it.px.t = it.tx; it.py.t = it.ty; it.rz.t = it.tr;
    if (it.fresh || instant || it === caret) { it.px.snap(it.tx); it.py.snap(it.ty); it.rz.snap(it.tr); it.fresh = false; }
  }
  goldUniforms.uWrinkle.value.x = 0.0034 * L.wrinkle * S;
  goldUniforms.uWrinkle.value.w = 0.0085 * L.crumple * S;
}

// Changes the words. Letters that stay keep floating; new ones inflate in; removed ones deflate away.
function setText(str, opts) {
  opts = opts || {};
  var text = cleanText(str), chars = Array.from(text), old = letters, p = 0, s = 0, i;
  while (p < old.length && p < chars.length && old[p].ch === chars[p]) p++;
  while (s < old.length - p && s < chars.length - p && old[old.length - 1 - s].ch === chars[chars.length - 1 - s]) s++;
  var removed = old.slice(p, old.length - s), added = chars.slice(p, chars.length - s).map(makeLetter);
  for (i = 0; i < removed.length; i++) { var d = removed[i]; d.pop.t = 0; d.pop.k = 320; d.pop.c = 30; dying.push(d); }
  for (i = 0; i < added.length; i++) {
    if (opts.instant) { added[i].pop.snap(1); added[i].delay = 0; }
    else added[i].delay = 0.0001 + (opts.stagger ? (0.25 + i * 0.06) : i * 0.03);
  }
  letters = old.slice(0, p).concat(added, old.slice(old.length - s));
  layout(!!opts.instant);
  return text;
}

var unit = {
  rec: new Spring(60, 9), squash: new Spring(170, 9), bounce: new Spring(42, 4.6), rot: new Spring(110, 5.5), sway: new Spring(46, 6),
  hover: false, press: 0, dirX: 0
};
function jiggleLetters(amount) { for (var i = 0; i < letters.length; i++) letters[i].wob.v += (Math.random() - 0.5) * amount; }
function startleWord(fromX) {
  unit.dirX = clamp(-fromX / 5, -1, 1);
  unit.rot.v += (fromX >= 0 ? 1 : -1) * 0.55;
  unit.squash.v -= 0.7;
  jiggleLetters(2.6);
}
function pressWord() { if (unit.press <= 0) unit.press = 0.11; }

function updateWord(dt, t) {
  var i, l, h;
  unit.rec.t = unit.hover ? 1 : 0;
  unit.squash.t = 0;
  if (unit.press > 0) {
    unit.press -= dt; unit.squash.t = -0.2;
    if (unit.press <= 0) { unit.squash.v += 2.6; unit.bounce.v += M.wordBounce; jiggleLetters(3.4); }
  }
  var rec = unit.rec.step(dt), sq = unit.squash.step(dt), by = unit.bounce.step(dt), rot = unit.rot.step(dt), sw = unit.sway.step(dt);
  var sy = clamp(1 + sq, 0.5, 1.5), sx = 1 / Math.sqrt(sy), k = 1 - rec * 0.055;
  word.position.set(unit.dirX * rec * 0.38 + sw, L.y + by + (sy - 1) * 1.1 + rec * 0.1, L.z - rec * 0.65);
  word.scale.set(sx * k, sy * k, sx * k);
  word.rotation.z = rot;

  var S = letterScale.step(dt), fl = L.floatAmount * CALM;
  for (i = 0; i < letters.length; i++) {
    l = letters[i]; h = l.holder;
    if (l.delay > 0) { l.delay -= dt; if (l.delay <= 0) l.pop.t = 1; }
    if (!l.mesh) continue;
    h.position.set(l.px.step(dt), l.py.step(dt) + Math.sin(t * 0.9 + l.ph[0]) * 0.06 * S * fl, Math.sin(t * 0.55 + l.ph[1]) * 0.07 * S * fl);
    h.rotation.set(stepTurn(l.turn[0], dt), stepTurn(l.turn[1], dt), l.rz.step(dt) + stepTurn(l.turn[2], dt) + l.wob.step(dt) * 0.3);
    h.scale.setScalar(S * Math.max(0.001, l.pop.step(dt)));
  }
  for (i = dying.length - 1; i >= 0; i--) {
    l = dying[i]; var pop = l.pop.step(dt);
    l.holder.scale.setScalar(S * Math.max(0.001, pop));
    if (pop < 0.03 || !l.mesh) { word.remove(l.holder); dying.splice(i, 1); }
  }

  // the block caret: simply on, then off
  caret.clock += dt;
  caret.holder.visible = caret.on && (caret.clock % M.caretBlinkSeconds) < M.caretBlinkSeconds * 0.55;
  if (caret.holder.visible) {
    caret.holder.position.set(caret.px.x, caret.py.x, 0);
    if (!caret.turn) caret.turn = [newTurn(), newTurn(), newTurn()];
    caret.holder.rotation.set(stepTurn(caret.turn[0], dt), stepTurn(caret.turn[1], dt), caret.rz.x + stepTurn(caret.turn[2], dt));   // turns slowly, like the letters
    caret.holder.scale.setScalar(S);
  }
}
function setCaret(on, index) {
  var changed = on !== caret.on || index !== caret.idx;
  caret.on = on; caret.idx = index;
  if (changed) { caret.clock = 0; layout(false); }
}

// Soft shadows on the grass under the shapes and the words, pushed away from the sun.
function updateShadows() {
  var n = 0, i, strength = 0.45 + 0.5 * SHADOW.value;
  for (i = 0; i < shapes.length && n < MAX_BLOBS - 4; i++) {
    var o = shapes[i];
    blobs[n++].set(o.x, o.z, o.foot * (1.25 + o.y * 0.25), Math.min(0.95, strength) / (1 + o.y * 0.7));
  }
  var withMesh = [], S = letterScale.x;
  for (i = 0; i < letters.length; i++) if (letters[i].mesh) withMesh.push(letters[i]);
  var room = MAX_BLOBS - n, step = Math.max(1, Math.ceil(withMesh.length / room));
  for (i = 0; i < withMesh.length && n < MAX_BLOBS; i += step) {
    blobs[n++].set(word.position.x + withMesh[i].holder.position.x * word.scale.x + shadowDir.x * 2.2, word.position.z + shadowDir.y * 2.2, 0.8 * S * Math.sqrt(step), 0.1 + 0.08 * SHADOW.value);
  }
  SHADE.uBlobCount.value = n;
}

// ---------------------------------------------------------------- sparkles: brief twinkles on the gold
var sparkleMax = Math.max(CONFIG.quality.desktop.sparkles, CONFIG.quality.mobile.sparkles, Q.sparkles) | 0, sparkles = null;
(function buildSparkles() {
  if (sparkleMax < 1) return;
  var pos = new Float32Array(sparkleMax * 3), seed = new Float32Array(sparkleMax * 3), st = [], r = rng(77);
  for (var i = 0; i < sparkleMax; i++) {
    seed[i * 3] = r(); seed[i * 3 + 1] = 0.22 + r() * 0.3; seed[i * 3 + 2] = 0.45 + r() * 0.5;
    st.push({ cycle: -1, letter: null, p: new T.Vector3() });
  }
  var geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('aSeed', new T.BufferAttribute(seed, 3));
  var uni = { uTime: U.uTime, uPx: { value: 400 } };
  var mat = new T.ShaderMaterial({
    transparent: true, depthWrite: false, blending: T.AdditiveBlending, uniforms: uni,
    vertexShader: [
      'attribute vec3 aSeed; uniform float uTime, uPx; varying float vTw;',
      'void main() {',
      '  float ph = fract(uTime * aSeed.y + aSeed.x);',
      '  vTw = pow(sin(ph * 3.14159), 5.0);',
      '  vec4 mv = viewMatrix * vec4(position, 1.0);',
      '  gl_PointSize = max(1.0, aSeed.z * (0.35 + 0.65 * vTw) * uPx * projectionMatrix[1][1] / -mv.z);',
      '  gl_Position = projectionMatrix * mv;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying float vTw;',
      'void main() {',
      '  vec2 q = abs(gl_PointCoord * 2.0 - 1.0); float r = length(q);',
      '  float star = pow(max(0.0, 1.0 - (q.x * q.y * 30.0 + r * 0.95)), 1.6);',
      '  vec3 c = vec3(1.0, 0.95, 0.78) * (star * 1.5 + exp(-r * r * 30.0) * 2.4) * vTw;',
      '  gl_FragColor = vec4(c, 1.0);',
      GLSL_END,
      '}'
    ].join('\n')
  });
  var pts = new T.Points(geo, mat); pts.frustumCulled = false; pts.renderOrder = 5; scene.add(pts);
  sparkles = { geo: geo, st: st, seed: seed, pos: pos, uni: uni, pts: pts };
})();
var tmpV = new T.Vector3();
function updateSparkles(t) {
  if (!sparkles) return;
  var n = Math.min(sparkleMax, Q.sparkles | 0), i, withMesh = [];
  sparkles.pts.visible = n > 0;
  if (!n) return;
  for (i = 0; i < letters.length; i++) if (letters[i].mesh && letters[i].pop.x > 0.6) withMesh.push(letters[i]);
  for (i = 0; i < n; i++) {
    var s = sparkles.st[i], cyc = Math.floor(t * sparkles.seed[i * 3 + 1] + sparkles.seed[i * 3]);
    if (cyc !== s.cycle || !s.letter || s.letter.holder.parent !== word) {   // each twinkle picks a new spot
      s.cycle = cyc; s.letter = withMesh.length ? withMesh[(Math.random() * withMesh.length) | 0] : null;
      if (s.letter) {
        var g = s.letter.mesh.geometry, a = g.attributes.position, vi = 0, tries = 0;
        do { vi = (Math.random() * g.userData.frontCount) | 0; tries++; } while (a.getZ(vi) < 0.04 && tries < 8);
        s.p.set(a.getX(vi), a.getY(vi), a.getZ(vi) + 0.02);
      }
    }
    if (s.letter) { tmpV.copy(s.p); s.letter.mesh.localToWorld(tmpV); } else tmpV.set(0, -999, 0);
    sparkles.pos[i * 3] = tmpV.x; sparkles.pos[i * 3 + 1] = tmpV.y; sparkles.pos[i * 3 + 2] = tmpV.z;
  }
  sparkles.geo.setDrawRange(0, n);
  sparkles.geo.attributes.position.needsUpdate = true;
}

// ---------------------------------------------------------------- the text box (a real HTML text area layered over the scene)
// It is always there as an empty-looking one-line box. Hovering or tapping it reveals the words, ready to edit.
var ui = document.createElement('div');
ui.className = 'dio-ui';
ui.innerHTML = '<label class="dio-field" for="dio-text"><span class="dio-orb" aria-hidden="true"></span>' +
  '<span class="dio-sizer"><span class="dio-mirror" aria-hidden="true"><span></span></span>' +
  '<textarea class="dio-input" id="dio-text" rows="1" wrap="off" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Balloon text, up to ' + CONFIG.maxLines + ' lines"></textarea></span></label>';
root.appendChild(ui);
var input = ui.querySelector('textarea'), field = ui.querySelector('.dio-field'), sizer = ui.querySelector('.dio-sizer'), mirror = ui.querySelector('.dio-mirror span');
var justFocused = false, boxHover = false;

function caretIndex() {
  var end = input.selectionEnd == null ? input.value.length : input.selectionEnd;
  return Math.min(Array.from(input.value.slice(0, end)).length, letters.length);
}
function syncCaret() {
  var editing = document.activeElement === input;
  setCaret(editing || CONFIG.ui.caretAlwaysVisible, editing ? caretIndex() : letters.length);
}
// Sizes the box: one short empty line when resting, exactly as big as its text when open.
function fitBox() {
  var open = boxHover || document.activeElement === input;
  field.classList.toggle('is-open', open);
  mirror.textContent = input.value + (/\n$/.test(input.value) || !input.value ? '​' : '');
  if (open) {
    sizer.style.width = Math.ceil(mirror.parentNode.scrollWidth + 2) + 'px';
    sizer.style.height = Math.ceil(mirror.parentNode.scrollHeight) + 'px';
  } else { sizer.style.width = ''; sizer.style.height = ''; }
}
function syncText() {
  var pos = input.selectionEnd, kept = setText(input.value);
  if (kept !== input.value) {                         // trims anything past the line and character limits
    input.value = kept; pos = Math.min(pos, kept.length);
    try { input.setSelectionRange(pos, pos); } catch (e) {}
  }
  fitBox(); syncCaret();
}
input.addEventListener('input', syncText);
input.addEventListener('focus', function () {
  root.classList.add('is-editing'); justFocused = true; fitBox();
  requestAnimationFrame(function () { try { input.select(); } catch (e) {} syncCaret(); });
});
input.addEventListener('mouseup', function (e) { if (justFocused) { e.preventDefault(); justFocused = false; } });
input.addEventListener('blur', function () { root.classList.remove('is-editing'); justFocused = false; input.scrollTop = 0; input.scrollLeft = 0; fitBox(); syncCaret(); });
input.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') input.blur();
  else if (e.key === 'Enter' && input.selectionStart === input.selectionEnd && input.value.split('\n').length >= CONFIG.maxLines) e.preventDefault();
});
field.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { boxHover = true; fitBox(); } });
field.addEventListener('pointerleave', function () { boxHover = false; fitBox(); });
document.addEventListener('selectionchange', function () { if (document.activeElement === input) syncCaret(); });

// ---------------------------------------------------------------- viewing angle: mouse position, phone tilt, or finger drag
var viewX = new Spring(V.stiffness, V.damping), viewY = new Spring(V.stiffness, V.damping);
var tanX = Math.tan(V.maxAngleX * Math.PI / 180), tanY = Math.tan(V.maxAngleY * Math.PI / 180);
var VIEW_AMOUNT = REDUCED ? 0.3 : 1;
function lookToward(nx, ny) { viewX.t = clamp(nx, -1, 1) * VIEW_AMOUNT; viewY.t = clamp(ny, -1, 1) * VIEW_AMOUNT; }

var tilt = { active: false, asked: false, listening: false, bx: 0, by: 0, has: false };
function onOrient(e) {
  if (e.beta == null || e.gamma == null) return;
  var a = (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle : (window.orientation || 0);
  var x, y;                                    // x = left/right lean, y = forward/back lean, whichever way the phone is held
  if (a === 90) { x = e.beta; y = -e.gamma; }
  else if (a === 270 || a === -90) { x = -e.beta; y = e.gamma; }
  else if (a === 180) { x = -e.gamma; y = -e.beta; }
  else { x = e.gamma; y = e.beta; }
  if (!tilt.has || Math.abs(x - tilt.bx) > 60 || Math.abs(y - tilt.by) > 60) { tilt.has = true; tilt.bx = x; tilt.by = y; }
  tilt.bx += (x - tilt.bx) * 0.003; tilt.by += (y - tilt.by) * 0.003;   // "neutral" slowly follows how the phone is held
  tilt.active = true;
  var dx = (x - tilt.bx) / V.tiltRange, dy = (y - tilt.by) / V.tiltRange;
  lookToward((V.invertTiltX ? 1 : -1) * dx, (V.invertTiltY ? -1 : 1) * dy);
}
function listenTilt() { if (tilt.listening) return; tilt.listening = true; window.addEventListener('deviceorientation', onOrient); }
function askTilt() {              // iPhones only hand over motion data after a tap, and only on an https page
  if (tilt.asked || !V.tilt || REDUCED) return;
  tilt.asked = true;
  var DOE = window.DeviceOrientationEvent;
  if (!DOE) return;
  if (typeof DOE.requestPermission === 'function') {
    try { DOE.requestPermission().then(function (s) { if (s === 'granted') listenTilt(); }).catch(function () {}); } catch (e) {}
  } else listenTilt();
}
if (V.tilt && !REDUCED && IS_TOUCH && window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') listenTilt();
root.addEventListener('click', askTilt);
root.addEventListener('touchend', askTilt, { passive: true });

// ---------------------------------------------------------------- pointer: hover, click, tap, drag, swipe
var pointer = { inside: false, x: 0, y: 0, dirty: false, down: false, sx: 0, sy: 0, st: 0, gusted: false, touch: false, w: 1 };
var ray = new T.Raycaster(), ndc = new T.Vector2(), groundHit = { ok: false, x: 0, z: 0 }, pointerPower = 0;

function readPointer(e) {
  var r = canvas.getBoundingClientRect();
  pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
  pointer.w = r.width; pointer.dirty = true;
}
function pick() {
  ndc.set(pointer.x, pointer.y); ray.setFromCamera(ndc, camera);
  var o = ray.ray.origin, d = ray.ray.direction, gy = GROUND0 + 0.3;
  groundHit.ok = false;
  if (d.y < -1e-4) {
    var t = (gy - o.y) / d.y, gz = o.z + d.z * t;
    if (gz < -LIP_BACK && gz > -32) { groundHit.ok = true; groundHit.x = o.x + d.x * t; groundHit.z = gz; }
  }
  var best = ray.intersectObjects(shapeMeshes, false)[0] || null, meshes = [];
  for (var i = 0; i < letters.length; i++) if (letters[i].mesh) meshes.push(letters[i].mesh);
  var wh = ray.intersectObjects(meshes, false)[0];
  if (wh && (!best || wh.distance < best.distance)) return { word: true, point: wh.point };
  return best ? { shape: best.object.userData.shape, point: best.point } : null;
}
function setHover(h) {
  var s = h && h.shape ? h.shape : null, w = !!(h && h.word);
  for (var i = 0; i < shapes.length; i++) {
    var on = shapes[i] === s;
    if (on && !shapes[i].hover) startleShape(shapes[i], h.point.x, h.point.z);
    shapes[i].hover = on;
  }
  if (w && !unit.hover) startleWord(h.point.x - word.position.x);
  unit.hover = w;
  canvas.style.cursor = (s || w) ? 'pointer' : '';
}
function tap() {
  var h = pick();
  if (h && h.shape) pressShape(h.shape);
  else if (h && h.word) pressWord();
  else if (groundHit.ok) pointerPower = 1.8;        // a little pat on the grass
}

var gust = { active: false, dir: 1, front: 0 };
function startGust(dir) {
  if (REDUCED) return;
  gust.active = true; gust.dir = dir >= 0 ? 1 : -1; gust.front = -gust.dir * 24;
  for (var i = 0; i < clouds.length; i++) clouds[i].push += gust.dir * 2.4;
}
function updateGust(dt) {
  if (!gust.active) { U.uGust.value.z = 0; return; }
  var prev = gust.front, i; gust.front += gust.dir * 27 * dt;
  for (i = 0; i < shapes.length; i++) {
    var o = shapes[i];
    if ((o.x - prev) * (o.x - gust.front) <= 0) { o.leanX.v += gust.dir * 2.8; o.squash.v += 1.3; o.shiver.v += gust.dir * 3; }
  }
  if (prev * gust.front <= 0) { unit.sway.v += gust.dir * 3.4; unit.rot.v -= gust.dir * 0.45; jiggleLetters(3.2); }
  if (Math.abs(gust.front) > 32) gust.active = false;
  U.uGust.value.set(gust.dir, gust.front, 1, 5.5);
}

function inUI(e) { return ui.contains(e.target); }
root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') pointer.inside = true; });
root.addEventListener('pointerleave', function (e) {
  if (e.pointerType !== 'mouse') return;
  pointer.inside = false; pointer.dirty = true; lookToward(0, 0);
});
root.addEventListener('pointermove', function (e) {
  pointer.touch = e.pointerType !== 'mouse';
  if (inUI(e)) { if (pointer.inside) { pointer.inside = false; pointer.dirty = true; } return; }
  readPointer(e);
  if (!pointer.touch) {
    pointer.inside = true;
    var sgn = V.invertMouse ? 1 : -1;
    lookToward(sgn * pointer.x, sgn * pointer.y);
  }
  if (pointer.down) {
    var dx = e.clientX - pointer.sx, dy = e.clientY - pointer.sy;
    if (!pointer.gusted && Math.abs(dx) > Math.max(36, pointer.w * 0.1) && Math.abs(dx) > Math.abs(dy) * 1.3 && performance.now() - pointer.st < 650) {
      pointer.gusted = true; startGust(dx);       // a quick sideways swipe sends a gust of wind
    }
    if (pointer.touch && !tilt.active) lookToward(-dx / pointer.w * 2.4, dy / pointer.w * 2.4); // no tilt sensor: drag to look around
  }
});
root.addEventListener('pointerdown', function (e) {
  if (inUI(e)) return;
  pointer.touch = e.pointerType !== 'mouse';
  readPointer(e);
  pointer.down = true; pointer.sx = e.clientX; pointer.sy = e.clientY; pointer.st = performance.now(); pointer.gusted = false;
  pointer.inside = true;
  if (document.activeElement === input) input.blur();
});
function release(e, cancelled) {
  if (!pointer.down) return;
  pointer.down = false;
  var moved = Math.abs(e.clientX - pointer.sx) + Math.abs(e.clientY - pointer.sy);
  if (!cancelled && moved < 14 && performance.now() - pointer.st < 500) tap();
  if (pointer.touch) {
    pointer.inside = false; pointer.dirty = true;
    if (!tilt.active) lookToward(0, 0);
  }
}
window.addEventListener('pointerup', function (e) { release(e, false); });
window.addEventListener('pointercancel', function (e) { release(e, true); });

// ---------------------------------------------------------------- quality: bloom, resizing, automatic step-down
var composer = null;
function resize() {
  var w = root.clientWidth, h = root.clientHeight;
  if (!w || !h) return;
  var pr = Math.min(window.devicePixelRatio || 1, Q.pixelRatio);
  renderer.setPixelRatio(pr); renderer.setSize(w, h, false);
  if (composer) { composer.setPixelRatio(pr); composer.setSize(w, h); }
  if (sparkles) sparkles.uni.uPx.value = h * pr * 0.5;
}
function setBloom(on) {
  Q.bloom = !!on;
  sunUniforms.uGain.value = on ? 1 : 0.035;   // light adds up differently with and without the glow pass; this keeps the sun looking the same
  if (on && !composer) {
    try {
      var rt = new T.WebGLRenderTarget(4, 4, { type: T.HalfFloatType, samples: Q.antialias ? 4 : 0 });
      composer = new T.EffectComposer(renderer, rt);
      composer.addPass(new T.RenderPass(scene, camera));
      composer.addPass(new T.UnrealBloomPass(new T.Vector2(256, 256), 0.12, 0.5, 3.2)); // strength, spread, and how bright something must be to glow
      composer.addPass(new T.OutputPass());
      resize();
    } catch (e) { composer = null; Q.bloom = false; sunUniforms.uGain.value = 0.035; }
  }
}
function applyCounts() {
  if (flowerGeo) flowerGeo.instanceCount = Math.max(0, Math.min(flowerTotal, Q.flowers | 0));
}
// If the scene runs slowly, give things up in this order: grass blades, bloom, sharpness, then fuzz layers, flowers and sparkles.
var fpsNow = 60;
var mon = { warm: 50, frames: 0, time: 0, slow: 0, hiccups: 0, thinned: false, log: [] };
function stepDown() {
  var what = null;
  if (Q.grassBlades && bladeMesh && bladeMesh.visible) { setBlades(false); what = 'grass blades off'; }
  else if (Q.bloom && composer) { setBloom(false); what = 'bloom off'; }
  else if (renderer.getPixelRatio() > 1) { Q.pixelRatio = Math.max(1, renderer.getPixelRatio() - 0.5); resize(); what = 'pixel ratio ' + Q.pixelRatio; }
  else if (!mon.thinned) { mon.thinned = true; Q.flowers = Math.round(Q.flowers / 2); Q.sparkles = 0; applyCounts(); setFuzzLayers(Math.min(Q.fuzzLayers, 1)); what = 'less fuzz, fewer flowers'; }
  if (what) mon.log.push(what);
}
function monitor(rawDt) {
  if (rawDt < 1) fpsNow += (1 / rawDt - fpsNow) * 0.05;
  if (!CONFIG.quality.adaptive) return;
  if (mon.warm > 0) { mon.warm--; return; }
  if (rawDt > 0.25) { if (++mon.hiccups < 6) return; } else mon.hiccups = 0;   // one long frame is a hiccup (switching tabs); six in a row is a slow device
  mon.frames++; mon.time += rawDt;
  if (mon.time < 1.5) return;
  var fps = mon.frames / mon.time; mon.frames = 0; mon.time = 0;
  if (fps < CONFIG.quality.minFps) { if (++mon.slow >= 2) { mon.slow = 0; mon.warm = 30; stepDown(); } } else mon.slow = 0;
}

// ---------------------------------------------------------------- the frame loop
var running = false, onScreen = true, rafId = 0, last = 0, time = 0, firstFrame = true;
function frame(now, skipDraw) {
  rafId = 0;
  if (!running) return;
  var raw = (now - last) / 1000; last = now;
  if (!(raw > 0)) raw = 1 / 60;
  var dt = Math.min(raw, 0.05), i;
  time += dt; U.uTime.value = time;

  // view
  eye.x = V.distance * tanX * viewX.step(dt);
  eye.y = V.eyeHeight + V.distance * tanY * viewY.step(dt);
  updateCamera();

  // hover + the pointer brushing through the grass
  if (pointer.dirty) { pointer.dirty = false; setHover(pointer.inside ? pick() : null); if (!pointer.inside) groundHit.ok = false; }
  if (groundHit.ok) { U.uPointer.value.x = groundHit.x; U.uPointer.value.y = groundHit.z; }
  pointerPower += ((pointer.inside && groundHit.ok ? 1 : 0) - pointerPower) * (1 - Math.exp(-dt * 6));
  U.uPointer.value.z = REDUCED ? 0 : pointerPower;

  updateGust(dt);
  for (i = 0; i < clouds.length; i++) {
    var c = clouds[i]; c.push *= Math.exp(-dt * 0.9);
    c.mesh.position.x += (c.speed * CLOUDS.speed + c.push) * dt;
    if (c.mesh.position.x > 72) c.mesh.position.x = -72; else if (c.mesh.position.x < -72) c.mesh.position.x = 72;
  }
  updateShapes(dt, time);
  updateWord(dt, time);
  updateShadows();
  updateSparkles(time);

  if (skipDraw === true) return;
  if (Q.bloom && composer) composer.render(); else renderer.render(scene, camera);
  if (firstFrame) { firstFrame = false; root.classList.add('dio-ready'); }
  monitor(raw);
  rafId = requestAnimationFrame(frame);
}
function setRunning() {
  var on = onScreen && !document.hidden;
  if (on && !running) { running = true; last = performance.now(); rafId = requestAnimationFrame(frame); }
  else if (!on && running) { running = false; if (rafId) cancelAnimationFrame(rafId); rafId = 0; }
}
document.addEventListener('visibilitychange', setRunning);
if (window.IntersectionObserver) new IntersectionObserver(function (en) { onScreen = en[en.length - 1].isIntersecting; setRunning(); }, { threshold: 0.01 }).observe(root);
if (window.ResizeObserver) new ResizeObserver(resize).observe(root); else window.addEventListener('resize', resize);
canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); running = false; });
canvas.addEventListener('webglcontextrestored', function () { setRunning(); });

// ---------------------------------------------------------------- go
setBlades(Q.grassBlades);
applyCounts();
resize();
setBloom(Q.bloom);
var startText = root.getAttribute('data-text');                 // optional: data-text="Line one\nLine two" on the element
input.value = cleanText(startText ? startText.replace(/\\n/g, '\n') : CONFIG.text);
fitBox();
setText(input.value, REDUCED ? { instant: true } : { stagger: true });
syncCaret();
setRunning();

// ---------------------------------------------------------------- live settings
// The 25 values the settings panel (diorama-panel.js) can change while the scene runs.
// Each one names the CONFIG line it mirrors, so a change you like is easy to make permanent.
var PARAMS = [];
function param(key, label, min, max, step, get, set) { PARAMS.push({ key: key, label: label, min: min, max: max, step: step, get: get, set: set, def: get() }); }
function reshape(field) { return function (v) { SH[field] = v; rebuildShapes(); }; }
param('shapes.count', 'Shapes: how many', 0, 20, 1, function () { return SH.count; }, reshape('count'));
param('shapes.minSize', 'Shapes: smallest size (tiles)', 0.5, 3, 0.1, function () { return SH.minSize; }, reshape('minSize'));
param('shapes.maxScale', 'Shapes: largest is this many times the smallest', 1, 3.5, 0.1, function () { return SH.maxScale; }, reshape('maxScale'));
param('shapes.seed', 'Shapes: layout number (same number = same layout)', 1, 9999, 1, function () { return SH.seed; }, reshape('seed'));
param('shapes.fuzz', 'Shapes: fur length (tiles)', 0, 0.5, 0.01, function () { return SH.fuzz; }, function (v) { SH.fuzz = v; FUZZ.len.value = v; });
param('shapes.richness', 'Shapes: color strength', 0.5, 2, 0.05, function () { return SH.richness; }, function (v) { SH.richness = v; FUZZ.rich.value = v; });
param('look.shadow', 'Shading: darkness of shaded sides and shadows', 0, 1, 0.02, function () { return LOOK.shadow; }, function (v) { LOOK.shadow = v; SHADOW.value = v; });
param('look.hazeFore', 'Haze: foreground (%)', 0, 100, 1, function () { return LOOK.hazeFore; }, function (v) { LOOK.hazeFore = v; HAZE.fore.value = v / 100; });
param('look.hazeMid', 'Haze: mid-ground (%)', 0, 100, 1, function () { return LOOK.hazeMid; }, function (v) { LOOK.hazeMid = v; HAZE.mid.value = v / 100; });
param('look.hazeBack', 'Haze: background (%)', 0, 100, 1, function () { return LOOK.hazeBack; }, function (v) { LOOK.hazeBack = v; HAZE.back.value = v / 100; });
param('sun.x', 'Sun: position left (-) or right (+), in tiles', -6.5, 6.5, 0.1, function () { return SUN.x; }, function (v) {
  setSunX(v); keyDir.set(v < 0 ? -0.74 : 0.74, 0.6, 0.12).normalize(); shadowDir.set(-keyDir.x, -keyDir.z).normalize();
});
param('sun.rays', 'Sun rays: how many', 3, 36, 1, function () { return SUN.rays; }, function (v) { SUN.rays = v; sunUniforms.uCount.value = v; });
param('sun.rayMin', 'Sun rays: shortest (tiles)', 0, 10, 0.1, function () { return SUN.rayMin; }, function (v) { SUN.rayMin = v; sunUniforms.uLen.value.x = v / SUN_REACH; });
param('sun.rayMax', 'Sun rays: longest (tiles)', 0.5, 16, 0.5, function () { return SUN.rayMax; }, function (v) { SUN.rayMax = v; sunUniforms.uLen.value.y = v / SUN_REACH; });
param('sun.rayWidth', 'Sun rays: width', 0.2, 3, 0.05, function () { return SUN.rayWidth; }, function (v) { SUN.rayWidth = v; sunUniforms.uWidth.value = v; });
param('sun.rayGlow', 'Sun rays: brightness', 0, 3, 0.05, function () { return SUN.rayGlow; }, function (v) { SUN.rayGlow = v; sunUniforms.uGlow.value = v; });
param('sun.raySpeed', 'Sun rays: how fast they change', 0, 6, 0.1, function () { return SUN.raySpeed; }, function (v) { SUN.raySpeed = v; sunUniforms.uSpeed.value = v; });
param('clouds.speed', 'Clouds: drift speed', 0, 8, 0.1, function () { return CLOUDS.speed; }, function (v) { CLOUDS.speed = v; });
param('letters.rotateMax', 'Letters: most they turn (degrees)', 0, 45, 1, function () { return L.rotateMax; }, function (v) { L.rotateMax = v; ROT.max = v * Math.PI / 180; });
param('letters.rotateSpeed', 'Letters: turning speed', 0, 6, 0.1, function () { return L.rotateSpeed; }, function (v) { L.rotateSpeed = v; ROT.speed = v; });
param('letters.size', 'Letters: largest size (tiles)', 0.8, 4, 0.1, function () { return L.size; }, function (v) { L.size = v; layout(false); });
param('frame.smudgeOpacity', 'Tiles: smudge strength', 0, 1, 0.02, function () { return F.smudgeOpacity; }, setSmudgeOpacity);
param('view.maxAngleX', 'Viewing angle: most you can peek sideways (degrees)', 0, 25, 1, function () { return V.maxAngleX; }, function (v) { V.maxAngleX = v; tanX = Math.tan(v * Math.PI / 180); });
param('quality.grassBlades', 'Grass blades (1 = on, 0 = off)', 0, 1, 1, function () { return Q.grassBlades ? 1 : 0; }, function (v) { setBlades(!!v); });
param('quality.bloom', 'Glow (1 = on, 0 = off)', 0, 1, 1, function () { return Q.bloom ? 1 : 0; }, function (v) { setBloom(!!v); });
param('quality.adaptive', 'Automatic quality (1 = on, 0 = off)', 0, 1, 1, function () { return CONFIG.quality.adaptive ? 1 : 0; }, function (v) { CONFIG.quality.adaptive = !!v; mon.slow = 0; mon.frames = 0; mon.time = 0; });
param('quality.bladeCount', 'Grass blades: how many', 0, 80000, 1000, function () { return Q.bladeCount; }, setBladeCount);
param('frame.widthPercent', 'Frame width on the page (%)', 20, 100, 1, function () { return F.widthPercent; }, function (v) { F.widthPercent = v; root.style.width = v + '%'; root.style.marginLeft = root.style.marginRight = 'auto'; });
param('shapes.furWidth', 'Shapes: fur strand thickness', 0.1, 0.7, 0.01, function () { return SH.furWidth; }, function (v) { SH.furWidth = v; FUZZ.width.value = v; });
param('sun.rays2', 'Sun rays: how many in the second layer', 0, 36, 1, function () { return SUN.rays2; }, function (v) { SUN.rays2 = v; sunUniforms.uCount2.value = v; });
param('clouds.opacity', 'Clouds: how solid the puffy ones are', 0, 1, 0.02, function () { return CLOUDS.opacity; }, function (v) { CLOUDS.opacity = v; for (var i = 0; i < clouds.length; i++) if (clouds[i].kind === 1) clouds[i].mesh.material.opacity = v; });
if (F.widthPercent !== 100) { root.style.width = F.widthPercent + '%'; root.style.marginLeft = root.style.marginRight = 'auto'; }
function setParam(key, value) {
  for (var i = 0; i < PARAMS.length; i++) if (PARAMS[i].key === key) {
    var p = PARAMS[i], v = Number(value);
    if (!isFinite(v)) return p.get();
    v = clamp(Math.round(v / p.step) * p.step, p.min, p.max); v = Math.round(v * 1000) / 1000;
    p.set(v); return p.get();
  }
}

// A small handle for experimenting from the browser console, e.g. DIORAMA.setGrassBlades(false)
window.DIORAMA = {
  config: CONFIG, quality: Q, log: mon.log, frozen: false,
  setText: function (s) { input.value = String(s); syncText(); },
  setGrassBlades: setBlades, setBloom: setBloom,
  setPixelRatio: function (p) { Q.pixelRatio = p; resize(); },
  gust: startGust, fps: function () { return fpsNow; }, params: PARAMS, set: setParam,
  get: function (key) { for (var i = 0; i < PARAMS.length; i++) if (PARAMS[i].key === key) return PARAMS[i].get(); },
  renderOnce: function (t, lookX, lookY) {   // draws a single still frame (used for making the poster image)
    if (typeof lookX === 'number') { viewX.snap(lookX); viewY.snap(lookY || 0); }
    var steps = Math.max(1, Math.round((t || 0) * 60));
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    running = true;
    for (var i = 0; i < steps; i++) { last = performance.now() - 16.6; frame(performance.now(), i < steps - 1); if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } }
    running = false; if (!this.frozen) setRunning();
  }
};
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
