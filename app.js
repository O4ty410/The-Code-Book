var isLoggedIn = false;
var isGuest = !!localStorage.getItem('codebook_guest');
let currentFloor = 1;

var sageBubbleTimeout = null;



var sectionGateState = {};
var matchSelected = {};

/* ── Glossary of key terms shown as tooltips in section body ── */
var GLOSSARY = {
  'HTML':         'HyperText Markup Language — defines the structure and content of a webpage',
  'CSS':          'Cascading Style Sheets — controls how elements look: colours, fonts, spacing',
  'JavaScript':   'A programming language that makes webpages interactive and dynamic',
  'browser':      'Software that retrieves and displays webpages (Chrome, Firefox, Safari)',
  'server':       'A computer that stores files and sends them to browsers on request',
  'function':     'A reusable block of code that performs a specific task when called',
  'variable':     'A named container that stores a value you can use and change',
  'array':        'An ordered list of values stored in a single variable',
  'loop':         'Code that repeats a block of instructions multiple times',
  'API':          'Application Programming Interface — a way for programs to talk to each other',
  'DOM':          'Document Object Model — the browser\'s map of a webpage as editable objects',
  'element':      'A single piece of HTML, like a heading, paragraph, or button',
  'selector':     'A CSS pattern that targets which HTML elements to style',
  'responsive':   'A design that adapts its layout to different screen sizes automatically',
  'framework':    'A pre-built set of tools and conventions that speeds up development',
  'debugging':    'The process of finding and fixing errors in code',
  'syntax':       'The rules that define the correct structure of a programming language',
  'console':      'A developer tool for viewing errors and testing JavaScript output',
  'repository':   'A storage location for a project\'s code, usually hosted on GitHub',
  'boolean':      'A value that is either true or false — the simplest data type in code'
};

/* ── Icon headers per section topic keyword ── */
var SECTION_ICONS = {
  'internet':   { icon: '🌐', label: 'How the Web Works' },
  'html':       { icon: '📄', label: 'Structure & Content' },
  'css':        { icon: '🎨', label: 'Style & Design' },
  'javascript': { icon: '⚡', label: 'Behaviour & Logic' },
  'function':   { icon: '🔧', label: 'Functions' },
  'variable':   { icon: '📦', label: 'Variables & Data' },
  'loop':       { icon: '🔄', label: 'Loops' },
  'array':      { icon: '📋', label: 'Arrays' },
  'debug':      { icon: '🐛', label: 'Debugging' },
  'project':    { icon: '🏗️', label: 'Project' },
  'api':        { icon: '🔌', label: 'APIs' },
  'responsive': { icon: '📱', label: 'Responsive Design' },
  'git':        { icon: '📂', label: 'Version Control' },
  'deploy':     { icon: '🚀', label: 'Deployment' },
  'database':   { icon: '🗄️', label: 'Databases' },
  'react':      { icon: '⚛️', label: 'React' },
  'python':     { icon: '🐍', label: 'Python' },
  'model':      { icon: '🧠', label: 'Mental Models' },
  'condition':  { icon: '🔀', label: 'Conditions & Logic' },
  'event':      { icon: '🖱️', label: 'Events' },
  'class':      { icon: '🏷️', label: 'Classes & Selectors' },
  'layout':     { icon: '🔲', label: 'Layout' },
  'flexbox':    { icon: '🔲', label: 'Flexbox' },
  'grid':       { icon: '⊞',  label: 'CSS Grid' },
  'form':       { icon: '📝', label: 'Forms' },
  'object':     { icon: '🧩', label: 'Objects' }
};

/* ── Sage mid-section encouragement messages (rotate by section) ── */
var SAGE_MID_MSGS = [
  "You're halfway through. Let what you've read settle before you continue — don't rush this part.",
  "Pause here for a moment. If the first half felt clear, the rest will click faster.",
  "Good pace. The second half builds directly on what you've just read.",
  "Take a breath. Understanding this deeply now saves you hours of confusion later.",
  "You're doing well. The concepts ahead are clearer once the ones behind you have had time to sink in.",
  "Halfway there. If anything above felt hazy, it's worth a quick re-read before moving on."
];

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

