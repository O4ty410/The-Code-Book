(function () {
  'use strict';

  window.STUDIO_TEMPLATES = [

    // ── WEBSITE ──────────────────────────────────────────────────────────────

    {
      id: 'portfolio', category: 'website', name: 'Developer Portfolio',
      desc: 'Animated typing, skill tags, CTA button.', icon: '🌐',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--a:#00ff88}
body{background:#090b10;color:#e8eaf0;font-family:'Courier New',monospace;min-height:100vh}
.bg{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:44px 44px;pointer-events:none}
.glow{position:fixed;width:50vw;height:50vw;border-radius:50%;background:radial-gradient(circle,rgba(0,255,136,.07),transparent 70%);top:0;left:-15%;pointer-events:none}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:10vh 8vw}
.tag{font-size:10px;letter-spacing:3px;color:var(--a);margin-bottom:18px;opacity:.7}
.name{font-size:clamp(32px,7vw,68px);font-weight:800;font-family:sans-serif;line-height:1.05;margin-bottom:8px;min-height:1.1em}
.role{font-size:clamp(14px,2.2vw,20px);color:rgba(255,255,255,.4);margin-bottom:20px}
.about{max-width:460px;font-size:13px;line-height:1.8;color:rgba(255,255,255,.5);margin-bottom:32px}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px}
.pill{padding:5px 13px;border:1px solid var(--a);color:var(--a);font-size:10px;letter-spacing:1.5px;border-radius:2px;opacity:.8}
.cta{display:inline-block;padding:13px 28px;background:var(--a);color:#090b10;font-weight:800;font-size:11px;letter-spacing:2px;border:none;font-family:inherit;cursor:pointer}
</style></head><body>
<div class="bg"></div><div class="glow"></div>
<section class="hero">
  <div class="tag">// PORTFOLIO</div>
  <div class="name" id="nm"></div>
  <div class="role" id="rl"></div>
  <div class="about" id="ab"></div>
  <div class="pills" id="sk"></div>
  <button class="cta" id="ct"></button>
</section>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE — make it yours
   ══════════════════════════════════════ */
var NAME   = "Your Name";
var ROLE   = "Aspiring Developer";
var ABOUT  = "Learning to build real things. HTML, CSS, JavaScript — one floor at a time.";
var SKILLS = ["HTML", "CSS", "JavaScript", "Problem Solving"];
var CTA    = "View My Projects →";
var ACCENT = "#00ff88"; // try: #7dd3fc  #f59e0b  #a78bfa  #ff6b6b
/* ══════════════════════════════════════ */

document.documentElement.style.setProperty('--a',ACCENT);
document.getElementById('rl').textContent=ROLE;
document.getElementById('ab').textContent=ABOUT;
document.getElementById('ct').textContent=CTA;
SKILLS.forEach(function(s){var d=document.createElement('div');d.className='pill';d.textContent=s;document.getElementById('sk').appendChild(d);});
var el=document.getElementById('nm'),i=0,blink=true;
(function type(){if(i<NAME.length){el.textContent=NAME.slice(0,++i)+'█';setTimeout(type,60);}else{setInterval(function(){el.textContent=NAME+(blink?'█':'');blink=!blink;},530);}})();
</script></body></html>`
    },

    {
      id: 'launch', category: 'website', name: 'Product Launch Page',
      desc: 'Gradient headline, feature cards, call-to-action.', icon: '🚀',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#06080e;color:#e0e6f0;font-family:sans-serif;min-height:100vh}
.hero{padding:10vh 8vw 6vh;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%,rgba(99,102,241,.18),transparent 65%);pointer-events:none}
.label{font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;color:#6366f1;margin-bottom:20px;opacity:.8}
.headline{font-size:clamp(28px,6vw,58px);font-weight:800;line-height:1.1;margin-bottom:16px;background:linear-gradient(135deg,#e8eaf0 30%,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{font-size:clamp(13px,2vw,16px);color:rgba(255,255,255,.45);max-width:500px;margin:0 auto 36px;line-height:1.7}
.cta{display:inline-block;padding:15px 36px;background:#6366f1;color:#fff;font-weight:700;font-size:13px;letter-spacing:1.5px;border:none;border-radius:4px;cursor:pointer;font-family:inherit}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px;padding:4vh 8vw 8vh;max-width:860px;margin:0 auto}
.card{background:#0e1118;border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:22px 18px}
.card-icon{font-size:26px;margin-bottom:12px}
.card-title{font-weight:700;font-size:14px;margin-bottom:8px}
.card-desc{font-size:12px;color:rgba(255,255,255,.45);line-height:1.6}
.bar{width:28px;height:3px;background:#6366f1;border-radius:2px;margin-bottom:12px}
</style></head><body>
<section class="hero">
  <div class="label" id="lb"></div>
  <div class="headline" id="hl"></div>
  <div class="sub" id="sb"></div>
  <button class="cta" id="ct"></button>
</section>
<div class="features" id="ft"></div>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE — make it yours
   ══════════════════════════════════════ */
var LABEL    = "// INTRODUCING";
var HEADLINE = "Build Something The World Can Use";
var SUB      = "A product built by you. Starting from a blank page. No shortcuts — just code that works.";
var CTA_TEXT = "Get Started Free →";
var FEATURES = [
  { icon: "⚡", title: "Instant Setup",    desc: "Zero config. Open a file and start building." },
  { icon: "🎨", title: "Fully Styled",     desc: "Looks professional from the very first line." },
  { icon: "📱", title: "Works Everywhere", desc: "Responsive by default. Mobile-ready." }
];
/* ══════════════════════════════════════ */

document.getElementById('lb').textContent=LABEL;
document.getElementById('hl').textContent=HEADLINE;
document.getElementById('sb').textContent=SUB;
document.getElementById('ct').textContent=CTA_TEXT;
FEATURES.forEach(function(f){
  var d=document.createElement('div');d.className='card';
  d.innerHTML='<div class="card-icon">'+f.icon+'</div><div class="bar"></div><div class="card-title">'+f.title+'</div><div class="card-desc">'+f.desc+'</div>';
  document.getElementById('ft').appendChild(d);
});
</script></body></html>`
    },

    // ── APP ───────────────────────────────────────────────────────────────────

    {
      id: 'pomodoro', category: 'app', name: 'Pomodoro Timer',
      desc: 'Circular ring, focus and break modes, session count.', icon: '⏱',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--a:#ff6b6b}
body{background:#0c0e14;color:#e8eaf0;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:0;padding:20px}
.modes{display:flex;border:1px solid rgba(255,255,255,.1);border-radius:4px;overflow:hidden;margin-bottom:32px}
.mode{padding:9px 22px;background:none;color:rgba(255,255,255,.4);border:none;font-family:inherit;font-size:11px;letter-spacing:1.5px;cursor:pointer;transition:.15s}
.mode.on{background:var(--a);color:#0c0e14;font-weight:700}
.ring-wrap{position:relative;margin-bottom:28px}
svg{transform:rotate(-90deg)}
.rb{fill:none;stroke:rgba(255,255,255,.06);stroke-width:8}
.rf{fill:none;stroke:var(--a);stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset .95s linear,stroke .4s}
.center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.digits{font-size:clamp(28px,8vw,46px);font-weight:300;font-family:'Courier New',monospace;letter-spacing:2px}
.mode-lbl{font-size:9px;letter-spacing:2px;color:rgba(255,255,255,.3);margin-top:6px}
.btns{display:flex;gap:10px;margin-bottom:20px}
.btn{padding:10px 24px;border:1px solid rgba(255,255,255,.15);background:none;color:#e8eaf0;font-family:inherit;font-size:11px;letter-spacing:1px;cursor:pointer;border-radius:3px}
.btn.primary{background:var(--a);border-color:var(--a);color:#0c0e14;font-weight:700}
.sessions{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:rgba(255,255,255,.25)}
</style></head><body>
<div class="modes">
  <button class="mode on" id="m-f" onclick="setMode('focus')">FOCUS</button>
  <button class="mode" id="m-b" onclick="setMode('break')">BREAK</button>
</div>
<div class="ring-wrap">
  <svg width="176" height="176" viewBox="0 0 176 176">
    <circle class="rb" cx="88" cy="88" r="76"/>
    <circle class="rf" id="ring" cx="88" cy="88" r="76"/>
  </svg>
  <div class="center"><div class="digits" id="dg">25:00</div><div class="mode-lbl" id="ml">FOCUS TIME</div></div>
</div>
<div class="btns">
  <button class="btn primary" id="pb" onclick="toggle()">START</button>
  <button class="btn" onclick="reset()">RESET</button>
</div>
<div class="sessions" id="ss">Sessions completed: 0</div>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE
   ══════════════════════════════════════ */
var FOCUS_MINS  = 25;         // focus duration
var BREAK_MINS  = 5;          // break duration
var FOCUS_COLOR = "#ff6b6b";  // try: #f59e0b  #a78bfa
var BREAK_COLOR = "#00ff88";  // break colour
/* ══════════════════════════════════════ */

var C=2*Math.PI*76,ring=document.getElementById('ring');
ring.style.strokeDasharray=C;ring.style.strokeDashoffset=0;
var mode='focus',running=false,secs=FOCUS_MINS*60,total=FOCUS_MINS*60,sessions=0,iv=null;

function setMode(m){mode=m;running=false;clearInterval(iv);document.getElementById('pb').textContent='START';
  document.getElementById('m-f').classList.toggle('on',m==='focus');document.getElementById('m-b').classList.toggle('on',m==='break');
  total=secs=(m==='focus'?FOCUS_MINS:BREAK_MINS)*60;document.documentElement.style.setProperty('--a',m==='focus'?FOCUS_COLOR:BREAK_COLOR);
  document.getElementById('ml').textContent=m==='focus'?'FOCUS TIME':'BREAK TIME';render();}

function toggle(){if(running){clearInterval(iv);running=false;document.getElementById('pb').textContent='RESUME';}
  else{running=true;document.getElementById('pb').textContent='PAUSE';iv=setInterval(tick,1000);}}

function tick(){if(secs<=0){clearInterval(iv);running=false;if(mode==='focus'){sessions++;document.getElementById('ss').textContent='Sessions completed: '+sessions;}setMode(mode==='focus'?'break':'focus');return;}secs--;render();}

function reset(){clearInterval(iv);running=false;secs=total;document.getElementById('pb').textContent='START';render();}

function render(){var m=Math.floor(secs/60),s=secs%60;document.getElementById('dg').textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;ring.style.strokeDashoffset=C*(1-secs/total);}
render();
</script></body></html>`
    },

    {
      id: 'habits', category: 'app', name: 'Habit Tracker',
      desc: 'GitHub-style grid, click to mark days, streak counter.', icon: '📅',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--a:#4ade80}
body{background:#0a0c10;color:#e8eaf0;font-family:'Courier New',monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.title{font-size:clamp(18px,5vw,26px);font-weight:700;font-family:sans-serif;margin-bottom:4px;text-align:center}
.hint{font-size:10px;letter-spacing:2px;color:rgba(255,255,255,.3);margin-bottom:28px;text-align:center}
.day-labels{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;width:100%;max-width:340px;margin:0 auto 4px}
.dl{text-align:center;font-size:9px;letter-spacing:1px;color:rgba(255,255,255,.25)}
.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;width:100%;max-width:340px;margin:0 auto 24px}
.cell{aspect-ratio:1;border-radius:4px;background:rgba(255,255,255,.06);cursor:pointer;transition:background .15s,transform .1s;border:1px solid transparent}
.cell:hover{border-color:var(--a);transform:scale(1.1)}
.cell.on{background:var(--a)}
.stats{display:flex;gap:28px}
.stat{text-align:center}
.sv{font-size:clamp(22px,6vw,34px);font-weight:700;font-family:sans-serif;color:var(--a)}
.sl{font-size:9px;letter-spacing:2px;color:rgba(255,255,255,.3);margin-top:2px}
</style></head><body>
<div class="title" id="ht"></div>
<div class="hint">Click a day to mark it complete</div>
<div class="day-labels" id="dl"></div>
<div class="grid" id="gd"></div>
<div class="stats">
  <div class="stat"><div class="sv" id="v-s">0</div><div class="sl">STREAK</div></div>
  <div class="stat"><div class="sv" id="v-t">0</div><div class="sl">TOTAL</div></div>
  <div class="stat"><div class="sv" id="v-p">0%</div><div class="sl">RATE</div></div>
</div>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE
   ══════════════════════════════════════ */
var HABIT = "Daily Coding";   // your habit name
var WEEKS = 6;                // weeks to show (4–8)
var COLOR = "#4ade80";        // try: #7dd3fc  #f59e0b  #a78bfa  #ff6b6b
/* ══════════════════════════════════════ */

document.documentElement.style.setProperty('--a',COLOR);
document.getElementById('ht').textContent=HABIT;
['M','T','W','T','F','S','S'].forEach(function(d){var el=document.createElement('div');el.className='dl';el.textContent=d;document.getElementById('dl').appendChild(el);});
var n=WEEKS*7,state=Array(n).fill(false),gd=document.getElementById('gd');
for(var i=0;i<n;i++){(function(i){var c=document.createElement('div');c.className='cell';c.addEventListener('click',function(){state[i]=!state[i];c.classList.toggle('on',state[i]);update();});gd.appendChild(c);})(i);}

function update(){var tot=state.filter(Boolean).length,streak=0;
  for(var i=n-1;i>=0;i--){if(state[i])streak++;else break;}
  document.getElementById('v-s').textContent=streak;document.getElementById('v-t').textContent=tot;document.getElementById('v-p').textContent=Math.round(tot/n*100)+'%';}
update();
</script></body></html>`
    },

    // ── GAME ──────────────────────────────────────────────────────────────────

    {
      id: 'shooter', category: 'game', name: 'Space Shooter',
      desc: 'Arrow keys to move, space to fire. Destroy the asteroids.', icon: '👾',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0}
body{background:#000;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden}
canvas{display:block;max-width:100vw;max-height:100vh}
#msg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:monospace;font-size:16px;color:#fff;text-align:center;pointer-events:none}
</style></head><body>
<canvas id="c"></canvas><div id="msg"></div>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE
   ══════════════════════════════════════ */
var SHIP_COLOR   = "#00ff88";
var BULLET_COLOR = "#ffffff";
var ENEMY_COLOR  = "#ff3050";
var BG_COLOR     = "#000810";
var ENEMY_SPEED  = 1.8;  // 1–4
var BULLET_SPEED = 9;    // 6–14
var FIRE_RATE    = 14;   // lower = faster (8–22)
/* ══════════════════════════════════════ */

var cv=document.getElementById('c'),ctx=cv.getContext('2d');
var W=Math.min(window.innerWidth,420),H=Math.min(window.innerHeight,580);
cv.width=W;cv.height=H;
var px=W/2,py=H-60,pw=28,ph=28;
var bullets=[],enemies=[],parts=[];
var score=0,lives=3,frame=0,over=false,fireT=0;
var keys={};
document.addEventListener('keydown',function(e){keys[e.code]=true;if(['Space','ArrowUp','ArrowLeft','ArrowRight'].indexOf(e.code)>-1)e.preventDefault();});
document.addEventListener('keyup',function(e){keys[e.code]=false;});
var touchX=null;
cv.addEventListener('touchstart',function(e){touchX=e.touches[0].clientX;},{passive:true});
cv.addEventListener('touchmove',function(e){var dx=e.touches[0].clientX-touchX;px=Math.max(pw/2,Math.min(W-pw/2,px+dx*1.2));touchX=e.touches[0].clientX;e.preventDefault();},{passive:false});
cv.addEventListener('touchstart',function(){if(fireT>4){bullets.push({x:px,y:py-ph/2,vy:-BULLET_SPEED});fireT=0;}},{passive:true});

function spawnE(){enemies.push({x:20+Math.random()*(W-40),y:-16,r:11+Math.random()*9,a:Math.random()*6.28,spd:ENEMY_SPEED+Math.random()*.8});}

function drawShip(x,y,col){ctx.save();ctx.strokeStyle=col;ctx.lineWidth=2;ctx.shadowBlur=12;ctx.shadowColor=col;ctx.beginPath();ctx.moveTo(x,y-ph/2);ctx.lineTo(x-pw/2,y+ph/2);ctx.lineTo(x,y+ph/3);ctx.lineTo(x+pw/2,y+ph/2);ctx.closePath();ctx.stroke();ctx.restore();}

function loop(){if(over)return;frame++;
  if(keys['ArrowLeft']||keys['KeyA'])px=Math.max(pw/2,px-5);
  if(keys['ArrowRight']||keys['KeyD'])px=Math.min(W-pw/2,px+5);
  fireT++;if((keys['Space']||keys['ArrowUp'])&&fireT>FIRE_RATE){bullets.push({x:px,y:py-ph/2,vy:-BULLET_SPEED});fireT=0;}
  if(frame%55===0)spawnE();
  bullets=bullets.filter(function(b){b.y+=b.vy;return b.y>-10;});
  enemies=enemies.filter(function(e){e.y+=e.spd;e.a+=.02;
    if(Math.hypot(e.x-px,e.y-py)<pw/2+e.r-4){lives--;if(lives<=0){over=true;document.getElementById('msg').innerHTML='GAME OVER<br><small>Score: '+score+'</small><br><button onclick="location.reload()" style="margin-top:12px;padding:8px 18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.3);color:#fff;cursor:pointer;font-family:monospace;border-radius:3px">RETRY</button>';}for(var i=0;i<8;i++)parts.push({x:e.x,y:e.y,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5,life:25});return false;}
    return e.y<H+20;});
  var hitB=[],hitE=[];
  bullets.forEach(function(b,bi){enemies.forEach(function(e,ei){if(Math.hypot(b.x-e.x,b.y-e.y)<e.r){score+=10;hitB.push(bi);hitE.push(ei);for(var i=0;i<6;i++)parts.push({x:e.x,y:e.y,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4,life:20});}});});
  bullets=bullets.filter(function(_,i){return hitB.indexOf(i)===-1;});
  enemies=enemies.filter(function(_,i){return hitE.indexOf(i)===-1;});
  parts=parts.filter(function(p){p.x+=p.vx;p.y+=p.vy;p.life--;return p.life>0;});
  ctx.fillStyle=BG_COLOR;ctx.fillRect(0,0,W,H);
  for(var s=0;s<2;s++){ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect((frame*.7+s*179)%W,(frame+s*219)%H,1,1);}
  ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='11px monospace';ctx.fillText('SCORE '+score,10,20);ctx.fillText('♥ '.repeat(lives).trim(),W-60,20);
  bullets.forEach(function(b){ctx.save();ctx.fillStyle=BULLET_COLOR;ctx.shadowBlur=8;ctx.shadowColor=BULLET_COLOR;ctx.fillRect(b.x-1.5,b.y-7,3,14);ctx.restore();});
  enemies.forEach(function(e){ctx.save();ctx.strokeStyle=ENEMY_COLOR;ctx.lineWidth=1.5;ctx.shadowBlur=10;ctx.shadowColor=ENEMY_COLOR;ctx.beginPath();for(var i=0;i<6;i++){var ag=e.a+i*Math.PI/3;i===0?ctx.moveTo(e.x+e.r*Math.cos(ag),e.y+e.r*Math.sin(ag)):ctx.lineTo(e.x+e.r*Math.cos(ag),e.y+e.r*Math.sin(ag));}ctx.closePath();ctx.stroke();ctx.restore();});
  parts.forEach(function(p){ctx.save();ctx.globalAlpha=p.life/25;ctx.fillStyle=ENEMY_COLOR;ctx.fillRect(p.x-1.5,p.y-1.5,3,3);ctx.restore();});
  drawShip(px,py,SHIP_COLOR);requestAnimationFrame(loop);}
loop();
</script></body></html>`
    },

    // ── ANIMATION ────────────────────────────────────────────────────────────

    {
      id: 'particles', category: 'animation', name: 'Particle Web',
      desc: 'Floating dots that connect nearby. Reacts to your cursor.', icon: '✨',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>*{margin:0;padding:0}body{background:#07090e;overflow:hidden;height:100vh}canvas{display:block}.lbl{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:rgba(255,255,255,.2);pointer-events:none}</style>
</head><body>
<canvas id="c"></canvas><div class="lbl" id="lb"></div>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE
   ══════════════════════════════════════ */
var COUNT   = 80;           // particles (40–120)
var COLOR   = "#00ff88";    // try: #7dd3fc  #a78bfa  #f59e0b
var CONNECT = 130;          // connection distance (80–180)
var SPEED   = 0.7;          // movement speed (0.3–1.5)
var LABEL   = "";           // optional label at bottom
/* ══════════════════════════════════════ */

document.getElementById('lb').textContent=LABEL;
var cv=document.getElementById('c'),ctx=cv.getContext('2d'),W,H,mouse={x:-999,y:-999};
function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}resize();
window.addEventListener('resize',resize);
document.addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;});
document.addEventListener('touchmove',function(e){mouse.x=e.touches[0].clientX;mouse.y=e.touches[0].clientY;},{passive:true});
var pts=Array.from({length:COUNT},function(){return{x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-.5)*SPEED*2,vy:(Math.random()-.5)*SPEED*2,r:1.5+Math.random()*1.5};});
function loop(){
  ctx.fillStyle='#07090e';ctx.fillRect(0,0,W,H);
  pts.forEach(function(p){var dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.hypot(dx,dy);if(d<120){p.vx+=dx/d*.04;p.vy+=dy/d*.04;}p.vx=Math.max(-SPEED*2,Math.min(SPEED*2,p.vx*.995));p.vy=Math.max(-SPEED*2,Math.min(SPEED*2,p.vy*.995));p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;});
  pts.forEach(function(a,i){pts.slice(i+1).forEach(function(b){var d=Math.hypot(a.x-b.x,a.y-b.y);if(d<CONNECT){ctx.save();ctx.globalAlpha=(1-d/CONNECT)*.5;ctx.strokeStyle=COLOR;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.restore();}});ctx.save();ctx.fillStyle=COLOR;ctx.globalAlpha=.9;ctx.shadowBlur=8;ctx.shadowColor=COLOR;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fill();ctx.restore();});
  requestAnimationFrame(loop);}
loop();
</script></body></html>`
    },

    // ── WIDGET ────────────────────────────────────────────────────────────────

    {
      id: 'dashboard', category: 'widget', name: 'Live Dashboard',
      desc: 'Real-time clock, custom stat cards, dark design.', icon: '📊',
      code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--a:#7dd3fc}
body{background:#070a10;color:#e0e6f0;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;gap:14px}
.card{background:#0d1018;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:24px 28px;width:100%;max-width:340px}
.greeting{font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:rgba(255,255,255,.3);margin-bottom:8px}
.uname{font-size:clamp(18px,5vw,26px);font-weight:700}
.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--a);margin-right:8px;animation:pu 2s ease-in-out infinite}
@keyframes pu{0%,100%{opacity:1}50%{opacity:.25}}
.clock{font-family:'Courier New',monospace;font-size:clamp(32px,9vw,48px);font-weight:300;letter-spacing:4px;color:var(--a);text-align:center}
.date{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:rgba(255,255,255,.3);text-align:center;margin-top:6px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:340px}
.sc{background:#0d1018;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:16px 14px}
.sl{font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:rgba(255,255,255,.3);margin-bottom:8px}
.sv{font-size:clamp(20px,5vw,28px);font-weight:700;color:var(--a)}
.su{font-size:10px;color:rgba(255,255,255,.3);margin-top:2px}
</style></head><body>
<div class="card">
  <div class="greeting">// WELCOME BACK</div>
  <div class="uname" id="un"></div>
</div>
<div class="card" style="text-align:center">
  <div class="clock" id="cl"></div>
  <div class="date" id="dt"></div>
</div>
<div class="grid" id="sg"></div>
<script>
/* ══════════════════════════════════════
   ✏️  EDIT HERE
   ══════════════════════════════════════ */
var YOUR_NAME = "Your Name";
var ACCENT    = "#7dd3fc"; // try: #00ff88  #f59e0b  #a78bfa  #ff6b6b
var STATS = [
  { label: "FLOOR",   value: "1",   unit: "current" },
  { label: "XP",      value: "240", unit: "total"   },
  { label: "STREAK",  value: "3",   unit: "days"    },
  { label: "LESSONS", value: "12",  unit: "done"    }
];
/* ══════════════════════════════════════ */

document.documentElement.style.setProperty('--a',ACCENT);
document.getElementById('un').innerHTML='<span class="dot"></span>'+YOUR_NAME;
STATS.forEach(function(s){var d=document.createElement('div');d.className='sc';d.innerHTML='<div class="sl">'+s.label+'</div><div class="sv">'+s.value+'</div><div class="su">'+s.unit+'</div>';document.getElementById('sg').appendChild(d);});
var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function tick(){var n=new Date(),h=n.getHours(),m=n.getMinutes(),s=n.getSeconds();document.getElementById('cl').textContent=(h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;document.getElementById('dt').textContent=days[n.getDay()]+' · '+n.getDate()+' '+months[n.getMonth()]+' '+n.getFullYear();}
tick();setInterval(tick,1000);
</script></body></html>`
    }

  ];
})();
