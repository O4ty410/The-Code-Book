var isLoggedIn = false;
var isGuest = !!localStorage.getItem('codebook_guest');
let currentFloor = 1;

var sageBubbleTimeout = null;



var sectionGateState = {};
var matchSelected = {};

function matchClick(mid, side, idx) {
  if (side === 'left') {
    var el = document.getElementById('match-l-' + mid + '-' + idx);
    if (!el || el.classList.contains('correct')) return;
    document.querySelectorAll('#' + mid + ' .match-left-item').forEach(function(e) {
      if (!e.classList.contains('correct')) e.classList.remove('selected');
    });
    matchSelected[mid] = (matchSelected[mid] === idx) ? null : idx;
    if (matchSelected[mid] !== null) el.classList.add('selected');
  } else {
    var leftIdx = matchSelected[mid];
    if (leftIdx === null || leftIdx === undefined) return;
    var rightEl = document.getElementById('match-r-' + mid + '-' + idx);
    if (!rightEl || rightEl.classList.contains('correct')) return;
    var pairIdx = parseInt(rightEl.getAttribute('data-pair'));
    if (pairIdx === leftIdx) {
      var leftEl = document.getElementById('match-l-' + mid + '-' + leftIdx);
      if (leftEl) { leftEl.classList.remove('selected'); leftEl.classList.add('correct'); }
      rightEl.classList.add('correct');
      matchSelected[mid] = null;
      var remaining = document.querySelectorAll('#' + mid + ' .match-left-item:not(.correct)');
      if (remaining.length === 0) {
        var done = document.getElementById('match-done-' + mid);
        if (done) done.style.display = 'block';
        awardXP(10, 'match-' + mid, window.innerWidth / 2, 300);
      }
    } else {
      rightEl.classList.add('wrong');
      setTimeout(function() {
        rightEl.classList.remove('wrong');
        document.querySelectorAll('#' + mid + ' .match-left-item').forEach(function(e) {
          if (!e.classList.contains('correct')) e.classList.remove('selected');
        });
        matchSelected[mid] = null;
      }, 600);
    }
  }
}

let state = {
  currentFloor: 1,
  currentSection: 0,
  completed: {},
  quizAnswered: {},
  quizMultiState: {},
  totalSeconds: 0,
  sessionLog: [],
  xp: 0,
  streak: 0,
  lastVisit: null,
  xpAwarded: {},
  timerRunning: false,
  timerSeconds: 25 * 60,
  timerInterval: null,
  sessionSeconds: 0,
  sectionStartTime: null,

  codeCanvasOpacity: 100,
  narratorGender: 'female',
  autoScroll: false,
  floorRestBreak: null,
  challengesDone: {},
  streakProtectedToday: false,
  revKnown: {},
  srsData: {},
  currentTrack: null,
  earnedBadges: [],
  badgeFlags: {},
  checklistDone: {}
};
state.playerName = localStorage.getItem("codebook_player_name") || null;

function loadState() {
  try {
    const saved = localStorage.getItem('codebook_v1');
    if (saved) {
      const s = JSON.parse(saved);
      state.currentFloor = s.currentFloor || 1;
      state.currentSection = parseInt(s.currentSection) || 0;
      state.completed = s.completed || {};
      state.quizAnswered = s.quizAnswered || {};
      state.quizMultiState = s.quizMultiState || {};
      state.totalSeconds = s.totalSeconds || 0;
      state.sessionLog = s.sessionLog || [];
      state.xp = s.xp || 0;
      state.streak = s.streak || 0;
      state.lastVisit = s.lastVisit || null;
      state.xpAwarded = s.xpAwarded || {};
      state.checklistDone = s.checklistDone || {};
      state.codeCanvasOpacity = (s.codeCanvasOpacity !== undefined) ? s.codeCanvasOpacity : 100;
      state.narratorGender = s.narratorGender || 'female';
      state.autoScroll = !!s.autoScroll;
      state.floorRestBreak = s.floorRestBreak || null;
      state.challengesDone = s.challengesDone || {};
      state.streakProtectedToday = s.streakProtectedToday || false;
      state.revKnown = s.revKnown || {};
      state.srsData  = s.srsData  || {};
      state.earnedBadges = s.earnedBadges || [];
      state.badgeFlags = s.badgeFlags || {};
      state.currentTrack = s.currentTrack || null;
    }
  }  catch(e) {}
}

function pruneCodeCache() {
  // Remove saved code for sections already marked complete to free storage space
  Object.keys(localStorage)
    .filter(function(k) { return k.startsWith('code_'); })
    .forEach(function(k) {
      var sid = k.slice(5);
      if (state.completed && state.completed[sid]) localStorage.removeItem(k);
    });
}

function saveState() {
  var payload = JSON.stringify({
    currentFloor: state.currentFloor,
    currentSection: state.currentSection,
    completed: state.completed,
    quizAnswered: state.quizAnswered,
    quizMultiState: state.quizMultiState || {},
    totalSeconds: state.totalSeconds,
    sessionLog: state.sessionLog,
    xp: state.xp,
    streak: state.streak,
    lastVisit: state.lastVisit,
    xpAwarded: state.xpAwarded,
    checklistDone: state.checklistDone || {},
    codeCanvasOpacity: state.codeCanvasOpacity !== undefined ? state.codeCanvasOpacity : 100,
    narratorGender: state.narratorGender || 'female',
    autoScroll: !!state.autoScroll,
    floorRestBreak: state.floorRestBreak || null,
    challengesDone: state.challengesDone || {},
    streakProtectedToday: state.streakProtectedToday || false,
    revKnown: state.revKnown || {},
    srsData:  state.srsData  || {},
    earnedBadges: state.earnedBadges || [],
    badgeFlags: state.badgeFlags || {}
  });
  try {
    localStorage.setItem('codebook_v1', payload);
  } catch(e) {
    // Quota exceeded — prune completed-section code caches and retry once
    pruneCodeCache();
    try { localStorage.setItem('codebook_v1', payload); } catch(e2) {}
  }
}



let currentUser = null;
let authMode = 'login';

function togglePasswordVisibility(inputId, btn) {
  var input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '\uD83D\uDE48'; // \uD83D\uDE48
    btn.title = 'Hide password';
  } else {
    input.type = 'password';
    btn.textContent = '\uD83D\uDC41'; // \uD83D\uDC41
    btn.title = 'Show password';
  }
}


function showAuthFromLanding() {
  loadState();
  if (isLoggedIn) {
    // Authenticated logged-in user — go straight into the app
    var _streakExtended = updateStreak();
    stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('app').style.display = 'block';
    applyTheme();
    launchApp();
    if (_streakExtended && state.streak >= 2) {
      setTimeout(function() { showStreakWelcome(state.streak); }, 1400);
    }
    updateChallengeDot();
  } else {
    // Guest or new user — always show onboarding or auth screen
    stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
    const hasOnboarded = localStorage.getItem('codebook_onboarded');
    if (!hasOnboarded) {
      showOnboarding();
    } else {
      document.getElementById('auth-screen').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
}
function switchTab(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (mode === 'login' && i === 0) || (mode === 'signup' && i === 1));
  });
  document.getElementById('auth-submit').textContent = mode === 'login' ? 'Sign In' : 'Create Account';
  document.getElementById('auth-message').textContent = '';
  const usernameField = document.getElementById('auth-username');
  if (usernameField) usernameField.style.display = mode === 'signup' ? 'block' : 'none';
  const forgotLink = document.getElementById('forgot-link');
  if (forgotLink) forgotLink.style.display = mode === 'signup' ? 'none' : 'block';
}

async function showLeaderboard() {
  var overlay = document.getElementById('leaderboard-overlay');
  overlay.style.display = 'flex';
  var list = document.getElementById('leaderboard-list');
  list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">Loading...</div>';
  try {
    if (!window.sb) throw new Error('no client');
    var result = await window.sb.from('profiles').select('username,xp,streak').order('xp', { ascending: false }).limit(20);
    var rows = result.data;
    if (!rows || rows.length === 0) {
      list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">No entries yet. Be the first!</div>';
      return;
    }
    var medals = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
    list.innerHTML = rows.map(function (r, i) {
      return '<div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface);border:1px solid ' + (i === 0 ? '#c8a96e' : i === 1 ? '#aaaaaa' : i === 2 ? '#cd7f32' : 'var(--border)') + ';border-radius:10px;' + (i === 0 ? 'box-shadow:0 0 20px rgba(200,169,110,0.15);' : '') + '">' +
        '<div style="font-size:' + (i < 3 ? '24px' : '14px') + ';width:36px;text-align:center;font-family:\'IBM Plex Mono\',monospace;color:var(--text-muted);">' + (medals[i] || (i + 1)) + '</div>' +
        '<div style="flex:1;"><div style="font-family:\'Lato\',sans-serif;font-weight:700;color:var(--text);font-size:15px;">' + (r.username || 'Anonymous') + '</div>' +
        '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;color:var(--floor3);margin-top:4px;">\uD83D\uDD25 ' + (r.streak || 0) + ' day streak</div></div>' +
        '<div style="text-align:right;"><div style="font-family:\'IBM Plex Mono\',monospace;font-size:18px;color:var(--accent);font-weight:700;">' + (r.xp || 0) + '</div>' +
        '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:9px;color:var(--text-muted);letter-spacing:1px;">XP</div></div></div>';
    }).join('');
  } catch (e) {
    list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">Could not load leaderboard.</div>';
  }
}

function hideLeaderboard() {
  document.getElementById('leaderboard-overlay').style.display = 'none';
}

function showResetForm(token) {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('app').style.display = 'none';
  const overlay = document.getElementById('reset-overlay');
  overlay.style.display = 'flex';
  overlay.dataset.token = token;
}

async function submitNewPassword() {
  const password = document.getElementById('reset-password').value;
  const confirm = document.getElementById('reset-password-confirm').value;
  const msg = document.getElementById('reset-message');
  const token = document.getElementById('reset-overlay').dataset.token;

  if (!password || password.length < 6) {
    msg.textContent = 'Password must be at least 6 characters.';
    msg.className = 'auth-message error';
    return;
  }
  if (password !== confirm) {
    msg.textContent = 'Passwords do not match.';
    msg.className = 'auth-message error';
    return;
  }

  msg.textContent = 'Updating password...';
  msg.className = 'auth-message';

  if (!window.sb) return;
  var result = await window.sb.auth.updateUser({ password: password });
  if (result.error) {
    msg.textContent = result.error.message;
    msg.className = 'auth-message error';
  } else {
    msg.textContent = 'Password updated! Signing you in...';
    msg.className = 'auth-message';
    setTimeout(function () {
      document.getElementById('reset-overlay').style.display = 'none';
    }, 1500);
  }
}

function populateDashboard() {
  // Apply saved profile colour theme to body on startup
  applyProfThemeToBody(getProfTheme());
  // Apply saved cover screen theme (independent from app theme)
  applyCoverTheme(getCoverTheme());

  // Go straight to auth/app — no landing screen
  showAuthFromLanding();
  var cover = document.getElementById('cover');
  if (cover) cover.style.display = 'none';
}

function trackDailySection() {
  const today = new Date().toDateString();
  const todayKey = 'daily_sections_' + (today) + '';
  const current = parseInt(localStorage.getItem(todayKey) || '0');
  const newCount = current + 1;
  localStorage.setItem(todayKey, newCount);

  const dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal') || '2');
  if (newCount === dailyGoal) {
    setTimeout(() => showSessionComplete(newCount), 1200);
  }
}

let sessionXpStart = 0;

function showSessionComplete(sectionsToday) {
  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  const fi = state.currentFloor - 1;
  const si = state.currentSection;
  const floor = FLOORS[fi];
  const nextSi = si + 1;
  const nextSection = floor?.sections[nextSi];
  const nextFloor = FLOORS[fi + 1];

  let tomorrowText = '';
  if (nextSection) tomorrowText = nextSection.title;
  else if (nextFloor) tomorrowText = 'Start of ' + (nextFloor.title) + '';
  else tomorrowText = 'You\'ve completed the entire curriculum!';

  const greetings = [
    "That's a session, " + (name || "friend") + ".",
    "Well done today" + (name ? ", " + name : "") + ".",
    "Another day done" + (name ? ", " + name : "") + ".",
    "Consistent" + (name ? ", " + name : "") + ". That's everything."
  ];

  const xpToday = state.xp - (sessionXpStart || 0);

  document.getElementById('session-title').textContent = greetings[Math.floor(Math.random() * greetings.length)];
  document.getElementById('session-message').textContent = 'Your daily goal is done. Come back tomorrow and keep the momentum going.';
  document.getElementById('session-xp-earned').textContent = '+' + (Math.max(0, xpToday)) + '';
  document.getElementById('session-streak').textContent = '' + (state.streak) + '\uD83D\uDD25';
  document.getElementById('session-sections').textContent = sectionsToday;
  document.getElementById('session-tomorrow').textContent = tomorrowText;
  document.getElementById('session-complete').style.display = 'flex';
}

function closeSessionComplete(done) {
  document.getElementById('session-complete').style.display = 'none';
  if (done) {
    document.getElementById('app').style.display = 'none';
    populateDashboard();
  }
}

function showPrivacy() {
  document.getElementById('privacy-overlay').style.display = 'flex';
}

function hidePrivacy() {
  document.getElementById('privacy-overlay').style.display = 'none';
}

function showTerms() {
  document.getElementById('terms-overlay').style.display = 'flex';
}

function hideTerms() {
  document.getElementById('terms-overlay').style.display = 'none';
}

async function handleForgotPassword() {
  var email = document.getElementById('auth-email').value.trim();
  var msg = document.getElementById('auth-message');
  if (!email) {
    msg.textContent = 'Enter your email address first.';
    msg.className = 'auth-message error';
    return;
  }
  if (!window.sb) return;
  var result = await window.sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname + '?reset=true'
  });
  if (result.error) {
    msg.textContent = result.error.message;
    msg.className = 'auth-message error';
  } else {
    msg.textContent = 'Password reset email sent! Check your inbox.';
    msg.className = 'auth-message';
  }
}

function continueAsGuest() {
  loadState();
  updateStreak();
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('cover').style.display = 'flex';
  const coverUser = document.getElementById('cover-user');
  if (coverUser) coverUser.style.display = 'none';
  populateDashboard();
}

async function handleAuth() {
  var email = document.getElementById('auth-email').value.trim();
  var password = document.getElementById('auth-password').value;
  var msg = document.getElementById('auth-message');
  var btn = document.getElementById('auth-submit');
  if (!email || !password) {
    msg.textContent = 'Please enter your email and password.';
    msg.className = 'auth-message error';
    return;
  }
  btn.disabled = true;
  btn.textContent = authMode === 'login' ? 'Signing in...' : 'Creating account...';
  msg.textContent = '';
  msg.className = 'auth-message';
  try {
    var result;
    if (authMode === 'signup') {
      var username = (document.getElementById('auth-username').value || '').trim() || email.split('@')[0];
      result = await window.sb.auth.signUp({ email: email, password: password, options: { data: { username: username } } });
    } else {
      result = await window.sb.auth.signInWithPassword({ email: email, password: password });
    }
    if (result.error) {
      msg.textContent = result.error.message;
      msg.className = 'auth-message error';
      btn.disabled = false;
      btn.textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
      return;
    }
    if (authMode === 'signup' && !result.data.session) {
      msg.textContent = 'Check your email to confirm your account, then sign in.';
      msg.className = 'auth-message';
      btn.disabled = false;
      btn.textContent = 'Create Account';
    }
    // onAuthStateChange handles the rest
  } catch (e) {
    msg.textContent = 'Something went wrong. Please try again.';
    msg.className = 'auth-message error';
    btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
  }
}

async function onUserLoggedIn() {
  isLoggedIn = true;
  loadState();
  updateStreak();
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

async function saveToSupabase() {
  if (!window.sb || !window.currentUser) return;
  try {
    await window.sb.from('profiles').upsert({
      id: window.currentUser.id,
      xp: state.xp,
      level: state.level,
      streak: state.streak,
      last_active: new Date().toISOString().split('T')[0]
    });
  } catch (e) {}
}

async function loadUserFromSupabase(user) {
  if (!window.sb) return;
  try {
    var profileRes = await window.sb.from('profiles').select('*').eq('id', user.id).single();
    if (profileRes.data) {
      var p = profileRes.data;
      state.xp = p.xp || 0;
      state.level = p.level || 1;
      state.streak = p.streak || 0;
    }
    var progressRes = await window.sb.from('user_progress').select('section_id').eq('user_id', user.id);
    if (progressRes.data) {
      progressRes.data.forEach(function (r) { state.completed[r.section_id] = true; });
    }
    saveState();
  } catch (e) {
    console.warn('[CodeBook] Could not load profile:', e);
  }
}

function markSectionComplete(sectionId) {
  if (!window.sb || !window.currentUser) return;
  window.sb.from('user_progress').upsert({ user_id: window.currentUser.id, section_id: sectionId }).then(function () {});
  saveToSupabase();
}

async function signInWithGoogle() {
  if (!window.sb) return;
  await window.sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
}

async function signOut() {
  var confirmed = window.confirm('Sign out? Your local progress will be cleared. This cannot be undone.');
  if (!confirmed) return;
  stopAllGameMusic();
  await saveToSupabase();
  if (window.sb) await window.sb.auth.signOut();
  currentUser = null;
  isLoggedIn = false;
  localStorage.removeItem('codebook_user');
  localStorage.removeItem('codebook_v1');
  localStorage.removeItem('codebook_guest');
  document.getElementById('user-bar').style.display = 'none';
  document.getElementById('app').style.display = 'none';
  var ag = document.querySelector('.app-grid'); if (ag) ag.style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  var _cu = document.getElementById('cover-user'); if (_cu) _cu.style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('auth-email').value = '';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-message').textContent = '';
}

// \u2500\u2500\u2500 GLOBAL ERROR HANDLER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
window.addEventListener('error', function(e) {
});
window.addEventListener('unhandledrejection', function(e) {
});
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'QUIT_TO_HUB') {
    renderGamePanel();
  }
});
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

window.addEventListener('load', async () => {

  // Check for password reset token in URL
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', '?'));
  const accessToken = params.get('access_token');
  const type = params.get('type');

  if (accessToken && type === 'recovery') {
    showResetForm(accessToken);
    return;
  }

  populateDashboard();
});

// --- XP + LEVEL + STREAK SYSTEM ---

const LEVELS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 200 },
  { level: 3, xp: 500 },
  { level: 4, xp: 900 },
  { level: 5, xp: 1500 },
  { level: 6, xp: 2300 },
  { level: 7, xp: 3400 },
  { level: 8, xp: 4700 },
  { level: 9, xp: 6000 }
];

function getStreakMultiplier() {
  if (state.streak >= 10) return 2;
  if (state.streak >= 6)  return 1.5;
  if (state.streak >= 3)  return 1.2;
  return 1;
}

function getCurrentLevel() {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (state.xp >= l.xp) current = l;
  }
  return current;
}

function getNextLevel() {
  const cur = getCurrentLevel();
  return LEVELS.find(l => l.level === cur.level + 1) || null;
}

function getSectionXP(fi) {
  var byFloor = [20, 28, 40, 50, 65, 80, 100];
  return byFloor[fi] !== undefined ? byFloor[fi] : 20;
}

function getFloorXP(fi) {
  var byFloor = [100, 150, 225, 300, 375, 475, 600];
  return byFloor[fi] !== undefined ? byFloor[fi] : 100;
}

function awardXP(amount, key, x, y) {
  if (key && state.xpAwarded[key]) return;
  const multiplier = getStreakMultiplier();
  const earned = Math.round(amount * multiplier);
  const prevLevel = getCurrentLevel().level;
  state.xp += earned;
  if (key) state.xpAwarded[key] = true;
  saveState();
  updateXPPanel();
  showFloatingXP('+' + (earned) + ' XP', x, y);
  const newLevel = getCurrentLevel().level;
  if (newLevel > prevLevel) showLevelUp(newLevel);
}

function showFloatingXP(text, x, y) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = text;
  el.style.left = (x || window.innerWidth / 2) + 'px';
  el.style.top = (y || 200) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function showLevelUp(level) {
  const overlay = document.createElement('div');
  overlay.className = 'levelup-overlay';
  overlay.innerHTML = `
    <div class="levelup-title">Level ${level}</div>
    <div class="levelup-sub">YOU JUST LEVELLED UP</div>
    <button class="levelup-btn" onclick="this.parentElement.remove()">Keep Going</button>
  `;
  document.body.appendChild(overlay);
}

function updateXPPanel() {
  const panel = document.getElementById('xp-panel');
  if (panel) panel.style.display = state.xp > 0 ? 'flex' : 'none';
  const cur = getCurrentLevel();
  const next = getNextLevel();
  const xpEl = document.getElementById('current-xp');
  const lvlEl = document.getElementById('current-level');
  const fillEl = document.getElementById('level-fill');
  const nextEl = document.getElementById('xp-to-next');
  const streakEl = document.getElementById('streak-count');
  if (xpEl) xpEl.textContent = state.xp;
  if (lvlEl) lvlEl.textContent = cur.level;
  if (streakEl) streakEl.textContent = state.streak;
  if (next) {
    const range = next.xp - cur.xp;
    const progress = state.xp - cur.xp;
    const pct = Math.min(100, Math.round((progress / range) * 100));
    if (fillEl) fillEl.style.width = pct + '%';
    if (nextEl) nextEl.textContent = next.xp - state.xp;
  } else {
    if (fillEl) fillEl.style.width = '100%';
    if (nextEl) nextEl.textContent = 'MAX';
  }

  // Sync new layout sidebar
  if (typeof updateTopChips === 'function') updateTopChips();
  if (typeof updateLeftStats === 'function') updateLeftStats();
}
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastVisit === today) return false;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  var extended = false;
  if (state.lastVisit === yesterday) {
    state.streak += 1;
    state.streakProtectedToday = false; // reset for new day
    extended = true;
  } else if (state.lastVisit !== null) {
    state.streak = 0;
    state.streakProtectedToday = false;
  }
  state.lastVisit = today;
  saveState();
  return extended;
}

function markStreakProtected() {
  if (state.streakProtectedToday) return;
  state.streakProtectedToday = true;
  saveState();
  if (state.streak >= 1) showStreakToast(state.streak);
}

function showStreakToast(days) {
  var existing = document.getElementById('streak-toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.id = 'streak-toast';
  var emoji = days >= 30 ? '\ud83c\udfc6' : days >= 14 ? '\u26a1' : days >= 7 ? '\ud83d\udd25' : '\ud83d\udd25';
  var msg = days === 1 ? 'Streak started! Come back tomorrow.' :
            days < 7  ? days + ' day streak \u2014 keep going.' :
            days < 14 ? days + ' day streak \u2014 you\'re building a habit.' :
            days < 30 ? days + ' day streak \u2014 exceptional consistency.' :
                        days + ' day streak \u2014 you\'re unstoppable.';
  toast.innerHTML =
    '<div class="streak-toast-icon">' + emoji + '</div>' +
    '<div class="streak-toast-text"><strong>' + msg + '</strong>' +
    '<div class="streak-toast-sub">Streak protected for today.</div></div>' +
    '<button class="streak-toast-close" onclick="this.parentElement.remove()">\u00d7</button>';
  toast.className = 'streak-toast';
  document.body.appendChild(toast);
  setTimeout(function() { if (toast.parentElement) toast.remove(); }, 5000);
}

function showStreakWelcome(days) {
  var existing = document.getElementById('streak-toast');
  if (existing) existing.remove();
  var isMilestone = days === 7 || days === 14 || days === 30 || days === 50 || days === 100;
  var emoji = days >= 30 ? '🏆' : days >= 14 ? '⚡' : days >= 7 ? '🔥' : '🔥';
  var msg = days < 7   ? days + ' day streak — welcome back!' :
            days < 14  ? days + ' day streak — you\'re building a habit!' :
            days < 30  ? days + ' day streak — exceptional consistency!' :
                         days + ' day streak — you\'re unstoppable!';
  var toast = document.createElement('div');
  toast.id = 'streak-toast';
  toast.className = 'streak-toast' + (isMilestone ? ' streak-toast--milestone' : '');
  toast.innerHTML =
    '<div class="streak-toast-icon">' + emoji + '</div>' +
    '<div class="streak-toast-text"><strong>' + msg + '</strong>' +
    '<div class="streak-toast-sub">Keep the momentum going today.</div></div>' +
    '<button class="streak-toast-close" onclick="this.parentElement.remove()">×</button>';
  document.body.appendChild(toast);
  // Pulse the sidebar streak counter
  var sc = document.getElementById('streak-count');
  if (sc) {
    sc.classList.remove('streak-pulse');
    void sc.offsetWidth;
    sc.classList.add('streak-pulse');
    setTimeout(function() { sc.classList.remove('streak-pulse'); }, 1200);
  }
  setTimeout(function() { if (toast.parentElement) toast.remove(); }, 6000);
}

function startSectionTimer(sectionId) {
  state.sectionStartTime = Date.now();
}


function updateTimeLog() {
  const el = document.getElementById('time-log');
  if (!el) return;
  const total = formatTime(state.totalSeconds);
  const sessions = state.sessionLog.length;
  el.innerHTML = '<span>' + (total) + ' total</span><span>' + (sessions) + ' session' + (sessions !== 1 ? 's' : '') + '</span>';
}
  function checkOnboarding() {
  const hasOnboarded = localStorage.getItem('codebook_onboarded');

  if (!hasOnboarded) {
    showOnboarding();
    return;
  }
}



const today = new Date().toDateString();

function startBook() {
  loadState();
  updateStreak();
  document.getElementById('cover').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

function launchApp() {
  // Snapshot XP at session start so the end-of-session screen shows
  // only XP earned this session, not all-time XP.
  sessionXpStart = state.xp;

  // Hide the landing screen and cover
  var landing = document.getElementById('new-user-landing');
  if (landing) landing.style.display = 'none';

  var cover = document.getElementById('cover');
  if (cover) cover.style.display = 'none';

  // Hide auth screen
  var authScreen = document.getElementById('auth-screen');
  if (authScreen) authScreen.style.display = 'none';

  // Show the app grid
  var appGrid = document.querySelector('.app-grid');
  if (appGrid) appGrid.style.display = 'grid';

  // Show mobile bottom bar
  var mobileBar = document.getElementById('mobile-bottom-bar');
  if (mobileBar) mobileBar.style.display = '';

  // Apply saved canvas opacity
  _hubCanvasOpacity = (state.codeCanvasOpacity !== undefined ? state.codeCanvasOpacity : 100) / 100;

  // Render content
  renderNav();
  if (typeof isMobile === 'function' && isMobile()) {
    if (typeof renderMobileHub === 'function') renderMobileHub();
  } else {
    renderLearnHub();
  }
  updateTimeLog();
  updateXPPanel();

  // Wire up new layout sidebars
  setTimeout(function() {
    renderAllNav();
    patchRenderNav();
    updateAchievements();
    updateChallengeDot();
    updateDailyGoalBar();
    updateLeftStats();
    updateTopChips();
    if (!localStorage.getItem('codebook_tour_done')) setTimeout(showAppTour, 1200);
  }, 80);
}
// --- ONBOARDING SYSTEM ---
let onboardingData = { name: '', experience: '', time: '' };

function showOnboarding() {
  document.getElementById('onboarding').style.display = 'flex';
}

function onboardingNext(step) {
  if (step === 1) {
    const name = document.getElementById('onboarding-name').value.trim();
    if (!name) return;
    onboardingData.name = name;
    state.playerName = name;
    document.getElementById('onboarding-step-1').style.display = 'none';
    document.getElementById('onboarding-step-2').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Nice to meet you, ' + (name) + '.';
    document.getElementById('onboarding-body').textContent = 'Let me understand where you\'re starting from.';
    var _obp = document.getElementById('ob-progress'); if (_obp) _obp.textContent = '02 / 03';
  }
}

function onboardingSelect(field, value) {
  onboardingData[field] = value;
  if (field === 'experience') {
    document.getElementById('onboarding-step-2').style.display = 'none';
    document.getElementById('onboarding-step-3').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Almost there.';
    document.getElementById('onboarding-body').textContent = 'Last question \u2014 and then we begin.';
    var _obp2 = document.getElementById('ob-progress'); if (_obp2) _obp2.textContent = '03 / 03';
  } else if (field === 'goal') {
    onboardingData.goal = value;
    localStorage.setItem('codebook_goal', value);

    document.getElementById('onboarding-step-3').style.display = 'none';
    document.getElementById('onboarding-step-4').style.display = 'block';
    var _obp3 = document.getElementById('ob-progress'); if (_obp3) _obp3.style.visibility = 'hidden';

    const messages = {
      never: { title: 'You\'re in the right place, ' + onboardingData.name + '.', msg: 'Starting from zero is actually an advantage. No bad habits to unlearn. We\'ll build everything from the ground up, one clear step at a time.' },
      tried: { title: 'This time will be different, ' + onboardingData.name + '.', msg: 'Whatever stopped you before \u2014 the overwhelm, the confusion, the loss of momentum \u2014 this was built specifically for that. Sage is here every time you get stuck.' },
      some:  { title: 'Good. Let\'s build on that, ' + onboardingData.name + '.', msg: 'You\'ve got a foundation. Now we give it structure. Work at your own pace \u2014 skip ahead if something\'s easy, slow down when it\'s not.' }
    };

    const goalMessages = {
      job:       'Your goal is clear. By the end of this, you\'ll have the foundations employers actually look for.',
      project:   'The best reason to learn. Every section moves you closer to building something real.',
      understand:'That\'s a great place to start. Understanding is the foundation everything else is built on.',
      unsure:    'That\'s fine. Most people start there. Keep going and it\'ll become clear.'
    };

    const m = messages[onboardingData.experience] || messages.never;
    document.getElementById('onboarding-welcome').textContent = m.title;
    document.getElementById('onboarding-message').textContent = goalMessages[value] + ' ' + m.msg;
  }
}

function finishOnboarding() {
  localStorage.setItem('codebook_onboarded', 'true');
  localStorage.setItem('codebook_player_name', onboardingData.name);
  state.playerName = onboardingData.name;
  document.getElementById('onboarding').style.display = 'none';
  if (localStorage.getItem('codebook_guest')) {
    startAsGuest();
    setTimeout(showAppTour, 800);
  } else {
    document.getElementById('auth-screen').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

var _tourSteps = [
  {
    type: 'welcome',
    icon: '📖',
    title: 'Welcome to The Code Book.',
    body: 'This started as a personal project — built out of frustration with how coding is usually taught. Most resources either assume too much or explain too little. The confusion isn\'t you. It\'s the material.\n\nThe Code Book is for anyone starting from nothing who wants to understand how this actually works. No skipped steps. No pressure. Just a clear, honest path.\n\nThank you for taking part. It genuinely means something.'
  },
  {
    icon: '🏗️',
    title: 'Seven floors. Zero to professional.',
    body: 'Each floor builds on the last — from how computers think, all the way to building full-stack apps. You unlock the next floor when the current one is complete.'
  },
  {
    icon: '🔊',
    title: 'Let Sage read it to you.',
    body: 'Every section has a Listen button. Tap it and Sage narrates the material — great for when you\'d rather absorb than read. You can pause and resume at any time.'
  },
  {
    icon: '🃏',
    title: 'Revision cards that remember for you.',
    body: 'After each floor, revision cards test what you learned. The app tracks which concepts are shaky and brings them back at the right time — so you actually retain what you study.'
  },
  {
    icon: '🔥',
    title: 'Build a daily habit.',
    body: 'Complete sections each day to keep your streak. Set your daily goal in the sidebar — even one section a day compounds into real understanding over time.'
  }
];

function showAppTour() {
  if (localStorage.getItem('codebook_tour_done')) return;
  var step = 0;
  function render() {
    var existing = document.getElementById('app-tour-overlay');
    if (existing) existing.remove();
    var s = _tourSteps[step];
    var isLast = step === _tourSteps.length - 1;
    var el = document.createElement('div');
    el.id = 'app-tour-overlay';
    el.className = 'app-tour-overlay';
    var isWelcome = s.type === 'welcome';
    var featureCount = _tourSteps.length - 1;
    var stepLabel = isWelcome ? 'Welcome' : step + ' of ' + featureCount;
    var btnLabel = isWelcome ? 'Get started →' : (isLast ? 'Start learning →' : 'Next →');
    var bodyHtml = escHtml(s.body).replace(/\n\n/g, '</p><p class="app-tour-body-p">');
    el.innerHTML =
      '<div class="app-tour-card' + (isWelcome ? ' app-tour-welcome' : '') + '">' +
        '<button class="app-tour-skip" onclick="dismissAppTour()">Skip</button>' +
        '<div class="app-tour-icon">' + s.icon + '</div>' +
        '<div class="app-tour-step">' + stepLabel + '</div>' +
        '<div class="app-tour-title">' + escHtml(s.title) + '</div>' +
        '<div class="app-tour-body"><p class="app-tour-body-p">' + bodyHtml + '</p></div>' +
        '<div class="app-tour-dots">' +
          _tourSteps.map(function(_, i) { return '<div class="app-tour-dot' + (i === step ? ' active' : '') + '"></div>'; }).join('') +
        '</div>' +
        '<button class="app-tour-next" onclick="appTourNext()">' + btnLabel + '</button>' +
      '</div>';
    document.body.appendChild(el);
    requestAnimationFrame(function() { el.classList.add('app-tour-visible'); });
  }
  window.appTourNext = function() {
    step++;
    if (step >= _tourSteps.length) { dismissAppTour(); return; }
    var card = document.querySelector('.app-tour-card');
    if (card) { card.classList.add('app-tour-slide-out'); setTimeout(render, 220); }
    else render();
  };
  window.dismissAppTour = function() {
    localStorage.setItem('codebook_tour_done', '1');
    var el = document.getElementById('app-tour-overlay');
    if (el) { el.classList.remove('app-tour-visible'); setTimeout(function() { if (el.parentNode) el.remove(); }, 300); }
  };
  render();
}

const FLOOR_MESSAGES = [
  { icon: '\uD83C\uDF93', sage: 'You now understand what the internet is, how computers read instructions, and the logic behind every program ever written. Most people who try to learn to code never properly understand these things. You do. That is not nothing.' },
  { icon: '\uD83C\uDFA8', sage: 'HTML describes what content is. CSS controls how it looks. The browser renders both. You\'ve built real pages that look the way you intended. The visual web is no longer something that happens to you \u2014 it\'s something you make.' },
  { icon: '\u26A1', sage: 'JavaScript. Events. The DOM. Functions that respond to the world. This is where most learners stop \u2014 it gets hard and they step back. You didn\'t. Everything from here is built on what you just proved you can do.' },
  { icon: '\uD83D\uDD28', sage: 'No scaffold. No step-by-step. A brief and a blank editor. You produced working code. That is the developer mindset \u2014 not knowing everything, but knowing how to figure it out. That skill is permanent.' },
  { icon: '\uD83C\uDF10', sage: 'Frontend. Backend. Database. Authentication. Deployment. You built the whole thing. Full stack is a title people throw around loosely. You\'ve now earned the right to use it precisely.' },
  { icon: '\uD83C\uDFAF', sage: 'The fork in the road is behind you. You chose a direction and went deep enough to become genuinely valuable in it. Generalists are useful. Specialists are sought after. You know which you\'re becoming.' },
  { icon: '\uD83C\uDFC6', sage: 'Floor 7. You started from nothing and you built your way here. Every floor, every section, every debugging session at midnight \u2014 that distance is yours. Nobody can take the understanding back out of your head.' }
];

function showFloorCelebration(floorIndex, newBadges) {
  newBadges = newBadges || [];
  var floor = FLOORS[floorIndex];
  var msg = FLOOR_MESSAGES[floorIndex];
  var name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  var nextFloor = FLOORS[floorIndex + 1] || null;
  var floorColor = floor.color || '#c8a96e';

  // Calculate floor stats
  var sectionsTotal = floor.sections.length;
  var sectionsCompleted = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
  var xpOnFloor = floor.sections.reduce(function(sum, s) {
    return sum + (state.xpAwarded['complete-' + s.id] ? getSectionXP(floorIndex) : 0);
  }, 0) + (state.xpAwarded['floor-' + floorIndex] ? getFloorXP(floorIndex) : 0);
  var level = getCurrentLevel().level;

  var el = document.getElementById('floor-celebration');
  el.innerHTML =
    '<div class="fc-overlay" style="--fc-color:' + floorColor + '">' +
      // Hero
      '<div class="fc-hero">' +
        '<div class="fc-hero-glow"></div>' +
        '<div class="fc-icon" id="fc-icon">' + getFloorIcon(floorIndex, 88) + '</div>' +
        '<div class="fc-label">FLOOR COMPLETE</div>' +
        '<div class="fc-title" id="fc-title">' + floor.title + '</div>' +
        '<div class="fc-tag">' + floor.tag + '</div>' +
      '</div>' +
      // Stats grid
      '<div class="fc-stats">' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val" id="fc-stat-sections">0/' + sectionsTotal + '</div>' +
          '<div class="fc-stat-label">Sections</div>' +
        '</div>' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val" id="fc-stat-xp">0</div>' +
          '<div class="fc-stat-label">XP this floor</div>' +
        '</div>' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val">' + state.streak + '\uD83D\uDD25</div>' +
          '<div class="fc-stat-label">Day streak</div>' +
        '</div>' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val">Lvl ' + level + '</div>' +
          '<div class="fc-stat-label">Current level</div>' +
        '</div>' +
      '</div>' +
      // Sage quote
      '<div class="fc-sage">' +
        '<div class="fc-sage-owl">' + sageOwlSVG(38, 42) + '</div>' +
        '<div class="fc-sage-text" id="fc-sage-text"></div>' +
      '</div>' +
      // Badge reveal
      (newBadges.length > 0
        ? '<div class="fc-badge-reveal">' +
            '<div class="fc-badge-reveal-label">// Badge Unlocked</div>' +
            '<div class="fc-badge-items">' +
              newBadges.map(function(b) {
                return '<div class="fc-badge-item">' +
                  '<span class="fc-badge-emoji">' + b.emoji + '</span>' +
                  '<span class="fc-badge-name">' + b.name + '</span>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>'
        : '') +
      // Next floor preview
      (nextFloor
        ? '<div class="fc-next" style="border-color:' + (nextFloor.color||'#c8a96e') + '33">' +
            '<div class="fc-next-label">NEXT UP</div>' +
            '<div class="fc-next-title" style="color:' + (nextFloor.color||'#c8a96e') + '">Floor ' + nextFloor.id + ' \u2014 ' + nextFloor.title + '</div>' +
            '<div class="fc-next-sub">' + nextFloor.subtitle + '</div>' +
          '</div>'
        : '<div class="fc-next fc-next-final">You\'ve reached the top floor. The building is complete.</div>'
      ) +
      // Buttons
      '<div class="fc-actions">' +
        '<button class="fc-btn-primary" onclick="closeCelebration()">' +
          (nextFloor ? 'Continue to Floor ' + nextFloor.id + ' \u2192' : 'You\'re done \u2713') +
        '</button>' +
        (floorIndex === 1
          ? '<button class="fc-btn-cert" onclick="issueAndShowCertificate(1)">&#8659; Download Certificate</button>' +
            '<button class="fc-btn-download" onclick="downloadFloor2Code()">&#8681; Download Your Code</button>'
          : floorIndex === 6
            ? '<button class="fc-btn-cert" onclick="issueAndShowCertificate(6)">&#8659; Download Certificate</button>'
            : '<button class="fc-btn-cert" onclick="generateFloorCertificate(' + floorIndex + ')">&#8681; Download Certificate</button>'
        ) +
        '<button class="fc-btn-share" onclick="shareAchievement()">Share this achievement</button>' +
      '</div>' +
    '</div>';

  el.style.display = 'flex';
  document.body.classList.add('celebrating');

  // Animate stats counting up
  animateCount('fc-stat-sections', 0, sectionsCompleted, sectionsTotal, 800);
  animateCount('fc-stat-xp', 0, xpOnFloor, null, 1000);

  // Typewrite Sage message
  setTimeout(function() { typewriteText('fc-sage-text', msg.sage, 18); }, 600);

  // Particle burst in floor color
  setTimeout(function() { burstFloorParticles(floorColor); }, 200);
  setTimeout(function() { burstFloorParticles(floorColor); }, 700);
}


function burstFloorParticles(color) {
  var cx = window.innerWidth / 2;
  var cy = window.innerHeight * 0.28;
  for (var i = 0; i < 20; i++) {
    var p = document.createElement('div');
    p.className = 'fc-particle';
    var angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5);
    var dist = 60 + Math.random() * 120;
    var tx = Math.cos(angle) * dist;
    var ty = Math.sin(angle) * dist - 40;
    var size = 4 + Math.random() * 6;
    var dur = 0.7 + Math.random() * 0.6;
    p.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + size + 'px;height:' + size + 'px;' +
      'background:' + color + ';border-radius:50%;position:fixed;pointer-events:none;z-index:9999;' +
      'animation:fcParticle ' + dur + 's ease-out forwards;' +
      '--tx:' + tx + 'px;--ty:' + ty + 'px;';
    document.body.appendChild(p);
    setTimeout(function(el) { el.remove(); }, dur * 1000 + 100, p);
  }
}

function closeCelebration() {
  document.getElementById('floor-celebration').style.display = 'none';
  document.body.classList.remove('celebrating');
}

// ── Floor Completion Certificate (Canvas) ────────────────────────
function generateFloorCertificate(fi) {
  var floor = FLOORS[fi];
  if (!floor) return;
  var playerName = state.playerName || localStorage.getItem('codebook_player_name') || 'The Learner';
  var accentHex  = floor.color || '#c8a96e';
  var W = 1400, H = 900;

  function hexRgba(hex, a) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return 'rgba('+r+','+g+','+b+','+a+')';
  }
  function cornerMark(ctx, x, y, dir) {
    var L = 26, dx = dir[1]==='r'?-1:1, dy = dir[0]==='b'?-1:1;
    ctx.beginPath(); ctx.moveTo(x+dx*L,y); ctx.lineTo(x,y); ctx.lineTo(x,y+dy*L); ctx.stroke();
  }
  function fitText(ctx, text, maxW) {
    var sz = 80;
    ctx.font = '300 '+sz+'px Inter,sans-serif';
    while (ctx.measureText(text).width > maxW && sz > 32) {
      sz -= 2;
      ctx.font = '300 '+sz+'px Inter,sans-serif';
    }
    return sz;
  }

  document.fonts.ready.then(function() {
    var canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    var c = canvas.getContext('2d');

    // ── Background ──
    c.fillStyle = '#05070a';
    c.fillRect(0, 0, W, H);

    // Subtle centre radial warmth
    var radGrd = c.createRadialGradient(W/2, H/2, 0, W/2, H/2, W*0.55);
    radGrd.addColorStop(0, 'rgba(28,40,60,0.45)');
    radGrd.addColorStop(1, 'transparent');
    c.fillStyle = radGrd;
    c.fillRect(0, 0, W, H);

    // Side glow from accent bar
    var sideGrd = c.createLinearGradient(0,0,300,0);
    sideGrd.addColorStop(0, hexRgba(accentHex, 0.07));
    sideGrd.addColorStop(1, 'transparent');
    c.fillStyle = sideGrd; c.fillRect(0,0,W,H);

    // ── Left accent bar ──
    c.fillStyle = accentHex;
    c.fillRect(0, 0, 7, H);

    // ── Corner marks ──
    c.strokeStyle = 'rgba(80,110,140,0.5)'; c.lineWidth = 1.5;
    cornerMark(c, 44, 44, 'tl');
    cornerMark(c, W-44, 44, 'tr');
    cornerMark(c, 44, H-44, 'bl');
    cornerMark(c, W-44, H-44, 'br');

    // ── Watermark floor number ──
    c.save();
    c.globalAlpha = 0.028;
    c.fillStyle = '#ffffff';
    c.font = '900 300px Inter,sans-serif';
    c.textAlign = 'right'; c.textBaseline = 'top';
    c.fillText(String(fi+1), W-30, -30);
    c.restore();

    // ── Top-left branding ──
    c.font = '700 12px "Space Mono",monospace';
    c.fillStyle = 'rgba(100,140,180,0.55)';
    c.textAlign = 'left'; c.textBaseline = 'top';
    c.fillText('T H E   C O D E   B O O K', 50, 46);

    // ── "CERTIFICATE OF COMPLETION" ──
    var midY = Math.round(H * 0.40);
    c.font = '700 12px "Space Mono",monospace';
    c.fillStyle = hexRgba(accentHex, 0.85);
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('C E R T I F I C A T E   O F   C O M P L E T I O N', W/2, midY - 80);

    // Rule above name
    c.strokeStyle = hexRgba(accentHex, 0.4);
    c.lineWidth = 1;
    c.beginPath(); c.moveTo(W/2-300, midY-58); c.lineTo(W/2+300, midY-58); c.stroke();

    // ── Player name ──
    var nameSz = fitText(c, playerName, 800);
    c.font = '300 '+nameSz+'px Inter,sans-serif';
    c.fillStyle = '#f1f5f9';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(playerName, W/2, midY + 14);

    // Rule below name
    c.strokeStyle = 'rgba(255,255,255,0.07)';
    c.lineWidth = 1;
    c.beginPath(); c.moveTo(W/2-220, midY+62); c.lineTo(W/2+220, midY+62); c.stroke();

    // ── "has completed" ──
    c.font = '400 15px Inter,sans-serif';
    c.fillStyle = 'rgba(125,150,180,0.75)';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('has completed', W/2, midY + 94);

    // ── Floor title ──
    var floorLine = 'FLOOR ' + (fi+1) + '  —  ' + floor.title.toUpperCase();
    c.font = '700 21px "Space Mono",monospace';
    c.fillStyle = accentHex;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(floorLine, W/2, midY + 136);

    // ── Subtitle ──
    c.font = 'italic 400 15px Inter,sans-serif';
    c.fillStyle = 'rgba(100,130,165,0.7)';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(floor.subtitle, W/2, midY + 168);

    // ── Bottom rule ──
    c.strokeStyle = hexRgba(accentHex, 0.25);
    c.lineWidth = 1;
    c.beginPath(); c.moveTo(50, H-64); c.lineTo(W-50, H-64); c.stroke();

    // Date (bottom left)
    var dateStr = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    c.font = '400 12px "Space Mono",monospace';
    c.fillStyle = 'rgba(80,110,140,0.6)';
    c.textAlign = 'left'; c.textBaseline = 'middle';
    c.fillText(dateStr, 50, H-40);

    // Floor N of 7 (bottom right)
    c.textAlign = 'right';
    c.fillText('Floor ' + (fi+1) + ' of ' + FLOORS.length, W-50, H-40);

    // ── Download ──
    var link = document.createElement('a');
    link.download = 'the-code-book-floor-' + (fi+1) + '-certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
// ─────────────────────────────────────────────────────────────────
// Floor 2 — Certificate + Code Download

var FLOOR_CERT_DATA = [
  {
    title: 'Certificate of Floor Completion',
    body: 'Successfully ascended Floor 1, demonstrating a complete understanding of how computers read instructions, the logic behind all programming, and the request-response cycle that powers the entire web.',
    skills: ['Sequential Execution &amp; Order Dependencies', 'Conditions, Loops &amp; Functions', 'Request-Response Architecture']
  },
  {
    title: 'Certificate of Floor Completion',
    body: 'Successfully ascended Floor 2, demonstrating mastery of HTML structure, CSS styling, the browser rendering path, and the ability to build real visual components from scratch.',
    skills: ['HTML Semantics &amp; Document Structure', 'CSS Layout, Specificity &amp; the Box Model', 'Flexbox &amp; Responsive Component Building']
  },
  {
    title: 'Certificate of Floor Completion',
    body: 'Successfully ascended Floor 3, demonstrating command of JavaScript — variables, functions, DOM manipulation, events, and the ability to build interactive interfaces without a scaffold.',
    skills: ['JavaScript Functions, Scope &amp; Data Types', 'DOM Manipulation &amp; Event-Driven Interaction', 'Arrays, Objects &amp; Async Foundations']
  },
  {
    title: 'Certificate of Floor Completion',
    body: 'Successfully ascended Floor 4, demonstrating the developer mindset — working independently, reading documentation, consuming APIs, and handling asynchronous code with fetch and async/await.',
    skills: ['API Integration &amp; HTTP Protocol', 'Async/Await &amp; Promise Handling', 'Independent Problem-Solving &amp; Documentation Reading']
  },
  {
    title: 'Certificate of Floor Completion',
    body: 'Successfully ascended Floor 5, demonstrating full-stack capability — building servers, working with databases, implementing authentication, and deploying complete applications end to end.',
    skills: ['Server-Side Development &amp; REST APIs', 'Relational Databases &amp; SQL', 'Authentication, JWTs &amp; Secure Architecture']
  },
  {
    title: 'Certificate of Floor Completion',
    body: 'Successfully ascended Floor 6, demonstrating specialist-level depth in a chosen technical direction — moving beyond generalist capability into the territory where genuine professional value is built.',
    skills: ['Specialist Technical Depth', 'Advanced Architecture &amp; Tooling', 'Production-Grade Code Quality']
  },
  {
    title: 'Certificate of Completion',
    body: 'Successfully completed The Code Book — ascending all seven floors from foundational thinking to full-stack development. Real software built. Real problems solved. The understanding cannot be taken back.',
    skills: ['Full-Stack Development, Frontend to Backend', 'Independent Engineering &amp; Professional Workflow', 'The Code Book — Complete']
  }
];

async function issueAndShowCertificate(fi) {
  var floor = FLOORS[fi];
  if (!floor) return;
  var name = state.playerName || localStorage.getItem('codebook_player_name') || 'The Learner';
  var ac = floor.color || '#7eb8c8';

  function _makeId(uid) {
    var u = (uid || '').replace(/-/g, '').slice(0, 6).toUpperCase() || 'GUEST';
    var t = Date.now().toString(36).toUpperCase().slice(-5);
    return 'TCB-F' + (fi + 1) + '-' + u + '-' + t;
  }

  if (!window.sb || !window.currentUser) {
    var guestId = _makeId('');
    showFloorCertificate(name, new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), guestId, ac, fi);
    return;
  }

  try {
    var existing = await window.sb.from('floor_certificates')
      .select('verification_id, issued_at')
      .eq('user_id', window.currentUser.id)
      .eq('floor_number', fi + 1)
      .maybeSingle();

    if (existing.data) {
      var d = new Date(existing.data.issued_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      showFloorCertificate(name, d, existing.data.verification_id, ac, fi);
      return;
    }

    var vid = _makeId(window.currentUser.id);
    await window.sb.from('floor_certificates').insert({
      user_id: window.currentUser.id,
      floor_number: fi + 1,
      verification_id: vid,
      issued_at: new Date().toISOString()
    });
    showFloorCertificate(name, new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), vid, ac, fi);
  } catch (e) {
    var fallbackId = _makeId(window.currentUser.id);
    showFloorCertificate(name, new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), fallbackId, ac, fi);
  }
}

function showFloorCertificate(name, dateStr, verificationId, ac, fi) {
  fi = (fi !== undefined) ? fi : 1;
  ac = ac || '#7eb8c8';
  var certData = FLOOR_CERT_DATA[fi] || FLOOR_CERT_DATA[1];
  var safeName = escHtml(name);
  var css = [
    '*{box-sizing:border-box;margin:0;padding:0;}',
    'body{background:#08090c;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:40px 20px;font-family:Inter,system-ui,sans-serif;}',
    '.controls{display:flex;gap:12px;margin-bottom:32px;}',
    '.btn-save{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:2.5px;background:none;border:1px solid ' + ac + '60;color:' + ac + ';padding:10px 22px;cursor:pointer;border-radius:3px;transition:background .15s;text-transform:uppercase;}',
    '.btn-save:hover{background:' + ac + '18;}',
    '.btn-close{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:2px;background:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.3);padding:10px 18px;cursor:pointer;border-radius:3px;}',
    '.cert{width:100%;max-width:860px;background:#0c0e12;border:1px solid ' + ac + '30;box-shadow:0 0 60px ' + ac + '0c,0 32px 80px rgba(0,0,0,.7);border-radius:2px;padding:68px 88px;position:relative;}',
    '.c-tl,.c-tr,.c-bl,.c-br{position:absolute;width:26px;height:26px;}',
    '.c-tl{top:18px;left:18px;border-top:1px solid ' + ac + '55;border-left:1px solid ' + ac + '55;}',
    '.c-tr{top:18px;right:18px;border-top:1px solid ' + ac + '55;border-right:1px solid ' + ac + '55;}',
    '.c-bl{bottom:18px;left:18px;border-bottom:1px solid ' + ac + '55;border-left:1px solid ' + ac + '55;}',
    '.c-br{bottom:18px;right:18px;border-bottom:1px solid ' + ac + '55;border-right:1px solid ' + ac + '55;}',
    '.cert-top{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:3.5px;color:rgba(255,255,255,.22);text-align:center;margin-bottom:52px;text-transform:uppercase;}',
    '.cert-top em{color:' + ac + ';font-style:normal;opacity:.9;}',
    'h1.cert-title{font-family:Inter,system-ui,sans-serif;font-size:28px;font-weight:300;color:rgba(255,255,255,.88);text-align:center;letter-spacing:.3px;margin-bottom:18px;}',
    '.divider{width:100px;height:1px;background:linear-gradient(90deg,transparent,' + ac + '55,transparent);margin:0 auto 36px;}',
    '.cert-sub{font-size:14px;color:rgba(255,255,255,.4);text-align:center;line-height:1.9;margin-bottom:4px;}',
    '.cert-name{font-family:"Space Mono",monospace;font-size:24px;font-weight:700;color:' + ac + ';text-align:center;margin:18px 0 26px;letter-spacing:.5px;text-shadow:0 0 32px ' + ac + '45;}',
    '.cert-body{font-size:14.5px;color:rgba(255,255,255,.48);text-align:center;line-height:1.95;max-width:580px;margin:0 auto 40px;}',
    '.skills{border:1px solid rgba(255,255,255,.055);border-top:1px solid ' + ac + '30;background:rgba(255,255,255,.015);border-radius:3px;padding:22px 36px;margin-bottom:52px;}',
    '.skills-hdr{font-family:"Space Mono",monospace;font-size:9px;letter-spacing:3px;color:' + ac + ';opacity:.6;margin-bottom:16px;text-transform:uppercase;}',
    '.skill{font-family:"Space Mono",monospace;font-size:12.5px;color:rgba(255,255,255,.6);margin-bottom:11px;display:flex;align-items:center;gap:10px;}',
    '.skill:last-child{margin-bottom:0;}',
    '.skill b{color:' + ac + ';}',
    '.cert-footer{display:flex;justify-content:space-between;align-items:flex-end;padding-top:26px;border-top:1px solid rgba(255,255,255,.05);}',
    '.fl,.fr{font-family:"Space Mono",monospace;}',
    '.fr{text-align:right;}',
    '.fl-lbl,.fr-lbl{font-size:8.5px;letter-spacing:2.5px;color:rgba(255,255,255,.2);text-transform:uppercase;margin-bottom:5px;}',
    '.fl-val,.fr-val{font-size:11.5px;color:rgba(255,255,255,.52);}',
    '@media print{body{background:#0c0e12!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;padding:0;}.controls{display:none!important;}.cert{max-width:100%;box-shadow:none;}}',
    '@media(max-width:640px){.cert{padding:40px 24px;}h1.cert-title{font-size:20px;}.cert-name{font-size:17px;}.skills{padding:18px 20px;}}'
  ].join('');

  var html = '<!DOCTYPE html><html lang="en"><head>' +
    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + certData.title + ' — The Code Book</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">' +
    '<style>' + css + '</style></head><body>' +
    '<div class="controls">' +
      '<button class="btn-save" onclick="window.print()">&#8659;&nbsp; Save as PDF</button>' +
      '<button class="btn-close" onclick="window.close()">Close</button>' +
    '</div>' +
    '<div class="cert">' +
      '<div class="c-tl"></div><div class="c-tr"></div><div class="c-bl"></div><div class="c-br"></div>' +
      '<div class="cert-top">THE CODE BOOK &nbsp;<em>❖</em>&nbsp; SIGNAL VERIFIED</div>' +
      '<h1 class="cert-title">' + certData.title + '</h1>' +
      '<div class="divider"></div>' +
      '<p class="cert-sub">This document reliably records that on ' + dateStr + ', the user known as:</p>' +
      '<div class="cert-name">&gt;&nbsp;' + safeName + '</div>' +
      '<p class="cert-body">' + certData.body + '</p>' +
      '<div class="skills">' +
        '<div class="skills-hdr">Verified Skills</div>' +
        certData.skills.map(function(s) { return '<div class="skill"><b>[&#10003;]</b> ' + s + '</div>'; }).join('') +
      '</div>' +
      '<div class="cert-footer">' +
        '<div class="fl"><div class="fl-lbl">Issued by</div><div class="fl-val">Sage, Core System Guide</div></div>' +
        '<div class="fr"><div class="fr-lbl">Verification ID</div><div class="fr-val">' + verificationId + '</div></div>' +
      '</div>' +
    '</div></body></html>';

  var w = window.open('', '_blank', 'width=1020,height=820,scrollbars=yes,resizable=yes');
  if (w) {
    w.document.write(html);
    w.document.close();
  } else {
    var blob = new Blob([html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'floor' + (fi + 1) + '-certificate.html';
    a.click();
    URL.revokeObjectURL(url);
  }
}

function downloadFloor2Code() {
  var floor = FLOORS[1];
  if (!floor) return;
  var name = state.playerName || localStorage.getItem('codebook_player_name') || 'Developer';
  var dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  var codeSections = floor.sections.filter(function(s) { return s.code && s.code.starter; });

  var exercisesHtml = codeSections.map(function(section) {
    var saved = localStorage.getItem('code_' + section.id);
    var code = saved || getEditorDefaults(section).code || '';
    var attrCode = code.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return '<article class="ex">' +
      '<header class="ex-hdr">' +
        '<span class="ex-id">' + section.id + '</span>' +
        '<span class="ex-title">' + escHtml(section.title) + '</span>' +
        (saved ? '<span class="ex-badge">YOUR CODE</span>' : '<span class="ex-badge ex-badge-default">STARTER</span>') +
      '</header>' +
      '<iframe class="ex-frame" srcdoc="' + attrCode + '" sandbox="allow-scripts" loading="lazy"></iframe>' +
    '</article>';
  }).join('');

  var portfolioHtml = '<!DOCTYPE html><html lang="en"><head>' +
    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Floor 2 Portfolio — ' + escHtml(name) + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Mono&display=swap" rel="stylesheet">' +
    '<style>' +
      '*{box-sizing:border-box;margin:0;padding:0;}' +
      'body{background:#0a0a0a;color:#fff;font-family:Inter,sans-serif;padding:0 0 60px;}' +
      '.site-header{background:#0c0e12;border-bottom:1px solid rgba(255,255,255,.07);padding:28px 40px;display:flex;align-items:center;justify-content:space-between;}' +
      '.sh-brand{font-family:"Space Mono",monospace;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,.3);}' +
      '.sh-meta{font-family:"Space Mono",monospace;font-size:11px;color:rgba(255,255,255,.25);text-align:right;}' +
      '.sh-name{font-size:13px;color:#7eb8c8;font-weight:700;margin-bottom:3px;}' +
      '.exercises{display:flex;flex-direction:column;gap:0;}' +
      '.ex{border-bottom:1px solid rgba(255,255,255,.05);}' +
      '.ex-hdr{display:flex;align-items:center;gap:14px;padding:16px 40px;background:#0d0f13;border-bottom:1px solid rgba(255,255,255,.05);}' +
      '.ex-id{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:2px;color:rgba(255,255,255,.25);}' +
      '.ex-title{font-family:"Space Mono",monospace;font-size:13px;font-weight:700;color:#7eb8c8;flex:1;}' +
      '.ex-badge{font-family:"Space Mono",monospace;font-size:9px;letter-spacing:2px;padding:3px 8px;border-radius:2px;background:rgba(126,184,200,.15);color:#7eb8c8;border:1px solid rgba(126,184,200,.25);}' +
      '.ex-badge-default{background:rgba(255,255,255,.04);color:rgba(255,255,255,.3);border-color:rgba(255,255,255,.1);}' +
      '.ex-frame{width:100%;height:520px;border:none;display:block;}' +
    '</style></head><body>' +
    '<header class="site-header">' +
      '<div class="sh-brand">THE CODE BOOK &nbsp;&#10086;&nbsp; FLOOR 2</div>' +
      '<div class="sh-meta"><div class="sh-name">' + escHtml(name) + '</div><div>Generated ' + dateStr + '</div></div>' +
    '</header>' +
    '<div class="exercises">' + exercisesHtml + '</div>' +
    '</body></html>';

  var blob = new Blob([portfolioHtml], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'floor2-web-foundations.html';
  a.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────

function shareAchievement() {
  const name = state.playerName || localStorage.getItem('codebook_player_name') || 'Someone';
  const floor = FLOORS[state.currentFloor - 1];
  const text = '' + (name) + ' just completed "' + (floor.title) + '" on The Code Book with ' + (state.xp) + ' XP. Learning to code one step at a time. https://the-code-book.netlify.app';
  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard \u2014 paste it wherever you want to share.'));
  }
}

function generateProgressCard() {
  var W = 1200, H = 630;
  var canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  function hexRgba(hex, a) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  document.fonts.ready.then(function() {
    var name = state.playerName || localStorage.getItem('codebook_player_name') || 'Learner';
    var streak = state.streak || 0;
    var xp = state.xp || 0;
    var floorsDone = FLOORS.filter(function(f, fi){ return isFloorComplete(fi); }).length;
    var totalSecs = 0, doneSecs = 0;
    FLOORS.forEach(function(f){ f.sections.forEach(function(s){ totalSecs++; if (state.completed[s.id]) doneSecs++; }); });
    var masteredCards = Object.values(state.srsData || {}).filter(function(d){ return d && d.interval >= 21; }).length;
    var cur = getCurrentLevel();
    var levelName = LEVEL_NAMES[cur.level] || ('Level ' + cur.level);

    // Background
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, W, H);

    // Subtle warm radial
    var rg = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, W*0.65);
    rg.addColorStop(0, 'rgba(200,169,110,0.07)');
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    // Left accent bar
    ctx.fillStyle = '#c8a96e';
    ctx.fillRect(0, 0, 6, H);

    // Branding
    ctx.font = '700 13px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(200,169,110,0.55)';
    ctx.letterSpacing = '3px';
    ctx.fillText('T H E   C O D E   B O O K', 40, 52);

    // Level badge top-right
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.textAlign = 'right';
    ctx.fillText('LEVEL ' + cur.level + ' — ' + levelName.toUpperCase(), W - 40, 52);
    ctx.textAlign = 'left';

    // Top rule
    ctx.strokeStyle = 'rgba(200,169,110,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 68); ctx.lineTo(W - 40, 68); ctx.stroke();

    // Player name
    var maxNameW = W - 80;
    var nameSize = 72;
    ctx.font = '300 ' + nameSize + 'px "Inter", sans-serif';
    while (ctx.measureText(name).width > maxNameW && nameSize > 32) {
      nameSize -= 4;
      ctx.font = '300 ' + nameSize + 'px "Inter", sans-serif';
    }
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillText(name, 40, 160);

    // Tagline
    ctx.font = '400 16px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(200,169,110,0.7)';
    ctx.fillText('LEARNING TO CODE — ONE FLOOR AT A TIME', 40, 195);

    // Mid rule
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.beginPath(); ctx.moveTo(40, 220); ctx.lineTo(W - 40, 220); ctx.stroke();

    // Stats row
    var stats = [
      { n: xp, k: 'XP EARNED' },
      { n: streak + (streak === 1 ? ' day' : ' days'), k: 'STREAK' },
      { n: doneSecs + '/' + totalSecs, k: 'SECTIONS' },
      { n: masteredCards, k: 'CARDS MASTERED' },
      { n: floorsDone + '/7', k: 'FLOORS DONE' }
    ];
    var colW = (W - 80) / stats.length;
    stats.forEach(function(s, i) {
      var cx = 40 + colW * i;
      ctx.font = '700 32px "Space Mono", monospace';
      ctx.fillStyle = 'rgba(200,169,110,0.9)';
      ctx.fillText(s.n + '', cx, 295);
      ctx.font = '400 10px "Space Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText(s.k, cx, 315);
    });

    // Floor dots
    var dotY = 390, dotR = 22, dotGap = 20;
    var totalDotW = FLOORS.length * (dotR * 2) + (FLOORS.length - 1) * dotGap;
    var dotStartX = 40;
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillText('FLOORS', 40, dotY - dotR - 14);
    FLOORS.forEach(function(f, fi) {
      var cx = dotStartX + fi * (dotR * 2 + dotGap) + dotR;
      var done = isFloorComplete(fi);
      var isCurrent = fi === (state.currentFloor - 1);
      var col = f.color || '#c8a96e';
      ctx.beginPath();
      ctx.arc(cx, dotY, dotR, 0, Math.PI * 2);
      if (done) {
        ctx.fillStyle = col;
        ctx.fill();
      } else if (isCurrent) {
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = hexRgba(col, 0.12);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.font = '700 10px "Space Mono", monospace';
      ctx.fillStyle = done ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.3)';
      ctx.textAlign = 'center';
      ctx.fillText(fi + 1, cx, dotY + 4);
      ctx.textAlign = 'left';
    });

    // Bottom rule
    ctx.strokeStyle = 'rgba(200,169,110,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, H - 60); ctx.lineTo(W - 40, H - 60); ctx.stroke();

    // Date
    ctx.font = '400 11px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.fillText(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), 40, H - 36);
    ctx.textAlign = 'right';
    ctx.fillText('the-code-book', W - 40, H - 36);
    ctx.textAlign = 'left';

    // Download
    var a = document.createElement('a');
    a.download = 'the-code-book-progress.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
}

// --- STREAK PROTECTION ---
function checkStreakProtection() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const twoDaysAgo = new Date(Date.now() - 172800000).toDateString();

  if (state.lastVisit === twoDaysAgo && state.streak > 0) {
    // Grace period \u2014 one day missed, show recovery option
    showStreakRecovery();
  }
}

function showStreakRecovery() {
  if (state.streak < 3) return; // Only show for meaningful streaks
  const banner = document.createElement('div');
  banner.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--floor3);border-radius:12px;padding:16px 20px;z-index:5000;max-width:320px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.4);`;
  banner.innerHTML = `
    <div style="font-size:24px;margin-bottom:8px;">\uD83D\uDD25</div>
    <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:14px;margin-bottom:6px;">Streak in danger</div>
    <div style="font-size:13px;color:var(--text-dim);margin-bottom:14px;">Complete one section today to keep your ${state.streak} day streak alive.</div>
    <button onclick="this.parentElement.remove()" style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:1px;padding:10px 20px;background:var(--floor3);border:none;color:white;border-radius:6px;cursor:pointer;">Protect my streak</button>
  `;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 8000);
}

// --- PROGRESS NUDGE SYSTEM ---
function checkProgressNudge(fi, si) {
  const floor = FLOORS[fi];
  const halfway = Math.floor(floor.sections.length / 2);
  if (si === halfway) {
    showProgressNudge(fi, si);
  }
}

function showProgressNudge(fi, si) {
  const key = 'nudge-halfway-' + (fi) + '';
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, 'true');

  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  const nudge = document.createElement('div');
  nudge.style.cssText = `position:fixed;bottom:80px;right:16px;background:var(--surface);border:1px solid var(--accent);border-radius:12px;padding:16px 20px;z-index:5000;max-width:260px;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeUp 0.4s ease;`;
  nudge.innerHTML = `
    <div style="margin-bottom:8px;">${sageOwlSVG(22, 24)}</div>
    <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:13px;margin-bottom:6px;">${name ? 'Halfway there, ' + escHtml(name) + '!' : 'Halfway there!'}</div>
    <div style="font-size:12px;color:var(--text-dim);line-height:1.6;">You\'re halfway through this floor. The hard part is behind you.</div>
    <button onclick="this.parentElement.remove()" style="margin-top:10px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1px;padding:6px 14px;background:transparent;border:1px solid var(--accent);color:var(--accent);border-radius:4px;cursor:pointer;">Keep going</button>
  `;
  document.body.appendChild(nudge);
  setTimeout(() => nudge.remove && nudge.remove(), 6000);
}

// --- GUEST MODE ---
function showGuestNamePrompt() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('guest-name-overlay').style.display = 'flex';
}

function hideGuestNamePrompt() {
  document.getElementById('guest-name-overlay').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
}

function confirmGuestName() {
  var name = document.getElementById('guest-name-input').value.trim();
  if (!name) { name = onboardingData.name || 'Guest'; }
  localStorage.setItem('codebook_guest_name', name);
  localStorage.setItem('codebook_guest', 'true');
  onboardingData.name = name;
  state.playerName = name;

  document.getElementById('guest-name-overlay').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';

  // Already onboarded — go straight into the app
  if (localStorage.getItem('codebook_onboarded')) {
    startAsGuest();
    return;
  }

  // First-time guest — collect experience/goal before starting
  document.getElementById('onboarding-step-1').style.display = 'none';
  document.getElementById('onboarding-step-2').style.display = 'block';
  document.getElementById('onboarding-title').textContent = 'Welcome, ' + name + '.';
  document.getElementById('onboarding-body').textContent = 'A few quick questions before we begin.';
  var _obpg = document.getElementById('ob-progress'); if (_obpg) _obpg.textContent = '02 / 03';
  document.getElementById('onboarding').style.display = 'flex';
}

function showGuestLockPopup() {
  document.getElementById('guest-lock-overlay').style.display = 'flex';
}

function hideGuestLockPopup() {
  document.getElementById('guest-lock-overlay').style.display = 'none';
}

function startAsGuest() {
  localStorage.setItem('codebook_guest', 'true');
  isGuest = true;
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';
  loadState();
  updateStreak();
  document.getElementById('cover').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

function checkGuestSavePrompt() {
  const isGuest = localStorage.getItem('codebook_guest');
  const prompted = localStorage.getItem('codebook_guest_prompted');
  if (isGuest && !prompted) {
    // Count only real section completions, not checklist items
    const sectionIds = new Set();
    FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
    const completedSections = Object.keys(state.completed).filter(function(k) {
      return sectionIds.has(k) && state.completed[k];
    }).length;
    if (completedSections >= 3) {
      localStorage.setItem('codebook_guest_prompted', 'true');
      showGuestSavePrompt();
    }
  }
}

function showGuestSavePrompt() {
  const prompt = document.createElement('div');
  prompt.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px;`;
  prompt.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--accent);border-radius:16px;padding:32px;max-width:340px;text-align:center;">
      <div style="margin-bottom:16px;display:flex;justify-content:center;">${sageOwlSVG(46, 51)}</div>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:900;color:var(--accent);font-style:italic;margin-bottom:12px;">Save your progress?</div>
      <div style="font-size:14px;color:var(--text-dim);line-height:1.8;margin-bottom:24px;">You\'ve completed 3 sections. Create a free account to make sure you never lose your progress.</div>
      <button onclick="this.closest('div[style*=fixed]').remove();document.getElementById('auth-screen').style.display='flex';switchTab('signup');" style="width:100%;padding:16px;background:var(--accent);border:none;border-radius:8px;color:var(--bg);font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:2px;cursor:pointer;margin-bottom:10px;">CREATE FREE ACCOUNT</button>
      <button onclick="this.closest('div[style*=fixed]').remove();" style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text-muted);background:transparent;border:none;cursor:pointer;">Continue without saving</button>
    </div>
  `;
  document.body.appendChild(prompt);
}

function renderNav() {
  const nav = document.getElementById('floor-nav');
  if (!nav) return;
  nav.innerHTML = FLOORS.map(function(f, fi) {
    var isUnlocked = true; // all floors unlocked
    var isGuestLocked = false;
    var isActive = fi === state.currentFloor - 1;
    var isComplete = isFloorComplete(fi);
    var sections = isActive ? f.sections.map(function(s, si) {
      var isDone = state.completed[s.id];
      var isActiveSec = si === state.currentSection;
      return '<span class="section-link ' + (isDone ? 'done' : '') + ' ' + (isActiveSec ? 'active' : '') + '" onclick="goToSection(' + fi + ',' + si + ')">' + s.title + '</span>';
    }).join('') : '';
    return '<div class="floor-nav-item ' + (isUnlocked ? 'unlocked' : '') + ' ' + (isActive ? 'active' : '') + ' ' + (isComplete ? 'completed' : '') + ' ' + (isGuestLocked ? 'guest-locked' : '') + '" onclick="goToFloor(' + fi + ')">' +
      '<div class="floor-nav-header">' +
      '<div class="floor-num" style="color:' + f.color + '">' + (isGuestLocked ? '&#128274;' : isComplete ? '\u2713' : fi + 1) + '</div>' +
      '<div class="floor-nav-label">' + f.title + (isGuestLocked ? ' \u2014 Account required' : '') + '</div>' +
      '</div>' +
      (isActive ? '<div class="floor-sections">' + sections + '</div>' : '') +
      '</div>';
  }).join('');
  updateProgress();
  renderBuildingMap();
}

function isFloorComplete(fi) {
  if (fi < 0) return true;
  return FLOORS[fi].sections.every(s => state.completed[s.id]);
}

function updateProgress() {
  // Build a set of valid section IDs so we only count real sections
  const sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  const total = sectionIds.size;
  const done = Object.keys(state.completed).filter(function(k) { return sectionIds.has(k) && state.completed[k]; }).length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  // Sync new layout
  var lsp = document.getElementById('ls-progress');
  if (lsp) lsp.textContent = pct + '%';
}
function showSageFloorIntro(fi) {
  var existing = document.getElementById('sage-floor-intro-overlay');
  if (existing) existing.remove();
  var floor = FLOORS[fi];
  if (!floor) { goToFloor(fi); return; }

  var introTexts = [
    'Before you write a single line of code, let me make sure you understand how the internet actually works — and why it works that way.<br><br>In Floor 1 we cover how browsers talk to servers, what HTML, CSS and JavaScript actually are, and the three ideas that every program ever written is built on: conditions, loops and functions.<br><br>Five sections. No prior experience needed. Take your time with each one.',
    'You have the foundation. Now we build on it.<br><br>Floor 2 is where HTML and CSS stop being abstract and start becoming visible. You will learn how structure and style combine to produce what users actually see. Every layout you have ever used was built with these principles.<br><br>Apply what you learned in Floor 1. This is where it clicks.',
    'Floor 3 is the turning point.<br><br>JavaScript makes things move, react, and remember. By the end of this floor you will be writing logic that responds to users in real time. This is when development starts to feel like a skill and not just a process.<br><br>Pay close attention. The concepts here underpin everything that follows.',
    'You are now writing real programs.<br><br>Floor 4 introduces the patterns that professional developers use every day — functions, data structures, and the way complex systems are broken into manageable pieces. It is not about memorising syntax. It is about thinking in structures.<br><br>Work through each section slowly. Understanding the why matters more than the how.',
    'The back end is where your code stops being a user interface and starts being a system.<br><br>Floor 5 covers servers, databases, and the request-response cycle that drives every application on the web. You will write code that stores data, retrieves it, and responds to requests from the real world.<br><br>This is a significant step. Take it seriously.',
    'Floor 6 connects everything you have built so far.<br><br>Full-stack development means owning both the interface the user sees and the system that powers it. You will deploy, integrate, and debug across the entire stack. Real applications have real complexity. This floor prepares you for it.',
    'You have reached the final floor.<br><br>Floor 7 is about professional practice — version control, testing, deployment pipelines, and the habits that separate someone who codes from someone who engineers. Everything before this was preparation. This is how you work in the real world.<br><br>Finish what you started.'
  ];
  var text = introTexts[fi] || 'This floor builds directly on everything you have learned so far. Each section is designed to be completed in one sitting.';

  var el = document.createElement('div');
  el.id = 'sage-floor-intro-overlay';
  el.innerHTML = [
    '<div class="sfi-card">',
      '<div class="sfi-owl">' + sageOwlSVG(64, 70) + '</div>',
      '<div class="sfi-sage-label">SAGE</div>',
      '<div class="sfi-floor-badge">FLOOR ' + (fi + 1) + ' — ' + floor.title.toUpperCase() + '</div>',
      '<p class="sfi-message">' + text + '</p>',
      '<div class="sfi-question">Are you ready to begin?</div>',
      '<button class="sfi-ready-btn" onclick="document.getElementById(\'sage-floor-intro-overlay\').remove();goToFloor(' + fi + ')">I am ready</button>',
      '<button class="sfi-back-btn" onclick="document.getElementById(\'sage-floor-intro-overlay\').remove()">Not yet — take me back</button>',
    '</div>'
  ].join('');
  document.body.appendChild(el);
}

function goToFloor(fi) {
  stopNarration();

  // Capture prevFloor BEFORE mutating state so direction is calculated correctly
  var prevFloor = state.currentFloor - 1;
  var direction = fi > prevFloor ? 'up' : 'down';
  var mainContent = document.getElementById('main-content');
  var mainCol = document.getElementById('main-col') || mainContent;

  function slideIn() {
    state.currentFloor = fi + 1;
    state.currentSection = 0;
    saveState();
    renderNav();
    renderFloor(fi, 0);

    if (mainContent) {
      mainContent.style.overflow = 'hidden';
      mainContent.classList.remove('elevator-up', 'elevator-down', 'slide-out-up', 'slide-out-down');
      void mainContent.offsetWidth; // reflow
      mainContent.classList.add(direction === 'up' ? 'elevator-up' : 'elevator-down');
      setTimeout(function() {
        mainContent.classList.remove('elevator-up', 'elevator-down');
        mainContent.style.overflow = '';
      }, 560);
    }

    if (mainCol) mainCol.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  if (mainContent && prevFloor !== fi) {
    mainContent.classList.remove('elevator-up', 'elevator-down', 'slide-out-up', 'slide-out-down');
    void mainContent.offsetWidth;
    mainContent.classList.add(direction === 'up' ? 'slide-out-down' : 'slide-out-up');
    setTimeout(slideIn, 240);
  } else {
    slideIn();
  }
}
function goToSection(fi, si) {
  stopNarration();
  state.currentFloor = fi + 1;
  state.currentSection = si;
  saveState();
  renderNav();
  renderFloor(fi, si);
}

// \u2500\u2500\u2500 EDITOR DEFAULTS \u2500\u2500\u2500
var editorDefaults = {
  html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 20px; }\n    h1 { color: #c8a96e; }\n  </style>\n</head>\n<body>\n  <h1>I built this.</h1>\n  <p>Day one. Already making things.</p>\n</body>\n</html>',
  css: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nh1 {\n  color: #c8a96e;\n  font-size: 48px;\n  font-family: Georgia, serif;\n}\n.card {\n  background: #1a1a1a;\n  padding: 24px;\n  border-radius: 12px;\n}\n</style>\n</head>\n<body style="background:#0a0a0a;padding:20px;">\n  <h1>Style me</h1>\n  <div class="card">I am a card</div>\n</body>\n</html>',
  js: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:sans-serif;padding:20px;">\n<button onclick="go()" style="padding:12px 24px;background:#c8a96e;border:none;cursor:pointer;border-radius:6px;font-size:16px;">Click Me</button>\n<p id="msg" style="margin-top:16px;color:#999;">Nothing happened yet.</p>\n<sc' + 'ript>\nfunction go() {\n  document.getElementById("msg").innerText = "You just ran JavaScript.";\n  document.getElementById("msg").style.color = "#c8a96e";\n}\n</sc' + 'ript>\n</body>\n</html>'
};

function getEditorDefaults(section) {

    if (!section) {
        return { code: "", filename: "", challenges: [] };
    }

    if (section.code && section.code.lang) {
        var lang = section.code.lang.toLowerCase().trim();

        if (lang.includes("html")) lang = "html";
        else if (lang.includes("css")) lang = "css";
        else if (lang.includes("js") || lang.includes("javascript")) lang = "js";

        var code = section.code.starter || editorDefaults[lang];

        if (!code) {
            return { code: "// unknown language", filename: "file.txt", challenges: [] };
        }

        var filenameMap = {
            html: "app.html",
            css: "style.css",
            js: "script.js"
        };

        return {
            code: code,
            filename: filenameMap[lang] || "file.txt",
            challenges: section.code.challenges || []
        };
    }

    // section exists but has no code block
    return { code: "", filename: "", challenges: [] };
}

function renderSectionStrip(fi, si) {
  var floor = FLOORS[fi];
  if (!floor) return '';
  var color = floor.color || '#c8a96e';
  var html = '<div class="section-strip">';
  floor.sections.forEach(function(sec, i) {
    var isDone = !!state.completed[sec.id];
    var isCurrent = i === si;
    var cls = 'section-strip-item' +
      (isCurrent ? ' ss-active' : '') +
      (isDone && !isCurrent ? ' ss-done' : '');
    var style = isCurrent ? ' style="color:' + color + ';border-color:' + color + '"' : '';
    html += '<div class="' + cls + '"' + style +
      ' onclick="goToSection(' + fi + ',' + i + ')">' +
      (isDone && !isCurrent ? '✓ ' : '') +
      (i + 1) + '. ' + sec.title +
      '</div>';
  });
  html += '</div>';
  return html;
}

function loadSection(f1, s1) {

var floor = FLOORS[f1];
if (!floor) { return; }

var si = parseInt(s1) || 0;
var section = floor.sections[si];
if (!section) section = floor.sections[0];
if (!section) { return; }

  var isDone = state.completed[section.id];
  var editorDef = getEditorDefaults(section);

  if (!sectionGateState[section.id]) {
    var quizGateDone = isDone || !section.quiz;
    if (!quizGateDone && section.quiz) {
      if (section.quiz.questions) {
        // Multi-question quiz — check quizMultiState
        var _ms = state.quizMultiState && state.quizMultiState[section.id];
        if (_ms && _ms.done) {
          var _total = section.quiz.questions.length;
          var _score = 0;
          section.quiz.questions.forEach(function(q, qi) { if (_ms.answers[qi] === q.correct) _score++; });
          if (_score >= Math.ceil(_total * 0.7)) quizGateDone = true;
        }
      } else {
        // Single-question quiz — check quizAnswered
        var _sq = state.quizAnswered && state.quizAnswered[section.id];
        if (_sq !== undefined && _sq === section.quiz.correct) quizGateDone = true;
      }
    }
    sectionGateState[section.id] = { read: true, code: !section.code, quiz: quizGateDone };
  }
  var gate = sectionGateState[section.id];
  var allDone = gate.read && gate.code && gate.quiz;
  var showEditor = !!(section.code);
  var showQuiz = !!(section.quiz || section.checklist);

  // Tab bar + go-back button
  var fi = state.currentFloor - 1;

  // Progress dots (locked inside sticky header)
  var dots = '<div class="section-progress-dots" style="--floor-color:' + (floor.color||'#c8a96e') + '">';
  floor.sections.forEach(function(sec, i) {
    var dotCls = i === si ? 'spd-dot spd-current' : (state.completed[sec.id] ? 'spd-dot spd-done' : 'spd-dot');
    dots += '<div class="' + dotCls + '" title="' + (i+1) + '. ' + sec.title + '" onclick="goToSection(' + fi + ',' + i + ')"></div>';
  });
  dots += '</div>';

  var tabs = '<div class="section-sticky-header">' +
    '<div class="section-tabs-bar">' +
    '<button class="section-tab-btn active" onclick="switchSectionTab(\'read\',\'' + section.id + '\',this)">Read</button>' +
    (showEditor ? '<button class="section-tab-btn" onclick="switchSectionTab(\'code\',\'' + section.id + '\',this)">Code Editor</button>' : '') +
    (showQuiz ? '<button class="section-tab-btn" onclick="switchSectionTab(\'quiz\',\'' + section.id + '\',this)">Quiz</button>' : '') +
    '<button class="section-tab-btn notes-tab-btn" onclick="switchSectionTab(\'notes\',\'' + section.id + '\',this)">📝 Notes</button>' +
    '</div>' +
    dots +
    '</div>' +
    '<div class="go-back-wrap"><button class="go-back-btn" onclick="typeof isMobile===\'function\'&&isMobile()?renderMobileHub():renderLearnHub()">&#8592; Go Back</button></div>';

  // READ
   var _readWords = (section.body || '').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  var _readMins = Math.max(1, Math.round(_readWords / 200));

  var r = '<div id="read-progress-bar"></div><div class="floor-hero" data-floor="' + (fi+1) + '">' +
    '<div class="floor-tag" style="color:' + floor.color + '">' + floor.tag + '</div>' +
    '<div class="floor-title">' + floor.title + '<br><em>' + floor.subtitle + '</em></div>' +
    '<div class="floor-meta">' +
    '<div class="floor-meta-item"><div class="floor-meta-label">SECTION</div><div class="floor-meta-value">' + (si+1) + ' of ' + floor.sections.length + '</div></div>' +
    '<div class="floor-meta-item floor-meta-listen"><button class="listen-btn" id="listen-btn-' + section.id + '" onclick="toggleNarration(\'' + section.id + '\')"><span class="listen-dot"></span>&#9654; Listen</button></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">OFFLINE</div><div class="floor-meta-value floor-meta-offline"><span class="offline-dot-pulse"></span>Available</div></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">READ TIME</div><div class="floor-meta-value">~' + _readMins + ' min</div></div>' +
    '</div>' +
    '<div class="floor-section-title">' + section.title + '</div>' +
    '</div>' +
    '<div class="section-content">';

  var _tldr = sectionTldr(section);
  if (_tldr) {
    r += '<div class="tldr-box">' +
      '<div class="owl-wrap">' +
      '<div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
      '<div class="owl-bubble">' +
      '<div class="owl-name">SAGE &mdash; TL;DR</div>' +
      '<div class="hint-text">' + escHtml(_tldr) + '</div>' +
      '</div></div></div>';
  }

  r += (section.hint ? '<button class="hint-btn" onclick="toggleHint(\'hint-' + section.id + '\')" title="Need help?">?</button>' : '');

  if (section.hint) {
    r += '<div class="hint-box" id="hint-' + section.id + '">' +
      '<div class="owl-wrap"><div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
      '<div class="owl-bubble"><div class="owl-name">SAGE &mdash; YOUR GUIDE</div>' +
      '<div class="hint-text">' + section.hint.replace(/\n/g, '<br>') + '</div></div></div></div>';
  }

  r += '<div class="section-body">' + section.body.replace(/\n/g, '<br><br>') + '</div>';

  if (section.callout) {
    var cIcon = section.callout.type === 'focus' ? '🎯' : section.callout.type === 'warning' ? '⚠️' : '💡';
    r += '<div class="callout ' + (section.callout.type || '') + '">' +
      '<div class="callout-icon-row"><span class="callout-icon">' + cIcon + '</span>' +
      '<div class="callout-label">' + section.callout.label + '</div></div>' +
      '<div class="callout-text">' + section.callout.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.code && section.code.lines) {
    r += '<div class="code-block"><div class="code-header">' +
      '<div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>' +
      '<div class="code-lang">' + section.code.lang + '</div></div>' +
      '<div class="code-body">' + section.code.lines.join('\n') + '</div></div>';
  }
  if (section.callout2) {
    var c2Icon = section.callout2.type === 'focus' ? '🎯' : section.callout2.type === 'warning' ? '⚠️' : '💡';
    r += '<div class="callout ' + (section.callout2.type || '') + '">' +
      '<div class="callout-icon-row"><span class="callout-icon">' + c2Icon + '</span>' +
      '<div class="callout-label">' + section.callout2.label + '</div></div>' +
      '<div class="callout-text">' + section.callout2.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.match) {
    var mt = section.match;
    var mid = 'match-' + section.id;
    var scrambled = mt.pairs.map(function(_, i) { return (i + 1) % mt.pairs.length; });
    r += '<div class="match-activity" id="' + mid + '">' +
      '<div class="match-label">QUICK MATCH</div>' +
      '<div class="match-prompt">' + mt.prompt + '</div>' +
      '<div class="match-cols">' +
      '<div class="match-col">';
    mt.pairs.forEach(function(pair, i) {
      r += '<div class="match-item match-left-item" id="match-l-' + mid + '-' + i + '" onclick="matchClick(\'' + mid + '\',\'left\',' + i + ')">' + pair.term + '</div>';
    });
    r += '</div><div class="match-col">';
    scrambled.forEach(function(pairIdx, displayIdx) {
      r += '<div class="match-item match-right-item" id="match-r-' + mid + '-' + displayIdx + '" data-pair="' + pairIdx + '" onclick="matchClick(\'' + mid + '\',\'right\',' + displayIdx + ')">' + mt.pairs[pairIdx].def + '</div>';
    });
    r += '</div></div>' +
      '<div class="match-complete" id="match-done-' + mid + '" style="display:none">&#10003; All matched correctly. +15 XP</div>' +
      '</div>';
  }

  if (section.checklist) {
    r += '<div class="checklist-card"><div class="checklist-card-label">BEFORE YOU CONTINUE</div><ul class="checklist">';
    section.checklist.forEach(function(item, ci) {
      var key = section.id + '-' + ci;
      var checked = (state.checklistDone || {})[key];
      r += '<li class="' + (checked ? 'checked' : '') + '" onclick="toggleCheck(\'' + key + '\',this)">' +
        '<div class="check-box">' + (checked ? '&#10003;' : '') + '</div>' + item + '</li>';
    });
    r += '</ul></div>';
  }


  r += '</div>';

  // CODE EDITOR
  var savedCode = localStorage.getItem('code_' + section.id) || editorDef.code;
  var c = '<div class="section-inner-pad">' +
    '<div style="font-family:\'Inter\',sans-serif;font-size:20px;font-weight:700;margin-bottom:6px;">Live Code Editor</div>' +
    '<div style="font-size:14px;color:var(--text-dim);margin-bottom:20px;">Write code on the left. See it render live on the right.</div>' +
    '<div class="editor-wrapper">' +
    '<div class="editor-topbar">' +
    '<div class="editor-mac-dots"><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div></div>' +
    '<div class="editor-filename">' + editorDef.filename + '</div>' +
    '<div class="editor-action-row">' +
    (section.hint ? '<button class="editor-hint-btn" onclick="showEditorHintPopup(\'' + section.id + '\')" title="Show hint">💡 Hint</button>' : '') +
    '<button class="editor-reset-btn" onclick="resetEditor(\'' + section.id + '\')">&#8634; Reset</button>' +
    '<button class="editor-run-btn" onclick="runEditor(\'' + section.id + '\')">&#9654; Run</button>' +
    '</div></div>' +
    '<div class="editor-split">' +
    '<div class="editor-code-pane">' +
    '<div class="editor-line-nums" id="lines-' + section.id + '">1</div>' +
    '<textarea class="editor-textarea" id="editor-' + section.id + '" spellcheck="false"' +
    ' oninput="editorInput(\'' + section.id + '\')" onkeydown="handleEditorTab(event)">' +
    escHtml(savedCode) + '</textarea></div>' +
    '<div class="editor-preview-pane">' +
    '<div class="editor-preview-label">PREVIEW</div>' +
    '<iframe class="editor-preview-iframe" id="preview-' + section.id + '" sandbox="allow-scripts"></iframe>' +
    '</div></div>' +
    '<div class="editor-console-wrap">' +
    '<div class="editor-console-bar"><span class="editor-console-label">OUTPUT</span>' +
    '<button class="editor-console-clear" onclick="clearEditorConsole(\'' + section.id + '\')">clear</button></div>' +
    '<div class="editor-console" id="console-' + section.id + '">' +
    '<div class="editor-console-line muted">&#9658; Click Run or edit to see output</div></div></div></div>' +
    '<div class="editor-challenges"><div class="editor-challenge-label">TRY THESE</div>';
  var allChDone = true;
  ((editorDef && editorDef.challenges) || []).forEach(function(ch, ci) {
    var chKey = section.id + '-ch-' + ci;
    var done = !!(state.challengesDone && state.challengesDone[chKey]);
    if (!done) allChDone = false;
    c += '<div class="editor-challenge-item ' + (done ? 'ch-done' : '') + '" id="chitem-' + chKey + '">' +
      '<button class="ch-check-btn" onclick="toggleChallenge(\'' + chKey + '\',' + fi + ',' + si + ')" title="' + (done ? 'Mark incomplete' : 'Mark done') + '">' +
      (done ? '✓' : '○') + '</button>' +
      '<span class="ch-text">' + ch + '</span></div>';
  });
  if ((editorDef && editorDef.challenges || []).length === 0) allChDone = true;
  c += '</div></div>';

  // QUIZ
  var answered = state.quizAnswered[section.id];
  var _msCheck = (state.quizMultiState && state.quizMultiState[section.id]) || null;
  var _quizAnswered = (answered !== undefined) ||
    (_msCheck && (_msCheck.done || Object.keys(_msCheck.answers || {}).length > 0));
  var _holoCard = true;
  var q = '<div class="section-inner-pad">';
  if (!_holoCard) {
    q += '<div style="font-family:\'Inter\',sans-serif;font-size:20px;font-weight:700;margin-bottom:6px;">Knowledge Check</div>' +
      '<div style="font-size:14px;color:var(--text-dim);margin-bottom:24px;">Answer to unlock the section and earn XP.</div>';
  }
  if (_holoCard) {
    q += '<div class="holo-quiz-card">' +
      '<div class="holo-quiz-inner' + (_quizAnswered ? ' holo-answered' : '') + '">' +
      '<div class="holo-quiz-back">' +
      '<div class="hq-corner hq-corner-tl"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
      '<div class="hq-center">' +
      sageOwlSVG(90, 99) +
      '<div class="holo-quiz-back-label">SAGE</div>' +
      '<div class="holo-quiz-back-sublabel">QUIZ</div>' +
      '</div>' +
      '<div class="holo-quiz-back-tagline">KNOWLEDGE IS POWER</div>' +
      '<div class="hq-corner hq-corner-br"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
      '</div>' +
      '<div class="holo-quiz-front">';
  }
  if (section.quiz) {
    var qz = section.quiz;
    if (qz.questions && Array.isArray(qz.questions)) {
      // Multi-question quiz
      var ms = (state.quizMultiState && state.quizMultiState[section.id]) || { current: 0, answers: {}, done: false };
      var totalQs = qz.questions.length;
      if (ms.done) {
        var msScore = 0;
        qz.questions.forEach(function(ques, qi) { if (ms.answers[qi] === ques.correct) msScore++; });
        var msPassed = msScore >= Math.ceil(totalQs * 0.7);
        var wrongReviewHtml = '';
        var wrongQs = qz.questions.filter(function(ques, qi) { return ms.answers[qi] !== ques.correct; });
        if (wrongQs.length > 0) {
          wrongReviewHtml = '<div class="quiz-wrong-review">' +
            '<div class="quiz-wrong-review-hdr">Review your mistakes</div>' +
            wrongQs.map(function(ques, _) {
              var qi = qz.questions.indexOf(ques);
              var userAns = ms.answers[qi];
              return '<div class="qwr-item">' +
                '<div class="qwr-question">' + escHtml(ques.question) + '</div>' +
                (userAns !== undefined ? '<div class="qwr-row qwr-wrong"><span class="qwr-icon">✗</span>' + escHtml(ques.options[userAns]) + '</div>' : '') +
                '<div class="qwr-row qwr-correct"><span class="qwr-icon">✓</span>' + escHtml(ques.options[ques.correct]) + '</div>' +
                (ques.feedback ? '<div class="qwr-feedback">' + escHtml(ques.feedback) + '</div>' : '') +
              '</div>';
            }).join('') +
          '</div>';
        }
        q += '<div class="quiz-block">' +
          '<div class="quiz-label">KNOWLEDGE CHECK COMPLETE</div>' +
          '<div class="quiz-multi-results">' +
          '<div class="quiz-results-score">' + msScore + '<span> / ' + totalQs + '</span></div>' +
          '<div class="quiz-results-label">' + (msPassed ? 'Nicely done.' : 'Keep studying.') + '</div>' +
          '<div class="quiz-results-msg">' + (msPassed ? 'Section unlocked — mark it complete when ready.' : 'Review the material above, then try again.') + '</div>' +
          wrongReviewHtml +
          (!msPassed ? '<button class="quiz-retry-btn" onclick="retryMultiQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">Retry Quiz</button>' : '') +
          '</div></div>';
      } else {
        var cur = ms.current;
        var curQ = qz.questions[cur];
        var curAnswered = ms.answers && ms.answers[cur] !== undefined ? ms.answers[cur] : undefined;
        var pct = Math.round(cur / totalQs * 100);
        var mQzState = curAnswered !== undefined ? (curAnswered === curQ.correct ? 'correct' : 'wrong') : 'unanswered';
        q += '<div class="quiz-block" data-quiz-state="' + mQzState + '">' +
          '<div class="quiz-multi-header">' +
          '<div class="quiz-label">KNOWLEDGE CHECK</div>' +
          '<div class="quiz-multi-progress-label">Question ' + (cur + 1) + ' of ' + totalQs + '</div>' +
          '</div>' +
          '<div class="quiz-multi-bar"><div class="quiz-multi-bar-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="quiz-question">' + curQ.question + '</div>' +
          '<div class="quiz-options">';
        curQ.options.forEach(function(opt, oi) {
          var cls = '';
          if (curAnswered !== undefined) {
            if (oi === curQ.correct) cls = 'correct';
            else if (oi === curAnswered) cls = 'wrong';
          }
          var icon = '<span class="quiz-opt-icon">' + (cls === 'correct' ? '✓' : cls === 'wrong' ? '✗' : '') + '</span>';
          q += '<button class="quiz-option ' + cls + '" style="--i:' + oi + '" onclick="answerMultiQuiz(\'' + section.id + '\',' + cur + ',' + oi + ',' + fi + ',' + si + ')"' +
            (curAnswered !== undefined ? ' disabled' : '') + '>' + icon + opt + '</button>';
        });
        var mFbHeader = '';
        if (curAnswered !== undefined) {
          var mFbCorrect = curAnswered === curQ.correct;
          mFbHeader = _quizFeedbackHtml(mFbCorrect, curQ.feedback);
        }
        q += '</div>' +
          '<div class="quiz-feedback ' + (curAnswered !== undefined ? 'visible' : '') + '">' +
          mFbHeader + '</div>';
        if (curAnswered !== undefined) {
          var isLast = cur === totalQs - 1;
          var mCurWrong = curAnswered !== curQ.correct;
          if (mCurWrong) {
            q += '<button class="quiz-retry-btn quiz-retry-inline" onclick="retryMultiQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">&#8635; Try Again</button>';
          }
          q += '<button class="quiz-next-btn" onclick="' + (isLast ? 'finishMultiQuiz' : 'nextMultiQuiz') + '(\'' + section.id + '\',' + fi + ',' + si + ')">' +
            (isLast ? 'See Results' : 'Next Question →') + '</button>';
        }
        q += '</div>';
      }
    } else {
      // Single-question quiz
      var qzState = answered !== undefined ? (answered === qz.correct ? 'correct' : 'wrong') : 'unanswered';
      q += '<div class="quiz-block" data-quiz-state="' + qzState + '"><div class="quiz-label">KNOWLEDGE CHECK</div>' +
        '<div class="quiz-question">' + qz.question + '</div><div class="quiz-options">';
      ((qz && qz.options) || []).forEach(function(opt, oi) {
        var cls = '';
        if (answered !== undefined) {
          if (oi === qz.correct) cls = 'correct';
          else if (oi === answered) cls = 'wrong';
        }
        var icon = '<span class="quiz-opt-icon">' + (cls === 'correct' ? '✓' : cls === 'wrong' ? '✗' : '') + '</span>';
        q += '<button class="quiz-option ' + cls + '" style="--i:' + oi + '" onclick="answerQuizTabbed(\'' + section.id + '\',' + oi + ',' + qz.correct + ',' + fi + ',' + si + ')"' +
          (answered !== undefined ? ' disabled' : '') + '>' + icon + opt + '</button>';
      });
      var fbHeader = '';
      if (answered !== undefined) {
        var fbCorrect = answered === qz.correct;
        fbHeader = _quizFeedbackHtml(fbCorrect, qz.feedback);
      }
      q += '</div><div class="quiz-feedback ' + (answered !== undefined ? 'visible' : '') + '" id="qf-' + section.id + '">' +
        fbHeader + '</div>' +
        (answered !== undefined && answered !== qz.correct
          ? '<button class="quiz-retry-btn quiz-retry-inline" onclick="retrySingleQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">&#8635; Try Again</button>'
          : '') +
        '</div>';
    }
  } else {
    q += '<div class="quiz-block"><div class="quiz-label">READING SECTION</div>' +
      '<div style="font-size:14px;color:var(--text-dim);margin-top:8px;">Complete the reading, then mark as done below.</div></div>';
  }
  if (_holoCard) {
    q += '</div></div></div>'; // close holo-quiz-front, holo-quiz-inner, holo-quiz-card
  }
  q += '</div>';

  // NOTES
  var noteVal = localStorage.getItem('note_' + section.id) || '';
  var noteWords = noteVal.trim() ? noteVal.trim().split(/\s+/).length : 0;
  var n = '<div class="notes-panel">' +
    '<div class="notes-header">' +
      '<div class="notes-header-left">' +
        '<div>' +
          '<div class="notes-title">Your Notes</div>' +
          '<div class="notes-subtitle">Explain what you learned in your own words</div>' +
        '</div>' +
      '</div>' +
      '<div class="notes-save-status" id="notes-saved-' + section.id + '">Saved</div>' +
    '</div>' +
    '<div class="notes-prompt-card">' +
      '<div class="notes-prompt-q">What\'s the one thing to remember about <em>' + escHtml(section.title) + '</em>?</div>' +
      '<div class="notes-prompt-hint">No jargon. If you can explain it simply, you understand it.</div>' +
    '</div>' +
    '<textarea class="notes-textarea" id="notes-ta-' + section.id + '" placeholder="Start with the main idea, then say why it matters..." oninput="onNoteInput(\'' + section.id + '\')">' + escHtml(noteVal) + '</textarea>' +
    '<div class="notes-footer">' +
      '<span class="notes-wc-wrap">' +
        '<span class="notes-wordcount' + (noteWords >= 30 ? ' notes-wc-active' : '') + '" id="notes-wc-' + section.id + '">' + noteWords + ' word' + (noteWords !== 1 ? 's' : '') + '</span>' +
        '<span class="notes-wc-check' + (noteWords >= 30 ? ' visible' : '') + '" id="notes-wc-check-' + section.id + '">&#10003;</span>' +
      '</span>' +
      '<span class="notes-footer-hint">Auto-saved to your browser</span>' +
    '</div>' +
    '</div>';

  // GATE
  var g = '<div class="gate-box' + (isDone ? ' complete' : '') + '">' +
    '<div class="gate-label">' + (isDone ? '&#10003; SECTION COMPLETE' : 'TO COMPLETE THIS SECTION') + '</div>' +
    '<div class="gate-checks">' +
    '<div class="gate-check-row done" id="gate-read-' + section.id + '"><div class="gate-check-dot">&#10003;</div>Read the section</div>' +
    (showEditor ? '<div class="gate-check-row ' + (gate.code ? 'done' : '') + '" id="gate-code-' + section.id + '"><div class="gate-check-dot">' + (gate.code ? '&#10003;' : '') + '</div>Try the code editor</div>' : '') +
    (showQuiz ? '<div class="gate-check-row ' + (gate.quiz ? 'done' : '') + '" id="gate-quiz-' + section.id + '"><div class="gate-check-dot">' + (gate.quiz ? '&#10003;' : '') + '</div>' + (section.quiz ? 'Pass the knowledge check' : 'Complete the checklist') + '</div>' : '') +
    '</div></div>';

  // NAV \u2014 for done sections show both buttons; for in-progress show only Previous (popup handles Next/Complete)
  var _isLastSec = fi === FLOORS.length - 1 && si === floor.sections.length - 1;
  var nav = '<div class="section-nav">' +
    '<button class="nav-btn" onclick="prevSection(' + fi + ',' + si + ')"' + ((fi === 0 && si === 0) ? ' disabled' : '')  + '>&#8592; Previous</button>' +
    (isDone && !_isLastSec ? '<button class="nav-btn primary" onclick="nextSection(' + fi + ',' + si + ')">Next \u2192</button>' : '') +
    '</div>';

if (!isLoggedIn && !isGuest) {
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('cover').style.display = 'none';
  document.body.style.overflow = 'hidden';
  return;
}
  document.getElementById('main-content').innerHTML = tabs +
    '<div class="section-panel active" id="spanel-read-' + section.id + '">' + r + '</div>' +
    (showEditor ? '<div class="section-panel" id="spanel-code-' + section.id + '">' + c + '</div>' : '') +
    (showQuiz ? '<div class="section-panel" id="spanel-quiz-' + section.id + '">' + q + '</div>' : '') +
    '<div class="section-panel" id="spanel-notes-' + section.id + '">' + n + '</div>' +
    g + nav;

  var _mc = document.getElementById('main-content');
  if (_mc) {
    _mc.classList.remove('section-slide-out-left', 'section-slide-out-right');
    _mc.classList.remove('section-slide-in', 'section-slide-in-left');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        if (_mc) _mc.classList.add('section-slide-in');
      });
    });
  }
  document.getElementById('main-content').scrollTop = 0;
  window.scrollTo(0, 0);
  startSectionTimer(section.id);
  checkProgressNudge(fi, si);
  checkStreakProtection();
  closeSectionCompletePopup();
  if (showEditor) setTimeout(function() { initEditor(section.id, editorDef.code); }, 100);
  setTimeout(function() {
    var rp = document.getElementById('spanel-read-' + section.id);
    if (rp) highlightKeyTerms(rp);
  }, 50);
  (function() {
    var mc = document.getElementById('main-content');
    if (!mc) return;
    if (mc._readProgressFn) mc.removeEventListener('scroll', mc._readProgressFn);
    mc._readProgressFn = function() {
      var bar = document.getElementById('read-progress-bar');
      if (!bar) return;
      var total = mc.scrollHeight - mc.clientHeight;
      var pct = total > 0 ? Math.min(100, (mc.scrollTop / total) * 100) : 100;
      bar.style.width = pct + '%';
    };
    mc.addEventListener('scroll', mc._readProgressFn);
  })();
}


function switchSectionTab(tab, sectionId, btn) {
  var mc = document.getElementById('main-content');
  mc.querySelectorAll('.section-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  mc.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
  var panel = document.getElementById('spanel-' + tab + '-' + sectionId);
  if (panel) panel.classList.add('active');
  if (tab === 'code') {
    var fi = state.currentFloor - 1;
    var section = FLOORS[fi].sections[state.currentSection];
    setTimeout(function() {
      initEditor(sectionId, getEditorDefaults(section).code);
      markGate(sectionId, 'code');
    }, 150);
    sageMessage('Write code. Break it. Fix it. That process is the actual learning.', 'tip');
  }
  if (tab === 'quiz') sageMessage('Take your time. The explanation after the answer matters as much as getting it right.', 'tip');
  if (tab === 'read') sageMessage('Read it like a road sign. Extract the pattern. Move on.', 'encourage');
  if (tab === 'notes') {
    updateNoteWordCount(sectionId);
    sageMessage('Writing what you learned in your own words is the best revision tool there is.', 'tip');
  }
}

function onNoteInput(sectionId) {
  updateNoteWordCount(sectionId);
  var ind = document.getElementById('notes-saved-' + sectionId);
  if (ind) { ind.textContent = 'Saving…'; ind.classList.remove('saved'); }
  clearTimeout(window._noteSaveTimer);
  window._noteSaveTimer = setTimeout(function() { saveNote(sectionId); }, 500);
}

function saveNote(sectionId) {
  var ta = document.getElementById('notes-ta-' + sectionId);
  if (!ta) return;
  localStorage.setItem('note_' + sectionId, ta.value);
  var ind = document.getElementById('notes-saved-' + sectionId);
  if (ind) { ind.textContent = 'Saved'; ind.classList.add('saved'); }
}

function updateNoteWordCount(sectionId) {
  var ta = document.getElementById('notes-ta-' + sectionId);
  var wc = document.getElementById('notes-wc-' + sectionId);
  var check = document.getElementById('notes-wc-check-' + sectionId);
  if (!ta || !wc) return;
  var words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
  wc.textContent = words + ' word' + (words !== 1 ? 's' : '');
  if (words >= 30) {
    wc.classList.add('notes-wc-active');
    if (check) check.classList.add('visible');
  } else {
    wc.classList.remove('notes-wc-active');
    if (check) check.classList.remove('visible');
  }
}

function openNotesReview() {
  var notesHtml = '';
  var totalNotes = 0;
  FLOORS.forEach(function(floor, fi) {
    var floorNotes = [];
    floor.sections.forEach(function(sec) {
      var note = localStorage.getItem('note_' + sec.id);
      if (note && note.trim()) {
        floorNotes.push({ title: sec.title, note: note });
        totalNotes++;
      }
    });
    if (floorNotes.length > 0) {
      notesHtml += '<div class="nr-floor-group">';
      notesHtml += '<div class="nr-floor-title" style="color:' + (floor.color || '#c8a96e') + '">Floor ' + (fi + 1) + ' — ' + floor.title + '</div>';
      floorNotes.forEach(function(item) {
        notesHtml += '<div class="nr-note-item">' +
          '<div class="nr-section-title">' + escHtml(item.title) + '</div>' +
          '<div class="nr-note-text">' + escHtml(item.note).replace(/\n/g, '<br>') + '</div>' +
          '</div>';
      });
      notesHtml += '</div>';
    }
  });
  if (totalNotes === 0) {
    notesHtml = '<div class="nr-empty">' +
      '<div class="nr-empty-icon">📝</div>' +
      '<div class="nr-empty-text">No notes yet. As you work through sections, jot down what you\'ve learned in the Notes tab — it\'ll all appear here for review.</div>' +
      '</div>';
  }
  var overlay = document.getElementById('notes-review-overlay');
  if (!overlay) return;
  overlay.innerHTML = '<div class="nr-panel">' +
    '<div class="nr-header">' +
      '<div class="nr-header-left">' +
        '<div class="nr-title">Your Notes</div>' +
        '<div class="nr-sub">' + totalNotes + ' note' + (totalNotes !== 1 ? 's' : '') + ' across your journey</div>' +
      '</div>' +
      '<button class="nr-close" onclick="closeNotesReview()">&#x2715;</button>' +
    '</div>' +
    '<div class="nr-body">' + notesHtml + '</div>' +
    '</div>';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeNotesReview() {
  var overlay = document.getElementById('notes-review-overlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function findSectionById(sectionId) {
  for (var _fi2 = 0; _fi2 < FLOORS.length; _fi2++) {
    for (var _si2 = 0; _si2 < FLOORS[_fi2].sections.length; _si2++) {
      if (FLOORS[_fi2].sections[_si2].id === sectionId) return { section: FLOORS[_fi2].sections[_si2], fi: _fi2, si: _si2, type: 'floor' };
    }
  }
  if (typeof TRACKS !== 'undefined') {
    for (var _ti = 0; _ti < TRACKS.length; _ti++) {
      for (var _si3 = 0; _si3 < TRACKS[_ti].sections.length; _si3++) {
        if (TRACKS[_ti].sections[_si3].id === sectionId) return { section: TRACKS[_ti].sections[_si3], trackId: TRACKS[_ti].id, si: _si3, type: 'track' };
      }
    }
  }
  return null;
}

function markGate(sectionId, key) {
  if (!sectionGateState[sectionId]) sectionGateState[sectionId] = { read: true, code: false, quiz: false };
  if (sectionGateState[sectionId][key]) return;
  sectionGateState[sectionId][key] = true;
  var el = document.getElementById('gate-' + key + '-' + sectionId);
  if (el) {
    el.classList.add('done');
    var dot = el.querySelector('.gate-check-dot');
    if (dot) {
      dot.innerHTML = '&#10003;';
      dot.style.animation = 'none';
      requestAnimationFrame(function() { dot.style.animation = 'checkTick 0.3s ease'; });
    }
  }
  var gate = sectionGateState[sectionId];
  if (gate.read && gate.code && gate.quiz) {
    // All gates cleared — show completion popup
    if (sectionId.indexOf('tr-') === 0) {
      setTimeout(function() { showTrackCompletePopup(sectionId); }, 300);
    } else {
      var _found = findSectionById(sectionId);
      var _fi = _found ? _found.fi : state.currentFloor - 1;
      var _si = _found ? _found.si : 0;
      setTimeout(function() { showSectionCompletePopup(sectionId, _fi, _si); }, 300);
    }
  } else if (gate.read && gate.quiz && !gate.code) {
    // Quiz cleared but code editor still pending — prompt user to open it
    setTimeout(function() { showCodeEditorPromptPopup(sectionId); }, 300);
  }
}

function showSectionCompletePopup(sectionId, fi, si) {
  closeSectionCompletePopup();
  var isDone = !!state.completed[sectionId];
  var floor = FLOORS[fi];
  var isLast = fi === FLOORS.length - 1 && floor && si === floor.sections.length - 1;
  var pop = document.createElement('div');
  pop.id = 'sec-complete-pop';
  pop.className = 'sec-complete-pop';
  var html = '<div class="scp-inner">';
  if (!isDone) {
    html += '<div class="scp-label">' + sageOwlSVG(20, 22) + '<span>All gates cleared!</span></div>';
    html += '<div class="scp-btns">';
    html += '<button class="scp-btn scp-complete" onclick="closeSectionCompletePopup(); completeSection(\'' + sectionId + '\',' + fi + ',' + si + ');">&#10003; Mark Complete &nbsp;<span class="scp-xp">+' + getSectionXP(fi) + ' XP</span></button>';
    if (!isLast) {
      html += '<button class="scp-btn scp-next" onclick="closeSectionCompletePopup(); nextSection(' + fi + ',' + si + ');">Next &#8594;</button>';
    }
    html += '</div>';
  } else {
    html += '<div class="scp-label"><span>&#10003; Section Complete</span></div>';
    if (!isLast) {
      html += '<button class="scp-btn scp-next scp-solo" onclick="closeSectionCompletePopup(); nextSection(' + fi + ',' + si + ');">Continue &#8594;</button>';
    }
  }
  html += '</div>';
  pop.innerHTML = html;
  document.body.appendChild(pop);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { pop.classList.add('scp-visible'); });
  });
}

function closeSectionCompletePopup() {
  var pop = document.getElementById('sec-complete-pop');
  if (!pop) return;
  pop.classList.remove('scp-visible');
  setTimeout(function() { if (pop && pop.parentNode) pop.parentNode.removeChild(pop); }, 300);
}

function showCodeEditorPromptPopup(sectionId) {
  closeSectionCompletePopup();
  var pop = document.createElement('div');
  pop.id = 'sec-complete-pop';
  pop.className = 'sec-complete-pop';
  pop.innerHTML = '<div class="scp-inner">' +
    '<div class="scp-label">' + sageOwlSVG(20, 22) + '<span>Quiz cleared. Now try the code editor.</span></div>' +
    '<button class="scp-btn scp-next scp-solo" onclick="closeSectionCompletePopup(); openCodeEditorFromPopup(\'' + sectionId + '\')">Open Code Editor &#8594;</button>' +
    '</div>';
  document.body.appendChild(pop);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { pop.classList.add('scp-visible'); });
  });
}

function openCodeEditorFromPopup(sectionId) {
  var codeBtn = null;
  document.querySelectorAll('.section-tab-btn').forEach(function(b) {
    if (b.textContent.trim() === 'Code Editor') codeBtn = b;
  });
  if (codeBtn) switchSectionTab('code', sectionId, codeBtn);
}

// ─────────────────────────────────────────────────────────────────
//  SPECIALISATION TRACKS
// ─────────────────────────────────────────────────────────────────

function isTrackUnlocked() {
  return isFloorComplete(FLOORS.length - 1);
}

function getTrack(trackId) {
  return (typeof TRACKS !== 'undefined' ? TRACKS : []).find(function(t) { return t.id === trackId; });
}

function isTrackComplete(trackId) {
  var track = getTrack(trackId);
  if (!track) return false;
  return track.sections.every(function(s) { return !!state.completed[s.id]; });
}

function renderTrackHub(trackId) {
  var track = getTrack(trackId);
  if (!track) return;
  var firstIncomplete = 0;
  for (var i = 0; i < track.sections.length; i++) {
    if (!state.completed[track.sections[i].id]) { firstIncomplete = i; break; }
    if (i === track.sections.length - 1) firstIncomplete = i;
  }
  loadTrackSection(trackId, firstIncomplete);
}

function showTrackCompletePopup(sectionId) {
  var ct = state.currentTrack;
  if (!ct) return;
  var trackId = ct.trackId, si = ct.si;
  closeSectionCompletePopup();
  var track = getTrack(trackId);
  var isDone = !!state.completed[sectionId];
  var isLast = track && si === track.sections.length - 1;
  var pop = document.createElement('div');
  pop.id = 'sec-complete-pop';
  pop.className = 'sec-complete-pop';
  var html = '<div class="scp-inner">';
  if (!isDone) {
    html += '<div class="scp-label">' + sageOwlSVG(20, 22) + '<span>All gates cleared!</span></div>';
    html += '<div class="scp-btns">';
    html += '<button class="scp-btn scp-complete" onclick="closeSectionCompletePopup(); completeTrackSection(\'' + sectionId + '\',\'' + trackId + '\',' + si + ');">&#10003; Mark Complete &nbsp;<span class="scp-xp">+120 XP</span></button>';
    if (!isLast) {
      html += '<button class="scp-btn scp-next" onclick="closeSectionCompletePopup(); nextTrackSection(\'' + trackId + '\',' + si + ');">Next &#8594;</button>';
    }
    html += '</div>';
  } else {
    html += '<div class="scp-label"><span>&#10003; Section Complete</span></div>';
    if (!isLast) {
      html += '<button class="scp-btn scp-next scp-solo" onclick="closeSectionCompletePopup(); nextTrackSection(\'' + trackId + '\',' + si + ');">Continue &#8594;</button>';
    }
  }
  html += '</div>';
  pop.innerHTML = html;
  document.body.appendChild(pop);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { pop.classList.add('scp-visible'); });
  });
}

function completeTrackSection(sectionId, trackId, si) {
  closeSectionCompletePopup();
  var track = getTrack(trackId);
  if (!track) return;
  var section = track.sections[si];
  if (!section) return;
  var btn = document.getElementById('complete-btn-' + sectionId);
  var bx = window.innerWidth / 2, by = 300;
  if (btn) { var br = btn.getBoundingClientRect(); bx = br.left + br.width / 2; by = br.top + br.height / 2; }
  state.completed[sectionId] = true;
  markSectionComplete(sectionId);
  markStreakProtected();
  awardXP(120, 'track-' + sectionId, bx, by);
  playCompletionSound();
  trackDailySection();
  var secName = section.title;
  logActivity('section', 'Completed: ' + secName + ' [' + track.title + ' Track]', 120);
  var _prevBadges = (state.earnedBadges || []).slice();
  updateAchievements();
  updateDailyGoalBar();
  updateTopChips();
  renderNav();
  saveState();
  showSectionRecap(section, function() {
    setTimeout(function() {
      if (si < track.sections.length - 1) {
        var mc = document.getElementById('main-content');
        if (mc) mc.classList.add('section-slide-out-left');
        setTimeout(function() { loadTrackSection(trackId, si + 1); }, 220);
      } else {
        loadTrackSection(trackId, si);
        sageMessage('Track complete. You\'ve finished the ' + track.title + ' track.', 'celebrate');
      }
    }, 180);
  });
}

function nextTrackSection(trackId, si) {
  closeSectionCompletePopup();
  var track = getTrack(trackId);
  if (!track) return;
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-left');
  setTimeout(function() {
    if (si < track.sections.length - 1) { loadTrackSection(trackId, si + 1); }
    else { if (typeof isMobile === 'function' && isMobile() && typeof renderMobileHub === 'function') { renderMobileHub(); } else { renderLearnHub(); } }
  }, 220);
}

function prevTrackSection(trackId, si) {
  closeSectionCompletePopup();
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-right');
  setTimeout(function() {
    if (si > 0) { loadTrackSection(trackId, si - 1); }
    else { if (typeof isMobile === 'function' && isMobile() && typeof renderMobileHub === 'function') { renderMobileHub(); } else { renderLearnHub(); } }
  }, 220);
}

function loadTrackSection(trackId, si) {
  var track = getTrack(trackId);
  if (!track) return;
  si = parseInt(si) || 0;
  var section = track.sections[si];
  if (!section) return;
  state.currentTrack = { trackId: trackId, si: si };
  saveState();

  var isDone = !!state.completed[section.id];
  var editorDef = getEditorDefaults(section);

  if (!sectionGateState[section.id]) {
    var quizGateDone = isDone || !section.quiz;
    if (!quizGateDone && section.quiz) {
      if (section.quiz.questions) {
        var _ms = state.quizMultiState && state.quizMultiState[section.id];
        if (_ms && _ms.done) {
          var _total = section.quiz.questions.length;
          var _score = 0;
          section.quiz.questions.forEach(function(q, qi) { if (_ms.answers[qi] === q.correct) _score++; });
          if (_score >= Math.ceil(_total * 0.7)) quizGateDone = true;
        }
      } else {
        var _sq = state.quizAnswered && state.quizAnswered[section.id];
        if (_sq !== undefined && _sq === section.quiz.correct) quizGateDone = true;
      }
    }
    sectionGateState[section.id] = { read: true, code: !section.code, quiz: quizGateDone };
  }
  var gate = sectionGateState[section.id];
  var allDone = gate.read && gate.code && gate.quiz;
  var showEditor = !!(section.code);
  var showQuiz = !!(section.quiz || section.checklist);
  var color = track.color || '#c8a96e';

  // Tabs
  var dots = '<div class="section-progress-dots" style="--floor-color:' + color + '">';
  track.sections.forEach(function(sec, i) {
    var dotCls = i === si ? 'spd-dot spd-current' : (state.completed[sec.id] ? 'spd-dot spd-done' : 'spd-dot');
    dots += '<div class="' + dotCls + '" title="' + (i+1) + '. ' + sec.title + '" onclick="loadTrackSection(\'' + trackId + '\',' + i + ')"></div>';
  });
  dots += '</div>';

  var tabs = '<div class="section-sticky-header">' +
    '<div class="section-tabs-bar">' +
    '<button class="section-tab-btn active" onclick="switchSectionTab(\'read\',\'' + section.id + '\',this)">Read</button>' +
    (showEditor ? '<button class="section-tab-btn" onclick="switchSectionTab(\'code\',\'' + section.id + '\',this)">Code Editor</button>' : '') +
    (showQuiz ? '<button class="section-tab-btn" onclick="switchSectionTab(\'quiz\',\'' + section.id + '\',this)">Quiz</button>' : '') +
    '<button class="section-tab-btn notes-tab-btn" onclick="switchSectionTab(\'notes\',\'' + section.id + '\',this)">&#128221; Notes</button>' +
    '</div>' + dots +
    '</div>' +
    '<div class="go-back-wrap"><button class="go-back-btn" onclick="typeof isMobile===\'function\'&&isMobile()?renderMobileHub():renderLearnHub()">&#8592; Go Back</button></div>';

  // READ
  var _readWords = (section.body || '').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  var _readMins = Math.max(1, Math.round(_readWords / 200));
  var r = '<div id="read-progress-bar"></div><div class="floor-hero" style="--floor-color:' + color + '">' +
    '<div class="floor-tag" style="color:' + color + '">' + track.tag + '</div>' +
    '<div class="floor-title">' + track.title + '<br><em>' + track.subtitle + '</em></div>' +
    '<div class="floor-meta">' +
    '<div class="floor-meta-item"><div class="floor-meta-label">SECTION</div><div class="floor-meta-value">' + (si+1) + ' of ' + track.sections.length + '</div></div>' +
    '<div class="floor-meta-item floor-meta-listen"><button class="listen-btn" id="listen-btn-' + section.id + '" onclick="toggleNarration(\'' + section.id + '\')"><span class="listen-dot"></span>&#9654; Listen</button></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">READ TIME</div><div class="floor-meta-value">~' + _readMins + ' min</div></div>' +
    '</div>' +
    '<div class="floor-section-title">' + section.title + '</div>' +
    '</div>' +
    '<div class="section-content">';

  var _tldr = sectionTldr(section);
  if (_tldr) {
    r += '<div class="tldr-box"><div class="owl-wrap"><div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
      '<div class="owl-bubble"><div class="owl-name">SAGE &mdash; TL;DR</div><div class="hint-text">' + escHtml(_tldr) + '</div></div></div></div>';
  }

  r += (section.hint ? '<button class="hint-btn" onclick="toggleHint(\'hint-' + section.id + '\')" title="Need help?">?</button>' : '');
  if (section.hint) {
    r += '<div class="hint-box" id="hint-' + section.id + '"><div class="owl-wrap"><div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
      '<div class="owl-bubble"><div class="owl-name">SAGE &mdash; YOUR GUIDE</div><div class="hint-text">' + section.hint.replace(/\n/g, '<br>') + '</div></div></div></div>';
  }
  r += '<div class="section-body">' + section.body.replace(/\n/g, '<br><br>') + '</div>';
  if (section.callout) {
    var cIcon = section.callout.type === 'focus' ? '&#127919;' : section.callout.type === 'warning' ? '&#9888;&#65039;' : '&#128161;';
    r += '<div class="callout ' + (section.callout.type || '') + '"><div class="callout-icon-row"><span class="callout-icon">' + cIcon + '</span><div class="callout-label">' + section.callout.label + '</div></div><div class="callout-text">' + section.callout.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.callout2) {
    var c2Icon = section.callout2.type === 'focus' ? '&#127919;' : '&#128161;';
    r += '<div class="callout ' + (section.callout2.type || '') + '"><div class="callout-icon-row"><span class="callout-icon">' + c2Icon + '</span><div class="callout-label">' + section.callout2.label + '</div></div><div class="callout-text">' + section.callout2.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.checklist) {
    r += '<div class="checklist-card"><div class="checklist-card-label">BEFORE YOU CONTINUE</div><ul class="checklist">';
    section.checklist.forEach(function(item, ci) {
      var key = section.id + '-' + ci;
      var checked = (state.checklistDone || {})[key];
      r += '<li class="' + (checked ? 'checked' : '') + '" onclick="toggleCheck(\'' + key + '\',this)"><div class="check-box">' + (checked ? '&#10003;' : '') + '</div>' + item + '</li>';
    });
    r += '</ul></div>';
  }
  r += '</div>';

  // CODE EDITOR
  var savedCode = localStorage.getItem('code_' + section.id) || editorDef.code;
  var c = '<div class="section-inner-pad">' +
    '<div style="font-family:\'Inter\',sans-serif;font-size:20px;font-weight:700;margin-bottom:6px;">Live Code Editor</div>' +
    '<div style="font-size:14px;color:var(--text-dim);margin-bottom:20px;">Write code on the left. See it render live on the right.</div>' +
    '<div class="editor-wrapper"><div class="editor-topbar">' +
    '<div class="editor-mac-dots"><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div></div>' +
    '<div class="editor-filename">' + editorDef.filename + '</div>' +
    '<div class="editor-action-row">' +
    (section.hint ? '<button class="editor-hint-btn" onclick="showEditorHintPopup(\'' + section.id + '\')" title="Show hint">💡 Hint</button>' : '') +
    '<button class="editor-reset-btn" onclick="resetEditor(\'' + section.id + '\')">&#8634; Reset</button>' +
    '<button class="editor-run-btn" onclick="runEditor(\'' + section.id + '\')">&#9654; Run</button></div></div>' +
    '<div class="editor-split"><div class="editor-code-pane"><div class="editor-line-nums" id="lines-' + section.id + '">1</div>' +
    '<textarea class="editor-textarea" id="editor-' + section.id + '" spellcheck="false" oninput="editorInput(\'' + section.id + '\')" onkeydown="handleEditorTab(event)">' + escHtml(savedCode) + '</textarea></div>' +
    '<div class="editor-preview-pane"><div class="editor-preview-label">PREVIEW</div>' +
    '<iframe class="editor-preview-iframe" id="preview-' + section.id + '" sandbox="allow-scripts"></iframe></div></div>' +
    '<div class="editor-console-wrap">' +
    '<div class="editor-console-bar"><span class="editor-console-label">OUTPUT</span>' +
    '<button class="editor-console-clear" onclick="clearEditorConsole(\'' + section.id + '\')">clear</button></div>' +
    '<div class="editor-console" id="console-' + section.id + '"><div class="editor-console-line muted">&#9658; Click Run or edit to see output</div></div></div></div>' +
    '<div class="editor-challenges"><div class="editor-challenge-label">TRY THESE</div>';
  ((editorDef && editorDef.challenges) || []).forEach(function(ch, ci) {
    var chKey = section.id + '-ch-' + ci;
    var done = !!(state.challengesDone && state.challengesDone[chKey]);
    c += '<div class="editor-challenge-item ' + (done ? 'ch-done' : '') + '" id="chitem-' + chKey + '">' +
      '<button class="ch-check-btn" onclick="toggleChallenge(\'' + chKey + '\',0,' + si + ')" title="' + (done ? 'Mark incomplete' : 'Mark done') + '">' + (done ? '&#10003;' : '&#9675;') + '</button>' +
      '<span class="ch-text">' + ch + '</span></div>';
  });
  c += '</div></div>';

  // QUIZ
  var answered = state.quizAnswered[section.id];
  var _msCheck = (state.quizMultiState && state.quizMultiState[section.id]) || null;
  var _quizAnswered = (answered !== undefined) || (_msCheck && (_msCheck.done || Object.keys(_msCheck.answers || {}).length > 0));
  var q = '<div class="section-inner-pad"><div class="holo-quiz-card"><div class="holo-quiz-inner' + (_quizAnswered ? ' holo-answered' : '') + '">' +
    '<div class="holo-quiz-back"><div class="hq-corner hq-corner-tl"><span class="hq-ace">A</span><span class="hq-suit">&#9824;</span></div>' +
    '<div class="hq-center">' + sageOwlSVG(90, 99) + '<div class="holo-quiz-back-label">SAGE</div><div class="holo-quiz-back-sublabel">QUIZ</div></div>' +
    '<div class="hq-corner hq-corner-br"><span class="hq-ace">A</span><span class="hq-suit">&#9824;</span></div></div>';

  if (section.quiz && section.quiz.questions) {
    // multi-question
    var _mState = (state.quizMultiState && state.quizMultiState[section.id]) || { answers: {}, done: false };
    q += '<div class="holo-quiz-front hq-multi">';
    section.quiz.questions.forEach(function(qItem, qi) {
      var _ans = _mState.answers[qi];
      var _answered = _ans !== undefined;
      q += '<div class="hq-multi-q' + (_answered ? ' hq-answered' : '') + '">' +
        '<div class="hq-question">' + (qi + 1) + '. ' + qItem.question + '</div>' +
        '<div class="hq-options">';
      qItem.options.forEach(function(opt, oi) {
        var cls = 'hq-opt';
        if (_answered) { cls += oi === qItem.correct ? ' hq-correct' : (oi === _ans ? ' hq-wrong' : ' hq-dim'); }
        q += '<button class="' + cls + '"' + (_answered ? ' disabled' : '') + ' onclick="answerMultiQuiz(\'' + section.id + '\',' + qi + ',' + oi + ',' + qItem.correct + ',\'' + trackId + '\',' + si + ')">' + opt + '</button>';
      });
      q += '</div>';
      if (_answered) q += '<div class="hq-feedback">' + (_ans === qItem.correct ? '&#10003; ' : '&#10007; ') + qItem.feedback + '</div>';
      q += '</div>';
    });
    q += '</div>';
  } else if (section.quiz) {
    q += '<div class="holo-quiz-front">' +
      '<div class="hq-question">' + section.quiz.question + '</div>' +
      '<div class="hq-options">';
    section.quiz.options.forEach(function(opt, oi) {
      var cls = 'hq-opt';
      if (answered !== undefined) { cls += oi === section.quiz.correct ? ' hq-correct' : (oi === answered ? ' hq-wrong' : ' hq-dim'); }
      q += '<button class="' + cls + '"' + (answered !== undefined ? ' disabled' : '') + ' onclick="answerTrackQuiz(\'' + section.id + '\',' + oi + ',' + section.quiz.correct + ',\'' + trackId + '\',' + si + ')">' + opt + '</button>';
    });
    q += '</div>';
    if (answered !== undefined) {
      q += _quizFeedbackHtml(answered === section.quiz.correct, section.quiz.feedback);
    }
    q += '</div>';
  }
  q += '</div></div></div>';

  // NOTES
  var noteVal = (state.notes && state.notes[section.id]) || '';
  var noteWords = noteVal.trim().split(/\s+/).filter(Boolean).length;
  var n = '<div class="section-inner-pad"><div class="notes-panel">' +
    '<div class="notes-header"><div class="notes-title">Your Notes</div>' +
    '<div class="notes-save-status" id="notes-saved-' + section.id + '">Saved</div></div>' +
    '<div class="notes-prompt-card"><div class="notes-prompt-q">What\'s the one thing to remember about <em>' + escHtml(section.title) + '</em>?</div>' +
    '<div class="notes-prompt-hint">No jargon. If you can explain it simply, you understand it.</div></div>' +
    '<textarea class="notes-textarea" id="notes-ta-' + section.id + '" placeholder="Start with the main idea, then say why it matters..." oninput="onNoteInput(\'' + section.id + '\')">' + escHtml(noteVal) + '</textarea>' +
    '<div class="notes-footer"><span class="notes-wc-wrap"><span class="notes-wordcount' + (noteWords >= 30 ? ' notes-wc-active' : '') + '" id="notes-wc-' + section.id + '">' + noteWords + ' word' + (noteWords !== 1 ? 's' : '') + '</span>' +
    '<span class="notes-wc-check' + (noteWords >= 30 ? ' visible' : '') + '" id="notes-wc-check-' + section.id + '">&#10003;</span></span>' +
    '<span class="notes-footer-hint">Auto-saved to your browser</span></div></div></div>';

  // GATE
  var g = '<div class="gate-box' + (isDone ? ' complete' : '') + '">' +
    '<div class="gate-label">' + (isDone ? '&#10003; SECTION COMPLETE' : 'TO COMPLETE THIS SECTION') + '</div>' +
    '<div class="gate-checks">' +
    '<div class="gate-check-row done" id="gate-read-' + section.id + '"><div class="gate-check-dot">&#10003;</div>Read the section</div>' +
    (showEditor ? '<div class="gate-check-row ' + (gate.code ? 'done' : '') + '" id="gate-code-' + section.id + '"><div class="gate-check-dot">' + (gate.code ? '&#10003;' : '') + '</div>Try the code editor</div>' : '') +
    (showQuiz ? '<div class="gate-check-row ' + (gate.quiz ? 'done' : '') + '" id="gate-quiz-' + section.id + '"><div class="gate-check-dot">' + (gate.quiz ? '&#10003;' : '') + '</div>' + (section.quiz ? 'Pass the knowledge check' : 'Complete the checklist') + '</div>' : '') +
    '</div></div>';

  // NAV
  var nav = '<div class="section-nav">' +
    '<button class="nav-btn" onclick="prevTrackSection(\'' + trackId + '\',' + si + ')"' + (si === 0 ? ' disabled' : '') + '>&#8592; Previous</button>' +
    (isDone && si < track.sections.length - 1 ? '<button class="nav-btn primary" onclick="nextTrackSection(\'' + trackId + '\',' + si + ')">Next &#8594;</button>' : '') +
    '</div>';

  var rs = document.getElementById('right-sidebar');
  if (rs) rs.style.display = 'none';
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = 'none';
  var grid = document.querySelector('.app-grid');
  if (grid) grid.style.gridTemplateColumns = '1fr';

  if (!isLoggedIn && !isGuest) {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('cover').style.display = 'none';
    document.body.style.overflow = 'hidden';
    return;
  }

  document.getElementById('main-content').innerHTML = tabs +
    '<div class="section-panel active" id="spanel-read-' + section.id + '">' + r + '</div>' +
    (showEditor ? '<div class="section-panel" id="spanel-code-' + section.id + '">' + c + '</div>' : '') +
    (showQuiz ? '<div class="section-panel" id="spanel-quiz-' + section.id + '">' + q + '</div>' : '') +
    '<div class="section-panel" id="spanel-notes-' + section.id + '">' + n + '</div>' +
    g + nav;

  var _mc = document.getElementById('main-content');
  if (_mc) {
    _mc.classList.remove('section-slide-out-left', 'section-slide-out-right', 'section-slide-in', 'section-slide-in-left');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { if (_mc) _mc.classList.add('section-slide-in'); });
    });
  }
  document.getElementById('main-content').scrollTop = 0;
  window.scrollTo(0, 0);
  startSectionTimer(section.id);
  closeSectionCompletePopup();
  if (allDone && !isDone) setTimeout(function() { showTrackCompletePopup(section.id); }, 400);
  if (showEditor) setTimeout(function() { initEditor(section.id, editorDef.code); }, 100);
  setTimeout(function() {
    var rp = document.getElementById('spanel-read-' + section.id);
    if (rp) highlightKeyTerms(rp);
  }, 50);
  (function() {
    var mc = document.getElementById('main-content');
    if (!mc) return;
    if (mc._readProgressFn) mc.removeEventListener('scroll', mc._readProgressFn);
    mc._readProgressFn = function() {
      var bar = document.getElementById('read-progress-bar');
      if (!bar) return;
      var total = mc.scrollHeight - mc.clientHeight;
      var pct = total > 0 ? Math.min(100, (mc.scrollTop / total) * 100) : 100;
      bar.style.width = pct + '%';
    };
    mc.addEventListener('scroll', mc._readProgressFn);
  })();
}

function answerTrackQuiz(sectionId, chosen, correct, trackId, si) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(10, 'quiz-' + sectionId, window.innerWidth / 2, 300);
    markGate(sectionId, 'quiz');
    logActivity('quiz', 'Quiz: ' + (getTrack(trackId) && getTrack(trackId).sections[si] ? getTrack(trackId).sections[si].title : sectionId), 15);
  }
  loadTrackSection(trackId, si);
}

function answerMultiQuiz(sectionId, qi, chosen, correct, trackId, si) {
  if (!state.quizMultiState) state.quizMultiState = {};
  if (!state.quizMultiState[sectionId]) state.quizMultiState[sectionId] = { answers: {}, done: false };
  state.quizMultiState[sectionId].answers[qi] = chosen;
  var track = getTrack(trackId);
  if (!track) return;
  var section = track.sections[si];
  if (section && section.quiz && section.quiz.questions) {
    var total = section.quiz.questions.length;
    var answered = Object.keys(state.quizMultiState[sectionId].answers).length;
    if (answered >= total) {
      state.quizMultiState[sectionId].done = true;
      var score = 0;
      section.quiz.questions.forEach(function(q, qIdx) { if (state.quizMultiState[sectionId].answers[qIdx] === q.correct) score++; });
      if (score >= Math.ceil(total * 0.7)) markGate(sectionId, 'quiz');
    }
  }
  saveState();
  loadTrackSection(trackId, si);
}

function _quizFeedbackHtml(correct, feedbackText) {
  var header = '<div class="quiz-feedback-header ' + (correct ? 'correct' : 'wrong') + '">' +
    '<span class="quiz-feedback-icon">' + (correct ? '✓' : '✗') + '</span>' +
    '<span class="quiz-feedback-title">' + (correct ? 'Correct!' : 'Not quite.') + '</span>' +
    '</div>';
  var body;
  if (correct) {
    body = '<div class="quiz-feedback-body">' + feedbackText + '</div>';
  } else {
    body = '<div class="quiz-feedback-body">' +
      '<div class="owl-wrap">' +
      '<div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
      '<div class="owl-bubble">' +
      '<div class="owl-name">SAGE &mdash; WHY THIS MATTERS</div>' +
      '<div class="hint-text">' + feedbackText + '</div>' +
      '</div></div></div>';
  }
  return header + body;
}

function answerQuizTabbed(sectionId, chosen, correct, fi, si) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(10, 'quiz-' + sectionId, window.innerWidth / 2, 300);
    markGate(sectionId, 'quiz');
    var secName = FLOORS[fi] && FLOORS[fi].sections[si] ? FLOORS[fi].sections[si].title : sectionId;
    logActivity('quiz', 'Quiz: ' + secName, 15);
  }
  renderFloor(fi, si);
  setTimeout(function() {
    var quizPanel = document.getElementById('spanel-quiz-' + sectionId);
    if (quizPanel) {
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ if (b.textContent === 'Quiz') b.classList.add('active'); });
      quizPanel.classList.add('active');
    }
  }, 50);
}

function _focusQuizPanel(sectionId) {
  setTimeout(function() {
    var quizPanel = document.getElementById('spanel-quiz-' + sectionId);
    if (quizPanel) {
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ if (b.textContent === 'Quiz') b.classList.add('active'); });
      quizPanel.classList.add('active');
    }
  }, 50);
}

function answerMultiQuiz(sectionId, qIndex, chosen, fi, si) {
  if (!state.quizMultiState) state.quizMultiState = {};
  if (!state.quizMultiState[sectionId]) state.quizMultiState[sectionId] = { current: 0, answers: {}, done: false };
  var ms = state.quizMultiState[sectionId];
  if (ms.answers[qIndex] !== undefined) return;
  ms.answers[qIndex] = chosen;
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function nextMultiQuiz(sectionId, fi, si) {
  if (!state.quizMultiState || !state.quizMultiState[sectionId]) return;
  state.quizMultiState[sectionId].current++;
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function finishMultiQuiz(sectionId, fi, si) {
  if (!state.quizMultiState || !state.quizMultiState[sectionId]) return;
  var ms = state.quizMultiState[sectionId];
  ms.done = true;
  var section = FLOORS[fi] && FLOORS[fi].sections[si];
  if (section && section.quiz && section.quiz.questions) {
    var total = section.quiz.questions.length;
    var score = 0;
    section.quiz.questions.forEach(function(ques, qi) { if (ms.answers[qi] === ques.correct) score++; });
    if (score >= Math.ceil(total * 0.7)) {
      awardXP(10, 'quiz-' + sectionId, window.innerWidth / 2, 300);
      markGate(sectionId, 'quiz');
      logActivity('quiz', 'Quiz: ' + section.title, 15);
    }
  }
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function retryMultiQuiz(sectionId, fi, si) {
  if (!state.quizMultiState) state.quizMultiState = {};
  state.quizMultiState[sectionId] = { current: 0, answers: {}, done: false };
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function retrySingleQuiz(sectionId, fi, si) {
  delete state.quizAnswered[sectionId];
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

var editorTimers = {};
var _consoleListeners = {};

var _CONSOLE_SHIM = '<script>(function(){' +
  'function _send(t,a){' +
    'var m=Array.prototype.slice.call(a).map(function(x){' +
      'try{return typeof x==="object"?JSON.stringify(x,null,2):String(x);}catch(e){return"[object]";}' +
    '}).join(" ");' +
    'try{parent.postMessage({__cb:1,t:t,m:m},"*");}catch(e){}' +
  '}' +
  'window.console={' +
    'log:function(){_send("log",arguments);},' +
    'warn:function(){_send("warn",arguments);},' +
    'error:function(){_send("err",arguments);},' +
    'info:function(){_send("log",arguments);}' +
  '};' +
  'window.onerror=function(msg,src,line){' +
    'try{parent.postMessage({__cb:1,t:"err",m:msg+" (line "+line+")"},"*");}catch(e){}' +
    'return true;' +
  '};' +
'})();<\/script>';

function initEditor(sectionId, defaultCode) {
  var ta = document.getElementById('editor-' + sectionId);
  if (!ta) return;
  var saved = localStorage.getItem('code_' + sectionId);
  // Use saved code if available, otherwise fall back to the provided default
  ta.value = saved || defaultCode || '';
  updateEditorLines(sectionId);
  runEditorCode(sectionId);
}

function editorInput(sectionId) {
  updateEditorLines(sectionId);
  var ta = document.getElementById('editor-' + sectionId);
  if (ta) localStorage.setItem('code_' + sectionId, ta.value);
  clearTimeout(editorTimers[sectionId]);
  editorTimers[sectionId] = setTimeout(function(){ runEditorCode(sectionId); }, 700);
}

function runEditor(sectionId) {
  runEditorCode(sectionId);
}

function runEditorCode(sectionId) {
  var ta = document.getElementById('editor-' + sectionId);
  var frame = document.getElementById('preview-' + sectionId);
  var con = document.getElementById('console-' + sectionId);
  if (!ta || !frame) return;

  var found = findSectionById(sectionId);
  var section = found ? FLOORS[found.fi].sections[found.si] : null;
  var lang = (section && section.code && section.code.lang) ? section.code.lang.toLowerCase() : 'html';
  var isJs = lang === 'javascript' || lang === 'js';

  if (!isJs) {
    frame.srcdoc = ta.value;
    _consoleWrite(con, [{ t: 'ok', m: 'Rendered successfully' }]);
    markGate(sectionId, 'code');
    return;
  }

  // JS: inject console shim and capture output
  var code = ta.value;
  var isHtmlDoc = /^\s*(<(!DOCTYPE|html))/i.test(code);
  var safeCode = code.replace(/<\/script>/gi, '<\\/script>');

  var doc;
  if (isHtmlDoc) {
    // Inject shim right after <head> tag, or prepend if no <head>
    if (/<head[^>]*>/i.test(code)) {
      doc = code.replace(/(<head[^>]*>)/i, '$1' + _CONSOLE_SHIM);
    } else {
      doc = _CONSOLE_SHIM + code;
    }
  } else {
    // Pure JS — wrap in minimal HTML runner
    doc = '<!DOCTYPE html><html><head>' + _CONSOLE_SHIM + '</head>' +
          '<body style="background:#0a0a0a;margin:0;padding:16px;">' +
          '<script>' + safeCode + '<\/script></body></html>';
  }

  _consoleWrite(con, [{ t: 'muted', m: 'Running…' }]);

  // Remove old listener before attaching new one
  if (_consoleListeners[sectionId]) window.removeEventListener('message', _consoleListeners[sectionId]);

  var target = (section && section.code && section.code.target != null) ? String(section.code.target).trim() : null;
  var logLines = [];

  _consoleListeners[sectionId] = function(e) {
    if (!e.data || !e.data.__cb) return;
    if (e.source !== frame.contentWindow) return;
    logLines.push({ t: e.data.t, m: e.data.m });
    _consoleWrite(con, logLines);
    if (target !== null) {
      var output = logLines.filter(function(l){ return l.t === 'log'; }).map(function(l){ return l.m; }).join('\n').trim();
      if (output === target) markGate(sectionId, 'code');
    } else {
      markGate(sectionId, 'code');
    }
  };
  window.addEventListener('message', _consoleListeners[sectionId]);

  // HTML-doc JS sections with no target: mark gate + show success immediately (output goes to preview, not console)
  if (isHtmlDoc && target === null) {
    _consoleWrite(con, [{ t: 'ok', m: 'Rendered successfully' }]);
    markGate(sectionId, 'code');
  }

  frame.srcdoc = doc;
}

function _consoleWrite(con, lines) {
  if (!con) return;
  if (!lines.length) { con.innerHTML = '<div class="editor-console-line muted">&#9658; No output</div>'; return; }
  con.innerHTML = lines.map(function(l) {
    var cls = l.t === 'err' ? 'err' : l.t === 'warn' ? 'warn' : l.t === 'ok' ? 'ok' : l.t === 'muted' ? 'muted' : 'log';
    var icon = l.t === 'err' ? '&#10006;' : l.t === 'warn' ? '&#9888;' : '&#9658;';
    var msg = escHtml(l.m);
    if (l.t === 'err') msg = _friendlyError(msg);
    return '<div class="editor-console-line ' + cls + '">' + icon + ' ' + msg + '</div>';
  }).join('');
  con.scrollTop = con.scrollHeight;
}

function _friendlyError(msg) {
  var tips = [
    [/is not defined/i, 'That variable or function hasn\'t been declared yet — check the spelling or where it\'s defined.'],
    [/unexpected token/i, 'Syntax error — look for a missing bracket, comma, or semicolon.'],
    [/cannot read prop/i, 'You\'re trying to use a property of something that doesn\'t exist.'],
    [/is not a function/i, 'That\'s not a function — it might be a variable or a typo.'],
    [/unexpected end/i, 'The code looks incomplete — check for a missing closing brace or bracket.'],
    [/invalid or unexpected/i, 'Syntax error — something is in the wrong place.']
  ];
  for (var i = 0; i < tips.length; i++) {
    if (tips[i][0].test(msg)) {
      return '<span class="con-err-raw">' + msg + '</span><br><span class="con-err-tip">💡 ' + tips[i][1] + '</span>';
    }
  }
  return msg;
}

function clearEditorConsole(sectionId) {
  var con = document.getElementById('console-' + sectionId);
  if (con) con.innerHTML = '<div class="editor-console-line muted">&#9658; Cleared</div>';
}

function resetEditor(sectionId) {
  var fi = state.currentFloor - 1;
  var section = FLOORS[fi].sections[state.currentSection];
  var ta = document.getElementById('editor-' + sectionId);
  if (ta) {
    ta.value = getEditorDefaults(section).code;
    localStorage.removeItem('code_' + sectionId);
    updateEditorLines(sectionId);
    runEditorCode(sectionId);
  }
}

function updateEditorLines(sectionId) {
  var ta = document.getElementById('editor-' + sectionId);
  var nums = document.getElementById('lines-' + sectionId);
  if (!ta || !nums) return;
  var lines = ta.value.split('\n').length;
  var html = '';
  for (var i = 1; i <= Math.max(lines, 10); i++) html += i + '<br>';
  nums.innerHTML = html;
}

function handleEditorTab(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    var t = e.target;
    var s = t.selectionStart;
    t.value = t.value.substring(0, s) + '  ' + t.value.substring(t.selectionEnd);
    t.selectionStart = t.selectionEnd = s + 2;
    updateEditorLines(t.id.replace('editor-', ''));
  }
}



function switchTopNav(tab, btn) {
  // Update top bar tabs
  document.querySelectorAll('.top-nav-tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn && btn.classList && btn.classList.contains('top-nav-tab')) btn.classList.add('active');

  // Update mobile bottom bar
  document.querySelectorAll('.mob-nav-btn').forEach(function(b){ b.classList.remove('active'); });
  var mobMap = { learn: 'mob-learn', build: 'mob-build', challenge: 'mob-challenge', map: 'mob-map', tools: 'mob-tools', premium: 'mob-premium', profile: 'mob-profile', revision: 'mob-revision', news: 'mob-news' };
  if (mobMap[tab]) {
    var mb = document.getElementById(mobMap[tab]);
    if (mb) mb.classList.add('active');
  }

  // Premium full-page mode — hide sidebars when on premium tab
  if (tab === 'premium') {
    document.body.classList.add('premium-mode');
  } else {
    document.body.classList.remove('premium-mode');
  }

  // Learn space mode — deep space background on main col
  if (tab === 'learn') {
    document.body.classList.add('learn-mode');
  } else {
    document.body.classList.remove('learn-mode');
  }

  // Profile mode — theme tint on main col only when on profile tab
  if (tab === 'profile') {
    document.body.classList.add('profile-mode');
  } else {
    document.body.classList.remove('profile-mode');
  }

  // Game mode — full viewport, no sidebars
  if (tab === 'game') {
    document.body.classList.add('game-mode');
  } else {
    document.body.classList.remove('game-mode');
    stopAllGameMusic();
  }

  // Reset revision deck when navigating away
  if (tab !== 'revision') _revDealtSession = false;

  // Show/hide panels
  document.querySelectorAll('.top-panel').forEach(function(p){ p.classList.remove('active'); });
  var mainContent = document.getElementById('main-content');
  var ls = document.getElementById('left-sidebar');

  if (tab === 'learn') {
    // Remove any panel-back bar that was injected by mobNavTo
    var panelBackBar = document.getElementById('mob-panel-back');
    if (panelBackBar) panelBackBar.remove();
    if (mainContent) mainContent.style.display = '';
    if (typeof isMobile === 'function' && isMobile()) {
      // Mobile: skip the desktop hub entirely — render the grid hub only
      if (typeof renderMobileHub === 'function') renderMobileHub();
    } else {
      renderLearnHub();
    }
  } else {
    stopHubCanvas();
    if (mainContent) mainContent.style.display = 'none';
    if (ls) ls.style.display = 'none';
    var panel = document.getElementById('panel-' + tab);
    if (panel) {
      panel.classList.add('active');
      if (tab === 'build') renderBuildPanel();
      if (tab === 'challenge') renderChallengePanel();
      if (tab === 'map') renderMapPanel();
      if (tab === 'tools') renderToolsPanel();
      if (tab === 'premium') renderPremiumPanel();
      if (tab === 'profile') renderProfilePanel();
      if (tab === 'game') renderGamePanel();
      if (tab === 'revision') { renderRevisionPanel(); if (!state.badgeFlags.revVisited) { state.badgeFlags.revVisited = true; saveState(); checkAndUnlockBadges(); } }
      if (tab === 'news') renderNewsPanel();
    }
  }

  // Scroll to top
  var mainCol = document.getElementById('main-col');
  if (mainCol) mainCol.scrollTop = 0;
}
function setMobActive(btn) {
  document.querySelectorAll('.mob-nav-btn').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
}

function toggleSidebar() {
  var sb = document.getElementById('left-sidebar');
  var ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.toggle('open');
  if (ov) ov.classList.toggle('visible');
}

function closeSidebar() {
  var sb = document.getElementById('left-sidebar');
  var ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('visible');
}

var FLOOR_COLORS = ['#c8a96e','#7eb8c8','#c87e9a','#9a7ec8','#7ec8a9','#c8967e','#e8d5a0'];

function renderVisualBuilding() {
  var wrap = document.getElementById('vb-building');
  if (!wrap) return;
  var roof = wrap.querySelector('.vb-roof');
  wrap.innerHTML = '';
  if (roof) { wrap.appendChild(roof); } else {
    var r = document.createElement('div');
    r.className = 'vb-roof';
    wrap.appendChild(r);
  }
  for (var i = FLOORS.length - 1; i >= 0; i--) {
    var color = FLOOR_COLORS[i] || '#c8a96e';
    var isUnlocked = true; // all floors unlocked
    var isActive = (state.currentFloor - 1) === i;
    var isComplete = isFloorComplete(i);
    var div = document.createElement('div');
    div.className = 'vb-floor-row' +
      (isActive ? ' vb-active' : '') +
      (isUnlocked ? ' vb-unlocked' : ' vb-locked');
    div.style.setProperty('--floor-color', color);
    if (isUnlocked) {
      div.onclick = (function(fi){ return function(){ goToFloor(fi); closeSidebar(); }; })(i);
    }
    div.innerHTML = '<div class="vb-wins"><div class="vb-win"></div><div class="vb-win"></div><div class="vb-win"></div></div>' +
      (isComplete ? '<div class="vb-fnum">\u2713</div>' : '');
    wrap.appendChild(div);
  }
}

function renderLeftNav() {
  var nav = document.getElementById('left-floor-nav');
  if (!nav) return;
  nav.innerHTML = '';

  var fi = state.currentFloor - 1;
  var floor = FLOORS[fi];
  if (!floor) return;
  var floorColor = floor.color || '#c8a96e';
  var floorNum = (fi + 1 < 10 ? '0' : '') + (fi + 1);

  // Set floor colour as a CSS variable so section items can use it
  nav.style.setProperty('--floor-color', floorColor);

  // Floor identity header
  var identity = document.createElement('div');
  identity.className = 'left-floor-identity';
  identity.innerHTML =
    '<div class="left-floor-id-tag" style="color:' + floorColor + '">FLOOR ' + floorNum + '</div>' +
    '<div class="left-floor-id-name">' + floor.title + '</div>' +
    '<div class="left-floor-id-divider" style="background:' + floorColor + '"></div>';
  nav.appendChild(identity);

  // Sections for current floor
  var secList = document.createElement('div');
  secList.className = 'left-section-list';
  floor.sections.forEach(function(sec, si) {
    var isDone = !!state.completed[sec.id];
    var isCurrent = si === state.currentSection;
    var item = document.createElement('div');
    item.className = 'left-section-item' + (isCurrent ? ' current' : '') + (isDone ? ' done' : '');
    item.innerHTML = '<div class="left-section-dot"></div>' + sec.title;
    item.onclick = (function(fii, sii){ return function(){ goToSection(fii, sii); closeSidebar(); }; })(fi, si);
    secList.appendChild(item);
  });
  nav.appendChild(secList);
}

function renderRightNav() {
  var fi = state.currentFloor - 1;
  var floor = FLOORS[fi];
  var label = document.getElementById('rs-floor-label');
  if (label) label.textContent = 'FLOOR ' + state.currentFloor + ' \u2014 SECTIONS';
  var list = document.getElementById('rs-section-list');
  if (list) {
    list.innerHTML = '';
    floor.sections.forEach(function(sec, si) {
      var isDone = !!state.completed[sec.id];
      var isCurrent = si === state.currentSection;
      var item = document.createElement('div');
      item.className = 'sec-progress-item' + (isCurrent ? ' sp-active' : '') + (isDone ? ' sp-done' : '');
      item.innerHTML = '<div class="sp-dot">' + (isDone ? '&#10003;' : (si+1)) + '</div><span>' + sec.title + '</span>';
      item.onclick = (function(sii){ return function(){ goToSection(fi, sii); }; })(si);
      list.appendChild(item);
    });
  }
  updateDailyGoalBar();
  updateAchievements();
  updateTopChips();
  updateLeftStats();
}

function updateTopChips() {
  var xp = document.getElementById('top-xp-chip');
  var st = document.getElementById('top-streak-chip');
  if (xp) xp.textContent = '\u26a1 ' + (state.xp || 0) + ' XP';
  if (st) st.textContent = '\uD83D\uDD25 ' + (state.streak || 0);
}

function getLevelName(n) {
  return ['','Curious','Learning','Building','Fluent','Advanced','Expert','Master'][n] || '';
}

function updateLeftStats() {
  var lvl = getCurrentLevel();
  var idx = 0;
  for (var i = 0; i < LEVELS.length; i++) { if (LEVELS[i] === lvl) { idx = i; break; } }
  var nextLvl = LEVELS[idx + 1];
  var lsLevel = document.getElementById('ls-level');
  var lsStreak = document.getElementById('ls-streak');
  var lsBar = document.getElementById('ls-xp-bar');
  var lsProgress = document.getElementById('ls-progress');
  if (lsLevel) lsLevel.textContent = lvl.level + ' \u2014 ' + getLevelName(lvl.level);
  if (lsStreak) lsStreak.textContent = '\uD83D\uDD25 ' + (state.streak || 0) + ' days';
  if (lsBar && nextLvl) {
    var pct = Math.min(100, Math.round(((state.xp - lvl.xp) / (nextLvl.xp - lvl.xp)) * 100));
    lsBar.style.width = pct + '%';
  }
  if (lsProgress) {
    var total = 0, done = 0;
    FLOORS.forEach(function(f){ f.sections.forEach(function(s){ total++; if (state.completed[s.id]) done++; }); });
    lsProgress.textContent = Math.round((done/total)*100) + '%';
  }
}

function updateDailyGoalBar() {
  var today = new Date().toDateString();
  var todayKey = 'daily_sections_' + today;
  var todaySecs = parseInt(localStorage.getItem(todayKey) || '0');
  var goal = parseInt(localStorage.getItem('codebook_daily_goal') || '2');
  var pct = Math.min(100, Math.round((todaySecs / goal) * 100));
  var remaining = Math.max(0, goal - todaySecs);
  var bar = document.getElementById('rs-goal-bar');
  var txt = document.getElementById('rs-goal-text');
  var pctEl = document.getElementById('rs-goal-pct');
  var sub = document.getElementById('rs-goal-sub');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = todaySecs + ' of ' + goal + ' sections';
  if (pctEl) pctEl.textContent = pct + '%';
  if (sub) sub.textContent = remaining > 0 ? remaining + ' more to hit your daily goal' : 'Daily goal complete! \uD83C\uDF89';
  var goalBtns = document.querySelectorAll('.goal-btn[data-goal]');
  goalBtns.forEach(function(b) { b.classList.toggle('goal-btn-active', parseInt(b.dataset.goal) === goal); });
}

function setDailyGoal(n) {
  localStorage.setItem('codebook_daily_goal', n);
  updateDailyGoalBar();
}

function updateAchievements() {
  checkAndUnlockBadges();
  renderAchievementGrid();
}

function renderAchievementGrid() {
  var grid = document.getElementById('rs-achievements');
  if (!grid || typeof BADGES === 'undefined') return;
  var earned = state.earnedBadges || [];
  grid.innerHTML = BADGES.map(function(b) {
    var unlocked = earned.indexOf(b.id) !== -1;
    return '<div class="ach-item' + (unlocked ? '' : ' ach-locked') + '" title="' + b.desc + '">' +
      '<div class="ach-icon">' + b.emoji + '</div>' +
      '<div class="ach-label">' + b.name + '</div>' +
      '</div>';
  }).join('');
}

function checkAndUnlockBadges() {
  if (typeof BADGES === 'undefined') return;
  if (!state.earnedBadges) state.earnedBadges = [];
  var newly = [];
  BADGES.forEach(function(b) {
    if (state.earnedBadges.indexOf(b.id) === -1 && b.check()) {
      state.earnedBadges.push(b.id);
      newly.push(b);
    }
  });
  if (newly.length) {
    saveState();
    renderAchievementGrid();
    newly.forEach(function(b, i) {
      setTimeout(function() { showBadgeUnlockToast(b); }, i * 1800);
    });
  }
}

function showBadgeUnlockToast(badge) {
  var existing = document.getElementById('badge-unlock-toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.id = 'badge-unlock-toast';
  toast.className = 'badge-unlock-toast';
  toast.innerHTML =
    '<div class="badge-unlock-top">BADGE UNLOCKED</div>' +
    '<div class="badge-unlock-emoji">' + badge.emoji + '</div>' +
    '<div class="badge-unlock-name">' + badge.name + '</div>' +
    '<div class="badge-unlock-desc">' + badge.desc + '</div>';
  document.body.appendChild(toast);
  setTimeout(function() { toast.classList.add('badge-unlock-toast--visible'); }, 30);
  setTimeout(function() {
    toast.classList.remove('badge-unlock-toast--visible');
    setTimeout(function() { if (toast.parentElement) toast.remove(); }, 400);
  }, 4000);
}

function updateSageSidebar(text) {
  var el = document.getElementById('sage-sidebar-text');
  if (!el || !text) return;
  el.style.opacity = '0';
  setTimeout(function() { el.textContent = text; el.style.opacity = '1'; }, 200);
}

function renderAllNav() {
  renderVisualBuilding();
  renderLeftNav();
  renderRightNav();
}


// Patch renderNav to also update sidebars
// Guard flag prevents infinite recursion (renderNav -> renderAllNav -> renderLeftNav -> goToFloor -> renderNav)
var _origRenderNav = null;
var _renderNavRunning = false;
function patchRenderNav() {
  _origRenderNav = window.renderNav;
  if (_origRenderNav) {
    window.renderNav = function() {
      if (_renderNavRunning) return;
      _renderNavRunning = true;
      try {
        _origRenderNav();
        renderAllNav();
      } finally {
        _renderNavRunning = false;
      }
    };
  }
}

function answerQuiz(sectionId, chosen, correct) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(10, 'quiz-' + sectionId, window.innerWidth / 2, 300);
  }
  const fi = state.currentFloor - 1;
  const si = state.currentSection;
  renderFloor(fi, si);
}

function toggleCheck(key, el) {
  // Checklist items are stored in a separate dict so they don't pollute
  // state.completed (which tracks section completion) or distort progress %.
  if (!state.checklistDone) state.checklistDone = {};
  state.checklistDone[key] = !state.checklistDone[key];
  el.classList.toggle('checked');
  el.querySelector('.check-box').textContent = state.checklistDone[key] ? '\u2713' : '';
  if (state.checklistDone[key]) {
    el.classList.add('just-checked');
    setTimeout(() => el.classList.remove('just-checked'), 400);
  }
  saveState();

  // Extract sectionId from key (format: sectionId-checkIndex, e.g. "7-3-0")
  var sectionId = key.replace(/-\d+$/, '');
  var section = null;
  for (var _fi = 0; _fi < FLOORS.length && !section; _fi++) {
    var _s = FLOORS[_fi].sections.find(function(s) { return s.id === sectionId; });
    if (_s) section = _s;
  }
  if (!section || !section.checklist) return;

  var allChecked = section.checklist.every(function(_, ci) {
    return !!(state.checklistDone || {})[sectionId + '-' + ci];
  });

  var existingBox = document.getElementById('checklist-sage-' + sectionId);
  if (!allChecked) {
    if (existingBox) existingBox.remove();
    return;
  }
  if (existingBox) return; // already showing

  var card = el.closest('.checklist-card');
  if (!card) return;

  var box = document.createElement('div');
  box.id = 'checklist-sage-' + sectionId;
  box.className = 'checklist-sage-box';
  box.innerHTML =
    '<div class="checklist-sage-inner">' +
      '<div class="checklist-sage-owl">' + sageOwlSVG(36, 40) + '</div>' +
      '<div class="checklist-sage-content">' +
        '<div class="checklist-sage-title">Great work.</div>' +
        '<div class="checklist-sage-body">You understand <strong>' + escHtml(section.title) + '</strong>. ' +
          "That thinking is yours now \u2014 not just something you read. " +
          "We'll test what you know with a quick quiz next.</div>" +
        '<button class="checklist-sage-btn" onclick="goToQuizTab(\'' + sectionId + '\')">Take the Quiz \u2192</button>' +
      '</div>' +
    '</div>';

  card.after(box);
  setTimeout(function() { box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 120);
}

function goToQuizTab(sectionId) {
  var btns = document.querySelectorAll('.section-tab-btn');
  for (var i = 0; i < btns.length; i++) {
    var oc = btns[i].getAttribute('onclick') || '';
    if (oc.indexOf("'quiz'") !== -1 && oc.indexOf(sectionId) !== -1) {
      switchSectionTab('quiz', sectionId, btns[i]);
      return;
    }
  }
}

// \u2500\u2500 ACTIVITY TRACKING \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function logActivity(type, label, xp) {
  var log = JSON.parse(localStorage.getItem('codebook_activity') || '[]');
  log.unshift({
    type: type,
    label: label,
    xp: xp || 0,
    time: Date.now()
  });
  // Keep last 20 entries
  if (log.length > 20) log = log.slice(0, 20);
  localStorage.setItem('codebook_activity', JSON.stringify(log));
}

function getActivityLog() {
  return JSON.parse(localStorage.getItem('codebook_activity') || '[]');
}

function timeAgo(ts) {
  var diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return 'just now';
  if (diff < 60) return diff + 'm ago';
  var h = Math.floor(diff / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}

// \u2500\u2500 FLOOR 1 LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var FC_FLOOR_TOPICS = [
  ['How the Internet Actually Works', 'How a Computer Reads Instructions', 'The Logic Behind All Code', 'Your First Look at Real Code', 'Floor 1 Check — Explain It Back'],
  ['What HTML Is', 'What CSS Is', 'How a Browser Renders Code', 'Building Your First Page', 'Styling Basics', 'The Box Model', 'Flexbox Layout', 'Building a Real Component', 'Profile Page Project', 'Solo Project — No Template'],
  ['What JavaScript Does', 'Variables and Data Types', 'Logic and Conditions', 'Functions', 'Loops', 'Arrays and Objects', 'DOM Manipulation', 'Events', 'Error Handling and Debugging', 'Guided To-Do List Project', 'Solo Interactive Project', 'Floor Check'],
  ['How Developers Think', 'Reading Documentation', 'What APIs Are', 'Fetch and Async/Await', 'Local Storage', 'Error Handling at Scale', 'Git and Version Control', 'Debugging Like a Developer', 'Weather App with Real API', 'Quiz App with Score Tracking', 'Solo Project — No Brief', 'Code Review of Own Work'],
  ['What Full Stack Means', 'How Servers Work', 'Databases', 'Authentication', 'Node and Express', 'Connecting to a Database', 'Building a REST API', 'Environment Variables and Security', 'Deployment', 'Connecting Frontend to Backend', 'Guided Full Stack Notes App', 'Adding Authentication', 'Deploying It Live', 'Solo Full Stack Project'],
  ['The Fork in the Road', 'Frontend Engineering', 'Backend Engineering', 'Full Stack vs Specialised', 'Mobile Development', 'DevOps and Cloud Infrastructure', 'Data Engineering', 'AI and ML Engineering', 'Security Engineering', 'Building a Portfolio That Works', 'Technical Interview Preparation', 'Open Source Contribution', 'Building in Public', 'Choosing Your First Role'],
  ['Your First Week', 'Reading a Large Codebase', 'Code Reviews', 'Technical Debt and Refactoring', 'System Design', 'Engineering in Teams', 'Production and On-Call', 'The Career Ladder', 'Engineering Leadership', 'The Long Game']
];

var FC_FLOOR_ICONS = ['🧠', '🌐', '⚡', '💡', '🔧', '🚀', '🏆'];

var FC_SAGE_POSES = [
  // Floor 1: Classic lecturer — cane angled forward, owl facing right
  { flip: 1,  angle: 28,  quote: 'Every expert started exactly here. Take your time.' },
  // Floor 2: Leaning in — cane pointing at the page
  { flip: 1,  angle: 50,  quote: 'The web is three files working together. Simple as that.' },
  // Floor 3: Energetic — cane thrust forward
  { flip: -1, angle: -30, quote: 'This floor changes everything. Pay close attention.' },
  // Floor 4: Thoughtful — cane horizontal like a pointer
  { flip: 1,  angle: 80,  quote: 'This is where you start thinking like a developer.' },
  // Floor 5: Firm — cane planted straight down
  { flip: 1,  angle: 10,  quote: 'Front end. Back end. One mind.' },
  // Floor 6: Surveying — cane swept wide
  { flip: -1, angle: -55, quote: 'Many paths open from here. All of them good.' },
  // Floor 7: Triumphant — cane raised high like a scepter
  { flip: 1,  angle: -70, quote: 'Your final floor. You have come a long way.' },
];


function toggleFloorInfo(fi) {
  var overlay = document.getElementById('fc-modal-overlay');
  if (!overlay) return;
  var floor = FLOORS[fi];
  if (!floor) return;
  var color = floor.color || '#c8a96e';
  var r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
  var glow = 'rgba('+r+','+g+','+b+',0.35)';
  var modal = document.getElementById('fc-modal');
  modal.style.setProperty('--fc-modal-color', color);
  modal.style.setProperty('--fc-modal-glow', glow);
  document.getElementById('fc-modal-badge').textContent = 'FLOOR ' + (fi + 1);
  document.getElementById('fc-modal-badge').style.color = color;
  document.getElementById('fc-modal-icon').textContent = FC_FLOOR_ICONS[fi] || '📚';
  document.getElementById('fc-modal-title').textContent = floor.title;
  var topics = FC_FLOOR_TOPICS[fi] || [];
  document.getElementById('fc-modal-list').innerHTML = topics.map(function(t) { return '<li>' + t + '</li>'; }).join('');
  var pose = FC_SAGE_POSES[fi] || FC_SAGE_POSES[0];
  var sageEl = document.getElementById('fc-modal-sage');
  if (sageEl) {
    sageEl.innerHTML =
      '<div class="fc-sage-figure">' +
        '<span class="fc-sage-owl" style="transform:scaleX(' + pose.flip + ')">' + sageOwlSVG(38, 42) + '</span>' +
        '<div class="fc-sage-cane" style="transform:rotate(' + pose.angle + 'deg)"></div>' +
      '</div>' +
      '<div class="fc-sage-quote">' + pose.quote + '</div>';
  }
  overlay.classList.remove('fc-modal-hidden');
  document.body.style.overflow = 'hidden';
}

function closeFloorModal() {
  var overlay = document.getElementById('fc-modal-overlay');
  if (overlay) overlay.classList.add('fc-modal-hidden');
  document.body.style.overflow = '';
}

function getFloorIcon(fi, sz) {
  sz = sz || 44;
  var fid = 'hfi' + fi;
  var flt = '<defs><filter id="' + fid + '" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var open = '<svg viewBox="0 0 48 48" width="' + sz + '" height="' + sz + '" class="holo-icon" style="display:block;margin:0 auto;overflow:visible">' + flt + '<g filter="url(#' + fid + ')">';
  var close = '</g></svg>';
  var s  = ';fill:none;stroke:var(--fc-color)';
  var sf = 'fill:var(--fc-color)';
  var d  = ';opacity:0.4';

  var icons = [
    // 0 — Neural Core: hexagonal neural lattice with nodes
    open +
    '<polygon points="24,4 41,14 41,34 24,44 7,34 7,14" style="stroke-width:1.2' + s + '"/>' +
    '<line x1="24" y1="4" x2="24" y2="44" style="stroke-width:0.6' + s + d + '"/>' +
    '<line x1="7" y1="14" x2="41" y2="34" style="stroke-width:0.6' + s + d + '"/>' +
    '<line x1="41" y1="14" x2="7" y2="34" style="stroke-width:0.6' + s + d + '"/>' +
    '<circle cx="24" cy="4" r="2.2" style="' + sf + '"/>' +
    '<circle cx="41" cy="14" r="2.2" style="' + sf + '"/>' +
    '<circle cx="41" cy="34" r="2.2" style="' + sf + '"/>' +
    '<circle cx="24" cy="44" r="2.2" style="' + sf + '"/>' +
    '<circle cx="7" cy="34" r="2.2" style="' + sf + '"/>' +
    '<circle cx="7" cy="14" r="2.2" style="' + sf + '"/>' +
    '<circle cx="24" cy="24" r="5" style="stroke-width:1.2' + s + '"/>' +
    '<circle cx="24" cy="24" r="2" style="' + sf + '"/>' +
    close,

    // 1 — Digital Network Sphere: wireframe globe
    open +
    '<circle cx="24" cy="24" r="20" style="stroke-width:1.5' + s + '"/>' +
    '<ellipse cx="24" cy="24" rx="20" ry="7" style="stroke-width:0.9' + s + '"/>' +
    '<ellipse cx="24" cy="24" rx="7" ry="20" style="stroke-width:0.9' + s + '"/>' +
    '<line x1="4" y1="24" x2="44" y2="24" style="stroke-width:0.5' + s + d + '"/>' +
    '<line x1="24" y1="4" x2="24" y2="44" style="stroke-width:0.5' + s + d + '"/>' +
    '<circle cx="24" cy="4" r="2" style="' + sf + '"/>' +
    '<circle cx="24" cy="44" r="2" style="' + sf + '"/>' +
    '<circle cx="4" cy="24" r="2" style="' + sf + '"/>' +
    '<circle cx="44" cy="24" r="2" style="' + sf + '"/>' +
    '<circle cx="24" cy="24" r="2.5" style="' + sf + '"/>' +
    close,

    // 2 — Energy Surge: crystalline lightning bolt
    open +
    '<polygon points="29,3 14,26 22,26 18,45 34,22 26,22" style="stroke-width:1.8;stroke-linejoin:miter' + s + '"/>' +
    '<line x1="27" y1="9" x2="22" y2="26" style="stroke-width:0.7' + s + d + '"/>' +
    '<line x1="26" y1="22" x2="21" y2="40" style="stroke-width:0.7' + s + d + '"/>' +
    '<circle cx="29" cy="3" r="2.2" style="' + sf + '"/>' +
    '<circle cx="18" cy="45" r="2.2" style="' + sf + '"/>' +
    '<circle cx="22" cy="26" r="1.5" style="' + sf + ';opacity:0.75"/>' +
    '<circle cx="26" cy="22" r="1.5" style="' + sf + ';opacity:0.75"/>' +
    close,

    // 3 — Innovation Crystal: cut-gem wireframe (diamond)
    open +
    '<polygon points="24,4 42,24 24,44 6,24" style="stroke-width:1.5' + s + '"/>' +
    '<polygon points="24,14 34,24 24,34 14,24" style="stroke-width:1' + s + '"/>' +
    '<line x1="24" y1="4" x2="24" y2="14" style="stroke-width:0.8' + s + d + '"/>' +
    '<line x1="42" y1="24" x2="34" y2="24" style="stroke-width:0.8' + s + d + '"/>' +
    '<line x1="24" y1="44" x2="24" y2="34" style="stroke-width:0.8' + s + d + '"/>' +
    '<line x1="6" y1="24" x2="14" y2="24" style="stroke-width:0.8' + s + d + '"/>' +
    '<circle cx="24" cy="4" r="2.2" style="' + sf + '"/>' +
    '<circle cx="42" cy="24" r="2.2" style="' + sf + '"/>' +
    '<circle cx="24" cy="44" r="2.2" style="' + sf + '"/>' +
    '<circle cx="6" cy="24" r="2.2" style="' + sf + '"/>' +
    close,

    // 4 — Engineering Glyph: hexagon + circuit ring
    open +
    '<polygon points="24,4 41,14 41,34 24,44 7,34 7,14" style="stroke-width:1.5' + s + '"/>' +
    '<circle cx="24" cy="24" r="9" style="stroke-width:1.2' + s + '"/>' +
    '<line x1="24" y1="15" x2="24" y2="4" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="24" y1="33" x2="24" y2="44" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="32" y1="19" x2="41" y2="14" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="32" y1="29" x2="41" y2="34" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="16" y1="19" x2="7" y2="14" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="16" y1="29" x2="7" y2="34" style="stroke-width:0.9' + s + d + '"/>' +
    '<circle cx="24" cy="24" r="2.5" style="' + sf + '"/>' +
    close,

    // 5 — Starship Launch: delta-wing fuselage
    open +
    '<polygon points="24,3 32,22 29,22 29,38 19,38 19,22 16,22" style="stroke-width:1.5;stroke-linejoin:round' + s + '"/>' +
    '<polygon points="19,28 10,40 19,40" style="stroke-width:1' + s + '"/>' +
    '<polygon points="29,28 38,40 29,40" style="stroke-width:1' + s + '"/>' +
    '<circle cx="24" cy="17" r="3.5" style="stroke-width:1' + s + '"/>' +
    '<line x1="21" y1="39" x2="19" y2="46" style="stroke-width:1.2' + s + d + '"/>' +
    '<line x1="24" y1="39" x2="24" y2="47" style="stroke-width:1.5' + s + ';opacity:0.55"/>' +
    '<line x1="27" y1="39" x2="29" y2="46" style="stroke-width:1.2' + s + d + '"/>' +
    '<circle cx="24" cy="3" r="2" style="' + sf + '"/>' +
    close,

    // 6 — Mastery Crest: shield + geometric star + crown points
    open +
    '<path d="M24,4 L38,10 L38,27 Q38,40 24,46 Q10,40 10,27 L10,10 Z" style="stroke-width:1.5' + s + '"/>' +
    '<polygon points="24,13 26,20 33,20 27.5,24.5 29.5,32 24,27.5 18.5,32 20.5,24.5 15,20 22,20" style="stroke-width:0.9' + s + '"/>' +
    '<line x1="18" y1="10" x2="18" y2="5" style="stroke-width:1' + s + ';opacity:0.7"/>' +
    '<line x1="24" y1="10" x2="24" y2="4" style="stroke-width:1.2' + s + ';opacity:0.85"/>' +
    '<line x1="30" y1="10" x2="30" y2="5" style="stroke-width:1' + s + ';opacity:0.7"/>' +
    '<circle cx="18" cy="4.5" r="1.5" style="' + sf + '"/>' +
    '<circle cx="24" cy="3" r="2" style="' + sf + '"/>' +
    '<circle cx="30" cy="4.5" r="1.5" style="' + sf + '"/>' +
    '<circle cx="24" cy="27.5" r="2" style="' + sf + '"/>' +
    close,
  ];
  return icons[fi] || icons[0];
}

function getChallengeIcon(type, color, sz) {
  sz = sz || 36;
  var c = color || 'var(--accent)';
  var cid = 'chi' + type.toLowerCase();
  var flt = '<defs><filter id="' + cid + '" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var open = '<svg viewBox="0 0 48 48" width="' + sz + '" height="' + sz + '" style="display:block;overflow:visible">' + flt + '<g filter="url(#' + cid + ')" stroke="' + c + '" fill="none">';
  var close = '</g></svg>';
  var sf = 'fill:' + c + ';stroke:none';
  switch (type) {
    case 'DAILY':
      return open +
        '<circle cx="24" cy="24" r="19" stroke-width="1.5"/>' +
        '<polygon points="27,8 15,27 23,27 21,40 33,21 25,21" stroke-width="1.8" stroke-linejoin="miter"/>' +
        '<circle cx="27" cy="8" r="2.2" style="' + sf + '"/>' +
        '<circle cx="21" cy="40" r="2.2" style="' + sf + '"/>' +
        close;
    case 'RECALL':
      return open +
        '<circle cx="24" cy="24" r="19" stroke-width="1.2"/>' +
        '<circle cx="24" cy="24" r="8" stroke-width="1"/>' +
        '<line x1="24" y1="5" x2="24" y2="16" stroke-width="0.8"/>' +
        '<line x1="24" y1="32" x2="24" y2="43" stroke-width="0.8"/>' +
        '<line x1="5" y1="24" x2="16" y2="24" stroke-width="0.8"/>' +
        '<line x1="32" y1="24" x2="43" y2="24" stroke-width="0.8"/>' +
        '<line x1="10" y1="10" x2="18" y2="18" stroke-width="0.6" opacity="0.45"/>' +
        '<line x1="38" y1="10" x2="30" y2="18" stroke-width="0.6" opacity="0.45"/>' +
        '<line x1="10" y1="38" x2="18" y2="30" stroke-width="0.6" opacity="0.45"/>' +
        '<line x1="38" y1="38" x2="30" y2="30" stroke-width="0.6" opacity="0.45"/>' +
        '<circle cx="24" cy="24" r="2.5" style="' + sf + '"/>' +
        '<circle cx="24" cy="5" r="1.8" style="' + sf + '"/>' +
        '<circle cx="24" cy="43" r="1.8" style="' + sf + '"/>' +
        '<circle cx="5" cy="24" r="1.8" style="' + sf + '"/>' +
        '<circle cx="43" cy="24" r="1.8" style="' + sf + '"/>' +
        close;
    case 'SPEED':
      return open +
        '<circle cx="24" cy="26" r="18" stroke-width="1.5"/>' +
        '<line x1="24" y1="8" x2="24" y2="14" stroke-width="1.2"/>' +
        '<line x1="42" y1="26" x2="36" y2="26" stroke-width="0.8" opacity="0.5"/>' +
        '<line x1="6" y1="26" x2="12" y2="26" stroke-width="0.8" opacity="0.5"/>' +
        '<line x1="24" y1="44" x2="24" y2="38" stroke-width="0.8" opacity="0.5"/>' +
        '<line x1="24" y1="26" x2="24" y2="14" stroke-width="2" stroke-linecap="round"/>' +
        '<line x1="24" y1="26" x2="35" y2="26" stroke-width="1.5" stroke-linecap="round"/>' +
        '<line x1="19" y1="7" x2="29" y2="7" stroke-width="1.5" stroke-linecap="round"/>' +
        '<circle cx="24" cy="26" r="2.5" style="' + sf + '"/>' +
        close;
    case 'STREAK':
      return open +
        '<polygon points="24,4 36,20 31,20 34,35 24,42 14,35 17,20 12,20" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<ellipse cx="24" cy="29" rx="5" ry="7" stroke-width="1" opacity="0.55"/>' +
        '<circle cx="24" cy="4" r="2.2" style="' + sf + '"/>' +
        '<circle cx="36" cy="20" r="1.5" style="' + sf + '"/>' +
        '<circle cx="12" cy="20" r="1.5" style="' + sf + '"/>' +
        close;
    case 'FLOOR':
      return open +
        '<path d="M14,6 L34,6 L34,20 Q34,32 24,36 Q14,32 14,20 Z" stroke-width="1.5"/>' +
        '<path d="M14,10 Q8,10 8,18 Q8,26 14,26" stroke-width="1.2"/>' +
        '<path d="M34,10 Q40,10 40,18 Q40,26 34,26" stroke-width="1.2"/>' +
        '<line x1="24" y1="36" x2="24" y2="42" stroke-width="1.5"/>' +
        '<line x1="16" y1="42" x2="32" y2="42" stroke-width="2" stroke-linecap="round"/>' +
        '<circle cx="24" cy="20" r="6" stroke-width="1"/>' +
        '<circle cx="24" cy="20" r="2.5" style="' + sf + '"/>' +
        close;
    default:
      return open +
        '<circle cx="24" cy="24" r="19" stroke-width="1.5"/>' +
        '<circle cx="24" cy="24" r="3" style="' + sf + '"/>' +
        close;
  }
}

function renderLearnHub() {
  var rs = document.getElementById('right-sidebar');
  if (rs) rs.style.display = 'none';
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = 'none';
  var grid = document.querySelector('.app-grid');
  if (grid) grid.style.gridTemplateColumns = '1fr';

  var sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  var totalSecs = sectionIds.size;
  var doneSecs = Object.keys(state.completed).filter(function(k) { return sectionIds.has(k) && state.completed[k]; }).length;
  var pct = totalSecs > 0 ? Math.round((doneSecs / totalSecs) * 100) : 0;
  var floorsComplete = FLOORS.filter(function(f, fi) { return isFloorComplete(fi); }).length;
  var floorsUnlocked = FLOORS.length; // all floors unlocked
  var currentFloorIdx = state.currentFloor - 1;



  function hexGlow(hex) {
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',0.28)';
  }

  var cardsHtml = FLOORS.map(function(f, fi) {
    var color    = f.color || '#c8a96e';
    var glow     = hexGlow(color);
    var done     = isFloorComplete(fi);
    var unlocked = true; // all floors unlocked
    var isActive = !done && fi === currentFloorIdx;

    var floorDone  = f.sections.filter(function(s) { return state.completed[s.id]; }).length;
    var floorTotal = f.sections.length;

    var statusClass, statusText;
    if (done) {
      statusClass = 'fc-status fc-status-done';   statusText = '&#10003; Complete';
    } else if (isActive) {
      statusClass = 'fc-status fc-status-active';  statusText = 'In Progress';
    } else if (unlocked) {
      statusClass = 'fc-status fc-status-open';    statusText = 'Available';
    } else {
      statusClass = 'fc-status fc-status-locked';  statusText = '&#128274; Locked';
    }

    var cardClasses = 'fc-card' +
      (!unlocked ? ' fc-card-locked' : '') +
      (isActive  ? ' fc-card-active' : '');
    var clickAttr  = unlocked ? ' onclick="' + (fi === 0 ? 'showSageFloorIntro(0)' : 'goToFloor(' + fi + ')') + '"' : '';
    var icon       = getFloorIcon(fi);
    var infoBtn    = '<button class="fc-info-btn" onclick="event.stopPropagation();toggleFloorInfo(' + fi + ')">&#x2139;</button>';

    return '<div class="' + cardClasses + '" style="--fc-color:' + color + ';--fc-glow:' + glow + ';min-width:118px;flex:1;max-width:160px;"' + clickAttr + '>' +
      '<div class="fc-accent"></div>' +
      infoBtn +
      '<div class="fc-floor-badge">Floor ' + (fi + 1) + '</div>' +
      '<div class="fc-icon">' + icon + '</div>' +
      '<div class="fc-title" style="font-size:11px;width:100%;word-break:normal;">' + f.title + '</div>' +
      '<div class="fc-sec-count">' + floorDone + '/' + floorTotal + ' sections</div>' +
      '<span class="' + statusClass + '">' + statusText + '</span>' +
    '</div>';
  }).join('');

  var overallBar = '<div class="ch-overall-bar-wrap">' +
    '<div class="ch-overall-bar"><div class="ch-overall-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="ch-overall-label">' + pct + '% complete</span>' +
    '</div>';

  var html = '<style id="hub-override">' +
    /* Header — bigger, glowing, high contrast */
    '.fc-header-label{color:rgba(160,220,255,0.88)!important;letter-spacing:4px!important;text-shadow:0 0 14px rgba(100,180,255,0.55)!important;}' +
    '.fc-header-title{color:#eef6ff!important;background:none!important;-webkit-text-fill-color:unset!important;animation:none!important;font-size:clamp(34px,5.5vw,60px)!important;font-weight:900!important;line-height:1.1!important;letter-spacing:-0.5px!important;text-shadow:0 4px 20px rgba(0,0,0,0.95),0 0 50px rgba(126,184,200,0.55),0 0 100px rgba(126,184,200,0.22)!important;}' +
    '.fc-header-sub{color:rgba(200,228,255,0.78)!important;text-shadow:0 2px 10px rgba(0,0,0,0.92)!important;}' +
    /* Cards — glassmorphism so they lift off the bloom */
    '.fc-card{min-width:130px!important;background:rgba(4,8,22,0.72)!important;border:1px solid rgba(255,255,255,0.16)!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;box-shadow:0 8px 40px rgba(0,0,0,0.8),0 2px 8px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.12)!important;}' +
    /* Card text contrast */
    '.fc-title{font-size:11px!important;width:100%!important;word-break:normal!important;overflow-wrap:normal!important;display:block!important;color:rgba(230,242,255,0.93)!important;text-shadow:0 1px 6px rgba(0,0,0,0.88)!important;}' +
    '.fc-floor-badge{opacity:1!important;text-shadow:0 0 10px rgba(var(--fc-color-rgb,200,169,110),0.7)!important;}' +
    '.fc-sec-count{color:rgba(180,212,255,0.68)!important;text-shadow:0 1px 4px rgba(0,0,0,0.8)!important;}' +
    /* Stats bar — glassy panel */
    '.fc-stats{width:100%!important;display:flex!important;justify-content:center!important;text-align:center!important;background:rgba(4,8,20,0.65)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;border:1px solid rgba(255,255,255,0.08)!important;border-radius:10px!important;}' +
    '.fc-stat{flex:1!important;text-align:center!important;background:transparent!important;}' +
    '.fc-stat-val{text-shadow:0 2px 12px rgba(0,0,0,0.92)!important;color:#ffffff!important;}' +
    '.fc-stat-label{color:rgba(200,228,255,0.78)!important;text-shadow:0 1px 6px rgba(0,0,0,0.8)!important;}' +
    '.ch-overall-bar-wrap{margin:0 auto!important;width:100%!important;max-width:420px!important;}' +
    '.fc-hub{text-align:center!important;position:relative!important;z-index:1!important;}' +
    '.fc-row{justify-content:center!important;}' +
    '.fc-icon{font-size:0!important;line-height:0!important;display:flex!important;align-items:center!important;justify-content:center!important;height:52px!important;}' +
    '@keyframes holo-pulse{0%,100%{opacity:0.78;}50%{opacity:1;}}' +
    '.holo-icon{animation:holo-pulse 2.8s ease-in-out infinite;}' +
    '.fc-card:nth-child(1) .holo-icon{animation-duration:2.6s;}' +
    '.fc-card:nth-child(2) .holo-icon{animation-duration:2.9s;}' +
    '.fc-card:nth-child(3) .holo-icon{animation-duration:3.1s;}' +
    '.fc-card:nth-child(4) .holo-icon{animation-duration:2.7s;}' +
    '.fc-card:nth-child(5) .holo-icon{animation-duration:3.0s;}' +
    '.fc-card:nth-child(6) .holo-icon{animation-duration:2.8s;}' +
    '.fc-card:nth-child(7) .holo-icon{animation-duration:3.2s;}' +
    '</style>' +
    '<div class="fc-hub">' +
    '<div class="fc-header">' +
      '<div class="fc-header-label">Your Learning Path</div>' +
      '<div class="fc-header-title">Seven Floors.<br>One Goal.</div>' +
      '<div class="fc-header-sub">Work through each floor in order. Each one builds directly on the last.</div>' +
      '<div style="margin-top:16px;">' + overallBar + '</div>' +
      '<button class="hub-notes-btn" onclick="openNotesReview()">📝 Review your notes</button>' +
    '</div>' +
    '<div class="fc-stats" style="display:flex;width:100%;margin:0 auto 28px;padding:14px 0;">' +
      '<div class="fc-stat" style="flex:1;text-align:center;"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.9);">' + floorsUnlocked + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.78);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;text-shadow:0 1px 6px rgba(0,0,0,0.8);">Floors Unlocked</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.08);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.9);">' + (state.xp || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.78);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;text-shadow:0 1px 6px rgba(0,0,0,0.8);">XP Earned</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.08);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.9);">' + (state.streak || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.78);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;text-shadow:0 1px 6px rgba(0,0,0,0.8);">Day Streak</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.08);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.9);">' + floorsComplete + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.78);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;text-shadow:0 1px 6px rgba(0,0,0,0.8);">Floors Complete</div></div>' +
    '</div>' +
    '<div class="fc-row" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;">' + cardsHtml + '</div>' +
    (function() {
      var unlocked = isTrackUnlocked();
      var tracksHtml = (typeof TRACKS !== 'undefined' ? TRACKS : []).map(function(t) {
        var done = isTrackComplete(t.id);
        var doneSecs = t.sections.filter(function(s) { return !!state.completed[s.id]; }).length;
        var r = parseInt(t.color.slice(1,3),16), g = parseInt(t.color.slice(3,5),16), b = parseInt(t.color.slice(5,7),16);
        var glow = 'rgba(' + r + ',' + g + ',' + b + ',0.30)';
        return '<div class="trk-card' + (!unlocked ? ' trk-locked' : '') + (done ? ' trk-done' : '') + '"' +
          ' style="--trk-color:' + t.color + ';--trk-glow:' + glow + '"' +
          (unlocked ? ' onclick="renderTrackHub(\'' + t.id + '\')"' : '') + '>' +
          '<div class="trk-card-tag">' + t.tag + (done ? ' &#10003;' : '') + '</div>' +
          '<div class="trk-card-title">' + t.title + '</div>' +
          '<div class="trk-card-sub">' + t.subtitle + '</div>' +
          '<div class="trk-card-prog">' + doneSecs + '/' + t.sections.length + ' sections</div>' +
          (!unlocked ? '<div class="trk-lock-badge">&#128274; Floor 7 Required</div>' : '') +
          '</div>';
      }).join('');
      return '<div class="hub-tracks-section">' +
        '<div class="hub-tracks-hdr">' +
          '<div class="hub-tracks-title">// SPECIALISATION TRACKS</div>' +
          '<div class="hub-tracks-sub">' + (unlocked ? 'Choose your path.' : 'Complete all 7 floors to unlock.') + '</div>' +
        '</div>' +
        '<div class="hub-tracks-row">' + tracksHtml + '</div>' +
        '</div>';
    })() +
  '</div>' +
  '<div class="fc-modal-overlay fc-modal-hidden" id="fc-modal-overlay" onclick="closeFloorModal()">' +
    '<div class="fc-modal" id="fc-modal" onclick="event.stopPropagation()">' +
      '<button class="fc-modal-close" onclick="closeFloorModal()">&#x2715;</button>' +
      '<div class="fc-modal-badge" id="fc-modal-badge"></div>' +
      '<div class="fc-modal-icon" id="fc-modal-icon"></div>' +
      '<div class="fc-modal-title" id="fc-modal-title"></div>' +
      '<div class="fc-modal-sage" id="fc-modal-sage"></div>' +
      '<div class="fc-modal-sub">What\'s covered in this floor</div>' +
      '<ul class="fc-modal-list" id="fc-modal-list"></ul>' +
    '</div>' +
  '</div>';

  var mc = document.getElementById('main-content');
  if (mc) { mc.style.display = ''; mc.innerHTML = html; }
}
function completeSection(sectionId, fi, si) {
  closeSectionCompletePopup();
  var gate = sectionGateState[sectionId] || {};
  var section = FLOORS[fi].sections[si];
  var needsQuiz = !!(section && section.quiz);
  if (needsQuiz && !gate.quiz) {
    sageMessage('Answer the knowledge check first \u2014 then you can mark this section complete.', 'warn');
    return;
  }

  // Capture button position before DOM rebuild so XP float lands on it
  var btn = document.getElementById('complete-btn-' + sectionId);
  var bx = window.innerWidth / 2, by = 300;
  if (btn) {
    var r = btn.getBoundingClientRect();
    bx = r.left + r.width / 2;
    by = r.top + r.height / 2;
    btn.classList.add('pressing');
  }

  state.completed[sectionId] = true;
  markSectionComplete(sectionId);
  markStreakProtected();
  _cancelStreakReminder();
  var secXP = getSectionXP(fi);
  awardXP(secXP, 'complete-' + sectionId, bx, by);
  playCompletionSound();
  trackDailySection();

  var secName = FLOORS[fi] && FLOORS[fi].sections[si] ? FLOORS[fi].sections[si].title : sectionId;
  logActivity('section', 'Completed: ' + secName, secXP);

  const isNowComplete = isFloorComplete(fi);
  if (isNowComplete) {
    awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
  }
  saveState();
  checkGuestSavePrompt();
  var _prevBadges = (state.earnedBadges || []).slice();
  updateAchievements();
  var _newBadges = (state.earnedBadges || []).filter(function(id) { return _prevBadges.indexOf(id) === -1; }).map(function(id) { return BADGES.find(function(b) { return b.id === id; }); }).filter(Boolean);
  updateDailyGoalBar();
  updateTopChips();
  renderNav();

  // Show section recap (terms covered), then advance
  showSectionRecap(section, function() {
    // Brief pause so button press animation is visible, then advance
    setTimeout(function() {
      // Mind Checkpoint: suggest a recovery action at the midpoint — never blocks navigation
      var mid = getBreakMidpoint(fi);
      if (mid > 0 && si === mid - 1 && !isNowComplete) {
        var ccKey = 'cc_seen_f' + fi;
        if (!sessionStorage.getItem(ccKey)) {
          sessionStorage.setItem(ccKey, '1');
          showCognitiveCooldown(fi, FLOORS[fi].sections.length - mid);
        }
      }
      var floor = FLOORS[fi];
      if (!isNowComplete && floor && si < floor.sections.length - 1) {
        // Auto-advance to the next section with slide animation
        var mc = document.getElementById('main-content');
        if (mc) mc.classList.add('section-slide-out-left');
        setTimeout(function() {
          state.currentSection = si + 1;
          saveState();
          renderNav();
          renderFloor(fi, si + 1);
        }, 220);
      } else {
        // Last section of floor or floor just completed — stay and show completion state
        renderFloor(fi, si);
        setTimeout(function() {
          var gateBox = document.querySelector('.gate-box');
          if (gateBox) {
            gateBox.classList.add('gate-completing');
            setTimeout(function() { gateBox.classList.remove('gate-completing'); }, 950);
          }
        }, 40);
      }
      if (isNowComplete) {
        setTimeout(function() { showFloorCelebration(fi, _newBadges); }, 700);
      }
    }, 180);
  });
}

function prevSection(fi, si) {
  closeSectionCompletePopup();
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-right');
  setTimeout(function() {
    if (si > 0) { state.currentSection = si - 1; saveState(); renderNav(); renderFloor(fi, si - 1); }
    else if (fi > 0) { goToFloor(fi - 1); }
  }, 220);
}

function nextSection(fi, si) {
  closeSectionCompletePopup();
  var floor = FLOORS[fi];
  var section = floor.sections[si];
  var gate = sectionGateState[section.id] || {};
  var hasQuiz = !!(section && section.quiz);
  var hasChecklist = !!(section && section.checklist && section.checklist.length);

  if (!state.completed[section.id]) {
    if (hasChecklist) {
      var allChecked = section.checklist.every(function(_, ci) {
        return !!(state.checklistDone || {})[section.id + '-' + ci];
      });
      if (!allChecked) {
        sageMessage('Tick every item in the checklist before moving on.', 'warn');
        return;
      }
    }
    if (hasQuiz && !gate.quiz) {
      sageMessage('Answer the quiz correctly before moving to the next section.', 'warn');
      return;
    }
    if (!hasQuiz) {
      // Auto-complete
      state.completed[section.id] = true;
      markSectionComplete(section.id);
      markStreakProtected();
      awardXP(getSectionXP(fi), 'complete-' + section.id, window.innerWidth / 2, 300);
      var isNowComplete = isFloorComplete(fi);
      if (isNowComplete) {
        awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
        var _prevB = (state.earnedBadges || []).slice();
        checkAndUnlockBadges();
        var _newB = (state.earnedBadges || []).filter(function(id) { return _prevB.indexOf(id) === -1; }).map(function(id) { return BADGES.find(function(b) { return b.id === id; }); }).filter(Boolean);
        setTimeout(function() { showFloorCelebration(fi, _newB); }, 600);
      }
      saveState();
    }
  }
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-left');
  setTimeout(function() {
    if (si < floor.sections.length - 1) { state.currentSection = si + 1; saveState(); renderNav(); renderFloor(fi, si + 1); }
    else if (fi < FLOORS.length - 1) { goToFloor(fi + 1); }
  }, 220);
}

// ── COGNITIVE COOLDOWN SYSTEM ─────────────────────────────────────────────
// Replaces the 30-minute hard lock with a guided recommendation modal.
// Shown at most once per floor per browser session — never blocks navigation.
var REST_BREAK_MIN_SECTIONS = 5; // only trigger for floors with >5 sections

function getBreakMidpoint(fi) {
  var floor = FLOORS[fi];
  if (!floor || floor.sections.length <= REST_BREAK_MIN_SECTIONS) return -1;
  return Math.ceil(floor.sections.length / 2);
}

function showCognitiveCooldown(fi, sectionsRemaining) {
  var existing = document.getElementById('cc-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'cc-overlay';
  overlay.className = 'cc-overlay';

  function action(tab) {
    overlay.remove();
    if (tab) switchTopNav(tab);
  }

  overlay.innerHTML =
    '<div class="cc-panel">' +
      '<div class="cc-owl">' + sageOwlSVG(52, 58) + '</div>' +
      '<div class="cc-title">Mind Checkpoint</div>' +
      '<p class="cc-desc">You\'ve completed several focused learning sections. ' +
        'Short recovery periods can improve retention and reduce overload.</p>' +
      '<div class="cc-options">' +
        '<button class="cc-option" data-cc-action="challenge">' +
          '<span class="cc-option-icon">&#127919;</span>' +
          '<span class="cc-option-text">' +
            '<span class="cc-option-title">Daily Challenge</span>' +
            '<span class="cc-option-desc">Quick timed quiz to reinforce what you\'ve learned.</span>' +
          '</span>' +
          '<span class="cc-option-arrow">&#8250;</span>' +
        '</button>' +
        '<button class="cc-option" data-cc-action="revision">' +
          '<span class="cc-option-icon">&#128218;</span>' +
          '<span class="cc-option-text">' +
            '<span class="cc-option-title">Revision Centre</span>' +
            '<span class="cc-option-desc">Review concepts and flashcards from this floor.</span>' +
          '</span>' +
          '<span class="cc-option-arrow">&#8250;</span>' +
        '</button>' +
        '<button class="cc-option" data-cc-action="game">' +
          '<span class="cc-option-icon">&#127918;</span>' +
          '<span class="cc-option-text">' +
            '<span class="cc-option-title">Game Hub</span>' +
            '<span class="cc-option-desc">Lighter learning activities and coding mini-games.</span>' +
          '</span>' +
          '<span class="cc-option-arrow">&#8250;</span>' +
        '</button>' +
        '<button class="cc-option" data-cc-action="">' +
          '<span class="cc-option-icon">&#9749;</span>' +
          '<span class="cc-option-text">' +
            '<span class="cc-option-title">Take A Break</span>' +
            '<span class="cc-option-desc">Step away and return refreshed.</span>' +
          '</span>' +
          '<span class="cc-option-arrow">&#8250;</span>' +
        '</button>' +
        '<button class="cc-option cc-option--continue" data-cc-action="">' +
          '<span class="cc-option-icon">&#9654;</span>' +
          '<span class="cc-option-text">' +
            '<span class="cc-option-title">Continue Learning</span>' +
            '<span class="cc-option-desc">Keep going &mdash; the next ' + sectionsRemaining + ' section' + (sectionsRemaining !== 1 ? 's' : '') + ' await.</span>' +
          '</span>' +
          '<span class="cc-option-arrow">&#8250;</span>' +
        '</button>' +
      '</div>' +
    '</div>';

  overlay.querySelectorAll('.cc-option').forEach(function(btn) {
    btn.addEventListener('click', function() { action(btn.dataset.ccAction); });
  });
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

  document.body.appendChild(overlay);
}

// --- VOICE NARRATION SYSTEM ---
let currentUtterance = null;
let currentNarrationId = null;
var _narratorVoices = [];
var _autoScrollInterval = null;

if (window.speechSynthesis) {
  _narratorVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function() {
    _narratorVoices = window.speechSynthesis.getVoices();
  };
}

function getBestVoice(gender) {
  var voices = (_narratorVoices.length ? _narratorVoices : window.speechSynthesis.getVoices())
    .filter(function(v) { return v.lang.startsWith('en'); });
  var checks = gender === 'male' ? [
    function(v) { return v.name === 'Google UK English Male'; },
    function(v) { return v.name === 'Microsoft David Desktop - English (United States)'; },
    function(v) { return v.name === 'Alex'; },
    function(v) { return /\b(male|david|james|oliver|daniel|thomas)\b/i.test(v.name); },
    function(v) { return v.name.toLowerCase().includes('male'); },
    function(v) { return true; }
  ] : [
    function(v) { return v.name === 'Google UK English Female'; },
    function(v) { return v.name === 'Microsoft Zira Desktop - English (United States)'; },
    function(v) { return v.name === 'Samantha'; },
    function(v) { return /\b(female|zira|samantha|emily|alice|victoria|karen|moira)\b/i.test(v.name); },
    function(v) { return v.name.toLowerCase().includes('female'); },
    function(v) { return true; }
  ];
  for (var i = 0; i < checks.length; i++) {
    var match = voices.find(checks[i]);
    if (match) return match;
  }
  return null;
}

function startAutoScroll() {
  stopAutoScroll();
  if (!state.autoScroll) return;
  var col = document.getElementById('main-col') || document.querySelector('.main-col');
  if (!col) return;
  var lastTop = col.scrollTop;
  _autoScrollInterval = setInterval(function() {
    // If the user scrolled manually (scrollTop moved more than 4px vs expected), stop
    if (Math.abs(col.scrollTop - lastTop) > 4) {
      stopAutoScroll();
      return;
    }
    col.scrollTop += 1;
    lastTop = col.scrollTop;
  }, 38);
}

function stopAutoScroll() {
  if (_autoScrollInterval) { clearInterval(_autoScrollInterval); _autoScrollInterval = null; }
}

function getReadableText(sectionId) {
  const fi = state.currentFloor - 1;
  const section = FLOORS[fi].sections.find(s => s.id === sectionId);
  if (!section) return '';
  const strip = t => t.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  let parts = [];
  parts.push(section.title + '.');
  parts.push(strip(section.body));
  if (section.callout) parts.push(section.callout.label + '. ' + strip(section.callout.text));
  if (section.callout2) parts.push(section.callout2.label + '. ' + strip(section.callout2.text));
  if (section.checklist && section.checklist.length) {
    parts.push('Before you continue. ' + section.checklist.map(strip).join('. '));
  }
  if (section.hint) parts.push("Here's a hint from Sage. " + strip(section.hint));
  return parts.join(' ... ');
}

function toggleNarration(sectionId) {
  var btn = document.getElementById('listen-btn-' + sectionId);
  if (currentNarrationId === sectionId && window.speechSynthesis.speaking) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      if (btn) btn.innerHTML = '<span class="listen-dot"></span>\u23F8 Pause';
    } else {
      window.speechSynthesis.pause();
      if (btn) btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Resume';
    }
    return;
  }
  window.speechSynthesis.cancel();
  stopAutoScroll();
  var chunks = getReadableText(sectionId).split(' ... ').filter(Boolean);
  if (!chunks.length) return;
  var gender = state.narratorGender || 'female';
  var voice = getBestVoice(gender);
  currentNarrationId = sectionId;
  if (btn) { btn.classList.add('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u23F8 Pause'; }

  var chunkIdx = 0;
  function speakNextChunk() {
    if (chunkIdx >= chunks.length || currentNarrationId !== sectionId) {
      stopAutoScroll();
      currentNarrationId = null;
      currentUtterance = null;
      if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Listen'; }
      return;
    }
    var utt = new SpeechSynthesisUtterance(chunks[chunkIdx++]);
    if (voice) utt.voice = voice;
    utt.rate  = gender === 'male' ? 0.90 : 0.88;
    utt.pitch = gender === 'male' ? 0.92 : 1.05;
    utt.volume = 1;
    if (chunkIdx === 1) utt.onstart = function() { startAutoScroll(); };
    utt.onend  = speakNextChunk;
    utt.onerror = function(e) {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      stopAutoScroll();
      currentNarrationId = null;
      currentUtterance = null;
      if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Listen'; }
    };
    currentUtterance = utt;
    window.speechSynthesis.speak(utt);
  }
  speakNextChunk();
}

function stopNarration() {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  stopAutoScroll();
  currentNarrationId = null;
}

// ============================================
// FLOOR 2 \u2014 CONTROL PANEL INTERACTION
// ============================================
function f2SelectValue(value) {
  const screen = document.getElementById('f2-status-screen');
  const blank = document.getElementById('f2-blank');
  const hint = document.getElementById('f2-hint');
  const ascend = document.getElementById('f2-ascend');
  const pellets = document.querySelectorAll('.data-pellet');

  if (value === 2) {
    // Success
    blank.textContent = '2';
    blank.classList.add('filled');
    screen.classList.remove('shake');
    screen.classList.add('success');
    screen.querySelector('.status-text').textContent = 'STATUS: FLOOR 2 \u2713';
    hint.classList.remove('visible');
    pellets.forEach(p => p.disabled = true);

    // Play mechanical startup sound
    playF2Sound();

    // Award XP
    setTimeout(() => {
      awardXP(15, 'f2-variable-task', window.innerWidth / 2, 200);
      sageMessage('Variable assigned. The system is online. Floor 3 is now accessible.', 'celebrate');
    }, 400);

    // Show ascend button
    setTimeout(() => {
      if (ascend) {
        ascend.style.display = 'block';
        localStorage.setItem('f2_complete', 'true');
      }
    }, 800);

  } else {
    // Failure
    blank.textContent = value === 1 ? '1' : '"Lobby"';
    blank.classList.remove('filled');
    screen.classList.remove('success');
    void screen.offsetWidth;
    screen.classList.add('shake');
    setTimeout(() => screen.classList.remove('shake'), 500);
    hint.classList.add('visible');
    sageMessage('Variables must be accurate. We are on Floor 2 \u2014 so the value must be 2!', 'warn');
  }
}

function playF2Sound() {
  try {
    const ctx = getAudioContext();
    const times = [0, 0.12, 0.22];
    const freqs = [220, 330, 440];
    times.forEach((t, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(freqs[i], ctx.currentTime + t);
      gain.gain.setValueAtTime(0.06, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.1);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.12);
    });
  } catch(e) {}
}

function f2Ascend() {
  if (!isFloorComplete(1)) {
    var incomplete = FLOORS[1].sections.filter(function(s) { return !state.completed[s.id]; });
    var names = incomplete.slice(0, 2).map(function(s) { return '\u201c' + s.title + '\u201d'; }).join(', ');
    var extra = incomplete.length > 2 ? ' and ' + (incomplete.length - 2) + ' more' : '';
    sageMessage('You\u2019re not quite ready yet. Complete these sections first: ' + names + extra + '.', 'warn');
    return;
  }
  goToFloor(2);
}

// ============================================
// SYSTEM 1 \u2014 ELEVATOR TRANSITIONS
// ============================================
let lastFloorIndex = 0;
function renderFloor(fi, si) {
  stopHubCanvas();
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = typeof isMobile === 'function' && isMobile() ? 'none' : 'flex';
  var floor = FLOORS[fi];
  var color = floor ? (floor.color || '#c8a96e') : '#c8a96e';
  var r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
  var glow   = 'rgba('+r+','+g+','+b+',0.10)';
  var border = 'rgba('+r+','+g+','+b+',0.22)';
  var subtle = 'rgba('+r+','+g+','+b+',0.05)';
  ['main-col','main-content'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.setProperty('--floor-color',        color);
    el.style.setProperty('--floor-hero-glow',    glow);
    el.style.setProperty('--floor-hero-border',  border);
    el.style.setProperty('--floor-hero-subtle',  subtle);
  });
  loadSection(fi, si);
  if (typeof renderMobileSectionChrome === 'function' && typeof isMobile === 'function' && isMobile()) {
    setTimeout(renderMobileSectionChrome, 60);
  }
}
// ============================================
// SYSTEM 2 \u2014 SAGE SPEECH BUBBLE
// ============================================
const SAGE_MOODS = {
  encourage: { icon: sageOwlSVG(18, 20), color: 'var(--accent)' },
  tip:       { icon: sageOwlSVG(18, 20), color: 'var(--accent2)' },
  warn:      { icon: sageOwlSVG(18, 20), color: 'var(--floor3)' },
  celebrate: { icon: sageOwlSVG(18, 20), color: 'var(--success)' }
};


// ── CHALLENGE CHECK-OFF ───────────────────────────────────────────────────
function toggleChallenge(chKey, fi, si) {
  if (!state.challengesDone) state.challengesDone = {};
  state.challengesDone[chKey] = !state.challengesDone[chKey];
  saveState();
  var item = document.getElementById('chitem-' + chKey);
  if (!item) return;
  var btn = item.querySelector('.ch-check-btn');
  if (state.challengesDone[chKey]) {
    item.classList.add('ch-done');
    if (btn) btn.textContent = '✓';
  } else {
    item.classList.remove('ch-done');
    if (btn) btn.textContent = '○';
  }
  // Update the gate if all challenges are now done
  var section = FLOORS[fi] && FLOORS[fi].sections[si];
  if (!section || !section.code) return;
  var allDone = (section.code.challenges || []).every(function(_, ci) {
    return !!(state.challengesDone[section.id + '-ch-' + ci]);
  });
  if (allDone) {
    var gate = sectionGateState[section.id];
    if (gate && !gate.code) {
      gate.code = true;
      var row = document.getElementById('gate-code-' + section.id);
      if (row) { row.classList.add('done'); row.querySelector('.gate-check-dot').innerHTML = '&#10003;'; }
    }
  }
}

// ── SAGE CHAT PANEL ───────────────────────────────────────────────────────

function showEditorHintPopup(sectionId) {
  var existing = document.getElementById('editor-hint-overlay');
  if (existing) { existing.remove(); return; }

  var found = findSectionById(sectionId);
  var section = found ? found.section : null;
  if (!section || !section.hint) return;

  var overlay = document.createElement('div');
  overlay.id = 'editor-hint-overlay';
  overlay.className = 'sage-chat-overlay';
  overlay.innerHTML =
    '<div class="sage-chat-panel editor-hint-panel">' +
      '<div class="sage-chat-header">' +
        '<div class="sage-chat-title"><span class="sage-chat-owl">' + sageOwlSVG(20, 22) + '</span> Hint</div>' +
        '<button class="sage-chat-close" onclick="document.getElementById(\'editor-hint-overlay\').remove()">×</button>' +
      '</div>' +
      '<div class="editor-hint-popup-body">' +
        '<div class="owl-wrap">' +
          '<div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
          '<div class="owl-bubble">' +
            '<div class="owl-name">SAGE &mdash; YOUR GUIDE</div>' +
            '<div class="hint-text">' + section.hint.replace(/\n/g, '<br>') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
}


function sageMessage(text, mood) {
  // Remove existing bubble
  const existing = document.getElementById('sage-bubble');
  if (existing) existing.remove();
  if (sageBubbleTimeout) clearTimeout(sageBubbleTimeout);

  const m = SAGE_MOODS[mood] || SAGE_MOODS.encourage;
  const bubble = document.createElement('div');
  bubble.className = 'sage-bubble';
  bubble.id = 'sage-bubble';
bubble.innerHTML =
  "<button class='sage-bubble-close' onclick='this.parentElement.remove()'>\u00D7</button>" +
  "<div class='sage-bubble-header'>" +
    "<span class='sage-bubble-icon'>" + m.icon + "</span>" +
    "<span class='sage-bubble-name' style='color:" + m.color + "'>SAGE</span>" +
  "</div>" +
  "<div class='sage-bubble-text'>" + text + "</div>";
  document.body.appendChild(bubble);
  sageBubbleTimeout = setTimeout(() => bubble.remove && bubble.remove(), 8000);
}


// Space bar: pause narration + stop auto-scroll (desktop only)
document.addEventListener('keydown', function(e) {
  // ⌘K / Ctrl+K — search (intercept before other modifier-key guard)
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
    return;
  }

  // Don't intercept when typing in inputs, textareas, or contenteditable
  var tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (document.activeElement && document.activeElement.isContentEditable) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  switch (e.key) {
    case ' ':
      if (!currentNarrationId) return;
      e.preventDefault();
      stopAutoScroll();
      toggleNarration(currentNarrationId);
      break;

    case 'Escape': {
      var searchModal = document.getElementById('search-modal');
      if (searchModal) { closeSearchModal(); return; }
      var tourOverlay = document.getElementById('app-tour-overlay');
      if (tourOverlay && tourOverlay.classList.contains('app-tour-visible')) { dismissAppTour(); return; }
      var kbHelp = document.getElementById('kb-help-overlay');
      if (kbHelp) { kbHelp.remove(); return; }
      if (typeof closeSectionSheet === 'function') closeSectionSheet();
      if (typeof closeCelebration === 'function') {
        var cel = document.querySelector('.fc-overlay.fc-visible');
        if (cel) closeCelebration();
      }
      break;
    }
  }
});

function showKeyboardHelp() {
  if (document.getElementById('kb-help-overlay')) { document.getElementById('kb-help-overlay').remove(); return; }
  var el = document.createElement('div');
  el.id = 'kb-help-overlay';
  el.className = 'kb-help-overlay';
  el.innerHTML =
    '<div class="kb-help-card">' +
      '<div class="kb-help-hdr">Keyboard Shortcuts <button class="kb-help-close" onclick="document.getElementById(\'kb-help-overlay\').remove()">&#215;</button></div>' +
      '<div class="kb-help-grid">' +
        _kbRow('⌘K / Ctrl+K', 'Search sections') +
        _kbRow('→', 'Next section') +
        _kbRow('←', 'Previous section') +
        _kbRow('↓ / ↑', 'Scroll down / up') +
        _kbRow('Enter', 'Mark complete / next floor') +
        _kbRow('Space', 'Pause / resume narration') +
        _kbRow('L', 'Toggle narration') +
        _kbRow('R', 'Open Revision Centre') +
        _kbRow('Esc', 'Close overlay / modal') +
        _kbRow('?', 'Show / hide this help') +
      '</div>' +
    '</div>';
  el.addEventListener('click', function(e) { if (e.target === el) el.remove(); });
  document.body.appendChild(el);
}

function _kbRow(key, desc) {
  return '<div class="kb-row"><kbd class="kb-key">' + escHtml(key) + '</kbd><span class="kb-desc">' + escHtml(desc) + '</span></div>';
}

// ============================================================
// SEARCH MODAL (\u2318K / Ctrl+K)
// ============================================================
var _searchResults = [];
var _searchCursor = -1;

function openSearchModal() {
  if (document.getElementById('search-modal')) { closeSearchModal(); return; }

  var backdrop = document.createElement('div');
  backdrop.id = 'search-backdrop';
  backdrop.className = 'search-backdrop';
  backdrop.onclick = closeSearchModal;
  document.body.appendChild(backdrop);

  var modal = document.createElement('div');
  modal.id = 'search-modal';
  modal.className = 'search-modal';
  modal.innerHTML =
    '<div class="search-input-wrap">' +
      '<span class="search-icon">&#128269;</span>' +
      '<input id="search-input" class="search-input" type="text" placeholder="Search sections, topics\u2026" autocomplete="off" spellcheck="false">' +
      '<kbd class="search-esc-hint">Esc</kbd>' +
    '</div>' +
    '<div id="search-results" class="search-results"></div>';
  document.body.appendChild(modal);

  requestAnimationFrame(function() {
    backdrop.classList.add('search-backdrop-open');
    modal.classList.add('search-modal-open');
  });

  var input = document.getElementById('search-input');
  input.focus();
  _searchResults = [];
  _searchCursor = -1;
  _renderSearchPlaceholder();

  input.addEventListener('input', function() {
    _runSearch(input.value.trim());
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); _moveCursor(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); _moveCursor(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); _selectSearchResult(_searchCursor); }
    else if (e.key === 'Escape') { e.preventDefault(); closeSearchModal(); }
  });
}

function closeSearchModal() {
  var modal = document.getElementById('search-modal');
  var backdrop = document.getElementById('search-backdrop');
  if (modal) {
    modal.classList.remove('search-modal-open');
    setTimeout(function() { if (modal.parentNode) modal.remove(); }, 220);
  }
  if (backdrop) {
    backdrop.classList.remove('search-backdrop-open');
    setTimeout(function() { if (backdrop.parentNode) backdrop.remove(); }, 220);
  }
}

function _renderSearchPlaceholder() {
  var res = document.getElementById('search-results');
  if (!res) return;
  res.innerHTML = '<div class="search-empty">Type to search across all ' + _countAllSections() + ' sections</div>';
}

function _countAllSections() {
  var n = 0;
  if (typeof FLOORS !== 'undefined') FLOORS.forEach(function(f) { n += f.sections.length; });
  return n;
}

function _runSearch(q) {
  var res = document.getElementById('search-results');
  if (!res) return;
  if (!q) { _searchResults = []; _searchCursor = -1; _renderSearchPlaceholder(); return; }

  var ql = q.toLowerCase();
  var matches = [];

  if (typeof FLOORS !== 'undefined') {
    FLOORS.forEach(function(f, fi) {
      f.sections.forEach(function(s, si) {
        var score = 0;
        var titleL = (s.title || '').toLowerCase();
        var bodyL = (s.body || '').replace(/<[^>]+>/g, '').toLowerCase();
        var hintL = (s.hint || '').replace(/<[^>]+>/g, '').toLowerCase();

        if (titleL.includes(ql)) score += titleL.startsWith(ql) ? 20 : 10;
        if (bodyL.includes(ql)) score += 3;
        if (hintL.includes(ql)) score += 2;

        if (score > 0) {
          var snippet = '';
          var bodyPlain = (s.body || '').replace(/<[^>]+>/g, '');
          var idx = bodyPlain.toLowerCase().indexOf(ql);
          if (idx !== -1) {
            var start = Math.max(0, idx - 40);
            var end = Math.min(bodyPlain.length, idx + ql.length + 60);
            snippet = (start > 0 ? '\u2026' : '') + bodyPlain.slice(start, end).trim() + (end < bodyPlain.length ? '\u2026' : '');
          }
          matches.push({ fi: fi, si: si, title: s.title, floor: f.title, color: f.color || '#c8a96e', score: score, snippet: snippet });
        }
      });
    });
  }

  matches.sort(function(a, b) { return b.score - a.score; });
  _searchResults = matches.slice(0, 12);
  _searchCursor = _searchResults.length > 0 ? 0 : -1;
  _renderSearchResults(ql);
}

function _renderSearchResults(ql) {
  var res = document.getElementById('search-results');
  if (!res) return;

  if (_searchResults.length === 0) {
    res.innerHTML = '<div class="search-empty">No sections found</div>';
    return;
  }

  var html = _searchResults.map(function(r, i) {
    var active = i === _searchCursor ? ' search-result-active' : '';
    var titleHl = _hlMatch(escHtml(r.title), escHtml(ql));
    var snippetHl = r.snippet ? _hlMatch(escHtml(r.snippet), escHtml(ql)) : '';
    return '<button class="search-result' + active + '" data-idx="' + i + '" onclick="searchGoTo(event,' + i + ')">' +
      '<span class="sr-dot" style="background:' + r.color + '"></span>' +
      '<span class="sr-body">' +
        '<span class="sr-floor">Floor ' + (r.fi + 1) + ' \u2014 ' + escHtml(r.floor) + '</span>' +
        '<span class="sr-title">' + titleHl + '</span>' +
        (snippetHl ? '<span class="sr-snippet">' + snippetHl + '</span>' : '') +
      '</span>' +
      '<span class="sr-arrow">&#8594;</span>' +
    '</button>';
  }).join('');

  res.innerHTML = html;
}

function _hlMatch(text, ql) {
  if (!ql) return text;
  return text.replace(new RegExp('(' + ql.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark class="search-hl">$1</mark>');
}

function _moveCursor(dir) {
  if (_searchResults.length === 0) return;
  _searchCursor = (_searchCursor + dir + _searchResults.length) % _searchResults.length;
  var ql = (document.getElementById('search-input') || {}).value || '';
  _renderSearchResults(ql.trim().toLowerCase());
  var active = document.querySelector('.search-result-active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

function _selectSearchResult(idx) {
  if (idx < 0 || idx >= _searchResults.length) return;
  searchGoTo(null, idx);
}

function searchGoTo(e, idx) {
  var r = _searchResults[idx];
  if (!r) return;
  closeSearchModal();
  goToSection(r.fi, r.si);
}


// ============================================
// SYSTEM 4 \u2014 BUILDING MAP
// ============================================
function renderBuildingMap() {
  var map = document.getElementById('building-map');
  if (!map) return;
  var FLOOR_COLORS_BM = ['--floor1', '--floor2', '--floor3', '--floor4', '--floor5', '--floor6', '--floor7'];
  map.innerHTML = FLOORS.slice().reverse().map(function(f, ri) {
    var fi = FLOORS.length - 1 - ri;
    var isUnlocked = true; // all floors unlocked
    var isActive = fi === state.currentFloor - 1;
    var isComplete = isFloorComplete(fi);
    var color = 'var(' + (FLOOR_COLORS_BM[fi] || '--floor1') + ')';
    var shortName = f.title.split('-')[0].trim();
    return '<div class="building-floor ' +
      (isActive ? 'active ' : '') +
      (isUnlocked ? 'unlocked' : 'locked') + '"' +
      ' style="--floor-color:' + color + '"' +
      (isUnlocked ? ' onclick="goToFloor(' + fi + ')"' : '') + '>' +
      '<div class="building-window"></div>' +
      '<div class="building-floor-label">F' + (fi+1) + ' \u2014 ' + shortName + (isComplete ? ' \u2713' : '') + '</div>' +
      '</div>';
  }).join('');
}

function toggleHint(id) {
  const box = document.getElementById(id);
  if (box) box.classList.toggle('visible');
}
function toggleTheme() {}
function applyTheme() { applyProfThemeToBody(getProfTheme()); }
function toggleTimer() {
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    document.getElementById('timer-btn').textContent = '\u25B6';
    const elapsed = (25 * 60) - state.timerSeconds;
    if (elapsed > 30) {
      state.totalSeconds += elapsed;
      state.sessionLog.push({ date: new Date().toDateString(), seconds: elapsed });
      saveState();
      updateTimeLog();
    }
  } else {
    state.timerRunning = true;
    document.getElementById('timer-btn').textContent = '\u23F8';
    playTone(440, 0.3, 0.1); // Soft start tone so user knows audio is active
    state.timerInterval = setInterval(() => {
      state.timerSeconds--;

      // Sound cues
      if (state.timerSeconds === 300) {
        playFiveMinuteWarning();
        document.getElementById('timer-display').style.color = '#c8967e'; // amber
      }
      if (state.timerSeconds === 60) {
        playOneMinuteWarning();
        document.getElementById('timer-display').style.color = '#c87e9a'; // red
      }

      if (state.timerSeconds <= 0) {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        state.totalSeconds += 25 * 60;
        state.sessionLog.push({ date: new Date().toDateString(), seconds: 25 * 60 });
        playCompletionSound();
        saveState();
        updateTimeLog();
        state.timerSeconds = 25 * 60;
        document.getElementById('timer-btn').textContent = '\u25B6';
        document.getElementById('timer-display').style.color = '#6ec87e';
        updateTimerDisplay();
        return;
      }
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerSeconds = 25 * 60;
  document.getElementById('timer-btn').textContent = '\u25B6';
  document.getElementById('timer-display').style.color = '#c8a96e';
  updateTimerDisplay();
}
function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
  const s = (state.timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer-display').textContent = '' + (m) + ':' + (s) + '';
}

// \u2500\u2500\u2500 PWA MANIFEST \u2500\u2500\u2500
(function() {
  var manifest = {
    name: 'The Code Book',
    short_name: 'CodeBook',
    description: 'A calm path into coding. Learn step by step, offline-ready.',
    start_url: './',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#c8a96e',
    icons: [{ src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="#0a0a0a"/><text x="96" y="130" font-size="100" text-anchor="middle" fill="#c8a96e">&#x1F4D6;</text></svg>'), sizes: '192x192', type: 'image/svg+xml' }]
  };
  var blob = new Blob([JSON.stringify(manifest)], {type:'application/json'});
  var link = document.createElement('link');
  link.rel = 'manifest';
  link.href = URL.createObjectURL(blob);
  document.head.appendChild(link);
})();

// \u2500\u2500\u2500 SERVICE WORKER \u2500\u2500\u2500
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
      console.log('[SW] registered, scope:', reg.scope);
      initStreakReminder(reg);
    }).catch(function(err) {
      console.warn('[SW] registration failed:', err);
    });
  });
}

// \u2500\u2500\u2500 STREAK REMINDER \u2500\u2500\u2500
function initStreakReminder(swReg) {
  if (!swReg || !('Notification' in window)) return;

  var today = new Date().toDateString();
  var todayKey = 'daily_sections_' + today;
  var todaySecs = parseInt(localStorage.getItem(todayKey) || '0');
  var streak = (typeof state !== 'undefined' && state.streak) || 0;

  // Only offer reminders if the user has an active streak but hasn't studied yet today
  if (streak < 1 || todaySecs > 0) return;

  if (Notification.permission === 'default') {
    // Offer a gentle opt-in prompt after a short delay (not on first visit)
    var onboarded = localStorage.getItem('codebook_onboarded');
    if (!onboarded) return;
    setTimeout(_offerReminderPermission, 8000);
  } else if (Notification.permission === 'granted') {
    _scheduleStreakReminder(swReg);
  }
}

function _offerReminderPermission() {
  if (document.getElementById('notif-banner')) return;
  var banner = document.createElement('div');
  banner.id = 'notif-banner';
  banner.className = 'notif-banner';
  banner.innerHTML =
    '<div class="notif-banner-icon">&#128293;</div>' +
    '<div class="notif-banner-text">' +
      '<div class="notif-banner-title">Streak reminders</div>' +
      '<div class="notif-banner-sub">Get a nudge if you haven\'t studied by evening</div>' +
    '</div>' +
    '<div class="notif-banner-actions">' +
      '<button class="notif-banner-yes" onclick="_requestReminderPermission()">Enable</button>' +
      '<button class="notif-banner-no" onclick="_dismissReminderBanner()">No thanks</button>' +
    '</div>';
  document.body.appendChild(banner);
  requestAnimationFrame(function() { banner.classList.add('notif-banner-in'); });
}

function _requestReminderPermission() {
  _dismissReminderBanner();
  Notification.requestPermission().then(function(perm) {
    if (perm === 'granted') {
      navigator.serviceWorker.ready.then(function(reg) { _scheduleStreakReminder(reg); });
    }
  });
}

function _dismissReminderBanner() {
  var b = document.getElementById('notif-banner');
  if (!b) return;
  b.classList.remove('notif-banner-in');
  setTimeout(function() { if (b.parentNode) b.remove(); }, 300);
  localStorage.setItem('notif_banner_dismissed', new Date().toDateString());
}

function _scheduleStreakReminder(swReg) {
  // Schedule for 8 PM today if it's before 8 PM, else skip
  var now = new Date();
  var eight = new Date();
  eight.setHours(20, 0, 0, 0);
  var delay = eight - now;
  if (delay <= 0) return;

  var streak = (typeof state !== 'undefined' && state.streak) || 0;
  swReg.active && swReg.active.postMessage({
    type: 'SCHEDULE_REMINDER',
    delayMs: delay,
    body: 'You have a ' + streak + '-day streak \u2014 keep it alive! Learn one section today.'
  });
}

// Cancel reminder once a section is completed today
function _cancelStreakReminder() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready.then(function(reg) {
    reg.active && reg.active.postMessage({ type: 'CANCEL_REMINDER' });
  });
}

// \u2500\u2500\u2500 INSTALL PROMPT \u2500\u2500\u2500
var deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredInstallPrompt = e;
  setTimeout(showPWABanner, 3000);
});
window.addEventListener('appinstalled', function() {
  hidePWABanner();
  deferredInstallPrompt = null;
});

function showPWABanner() {
  if (document.getElementById('pwa-banner')) return;
  if (localStorage.getItem('pwa_dismissed')) return;
  if (window.matchMedia('(display-mode: standalone)').matches) return;
  var banner = document.createElement('div');
  banner.id = 'pwa-banner';
  banner.className = 'pwa-install-banner';
  banner.innerHTML = '<div class="pwa-install-icon">&#x1F4F2;</div>' +
    '<div class="pwa-install-text">' +
    '<div class="pwa-install-title">Install The Code Book</div>' +
    '<div class="pwa-install-sub">Works offline &middot; saves progress &middot; feels native</div>' +
    '</div>' +
    '<div class="pwa-install-actions">' +
    '<button class="pwa-do-install" onclick="triggerInstall()">Install</button>' +
    '<button class="pwa-dismiss-btn" onclick="hidePWABanner()">Later</button>' +
    '</div>';
  document.body.appendChild(banner);
}

function hidePWABanner() {
  var b = document.getElementById('pwa-banner');
  if (b) b.remove();
  localStorage.setItem('pwa_dismissed', '1');
}

function triggerInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function() { deferredInstallPrompt = null; hidePWABanner(); });
  } else {
    alert('To install: tap the browser menu and choose "Add to Home Screen".');
    hidePWABanner();
  }
}



// \u2500\u2500\u2500 INIT LAYOUT PATCHES \u2500\u2500\u2500
(function() {
  var origStartBook = window.startBook;
  window.startBook = function() {
    if (origStartBook) origStartBook();
    setTimeout(function() {
      renderAllNav();
      patchRenderNav();
    }, 100);
  };

  // Also patch goToFloor and goToSection to update sidebars
  var origGoToFloor = window.goToFloor;
  window.goToFloor = function(fi) {
    if (origGoToFloor) origGoToFloor(fi);
    setTimeout(renderAllNav, 50);
  };

  var origGoToSection = window.goToSection;
  window.goToSection = function(fi, si) {
    if (origGoToSection) origGoToSection(fi, si);
    setTimeout(renderAllNav, 50);
  };

  // Update chips whenever XP changes
  var origAwardXP = window.awardXP;
  window.awardXP = function(amount, key, x, y) {
    if (origAwardXP) origAwardXP(amount, key, x, y);
    setTimeout(updateTopChips, 100);
    setTimeout(updateLeftStats, 100);
  };
})();




// \u2500\u2500\u2500 MAP PANEL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function renderMapPanel() {
  var panel = document.getElementById('panel-map');
  if (!panel) return;

  var totalSections = 0, completedSections = 0;
  FLOORS.forEach(function(f) {
    f.sections.forEach(function(s) {
      totalSections++;
      if (state.completed[s.id]) completedSections++;
    });
  });
  var overallPct = Math.round((completedSections / totalSections) * 100);

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">YOUR JOURNEY</div>' +
    '<div class="panel-hero-title">The Building Map</div>' +
    '<div class="panel-hero-sub">Every section you complete builds another floor. ' + completedSections + ' of ' + totalSections + ' sections done \u2014 ' + overallPct + '% complete.</div>' +
    '</div>' +
    '<div class="map-panel-grid">';

  FLOORS.forEach(function(floor, fi) {
    var floorDone = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
    var floorTotal = floor.sections.length;
    var floorPct = Math.round((floorDone / floorTotal) * 100);
    var isUnlocked = true; // all floors unlocked
    var isActive = (fi + 1) === state.currentFloor;
    var isComplete = isFloorComplete(fi);

    var statusClass = isComplete ? 'map-floor-complete' : isActive ? 'map-floor-active' : isUnlocked ? 'map-floor-unlocked' : 'map-floor-locked';
    var statusLabel = isComplete ? 'COMPLETE \u2713' : isActive ? 'IN PROGRESS' : isUnlocked ? 'UNLOCKED' : 'LOCKED';

    html += '<div class="map-floor-card ' + statusClass + '" onclick="' + (isUnlocked ? 'goToFloor(' + fi + ');switchTopNav(\'learn\',document.getElementById(\'tnav-learn\'))' : '') + '">' +
      '<div class="map-floor-header">' +
        '<div class="map-floor-num" style="color:' + floor.color + '">FLOOR ' + floor.id + '</div>' +
        '<div class="map-floor-status">' + statusLabel + '</div>' +
      '</div>' +
      '<div class="map-floor-title">' + floor.title + '</div>' +
      '<div class="map-floor-sub">' + floor.subtitle + '</div>' +
      '<div class="map-progress-row">' +
        '<div class="map-progress-track"><div class="map-progress-fill" style="width:' + floorPct + '%;background:' + floor.color + '"></div></div>' +
        '<div class="map-progress-label">' + floorDone + '/' + floorTotal + '</div>' +
      '</div>' +
      '<div class="map-sections-list">' +
        floor.sections.map(function(s, si) {
          var done = !!state.completed[s.id];
          var active = isActive && si === state.currentSection;
          return '<div class="map-section-row' + (done ? ' map-sec-done' : '') + (active ? ' map-sec-active' : '') + '">' +
            '<div class="map-sec-dot">' + (done ? '\u2713' : (si + 1)) + '</div>' +
            '<div class="map-sec-title">' + s.title + '</div>' +
            '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function renderBuildPanel() {
  var panel = document.getElementById('panel-build');
  if (!panel) return;

  var projects = [
    {
      icon: '\uD83C\uDF10', floor: 1, title: 'My First Webpage', desc: 'Build a personal "About Me" page using only what you learned in Floor 1.',
      skills: ['HTML', 'Structure'], time: '30 min',
      steps: [
        'Create a new file called <strong>index.html</strong> in a text editor.',
        'Add the basic HTML skeleton: DOCTYPE, html, head, and body tags.',
        'Inside body, add an &lt;h1&gt; with your name.',
        'Add a &lt;p&gt; tag with one sentence about yourself.',
        'Add a second &lt;p&gt; describing what you want to learn.',
        'Open the file in your browser. You should see your page.',
        'Change the heading text to something personal. Save and refresh.',
        'Add one more element \u2014 anything. A list, a quote, a second heading.'
      ]
    },
    {
      icon: '\uD83C\uDFA8', floor: 2, title: 'Styled Portfolio Card', desc: 'Take your About Me page and make it look like something real.',
      skills: ['CSS', 'Design'], time: '45 min',
      steps: [
        'Open your index.html from Floor 1 (or create a new one with the same structure).',
        'Add a &lt;style&gt; block inside &lt;head&gt;.',
        'Set the body background colour to something dark: <code>background: #0a0a0a; color: white;</code>',
        'Style the h1 \u2014 change the colour, font-size, and font-family.',
        'Wrap your content in a &lt;div class="card"&gt; and give it padding, a background, and border-radius.',
        'Add a Google Font by pasting a link tag from fonts.google.com into your &lt;head&gt;.',
        'Centre the card on the page using margin: auto and a max-width.',
        'Add one thing you figured out yourself \u2014 a hover effect, a border, a colour you chose.'
      ]
    },
    {
      icon: '\u26A1', floor: 3, title: 'Interactive Counter', desc: 'Build a counter that goes up and down when you click buttons.',
      skills: ['JavaScript', 'DOM'], time: '1 hour',
      steps: [
        'Create a new HTML file. Add a heading that says "Counter".',
        'Add a &lt;p id="count"&gt;0&lt;/p&gt; to display the current number.',
        'Add two buttons: one labelled "+ Add" and one labelled "\u2212 Subtract".',
        'Add a &lt;script&gt; block. Declare <code>let count = 0;</code>',
        'Write a function called <code>add()</code> that increases count by 1 and updates the paragraph text.',
        'Write a function called <code>subtract()</code> that decreases count by 1.',
        'Connect the functions to the buttons using onclick attributes.',
        'Add a reset button that sets count back to 0.',
        'Bonus: change the text colour to green when count is positive, red when negative.'
      ]
    },
    {
      icon: '\uD83D\uDCCB', floor: 4, title: 'To-Do List App', desc: 'A working to-do list that remembers your tasks after refresh.',
      skills: ['JS', 'Arrays', 'localStorage'], time: '2 hours',
      steps: [
        'Create a new HTML file. Add an input field and an "Add Task" button.',
        'Create an empty &lt;ul id="task-list"&gt; below the input.',
        'In JavaScript, create an array called <code>tasks</code> and load it from localStorage if it exists.',
        'Write an <code>addTask()</code> function that reads the input, pushes to the array, saves to localStorage, and re-renders the list.',
        'Write a <code>renderTasks()</code> function that loops through the array and builds &lt;li&gt; elements.',
        'Each list item should have a checkbox and a delete button.',
        'Ticking the checkbox should mark the task as complete (strikethrough style).',
        'The delete button should remove the task from the array and re-render.',
        'Call renderTasks() on page load so saved tasks appear immediately.',
        'Style it: make completed tasks visually distinct from active ones.'
      ]
    },
    {
      icon: '\uD83C\uDF24\uFE0F', floor: 5, title: 'Weather Dashboard', desc: 'Fetch live weather data from an API and display it in a custom UI.',
      skills: ['APIs', 'fetch()', 'JSON'], time: '3 hours',
      steps: [
        'Go to openweathermap.org and sign up for a free API key.',
        'Create a new HTML file with an input for a city name and a Search button.',
        'Add a &lt;div id="weather"&gt; where results will be displayed.',
        'Write a <code>fetchWeather(city)</code> async function using the fetch() API.',
        'Build the URL: <code>https://api.openweathermap.org/data/2.5/weather?q={city}&appid={YOUR_KEY}&units=metric</code>',
        'Parse the JSON response and extract: city name, temperature, weather description, humidity.',
        'Display the data inside the #weather div.',
        'Handle errors \u2014 what if the city is not found? Show a friendly message.',
        'Style the results card. Add a weather icon using the icon code from the API response.',
        'Push the project to GitHub and deploy on Netlify.'
      ]
    },
    {
      icon: '\uD83D\uDE80', floor: 6, title: 'Full Portfolio Site', desc: 'A multi-page portfolio site that represents you professionally.',
      skills: ['HTML', 'CSS', 'JS', 'Deploy'], time: '1 week',
      steps: [
        'Plan on paper first: what pages do you need? (Home, Projects, About, Contact)',
        'Create an index.html and a shared nav bar that appears on every page.',
        'Home page: your name, one strong sentence about what you do, a call-to-action button.',
        'Projects page: a card for each of your Floor 1-5 builds with a title, screenshot, description, and live link.',
        'About page: your story, what you\'ve learned, where you\'re heading.',
        'Contact section: your email or a simple form (use Formspree for a working form without a backend).',
        'Make it fully responsive \u2014 test on a phone.',
        'Add a dark/light mode toggle.',
        'Push to GitHub with a clear README.',
        'Deploy on Netlify. Share the URL.'
      ]
    },
    {
      icon: '\uD83C\uDFD7\uFE0F', floor: 7, title: 'Capstone Project', desc: 'Your final project. No constraints. Build something you\'re proud of.',
      skills: ['Everything'], time: 'Your call',
      steps: [
        'Identify the problem: write one sentence describing what your project does and who it helps.',
        'Define the MVP (Minimum Viable Product): the smallest version that still solves the problem.',
        'Plan the data model: what information does your app store? Sketch the database tables.',
        'Plan the UI: sketch the key screens on paper before writing any code.',
        'Set up your project: Git repo, folder structure, deployment pipeline first.',
        'Build the backend first \u2014 get your data model working and your API endpoints tested.',
        'Build the frontend next \u2014 connect it to your backend.',
        'Test everything: what happens when things go wrong? Handle errors gracefully.',
        'Write a README that explains what it is, how to run it, and what you learned building it.',
        'Deploy it, share it, and add it to your portfolio. You\'re done.'
      ]
    }
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">BUILD MODE</div>' +
    '<div class="panel-hero-title">Build Real Things</div>' +
    '<div class="panel-hero-sub">Projects unlock as you complete floors. Each one has guided steps to get you started \u2014 but the decisions are yours.</div>' +
    '</div>' +
    '<div class="build-grid">';

  projects.forEach(function(p) {
    var unlocked = true; // all floors unlocked
    var done = state.completed['build-' + p.floor];
    var stepsHtml = '';
    if (unlocked && p.steps) {
      stepsHtml = '<div class="build-steps"><div class="build-steps-label">HOW TO BUILD IT</div><ol class="build-step-list">' +
        p.steps.map(function(s){ return '<li class="build-step-item">' + s + '</li>'; }).join('') +
        '</ol>' +
        (!done ? '<button class="build-mark-done" onclick="markBuildDone(' + p.floor + ');event.stopPropagation()">Mark as Complete \u2713</button>' : '') +
        '</div>';
    }
    html += '<div class="build-card' + (!unlocked ? ' locked' : '') + (done ? ' done' : '') + '">' +
      '<div class="build-card-icon">' + p.icon + '</div>' +
      '<div class="build-card-tag">FLOOR ' + p.floor + ' PROJECT' + (done ? ' \u2713' : !unlocked ? ' \u2014 LOCKED' : '') + '</div>' +
      '<div class="build-card-title">' + p.title + '</div>' +
      '<div class="build-card-desc">' + p.desc + '</div>' +
      '<div class="build-card-meta">' +
      p.skills.map(function(s){ return '<span class="build-meta-pill">' + s + '</span>'; }).join('') +
      '<span class="build-meta-pill floor-pill">~' + p.time + '</span>' +
      '</div>' + stepsHtml + '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

function markBuildDone(floorNum) {
  state.completed['build-' + floorNum] = true;
  markSectionComplete('build-' + floorNum);
  awardXP(75, 'build-project-' + floorNum, window.innerWidth / 2, 300);
  saveState();
  renderBuildPanel();
}

function startBuildProject(floorNum) {
  var fi = floorNum - 1;
  if (!isFloorComplete(fi) && fi > 0) {
    var incomplete = FLOORS[fi].sections.filter(function(s) { return !state.completed[s.id]; });
    var names = incomplete.slice(0, 2).map(function(s) { return '\u201c' + s.title + '\u201d'; }).join(', ');
    var extra = incomplete.length > 2 ? ' and ' + (incomplete.length - 2) + ' more' : '';
    sageMessage('This project unlocks when you finish Floor ' + floorNum + '. Still needed: ' + names + extra + '. Head to the Learn tab to complete them.', 'warn');
    return;
  }

  // Switch to Learn tab properly
  var learnBtn = document.getElementById('tnav-learn');
  switchTopNav('learn', learnBtn);

  // Navigate to the last (project) section of that floor
  var floor = FLOORS[fi];
  var lastSi = floor.sections.length - 1;
  goToSection(fi, lastSi);

  // Try to open Code Editor tab if it exists, otherwise stay on Read tab
  setTimeout(function() {
    var tabBtns = document.querySelectorAll('.section-tab-btn');
    tabBtns.forEach(function(btn) {
      if (btn.textContent.trim() === 'Code Editor') btn.click();
    });
    // Scroll to top so user sees the section
    var mainCol = document.getElementById('main-col');
    if (mainCol) mainCol.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 300);
}



function renderToolsPanel() {
  var panel = document.getElementById('panel-tools');
  if (!panel) return;

  var tools = [
    {
      id: 'vscode',
      color: '#60a5fa',
      name: 'VS Code',
      desc: 'The code editor used by most professional developers worldwide.',
      difficulty: 'Beginner',
      category: 'Editor',
      xp: 25,
      steps: [
        'Go to <strong>code.visualstudio.com</strong> and click Download for your operating system.',
        'Run the installer and follow the prompts. Accept all defaults.',
        'Open VS Code. You will see the Welcome tab.',
        'Press <strong>Ctrl+`</strong> (or Cmd+` on Mac) to open the built-in terminal.',
        'Click the Extensions icon on the left sidebar (looks like four squares).',
        'Search for <strong>Prettier</strong> and install it — this auto-formats your code.',
        'Search for <strong>Live Server</strong> and install it — this lets you preview HTML files live in the browser.',
        'Create a new file with <strong>Ctrl+N</strong>, save it as <strong>index.html</strong>, and type an exclamation mark then press Tab. VS Code will generate a full HTML skeleton.'
      ]
    },
    {
      id: 'git',
      color: '#34d399',
      name: 'Git',
      desc: 'Version control that tracks every change you make to your code.',
      difficulty: 'Beginner',
      category: 'Version Control',
      xp: 25,
      steps: [
        'Go to <strong>git-scm.com</strong> and download Git for your operating system.',
        'Run the installer. When asked about the default editor, choose VS Code if listed.',
        'Open a terminal (or VS Code\'s built-in terminal) and run: <code>git --version</code>. You should see a version number.',
        'Set your name: <code>git config --global user.name "Your Name"</code>',
        'Set your email: <code>git config --global user.email "you@example.com"</code>',
        'Navigate to a project folder and run <code>git init</code> to start tracking it.',
        'Run <code>git add .</code> to stage all files, then <code>git commit -m "first commit"</code> to save a snapshot.',
        'Run <code>git log</code> to see your commit history. You have version control.'
      ]
    },
    {
      id: 'github',
      color: '#a855f7',
      name: 'GitHub',
      desc: 'Cloud hosting for your Git repositories — and where developers share work.',
      difficulty: 'Beginner',
      category: 'Version Control',
      xp: 25,
      steps: [
        'Go to <strong>github.com</strong> and create a free account.',
        'Verify your email address when prompted.',
        'Click the <strong>+</strong> button at the top right and choose "New repository".',
        'Give it a name (e.g. <strong>my-first-project</strong>), leave it public, and click Create.',
        'GitHub will show you setup commands. Copy the ones under "push an existing repository".',
        'In your terminal, paste and run those commands. Your code is now on GitHub.',
        'Refresh the GitHub page — you should see your files.',
        'Click on a file to view it. Click the pencil icon to edit it directly in the browser.'
      ]
    },
    {
      id: 'devtools',
      color: '#00c8ff',
      name: 'Chrome DevTools',
      desc: 'Built into your browser — inspect, debug, and tweak any webpage in real time.',
      difficulty: 'Beginner',
      category: 'Browser',
      xp: 25,
      steps: [
        'Open Google Chrome and go to any webpage.',
        'Press <strong>F12</strong> (or Cmd+Option+I on Mac) to open DevTools.',
        'Click the <strong>Elements</strong> tab to see the HTML structure of the page.',
        'Hover over elements in the panel — the corresponding part of the page highlights.',
        'Double-click any text in the Elements panel to edit it live. Changes disappear on refresh.',
        'Click the <strong>Console</strong> tab. Type <code>document.title</code> and press Enter — it returns the page title.',
        'Click the <strong>Sources</strong> tab to see the page\'s CSS and JavaScript files.',
        'Click the device icon (top-left of DevTools) to preview the page on a mobile screen size.'
      ]
    },
    {
      id: 'nodejs',
      color: '#fb923c',
      name: 'Node.js',
      desc: 'Runs JavaScript outside the browser — powers servers, build tools, and npm.',
      difficulty: 'Intermediate',
      category: 'Runtime',
      xp: 50,
      steps: [
        'Go to <strong>nodejs.org</strong> and download the LTS (Long Term Support) version.',
        'Run the installer and accept all defaults. It will also install npm.',
        'Open a terminal and run <code>node --version</code> — you should see a version number.',
        'Run <code>npm --version</code> to confirm npm is also installed.',
        'Create a file called <strong>hello.js</strong> and write: <code>console.log("Hello from Node");</code>',
        'In the terminal, navigate to that file and run: <code>node hello.js</code>',
        'You should see the message printed. Node ran your JavaScript without a browser.',
        'You now have access to the npm ecosystem — millions of open source packages.'
      ]
    },
    {
      id: 'netlify',
      color: '#00e5b0',
      name: 'Netlify',
      desc: 'Deploy your HTML/CSS/JS projects live on the internet for free in under a minute.',
      difficulty: 'Beginner',
      category: 'Deployment',
      xp: 25,
      steps: [
        'Go to <strong>netlify.com</strong> and sign up for a free account (you can use GitHub to log in).',
        'Click <strong>Add new site</strong> → <strong>Deploy manually</strong>.',
        'Drag and drop your project folder onto the upload area.',
        'Netlify gives you a random URL immediately — your site is live.',
        'Click <strong>Site settings</strong> → <strong>Change site name</strong> to set a custom subdomain.',
        'For auto-deploys: go to <strong>Add new site</strong> → <strong>Import from GitHub</strong> and connect your repo.',
        'Every time you push to GitHub, Netlify automatically rebuilds and redeploys your site.',
        'Check the <strong>Deploys</strong> tab to see the build log and confirm each deploy succeeded.'
      ]
    },
    {
      id: 'figma',
      color: '#f472b6',
      name: 'Figma',
      desc: 'Design and prototype interfaces in the browser before writing a single line of code.',
      difficulty: 'Beginner',
      category: 'Design',
      xp: 25,
      steps: [
        'Go to <strong>figma.com</strong> and create a free account.',
        'Click <strong>New design file</strong> to open the canvas.',
        'Press <strong>F</strong> to create a frame (your screen size). Choose Desktop (1440×1024) from the right panel.',
        'Press <strong>R</strong> to draw a rectangle. Set its colour, size, and corner radius in the right panel.',
        'Press <strong>T</strong> to add text. Click anywhere on the canvas and start typing.',
        'Use the Components panel to create reusable elements — design a button once, use it everywhere.',
        'Click the Play button (top right) to enter Prototype mode and preview your design.',
        'Share your file via the Share button and copy the link — anyone with the link can view it in the browser.'
      ]
    },
    {
      id: 'postman',
      color: '#f97316',
      name: 'Postman',
      desc: 'Test and explore APIs without writing any code — essential for backend and full-stack work.',
      difficulty: 'Intermediate',
      category: 'API Testing',
      xp: 50,
      steps: [
        'Go to <strong>postman.com</strong> and download the free desktop app, or use the web version.',
        'Create a free account and sign in.',
        'Click <strong>New</strong> → <strong>HTTP Request</strong> to open a blank request tab.',
        'Set the method to <strong>GET</strong> and enter this URL: <code>https://jsonplaceholder.typicode.com/posts/1</code>',
        'Click <strong>Send</strong>. You will see a JSON response appear in the panel below — this is real API data.',
        'Change the method to <strong>POST</strong>, click the <strong>Body</strong> tab, select <strong>raw</strong> and <strong>JSON</strong>, then enter: <code>{"title":"test","body":"hello"}</code>',
        'Click Send again. The server responds with the data you sent plus an assigned ID.',
        'Use <strong>Collections</strong> (left sidebar) to group and save related requests — one collection per project or API you are testing.'
      ]
    },
    {
      id: 'davinci',
      color: '#ef4444',
      name: 'DaVinci Resolve',
      desc: 'Professional video editor — free and industry-standard. Use it to create portfolio walkthrough videos.',
      difficulty: 'Intermediate',
      category: 'Portfolio Video',
      xp: 50,
      steps: [
        'Go to <strong>blackmagicdesign.com/products/davinciresolve</strong> and download the free version.',
        'Run the installer. When it finishes, open DaVinci Resolve.',
        'On the Project Manager screen, click <strong>New Project</strong>, give it a name, and click Create.',
        'In the <strong>Cut</strong> or <strong>Edit</strong> page (tabs at the bottom), click the import icon and drag in your screen recording or footage.',
        'Drag your clip from the Media Pool onto the timeline at the bottom of the screen.',
        'Use the blade tool (<strong>B</strong>) to cut sections. Select unwanted clips and press Delete to remove them.',
        'To add a title: go to <strong>Titles</strong> in the Effects panel, drag a title style onto the timeline above your clip, and double-click to edit the text.',
        'When finished, click the <strong>Deliver</strong> tab (rocket icon at the bottom), choose YouTube as your preset, set a filename and export location, then click <strong>Add to Render Queue</strong> → <strong>Render All</strong>.'
      ]
    }
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">DEVELOPER TOOLS</div>' +
    '<div class="panel-hero-title">Set Up Your Toolkit</div>' +
    '<div class="panel-hero-sub">Every professional developer uses these tools. Work through them one at a time — each one makes the next easier.</div>' +
    '</div>' +
    '<div class="build-grid">';

  tools.forEach(function(t) {
    var stepsId = 'tool-steps-' + t.id;
    var isDone = !!state.completed['tool-' + t.id];
    var diffClass = t.difficulty === 'Beginner' ? 'tool-badge-beginner' : 'tool-badge-intermediate';
    var btnHtml = isDone
      ? '<button class="build-mark-done" disabled style="margin-top:16px;opacity:0.5;cursor:default;">Set Up ✓</button>'
      : '<button class="build-mark-done" id="tool-btn-' + t.id + '" onclick="markToolSetUp(\'' + t.id + '\',' + t.xp + ');event.stopPropagation()" style="margin-top:16px;">Mark as Set Up ✓</button>';
    var stepsHtml = '<div class="build-steps" id="' + stepsId + '" style="display:none;">' +
      '<div class="build-steps-label">STEP-BY-STEP GUIDE</div>' +
      '<ol class="build-step-list">' +
      t.steps.map(function(s) { return '<li class="build-step-item">' + s + '</li>'; }).join('') +
      '</ol>' + btnHtml +
      '</div>';

    html += '<div class="build-card' + (isDone ? ' done' : '') + '" id="tool-card-' + t.id + '" onclick="toggleToolSteps(\'' + stepsId + '\',this)">' +
      '<div class="build-card-icon">' + toolIconSVG(t.id, t.color, 56, 56) + '</div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">' +
      '<div class="build-card-tag" style="margin-bottom:0;">' + t.category.toUpperCase() + '</div>' +
      '<span class="build-meta-pill ' + diffClass + '">' + t.difficulty + '</span>' +
      '</div>' +
      '<div class="build-card-title">' + t.name + '</div>' +
      '<div class="build-card-desc">' + t.desc + '</div>' +
      stepsHtml +
      '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

function toggleToolSteps(stepsId, card) {
  var el = document.getElementById(stepsId);
  if (!el) return;
  var isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  if (card) card.classList.toggle('tool-expanded', !isOpen);
}

function markToolSetUp(toolId, xp) {
  var stateKey = 'tool-' + toolId;
  if (state.completed[stateKey]) return;
  state.completed[stateKey] = true;
  markSectionComplete(stateKey);
  saveState();
  var card = document.getElementById('tool-card-' + toolId);
  if (card) card.classList.add('done');
  var btn = document.getElementById('tool-btn-' + toolId);
  if (btn) {
    btn.textContent = 'Set Up ✓';
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'default';
    btn.onclick = null;
  }
}

var LEVEL_NAMES = ['', 'Curious', 'Learning', 'Builder', 'Coder', 'Developer', 'Engineer', 'Architect', 'Senior', 'Principal'];

var PROF_THEMES = [
  { id: 'cosmic-blue',   name: 'Cosmic Blue',   mood: 'Calm / beginner',
    dot: 'linear-gradient(135deg,#00c8ff,#0055cc)',
    glow: 'rgba(0,180,255,0.30)', border: 'rgba(0,180,255,0.50)', bg: 'rgba(0,160,255,0.10)' },
  { id: 'aurora-teal',   name: 'Aurora Teal',   mood: 'Focused / productive',
    dot: 'linear-gradient(135deg,#00e5b0,#007a60)',
    glow: 'rgba(0,220,160,0.30)', border: 'rgba(0,210,150,0.50)', bg: 'rgba(0,200,130,0.10)' },
  { id: 'royal-violet',  name: 'Royal Violet',  mood: 'Creative / advanced',
    dot: 'linear-gradient(135deg,#a855f7,#5b21b6)',
    glow: 'rgba(168,85,247,0.30)', border: 'rgba(160,80,240,0.50)', bg: 'rgba(150,70,230,0.10)' },
  { id: 'ember-crimson', name: 'Ember Crimson', mood: 'Intense / energetic',
    dot: 'linear-gradient(135deg,#ff5555,#cc2200)',
    glow: 'rgba(255,80,80,0.30)', border: 'rgba(255,70,70,0.50)', bg: 'rgba(255,60,60,0.10)' },
  { id: 'obsidian-gold', name: 'Obsidian Gold', mood: 'Premium / mastery',
    dot: 'linear-gradient(135deg,#e8c878,#9a7030)',
    glow: 'rgba(200,169,110,0.30)', border: 'rgba(200,169,110,0.50)', bg: 'rgba(200,160,80,0.10)' },
];

var AVATARS = [
  {
    id: 'initiate', name: 'INITIATE', sub: 'The beginning of all things',
    color: '#60a5fa', glow: 'rgba(59,130,246,0.55)', border: 'rgba(96,165,250,0.75)',
    grad: 'linear-gradient(135deg,#60a5fa,#1d4ed8)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="68" height="68"><defs><filter id="ig-i"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M5,40 Q22,15 40,15 Q58,15 75,40 Q58,65 40,65 Q22,65 5,40Z" fill="#0c1830" stroke="#3b82f6" stroke-width="2" filter="url(#ig-i)"/><circle cx="40" cy="40" r="18" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5"/><circle cx="40" cy="40" r="12" fill="#0f172a"/><circle cx="40" cy="40" r="7" fill="#2563eb" filter="url(#ig-i)"/><circle cx="40" cy="40" r="3" fill="#93c5fd"/><circle cx="44" cy="35" r="2.5" fill="rgba(255,255,255,0.7)"/><line x1="5" y1="40" x2="22" y2="40" stroke="#3b82f6" stroke-width="2" opacity="0.8"/><line x1="58" y1="40" x2="75" y2="40" stroke="#3b82f6" stroke-width="2" opacity="0.8"/><circle cx="5" cy="40" r="3.5" fill="#60a5fa" filter="url(#ig-i)"/><circle cx="75" cy="40" r="3.5" fill="#60a5fa" filter="url(#ig-i)"/><line x1="5" y1="40" x2="9" y2="32" stroke="#60a5fa" stroke-width="1.2" opacity="0.5"/><line x1="75" y1="40" x2="71" y2="32" stroke="#60a5fa" stroke-width="1.2" opacity="0.5"/><circle cx="9" cy="32" r="2" fill="#60a5fa" opacity="0.6"/><circle cx="71" cy="32" r="2" fill="#60a5fa" opacity="0.6"/></svg>',
  },
  {
    id: 'builder', name: 'BUILDER', sub: 'Craft realities with code and curiosity',
    color: '#a855f7', glow: 'rgba(168,85,247,0.55)', border: 'rgba(192,132,252,0.75)',
    grad: 'linear-gradient(135deg,#a855f7,#7e22ce)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="68" height="68"><defs><filter id="ig-b"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect x="25" y="25" width="30" height="30" rx="4" fill="#1a0a2e" stroke="#9333ea" stroke-width="2" filter="url(#ig-b)"/><rect x="31" y="31" width="18" height="18" rx="2" fill="#2d1a4a" stroke="#7c3aed" stroke-width="1"/><circle cx="40" cy="40" r="5" fill="#a855f7" filter="url(#ig-b)"/><rect x="31" y="19" width="4" height="7" rx="1.5" fill="#9333ea"/><rect x="38" y="19" width="4" height="7" rx="1.5" fill="#9333ea"/><rect x="45" y="19" width="4" height="7" rx="1.5" fill="#9333ea"/><rect x="31" y="54" width="4" height="7" rx="1.5" fill="#9333ea"/><rect x="38" y="54" width="4" height="7" rx="1.5" fill="#9333ea"/><rect x="45" y="54" width="4" height="7" rx="1.5" fill="#9333ea"/><rect x="19" y="31" width="7" height="4" rx="1.5" fill="#9333ea"/><rect x="19" y="38" width="7" height="4" rx="1.5" fill="#9333ea"/><rect x="19" y="45" width="7" height="4" rx="1.5" fill="#9333ea"/><rect x="54" y="31" width="7" height="4" rx="1.5" fill="#9333ea"/><rect x="54" y="38" width="7" height="4" rx="1.5" fill="#9333ea"/><rect x="54" y="45" width="7" height="4" rx="1.5" fill="#9333ea"/><circle cx="11" cy="11" r="3" fill="#a855f7" filter="url(#ig-b)"/><circle cx="69" cy="11" r="3" fill="#a855f7" filter="url(#ig-b)"/><circle cx="11" cy="69" r="3" fill="#a855f7" filter="url(#ig-b)"/><circle cx="69" cy="69" r="3" fill="#a855f7" filter="url(#ig-b)"/><line x1="11" y1="11" x2="25" y2="25" stroke="#7c3aed" stroke-width="1" opacity="0.7"/><line x1="69" y1="11" x2="55" y2="25" stroke="#7c3aed" stroke-width="1" opacity="0.7"/><line x1="11" y1="69" x2="25" y2="55" stroke="#7c3aed" stroke-width="1" opacity="0.7"/><line x1="69" y1="69" x2="55" y2="55" stroke="#7c3aed" stroke-width="1" opacity="0.7"/></svg>',
  },
  {
    id: 'archivist', name: 'ARCHIVIST', sub: 'Knowledge illuminates the universe',
    color: '#f97316', glow: 'rgba(249,115,22,0.55)', border: 'rgba(251,146,60,0.75)',
    grad: 'linear-gradient(135deg,#f97316,#c2410c)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="68" height="68"><defs><filter id="ig-a"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M12,18 L38,18 L38,66 Q25,63 12,66 Z" fill="#1a0800" stroke="#ea580c" stroke-width="1.5"/><path d="M42,18 L68,18 L68,66 Q55,63 42,66 Z" fill="#1a0800" stroke="#ea580c" stroke-width="1.5"/><rect x="37" y="14" width="6" height="54" rx="2" fill="#9a3412"/><path d="M10,16 L38,13 L42,13 L70,16" fill="none" stroke="#f97316" stroke-width="3" stroke-linecap="round" filter="url(#ig-a)"/><path d="M21,40 C21,34 27,34 33,40 C39,46 45,46 45,40 C45,34 51,34 57,40 C51,46 45,46 39,40 C33,34 27,34 21,40Z" fill="none" stroke="#fb923c" stroke-width="2.5" filter="url(#ig-a)"/><line x1="15" y1="28" x2="35" y2="28" stroke="rgba(249,115,22,0.35)" stroke-width="1"/><line x1="15" y1="52" x2="35" y2="52" stroke="rgba(249,115,22,0.35)" stroke-width="1"/><line x1="45" y1="28" x2="65" y2="28" stroke="rgba(249,115,22,0.35)" stroke-width="1"/><line x1="45" y1="52" x2="65" y2="52" stroke="rgba(249,115,22,0.35)" stroke-width="1"/><circle cx="40" cy="40" r="3" fill="#fb923c" filter="url(#ig-a)"/></svg>',
  },
  {
    id: 'runner', name: 'ACCELERATOR', sub: 'Speed through questions to answers',
    color: '#14b8a6', glow: 'rgba(20,184,166,0.55)', border: 'rgba(45,212,191,0.75)',
    grad: 'linear-gradient(135deg,#14b8a6,#0f766e)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="68" height="68"><defs><filter id="ig-r"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M40,8 C44,8 56,22 58,40 L58,58 L40,66 L22,58 L22,40 C24,22 36,8 40,8Z" fill="#0c2a28" stroke="#14b8a6" stroke-width="2" filter="url(#ig-r)"/><path d="M22,40 L40,30 L58,40 C56,22 44,8 40,8 C36,8 24,22 22,40Z" fill="#134e4a"/><circle cx="40" cy="42" r="9" fill="#0f766e" stroke="#2dd4bf" stroke-width="2"/><circle cx="40" cy="42" r="4.5" fill="#14b8a6" filter="url(#ig-r)"/><path d="M22,52 L9,70 L26,61Z" fill="#0f766e" stroke="#14b8a6" stroke-width="1.2"/><path d="M58,52 L71,70 L54,61Z" fill="#0f766e" stroke="#14b8a6" stroke-width="1.2"/><path d="M33,66 Q40,76 47,66" fill="none" stroke="#2dd4bf" stroke-width="1.5" opacity="0.8"/><path d="M13,28 L19,39 L15,39 L21,51" fill="none" stroke="#2dd4bf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#ig-r)"/><path d="M67,28 L61,39 L65,39 L59,51" fill="none" stroke="#2dd4bf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#ig-r)"/></svg>',
  },
  {
    id: 'ascended', name: 'ASCENDED', sub: 'Mastery of understanding beyond limits',
    color: '#fbbf24', glow: 'rgba(251,191,36,0.55)', border: 'rgba(253,224,71,0.75)',
    grad: 'linear-gradient(135deg,#fbbf24,#92400e)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="68" height="68"><defs><filter id="ig-s"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><ellipse cx="40" cy="40" rx="34" ry="11" fill="none" stroke="#f59e0b" stroke-width="2" transform="rotate(-18 40 40)" filter="url(#ig-s)" opacity="0.85"/><path d="M40,9 L45,36 L72,40 L45,44 L40,71 L35,44 L8,40 L35,36Z" fill="#78350f" stroke="#fbbf24" stroke-width="1.5" filter="url(#ig-s)"/><circle cx="40" cy="40" r="9" fill="#fbbf24" filter="url(#ig-s)"/><circle cx="40" cy="40" r="4" fill="#fff7ed"/><circle cx="73" cy="40" r="3.5" fill="#fbbf24" filter="url(#ig-s)"/><circle cx="7" cy="40" r="2.5" fill="#f59e0b" opacity="0.8"/><circle cx="57" cy="20" r="2" fill="#fbbf24" opacity="0.9" filter="url(#ig-s)"/><circle cx="23" cy="60" r="1.5" fill="#f59e0b" opacity="0.7"/><circle cx="62" cy="58" r="1.5" fill="#fbbf24" opacity="0.7"/><line x1="40" y1="3" x2="40" y2="9" stroke="#fbbf24" stroke-width="2" opacity="0.7"/><line x1="40" y1="71" x2="40" y2="77" stroke="#fbbf24" stroke-width="2" opacity="0.7"/></svg>',
  },
];

function getProfTheme() {
  return localStorage.getItem('codebook_prof_theme') || 'cosmic-blue';
}

function getCoverTheme() {
  return localStorage.getItem('codebook_cover_theme') || 'cosmic-blue';
}

function applyCoverTheme(id) {
  var screen = document.getElementById('auth-screen');
  if (!screen) return;
  screen.className = screen.className.replace(/\bauth-theme-\S+/g, '').trim();
  screen.classList.add('auth-theme-' + id);
  document.querySelectorAll('.cover-orb').forEach(function(orb) {
    orb.classList.toggle('active', orb.getAttribute('data-theme') === id);
  });
}

function switchCoverTheme(id) {
  localStorage.setItem('codebook_cover_theme', id);
  applyCoverTheme(id);
}

function applyProfThemeToBody(id) {
  document.body.className = document.body.className.replace(/\bprof-theme-\S+/g, '').trim();
  document.body.classList.add('prof-theme-' + id);
}

function switchProfTheme(id) {
  localStorage.setItem('codebook_prof_theme', id);
  applyProfThemeToBody(id);
  renderProfilePanel();
}

function getSelectedAvatar() {
  return localStorage.getItem('codebook_avatar') || null;
}

function selectAvatar(id) {
  localStorage.setItem('codebook_avatar', id);
  hideAvatarPicker();
  renderProfilePanel();
}

function setNarratorGender(gender) {
  state.narratorGender = gender;
  saveState();
  renderProfilePanel();
}

function setAutoScroll(val) {
  state.autoScroll = !!val;
  saveState();
  if (!val) stopAutoScroll();
}

function setCodeCanvasOpacity(val) {
  var v = Math.max(0, Math.min(100, parseInt(val, 10)));
  state.codeCanvasOpacity = v;
  _hubCanvasOpacity = v / 100;
  saveState();
  var label = document.getElementById('canvas-opacity-val');
  if (label) label.textContent = v + '%';
}

function showAvatarPicker() {
  var existing = document.getElementById('avatar-picker');
  if (existing) existing.remove();

  var selectedId = getSelectedAvatar();
  var cardsHtml = AVATARS.map(function(av) {
    var isSelected = av.id === selectedId;
    return '<div class="avatar-card' + (isSelected ? ' selected' : '') + '"' +
      ' onclick="selectAvatar(\'' + av.id + '\')"' +
      ' style="--av-color:' + av.color + ';--av-glow:' + av.glow + ';--av-border:' + av.border + '">' +
      '<div class="avatar-card-icon">' + av.icon + '</div>' +
      '<div class="avatar-card-name">' + av.name + '</div>' +
      '<div class="avatar-card-sub">' + av.sub + '</div>' +
      '</div>';
  }).join('');

  var el = document.createElement('div');
  el.id = 'avatar-picker';
  el.className = 'avatar-picker';
  el.innerHTML =
    '<div class="avatar-picker-inner">' +
    '<button class="avatar-picker-close" onclick="hideAvatarPicker()">&#x2715;</button>' +
    '<div class="avatar-picker-title">Choose a character.</div>' +
    '<div class="avatar-cards">' + cardsHtml + '</div>' +
    '</div>';
  el.addEventListener('click', function(e) { if (e.target === el) hideAvatarPicker(); });
  document.body.appendChild(el);
  requestAnimationFrame(function() { el.classList.add('open'); });
}

function hideAvatarPicker() {
  var picker = document.getElementById('avatar-picker');
  if (!picker) return;
  picker.classList.remove('open');
  setTimeout(function() { if (picker.parentNode) picker.parentNode.removeChild(picker); }, 300);
}

var _venusStopMusic = null;
var _glitchStopMusic = null;
var _venusMuted = false;
var _glitchMuted = false;

function stopAllGameMusic() {
  if (_venusStopMusic) { _venusStopMusic(); _venusStopMusic = null; }
  if (_glitchStopMusic) { _glitchStopMusic(); _glitchStopMusic = null; }
  var ov = document.getElementById('gh-game-overlay');
  if (ov) ov.remove();
}

function _buildGameAmbient(droneFreqs, lfoFreq, lfoDepth, noiseType, noiseFreq, noiseQ, noiseGainVal, masterGainVal, fadeIn) {
  try {
    var actx = getAudioContext();
    if (!actx) return function() {};
    var master = actx.createGain();
    master.gain.value = 0;
    master.connect(actx.destination);
    var nodes = [];
    droneFreqs.forEach(function(f) {
      var osc = actx.createOscillator();
      osc.type = f.type || 'sine';
      osc.frequency.value = f.freq;
      osc.connect(master);
      osc.start();
      nodes.push(osc);
    });
    if (nodes.length > 0 && lfoFreq) {
      var lfo = actx.createOscillator();
      var lfoG = actx.createGain();
      lfo.type = 'sine'; lfo.frequency.value = lfoFreq;
      lfoG.gain.value = lfoDepth || 1;
      lfo.connect(lfoG); lfoG.connect(nodes[0].frequency);
      lfo.start(); nodes.push(lfo);
    }
    var noiseSize = Math.floor(3 * actx.sampleRate);
    var noiseBuf = actx.createBuffer(1, noiseSize, actx.sampleRate);
    var nd = noiseBuf.getChannelData(0);
    for (var i = 0; i < noiseSize; i++) nd[i] = Math.random() * 2 - 1;
    var noise = actx.createBufferSource();
    noise.buffer = noiseBuf; noise.loop = true;
    var filt = actx.createBiquadFilter();
    filt.type = noiseType; filt.frequency.value = noiseFreq; filt.Q.value = noiseQ || 1;
    var ng = actx.createGain(); ng.gain.value = noiseGainVal || 0.01;
    noise.connect(filt); filt.connect(ng); ng.connect(master);
    noise.start(); nodes.push(noise);
    master.gain.linearRampToValueAtTime(masterGainVal, actx.currentTime + (fadeIn || 4));
    return function() {
      try {
        master.gain.cancelScheduledValues(actx.currentTime);
        master.gain.linearRampToValueAtTime(0, actx.currentTime + 1.5);
        setTimeout(function() { nodes.forEach(function(n) { try { n.stop(); } catch(_) {} }); }, 1600);
      } catch(_) {}
    };
  } catch(_) { return function() {}; }
}

function startVenusGameMusic() {
  try {
    var actx = getAudioContext();
    if (!actx) return function() {};
    var master = actx.createGain();
    master.gain.value = 0;
    master.connect(actx.destination);
    var nodes = [];
    [{ freq: 110 }, { freq: 155.56 }, { freq: 220 }].forEach(function(f) {
      var osc = actx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f.freq;
      osc.connect(master);
      osc.start();
      nodes.push(osc);
    });
    var lfo = actx.createOscillator();
    var lfoG = actx.createGain();
    lfo.type = 'sine'; lfo.frequency.value = 0.04;
    lfoG.gain.value = 1.5;
    lfo.connect(lfoG); lfoG.connect(nodes[0].frequency);
    lfo.start(); nodes.push(lfo);
    master.gain.linearRampToValueAtTime(0.016, actx.currentTime + 4);
    return function() {
      try {
        master.gain.cancelScheduledValues(actx.currentTime);
        master.gain.linearRampToValueAtTime(0, actx.currentTime + 1.5);
        setTimeout(function() { nodes.forEach(function(n) { try { n.stop(); } catch(_) {} }); }, 1600);
      } catch(_) {}
    };
  } catch(_) { return function() {}; }
}

function startGlitchGameMusic() {
  return _buildGameAmbient(
    [{ freq: 55, type: 'sawtooth' }, { freq: 73.42, type: 'sawtooth' }],
    0.35, 2, 'bandpass', 900, 3.5, 0.014, 0.022, 2.5
  );
}

function renderGamePanel() {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  var _fi = panel.querySelector('iframe');
  if (_fi) { try { _fi.contentWindow.postMessage({ type: 'STOP_AUDIO' }, '*'); } catch(_) {} }
  stopAllGameMusic();
  panel.innerHTML =
    '<div class="game-hub gh-lights-off" id="game-hub-root">' +

      '<div class="gh-switch-row">' +
        '<button class="gh-light-switch" onclick="toggleGameLight()" title="Toggle light">' +
          '<span class="gh-light-emoji">&#128161;</span>' +
          '<div class="gh-switch-plate">' +
            '<div class="gh-switch-rocker"></div>' +
          '</div>' +
        '</button>' +
      '</div>' +

      '<div class="gh-dark-overlay" id="gh-dark-overlay" onclick="toggleGameLight()">' +
        '<div class="gh-sage-dark">' +
          '<div class="gh-sage-owl">' + controllerSVG(64, 48) + '</div>' +
          '<div class="gh-sage-msg">Tap anywhere to reveal the room.</div>' +
        '</div>' +
      '</div>' +

      '<div class="gh-content">' +
        '<div class="gh-header">' +
          '<div class="gh-title">GAME HUB</div>' +
          '<div class="gh-sub">Choose your mission. More games coming soon.</div>' +
        '</div>' +
        '<div class="gh-grid">' +

          '<div class="gh-card gh-card--active gh-card--launch" onclick="launchGame(\'launch-sequence\')">' +
            '<div class="gh-card-badge gh-card-badge--live">LIVE</div>' +
            '<div class="gh-card-icon-wrap"><span class="gh-card-icon">&#128640;</span></div>' +
            '<div class="gh-card-body">' +
              '<div class="gh-card-name">LAUNCH SEQUENCE</div>' +
              '<div class="gh-card-tagline">Mars Mission Briefing</div>' +
              '<div class="gh-card-desc">Educational sci-fi mission. Repair rocket systems, debug code faults, and launch to Mars.</div>' +
            '</div>' +
            '<button class="gh-card-btn">PLAY NOW</button>' +
          '</div>' +

          '<div class="gh-card gh-card--active gh-card--venus" onclick="launchGlitchMode()">' +
            '<div class="gh-card-badge gh-card-badge--live">LIVE</div>' +
            '<div class="gh-card-icon-wrap"><span class="gh-card-icon">&#128268;</span></div>' +
            '<div class="gh-card-body">' +
              '<div class="gh-card-name">VENUS MODE</div>' +
              '<div class="gh-card-tagline">Colony Signal Router</div>' +
              '<div class="gh-card-desc">The colony\'s infrastructure is failing. Route the signal through damaged conduit nodes to keep life support online. Every connection teaches a real coding pattern.</div>' +
            '</div>' +
            '<button class="gh-card-btn">PLAY NOW</button>' +
          '</div>' +

          '<div class="gh-card gh-card--active gh-card--chaos" onclick="launchChaosMode()">' +
            '<div class="gh-card-badge gh-card-badge--live">LIVE</div>' +
            '<div class="gh-card-icon-wrap"><span class="gh-card-icon">&#9889;</span></div>' +
            '<div class="gh-card-body">' +
              '<div class="gh-card-name">GLITCH MODE</div>' +
              '<div class="gh-card-tagline">Debug Under Fire</div>' +
              '<div class="gh-card-desc">The colony AI has corrupted itself and is fighting your repairs. REVERSE. CORRUPT. FLICKER. Real bugs. Real consequences. Can you debug faster than it breaks?</div>' +
            '</div>' +
            '<button class="gh-card-btn">PLAY NOW</button>' +
          '</div>' +

        '</div>' +
      '</div>' +

    '</div>';
}

function toggleGameLight() {
  var root = document.getElementById('game-hub-root');
  var overlay = document.getElementById('gh-dark-overlay');
  if (!root) return;
  if (root.classList.contains('gh-lights-off')) {
    root.classList.remove('gh-lights-off');
    root.classList.add('gh-lights-on');
    if (overlay) overlay.style.display = 'none';
  } else {
    root.classList.remove('gh-lights-on');
    root.classList.add('gh-lights-off');
    if (overlay) overlay.style.display = 'flex';
  }
}


function launchGame(gameId) {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  var src = './game/index.html';

  if (typeof isMobile === 'function' && isMobile()) {
    // Full-screen fixed overlay on mobile so the game gets its own proper viewport
    var existing = document.getElementById('gh-game-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'gh-game-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:#000;display:flex;flex-direction:column;';

    var isPortrait = window.innerHeight > window.innerWidth;
    if (gameId === 'launch-sequence' && isPortrait) {
      overlay.innerHTML =
        '<div id="gh-orient-prompt" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding:32px;background:#030a15;">' +
          '<div style="font-size:64px;animation:ghRotateHint 2s ease-in-out infinite;">&#x1F4F1;</div>' +
          '<div style="font-family:\'Orbitron\',sans-serif;font-size:15px;letter-spacing:2px;color:#c8a96e;text-align:center;">ROTATE YOUR DEVICE</div>' +
          '<div style="font-family:\'Space Mono\',monospace;font-size:12px;color:rgba(180,210,255,0.65);text-align:center;line-height:1.7;max-width:280px;">This game is designed for landscape mode.<br>Rotate your device for the best experience.</div>' +
          '<button onclick="document.getElementById(\'gh-orient-prompt\').remove();document.getElementById(\'gh-game-overlay\').style.flexDirection=\'column\';" style="margin-top:8px;background:none;border:1px solid rgba(200,169,80,0.5);color:#c8a96e;font-family:\'Space Mono\',monospace;font-size:11px;letter-spacing:1px;padding:10px 24px;cursor:pointer;border-radius:4px;">PLAY ANYWAY</button>' +
          '<button onclick="document.getElementById(\'gh-game-overlay\').remove()" style="background:none;border:none;color:rgba(180,210,255,0.4);font-family:\'Space Mono\',monospace;font-size:11px;cursor:pointer;">&#8592; BACK</button>' +
        '</div>';
      document.body.appendChild(overlay);
      var _orientCheck = setInterval(function() {
        if (window.innerWidth > window.innerHeight) {
          clearInterval(_orientCheck);
          var prompt = document.getElementById('gh-orient-prompt');
          if (prompt) {
            prompt.remove();
            var ov2 = document.getElementById('gh-game-overlay');
            if (ov2) {
              ov2.style.cssText = 'position:fixed;inset:0;z-index:500;background:#000;';
              ov2.innerHTML =
                '<iframe src="' + src + '" title="' + gameId + '" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:none;display:block;"></iframe>' +
                '<button onclick="document.getElementById(\'gh-game-overlay\').remove()" style="position:absolute;top:8px;left:10px;z-index:10;background:rgba(10,10,20,0.75);border:1px solid rgba(200,169,80,0.4);color:#c8a96e;font-size:11px;cursor:pointer;font-family:\'Space Mono\',monospace;letter-spacing:1px;padding:5px 10px;border-radius:4px;">&#8592; HUB</button>';
            }
          }
        }
      }, 300);
      return;
    }

    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:#000;';
    overlay.innerHTML =
      '<iframe src="' + src + '" title="' + gameId + '" allowfullscreen ' +
        'style="position:absolute;inset:0;width:100%;height:100%;border:none;display:block;"></iframe>' +
      '<button onclick="document.getElementById(\'gh-game-overlay\').remove()" style="position:absolute;top:8px;left:10px;z-index:10;background:rgba(10,10,20,0.75);border:1px solid rgba(200,169,80,0.4);color:#c8a96e;font-size:11px;cursor:pointer;font-family:\'Space Mono\',monospace;letter-spacing:1px;padding:5px 10px;border-radius:4px;">&#8592; HUB</button>';
    document.body.appendChild(overlay);
    return;
  }

  panel.innerHTML =
    '<div class="gh-back-bar">' +
      '<button class="gh-back-btn" onclick="renderGamePanel()">&#8592; GAME HUB</button>' +
    '</div>' +
    '<iframe src="' + src + '" title="' + gameId + '" allowfullscreen ' +
      'style="width:100%;height:calc(100% - 44px);border:none;display:block;"></iframe>';
}

function showGameIntro(mode, onComplete) {
  var existing = document.getElementById('game-intro-overlay');
  if (existing) existing.remove();
  var isVenus = mode === 'venus';
  var el = document.createElement('div');
  el.id = 'game-intro-overlay';
  el.className = 'game-intro game-intro--' + (isVenus ? 'venus' : 'chaos');
  el.innerHTML =
    '<div class="game-intro-inner">' +
      '<div class="game-intro-eyebrow">' + (isVenus ? 'COLONY SIGNAL ROUTER' : '&#9888; SYSTEM BREACH DETECTED &#9888;') + '</div>' +
      '<div class="game-intro-title" data-glitch="' + (isVenus ? 'VENUS' : 'GLITCH') + '">' + (isVenus ? 'VENUS' : 'GLITCH') + '</div>' +
      '<div class="game-intro-sub">' + (isVenus ? 'INITIALIZING NEURAL LINK...' : 'SIGNAL CORRUPTED &mdash; REROUTING...') + '</div>' +
      '<div class="game-intro-bar"><div class="game-intro-bar-fill"></div></div>' +
      '<div class="game-intro-skip">TAP TO SKIP</div>' +
    '</div>' +
    '<div class="game-intro-scanlines"></div>';
  document.body.appendChild(el);
  function dismiss() {
    if (!el.parentNode) return;
    el.classList.add('game-intro--exit');
    setTimeout(function() {
      if (el.parentNode) el.parentNode.removeChild(el);
      if (onComplete) onComplete();
    }, 560);
  }
  var autoT = setTimeout(dismiss, 3200);
  el.addEventListener('click', function() { clearTimeout(autoT); dismiss(); }, { once: true });
}

function showGameBriefing(mode) {
  var isVenus = mode === 'venus';
  var slides = isVenus ? [
    {
      tag: 'THE MISSION', icon: '&#128268;',
      title: 'Venus Colony<br>Signal Router',
      body: 'A critical communication link between Venus Colony sectors has been severed. Without signal, the colony goes dark. You are the network engineer tasked with restoring the pathway.'
    },
    {
      tag: 'YOUR TASK', icon: '&#8635;',
      title: 'Rotate to<br>Reconnect',
      body: 'Tap any pipe tile to rotate it 90&deg;. Chain the pipes to form a continuous path from <strong>SOURCE</strong> to <strong>TARGET</strong>. Signal flows only through fully connected pipes. Fewer moves earns more XP.'
    },
    {
      tag: 'THE LEVELS', icon: '&#9776;',
      title: '20 Levels<br>3 Grid Sizes',
      tiers: [
        { name: 'LINK-01 &ndash; 04', grid: '3&times;3', desc: 'Linear routing &middot; Basic pipe shapes' },
        { name: 'LINK-05 &ndash; 13', grid: '4&times;4', desc: 'Branching &middot; T-junctions &middot; Dead code' },
        { name: 'LINK-14 &ndash; 20', grid: '5&times;5', desc: 'Loops &middot; Recursion &middot; Nested logic' }
      ],
      footer: 'Each level teaches a real coding concept.'
    }
  ] : [
    {
      tag: 'THE MISSION', icon: '&#9889;',
      title: 'Glitch Mode<br>System Breach',
      body: 'A rogue process has corrupted the signal routing network. The system is destabilising. You are the last line of defence &mdash; patch the corrupted pipes before the colony loses contact entirely.'
    },
    {
      tag: 'YOUR TASK', icon: '&#8635;',
      title: 'Patch the<br>Corruption',
      body: 'Tap any corrupted pipe tile to rotate it 90&deg;. Restore a continuous path from <strong>SOURCE</strong> to <strong>TARGET</strong>. The corruption makes every mis-rotation costly &mdash; think before you act.'
    },
    {
      tag: 'THE LEVELS', icon: '&#9776;',
      title: '5 Levels<br>Escalating Chaos',
      tiers: [
        { name: 'GLITCH-01 &ndash; 04', grid: '4&times;4', desc: 'Inverted logic &middot; Silent bugs &middot; Race faults' },
        { name: 'GLITCH-05',            grid: '5&times;5', desc: 'Total system failure &middot; Maximum corruption' }
      ],
      footer: 'Each level mirrors a real class of software bug.'
    }
  ];

  var current = 0;

  function buildSlideHTML(s) {
    var h = '<div class="gb-slide-icon">' + s.icon + '</div>' +
      '<div class="gb-slide-tag">' + s.tag + '</div>' +
      '<h2 class="gb-slide-title">' + s.title + '</h2>';
    if (s.body) h += '<p class="gb-slide-body">' + s.body + '</p>';
    if (s.tiers) {
      h += '<div class="gb-tiers">';
      for (var i = 0; i < s.tiers.length; i++) {
        var t = s.tiers[i];
        h += '<div class="gb-tier">' +
          '<span class="gb-tier-name">' + t.name + '</span>' +
          '<span class="gb-tier-grid">' + t.grid + '</span>' +
          '<span class="gb-tier-desc">' + t.desc + '</span>' +
          '</div>';
      }
      h += '</div>';
      if (s.footer) h += '<p class="gb-slide-footer">' + s.footer + '</p>';
    }
    return h;
  }

  function buildDots() {
    var h = '';
    for (var i = 0; i < slides.length; i++)
      h += '<span class="gb-dot' + (i === current ? ' gb-dot--active' : '') + '"></span>';
    return h;
  }

  var el = document.createElement('div');
  el.id = 'game-brief-overlay';
  el.className = 'game-brief game-brief--' + (isVenus ? 'venus' : 'chaos');
  el.innerHTML =
    '<button class="gb-skip">SKIP</button>' +
    '<div class="gb-slide">' + buildSlideHTML(slides[0]) + '</div>' +
    '<div class="gb-nav">' +
      '<div class="gb-dots">' + buildDots() + '</div>' +
      '<button class="gb-next">NEXT &rarr;</button>' +
    '</div>';
  document.body.appendChild(el);

  function dismiss() {
    if (!el.parentNode) return;
    el.classList.add('game-brief--exit');
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
  }

  function goTo(idx) {
    current = idx;
    var slideEl = el.querySelector('.gb-slide');
    slideEl.classList.add('gb-slide--out');
    setTimeout(function() {
      slideEl.innerHTML = buildSlideHTML(slides[current]);
      slideEl.classList.remove('gb-slide--out');
      slideEl.classList.add('gb-slide--in');
      setTimeout(function() { slideEl.classList.remove('gb-slide--in'); }, 350);
      var dots = el.querySelectorAll('.gb-dot');
      for (var i = 0; i < dots.length; i++)
        dots[i].classList.toggle('gb-dot--active', i === current);
      el.querySelector('.gb-next').innerHTML =
        current === slides.length - 1
          ? (isVenus ? 'BEGIN MISSION' : 'ENTER CHAOS &#9889;')
          : 'NEXT &rarr;';
    }, 220);
  }

  // Set initial button label correctly
  if (slides.length === 1)
    el.querySelector('.gb-next').innerHTML = isVenus ? 'BEGIN MISSION' : 'ENTER CHAOS &#9889;';

  el.querySelector('.gb-next').addEventListener('click', function() {
    if (current < slides.length - 1) goTo(current + 1);
    else dismiss();
  });
  el.querySelector('.gb-skip').addEventListener('click', dismiss);
}

function launchGlitchMode() {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  showGameIntro('venus', function() { showGameBriefing('venus'); });

  var envBgVenus = '<div class="env-bg env-bg--venus" aria-hidden="true"><img class="env-bg-img" src="assets/venus-bg.jpg" alt=""><div class="env-bg-depth"></div><div class="env-bg-horizon"></div><div class="env-bg-vignette"></div></div>';
  var backBar = '<div class="glitch-back-bar" style="height:44px;background:#0a0a0a;border-bottom:1px solid rgba(0,200,255,0.12);display:flex;align-items:center;padding:0 14px;">' +
    '<button onclick="__glitchBack()" style="background:none;border:none;color:#00e5ff;font-size:13px;cursor:pointer;font-family:\'Space Mono\',monospace;letter-spacing:1px;padding:0;">&#8592; GAME HUB</button>' +
    '<button id="venus-music-btn" onclick="__toggleVenusMusic()" style="margin-left:auto;background:none;border:1px solid rgba(0,200,255,0.25);border-radius:3px;color:rgba(0,200,255,' + (_venusMuted ? '0.28' : '0.65') + ');font-size:11px;cursor:pointer;font-family:\'Space Mono\',monospace;letter-spacing:1px;padding:4px 10px;">' + (_venusMuted ? '♪ OFF' : '♪ ON') + '</button>' +
    '</div>';
  var glitchBody =
    '<div class="glitch-game-body">' +
      '<div class="glitch-hdr">' +
        '<div class="glitch-hdr-left">' +
          '<div class="glitch-hdr-title">VENUS MODE</div>' +
          '<div class="glitch-hdr-sub" id="glitch-sub">LINK-01</div>' +
          '<div class="glitch-log" id="glitch-log"></div>' +
        '</div>' +
        '<div class="glitch-stats">' +
          '<div class="glitch-stat"><span class="glitch-stat-lbl">LVL</span><span class="glitch-stat-val" id="glitch-level">1</span></div>' +
          '<div class="glitch-stat"><span class="glitch-stat-lbl">SCORE</span><span class="glitch-stat-val" id="glitch-score">0</span></div>' +
          '<div class="glitch-stat"><span class="glitch-stat-lbl">MOVES</span><span class="glitch-stat-val" id="glitch-moves">0</span></div>' +
          '<div class="glitch-stat glitch-stat--restart"><button class="glitch-restart-btn" onclick="if(typeof GlitchGame!==\'undefined\')GlitchGame.restart()" title="Restart level">&#8635;</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="glitch-canvas-wrap" style="position:relative">' +
        '<div class="glitch-mode-watermark glitch-mode-watermark--venus">VENUS</div>' +
        '<canvas id="glitch-canvas"></canvas>' +
        '<div id="glitch-level-msg" class="glitch-level-msg"></div>' +
      '</div>' +
    '</div>' +
    '<div id="glitch-complete" class="glitch-complete-overlay" style="display:none">' +
      '<div class="glitch-complete-card">' +
        '<span class="glitch-complete-glyph">&#9672;</span>' +
        '<div class="glitch-complete-title">SYSTEM RESTORED</div>' +
        '<div class="glitch-complete-sub">Signal pathway reconnected.</div>' +
        '<div id="glitch-concept" class="glitch-concept-line"></div>' +
        '<div id="glitch-concept-note" class="glitch-concept-note"></div>' +
        '<div id="glitch-xp" class="glitch-complete-xp">+50 XP</div>' +
        '<button class="glitch-next-btn" onclick="GlitchGame.nextLevel()">Next Level &#8594;</button>' +
      '</div>' +
    '</div>';

  if (_venusStopMusic) { _venusStopMusic(); _venusStopMusic = null; }
  if (!_venusMuted) { _venusStopMusic = startVenusGameMusic(); }

  window.__toggleVenusMusic = function() {
    _venusMuted = !_venusMuted;
    if (_venusMuted) {
      if (_venusStopMusic) { _venusStopMusic(); _venusStopMusic = null; }
    } else {
      _venusStopMusic = startVenusGameMusic();
    }
    var btn = document.getElementById('venus-music-btn');
    if (btn) {
      btn.textContent = _venusMuted ? '♪ OFF' : '♪ ON';
      btn.style.color = 'rgba(0,200,255,' + (_venusMuted ? '0.28' : '0.65') + ')';
    }
  };

  window.__glitchBack = function() {
    if (_venusStopMusic) { _venusStopMusic(); _venusStopMusic = null; }
    if (typeof LoreSystem !== 'undefined') LoreSystem.destroy();
    if (typeof GlitchGame !== 'undefined') GlitchGame.destroy();
    var ov = document.getElementById('gh-game-overlay');
    if (ov) ov.remove();
    else renderGamePanel();
  };

  if (typeof isMobile === 'function' && isMobile()) {
    var existing = document.getElementById('gh-game-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'gh-game-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:#020608;display:flex;flex-direction:column;';
    overlay.innerHTML = envBgVenus + backBar + glitchBody;
    document.body.appendChild(overlay);
    setTimeout(function() {
      if (typeof LoreSystem !== 'undefined') LoreSystem.init('venus');
      if (typeof GlitchGame !== 'undefined') GlitchGame.init('glitch-canvas');
    }, 150);
    return;
  }

  panel.innerHTML = '<div class="glitch-game-root">' + envBgVenus + backBar + glitchBody + '</div>';
  var _glitchRoot = panel.querySelector('.glitch-game-root');
  if (_glitchRoot) {
    _glitchRoot.classList.add('glitch-shake');
    setTimeout(function() { _glitchRoot.classList.remove('glitch-shake'); }, 520);
  }
  setTimeout(function() {
    if (typeof LoreSystem !== 'undefined') LoreSystem.init('venus');
    if (typeof GlitchGame !== 'undefined') GlitchGame.init('glitch-canvas');
  }, 100);
}

function launchChaosMode() {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  showGameIntro('chaos', function() { showGameBriefing('chaos'); });

  var envBgChaos = '<div class="env-bg env-bg--chaos" aria-hidden="true"><img class="env-bg-img" src="assets/chaos-bg.jpg" alt=""><div class="env-bg-depth"></div><div class="env-bg-horizon"></div><div class="env-bg-vignette"></div></div>';
  var backBar = '<div class="glitch-back-bar" style="height:44px;background:#0a0208;border-bottom:1px solid rgba(255,40,80,0.18);display:flex;align-items:center;padding:0 14px;">' +
    '<button onclick="__chaosBack()" style="background:none;border:none;color:#ff4466;font-size:13px;cursor:pointer;font-family:\'Space Mono\',monospace;letter-spacing:1px;padding:0;">&#8592; GAME HUB</button>' +
    '<button id="glitch-music-btn" onclick="__toggleGlitchMusic()" style="margin-left:auto;background:none;border:1px solid rgba(255,40,80,0.25);border-radius:3px;color:rgba(255,68,102,' + (_glitchMuted ? '0.28' : '0.65') + ');font-size:11px;cursor:pointer;font-family:\'Space Mono\',monospace;letter-spacing:1px;padding:4px 10px;">' + (_glitchMuted ? '♪ OFF' : '♪ ON') + '</button>' +
    '</div>';
  var chaosBody =
    '<div class="glitch-game-body">' +
      '<div class="glitch-hdr" style="border-bottom-color:rgba(255,40,80,0.12)">' +
        '<div class="glitch-hdr-left">' +
          '<div class="glitch-hdr-title" style="color:#ff4466;text-shadow:0 0 14px rgba(255,40,80,0.55)">GLITCH MODE</div>' +
          '<div class="glitch-hdr-sub" id="glitch-sub">GLITCH-01</div>' +
          '<div class="glitch-log glitch-log--chaos" id="glitch-log"></div>' +
        '</div>' +
        '<div class="glitch-stats">' +
          '<div class="glitch-stat"><span class="glitch-stat-lbl">LVL</span><span class="glitch-stat-val" id="glitch-level">1</span></div>' +
          '<div class="glitch-stat"><span class="glitch-stat-lbl">SCORE</span><span class="glitch-stat-val" id="glitch-score">0</span></div>' +
          '<div class="glitch-stat"><span class="glitch-stat-lbl">MOVES</span><span class="glitch-stat-val" id="glitch-moves">0</span></div>' +
          '<div class="glitch-stat glitch-stat--restart"><button class="glitch-restart-btn" style="color:rgba(255,60,80,0.70);border-color:rgba(255,40,80,0.30)" onclick="if(typeof ChaosGame!==\'undefined\')ChaosGame.restart()" title="Restart level">&#8635;</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="glitch-canvas-wrap" style="position:relative">' +
        '<div class="glitch-mode-watermark glitch-mode-watermark--chaos">GLITCH</div>' +
        '<canvas id="glitch-canvas"></canvas>' +
        '<div id="glitch-level-msg" class="glitch-level-msg" style="color:rgba(255,60,80,0.32)"></div>' +
      '</div>' +
    '</div>' +
    '<div id="glitch-complete" class="glitch-complete-overlay" style="display:none">' +
      '<div class="glitch-complete-card" style="border-color:rgba(255,40,80,0.28);box-shadow:0 0 60px rgba(255,40,80,0.10),0 0 120px rgba(255,40,80,0.04)">' +
        '<span class="glitch-complete-glyph" style="color:#ff4466;text-shadow:0 0 22px rgba(255,40,80,0.8)">&#9889;</span>' +
        '<div class="glitch-complete-title" style="color:#ff4466;text-shadow:0 0 14px rgba(255,40,80,0.6)">SIGNAL PATCHED</div>' +
        '<div class="glitch-complete-sub">Chaos contained. For now.</div>' +
        '<div id="glitch-concept" class="glitch-concept-line" style="color:rgba(255,140,60,0.82)"></div>' +
        '<div id="glitch-concept-note" class="glitch-concept-note"></div>' +
        '<div id="glitch-xp" class="glitch-complete-xp">+50 XP</div>' +
        '<button class="glitch-next-btn" onclick="ChaosGame.nextLevel()">Next Level &#8594;</button>' +
      '</div>' +
    '</div>';

  if (_glitchStopMusic) { _glitchStopMusic(); _glitchStopMusic = null; }
  if (!_glitchMuted) { _glitchStopMusic = startGlitchGameMusic(); }

  window.__toggleGlitchMusic = function() {
    _glitchMuted = !_glitchMuted;
    if (_glitchMuted) {
      if (_glitchStopMusic) { _glitchStopMusic(); _glitchStopMusic = null; }
    } else {
      _glitchStopMusic = startGlitchGameMusic();
    }
    var btn = document.getElementById('glitch-music-btn');
    if (btn) {
      btn.textContent = _glitchMuted ? '♪ OFF' : '♪ ON';
      btn.style.color = 'rgba(255,68,102,' + (_glitchMuted ? '0.28' : '0.65') + ')';
    }
  };

  window.__chaosBack = function () {
    if (_glitchStopMusic) { _glitchStopMusic(); _glitchStopMusic = null; }
    if (typeof LoreSystem !== 'undefined') LoreSystem.destroy();
    if (typeof ChaosGame !== 'undefined') ChaosGame.destroy();
    var ov = document.getElementById('gh-game-overlay');
    if (ov) ov.remove();
    else renderGamePanel();
  };

  if (typeof isMobile === 'function' && isMobile()) {
    var existing = document.getElementById('gh-game-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'gh-game-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:#060104;display:flex;flex-direction:column;';
    overlay.innerHTML = envBgChaos + backBar + chaosBody;
    document.body.appendChild(overlay);
    setTimeout(function () {
      if (typeof LoreSystem !== 'undefined') LoreSystem.init('chaos');
      if (typeof ChaosGame !== 'undefined') ChaosGame.init('glitch-canvas');
    }, 150);
    return;
  }

  panel.innerHTML = '<div class="glitch-game-root glitch-game-root--chaos">' + envBgChaos + backBar + chaosBody + '</div>';
  setTimeout(function () {
    if (typeof LoreSystem !== 'undefined') LoreSystem.init('chaos');
    if (typeof ChaosGame !== 'undefined') ChaosGame.init('glitch-canvas');
  }, 100);
}

function getProfileRank(fi) {
  if (fi >= 6) return 'DIRECTOR';
  if (fi >= 5) return 'SENIOR AGENT';
  if (fi >= 4) return 'FIELD AGENT';
  if (fi >= 3) return 'SPECIALIST';
  if (fi >= 2) return 'OPERATIVE';
  if (fi >= 1) return 'INITIATE';
  return 'RECRUIT';
}

function getSageFieldNote(st, name) {
  name = escHtml(name || '');
  var floor  = st.currentFloor || 1;
  var streak = st.streak || 0;
  var earned = (st.earnedBadges || []).length;
  var done   = Object.keys(st.completed || {}).filter(function(k){ return st.completed[k]; }).length;
  if (streak >= 30) return name + ' has shown up 30 days straight. That\'s not habit — that\'s identity.';
  if (streak >= 14) return 'Two weeks without missing a single day. Most people quit in week one. ' + name + ' hasn\'t.';
  if (streak >= 7)  return 'Seven consecutive days. This is exactly where the gap between those who make it and those who don\'t starts to open.';
  if (earned >= 6)  return name + ' has earned ' + earned + ' clearance badges. That kind of record says more than any CV.';
  if (floor >= 6)   return 'Floor ' + floor + '. The operators who reach this far have already filtered themselves into a different category.';
  if (floor >= 4)   return 'Past the halfway mark. Most learners never see Floor ' + floor + '. ' + name + ' does.';
  if (floor >= 3)   return 'You\'ve crossed the threshold that filters out the majority. What comes next defines the rest.';
  if (floor >= 2)   return 'The foundations are in. What gets built on top of them is entirely up to ' + name + '.';
  if (done >= 5)    return 'Early days, but ' + name + ' showed up — and that already puts them ahead of most.';
  return 'Every journey starts somewhere. ' + name + '\'s starts here.';
}

function renderProfilePanel() {
  var panel = document.getElementById('panel-profile');
  if (!panel) return;

  var currentTheme = getProfTheme();
  var name = state.playerName || localStorage.getItem('codebook_player_name') || 'Learner';
  var cur = getCurrentLevel();
  var next = getNextLevel();
  var levelName = LEVEL_NAMES[cur.level] || 'Level ' + cur.level;
  var xpIntoLevel = state.xp - cur.xp;
  var xpForNextLevel = next ? (next.xp - cur.xp) : 1;
  var levelPct = next ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100)) : 100;
  var floorIndex = Math.max(0, (state.currentFloor || 1) - 1);

  var doneSecs = Object.keys(state.completed || {}).filter(function(k) {
    return state.completed[k] && FLOORS.some(function(f){ return f.sections.some(function(s){ return s.id === k; }); });
  }).length;
  var totalMinutes = Math.round((state.totalSeconds || 0) / 60);
  var timeDisplay = totalMinutes >= 60
    ? Math.floor(totalMinutes / 60) + 'h ' + (totalMinutes % 60) + 'm'
    : (totalMinutes || 0) + 'm';

  var rank     = getProfileRank(floorIndex);
  var sageNote = getSageFieldNote(state, name);
  var selectedAv = AVATARS.find(function(a){ return a.id === getSelectedAvatar(); }) || null;

  var floorsDone = FLOORS.filter(function(f, fi){ return isFloorComplete(fi); }).length;
  var curFloorTitle = FLOORS[floorIndex] ? FLOORS[floorIndex].title : '';
  var missionLine = floorsDone >= 7
    ? 'All 7 floors complete. Mission accomplished.'
    : 'Floor ' + (state.currentFloor || 1) + ' — ' + curFloorTitle + '. ' + doneSecs + ' section' + (doneSecs === 1 ? '' : 's') + ' complete.';

  // Theme selector
  var themesHtml = '<div class="pf-themes">' +
    PROF_THEMES.map(function(t) {
      var isActive = t.id === currentTheme;
      return '<button class="pf-theme-btn' + (isActive ? ' pf-theme-active' : '') + '" title="' + t.name + '" onclick="switchProfTheme(\'' + t.id + '\')" style="--sw-dot:' + t.dot + ';--sw-glow:' + t.glow + ';--sw-border:' + t.border + '">' +
        '<div class="pf-theme-orb"></div>' +
        '<span class="pf-theme-name">' + t.name.split(' ')[0].toUpperCase() + '</span>' +
      '</button>';
    }).join('') +
  '</div>';

  // Badge strip — earned only
  var earnedBadges = BADGES.filter(function(b) {
    return state.earnedBadges && state.earnedBadges.indexOf(b.id) > -1;
  });
  var badgesHtml = earnedBadges.length > 0
    ? '<div class="pf-badge-grid">' + earnedBadges.map(function(b) {
        return '<div class="pf-badge pf-badge-earned" title="' + b.name + '"><span class="pf-badge-icon">' + b.emoji + '</span></div>';
      }).join('') + '</div>'
    : '<div class="pf-badge-none">No badges earned yet — complete sections to unlock them.</div>';

  panel.innerHTML =
    '<div class="prof-layout pf-v2" data-prof-theme="' + currentTheme + '">' +

    // Header — name, rank, current mission
    '<div class="pf-header">' +
      '<div class="pf-hdr-main">' +
        '<div class="pf-header-name">' + escHtml(name) + '</div>' +
        '<div class="pf-header-rank">' + rank + ' · LEVEL ' + cur.level + ' — ' + levelName.toUpperCase() + '</div>' +
        '<div class="pf-header-mission">' + missionLine + '</div>' +
      '</div>' +
      '<div class="pf-hdr-avatar">' +
        '<div class="pf-avatar-frame">' + (selectedAv ? '<span style="font-size:28px;line-height:1">' + selectedAv.icon + '</span>' : '<div class="prof-av-silhouette" style="width:26px;height:38px"></div>') + '</div>' +
        '<div class="pf-avatar-btns">' +
          '<button class="pf-avatar-btn" onclick="showAvatarPicker()">' + (selectedAv ? 'CHANGE' : 'SELECT') + '</button>' +
          '<button class="pf-avatar-btn pf-logout-btn" onclick="signOut()" title="Sign out">EXIT</button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    // XP bar
    '<div class="pf-xp-strip">' +
      '<div class="pf-xp-row">' +
        '<span class="pf-xp-num">' + state.xp + ' XP</span>' +
        (next ? '<span class="pf-xp-next">' + (next.xp - state.xp) + ' to ' + (LEVEL_NAMES[next.level] || 'Level ' + next.level).toUpperCase() + '</span>' : '<span class="pf-xp-next">MAX CLEARANCE</span>') +
      '</div>' +
      '<div class="pf-xp-bar"><div class="pf-xp-fill" style="width:' + levelPct + '%"></div></div>' +
    '</div>' +

    // Stats — streak / sections / focus
    '<div class="pf-stats-strip">' +
      '<div class="pf-stat-cell"><div class="pf-stat-n">' + (state.streak || 0) + '</div><div class="pf-stat-k">DAY STREAK</div></div>' +
      '<div class="pf-stat-div"></div>' +
      '<div class="pf-stat-cell"><div class="pf-stat-n">' + doneSecs + '</div><div class="pf-stat-k">SECTIONS</div></div>' +
      '<div class="pf-stat-div"></div>' +
      '<div class="pf-stat-cell"><div class="pf-stat-n">' + timeDisplay + '</div><div class="pf-stat-k">FOCUS</div></div>' +
    '</div>' +

    // Last 7 days streak calendar
    (function() {
      var days = ['M','T','W','T','F','S','S'];
      var now = new Date();
      var dots = '';
      for (var d = 6; d >= 0; d--) {
        var dt = new Date(now); dt.setDate(now.getDate() - d);
        var key = 'daily_sections_' + dt.toDateString();
        var done = parseInt(localStorage.getItem(key) || '0') > 0;
        var isToday = d === 0;
        var dow = (dt.getDay() + 6) % 7;
        dots += '<div class="sc-day' + (done ? ' sc-day-on' : '') + (isToday ? ' sc-day-today' : '') + '">' +
          '<div class="sc-dot"></div>' +
          '<div class="sc-lbl">' + days[dow] + '</div>' +
        '</div>';
      }
      return '<div class="pf-section pf-streak-cal">' +
        '<div class="pf-section-hdr">// LAST 7 DAYS</div>' +
        '<div class="sc-week">' + dots + '</div>' +
      '</div>';
    })() +

    // Sage field notes
    '<div class="pf-sage-card">' +
      '<div class="pf-sage-hdr"><span class="pf-sage-owl-wrap">' + sageOwlSVG(20, 22) + '</span><span class="pf-sage-label">// FIELD NOTES</span></div>' +
      '<div class="pf-sage-text">' + sageNote + '</div>' +
    '</div>' +

    // Operative colour
    '<div class="pf-section">' +
      '<div class="pf-section-hdr">// OPERATIVE COLOUR</div>' +
      themesHtml +
    '</div>' +

    // Display settings
    '<div class="pf-section">' +
      '<div class="pf-section-hdr">// DISPLAY</div>' +

      '<div class="pf-display-row">' +
        '<span class="pf-display-label">Code Background</span>' +
        '<span class="pf-display-val" id="canvas-opacity-val">' + (state.codeCanvasOpacity !== undefined ? state.codeCanvasOpacity : 100) + '%</span>' +
      '</div>' +
      '<input type="range" class="pf-opacity-slider" min="0" max="100" value="' + (state.codeCanvasOpacity !== undefined ? state.codeCanvasOpacity : 100) + '" oninput="setCodeCanvasOpacity(this.value)">' +
      '<div class="pf-display-hints"><span>Off</span><span>Full</span></div>' +

      '<div class="pf-display-row" style="margin-top:14px">' +
        '<span class="pf-display-label">Narrator Voice</span>' +
        '<div class="pf-toggle-group">' +
          '<button class="pf-toggle-btn' + ((!state.narratorGender || state.narratorGender === 'female') ? ' pf-toggle-active' : '') + '" onclick="setNarratorGender(\'female\')">♀ Female</button>' +
          '<button class="pf-toggle-btn' + (state.narratorGender === 'male' ? ' pf-toggle-active' : '') + '" onclick="setNarratorGender(\'male\')">♂ Male</button>' +
        '</div>' +
      '</div>' +

      '<div class="pf-display-row" style="margin-top:14px">' +
        '<span class="pf-display-label">Auto-scroll while reading</span>' +
        '<button class="pf-toggle-switch' + (state.autoScroll ? ' pf-toggle-on' : '') + '" onclick="setAutoScroll(' + (!state.autoScroll) + '); this.classList.toggle(\'pf-toggle-on\')">' +
          '<span class="pf-toggle-thumb"></span>' +
        '</button>' +
      '</div>' +
    '</div>' +

    // Clearance badges
    '<div class="pf-section">' +
      '<div class="pf-section-hdr pf-section-hdr-row">// CLEARANCE BADGES <span class="pf-badge-count">' + (state.earnedBadges || []).length + ' / ' + BADGES.length + '</span></div>' +
      badgesHtml +
    '</div>' +

    // Export
    '<div class="pf-section">' +
      '<button class="pf-export-btn" onclick="generateProgressCard()">&#8681; Download Progress Card</button>' +
      '<button class="pf-export-btn" onclick="exportNotes()">&#128203; Export Notes</button>' +
    '</div>' +

    '</div>';
}

// ============================================================
// NOTES EXPORT
// ============================================================
function exportNotes() {
  var name = (typeof state !== 'undefined' && state.playerName) ||
             localStorage.getItem('codebook_player_name') || 'Learner';
  var date = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  var lines = [
    '# The Code Book — My Notes',
    'Exported by: ' + name,
    'Date: ' + date,
    '',
  ];

  var hasAny = false;

  if (typeof FLOORS !== 'undefined') {
    FLOORS.forEach(function(f, fi) {
      var floorNotes = [];
      f.sections.forEach(function(s, si) {
        var note = localStorage.getItem('note_' + s.id);
        if (note && note.trim()) {
          floorNotes.push({ title: s.title, note: note.trim() });
          hasAny = true;
        }
      });
      if (floorNotes.length > 0) {
        lines.push('## Floor ' + (fi + 1) + ': ' + f.title);
        lines.push('');
        floorNotes.forEach(function(n) {
          lines.push('### ' + n.title);
          lines.push('');
          lines.push(n.note);
          lines.push('');
        });
      }
    });
  }

  if (!hasAny) {
    sageMessage('No notes to export yet — write some notes in the Notes tab of any section.', 'info');
    return;
  }

  var md = lines.join('\n');
  var blob = new Blob([md], { type: 'text/markdown; charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'codebook-notes-' + new Date().toISOString().slice(0, 10) + '.md';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); a.remove(); }, 1000);
}

function renderPremiumPanel() {
  var panel = document.getElementById('panel-premium');
  if (!panel) return;

  var alreadyNotified = !!localStorage.getItem('codebook_premium_notify');

  var features = [
    {
      id: 'floors', name: 'All 7 Floors Unlocked',
      desc: 'Every floor available from day one — no waiting, no gates.',
      fullDesc: 'Free users access Floors 1 and 2. Premium unlocks all seven immediately so you move at your own pace without hitting walls. No floor is hidden from you on day one.',
      problem: 'Solves: hitting a paywall mid-momentum.'
    },
    {
      id: 'mentorship', name: 'Mentorship Sessions',
      desc: 'Live 1-on-1 calls with an experienced developer, booked on your schedule.',
      fullDesc: 'Book a 45-minute video call with a working developer whenever you need a second opinion. Bring a project, a problem, or just questions — we\'ll talk through it. Included every month.',
      problem: 'Solves: learning alone with no one to ask.'
    },
    {
      id: 'reviews', name: 'Code Reviews',
      desc: 'Submit any project and get written, line-by-line feedback within 48 hours.',
      fullDesc: 'Submit any project you\'ve built and receive written feedback within 48 hours. Comments are specific and actionable — not generic. Real code, real notes, real improvement.',
      problem: 'Solves: never knowing if your code is actually good.'
    },
    {
      id: 'certificate', name: 'Completion Certificate',
      desc: 'A verifiable certificate issued when you finish all seven floors.',
      fullDesc: 'Finishing all seven floors earns you a certificate with a unique verification link. Share it on your CV or LinkedIn. Employers can confirm it is genuine with one click.',
      problem: 'Solves: having no credential to show for your effort.'
    },
    {
      id: 'community', name: 'Private Community',
      desc: 'Access to a members-only space for questions, accountability, and feedback.',
      fullDesc: 'A members-only space where premium learners share progress, ask questions, and give each other feedback. No noise — just people doing the same work as you.',
      problem: 'Solves: learning in isolation with no peers to compare notes with.'
    },
    {
      id: 'career', name: 'Career Coaching',
      desc: 'CV review, portfolio feedback, and mock interview prep included.',
      fullDesc: 'One session focused entirely on your job search: CV review, portfolio critique, and a mock technical interview. Practical, specific, and honest.',
      problem: 'Solves: not knowing if you\'re actually ready to apply.'
    },
    {
      id: 'support', name: 'Priority Support',
      desc: 'Any question answered by a human within 24 hours, guaranteed.',
      fullDesc: 'Post any question — about the curriculum, your code, or your career — and a human responds within 24 hours. Not a bot. Not a forum. A person.',
      problem: 'Solves: getting stuck with nowhere to turn.'
    },
    {
      id: 'resources', name: 'Resource Packs',
      desc: 'Cheat sheets, starter templates, and reference guides for every floor.',
      fullDesc: 'Floor-by-floor cheat sheets, reusable HTML/CSS/JS starter templates, and quick-reference cards for every major concept. Download them, keep them, use them forever.',
      problem: 'Solves: rebuilding from scratch every time you start something new.'
    },
    {
      id: 'paths', name: 'Adaptive Paths',
      desc: 'Personalized learning paths that adjust based on performance.',
      fullDesc: 'Dynamically adjusts what you learn next based on your strengths, weaknesses, and completed tools. Keeps you in an optimal challenge zone and removes wasted time.',
      problem: 'Solves: following a fixed path that doesn\'t match where you actually are.'
    },
    {
      id: 'deepwork', name: 'Deep Work Mode',
      desc: 'Distraction-free learning sessions with focus tracking.',
      fullDesc: 'Locks the interface into a clean, minimal mode, tracks uninterrupted focus time, and rewards longer deep work sessions with bonus XP.',
      problem: 'Solves: short, scattered sessions that never build momentum.'
    },
    {
      id: 'projects', name: 'Project Builder',
      desc: 'Guided real-world projects to apply your skills.',
      fullDesc: 'Step-by-step project workflows that turn your knowledge into portfolio-ready work. Includes milestones, checkpoints, and completion validation.',
      problem: 'Solves: knowing the theory but not knowing how to build something real.'
    },
    {
      id: 'benchmarking', name: 'Skill Benchmarking',
      desc: 'Compare your progress against real-world standards.',
      fullDesc: 'Shows how your current skill level compares to industry expectations. Highlights gaps and suggests what to improve next.',
      problem: 'Solves: not knowing if you\'re actually job-ready.'
    },
    {
      id: 'ai', name: 'AI Code Review',
      desc: 'Instant feedback on your code and projects.',
      fullDesc: 'Analyzes your work and gives actionable feedback on structure, readability, and best practices — like having a senior developer review your code.',
      problem: 'Solves: submitting work with no idea if it\'s any good.'
    },
    {
      id: 'momentum', name: 'Momentum Boost',
      desc: 'Temporary XP boosts for consistent progress.',
      fullDesc: 'Rewards streaks and consistent activity with short-term XP multipliers, encouraging daily engagement and habit building.',
      problem: 'Solves: losing motivation between sessions.'
    },
    {
      id: 'opportunities', name: 'Opportunity Board',
      desc: 'Unlock real opportunities as you progress.',
      fullDesc: 'Access curated internships, freelance gigs, and job leads once you reach certain milestones, turning learning into real-world outcomes.',
      problem: 'Solves: finishing the curriculum with no idea what to do next.'
    }
  ];

  var html = '<div class="panel-hero" style="text-align:center;padding:60px 32px 40px;">' +
    '<div style="font-size:48px;margin-bottom:20px;">♛</div>' +
    '<div class="panel-hero-label">PREMIUM</div>' +
    '<div class="panel-hero-title">Unlock The Full Book</div>' +
    '<div class="panel-hero-sub" style="max-width:480px;margin:0 auto 32px;">Everything in the free tier, plus the tools that turn learning into a career.</div>' +
    '<div style="display:flex;flex-direction:column;align-items:center;gap:14px;">' +
    '<button class="build-mark-done" disabled style="opacity:0.4;cursor:not-allowed;font-size:14px;padding:14px 32px;letter-spacing:1px;">Join Premium — Coming Soon</button>' +
    (alreadyNotified
      ? '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:var(--success,#48bb78);letter-spacing:1px;">✓ You\'re on the notify list</div>'
      : '<button onclick="showPremiumNotify()" style="background:none;border:none;color:var(--accent);font-family:\'IBM Plex Mono\',monospace;font-size:11px;letter-spacing:2px;cursor:pointer;text-decoration:underline;text-underline-offset:4px;">Notify me when it\'s ready</button>'
    ) +
    '</div>' +
    '</div>' +
    '<div class="premium-grid">';

  features.forEach(function(f) {
    html += '<div class="premium-feature-card" onclick="togglePremiumTooltip(this)">' +
      '<div class="premium-card-lock">♛</div>' +
      '<div class="premium-card-icon">' + premiumIconSVG(f.id, 52, 52) + '</div>' +
      '<div class="premium-card-name">' + f.name + '</div>' +
      '<div class="premium-card-desc">' + f.desc + '</div>' +
      '<div class="premium-card-tooltip">' +
      '<div class="premium-tooltip-full">' + f.fullDesc + '</div>' +
      '<div class="premium-tooltip-problem">' + f.problem + '</div>' +
      '<div class="premium-tooltip-badge">♛ Available with Premium</div>' +
      '</div>' +
      '</div>';
  });

  html += '</div>';

  panel.innerHTML = html;
}

function showPremiumNotify() {
  var overlay = document.getElementById('premium-notify-overlay');
  if (overlay) overlay.style.display = 'flex';
}

function hidePremiumNotify() {
  var overlay = document.getElementById('premium-notify-overlay');
  if (overlay) overlay.style.display = 'none';
}

function submitPremiumNotify() {
  var input = document.getElementById('premium-notify-email');
  var email = input ? input.value.trim() : '';
  if (!email || !email.includes('@')) {
    if (input) { input.style.borderColor = '#e53e3e'; input.focus(); }
    return;
  }
  localStorage.setItem('codebook_premium_notify', email);
  var form = document.getElementById('premium-notify-form');
  var confirm = document.getElementById('premium-notify-confirm');
  if (form) form.style.display = 'none';
  if (confirm) confirm.style.display = 'block';
  renderPremiumPanel();
}

function togglePremiumTooltip(card) {
  var isOpen = card.classList.contains('tooltip-open');
  document.querySelectorAll('.premium-feature-card.tooltip-open').forEach(function(c) {
    c.classList.remove('tooltip-open');
  });
  if (!isOpen) card.classList.add('tooltip-open');
}
// ============================================
// BADGE DEFINITIONS
// ============================================
var BADGES = [
  { id: 'first-steps',  emoji: '🌟', name: 'First Steps',  desc: 'Complete your first section',
    check: function() { return Object.keys(state.completed || {}).some(function(k){ return state.completed[k]; }); } },
  { id: 'quiz-taker',   emoji: '🧪', name: 'Quiz Taker',   desc: 'Answer your first quiz question',
    check: function() { return Object.keys(state.quizAnswered || {}).length > 0 || Object.keys(state.quizMultiState || {}).length > 0; } },
  { id: 'first-code',   emoji: '⌨️', name: 'First Code',   desc: 'Submit code in the editor',
    check: function() { return Object.keys(localStorage).some(function(k){ return k.indexOf('code_') === 0; }); } },
  { id: 'card-sharp',   emoji: '🃏', name: 'Card Sharp',   desc: 'Open the Revision Centre',
    check: function() { return !!(state.badgeFlags && state.badgeFlags.revVisited); } },
  { id: 'bookworm',     emoji: '📚', name: 'Bookworm',     desc: 'Complete 5 sections',
    check: function() { return Object.keys(state.completed || {}).filter(function(k){ return state.completed[k]; }).length >= 5; } },
  { id: 'consistent',   emoji: '🔥', name: 'Consistent',   desc: '3-day learning streak',
    check: function() { return (state.streak || 0) >= 3; } },
  { id: 'first-floor',  emoji: '🧱', name: 'First Floor',  desc: 'Complete Floor 1',
    check: function() { return isFloorComplete(0); } },
  { id: 'deep-learner', emoji: '💡', name: 'Deep Learner', desc: 'Complete 10 sections',
    check: function() { return Object.keys(state.completed || {}).filter(function(k){ return state.completed[k]; }).length >= 10; } },
  { id: 'on-fire',      emoji: '⚡', name: 'On Fire',      desc: '7-day streak',
    check: function() { return (state.streak || 0) >= 7; } },
  { id: 'builder',      emoji: '🏗️', name: 'Builder',      desc: 'Complete Floor 2',
    check: function() { return isFloorComplete(1); } },
  { id: 'unstoppable',  emoji: '🏆', name: 'Unstoppable',  desc: '30-day streak',
    check: function() { return (state.streak || 0) >= 30; } },
  { id: 'graduate',     emoji: '🎓', name: 'Graduate',     desc: 'Complete all floors',
    check: function() { return FLOORS.every(function(f, fi){ return isFloorComplete(fi); }); } }
];

// ============================================================
// NEWS PANEL — Hacker News "Incoming Transmissions"
// ============================================================
var _newsCache = null;
var _newsCacheTime = 0;
var _newsExpanded = null;

function renderNewsPanel() {
  var panel = document.getElementById('panel-news');
  if (!panel) return;
  panel.innerHTML =
    '<div class="news-root">' +
      '<div class="news-header">' +
        '<div class="news-header-blink"></div>' +
        '<div class="news-header-title">INCOMING TRANSMISSIONS</div>' +
        '<div class="news-header-sub">Live feed · Hacker News · Developer Intelligence</div>' +
      '</div>' +
      '<div class="news-feed" id="news-feed"><div class="news-loading"><span class="news-scan"></span>Scanning frequencies…</div></div>' +
    '</div>';
  _newsExpanded = null;
  var now = Date.now();
  if (_newsCache && now - _newsCacheTime < 5 * 60 * 1000) {
    _renderNewsItems(_newsCache);
    return;
  }
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(function(r) { return r.json(); })
    .then(function(ids) {
      var top = ids.slice(0, 15);
      return Promise.all(top.map(function(id) {
        return fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function(r) { return r.json(); });
      }));
    })
    .then(function(items) {
      _newsCache = items.filter(function(i) { return i && i.title; });
      _newsCacheTime = Date.now();
      _renderNewsItems(_newsCache);
    })
    .catch(function() {
      var feed = document.getElementById('news-feed');
      if (feed) feed.innerHTML = '<div class="news-error">⚠ Signal lost. Check your connection and try again.</div>';
    });
}

function _newsTimestamp(unix) {
  var diff = Math.floor((Date.now() / 1000) - unix);
  if (diff < 60)  return 'T-' + diff + 'S';
  if (diff < 3600) return 'T-' + Math.floor(diff / 60) + 'M';
  if (diff < 86400) return 'T-' + Math.floor(diff / 3600) + 'H';
  return 'T-' + Math.floor(diff / 86400) + 'D';
}

function _newsDomain(url) {
  if (!url) return 'news.ycombinator.com';
  try { return new URL(url).hostname.replace('www.', ''); } catch(_) { return ''; }
}

function _newsSignal(score) {
  if (score >= 300) return { bars: 5, cls: 'news-sig--5' };
  if (score >= 150) return { bars: 4, cls: 'news-sig--4' };
  if (score >= 75)  return { bars: 3, cls: 'news-sig--3' };
  if (score >= 25)  return { bars: 2, cls: 'news-sig--2' };
  return { bars: 1, cls: 'news-sig--1' };
}

function _renderNewsItems(items) {
  var feed = document.getElementById('news-feed');
  if (!feed) return;
  feed.innerHTML = items.map(function(item, i) {
    var sig = _newsSignal(item.score || 0);
    var bars = '';
    for (var b = 1; b <= 5; b++) bars += '<span class="ns-bar' + (b <= sig.bars ? ' ns-bar--on' : '') + '"></span>';
    return '<div class="news-card" id="news-card-' + i + '" onclick="toggleNewsCard(' + i + ')">' +
      '<div class="news-card-top">' +
        '<div class="news-sig ' + sig.cls + '">' + bars + '</div>' +
        '<div class="news-card-meta">' +
          '<div class="news-card-title">' + item.title + '</div>' +
          '<div class="news-card-sub">' +
            '<span class="news-domain">' + _newsDomain(item.url) + '</span>' +
            '<span class="news-score">SIG: ' + (item.score || 0) + '</span>' +
            '<span class="news-time">' + _newsTimestamp(item.time) + '</span>' +
            (item.descendants ? '<span class="news-comms">' + item.descendants + ' COMMS</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="news-card-chevron" id="news-chev-' + i + '">▼</div>' +
      '</div>' +
      '<div class="news-card-body" id="news-body-' + i + '">' +
        '<div class="news-card-desc">' + (item.text ? item.text.replace(/<[^>]+>/g, '').slice(0, 280) + '…' : 'No preview available. Read the full transmission below.') + '</div>' +
        '<div class="news-card-actions">' +
          (item.url ? '<a class="news-read-btn" href="' + item.url + '" target="_blank" rel="noopener">READ TRANSMISSION ↗</a>' : '') +
          '<a class="news-hn-btn" href="https://news.ycombinator.com/item?id=' + item.id + '" target="_blank" rel="noopener">HN DISCUSSION</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function toggleNewsCard(i) {
  var body  = document.getElementById('news-body-' + i);
  var chev  = document.getElementById('news-chev-' + i);
  var card  = document.getElementById('news-card-' + i);
  if (!body) return;
  var open = body.classList.contains('news-card-body--open');
  // Close previously expanded
  if (_newsExpanded !== null && _newsExpanded !== i) {
    var pb = document.getElementById('news-body-' + _newsExpanded);
    var pc = document.getElementById('news-chev-' + _newsExpanded);
    var pk = document.getElementById('news-card-' + _newsExpanded);
    if (pb) pb.classList.remove('news-card-body--open');
    if (pc) pc.classList.remove('news-card-chevron--open');
    if (pk) pk.classList.remove('news-card--open');
  }
  if (open) {
    body.classList.remove('news-card-body--open');
    chev.classList.remove('news-card-chevron--open');
    card.classList.remove('news-card--open');
    _newsExpanded = null;
  } else {
    body.classList.add('news-card-body--open');
    chev.classList.add('news-card-chevron--open');
    card.classList.add('news-card--open');
    _newsExpanded = i;
  }
}