function _streakVal() { var s = state.streak; return s && typeof s === 'object' ? +(s.count || 0) : +(s || 0); }

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
      state.reactions = s.reactions || {};
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
    badgeFlags: state.badgeFlags || {},
    reactions: state.reactions || {}
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
    stopLandingCanvas(); var _nl=document.getElementById('new-user-landing'); if(_nl)_nl.style.display='none';
    document.body.style.overflow = '';
    document.getElementById('app').style.display = 'block';
    applyTheme();
    launchApp();
    if (_streakExtended && state.streak >= 2) {
      setTimeout(function() { showStreakWelcome(_streakVal()); }, 1400);
    }
    updateChallengeDot();
  } else {
    // Guest or new user — always show onboarding or auth screen
    stopLandingCanvas(); var _nl=document.getElementById('new-user-landing'); if(_nl)_nl.style.display='none';
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
    var result = await window.sb.from('profiles').select('username,xp,streak,level').order('xp', { ascending: false }).limit(20);
    var rows = result.data;
    if (!rows || rows.length === 0) {
      list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">No entries yet. Be the first!</div>';
      return;
    }
    var medals = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
    list.innerHTML = rows.map(function (r, i) {
      var floorLabel = r.level ? 'Floor ' + r.level : '';
      return '<div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface);border:1px solid ' + (i === 0 ? '#c8a96e' : i === 1 ? '#aaaaaa' : i === 2 ? '#cd7f32' : 'var(--border)') + ';border-radius:10px;' + (i === 0 ? 'box-shadow:0 0 20px rgba(200,169,110,0.15);' : '') + '">' +
        '<div style="font-size:' + (i < 3 ? '24px' : '14px') + ';width:36px;text-align:center;font-family:\'IBM Plex Mono\',monospace;color:var(--text-muted);">' + (medals[i] || (i + 1)) + '</div>' +
        '<div style="flex:1;"><div style="font-family:\'Lato\',sans-serif;font-weight:700;color:var(--text);font-size:15px;">' + (r.username || 'Anonymous') + '</div>' +
        '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;color:var(--floor3);margin-top:4px;">\uD83D\uDD25 ' + (r.streak || 0) + ' day streak' + (floorLabel ? ' &nbsp;\u00B7&nbsp; ' + floorLabel : '') + '</div></div>' +
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
  document.getElementById('session-streak').textContent = '' + _streakVal() + '\uD83D\uDD25';
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
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';
  showGuestWelcome();
}

function returnToLoginFromGuest() {
  localStorage.removeItem('codebook_guest');
  localStorage.removeItem('codebook_guest_prompted');
  localStorage.removeItem('guest_launch_unlocked');
  localStorage.removeItem('guest_endofcontent_shown');
  isGuest = false;
  document.getElementById('app').style.display = 'none';
  var ag = document.querySelector('.app-grid'); if (ag) ag.style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  document.body.style.overflow = '';
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
  stopLandingCanvas(); var _nl=document.getElementById('new-user-landing'); if(_nl)_nl.style.display='none';
  document.body.style.overflow = '';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

async function saveToSupabase() {
  if (!window.sb || !window.currentUser) return;
  try {
    var uname = (window.currentUser.user_metadata && window.currentUser.user_metadata.username)
      || state.playerName
      || window.currentUser.email.split('@')[0];
    await window.sb.from('profiles').upsert({
      id: window.currentUser.id,
      username: uname,
      xp: state.xp,
      level: state.level,
      streak: (state.streak && typeof state.streak === 'object') ? (state.streak.count || 0) : (state.streak || 0),
      last_active: new Date().toISOString().split('T')[0]
    });
  } catch (e) {}
}

// Debounced version so rapid XP awards don't hammer the API
var _saveSupabaseTimer = null;
function saveToSupabaseDebounced() {
  clearTimeout(_saveSupabaseTimer);
  _saveSupabaseTimer = setTimeout(saveToSupabase, 3000);
}

async function loadUserFromSupabase(user) {
  if (!window.sb) return;
  try {
    var profileRes = await window.sb.from('profiles').select('*').eq('id', user.id).single();
    if (profileRes.data) {
      var p = profileRes.data;
      state.xp = p.xp || 0;
      state.level = p.level || 1;
      var dbStreak = p.streak || 0;
      state.streak = typeof dbStreak === 'number' ? dbStreak : 0;
      if (p.username) state.playerName = p.username;
    } else {
      // New user — create their profile row immediately
      await saveToSupabase();
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
  window.currentUser = null;
  isLoggedIn = false;
  window.isLoggedIn = false;
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
  if (_streakVal() >= 10) return 2;
  if (_streakVal() >= 6)  return 1.5;
  if (_streakVal() >= 3)  return 1.2;
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
  saveToSupabaseDebounced();
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
  if (streakEl) streakEl.textContent = _streakVal();
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
    if (isGuest) setTimeout(showGuestWelcomeModal, 700);
  }, 80);
}
// --- GUEST WELCOME MODAL ---
function showGuestWelcomeModal() {
  if (sessionStorage.getItem('guest_welcome_shown')) return;
  sessionStorage.setItem('guest_welcome_shown', '1');
  var el = document.createElement('div');
  el.id = 'guest-welcome-modal';
  el.className = 'gwm-overlay';
  el.innerHTML =
    '<div class="gwm-card">' +
      '<div class="gwm-icon">📖</div>' +
      '<h2 class="gwm-title">Welcome to The Code Book</h2>' +
      '<p class="gwm-sub">An interactive coding curriculum — seven floors, one goal.</p>' +
      '<div class="gwm-divider"></div>' +
      '<p class="gwm-access-label">As a guest you can explore:</p>' +
      '<ul class="gwm-list">' +
        '<li>Floor 1 lessons — free, no account needed</li>' +
        '<li>The Studio arcade &amp; all templates</li>' +
        '<li>Challenges and the leaderboard</li>' +
      '</ul>' +
      '<p class="gwm-note">Sign up free to save your progress and unlock all seven floors.</p>' +
      '<div class="gwm-actions">' +
        '<button class="gwm-btn-primary" onclick="closeGuestWelcomeModal()">Let\'s Go</button>' +
        '<button class="gwm-btn-signup" onclick="closeGuestWelcomeModal(true)">Create Free Account</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(el);
  setTimeout(function() { el.classList.add('gwm-visible'); }, 20);
}

function closeGuestWelcomeModal(goSignup) {
  var el = document.getElementById('guest-welcome-modal');
  if (!el) return;
  el.classList.remove('gwm-visible');
  setTimeout(function() { if (el.parentElement) el.remove(); }, 300);
  if (goSignup) {
    setTimeout(function() {
      switchTab('signup');
      document.getElementById('auth-screen').style.display = 'flex';
    }, 200);
  }
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
    var _obp = document.getElementById('ob-progress'); if (_obp) _obp.textContent = '02 / 04';
  }
}

function onboardingSelect(field, value) {
  onboardingData[field] = value;
  if (field === 'experience') {
    document.getElementById('onboarding-step-2').style.display = 'none';
    document.getElementById('onboarding-step-3').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Two more.';
    document.getElementById('onboarding-body').textContent = 'Quick ones, I promise.';
    var _obp2 = document.getElementById('ob-progress'); if (_obp2) _obp2.textContent = '03 / 04';
  } else if (field === 'time') {
    localStorage.setItem('codebook_time', value);
    document.getElementById('onboarding-step-3').style.display = 'none';
    document.getElementById('onboarding-step-4').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Last one.';
    document.getElementById('onboarding-body').textContent = 'Then we begin.';
    var _obp3 = document.getElementById('ob-progress'); if (_obp3) _obp3.textContent = '04 / 04';
  } else if (field === 'goal') {
    onboardingData.goal = value;
    localStorage.setItem('codebook_goal', value);

    document.getElementById('onboarding-step-4').style.display = 'none';
    document.getElementById('onboarding-step-5').style.display = 'block';
    var _obp4 = document.getElementById('ob-progress'); if (_obp4) _obp4.style.visibility = 'hidden';

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

    const timeMessages = {
      light:  '30 minutes a day compounds. You\'ll be further than you think in a month.',
      medium: 'An hour or two is plenty to build real momentum.',
      full:   'All in \u2014 let\'s not slow down.',
      unsure: 'No pressure on pace. Show up when you can.'
    };

    const m = messages[onboardingData.experience] || messages.never;
    const tMsg = timeMessages[onboardingData.time] || '';
    document.getElementById('onboarding-welcome').textContent = m.title;
    document.getElementById('onboarding-message').textContent = goalMessages[value] + ' ' + m.msg + (tMsg ? ' ' + tMsg : '');
  }
}

function finishOnboarding() {
  localStorage.setItem('codebook_onboarded', 'true');
  localStorage.setItem('codebook_player_name', onboardingData.name);
  state.playerName = onboardingData.name;
  document.getElementById('onboarding').style.display = 'none';
  var celeb = document.getElementById('char-celebration');
  if (celeb) celeb.style.display = 'none';
  if (localStorage.getItem('codebook_guest')) {
    startAsGuest();
    setTimeout(showAppTour, 800);
  } else {
    document.getElementById('auth-screen').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function showCharacterOnboardStep() {
  var s5 = document.getElementById('onboarding-step-5');
  var s6 = document.getElementById('onboarding-step-6');
  var prog = document.getElementById('ob-progress');
  if (s5) s5.style.display = 'none';
  if (prog) prog.style.display = 'none';
  if (s6) s6.style.display = 'block';
  var prev = document.getElementById('ob-char-preview');
  if (prev && typeof buildCharacterSVG === 'function') {
    prev.innerHTML = buildCharacterSVG(ccDefaultConfig(), 100, 100);
  }
}

function startCharacterFromOnboarding() {
  window._ccFromOnboarding = true;
  document.getElementById('onboarding').style.display = 'none';
  showCharacterCreator();
}

function celebEnter() {
  var el = document.getElementById('char-celebration');
  if (el) el.style.display = 'none';
  finishOnboarding();
}

function showCharacterCelebration(cfg) {
  var el = document.getElementById('char-celebration');
  if (!el) return;
  var charEl = document.getElementById('celeb-char');
  if (charEl && typeof buildCharacterSVG === 'function') {
    charEl.innerHTML = buildCharacterSVG(cfg, 220, 220);
  }
  var title = document.getElementById('celeb-title');
  if (title && onboardingData.name) {
    title.textContent = onboardingData.name.toUpperCase() + ', YOUR CHARACTER IS READY.';
  }
  el.style.display = 'flex';
  // Confetti burst
  var container = document.getElementById('celeb-confetti-container');
  if (container) {
    var cols = ['#c8a950','#00c8ff','#ff6b9d','#a855f7','#22c55e','#ffffff'];
    for (var i = 0; i < 70; i++) {
      (function(idx) {
        setTimeout(function() {
          var p = document.createElement('div');
          p.className = 'celeb-confetti-piece';
          var size = 6 + Math.random() * 8;
          p.style.cssText = [
            'left:' + (Math.random() * 100) + '%',
            'top:0',
            'width:' + size + 'px',
            'height:' + size + 'px',
            'background:' + cols[idx % cols.length],
            'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px'),
            'animation-duration:' + (2.5 + Math.random() * 2.5) + 's',
            'animation-delay:' + (Math.random() * 1.5) + 's'
          ].join(';');
          container.appendChild(p);
          setTimeout(function() { if (p.parentNode) p.parentNode.removeChild(p); }, 5500);
        }, idx * 35);
      })(i);
    }
    // Sparkles
    var sparks = [
      {top:'14%',left:'18%'},{top:'8%',left:'55%'},{top:'18%',right:'16%'},
      {top:'48%',left:'8%'},{top:'52%',right:'10%'},
      {top:'32%',left:'28%'},{top:'38%',right:'26%'}
    ];
    sparks.forEach(function(pos, idx) {
      var s = document.createElement('div');
      s.className = 'celeb-sparkle';
      var css = 'animation-duration:' + (1.1 + Math.random() * 0.9) + 's;animation-delay:' + (idx * 0.18) + 's;font-size:' + (14 + Math.random() * 10) + 'px;';
      if (pos.top)   css += 'top:'   + pos.top   + ';';
      if (pos.left)  css += 'left:'  + pos.left  + ';';
      if (pos.right) css += 'right:' + pos.right + ';';
      s.style.cssText = css;
      s.textContent = ['✦','✧','✨','★','⭐'][idx % 5];
      container.appendChild(s);
    });
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
          '<div class="fc-stat-val">' + _streakVal() + '\uD83D\uDD25</div>' +
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
          : '<button class="fc-btn-cert" onclick="issueAndShowCertificate(' + floorIndex + ')">&#8659; Download Certificate</button>'
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
    <div style="font-size:13px;color:var(--text-dim);margin-bottom:14px;">Complete one section today to keep your ${_streakVal()} day streak alive.</div>
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

function showGuestLockPopup(title, body) {
  var t = document.getElementById('guest-lock-title');
  var b = document.getElementById('guest-lock-body');
  if (t) t.textContent = title || 'Locked';
  if (b) b.textContent = body || 'Create a free account to unlock everything and save your progress.';
  document.getElementById('guest-lock-overlay').style.display = 'flex';
}

function hideGuestLockPopup() {
  document.getElementById('guest-lock-overlay').style.display = 'none';
}

function showGuestWelcome() {
  document.getElementById('guest-welcome-overlay').style.display = 'flex';
}

function hideGuestWelcome() {
  document.getElementById('guest-welcome-overlay').style.display = 'none';
  startAsGuest();
}

function showGuestFloor1Reward() {
  document.getElementById('guest-floor1-reward').style.display = 'flex';
}

function hideGuestFloor1Reward() {
  document.getElementById('guest-floor1-reward').style.display = 'none';
}

function showGuestEndOfContent() {
  document.getElementById('guest-endofcontent').style.display = 'flex';
}

function hideGuestEndOfContent() {
  document.getElementById('guest-endofcontent').style.display = 'none';
}

function launchSequenceFromGuest() {
  hideGuestFloor1Reward();
  localStorage.setItem('guest_launch_unlocked', 'true');
  switchTopNav('game', document.getElementById('tnav-game'));
  renderGamePanel();
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


function renderNav() {
  const nav = document.getElementById('floor-nav');
  if (!nav) return;
  nav.innerHTML = FLOORS.map(function(f, fi) {
    var isGuestLocked = isGuest && fi > 0;
    var isUnlocked = !isGuestLocked;
    var isActive = !isGuestLocked && fi === state.currentFloor - 1;
    var isComplete = isFloorComplete(fi);
    var sections = isActive ? f.sections.map(function(s, si) {
      var isDone = state.completed[s.id];
      var isActiveSec = si === state.currentSection;
      return '<span class="section-link ' + (isDone ? 'done' : '') + ' ' + (isActiveSec ? 'active' : '') + '" onclick="goToSection(' + fi + ',' + si + ')">' + s.title + '</span>';
    }).join('') : '';
    var clickHandler = isGuestLocked
      ? 'showGuestLockPopup(\'Floor Locked\',\'Floors 2\u20137 are for registered users. Create a free account to unlock everything and save your progress.\')'
      : 'goToFloor(' + fi + ')';
    return '<div class="floor-nav-item ' + (isUnlocked ? 'unlocked' : '') + ' ' + (isActive ? 'active' : '') + ' ' + (isComplete ? 'completed' : '') + ' ' + (isGuestLocked ? 'guest-locked' : '') + '" onclick="' + clickHandler + '">' +
      '<div class="floor-nav-header">' +
      '<div class="floor-num" style="color:' + f.color + '">' + (isGuestLocked ? '&#128274;' : isComplete ? '\u2713' : fi + 1) + '</div>' +
      '<div class="floor-nav-label">' + f.title + (isGuestLocked ? ' \u2014 Sign up to unlock' : '') + '</div>' +
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
  if (isGuest && fi > 0) {
    showGuestLockPopup('Floor Locked', 'Floors 2–7 are for registered users. Create a free account to unlock everything and save your progress.');
    return;
  }
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

/* ── Apply glossary tooltips to section body HTML ── */
function applyGlossaryTooltips(html) {
  var terms = Object.keys(GLOSSARY).sort(function(a, b) { return b.length - a.length; });
  var marked = {};
  return html.replace(/(<[^>]*>|[^<]+)/g, function(chunk) {
    if (chunk[0] === '<') return chunk;
    terms.forEach(function(term) {
      if (marked[term.toLowerCase()]) return;
      var def = GLOSSARY[term].replace(/'/g, '&#39;');
      var esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var rx = new RegExp('\\b(' + esc + ')\\b', 'i');
      if (rx.test(chunk)) {
        marked[term.toLowerCase()] = true;
        chunk = chunk.replace(rx, '<span class="glossary-term" data-def="' + def + '" onclick="_gtTap(this)">$1</span>');
      }
    });
    return chunk;
  });
}

/* ── Insert Sage mid-section comment for long sections ── */
function insertSageMidComment(html, section) {
  var wordCount = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  if (wordCount < 160) return html;
  var parts = html.split('<br><br>');
  if (parts.length < 4) return html;
  var mid = Math.floor(parts.length / 2);
  var idx = (parseInt((section.id || '0').replace('-','')) || 0) % SAGE_MID_MSGS.length;
  var msg = SAGE_MID_MSGS[idx];
  var sageHtml = '<div class="sage-mid-comment"><div class="owl-wrap"><div class="owl-avatar">' +
    sageOwlSVG(26, 28) + '</div><div class="owl-bubble"><div class="owl-name">SAGE</div>' +
    '<div class="hint-text">' + msg + '</div></div></div></div>';
  parts.splice(mid, 0, sageHtml);
  return parts.join('<br><br>');
}

/* ── Resolve icon for section based on title keywords ── */
function getSectionIcon(section) {
  var t = (section.title || '').toLowerCase();
  var keys = Object.keys(SECTION_ICONS);
  for (var i = 0; i < keys.length; i++) {
    if (t.indexOf(keys[i]) > -1) return SECTION_ICONS[keys[i]];
  }
  return null;
}

/* ── Tooltip tap toggle (mobile) ── */
if (!window._gtListenerAdded) {
  window._gtListenerAdded = true;
  document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('glossary-term')) {
      document.querySelectorAll('.glossary-term.tip-open').forEach(function(t) { t.classList.remove('tip-open'); });
    }
  });
}
function _gtTap(el) {
  var isOpen = el.classList.contains('tip-open');
  document.querySelectorAll('.glossary-term.tip-open').forEach(function(t) { t.classList.remove('tip-open'); });
  if (!isOpen) el.classList.add('tip-open');
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
    '<div class="section-content">' +
    '<div class="sec-xp-preview">⚡ Complete this section to earn <strong>+' + getSectionXP(fi) + ' XP</strong></div>';
  var _secIcon = getSectionIcon(section);
  if (_secIcon) {
    r += '<div class="sec-visual-header"><div class="sec-visual-icon">' + _secIcon.icon + '</div><div class="sec-visual-label">' + _secIcon.label + '</div></div>';
  }
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

  var _bodyHtml = applyGlossaryTooltips(insertSageMidComment(section.body.replace(/\n/g, '<br><br>'), section));
  r += '<div class="section-body">' + _bodyHtml + '</div>';

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
  var _sr = (state.reactions || {})[section.id] || '';
  var _rw = '<div class="sec-reaction">' +
    '<div class="sec-reaction-label">How did you find this section?</div>' +
    '<div class="sec-reaction-btns">' +
    '<button class="sec-reaction-btn' + (_sr === 'lost' ? ' sec-reaction-active' : '') + '" onclick="rateSectionReaction(\'' + section.id + '\',\'lost\',this)">\ud83d\ude15 Lost</button>' +
    '<button class="sec-reaction-btn' + (_sr === 'okay' ? ' sec-reaction-active' : '') + '" onclick="rateSectionReaction(\'' + section.id + '\',\'okay\',this)">\ud83d\ude10 Okay</button>' +
    '<button class="sec-reaction-btn' + (_sr === 'got-it' ? ' sec-reaction-active' : '') + '" onclick="rateSectionReaction(\'' + section.id + '\',\'got-it\',this)">\ud83d\ude0a Got it</button>' +
    '</div></div>';
  var g = '<div class="gate-box' + (isDone ? ' complete' : '') + '">' +
    '<div class="gate-label">' + (isDone ? '&#10003; SECTION COMPLETE' : 'TO COMPLETE THIS SECTION') + '</div>' +
    '<div class="gate-checks">' +
    '<div class="gate-check-row done" id="gate-read-' + section.id + '"><div class="gate-check-dot">&#10003;</div>Read the section</div>' +
    (showEditor ? '<div class="gate-check-row ' + (gate.code ? 'done' : '') + '" id="gate-code-' + section.id + '"><div class="gate-check-dot">' + (gate.code ? '&#10003;' : '') + '</div>Try the code editor</div>' : '') +
    (showQuiz ? '<div class="gate-check-row ' + (gate.quiz ? 'done' : '') + '" id="gate-quiz-' + section.id + '"><div class="gate-check-dot">' + (gate.quiz ? '&#10003;' : '') + '</div>' + (section.quiz ? 'Pass the knowledge check' : 'Complete the checklist') + '</div>' : '') +
    '</div>' + _rw + '</div>';

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
    if (typeof isMobile === 'function' && isMobile()) openEditorFullscreen(sectionId);
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
    '<div class="section-content">' +
    '<div class="sec-xp-preview">⚡ Complete this section to earn <strong>+120 XP</strong></div>';
  var _secIcon2 = getSectionIcon(section);
  if (_secIcon2) {
    r += '<div class="sec-visual-header"><div class="sec-visual-icon">' + _secIcon2.icon + '</div><div class="sec-visual-label">' + _secIcon2.label + '</div></div>';
  }
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
  var _bodyHtml = applyGlossaryTooltips(insertSageMidComment(section.body.replace(/\n/g, '<br><br>'), section));
  r += '<div class="section-body">' + _bodyHtml + '</div>';
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
  var _sr2 = (state.reactions || {})[section.id] || '';
  var _rw2 = '<div class="sec-reaction">' +
    '<div class="sec-reaction-label">How did you find this section?</div>' +
    '<div class="sec-reaction-btns">' +
    '<button class="sec-reaction-btn' + (_sr2 === 'lost' ? ' sec-reaction-active' : '') + '" onclick="rateSectionReaction(\'' + section.id + '\',\'lost\',this)">😕 Lost</button>' +
    '<button class="sec-reaction-btn' + (_sr2 === 'okay' ? ' sec-reaction-active' : '') + '" onclick="rateSectionReaction(\'' + section.id + '\',\'okay\',this)">😐 Okay</button>' +
    '<button class="sec-reaction-btn' + (_sr2 === 'got-it' ? ' sec-reaction-active' : '') + '" onclick="rateSectionReaction(\'' + section.id + '\',\'got-it\',this)">😊 Got it</button>' +
    '</div></div>';
  var g = '<div class="gate-box' + (isDone ? ' complete' : '') + '">' +
    '<div class="gate-label">' + (isDone ? '&#10003; SECTION COMPLETE' : 'TO COMPLETE THIS SECTION') + '</div>' +
    '<div class="gate-checks">' +
    '<div class="gate-check-row done" id="gate-read-' + section.id + '"><div class="gate-check-dot">&#10003;</div>Read the section</div>' +
    (showEditor ? '<div class="gate-check-row ' + (gate.code ? 'done' : '') + '" id="gate-code-' + section.id + '"><div class="gate-check-dot">' + (gate.code ? '&#10003;' : '') + '</div>Try the code editor</div>' : '') +
    (showQuiz ? '<div class="gate-check-row ' + (gate.quiz ? 'done' : '') + '" id="gate-quiz-' + section.id + '"><div class="gate-check-dot">' + (gate.quiz ? '&#10003;' : '') + '</div>' + (section.quiz ? 'Pass the knowledge check' : 'Complete the checklist') + '</div>' : '') +
    '</div>' + _rw2 + '</div>';

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

function openEditorFullscreen(sectionId) {
  var panel = document.getElementById('spanel-code-' + sectionId);
  if (!panel) return;
  panel.classList.add('editor-mobile-fs');
  document.body.style.overflow = 'hidden';
  var btn = document.createElement('button');
  btn.id = 'editor-fs-back';
  btn.innerHTML = '&#8592; Back';
  btn.onclick = function() { closeEditorFullscreen(sectionId); };
  document.body.appendChild(btn);
}

function closeEditorFullscreen(sectionId) {
  var panel = document.getElementById('spanel-code-' + sectionId);
  if (panel) panel.classList.remove('editor-mobile-fs');
  var btn = document.getElementById('editor-fs-back');
  if (btn) btn.remove();
  document.body.style.overflow = '';
  var mc = document.getElementById('main-content');
  if (!mc) return;
  var readBtn = mc.querySelector('.section-tab-btn');
  if (readBtn) switchSectionTab('read', sectionId, readBtn);
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
  // Guest mode — block locked tabs
  var guestLockedTabs = { profile: 'Profile', revision: 'Revision', news: 'News Feed', tools: 'Tools', premium: 'Arcade' };
  if (isGuest && guestLockedTabs[tab]) {
    showGuestLockPopup(guestLockedTabs[tab] + ' Locked', guestLockedTabs[tab] + ' is only available to registered users. Create a free account to unlock everything and save your progress.');
    return;
  }
  // Game Hub locked for guests unless they unlocked Launch Sequence as a reward
  if (isGuest && tab === 'game' && !localStorage.getItem('guest_launch_unlocked')) {
    showGuestLockPopup('Game Hub Locked', 'Complete Floor 1 to unlock Launch Sequence as a guest reward, or create an account to access all games.');
    return;
  }

  // Update top bar tabs
  document.querySelectorAll('.top-nav-tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn && btn.classList && btn.classList.contains('top-nav-tab')) btn.classList.add('active');

  // Update mobile bottom bar
  document.querySelectorAll('.mob-nav-btn').forEach(function(b){ b.classList.remove('active'); });
  var mobMap = { learn: 'mob-learn', build: 'mob-build', challenge: 'mob-challenge', map: 'mob-map', tools: 'mob-tools', premium: 'mob-premium', profile: 'mob-profile', revision: 'mob-revision', news: 'mob-news', support: 'mob-support' };
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
    // Guest leaving the game after playing Launch Sequence — show end-of-content prompt
    if (isGuest && localStorage.getItem('guest_launch_unlocked') && !localStorage.getItem('guest_endofcontent_shown')) {
      localStorage.setItem('guest_endofcontent_shown', 'true');
      setTimeout(showGuestEndOfContent, 600);
    }
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
    stopHubBgCycle();
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
      if (tab === 'support') renderSupportPanel();
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
  if (st) st.textContent = '\uD83D\uDD25 ' + _streakVal();
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
  if (lsStreak) lsStreak.textContent = '\uD83D\uDD25 ' + _streakVal() + ' days';
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

function getFloorIcon(fi, sz, color) {
  sz = sz || 44;
  var c = color || 'var(--fc-color)';
  var fid = (color ? 'hfib' : 'hfi') + fi;
  var flt = color
    ? '<defs><filter id="' + fid + '" x="-60%" y="-60%" width="220%" height="220%" color-interpolation-filters="sRGB">' +
        '<feMorphology in="SourceGraphic" operator="dilate" radius="1.4" result="dilated"/>' +
        '<feFlood flood-color="white" flood-opacity="0.88" result="white"/>' +
        '<feComposite in="white" in2="dilated" operator="in" result="whiteEdge"/>' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="glow"/>' +
        '<feMerge><feMergeNode in="glow"/><feMergeNode in="whiteEdge"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter></defs>'
    : '<defs><filter id="' + fid + '" x="-60%" y="-60%" width="220%" height="220%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter></defs>';
  var open = '<svg viewBox="0 0 48 48" width="' + sz + '" height="' + sz + '" class="holo-icon" style="display:block;margin:0 auto;overflow:visible">' + flt + '<g filter="url(#' + fid + ')">';
  var close = '</g></svg>';
  var s  = ';fill:none;stroke:' + c;
  var sf = 'fill:' + c;
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


// ── Hub background icon cycle ──────────────────────────────────────────────
var _hubBgTimer = null;
var _hubBgFloor = 0;
var _hubBgGen = 0;
var HUB_BG_FC = [
  {h:'#ffc844',r:255,g:200,b:68},
  {h:'#00e5ff',r:0,  g:229,b:255},
  {h:'#ff44aa',r:255,g:68, b:170},
  {h:'#bb66ff',r:187,g:102,b:255},
  {h:'#00ffaa',r:0,  g:255,b:170},
  {h:'#ff8844',r:255,g:136,b:68},
  {h:'#ffe566',r:255,g:229,b:102}
];

function _applyHubBgFloor(fi) {
  var fc = HUB_BG_FC[fi];
  var el = document.getElementById('hub-bg-icon');
  var gl = document.getElementById('hub-bg-glow');
  if (el) {
    if (window.HubIcon3D) {
      HubIcon3D.show(el, fi);
    } else {
      el.innerHTML = getFloorIcon(fi, 480, fc.h);
      el.style.filter = 'drop-shadow(0 0 60px ' + fc.h + ') drop-shadow(0 0 20px ' + fc.h + ')';
    }
    el.style.opacity = '0';
  }
  if (gl) {
    gl.style.background = 'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(' + fc.r + ',' + fc.g + ',' + fc.b + ',0.55) 0%,rgba(' + fc.r + ',' + fc.g + ',' + fc.b + ',0.22) 38%,rgba(' + fc.r + ',' + fc.g + ',' + fc.b + ',0.07) 58%,transparent 72%)';
    gl.style.opacity = '0';
  }
}

function stopHubBgCycle() {
  _hubBgGen++;
  if (_hubBgTimer) { clearTimeout(_hubBgTimer); _hubBgTimer = null; }
  var el = document.getElementById('hub-bg-icon');
  var gl = document.getElementById('hub-bg-glow');
  if (el) el.style.opacity = '0';
  if (gl) gl.style.opacity = '0';
  if (window.HubIcon3D) { HubIcon3D.stop(); HubIcon3D.disposeCards(); }
}

function startHubBgCycle() {
  stopHubBgCycle();
  var gen = _hubBgGen;
  _hubBgFloor = 0;
  _applyHubBgFloor(_hubBgFloor);
  if (window.HubIcon3D) HubIcon3D.resume();
  requestAnimationFrame(function() {
    if (_hubBgGen !== gen) return;
    var el = document.getElementById('hub-bg-icon');
    var gl = document.getElementById('hub-bg-glow');
    if (el) el.style.opacity = '0.22';
    if (gl) gl.style.opacity = '0.55';
    function advance() {
      if (_hubBgGen !== gen) return;
      var el = document.getElementById('hub-bg-icon');
      var gl = document.getElementById('hub-bg-glow');
      if (!el) return;
      el.style.opacity = '0';
      if (gl) gl.style.opacity = '0';
      _hubBgTimer = setTimeout(function() {
        if (_hubBgGen !== gen) return;
        _hubBgFloor = (_hubBgFloor + 1) % 7;
        _applyHubBgFloor(_hubBgFloor);
        requestAnimationFrame(function() {
          if (_hubBgGen !== gen) return;
          var el2 = document.getElementById('hub-bg-icon');
          var gl2 = document.getElementById('hub-bg-glow');
          if (el2) el2.style.opacity = '0.22';
          if (gl2) gl2.style.opacity = '0.55';
          _hubBgTimer = setTimeout(advance, 7000);
        });
      }, 1500);
    }
    _hubBgTimer = setTimeout(advance, 7000);
  });
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
    var done           = isFloorComplete(fi);
    var guestLocked    = isGuest && fi > 0;
    var unlocked       = !guestLocked;
    var isActive       = unlocked && !done && fi === currentFloorIdx;

    var floorDone  = f.sections.filter(function(s) { return state.completed[s.id]; }).length;
    var floorTotal = f.sections.length;

    var statusClass, statusText;
    if (guestLocked) {
      statusClass = 'fc-status fc-status-locked';  statusText = '&#128274; Sign up to unlock';
    } else if (done) {
      statusClass = 'fc-status fc-status-done';   statusText = '&#10003; Complete';
    } else if (isActive) {
      statusClass = 'fc-status fc-status-active';  statusText = 'In Progress';
    } else {
      statusClass = 'fc-status fc-status-open';    statusText = 'Available';
    }

    var cardClasses = 'fc-card' +
      (guestLocked ? ' fc-card-locked' : '') +
      (isActive    ? ' fc-card-active' : '');
    var clickAttr = guestLocked
      ? ' onclick="showGuestLockPopup(\'Floor Locked\',\'Floors 2–7 are for registered users. Create a free account to unlock everything.\')"'
      : ' onclick="' + (fi === 0 ? 'showSageFloorIntro(0)' : 'goToFloor(' + fi + ')') + '"';
    var iconHtml   = window.HubIcon3D
      ? '<canvas class="fc-icon-canvas" data-floor="' + fi + '" width="52" height="52" style="display:block;"></canvas>'
      : getFloorIcon(fi);
    var infoBtn    = '<button class="fc-info-btn" onclick="event.stopPropagation();toggleFloorInfo(' + fi + ')">&#x2139;</button>';

    var cr = parseInt(color.slice(1,3),16), cg = parseInt(color.slice(3,5),16), cb = parseInt(color.slice(5,7),16);
    return '<div class="' + cardClasses + '" style="--fc-color:' + color + ';--fc-glow:' + glow + ';--fc-rgb:' + cr+','+cg+','+cb + ';min-width:118px;flex:1;max-width:160px;"' + clickAttr + '>' +
      '<div class="fc-accent"></div>' +
      infoBtn +
      '<div class="fc-floor-badge">FLOOR ' + (fi + 1) + '</div>' +
      '<div class="fc-book-rule"></div>' +
      '<div class="fc-title">' + f.title + '</div>' +
      '<div class="fc-sec-count">' + floorDone + '/' + floorTotal + ' sections</div>' +
      '<span class="' + statusClass + '">' + statusText + '</span>' +
    '</div>';
  }).join('');

  var overallBar = '<div class="ch-overall-bar-wrap">' +
    '<div class="ch-overall-bar"><div class="ch-overall-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="ch-overall-label">' + pct + '% complete</span>' +
    '</div>';

  var _coverTheme = getCoverTheme();
  var _OWL_FILTERS = {
    'obsidian-gold': 'hue-rotate(0deg)   saturate(0.9) brightness(1.20) drop-shadow(0 0 28px rgba(255,190,40,0.55)) drop-shadow(0 0 55px rgba(220,160,20,0.28))',
    'cosmic-blue':   'hue-rotate(165deg) saturate(1.3) brightness(1.10) drop-shadow(0 0 28px rgba(0,180,255,0.55)) drop-shadow(0 0 55px rgba(0,140,220,0.28))',
    'aurora-teal':   'hue-rotate(130deg) saturate(1.2) brightness(1.05) drop-shadow(0 0 28px rgba(0,220,160,0.55)) drop-shadow(0 0 55px rgba(0,180,130,0.28))',
    'royal-violet':  'hue-rotate(235deg) saturate(1.4) brightness(1.00) drop-shadow(0 0 28px rgba(160,80,255,0.55)) drop-shadow(0 0 55px rgba(130,50,220,0.28))',
    'ember-crimson': 'hue-rotate(315deg) saturate(1.5) brightness(1.00) drop-shadow(0 0 28px rgba(255,70,70,0.55))  drop-shadow(0 0 55px rgba(220,40,40,0.28))',
  };
  var _owlFilter = _OWL_FILTERS[_coverTheme] || _OWL_FILTERS['obsidian-gold'];

  var html = '<style id="hub-override">' +
    /* Dark scrim between background icon and content — keeps icon visible at edges, creates depth in centre */
    /* Kill the blue bottom-glow gradient on the body while on the learn tab */
    'body.learn-mode{background:#04060e!important;background-attachment:fixed!important;}' +
    '.fc-hub{text-align:center!important;position:relative!important;z-index:1!important;overflow:hidden!important;background:#04060e!important;}' +
    '.fc-hub::before{content:"";position:absolute;inset:-80px -60px -40px;background:radial-gradient(ellipse 100% 90% at 50% 38%,rgba(0,0,0,0.94) 0%,rgba(0,0,0,0.82) 28%,rgba(0,0,0,0.60) 50%,rgba(0,0,0,0.30) 72%,rgba(0,0,0,0.10) 88%,transparent 100%);pointer-events:none;z-index:-1;}' +
    /* Ensure all hub content sits above the owl image */
    '.fc-header,.fc-stats,.fc-row,.hub-tracks-section,.ch-overall-bar-wrap,.hub-notes-btn{position:relative!important;z-index:2!important;}' +
    /* Kill the cycling 3D background icon entirely */
    '#hub-bg-icon,#hub-bg-glow{display:none!important;}' +
    /* Header label — dark halo so it reads over any icon colour */
    '.fc-header-label{color:rgba(160,220,255,0.92)!important;letter-spacing:4px!important;text-shadow:0 0 6px rgba(0,0,0,1),0 0 14px rgba(0,0,0,0.96),0 0 22px rgba(100,180,255,0.50)!important;}' +
    /* Main title — deep diagonal extrusion, letter face clearly above the depth layers */
    '.fc-header-title{color:#f0f8ff!important;background:none!important;-webkit-text-fill-color:unset!important;-webkit-text-stroke:1.5px rgba(200,240,255,0.70)!important;animation:none!important;font-size:clamp(42px,7vw,78px)!important;font-weight:900!important;line-height:1.05!important;letter-spacing:-0.5px!important;text-shadow:0 0 2px rgba(255,255,255,0.4),0 0 4px rgba(0,0,0,1),0 0 10px rgba(0,0,0,1),1px 1px 0 rgba(22,65,148,1),2px 2px 0 rgba(18,54,130,1),3px 3px 0 rgba(14,44,114,1),4px 4px 0 rgba(11,35,98,1),5px 5px 0 rgba(8,27,84,1),6px 6px 0 rgba(6,20,70,1),7px 7px 0 rgba(4,14,56,1),8px 8px 0 rgba(3,10,44,1),9px 9px 2px rgba(0,0,0,0.92),11px 11px 8px rgba(0,0,0,0.88),16px 16px 24px rgba(0,0,0,0.94),0 0 55px rgba(90,200,255,0.90),0 0 100px rgba(90,200,255,0.55),0 0 160px rgba(90,200,255,0.25)!important;}' +
    /* Subtitle */
    '.fc-header-sub{color:rgba(215,235,255,0.90)!important;text-shadow:0 0 6px rgba(0,0,0,1),0 0 12px rgba(0,0,0,0.96),0 2px 8px rgba(0,0,0,0.92)!important;}' +
    /* Cards — 3D book: leather spine + dark cover + page stack */
    '.fc-card{min-width:108px!important;flex:1!important;max-width:152px!important;min-height:195px!important;' +
    'padding:10px 8px 11px 22px!important;' +
    'background:' +
      'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,transparent 42%),' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) 15px 0/13px 3px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) 15px 0/3px 13px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) calc(100% - 5px) 0/13px 3px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) calc(100% - 5px) 0/3px 13px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) 15px 100%/13px 3px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) 15px calc(100% - 13px)/3px 13px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) calc(100% - 5px) 100%/13px 3px no-repeat,' +
      'linear-gradient(var(--fc-color,#c8a96e),var(--fc-color,#c8a96e)) calc(100% - 5px) calc(100% - 13px)/3px 13px no-repeat,' +
      'linear-gradient(170deg,#111623 0%,#090d18 55%,#060910 100%)' +
    '!important;' +
    'border:2px solid rgba(var(--fc-rgb,200,169,110),0.5)!important;' +
    'border-radius:2px 5px 5px 2px!important;' +
    'transform:perspective(500px) rotateY(-5deg)!important;transform-origin:center center!important;' +
    'box-shadow:5px 8px 24px rgba(0,0,0,0.82),0 16px 42px rgba(0,0,0,0.72),0 0 22px var(--fc-glow,rgba(200,169,110,0.22)),0 0 48px var(--fc-glow,rgba(200,169,110,0.08))!important;' +
    'backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:transform 0.25s,box-shadow 0.25s!important;}' +
    /* Spine: dark leather with horizontal ridges */
    '.fc-card::before{content:""!important;position:absolute!important;left:0!important;top:0!important;bottom:0!important;width:15px!important;' +
    'background:repeating-linear-gradient(180deg,rgba(255,255,255,0.055) 0px,rgba(255,255,255,0.055) 1px,rgba(0,0,0,0.18) 1px,rgba(0,0,0,0.18) 8px),linear-gradient(180deg,#2e1e0c 0%,#1c1208 40%,#100c06 100%)!important;' +
    'border-radius:2px 0 0 2px!important;border-right:1px solid rgba(180,140,60,0.55)!important;pointer-events:none!important;z-index:1!important;}' +
    /* Page stack: cream strip on right edge */
    '.fc-card::after{content:""!important;position:absolute!important;right:0!important;top:3px!important;bottom:3px!important;width:5px!important;' +
    'background:repeating-linear-gradient(180deg,rgba(0,0,0,0.14) 0px,rgba(0,0,0,0.14) 1px,transparent 1px,transparent 3px),linear-gradient(90deg,#c4b688,#b0a270)!important;' +
    'border-radius:0 3px 3px 0!important;z-index:1!important;}' +
    '.fc-card:hover:not(.fc-card-locked){transform:perspective(500px) rotateY(-7deg) translateY(-6px) scale(1.03)!important;' +
    'box-shadow:7px 14px 32px rgba(0,0,0,0.88),0 0 28px var(--fc-glow,rgba(200,169,110,0.38)),0 0 60px var(--fc-glow,rgba(200,169,110,0.16))!important;}' +
    '.fc-card-locked{opacity:0.38!important;filter:saturate(0.25)!important;}' +
    '.fc-card-active{flex:1.35!important;min-width:135px!important;max-width:185px!important;min-height:212px!important;' +
    'transform:perspective(500px) rotateY(-7deg) translateY(-12px) scale(1.04)!important;z-index:3!important;' +
    'box-shadow:7px 18px 44px rgba(0,0,0,0.92),0 0 40px var(--fc-glow,rgba(200,169,110,0.55)),0 0 90px var(--fc-glow,rgba(200,169,110,0.25))!important;' +
    'border-color:rgba(var(--fc-rgb,200,169,110),0.75)!important;}' +
    '.fc-accent{background:var(--fc-color,#c8a96e)!important;height:2px!important;opacity:0.85!important;}' +
    '.fc-floor-badge{font-size:9px!important;letter-spacing:0.18em!important;color:var(--fc-color,#c8a96e)!important;opacity:1!important;text-transform:uppercase!important;margin-bottom:5px!important;font-weight:700!important;font-family:"Space Mono",monospace!important;text-shadow:0 0 10px var(--fc-glow,rgba(200,169,110,0.50))!important;}' +
    '.fc-book-rule{width:65%!important;height:1px!important;background:linear-gradient(90deg,transparent,var(--fc-color,#c8a96e),transparent)!important;margin:4px auto 9px!important;opacity:0.55!important;display:block!important;flex-shrink:0!important;}' +
    /* Card text */
    '.fc-title{font-size:11px!important;font-weight:700!important;width:100%!important;word-break:normal!important;overflow-wrap:normal!important;display:block!important;color:rgba(235,226,210,0.97)!important;text-shadow:0 1px 5px rgba(0,0,0,0.97)!important;line-height:1.4!important;margin-bottom:7px!important;}' +
    '.fc-sec-count{color:rgba(var(--fc-rgb,160,130,80),0.60)!important;text-shadow:none!important;font-size:9px!important;margin-bottom:10px!important;}' +
    '.fc-icon{display:none!important;height:0!important;margin:0!important;padding:0!important;}' +
    /* Stats panel — elevated 3D card with layered depth shadows and thick lift */
    '.fc-stats{width:100%!important;position:relative!important;overflow:hidden!important;display:flex!important;justify-content:center!important;text-align:center!important;background:rgba(6,12,32,0.92)!important;backdrop-filter:blur(28px)!important;-webkit-backdrop-filter:blur(28px)!important;border:1px solid rgba(140,210,255,0.28)!important;border-bottom:3px solid rgba(0,0,0,0.80)!important;border-radius:14px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,0.20),0 2px 0 rgba(0,0,0,0.82),0 4px 0 rgba(0,0,0,0.74),0 6px 0 rgba(0,0,0,0.64),0 8px 0 rgba(0,0,0,0.52),0 18px 28px rgba(0,0,0,0.97),0 36px 56px rgba(0,0,0,0.78),0 56px 90px rgba(0,0,0,0.44),0 0 0 1px rgba(140,210,255,0.14)!important;}' +
    '.fc-stats::before{content:""!important;position:absolute!important;top:0!important;left:0!important;right:0!important;height:1px!important;background:linear-gradient(90deg,transparent 5%,rgba(140,215,255,0.60) 30%,rgba(200,240,255,0.78) 50%,rgba(140,215,255,0.60) 70%,transparent 95%)!important;pointer-events:none!important;}' +
    '.fc-stat{flex:1!important;text-align:center!important;background:transparent!important;}' +
    '.fc-stat-val{font-size:26px!important;font-weight:800!important;color:#ffffff!important;text-shadow:0 0 18px rgba(100,200,255,0.55),0 2px 10px rgba(0,0,0,0.95)!important;}' +
    '.fc-stat-label{color:rgba(200,228,255,0.84)!important;font-size:9px!important;letter-spacing:0.14em!important;text-shadow:0 1px 6px rgba(0,0,0,0.94)!important;}' +
    '.ch-overall-bar-wrap{flex:1!important;}' +
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
    /* Bookshelf */
    '.fc-shelf{width:100%!important;height:30px!important;position:relative!important;z-index:5!important;' +
    'background:' +
      'repeating-linear-gradient(90deg,rgba(0,0,0,0.12) 0px,rgba(0,0,0,0.12) 1px,transparent 1px,transparent 28px),' +
      'linear-gradient(180deg,#5c3a1e 0%,#3d2410 35%,#271608 70%,#160c04 100%)!important;' +
    'box-shadow:0 8px 32px rgba(0,0,0,0.96),0 2px 0 rgba(0,0,0,0.6),inset 0 -1px 0 rgba(0,0,0,0.5)!important;}' +
    '.fc-shelf::before{content:""!important;position:absolute!important;top:0!important;left:0!important;right:0!important;height:3px!important;' +
    'background:linear-gradient(90deg,rgba(80,50,20,0.4) 0%,rgba(210,155,70,0.85) 15%,rgba(240,185,90,0.95) 50%,rgba(210,155,70,0.85) 85%,rgba(80,50,20,0.4) 100%)!important;}' +
    '.fc-shelf::after{content:""!important;position:absolute!important;bottom:-16px!important;left:0!important;right:0!important;height:16px!important;' +
    'background:linear-gradient(180deg,#1a0e05 0%,#0a0602 60%,transparent 100%)!important;' +
    'box-shadow:0 8px 24px rgba(0,0,0,0.95)!important;}' +
    /* Owl animations */
    '@keyframes owl-float{0%,100%{transform:translateX(-50%) translateY(0px);}50%{transform:translateX(-50%) translateY(-10px);}}' +
    '@keyframes owl-glow{0%,100%{opacity:0.55;filter:brightness(1);}50%{opacity:0.72;filter:brightness(1.22) saturate(1.15);}}' +
    '@keyframes owl-eye-pulse{0%,100%{opacity:0.55;transform:scale(0.85);}50%{opacity:1;transform:scale(1.25);}}' +
    /* Owl + book background image wrapper */
    '.fc-hub-owl-wrap{position:absolute!important;left:50%!important;top:-30px!important;width:clamp(900px,115%,1500px)!important;pointer-events:none!important;z-index:0!important;user-select:none!important;animation:owl-float 7s ease-in-out infinite!important;}' +
    '.fc-hub-owl{position:relative!important;width:100%!important;height:auto!important;display:block!important;clip-path:inset(0 7% 17% 0)!important;animation:owl-glow 4s ease-in-out infinite!important;}' +
    '.owl-eye-glow{position:absolute!important;border-radius:50%!important;background:radial-gradient(circle,rgba(80,220,255,0.95) 0%,rgba(0,180,255,0.5) 40%,transparent 70%)!important;animation:owl-eye-pulse 3s ease-in-out var(--d,0s) infinite!important;pointer-events:none!important;}' +
    '</style>' +
    '<div class="fc-hub">' +
    '<div class="fc-hub-owl-wrap">' +
      /* teal sparks */
      '<span class="owl-spark" style="top:14%;left:20%;--d:0.4s;--sz:4px;"></span>' +
      '<span class="owl-spark" style="top:22%;left:38%;--d:1.8s;--sz:3px;"></span>' +
      '<span class="owl-spark" style="top:18%;left:55%;--d:0.9s;--sz:5px;"></span>' +
      '<span class="owl-spark" style="top:30%;left:12%;--d:2.5s;--sz:3px;"></span>' +
      '<span class="owl-spark" style="top:38%;left:48%;--d:1.2s;--sz:4px;"></span>' +
      '<span class="owl-spark" style="top:25%;left:68%;--d:3.1s;--sz:3px;"></span>' +
      '<span class="owl-spark" style="top:42%;left:75%;--d:0.6s;--sz:5px;"></span>' +
      '<span class="owl-spark" style="top:52%;left:28%;--d:2.0s;--sz:3px;"></span>' +
      '<span class="owl-spark" style="top:55%;left:62%;--d:1.5s;--sz:4px;"></span>' +
      '<span class="owl-spark" style="top:60%;left:82%;--d:3.8s;--sz:3px;"></span>' +
      '<span class="owl-spark" style="top:10%;left:72%;--d:2.8s;--sz:4px;"></span>' +
      '<span class="owl-spark" style="top:35%;left:88%;--d:1.1s;--sz:3px;"></span>' +
      /* extra gold sparks near owl */
      '<span class="owl-spark" style="top:28%;left:78%;--d:0.7s;--sz:4px;--accent:#f5c842;--auth-box-glow:rgba(245,200,66,0.7);"></span>' +
      '<span class="owl-spark" style="top:45%;left:85%;--d:2.3s;--sz:3px;--accent:#f5c842;--auth-box-glow:rgba(245,200,66,0.7);"></span>' +
      '<span class="owl-spark" style="top:20%;left:62%;--d:1.4s;--sz:3px;--accent:#f5c842;--auth-box-glow:rgba(245,200,66,0.7);"></span>' +
      '<span class="owl-spark" style="top:32%;left:92%;--d:3.5s;--sz:5px;"></span>' +
      '<span class="owl-spark" style="top:16%;left:82%;--d:4.2s;--sz:3px;"></span>' +
      /* eye glows — approximate position of the owl eyes in the image */
      '<span class="owl-eye-glow" style="top:36%;left:66%;width:14px;height:14px;--d:0s;"></span>' +
      '<span class="owl-eye-glow" style="top:34%;left:72%;width:11px;height:11px;--d:1.5s;"></span>' +
      '<img class="fc-hub-owl" src="assets/sage-owl-book.png" alt="" aria-hidden="true" style="filter:' + _owlFilter + '">' +
    '</div>' +
    '<div class="fc-header">' +
      '<div class="fc-header-label">Your Learning Path</div>' +
      '<div class="fc-header-title">Seven Floors.<br>One Goal.</div>' +
      '<div class="fc-header-sub">Work through each floor in order. Each one builds directly on the last.</div>' +
      '<div class="hub-progress-row">' + overallBar + '<button class="hub-notes-btn" onclick="openNotesReview()">📝 Notes</button></div>' +
    '</div>' +
    '<div class="fc-stats" style="display:flex;width:100%;margin:0 auto 28px;padding:14px 0;">' +
      '<div class="fc-stat" style="flex:1;text-align:center;"><div class="fc-stat-val" style="font-size:20px;font-weight:600;color:rgba(200,228,255,0.65);text-shadow:0 2px 8px rgba(0,0,0,0.9);">' + floorsUnlocked + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.50);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Floors Unlocked</div></div>' +
      '<div class="fc-stat" style="flex:1.3;text-align:center;border-left:1px solid rgba(255,255,255,0.08);"><div class="fc-stat-val" style="font-size:32px;font-weight:800;color:#f5c842;text-shadow:0 0 20px rgba(245,200,66,0.5),0 2px 10px rgba(0,0,0,0.9);">' + (state.xp || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(245,200,66,0.75);text-transform:uppercase;letter-spacing:0.14em;margin-top:4px;font-weight:600;">XP Earned</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.08);"><div class="fc-stat-val" style="font-size:22px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.9);">' + _streakVal() + ' 🔥</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.65);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Day Streak</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.08);"><div class="fc-stat-val" style="font-size:20px;font-weight:600;color:rgba(200,228,255,0.65);text-shadow:0 2px 8px rgba(0,0,0,0.9);">' + floorsComplete + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,228,255,0.50);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Floors Complete</div></div>' +
    '</div>' +
    '<div class="fc-row" style="display:flex;gap:22px;overflow-x:auto;padding:24px 28px 6px;align-items:flex-end;">' + cardsHtml + '</div>' +
    '<div class="fc-shelf"></div>' +
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
          '<div class="hub-tracks-title">Specialisation Tracks</div>' +
          '<div class="hub-tracks-sub">' + (unlocked ? 'Choose your path and go deep.' : '🔒 Complete all 7 floors to unlock — React, Python and JavaScript await.') + '</div>' +
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
  stopHubBgCycle();
  if (window.HubIcon3D && mc) {
    var cvs = mc.querySelectorAll('.fc-icon-canvas');
    Array.prototype.forEach.call(cvs, function(cv) {
      var fi = parseInt(cv.getAttribute('data-floor'), 10);
      HubIcon3D.showInCard(cv, fi);
    });
  }
}
function rateSectionReaction(sectionId, rating, btn) {
  if (!state.reactions) state.reactions = {};
  state.reactions[sectionId] = rating;
  saveState();
  var btns = btn.closest('.sec-reaction-btns').querySelectorAll('.sec-reaction-btn');
  btns.forEach(function(b) { b.classList.remove('sec-reaction-active'); });
  btn.classList.add('sec-reaction-active');
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
        if (isGuest && fi === 0) {
          setTimeout(function() { showGuestFloor1Reward(); }, 900);
        } else {
          setTimeout(function() { showFloorCelebration(fi, _newBadges); }, 700);
        }
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
  stopHubBgCycle();
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
    // Force a full reload when a new SW takes control so stale CSS/HTML is never shown
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      window.location.reload();
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

// ── CHARACTER CREATOR V5 (Brawl Stars quality) ───────────────────────────────

var CC_SKINS = [
  {id:'sk1',name:'Porcelain',hex:'#FDEFD4',sh:'#C8A870'},
  {id:'sk2',name:'Peach',    hex:'#F5C98A',sh:'#B87830'},
  {id:'sk3',name:'Sand',     hex:'#E09A6A',sh:'#A05020'},
  {id:'sk4',name:'Honey',    hex:'#C07840',sh:'#804010'},
  {id:'sk5',name:'Walnut',   hex:'#8B5030',sh:'#4A1E08'},
  {id:'sk6',name:'Ebony',    hex:'#4A2810',sh:'#1E0800'},
];
var CC_EYE_COLORS = [
  {id:'ec0',hex:'#1a1a2e'},{id:'ec1',hex:'#3b82f6'},{id:'ec2',hex:'#16a34a'},
  {id:'ec3',hex:'#92400e'},{id:'ec4',hex:'#6b7280'},{id:'ec5',hex:'#7c3aed'},
  {id:'ec6',hex:'#0e7490'},{id:'ec7',hex:'#b45309'},
];
var CC_EXPRESSIONS = [
  {id:'neutral', name:'Neutral',  sub:'Calm'},
  {id:'happy',   name:'Happy',    sub:'Loving it'},
  {id:'focused', name:'Focused',  sub:'Deep work'},
  {id:'smug',    name:'Smug',     sub:'I told you so'},
  {id:'tired',   name:'Tired',    sub:'3am deploy'},
];
var CC_HAIR_STYLES = [
  {id:'short',  name:'Fade Cut',  sub:'Clean'},
  {id:'messy',  name:'Messy Top', sub:'Dev classic'},
  {id:'long',   name:'Wavy Long', sub:'Flowing'},
  {id:'afro',   name:'Afro',      sub:'Bold'},
  {id:'braids', name:'Braids',    sub:'Detailed'},
  {id:'bun',    name:'Top Bun',   sub:'Focus mode'},
  {id:'bald',   name:'Bald',      sub:'Optimised'},
  {id:'ponytail',  name:'Ponytail',   sub:'High & clean'},
  {id:'bob',       name:'Bob Cut',    sub:'Sharp & modern'},
  {id:'pigtails',  name:'Twin Tails', sub:'Both sides'},
  {id:'curly-long',name:'Curly Long', sub:'Big energy'},
];
var CC_HAIR_COLORS = [
  {id:'hc0',hex:'#111118'},{id:'hc1',hex:'#5c2e0e'},{id:'hc2',hex:'#c17428'},
  {id:'hc3',hex:'#d4a83c'},{id:'hc4',hex:'#9ca3af'},{id:'hc5',hex:'#e8e8e8'},
  {id:'hc6',hex:'#2563eb'},{id:'hc7',hex:'#9333ea'},{id:'hc8',hex:'#16a34a'},
];
var CC_TOPS = [
  {id:'hoodie-t',   name:'Terminal Hoodie', sub:'> run ./life'},
  {id:'hoodie-p',   name:'Plain Hoodie',    sub:'Low profile'},
  {id:'tshirt-hw',  name:'Hello World',     sub:'The classic'},
  {id:'tshirt-git', name:'git commit',      sub:'Ship it'},
  {id:'tshirt-bug', name:'99 Bugs',         sub:'One more...'},
  {id:'tshirt-404', name:'404: Sleep',      sub:'Not found'},
  {id:'tshirt-py',  name:'Python Tee',      sub:'import life'},
  {id:'astronaut',  name:'Space Suit',      sub:'Houston...'},
  {id:'flight',     name:'Flight Suit',     sub:'Mission ready'},
  {id:'jacket',     name:'Dev Jacket',      sub:'JS + TS patches'},
];
var CC_TOP_COLORS = [
  {id:'tc0',hex:'#1a1a2e'},{id:'tc1',hex:'#111111'},{id:'tc2',hex:'#1e3a5f'},
  {id:'tc3',hex:'#1a3a1a'},{id:'tc4',hex:'#3b0a0a'},{id:'tc5',hex:'#2a1a3a'},
  {id:'tc6',hex:'#1a2a3a'},{id:'tc7',hex:'#2d2d2d'},
];
var CC_HATS = [
  {id:'none',    name:'None',         sub:''},
  {id:'cap',     name:'</> Snapback', sub:'Syntax'},
  {id:'beanie-b',name:'{ } Beanie',   sub:'Curly'},
  {id:'nasa',    name:'NASA Cap',     sub:'Houston'},
  {id:'beanie-p',name:'Plain Beanie', sub:'Stealth'},
];
var CC_HAT_COLORS = [
  {id:'ht0',hex:'#1a1a2e'},{id:'ht1',hex:'#111111'},{id:'ht2',hex:'#1e3a5f'},
  {id:'ht3',hex:'#1a3a1a'},{id:'ht4',hex:'#5c1a1a'},{id:'ht5',hex:'#3a1a5c'},
  {id:'ht6',hex:'#c47a20'},{id:'ht7',hex:'#9ca3af'},
];
var CC_GLASSES = [
  {id:'none',   name:'None',          sub:''},
  {id:'round',  name:'Round Specs',   sub:'Dev classic'},
  {id:'square', name:'Square Frames', sub:'Sharp'},
  {id:'shades', name:'Shades',        sub:'Too cool'},
];
var CC_GLASSES_COLORS = [
  {id:'gc0',hex:'#1a1a2e'},{id:'gc1',hex:'#c47a20'},{id:'gc2',hex:'#1e3a5f'},
  {id:'gc3',hex:'#5c1a1a'},{id:'gc4',hex:'#9ca3af'},{id:'gc5',hex:'#16a34a'},
];
var CC_FACIAL_HAIR = [
  {id:'none',     name:'None',       sub:''},
  {id:'stubble',  name:'Stubble',    sub:'Busy coding'},
  {id:'mustache', name:'Mustache',   sub:'Classic'},
  {id:'beard',    name:'Full Beard', sub:'Senior dev'},
  {id:'goatee',   name:'Goatee',     sub:'Focused'},
];
var CC_FH_COLORS = [
  {id:'fh0',hex:'#111118'},{id:'fh1',hex:'#5c2e0e'},{id:'fh2',hex:'#c17428'},
  {id:'fh3',hex:'#9ca3af'},{id:'fh4',hex:'#e8e8e8'},
];
var CC_BG_COLORS = [
  {id:'bg0', hex:'#e8eaf0'},{id:'bg1', hex:'#d1d5db'},{id:'bg2', hex:'#111827'},
  {id:'bg3', hex:'#dbeafe'},{id:'bg4', hex:'#1e3a5f'},{id:'bg5', hex:'#d1fae5'},
  {id:'bg6', hex:'#1a3a1a'},{id:'bg7', hex:'#ede9fe'},{id:'bg8', hex:'#2d1a4a'},
  {id:'bg9', hex:'#fef3c7'},{id:'bg10',hex:'#78350f'},{id:'bg11',hex:'#fce7f3'},
  {id:'bg12',hex:'#7c1a3a'},{id:'bg13',hex:'#0c1a2e'},{id:'bg14',hex:'#1a2020'},{id:'bg15',hex:'#2a1a0a'},
];

function ccDefaultConfig() {
  return {
    bodyType:'m',
    skin:'sk2', eyeColor:'ec0', expression:'neutral',
    hairStyle:'short', hairColor:'hc0',
    top:'hoodie-t', topColor:'tc0',
    hat:'none', hatColor:'ht0',
    glasses:'none', glassesColor:'gc0',
    facialHair:'none', fhColor:'fh0',
    bgColor:'bg0',
  };
}
function getCharacterConfig() {
  var s=localStorage.getItem('codebook_character');
  if (s){try{return Object.assign(ccDefaultConfig(),JSON.parse(s));}catch(e){}}
  return ccDefaultConfig();
}
function saveCharacterConfig(cfg){localStorage.setItem('codebook_character',JSON.stringify(cfg));}

// ── SVG LAYERS — v5 Brawl Stars quality ──────────────────────────────────────

var _ccUid=0;

function _ccDarkenHex(hex,amt){
  var h=hex.replace('#','');
  var r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  r=Math.max(0,Math.round(r*(1-amt)));g=Math.max(0,Math.round(g*(1-amt)));b=Math.max(0,Math.round(b*(1-amt)));
  return '#'+[r,g,b].map(function(v){return('0'+v.toString(16)).slice(-2);}).join('');
}
function _ccLightenHex(hex,amt){
  var h=hex.replace('#','');
  var r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  r=Math.min(255,Math.round(r+(255-r)*amt));g=Math.min(255,Math.round(g+(255-g)*amt));b=Math.min(255,Math.round(b+(255-b)*amt));
  return '#'+[r,g,b].map(function(v){return('0'+v.toString(16)).slice(-2);}).join('');
}
function _ccHex(arr,id){var f=arr.find(function(x){return x.id===id;});return f?f.hex:(arr[0]||{hex:'#888'}).hex;}
function _ccShade(skinId){var s=CC_SKINS.find(function(x){return x.id===skinId;})||CC_SKINS[1];return{hex:s.hex,sh:s.sh};}

// ── BACKGROUND ────────────────────────────────────────────────────────────────
function ccLayerBg(bgc){
  var bgHi=_ccLightenHex(bgc,0.18), bgDk=_ccDarkenHex(bgc,0.22);
  return '<rect width="120" height="120" fill="'+bgc+'"/>'
    +'<ellipse cx="65" cy="48" rx="52" ry="44" fill="'+bgHi+'" opacity="0.28"/>'
    +'<ellipse cx="60" cy="110" rx="48" ry="16" fill="'+bgDk+'" opacity="0.45"/>';
}

// ── BODY / CLOTHING ───────────────────────────────────────────────────────────
function ccLayerBody(topId,tc,topGrad,topHi,topDk,bodyType){
  var fill=topGrad||tc;
  var ol=_ccDarkenHex(tc,0.55);
  var isF=bodyType==='f';

  if(topId==='hoodie-t'||topId==='hoodie-p'){
    var torso=isF
      ?'M0,120 L0,87 Q5,70 36,65 Q47,71 60,72 Q73,71 84,65 Q115,70 120,87 L120,120Z'
      :'M0,120 L0,87 Q5,70 32,65 Q45,71 60,72 Q75,71 88,65 Q115,70 120,87 L120,120Z';
    var lShoulder=isF?'M4,91 Q17,74 30,67':'M4,91 Q18,75 26,68';
    var rShoulder=isF?'M116,91 Q103,74 90,67':'M116,91 Q102,75 94,68';
    return (
      '<path d="M6,80 Q2,40 22,16 Q40,2 60,2 Q80,2 98,16 Q118,40 114,80 Q90,70 60,68 Q30,70 6,80Z" fill="'+fill+'" stroke="'+ol+'" stroke-width="2.2" stroke-linejoin="round"/>'
      +'<path d="M10,78 Q8,44 25,20 Q42,7 60,7 Q78,7 95,20 Q112,44 110,78 Q88,69 60,67 Q32,69 10,78Z" fill="'+topDk+'" opacity="0.25"/>'
      // Hood right shadow
      +'<path d="M60,2 Q80,2 98,16 Q118,40 114,80 Q90,70 60,68Z" fill="'+topDk+'" opacity="0.15"/>'
      +'<path d="M6,80 Q13,74 22,70" stroke="'+ol+'" stroke-width="1" fill="none" opacity="0.5"/>'
      +'<path d="M114,80 Q107,74 98,70" stroke="'+ol+'" stroke-width="1" fill="none" opacity="0.5"/>'
      +'<path d="'+torso+'" fill="'+fill+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Right shoulder shadow
      +(isF
        ?'<path d="M84,65 Q115,70 120,87 L120,120 L95,120 Q100,100 100,87 Q108,75 84,65Z" fill="'+topDk+'" opacity="0.18"/>'
        :'<path d="M88,65 Q115,70 120,87 L120,120 L95,120 Q100,100 100,87 Q108,73 88,65Z" fill="'+topDk+'" opacity="0.18"/>')
      // Kangaroo pocket
      +'<path d="M33,96 L33,116 Q60,121 87,116 L87,96 Q60,101 33,96Z" fill="'+topDk+'" opacity="0.42" stroke="'+ol+'" stroke-width="1.2"/>'
      +'<path d="M33,96 Q60,101 87,96" stroke="'+ol+'" stroke-width="1.5" fill="none" opacity="0.55"/>'
      // Drawstrings
      +'<line x1="55" y1="72" x2="48" y2="97" stroke="'+topHi+'" stroke-width="1.8" opacity="0.6" stroke-linecap="round"/>'
      +'<line x1="65" y1="72" x2="72" y2="97" stroke="'+topHi+'" stroke-width="1.8" opacity="0.6" stroke-linecap="round"/>'
      +'<ellipse cx="48" cy="99" rx="3" ry="4" fill="'+topDk+'" stroke="'+ol+'" stroke-width="0.8" opacity="0.75"/>'
      +'<ellipse cx="72" cy="99" rx="3" ry="4" fill="'+topDk+'" stroke="'+ol+'" stroke-width="0.8" opacity="0.75"/>'
      // Fold creases
      +'<path d="M22,86 Q26,96 22,108" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.38" stroke-linecap="round"/>'
      +'<path d="M98,86 Q94,96 98,108" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.38" stroke-linecap="round"/>'
      // Left shoulder edge highlight
      +'<path d="'+lShoulder+'" stroke="'+topHi+'" stroke-width="2.8" fill="none" opacity="0.38" stroke-linecap="round"/>'
      // Right shoulder edge (darker — shadow side)
      +'<path d="'+rShoulder+'" stroke="'+_ccDarkenHex(tc,0.15)+'" stroke-width="1.8" fill="none" opacity="0.28" stroke-linecap="round"/>'
      +(topId==='hoodie-t'?'<text x="60" y="90" text-anchor="middle" font-family="monospace" font-size="5" fill="rgba(180,220,255,0.65)">&gt; run ./life</text>':'')
    );
  }

  if(topId==='tshirt-hw'||topId==='tshirt-git'||topId==='tshirt-bug'||topId==='tshirt-404'||topId==='tshirt-py'){
    var txt='';
    if(topId==='tshirt-hw') txt='<text x="60" y="98" text-anchor="middle" font-family="monospace" font-size="5" fill="rgba(180,210,255,0.9)">Hello, World!</text>';
    else if(topId==='tshirt-git') txt='<text x="60" y="93" text-anchor="middle" font-family="monospace" font-size="4.2" fill="rgba(180,210,255,0.82)">git commit -m</text><text x="60" y="103" text-anchor="middle" font-family="monospace" font-size="5" fill="rgba(255,200,80,0.9)">"fix"</text>';
    else if(topId==='tshirt-bug') txt='<text x="60" y="90" text-anchor="middle" font-family="monospace" font-size="3.8" fill="rgba(180,210,255,0.82)">99 bugs in the code</text><text x="60" y="99" text-anchor="middle" font-family="monospace" font-size="3.8" fill="rgba(180,210,255,0.82)">you fix one...</text><text x="60" y="109" text-anchor="middle" font-family="monospace" font-size="4.5" fill="rgba(255,90,90,0.92)">127 bugs.</text>';
    else if(topId==='tshirt-404') txt='<text x="60" y="93" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(255,75,75,0.9)" font-weight="bold">404</text><text x="60" y="106" text-anchor="middle" font-family="monospace" font-size="3.8" fill="rgba(200,200,200,0.78)">Sleep Not Found</text>';
    else if(topId==='tshirt-py') txt='<text x="60" y="104" text-anchor="middle" font-size="14">&#x1F40D;</text>';
    var tTorso=isF
      ?'M0,120 L0,89 Q7,72 38,68 Q48,74 60,75 Q72,74 82,68 Q113,72 120,89 L120,120Z'
      :'M0,120 L0,89 Q7,72 36,68 Q47,74 60,75 Q73,74 84,68 Q113,72 120,89 L120,120Z';
    return '<path d="'+tTorso+'" fill="'+fill+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<path d="M43,75 Q51,82 60,82 Q69,82 77,75" stroke="'+ol+'" stroke-width="1.8" fill="none"/>'
      // Right shoulder shadow panel
      +(isF
        ?'<path d="M82,68 Q113,72 120,89 L120,120 L98,120 Q104,100 104,88 Q110,78 82,68Z" fill="'+topDk+'" opacity="0.18"/>'
        :'<path d="M84,68 Q113,72 120,89 L120,120 L98,120 Q104,100 104,88 Q110,78 84,68Z" fill="'+topDk+'" opacity="0.18"/>')
      // Fold lines
      +'<path d="M20,86 Q24,97 20,110" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<path d="M100,86 Q96,97 100,110" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.35" stroke-linecap="round"/>'
      // Left shoulder edge highlight
      +(isF
        ?'<path d="M5,91 Q16,77 38,70" stroke="'+topHi+'" stroke-width="2.5" fill="none" opacity="0.32" stroke-linecap="round"/>'
        :'<path d="M5,91 Q16,77 36,70" stroke="'+topHi+'" stroke-width="2.5" fill="none" opacity="0.32" stroke-linecap="round"/>')
      // Right shoulder darker edge
      +(isF
        ?'<path d="M115,91 Q104,77 82,70" stroke="'+_ccDarkenHex(tc,0.12)+'" stroke-width="1.8" fill="none" opacity="0.28" stroke-linecap="round"/>'
        :'<path d="M115,91 Q104,77 84,70" stroke="'+_ccDarkenHex(tc,0.12)+'" stroke-width="1.8" fill="none" opacity="0.28" stroke-linecap="round"/>')
      +txt;
  }

  if(topId==='astronaut'){
    var sb='#d8e4f0',shi='#f0f6ff',sdk='#7a9ab0',smid='#aac0d4';
    return '<path d="M0,120 L0,85 Q3,64 26,57 Q42,64 60,66 Q78,64 94,57 Q117,64 120,85 L120,120Z" fill="'+sb+'" stroke="'+sdk+'" stroke-width="2.2" stroke-linejoin="round"/>'
      +'<path d="M60,66 Q78,64 94,57 Q117,64 120,85 L120,120 L90,120 Q95,100 95,85 Q108,72 94,57Z" fill="'+sdk+'" opacity="0.14"/>'
      +'<path d="M0,120 L0,103 Q20,90 60,88 Q100,90 120,103 L120,120Z" fill="'+sdk+'" opacity="0.18"/>'
      +'<line x1="60" y1="66" x2="60" y2="120" stroke="'+sdk+'" stroke-width="1" opacity="0.35"/>'
      +'<path d="M12,86 Q60,83 108,86" stroke="'+sdk+'" stroke-width="0.8" fill="none" opacity="0.3"/>'
      +'<ellipse cx="26" cy="72" rx="22" ry="14" fill="'+smid+'" stroke="'+sdk+'" stroke-width="1.5"/>'
      +'<ellipse cx="24" cy="68" rx="16" ry="9" fill="'+shi+'" opacity="0.6"/>'
      +'<ellipse cx="94" cy="72" rx="22" ry="14" fill="'+smid+'" stroke="'+sdk+'" stroke-width="1.5"/>'
      +'<ellipse cx="96" cy="68" rx="16" ry="9" fill="'+shi+'" opacity="0.6"/>'
      +'<ellipse cx="60" cy="68" rx="30" ry="10" fill="'+sdk+'" stroke="'+_ccDarkenHex(sdk,0.3)+'" stroke-width="1.5"/>'
      +'<ellipse cx="60" cy="67" rx="27" ry="8" fill="'+smid+'"/>'
      +'<ellipse cx="60" cy="65" rx="24" ry="6" fill="'+shi+'" opacity="0.7"/>'
      +'<circle cx="38" cy="90" r="13" fill="'+tc+'" stroke="'+_ccDarkenHex(tc,0.4)+'" stroke-width="1.5" opacity="0.9"/>'
      +'<circle cx="38" cy="90" r="10" fill="rgba(0,0,30,0.45)"/>'
      +'<text x="38" y="94" text-anchor="middle" font-size="9">&#x1F680;</text>'
      +'<rect x="64" y="82" width="24" height="14" rx="2" fill="rgba(0,15,50,0.75)" stroke="'+sdk+'" stroke-width="0.8"/>'
      +'<text x="76" y="92" text-anchor="middle" font-family="sans-serif" font-size="5.5" fill="rgba(220,240,255,0.95)" font-weight="bold">NASA</text>'
      +'<path d="M4,87 Q18,73 28,67" stroke="'+shi+'" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>'
      +'<path d="M116,87 Q102,73 92,67" stroke="'+shi+'" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>';
  }

  if(topId==='flight'){
    return '<path d="M0,120 L0,87 Q7,70 33,65 Q46,71 60,72 Q74,71 87,65 Q113,70 120,87 L120,120Z" fill="'+fill+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<path d="M87,65 Q113,70 120,87 L120,120 L96,120 Q102,100 102,87 Q108,74 87,65Z" fill="'+topDk+'" opacity="0.18"/>'
      +'<line x1="60" y1="73" x2="60" y2="120" stroke="'+topDk+'" stroke-width="1.2" opacity="0.45"/>'
      +'<rect x="44" y="87" width="32" height="18" rx="2" fill="rgba(0,0,0,0.28)" stroke="rgba(180,200,255,0.28)" stroke-width="0.8"/>'
      +'<text x="60" y="99" text-anchor="middle" font-family="sans-serif" font-size="5.5" fill="rgba(200,220,255,0.9)" font-weight="bold">NASA</text>'
      +'<path d="M5,90 Q17,75 33,68" stroke="'+topHi+'" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<path d="M115,90 Q103,75 87,68" stroke="'+_ccDarkenHex(tc,0.12)+'" stroke-width="1.8" fill="none" opacity="0.28" stroke-linecap="round"/>'
      +'<path d="M22,88 Q26,100 22,112" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<path d="M98,88 Q94,100 98,112" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.35" stroke-linecap="round"/>';
  }

  if(topId==='jacket'){
    return '<path d="M0,120 L0,87 Q7,70 33,65 Q46,71 60,72 Q74,71 87,65 Q113,70 120,87 L120,120Z" fill="'+fill+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<path d="M87,65 Q113,70 120,87 L120,120 L96,120 Q102,100 102,87 Q108,74 87,65Z" fill="'+topDk+'" opacity="0.18"/>'
      +'<path d="M50,73 L43,94 L60,83 L77,94 L70,73" fill="'+topDk+'" opacity="0.32"/>'
      +'<path d="M5,90 Q17,75 33,68" stroke="'+topHi+'" stroke-width="2.5" fill="none" opacity="0.32" stroke-linecap="round"/>'
      +'<path d="M115,90 Q103,75 87,68" stroke="'+_ccDarkenHex(tc,0.12)+'" stroke-width="1.8" fill="none" opacity="0.28" stroke-linecap="round"/>'
      +'<path d="M22,88 Q26,100 22,112" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<path d="M98,88 Q94,100 98,112" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<circle cx="40" cy="95" r="7" fill="rgba(255,180,60,0.15)" stroke="rgba(255,180,60,0.55)" stroke-width="1"/>'
      +'<text x="40" y="97.5" text-anchor="middle" font-family="monospace" font-size="4" fill="rgba(255,200,80,0.95)">JS</text>'
      +'<circle cx="78" cy="95" r="7" fill="rgba(80,130,255,0.15)" stroke="rgba(80,130,255,0.55)" stroke-width="1"/>'
      +'<text x="78" y="97.5" text-anchor="middle" font-family="monospace" font-size="3.5" fill="rgba(140,170,255,0.95)">TS</text>';
  }

  var fallTorso=isF
    ?'M0,120 L0,87 Q7,70 38,66 Q48,72 60,73 Q72,72 82,66 Q113,70 120,87 L120,120Z'
    :'M0,120 L0,87 Q7,70 36,66 Q47,72 60,73 Q73,72 84,66 Q113,70 120,87 L120,120Z';
  return '<path d="'+fallTorso+'" fill="'+fill+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
    +(isF
      ?'<path d="M82,66 Q113,70 120,87 L120,120 L96,120 Q102,100 102,87 Q110,76 82,66Z" fill="'+topDk+'" opacity="0.16"/>'
      :'<path d="M84,66 Q113,70 120,87 L120,120 L96,120 Q102,100 102,87 Q110,76 84,66Z" fill="'+topDk+'" opacity="0.16"/>')
    +(isF
      ?'<path d="M5,90 Q16,76 38,68" stroke="'+topHi+'" stroke-width="2.5" fill="none" opacity="0.3" stroke-linecap="round"/>'
      :'<path d="M5,90 Q16,76 36,68" stroke="'+topHi+'" stroke-width="2.5" fill="none" opacity="0.3" stroke-linecap="round"/>')
    +'<path d="M22,88 Q26,100 22,112" stroke="'+topDk+'" stroke-width="1.2" fill="none" opacity="0.3" stroke-linecap="round"/>';
}

// ── HEAD ──────────────────────────────────────────────────────────────────────
function ccLayerHead(skHex,skSh,skHi,u,bodyType){
  var sg='url(#sg'+u+')', ol=_ccDarkenHex(skSh,0.44);
  var isF=bodyType==='f';
  var fp=isF
    ?'M27,38 Q25,15 60,13 Q95,15 93,38 Q97,56 91,68 Q80,84 60,87 Q40,84 29,68 Q23,56 27,38Z'
    :'M24,38 Q22,13 60,11 Q98,13 96,38 Q100,57 94,69 Q82,87 60,90 Q38,87 26,69 Q20,57 24,38Z';
  var sp=isF
    ?'M74,18 Q93,36 91,68 Q80,84 60,87 L60,13 Q76,13 74,18Z'
    :'M76,16 Q96,36 94,69 Q82,87 60,90 L60,11 Q78,11 76,16Z';
  var np=isF
    ?'M50,75 L50,92 Q60,96 70,92 L70,75 Q65,79 60,80 Q55,79 50,75Z'
    :'M47,77 L47,94 Q60,98 73,94 L73,77 Q67,81 60,82 Q53,81 47,77Z';
  return (
    '<path d="M27,44 Q18,41 17,51 Q17,62 27,61 L28,56 Q22,52 23,49Z" fill="'+sg+'" stroke="'+ol+'" stroke-width="1.4"/>'
    +'<path d="M22,47 Q19,52 21,57" stroke="'+skSh+'" stroke-width="1.2" fill="none" opacity="0.5" stroke-linecap="round"/>'
    +(isF
      ?'<path d="M93,44 Q102,41 103,51 Q103,62 93,61 L92,56 Q98,52 97,49Z" fill="'+sg+'" stroke="'+ol+'" stroke-width="1.4"/>'
      :'<path d="M93,44 Q103,41 104,51 Q104,62 93,61 L92,56 Q99,52 97,49Z" fill="'+sg+'" stroke="'+ol+'" stroke-width="1.4"/>')
    +'<ellipse cx="100" cy="53" rx="3" ry="4.5" fill="'+skHi+'" opacity="0.22"/>'
    +'<path d="'+fp+'" fill="'+sg+'" stroke="'+ol+'" stroke-width="1.8"/>'
    +'<path d="'+sp+'" fill="'+skSh+'" opacity="0.11"/>'
    +'<path d="'+np+'" fill="'+sg+'" stroke="'+ol+'" stroke-width="1.5"/>'
    +(isF
      ?'<path d="M65,75 L65,92 Q70,90 70,75Z" fill="'+skSh+'" opacity="0.18"/>'
       +'<path d="M55,75 L55,92 Q50,90 50,75Z" fill="'+skHi+'" opacity="0.20"/>'
      :'<path d="M67,77 L67,94 Q73,92 73,77Z" fill="'+skSh+'" opacity="0.18"/>'
       +'<path d="M53,77 L53,94 Q47,92 47,77Z" fill="'+skHi+'" opacity="0.20"/>')
    +'<path d="M'+(isF?36:34)+',72 Q60,'+(isF?88:90)+' '+(isF?84:86)+',72" stroke="'+skSh+'" stroke-width="1" fill="none" opacity="0.18" stroke-linecap="round"/>'
    +'<ellipse cx="34" cy="59" rx="13" ry="10" fill="url(#sss'+u+')" opacity="0.85"/>'
    +'<ellipse cx="86" cy="59" rx="13" ry="10" fill="url(#sss'+u+')" opacity="0.85"/>'
    +'<ellipse cx="'+(isF?27:25)+'" cy="50" rx="10" ry="24" fill="url(#rim'+u+')" opacity="0.9"/>'
    +'<ellipse cx="43" cy="24" rx="18" ry="10" fill="'+skHi+'" opacity="0.26"/>'
    +'<ellipse cx="'+(isF?42:40)+'" cy="54" rx="9" ry="7" fill="'+skHi+'" opacity="0.13"/>'
    +'<ellipse cx="62" cy="61" rx="4" ry="3" fill="'+skHi+'" opacity="0.20"/>'
    +'<ellipse cx="60" cy="'+(isF?85:87)+'" rx="'+(isF?18:20)+'" ry="4" fill="'+skSh+'" opacity="0.22"/>'
  );
}

// ── EXPRESSION / FACE DETAILS ─────────────────────────────────────────────────
function ccLayerExpression(expr,eyeColor,skHex,skSh,skHi,irisGrad,ecDk){
  var lx=42, rx=78, ey=46;
  var browColor=_ccDarkenHex(skSh,0.15);
  var ol=_ccDarkenHex(skSh,0.42);

  // Clean open eye — no eyelid overlays, no rectangles
  function eye(cx,cy,sx,sy){
    return (
      '<ellipse cx="'+cx+'" cy="'+cy+'" rx="13.5" ry="11.5" fill="white" stroke="'+ol+'" stroke-width="1.8"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="8.5" fill="'+irisGrad+'"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="8.5" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1.2"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="4.5" fill="#04040a"/>'
      +'<circle cx="'+sx+'" cy="'+sy+'" r="2.8" fill="white" opacity="0.97"/>'
      +'<circle cx="'+(cx+2.5)+'" cy="'+(cy+3.5)+'" r="1.2" fill="rgba(255,255,255,0.48)"/>'
      +'<path d="M '+(cx-13.5)+' '+cy+' Q '+cx+' '+(cy-15)+' '+(cx+13.5)+' '+cy+'" stroke="'+ol+'" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.58"/>'
    );
  }

  function brow(d){
    return '<path d="'+d+'" stroke="'+ol+'" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.15"/>'
          +'<path d="'+d+'" stroke="'+browColor+'" stroke-width="4.8" fill="none" stroke-linecap="round"/>';
  }

  var eyeBase=eye(lx,ey,39,43)+eye(rx,ey,75,43);
  var brows='',nose='',mouth='',extras='';

  if(expr==='happy'){
    // Raised high arched brows
    brows=brow('M28,24 Q'+lx+',16 56,22')+brow('M64,22 Q'+rx+',16 92,24');
    mouth='<path d="M36,63 Q60,86 84,63 Q60,80 36,63 Z" fill="'+skSh+'" stroke="'+ol+'" stroke-width="1.4"/>'
         +'<path d="M40,64 Q60,80 80,64 Q60,76 40,64 Z" fill="white" opacity="0.88"/>';
    extras='<ellipse cx="26" cy="57" rx="14" ry="10" fill="rgba(255,110,85,0.28)"/>'
          +'<ellipse cx="94" cy="57" rx="14" ry="10" fill="rgba(255,110,85,0.28)"/>';
  } else if(expr==='focused'){
    // Angled inward — outer high, inner low (furrowed V shape)
    brows=brow('M28,24 Q36,29 56,34')+brow('M64,34 Q84,29 92,24');
    mouth='<path d="M46,70 Q60,73 74,70" stroke="'+skSh+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
    extras='<path d="M55,26 Q60,23 65,26" stroke="'+ol+'" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.5"/>';
  } else if(expr==='smug'){
    // Left brow flat, right brow raised arch
    brows=brow('M30,31 Q'+lx+',28 56,31')+brow('M64,22 Q'+rx+',16 92,24');
    mouth='<path d="M45,70 Q56,75 72,66" stroke="'+skSh+'" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
  } else if(expr==='tired'){
    // Outer corners drooping down
    brows=brow('M28,28 Q40,33 56,38')+brow('M64,38 Q80,33 92,28');
    mouth='<path d="M46,73 Q60,69 74,73" stroke="'+skSh+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
    extras='<ellipse cx="42" cy="54" rx="11" ry="5" fill="rgba(140,130,170,0.2)"/>'
          +'<ellipse cx="78" cy="54" rx="11" ry="5" fill="rgba(140,130,170,0.2)"/>';
  } else {
    // Neutral — gentle symmetric arch
    brows=brow('M28,30 Q'+lx+',24 56,30')+brow('M64,30 Q'+rx+',24 92,30');
    mouth='<path d="M46,69 Q60,76 74,69" stroke="'+skSh+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
  }

  nose='<ellipse cx="54" cy="61" rx="4" ry="3" fill="'+skSh+'" opacity="0.3"/>'
      +'<ellipse cx="66" cy="61" rx="4" ry="3" fill="'+skSh+'" opacity="0.3"/>'
      +'<path d="M58,49 Q60,55 62,61" stroke="'+skHi+'" stroke-width="1.2" fill="none" opacity="0.3"/>'
      +'<ellipse cx="60" cy="60" rx="4" ry="2.8" fill="'+skHi+'" opacity="0.22"/>';

  return '<g>'+brows+eyeBase+nose+mouth+extras+'</g>';
}

// ── HAIR ──────────────────────────────────────────────────────────────────────
function ccLayerHair(styleId,hairColor,hairGrad,hcDk,hcHi){
  if(styleId==='bald') return '';
  var h=hairGrad||hairColor, ol=_ccDarkenHex(hairColor,0.58);
  var drk=_ccDarkenHex(hairColor,0.32);

  if(styleId==='short'){
    return (
      // Drop shadow
      '<path d="M18,34 Q18,4 60,4 Q102,4 102,34 Q94,9 60,8 Q26,9 18,34Z" fill="'+ol+'" opacity="0.28"/>'
      // Base
      +'<path d="M20,32 Q20,6 60,6 Q100,6 100,32 Q92,11 60,10 Q28,11 20,32Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Temple sideburns
      +'<path d="M20,32 L20,42 Q22,36 25,33Z" fill="'+hairColor+'" opacity="0.65" stroke="'+ol+'" stroke-width="1"/>'
      +'<path d="M100,32 L100,42 Q98,36 95,33Z" fill="'+hairColor+'" opacity="0.65" stroke="'+ol+'" stroke-width="1"/>'
      // Right-side shadow (upper-left light)
      +'<path d="M60,6 Q100,6 100,32 Q94,11 60,10Z" fill="'+drk+'" opacity="0.22"/>'
      // Main highlight stroke (upper-left)
      +'<path d="M26,18 Q50,8 76,14" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.50" stroke-linecap="round"/>'
      +'<path d="M30,13 Q52,7 68,11" stroke="'+hcHi+'" stroke-width="2" fill="none" opacity="0.30" stroke-linecap="round"/>'
      // Crown specular
      +'<ellipse cx="46" cy="11" rx="14" ry="6" fill="'+hcHi+'" opacity="0.42"/>'
    );
  }

  if(styleId==='messy'){
    return (
      '<path d="M18,36 Q16,3 60,3 Q104,3 102,36 Q94,8 60,7 Q26,8 18,36Z" fill="'+ol+'" opacity="0.28"/>'
      +'<path d="M20,34 Q18,5 60,5 Q102,5 100,34 Q92,10 60,9 Q28,10 20,34Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Messy spike strands
      +'<path d="M21,21 Q24,5 37,8" stroke="'+hairColor+'" stroke-width="8" fill="none" stroke-linecap="round"/>'
      +'<path d="M21,21 Q24,5 37,8" stroke="'+ol+'" stroke-width="9.5" fill="none" stroke-linecap="round" opacity="0.32"/>'
      +'<path d="M38,9 Q43,1 53,6" stroke="'+hairColor+'" stroke-width="6.5" fill="none" stroke-linecap="round"/>'
      +'<path d="M38,9 Q43,1 53,6" stroke="'+ol+'" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.32"/>'
      +'<path d="M67,6 Q74,0 80,5" stroke="'+hairColor+'" stroke-width="6.5" fill="none" stroke-linecap="round"/>'
      +'<path d="M67,6 Q74,0 80,5" stroke="'+ol+'" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.32"/>'
      +'<path d="M84,9 Q93,3 99,13" stroke="'+hairColor+'" stroke-width="7.5" fill="none" stroke-linecap="round"/>'
      +'<path d="M84,9 Q93,3 99,13" stroke="'+ol+'" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.32"/>'
      // Right side shadow
      +'<path d="M60,5 Q102,5 100,34 Q94,10 60,9Z" fill="'+drk+'" opacity="0.20"/>'
      // Highlight on left-facing spikes
      +'<path d="M26,16 Q28,8 35,10" stroke="'+hcHi+'" stroke-width="2.5" fill="none" opacity="0.48" stroke-linecap="round"/>'
      +'<path d="M70,7 Q75,2 78,6" stroke="'+hcHi+'" stroke-width="2" fill="none" opacity="0.42" stroke-linecap="round"/>'
      // Crown specular
      +'<ellipse cx="44" cy="10" rx="12" ry="5" fill="'+hcHi+'" opacity="0.38"/>'
    );
  }

  if(styleId==='long'){
    return (
      // Drop shadow behind
      '<path d="M18,36 Q16,3 60,3 Q104,3 102,36 Q94,8 60,7 Q26,8 18,36Z" fill="'+ol+'" opacity="0.25"/>'
      // Side panels shadow
      +'<path d="M18,36 Q8,66 10,104" stroke="'+ol+'" stroke-width="15" fill="none" stroke-linecap="round" opacity="0.25"/>'
      +'<path d="M102,36 Q112,66 110,104" stroke="'+ol+'" stroke-width="15" fill="none" stroke-linecap="round" opacity="0.25"/>'
      // Base crown
      +'<path d="M20,34 Q18,5 60,5 Q102,5 100,34 Q92,10 60,9 Q28,10 20,34Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Side panels base
      +'<path d="M20,34 Q10,64 12,102 Q16,92 20,84 L24,38Z" fill="'+h+'" stroke="'+ol+'" stroke-width="1.5" stroke-linejoin="round"/>'
      +'<path d="M100,34 Q110,64 108,102 Q104,92 100,84 L96,38Z" fill="'+h+'" stroke="'+ol+'" stroke-width="1.5" stroke-linejoin="round"/>'
      // Right-side shadow
      +'<path d="M60,5 Q102,5 100,34 L96,38 Q92,10 60,9Z" fill="'+drk+'" opacity="0.20"/>'
      +'<path d="M100,38 Q108,64 106,96 L108,102 Q104,92 100,84Z" fill="'+drk+'" opacity="0.22"/>'
      // Highlight strokes left panels
      +'<path d="M20,38 Q11,67 13,102" stroke="'+hcHi+'" stroke-width="2" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<path d="M22,38 Q15,70 17,102" stroke="'+hcHi+'" stroke-width="1.2" fill="none" opacity="0.22" stroke-linecap="round"/>'
      // Crown highlight
      +'<path d="M26,18 Q50,8 78,16" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.48" stroke-linecap="round"/>'
      +'<ellipse cx="44" cy="11" rx="14" ry="6" fill="'+hcHi+'" opacity="0.40"/>'
    );
  }

  if(styleId==='afro'){
    return (
      // Drop shadow
      '<ellipse cx="62" cy="15" rx="37" ry="32" fill="'+ol+'" opacity="0.28"/>'
      +'<ellipse cx="26" cy="30" rx="18" ry="22" fill="'+ol+'" opacity="0.22"/>'
      +'<ellipse cx="94" cy="30" rx="18" ry="22" fill="'+ol+'" opacity="0.22"/>'
      // Base puffs
      +'<ellipse cx="60" cy="13" rx="35" ry="30" fill="'+h+'" stroke="'+ol+'" stroke-width="2.2"/>'
      +'<ellipse cx="24" cy="28" rx="16" ry="20" fill="'+hairColor+'" stroke="'+ol+'" stroke-width="1.8"/>'
      +'<ellipse cx="96" cy="28" rx="16" ry="20" fill="'+hairColor+'" stroke="'+ol+'" stroke-width="1.8"/>'
      // Right-side shadow
      +'<ellipse cx="72" cy="18" rx="22" ry="18" fill="'+drk+'" opacity="0.20"/>'
      +'<ellipse cx="96" cy="30" rx="10" ry="14" fill="'+drk+'" opacity="0.18"/>'
      // Crown and side highlights
      +'<ellipse cx="44" cy="5" rx="14" ry="9" fill="'+hcHi+'" opacity="0.32"/>'
      +'<ellipse cx="26" cy="20" rx="7" ry="8" fill="'+hcHi+'" opacity="0.24"/>'
      // Surface texture dimples (small dark dots for the afro texture)
      +'<circle cx="38" cy="8" r="2" fill="'+drk+'" opacity="0.18"/>'
      +'<circle cx="52" cy="5" r="2" fill="'+drk+'" opacity="0.15"/>'
      +'<circle cx="28" cy="18" r="1.5" fill="'+drk+'" opacity="0.15"/>'
      +'<circle cx="70" cy="6" r="2" fill="'+drk+'" opacity="0.12"/>'
    );
  }

  if(styleId==='braids'){
    return (
      // Crown drop shadow
      '<path d="M18,36 Q16,3 60,3 Q104,3 102,36 Q94,8 60,7 Q26,8 18,36Z" fill="'+ol+'" opacity="0.25"/>'
      // Braid drop shadows
      +'<path d="M18,38 Q8,70 10,108" stroke="'+ol+'" stroke-width="14" fill="none" stroke-linecap="round" opacity="0.3"/>'
      +'<path d="M102,38 Q112,70 110,108" stroke="'+ol+'" stroke-width="14" fill="none" stroke-linecap="round" opacity="0.3"/>'
      // Crown base
      +'<path d="M20,34 Q18,5 60,5 Q102,5 100,34 Q92,10 60,9 Q28,10 20,34Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Braid base
      +'<path d="M20,36 Q10,68 12,106" stroke="'+hairColor+'" stroke-width="11" fill="none" stroke-linecap="round"/>'
      +'<path d="M20,36 Q10,68 12,106" stroke="'+ol+'" stroke-width="12.5" fill="none" stroke-linecap="round" opacity="0.28"/>'
      +'<path d="M100,36 Q110,68 108,106" stroke="'+hairColor+'" stroke-width="11" fill="none" stroke-linecap="round"/>'
      +'<path d="M100,36 Q110,68 108,106" stroke="'+ol+'" stroke-width="12.5" fill="none" stroke-linecap="round" opacity="0.28"/>'
      // Braid weave pattern
      +'<path d="M20,36 Q10,68 12,106" stroke="'+hcDk+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="5,5" opacity="0.52"/>'
      +'<path d="M100,36 Q110,68 108,106" stroke="'+hcDk+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="5,5" opacity="0.52"/>'
      // Left braid highlight
      +'<path d="M20,36 Q10,68 12,106" stroke="'+hcHi+'" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-dasharray="3,8" opacity="0.35"/>'
      // Crown right shadow
      +'<path d="M60,5 Q102,5 100,34 Q94,10 60,9Z" fill="'+drk+'" opacity="0.20"/>'
      // Crown highlight
      +'<path d="M26,18 Q50,8 78,16" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.45" stroke-linecap="round"/>'
      +'<ellipse cx="44" cy="11" rx="14" ry="6" fill="'+hcHi+'" opacity="0.40"/>'
    );
  }

  if(styleId==='bun'){
    return (
      // Crown drop shadow
      '<path d="M19,34 Q19,9 60,8 Q101,9 101,34 Q94,13 60,12 Q26,13 19,34Z" fill="'+ol+'" opacity="0.25"/>'
      // Bun drop shadow
      +'<circle cx="62" cy="7" r="14" fill="'+ol+'" opacity="0.28"/>'
      // Crown base
      +'<path d="M21,32 Q21,11 60,10 Q99,11 99,32 Q92,15 60,14 Q28,15 21,32Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Bun base
      +'<circle cx="60" cy="5" r="13" fill="'+hairColor+'" stroke="'+ol+'" stroke-width="2"/>'
      // Bun right shadow
      +'<path d="M60,5 Q72,-7 72,5 Q72,18 60,18Z" fill="'+drk+'" opacity="0.25"/>'
      // Bun highlight
      +'<ellipse cx="54" cy="0" rx="7" ry="5" fill="'+hcHi+'" opacity="0.40"/>'
      +'<circle cx="56" cy="2" r="4" fill="'+hcHi+'" opacity="0.28"/>'
      // Hair tie groove
      +'<ellipse cx="60" cy="14" rx="13" ry="3.5" fill="'+hcDk+'" stroke="'+ol+'" stroke-width="1" opacity="0.6"/>'
      // Crown highlight
      +'<path d="M26,18 Q50,10 78,16" stroke="'+hcHi+'" stroke-width="4" fill="none" opacity="0.44" stroke-linecap="round"/>'
    );
  }

  if(styleId==='ponytail'){
    return (
      // Crown drop shadow
      '<path d="M20,34 Q20,6 60,5 Q100,6 100,34 Q92,11 60,10 Q28,11 20,34Z" fill="'+ol+'" opacity="0.25"/>'
      // Ponytail drop shadow
      +'<path d="M97,19 Q112,42 108,74 Q104,94 100,114" stroke="'+ol+'" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.28"/>'
      // Crown base
      +'<path d="M22,32 Q22,8 60,7 Q98,8 98,32 Q90,13 60,12 Q30,13 22,32Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Right crown shadow
      +'<path d="M60,7 Q98,8 98,32 Q90,13 60,12Z" fill="'+drk+'" opacity="0.20"/>'
      // Ponytail base
      +'<path d="M95,17 Q110,40 106,72 Q102,92 98,112" stroke="'+hairColor+'" stroke-width="9" fill="none" stroke-linecap="round"/>'
      +'<path d="M95,17 Q110,40 106,72 Q102,92 98,112" stroke="'+ol+'" stroke-width="10.5" fill="none" stroke-linecap="round" opacity="0.25"/>'
      // Ponytail right shadow
      +'<path d="M97,20 Q112,44 108,74 Q104,94 100,114" stroke="'+drk+'" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.30"/>'
      // Ponytail highlight
      +'<path d="M94,18 Q108,40 104,70" stroke="'+hcHi+'" stroke-width="2.2" fill="none" opacity="0.42" stroke-linecap="round"/>'
      // Hair band
      +'<ellipse cx="97" cy="18" rx="5.5" ry="4" fill="'+hcDk+'" stroke="'+ol+'" stroke-width="1.2"/>'
      +'<path d="M93,16 Q97,13 101,16" stroke="'+hcHi+'" stroke-width="1" fill="none" opacity="0.4" stroke-linecap="round"/>'
      // Crown highlight
      +'<path d="M28,18 Q50,9 80,16" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.48" stroke-linecap="round"/>'
      +'<ellipse cx="44" cy="12" rx="14" ry="6" fill="'+hcHi+'" opacity="0.42"/>'
    );
  }

  if(styleId==='bob'){
    return (
      // Drop shadow
      '<path d="M18,34 Q18,4 60,4 Q102,4 102,34 Q96,8 60,7 Q24,8 18,34Z" fill="'+ol+'" opacity="0.25"/>'
      +'<path d="M16,70 Q14,56 18,34Z" fill="'+ol+'" opacity="0.20"/>'
      +'<path d="M104,70 Q106,56 102,34Z" fill="'+ol+'" opacity="0.20"/>'
      // Crown base
      +'<path d="M20,32 Q20,6 60,6 Q100,6 100,32 Q95,10 60,9 Q25,10 20,32Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Side panels
      +'<path d="M20,32 L17,68 Q20,76 28,74 L31,38Z" fill="'+h+'" stroke="'+ol+'" stroke-width="1.8" stroke-linejoin="round"/>'
      +'<path d="M100,32 L103,68 Q100,76 92,74 L89,38Z" fill="'+h+'" stroke="'+ol+'" stroke-width="1.8" stroke-linejoin="round"/>'
      // Bottom hem line
      +'<path d="M28,74 Q60,79 92,74" stroke="'+ol+'" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
      // Right panel shadow
      +'<path d="M60,6 Q100,6 100,32 L89,38 Q94,10 60,9Z" fill="'+drk+'" opacity="0.20"/>'
      +'<path d="M100,36 L103,68 Q100,76 92,74 L98,68 Q101,60 100,36Z" fill="'+drk+'" opacity="0.18"/>'
      // Left panel highlight
      +'<path d="M19,36 Q17,52 18,68" stroke="'+hcHi+'" stroke-width="1.8" fill="none" opacity="0.35" stroke-linecap="round"/>'
      // Crown highlight
      +'<path d="M26,18 Q50,8 78,16" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.50" stroke-linecap="round"/>'
      +'<ellipse cx="44" cy="11" rx="14" ry="6" fill="'+hcHi+'" opacity="0.44"/>'
    );
  }

  if(styleId==='pigtails'){
    return (
      // Crown drop shadow
      '<path d="M20,34 Q20,6 60,5 Q100,6 100,34 Q92,11 60,10 Q28,11 20,34Z" fill="'+ol+'" opacity="0.25"/>'
      // Pigtail drop shadows
      +'<path d="M20,36 Q4,58 6,92 Q10,109 16,116" stroke="'+ol+'" stroke-width="13" fill="none" stroke-linecap="round" opacity="0.28"/>'
      +'<path d="M100,36 Q116,58 114,92 Q110,109 104,116" stroke="'+ol+'" stroke-width="13" fill="none" stroke-linecap="round" opacity="0.28"/>'
      // Crown base
      +'<path d="M22,32 Q22,8 60,7 Q98,8 98,32 Q90,13 60,12 Q30,13 22,32Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Crown right shadow
      +'<path d="M60,7 Q98,8 98,32 Q90,13 60,12Z" fill="'+drk+'" opacity="0.20"/>'
      // Left pigtail
      +'<path d="M22,34 Q6,56 8,90 Q12,107 18,114" stroke="'+hairColor+'" stroke-width="10" fill="none" stroke-linecap="round"/>'
      +'<path d="M22,34 Q6,56 8,90 Q12,107 18,114" stroke="'+ol+'" stroke-width="11.8" fill="none" stroke-linecap="round" opacity="0.25"/>'
      +'<path d="M22,34 Q6,56 8,90 Q12,107 18,114" stroke="'+hcDk+'" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="4,5" opacity="0.42"/>'
      // Left pigtail highlight
      +'<path d="M21,36 Q5,58 7,88" stroke="'+hcHi+'" stroke-width="1.5" fill="none" opacity="0.38" stroke-linecap="round"/>'
      // Right pigtail
      +'<path d="M98,34 Q114,56 112,90 Q108,107 102,114" stroke="'+hairColor+'" stroke-width="10" fill="none" stroke-linecap="round"/>'
      +'<path d="M98,34 Q114,56 112,90 Q108,107 102,114" stroke="'+ol+'" stroke-width="11.8" fill="none" stroke-linecap="round" opacity="0.25"/>'
      +'<path d="M98,34 Q114,56 112,90 Q108,107 102,114" stroke="'+hcDk+'" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="4,5" opacity="0.42"/>'
      // Hair bands
      +'<ellipse cx="22" cy="35" rx="6.5" ry="4.5" fill="'+hcDk+'" stroke="'+ol+'" stroke-width="1.2"/>'
      +'<path d="M18,33 Q22,30 26,33" stroke="'+hcHi+'" stroke-width="1" fill="none" opacity="0.4" stroke-linecap="round"/>'
      +'<ellipse cx="98" cy="35" rx="6.5" ry="4.5" fill="'+hcDk+'" stroke="'+ol+'" stroke-width="1.2"/>'
      +'<path d="M94,33 Q98,30 102,33" stroke="'+hcHi+'" stroke-width="1" fill="none" opacity="0.4" stroke-linecap="round"/>'
      // Crown highlight
      +'<path d="M28,18 Q50,9 80,16" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.48" stroke-linecap="round"/>'
      +'<ellipse cx="44" cy="12" rx="14" ry="6" fill="'+hcHi+'" opacity="0.40"/>'
    );
  }

  if(styleId==='curly-long'){
    return (
      // Drop shadow crown
      '<path d="M18,36 Q16,3 60,3 Q104,3 102,36 Q94,8 60,7 Q26,8 18,36Z" fill="'+ol+'" opacity="0.25"/>'
      // Curly side drop shadows
      +'<path d="M18,36 Q3,64 8,94 Q4,105 11,114" stroke="'+ol+'" stroke-width="11" fill="none" stroke-linecap="round" opacity="0.25"/>'
      +'<path d="M102,36 Q117,64 112,94 Q116,105 109,114" stroke="'+ol+'" stroke-width="11" fill="none" stroke-linecap="round" opacity="0.25"/>'
      // Crown base
      +'<path d="M20,34 Q18,5 60,5 Q102,5 100,34 Q92,10 60,9 Q28,10 20,34Z" fill="'+h+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      // Crown right shadow
      +'<path d="M60,5 Q102,5 100,34 Q92,10 60,9Z" fill="'+drk+'" opacity="0.20"/>'
      // Curly sides
      +'<path d="M20,34 Q5,62 10,92 Q6,103 13,112" stroke="'+hairColor+'" stroke-width="9" fill="none" stroke-linecap="round"/>'
      +'<path d="M20,34 Q5,62 10,92 Q6,103 13,112" stroke="'+ol+'" stroke-width="10.5" fill="none" stroke-linecap="round" opacity="0.22"/>'
      +'<path d="M100,34 Q115,62 110,92 Q114,103 107,112" stroke="'+hairColor+'" stroke-width="9" fill="none" stroke-linecap="round"/>'
      +'<path d="M100,34 Q115,62 110,92 Q114,103 107,112" stroke="'+ol+'" stroke-width="10.5" fill="none" stroke-linecap="round" opacity="0.22"/>'
      // Right side shadow
      +'<path d="M102,36 Q117,64 112,92 Q116,105 109,114" stroke="'+drk+'" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.28"/>'
      // Curl detail texture
      +'<path d="M14,52 Q9,58 15,62" stroke="'+hcHi+'" stroke-width="2.2" fill="none" opacity="0.42" stroke-linecap="round"/>'
      +'<path d="M12,68 Q7,74 13,78" stroke="'+hcHi+'" stroke-width="2.2" fill="none" opacity="0.38" stroke-linecap="round"/>'
      +'<path d="M11,84 Q6,90 12,94" stroke="'+hcHi+'" stroke-width="2" fill="none" opacity="0.34" stroke-linecap="round"/>'
      +'<path d="M106,52 Q111,58 105,62" stroke="'+hcHi+'" stroke-width="1.5" fill="none" opacity="0.28" stroke-linecap="round"/>'
      +'<path d="M108,68 Q113,74 107,78" stroke="'+hcHi+'" stroke-width="1.5" fill="none" opacity="0.25" stroke-linecap="round"/>'
      // Left highlight
      +'<path d="M19,36 Q4,64 8,94" stroke="'+hcHi+'" stroke-width="1.8" fill="none" opacity="0.32" stroke-linecap="round"/>'
      // Crown highlight
      +'<path d="M26,18 Q50,8 78,16" stroke="'+hcHi+'" stroke-width="4.5" fill="none" opacity="0.48" stroke-linecap="round"/>'
      +'<ellipse cx="44" cy="11" rx="14" ry="6" fill="'+hcHi+'" opacity="0.42"/>'
    );
  }

  return '';
}

// ── HAT ───────────────────────────────────────────────────────────────────────
function ccLayerHat(hatId,hatColor,hatGrad,hatDk,hatHi){
  if(hatId==='none') return '';
  var c=hatGrad||hatColor, cd=hatDk||_ccDarkenHex(hatColor,0.3), ch=hatHi||_ccLightenHex(hatColor,0.3);
  var ol=_ccDarkenHex(hatColor,0.6);
  if(hatId==='cap'){
    return '<path d="M20,30 Q20,5 60,4 Q100,5 100,30 L100,22 Q92,7 60,6 Q28,7 20,22 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<path d="M10,26 Q20,21 100,21 L100,27 Q60,29 20,27 L10,26 Z" fill="'+cd+'" stroke="'+ol+'" stroke-width="1.5"/>'
      +'<path d="M4,26 Q10,21 10,29 Q4,27 4,26 Z" fill="'+cd+'" stroke="'+ol+'" stroke-width="1"/>'
      +'<path d="M10,25 Q60,23 100,25" stroke="'+ch+'" stroke-width="1" fill="none" opacity="0.4"/>'
      +'<path d="M28,13 Q60,7 92,13" stroke="'+ch+'" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<text x="60" y="20" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.9)">&lt;/&gt;</text>';
  } else if(hatId==='beanie-b'){
    return '<path d="M20,31 Q20,2 60,2 Q100,2 100,31 Q92,8 60,7 Q28,8 20,31 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<rect x="19" y="27" width="82" height="10" rx="5" fill="'+cd+'" stroke="'+ol+'" stroke-width="1.5"/>'
      +'<rect x="19" y="27" width="82" height="4" rx="4" fill="'+ch+'" opacity="0.3"/>'
      +'<circle cx="60" cy="4" r="9" fill="'+cd+'" stroke="'+ol+'" stroke-width="1.5"/>'
      +'<ellipse cx="56" cy="1" rx="5" ry="4" fill="'+ch+'" opacity="0.3"/>'
      +'<path d="M28,12 Q60,5 92,12" stroke="'+ch+'" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>'
      +'<text x="60" y="22" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.85)">&#123; &#125;</text>';
  } else if(hatId==='nasa'){
    return '<path d="M20,30 Q20,5 60,4 Q100,5 100,30 L100,22 Q92,7 60,6 Q28,7 20,22 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<path d="M10,26 Q20,21 100,21 L100,27 Q60,29 20,27 L10,26 Z" fill="'+cd+'" stroke="'+ol+'" stroke-width="1.5"/>'
      +'<path d="M4,26 Q10,21 10,29 Q4,27 4,26 Z" fill="'+cd+'" stroke="'+ol+'" stroke-width="1"/>'
      +'<path d="M10,25 Q60,23 100,25" stroke="'+ch+'" stroke-width="1" fill="none" opacity="0.35"/>'
      +'<ellipse cx="60" cy="13" rx="24" ry="9" fill="rgba(0,20,70,0.55)"/>'
      +'<text x="60" y="17" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="rgba(255,255,255,0.94)" font-weight="bold">NASA</text>'
      +'<path d="M28,12 Q60,6 92,12" stroke="'+ch+'" stroke-width="3" fill="none" opacity="0.3" stroke-linecap="round"/>';
  } else if(hatId==='beanie-p'){
    return '<path d="M20,31 Q20,2 60,2 Q100,2 100,31 Q92,8 60,7 Q28,8 20,31 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="2" stroke-linejoin="round"/>'
      +'<rect x="19" y="27" width="82" height="10" rx="5" fill="'+cd+'" stroke="'+ol+'" stroke-width="1.5"/>'
      +'<rect x="19" y="27" width="82" height="4" rx="4" fill="'+ch+'" opacity="0.3"/>'
      +'<circle cx="60" cy="4" r="8" fill="'+cd+'" stroke="'+ol+'" stroke-width="1.5"/>'
      +'<ellipse cx="57" cy="1" rx="4" ry="3" fill="'+ch+'" opacity="0.28"/>'
      +'<path d="M28,12 Q60,5 92,12" stroke="'+ch+'" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>';
  }
  return '';
}

// ── GLASSES ───────────────────────────────────────────────────────────────────
function ccLayerGlasses(glassesId,glassesColor){
  if(glassesId==='none') return '';
  var c=glassesColor, cd=_ccDarkenHex(c,0.22);
  if(glassesId==='round'){
    return '<g>'
      +'<circle cx="42" cy="46" r="15" fill="rgba(30,60,100,0.1)" stroke="'+c+'" stroke-width="3.2"/>'
      +'<circle cx="78" cy="46" r="15" fill="rgba(30,60,100,0.1)" stroke="'+c+'" stroke-width="3.2"/>'
      +'<path d="M32,37 Q35,34 39,36" stroke="rgba(255,255,255,0.32)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<path d="M68,37 Q71,34 75,36" stroke="rgba(255,255,255,0.32)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<line x1="57" y1="46" x2="63" y2="46" stroke="'+c+'" stroke-width="2.5"/>'
      +'<line x1="25" y1="45" x2="27" y2="45" stroke="'+c+'" stroke-width="2.2"/>'
      +'<line x1="93" y1="45" x2="95" y2="45" stroke="'+c+'" stroke-width="2.2"/>'
      +'</g>';
  } else if(glassesId==='square'){
    return '<g>'
      +'<rect x="27" y="35" width="30" height="23" rx="4" fill="rgba(30,60,100,0.1)" stroke="'+c+'" stroke-width="3.2"/>'
      +'<rect x="63" y="35" width="30" height="23" rx="4" fill="rgba(30,60,100,0.1)" stroke="'+c+'" stroke-width="3.2"/>'
      +'<path d="M30,37 Q33,35 37,36" stroke="rgba(255,255,255,0.32)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<path d="M66,37 Q69,35 73,36" stroke="rgba(255,255,255,0.32)" stroke-width="2" fill="none" stroke-linecap="round"/>'
      +'<line x1="57" y1="47" x2="63" y2="47" stroke="'+c+'" stroke-width="2.5"/>'
      +'<line x1="24" y1="46" x2="27" y2="46" stroke="'+c+'" stroke-width="2.2"/>'
      +'<line x1="93" y1="46" x2="96" y2="46" stroke="'+c+'" stroke-width="2.2"/>'
      +'</g>';
  } else if(glassesId==='shades'){
    return '<g>'
      +'<rect x="25" y="35" width="36" height="19" rx="7" fill="'+c+'" opacity="0.92" stroke="'+cd+'" stroke-width="1.5"/>'
      +'<rect x="61" y="35" width="36" height="19" rx="7" fill="'+c+'" opacity="0.92" stroke="'+cd+'" stroke-width="1.5"/>'
      +'<path d="M28,38 Q31,36 35,37" stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
      +'<path d="M64,38 Q67,36 71,37" stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
      +'<line x1="57" y1="44" x2="63" y2="44" stroke="'+cd+'" stroke-width="2.8"/>'
      +'<line x1="23" y1="43" x2="25" y2="43" stroke="'+cd+'" stroke-width="2.2"/>'
      +'<line x1="95" y1="43" x2="97" y2="43" stroke="'+cd+'" stroke-width="2.2"/>'
      +'</g>';
  }
  return '';
}

// ── FACIAL HAIR ───────────────────────────────────────────────────────────────
function ccLayerFacialHair(fhId,fhColor,fhGrad,skHex){
  if(fhId==='none') return '';
  var c=fhGrad||fhColor, cd=_ccDarkenHex(fhColor,0.35), ch=_ccLightenHex(fhColor,0.22);
  var ol=_ccDarkenHex(fhColor,0.55);
  if(fhId==='stubble'){
    return '<rect x="38" y="63" width="44" height="14" rx="5" fill="'+fhColor+'" opacity="0.2"/>'
      +'<circle cx="45" cy="67" r="1.4" fill="'+fhColor+'" opacity="0.35"/><circle cx="51" cy="70" r="1.4" fill="'+fhColor+'" opacity="0.35"/>'
      +'<circle cx="57" cy="68" r="1.4" fill="'+fhColor+'" opacity="0.35"/><circle cx="63" cy="71" r="1.4" fill="'+fhColor+'" opacity="0.35"/>'
      +'<circle cx="69" cy="68" r="1.4" fill="'+fhColor+'" opacity="0.35"/><circle cx="75" cy="70" r="1.2" fill="'+fhColor+'" opacity="0.3"/>'
      +'<circle cx="48" cy="72" r="1.1" fill="'+fhColor+'" opacity="0.28"/><circle cx="60" cy="74" r="1.1" fill="'+fhColor+'" opacity="0.28"/>'
      +'<circle cx="72" cy="72" r="1.1" fill="'+fhColor+'" opacity="0.28"/>';
  } else if(fhId==='mustache'){
    return '<path d="M45,63 Q51,57 60,60 Q69,57 75,63 Q69,70 60,66 Q51,70 45,63 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="1.2" stroke-linejoin="round"/>'
      +'<path d="M47,61 Q60,56 73,61" stroke="'+ch+'" stroke-width="1.2" fill="none" opacity="0.42" stroke-linecap="round"/>'
      +'<path d="M58,63 Q60,62 62,63" stroke="'+cd+'" stroke-width="1.2" fill="none" opacity="0.5"/>';
  } else if(fhId==='beard'){
    return '<path d="M28,60 Q25,82 60,89 Q95,82 92,60 Q82,73 60,75 Q38,73 28,60 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="1.8" stroke-linejoin="round"/>'
      +'<path d="M32,64 Q38,80 60,85" stroke="'+ch+'" stroke-width="1.5" fill="none" opacity="0.3"/>'
      +'<path d="M88,64 Q82,80 60,85" stroke="'+ch+'" stroke-width="1.5" fill="none" opacity="0.3"/>'
      +'<ellipse cx="60" cy="69" rx="18" ry="8" fill="'+skHex+'" opacity="0.18"/>'
      +'<path d="M38,86 Q60,92 82,86" stroke="'+ol+'" stroke-width="1.5" fill="none" opacity="0.4"/>';
  } else if(fhId==='goatee'){
    return '<path d="M50,64 Q55,57 65,57 Q74,57 71,64" fill="'+c+'" stroke="'+ol+'" stroke-width="1.2" stroke-linejoin="round"/>'
      +'<path d="M51,64 Q55,71 60,77 Q65,71 69,64 Q64,69 60,74 Q56,69 51,64 Z" fill="'+c+'" stroke="'+ol+'" stroke-width="1.2" stroke-linejoin="round"/>'
      +'<path d="M57,66 Q60,64 63,66" stroke="'+ch+'" stroke-width="1.2" fill="none" opacity="0.45"/>';
  }
  return '';
}

// ── BUILD CHARACTER ───────────────────────────────────────────────────────────
function buildCharacterSVG(cfg,w,h){
  var u='_'+(++_ccUid);
  var bt=cfg.bodyType||'m';
  var sk=CC_SKINS.find(function(x){return x.id===cfg.skin;})||CC_SKINS[1];
  var skHex=sk.hex, skSh=sk.sh, skHi=_ccLightenHex(sk.hex,0.52);

  var ec=_ccHex(CC_EYE_COLORS,   cfg.eyeColor);
  var ecHi=_ccLightenHex(ec,0.58); var ecDk=_ccDarkenHex(ec,0.52);
  var hc=_ccHex(CC_HAIR_COLORS,  cfg.hairColor);
  var hcHi=_ccLightenHex(hc,0.42); var hcDk=_ccDarkenHex(hc,0.45);
  var tc=_ccHex(CC_TOP_COLORS,   cfg.topColor);
  var tcHi=_ccLightenHex(tc,0.28); var tcDk=_ccDarkenHex(tc,0.28);
  var htc=_ccHex(CC_HAT_COLORS,  cfg.hatColor);
  var htcHi=_ccLightenHex(htc,0.32); var htcDk=_ccDarkenHex(htc,0.32);
  var gc=_ccHex(CC_GLASSES_COLORS,cfg.glassesColor);
  var fhc=_ccHex(CC_FH_COLORS,   cfg.fhColor);
  var fhcDk=_ccDarkenHex(fhc,0.38);
  var bgc=_ccHex(CC_BG_COLORS,   cfg.bgColor);

  var defs='<defs>'
    // Skin: very high contrast radial — strong highlight, deep shadow
    +'<radialGradient id="sg'+u+'" cx="64%" cy="22%" r="72%" gradientUnits="objectBoundingBox">'
      +'<stop offset="0%" stop-color="'+skHi+'"/>'
      +'<stop offset="42%" stop-color="'+skHex+'"/>'
      +'<stop offset="100%" stop-color="'+skSh+'"/>'
    +'</radialGradient>'
    // Iris: glass-marble radial
    +'<radialGradient id="ig'+u+'" cx="32%" cy="26%" r="56%" gradientUnits="objectBoundingBox">'
      +'<stop offset="0%" stop-color="'+ecHi+'"/>'
      +'<stop offset="48%" stop-color="'+ec+'"/>'
      +'<stop offset="100%" stop-color="'+ecDk+'"/>'
    +'</radialGradient>'
    // Hair gradient
    +'<linearGradient id="hg'+u+'" x1="0%" y1="0%" x2="0%" y2="100%">'
      +'<stop offset="0%" stop-color="'+hcHi+'"/>'
      +'<stop offset="42%" stop-color="'+hc+'"/>'
      +'<stop offset="100%" stop-color="'+hcDk+'"/>'
    +'</linearGradient>'
    // Clothing gradient
    +'<linearGradient id="tg'+u+'" x1="22%" y1="0%" x2="78%" y2="100%">'
      +'<stop offset="0%" stop-color="'+tcHi+'"/>'
      +'<stop offset="100%" stop-color="'+tcDk+'"/>'
    +'</linearGradient>'
    // Hat gradient
    +'<linearGradient id="htg'+u+'" x1="28%" y1="0%" x2="58%" y2="100%">'
      +'<stop offset="0%" stop-color="'+htcHi+'"/>'
      +'<stop offset="100%" stop-color="'+htcDk+'"/>'
    +'</linearGradient>'
    // Facial hair gradient
    +'<linearGradient id="fhg'+u+'" x1="50%" y1="0%" x2="50%" y2="100%">'
      +'<stop offset="0%" stop-color="'+fhc+'"/>'
      +'<stop offset="100%" stop-color="'+fhcDk+'"/>'
    +'</linearGradient>'
    // Rim light (cool blue bounce from shadow side)
    +'<radialGradient id="rim'+u+'" cx="0%" cy="50%" r="100%" gradientUnits="objectBoundingBox">'
      +'<stop offset="0%" stop-color="rgba(160,205,255,0.22)"/>'
      +'<stop offset="100%" stop-color="rgba(160,205,255,0)"/>'
    +'</radialGradient>'
    // Subsurface scatter (warm glow through cheeks)
    +'<radialGradient id="sss'+u+'" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">'
      +'<stop offset="0%" stop-color="rgba(255,145,95,0.24)"/>'
      +'<stop offset="100%" stop-color="rgba(255,145,95,0)"/>'
    +'</radialGradient>'
    +'</defs>';

  var br=w?Math.round(w*0.08):10;
  return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"'
    +' width="'+(w||120)+'" height="'+(h||120)+'" style="display:block;border-radius:'+br+'px;">'
    +defs
    +ccLayerBg(bgc)
    +ccLayerBody(cfg.top,tc,'url(#tg'+u+')',tcHi,tcDk,bt)
    +ccLayerHead(skHex,skSh,skHi,u,bt)
    +ccLayerHair(cfg.hairStyle,hc,'url(#hg'+u+')',hcDk,hcHi)
    +ccLayerExpression(cfg.expression,ec,skHex,skSh,skHi,'url(#ig'+u+')',ecDk)
    +ccLayerGlasses(cfg.glasses,gc)
    +(bt==='f'?'':ccLayerFacialHair(cfg.facialHair,fhc,'url(#fhg'+u+')',skHex))
    +ccLayerHat(cfg.hat,htc,'url(#htg'+u+')',htcDk,htcHi)
    +'</svg>';
}

// ── CREATOR UI ────────────────────────────────────────────────────────────────

var _CC_TABS=[
  {id:'body',    label:'Body',    icon:'M60,5 Q74,5 74,20 Q74,35 60,35 Q46,35 46,20 Q46,5 60,5Z M42,38 Q44,32 60,30 Q76,32 78,38 L80,95 L40,95Z'},
  {id:'skin',   label:'Skin',    icon:'M60,20 Q80,20 85,40 Q85,65 60,70 Q35,65 35,40 Q40,20 60,20Z'},
  {id:'expr',   label:'Eyes',    icon:'M30,48 Q43,38 56,48 M64,48 Q77,38 90,48 M36,54 a7,5 0 1,0 14,0 M66,54 a7,5 0 1,0 14,0'},
  {id:'hair',   label:'Hair',    icon:'M25,35 Q25,10 60,10 Q95,10 95,35 Q90,15 60,15 Q30,15 25,35Z M20,38 Q22,32 25,35 M100,38 Q98,32 95,35'},
  {id:'top',    label:'Outfit',  icon:'M30,75 Q35,55 60,52 Q85,55 90,75 L95,95 L70,95 L70,75 L50,75 L50,95 L25,95Z'},
  {id:'hat',    label:'Hat',     icon:'M20,42 Q20,20 60,18 Q100,20 100,42 L98,46 Q60,44 22,46Z M15,44 Q22,40 22,48 M105,44 Q98,40 98,48'},
  {id:'glasses',label:'Glasses', icon:'M29,44 a14,11 0 1,0 28,0 M63,44 a14,11 0 1,0 28,0 M57,44 L63,44 M27,43 L29,43 M91,43 L93,43'},
  {id:'fh',     label:'Facial',  icon:'M44,64 Q52,58 60,61 Q68,58 76,64 Q68,72 60,68 Q52,72 44,64Z'},
  {id:'bg',     label:'Scene',   icon:'M10,10 L110,10 L110,110 L10,110 Z M10,10 L40,10 L40,40 L10,40 M80,80 L110,80 L110,110 L80,110'},
];

function showCharacterCreator(){
  var existing=document.getElementById('cc-modal');
  if(existing) existing.remove();
  if(!document.getElementById('cc-styles-v2')){
    var st=document.createElement('style');
    st.id='cc-styles-v2';
    st.textContent=[
      '.ccm{position:fixed;inset:0;z-index:9000;background:#0a0c14;display:flex;flex-direction:column;opacity:0;transition:opacity 0.3s;}',
      '.ccm.open{opacity:1;}',
      '.ccm-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.06);}',
      '.ccm-bar-title{font-family:"Orbitron",sans-serif;font-size:10px;letter-spacing:4px;color:rgba(255,255,255,0.5);}',
      '.ccm-done{background:none;border:none;font-family:"Orbitron",sans-serif;font-size:10px;letter-spacing:3px;color:rgba(200,169,80,0.9);cursor:pointer;padding:8px 14px;}',
      '.ccm-close{background:none;border:none;color:rgba(255,255,255,0.4);font-size:18px;cursor:pointer;padding:4px 10px;}',
      '.ccm-preview{flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#111520;padding:20px 0 16px;position:relative;}',
      '.ccm-char-wrap{position:relative;}',
      '.ccm-char-shadow{position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:130px;height:16px;background:radial-gradient(ellipse,rgba(0,0,0,0.35) 0%,transparent 70%);border-radius:50%;}',
      '.ccm-tabs{display:flex;background:#0d1018;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;overflow-x:auto;scrollbar-width:none;}',
      '.ccm-tabs::-webkit-scrollbar{display:none;}',
      '.ccm-tab{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;padding:10px 14px 8px;cursor:pointer;border-bottom:2px solid transparent;gap:3px;transition:all 0.18s;}',
      '.ccm-tab.act{border-bottom-color:rgba(200,169,80,0.8);}',
      '.ccm-tab svg{transition:all 0.18s;}',
      '.ccm-tab.act svg{filter:drop-shadow(0 0 3px rgba(200,169,80,0.5));}',
      '.ccm-tab-label{font-family:"Space Mono",monospace;font-size:7px;letter-spacing:1px;color:rgba(255,255,255,0.35);}',
      '.ccm-tab.act .ccm-tab-label{color:rgba(200,169,80,0.85);}',
      '.ccm-opts{flex:1;overflow-y:auto;padding:14px 12px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.08) transparent;}',
      '.ccm-opts::-webkit-scrollbar{width:3px;}',
      '.ccm-opts::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:2px;}',
      '.ccm-section-title{font-family:"Space Mono",monospace;font-size:8px;letter-spacing:2px;color:rgba(255,255,255,0.3);margin-bottom:10px;}',
      '.ccm-skin-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:6px;}',
      '.ccm-skin-sw{aspect-ratio:1;border-radius:10px;cursor:pointer;border:2.5px solid transparent;transition:all 0.15s;}',
      '.ccm-skin-sw.sel{border-color:#fff;box-shadow:0 0 0 3px rgba(200,169,80,0.5);}',
      '.ccm-skin-sw:hover{transform:scale(1.08);}',
      '.ccm-color-row{display:flex;gap:7px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:none;margin-bottom:2px;}',
      '.ccm-color-row::-webkit-scrollbar{display:none;}',
      '.ccm-csw{width:32px;height:32px;flex-shrink:0;border-radius:8px;cursor:pointer;border:2.5px solid transparent;transition:all 0.15s;}',
      '.ccm-csw.sel{border-color:#fff;box-shadow:0 0 0 3px rgba(200,169,80,0.45);}',
      '.ccm-csw:hover{transform:scale(1.1);}',
      '.ccm-bg-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;}',
      '.ccm-bg-sw{aspect-ratio:1;border-radius:8px;cursor:pointer;border:2.5px solid rgba(255,255,255,0.08);transition:all 0.15s;}',
      '.ccm-bg-sw.sel{border-color:#fff;box-shadow:0 0 0 3px rgba(200,169,80,0.45);}',
      '.ccm-bg-sw:hover{transform:scale(1.06);}',
      '.ccm-opt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}',
      '.ccm-opt-card{border-radius:12px;border:2.5px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);cursor:pointer;overflow:hidden;transition:all 0.15s;display:flex;flex-direction:column;align-items:center;}',
      '.ccm-opt-card.sel{border-color:rgba(200,169,80,0.8);background:rgba(200,169,80,0.08);}',
      '.ccm-opt-card:hover{border-color:rgba(255,255,255,0.2);}',
      '.ccm-opt-card svg{width:100%;height:auto;display:block;}',
      '.ccm-opt-label{font-family:"Orbitron",sans-serif;font-size:6.5px;letter-spacing:1px;color:rgba(255,255,255,0.6);padding:5px 4px 6px;text-align:center;line-height:1.3;}',
      '.ccm-opt-card.sel .ccm-opt-label{color:rgba(200,169,80,0.9);}',
      '.ccm-footer{padding:12px 16px;flex-shrink:0;border-top:1px solid rgba(255,255,255,0.06);}',
      '.ccm-confirm-btn{width:100%;padding:14px;background:linear-gradient(135deg,rgba(200,169,80,0.9),rgba(150,110,30,0.9));border:none;border-radius:10px;font-family:"Orbitron",sans-serif;font-size:11px;letter-spacing:4px;color:#0a0a0a;font-weight:700;cursor:pointer;transition:all 0.2s;}',
      '.ccm-confirm-btn:hover{filter:brightness(1.12);transform:translateY(-1px);}',
      '.ccm-cin{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;z-index:5;}',
      '.ccm-cin-text{font-family:"Orbitron",sans-serif;font-size:13px;letter-spacing:6px;color:rgba(200,169,80,0);text-align:center;transform:scale(0.85);transition:all 0.45s;line-height:1.4;}',
      '.ccm-cin-text.show{color:rgba(200,169,80,1);transform:scale(1);text-shadow:0 0 24px rgba(200,169,80,0.6);}',
      '.ccm-cin-sub{font-family:"Space Mono",monospace;font-size:8px;letter-spacing:3px;color:rgba(255,255,255,0);margin-top:6px;transition:all 0.4s 0.18s;}',
      '.ccm-cin-sub.show{color:rgba(255,255,255,0.38);}',
      '@keyframes cc2-pulse{0%{transform:scale(1)}25%{transform:scale(1.05)}60%{transform:scale(0.97)}100%{transform:scale(1)}}',
      '.ccm-char-wrap.pulse{animation:cc2-pulse 0.55s ease;}',
      '@keyframes cc2-particle{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--px),var(--py));opacity:0}}',
      '.cc2-pt{position:absolute;width:5px;height:5px;border-radius:50%;top:50%;left:50%;animation:cc2-particle 1.1s ease-out forwards;pointer-events:none;}',
    ].join('');
    document.head.appendChild(st);
  }
  var cfg=getCharacterConfig();
  window._ccCfg=JSON.parse(JSON.stringify(cfg));
  window._ccTab=0;
  var tabsHtml=_CC_TABS.map(function(t,i){
    var col=i===0?'rgba(200,169,80,0.85)':'rgba(255,255,255,0.28)';
    return '<div class="ccm-tab'+(i===0?' act':'')+'" onclick="ccTab('+i+')" id="cct-'+i+'">'
      +'<svg width="24" height="24" viewBox="0 0 120 120" fill="none" stroke="'+col+'" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="'+t.icon+'"/></svg>'
      +'<div class="ccm-tab-label">'+t.label+'</div></div>';
  }).join('');
  var el=document.createElement('div');
  el.id='cc-modal'; el.className='ccm';
  el.innerHTML='<div class="ccm-bar"><button class="ccm-close" onclick="hideCharacterCreator()">&#x2715;</button><div class="ccm-bar-title">EDIT AVATAR</div><button class="ccm-done" onclick="ccConfirm()">DONE</button></div>'
    +'<div class="ccm-preview"><div class="ccm-char-wrap" id="ccm-cw"><div id="ccm-char"></div><div class="ccm-char-shadow"></div><div class="ccm-cin" id="ccm-cin"><div class="ccm-cin-text" id="ccm-ct">SAVED</div><div class="ccm-cin-sub" id="ccm-cs">IDENTITY LOCKED IN</div></div></div></div>'
    +'<div class="ccm-tabs" id="ccm-tabs">'+tabsHtml+'</div>'
    +'<div class="ccm-opts" id="ccm-opts"></div>'
    +'<div class="ccm-footer"><button class="ccm-confirm-btn" onclick="ccConfirm()">CONFIRM CHARACTER</button></div>';
  document.body.appendChild(el);
  requestAnimationFrame(function(){el.classList.add('open');});
  ccRenderPreview();
  ccRenderTabContent(0);
}

function hideCharacterCreator(){var el=document.getElementById('cc-modal');if(!el)return;el.classList.remove('open');setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},320);}

