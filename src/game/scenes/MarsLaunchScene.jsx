import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useGameLoop } from '../hooks';
import { startSpaceAmbient } from '../systems/audioSystem';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const EARTH_MARS_KM = 225_000_000;
const EMERGE_DUR    = 4.5;
const ORBIT_DUR     = 6.0;
const APPROACH_DUR  = 14.0;
const TRANSIT_DUR   = 90;
const TIME_SCALES   = [1, 10, 100, 1000];

const CAM_AUTO    = 'AUTO';
const CAM_WIDE    = 'WIDE';
const CAM_CHASE   = 'CHASE';
const CAM_POV     = 'POV';
const CAM_FLYBY   = 'FLYBY';
const CAM_ORBITAL = 'ORBITAL';
const ALL_CAMS    = [CAM_AUTO, CAM_WIDE, CAM_CHASE, CAM_POV, CAM_FLYBY, CAM_ORBITAL];

const CINEMATIC_EVENTS = [
  { id:'burn',   prog:0.28, label:'MID-COURSE CORRECTION BURN',    sub:'Δv = +4.2 m/s  ·  Duration: 8.3 sec',           color:'#f59e0b', duration:5 },
  { id:'flare',  prog:0.47, label:'SOLAR PARTICLE EVENT',          sub:'Class M5.2 flare  ·  Radiation shield nominal',  color:'#ef4444', duration:6 },
  { id:'update', prog:0.63, label:'MISSION CONTROL UPDATE',        sub:'All systems nominal  ·  Go for orbital insertion',color:'#22c55e', duration:5 },
  { id:'nav',    prog:0.79, label:'NAVIGATION CORRECTION',         sub:'Inclination +0.003°  ·  ΔR = 812 km',            color:'#60a5fa', duration:4 },
  { id:'comm',   prog:0.90, label:'COMMS DELAY  ·  14.2 MIN',     sub:'Mars approach confirmed  ·  Stand by',            color:'#a78bfa', duration:5 },
];

// World-space positions
const EARTH_POS  = new THREE.Vector3(-9, 0, 0);
const MARS_POS   = new THREE.Vector3(22, 0, 0);
const EARTH_R    = 2.2;
const MARS_R     = 1.5;
const SUN_DIR    = new THREE.Vector3(-1, 0.35, 0.6).normalize();

