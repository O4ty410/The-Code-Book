/**
 * VisorEffect — WebGL cockpit-glass / helmet-visor post-processing overlay.
 *
 * Renders on a transparent WebGL canvas stacked above the game scene.
 * Pointer events pass through so the game stays interactive.
 *
 * Usage:
 *   const visor = new VisorEffect(containerEl, sceneCanvas);
 *   visor.setLightPos(0.5, 0.42).setLightIntensity(1.0).start();
 *
 *   // Animate light pulses from game logic:
 *   visor.setLightIntensity(engineThrottle);
 */

// ─── GLSL sources ────────────────────────────────────────────────────────────

const VERT = `
attribute vec2 a_pos;
varying   vec2 v_uv;
void main(){
  v_uv        = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform sampler2D u_scene;
uniform vec2      u_resolution;
uniform float     u_time;
uniform vec2      u_light_pos;       // normalised [0,1]
uniform float     u_light_intensity; // 0-2 range

varying vec2 v_uv;

// ── hash / value-noise ──────────────────────────────────────────────────────
float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i),            hash(i+vec2(1,0)), f.x),
    mix(hash(i+vec2(0,1)),  hash(i+vec2(1,1)), f.x),
    f.y);
}

// ── scratch / dust normal map ───────────────────────────────────────────────
// Returns a 2-D normal perturbation whose magnitude equals local scratch density.
vec2 scratchMap(vec2 uv){
  // fine horizontal scratches
  float s1 = smoothstep(0.840, 0.857,
               vnoise(uv * vec2(1300.0, 3.0) + 0.31));

  // diagonal scratches (45°)
  vec2 rv  = vec2(uv.x*0.707+uv.y*0.707, -uv.x*0.707+uv.y*0.707);
  float s2 = smoothstep(0.825, 0.848,
               vnoise(rv * vec2(950.0, 2.8) + 0.64)) * 0.80;

  // fine vertical scratches
  float s3 = smoothstep(0.850, 0.865,
               vnoise(uv * vec2(2.0, 850.0) + 0.92)) * 0.70;

  // dust / smear blobs
  float d  = smoothstep(0.640, 0.695,
               vnoise(uv*8.0+0.12) * vnoise(uv*15.0+0.53)) * 0.18;

  float mask = s1 + s2 + s3 + d;

  // gradient of layer-1 scratch field → surface normal
  float ex = 0.45 / min(u_resolution.x, u_resolution.y);
  float gx = vnoise((uv+vec2(ex,0.0))*vec2(1300.0,3.0)+0.31)
           - vnoise((uv-vec2(ex,0.0))*vec2(1300.0,3.0)+0.31);
  float gy = vnoise((uv+vec2(0.0,ex))*vec2(1300.0,3.0)+0.31)
           - vnoise((uv-vec2(0.0,ex))*vec2(1300.0,3.0)+0.31);
  return vec2(gx, gy) * mask * 3.8;
}

// ── Fresnel coefficient (Schlick, F0 = glass ≈ 0.04) ──────────────────────
float fresnelK(vec2 uv, float asp){
  vec2  c    = (uv - 0.5) * vec2(asp, 1.0);
  float ndotv = clamp(1.0 - length(c) * 1.85, 0.0, 1.0);
  return 0.04 + 0.96 * pow(1.0 - ndotv, 5.0);
}

// ── glass-surface reflections: stars + light streaks (NO player) ───────────
vec3 glassReflect(vec2 uv, float fr, float asp){
  vec3 acc = vec3(0.0);

  // four depth layers of tiny stars reflected in the glass surface
  for(int i = 0; i < 4; i++){
    float fi  = float(i);
    vec2  cu  = uv*(22.0+fi*11.0) + vec2(fi*0.273, fi*0.491);
    vec2  ce  = fract(cu) - 0.5;
    float h   = step(0.76+fi*0.03, hash(floor(cu)+fi*17.3));
    float s   = exp(-length(ce)*(72.0+fi*18.0)) * h * 0.065;
    acc      += vec3(0.74, 0.87, 1.00) * s;
  }

  // light streak across the glass from the bright source
  vec2  lv     = uv - u_light_pos;
  float streak = exp(-abs(lv.x*asp - lv.y*0.12)*78.0)
               * exp(-length(lv)*2.6) * 0.11 * u_light_intensity;
  acc += vec3(1.00, 0.58, 0.18) * streak;

  // two small caustic blobs displaced from the light position
  for(int j = 0; j < 2; j++){
    vec2  bo = vec2(float(j)*0.32-0.16, float(j)*0.18-0.09);
    float bl = exp(-length((uv-u_light_pos+bo)*vec2(asp,1.0))*8.5);
    acc     += vec3(0.90,0.64,0.28)*bl*0.052*u_light_intensity;
  }

  return acc * fr;
}

// ── visor rim glow (Fresnel + cyan-blue emission at ellipse boundary) ───────
vec3 rimGlow(vec2 uv, float asp){
  float r   = length((uv-0.5)*vec2(asp,1.0)) / 0.495;
  float rim = smoothstep(0.70, 1.00, r) * (1.0 - smoothstep(1.00, 1.14, r));
  // bias rim colour toward orange near the light source
  float lb  = exp(-length((uv-u_light_pos)*vec2(asp,1.0))*1.4) * 0.38;
  vec3  rc  = mix(vec3(0.14,0.44,0.88), vec3(1.0,0.52,0.14), lb);
  return rc * rim * 0.88;
}

// ── main ───────────────────────────────────────────────────────────────────
void main(){
  vec2  uv  = v_uv;
  float asp = u_resolution.x / u_resolution.y;

  // 1. scratch normals → refraction offset
  vec2 sn   = scratchMap(uv);
  vec2 rUV  = clamp(uv + sn * 0.0024, 0.001, 0.999);

  // 2. sample the game scene at refracted coordinates
  vec3 scene = texture2D(u_scene, rUV).rgb;

  // 3. glass tint (cool blue-grey, semi-transparent)
  vec3 tint = vec3(0.62, 0.74, 0.88);
  vec3 col  = mix(scene * tint, tint, 0.16);

  // 4. Fresnel
  float fr = fresnelK(uv, asp);

  // 5. star + caustic reflections on glass surface (modulated by Fresnel)
  col += glassReflect(uv, fr, asp);

  // 6. warm halo from central orange light source
  vec2  lv    = (uv - u_light_pos) * vec2(asp, 1.0);
  float ldist = length(lv);
  float halo  = exp(-ldist * 3.6) * 0.19 * u_light_intensity;
  col += vec3(1.00, 0.52, 0.10) * halo;

  // 7. sharp specular glint (displaced slightly from light center)
  vec2  sOff  = vec2(-0.058/asp, -0.042);
  float sDist = length((uv - u_light_pos + sOff) * vec2(asp, 1.0));
  float spec  = exp(-sDist * 50.0) * 0.48 * u_light_intensity;
  col += vec3(1.00, 0.82, 0.52) * spec;

  // 8. scratch highlights — scratches glow when near the light source
  float sGlow = length(sn) * exp(-ldist * 3.1) * 0.52 * u_light_intensity;
  col += vec3(0.80, 0.86, 1.00) * sGlow;

  // 9. animated breath / micro-condensation patch
  float fog = vnoise(uv*5.2 + vec2(u_time*0.058, u_time*0.042))
            * vnoise(uv*3.1 + 0.53) * 0.038;
  col += vec3(0.58, 0.68, 0.80) * fog;

  // 10. Fresnel rim glow at visor boundary
  col += rimGlow(uv, asp);

  // 11. helmet frame — darken outside the visor ellipse
  float outr   = length((uv-0.5)*vec2(asp,1.0)) / 0.495;
  float outside = smoothstep(0.96, 1.06, outr);
  col = mix(col, vec3(0.018, 0.024, 0.032), outside * 0.96);

  // 12. top-corner glossy sheen (glass surface specular highlight)
  vec2  shC  = uv - 0.5 - vec2(-0.18/asp, 0.23);
  float shine = exp(-length(shC*vec2(asp,1.0))*6.8) * 0.07;
  col += vec3(0.72, 0.83, 1.00) * shine;

  gl_FragColor = vec4(col, 1.0);
}`;