function ccTab(i){
  window._ccTab=i;
  document.querySelectorAll('.ccm-tab').forEach(function(t,ti){
    t.classList.toggle('act',ti===i);
    var svg=t.querySelector('svg');
    if(svg) svg.setAttribute('stroke',ti===i?'rgba(200,169,80,0.85)':'rgba(255,255,255,0.28)');
  });
  ccRenderTabContent(i);
}

function ccRenderTabContent(i){
  var area=document.getElementById('ccm-opts');if(!area)return;
  var cfg=window._ccCfg,tabId=_CC_TABS[i].id,html='';
  if(tabId==='body'){
    var btOpts=[{id:'m',label:'MALE'},{id:'f',label:'FEMALE'}];
    html+='<div class="ccm-section-title">BODY TYPE</div><div class="ccm-opt-grid">';
    btOpts.forEach(function(bt){
      var tc2=Object.assign({},cfg,{bodyType:bt.id});
      html+='<div class="ccm-opt-card'+(cfg.bodyType===bt.id?' sel':'')+'" onclick="ccSet(\'bodyType\',\''+bt.id+'\')">'
        +buildCharacterSVG(tc2,120,120)
        +'<div class="ccm-opt-label">'+bt.label+'</div></div>';
    });
    html+='</div>';
  } else if(tabId==='skin'){
    html+='<div class="ccm-section-title">SKIN TONE</div><div class="ccm-skin-grid">'
      +CC_SKINS.map(function(s){return '<div class="ccm-skin-sw'+(cfg.skin===s.id?' sel':'')+'" style="background:'+s.hex+';" title="'+s.name+'" onclick="ccSet(\'skin\',\''+s.id+'\')"></div>';}).join('')+'</div>';
  }else if(tabId==='expr'){
    html+='<div class="ccm-section-title">EYE COLOUR</div><div class="ccm-color-row">'+CC_EYE_COLORS.map(function(c){return '<div class="ccm-csw'+(cfg.eyeColor===c.id?' sel':'')+'" style="background:'+c.hex+';" onclick="ccSet(\'eyeColor\',\''+c.id+'\')"></div>';}).join('')+'</div>';
    html+='<div class="ccm-section-title">EXPRESSION</div><div class="ccm-opt-grid">'+CC_EXPRESSIONS.map(function(e){var tc=Object.assign({},cfg,{expression:e.id});return '<div class="ccm-opt-card'+(cfg.expression===e.id?' sel':'')+'" onclick="ccSet(\'expression\',\''+e.id+'\')">'+buildCharacterSVG(tc,120,120)+'<div class="ccm-opt-label">'+e.name+'</div></div>';}).join('')+'</div>';
  }else if(tabId==='hair'){
    html+='<div class="ccm-section-title">HAIR COLOUR</div><div class="ccm-color-row">'+CC_HAIR_COLORS.map(function(c){return '<div class="ccm-csw'+(cfg.hairColor===c.id?' sel':'')+'" style="background:'+c.hex+';" onclick="ccSet(\'hairColor\',\''+c.id+'\')"></div>';}).join('')+'</div>';
    html+='<div class="ccm-section-title">HAIRSTYLE</div><div class="ccm-opt-grid">'+CC_HAIR_STYLES.map(function(s){var tc=Object.assign({},cfg,{hairStyle:s.id});return '<div class="ccm-opt-card'+(cfg.hairStyle===s.id?' sel':'')+'" onclick="ccSet(\'hairStyle\',\''+s.id+'\')">'+buildCharacterSVG(tc,120,120)+'<div class="ccm-opt-label">'+s.name+'</div></div>';}).join('')+'</div>';
  }else if(tabId==='top'){
    html+='<div class="ccm-section-title">OUTFIT COLOUR</div><div class="ccm-color-row">'+CC_TOP_COLORS.map(function(c){return '<div class="ccm-csw'+(cfg.topColor===c.id?' sel':'')+'" style="background:'+c.hex+';" onclick="ccSet(\'topColor\',\''+c.id+'\')"></div>';}).join('')+'</div>';
    html+='<div class="ccm-section-title">CLOTHING</div><div class="ccm-opt-grid">'+CC_TOPS.map(function(t){var tc=Object.assign({},cfg,{top:t.id});return '<div class="ccm-opt-card'+(cfg.top===t.id?' sel':'')+'" onclick="ccSet(\'top\',\''+t.id+'\')">'+buildCharacterSVG(tc,120,120)+'<div class="ccm-opt-label">'+t.name+'</div></div>';}).join('')+'</div>';
  }else if(tabId==='hat'){
    html+='<div class="ccm-section-title">HAT COLOUR</div><div class="ccm-color-row">'+CC_HAT_COLORS.map(function(c){return '<div class="ccm-csw'+(cfg.hatColor===c.id?' sel':'')+'" style="background:'+c.hex+';" onclick="ccSet(\'hatColor\',\''+c.id+'\')"></div>';}).join('')+'</div>';
    html+='<div class="ccm-section-title">HEADWEAR</div><div class="ccm-opt-grid">'+CC_HATS.map(function(h){var tc=Object.assign({},cfg,{hat:h.id});return '<div class="ccm-opt-card'+(cfg.hat===h.id?' sel':'')+'" onclick="ccSet(\'hat\',\''+h.id+'\')">'+buildCharacterSVG(tc,120,120)+'<div class="ccm-opt-label">'+h.name+'</div></div>';}).join('')+'</div>';
  }else if(tabId==='glasses'){
    html+='<div class="ccm-section-title">FRAME COLOUR</div><div class="ccm-color-row">'+CC_GLASSES_COLORS.map(function(c){return '<div class="ccm-csw'+(cfg.glassesColor===c.id?' sel':'')+'" style="background:'+c.hex+';" onclick="ccSet(\'glassesColor\',\''+c.id+'\')"></div>';}).join('')+'</div>';
    html+='<div class="ccm-section-title">GLASSES</div><div class="ccm-opt-grid">'+CC_GLASSES.map(function(g){var tc=Object.assign({},cfg,{glasses:g.id});return '<div class="ccm-opt-card'+(cfg.glasses===g.id?' sel':'')+'" onclick="ccSet(\'glasses\',\''+g.id+'\')">'+buildCharacterSVG(tc,120,120)+'<div class="ccm-opt-label">'+g.name+'</div></div>';}).join('')+'</div>';
  }else if(tabId==='fh'){
    if(cfg.bodyType==='f'){
      html+='<div style="padding:32px 16px;text-align:center;color:rgba(255,255,255,0.28);font-family:\'Space Mono\',monospace;font-size:9px;letter-spacing:2px;">NOT AVAILABLE<br><br>Switch to male body type<br>to access facial hair.</div>';
    }else{
      html+='<div class="ccm-section-title">FACIAL HAIR COLOUR</div><div class="ccm-color-row">'+CC_FH_COLORS.map(function(c){return '<div class="ccm-csw'+(cfg.fhColor===c.id?' sel':'')+'" style="background:'+c.hex+';" onclick="ccSet(\'fhColor\',\''+c.id+'\')"></div>';}).join('')+'</div>';
      html+='<div class="ccm-section-title">FACIAL HAIR</div><div class="ccm-opt-grid">'+CC_FACIAL_HAIR.map(function(f){var tc=Object.assign({},cfg,{facialHair:f.id});return '<div class="ccm-opt-card'+(cfg.facialHair===f.id?' sel':'')+'" onclick="ccSet(\'facialHair\',\''+f.id+'\')">'+buildCharacterSVG(tc,120,120)+'<div class="ccm-opt-label">'+f.name+'</div></div>';}).join('')+'</div>';
    }
  }else if(tabId==='bg'){
    html+='<div class="ccm-section-title">SCENE BACKGROUND</div><div class="ccm-bg-grid">'+CC_BG_COLORS.map(function(b){return '<div class="ccm-bg-sw'+(cfg.bgColor===b.id?' sel':'')+'" style="background:'+b.hex+';" onclick="ccSet(\'bgColor\',\''+b.id+'\')"></div>';}).join('')+'</div>';
  }
  area.innerHTML=html;
}