// ─────────────────────────────────────────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function fmtTime(secs) {
  const s=Math.floor(Math.max(0,secs)), h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sc=s%60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`;
}
function fmtKm(km) {
  const v=Math.max(0,km);
  if (v>=1_000_000) return `${(v/1_000_000).toFixed(2)}M km`;
  if (v>=1_000)     return `${(v/1_000).toFixed(0)}k km`;
  return `${v.toFixed(0)} km`;
}
function bezQ(t2, ax, ay, cpx, cpy, bx, by) {
  return [
    (1-t2)*(1-t2)*ax + 2*(1-t2)*t2*cpx + t2*t2*bx,
    (1-t2)*(1-t2)*ay + 2*(1-t2)*t2*cpy + t2*t2*by,
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL TEXTURES
// ─────────────────────────────────────────────────────────────────────────────
function makeEarthTex() {
  const W=2048, H=1024;
  const c=document.createElement('canvas'); c.width=W; c.height=H;
  const ctx=c.getContext('2d');
  // Deep ocean
  const og=ctx.createLinearGradient(0,0,0,H);
  og.addColorStop(0,'#0a2855'); og.addColorStop(0.5,'#0d3a70'); og.addColorStop(1,'#0a2855');
  ctx.fillStyle=og; ctx.fillRect(0,0,W,H);
  // Ocean shimmer
  for(let i=0;i<180;i++){
    const ox=(Math.sin(i*3.7)*0.5+0.5)*W, oy=(Math.cos(i*2.9)*0.5+0.5)*H;
    const r=ctx.createRadialGradient(ox,oy,0,ox,oy,W*0.022);
    r.addColorStop(0,'rgba(30,100,200,0.18)'); r.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=r; ctx.beginPath(); ctx.ellipse(ox,oy,W*0.022,H*0.010,i,0,Math.PI*2); ctx.fill();
  }
  // Continents
  ctx.globalCompositeOperation='source-over';
  const conts=[
    // N America
    {x:W*0.16,y:H*0.32,rx:W*0.085,ry:H*0.20,rot:0.25,c:'#2d6b28'},
    {x:W*0.12,y:H*0.46,rx:W*0.065,ry:H*0.13,rot:0.08,c:'#316d24'},
    // S America
    {x:W*0.20,y:H*0.64,rx:W*0.050,ry:H*0.18,rot:-0.08,c:'#3a7a30'},
    // Europe
    {x:W*0.455,y:H*0.29,rx:W*0.048,ry:H*0.11,rot:0.10,c:'#4a8a3a'},
    // Africa
    {x:W*0.465,y:H*0.54,rx:W*0.058,ry:H*0.22,rot:0.05,c:'#7a6a28'},
    // Asia
    {x:W*0.62,y:H*0.28,rx:W*0.160,ry:H*0.19,rot:0.05,c:'#4a8040'},
    // SE Asia / India
    {x:W*0.66,y:H*0.50,rx:W*0.040,ry:H*0.12,rot:0.10,c:'#3a7030'},
    // Australia
    {x:W*0.765,y:H*0.62,rx:W*0.055,ry:H*0.08,rot:0.18,c:'#8a7830'},
  ];
  conts.forEach(({x,y,rx,ry,rot,c: col}) => {
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.fill();
    // Terrain variation
    ctx.fillStyle='rgba(0,0,0,0.12)';
    for(let i=0;i<8;i++){
      ctx.beginPath(); ctx.ellipse((Math.random()-0.5)*rx,(Math.random()-0.5)*ry,rx*0.3*Math.random(),ry*0.25*Math.random(),Math.random(),0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
  });
  // Cloud layer
  ctx.fillStyle='rgba(255,255,255,0.22)';
  for(let i=0;i<200;i++){
    const cx2=(Math.sin(i*4.1+1)*0.5+0.5)*W, cy2=(Math.cos(i*3.7+2)*0.5+0.5)*H;
    ctx.beginPath(); ctx.ellipse(cx2,cy2,W*0.038,H*0.018,i*0.8,0,Math.PI*2); ctx.fill();
  }
  ctx.fillStyle='rgba(255,255,255,0.14)';
  for(let i=0;i<120;i++){
    const cx2=(Math.sin(i*5.3+3)*0.5+0.5)*W, cy2=(Math.cos(i*4.1+1)*0.5+0.5)*H;
    ctx.beginPath(); ctx.ellipse(cx2,cy2,W*0.055,H*0.025,i*1.1,0,Math.PI*2); ctx.fill();
  }
  // Ice caps
  const iceg=ctx.createLinearGradient(0,0,0,H*0.10);
  iceg.addColorStop(0,'rgba(235,245,255,0.95)'); iceg.addColorStop(1,'rgba(200,225,255,0)');
  ctx.fillStyle=iceg; ctx.fillRect(0,0,W,H*0.10);
  const iceg2=ctx.createLinearGradient(0,H*0.90,0,H);
  iceg2.addColorStop(0,'rgba(200,225,255,0)'); iceg2.addColorStop(1,'rgba(235,245,255,0.90)');
  ctx.fillStyle=iceg2; ctx.fillRect(0,H*0.90,W,H*0.10);
  return new THREE.CanvasTexture(c);
}

function makeEarthLightsTex() {
  const W=2048, H=1024;
  const c=document.createElement('canvas'); c.width=W; c.height=H;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);
  const clusters=[
    [W*0.20,H*0.33,18],[W*0.15,H*0.40,14],[W*0.22,H*0.39,10], // N America
    [W*0.47,H*0.30,16],[W*0.50,H*0.32,12],[W*0.44,H*0.31,10], // Europe
    [W*0.58,H*0.30,14],[W*0.64,H*0.31,12],[W*0.70,H*0.29,10],[W*0.72,H*0.35,9],[W*0.66,H*0.40,8], // Asia
    [W*0.22,H*0.62,9], // S America
    [W*0.47,H*0.50,8], // Africa
    [W*0.77,H*0.63,7], // Australia
    [W*0.66,H*0.48,10], // India
  ];
  clusters.forEach(([cx2,cy2,cnt]) => {
    const g=ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,W*0.028);
    g.addColorStop(0,'rgba(255,220,100,0.85)'); g.addColorStop(0.5,'rgba(255,180,60,0.40)'); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx2,cy2,W*0.028,0,Math.PI*2); ctx.fill();
    for(let i=0;i<cnt;i++){
      const dx=(Math.random()-0.5)*W*0.035, dy=(Math.random()-0.5)*H*0.030;
      const a=0.35+Math.random()*0.55;
      ctx.fillStyle=`rgba(255,${150+Math.random()*105|0},${40+Math.random()*60|0},${a})`;
      ctx.fillRect((cx2+dx)|0,(cy2+dy)|0,2,2);
    }
  });
  return new THREE.CanvasTexture(c);
}

function makeEarthSpecTex() {
  const W=1024, H=512;
  const c=document.createElement('canvas'); c.width=W; c.height=H;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#888'; ctx.fillRect(0,0,W,H); // ocean = specular
  // Continents dark (not specular)
  ctx.fillStyle='#222';
  [[W*0.16,H*0.32,W*0.085,H*0.20,0.25],[W*0.12,H*0.46,W*0.065,H*0.13,0.08],
   [W*0.20,H*0.64,W*0.050,H*0.18,-0.08],[W*0.455,H*0.29,W*0.048,H*0.11,0.10],
   [W*0.465,H*0.54,W*0.058,H*0.22,0.05],[W*0.62,H*0.28,W*0.160,H*0.19,0.05],
   [W*0.66,H*0.50,W*0.040,H*0.12,0.10],[W*0.765,H*0.62,W*0.055,H*0.08,0.18]
  ].forEach(([x,y,rx,ry,rot]) => {
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
  return new THREE.CanvasTexture(c);
}

function makeMarsTex() {
  const W=2048, H=1024;
  const c=document.createElement('canvas'); c.width=W; c.height=H;
  const ctx=c.getContext('2d');
  // Base
  const mg=ctx.createLinearGradient(0,0,0,H);
  mg.addColorStop(0,'#a03818'); mg.addColorStop(0.5,'#c04822'); mg.addColorStop(1,'#a03818');
  ctx.fillStyle=mg; ctx.fillRect(0,0,W,H);
  // Terrain patches
  [[W*0.40,H*0.42,W*0.18,H*0.15,0,'rgba(160,50,16,0.42)'],[W*0.70,H*0.50,W*0.14,H*0.18,0,'rgba(185,72,24,0.35)'],
   [W*0.20,H*0.62,W*0.12,H*0.12,0,'rgba(135,38,10,0.38)'],[W*0.55,H*0.25,W*0.22,H*0.10,0,'rgba(190,82,28,0.28)'],
   [W*0.80,H*0.35,W*0.10,H*0.14,0,'rgba(155,55,18,0.32)'],[W*0.05,H*0.55,W*0.08,H*0.16,0,'rgba(175,62,20,0.30)'],
  ].forEach(([x,y,rx,ry,rot,col]) => {
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,0,0.10)';
    for(let i=0;i<6;i++){ctx.beginPath(); ctx.ellipse((Math.random()-0.5)*rx,(Math.random()-0.5)*ry,rx*0.25,ry*0.2,Math.random(),0,Math.PI*2); ctx.fill();}
    ctx.restore();
  });
  // Valles Marineris
  ctx.save(); ctx.translate(W*0.48,H*0.46); ctx.rotate(-0.14);
  ctx.fillStyle='rgba(80,18,4,0.55)';
  ctx.fillRect(-W*0.20,-H*0.025,W*0.40,H*0.042);
  ctx.fillStyle='rgba(60,12,2,0.30)';
  ctx.fillRect(-W*0.20,-H*0.014,W*0.40,H*0.028);
  ctx.restore();
  // Olympus Mons
  const om=ctx.createRadialGradient(W*0.28,H*0.40,0,W*0.28,H*0.40,W*0.055);
  om.addColorStop(0,'rgba(215,95,38,0.65)'); om.addColorStop(0.6,'rgba(185,70,24,0.20)'); om.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=om; ctx.beginPath(); ctx.arc(W*0.28,H*0.40,W*0.055,0,Math.PI*2); ctx.fill();
  // Dust storm band
  ctx.fillStyle='rgba(210,115,48,0.14)';
  ctx.fillRect(0,H*0.42,W,H*0.18);
  // Polar caps
  const pgN=ctx.createLinearGradient(0,0,0,H*0.10);
  pgN.addColorStop(0,'rgba(235,228,220,0.90)'); pgN.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=pgN; ctx.fillRect(0,0,W,H*0.10);
  const pgS=ctx.createLinearGradient(0,H*0.90,0,H);
  pgS.addColorStop(0,'rgba(0,0,0,0)'); pgS.addColorStop(1,'rgba(225,218,210,0.82)');
  ctx.fillStyle=pgS; ctx.fillRect(0,H*0.90,W,H*0.10);
  return new THREE.CanvasTexture(c);
}

// ─────────────────────────────────────────────────────────────────────────────
// SHADERS
// ─────────────────────────────────────────────────────────────────────────────
const ATM_VS = `
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}`;

const ATM_FS = `
uniform vec3 glowColor;
uniform float intensity;
uniform float power;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
  rim = pow(rim, power);
  gl_FragColor = vec4(glowColor, rim * intensity);
}`;

// ─────────────────────────────────────────────────────────────────────────────
// BUILD THREE.JS OBJECTS
// ─────────────────────────────────────────────────────────────────────────────
function buildScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010610, 0.0012);

  // Lighting
  const sunLight = new THREE.DirectionalLight(0xfff8e8, 3.2);
  sunLight.position.copy(SUN_DIR).multiplyScalar(50);
  scene.add(sunLight);
  const ambLight = new THREE.AmbientLight(0x0a1428, 1.2);
  scene.add(ambLight);
  // Rim fill
  const rimLight = new THREE.DirectionalLight(0x1a3060, 0.8);
  rimLight.position.set(30, 5, 10);
  scene.add(rimLight);

  // Stars — two layers for depth
  function makeStars(count, spread) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = spread * 0.5 + spread * 0.5 * Math.random();
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
      const rnd = Math.random();
      if(rnd<0.09){col[i*3]=1.0;col[i*3+1]=0.72;col[i*3+2]=0.38;} // orange
      else if(rnd<0.18){col[i*3]=0.62;col[i*3+1]=0.75;col[i*3+2]=1.0;} // blue
      else if(rnd<0.25){col[i*3]=0.82;col[i*3+1]=0.48;col[i*3+2]=1.0;} // purple
      else if(rnd<0.30){col[i*3]=1.0;col[i*3+1]=0.90;col[i*3+2]=0.60;} // warm white
      else{col[i*3]=0.88;col[i*3+1]=0.90;col[i*3+2]=0.96;} // neutral
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 1.4, vertexColors: true, sizeAttenuation: false });
    return new THREE.Points(geo, mat);
  }
  const stars1 = makeStars(3500, 800);
  const stars2 = makeStars(1200, 400);
  scene.add(stars1); scene.add(stars2);

  // Earth
  const earthGeo  = new THREE.SphereGeometry(EARTH_R, 96, 96);
  const earthMat  = new THREE.MeshPhongMaterial({
    map:          makeEarthTex(),
    specularMap:  makeEarthSpecTex(),
    specular:     new THREE.Color(0x225588),
    shininess:    55,
    emissiveMap:  makeEarthLightsTex(),
    emissive:     new THREE.Color(0xffa030),
    emissiveIntensity: 0.55,
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  earth.position.copy(EARTH_POS);
  earth.rotation.y = -0.4;
  scene.add(earth);

  // Earth atmosphere shell
  const earthAtm = new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_R * 1.055, 64, 64),
    new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x3399ff) },
        intensity: { value: 1.65 },
        power:     { value: 3.8 },
      },
      vertexShader:   ATM_VS,
      fragmentShader: ATM_FS,
      transparent: true,
      blending:    THREE.AdditiveBlending,
      side:        THREE.FrontSide,
      depthWrite:  false,
    })
  );
  earth.add(earthAtm);

  // Clouds
  const cloudGeo = new THREE.SphereGeometry(EARTH_R * 1.010, 64, 64);
  function makeCloudTex() {
    const W=1024, H=512;
    const c=document.createElement('canvas'); c.width=W; c.height=H;
    const ctx=c.getContext('2d');
    ctx.fillStyle='rgba(0,0,0,0)'; ctx.clearRect(0,0,W,H);
    ctx.fillStyle='rgba(255,255,255,0.22)';
    for(let i=0;i<300;i++){
      const cx2=(Math.sin(i*3.1+1)*0.5+0.5)*W, cy2=(Math.cos(i*4.7+2)*0.5+0.5)*H;
      ctx.beginPath(); ctx.ellipse(cx2,cy2,W*0.042,H*0.020,i*0.9,0,Math.PI*2); ctx.fill();
    }
    return new THREE.CanvasTexture(c);
  }
  const cloudMat = new THREE.MeshPhongMaterial({
    map: makeCloudTex(), transparent: true, opacity: 0.60,
    depthWrite: false, blending: THREE.NormalBlending,
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);
  clouds.name = 'clouds';
  earth.add(clouds);

  // Mars
  const marsGeo = new THREE.SphereGeometry(MARS_R, 96, 96);
  const marsMat = new THREE.MeshPhongMaterial({
    map:       makeMarsTex(),
    specular:  new THREE.Color(0x111111),
    shininess: 8,
  });
  const mars = new THREE.Mesh(marsGeo, marsMat);
  mars.position.copy(MARS_POS);
  mars.rotation.y = 0.5;
  scene.add(mars);

  // Mars atmosphere
  const marsAtm = new THREE.Mesh(
    new THREE.SphereGeometry(MARS_R * 1.045, 64, 64),
    new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xcc5522) },
        intensity: { value: 1.20 },
        power:     { value: 4.5 },
      },
      vertexShader:   ATM_VS,
      fragmentShader: ATM_FS,
      transparent: true,
      blending:    THREE.AdditiveBlending,
      side:        THREE.FrontSide,
      depthWrite:  false,
    })
  );
  mars.add(marsAtm);

  // Spacecraft — interplanetary design with solar panels and gold MLI wrap
  function buildSpacecraft() {
    const g = new THREE.Group();
    const whiteMat = new THREE.MeshPhongMaterial({color:0xdce8f2,specular:0x99bbcc,shininess:110});
    const goldMat  = new THREE.MeshPhongMaterial({color:0xc8952a,specular:0xddbb44,shininess:75});
    const darkMat  = new THREE.MeshPhongMaterial({color:0x384858,specular:0x667788,shininess:65});
    const bellMat  = new THREE.MeshPhongMaterial({color:0x7a8a9a,specular:0xaabbcc,shininess:190});
    const panelMat = new THREE.MeshPhongMaterial({color:0x14265a,specular:0x3355aa,shininess:210,side:THREE.DoubleSide});
    const frameMat = new THREE.MeshPhongMaterial({color:0x6a7800,specular:0x99bb00,shininess:90});
    // Nose cone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.078,0.22,14),whiteMat);
    nose.rotation.z=Math.PI/2; nose.position.x=0.58; g.add(nose);
    // Command module
    const cmd = new THREE.Mesh(new THREE.CylinderGeometry(0.078,0.078,0.22,14),whiteMat);
    cmd.rotation.z=Math.PI/2; cmd.position.x=0.36; g.add(cmd);
    // Connector ring
    const conn = new THREE.Mesh(new THREE.CylinderGeometry(0.072,0.072,0.09,14),darkMat);
    conn.rotation.z=Math.PI/2; conn.position.x=0.21; g.add(conn);
    // Propellant tank — gold MLI insulation wrap
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.130,0.130,0.44,16),goldMat);
    tank.rotation.z=Math.PI/2; tank.position.x=-0.04; g.add(tank);
    // Collar ring at tank midpoint (solar panel mount)
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.138,0.138,0.046,16),darkMat);
    collar.rotation.z=Math.PI/2; collar.position.x=-0.04; g.add(collar);
    // Service/engine module
    const svc = new THREE.Mesh(new THREE.CylinderGeometry(0.098,0.118,0.28,14),darkMat);
    svc.rotation.z=Math.PI/2; svc.position.x=-0.40; g.add(svc);
    // Solar panels — two wings each side
    [-1,1].forEach(side => {
      // Inner panel
      const pA = new THREE.Mesh(new THREE.BoxGeometry(0.38,0.007,0.18),panelMat);
      pA.position.set(-0.04,0,side*0.28); g.add(pA);
      const fA = new THREE.Mesh(new THREE.BoxGeometry(0.40,0.012,0.20),frameMat);
      fA.position.set(-0.04,0,side*0.28); g.add(fA);
      // Outer panel (offset further)
      const pB = new THREE.Mesh(new THREE.BoxGeometry(0.34,0.007,0.17),panelMat);
      pB.position.set(-0.04,0,side*0.54); g.add(pB);
      const fB = new THREE.Mesh(new THREE.BoxGeometry(0.36,0.012,0.19),frameMat);
      fB.position.set(-0.04,0,side*0.54); g.add(fB);
      // Boom connecting inner to outer
      const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.006,0.006,0.18,6),darkMat);
      boom.position.set(-0.04,0,side*0.41); boom.rotation.x=Math.PI/2; g.add(boom);
      // Root arm (body to inner panel)
      const root = new THREE.Mesh(new THREE.CylinderGeometry(0.008,0.008,Math.abs(side*0.14),6),darkMat);
      root.position.set(-0.04,0,side*0.14); root.rotation.x=Math.PI/2; g.add(root);
    });
    // Dual engine bells
    [-0.055,0.055].forEach(oy => {
      const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.068,0.046,0.14,14),bellMat);
      bell.rotation.z=Math.PI/2; bell.position.set(-0.58,oy,0); g.add(bell);
    });
    // Engine plumes (outer + bright core)
    const plumeMat = new THREE.MeshBasicMaterial({color:0xff8020,transparent:true,opacity:0.88});
    const innerMat = new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.72});
    [-0.055,0.055].forEach(oy => {
      const pl = new THREE.Mesh(new THREE.ConeGeometry(0.054,0.48,8),plumeMat);
      pl.position.set(-0.84,oy,0); pl.rotation.z=Math.PI/2; pl.name='plume'; g.add(pl);
      const ip = new THREE.Mesh(new THREE.ConeGeometry(0.023,0.23,8),innerMat);
      ip.position.set(-0.75,oy,0); ip.rotation.z=Math.PI/2; ip.name='plume'; g.add(ip);
    });
    // Engine glow lights
    const el1=new THREE.PointLight(0xff6010,7.0,5.0); el1.position.set(-0.84,-0.055,0); g.add(el1);
    const el2=new THREE.PointLight(0xff6010,7.0,5.0); el2.position.set(-0.84, 0.055,0); g.add(el2);
    return g;
  }
  const spacecraft = buildSpacecraft();
  spacecraft.name = 'spacecraft';
  scene.add(spacecraft);

  return { scene, earth, mars, spacecraft, stars1, stars2 };
}

// Trajectory in 3D: bezier curve from Earth to Mars
function trajectoryPos(prog) {
  const ex=EARTH_POS.x, ey=EARTH_POS.y;
  const mx=MARS_POS.x,  my=MARS_POS.y;
  const cpx=(ex+mx)*0.5, cpy=Math.min(ey,my)+6;
  const [x,y]=bezQ(prog,ex,ey,cpx,cpy,mx,my);
  // Z arc
  const ez=EARTH_POS.z, mz=MARS_POS.z;
  const z=lerp(ez,mz,prog) + Math.sin(prog*Math.PI)*1.5;
  return new THREE.Vector3(x,y,z);
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAJECTORY LINE (drawn as THREE.Line)
// ─────────────────────────────────────────────────────────────────────────────
function buildTrajectoryLine(scene) {
  const pts=[];
  for(let i=0;i<=80;i++) pts.push(trajectoryPos(i/80));
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  const mat=new THREE.LineDashedMaterial({color:0x00ccff, linewidth:1, dashSize:0.4, gapSize:0.25, transparent:true, opacity:0.55});
  const line=new THREE.Line(geo, mat);
  line.computeLineDistances();
  scene.add(line);
  return line;
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 2D OVERLAYS (cockpit, gauges, film grain)
// ─────────────────────────────────────────────────────────────────────────────
function drawFilmGrain(ctx, W, H) {
  ctx.fillStyle='rgba(255,255,255,0.040)';
  for(let i=0;i<1400;i++) ctx.fillRect(Math.random()*W|0, Math.random()*H|0, 1, 1);
  ctx.fillStyle='rgba(0,0,0,0.025)';
  for(let i=0;i<700;i++) ctx.fillRect(Math.random()*W|0, Math.random()*H|0, 1, 1);
}

function drawGauge(ctx, cx, cy, r, pct, label, valStr, color) {
  const sa=-Math.PI*0.78, sweep=Math.PI*1.56;
  ctx.beginPath(); ctx.arc(cx,cy,r,sa,sa+sweep);
  ctx.strokeStyle='rgba(255,255,255,0.07)'; ctx.lineWidth=r*0.20; ctx.lineCap='butt'; ctx.stroke();
  if(pct>0.005){
    ctx.beginPath(); ctx.arc(cx,cy,r,sa,sa+pct*sweep);
    ctx.strokeStyle=color; ctx.lineWidth=r*0.20; ctx.lineCap='round';
    ctx.shadowBlur=8; ctx.shadowColor=color; ctx.stroke(); ctx.shadowBlur=0;
  }
  ctx.fillStyle='rgba(210,235,255,0.92)'; ctx.font=`bold ${Math.round(r*0.38)}px monospace`;
  ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(valStr,cx,cy);
  ctx.fillStyle='rgba(100,150,190,0.60)'; ctx.font=`${Math.round(r*0.28)}px monospace`;
  ctx.textBaseline='alphabetic'; ctx.fillText(label,cx,cy+r*1.22);
}

function drawGaugeCluster(ctx, W, H, velocity, prog) {
  const bh=H*0.175, by=H-bh, gr=Math.min(bh*0.30, W*0.030);
  const gy=by+bh*0.44;
  const xs=[W*0.345, W*0.425, W*0.505, W*0.585, W*0.665];
  const velPct=clamp(velocity/37300,0,1);
  const fuelPct=clamp(0.84-prog*0.09,0,1);
  const thrPct=clamp(0.76-prog*0.05,0,1);
  drawGauge(ctx,xs[0],gy,gr,velPct,'VEL',`${(velocity/1000).toFixed(1)}k`,'#00e8a4');
  drawGauge(ctx,xs[1],gy,gr*0.88,fuelPct,'FUEL',`${Math.round(fuelPct*100)}%`,'#00d4ff');
  drawGauge(ctx,xs[2],gy,gr*1.12,thrPct,'THR',`${Math.round(thrPct*100)}%`,'#f59e0b');
  drawGauge(ctx,xs[3],gy,gr*0.88,0.94,'O2','94%','#22c55e');
  drawGauge(ctx,xs[4],gy,gr*0.88,0.55+prog*0.10,'TMP',`${21+Math.round(prog*4)}°C`,'#a78bfa');
  const fc='rgba(0,180,255,0.14)', bc='rgba(0,200,255,0.70)', bw=W*0.054, tbh=bh*0.23;
  [['NAV',W*0.226],['HUD',W*0.226],['SYS',W*0.226]].forEach(([l,x],i) => {
    const ty=by+bh*(0.14+i*0.29);
    ctx.fillStyle=fc; ctx.fillRect(x,ty,bw,tbh);
    ctx.strokeStyle='rgba(0,180,255,0.32)'; ctx.lineWidth=0.8; ctx.strokeRect(x,ty,bw,tbh);
    ctx.fillStyle=bc; ctx.font=`${Math.round(bw*0.22)}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(l,x+bw/2,ty+tbh/2);
  });
  [['COM',W-W*0.226-bw],['AUX',W-W*0.226-bw],['PWR',W-W*0.226-bw]].forEach(([l,x],i) => {
    const ty=by+bh*(0.14+i*0.29);
    ctx.fillStyle=fc; ctx.fillRect(x,ty,bw,tbh);
    ctx.strokeStyle='rgba(0,180,255,0.32)'; ctx.lineWidth=0.8; ctx.strokeRect(x,ty,bw,tbh);
    ctx.fillStyle=bc; ctx.font=`${Math.round(bw*0.22)}px monospace`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(l,x+bw/2,ty+tbh/2);
  });
}


