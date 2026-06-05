import React, { useEffect, useRef, useState, useCallback } from 'react';
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

// ─────────────────────────────────────────────────────────────────────────────
// MATH
// ─────────────────────────────────────────────────────────────────────────────
function lerp(a, b, t)    { return a + (b-a) * Math.max(0, Math.min(1, t)); }
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

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────
function initStarLayer(count, W, H, layer) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * W * 1.6 - W*0.3,
    y: Math.random() * H * 1.6 - H*0.3,
    r: layer===0 ? 0.15+Math.random()*0.45 : layer===1 ? 0.4+Math.random()*0.9 : 0.8+Math.random()*1.6,
    base: layer===0 ? 0.15+Math.random()*0.55 : layer===1 ? 0.3+Math.random()*0.6 : 0.5+Math.random()*0.5,
    phase: Math.random()*Math.PI*2,
    speed: 0.3+Math.random()*(layer+1)*0.4,
    col: Math.random()<0.08 ? [255,185,120] : Math.random()<0.06 ? [180,218,255] : [220,235,255],
  }));
}

function initDust(count, W, H) {
  return Array.from({ length: count }, () => ({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-0.5)*5, vy: (Math.random()-0.5)*2.5,
    r: 0.5+Math.random()*1.4,
    a: 0.02+Math.random()*0.06,
    ph: Math.random()*Math.PI*2,
  }));
}

