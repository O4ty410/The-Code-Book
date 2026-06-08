// hub3d.js — 3D floor icon renderer for the Learn hub background
// Replaces flat SVG icons with Three.js WebGL geometry, one per floor.
// Expects window.THREE (Three.js r128 global build) to be loaded first.

(function () {
  'use strict';

  var _renderer  = null;
  var _scene     = null;
  var _camera    = null;
  var _mesh      = null;
  var _raf       = null;

  // Per-floor config: geometry builder + glow color
  var FLOORS = [
    { build: buildHexagon,   color: '#ffc844' }, // 0 Neural Core      — gold
    { build: buildSphere,    color: '#00e5ff' }, // 1 Network Sphere   — cyan
    { build: buildLightning, color: '#ff44aa' }, // 2 Energy Surge     — pink
    { build: buildCrystal,   color: '#bb66ff' }, // 3 Crystal          — violet
    { build: buildRing,      color: '#00ffaa' }, // 4 Engineering Glyph— mint
    { build: buildRocket,    color: '#ff8844' }, // 5 Starship         — orange
    { build: buildShield,    color: '#ffe566' }, // 6 Mastery Crest    — gold
  ];

  // ── Utilities ─────────────────────────────────────────────────────────────

  function toHex(str) {
    return parseInt(str.replace('#', ''), 16);
  }

  function dimHex(hex, f) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return '#' +
      Math.round(r * f).toString(16).padStart(2, '0') +
      Math.round(g * f).toString(16).padStart(2, '0') +
      Math.round(b * f).toString(16).padStart(2, '0');
  }

  function mat(color, emissiveFactor) {
    return new THREE.MeshPhongMaterial({
      color:    toHex(color),
      emissive: toHex(dimHex(color, emissiveFactor || 0.25)),
      shininess: 180,
      specular:  0xffffff,
    });
  }

  function hexShape(r) {
    var s = new THREE.Shape();
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI / 3) * i - Math.PI / 6;
      i === 0 ? s.moveTo(r * Math.cos(a), r * Math.sin(a))
              : s.lineTo(r * Math.cos(a), r * Math.sin(a));
    }
    s.closePath();
    return s;
  }

  function extrude(shape, depth, bevel) {
    return new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled:   true,
      bevelSize:      bevel,
      bevelThickness: bevel,
      bevelSegments:  4,
    });
  }

  // ── Geometry builders ─────────────────────────────────────────────────────

  function buildHexagon(color) {
    var geo = extrude(hexShape(1), 0.45, 0.09);
    geo.center();
    return new THREE.Mesh(geo, mat(color));
  }

  function buildSphere(color) {
    var g = new THREE.Group();
    // Solid inner core
    g.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.64, 24, 16),
      mat(color, 0.35)
    ));
    // Wireframe shell
    var edges = new THREE.EdgesGeometry(new THREE.SphereGeometry(1.0, 12, 8));
    g.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
      color: toHex(color), transparent: true, opacity: 0.55,
    })));
    // Equatorial ring
    g.add(new THREE.Mesh(
      new THREE.TorusGeometry(1.06, 0.045, 8, 56),
      mat(color, 0.4)
    ));
    return g;
  }

  function buildLightning(color) {
    var s = new THREE.Shape();
    s.moveTo( 0.22,  1.1);
    s.lineTo(-0.18,  0.12);
    s.lineTo( 0.18,  0.12);
    s.lineTo(-0.22, -1.1);
    s.lineTo( 0.18, -0.12);
    s.lineTo(-0.18, -0.12);
    s.closePath();
    var geo = extrude(s, 0.38, 0.055);
    geo.center();
    return new THREE.Mesh(geo, mat(color, 0.3));
  }

  function buildCrystal(color) {
    var g = new THREE.Group();
    var m = mat(color, 0.28);
    // Upper crown (taller facets)
    var top = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.95, 8), m);
    top.position.y = 0.18;
    g.add(top);
    // Lower pavilion (shorter facets)
    var bot = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.55, 8), mat(color, 0.38));
    bot.rotation.z = Math.PI;
    bot.position.y = -0.3;
    g.add(bot);
    return g;
  }

  function buildRing(color) {
    var g = new THREE.Group();
    // Outer torus
    g.add(new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.15, 14, 64),
      mat(color, 0.25)
    ));
    // Inner hexagon plate
    var geo = extrude(hexShape(0.38), 0.28, 0.04);
    geo.center();
    g.add(new THREE.Mesh(geo, mat(color, 0.38)));
    // 3 connecting spokes (thin cylinders)
    for (var i = 0; i < 3; i++) {
      var a = (Math.PI * 2 / 3) * i;
      var spoke = new THREE.Mesh(
        new THREE.CylinderGeometry(0.042, 0.042, 0.42, 6),
        mat(color, 0.2)
      );
      // Lay along X, then rotate to face outward at angle a
      spoke.rotation.z = Math.PI / 2;
      spoke.rotation.y = -a;
      spoke.position.set(0.6 * Math.cos(a), 0, 0.6 * Math.sin(a));
      g.add(spoke);
    }
    return g;
  }

  function buildRocket(color) {
    var g   = new THREE.Group();
    var m   = mat(color, 0.25);
    // Body
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 1.1, 14), m);
    g.add(body);
    // Nose cone
    var nose = new THREE.Mesh(new THREE.ConeGeometry(0.33, 0.65, 14), m.clone());
    nose.position.y = 0.875;
    g.add(nose);
    // Engine bell (wider at base)
    var bell = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.44, 0.22, 14), m.clone());
    bell.position.y = -0.66;
    g.add(bell);
    // 3 fins evenly spaced
    for (var i = 0; i < 3; i++) {
      var angle = (Math.PI * 2 / 3) * i;
      var fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.52, 0.07),
        m.clone()
      );
      fin.position.x = 0.57 * Math.cos(angle);
      fin.position.z = 0.57 * Math.sin(angle);
      fin.position.y = -0.42;
      fin.rotation.y = angle;
      g.add(fin);
    }
    return g;
  }

  function buildShield(color) {
    var s = new THREE.Shape();
    s.moveTo(0, 1.25);
    s.lineTo( 0.88,  0.72);
    s.lineTo( 0.88, -0.08);
    s.bezierCurveTo( 0.88, -0.72, 0.52, -1.08, 0, -1.38);
    s.bezierCurveTo(-0.52, -1.08, -0.88, -0.72, -0.88, -0.08);
    s.lineTo(-0.88, 0.72);
    s.closePath();
    var geo = extrude(s, 0.38, 0.07);
    geo.center();
    return new THREE.Mesh(geo, mat(color));
  }

  // ── Renderer lifecycle ────────────────────────────────────────────────────

  function initRenderer(container) {
    var w = container.offsetWidth  || 480;
    var h = container.offsetHeight || 480;

    _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    _renderer.setSize(w, h);
    _renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    _renderer.setClearColor(0x000000, 0); // transparent background

    _scene  = new THREE.Scene();
    _camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 50);
    _camera.position.z = 4;

    var canvas = _renderer.domElement;
    canvas.style.cssText = 'display:block;width:100%;height:100%;';
    container.innerHTML = '';
    container.appendChild(canvas);
  }

  function setLights(color) {
    var toRemove = [];
    _scene.traverse(function (o) { if (o.isLight) toRemove.push(o); });
    toRemove.forEach(function (l) { _scene.remove(l); });

    var c = toHex(color);
    _scene.add(new THREE.AmbientLight(0x112233, 2));

    var key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(3, 4, 5);
    _scene.add(key);

    var fill = new THREE.PointLight(c, 4.5, 12);
    fill.position.set(-3, 1.5, 2);
    _scene.add(fill);

    var rim = new THREE.DirectionalLight(c, 2);
    rim.position.set(-1.5, -2, -4);
    _scene.add(rim);
  }

  function disposeMesh(obj) {
    if (!obj) return;
    obj.traverse(function (child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        var mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(function (m) { m.dispose(); });
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
    show: function (container, floorIndex) {
      if (!window.THREE) return;
      var cfg = FLOORS[floorIndex] || FLOORS[0];

      if (!_renderer) {
        initRenderer(container);
        animate();
      }

      // Swap geometry
      if (_mesh) {
        _scene.remove(_mesh);
        disposeMesh(_mesh);
        _mesh = null;
      }

      _mesh = cfg.build(cfg.color);
      setLights(cfg.color);
      _scene.add(_mesh);
    },

    stop:   function () { if (_raf) { cancelAnimationFrame(_raf); _raf = null; } },
    resume: function () { if (!_raf && _renderer) animate(); },
  };
}());