function drawPOVNebula(ctx, W, H, t) {
  const clouds=[
    {cx:0.10,cy:0.20,r:0.35,ic:'rgba(95,15,210,0.20)',oc:'rgba(55,5,135,0)',ph:0.0},
    {cx:0.88,cy:0.54,r:0.32,ic:'rgba(218,68,18,0.18)',oc:'rgba(148,30,6,0)',ph:1.9},
    {cx:0.48,cy:0.06,r:0.30,ic:'rgba(72,10,192,0.16)',oc:'rgba(40,2,122,0)',ph:3.3},
    {cx:0.93,cy:0.27,r:0.26,ic:'rgba(225,85,22,0.15)',oc:'rgba(160,42,8,0)',ph:4.8},
    {cx:0.05,cy:0.80,r:0.28,ic:'rgba(140,28,232,0.17)',oc:'rgba(80,8,165,0)',ph:2.2},
    {cx:0.66,cy:0.92,r:0.24,ic:'rgba(200,95,30,0.14)',oc:'rgba(130,50,12,0)',ph:5.5},
    {cx:0.28,cy:0.94,r:0.22,ic:'rgba(118,20,218,0.15)',oc:'rgba(68,6,150,0)',ph:1.3},
    {cx:0.80,cy:0.03,r:0.28,ic:'rgba(192,78,28,0.15)',oc:'rgba(120,38,10,0)',ph:3.9},
    {cx:0.50,cy:0.50,r:0.18,ic:'rgba(80,18,180,0.08)',oc:'rgba(40,5,110,0)',ph:6.1},
  ];
  ctx.save();
  ctx.globalCompositeOperation='screen';
  clouds.forEach(({cx,cy,r,ic,oc,ph})=>{
    const pulse=0.88+0.12*Math.sin(t*0.22+ph);
    const x=cx*W,y=cy*H,rad=r*W*pulse;
    const g=ctx.createRadialGradient(x,y,rad*0.04,x,y,rad);
    g.addColorStop(0,ic); g.addColorStop(1,oc);
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  });
  ctx.restore();
}