function ccSet(key,val){
  window._ccCfg[key]=val;
  if(key==='bodyType'&&val==='f'&&window._ccCfg.facialHair!=='none')window._ccCfg.facialHair='none';
  ccRenderPreview();ccRenderTabContent(window._ccTab);
}
function ccRenderPreview(){var el=document.getElementById('ccm-char');if(el&&window._ccCfg)el.innerHTML=buildCharacterSVG(window._ccCfg,180,180);}

function ccConfirm(){
  var cfg=window._ccCfg;saveCharacterConfig(cfg);
  var fromOnboarding=!!window._ccFromOnboarding;
  if(fromOnboarding)window._ccFromOnboarding=false;
  var cw=document.getElementById('ccm-cw'),ct=document.getElementById('ccm-ct'),cs=document.getElementById('ccm-cs');
  if(cw){
    cw.classList.add('pulse');setTimeout(function(){cw.classList.remove('pulse');},600);
    var cols=['rgba(200,169,80,0.9)','rgba(255,255,255,0.7)','rgba(100,180,255,0.8)','rgba(255,200,80,0.7)'];
    for(var p=0;p<14;p++){(function(pi){var pt=document.createElement('div');pt.className='cc2-pt';var a=(pi/14)*Math.PI*2,d=50+Math.random()*60;pt.style.cssText='background:'+cols[pi%4]+';--px:'+Math.round(Math.cos(a)*d)+'px;--py:'+Math.round(Math.sin(a)*d)+'px;animation-delay:'+(pi*0.03)+'s;width:'+(3+Math.random()*4)+'px;height:'+(3+Math.random()*4)+'px;';cw.appendChild(pt);setTimeout(function(){if(pt.parentNode)pt.parentNode.removeChild(pt);},1300);})(p);}
  }
  setTimeout(function(){if(ct)ct.classList.add('show');if(cs)cs.classList.add('show');},120);
  setTimeout(function(){
    if(ct)ct.classList.remove('show');
    if(cs)cs.classList.remove('show');
    setTimeout(function(){
      hideCharacterCreator();
      if(fromOnboarding){showCharacterCelebration(cfg);}
      else{renderProfilePanel();}
    },380);
  },2000);
}

