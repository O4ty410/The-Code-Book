// hub3d.js — 3D floor icon renderer for the Learn hub background
// Each 3D shape is built directly from the SVG polygon coordinates used on the
// floor cards so the background icon always matches what you see on the card.
// Expects window.THREE (Three.js r128 global build) to be loaded first.

(function () {
  'use strict';

  var _renderer = null;
  var _scene    = null;
  var _camera   = null;
  var _mesh     = null;
  var _raf      = null;

  // SVG viewBox is 0 0 48 48 — normalise: cx=(x-24)/22, cy=-(y-24)/22 (flip Y)
  var FLOORS = [
    { build: buildNeuralCore,      color: '#ffc844' }, // 0 hexagon + nodes
    { build: buildGlobe,           color: '#00e5ff' }, // 1 wireframe globe
    { build: buildLightningBolt,   color: '#ff44aa' }, // 2 lightning bolt
    { build: buildDiamond,         color: '#bb66ff' }, // 3 rotated-square gem
    { build: buildEngineeringGlyph,color: '#00ffaa' }, // 4 hexagon + circle + spokes
    { build: buildStarship,        color: '#ff8844' }, // 5 fuselage + wings
    { build: buildMasteryCrest,    color: '#ffe566' }, // 6 shield + star
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────

  function n(x, y) { return [(x - 24) / 22, -(y - 24) / 22]; }  // SVG→Three coords

  function toHex(s) { return parseInt(s.replace('#', ''), 16); }

  function dimHex(hex, f) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return '#' +
      Math.round(r * f).toString(16).padStart(2, '0') +
      Math.round(g * f).toString(16).padStart(2, '0') +
      Math.round(b * f).toString(16).padStart(2, '0');
  }

  function mat(color, emissive) {
    return new THREE.MeshPhongMaterial({
      color:    toHex(color),
      emissive: toHex(dimHex(color, emissive || 0.22)),
      shininess: 200,
      specular:  0xffffff,
    });
  }

  function polyShape(pts) {
    var s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    return s;
  }

  function ext(shape, depth, bevel) {
    bevel = bevel === undefined ? 0.06 : bevel;
    return new THREE.ExtrudeGeometry(shape, {
      depth: depth || 0.32,
      bevelEnabled:   bevel > 0,
      bevelSize:      bevel,
      bevelThickness: bevel,
      bevelSegments:  4,
    });
  }

  function sphere(r, color, emissive) {
    return new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), mat(color, emissive));
  }

  // ── Floor 0 — Neural Core ─────────────────────────────────────────────────
  // SVG: hexagon polygon + 3 crossing lines + filled circles at vertices + centre ring
  function buildNeuralCore(color) {
    var g = new THREE.Group();
    var m = mat(color);

    // Pointy-top hexagon (matches card: top vertex at SVG y=4)
    // SVG points: 24,4  41,14  41,34  24,44  7,34  7,14
    var verts = [[24,4],[41,14],[41,34],[24,44],[7,34],[7,14]].map(function(p){return n(p[0],p[1]);});
    var hexGeo = ext(polyShape(verts), 0.34);
    hexGeo.center();
    g.add(new THREE.Mesh(hexGeo, m));

    // Centre ring (matches the inner circle on the card)
    g.add(new THREE.Mesh(
      new THREE.TorusGeometry(0.21, 0.045, 8, 32),
      mat(color, 0.38)
    ));

    // Filled circles at each of the 6 vertices
    verts.forEach(function(v) {
      g.add(sphere(0.09, color, 0.55));
      g.children[g.children.length - 1].position.set(v[0], v[1], 0.17);
    });

    // Centre dot
    var dot = sphere(0.085, color, 0.6);
    dot.position.z = 0.17;
    g.add(dot);

    return g;
  }

  // ── Floor 1 — Digital Network Sphere (Globe) ──────────────────────────────
  // SVG: outer circle + wide horizontal ellipse + narrow vertical ellipse + 5 dots
  function buildGlobe(color) {
    var g = new THREE.Group();
    var m = mat(color, 0.3);

    // Solid sphere core
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 16), m));

    // Horizontal equatorial ring (wide ellipse on card: rx=20,ry=7 → rx≈0.91, ry≈0.32)
    var eq = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.038, 8, 64), mat(color, 0.45));
    g.add(eq); // sits in XZ plane by default (horizontal) ✓

    // Vertical meridian ring (narrow vertical ellipse: rx=7,ry=20 → matches)
    var mer = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.038, 8, 64), mat(color, 0.45));
    mer.rotation.y = Math.PI / 2; // rotate to be vertical in XY plane
    g.add(mer);

    // 4 axis dots (top, bottom, left, right on card)
    [
      [0,  0.9,  0],
      [0, -0.9,  0],
      [0.9, 0,   0],
      [-0.9, 0,  0],
    ].forEach(function(pos) {
      var d = sphere(0.085, color, 0.6);
      d.position.set(pos[0], pos[1], pos[2]);
      g.add(d);
    });

    // Centre dot
    var dot = sphere(0.1, color, 0.6);
    g.add(dot);

    return g;
  }

  // ── Floor 2 — Energy Surge (Lightning bolt) ───────────────────────────────
  // SVG: points="29,3 14,26 22,26 18,45 34,22 26,22"
  function buildLightningBolt(color) {
    var raw = [[29,3],[14,26],[22,26],[18,45],[34,22],[26,22]];
    var pts = raw.map(function(p){ return n(p[0], p[1]); });
    var geo = ext(polyShape(pts), 0.36);
    geo.center();
    var g = new THREE.Group();
    g.add(new THREE.Mesh(geo, mat(color)));

    // Tip dots (top and bottom tip of bolt)
    [[29,3],[18,45]].forEach(function(p) {
      var nn = n(p[0], p[1]);
      var d = sphere(0.09, color, 0.6);
      d.position.set(nn[0], nn[1], 0.18);
      g.add(d);
    });

    return g;
  }

  // ── Floor 3 — Innovation Crystal (Diamond / rotated square) ──────────────
  // SVG outer: points="24,4 42,24 24,44 6,24"
  // SVG inner: points="24,14 34,24 24,34 14,24"
  function buildDiamond(color) {
    var g = new THREE.Group();

    // Outer diamond
    var outerPts = [[24,4],[42,24],[24,44],[6,24]].map(function(p){ return n(p[0],p[1]); });
    var outerGeo = ext(polyShape(outerPts), 0.32);
    outerGeo.center();
    g.add(new THREE.Mesh(outerGeo, mat(color)));

    // Inner diamond (raised slightly in front)
    var innerPts = [[24,14],[34,24],[24,34],[14,24]].map(function(p){ return n(p[0],p[1]); });
    var innerGeo = ext(polyShape(innerPts), 0.12, 0.03);
    innerGeo.center();
    var inner = new THREE.Mesh(innerGeo, mat(color, 0.38));
    inner.position.z = 0.16;
    g.add(inner);

    // Corner dots at outer vertices
    outerPts.forEach(function(p) {
      var d = sphere(0.09, color, 0.6);
      d.position.set(p[0], p[1], 0.16);
      g.add(d);
    });

    return g;
  }

  // ── Floor 4 — Engineering Glyph (Hexagon + inner circle + spokes) ─────────
  // SVG: same hexagon as floor 0 + circle r=9 at centre + 6 spoke lines
  function buildEngineeringGlyph(color) {
    var g = new THREE.Group();
    var m = mat(color);

    // Same pointy-top hexagon as neural core
    var verts = [[24,4],[41,14],[41,34],[24,44],[7,34],[7,14]].map(function(p){ return n(p[0],p[1]); });
    var hexGeo = ext(polyShape(verts), 0.32);
    hexGeo.center();
    g.add(new THREE.Mesh(hexGeo, m));

    // Inner circle ring (r=9/22 ≈ 0.409)
    g.add(new THREE.Mesh(
      new THREE.TorusGeometry(0.41, 0.05, 8, 48),
      mat(color, 0.42)
    ));

    // 6 spokes from the inner ring to each hexagon vertex
    verts.forEach(function(v) {
      var dist = Math.sqrt(v[0]*v[0] + v[1]*v[1]);
      var midX = v[0] * (0.41 / dist + 1) / 2;
      var midY = v[1] * (0.41 / dist + 1) / 2;
      var spokeLen = dist - 0.41;
      var spoke = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, spokeLen, 5),
        mat(color, 0.25)
      );
      spoke.position.set(midX, midY, 0);
      spoke.rotation.z = Math.atan2(v[0], v[1]);
      g.add(spoke);
    });

    // Centre dot
    var dot = sphere(0.1, color, 0.6);
    dot.position.z = 0.16;
    g.add(dot);

    return g;
  }

  // ── Floor 5 — Starship (Delta-wing fuselage) ──────────────────────────────
  // SVG body:  points="24,3 32,22 29,22 29,38 19,38 19,22 16,22"
  // SVG wings: L=(19,28 10,40 19,40)  R=(29,28 38,40 29,40)
  // Porthole:  cx=24 cy=17 r=3.5
  function buildStarship(color) {
    var g = new THREE.Group();
    var m = mat(color);

    // Main fuselage
    var bodyRaw = [[24,3],[32,22],[29,22],[29,38],[19,38],[19,22],[16,22]];
    var bodyPts = bodyRaw.map(function(p){ return n(p[0],p[1]); });
    var bodyGeo = ext(polyShape(bodyPts), 0.34);
    bodyGeo.center();
    g.add(new THREE.Mesh(bodyGeo, m));

    // Left wing
    var lwPts = [[19,28],[10,40],[19,40]].map(function(p){ return n(p[0],p[1]); });
    var lwGeo = ext(polyShape(lwPts), 0.18, 0.03);
    lwGeo.center();
    var lw = new THREE.Mesh(lwGeo, mat(color, 0.35));
    lw.position.z = -0.08;
    g.add(lw);

    // Right wing
    var rwPts = [[29,28],[38,40],[29,40]].map(function(p){ return n(p[0],p[1]); });
    var rwGeo = ext(polyShape(rwPts), 0.18, 0.03);
    rwGeo.center();
    var rw = new THREE.Mesh(rwGeo, mat(color, 0.35));
    rw.position.z = -0.08;
    g.add(rw);

    // Porthole (circle at cx=24,cy=17,r=3.5 — normalised: centre (0,0.318), r=3.5/22≈0.159)
    var porthole = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.038, 8, 32),
      mat(color, 0.48)
    );
    porthole.position.set(0, 0.318, 0.22);
    g.add(porthole);

    // Nose tip dot
    var tip = sphere(0.085, color, 0.6);
    var tipPos = n(24, 3);
    tip.position.set(tipPos[0], tipPos[1], 0.17);
    g.add(tip);

    return g;
  }

  // ── Floor 6 — Mastery Crest (Shield + star) ───────────────────────────────
  // SVG shield:  M24,4 L38,10 L38,27 Q38,40 24,46 Q10,40 10,27 L10,10 Z
  // SVG star:    points="24,13 26,20 33,20 27.5,24.5 29.5,32 24,27.5 18.5,32 20.5,24.5 15,20 22,20"
  function buildMasteryCrest(color) {
    var g = new THREE.Group();

    // Shield shape
    var shield = new THREE.Shape();
    var sm = function(x, y){ var p = n(x, y); shield.moveTo(p[0], p[1]); };
    var sl = function(x, y){ var p = n(x, y); shield.lineTo(p[0], p[1]); };
    var sq = function(cx, cy, ex, ey){
      var cp = n(cx, cy), ep = n(ex, ey);
      shield.quadraticCurveTo(cp[0], cp[1], ep[0], ep[1]);
    };
    sm(24, 4);
    sl(38, 10); sl(38, 27);
    sq(38, 40, 24, 46);
    sq(10, 40, 10, 27);
    sl(10, 10);
    shield.closePath();
    var shieldGeo = ext(shield, 0.34);
    shieldGeo.center();
    g.add(new THREE.Mesh(shieldGeo, mat(color)));

    // 5-pointed star (10-point polygon from SVG)
    var starRaw = [[24,13],[26,20],[33,20],[27.5,24.5],[29.5,32],[24,27.5],[18.5,32],[20.5,24.5],[15,20],[22,20]];
    var starPts = starRaw.map(function(p){ return n(p[0],p[1]); });
    var starGeo = ext(polyShape(starPts), 0.12, 0.025);
    starGeo.center();
    var starMesh = new THREE.Mesh(starGeo, mat(color, 0.42));
    starMesh.position.z = 0.20;
    g.add(starMesh);

    // Crown spike dots (top of shield: 18,5 / 24,3 / 30,5)
    [[18,4.5],[24,3],[30,4.5]].forEach(function(p) {
      var pp = n(p[0],p[1]);
      var d = sphere(0.075, color, 0.6);
      d.position.set(pp[0], pp[1], 0.17);
      g.add(d);
    });

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
    _camera.position.set(0, 0, 3.8);

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
    _scene.add(new THREE.AmbientLight(0x112233, 2.2));

    var key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(3, 4, 5);
    _scene.add(key);

    var fill = new THREE.PointLight(c, 5, 14);
    fill.position.set(-3, 1.5, 2);
    _scene.add(fill);

    var rim = new THREE.DirectionalLight(c, 2.2);
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
      // Slight forward tilt so you see the depth of the extrusion
      _mesh.rotation.x = -0.25;
      setLights(cfg.color);
      _scene.add(_mesh);
    },

    stop:   function() { if (_raf) { cancelAnimationFrame(_raf); _raf = null; } },
    resume: function() { if (!_raf && _renderer) animate(); },
  };
}());
