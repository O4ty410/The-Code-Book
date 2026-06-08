// hub3d.js — 3D floor icon renderer for the Learn hub background
// Each icon is built as glowing tube-edges + sphere nodes, tracing the exact
// same polygon/path used on the floor cards — wireframe-in-3D style.
// Expects window.THREE (Three.js r128 global build) to be loaded first.

(function () {
  'use strict';

  var _renderer = null;
  var _scene    = null;
  var _camera   = null;
  var _mesh     = null;
  var _raf      = null;

  var FLOORS = [
    { build: buildNeuralCore,       color: '#ffc844' },
    { build: buildGlobe,            color: '#00e5ff' },
    { build: buildLightningBolt,    color: '#ff44aa' },
    { build: buildDiamond,          color: '#bb66ff' },
    { build: buildEngineeringGlyph, color: '#00ffaa' },
    { build: buildStarship,         color: '#ff8844' },
    { build: buildMasteryCrest,     color: '#ffe566' },
  ];

  // ── Coordinate helpers ────────────────────────────────────────────────────
  // SVG viewBox 0 0 48 48 → Three.js coords (Y flipped, centred at origin)
  function nx(x) { return (x - 24) / 22; }
  function ny(y) { return -(y - 24) / 22; }
  function nv(x, y) { return new THREE.Vector3(nx(x), ny(y), 0); }

  function toHex(s) { return parseInt(s.replace('#', ''), 16); }
  function dimHex(hex, f) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    var h = function(v){ return Math.round(v*f).toString(16).padStart(2,'0'); };
    return '#'+h(r)+h(g)+h(b);
  }

  function tubeMat(color) {
    return new THREE.MeshPhongMaterial({
      color: toHex(color), emissive: toHex(dimHex(color, 0.35)),
      shininess: 220, specular: 0xffffff,
    });
  }
  function dotMat(color) {
    return new THREE.MeshPhongMaterial({
      color: toHex(color), emissive: toHex(dimHex(color, 0.55)),
      shininess: 240, specular: 0xffffff,
    });
  }

  // ── Geometry primitives ───────────────────────────────────────────────────

  // Cylinder tube along a 3-D segment
  function addSegment(group, ax, ay, bx, by, color, r) {
    r = r || 0.055;
    var A = nv(ax, ay), B = nv(bx, by);
    var dir = new THREE.Vector3().subVectors(B, A);
    var len = dir.length();
    if (len < 0.001) return;
    var mid = new THREE.Vector3().addVectors(A, B).multiplyScalar(0.5);
    var cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, len, 8),
      tubeMat(color)
    );
    cyl.position.copy(mid);
    // Align cylinder (default along Y) with the edge direction
    cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.normalize());
    group.add(cyl);
  }

  // Polygon edges as tubes (closed loop)
  function addPoly(group, pts, color, r) {
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i+1) % pts.length];
      addSegment(group, a[0], a[1], b[0], b[1], color, r);
    }
  }

  // Filled sphere node
  function addDot(group, x, y, color, r) {
    r = r || 0.095;
    var d = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), dotMat(color));
    d.position.set(nx(x), ny(y), 0);
    group.add(d);
  }

  // Torus ring at position (0,0) in the XY plane
  function addRing(group, radius, tubeR, color) {
    var m = new THREE.Mesh(new THREE.TorusGeometry(radius, tubeR || 0.048, 8, 64), tubeMat(color));
    group.add(m);
  }

  // Ellipse tube (approximated as CatmullRomCurve3 through points)
  function addEllipse(group, rx, ry, color, rotY, tubeR) {
    var pts = [];
    var segs = 64;
    for (var i = 0; i <= segs; i++) {
      var a = (Math.PI * 2 * i) / segs;
      pts.push(new THREE.Vector3(rx * Math.cos(a), ry * Math.sin(a), 0));
    }
    var curve = new THREE.CatmullRomCurve3(pts, true);
    var geo = new THREE.TubeGeometry(curve, 96, tubeR || 0.042, 7, true);
    var m = new THREE.Mesh(geo, tubeMat(color));
    if (rotY) m.rotation.y = rotY;
    group.add(m);
  }

  // ── Floor 0 — Neural Core ─────────────────────────────────────────────────
  // SVG: hexagon + 3 cross-lines + 6 vertex dots + inner circle + centre dot
  function buildNeuralCore(color) {
    var g = new THREE.Group();
    var hex = [[24,4],[41,14],[41,34],[24,44],[7,34],[7,14]];

    // Outer hexagon edges
    addPoly(g, hex, color);

    // 3 diagonal crossing lines
    addSegment(g, 24,4, 24,44, color, 0.034);
    addSegment(g, 7,14, 41,34, color, 0.034);
    addSegment(g, 41,14, 7,34, color, 0.034);

    // 6 vertex dots
    hex.forEach(function(p){ addDot(g, p[0], p[1], color); });

    // Inner circle (r=5/22≈0.227)
    addRing(g, 0.227, 0.042, color);

    // Centre dot
    addDot(g, 24, 24, color, 0.085);

    return g;
  }

  // ── Floor 1 — Digital Network Sphere (Globe) ──────────────────────────────
  // SVG: outer circle + wide horizontal ellipse (rx=20,ry=7) +
  //      narrow vertical ellipse (rx=7,ry=20) + 4 axis dots + centre dot
  function buildGlobe(color) {
    var g = new THREE.Group();

    // Outer sphere outline — big ring
    addRing(g, 0.909, 0.048, color);

    // Horizontal ellipse (rx=20→0.909, ry=7→0.318)
    addEllipse(g, 0.909, 0.318, color);

    // Vertical ellipse (rx=7→0.318, ry=20→0.909) — rotate 90° around Y to stand vertical
    addEllipse(g, 0.318, 0.909, color);

    // 4 axis dots: top(24,4) bottom(24,44) left(4,24) right(44,24)
    [[24,4],[24,44],[4,24],[44,24]].forEach(function(p){ addDot(g, p[0], p[1], color); });

    // Centre dot
    addDot(g, 24, 24, color, 0.11);

    return g;
  }

  // ── Floor 2 — Energy Surge (Lightning bolt) ───────────────────────────────
  // SVG: points="29,3 14,26 22,26 18,45 34,22 26,22"
  function buildLightningBolt(color) {
    var g = new THREE.Group();
    var pts = [[29,3],[14,26],[22,26],[18,45],[34,22],[26,22]];

    addPoly(g, pts, color, 0.06);

    // Inner highlight lines (from SVG)
    addSegment(g, 27,9, 22,26, color, 0.03);
    addSegment(g, 26,22, 21,40, color, 0.03);

    // Tip dots
    addDot(g, 29, 3, color);
    addDot(g, 18, 45, color);
    addDot(g, 22, 26, color, 0.065);
    addDot(g, 26, 22, color, 0.065);

    return g;
  }

  // ── Floor 3 — Innovation Crystal (Diamond) ────────────────────────────────
  // SVG outer: points="24,4 42,24 24,44 6,24"
  // SVG inner: points="24,14 34,24 24,34 14,24"
  // + 4 connector lines from outer to inner at each vertex
  function buildDiamond(color) {
    var g = new THREE.Group();
    var outer = [[24,4],[42,24],[24,44],[6,24]];
    var inner = [[24,14],[34,24],[24,34],[14,24]];

    addPoly(g, outer, color, 0.06);
    addPoly(g, inner, color, 0.048);

    // 4 connector lines (outer vertex → inner vertex)
    for (var i = 0; i < 4; i++) {
      addSegment(g, outer[i][0],outer[i][1], inner[i][0],inner[i][1], color, 0.032);
    }

    // 4 outer vertex dots
    outer.forEach(function(p){ addDot(g, p[0], p[1], color); });

    return g;
  }

  // ── Floor 4 — Engineering Glyph (Hexagon + circle + spokes) ──────────────
  // SVG: same hexagon + inner circle r=9 + 6 spoke lines + centre dot
  function buildEngineeringGlyph(color) {
    var g = new THREE.Group();
    var hex = [[24,4],[41,14],[41,34],[24,44],[7,34],[7,14]];

    addPoly(g, hex, color);

    // Inner circle (r=9/22≈0.409)
    addRing(g, 0.409, 0.048, color);

    // 6 spokes: from where inner circle meets the spoke to the hex vertex
    // SVG spokes: 24→(15→24→4), (32→19→41→14), etc.
    var spokeLines = [
      [24,15, 24,4],   // top
      [24,33, 24,44],  // bottom
      [32,19, 41,14],  // top-right
      [32,29, 41,34],  // bottom-right
      [16,19, 7,14],   // top-left
      [16,29, 7,34],   // bottom-left
    ];
    spokeLines.forEach(function(s){
      addSegment(g, s[0],s[1], s[2],s[3], color, 0.038);
    });

    // Centre dot
    addDot(g, 24, 24, color, 0.11);

    return g;
  }

  // ── Floor 5 — Starship (Delta-wing fuselage) ──────────────────────────────
  // SVG body:  points="24,3 32,22 29,22 29,38 19,38 19,22 16,22"
  // SVG L-wing: points="19,28 10,40 19,40"
  // SVG R-wing: points="29,28 38,40 29,40"
  // Porthole: cx=24,cy=17,r=3.5  Exhaust lines at bottom
  function buildStarship(color) {
    var g = new THREE.Group();

    var body = [[24,3],[32,22],[29,22],[29,38],[19,38],[19,22],[16,22]];
    var lw   = [[19,28],[10,40],[19,40]];
    var rw   = [[29,28],[38,40],[29,40]];

    addPoly(g, body, color, 0.06);
    addPoly(g, lw,   color, 0.048);
    addPoly(g, rw,   color, 0.048);

    // Porthole ring (cx=24,cy=17,r=3.5 → 3.5/22≈0.159)
    var port = new THREE.Mesh(
      new THREE.TorusGeometry(0.159, 0.042, 8, 32),
      tubeMat(color)
    );
    port.position.set(nx(24), ny(17), 0);
    g.add(port);

    // Exhaust lines at bottom
    addSegment(g, 21,39, 19,46, color, 0.038);
    addSegment(g, 24,39, 24,47, color, 0.045);
    addSegment(g, 27,39, 29,46, color, 0.038);

    // Nose tip dot
    addDot(g, 24, 3, color);

    return g;
  }

  // ── Floor 6 — Mastery Crest (Shield + star) ───────────────────────────────
  // SVG shield: M24,4 L38,10 L38,27 Q38,40 24,46 Q10,40 10,27 L10,10 Z
  // SVG star: points="24,13 26,20 33,20 27.5,24.5 29.5,32 24,27.5 18.5,32 20.5,24.5 15,20 22,20"
  // Crown spikes: lines to (18,5), (24,3), (30,5)
  function buildMasteryCrest(color) {
    var g = new THREE.Group();

    // Shield outline as polygon segments (approximating the bezier curves)
    // Approximate shield bezier with line segments
    var shieldPts = [[24,4],[38,10],[38,27]];
    // Bezier Q(38,40 → 24,46): approximate with 6 points
    for (var i = 1; i <= 6; i++) {
      var t = i / 6;
      var qx = (1-t)*(1-t)*38 + 2*(1-t)*t*38 + t*t*24;
      var qy = (1-t)*(1-t)*27 + 2*(1-t)*t*40 + t*t*46;
      shieldPts.push([qx, qy]);
    }
    // Bezier Q(10,40 → 10,27): approximate
    for (var j = 1; j <= 6; j++) {
      var tt = j / 6;
      var qx2 = (1-tt)*(1-tt)*24 + 2*(1-tt)*tt*10 + tt*tt*10;
      var qy2 = (1-tt)*(1-tt)*46 + 2*(1-tt)*tt*40 + tt*tt*27;
      shieldPts.push([qx2, qy2]);
    }
    shieldPts.push([10,10]);
    addPoly(g, shieldPts, color, 0.055);

    // 5-pointed star
    var star = [[24,13],[26,20],[33,20],[27.5,24.5],[29.5,32],[24,27.5],[18.5,32],[20.5,24.5],[15,20],[22,20]];
    addPoly(g, star, color, 0.042);

    // Crown spikes
    addSegment(g, 18,10, 18,5,  color, 0.04);
    addSegment(g, 24,10, 24,4,  color, 0.048);
    addSegment(g, 30,10, 30,5,  color, 0.04);

    // Crown tip dots
    addDot(g, 18, 4.5, color, 0.07);
    addDot(g, 24, 3,   color, 0.085);
    addDot(g, 30, 4.5, color, 0.07);

    // Centre dot (star centre)
    addDot(g, 24, 27.5, color, 0.085);

    return g;
  }

  // ── Renderer lifecycle ────────────────────────────────────────────────────

  function initRenderer(container) {
    var w = container.offsetWidth  || 480;
    var h = container.offsetHeight || 480;

    _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    _renderer.setSize(w, h);
    _renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    _renderer.setClearColor(0x000000, 0);

    _scene  = new THREE.Scene();
    _camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 50);
    _camera.position.set(0, 0, 3.6);

    var c = _renderer.domElement;
    c.style.cssText = 'display:block;width:100%;height:100%;';
    container.innerHTML = '';
    container.appendChild(c);
  }

  function setLights(color) {
    var toRemove = [];
    _scene.traverse(function(o){ if (o.isLight) toRemove.push(o); });
    toRemove.forEach(function(l){ _scene.remove(l); });

    var c = toHex(color);
    _scene.add(new THREE.AmbientLight(0x223344, 2.5));

    var key = new THREE.DirectionalLight(0xffffff, 3.5);
    key.position.set(3, 4, 5);
    _scene.add(key);

    var fill = new THREE.PointLight(c, 5, 14);
    fill.position.set(-2.5, 1.5, 2);
    _scene.add(fill);

    var rim = new THREE.DirectionalLight(c, 2.5);
    rim.position.set(-1.5, -2, -4);
    _scene.add(rim);
  }

  function disposeMesh(obj) {
    if (!obj) return;
    obj.traverse(function(child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        (Array.isArray(child.material) ? child.material : [child.material])
          .forEach(function(m){ m.dispose(); });
      }
    });
  }

  function animate() {
    _raf = requestAnimationFrame(animate);
    if (_mesh) _mesh.rotation.y += 0.007;
    _renderer.render(_scene, _camera);
  }

  // ── Public API ────────────────────────────────────────────────────────────

  window.HubIcon3D = {
    show: function(container, floorIndex) {
      if (!window.THREE) return;
      var cfg = FLOORS[floorIndex] || FLOORS[0];

      if (!_renderer) {
        initRenderer(container);
        animate();
      }

      if (_mesh) { _scene.remove(_mesh); disposeMesh(_mesh); _mesh = null; }

      _mesh = cfg.build(cfg.color);
      setLights(cfg.color);
      _scene.add(_mesh);
    },

    stop:   function() { if (_raf) { cancelAnimationFrame(_raf); _raf = null; } },
    resume: function() { if (!_raf && _renderer) animate(); },
  };
}());