// Legacy shims
function getSelectedAvatar(){return null;}
var AVATARS=[];


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


function showLaunchCinematic(onComplete) {
  var old = document.getElementById('launch-cinematic');
  if (old) old.remove();

  if (!document.getElementById('lc-styles')) {
    var st = document.createElement('style');
    st.id = 'lc-styles';
    st.textContent =
      '#launch-cinematic{position:fixed;inset:0;z-index:9999;background:#000;overflow:hidden;}' +
      '.lc-bar{position:absolute;left:0;right:0;z-index:20;background:#000;}' +
      '.lc-bt{top:0;height:13vh;}' +
      '.lc-bb{bottom:0;height:13vh;}' +
      '.lc-frame{position:absolute;top:13vh;bottom:13vh;left:0;right:0;overflow:hidden;}' +
      '.lc-scene{position:absolute;inset:0;opacity:0;transition:opacity 1s ease;}' +
      '.lc-scene.lc-on{opacity:1;}' +
      '.lc-scene.lc-cut{transition:none!important;}' +
      '.lc-cam{position:absolute;top:-8%;left:-8%;right:-8%;bottom:-8%;will-change:transform;}' +
      '.lc-vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 36%,rgba(0,0,0,0.82) 100%);pointer-events:none;z-index:8;}' +
      '.lc-skip{position:absolute;top:calc(13vh + 10px);right:14px;z-index:25;background:rgba(0,0,0,0.6);border:1px solid rgba(200,169,80,0.28);color:rgba(200,169,80,0.5);font-family:"Space Mono",monospace;font-size:9px;letter-spacing:2px;padding:5px 12px;cursor:pointer;border-radius:2px;}' +
      '.lc-skip:hover{color:#c8a96e;border-color:rgba(200,169,80,0.65);}' +
      '.lc-prog{position:absolute;bottom:13vh;left:0;right:0;height:2px;z-index:21;background:rgba(255,255,255,0.05);}' +
      '.lc-pf{height:2px;background:linear-gradient(to right,rgba(200,169,80,0.3),rgba(200,169,80,0.55));width:0%;transition:width 0.3s linear;}' +
      '.lc-cap{position:absolute;bottom:calc(13vh + 11px);left:50%;transform:translateX(-50%);white-space:nowrap;font-family:"Space Mono",monospace;font-size:8.5px;letter-spacing:3px;color:rgba(180,210,255,0.42);z-index:22;opacity:0;transition:opacity 1.3s;}' +
      '.lc-cap.lc-cap-on{opacity:1;}' +
      '@keyframes lc-pan-r{from{transform:translateX(0)}to{transform:translateX(-6%)}}' +
      '@keyframes lc-pan-l{from{transform:translateX(-3%)}to{transform:translateX(3%)}}' +
      '@keyframes lc-zoom{from{transform:scale(1)}to{transform:scale(1.12)}}' +
      '@keyframes lc-tilt{from{transform:translateY(4%)}to{transform:translateY(-4%)}}' +
      '@keyframes lc-zoom-big{from{transform:scale(1)}to{transform:scale(1.5)}}' +
      '@keyframes lc-shake{0%,100%{transform:translate(0,0)}8%{transform:translate(-5px,3px)}16%{transform:translate(4px,-4px)}24%{transform:translate(-4px,5px)}32%{transform:translate(5px,-3px)}40%{transform:translate(-3px,4px)}48%{transform:translate(4px,5px)}56%{transform:translate(-5px,-4px)}64%{transform:translate(3px,5px)}72%{transform:translate(-4px,-3px)}88%{transform:translate(3px,-4px)}}' +
      '@keyframes lc-walk{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}' +
      '@keyframes lc-flame{0%,100%{opacity:0.88;transform:scaleY(1) scaleX(1)}50%{opacity:1;transform:scaleY(1.28) scaleX(1.18)}}' +
      '@keyframes lc-smoke{0%{opacity:0.65;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-80px) scale(2.8)}}' +
      '@keyframes lc-warn{0%,100%{background:#0b0000}50%{background:#1a0000}}' +
      '@keyframes lc-warn-i{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.86)}}' +
      '@keyframes lc-cd{0%{opacity:0;transform:scale(0.5)}18%{opacity:1;transform:scale(1.1)}28%{transform:scale(1)}100%{opacity:1;transform:scale(1)}}' +
      '@keyframes lc-blink{0%,100%{opacity:1}50%{opacity:0.18}}' +
      '@keyframes lc-screen-on{0%{opacity:0}18%{opacity:0.35}22%{opacity:0.04}52%{opacity:0.9}58%{opacity:0.5}100%{opacity:1}}' +
      '@keyframes lc-twinkle{0%,100%{opacity:0.75}50%{opacity:0.15}}' +
      '@keyframes lc-drift{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-55px);opacity:0}}' +
      '@keyframes lc-pulse-r{0%{transform:translate(-50%,-50%) scale(0.4);opacity:0.9}100%{transform:translate(-50%,-50%) scale(3.2);opacity:0}}';
    document.head.appendChild(st);
  }

  function makeStars(n) {
    var out = '';
    for (var i = 0; i < n; i++) {
      var x = (Math.random() * 100).toFixed(1), y = (Math.random() * 68).toFixed(1);
      var sz = (Math.random() * 1.6 + 0.5).toFixed(1);
      var op = (0.3 + Math.random() * 0.55).toFixed(2);
      var spd = (2 + Math.random() * 3).toFixed(1), del = (Math.random() * 3.5).toFixed(1);
      out += '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + sz + 'px;height:' + sz + 'px;background:#fff;border-radius:50%;opacity:' + op + ';animation:lc-twinkle ' + spd + 's ease-in-out ' + del + 's infinite;"></div>';
    }
    return out;
  }

  var rkt =
    '<svg viewBox="0 0 60 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;filter:drop-shadow(0 0 10px rgba(180,210,255,0.18));">' +
    '<defs><linearGradient id="lcRg1" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#606898"/><stop offset="45%" stop-color="#b0bfd5"/><stop offset="100%" stop-color="#5868a0"/></linearGradient>' +
    '<linearGradient id="lcRg2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#cad6e8"/><stop offset="100%" stop-color="#8898b5"/></linearGradient></defs>' +
    '<rect x="18" y="55" width="24" height="90" rx="2" fill="url(#lcRg1)"/>' +
    '<path d="M30 8 L44 55 L16 55 Z" fill="url(#lcRg2)"/>' +
    '<path d="M30 8 L34 28 L26 28 Z" fill="#dce8f5"/>' +
    '<circle cx="30" cy="80" r="9" fill="#020c22" stroke="#6878a8" stroke-width="1.5"/>' +
    '<circle cx="30" cy="80" r="6" fill="#08185a" opacity="0.9"/>' +
    '<circle cx="27" cy="77" r="2" fill="rgba(160,210,255,0.32)"/>' +
    '<rect x="22" y="100" width="16" height="10" rx="1" fill="#b22234"/>' +
    '<rect x="22" y="100" width="16" height="3.3" fill="#f0f0f0"/>' +
    '<rect x="22" y="106.7" width="16" height="3.3" fill="#f0f0f0"/>' +
    '<rect x="22" y="100" width="7" height="7" fill="#3c3b6e"/>' +
    '<path d="M18 120 L4 155 L18 140 Z" fill="#6070a0"/>' +
    '<path d="M42 120 L56 155 L42 140 Z" fill="#6070a0"/>' +
    '<path d="M20 140 L16 155 L44 155 L40 140 Z" fill="#484858"/>' +
    '<ellipse cx="30" cy="155" rx="14" ry="3.5" fill="#383848"/>' +
    '<path d="M22 58 L25 138" stroke="rgba(255,255,255,0.11)" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  // Worker silhouette — lit from above by floodlights
  var wrkr =
    '<svg viewBox="0 0 28 52" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;" fill="rgba(80,108,158,0.82)">' +
    '<ellipse cx="14" cy="5" rx="12" ry="4.5"/>' +
    '<circle cx="14" cy="14" r="7"/>' +
    '<rect x="6" y="21" width="16" height="18" rx="2"/>' +
    '<rect x="0" y="22" width="7" height="3" rx="1.5"/><rect x="0" y="24" width="4" height="10" rx="2"/>' +
    '<rect x="21" y="22" width="7" height="3" rx="1.5"/><rect x="24" y="22" width="4" height="10" rx="2"/>' +
    '<rect x="7" y="39" width="5" height="13" rx="2.5"/><rect x="16" y="39" width="5" height="13" rx="2.5"/>' +
    '</svg>';

  // Astronaut silhouette — dark against warm dawn sky
  var astro =
    '<svg viewBox="0 0 30 56" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;" fill="rgba(6,10,20,0.95)">' +
    '<circle cx="15" cy="11" r="10"/>' +
    '<rect x="9" y="19" width="12" height="4" rx="2"/>' +
    '<rect x="3" y="23" width="24" height="21" rx="4"/>' +
    '<rect x="0" y="24" width="4" height="17" rx="2"/><rect x="26" y="24" width="4" height="17" rx="2"/>' +
    '<rect x="4" y="43" width="9" height="13" rx="3"/><rect x="17" y="43" width="9" height="13" rx="3"/>' +
    '</svg>';

  // HUD corner brackets (shared across scenes)
  var hud =
    '<div style="position:absolute;inset:0;pointer-events:none;z-index:11;">' +
    '<div style="position:absolute;top:6px;left:6px;width:20px;height:20px;border-top:1px solid rgba(200,169,80,0.38);border-left:1px solid rgba(200,169,80,0.38);"></div>' +
    '<div style="position:absolute;top:6px;right:6px;width:20px;height:20px;border-top:1px solid rgba(200,169,80,0.38);border-right:1px solid rgba(200,169,80,0.38);"></div>' +
    '<div style="position:absolute;bottom:6px;left:6px;width:20px;height:20px;border-bottom:1px solid rgba(200,169,80,0.38);border-left:1px solid rgba(200,169,80,0.38);"></div>' +
    '<div style="position:absolute;bottom:6px;right:6px;width:20px;height:20px;border-bottom:1px solid rgba(200,169,80,0.38);border-right:1px solid rgba(200,169,80,0.38);"></div>' +
    '</div>';

  // Subtle scan lines overlay
  var sl = '<div style="position:absolute;inset:0;background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,0.062) 3px,rgba(0,0,0,0.062) 4px);pointer-events:none;z-index:9;"></div>';

  // ── Scene 1: The Hangar ──────────────────────────────────────────────────
  var sc1 =
    '<div class="lc-scene" id="lcs-1">' +
    '<div class="lc-cam" style="animation:lc-pan-r 9s linear forwards;">' +
    '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,#010207 0%,#020410 45%,#060b1e 100%);">' +
    makeStars(38) +
    // Floodlight beams from upper area converging on rocket
    '<div style="position:absolute;top:0;left:22%;width:0;height:0;border-left:130px solid transparent;border-right:130px solid transparent;border-top:700px solid rgba(160,200,255,0.032);transform:translateX(-50%);pointer-events:none;"></div>' +
    '<div style="position:absolute;top:0;right:8%;width:0;height:0;border-left:95px solid transparent;border-right:95px solid transparent;border-top:600px solid rgba(160,200,255,0.025);transform:translateX(50%);pointer-events:none;"></div>' +
    // Floodlight source dots
    '<div style="position:absolute;top:2%;left:22%;width:8px;height:8px;background:rgba(200,225,255,0.95);border-radius:50%;box-shadow:0 0 14px rgba(180,210,255,0.9),0 0 28px rgba(180,210,255,0.45);transform:translateX(-50%);"></div>' +
    '<div style="position:absolute;top:2%;right:10%;width:6px;height:6px;background:rgba(200,225,255,0.85);border-radius:50%;box-shadow:0 0 10px rgba(180,210,255,0.75);"></div>' +
    // Ground platform
    '<div style="position:absolute;bottom:0;left:0;right:0;height:25%;background:linear-gradient(to bottom,#0b1220,#060d18);border-top:1px solid rgba(80,110,160,0.1);">' +
    '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:repeating-linear-gradient(90deg,rgba(200,169,80,0.26) 0,rgba(200,169,80,0.26) 24px,transparent 24px,transparent 52px);"></div>' +
    '</div>' +
    // Launch tower (structural silhouette)
    '<div style="position:absolute;bottom:24%;right:43%;width:8px;height:195px;background:rgba(35,48,72,0.85);">' +
    '<div style="position:absolute;top:10%;left:-14px;width:36px;height:2px;background:rgba(35,48,72,0.8);"></div>' +
    '<div style="position:absolute;top:30%;left:-10px;width:28px;height:2px;background:rgba(35,48,72,0.75);"></div>' +
    '<div style="position:absolute;top:52%;left:-14px;width:36px;height:2px;background:rgba(35,48,72,0.8);"></div>' +
    '<div style="position:absolute;top:74%;left:-10px;width:28px;height:2px;background:rgba(35,48,72,0.7);"></div>' +
    '</div>' +
    // Tower beacon (blinking red)
    '<div style="position:absolute;bottom:calc(24% + 197px);right:calc(43% - 1px);width:7px;height:7px;background:#ff2020;border-radius:50%;box-shadow:0 0 10px rgba(255,30,30,0.95);animation:lc-blink 1.3s ease-in-out infinite;"></div>' +
    // Rocket
    '<div style="position:absolute;bottom:24%;right:24%;width:78px;height:208px;">' + rkt + '</div>' +
    // Ambient ground glow below rocket
    '<div style="position:absolute;bottom:21%;right:16%;left:26%;height:5%;background:radial-gradient(ellipse at center,rgba(160,200,255,0.06),transparent);"></div>' +
    // Worker silhouettes at base
    '<div style="position:absolute;bottom:25%;right:51%;width:26px;height:50px;">' + wrkr + '</div>' +
    '<div style="position:absolute;bottom:25%;right:44%;width:24px;height:46px;">' + wrkr + '</div>' +
    '<div style="position:absolute;bottom:25%;right:14%;width:26px;height:50px;">' + wrkr + '</div>' +
    // Welding sparks
    '<div style="position:absolute;bottom:32%;right:47%;width:3px;height:3px;background:#ffcc22;border-radius:50%;animation:lc-drift 1.1s ease-out 0.2s infinite;"></div>' +
    '<div style="position:absolute;bottom:31%;right:49%;width:2px;height:2px;background:#ffaa00;border-radius:50%;animation:lc-drift 0.9s ease-out 0.7s infinite;"></div>' +
    '<div style="position:absolute;bottom:33%;right:46%;width:2px;height:2px;background:#ff8800;border-radius:50%;animation:lc-drift 1.3s ease-out 0.05s infinite;"></div>' +
    '</div></div>' +
    '<div class="lc-vig"></div>' +
    sl +
    // Text overlay OUTSIDE camera (never clips)
    '<div style="position:absolute;bottom:28%;left:5%;z-index:10;pointer-events:none;">' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:5px;color:rgba(200,169,80,0.58);margin-bottom:10px;">MISSION LOG — PRE-LAUNCH</div>' +
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:20px;color:#fff;text-shadow:0 0 28px rgba(180,210,255,0.2),0 2px 6px rgba(0,0,0,0.85);line-height:1.2;letter-spacing:1px;">THE FINAL<br>PREPARATION</div>' +
    '</div>' +
    hud +
    '</div>';

  // ── Scene 2: Control Room ─────────────────────────────────────────────────
  var monData = [
    { c: 'rgba(0,200,100,0.88)',  d: 'STATUS: GO\nFUEL: 100%\nVEL: 0.00',    delay: '0'   },
    { c: 'rgba(80,180,255,0.82)', d: 'ORBIT: SET\nHDG: 245°\nALT: LAUNCH', delay: '0.2' },
    { c: 'rgba(0,200,100,0.92)', d: 'CREW: OK\nO2: 100%\nPRESS: NOM',        delay: '0.4' },
    { c: 'rgba(200,185,90,0.78)', d: 'COMMS: GO\nSIG: STRONG\nENCR: ON',     delay: '0.6' },
    { c: 'rgba(60,220,180,0.8)',  d: 'THERM: OK\nRAD: LOW\nSYS: RDY',        delay: '0.8' }
  ];
  var monHtml = monData.map(function(m) {
    return '<div style="flex:1;max-width:17%;background:#040c1a;border:1px solid rgba(50,85,145,0.28);border-radius:2px;overflow:hidden;animation:lc-screen-on 0.5s ease ' + m.delay + 's forwards;opacity:0;">' +
      '<div style="padding:5% 8%;border-bottom:1px solid rgba(50,85,145,0.18);font-family:\'Space Mono\',monospace;font-size:5.5px;letter-spacing:2px;color:' + m.c + ';">NOMINAL</div>' +
      '<div style="padding:8%;font-family:\'Space Mono\',monospace;font-size:6.5px;color:' + m.c + ';line-height:1.9;white-space:pre;">' + m.d + '</div>' +
      '</div>';
  }).join('');

  var sc2 =
    '<div class="lc-scene" id="lcs-2">' +
    '<div class="lc-cam" style="animation:lc-pan-l 8s ease forwards;">' +
    '<div style="position:absolute;inset:0;background:#020508;">' +
    '<div style="position:absolute;top:0;left:0;right:0;height:10%;background:linear-gradient(to bottom,rgba(0,70,160,0.07),transparent);"></div>' +
    // Monitor bank
    '<div style="position:absolute;top:8%;left:2%;right:2%;display:flex;gap:2%;justify-content:center;">' + monHtml + '</div>' +
    // Console desk
    '<div style="position:absolute;bottom:0;left:0;right:0;height:44%;background:#030810;border-top:1px solid rgba(45,75,125,0.18);">' +
    // Operator silhouettes (rounded dark shapes, lit by screens)
    '<div style="position:absolute;top:5%;left:6%;width:36px;height:50px;background:rgba(12,22,42,0.92);border-radius:18px 18px 4px 4px;box-shadow:0 0 14px rgba(0,160,100,0.1);"></div>' +
    '<div style="position:absolute;top:5%;left:23%;width:36px;height:50px;background:rgba(12,22,42,0.92);border-radius:18px 18px 4px 4px;box-shadow:0 0 14px rgba(0,100,200,0.1);"></div>' +
    '<div style="position:absolute;top:5%;left:40%;width:36px;height:50px;background:rgba(12,22,42,0.92);border-radius:18px 18px 4px 4px;box-shadow:0 0 14px rgba(0,160,100,0.08);"></div>' +
    '<div style="position:absolute;top:5%;left:57%;width:36px;height:50px;background:rgba(12,22,42,0.92);border-radius:18px 18px 4px 4px;box-shadow:0 0 14px rgba(180,160,50,0.08);"></div>' +
    '<div style="position:absolute;top:5%;left:74%;width:36px;height:50px;background:rgba(12,22,42,0.92);border-radius:18px 18px 4px 4px;box-shadow:0 0 14px rgba(0,180,150,0.08);"></div>' +
    '</div>' +
    // GO/NO-GO checklist
    '<div style="position:absolute;top:58%;right:4%;font-family:\'Space Mono\',monospace;font-size:8px;text-align:right;line-height:2.1;">' +
    '<div style="color:rgba(200,169,80,0.6);letter-spacing:2px;margin-bottom:5px;">GO / NO-GO POLL</div>' +
    '<div style="color:rgba(0,220,100,0.82);">FLIGHT .................. GO ✓</div>' +
    '<div style="color:rgba(0,220,100,0.82);">GUIDANCE ................ GO ✓</div>' +
    '<div style="color:rgba(0,220,100,0.82);">PROPULSION .............. GO ✓</div>' +
    '<div style="color:rgba(0,220,100,0.82);">CREW SURGEON ............ GO ✓</div>' +
    '</div>' +
    '</div></div>' +
    '<div class="lc-vig"></div>' +
    sl +
    '<div style="position:absolute;top:8%;left:5%;z-index:10;pointer-events:none;">' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:4px;color:rgba(80,165,255,0.52);margin-bottom:9px;">MISSION CONTROL — HOUSTON, TX</div>' +
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:19px;color:#fff;text-shadow:0 0 24px rgba(80,165,255,0.18),0 2px 6px rgba(0,0,0,0.9);line-height:1.25;">GO / NO-GO<br>EVALUATION</div>' +
    '</div>' +
    hud +
    '</div>';

  // ── Scene 3: All Systems Go ───────────────────────────────────────────────
  var dotHtml = ['FLT','GDN','PROP','CRYO','COMM','CREW'].map(function(lbl, i) {
    return '<div style="font-family:\'Space Mono\',monospace;font-size:8.5px;color:rgba(0,220,100,0.75);display:flex;flex-direction:column;align-items:center;gap:5px;">' +
      '<div style="width:7px;height:7px;background:#00e068;border-radius:50%;box-shadow:0 0 9px rgba(0,220,100,0.9);animation:lc-blink ' + (0.8 + i * 0.3).toFixed(1) + 's ease-in-out infinite;"></div>' + lbl + '</div>';
  }).join('');

  var sc3 =
    '<div class="lc-scene" id="lcs-3">' +
    '<div class="lc-cam" style="animation:lc-zoom 6s ease forwards;">' +
    '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,#030e08 0%,#010503 100%);">' +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">' +
    // Chromatic aberration on title
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:52px;font-weight:900;color:#00e068;text-shadow:-3px 0 rgba(255,0,80,0.42),3px 0 rgba(0,240,220,0.42),0 0 42px rgba(0,220,100,0.92),0 0 90px rgba(0,220,100,0.45);letter-spacing:2px;line-height:1.05;">ALL<br>SYSTEMS<br>GO</div>' +
    '<div style="margin-top:5px;width:100%;height:1px;background:linear-gradient(to right,transparent,rgba(0,220,100,0.45),transparent);"></div>' +
    '<div style="margin-top:20px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">' + dotHtml + '</div>' +
    '</div>' +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;border:1px solid rgba(0,220,100,0.07);border-radius:50%;pointer-events:none;"></div>' +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:450px;height:450px;border:1px solid rgba(0,220,100,0.032);border-radius:50%;pointer-events:none;"></div>' +
    '</div></div>' +
    sl +
    hud +
    '</div>';

  // ── Scene 4: Crew Walking ─────────────────────────────────────────────────
  var sc4 =
    '<div class="lc-scene" id="lcs-4">' +
    '<div class="lc-cam" style="animation:lc-tilt 8s ease forwards;">' +
    '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,#05101e 0%,#0e1828 32%,#181f2e 58%,#1a1520 78%,#160c08 100%);">' +
    makeStars(20) +
    // Warm amber horizon glow
    '<div style="position:absolute;bottom:28%;left:0;right:0;height:20%;background:radial-gradient(ellipse at center bottom,rgba(255,125,38,0.24) 0%,rgba(200,75,18,0.08) 55%,transparent 100%);"></div>' +
    '<div style="position:absolute;bottom:29.5%;left:0;right:0;height:3%;background:linear-gradient(to top,rgba(255,155,55,0.18),transparent);"></div>' +
    // Ground
    '<div style="position:absolute;bottom:0;left:0;right:0;height:30%;background:linear-gradient(to bottom,#0c0b12,#05040a);border-top:1px solid rgba(255,115,38,0.1);"></div>' +
    // Walkway centre stripe
    '<div style="position:absolute;bottom:28%;left:45%;width:10%;height:30%;background:repeating-linear-gradient(to bottom,transparent 0,transparent 8px,rgba(200,169,80,0.12) 8px,rgba(200,169,80,0.12) 12px);"></div>' +
    // Distant tower silhouette (right side)
    '<div style="position:absolute;bottom:29%;right:18%;width:5px;height:135px;background:rgba(6,8,16,0.78);">' +
    '<div style="position:absolute;top:10%;left:-11px;width:27px;height:2px;background:rgba(6,8,16,0.7);"></div>' +
    '<div style="position:absolute;top:36%;left:-8px;width:21px;height:2px;background:rgba(6,8,16,0.65);"></div>' +
    '<div style="position:absolute;top:62%;left:-11px;width:27px;height:2px;background:rgba(6,8,16,0.7);"></div>' +
    '</div>' +
    // Rocket silhouette (distant, backlit)
    '<div style="position:absolute;bottom:29%;right:10%;width:32px;height:92px;opacity:0.62;">' + rkt + '</div>' +
    // Astronaut silhouettes walking
    '<div style="position:absolute;bottom:30%;left:4%;width:36px;height:56px;animation:lc-walk 0.55s ease-in-out infinite;">' + astro + '</div>' +
    '<div style="position:absolute;bottom:29.5%;left:21%;width:33px;height:52px;animation:lc-walk 0.55s ease-in-out 0.18s infinite;">' + astro + '</div>' +
    '<div style="position:absolute;bottom:30%;left:37%;width:34px;height:54px;animation:lc-walk 0.55s ease-in-out 0.09s infinite;">' + astro + '</div>' +
    '</div></div>' +
    '<div class="lc-vig"></div>' +
    sl +
    '<div style="position:absolute;top:8%;left:5%;z-index:10;pointer-events:none;">' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:4px;color:rgba(200,169,80,0.55);margin-bottom:9px;">T-MINUS 00:15:00</div>' +
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:19px;color:#fff;text-shadow:0 0 28px rgba(255,140,50,0.18),0 2px 6px rgba(0,0,0,0.9);line-height:1.25;">CREW SUITED<br>AND READY</div>' +
    '</div>' +
    '<div style="position:absolute;top:8%;right:5%;z-index:10;pointer-events:none;text-align:right;">' +
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:26px;color:rgba(200,169,80,0.65);text-shadow:0 0 16px rgba(200,169,80,0.38);">🚀</div>' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:3px;color:rgba(200,169,80,0.5);margin-top:4px;">ARES-7</div>' +
    '</div>' +
    hud +
    '</div>';

  // ── Scene 5: Countdown ────────────────────────────────────────────────────
  var sc5 =
    '<div class="lc-scene" id="lcs-5">' +
    '<div class="lc-cam" id="lc-cam-5" style="animation:lc-zoom-big 12s ease forwards;">' +
    '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,#030608 0%,#010205 100%);">' +
    makeStars(55) +
    '<div style="position:absolute;bottom:15%;right:32%;width:46px;height:132px;opacity:0.3;">' + rkt + '</div>' +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8.5px;letter-spacing:5px;color:rgba(200,169,80,0.62);margin-bottom:16px;">LAUNCH SEQUENCE INITIATED</div>' +
    '<div id="lc-cd-ring" style="position:absolute;top:50%;left:50%;width:130px;height:130px;border:1px solid rgba(255,255,255,0.35);border-radius:50%;pointer-events:none;"></div>' +
    '<div id="lc-cd-num" style="position:relative;font-family:\'Orbitron\',sans-serif;font-size:110px;font-weight:900;color:#fff;text-shadow:0 0 38px rgba(255,255,255,0.62),0 0 72px rgba(180,210,255,0.32),-2px 0 rgba(255,50,100,0.28),2px 0 rgba(50,220,200,0.28);min-width:140px;display:inline-block;line-height:1;"></div>' +
    '<div style="margin-top:12px;font-family:\'Space Mono\',monospace;font-size:8.5px;letter-spacing:4px;color:rgba(180,210,255,0.4);">T-MINUS</div>' +
    '</div>' +
    '<div style="position:absolute;bottom:10%;left:50%;transform:translateX(-50%);display:flex;gap:20px;font-family:\'Space Mono\',monospace;font-size:7.5px;white-space:nowrap;">' +
    '<span style="color:rgba(0,220,100,0.7);">IGNITION ■</span>' +
    '<span style="color:rgba(0,220,100,0.7);">THRUST ■</span>' +
    '<span style="color:rgba(0,220,100,0.7);">GUIDANCE ■</span>' +
    '</div>' +
    '</div></div>' +
    sl +
    hud +
    '</div>';

  // ── Scene 6: Ignition ─────────────────────────────────────────────────────
  var sc6 =
    '<div class="lc-scene" id="lcs-6">' +
    '<div class="lc-cam" id="lc-cam-6">' +
    '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,#010205 0%,#040709 40%,#100a04 80%,#1c0e02 100%);">' +
    makeStars(40) +
    // Pre-ignition engine warmup glow
    '<div id="lc-eng-glow" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:220px;height:220px;background:radial-gradient(ellipse at center bottom,rgba(255,130,0,0.22) 0%,rgba(255,70,0,0.07) 45%,transparent 72%);"></div>' +
    // Rocket (lit from below — clearly visible from scene start)
    '<div id="lc-rkt-w" style="position:absolute;bottom:18%;left:50%;transform:translateX(-50%);width:78px;height:205px;filter:drop-shadow(0 0 10px rgba(255,120,0,0.28)) drop-shadow(0 0 3px rgba(180,210,255,0.15));">' + rkt + '</div>' +
    // Launch platform base
    '<div style="position:absolute;bottom:14%;left:28%;right:28%;height:5%;background:#0c0f14;border-top:1px solid rgba(100,95,70,0.18);"></div>' +
    // Flame layers
    '<div id="lc-flm-w" style="position:absolute;bottom:13%;left:50%;transform:translateX(-50%);width:82px;">' +
    '<div style="width:72px;height:98px;background:linear-gradient(to bottom,rgba(255,148,0,0.96),rgba(255,58,0,0.68),transparent);animation:lc-flame 0.13s ease-in-out infinite;border-radius:0 0 36px 36px;margin:0 auto;"></div>' +
    '<div style="position:absolute;top:10px;left:15px;width:44px;height:76px;background:linear-gradient(to bottom,rgba(255,232,50,0.98),rgba(255,148,0,0.72),transparent);animation:lc-flame 0.1s ease-in-out 0.04s infinite;border-radius:0 0 24px 24px;"></div>' +
    '<div style="position:absolute;top:22px;left:26px;width:22px;height:54px;background:linear-gradient(to bottom,rgba(255,255,215,1),rgba(255,232,50,0.92),transparent);animation:lc-flame 0.08s ease-in-out 0.065s infinite;border-radius:0 0 12px 12px;"></div>' +
    '</div>' +
    // Smoke clouds
    '<div style="position:absolute;bottom:9%;left:10%;width:95px;height:72px;background:radial-gradient(ellipse,rgba(138,132,122,0.65),transparent);animation:lc-smoke 2s ease-out infinite;"></div>' +
    '<div style="position:absolute;bottom:7%;left:28%;width:118px;height:92px;background:radial-gradient(ellipse,rgba(118,115,108,0.55),transparent);animation:lc-smoke 2.5s ease-out 0.5s infinite;"></div>' +
    '<div style="position:absolute;bottom:6%;right:16%;width:82px;height:67px;background:radial-gradient(ellipse,rgba(128,122,112,0.55),transparent);animation:lc-smoke 2.2s ease-out 0.85s infinite;"></div>' +
    // Ground
    '<div style="position:absolute;bottom:0;left:0;right:0;height:18%;background:#060808;border-top:1px solid rgba(80,72,52,0.18);"></div>' +
    // Orange bloom on ground from fire
    '<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:320px;height:90px;background:radial-gradient(ellipse at center bottom,rgba(255,115,0,0.16),transparent);"></div>' +
    // Flash overlay
    '<div id="lc-flash" style="position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;"></div>' +
    '</div></div>' +
    sl +
    '<div style="position:absolute;top:8%;left:50%;transform:translateX(-50%);z-index:10;pointer-events:none;text-align:center;white-space:nowrap;">' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8.5px;letter-spacing:5px;color:rgba(255,152,48,0.84);">MAIN ENGINE START</div>' +
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:26px;color:#fff;margin-top:8px;text-shadow:0 0 30px rgba(255,145,48,0.72),-2px 0 rgba(255,0,50,0.32),2px 0 rgba(255,200,0,0.32);">IGNITION</div>' +
    '</div>' +
    hud +
    '</div>';

  // ── Scene 7: Cut to Black ─────────────────────────────────────────────────
  var sc7 = '<div class="lc-scene lc-cut" id="lcs-7" style="background:#000;"></div>';

  // ── Scene 8: Warning ──────────────────────────────────────────────────────
  var sc8 =
    '<div class="lc-scene lc-cut" id="lcs-8">' +
    '<div style="position:absolute;inset:0;animation:lc-warn 1.1s ease-in-out infinite;">' +
    '<div style="position:absolute;inset:0;border:2px solid transparent;animation:lc-warn 1.1s ease-in-out infinite;"></div>' +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;padding:0 16px;width:100%;">' +
    '<div style="font-size:70px;line-height:1;animation:lc-warn-i 1.1s ease-in-out infinite;">⚠️</div>' +
    '<div style="font-family:\'Orbitron\',sans-serif;font-size:24px;font-weight:900;color:#ff1e1e;text-shadow:0 0 26px rgba(255,28,28,0.92),-2px 0 rgba(255,0,0,0.48),2px 0 rgba(255,95,0,0.48);margin:14px 0 6px;letter-spacing:3px;">LAUNCH FAILURE</div>' +
    '<div style="width:75%;height:1px;background:rgba(255,28,28,0.28);margin:0 auto 14px;"></div>' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:10px;color:rgba(255,75,75,0.8);letter-spacing:2px;margin-bottom:20px;">CRITICAL FAULT DETECTED</div>' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:9px;color:rgba(255,128,128,0.56);line-height:2.1;">' +
    'NAVIGATION SYSTEMS .......... OFFLINE<br>' +
    'GUIDANCE MODULE ............. CORRUPTED<br>' +
    'ABORT SEQUENCE .............. INITIATED<br>' +
    'MANUAL OVERRIDE ............. REQUIRED' +
    '</div>' +
    '<div style="margin-top:20px;font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:3px;color:rgba(255,75,75,0.36);animation:lc-blink 1.8s ease-in-out infinite;">AWAITING TECHNICIAN RESPONSE...</div>' +
    '</div></div>' +
    sl +
    '</div>';

  // ── Scene 9: Mission Report ───────────────────────────────────────────────
  var sc9 =
    '<div class="lc-scene" id="lcs-9">' +
    '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,#050f1d 0%,#01040a 100%);">' +
    makeStars(20) +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:88%;max-width:445px;">' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:5px;color:rgba(200,169,80,0.62);margin-bottom:14px;">ARES-7 // MISSION REPORT</div>' +
    '<div style="width:100%;height:1px;background:linear-gradient(to right,transparent,rgba(200,169,80,0.32),transparent);margin-bottom:18px;"></div>' +
    '<div style="font-family:\'Space Mono\',monospace;font-size:10px;color:rgba(175,210,255,0.74);line-height:2;margin-bottom:22px;">' +
    'The navigation module failed at ignition.<br>The rocket is secured on the launch pad.<br><br>' +
    'The fault is buried deep in the guidance code —<br>a critical error ground control cannot reach.<br><br>' +
    '<span style="color:rgba(200,169,80,0.9);font-style:italic;">You are the last option.</span><br>' +
    'Find the fault. Debug the systems.<br>Complete the launch sequence manually.' +
    '</div>' +
    '<div style="width:100%;height:1px;background:linear-gradient(to right,transparent,rgba(200,169,80,0.2),transparent);margin-bottom:24px;"></div>' +
    '<button onclick="_lcBegin()" style="font-family:\'Orbitron\',sans-serif;font-size:11px;letter-spacing:4px;color:#c8a96e;background:transparent;border:1px solid rgba(200,169,80,0.42);padding:14px 38px;cursor:pointer;display:block;margin:0 auto;border-radius:2px;" onmouseover="this.style.background=\'rgba(200,169,80,0.08)\';this.style.borderColor=\'rgba(200,169,80,0.7)\';this.style.boxShadow=\'0 0 22px rgba(200,169,80,0.18)\'" onmouseout="this.style.background=\'transparent\';this.style.borderColor=\'rgba(200,169,80,0.42)\';this.style.boxShadow=\'none\'">BEGIN MISSION</button>' +
    '</div>' +
    '</div>' +
    '<div class="lc-vig"></div>' +
    sl +
    hud +
    '</div>';

  // ── Build overlay ─────────────────────────────────────────────────────────
  var wrap = document.createElement('div');
  wrap.id = 'launch-cinematic';
  wrap.innerHTML =
    '<div class="lc-bar lc-bt"></div>' +
    '<div class="lc-bar lc-bb"></div>' +
    '<div class="lc-frame">' + sc1 + sc2 + sc3 + sc4 + sc5 + sc6 + sc7 + sc8 + sc9 + '</div>' +
    '<div class="lc-prog"><div class="lc-pf" id="lc-pf"></div></div>' +
    '<div class="lc-cap" id="lc-cap"></div>' +
    '<button class="lc-skip" id="lc-skip">SKIP ►</button>';
  document.body.appendChild(wrap);

  var _timers = [], _intervals = [], _done = false;

  function finish() {
    if (_done) return;
    _done = true;
    _timers.forEach(function(t) { clearTimeout(t); });
    _intervals.forEach(function(iv) { clearInterval(iv); });
    window._lcBegin = null;
    var lc = document.getElementById('launch-cinematic');
    if (lc) {
      lc.style.transition = 'opacity 0.65s';
      lc.style.opacity = '0';
      setTimeout(function() { if (lc.parentNode) lc.remove(); if (onComplete) onComplete(); }, 650);
    } else {
      if (onComplete) onComplete();
    }
  }

  window._lcBegin = finish;
  var skipBtn = document.getElementById('lc-skip');
  if (skipBtn) skipBtn.addEventListener('click', finish);

  var capEl = document.getElementById('lc-cap');
  function showCap(text, afterMs) {
    if (!capEl) return;
    capEl.classList.remove('lc-cap-on');
    var t = setTimeout(function() {
      if (_done || !capEl) return;
      capEl.textContent = text;
      if (text) capEl.classList.add('lc-cap-on');
    }, afterMs || 0);
    _timers.push(t);
  }

  var el1 = document.getElementById('lcs-1');
  if (el1) el1.classList.add('lc-on');
  showCap('LAUNCH COMPLEX 39A — T-MINUS 48 HOURS', 800);

  var _total = 9000 + 8000 + 6000 + 8000 + 12000 + 7000 + 2000 + 7000;
  var _start = Date.now();
  var _pi = setInterval(function() {
    if (_done) { clearInterval(_pi); return; }
    var pf = document.getElementById('lc-pf');
    if (pf) pf.style.width = Math.min(100, ((Date.now() - _start) / _total) * 100).toFixed(1) + '%';
  }, 200);
  _intervals.push(_pi);

  var tl = [
    [1, 2, 9000,  false, '',    'MISSION CONTROL — HOUSTON, TEXAS'],
    [2, 3, 17000, false, '',    ''],
    [3, 4, 23000, false, '',    'CREW ACCESS ARM — T-MINUS 15 MINUTES'],
    [4, 5, 31000, false, 'cd',  ''],
    [5, 6, 43000, false, 'ign', ''],
    [6, 7, 50000, true,  '',    ''],
    [7, 8, 52000, true,  '',    ''],
    [8, 9, 59000, false, '',    ''],
  ];

  tl.forEach(function(entry) {
    var fi = entry[0], ti = entry[1], when = entry[2], isCut = entry[3], camKey = entry[4], cap = entry[5];
    var t = setTimeout(function() {
      if (_done) return;
      var from = document.getElementById('lcs-' + fi);
      if (from) { if (isCut) from.classList.add('lc-cut'); from.classList.remove('lc-on'); }
      var lag = isCut ? 80 : 500;
      var t2 = setTimeout(function() {
        if (_done) return;
        var to = document.getElementById('lcs-' + ti);
        if (to) { if (isCut) to.classList.add('lc-cut'); to.classList.add('lc-on'); }
        if (cap) showCap(cap, 600);
        if (camKey === 'cd') startCountdown();
        if (camKey === 'ign') startIgnition();
      }, lag);
      _timers.push(t2);
    }, when);
    _timers.push(t);
  });

  function startCountdown() {
    var n = 10;
    var cdEl = document.getElementById('lc-cd-num');
    var cdRing = document.getElementById('lc-cd-ring');
    if (!cdEl) return;
    function showN(num) {
      if (_done) return;
      cdEl.style.animation = 'none';
      void cdEl.offsetHeight;
      cdEl.style.animation = 'lc-cd 0.28s ease forwards';
      cdEl.textContent = num;
      if (cdRing) {
        cdRing.style.animation = 'none';
        void cdRing.offsetHeight;
        cdRing.style.animation = 'lc-pulse-r 0.9s ease-out forwards';
      }
    }
    showN(n);
    var iv = setInterval(function() {
      if (_done) { clearInterval(iv); return; }
      n--;
      if (n <= 0) { clearInterval(iv); return; }
      showN(n);
    }, 980);
    _intervals.push(iv);
  }

  function startIgnition() {
    var flash = document.getElementById('lc-flash');
    if (flash) {
      flash.style.opacity = '0.82';
      var tf = setTimeout(function() {
        if (flash) { flash.style.transition = 'opacity 1.4s'; flash.style.opacity = '0'; }
      }, 80);
      _timers.push(tf);
    }
    var engGlow = document.getElementById('lc-eng-glow');
    if (engGlow) {
      engGlow.style.transition = 'all 0.4s ease';
      engGlow.style.width = '420px';
      engGlow.style.height = '380px';
    }
    var rw = document.getElementById('lc-rkt-w');
    var fw = document.getElementById('lc-flm-w');
    var tr = setTimeout(function() {
      if (_done) return;
      if (rw) { rw.style.transition = 'transform 5.5s cubic-bezier(0.06,0.25,0.15,1)'; rw.style.transform = 'translateX(-50%) translateY(-360px)'; }
      if (fw) { fw.style.transition = 'transform 5.5s cubic-bezier(0.06,0.25,0.15,1)'; fw.style.transform = 'translateX(-50%) translateY(-360px)'; }
    }, 300);
    _timers.push(tr);
    var cam6 = document.getElementById('lc-cam-6');
    if (cam6) {
      cam6.style.animation = 'lc-shake 0.28s ease-in-out infinite';
      var ts = setTimeout(function() { if (cam6) cam6.style.animation = 'none'; }, 1900);
      _timers.push(ts);
    }
  }
}


