/**
 * VisorEffect — WebGL cockpit-glass / helmet-visor post-processing overlay.
 *
 * Two modes:
 *  • Overlay mode  (default, sceneCanvas omitted)
 *    The WebGL canvas is transparent where glass is clear and opaque only
 *    where glass effects are visible.  The game / page content shows through
 *    naturally underneath — no cross-origin texture issues.
 *
 *  • Scene mode  (pass a sceneCanvas)
 *    The visor samples that canvas as a texture, applies refraction and tint,
 *    and outputs an opaque result.  Useful for the standalone demo.
 *
 * Usage (overlay — in-game):
 *   const visor = new VisorEffect(containerEl);
 *   visor.setLightPos(0.5, 0.42).setLightIntensity(1.0).start();
 *
 * Usage (scene-sampling — demo):
 *   const visor = new VisorEffect(containerEl, sceneCanvas);
 *   visor.start();
 */

// ─── shared GLSL utilities (inlined into each shader) ────────────────────────

const GLSL_UTIL = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_light_pos;
uniform float u_light_intensity;

varying vec2 v_uv;

float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

// Procedural scratch / dust normal map
vec2 scratchMap(vec2 uv){
  float s1=smoothstep(0.840,0.857,vnoise(uv*vec2(1300.0,3.0)+0.31));
  vec2 rv=vec2(uv.x*0.707+uv.y*0.707,-uv.x*0.707+uv.y*0.707);
  float s2=smoothstep(0.825,0.848,vnoise(rv*vec2(950.0,2.8)+0.64))*0.80;
  float s3=smoothstep(0.850,0.865,vnoise(uv*vec2(2.0,850.0)+0.92))*0.70;
  float d =smoothstep(0.640,0.695,vnoise(uv*8.0+0.12)*vnoise(uv*15.0+0.53))*0.18;
  float mask=s1+s2+s3+d;
  float ex=0.45/min(u_resolution.x,u_resolution.y);
  float gx=vnoise((uv+vec2(ex,0.0))*vec2(1300.0,3.0)+0.31)
          -vnoise((uv-vec2(ex,0.0))*vec2(1300.0,3.0)+0.31);
  float gy=vnoise((uv+vec2(0.0,ex))*vec2(1300.0,3.0)+0.31)
          -vnoise((uv-vec2(0.0,ex))*vec2(1300.0,3.0)+0.31);
  return vec2(gx,gy)*mask*3.8;
}

// Schlick Fresnel (F0 = 0.04, glass)
float fresnelK(vec2 uv, float asp){
  float ndotv=clamp(1.0-length((uv-0.5)*vec2(asp,1.0))*1.85,0.0,1.0);
  return 0.04+0.96*pow(1.0-ndotv,5.0);
}

// Glass surface reflections: stars + light streaks (NO player face)
vec3 glassReflect(vec2 uv, float fr, float asp){
  vec3 acc=vec3(0.0);
  for(int i=0;i<4;i++){
    float fi=float(i);
    vec2 cu=uv*(22.0+fi*11.0)+vec2(fi*0.273,fi*0.491);
    vec2 ce=fract(cu)-0.5;
    float h=step(0.76+fi*0.03,hash(floor(cu)+fi*17.3));
    acc+=vec3(0.74,0.87,1.00)*exp(-length(ce)*(72.0+fi*18.0))*h*0.065;
  }
  vec2 lv=uv-u_light_pos;
  float streak=exp(-abs(lv.x*asp-lv.y*0.12)*78.0)*exp(-length(lv)*2.6)*0.11*u_light_intensity;
  acc+=vec3(1.00,0.58,0.18)*streak;
  for(int j=0;j<2;j++){
    vec2 bo=vec2(float(j)*0.32-0.16,float(j)*0.18-0.09);
    float bl=exp(-length((uv-u_light_pos+bo)*vec2(asp,1.0))*8.5);
    acc+=vec3(0.90,0.64,0.28)*bl*0.052*u_light_intensity;
  }
  return acc*fr;
}

