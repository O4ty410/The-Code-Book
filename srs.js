// srs.js — Spaced repetition system + revision cards

var REVISION_CARDS = [
  // Floor 1
  { floor: 1, term: 'HTML', def: 'HyperText Markup Language — the skeleton of every web page, using tags like &lt;div&gt;, &lt;p&gt;, and &lt;h1&gt; to structure content.' },
  { floor: 1, term: 'CSS', def: 'Cascading Style Sheets — controls the visual presentation of HTML: colours, fonts, layout, and animations.' },
  { floor: 1, term: 'JavaScript', def: 'The programming language of the web — runs in the browser and makes pages interactive by responding to user actions.' },
  { floor: 1, term: 'Browser', def: 'The application (Chrome, Firefox, Safari) that fetches web pages, parses HTML/CSS/JS, and renders the result on screen.' },
  { floor: 1, term: 'DOM', def: 'Document Object Model — the browser\'s live tree of HTML elements that JavaScript can read and modify in real time.' },
  { floor: 1, term: 'URL', def: 'Uniform Resource Locator — the unique address of a resource on the internet, e.g. https://example.com/page?q=1.' },
  { floor: 1, term: 'HTTP', def: 'HyperText Transfer Protocol — the request/response system browsers and servers use to exchange data across the web.' },
  { floor: 1, term: 'Variable', def: 'A named container that stores a value. In JS use let, const, or var. Example: const name = "Alice".' },
  // Floor 2
  { floor: 2, term: 'Function', def: 'A reusable block of code that performs a task when called. Accepts inputs (parameters) and can return an output value.' },
  { floor: 2, term: 'Loop', def: 'A control structure that repeats a block of code — for, while, or forEach — until a condition is met.' },
  { floor: 2, term: 'Conditional', def: 'An if/else statement that runs different code depending on whether a condition evaluates to true or false.' },
  { floor: 2, term: 'Array', def: 'An ordered list of values stored in a single variable. Example: const colours = ["red", "green", "blue"].' },
  { floor: 2, term: 'Object', def: 'A collection of key-value pairs that model a thing or concept. Example: { name: "Alice", age: 30 }.' },
  { floor: 2, term: 'Event', def: 'A signal fired by the browser (click, keydown, scroll) that JavaScript can listen for with addEventListener.' },
  { floor: 2, term: 'Callback', def: 'A function passed as an argument to another function, to be invoked later — the foundation of asynchronous JS.' },
  { floor: 2, term: 'String', def: 'A sequence of characters used to represent text. Defined with quotes: "hello", \'world\', or `template ${literal}`.' },
  // Floor 3
  { floor: 3, term: 'API', def: 'Application Programming Interface — a defined contract for how two software systems communicate and share data.' },
  { floor: 3, term: 'JSON', def: 'JavaScript Object Notation — a lightweight text format for transmitting structured data between a server and client.' },
  { floor: 3, term: 'Fetch', def: 'The browser\'s built-in function for making HTTP requests from JavaScript, returning a Promise.' },
  { floor: 3, term: 'Promise', def: 'A JS object representing the eventual completion or failure of an async operation, with .then() and .catch() handlers.' },
  { floor: 3, term: 'Async/Await', def: 'Syntax sugar over Promises — async marks a function as asynchronous; await pauses execution until a Promise resolves.' },
  { floor: 3, term: 'REST', def: 'Representational State Transfer — a design style for APIs that uses standard HTTP verbs (GET, POST, PUT, DELETE).' },
  { floor: 3, term: 'Endpoint', def: 'A specific URL that an API exposes to perform a particular operation, e.g. /api/users to list users.' },
  // Floor 4
  { floor: 4, term: 'Framework', def: 'A pre-built structure of tools and conventions (React, Vue, Django) that guides how you build and organise an app.' },
  { floor: 4, term: 'Component', def: 'A self-contained, reusable piece of UI — its own HTML, CSS, and JS bundled together, as in React or Vue.' },
  { floor: 4, term: 'State', def: 'Data that can change over time in an app. When state changes, the UI re-renders to reflect the new value.' },
  { floor: 4, term: 'npm', def: 'Node Package Manager — the registry and CLI for installing, sharing, and managing JavaScript packages and tools.' },
  { floor: 4, term: 'Module', def: 'A self-contained file of code with its own scope. Use import/export (ES modules) or require (CommonJS) to share it.' },
  { floor: 4, term: 'Debugging', def: 'Finding and fixing errors in code using browser DevTools, console.log, breakpoints, or stack-trace messages.' },
  { floor: 4, term: 'Version Control', def: 'A system (like Git) that tracks changes to code over time, enabling collaboration and rollback to previous states.' },
  // Floor 5
  { floor: 5, term: 'Server', def: 'A program (or machine) that listens for network requests and responds with data, files, or rendered HTML.' },
  { floor: 5, term: 'Database', def: 'An organised store of persistent data — queried with SQL (relational) or document-based (NoSQL like MongoDB).' },
  { floor: 5, term: 'SQL', def: 'Structured Query Language — used to create, read, update, and delete records in a relational database.' },
  { floor: 5, term: 'CRUD', def: 'Create, Read, Update, Delete — the four fundamental operations performed on data in any persistent system.' },
  { floor: 5, term: 'Authentication', def: 'Verifying who a user is (login). Distinct from authorisation, which controls what they are allowed to do.' },
  { floor: 5, term: 'Backend', def: 'The server-side of an app — business logic, databases, and APIs that the user never directly sees or touches.' },
  { floor: 5, term: 'Env Variable', def: 'A value (API key, database URL) stored outside code in the server environment to keep secrets out of repos.' },
  // Floor 6
  { floor: 6, term: 'Git', def: 'A distributed version-control system that tracks file changes locally and syncs with remote repositories on GitHub.' },
  { floor: 6, term: 'Commit', def: 'A saved snapshot of your staged changes in Git, recorded with a message describing what was done.' },
  { floor: 6, term: 'Branch', def: 'An independent line of development in Git. Create one to build a feature without affecting the main codebase.' },
  { floor: 6, term: 'Pull Request', def: 'A GitHub proposal to merge one branch into another, enabling code review before the changes land in main.' },
  { floor: 6, term: 'Deployment', def: 'The process of making an app available to users — pushing it to a server or hosting platform (Netlify, Vercel, AWS).' },
  { floor: 6, term: 'CI/CD', def: 'Continuous Integration / Continuous Delivery — automated pipelines that test, build, and deploy code on every push.' },
  { floor: 6, term: 'Dependency', def: 'An external package your project relies on, listed in package.json and installed via npm or yarn.' },
  // Floor 7
  { floor: 7, term: 'Performance', def: 'How fast and efficiently an app loads and runs. Measured by metrics like FCP, LCP, and Time to Interactive.' },
  { floor: 7, term: 'Accessibility', def: 'Designing apps so everyone can use them — including keyboard and screen-reader users (following WCAG guidelines).' },
  { floor: 7, term: 'Testing', def: 'Writing automated checks (unit, integration, e2e) to verify code behaves correctly now and after future changes.' },
  { floor: 7, term: 'Security', def: 'Protecting apps from attacks like XSS, SQL injection, and CSRF by validating input, using HTTPS, and securing secrets.' },
  { floor: 7, term: 'Refactoring', def: 'Restructuring existing code to improve clarity or efficiency without changing its external behaviour or output.' },
  { floor: 7, term: 'Scalability', def: 'An app\'s ability to handle growing load — more users, more data — without degrading in speed or reliability.' },
  { floor: 7, term: 'Open Source', def: 'Software with publicly available source code that anyone can inspect, use, modify, and freely distribute.' },
  { floor: 7, term: 'The Stack', def: 'The complete set of technologies used to build an app: front end, back end, database, and infrastructure layer.' }
];