// ─── VisorEffect class ────────────────────────────────────────────────────────

export class VisorEffect {
  /**
   * @param {HTMLElement}        container   - element to overlay (gets position:relative)
   * @param {HTMLCanvasElement}  [sceneCanvas] - 2-D canvas to use as scene texture;
   *                                            if omitted, the visor renders over a black
   *                                            background until one is set via setSceneCanvas().
   */
  constructor(container, sceneCanvas = null) {
    this._container       = container;
    this._sceneCanvas     = sceneCanvas;
    this._lightPos        = [0.5, 0.42];
    this._lightIntensity  = 1.0;
    this._raf             = null;
    this._startTime       = performance.now();

    this._canvas    = null;
    this._gl        = null;
    this._prog      = null;
    this._quadBuf   = null;
    this._sceneTex  = null;
    this._uniforms  = {};

    this._initGL();
  }

  // ── public API ──────────────────────────────────────────────────────────────

  /** Start the render loop. */
  start() {
    if (this._raf) return this;
    this._raf = requestAnimationFrame(t => this._loop(t));
    return this;
  }

  /** Stop the render loop. */
  stop() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    return this;
  }

  /**
   * Set the light source position in normalised [0,1] screen coordinates.
   * @param {number} x
   * @param {number} y  (0 = top, 1 = bottom — matches WebGL UV convention)
   */
  setLightPos(x, y) { this._lightPos = [x, y]; return this; }

  /**
   * Set light intensity.  1.0 = normal.  0 = dark cockpit.  2 = engine flare.
   */
  setLightIntensity(v) { this._lightIntensity = Math.max(0, v); return this; }

  /** Hot-swap the source canvas (e.g. when switching game views). */
  setSceneCanvas(canvas) { this._sceneCanvas = canvas; return this; }

  /** Remove the overlay canvas and free GL resources. */
  dispose() {
    this.stop();
    if (this._ro)     this._ro.disconnect();
    if (this._canvas) this._canvas.remove();
    const gl = this._gl;
    if (gl) {
      if (this._sceneTex) gl.deleteTexture(this._sceneTex);
      if (this._prog)     gl.deleteProgram(this._prog);
      if (this._quadBuf)  gl.deleteBuffer(this._quadBuf);
    }
  }

  // ── internals ───────────────────────────────────────────────────────────────

  _initGL() {
    const canvas = document.createElement('canvas');
    // Float above the scene, pass mouse events through
    Object.assign(canvas.style, {
      position: 'absolute', inset: '0',
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '100',
    });
    const cs = getComputedStyle(this._container);
    if (cs.position === 'static') this._container.style.position = 'relative';
    this._container.appendChild(canvas);
    this._canvas = canvas;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false });
    if (!gl) { console.error('[VisorEffect] WebGL not available'); return; }
    this._gl = gl;

    this._prog = this._buildProgram(VERT, FRAG);

    // Full-screen triangle strip
    this._quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1,  1,-1,  -1,1,  1,1]), gl.STATIC_DRAW);

    // Cache uniform locations
    const p = this._prog;
    this._uniforms = {
      u_scene:           gl.getUniformLocation(p, 'u_scene'),
      u_resolution:      gl.getUniformLocation(p, 'u_resolution'),
      u_time:            gl.getUniformLocation(p, 'u_time'),
      u_light_pos:       gl.getUniformLocation(p, 'u_light_pos'),
      u_light_intensity: gl.getUniformLocation(p, 'u_light_intensity'),
    };

    // Scene texture (will be uploaded each frame from source canvas)
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // 1×1 placeholder so the texture is complete before first frame
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 12, 255]));
    this._sceneTex = tex;

    // Keep canvas pixel-size in sync with CSS size
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(canvas);
    this._resize();
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w   = Math.round(this._canvas.clientWidth  * dpr);
    const h   = Math.round(this._canvas.clientHeight * dpr);
    if (this._canvas.width !== w || this._canvas.height !== h) {
      this._canvas.width  = w;
      this._canvas.height = h;
      if (this._gl) this._gl.viewport(0, 0, w, h);
    }
  }

  _buildProgram(vertSrc, fragSrc) {
    const gl = this._gl;
    const vs = this._compile(gl.VERTEX_SHADER,   vertSrc);
    const fs = this._compile(gl.FRAGMENT_SHADER, fragSrc);
    const pr = gl.createProgram();
    gl.attachShader(pr, vs); gl.attachShader(pr, fs);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS))
      console.error('[VisorEffect] Link:', gl.getProgramInfoLog(pr));
    return pr;
  }

  _compile(type, src) {
    const gl = this._gl;
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
      console.error('[VisorEffect] Shader:', gl.getShaderInfoLog(sh));
    return sh;
  }

  _loop(now) {
    this._render(now);
    this._raf = requestAnimationFrame(t => this._loop(t));
  }

  _render(now) {
    const gl = this._gl;
    if (!gl) return;

    const t  = (now - this._startTime) * 0.001;
    const w  = this._canvas.width;
    const h  = this._canvas.height;

    // Upload the source canvas as the scene texture every frame
    if (this._sceneCanvas) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this._sceneTex);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._sceneCanvas);
      } catch(e) {
        // source canvas may not be ready yet — skip frame
      }
    }

    gl.useProgram(this._prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._quadBuf);

    const aPos = gl.getAttribLocation(this._prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = this._uniforms;
    gl.uniform1i(u.u_scene, 0);
    gl.uniform2f(u.u_resolution, w, h);
    gl.uniform1f(u.u_time, t);
    gl.uniform2f(u.u_light_pos, this._lightPos[0], this._lightPos[1]);
    gl.uniform1f(u.u_light_intensity, this._lightIntensity);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._sceneTex);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default VisorEffect;