function launchGame(gameId) {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  if (gameId === 'launch-sequence' && !arguments[1]) {
    showLaunchCinematic(function() { launchGame(gameId, true); });
    return;
  }
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
          '<div class="glitch-stat" id="chaos-timer-stat"><span class="glitch-stat-lbl">TIME</span><span class="glitch-stat-val" id="chaos-timer-val">90</span></div>' +
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
  var ccConfig = getCharacterConfig();
  var ccHasChar = !!localStorage.getItem('codebook_character');
  var selectedAv = null;

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
        '<div class="pf-avatar-frame" style="width:54px;height:70px;overflow:visible;cursor:pointer;" onclick="showCharacterCreator()">' +
          (ccHasChar ? buildCharacterSVG(ccConfig, 54, 70) : '<div class="prof-av-silhouette" style="width:38px;height:52px;margin:0 auto;border:1px dashed rgba(255,255,255,0.15);border-radius:4px;"></div>') +
        '</div>' +
        '<div class="pf-avatar-btns">' +
          '<button class="pf-avatar-btn" onclick="showCharacterCreator()">' + (ccHasChar ? 'EDIT' : 'CREATE') + '</button>' +
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
      '<div class="pf-stat-cell"><div class="pf-stat-n">' + _streakVal() + '</div><div class="pf-stat-k">DAY STREAK</div></div>' +
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

// ============================================================
// ARCADE PANEL — Interactive Zone (replaces Premium)
// ============================================================
var BOSS_CHALLENGES = [
  { floor: 0, subtitle: 'Understanding Before Touching', questions: [
    { q: 'What does HTTP stand for?', opts: ['HyperText Transfer Protocol','Hyper Transfer Text Process','High Text Transfer Port','HyperType Transport Protocol'], correct: 0 },
    { q: "What is a browser's primary job?", opts: ['Store data on servers','Request, receive, and display web content','Run JavaScript on servers','Write HTML files'], correct: 1 },
    { q: 'What does a variable do in code?', opts: ['Runs a set of instructions','Stores a piece of information with a name','Styles a webpage','Connects to the internet'], correct: 1 },
    { q: 'What does an "if" statement do?', opts: ['Repeats code multiple times','Stores data for later','Runs code only when a condition is true','Connects two pieces of data'], correct: 2 },
    { q: 'Which of these is a loop?', opts: ['if (score > 10) { win(); }','let name = "Alice";','for (let i = 0; i < 5; i++) { draw(); }','function greet() {}'], correct: 2 }
  ]},
  { floor: 1, subtitle: 'Seeing It Come Alive', questions: [
    { q: 'What does HTML stand for?', opts: ['HyperText Markup Language','Hyperlink Text Making Language','High Transfer Markup Language','HyperType Module Language'], correct: 0 },
    { q: 'What does a CSS selector target?', opts: ['A server request','A JavaScript function','An HTML element to style','A database entry'], correct: 2 },
    { q: 'What CSS property makes text bold?', opts: ['text-weight: bold','font-bold: true','font-weight: bold','bold: font'], correct: 2 },
    { q: 'What does the div tag do?', opts: ['Creates a hyperlink','Displays an image','Plays a video','Groups HTML elements into a block'], correct: 3 },
    { q: 'What does "display: flex" do?', opts: ['Makes an element transparent','Removes an element','Creates a flexible layout container','Applies a bold font'], correct: 2 }
  ]},
  { floor: 2, subtitle: 'JavaScript Fundamentals', questions: [
    { q: 'How do you declare a variable in JavaScript?', opts: ['var name = "Alice";','variable name = "Alice";','let: name = "Alice";','store name = "Alice";'], correct: 0 },
    { q: 'What does a function do?', opts: ['Styles a webpage','Groups reusable code that runs when called','Connects to a database','Stores a number'], correct: 1 },
    { q: 'What does console.log() do?', opts: ['Saves data to a file','Sends a request to a server','Prints output to the developer console','Runs a loop'], correct: 2 },
    { q: 'Which starts a comment in JavaScript?', opts: ['#','/* only','// or /* */','--'], correct: 2 },
    { q: 'What is an array?', opts: ['A type of loop','An ordered list of values','A CSS rule','A server function'], correct: 1 }
  ]},
  { floor: 3, subtitle: 'Data & Collections', questions: [
    { q: 'What does array.length return?', opts: ['The last item','The first item','The number of items','The sum of all items'], correct: 2 },
    { q: 'What does array.push() do?', opts: ['Removes the last item','Adds an item to the end','Sorts the array','Returns the first item'], correct: 1 },
    { q: 'How do you get the first element of array "items"?', opts: ['items[1]','items.first()','items[0]','items.get(0)'], correct: 2 },
    { q: 'What is an object in JavaScript?', opts: ['A type of loop','A key-value pair data structure','A CSS class','An HTML element'], correct: 1 },
    { q: 'How do you access property "age" on object "person"?', opts: ['person->age','person::age','person.age','person[age]'], correct: 2 }
  ]},
  { floor: 4, subtitle: 'Events & The DOM', questions: [
    { q: 'What does DOM stand for?', opts: ['Document Object Model','Data Object Method','Display Output Module','Dynamic Object Manager'], correct: 0 },
    { q: 'What does document.getElementById() do?', opts: ['Creates a new element','Deletes an element','Finds an element by ID','Changes the page title'], correct: 2 },
    { q: 'What event fires when a user clicks a button?', opts: ['hover','keypress','load','click'], correct: 3 },
    { q: 'How do you attach a click handler to an element?', opts: ['element.onHover = fn','element.addEventListener("click", fn)','element.click()','element.trigger("click")'], correct: 1 },
    { q: 'What does innerHTML let you do?', opts: ['Load a new page','Change the font size','Read or write HTML inside an element','Set the element ID'], correct: 2 }
  ]},
  { floor: 5, subtitle: 'APIs & Fetch', questions: [
    { q: 'What does API stand for?', opts: ['Application Programming Interface','Automated Process Input','Advanced Program Integration','Application Protocol Interface'], correct: 0 },
    { q: 'What does fetch() do?', opts: ['Stores data in localStorage','Makes a network request to a URL','Runs a CSS animation','Creates an HTML element'], correct: 1 },
    { q: 'What format do most APIs use to send data?', opts: ['CSV','XML','JSON','HTML'], correct: 2 },
    { q: 'What does HTTP status code 404 mean?', opts: ['Server error','Unauthorised','Resource not found','Request successful'], correct: 2 },
    { q: 'What is a Promise in JavaScript?', opts: ['A type of HTML element','A CSS animation','An object representing a future value','A server-side script'], correct: 2 }
  ]},
  { floor: 6, subtitle: 'Full Stack Foundations', questions: [
    { q: 'What is version control used for?', opts: ['Styling HTML pages','Making API requests','Tracking changes to code over time','Running JavaScript in the browser'], correct: 2 },
    { q: 'What does "git commit" do?', opts: ['Uploads code to GitHub','Saves a snapshot of your changes','Creates a new branch','Deletes old code'], correct: 1 },
    { q: 'What is the difference between front-end and back-end?', opts: ['Front-end runs on servers, back-end in browsers','Front-end is what users see, back-end is server logic','Front-end uses Python, back-end uses JavaScript','There is no difference'], correct: 1 },
    { q: 'What does "npm install" do?', opts: ['Starts a server','Downloads project dependencies','Compiles JavaScript','Pushes code to GitHub'], correct: 1 },
    { q: 'What is a database used for?', opts: ['Styling web pages','Running animations','Storing and retrieving structured data','Making API requests'], correct: 2 }
  ]}
];

var PG_EXAMPLES = {
  hello:    '// Hello World\nconsole.log("Hello, world!");\nconsole.log("Welcome to The Code Book!");',
  loop:     '// For Loop\nfor (var i = 1; i <= 5; i++) {\n  console.log("Number: " + i);\n}\nconsole.log("Loop complete!");',
  fn:       '// Functions\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("Alice"));\nconsole.log(greet("Bob"));',
  array:    '// Arrays\nvar fruits = ["apple", "banana", "cherry"];\nconsole.log("Total: " + fruits.length);\nfruits.forEach(function(f) {\n  console.log("- " + f);\n});',
  object:   '// Objects\nvar person = { name: "Alice", age: 28, role: "Developer" };\nconsole.log(person.name + " is " + person.age);\nconsole.log("Role: " + person.role);'
};

var _arcadeTab = 'playground';
var _bossActive = null;

function renderPremiumPanel() {
  var panel = document.getElementById('panel-premium');
  if (!panel) return;
  if (!state.bossResults) state.bossResults = {};
  panel.innerHTML =
    '<div class="arcade-root">' +
      '<div class="arcade-header">' +
        '<div class="arcade-header-label">INTERACTIVE ZONE</div>' +
        '<div class="arcade-header-title">Arcade</div>' +
        '<div class="arcade-header-sub">Code, compete, and prove what you know.</div>' +
      '</div>' +
      '<div class="arcade-tabs">' +
        '<button class="arcade-tab-btn' + (_arcadeTab==='playground'?' active':'') + '" onclick="setArcadeTab(\'playground\',this)">🎨 Studio</button>' +
        '<button class="arcade-tab-btn' + (_arcadeTab==='boss'?' active':'') + '" onclick="setArcadeTab(\'boss\',this)">⚔ Boss Challenges</button>' +
        '<button class="arcade-tab-btn' + (_arcadeTab==='leaderboard'?' active':'') + '" onclick="setArcadeTab(\'leaderboard\',this)">🏆 Leaderboard</button>' +
        '<button class="arcade-tab-btn' + (_arcadeTab==='badges'?' active':'') + '" onclick="setArcadeTab(\'badges\',this)">🏅 Badges</button>' +
      '</div>' +
      '<div class="arcade-tab-content" id="arcade-tab-content"></div>' +
    '</div>';
  _renderArcadeTabContent(_arcadeTab);
}

function setArcadeTab(tab, btn) {
  _arcadeTab = tab;
  var btns = document.querySelectorAll('.arcade-tab-btn');
  Array.prototype.forEach.call(btns, function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  _renderArcadeTabContent(tab);
}

function _renderArcadeTabContent(tab) {
  var el = document.getElementById('arcade-tab-content');
  if (!el) return;
  if (tab === 'playground')  { el.innerHTML = _studioPickerHtml(); }
  else if (tab === 'boss')   { el.innerHTML = _bossHtml(); }
  else if (tab === 'leaderboard') { el.innerHTML = _lbTabHtml(); _loadLbTab(); }
  else if (tab === 'badges') { el.innerHTML = _badgesTabHtml(); }
}

// ─────────── Playground ───────────
function _pgHtml() {
  return '<div class="pg-root">' +
    '<div class="pg-toolbar-top">' +
      '<span class="pg-label">JavaScript Playground</span>' +
      '<select class="pg-examples-select" onchange="loadPgExample(this.value);this.value=\'\';">' +
        '<option value="">Load example…</option>' +
        '<option value="hello">Hello World</option>' +
        '<option value="loop">For Loop</option>' +
        '<option value="fn">Functions</option>' +
        '<option value="array">Arrays</option>' +
        '<option value="object">Objects</option>' +
      '</select>' +
    '</div>' +
    '<div class="pg-editor-wrap">' +
      '<textarea id="pg-editor" class="pg-editor" spellcheck="false" autocorrect="off" autocapitalize="off">console.log("Hello, world!");</textarea>' +
    '</div>' +
    '<div class="pg-toolbar-bottom">' +
      '<button class="pg-run-btn" onclick="runPlayground()">&#9654; Run</button>' +
      '<button class="pg-clear-btn" onclick="clearPgOutput()">&#10005; Clear</button>' +
      '<span class="pg-hint">Use console.log() to print</span>' +
    '</div>' +
    '<div class="pg-output-wrap">' +
      '<div class="pg-output-label">OUTPUT</div>' +
      '<div id="pg-output" class="pg-output"><div class="pg-output-empty">Run your code to see output here.</div></div>' +
    '</div>' +
  '</div>';
}

function _initPlayground() {
  var ed = document.getElementById('pg-editor');
  if (ed && state.playgroundCode) ed.value = state.playgroundCode;
  if (ed) {
    ed.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = this.selectionStart;
        this.value = this.value.substring(0, s) + '  ' + this.value.substring(this.selectionEnd);
        this.selectionStart = this.selectionEnd = s + 2;
      }
    });
  }
}