// Cyan-blue Fresnel rim glow at visor boundary, biased orange near light
vec3 rimColor(vec2 uv, float asp){
  float r=length((uv-0.5)*vec2(asp,1.0))/0.495;
  float rim=smoothstep(0.70,1.00,r)*(1.0-smoothstep(1.00,1.14,r));
  float lb=exp(-length((uv-u_light_pos)*vec2(asp,1.0))*1.4)*0.38;
  return mix(vec3(0.14,0.44,0.88),vec3(1.00,0.52,0.14),lb)*rim*0.88;
}
`;

// ─── vertex shader (shared) ───────────────────────────────────────────────────

const VERT = `
attribute vec2 a_pos;
varying   vec2 v_uv;
void main(){
  v_uv=a_pos*0.5+0.5;
  gl_Position=vec4(a_pos,0.0,1.0);
}`;

// ─── OVERLAY fragment shader ──────────────────────────────────────────────────
// Outputs transparent RGBA. Glass effects show as additive color+alpha layers.
// The game below shows through where alpha is near 0 (clear visor centre).

const FRAG_OL = GLSL_UTIL + `
void main(){
  vec2  uv  = v_uv;
  float asp = u_resolution.x/u_resolution.y;

  float r       = length((uv-0.5)*vec2(asp,1.0))/0.495;
  float inside  = 1.0-smoothstep(0.96,1.05,r);
  float outside = smoothstep(0.96,1.05,r);

  vec2  sn    = scratchMap(uv);
  float fr    = fresnelK(uv,asp);
  vec2  lv    = (uv-u_light_pos)*vec2(asp,1.0);
  float ldist = length(lv);

  // ── accumulate (col = additive RGB, alpha = max of all contributions) ──
  vec3  col   = vec3(0.0);
  float alpha = 0.0;

  // 1. Subtle glass tint (presence of glass even in "clear" areas)
  float tintA = 0.09*inside;
  col  += vec3(0.62,0.74,0.88)*tintA;
  alpha = max(alpha,tintA);

  // 2. Glass-surface reflections (stars + light streaks)
  vec3  rc  = glassReflect(uv,fr,asp);
  float ra  = clamp(dot(rc,vec3(0.30,0.59,0.11))*4.0,0.0,1.0)*inside;
  col  += rc;
  alpha = max(alpha,ra);

  // 3. Warm halo from central orange light source
  float haloA = exp(-ldist*3.6)*0.22*u_light_intensity*inside;
  col  += vec3(1.00,0.52,0.10)*haloA;
  alpha = max(alpha,haloA);

  // 4. Sharp specular glint (offset from light centre)
  vec2  sOff = vec2(-0.058/asp,-0.042);
  float spec = exp(-length((uv-u_light_pos+sOff)*vec2(asp,1.0))*50.0)
             * 0.52*u_light_intensity*inside;
  col  += vec3(1.00,0.82,0.52)*spec;
  alpha = max(alpha,spec);

  // 5. Scratch highlights (catch the light, bright fine lines)
  float scrA = length(sn)*exp(-ldist*3.1)*0.50*u_light_intensity*inside;
  col  += vec3(0.80,0.86,1.00)*scrA;
  alpha = max(alpha,scrA);

  // 6. Animated breath / micro-condensation
  float fogA = vnoise(uv*5.2+vec2(u_time*0.058,u_time*0.042))
             * vnoise(uv*3.1+0.53)*0.038*inside;
  col  += vec3(0.58,0.68,0.80)*fogA;
  alpha = max(alpha,fogA);

  // 7. Fresnel rim glow — the strongest visible element at visor edge
  vec3  rg   = rimColor(uv,asp);
  float rimA = clamp(length(rg)*1.8,0.0,0.90)*inside;
  col  += rg;
  alpha = max(alpha,rimA);

  // 8. Top-corner glossy sheen
  vec2  shC  = uv-0.5-vec2(-0.18/asp,0.23);
  float shA  = exp(-length(shC*vec2(asp,1.0))*6.8)*0.08*inside;
  col  += vec3(0.72,0.83,1.00)*shA;
  alpha = max(alpha,shA);

  // 9. Helmet frame — opaque dark outside visor ellipse
  float frameA = outside*0.97;
  col   = mix(col,  vec3(0.016,0.022,0.030), frameA);
  alpha = mix(alpha, 0.97, frameA);

  gl_FragColor = vec4(col, clamp(alpha,0.0,1.0));
}`;

// ─── SCENE fragment shader ────────────────────────────────────────────────────
// Samples a scene texture (2-D canvas), applies refraction + glass tint, opaque output.

const FRAG_SCENE = GLSL_UTIL + `
uniform sampler2D u_scene;