var _revDealtSession = false;
var _revModalIndex = null;
var _revSession = null;        // { cards:[idx,...], idx:0, results:[{idx,gotIt}] }
var _revSessionFlipped = false;
var _revSessionTouchX  = null;

var REV_CARD_RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var REV_CODE_SYMS = [
  // Syntax (cards 0-12)
  '{}','()','[]','<>','//','/**/','""',"''",'`','#!','@',';',',',
  // Operators (cards 13-25)
  '=','!=','==','===','>=','<=','=>','&&','||','!','?','??','...',
  // Math (cards 26-38)
  '+','-','*','/','%','**','++','--','+=','-=','*=','/=','^',
  // Keywords (cards 39-51)
  'fn','if','for','try','new','let','var','$','_','~','|>','::',':='
];

// ── SM-2 Spaced Repetition ──────────────────────────────────────
function sm2Update(data, gotIt) {
  var q  = gotIt ? 4 : 1;
  var ef = Math.max(1.3, (data.ef || 2.5) + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  var reps, interval;
  if (!gotIt) {
    reps = 0; interval = 1;
  } else {
    reps = (data.reps || 0) + 1;
    if (reps === 1)      interval = 1;
    else if (reps === 2) interval = 6;
    else                 interval = Math.max(1, Math.round((data.interval || 1) * ef));
  }
  return { ef: ef, interval: interval, reps: reps, nextReview: Date.now() + interval * 86400000 };
}

function srsStatus(i) {
  var d = (state.srsData || {})[i];
  if (!d) return 'new';
  if (Date.now() >= d.nextReview) return 'due';
  if (d.interval >= 21) return 'mastered';
  return 'upcoming';
}

function srsDaysUntil(i) {
  var d = (state.srsData || {})[i];
  if (!d || Date.now() >= d.nextReview) return 0;
  return Math.ceil((d.nextReview - Date.now()) / 86400000);
}

function srsCounts() {
  var due = 0, mastered = 0, upcoming = 0, fresh = 0;
  for (var i = 0; i < REVISION_CARDS.length; i++) {
    var s = srsStatus(i);
    if (s === 'due')      due++;
    else if (s === 'mastered')  mastered++;
    else if (s === 'upcoming')  upcoming++;
    else                        fresh++;
  }
  return { due: due, mastered: mastered, upcoming: upcoming, fresh: fresh };
}
// ────────────────────────────────────────────────────────────────

function renderRevisionPanel() {
  var panel = document.getElementById('panel-revision');
  if (!panel) return;
  if (_revSession) {
    _renderRevSession(panel);
  } else if (!_revDealtSession) {
    _renderRevDeck(panel);
  } else {
    _renderRevGrid(panel, false);
  }
}

function _renderRevDeck(panel) {
  var c = srsCounts();
  var dueLabel = c.due > 0
    ? '<span class="rev-srs-due-badge">' + c.due + ' due today</span>'
    : (c.mastered === REVISION_CARDS.length ? '<span class="rev-srs-all-done">All ' + REVISION_CARDS.length + ' cards mastered ✓</span>' : '');
  var html = '<div class="rev-wrap">' +
    '<div class="rev-header">' +
      '<h2 class="rev-title">Revision Centre</h2>' +
      '<p class="rev-subtitle">52 key concepts — reviewed with spaced repetition</p>' +
    '</div>' +
    '<div class="rev-srs-overview">' +
      '<div class="rev-srs-stat"><span class="rev-srs-num srs-due">' + c.due + '</span><span class="rev-srs-lbl">due</span></div>' +
      '<div class="rev-srs-stat"><span class="rev-srs-num srs-new">' + c.fresh + '</span><span class="rev-srs-lbl">new</span></div>' +
      '<div class="rev-srs-stat"><span class="rev-srs-num srs-up">' + c.upcoming + '</span><span class="rev-srs-lbl">scheduled</span></div>' +
      '<div class="rev-srs-stat"><span class="rev-srs-num srs-done">' + c.mastered + '</span><span class="rev-srs-lbl">mastered</span></div>' +
    '</div>' +
    '<div class="rev-deck-scene" onclick="startRevSession()">' +
      '<div class="rev-deck-stack">' +
        '<div class="rev-deck-slab rev-deck-s5"></div>' +
        '<div class="rev-deck-slab rev-deck-s4"></div>' +
        '<div class="rev-deck-slab rev-deck-s3"></div>' +
        '<div class="rev-deck-slab rev-deck-s2"></div>' +
        '<div class="rev-deck-slab rev-deck-s1">' +
          '<div class="rev-cc rev-cc-tl"><span class="rev-cc-rank">A</span><span class="rev-cc-sym">{}</span></div>' +
          '<div class="rev-deck-owl">' + sageOwlSVG(72, 79) + '</div>' +
          '<div class="rev-deck-book-title">THE CODE BOOK</div>' +
          '<div class="rev-deck-guide">Your Revision Guide</div>' +
          '<div class="rev-cc rev-cc-br"><span class="rev-cc-rank">A</span><span class="rev-cc-sym">{}</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="rev-deal-hint">' + (c.due > 0 ? 'Tap to start — ' + c.due + ' card' + (c.due !== 1 ? 's' : '') + ' due' : 'Tap to start session') + '</div>' +
    '</div>' +
  '</div>';
  html += '<button class="rev-browse-link" onclick="event.stopPropagation();dealRevisionCards()">Browse all 52 cards →</button>';
  html += '</div>';
  panel.innerHTML = html;
}

function dealRevisionCards() {
  _revDealtSession = true;
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevGrid(panel, true);
}

function _renderRevGrid(panel, animate) {
  var c = srsCounts();
  var masteredPct = Math.round(c.mastered / REVISION_CARDS.length * 100);

  // Sort: due → new → upcoming → mastered
  var order = [];
  for (var i = 0; i < REVISION_CARDS.length; i++) order.push(i);
  var statusRank = { due: 0, new: 1, upcoming: 2, mastered: 3 };
  order.sort(function(a, b) { return statusRank[srsStatus(a)] - statusRank[srsStatus(b)]; });

  var html = '<div class="rev-wrap">' +
    '<div class="rev-header">' +
      '<div class="rev-header-row">' +
        '<h2 class="rev-title">Revision Centre</h2>' +
        '<button class="rev-reset-btn" onclick="resetRevisionCards()">&#8635; Reset</button>' +
      '</div>' +
      '<div class="rev-srs-bar-row">' +
        '<span class="rev-srs-chip srs-due">' + c.due + ' due</span>' +
        '<span class="rev-srs-chip srs-new">' + c.fresh + ' new</span>' +
        '<span class="rev-srs-chip srs-up">' + c.upcoming + ' scheduled</span>' +
        '<span class="rev-srs-chip srs-done">' + c.mastered + ' mastered</span>' +
      '</div>' +
      '<div class="rev-prog-track"><div class="rev-prog-fill" style="width:' + masteredPct + '%"></div></div>' +
    '</div>' +
    '<div class="rev-grid">';

  for (var oi = 0; oi < order.length; oi++) {
    var i = order[oi];
    var card = REVISION_CARDS[i];
    var status = srsStatus(i);
    var delay = animate ? (oi * 22) : 0;
    var sx = animate ? (Math.round((Math.random() - 0.5) * 700)) : 0;
    var sy = animate ? (Math.round((Math.random() - 0.5) * 500)) : 0;
    var sr = animate ? (Math.round((Math.random() - 0.5) * 70)) : 0;
    var shimmerDelay = ((i % 11) * 0.45).toFixed(2);
    var cardStyle = '--shimmer-delay:' + shimmerDelay + 's';
    if (animate) cardStyle += ';--rev-sx:' + sx + 'px;--rev-sy:' + sy + 'px;--rev-sr:' + sr + 'deg;animation-delay:' + delay + 'ms';
    var rank = REV_CARD_RANKS[i % 13];
    var sym = REV_CODE_SYMS[i];
    var corner   = '<div class="rev-cc rev-cc-tl"><span class="rev-cc-rank">' + rank + '</span><span class="rev-cc-sym">' + sym + '</span></div>';
    var cornerBr = '<div class="rev-cc rev-cc-br"><span class="rev-cc-rank">' + rank + '</span><span class="rev-cc-sym">' + sym + '</span></div>';
    var statusBadge = '';
    if (status === 'due')      statusBadge = '<div class="rev-card-status srs-badge-due">DUE</div>';
    else if (status === 'new') statusBadge = '<div class="rev-card-status srs-badge-new">NEW</div>';
    else if (status === 'upcoming') statusBadge = '<div class="rev-card-status srs-badge-up">+' + srsDaysUntil(i) + 'd</div>';
    else                            statusBadge = '<div class="rev-card-tick">&#10003;</div>';
    html += '<div class="rev-card' +
      (status === 'mastered' ? ' rev-card-known' : '') +
      (status === 'due' ? ' rev-card-due' : '') +
      (animate ? ' rev-card-dealing' : '') +
      '" style="' + cardStyle + '" onclick="openRevCard(' + i + ')">' +
      corner +
      '<div class="rev-card-owl">' + sageOwlSVG(36, 40) + '</div>' +
      '<div class="rev-card-bookname">THE CODE<br>BOOK</div>' +
      '<div class="rev-card-floorlabel">F' + card.floor + '</div>' +
      statusBadge +
      cornerBr +
    '</div>';
  }

  html += '</div></div>';
  html += '<div class="rev-modal-bg" id="rev-modal-bg" onclick="closeRevCard()"><div class="rev-modal-box" id="rev-modal-box" onclick="event.stopPropagation()"></div></div>';
  panel.innerHTML = html;
}

function openRevCard(i) {
  _revModalIndex = i;
  var bg  = document.getElementById('rev-modal-bg');
  var box = document.getElementById('rev-modal-box');
  if (!bg || !box) return;
  var card = REVISION_CARDS[i];
  var d    = (state.srsData || {})[i];
  var mRank = REV_CARD_RANKS[i % 13];
  var mSym  = REV_CODE_SYMS[i];
  var mCornerTL = '<div class="rev-cc rev-cc-tl rev-cc-lg"><span class="rev-cc-rank">' + mRank + '</span><span class="rev-cc-sym">' + mSym + '</span></div>';
  var mCornerBR = '<div class="rev-cc rev-cc-br rev-cc-lg"><span class="rev-cc-rank">' + mRank + '</span><span class="rev-cc-sym">' + mSym + '</span></div>';
  // Preview: what interval will "Got it" give?
  var nextGotIt = sm2Update(d || { ef: 2.5, interval: 0, reps: 0 }, true);
  var nextFail  = sm2Update(d || { ef: 2.5, interval: 0, reps: 0 }, false);
  box.innerHTML =
    '<div class="rev-mc-wrap">' +
      '<div class="rev-mc-scene" id="rev-mc-scene">' +
        '<div class="rev-mc-inner" id="rev-mc-inner">' +
          '<div class="rev-mc-face rev-mc-front">' +
            mCornerTL +
            '<div class="rev-mc-floor">Floor ' + card.floor + '</div>' +
            '<div class="rev-mc-term">' + card.term + '</div>' +
            '<div class="rev-mc-prompt">What does this mean?</div>' +
            mCornerBR +
          '</div>' +
          '<div class="rev-mc-face rev-mc-back">' +
            mCornerTL +
            '<div class="rev-mc-term-sm">' + card.term + '</div>' +
            '<div class="rev-mc-def">' + card.def + '</div>' +
            '<div class="rev-mc-actions">' +
              '<button class="rev-gotit-btn" onclick="markRevCard(' + i + ',true)">' +
                'Got it &#10003;<span class="rev-srs-next">+' + nextGotIt.interval + 'd</span>' +
              '</button>' +
              '<button class="rev-review-btn" onclick="markRevCard(' + i + ',false)">' +
                'Review Again &#8635;<span class="rev-srs-next">+' + nextFail.interval + 'd</span>' +
              '</button>' +
            '</div>' +
            mCornerBR +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="rev-mc-footer">' +
        '<button class="rev-flip-btn" onclick="flipRevCard()">Flip &#8594;</button>' +
        '<button class="rev-close-btn" onclick="closeRevCard()">&#10005; Close</button>' +
      '</div>' +
    '</div>';
  bg.classList.add('active');
}

function flipRevCard() {
  var inner = document.getElementById('rev-mc-inner');
  if (inner) inner.classList.toggle('flipped');
}

function closeRevCard() {
  var bg = document.getElementById('rev-modal-bg');
  if (bg) bg.classList.remove('active');
  _revModalIndex = null;
}

function _srsMarkCard(i, gotIt) {
  if (!state.srsData) state.srsData = {};
  state.srsData[i] = sm2Update(state.srsData[i] || { ef: 2.5, interval: 0, reps: 0 }, gotIt);
  if (!state.revKnown) state.revKnown = {};
  if (state.srsData[i].interval >= 21) state.revKnown[i] = true;
  else delete state.revKnown[i];
  saveState();
}

function markRevCard(i, gotIt) {
  _srsMarkCard(i, gotIt);
  closeRevCard();
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevGrid(panel, false);
}

// ── Session Mode ─────────────────────────────────────────────────

function startRevSession() {
  var due = [], fresh = [];
  for (var i = 0; i < REVISION_CARDS.length; i++) {
    var s = srsStatus(i);
    if (s === 'due') due.push(i);
    else if (s === 'new') fresh.push(i);
  }
  var cards = due.concat(fresh.slice(0, Math.max(0, 20 - due.length)));
  if (!cards.length) {
    for (var j = 0; j < REVISION_CARDS.length; j++) cards.push(j);
    cards = cards.slice(0, 20);
  }
  _revSession = { cards: cards, idx: 0, results: [] };
  _revSessionFlipped = false;
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevSession(panel);
}

function endRevSession() {
  _revSession = null;
  _revSessionFlipped = false;
  _revDealtSession = false;
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevDeck(panel);
}

function _renderRevSession(panel) {
  if (!_revSession) return;
  var s = _revSession;
  var cardIdx = s.cards[s.idx];
  var card    = REVISION_CARDS[cardIdx];
  var total   = s.cards.length;
  var pct     = Math.round((s.idx / total) * 100);
  var status  = srsStatus(cardIdx);
  var d       = (state.srsData || {})[cardIdx];
  var nextPass = sm2Update(d || { ef: 2.5, interval: 0, reps: 0 }, true);
  var nextFail = sm2Update(d || { ef: 2.5, interval: 0, reps: 0 }, false);
  var statusTag = status === 'due' ? '<span class="rev-sess-tag rev-sess-tag-due">DUE</span>'
                : status === 'new' ? '<span class="rev-sess-tag rev-sess-tag-new">NEW</span>'
                : '<span class="rev-sess-tag rev-sess-tag-up">+' + srsDaysUntil(cardIdx) + 'd</span>';

  panel.innerHTML =
    '<div class="rev-session-wrap">' +
      '<div class="rev-sess-hdr">' +
        '<button class="rev-sess-exit" onclick="endRevSession()">&#10005;</button>' +
        '<div class="rev-sess-bar"><div class="rev-sess-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="rev-sess-count">' + (s.idx + 1) + ' / ' + total + '</span>' +
      '</div>' +

      '<div class="rev-sess-card" id="rev-sess-card" onclick="_sessionFlip()">' +
        '<div class="rev-sess-card-inner" id="rev-sess-inner">' +
          '<div class="rev-sess-face rev-sess-front">' +
            '<div class="rev-sess-floor">FLOOR ' + card.floor + ' &nbsp;' + statusTag + '</div>' +
            '<div class="rev-sess-term">' + card.term + '</div>' +
            '<div class="rev-sess-tap-hint">Tap to reveal</div>' +
          '</div>' +
          '<div class="rev-sess-face rev-sess-back">' +
            '<div class="rev-sess-term-sm">' + card.term + '</div>' +
            '<div class="rev-sess-def">' + card.def + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="rev-sess-actions" id="rev-sess-actions">' +
        '<button class="rev-sess-fail" onclick="_sessionMark(false)">' +
          '<span>✕ Review Again</span><span class="rev-sess-interval">+' + nextFail.interval + 'd</span>' +
        '</button>' +
        '<button class="rev-sess-pass" onclick="_sessionMark(true)">' +
          '<span>✓ Got it</span><span class="rev-sess-interval">+' + nextPass.interval + 'd</span>' +
        '</button>' +
      '</div>' +

      '<div class="rev-sess-swipe-hint">← Review Again &nbsp;&nbsp; Got it →</div>' +
    '</div>';

  var cardEl = document.getElementById('rev-sess-card');
  if (cardEl) {
    cardEl.addEventListener('touchstart', function(e) {
      _revSessionTouchX = e.touches[0].clientX;
    }, { passive: true });
    cardEl.addEventListener('touchend', function(e) {
      if (_revSessionTouchX === null || !_revSessionFlipped) return;
      var dx = e.changedTouches[0].clientX - _revSessionTouchX;
      _revSessionTouchX = null;
      if (dx > 60) _sessionMark(true);
      else if (dx < -60) _sessionMark(false);
    });
  }
}

function _sessionFlip() {
  if (_revSessionFlipped) return;
  var inner   = document.getElementById('rev-sess-inner');
  var actions = document.getElementById('rev-sess-actions');
  if (!inner) return;
  inner.classList.add('flipped');
  _revSessionFlipped = true;
  if (actions) {
    actions.style.display = 'flex';
    requestAnimationFrame(function() { actions.classList.add('visible'); });
  }
}

function _sessionMark(gotIt) {
  if (!_revSession || !_revSessionFlipped) return;
  var cardIdx = _revSession.cards[_revSession.idx];
  _srsMarkCard(cardIdx, gotIt);
  _revSession.results.push({ idx: cardIdx, gotIt: gotIt });

  var cardEl = document.getElementById('rev-sess-card');
  if (cardEl) {
    cardEl.style.transition = 'transform 0.28s ease, opacity 0.28s ease';
    cardEl.style.transform = gotIt ? 'translateX(110%) rotate(12deg)' : 'translateX(-110%) rotate(-12deg)';
    cardEl.style.opacity = '0';
    cardEl.style.pointerEvents = 'none';
  }

  setTimeout(function() {
    if (!_revSession) return;
    _revSession.idx++;
    _revSessionFlipped = false;
    var panel = document.getElementById('panel-revision');
    if (!panel) return;
    if (_revSession.idx >= _revSession.cards.length) {
      _sessionComplete(panel);
    } else {
      _renderRevSession(panel);
    }
  }, 260);
}

function _sessionComplete(panel) {
  var results = _revSession ? _revSession.results : [];
  var passed  = results.filter(function(r) { return r.gotIt; }).length;
  var failed  = results.length - passed;
  var c = srsCounts();

  panel.innerHTML =
    '<div class="rev-session-wrap rev-sess-complete-wrap">' +
      '<div class="rev-sess-complete-owl">' + sageOwlSVG(72, 79) + '</div>' +
      '<div class="rev-sess-complete-title">Session Complete</div>' +
      '<div class="rev-sess-complete-sub">You reviewed ' + results.length + ' card' + (results.length !== 1 ? 's' : '') + '</div>' +
      '<div class="rev-sess-result-row">' +
        '<div class="rev-sess-result-stat">' +
          '<div class="rev-sess-result-n rev-sess-n-pass">' + passed + '</div>' +
          '<div class="rev-sess-result-l">Got it</div>' +
        '</div>' +
        '<div class="rev-sess-result-div"></div>' +
        '<div class="rev-sess-result-stat">' +
          '<div class="rev-sess-result-n rev-sess-n-fail">' + failed + '</div>' +
          '<div class="rev-sess-result-l">Review Again</div>' +
        '</div>' +
      '</div>' +
      (c.due > 0
        ? '<button class="rev-sess-cta-btn" onclick="startRevSession()">Review ' + c.due + ' Remaining →</button>'
        : '<button class="rev-sess-cta-btn" onclick="endRevSession()">Done ✓</button>'
      ) +
      '<button class="rev-sess-browse-btn" onclick="dealRevisionCards()">Browse all cards</button>' +
    '</div>';

  _revSession = null;
}

function resetRevisionCards() {
  state.srsData  = {};
  state.revKnown = {};
  saveState();
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevGrid(panel, true);
}