function loadPgExample(key) {
  if (!key || !PG_EXAMPLES[key]) return;
  var ed = document.getElementById('pg-editor');
  if (ed) ed.value = PG_EXAMPLES[key];
  clearPgOutput();
}

function clearPgOutput() {
  var out = document.getElementById('pg-output');
  if (out) out.innerHTML = '<div class="pg-output-empty">Run your code to see output here.</div>';
}

function runPlayground() {
  var ed = document.getElementById('pg-editor');
  if (!ed) return;
  var code = ed.value;
  var out = document.getElementById('pg-output');
  if (!out) return;
  state.playgroundCode = code;
  out.innerHTML = '';
  if (!state.badgeFlags) state.badgeFlags = {};
  if (!state.badgeFlags.playgroundUsed) {
    state.badgeFlags.playgroundUsed = true;
    saveState();
    checkAndUnlockBadges();
  }
  if (window._pgMsgH) window.removeEventListener('message', window._pgMsgH);
  window._pgMsgH = function(e) {
    if (!e.data || e.data._src !== 'pg') return;
    if (e.data.type === 'log' || e.data.type === 'warn') {
      var line = document.createElement('div');
      line.className = 'pg-log';
      line.textContent = e.data.text;
      out.appendChild(line);
    } else if (e.data.type === 'error') {
      var line = document.createElement('div');
      line.className = 'pg-error';
      line.textContent = '⚠ ' + e.data.text;
      out.appendChild(line);
    } else if (e.data.type === 'done') {
      window.removeEventListener('message', window._pgMsgH);
      var f = document.getElementById('pg-sandbox');
      if (f) f.remove();
      if (!out.children.length) out.innerHTML = '<div class="pg-output-empty">No output — use console.log() to print values.</div>';
    }
  };
  window.addEventListener('message', window._pgMsgH);
  var old = document.getElementById('pg-sandbox');
  if (old) old.remove();
  var iframe = document.createElement('iframe');
  iframe.id = 'pg-sandbox';
  iframe.sandbox = 'allow-scripts';
  iframe.style.display = 'none';
  var safe = code.replace(/<\/script>/gi, '<\\/script>');
  iframe.srcdoc = '<!DOCTYPE html><html><body><script>(function(){' +
    'var _c={' +
    'log:function(){var t=[].slice.call(arguments).map(function(a){try{return typeof a==="object"?JSON.stringify(a):String(a);}catch(e){return String(a);}}).join(" ");parent.postMessage({_src:"pg",type:"log",text:t},"*");},' +
    'warn:function(){var t=[].slice.call(arguments).map(String).join(" ");parent.postMessage({_src:"pg",type:"warn",text:"⚠ "+t},"*");},' +
    'error:function(){var t=[].slice.call(arguments).map(String).join(" ");parent.postMessage({_src:"pg",type:"error",text:t},"*");}' +
    '};try{(function(console){' + safe + '}(_c));}catch(e){parent.postMessage({_src:"pg",type:"error",text:e.message},"*");}' +
    'parent.postMessage({_src:"pg",type:"done"},"*");' +
    '})();<\/script></body></html>';
  document.body.appendChild(iframe);
  setTimeout(function() {
    window.removeEventListener('message', window._pgMsgH);
    var f = document.getElementById('pg-sandbox');
    if (f) f.remove();
  }, 6000);
}

// ─────────── Creation Studio ───────────
var _studioFilter = 'all';
var _studioCurrentId = null;

function _studioPickerHtml() {
  if (typeof STUDIO_TEMPLATES === 'undefined') return '<div class="st-empty">Templates loading…</div>';
  var cats = ['all','website','app','game','animation','widget'];
  var labels = {all:'All',website:'Website',app:'App',game:'Game',animation:'Animation',widget:'Widget'};
  var html = '<div class="st-root">' +
    '<div class="st-header"><div class="st-title">Creation Studio</div>' +
    '<div class="st-sub">Pick a template. Edit the highlighted section. Click Run to see it live.</div></div>' +
    '<div class="st-cats">' +
    cats.map(function(c){return '<button class="st-cat'+(_studioFilter===c?' active':'')+'" onclick="studioFilter(\''+c+'\',this)">'+labels[c]+'</button>';}).join('') +
    '</div><div class="st-grid" id="st-grid">' + _studioGridHtml() + '</div>';
  var saved = state.studioCreations || [];
  if (saved.length) {
    html += '<div class="st-saved-section"><div class="st-saved-title">My Creations <span class="st-saved-count">'+saved.length+'</span></div>' +
      '<div class="st-saved-grid">' +
      saved.map(function(c,i){
        return '<div class="st-saved-card">' +
          '<div class="st-saved-icon">'+(c.icon||'📄')+'</div>' +
          '<div class="st-saved-name">'+escHtml(c.name)+'</div>' +
          '<div class="st-saved-cat">'+((c.category||'').toUpperCase())+'</div>' +
          '<div class="st-saved-actions">' +
            '<button class="st-saved-open" onclick="openSavedCreation('+i+')">Open</button>' +
            '<button class="st-saved-del" onclick="deleteSavedCreation('+i+')">×</button>' +
          '</div></div>';
      }).join('') + '</div></div>';
  }
  return html + '</div>';
}

function _studioGridHtml() {
  var tpls = (window.STUDIO_TEMPLATES || []).filter(function(t){return _studioFilter==='all'||t.category===_studioFilter;});
  if (!tpls.length) return '<div class="st-empty">No templates in this category yet.</div>';
  var catCol = {website:'#7dd3fc',app:'#4ade80',game:'#f472b6',animation:'#a78bfa',widget:'#f59e0b'};
  return tpls.map(function(t){
    var col = catCol[t.category]||'#c8a96e';
    return '<div class="st-card" onclick="openStudioTemplate(\''+t.id+'\')" style="--tc:'+col+'">' +
      '<div class="st-card-icon">'+t.icon+'</div>' +
      '<div class="st-card-cat">'+t.category.toUpperCase()+'</div>' +
      '<div class="st-card-name">'+t.name+'</div>' +
      '<div class="st-card-desc">'+t.desc+'</div>' +
      '<div class="st-card-cta">Open →</div></div>';
  }).join('');
}

function studioFilter(cat, el) {
  _studioFilter = cat;
  document.querySelectorAll('.st-cat').forEach(function(b){b.classList.remove('active');});
  if (el) el.classList.add('active');
  var g = document.getElementById('st-grid'); if (g) g.innerHTML = _studioGridHtml();
}

function _studioEditorHtml(t, code, savedName) {
  var catCol = {website:'#7dd3fc',app:'#4ade80',game:'#f472b6',animation:'#a78bfa',widget:'#f59e0b'};
  var col = catCol[t ? t.category : ''] || '#c8a96e';
  var cat = t ? t.category : '';
  var title = savedName || (t ? t.name : '');
  var tips = (t && t.tips) ? t.tips : [];

  var tipsHtml = tips.length
    ? '<div class="st-tips"><span class="st-tips-icon">💡</span>' + tips.map(function(tip){return '<span class="st-tip">'+tip+'</span>';}).join('') + '</div>'
    : '';

  return '<div class="st-edit-root">' +
    '<div class="st-edit-bar">' +
      '<button class="st-back-btn" onclick="backToStudio()">← Studio</button>' +
      '<div class="st-edit-title">'+escHtml(title)+'</div>' +
      '<div class="st-edit-badge" style="color:'+col+';border-color:'+col+'">'+cat.toUpperCase()+'</div>' +
    '</div>' +
    '<div class="st-split">' +
      '<div class="st-code-pane">' +
        '<div class="st-code-hint">✏️  Edit between the ══ markers, then click Run</div>' +
        '<textarea class="st-textarea" id="st-editor" spellcheck="false"></textarea>' +
      '</div>' +
      '<div class="st-preview-pane"><iframe id="st-iframe" sandbox="allow-scripts" frameborder="0"></iframe></div>' +
    '</div>' +
    '<div class="st-actions">' +
      '<button class="st-btn st-btn-run" onclick="runStudio()">▶ Run</button>' +
      '<button class="st-btn st-btn-save" onclick="saveStudio()">💾 Save</button>' +
      '<button class="st-btn st-btn-dl" onclick="downloadStudio()">⬇ Download</button>' +
      '<button class="st-btn st-btn-reset" onclick="resetStudio()">↺ Reset</button>' +
      '<button class="st-btn st-cs-open-btn" onclick="openCheatSheet()">📋 Cheat Sheet</button>' +
    '</div>' +
    (tipsHtml ? '<div class="st-helpers">'+tipsHtml+'</div>' : '') +
    _cheatSheetHtml() +
  '</div>';
}

function openStudioTemplate(id) {
  var t = (window.STUDIO_TEMPLATES||[]).find(function(x){return x.id===id;});
  if (!t) return;
  _studioCurrentId = id;
  var el = document.getElementById('arcade-tab-content'); if (!el) return;
  el.innerHTML = _studioEditorHtml(t, t.code, null);
  _studioInitEditor(t.code);
  runStudio();
}

function _studioInitEditor(code) {
  var ed = document.getElementById('st-editor'); if (!ed) return;
  ed.value = code;
  ed.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') { e.preventDefault(); var s=this.selectionStart; this.value=this.value.substring(0,s)+'  '+this.value.substring(this.selectionEnd); this.selectionStart=this.selectionEnd=s+2; }
  });
  var idx = code.indexOf('✏️'); if (idx === -1) idx = code.indexOf('EDIT HERE');
  if (idx > -1) { var lines = code.substring(0, idx).split('\n').length - 2; setTimeout(function(){ed.scrollTop = lines * 19;}, 60); }
}

function runStudio() {
  var ed = document.getElementById('st-editor'), fr = document.getElementById('st-iframe');
  if (!ed || !fr) return;
  fr.srcdoc = ed.value;
}

function saveStudio() {
  var ed = document.getElementById('st-editor'); if (!ed) return;
  var t = (window.STUDIO_TEMPLATES||[]).find(function(x){return x.id===_studioCurrentId;});
  var defaultName = t ? t.name : 'My Creation';
  var name = prompt('Name your creation:', defaultName); if (!name) return;
  if (!state.studioCreations) state.studioCreations = [];
  if (state.studioCreations.length >= 20) { alert('Max 20 creations saved. Delete one first.'); return; }
  state.studioCreations.push({ name: name, templateId: _studioCurrentId, category: t?t.category:'', icon: t?t.icon:'📄', code: ed.value, savedAt: new Date().toISOString() });
  saveState();
  var btn = document.querySelector('.st-btn-save');
  if (btn) { btn.textContent = '✓ Saved'; setTimeout(function(){btn.textContent='💾 Save';}, 1600); }
}