function initPovStars(count, W, H) {
  return Array.from({ length: count }, () => ({
    x: (Math.random()-0.5)*W*2, y: (Math.random()-0.5)*H*2,
    z: Math.random()*W, pz: 0,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// SPACE BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
function drawSpaceBg(ctx, W, H) {
  const bg = ctx.createLinearGradient(0,0,W*0.4,H);
  bg.addColorStop(0,'#020918'); bg.addColorStop(0.45,'#010610'); bg.addColorStop(1,'#040218');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  const mw = ctx.createLinearGradient(0,H*0.7,W*0.7,H*0.05);
  mw.addColorStop(0,'rgba(0,0,0,0)'); mw.addColorStop(0.3,'rgba(40,28,85,0.12)');
  mw.addColorStop(0.5,'rgba(55,40,120,0.22)'); mw.addColorStop(0.7,'rgba(40,28,85,0.12)'); mw.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=mw; ctx.fillRect(0,0,W,H);
}

function drawNebula(ctx, W, H, t) {
  const b=0.5+0.5*Math.sin(t*0.16);
  [
    {x:W*0.06,y:H*0.14,rx:W*0.27,ry:H*0.32,r:85,g:18,b2:145,a:0.18},
    {x:W*0.82,y:H*0.11,rx:W*0.22,ry:H*0.28,r:10,g:50,b2:165,a:0.15},
    {x:W*0.50,y:H*0.79,rx:W*0.30,ry:H*0.22,r:18,g:12,b2:100,a:0.13},
    {x:W*0.22,y:H*0.55,rx:W*0.18,ry:H*0.20,r:0, g:60,b2:120,a:0.11},
    {x:W*0.90,y:H*0.70,rx:W*0.20,ry:H*0.18,r:95,g:18,b2:120,a:0.14},
    {x:W*0.42,y:H*0.33,rx:W*0.24,ry:H*0.16,r:12,g:48,b2:80, a:0.09},
  ].forEach(({x,y,rx,ry,r,g,b2,a}) => {
    const fa=a*(0.82+0.18*b);
    const gr=ctx.createRadialGradient(x,y,0,x,y,Math.max(rx,ry));
    gr.addColorStop(0,`rgba(${r},${g},${b2},${fa.toFixed(3)})`);
    gr.addColorStop(0.5,`rgba(${r},${g},${b2},${(fa*0.35).toFixed(3)})`);
    gr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gr; ctx.beginPath(); ctx.ellipse(x,y,rx,ry,0.3,0,Math.PI*2); ctx.fill();
  });
}

function drawGalaxies(ctx, W, H) {
  [{x:W*0.14,y:H*0.08,r:14,ang:0.4},{x:W*0.72,y:H*0.92,r:10,ang:1.1},{x:W*0.88,y:H*0.33,r:8,ang:0.7},{x:W*0.35,y:H*0.85,r:12,ang:1.8}]
  .forEach(({x,y,r,ang}) => {
    ctx.save(); ctx.translate(x,y); ctx.rotate(ang);
    const g=ctx.createRadialGradient(0,0,0,0,0,r);
    g.addColorStop(0,'rgba(200,190,255,0.22)'); g.addColorStop(0.4,'rgba(160,140,220,0.08)'); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(0,0,r,r*0.28,0,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
}

function drawStarLayer(ctx, stars, t, alpha, px, py) {
  if (alpha<0.01) return;
  stars.forEach(s => {
    const tw=0.6+0.4*Math.sin(s.phase+t*s.speed);
    const a=clamp(alpha*s.base*tw,0,1); if (a<0.01) return;
    const sx=s.x+px, sy=s.y+py;
    ctx.beginPath(); ctx.arc(sx,sy,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(${s.col[0]},${s.col[1]},${s.col[2]},${a.toFixed(3)})`; ctx.fill();
    if (s.r>1.4 && a>0.55) {
      ctx.strokeStyle=`rgba(${s.col[0]},${s.col[1]},${s.col[2]},${(a*0.22).toFixed(3)})`; ctx.lineWidth=0.5;
      ctx.beginPath(); ctx.moveTo(sx-s.r*2.8,sy); ctx.lineTo(sx+s.r*2.8,sy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx,sy-s.r*2.8); ctx.lineTo(sx,sy+s.r*2.8); ctx.stroke();
    }
  });
}

function drawLightStreaks(ctx, W, H, t, alpha) {
  if (alpha<0.01) return;
  for (let i=0;i<8;i++) {
    const sd=i*7.31, per=14+(sd%5)*4, fr=(t%per)/per;
    if (fr>0.3) continue;
    const ta=Math.sin(fr/0.3*Math.PI)*alpha*0.55;
    const len=60+(sd%3)*85;
    ctx.strokeStyle=`rgba(200,220,255,${ta.toFixed(3)})`; ctx.lineWidth=0.5+(sd%3)*0.28;
    ctx.beginPath(); ctx.moveTo((sd*23.7)%W,(sd*17.3)%H); ctx.lineTo(((sd*23.7)%W)+len,((sd*17.3)%H)+len*0.08); ctx.stroke();
  }
}

function drawDust(ctx, dust, t, delta, W, H) {
  dust.forEach(p => {
    p.x=(p.x+p.vx*delta+W+20)%(W+20)-10;
    p.y=(p.y+p.vy*delta+H+20)%(H+20)-10;
    const a=p.a*(0.7+0.3*Math.sin(p.ph+t*0.5));
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(150,180,220,${a.toFixed(3)})`; ctx.fill();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SUN
// ─────────────────────────────────────────────────────────────────────────────
function drawSun(ctx, W, H, t) {
  const sx=W*0.03, sy=-H*0.10;
  const co=ctx.createRadialGradient(sx,sy,0,sx,sy,H*0.65);
  co.addColorStop(0,'rgba(255,248,200,0.28)'); co.addColorStop(0.08,'rgba(255,220,100,0.10)');
  co.addColorStop(0.25,'rgba(255,180,50,0.04)'); co.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=co; ctx.fillRect(0,0,W,H);
  const dl=ctx.createLinearGradient(0,0,W*0.65,H*0.55);
  dl.addColorStop(0,'rgba(255,245,180,0.06)'); dl.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=dl; ctx.fillRect(0,0,W,H);
  const fa=Math.atan2(H*0.55-sy,W*0.55-sx), pu=0.85+0.15*Math.sin(t*1.2);
  [[0.22,18,0.07],[0.38,11,0.05],[0.56,28,0.038],[0.74,8,0.06],[0.90,20,0.03]].forEach(([fd,fr,fo]) => {
    const fx=sx+Math.cos(fa)*fd*W, fy=sy+Math.sin(fa)*fd*W;
    const fg=ctx.createRadialGradient(fx,fy,0,fx,fy,fr*pu*2);
    fg.addColorStop(0,`rgba(255,240,160,${fo*pu})`); fg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=fg; ctx.beginPath(); ctx.arc(fx,fy,fr*pu*2,0,Math.PI*2); ctx.fill();
  });
  const dg=ctx.createRadialGradient(sx,sy,0,sx,sy,30);
  dg.addColorStop(0,'rgba(255,255,220,0.85)'); dg.addColorStop(0.5,'rgba(255,240,140,0.40)'); dg.addColorStop(1,'rgba(255,200,60,0)');
  ctx.fillStyle=dg; ctx.beginPath(); ctx.arc(sx,sy,35,0,Math.PI*2); ctx.fill();
}

// ─────────────────────────────────────────────────────────────────────────────
// EARTH
// ─────────────────────────────────────────────────────────────────────────────
function drawEarth(ctx, cx, cy, r, t) {
  if (r<1) return;
  const og=ctx.createRadialGradient(cx-r*0.30,cy-r*0.30,r*0.05,cx,cy,r);
  og.addColorStop(0,'rgba(95,178,255,0.97)'); og.addColorStop(0.40,'rgba(42,115,215,0.96)');
  og.addColorStop(0.78,'rgba(14,58,148,0.96)'); og.addColorStop(1,'rgba(0,0,0,0.97)');
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle=og; ctx.fill();

  if (r>=6) {
    ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();
    const dr=t*0.007;
    [{ox:-0.22+dr,oy:-0.18,rx:0.26,ry:0.22,rot:0.2},{ox:-0.12+dr,oy:0.25,rx:0.14,ry:0.21,rot:0.1},
     {ox:0.18+dr,oy:-0.05,rx:0.16,ry:0.33,rot:-0.1},{ox:0.32+dr,oy:-0.22,rx:0.30,ry:0.23,rot:0.15},
     {ox:0.42+dr,oy:0.28,rx:0.12,ry:0.10,rot:0.05},{ox:0.00+dr,oy:0.60,rx:0.52,ry:0.12,rot:0}]
    .forEach(({ox,oy,rx,ry,rot}) => {
      ctx.save(); ctx.translate(cx+ox*r,cy+oy*r); ctx.rotate(rot);
      ctx.beginPath(); ctx.ellipse(0,0,rx*r,ry*r,0,0,Math.PI*2); ctx.fillStyle='rgba(52,156,76,0.58)'; ctx.fill(); ctx.restore();
    });
    ctx.beginPath(); ctx.ellipse(cx,cy-r*0.88,r*0.30,r*0.14,0,0,Math.PI*2); ctx.fillStyle='rgba(230,242,255,0.70)'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx,cy+r*0.92,r*0.22,r*0.09,0,0,Math.PI*2); ctx.fillStyle='rgba(220,236,255,0.55)'; ctx.fill();
    if (r>20) {
      const cd=t*0.022; ctx.globalAlpha=0.25;
      [{oy:-0.28,rx:0.78,ry:0.07},{oy:0.05,rx:0.88,ry:0.055},{oy:0.32,rx:0.70,ry:0.065}].forEach(({oy,rx,ry}) => {
        ctx.beginPath(); ctx.ellipse(cx+cd*r*0.2,cy+oy*r,rx*r,ry*r,0,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.90)'; ctx.fill();
      });
      if (r>40) {
        [[-0.30,-0.42],[0.10,-0.38],[0.50,-0.30],[-0.45,0.18],[0.35,0.22],[-0.15,0.45]].forEach(([ox,oy]) => {
          ctx.beginPath(); ctx.ellipse(cx+(ox+cd*0.3)*r,cy+oy*r,r*0.11,r*0.05,0,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.fill();
        });
      }
      ctx.globalAlpha=1;
    }
    if (r>35) {
      const ng=ctx.createRadialGradient(cx+r*0.55,cy,0,cx+r*0.55,cy,r*0.6);
      ng.addColorStop(0,'rgba(0,0,12,0.65)'); ng.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ng; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=0.55;
      [[0.28,-0.14],[0.30,0.05],[0.25,-0.32],[0.35,0.18],[0.38,-0.08],[0.42,0.28],[0.20,0.38]].forEach(([ox,oy]) => {
        const lx=cx+ox*r, ly=cy+oy*r;
        const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,r*0.04);
        lg.addColorStop(0,'rgba(255,230,120,0.65)'); lg.addColorStop(1,'rgba(255,200,60,0)');
        ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(lx,ly,r*0.04,0,Math.PI*2); ctx.fill();
      });
      ctx.globalAlpha=1;
    }
    // Shadow terminator + specular
    ctx.globalAlpha=1;
    const eShG=ctx.createLinearGradient(cx-r,cy,cx+r,cy);
    eShG.addColorStop(0,'rgba(0,0,0,0)'); eShG.addColorStop(0.32,'rgba(0,0,0,0)');
    eShG.addColorStop(0.50,'rgba(0,0,8,0.48)'); eShG.addColorStop(0.70,'rgba(0,0,5,0.78)'); eShG.addColorStop(1,'rgba(0,0,2,0.93)');
    ctx.fillStyle=eShG; ctx.fillRect(cx-r,cy-r,r*2,r*2);
    if(r>12){const espx=cx-r*0.26,espy=cy-r*0.28;const espG=ctx.createRadialGradient(espx,espy,0,espx,espy,r*0.54);espG.addColorStop(0,'rgba(255,255,255,0.58)');espG.addColorStop(0.18,'rgba(255,255,255,0.22)');espG.addColorStop(0.48,'rgba(255,255,255,0.04)');espG.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=espG;ctx.fillRect(cx-r,cy-r,r*2,r*2);}
    ctx.restore();
  }

  // ── Atmosphere — bright cyan/blue limb ──
  const at=ctx.createRadialGradient(cx,cy,r*0.88,cx,cy,r*1.44);
  at.addColorStop(0,'rgba(40,100,255,0.00)'); at.addColorStop(0.08,'rgba(90,190,255,0.65)');
  at.addColorStop(0.28,'rgba(55,145,255,0.32)'); at.addColorStop(0.60,'rgba(25,80,200,0.12)'); at.addColorStop(1,'rgba(0,0,0,0.00)');
  ctx.beginPath(); ctx.arc(cx,cy,r*1.44,0,Math.PI*2); ctx.fillStyle=at; ctx.fill();

  if (r>8) {
    const bl=ctx.createRadialGradient(cx,cy,r*1.06,cx,cy,r*1.85);
    bl.addColorStop(0,'rgba(60,160,255,0.20)'); bl.addColorStop(0.40,'rgba(30,100,220,0.07)'); bl.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bl; ctx.beginPath(); ctx.arc(cx,cy,r*1.85,0,Math.PI*2); ctx.fill();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MARS
// ─────────────────────────────────────────────────────────────────────────────
function drawMars(ctx, cx, cy, r, t) {
  if (r<1) return;
  const mg=ctx.createRadialGradient(cx-r*0.28,cy-r*0.28,r*0.04,cx,cy,r);
  mg.addColorStop(0,'rgba(232,118,56,0.97)'); mg.addColorStop(0.28,'rgba(198,82,34,0.96)');
  mg.addColorStop(0.62,'rgba(158,48,12,0.96)'); mg.addColorStop(0.88,'rgba(112,30,6,0.97)'); mg.addColorStop(1,'rgba(0,0,0,0.97)');
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle=mg; ctx.fill();

  if (r>=7) {
    ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();
    const rd=t*0.006;
    [{ox:0.20+rd,oy:-0.10,rx:0.38,ry:0.28,c:'rgba(175,55,18,0.30)'},{ox:-0.30+rd,oy:0.20,rx:0.25,ry:0.20,c:'rgba(245,135,65,0.18)'},
     {ox:0.10+rd,oy:0.30,rx:0.32,ry:0.18,c:'rgba(160,42,8,0.25)'},{ox:-0.15+rd,oy:-0.30,rx:0.22,ry:0.16,c:'rgba(205,85,30,0.20)'}]
    .forEach(({ox,oy,rx,ry,c}) => { ctx.beginPath(); ctx.ellipse(cx+ox*r,cy+oy*r,rx*r,ry*r,0,0,Math.PI*2); ctx.fillStyle=c; ctx.fill(); });
    if (r>20) {
      ctx.save(); ctx.translate(cx+r*0.06,cy+r*0.04); ctx.rotate(-0.14);
      ctx.beginPath(); ctx.ellipse(0,0,r*0.55,r*0.07,0,0,Math.PI*2); ctx.fillStyle='rgba(88,16,2,0.40)'; ctx.fill();
      ctx.restore();
    }
    if (r>45) {
      const vx=cx-r*0.30, vy=cy-r*0.12, vr=r*0.14;
      const vg=ctx.createRadialGradient(vx,vy,0,vx,vy,vr);
      vg.addColorStop(0,'rgba(215,95,38,0.58)'); vg.addColorStop(1,'rgba(168,52,14,0)');
      ctx.fillStyle=vg; ctx.beginPath(); ctx.arc(vx,vy,vr,0,Math.PI*2); ctx.fill();
    }
    ctx.beginPath(); ctx.ellipse(cx,cy-r*0.82,r*0.26,r*0.15,0,0,Math.PI*2); ctx.fillStyle='rgba(238,232,226,0.65)'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx,cy+r*0.85,r*0.16,r*0.08,0,0,Math.PI*2); ctx.fillStyle='rgba(222,216,210,0.50)'; ctx.fill();
    const dA=0.10+0.06*Math.sin(t*0.38);
    ctx.beginPath(); ctx.ellipse(cx-r*0.08,cy+r*0.12,r*0.62,r*0.22,0.2,0,Math.PI*2);
    ctx.fillStyle=`rgba(218,125,55,${dA.toFixed(3)})`; ctx.fill();
    // Shadow terminator + specular
    const mShG=ctx.createLinearGradient(cx-r,cy,cx+r,cy);
    mShG.addColorStop(0,'rgba(0,0,0,0)'); mShG.addColorStop(0.34,'rgba(0,0,0,0)');
    mShG.addColorStop(0.52,'rgba(0,0,0,0.42)'); mShG.addColorStop(0.72,'rgba(0,0,0,0.74)'); mShG.addColorStop(1,'rgba(0,0,0,0.92)');
    ctx.fillStyle=mShG; ctx.fillRect(cx-r,cy-r,r*2,r*2);
    if(r>12){const mspx=cx-r*0.24,mspy=cy-r*0.26;const mspG=ctx.createRadialGradient(mspx,mspy,0,mspx,mspy,r*0.52);mspG.addColorStop(0,'rgba(255,210,160,0.48)');mspG.addColorStop(0.20,'rgba(255,190,130,0.15)');mspG.addColorStop(0.52,'rgba(255,160,80,0.03)');mspG.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=mspG;ctx.fillRect(cx-r,cy-r,r*2,r*2);}
    ctx.restore();
  }

  // ── Atmosphere — warm orange limb ──
  const ma=ctx.createRadialGradient(cx,cy,r*0.90,cx,cy,r*1.32);
  ma.addColorStop(0,'rgba(205,82,32,0.00)'); ma.addColorStop(0.10,'rgba(230,100,40,0.55)');
  ma.addColorStop(0.34,'rgba(200,70,24,0.25)'); ma.addColorStop(0.68,'rgba(160,48,14,0.09)'); ma.addColorStop(1,'rgba(0,0,0,0.00)');
  ctx.beginPath(); ctx.arc(cx,cy,r*1.32,0,Math.PI*2); ctx.fillStyle=ma; ctx.fill();
  if (r>8) {
    const mb=ctx.createRadialGradient(cx,cy,r*1.06,cx,cy,r*1.65);
    mb.addColorStop(0,'rgba(210,75,22,0.18)'); mb.addColorStop(0.42,'rgba(160,50,14,0.06)'); mb.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=mb; ctx.beginPath(); ctx.arc(cx,cy,r*1.65,0,Math.PI*2); ctx.fill();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SPACECRAFT
// ─────────────────────────────────────────────────────────────────────────────
function drawSpacecraft(ctx, cx, cy, angle, scale, t, thrust=1) {
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle); ctx.scale(scale,scale);
  if (thrust>0.05) { ctx.translate((Math.random()-0.5)*0.8*thrust,(Math.random()-0.5)*0.8*thrust); }

  const eY=28, gA=(0.6+0.4*Math.sin(t*8))*thrust;
  const eG=ctx.createRadialGradient(0,eY,0,0,eY,48);
  eG.addColorStop(0,`rgba(255,200,80,${gA.toFixed(3)})`); eG.addColorStop(0.3,`rgba(255,120,20,${(gA*0.38).toFixed(3)})`); eG.addColorStop(1,'rgba(180,50,0,0)');
  ctx.fillStyle=eG; ctx.beginPath(); ctx.ellipse(0,eY,20,58,0,0,Math.PI*2); ctx.fill();

  const pA=(0.7+0.3*Math.sin(t*12))*thrust;
  const pl=ctx.createLinearGradient(0,eY,0,eY+85);
  pl.addColorStop(0,`rgba(255,240,180,${pA.toFixed(3)})`); pl.addColorStop(0.2,`rgba(255,160,40,${(pA*0.65).toFixed(3)})`);
  pl.addColorStop(0.55,`rgba(200,60,10,${(pA*0.32).toFixed(3)})`); pl.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=pl;
  ctx.beginPath(); ctx.moveTo(-8,eY); ctx.lineTo(8,eY);
  ctx.bezierCurveTo(14,eY+30,12,eY+58,6+Math.sin(t*15)*3,eY+85);
  ctx.bezierCurveTo(-6+Math.sin(t*15)*3,eY+85,-12,eY+58,-14,eY+30); ctx.closePath(); ctx.fill();

  const eb=ctx.createLinearGradient(-7,0,7,0);
  eb.addColorStop(0,'rgba(58,63,74,0.95)'); eb.addColorStop(0.5,'rgba(88,95,108,0.95)'); eb.addColorStop(1,'rgba(52,58,68,0.95)');
  ctx.fillStyle=eb; ctx.beginPath(); ctx.moveTo(-5,0); ctx.lineTo(5,0); ctx.lineTo(7,eY); ctx.lineTo(-7,eY); ctx.closePath(); ctx.fill();

  [[-1,-5],[1,5]].forEach(([dir,fx]) => {
    ctx.fillStyle='rgba(218,222,235,0.92)';
    ctx.beginPath(); ctx.moveTo(fx,-14); ctx.lineTo(fx+dir*10,8); ctx.lineTo(fx+dir*3,8); ctx.lineTo(fx,-7); ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(215,40,30,0.78)';
    ctx.beginPath(); ctx.moveTo(fx,-7); ctx.lineTo(fx+dir*3,8); ctx.lineTo(fx+dir*7,8); ctx.lineTo(fx,0); ctx.closePath(); ctx.fill();
  });

  const bG=ctx.createLinearGradient(-6.5,0,6.5,0);
  bG.addColorStop(0,'rgba(155,162,178,0.96)'); bG.addColorStop(0.25,'rgba(228,235,248,0.97)');
  bG.addColorStop(0.75,'rgba(228,235,248,0.97)'); bG.addColorStop(1,'rgba(145,152,168,0.94)');
  ctx.fillStyle=bG; ctx.fillRect(-5.5,-25,11,25);
  ctx.strokeStyle='rgba(180,190,210,0.16)'; ctx.lineWidth=0.5;
  [-18,-11,-4].forEach(py => { ctx.beginPath(); ctx.moveTo(-5.5,py); ctx.lineTo(5.5,py); ctx.stroke(); });

  ctx.fillStyle='rgba(215,40,30,0.85)'; ctx.fillRect(-5.5,-25,11,4.5); ctx.fillRect(-5.5,-12,11,3);

  const nG=ctx.createLinearGradient(-5.5,-25,5.5,-25);
  nG.addColorStop(0,'rgba(145,150,168,0.93)'); nG.addColorStop(0.45,'rgba(228,235,248,0.97)'); nG.addColorStop(1,'rgba(132,138,155,0.91)');
  ctx.fillStyle=nG; ctx.beginPath(); ctx.moveTo(-5.5,-25); ctx.lineTo(5.5,-25); ctx.lineTo(0,-38); ctx.closePath(); ctx.fill();

  ctx.beginPath(); ctx.arc(0,-16,3,0,Math.PI*2); ctx.fillStyle='rgba(40,190,255,0.40)'; ctx.fill();
  ctx.strokeStyle='rgba(100,220,255,0.72)'; ctx.lineWidth=0.9; ctx.stroke();

  const bl1=Math.sin(t*3.5)>0?0.95:0.15;
  ctx.fillStyle=`rgba(255,80,80,${bl1})`; ctx.shadowBlur=bl1>0.5?7:0; ctx.shadowColor='rgba(255,60,60,0.8)';
  ctx.beginPath(); ctx.arc(-5.5,-8,1.5,0,Math.PI*2); ctx.fill();
  const bl2=Math.sin(t*3.5+Math.PI)>0?0.95:0.15;
  ctx.fillStyle=`rgba(80,255,120,${bl2})`; ctx.shadowColor='rgba(60,255,100,0.8)';
  ctx.beginPath(); ctx.arc(5.5,-8,1.5,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAJECTORY
// ─────────────────────────────────────────────────────────────────────────────
function bezQ(t2,ex,ey,cpx,cpy,mx,my) {
  return [(1-t2)*(1-t2)*ex+2*(1-t2)*t2*cpx+t2*t2*mx, (1-t2)*(1-t2)*ey+2*(1-t2)*t2*cpy+t2*t2*my];
}

function drawTrajectory(ctx, ex, ey, mx, my, progress, t) {
  const cpx=(ex+mx)*0.5, cpy=Math.min(ey,my)-Math.abs(mx-ex)*0.12;
  ctx.beginPath(); ctx.moveTo(ex,ey); ctx.quadraticCurveTo(cpx,cpy,mx,my);
  ctx.strokeStyle=`rgba(0,180,255,${(0.07+0.03*Math.sin(t*2)).toFixed(3)})`; ctx.lineWidth=18; ctx.setLineDash([]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ex,ey); ctx.quadraticCurveTo(cpx,cpy,mx,my);
  ctx.strokeStyle=`rgba(0,200,255,${(0.14+0.05*Math.sin(t*2)).toFixed(3)})`; ctx.lineWidth=5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ex,ey); ctx.quadraticCurveTo(cpx,cpy,mx,my);
  ctx.strokeStyle=`rgba(0,210,255,${(0.55+0.20*Math.sin(t*2.5)).toFixed(3)})`;
  ctx.lineWidth=1.5; ctx.setLineDash([7,4]); ctx.lineDashOffset=-(t*22)%11; ctx.stroke(); ctx.setLineDash([]);

  if (progress>0.005) {
    ctx.beginPath();
    for (let i=0;i<=40;i++) { const [qx,qy]=bezQ(i/40*progress,ex,ey,cpx,cpy,mx,my); i===0?ctx.moveTo(qx,qy):ctx.lineTo(qx,qy); }
    ctx.strokeStyle='rgba(80,230,255,0.70)'; ctx.lineWidth=2.5; ctx.setLineDash([]); ctx.stroke();
  }

  if (progress>0.25) {
    const [mbx,mby]=bezQ(0.28,ex,ey,cpx,cpy,mx,my);
    const pA=0.6+0.4*Math.sin(t*3);
    const mgr=ctx.createRadialGradient(mbx,mby,0,mbx,mby,14);
    mgr.addColorStop(0,`rgba(245,160,30,${pA.toFixed(3)})`); mgr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=mgr; ctx.beginPath(); ctx.arc(mbx,mby,14,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(mbx,mby,3,0,Math.PI*2); ctx.fillStyle=`rgba(255,200,60,${pA.toFixed(3)})`; ctx.fill();
  }

  if (progress>0.005 && progress<0.998) {
    const [dx,dy]=bezQ(progress,ex,ey,cpx,cpy,mx,my);
    const pA2=0.7+0.3*Math.sin(t*5);
    const dg=ctx.createRadialGradient(dx,dy,0,dx,dy,22);
    dg.addColorStop(0,`rgba(0,240,255,${(pA2*0.5).toFixed(3)})`); dg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=dg; ctx.beginPath(); ctx.arc(dx,dy,22,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(dx,dy,4,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${pA2.toFixed(3)})`; ctx.fill();
  }
}

function drawRocketOnArc(ctx, ex, ey, mx, my, progress, t) {
  if (progress<0.005||progress>0.995) return;
  const cpx=(ex+mx)*0.5, cpy=Math.min(ey,my)-Math.abs(mx-ex)*0.12;
  const dp=0.012, p=clamp(progress,0,1);
  const [rx,ry]=bezQ(p,ex,ey,cpx,cpy,mx,my);
  const [x1,y1]=bezQ(Math.max(0,p-dp),ex,ey,cpx,cpy,mx,my);
  const [x2,y2]=bezQ(Math.min(1,p+dp),ex,ey,cpx,cpy,mx,my);
  const ang=Math.atan2(y2-y1,x2-x1)-Math.PI/2;
  for (let i=1;i<=16;i++) {
    const [tx,ty]=bezQ(Math.max(0,p-i*0.018),ex,ey,cpx,cpy,mx,my);
    const ta=(1-i/16)*0.36, tr=Math.max(0.4,4-i*0.22);
    ctx.fillStyle=i<4?`rgba(255,235,130,${ta})`:i<8?`rgba(225,115,35,${ta})`:`rgba(125,40,10,${ta*0.6})`;
    ctx.beginPath(); ctx.arc(tx,ty,tr,0,Math.PI*2); ctx.fill();
  }
  ctx.save(); ctx.translate(rx,ry); ctx.rotate(ang);
  drawSpacecraft(ctx,0,0,0,1.6,t); ctx.restore();
}

function drawOrbitPath(ctx, cx, cy, rx, ry, ang, t) {
  ctx.save(); ctx.strokeStyle=`rgba(0,200,255,${(0.28*(0.55+0.45*Math.sin(t*1.8))).toFixed(3)})`;
  ctx.lineWidth=1.2; ctx.setLineDash([5,6]); ctx.lineDashOffset=-(t*15)%11;
  ctx.translate(cx,cy); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.stroke();
  ctx.setLineDash([]); ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// POST-PROCESS
// ─────────────────────────────────────────────────────────────────────────────
function drawVignette(ctx, W, H, i=0.70) {
  const v=ctx.createRadialGradient(W/2,H/2,H*0.20,W/2,H/2,H*0.80);
  v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,`rgba(0,0,0,${i.toFixed(3)})`);
  ctx.fillStyle=v; ctx.fillRect(0,0,W,H);
}
function drawLetterbox(ctx, W, H) {
  const bh=Math.round(H*0.086); ctx.fillStyle='#000'; ctx.fillRect(0,0,W,bh); ctx.fillRect(0,H-bh,W,bh);
}
function drawChromatic(ctx, W, H, s=0.04) {
  const c1=ctx.createRadialGradient(W*0.05,H/2,0,W*0.05,H/2,W*0.40);
  c1.addColorStop(0,`rgba(255,0,0,${s})`); c1.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=c1; ctx.fillRect(0,0,W,H);
  const c2=ctx.createRadialGradient(W*0.95,H/2,0,W*0.95,H/2,W*0.40);
  c2.addColorStop(0,`rgba(0,0,255,${s})`); c2.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=c2; ctx.fillRect(0,0,W,H);
}
function drawSpeedLines(ctx, W, H, alpha, t) {
  if (alpha<0.01) return;
  ctx.strokeStyle=`rgba(160,220,255,${(alpha*0.28).toFixed(3)})`; ctx.lineWidth=0.7;
  for (let i=0;i<55;i++) { const sd=i*2.618, y=((sd*37.1)+t*(55+(i%5)*22))%H, len=22+(i%4)*42;
    ctx.beginPath(); ctx.moveTo((sd*23.7)%W,y); ctx.lineTo(((sd*23.7)%W)-len,y); ctx.stroke(); }
}

function drawFilmGrain(ctx, W, H) {
  ctx.fillStyle='rgba(255,255,255,0.042)';
  for(let i=0;i<1400;i++) ctx.fillRect(Math.random()*W|0, Math.random()*H|0, 1, 1);
  ctx.fillStyle='rgba(0,0,0,0.028)';
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
  const o2Pct=0.94; const tmpC=21+Math.round(prog*4);
  drawGauge(ctx,xs[0],gy,gr,velPct,'VEL',`${(velocity/1000).toFixed(1)}k`,'#00e8a4');
  drawGauge(ctx,xs[1],gy,gr*0.88,fuelPct,'FUEL',`${Math.round(fuelPct*100)}%`,'#00d4ff');
  drawGauge(ctx,xs[2],gy,gr*1.12,thrPct,'THR',`${Math.round(thrPct*100)}%`,'#f59e0b');
  drawGauge(ctx,xs[3],gy,gr*0.88,o2Pct,'O2','94%','#22c55e');
  drawGauge(ctx,xs[4],gy,gr*0.88,0.55+prog*0.10,'TMP',`${tmpC}°C`,'#a78bfa');
  // Side button columns
  const fc='rgba(0,180,255,0.14)', bc='rgba(0,200,255,0.60)', bw=W*0.054, tbh=bh*0.23;
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

// ─────────────────────────────────────────────────────────────────────────────
// COCKPIT + RETICLE
// ─────────────────────────────────────────────────────────────────────────────
function drawCockpit(ctx, W, H, alpha, t) {
  if (alpha<0.01) return;
  ctx.save(); ctx.globalAlpha=alpha;
  const fc='rgba(5,9,20,0.97)';

  // Window dimensions — wide panoramic
  const wl=W*0.220, wr=W-W*0.220, wt=H*0.068, wb=H-H*0.175, cr=16;

  // Draw frame with window hole (evenodd composite)
  ctx.beginPath();
  ctx.rect(0,0,W,H);
  ctx.moveTo(wl+cr,wt); ctx.lineTo(wr-cr,wt);
  ctx.quadraticCurveTo(wr,wt,wr,wt+cr);
  ctx.lineTo(wr,wb-cr); ctx.quadraticCurveTo(wr,wb,wr-cr,wb);
  ctx.lineTo(wl+cr,wb); ctx.quadraticCurveTo(wl,wb,wl,wb-cr);
  ctx.lineTo(wl,wt+cr); ctx.quadraticCurveTo(wl,wt,wl+cr,wt);
  ctx.closePath();
  ctx.fillStyle=fc; ctx.fill('evenodd');

  // Window inner rim glow
  ctx.strokeStyle='rgba(0,190,255,0.38)'; ctx.lineWidth=1.6;
  ctx.shadowBlur=14; ctx.shadowColor='rgba(0,190,255,0.40)';
  ctx.beginPath();
  ctx.moveTo(wl+cr,wt); ctx.lineTo(wr-cr,wt);
  ctx.quadraticCurveTo(wr,wt,wr,wt+cr);
  ctx.lineTo(wr,wb-cr); ctx.quadraticCurveTo(wr,wb,wr-cr,wb);
  ctx.lineTo(wl+cr,wb); ctx.quadraticCurveTo(wl,wb,wl,wb-cr);
  ctx.lineTo(wl,wt+cr); ctx.quadraticCurveTo(wl,wt,wl+cr,wt);
  ctx.closePath(); ctx.stroke(); ctx.shadowBlur=0;

  // Left panel — secondary Earth viewport
  const evx=wl*0.08, evy=H*0.12, evw=wl*0.84, evh=H*0.54, evcr=10;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(evx+evcr,evy); ctx.lineTo(evx+evw-evcr,evy);
  ctx.quadraticCurveTo(evx+evw,evy,evx+evw,evy+evcr);
  ctx.lineTo(evx+evw,evy+evh-evcr); ctx.quadraticCurveTo(evx+evw,evy+evh,evx+evw-evcr,evy+evh);
  ctx.lineTo(evx+evcr,evy+evh); ctx.quadraticCurveTo(evx,evy+evh,evx,evy+evh-evcr);
  ctx.lineTo(evx,evy+evcr); ctx.quadraticCurveTo(evx,evy,evx+evcr,evy);
  ctx.closePath(); ctx.clip();
  // Stars in viewport
  ctx.fillStyle='#010610'; ctx.fillRect(evx,evy,evw,evh);
  for(let i=0;i<55;i++){const sx=(i*47.3+13)%evw+evx,sy=(i*31.7+7)%evh+evy,sr=0.3+((i*7)%10)*0.08;ctx.fillStyle=`rgba(200,220,255,${0.2+(i%5)*0.08})`;ctx.beginPath();ctx.arc(sx,sy,sr,0,Math.PI*2);ctx.fill();}
  drawEarth(ctx, evx+evw*0.28, evy+evh*0.68, evw*0.90, t);
  ctx.restore();
  // Viewport border
  ctx.strokeStyle='rgba(0,160,255,0.32)'; ctx.lineWidth=1; ctx.shadowBlur=6; ctx.shadowColor='rgba(0,160,255,0.28)';
  ctx.beginPath();
  ctx.moveTo(evx+evcr,evy); ctx.lineTo(evx+evw-evcr,evy);
  ctx.quadraticCurveTo(evx+evw,evy,evx+evw,evy+evcr);
  ctx.lineTo(evx+evw,evy+evh-evcr); ctx.quadraticCurveTo(evx+evw,evy+evh,evx+evw-evcr,evy+evh);
  ctx.lineTo(evx+evcr,evy+evh); ctx.quadraticCurveTo(evx,evy+evh,evx,evy+evh-evcr);
  ctx.lineTo(evx,evy+evcr); ctx.quadraticCurveTo(evx,evy,evx+evcr,evy);
  ctx.closePath(); ctx.stroke(); ctx.shadowBlur=0;
  // EARTH label inside viewport
  ctx.fillStyle='rgba(0,190,255,0.42)'; ctx.font="8px 'Courier New',monospace"; ctx.textAlign='left';
  ctx.fillText('EARTH',evx+7,evy+evh-8);
  // Status lights above viewport
  [{x:evx+evw*0.20,c:'#22c55e',l:'PWR'},{x:evx+evw*0.50,c:'#22c55e',l:'NAV'},{x:evx+evw*0.80,c:'#f59e0b',l:'THR'}]
  .forEach(({x,c,l}) => {
    const iy=evy-18;
    ctx.fillStyle=c; ctx.shadowBlur=6; ctx.shadowColor=c;
    ctx.beginPath(); ctx.arc(x,iy,3.5,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
    ctx.fillStyle='rgba(180,210,240,0.55)'; ctx.font='7px monospace'; ctx.textAlign='center'; ctx.fillText(l,x,iy+11);
  });

  // Frame surface detail — subtle panel lines
  ctx.strokeStyle='rgba(0,150,220,0.10)'; ctx.lineWidth=0.5;
  [H*0.25,H*0.50,H*0.75].forEach(y => {
    if(y<wt||y>wb){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  });

  ctx.restore();
}

function drawReticle(ctx, cx, cy, r, alpha, t) {
  if (alpha<0.01) return;
  ctx.save(); ctx.globalAlpha=alpha;
  const p=0.65+0.35*Math.sin(t*3.8), ring=r+20;
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(t*0.75);
  ctx.strokeStyle=`rgba(0,220,255,${(0.60*p).toFixed(3)})`; ctx.lineWidth=1.8; ctx.shadowBlur=8; ctx.shadowColor='rgba(0,210,255,0.45)';
  ctx.beginPath(); ctx.arc(0,0,ring,0,Math.PI*1.55); ctx.stroke(); ctx.shadowBlur=0; ctx.restore();
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(-t*0.45);
  ctx.strokeStyle=`rgba(0,180,255,${(0.28*p).toFixed(3)})`; ctx.lineWidth=1; ctx.setLineDash([5,5]);
  ctx.beginPath(); ctx.arc(0,0,ring*1.32,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  ctx.strokeStyle=`rgba(0,230,255,${(0.88*p).toFixed(3)})`; ctx.lineWidth=2;
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([dx,dy]) => {
    const bx=cx+dx*(ring+12)*0.72, by=cy+dy*(ring+12)*0.72;
    ctx.beginPath(); ctx.moveTo(bx+dx*14,by); ctx.lineTo(bx,by); ctx.lineTo(bx,by+dy*14); ctx.stroke();
  });
  ctx.fillStyle=`rgba(0,220,255,${(0.92*p).toFixed(3)})`; ctx.font='bold 9px monospace'; ctx.textAlign='center';
  ctx.shadowBlur=5; ctx.shadowColor='rgba(0,200,255,0.5)'; ctx.fillText('TARGET LOCKED',cx,cy-ring-14); ctx.shadowBlur=0;
  ctx.fillStyle='rgba(0,190,255,0.78)'; ctx.font='9px monospace'; ctx.fillText('MARS ORBIT INSERTION',cx,cy+ring+18);
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// LABEL
// ─────────────────────────────────────────────────────────────────────────────
function drawLabel(ctx, x, y, text, alpha, align='center') {
  if (alpha<0.01) return;
  ctx.fillStyle=`rgba(0,200,255,${alpha.toFixed(3)})`; ctx.font="bold 11px 'Courier New',monospace"; ctx.textAlign=align;
  ctx.shadowBlur=6; ctx.shadowColor=`rgba(0,180,255,${(alpha*0.5).toFixed(3)})`; ctx.fillText(text,x,y); ctx.shadowBlur=0;
}
function drawPlanetLabel(ctx, cx, y, label, alpha) {
  if (alpha<0.02) return;
  ctx.fillStyle=`rgba(140,200,255,${(alpha*0.65).toFixed(3)})`; ctx.font="9px 'Courier New',monospace"; ctx.textAlign='center'; ctx.fillText(label,cx,y);
}

// ─────────────────────────────────────────────────────────────────────────────
// POV STARS
// ─────────────────────────────────────────────────────────────────────────────
function drawPov(ctx, povStars, W, H, delta, prog) {
  const cx=W/2, cy=H/2, speed=300+prog*500;
  ctx.save();
  povStars.forEach(ps => {
    ps.pz=ps.z; ps.z-=delta*speed;
    if (ps.z<=0) { ps.x=(Math.random()-0.5)*W*2; ps.y=(Math.random()-0.5)*H*2; ps.z=W; ps.pz=W; }
    const sx=(ps.x/ps.z)*W+cx, sy=(ps.y/ps.z)*H+cy, px2=(ps.x/ps.pz)*W+cx, py2=(ps.y/ps.pz)*H+cy;
    const d=1-ps.z/W, sz=Math.max(0.3,d*5), sa=clamp(d*2.5,0,1);
    ctx.beginPath(); ctx.moveTo(px2,py2); ctx.lineTo(sx,sy);
    ctx.strokeStyle=`rgba(${Math.round(200+d*55)},${Math.round(220+d*35)},255,${sa.toFixed(3)})`;
    ctx.lineWidth=sz; ctx.stroke();
  });
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function MarsLaunchScene({ onComplete, onPlayAgain }) {
  const canvasRef   = useRef(null);
  const s0          = useRef([]); // far stars
  const s1          = useRef([]); // mid stars
  const s2          = useRef([]); // near stars
  const dustR       = useRef([]);
  const povR        = useRef([]);
  const sizeRef     = useRef({W:1,H:1});
  const initDone    = useRef(false);
  const tRef        = useRef(0);
  const ptRef       = useRef(0);
  const phaseTrans  = useRef(false);

  const phaseRef      = useRef('emerge');
  const camRef        = useRef(CAM_WIDE);
  const tsRef         = useRef(1);
  const hudARef       = useRef(1);
  const progRef       = useRef(0);
  const missionT0     = useRef(null);
  const lastUI        = useRef(0);
  const autoTimer     = useRef(0);
  const autoCamIdx    = useRef(1);
  const shownEvents   = useRef(new Set());
  const activeEvRef   = useRef(null);
  const evTimer       = useRef(0);
  const modeShown     = useRef(false);

  const [phase,         setPhase]         = useState('emerge');
  const [camMode,       setCamMode]       = useState(CAM_WIDE);
  const [timeScale,     setTimeScale]     = useState(1);
  const [hudOpacity,    setHudOpacity]    = useState(1);
  const [showDirector,  setShowDirector]  = useState(false);
  const [showModeSelect,setShowModeSelect]= useState(false);
  const [missionSecs,   setMissionSecs]   = useState(0);
  const [distToMars,    setDistToMars]    = useState(EARTH_MARS_KM);
  const [velocity,      setVelocity]      = useState(32500);
  const [activeEvent,   setActiveEvent]   = useState(null);

  useEffect(() => { phaseRef.current=phase; ptRef.current=0; phaseTrans.current=false; modeShown.current=false; }, [phase]);
  useEffect(() => { camRef.current=camMode; }, [camMode]);
  useEffect(() => { tsRef.current=timeScale; }, [timeScale]);
  useEffect(() => { hudARef.current=hudOpacity; }, [hudOpacity]);
  useEffect(() => { const stop=startSpaceAmbient(); return stop; }, []);

  useEffect(() => {
    function resize() {
      const c=canvasRef.current; if (!c) return;
      const W=c.clientWidth, H=c.clientHeight; c.width=W; c.height=H; sizeRef.current={W,H};
      if (!initDone.current) {
        s0.current=initStarLayer(280,W,H,0); s1.current=initStarLayer(180,W,H,1); s2.current=initStarLayer(80,W,H,2);
        dustR.current=initDust(60,W,H); povR.current=initPovStars(500,W,H); initDone.current=true;
      }
    }
    resize(); window.addEventListener('resize',resize); return ()=>window.removeEventListener('resize',resize);
  }, []);

  const handleCam = useCallback((m) => { setCamMode(m); camRef.current=m; setShowDirector(false); }, []);
  const handleBeginTransit = useCallback(() => {
    missionT0.current=tRef.current; setShowModeSelect(false); setShowDirector(true); setPhase('transit');
  }, []);

  const tick = useCallback((rawDelta) => {
    const canvas=canvasRef.current; if (!canvas||!initDone.current) return;
    const ctx=canvas.getContext('2d');
    const {W,H}=sizeRef.current;
    const curPhase=phaseRef.current;
    const ts=tsRef.current;
    const sd=curPhase==='transit'?rawDelta*ts:rawDelta;
    tRef.current+=rawDelta; ptRef.current+=sd;
    const t=tRef.current, pt=ptRef.current;

    // camera drift + handheld
    const cx2=Math.sin(t*0.07+0.5)*W*0.012 + Math.sin(t*3.1+0.7)*1.2;
    const cy2=Math.cos(t*0.055+1.2)*H*0.008 + Math.cos(t*2.8+1.4)*1.0;

    // auto camera cycle (every 20 s)
    if (camRef.current===CAM_AUTO) {
      autoTimer.current+=rawDelta;
      if (autoTimer.current>20) { autoTimer.current=0; autoCamIdx.current=(autoCamIdx.current%(ALL_CAMS.length-1))+1; }
    }
    const effectiveCam=camRef.current===CAM_AUTO ? ALL_CAMS[autoCamIdx.current] : camRef.current;

    // ── EMERGE ────────────────────────────────────────────────────────────
    if (curPhase==='emerge') {
      const prog=pt/EMERGE_DUR;
      const sa=clamp(prog*1.6,0,1);
      drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
      drawStarLayer(ctx,s0.current,t,sa,cx2*0.15,cy2*0.15);
      drawStarLayer(ctx,s1.current,t,sa,cx2*0.08,cy2*0.08);
      drawStarLayer(ctx,s2.current,t,sa,cx2*0.03,cy2*0.03);
      drawSun(ctx,W,H,t);
      drawEarth(ctx,W/2,H*0.85+Math.min(W*0.38,H*0.44)*0.15,Math.min(W*0.38,H*0.44),t);
      const atmA=clamp((1-prog*2)*0.50,0,0.5);
      if (atmA>0.005) { const ag=ctx.createLinearGradient(0,H-160,0,H); ag.addColorStop(0,'rgba(40,100,220,0)'); ag.addColorStop(1,`rgba(40,100,220,${atmA})`); ctx.fillStyle=ag; ctx.fillRect(0,H-160,W,160); }
      const rA=clamp(1-prog*2.5,0,1);
      if (rA>0.01) { ctx.save(); ctx.globalAlpha=rA; drawSpacecraft(ctx,W/2,H*0.42-prog*H*0.28,0,1.4,t); ctx.restore(); }
      const bkA=clamp(1-prog*2.8,0,1);
      if (bkA>0.005) { ctx.fillStyle=`rgba(2,5,18,${bkA.toFixed(3)})`; ctx.fillRect(0,0,W,H); }
      drawVignette(ctx,W,H,0.55);
      if (prog>0.45) drawLabel(ctx,W/2,34,'ATMOSPHERIC ASCENT COMPLETE · LOW EARTH ORBIT',clamp((prog-0.45)*2.5,0,1));
      if (pt>=EMERGE_DUR&&!phaseTrans.current) { phaseTrans.current=true; setPhase('orbit'); }
    }

    // ── ORBIT ─────────────────────────────────────────────────────────────
    else if (curPhase==='orbit') {
      const prog=clamp(pt/ORBIT_DUR,0,1);
      drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
      drawStarLayer(ctx,s0.current,t,1,cx2*0.15,cy2*0.15);
      drawStarLayer(ctx,s1.current,t,1,cx2*0.08,cy2*0.08);
      drawStarLayer(ctx,s2.current,t,1,cx2*0.03,cy2*0.03);
      drawSun(ctx,W,H,t);
      const eR=Math.min(W*0.30,H*0.36), eCX=W*0.50, eCY=H*0.80;
      drawEarth(ctx,eCX,eCY,eR,t);
      drawOrbitPath(ctx,eCX,eCY,eR*1.35,eR*0.40,-0.18,t);
      const ang=-0.18+t*0.25, rX=eCX+Math.cos(ang)*eR*1.35, rY=eCY+Math.sin(ang)*eR*0.40;
      const rSc=clamp(prog*3,0,1)*1.2;
      if (rSc>0.01) drawSpacecraft(ctx,rX,rY,ang+Math.PI/2,rSc,t);
      drawVignette(ctx,W,H,0.50);
      drawLabel(ctx,W/2,34,'LOW EARTH ORBIT · INSERTION CONFIRMED',1);
      if (pt>=2.5&&!modeShown.current) { modeShown.current=true; setShowModeSelect(true); }
    }

    // ── TRANSIT ───────────────────────────────────────────────────────────
    else if (curPhase==='transit') {
      const prog=clamp(pt/TRANSIT_DUR,0,1);
      progRef.current=prog;

      if (effectiveCam===CAM_POV) {
        drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t);
        drawPov(ctx,povR.current,W,H,rawDelta,prog);
        drawChromatic(ctx,W,H,0.035+prog*0.025);
        const mR=lerp(2,Math.min(W,H)*0.22,clamp((prog-0.04)/0.96,0,1));
        const mPovX=W/2+Math.sin(t*0.08)*W*0.012+cx2*0.05;
        const mPovY=H/2+Math.cos(t*0.065)*H*0.008+cy2*0.05;
        drawMars(ctx,mPovX,mPovY,mR,t);
        const mProg=clamp((prog-0.04)/0.96,0,1);
        if (mProg>0.08) drawReticle(ctx,mPovX,mPovY,mR,clamp((mProg-0.08)*4,0,1),t);
        const cptA=clamp(prog*4,0,1);
        drawCockpit(ctx,W,H,cptA,t);
        if(cptA>0.05) drawGaugeCluster(ctx,W,H,Math.round(32500+prog*4800),prog);
        drawVignette(ctx,W,H,0.45+prog*0.20);
        drawFilmGrain(ctx,W,H);
        drawLabel(ctx,W/2,H*0.036,`POV  ·  VELOCITY ${Math.round(32500+prog*4800).toLocaleString()} m/s`,clamp(prog*3,0,1));
      }

      else if (effectiveCam===CAM_FLYBY) {
        const fA=t*0.22, fR=Math.min(W,H)*0.28;
        drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
        drawStarLayer(ctx,s0.current,t,1,cx2*0.15+Math.cos(fA)*fR*0.15,cy2*0.15+Math.sin(fA)*fR*0.08);
        drawStarLayer(ctx,s1.current,t,1,cx2*0.08,cy2*0.08);
        drawStarLayer(ctx,s2.current,t,1,cx2*0.03,cy2*0.03);
        drawSun(ctx,W,H,t);
        const eR=lerp(80,10,prog), mProg2=clamp((prog-0.05)/0.95,0,1), mR=lerp(5,72,mProg2);
        drawEarth(ctx,W*0.14,H*0.50,eR,t); drawPlanetLabel(ctx,W*0.14,H*0.50+eR+14,'EARTH',1);
        drawMars(ctx,W*0.86,H*0.50,mR,t); drawPlanetLabel(ctx,W*0.86,H*0.50+mR+14,'MARS',mProg2);
        drawTrajectory(ctx,W*0.14,H*0.50,W*0.86,H*0.50,prog,t);
        drawRocketOnArc(ctx,W*0.14,H*0.50,W*0.86,H*0.50,prog,t);
        drawSpeedLines(ctx,W,H,clamp(prog*2.5,0,0.6),t);
        drawVignette(ctx,W,H,0.55); drawLetterbox(ctx,W,H);
        drawFilmGrain(ctx,W,H);
        drawLabel(ctx,W/2,H*0.105,'FLYBY · EARTH–MARS CORRIDOR',0.9);
      }

      else if (effectiveCam===CAM_ORBITAL) {
        drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
        drawStarLayer(ctx,s0.current,t,1,cx2*0.15,cy2*0.15);
        drawStarLayer(ctx,s1.current,t,1,cx2*0.08,cy2*0.08);
        drawSun(ctx,W,H,t);
        const eR2=lerp(48,6,prog)*0.65, mR2=lerp(4,44,clamp((prog-0.05)/0.95,0,1))*0.65;
        drawEarth(ctx,W*0.12,H*0.50,eR2,t); drawPlanetLabel(ctx,W*0.12,H*0.50+eR2+12,'EARTH',1);
        drawMars(ctx,W*0.88,H*0.50,mR2,t); drawPlanetLabel(ctx,W*0.88,H*0.50+mR2+12,'MARS',clamp((prog-0.05)/0.95,0,1));
        const oCpx=(W*0.12+W*0.88)*0.5, oCpy=H*0.15;
        ctx.beginPath(); ctx.moveTo(W*0.12,H*0.50); ctx.quadraticCurveTo(oCpx,oCpy,W*0.88,H*0.50);
        ctx.strokeStyle=`rgba(0,200,255,${(0.45+0.15*Math.sin(t*2)).toFixed(3)})`; ctx.lineWidth=1.5;
        ctx.setLineDash([6,4]); ctx.lineDashOffset=-(t*20)%10; ctx.stroke(); ctx.setLineDash([]);
        const [osx,osy]=bezQ(prog,W*0.12,H*0.50,oCpx,oCpy,W*0.88,H*0.50);
        const osg=ctx.createRadialGradient(osx,osy,0,osx,osy,18);
        osg.addColorStop(0,'rgba(0,220,255,0.7)'); osg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=osg; ctx.beginPath(); ctx.arc(osx,osy,18,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(osx,osy,4,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.90)'; ctx.fill();
        drawVignette(ctx,W,H,0.48); drawFilmGrain(ctx,W,H);
        drawLabel(ctx,W/2,34,'ORBITAL OVERVIEW · SOLAR PLANE',0.9);
      }

      else if (effectiveCam===CAM_CHASE) {
        drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
        drawStarLayer(ctx,s0.current,t,1,cx2*0.15,cy2*0.15);
        drawStarLayer(ctx,s1.current,t,1,cx2*0.08,cy2*0.08);
        drawStarLayer(ctx,s2.current,t,1,cx2*0.03,cy2*0.03);
        drawSun(ctx,W,H,t); drawSpeedLines(ctx,W,H,clamp(prog*3,0,0.7),t);
        const eR3=lerp(70,8,prog), mR3=lerp(5,68,clamp((prog-0.05)/0.95,0,1));
        drawEarth(ctx,W*0.12,H*0.50,eR3,t); drawPlanetLabel(ctx,W*0.12,H*0.50+eR3+14,'EARTH',1);
        drawMars(ctx,W*0.88,H*0.50,mR3,t); drawPlanetLabel(ctx,W*0.88,H*0.50+mR3+14,'MARS',clamp((prog-0.05)/0.95,0,1));
        drawTrajectory(ctx,W*0.12,H*0.50,W*0.88,H*0.50,prog,t);
        const rX2=W/2+Math.sin(t*0.38)*8, rY2=H*0.54+Math.cos(t*0.55)*5;
        ctx.save(); ctx.translate(rX2,rY2); ctx.rotate(-0.10+Math.sin(t*0.28)*0.04);
        drawSpacecraft(ctx,0,0,0,3.0,t); ctx.restore();
        drawVignette(ctx,W,H,0.52); drawFilmGrain(ctx,W,H);
        drawLabel(ctx,W/2,34,'CHASE CAM · EARTH–MARS TRANSIT',1);
      }

      else { // WIDE — cinematic: massive Earth left, rocket departing, Mars far right
        drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
        drawStarLayer(ctx,s0.current,t,1,cx2*0.15,cy2*0.15);
        drawStarLayer(ctx,s1.current,t,1,cx2*0.08,cy2*0.08);
        drawStarLayer(ctx,s2.current,t,1,cx2*0.03,cy2*0.03);
        drawSun(ctx,W,H,t); drawLightStreaks(ctx,W,H,t,0.5); drawDust(ctx,dustR.current,t,rawDelta,W,H);
        // Earth: huge at departure, shrinks to small by arrival
        const eR4=lerp(H*0.64,H*0.07,prog), eCX4=W*0.10+cx2*0.05, eCY4=H*0.53+cy2*0.05;
        const mP4=clamp((prog-0.06)/0.94,0,1), mR4=lerp(8,H*0.26,mP4), mCX4=W*0.86, mCY4=H*0.46;
        drawEarth(ctx,eCX4,eCY4,eR4,t);
        if(eR4<H*0.25) drawPlanetLabel(ctx,eCX4,eCY4+eR4+14,'EARTH',clamp((H*0.25-eR4)/(H*0.10),0,1));
        drawMars(ctx,mCX4,mCY4,mR4,t); drawPlanetLabel(ctx,mCX4,mCY4+mR4+14,'MARS',mP4);
        drawTrajectory(ctx,eCX4,eCY4,mCX4,mCY4,prog,t);
        drawRocketOnArc(ctx,eCX4,eCY4,mCX4,mCY4,prog,t);
        drawVignette(ctx,W,H,0.52); drawLetterbox(ctx,W,H);
        drawFilmGrain(ctx,W,H);
        drawLabel(ctx,W/2,H*0.052,'EARTH – MARS / CINEMATIC TRANSIT',0.9);
      }

      // Cinematic events
      CINEMATIC_EVENTS.forEach(ev => {
        if (prog>=ev.prog && !shownEvents.current.has(ev.id)) {
          shownEvents.current.add(ev.id); activeEvRef.current=ev; evTimer.current=ev.duration; setActiveEvent(ev);
        }
      });
      if (activeEvRef.current && evTimer.current>0) {
        evTimer.current-=rawDelta;
        const ev=activeEvRef.current;
        const r3=parseInt(ev.color.slice(1,3),16), g3=parseInt(ev.color.slice(3,5),16), b3=parseInt(ev.color.slice(5,7),16);
        const fg=ctx.createRadialGradient(W/2,0,0,W/2,0,H*0.5);
        fg.addColorStop(0,`rgba(${r3},${g3},${b3},0.10)`); fg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=fg; ctx.fillRect(0,0,W,H);
        if (evTimer.current<=0) { activeEvRef.current=null; setActiveEvent(null); }
      }

      if (t-lastUI.current>0.20) {
        lastUI.current=t;
        setMissionSecs(missionT0.current!==null?t-missionT0.current:0);
        setDistToMars(EARTH_MARS_KM*(1-prog));
        setVelocity(Math.round(32500+prog*4800));
      }
      if (pt>=TRANSIT_DUR&&!phaseTrans.current) { phaseTrans.current=true; setPhase('approach'); }
    }

    // ── APPROACH ──────────────────────────────────────────────────────────
    else if (curPhase==='approach') {
      const prog=clamp(pt/APPROACH_DUR,0,1);
      drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t); drawGalaxies(ctx,W,H);
      drawStarLayer(ctx,s0.current,t,1,cx2*0.15,cy2*0.15);
      drawStarLayer(ctx,s1.current,t,1,cx2*0.08,cy2*0.08);
      drawStarLayer(ctx,s2.current,t,1,cx2*0.03,cy2*0.03);
      drawSun(ctx,W,H,t);
      drawMars(ctx,W/2+cx2*0.05,H*0.52+cy2*0.05,lerp(70,H*0.52,prog),t);
      const bA=prog>0.25?clamp((prog-0.25)*2.5,0,1):0;
      drawLabel(ctx,W/2,34,'MARS APPROACH · ORBITAL INSERTION BURN',bA);
      drawVignette(ctx,W,H,0.50);
      if (t-lastUI.current>0.25) {
        lastUI.current=t;
        setMissionSecs(missionT0.current!==null?t-missionT0.current:0);
        setDistToMars(Math.max(0,EARTH_MARS_KM*(1-clamp(1+prog*0.01,0,1))));
        setVelocity(Math.round(lerp(37300,3200,prog)));
      }
      if (pt>=APPROACH_DUR&&!phaseTrans.current) { phaseTrans.current=true; setTimeout(()=>setPhase('arrival'),400); }
    }

    // ── ARRIVAL ───────────────────────────────────────────────────────────
    else if (curPhase==='arrival') {
      drawSpaceBg(ctx,W,H); drawNebula(ctx,W,H,t);
      drawStarLayer(ctx,s0.current,t,1,0,0); drawStarLayer(ctx,s1.current,t,1,0,0);
      drawMars(ctx,W/2,H*0.50,H*0.50,t); drawVignette(ctx,W,H,0.40);
    }
  }, []); // eslint-disable-line

  useGameLoop(tick);

  const inTransit = phase==='transit'||phase==='approach';

  return (
    <div className="mars-scene">
      <canvas ref={canvasRef} className="mars-canvas" />

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

      {/* Cinematic event toast */}
      {activeEvent && (
        <div className="mars-event" style={{borderColor:activeEvent.color}}>
          <div className="mevent-label" style={{color:activeEvent.color}}>{activeEvent.label}</div>
          <div className="mevent-sub">{activeEvent.sub}</div>
        </div>
      )}

      {/* Mode select overlay */}
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

      {/* Arrival */}
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