void main(){
  vec2  uv  = v_uv;
  float asp = u_resolution.x/u_resolution.y;

  vec2 sn  = scratchMap(uv);
  vec2 rUV = clamp(uv+sn*0.0024,0.001,0.999);

  vec3 scene = texture2D(u_scene,rUV).rgb;
  vec3 tint  = vec3(0.62,0.74,0.88);
  vec3 col   = mix(scene*tint, tint, 0.16);

  float fr = fresnelK(uv,asp);
  col += glassReflect(uv,fr,asp);

  vec2  lv    = (uv-u_light_pos)*vec2(asp,1.0);
  float ldist = length(lv);
  col += vec3(1.00,0.52,0.10)*exp(-ldist*3.6)*0.19*u_light_intensity;

  vec2  sOff=vec2(-0.058/asp,-0.042);
  col += vec3(1.00,0.82,0.52)
       * exp(-length((uv-u_light_pos+sOff)*vec2(asp,1.0))*50.0)*0.48*u_light_intensity;

  col += vec3(0.80,0.86,1.00)*length(sn)*exp(-ldist*3.1)*0.52*u_light_intensity;
  col += vec3(0.58,0.68,0.80)
       * vnoise(uv*5.2+vec2(u_time*0.058,u_time*0.042))*vnoise(uv*3.1+0.53)*0.038;

  col += rimColor(uv,asp);

  float outr=length((uv-0.5)*vec2(asp,1.0))/0.495;
  col = mix(col, vec3(0.018,0.024,0.032), smoothstep(0.96,1.06,outr)*0.96);

  vec2 shC=uv-0.5-vec2(-0.18/asp,0.23);
  col += vec3(0.72,0.83,1.00)*exp(-length(shC*vec2(asp,1.0))*6.8)*0.07;

  gl_FragColor = vec4(col,1.0);
}`;

// ─── VisorEffect class ────────────────────────────────────────────────────────

export class VisorEffect {
  /**
   * @param {HTMLElement}        container
   * @param {HTMLCanvasElement}  [sceneCanvas]  Omit for overlay mode (recommended for in-game use).
   */
  constructor(container, sceneCanvas = null) {
    this._container      = container;
    this._sceneCanvas    = sceneCanvas;
    this._overlayMode    = (sceneCanvas === null);
    this._lightPos       = [0.5, 0.42];
    this._lightIntensity = 1.0;
    this._raf            = null;
    this._startTime      = performance.now();

    this._canvas   = null;
    this._gl       = null;
    this._prog     = null;
    this._quadBuf  = null;
    this._sceneTex = null;
    this._uniforms = {};

    this._initGL();
  }

  // ── public API ──────────────────────────────────────────────────────────────

  start() {
    if (!this._raf)
      this._raf = requestAnimationFrame(t => this._loop(t));
    return this;
  }

  stop() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    return this;
  }

  /** Normalised [0,1] screen position of the primary light source. */
  setLightPos(x, y) { this._lightPos = [x, y]; return this; }

  /** 0 = dark cockpit, 1 = normal, 2 = engine flare. */
  setLightIntensity(v) { this._lightIntensity = Math.max(0, v); return this; }

  setSceneCanvas(c) { this._sceneCanvas = c; return this; }

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
    Object.assign(canvas.style, {
      position: 'absolute', inset: '0',
      width: '100%', height: '100%',
      pointerEvents: 'none',
      zIndex: '100',
    });
    const cs = getComputedStyle(this._container);
    if (cs.position === 'static') this._container.style.position = 'relative';
    this._container.appendChild(canvas);
    this._canvas = canvas;

    const ctxAttribs = this._overlayMode
      ? { alpha: true, premultipliedAlpha: false, antialias: false, depth: false }
      : { alpha: false, antialias: false, depth: false };

    const gl = canvas.getContext('webgl', ctxAttribs);
    if (!gl) { console.error('[VisorEffect] WebGL unavailable'); return; }
    this._gl = gl;

    this._prog = this._buildProgram(VERT, this._overlayMode ? FRAG_OL : FRAG_SCENE);

    this._quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const p = this._prog;
    this._uniforms = {
      u_resolution:      gl.getUniformLocation(p, 'u_resolution'),
      u_time:            gl.getUniformLocation(p, 'u_time'),
      u_light_pos:       gl.getUniformLocation(p, 'u_light_pos'),
      u_light_intensity: gl.getUniformLocation(p, 'u_light_intensity'),
      u_scene:           gl.getUniformLocation(p, 'u_scene'),
    };

    if (!this._overlayMode) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0,0,12,255]));
      this._sceneTex = tex;
    }

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

  _buildProgram(vs, fs) {
    const gl = this._gl;
    const p  = gl.createProgram();
    gl.attachShader(p, this._compile(gl.VERTEX_SHADER,   vs));
    gl.attachShader(p, this._compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS))
      console.error('[VisorEffect] Link:', gl.getProgramInfoLog(p));
    return p;
  }

  _compile(type, src) {
    const gl = this._gl;
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
      console.error('[VisorEffect] Shader compile:', gl.getShaderInfoLog(sh));
    return sh;
  }

  _loop(now) {
    this._render(now);
    this._raf = requestAnimationFrame(t => this._loop(t));
  }

  _render(now) {
    const gl = this._gl;
    if (!gl) return;

    const t = (now - this._startTime) * 0.001;
    const w = this._canvas.width;
    const h = this._canvas.height;

    // Upload scene texture (scene mode only)
    if (!this._overlayMode && this._sceneCanvas) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this._sceneTex);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._sceneCanvas);
      } catch (_) { /* canvas not ready */ }
    }

    // In overlay mode clear to fully transparent each frame
    if (this._overlayMode) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    gl.useProgram(this._prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._quadBuf);

    const aPos = gl.getAttribLocation(this._prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = this._uniforms;
    gl.uniform2f(u.u_resolution, w, h);
    gl.uniform1f(u.u_time, t);
    gl.uniform2f(u.u_light_pos, this._lightPos[0], this._lightPos[1]);
    gl.uniform1f(u.u_light_intensity, this._lightIntensity);

    if (!this._overlayMode) {
      gl.uniform1i(u.u_scene, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this._sceneTex);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default VisorEffect;