function downloadStudio() {
  var ed = document.getElementById('st-editor'); if (!ed) return;
  var t = (window.STUDIO_TEMPLATES||[]).find(function(x){return x.id===_studioCurrentId;});
  var name = (t ? t.name : 'creation').toLowerCase().replace(/\s+/g,'-');
  var blob = new Blob([ed.value], {type:'text/html'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name+'.html'; a.click(); URL.revokeObjectURL(a.href);
}

function resetStudio() {
  var t = (window.STUDIO_TEMPLATES||[]).find(function(x){return x.id===_studioCurrentId;});
  if (!t) return;
  if (!confirm('Reset to the original template? Your edits will be lost.')) return;
  var ed = document.getElementById('st-editor'); if (ed) ed.value = t.code;
  runStudio();
}

function backToStudio() {
  _studioCurrentId = null;
  var el = document.getElementById('arcade-tab-content');
  if (el) el.innerHTML = _studioPickerHtml();
}

function openSavedCreation(idx) {
  var saved = (state.studioCreations||[])[idx]; if (!saved) return;
  _studioCurrentId = saved.templateId || null;
  var t = _studioCurrentId ? (window.STUDIO_TEMPLATES||[]).find(function(x){return x.id===_studioCurrentId;}) : null;
  var el = document.getElementById('arcade-tab-content'); if (!el) return;
  el.innerHTML = _studioEditorHtml(t||{category:saved.category||'',name:saved.name}, saved.code, saved.name);
  _studioInitEditor(saved.code);
  runStudio();
}

function deleteSavedCreation(idx) {
  if (!confirm('Delete this creation?')) return;
  if (state.studioCreations) { state.studioCreations.splice(idx, 1); saveState(); }
  backToStudio();
}

function _cheatSheetHtml() {
  /* ── Curated palettes ── */
  var palettes = [
    { name: 'Ocean',         swatches: ['#00c8ff','#0066ff','#00e5b0'] },
    { name: 'Ember',         swatches: ['#ff6b35','#ff4757','#ffa502'] },
    { name: 'Neon Night',    swatches: ['#9b5de5','#f15bb5','#00bbf9'] },
    { name: 'Gold Standard', swatches: ['#f5c842','#e8a000','#fff3b0'] },
    { name: 'Void',          swatches: ['#ffffff','#94a3b8','#475569'] }
  ];
  /* ── Individual colours ── */
  var colours = [
    {name:'Mint',      hex:'#00ff88'},{name:'Sky Blue',  hex:'#7dd3fc'},
    {name:'Violet',    hex:'#a78bfa'},{name:'Amber',     hex:'#f59e0b'},
    {name:'Pink',      hex:'#f472b6'},{name:'Coral',     hex:'#ff6b6b'},
    {name:'Indigo',    hex:'#6366f1'},{name:'Teal',      hex:'#2dd4bf'},
    {name:'Orange',    hex:'#fb923c'},{name:'Fuchsia',   hex:'#e879f9'},
    {name:'Lime',      hex:'#4ade80'},{name:'Red',       hex:'#ef4444'},
    {name:'Yellow',    hex:'#fbbf24'},{name:'White',     hex:'#ffffff'},
    {name:'Silver',    hex:'#94a3b8'},{name:'Dark Navy', hex:'#0f172a'}
  ];
  var rgbas = [
    {name:'Faint white',   val:'rgba(255,255,255,0.1)'},
    {name:'Light overlay', val:'rgba(255,255,255,0.25)'},
    {name:'Dark overlay',  val:'rgba(0,0,0,0.5)'},
    {name:'Mint glow',     val:'rgba(0,255,136,0.4)'},
    {name:'Red glow',      val:'rgba(255,48,80,0.5)'},
    {name:'Sky glow',      val:'rgba(125,211,252,0.4)'},
    {name:'Gold glow',     val:'rgba(251,191,36,0.45)'},
    {name:'Purple glow',   val:'rgba(167,139,250,0.4)'}
  ];
  /* ── Quick tweaks per template ── */
  var groups = [
    { label: 'Developer Portfolio', tweaks: [
      { want: 'Change your name',       code: 'var NAME',        eg: '"Your Name"'           },
      { want: 'Change your title',      code: 'var ROLE',        eg: '"Full-Stack Dev"'      },
      { want: 'Change accent colour',   code: 'var ACCENT',      eg: '"#7dd3fc"'             },
      { want: 'Edit skills list',       code: 'var SKILLS',      eg: '["HTML","CSS","JS"]'   },
      { want: 'Change button text',     code: 'var CTA',         eg: '"See My Work →"'       }
    ]},
    { label: 'Product Launch Page', tweaks: [
      { want: 'Change the headline',    code: 'var HEADLINE',    eg: '"Your Big Idea"'       },
      { want: 'Change the subtitle',    code: 'var SUB',         eg: '"One clear sentence."' },
      { want: 'Change button text',     code: 'var CTA_TEXT',    eg: '"Try It Free →"'       },
      { want: 'Add a feature (4th)',    code: 'FEATURES array',  eg: '{ icon:"🚀", title:"...", desc:"..." }' }
    ]},
    { label: 'Particle Web', tweaks: [
      { want: 'More particles',         code: 'var COUNT',       eg: '120  (range: 40–200)'  },
      { want: 'Slower movement',        code: 'var SPEED',       eg: '0.3  (range: 0.3–1.5)'},
      { want: 'Longer connections',     code: 'var CONNECT',     eg: '160  (range: 80–180)'  },
      { want: 'Change colour',          code: 'var COLOR',       eg: '"#a78bfa"'             }
    ]},
    { label: 'Pomodoro Timer', tweaks: [
      { want: 'Longer focus sessions',  code: 'var FOCUS_MINS',  eg: '45'                    },
      { want: 'Shorter breaks',         code: 'var BREAK_MINS',  eg: '3'                     },
      { want: 'Focus ring colour',      code: 'var FOCUS_COLOR', eg: '"#f59e0b"'             },
      { want: 'Break ring colour',      code: 'var BREAK_COLOR', eg: '"#00e5b0"'             }
    ]},
    { label: 'Habit Tracker', tweaks: [
      { want: 'Change habit name',      code: 'var HABIT',       eg: '"Morning Run"'         },
      { want: 'Show more weeks',        code: 'var WEEKS',       eg: '8  (range: 4–8)'       },
      { want: 'Change colour',          code: 'var COLOR',       eg: '"#f472b6"'             }
    ]},
    { label: 'Space Shooter', tweaks: [
      { want: 'Faster bullets',         code: 'var BULLET_SPEED',eg: '12  (range: 6–14)'    },
      { want: 'Tougher enemies',        code: 'var ENEMY_SPEED', eg: '3   (range: 1–4)'     },
      { want: 'Change bullet colour',   code: 'var BULLET_COLOR',eg: '"#fbbf24"'             },
      { want: 'Change enemy colour',    code: 'var ENEMY_COLOR', eg: '"#e879f9"'             }
    ]},
    { label: 'Dodge', tweaks: [
      { want: 'Bigger player',          code: 'var PLAYER_SIZE', eg: '20  (range: 10–22)'   },
      { want: 'Faster movement',        code: 'var PLAYER_SPEED',eg: '7   (range: 3–8)'     },
      { want: 'Taller obstacles',       code: 'var OBSTACLE_H',  eg: '24  (range: 12–28)'   },
      { want: 'Change player colour',   code: 'var PLAYER_COLOR',eg: '"#7dd3fc"'             },
      { want: 'Change background',      code: 'var BG_COLOR',    eg: '"#000000"'             }
    ]}
  ];
  /* ── Troubleshooting ── */
  var fixes = [
    { prob: 'Run fails straight away',     sol: 'Check for a missing comma inside an array or object' },
    { prob: 'Nothing changes on screen',   sol: 'Make sure you\'re editing inside the EDIT HERE zone' },
    { prob: 'Output looks broken',         sol: 'All text values must be inside quote marks ""'       },
    { prob: 'Page goes blank',             sol: 'Undo your last change and try one edit at a time'    },
    { prob: 'Bracket error in console',    sol: 'Every { needs a }   every [ needs a ]'               },
    { prob: 'Colour not working',          sol: 'Hex codes must start with # — e.g. #00ff88'          }
  ];

  /* ── Build HTML blocks ── */
  var palHtml = palettes.map(function(p) {
    var dots = p.swatches.map(function(hex) {
      var safe = hex.replace(/'/g,'\\\'');
      return '<div class="st-cs-pal-item" onclick="copyCheatItem(\''+safe+'\',this)" title="Copy '+hex+'">' +
        '<div class="st-cs-pal-dot" style="background:'+hex+'"></div>' +
        '<span class="st-cs-pal-hex">'+hex+'</span>' +
      '</div>';
    }).join('');
    return '<div class="st-cs-palette-wrap">' +
      '<div class="st-cs-palette-label">'+p.name+'</div>' +
      '<div class="st-cs-pal-swatches">'+dots+'</div>' +
    '</div>';
  }).join('');

  var cRows = colours.map(function(c) {
    return '<div class="st-cs-row">' +
      '<span class="st-cs-swatch" style="background:'+c.hex+'"></span>' +
      '<span class="st-cs-name">'+c.name+'</span>' +
      '<code class="st-cs-val">'+c.hex+'</code>' +
      '<button class="st-cs-copy" onclick="copyCheatItem(\''+c.hex+'\',this)">⎘ Copy</button>' +
    '</div>';
  }).join('');

  var rRows = rgbas.map(function(r) {
    var safe = r.val.replace(/'/g,'\\\'');
    return '<div class="st-cs-row">' +
      '<span class="st-cs-swatch" style="background:'+r.val+';border:1px solid rgba(255,255,255,0.18)"></span>' +
      '<span class="st-cs-name">'+r.name+'</span>' +
      '<code class="st-cs-val">'+r.val+'</code>' +
      '<button class="st-cs-copy" onclick="copyCheatItem(\''+safe+'\',this)">⎘ Copy</button>' +
    '</div>';
  }).join('');

  var tipHtml = [
    'Put a comma after every item in an array — <strong>except the last one</strong>',
    'Keep text values inside quote marks — <code>&quot;like this&quot;</code>',
    'Don\'t delete the <code>var</code> keyword at the start of a line',
    'Only change values <strong>inside</strong> the EDIT HERE zone',
    'Numbers don\'t need quotes — <code>var COUNT = 80</code> not <code>&quot;80&quot;</code>',
    'Colour codes must start with <code>#</code> — e.g. <code>#00ff88</code>'
  ].map(function(t) {
    return '<div class="st-cs-tip"><span style="font-size:13px;flex-shrink:0;padding-top:1px;">✅</span>' +
      '<span class="st-cs-tip-text">'+t+'</span></div>';
  }).join('');

  var tweakHtml = groups.map(function(g) {
    var rows = g.tweaks.map(function(t) {
      return '<div class="st-cs-tweak-row">' +
        '<div class="st-cs-tweak-if">If you want: '+t.want+'</div>' +
        '<div class="st-cs-tweak-then">Change <code>'+t.code+'</code> to <code>'+t.eg+'</code></div>' +
      '</div>';
    }).join('');
    return '<div><div class="st-cs-tweak-group-label">'+g.label+'</div>'+rows+'</div>';
  }).join('');

  var fixHtml = fixes.map(function(f) {
    return '<div class="st-cs-fix-row">' +
      '<span class="st-cs-fix-prob">✖ '+f.prob+'</span>' +
      '<span class="st-cs-fix-arrow">→</span>' +
      '<span class="st-cs-fix-sol">✔ '+f.sol+'</span>' +
    '</div>';
  }).join('');

  return '<div id="st-cheatsheet" class="st-cs-overlay" style="display:none" onclick="closeCheatSheet()">' +
    '<div class="st-cs-panel" onclick="event.stopPropagation()">' +
      '<div class="st-cs-header">' +
        '<span class="st-cs-title">📋 Cheat Sheet</span>' +
        '<button class="st-cs-close" onclick="closeCheatSheet()">✕</button>' +
      '</div>' +
      '<div class="st-cs-tabs">' +
        '<button class="st-cs-tab-btn st-cs-tab-active" onclick="_csTab(this,\'st-tab-colours\')">🎨 Colours</button>' +
        '<button class="st-cs-tab-btn" onclick="_csTab(this,\'st-tab-tips\')">✅ Best Practices</button>' +
        '<button class="st-cs-tab-btn" onclick="_csTab(this,\'st-tab-tweaks\')">⚡ Quick Tweaks</button>' +
        '<button class="st-cs-tab-btn" onclick="_csTab(this,\'st-tab-fixes\')">🔧 Troubleshooting</button>' +
      '</div>' +
      '<div class="st-cs-body">' +
        '<div id="st-tab-colours" class="st-cs-tab-content" style="display:block">' +
          '<p class="st-cs-desc">Click any swatch or Copy button to grab the value.</p>' +
          '<div class="st-cs-section">🖌️ Curated Palettes — click any swatch to copy</div>' +
          palHtml +
          '<div class="st-cs-section">🎨 Individual Colours</div>' +
          cRows +
          '<div class="st-cs-section">🌫️ Transparent &amp; Glow</div>' +
          rRows +
        '</div>' +
        '<div id="st-tab-tips" class="st-cs-tab-content" style="display:none">' +
          '<p class="st-cs-desc">Follow these rules to keep your code running cleanly.</p>' +
          tipHtml +
        '</div>' +
        '<div id="st-tab-tweaks" class="st-cs-tab-content" style="display:none">' +
          '<p class="st-cs-desc">Find your template below for instant customisation tips.</p>' +
          tweakHtml +
        '</div>' +
        '<div id="st-tab-fixes" class="st-cs-tab-content" style="display:none">' +
          '<p class="st-cs-desc">Run button not working? Start here.</p>' +
          fixHtml +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function _csTab(btn, tabId) {
  var panel = btn.closest('.st-cs-panel');
  panel.querySelectorAll('.st-cs-tab-content').forEach(function(t) { t.style.display = 'none'; });
  panel.querySelectorAll('.st-cs-tab-btn').forEach(function(b) { b.classList.remove('st-cs-tab-active'); });
  var tab = document.getElementById(tabId);
  if (tab) tab.style.display = 'block';
  btn.classList.add('st-cs-tab-active');
}

function openCheatSheet() {
  var el = document.getElementById('st-cheatsheet');
  if (el) el.style.display = 'flex';
}

function closeCheatSheet() {
  var el = document.getElementById('st-cheatsheet');
  if (el) el.style.display = 'none';
}

function copyCheatItem(text, btn) {
  function flash() {
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = '✓ Copied';
    btn.classList.add('st-cs-copied');
    setTimeout(function() { btn.textContent = orig; btn.classList.remove('st-cs-copied'); }, 1200);
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(flash);
  } else {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    flash();
  }
}

function studioInsertColor(hex, btn) {
  var ed = document.getElementById('st-editor');
  if (!ed) { if (navigator.clipboard) navigator.clipboard.writeText(hex); return; }
  var s = ed.selectionStart, e = ed.selectionEnd;
  ed.value = ed.value.substring(0, s) + hex + ed.value.substring(e);
  ed.selectionStart = ed.selectionEnd = s + hex.length;
  ed.focus();
  if (btn) {
    btn.style.outline = '2px solid rgba(255,255,255,0.85)';
    btn.style.transform = 'scale(1.3)';
    setTimeout(function() { btn.style.outline = ''; btn.style.transform = ''; }, 350);
  }
  runStudio();
}

// ─────────── Boss Challenges ───────────
function _bossHtml() {
  if (!state.bossResults) state.bossResults = {};
  var html = '<div class="boss-root">' +
    '<div class="boss-intro">' +
      '<div class="boss-intro-title">Floor Boss Challenges</div>' +
      '<div class="boss-intro-sub">Complete a floor to unlock its boss. Answer 4 out of 5 correctly to pass and earn 150 XP.</div>' +
    '</div><div class="boss-grid">';
  BOSS_CHALLENGES.forEach(function(bc) {
    var done = typeof isFloorComplete === 'function' && isFloorComplete(bc.floor);
    var res = state.bossResults[bc.floor];
    var passed = res && res.passed;
    var fc = (typeof FLOORS !== 'undefined' && FLOORS[bc.floor]) ? FLOORS[bc.floor].color : '#c8a96e';
    var statusClass = passed ? 'boss-card-passed' : (done ? 'boss-card-available' : 'boss-card-locked');
    var badge = passed
      ? '<span class="boss-status-badge boss-status-pass">✓ PASSED — ' + res.score + '/5</span>'
      : (done
        ? '<span class="boss-status-badge boss-status-avail">CHALLENGE READY</span>'
        : '<span class="boss-status-badge boss-status-lock">🔒 Complete Floor ' + (bc.floor + 1) + ' First</span>');
    html += '<div class="boss-card ' + statusClass + '" style="--bc:' + fc + '"' +
      (done && !passed ? ' onclick="startBossChallenge(' + bc.floor + ')"' : '') + '>' +
      '<div class="boss-card-floor">FLOOR ' + (bc.floor + 1) + '</div>' +
      '<div class="boss-card-title">' + bc.subtitle + '</div>' +
      badge +
      (done && !passed ? '<button class="boss-start-btn">Start Challenge →</button>' : '') +
      (passed ? '<button class="boss-retry-btn" onclick="event.stopPropagation();startBossChallenge(' + bc.floor + ')">Retry</button>' : '') +
    '</div>';
  });
  html += '</div></div>';
  return html;
}

function startBossChallenge(fi) {
  var bc = BOSS_CHALLENGES[fi];
  if (!bc) return;
  if (_bossActive && _bossActive.interval) clearInterval(_bossActive.interval);
  var qs = bc.questions.slice();
  for (var i = qs.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = qs[i]; qs[i] = qs[j]; qs[j] = tmp;
  }
  _bossActive = { fi: fi, qs: qs, qi: 0, answers: [], timerSecs: 90, interval: null };
  _showBossModal(fi);
  _renderBossQ();
  _bossActive.interval = setInterval(function() {
    _bossActive.timerSecs--;
    var el = document.getElementById('boss-timer');
    var m = Math.floor(_bossActive.timerSecs / 60);
    var s = _bossActive.timerSecs % 60;
    if (el) { el.textContent = m + ':' + (s < 10 ? '0' : '') + s; }
    if (_bossActive.timerSecs <= 10 && el) el.classList.add('boss-timer-urgent');
    if (_bossActive.timerSecs <= 0) { clearInterval(_bossActive.interval); _finishBoss(); }
  }, 1000);
}

function _showBossModal(fi) {
  var ex = document.getElementById('boss-overlay');
  if (ex) ex.remove();
  var ov = document.createElement('div');
  ov.id = 'boss-overlay';
  ov.className = 'boss-overlay';
  ov.innerHTML = '<div class="boss-modal">' +
    '<button class="boss-modal-close" onclick="closeBossChallenge()">✕</button>' +
    '<div class="boss-modal-header">' +
      '<div class="boss-modal-label">FLOOR ' + (fi + 1) + ' BOSS CHALLENGE</div>' +
      '<div class="boss-modal-timer" id="boss-timer">1:30</div>' +
    '</div>' +
    '<div class="boss-modal-progress" id="boss-progress"></div>' +
    '<div id="boss-modal-body"></div>' +
  '</div>';
  document.body.appendChild(ov);
  setTimeout(function() { ov.classList.add('boss-overlay--open'); }, 20);
}

function _renderBossQ() {
  if (!_bossActive) return;
  var body = document.getElementById('boss-modal-body');
  var prog = document.getElementById('boss-progress');
  if (!body) return;
  var q = _bossActive.qs[_bossActive.qi];
  if (prog) {
    prog.innerHTML = _bossActive.qs.map(function(_, i) {
      return '<span class="boss-dot' + (i < _bossActive.qi ? ' bp-done' : i === _bossActive.qi ? ' bp-current' : '') + '"></span>';
    }).join('');
  }
  body.innerHTML =
    '<div class="boss-q-num">Question ' + (_bossActive.qi + 1) + ' of ' + _bossActive.qs.length + '</div>' +
    '<div class="boss-question">' + (typeof escHtml === 'function' ? escHtml(q.q) : q.q) + '</div>' +
    '<div class="boss-opts">' +
      q.opts.map(function(opt, i) {
        return '<button class="boss-opt" onclick="answerBoss(' + i + ')">' +
          '<span class="boss-opt-letter">' + 'ABCD'[i] + '</span>' +
          (typeof escHtml === 'function' ? escHtml(opt) : opt) +
        '</button>';
      }).join('') +
    '</div>';
}

function answerBoss(idx) {
  if (!_bossActive) return;
  var q = _bossActive.qs[_bossActive.qi];
  var correct = idx === q.correct;
  _bossActive.answers.push({ correct: correct });
  var opts = document.querySelectorAll('.boss-opt');
  Array.prototype.forEach.call(opts, function(btn, i) {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('boss-opt-correct');
    if (i === idx && !correct) btn.classList.add('boss-opt-wrong');
  });
  setTimeout(function() {
    _bossActive.qi++;
    if (_bossActive.qi >= _bossActive.qs.length) _finishBoss();
    else _renderBossQ();
  }, 600);
}

function _finishBoss() {
  if (!_bossActive) return;
  if (_bossActive.interval) clearInterval(_bossActive.interval);
  var score = _bossActive.answers.filter(function(a) { return a.correct; }).length;
  var passed = score >= 4;
  var fi = _bossActive.fi;
  if (!state.bossResults) state.bossResults = {};
  if (passed || !state.bossResults[fi]) state.bossResults[fi] = { passed: passed, score: score };
  saveState();
  if (passed) { if (typeof awardXP === 'function') awardXP(150, 'boss-' + fi, window.innerWidth / 2, 200); checkAndUnlockBadges(); }
  var body = document.getElementById('boss-modal-body');
  var prog = document.getElementById('boss-progress');
  if (prog) prog.innerHTML = '';
  if (body) {
    body.innerHTML = '<div class="boss-result">' +
      '<div class="boss-result-icon">' + (passed ? '🏆' : '💀') + '</div>' +
      '<div class="boss-result-title">' + (passed ? 'CHALLENGE PASSED!' : 'CHALLENGE FAILED') + '</div>' +
      '<div class="boss-result-score">' + score + ' / 5 correct</div>' +
      (passed ? '<div class="boss-result-xp">+150 XP awarded</div>' : '<div class="boss-result-retry">Need 4/5 to pass. Try again!</div>') +
      '<div class="boss-result-btns">' +
        '<button class="boss-result-btn" onclick="closeBossChallenge()">' + (passed ? 'Back to Arcade' : 'Close') + '</button>' +
        (!passed ? '<button class="boss-result-btn boss-result-btn-retry" onclick="startBossChallenge(' + fi + ')">Retry →</button>' : '') +
      '</div></div>';
  }
  _bossActive = null;
}

function closeBossChallenge() {
  if (_bossActive && _bossActive.interval) clearInterval(_bossActive.interval);
  _bossActive = null;
  var ov = document.getElementById('boss-overlay');
  if (ov) { ov.classList.remove('boss-overlay--open'); setTimeout(function() { if (ov.parentElement) ov.remove(); }, 300); }
  if (_arcadeTab === 'boss') { var el = document.getElementById('arcade-tab-content'); if (el) el.innerHTML = _bossHtml(); }
}

// ─────────── Leaderboard tab ───────────
function _lbTabHtml() {
  return '<div class="lb-tab-root">' +
    '<div class="lb-tab-intro">Top learners ranked by total XP. Powered by The Code Book community.</div>' +
    '<div id="lb-tab-list" class="lb-tab-list"><div class="lb-tab-loading">Loading rankings…</div></div>' +
  '</div>';
}

async function _loadLbTab() {
  var list = document.getElementById('lb-tab-list');
  if (!list) return;
  try {
    if (!window.sb) throw new Error('no client');
    var result = await window.sb.from('profiles').select('username,xp,streak,level').order('xp', { ascending: false }).limit(20);
    var rows = result.data;
    if (!rows || !rows.length) { list.innerHTML = '<div class="lb-tab-empty">No entries yet — be the first!</div>'; return; }
    var myXp = state ? (state.xp || 0) : 0;
    var medals = ['🥇','🥈','🥉'];
    var myRank = -1;
    rows.forEach(function(r, i) { if (r.xp === myXp && myRank === -1) myRank = i; });
    list.innerHTML = rows.map(function(r, i) {
      var isMe = i === myRank;
      var floorLabel = r.level ? 'Floor ' + r.level : '';
      return '<div class="lb-row' + (isMe ? ' lb-row-me' : '') + '">' +
        '<div class="lb-rank">' + (medals[i] || (i + 1)) + '</div>' +
        '<div class="lb-info">' +
          '<div class="lb-name">' + (typeof escHtml === 'function' ? escHtml(r.username || 'Anonymous') : (r.username || 'Anonymous')) + (isMe ? ' (you)' : '') + '</div>' +
          '<div class="lb-streak">🔥 ' + (r.streak || 0) + ' day streak' + (floorLabel ? ' · ' + floorLabel : '') + '</div>' +
        '</div>' +
        '<div class="lb-xp">' + (r.xp || 0) + '<span class="lb-xp-label"> XP</span></div>' +
      '</div>';
    }).join('');
  } catch(e) {
    list.innerHTML = '<div class="lb-tab-empty">Could not load leaderboard.</div>';
  }
}

// ─────────── Badges tab ───────────
function _badgesTabHtml() {
  if (typeof BADGES === 'undefined') return '<div class="lb-tab-empty">Badges not loaded.</div>';
  var earned = state.earnedBadges || [];
  return '<div class="bgt-root">' +
    '<div class="bgt-intro">Earn badges by hitting milestones. ' + earned.length + ' of ' + BADGES.length + ' unlocked.</div>' +
    '<div class="bgt-grid">' +
      BADGES.map(function(b) {
        var u = earned.indexOf(b.id) !== -1;
        return '<div class="bgt-card ' + (u ? 'bgt-unlocked' : 'bgt-locked') + '">' +
          '<div class="bgt-emoji">' + (u ? b.emoji : '🔒') + '</div>' +
          '<div class="bgt-name">' + b.name + '</div>' +
          '<div class="bgt-desc">' + b.desc + '</div>' +
          (u ? '<div class="bgt-earned">✓ EARNED</div>' : '') +
        '</div>';
      }).join('') +
    '</div></div>';
}

// ─────────── Support tab ───────────
function _supportTabHtml() {
  return '<div class="support-root">' +
    '<div class="support-card">' +
      '<div class="support-coffee">☕</div>' +
      '<div class="support-title">Support The Code Book</div>' +
      '<div class="support-sub">The Code Book is completely free — no paywalls, no subscriptions. If it\'s helped you learn something, a small contribution keeps it going and means a lot.</div>' +
      '<div class="support-divider"></div>' +
      '<div class="support-what-label">What your support does</div>' +
      '<div class="support-perks">' +
        '<div class="support-perk">⚡ Keeps the app free for everyone</div>' +
        '<div class="support-perk">🏗 Funds new floors and features</div>' +
        '<div class="support-perk">🎮 More games and challenges</div>' +
        '<div class="support-perk">🌍 Helps more beginners start coding</div>' +
      '</div>' +
      '<a class="support-btn" href="https://ko-fi.com/thecodebookapp" target="_blank" rel="noopener">☕ Buy Me a Coffee — Ko-fi</a>' +
      '<div class="support-note">Opens Ko-fi · One-off · No account needed · From £3</div>' +
    '</div>' +
  '</div>';
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
    check: function() { return _streakVal() >= 3; } },
  { id: 'first-floor',  emoji: '🧱', name: 'First Floor',  desc: 'Complete Floor 1',
    check: function() { return isFloorComplete(0); } },
  { id: 'deep-learner', emoji: '💡', name: 'Deep Learner', desc: 'Complete 10 sections',
    check: function() { return Object.keys(state.completed || {}).filter(function(k){ return state.completed[k]; }).length >= 10; } },
  { id: 'on-fire',      emoji: '⚡', name: 'On Fire',      desc: '7-day streak',
    check: function() { return _streakVal() >= 7; } },
  { id: 'builder',      emoji: '🏗️', name: 'Builder',      desc: 'Complete Floor 2',
    check: function() { return isFloorComplete(1); } },
  { id: 'unstoppable',  emoji: '🏆', name: 'Unstoppable',  desc: '30-day streak',
    check: function() { return _streakVal() >= 30; } },
  { id: 'graduate',     emoji: '🎓', name: 'Graduate',     desc: 'Complete all floors',
    check: function() { return FLOORS.every(function(f, fi){ return isFloorComplete(fi); }); } },
  { id: 'floor-3',     emoji: '🔧', name: 'Floor 3',      desc: 'Complete Floor 3',
    check: function() { return isFloorComplete(2); } },
  { id: 'floor-4',     emoji: '⚙️', name: 'Floor 4',      desc: 'Complete Floor 4',
    check: function() { return isFloorComplete(3); } },
  { id: 'century',     emoji: '💯', name: 'Century',      desc: 'Reach 1,000 XP',
    check: function() { return (state.xp || 0) >= 1000; } },
  { id: 'high-scorer', emoji: '🚀', name: 'High Scorer',  desc: 'Reach 3,000 XP',
    check: function() { return (state.xp || 0) >= 3000; } },
  { id: 'playground',  emoji: '🖥', name: 'Coder',        desc: 'Run code in the Playground',
    check: function() { return !!(state.badgeFlags && state.badgeFlags.playgroundUsed); } },
  { id: 'boss-beater', emoji: '⚔️', name: 'Boss Beater',  desc: 'Pass your first Floor Boss Challenge',
    check: function() { return Object.keys(state.bossResults || {}).some(function(k){ return state.bossResults[k] && state.bossResults[k].passed; }); } },
  { id: 'boss-master', emoji: '👑', name: 'Boss Master',  desc: 'Pass all 7 Floor Boss Challenges',
    check: function() { var r = state.bossResults || {}; return [0,1,2,3,4,5,6].every(function(i){ return r[i] && r[i].passed; }); } }
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

// ============================================================
// SUPPORT PANEL
// ============================================================
function renderSupportPanel() {
  var panel = document.getElementById('panel-support');
  if (!panel) return;
  panel.innerHTML =
    '<div class="sp-root">' +
      '<div class="sp-bloom"></div>' +
      '<div class="sp-hero">' +
        '<div class="sp-coffee">☕</div>' +
        '<div class="sp-eyebrow">SUPPORT THE PROJECT</div>' +
        '<div class="sp-title">Keep The Code Book Free</div>' +
        '<div class="sp-sub">Built by one person. Free for everyone. No paywalls, no subscriptions, no catch.<br>If it\'s helped you learn something, a coffee means a lot.</div>' +
      '</div>' +
      '<div class="sp-card">' +
        '<div class="sp-card-label">WHAT YOUR SUPPORT DOES</div>' +
        '<div class="sp-perks">' +
          '<div class="sp-perk"><span class="sp-perk-icon">⚡</span><div><div class="sp-perk-title">Keeps it free</div><div class="sp-perk-sub">No learner ever hits a paywall</div></div></div>' +
          '<div class="sp-perk"><span class="sp-perk-icon">🏗</span><div><div class="sp-perk-title">New floors & content</div><div class="sp-perk-sub">Funds development of future floors</div></div></div>' +
          '<div class="sp-perk"><span class="sp-perk-icon">🎮</span><div><div class="sp-perk-title">More games</div><div class="sp-perk-sub">New challenges and game modes</div></div></div>' +
          '<div class="sp-perk"><span class="sp-perk-icon">🌍</span><div><div class="sp-perk-title">More beginners reached</div><div class="sp-perk-sub">Helps keep the app visible and growing</div></div></div>' +
        '</div>' +
        '<a class="sp-btn" href="https://ko-fi.com/thecodebookapp" target="_blank" rel="noopener">☕ &nbsp;Support on Ko-fi</a>' +
        '<div class="sp-note">Opens Ko-fi &nbsp;·&nbsp; One-off &nbsp;·&nbsp; No account needed &nbsp;·&nbsp; From £3</div>' +
      '</div>' +
      '<div class="sp-thankyou">' +
        '<div class="sp-ty-icon">🙏</div>' +
        '<div class="sp-ty-title">Already supported?</div>' +
        '<div class="sp-ty-sub">Thank you — it genuinely makes a difference and keeps this free for the next person who needs it.</div>' +
      '</div>' +
    '</div>';
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