function drawCockpitFrame(ctx, W, H, alpha, t) {
  if(alpha<0.01) return;
  ctx.save(); ctx.globalAlpha=alpha;
  const fc='rgba(5,9,20,0.97)';
  const wl=W*0.220, wr=W-W*0.220, wt=H*0.068, wb=H-H*0.175, cr=16;
  ctx.beginPath(); ctx.rect(0,0,W,H);
  ctx.moveTo(wl+cr,wt); ctx.lineTo(wr-cr,wt); ctx.quadraticCurveTo(wr,wt,wr,wt+cr);
  ctx.lineTo(wr,wb-cr); ctx.quadraticCurveTo(wr,wb,wr-cr,wb);
  ctx.lineTo(wl+cr,wb); ctx.quadraticCurveTo(wl,wb,wl,wb-cr);
  ctx.lineTo(wl,wt+cr); ctx.quadraticCurveTo(wl,wt,wl+cr,wt); ctx.closePath();
  ctx.fillStyle=fc; ctx.fill('evenodd');
  ctx.strokeStyle='rgba(0,190,255,0.40)'; ctx.lineWidth=1.6;
  ctx.shadowBlur=14; ctx.shadowColor='rgba(0,190,255,0.40)';
  ctx.beginPath();
  ctx.moveTo(wl+cr,wt); ctx.lineTo(wr-cr,wt); ctx.quadraticCurveTo(wr,wt,wr,wt+cr);
  ctx.lineTo(wr,wb-cr); ctx.quadraticCurveTo(wr,wb,wr-cr,wb);
  ctx.lineTo(wl+cr,wb); ctx.quadraticCurveTo(wl,wb,wl,wb-cr);
  ctx.lineTo(wl,wt+cr); ctx.quadraticCurveTo(wl,wt,wl+cr,wt); ctx.closePath();
  ctx.stroke(); ctx.shadowBlur=0;
  // Left viewport border
  const evx=wl*0.08, evy=H*0.12, evw=wl*0.84, evh=H*0.54, evcr=10;
  ctx.strokeStyle='rgba(0,160,255,0.35)'; ctx.lineWidth=1; ctx.shadowBlur=6; ctx.shadowColor='rgba(0,160,255,0.28)';
  ctx.beginPath();
  ctx.moveTo(evx+evcr,evy); ctx.lineTo(evx+evw-evcr,evy); ctx.quadraticCurveTo(evx+evw,evy,evx+evw,evy+evcr);
  ctx.lineTo(evx+evw,evy+evh-evcr); ctx.quadraticCurveTo(evx+evw,evy+evh,evx+evw-evcr,evy+evh);
  ctx.lineTo(evx+evcr,evy+evh); ctx.quadraticCurveTo(evx,evy+evh,evx,evy+evh-evcr);
  ctx.lineTo(evx,evy+evcr); ctx.quadraticCurveTo(evx,evy,evx+evcr,evy); ctx.closePath();
  ctx.stroke(); ctx.shadowBlur=0;
  ctx.fillStyle='rgba(0,190,255,0.42)'; ctx.font="8px 'Courier New',monospace"; ctx.textAlign='left'; ctx.textBaseline='alphabetic';
  ctx.fillText('EARTH',evx+7,evy+evh-8);
  [{x:evx+evw*0.20,c:'#22c55e',l:'PWR'},{x:evx+evw*0.50,c:'#22c55e',l:'NAV'},{x:evx+evw*0.80,c:'#f59e0b',l:'THR'}]
  .forEach(({x,c,l}) => {
    const iy=evy-18;
    ctx.fillStyle=c; ctx.shadowBlur=6; ctx.shadowColor=c;
    ctx.beginPath(); ctx.arc(x,iy,3.5,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
    ctx.fillStyle='rgba(180,210,240,0.55)'; ctx.font='7px monospace'; ctx.textAlign='center';
    ctx.fillText(l,x,iy+11);
  });
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function MarsLaunchScene({ onPlayAgain }) {
  const canvasRef    = useRef(null);
  const overlayRef   = useRef(null); // 2D canvas for HUD overlays
  const rendererRef  = useRef(null);
  const sceneRef     = useRef(null);
  const cameraRef    = useRef(null);
  const objectsRef   = useRef(null);
  const trajLineRef  = useRef(null);
  const initDone     = useRef(false);
  const sizeRef      = useRef({W:1,H:1});

  const tRef         = useRef(0);
  const ptRef        = useRef(0);
  const phaseTrans   = useRef(false);
  const phaseRef     = useRef('emerge');
  const camRef       = useRef(CAM_WIDE);
  const tsRef        = useRef(1);
  const hudARef      = useRef(1);
  const progRef      = useRef(0);
  const missionT0    = useRef(null);
  const lastUI       = useRef(0);
  const autoTimer    = useRef(0);
  const autoCamIdx   = useRef(1);
  const shownEvents  = useRef(new Set());
  const activeEvRef  = useRef(null);
  const evTimer      = useRef(0);
  const modeShown    = useRef(false);
  const camPosRef    = useRef(new THREE.Vector3(0,0,10));
  const camTgtRef    = useRef(new THREE.Vector3(0,0,0));

  const [phase,          setPhase]          = useState('emerge');
  const [camMode,        setCamMode]        = useState(CAM_WIDE);
  const [timeScale,      setTimeScale]      = useState(1);
  const [hudOpacity,     setHudOpacity]     = useState(1);
  const [showDirector,   setShowDirector]   = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [missionSecs,    setMissionSecs]    = useState(0);
  const [distToMars,     setDistToMars]     = useState(EARTH_MARS_KM);
  const [velocity,       setVelocity]       = useState(32500);
  const [activeEvent,    setActiveEvent]    = useState(null);

  useEffect(() => { phaseRef.current=phase; ptRef.current=0; phaseTrans.current=false; modeShown.current=false; }, [phase]);
  useEffect(() => { camRef.current=camMode; }, [camMode]);
  useEffect(() => { tsRef.current=timeScale; }, [timeScale]);
  useEffect(() => { hudARef.current=hudOpacity; }, [hudOpacity]);
  useEffect(() => { const stop=startSpaceAmbient(); return stop; }, []);

  // Three.js init
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    const {W,H} = (() => { const r=canvas.parentElement?.getBoundingClientRect()||{width:800,height:600}; return {W:r.width|0,H:r.height|0}; })();
    sizeRef.current={W,H};

    const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(W,H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(52, W/H, 0.05, 5000);
    camera.position.set(-6, 2, 8);
    camera.lookAt(EARTH_POS);
    cameraRef.current = camera;
    camPosRef.current.copy(camera.position);
    camTgtRef.current.copy(EARTH_POS);

    const {scene, earth, mars, spacecraft, stars1, stars2} = buildScene();
    sceneRef.current = scene;
    objectsRef.current = {earth, mars, spacecraft, stars1, stars2};
    const trajLine = buildTrajectoryLine(scene);
    trajLineRef.current = trajLine;
    trajLine.visible = false;

    initDone.current = true;

    function onResize() {
      const parent = canvas.parentElement; if(!parent) return;
      const W2=parent.clientWidth|0, H2=parent.clientHeight|0;
      sizeRef.current={W:W2,H:H2};
      renderer.setSize(W2,H2);
      camera.aspect=W2/H2; camera.updateProjectionMatrix();
      if(overlayRef.current){ overlayRef.current.width=W2; overlayRef.current.height=H2; }
    }
    window.addEventListener('resize', onResize); onResize();

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  const handleCam = useCallback((m) => { setCamMode(m); camRef.current=m; setShowDirector(false); }, []);
  const handleBeginTransit = useCallback(() => {
    missionT0.current=tRef.current; setShowModeSelect(false); setShowDirector(true); setPhase('transit');
    if(trajLineRef.current) trajLineRef.current.visible=true;
  }, []);

  const tick = useCallback((rawDelta) => {
    if(!initDone.current||!rendererRef.current||!sceneRef.current||!cameraRef.current) return;
    const renderer=rendererRef.current, scene=sceneRef.current, camera=cameraRef.current;
    const {W,H}=sizeRef.current;
    const curPhase=phaseRef.current;
    const ts=tsRef.current;
    const sd=curPhase==='transit'?rawDelta*ts:rawDelta;
    tRef.current+=rawDelta; ptRef.current+=sd;
    const t=tRef.current, pt=ptRef.current;
    const {earth, mars, spacecraft, stars1, stars2}=objectsRef.current;

    // Rotate planets
    earth.rotation.y += rawDelta * 0.018;
    mars.rotation.y  += rawDelta * 0.012;
    const clouds = earth.getObjectByName('clouds');
    if(clouds) clouds.rotation.y += rawDelta * 0.022;

    // Animate plume
    spacecraft.traverse(obj => {
      if(obj.name==='plume') {
        obj.material.opacity = 0.70 + 0.18*Math.sin(t*14);
        obj.scale.set(1, 0.85+0.15*Math.sin(t*18), 1);
      }
    });

    // AUTO camera cycling
    if(camRef.current===CAM_AUTO){
      autoTimer.current+=rawDelta;
      if(autoTimer.current>20){ autoTimer.current=0; autoCamIdx.current=(autoCamIdx.current%(ALL_CAMS.length-1))+1; }
    }
    const effectiveCam=camRef.current===CAM_AUTO ? ALL_CAMS[autoCamIdx.current] : camRef.current;

    // Smooth camera
    const lf=Math.min(rawDelta*3.5,1);

    // ── EMERGE ──────────────────────────────────────────────────────────────
    if(curPhase==='emerge'){
      const prog=clamp(pt/EMERGE_DUR,0,1);
      spacecraft.visible=false; trajLineRef.current.visible=false; mars.visible=false;
      const tgtPos=new THREE.Vector3(-4+prog*2, 1.5-prog*1.5, 5+prog*1);
      const tgtLook=EARTH_POS.clone().add(new THREE.Vector3(0,0.5,0));
      camPosRef.current.lerp(tgtPos,lf); camTgtRef.current.lerp(tgtLook,lf);
      if(pt>=EMERGE_DUR&&!phaseTrans.current){ phaseTrans.current=true; mars.visible=true; setPhase('orbit'); }
    }

    // ── ORBIT ───────────────────────────────────────────────────────────────
    else if(curPhase==='orbit'){
      const prog=clamp(pt/ORBIT_DUR,0,1);
      mars.visible=true; spacecraft.visible=true; trajLineRef.current.visible=false;
      const orbitAng=-0.18+t*0.25, orbitR=EARTH_R*1.8;
      const sx=EARTH_POS.x+Math.cos(orbitAng)*orbitR;
      const sz=EARTH_POS.z+Math.sin(orbitAng)*orbitR;
      spacecraft.position.set(sx, EARTH_POS.y, sz);
      spacecraft.lookAt(EARTH_POS);
      spacecraft.rotateY(Math.PI/2);
      const tgtPos=new THREE.Vector3(-6, 2.5, 9);
      const tgtLook=new THREE.Vector3(EARTH_POS.x, 0, 0);
      camPosRef.current.lerp(tgtPos,lf); camTgtRef.current.lerp(tgtLook,lf);
      if(pt>=2.5&&!modeShown.current){ modeShown.current=true; setShowModeSelect(true); }
    }

    // ── TRANSIT ─────────────────────────────────────────────────────────────
    else if(curPhase==='transit'){
      const prog=clamp(pt/TRANSIT_DUR,0,1);
      progRef.current=prog;
      spacecraft.visible=true; trajLineRef.current.visible=true;

      const shipPos=trajectoryPos(prog);
      spacecraft.position.copy(shipPos);

      // Orient spacecraft along trajectory
      if(prog<0.998){
        const ahead=trajectoryPos(Math.min(1,prog+0.02));
        spacecraft.lookAt(ahead);
        spacecraft.rotateY(-Math.PI/2);
      }

      // Camera per mode
      if(effectiveCam===CAM_POV){
        spacecraft.visible=false;
        const ahead=trajectoryPos(Math.min(1,prog+0.10));
        camPosRef.current.lerp(shipPos,Math.min(rawDelta*10,1));
        camTgtRef.current.lerp(ahead,lf*1.4);
        camera.fov=40; camera.updateProjectionMatrix();
      }else if(effectiveCam===CAM_CHASE){
        const behind=trajectoryPos(Math.max(0,prog-0.04));
        const tgtPos=new THREE.Vector3(behind.x,behind.y+1.5,behind.z+4.5);
        camPosRef.current.lerp(tgtPos,lf); camTgtRef.current.lerp(shipPos,lf);
        camera.fov=56; camera.updateProjectionMatrix();
      }else if(effectiveCam===CAM_FLYBY){
        const orb=new THREE.Vector3(
          shipPos.x+Math.cos(t*0.22)*8,
          shipPos.y+Math.sin(t*0.14)*3,
          shipPos.z+Math.sin(t*0.22)*8
        );
        camPosRef.current.lerp(orb,lf*0.6); camTgtRef.current.lerp(shipPos,lf);
        camera.fov=65; camera.updateProjectionMatrix();
      }else if(effectiveCam===CAM_ORBITAL){
        const mid=EARTH_POS.clone().lerp(MARS_POS,prog);
        const tgtPos=new THREE.Vector3(mid.x, 28, 12);
        camPosRef.current.lerp(tgtPos,lf*0.5); camTgtRef.current.lerp(mid,lf*0.5);
        camera.fov=55; camera.updateProjectionMatrix();
      }else{ // WIDE
        // Cinematic pull from near Earth to near Mars
        const ex2=EARTH_POS.x, mx2=MARS_POS.x;
        const cx2=lerp(ex2+1, mx2-3, prog), cy2=lerp(3, 2, prog), cz2=lerp(9, 8, prog);
        const tgtPos=new THREE.Vector3(cx2, cy2, cz2);
        const look=new THREE.Vector3(lerp(ex2, mx2, prog), 0, 0);
        camPosRef.current.lerp(tgtPos,lf*0.4); camTgtRef.current.lerp(look,lf*0.4);
        camera.fov=52; camera.updateProjectionMatrix();
      }

      // Cinematic events
      CINEMATIC_EVENTS.forEach(ev=>{
        if(prog>=ev.prog&&!shownEvents.current.has(ev.id)){
          shownEvents.current.add(ev.id); activeEvRef.current=ev; evTimer.current=ev.duration; setActiveEvent(ev);
        }
      });
      if(activeEvRef.current&&evTimer.current>0){
        evTimer.current-=rawDelta;
        if(evTimer.current<=0){ activeEvRef.current=null; setActiveEvent(null); }
      }

      if(t-lastUI.current>0.18){
        lastUI.current=t;
        setMissionSecs(missionT0.current!==null?t-missionT0.current:0);
        setDistToMars(EARTH_MARS_KM*(1-prog));
        setVelocity(Math.round(32500+prog*4800));
      }
      if(pt>=TRANSIT_DUR&&!phaseTrans.current){ phaseTrans.current=true; setPhase('approach'); }
    }

    // ── APPROACH ────────────────────────────────────────────────────────────
    else if(curPhase==='approach'){
      const prog=clamp(pt/APPROACH_DUR,0,1);
      spacecraft.visible=false; trajLineRef.current.visible=false;
      const tgtPos=new THREE.Vector3(MARS_POS.x-2+prog*2, 2-prog*1.5, 7-prog*3);
      const tgtLook=MARS_POS.clone();
      camPosRef.current.lerp(tgtPos,lf*0.5); camTgtRef.current.lerp(tgtLook,lf*0.5);
      camera.fov=lerp(52,38,prog); camera.updateProjectionMatrix();
      if(t-lastUI.current>0.22){
        lastUI.current=t;
        setMissionSecs(missionT0.current!==null?t-missionT0.current:0);
        setDistToMars(Math.max(0,EARTH_MARS_KM*(1-clamp(1+prog*0.01,0,1))));
        setVelocity(Math.round(lerp(37300,3200,prog)));
      }
      if(pt>=APPROACH_DUR&&!phaseTrans.current){ phaseTrans.current=true; setTimeout(()=>setPhase('arrival'),400); }
    }

    // ── ARRIVAL ─────────────────────────────────────────────────────────────
    else if(curPhase==='arrival'){
      spacecraft.visible=false; trajLineRef.current.visible=false;
      const tgtPos=new THREE.Vector3(MARS_POS.x, 0.5, 5);
      camPosRef.current.lerp(tgtPos,lf*0.3); camTgtRef.current.lerp(MARS_POS,lf*0.3);
    }

    // Apply camera
    camera.position.copy(camPosRef.current);
    camera.lookAt(camTgtRef.current);

    // Stars slow rotation
    stars1.rotation.y += rawDelta * 0.001;
    stars2.rotation.y -= rawDelta * 0.0006;

    // Render Three.js scene
    renderer.render(scene, camera);

    // 2D overlay canvas (film grain + cockpit frame + gauges)
    const oc=overlayRef.current; if(!oc) return;
    const octx=oc.getContext('2d');
    octx.clearRect(0,0,W,H);

    if(curPhase==='transit'||curPhase==='approach'){
      if(effectiveCam===CAM_POV){
        drawPOVNebula(octx,W,H,t);
        const cptA=clamp(progRef.current*4,0,1);
        if(cptA>0.05){
          drawCockpitFrame(octx,W,H,cptA,t);
          drawGaugeCluster(octx,W,H,Math.round(32500+progRef.current*4800),progRef.current);
        }
      }
      drawFilmGrain(octx,W,H);
    }else if(curPhase==='emerge'||curPhase==='orbit'){
      drawFilmGrain(octx,W,H);
    }

  }, []); // eslint-disable-line

  useGameLoop(tick);

  const inTransit = phase==='transit'||phase==='approach';

  return (
    <div className="mars-scene">
      <canvas ref={canvasRef} className="mars-canvas" />
      {/* 2D overlay for cockpit/grain — transparent, pointer-events none */}
      <canvas
        ref={overlayRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }}
      />

      {/* Telemetry HUD */}
      {inTransit && (
        <div className="mars-telemetry" style={{opacity:hudOpacity}}>
          <div className="mtel-label">MISSION TELEMETRY</div>
          <div className="mtel-row"><span>MISSION TIME</span><span>{fmtTime(missionSecs)}</span></div>
          <div className="mtel-row"><span>DIST TO MARS</span><span>{fmtKm(distToMars)}</span></div>
          <div className="mtel-row"><span>VELOCITY</span><span>{velocity.toLocaleString()} m/s</span></div>
          <div className="mtel-row"><span>LIFE SUPPORT</span><span className="mtel-ok">NOMINAL</span></div>
          <div className="mtel-row"><span>PROPULSION</span><span className="mtel-ok">NOMINAL</span></div>
          <div className="mtel-row"><span>COMMS DELAY</span><span>
            {phase==='transit'?`${(4+Math.abs(Math.sin((distToMars/EARTH_MARS_KM-0.5)*Math.PI))*8.5).toFixed(1)} min`:'0.3 min'}
          </span></div>
        </div>
      )}

      {inTransit && (
        <div className="mars-mc-bar" style={{opacity:hudOpacity}}>
          {['PWR','FUEL','NAV','COMMS','DIAG','ENG'].map(s=>(<span key={s} className="mc-item mc-ok">{s}</span>))}
        </div>
      )}

      {/* Director Mode Panel */}
      {showDirector && phase==='transit' && (
        <div className="mars-director">
          <div className="mdir-title">DIRECTOR MODE</div>
          <div className="mdir-section">CAMERA</div>
          <div className="mdir-row">
            {ALL_CAMS.map(m=>(
              <button key={m} className={`mdir-btn${camMode===m?' mdir-btn--on':''}`} onClick={()=>handleCam(m)}>
                {m==='AUTO'?'⟳ AUTO':m==='WIDE'?'⊞ WIDE':m==='CHASE'?'⊿ CHASE':m==='POV'?'⊙ POV':m==='FLYBY'?'⤢ FLYBY':'◎ ORBITAL'}
              </button>
            ))}
          </div>
          <div className="mdir-section">TIME SCALE</div>
          <div className="mdir-row">
            {TIME_SCALES.map(ts=>(
              <button key={ts} className={`mdir-btn${timeScale===ts?' mdir-btn--on':''}`} onClick={()=>setTimeScale(ts)}>{ts}×</button>
            ))}
          </div>
          <div className="mdir-section">HUD OPACITY</div>
          <div className="mdir-row">
            {[0,0.5,0.75,1].map(v=>(
              <button key={v} className={`mdir-btn${hudOpacity===v?' mdir-btn--on':''}`} onClick={()=>setHudOpacity(v)}>
                {v===0?'OFF':Math.round(v*100)+'%'}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase==='transit' && (
        <button className="mdir-toggle" onClick={()=>setShowDirector(d=>!d)}>
          {showDirector?'✕':'⊞ DIRECTOR'}
        </button>
      )}

      {activeEvent && (
        <div className="mars-event" style={{borderColor:activeEvent.color}}>
          <div className="mevent-label" style={{color:activeEvent.color}}>{activeEvent.label}</div>
          <div className="mevent-sub">{activeEvent.sub}</div>
        </div>
      )}

      {showModeSelect && (
        <div className="mars-mode-overlay">
          <div className="mmo-card">
            <div className="mmo-pre">LOW EARTH ORBIT · STAND BY</div>
            <div className="mmo-title">BEGIN EARTH–MARS TRANSIT</div>
            <div className="mmo-sub">All systems nominal. Vehicle ready for trans-Mars injection burn.<br/>Use Director Mode during transit to switch cameras and time scale.</div>
            <div className="mmo-options">
              <button className="mmo-btn mmo-btn-featured" onClick={handleBeginTransit}>
                <span className="mmo-btn-title">INITIATE TRANSIT</span>
                <span className="mmo-btn-desc">Cinematic · Director Mode · Switch cameras live</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {phase==='arrival' && (
        <div className="mars-arrival">
          <div className="arr-pre">MARS ORBIT INSERTION · CONFIRMED</div>
          <div className="arr-title">SIMULATION CONCLUDED</div>
          <div className="arr-data">
            <div className="arr-row"><span>MISSION TIME</span><span>{fmtTime(missionSecs)}</span></div>
            <div className="arr-row"><span>PHASES COMPLETE</span><span>3 / 3</span></div>
            <div className="arr-row"><span>ROCKET BUILDER</span><span className="arr-ok">CONFIRMED</span></div>
            <div className="arr-row"><span>DEBUG ARENA</span><span className="arr-ok">CONFIRMED</span></div>
            <div className="arr-row"><span>VISUAL LAB</span><span className="arr-ok">CONFIRMED</span></div>
          </div>
          <p className="arr-sub">All six systems repaired. All faults resolved. Mars orbital insertion nominal.</p>
          {onPlayAgain&&<button className="arr-play-again-btn" onClick={onPlayAgain}>PLAY AGAIN</button>}
        </div>
      )}
    </div>
  );
}
