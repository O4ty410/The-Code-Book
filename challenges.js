// challenges.js — Challenge modes + daily challenge

// --- DAILY CHALLENGE SYSTEM ---
const DAILY_CHALLENGES = [
  { title: "What does HTML stand for?", question: "Choose the correct answer:", options: ["Hyper Text Markup Language", "High Text Making Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correct: 0, explanation: "HTML stands for HyperText Markup Language. It is the standard language used to create and structure content on the web.", xp: 20 },
  { title: "CSS stands for...", question: "Choose the correct answer:", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 1, explanation: "CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen.", xp: 20 },
  { title: "Which tag creates a heading?", question: "Which HTML tag creates the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2, explanation: "The h1 tag creates the largest heading. Headings go from h1 (largest) to h6 (smallest).", xp: 20 },
  { title: "What is a variable?", question: "In coding, a variable is...", options: ["A type of HTML tag", "A named container that stores a value", "A CSS property", "A type of loop"], correct: 1, explanation: "A variable is a named container that stores a value. You can think of it like a labelled box that holds information your code can use and change.", xp: 20 },
  { title: "What does a loop do?", question: "A loop in code...", options: ["Creates a circular design", "Connects to the internet", "Repeats a set of instructions", "Stores data in a database"], correct: 2, explanation: "A loop repeats a set of instructions until a condition tells it to stop. Think of it like a washing machine cycle that keeps going until the cycle is complete.", xp: 20 },
  { title: "What is a function?", question: "A function in coding is...", options: ["A type of variable", "A reusable block of instructions with a name", "A CSS animation", "A database query"], correct: 1, explanation: "A function is a named, reusable block of instructions. You define it once and can call it as many times as you need — like pressing a button on a vending machine.", xp: 20 },
  { title: "What does JavaScript do?", question: "JavaScript is primarily used to...", options: ["Style web pages", "Create database tables", "Add behaviour and interactivity to web pages", "Set up servers"], correct: 2, explanation: "JavaScript adds behaviour to web pages. HTML provides structure, CSS provides style, and JavaScript makes things happen when users interact with the page.", xp: 20 },
  { title: "What is the DOM?", question: "The DOM in web development refers to...", options: ["A CSS layout system", "A type of server", "The Document Object Model - a live map of the page JavaScript can change", "A database format"], correct: 2, explanation: "The Document Object Model (DOM) is a live tree structure of your HTML that JavaScript can read and modify in real time - changing text, styles, and structure without reloading the page.", xp: 20 },
  { title: "What does an API do?", question: "An API is used to...", options: ["Style web pages", "Let two programs talk to each other and share data", "Write HTML structure", "Store passwords"], correct: 1, explanation: "An API lets two pieces of software communicate. When a weather app shows you the forecast, it used an API to ask a weather service for that data.", xp: 20 },
  { title: "What is a boolean?", question: "A boolean value in code can only be...", options: ["A number or a letter", "True or false", "A list of items", "A colour value"], correct: 1, explanation: "A boolean is the simplest data type - it is either true or false. Conditions and if-statements are built on booleans.", xp: 20 },
  { title: "What does \"debugging\" mean?", question: "Debugging means...", options: ["Writing new features", "Finding and fixing errors in code", "Deleting old code", "Speeding up a program"], correct: 1, explanation: "Debugging is the process of finding, understanding, and fixing errors (bugs) in your code. Every developer debugs - it is the job.", xp: 20 },
  { title: "What is a string?", question: "In coding, a string is...", options: ["A type of loop", "A sequence of characters - text", "A CSS measurement unit", "A database table"], correct: 1, explanation: "A string is text data wrapped in quotes. \"Hello world\" is a string. Strings are one of the most common data types in any language.", xp: 20 },
  { title: "What does \"responsive\" mean in web design?", question: "A responsive website...", options: ["Loads very fast", "Adapts its layout to different screen sizes", "Has animated elements", "Uses a database"], correct: 1, explanation: "A responsive website adjusts its layout automatically depending on the screen size - looks good on a phone, tablet, and desktop without separate versions.", xp: 20 },
  { title: "What is version control?", question: "Version control (like Git) is used to...", options: ["Speed up websites", "Track changes to code over time", "Style HTML", "Compress images"], correct: 1, explanation: "Version control tracks every change made to your code. Git is the most popular tool - you can always go back to a working version and collaborate without overwriting each other.", xp: 20 },

  // Floor 1 — Foundation
  { title: "What is a server?", question: "In web development, a server is...", options: ["A type of browser plugin", "A computer that stores and sends files when requested", "A CSS layout technique", "A JavaScript framework"], correct: 1, explanation: "A server is a computer that waits for requests and responds by sending back files. When you visit a website, a server somewhere in the world receives your request and sends back the HTML, CSS, and JS files your browser needs.", xp: 20 },
  { title: "What does a browser do?", question: "A web browser's main job is to...", options: ["Write HTML files", "Request files from servers and display them to the user", "Store websites on your computer", "Connect you directly to other users"], correct: 1, explanation: "A browser sends requests to servers, receives files back, and renders them visually on screen. It reads HTML for structure, CSS for style, and JavaScript for behaviour — turning code into the visual pages you see.", xp: 20 },
  { title: "Sequential execution", question: "What does \"sequential execution\" mean in code?", options: ["Code runs in random order", "Code runs in parallel on multiple processors", "Code runs line by line from top to bottom", "Code only runs when clicked"], correct: 2, explanation: "Sequential execution means the computer reads and runs instructions one at a time, top to bottom. It does not skip ahead or assume anything. The order you write code matters enormously because of this.", xp: 20 },
  { title: "What is a condition in code?", question: "A condition in programming means...", options: ["A type of HTML tag", "A rule that says: if this is true, do this — otherwise do that", "A way to repeat instructions", "A named block of reusable code"], correct: 1, explanation: "A condition is a decision point. \"If it is raining, take an umbrella, otherwise leave it at home.\" In code this is written as an if/else statement. Conditions are one of the three universal building blocks of all programming.", xp: 20 },

  // Floor 2 — HTML & CSS
  { title: "HTML tag structure", question: "Which of these is the correct HTML structure?", options: ["<p>Hello/p>", "<p>Hello</p>", "p>Hello</p>", "<p Hello>"], correct: 1, explanation: "Every HTML element has an opening tag, content, and a closing tag. The closing tag has a forward slash before the element name. <p>Hello</p> is the correct pattern — open, content, close.", xp: 20 },
  { title: "What does CSS stand for?", question: "CSS controls which aspect of a webpage?", options: ["The structure and content", "The visual appearance and layout", "The interactive behaviour", "The server-side logic"], correct: 1, explanation: "CSS (Cascading Style Sheets) controls how HTML elements look — colours, fonts, sizes, spacing, layout. Without CSS, every website would look like a plain text document.", xp: 20 },
  { title: "The box model", question: "In CSS, the \"box model\" refers to...", options: ["A 3D animation technique", "How every element is treated as a box with margin, border, padding, and content", "A way to create modal popups", "A CSS grid layout method"], correct: 1, explanation: "Every HTML element is a box. The CSS box model defines the space around and inside that box: content (the actual stuff), padding (space inside the border), border (the edge), and margin (space outside the border).", xp: 20 },
  { title: "Inline vs block elements", question: "What is the difference between a block and inline HTML element?", options: ["Block elements are invisible, inline elements are visible", "Block elements start on a new line and take full width; inline elements flow within text", "Block elements need JavaScript; inline elements do not", "There is no difference"], correct: 1, explanation: "Block elements like <div>, <p>, and <h1> start on a new line and stretch the full width. Inline elements like <span>, <a>, and <strong> flow within text without breaking to a new line. Understanding this prevents many layout headaches.", xp: 20 },
  { title: "CSS specificity", question: "If two CSS rules target the same element, which one wins?", options: ["The first one written always wins", "The more specific selector wins", "The shorter rule wins", "They are always combined"], correct: 1, explanation: "CSS specificity determines which rule applies when multiple rules target the same element. An ID selector beats a class selector beats an element selector. When specificity is equal, the last rule written wins. This is the \"Cascading\" in CSS.", xp: 20 },

  // Floor 3 — JavaScript
  { title: "let vs const", question: "What is the difference between let and const in JavaScript?", options: ["let is faster than const", "const cannot be reassigned after declaration; let can", "They are identical", "const only works with numbers"], correct: 1, explanation: "const declares a variable whose value cannot be reassigned. let declares a variable that can change. Use const by default and let when you know the value needs to change. This makes your code easier to reason about.", xp: 20 },
  { title: "What is the DOM?", question: "JavaScript uses the DOM to...", options: ["Connect to databases", "Read and change the HTML currently on screen", "Style elements with CSS", "Send emails"], correct: 1, explanation: "The Document Object Model (DOM) is a live map of the HTML on the page. JavaScript can read and modify it in real time — changing text, hiding elements, adding new ones — without refreshing the page.", xp: 20 },
  { title: "Event listeners", question: "What does addEventListener do in JavaScript?", options: ["Adds a new HTML element", "Waits for a specific user action and runs code when it happens", "Connects to an external API", "Styles an element on hover"], correct: 1, explanation: "addEventListener tells the browser: when this specific thing happens (a click, a keypress, a scroll), run this function. It is the foundation of interactive web pages — everything that responds to user input uses event listeners.", xp: 20 },
  { title: "Array methods", question: "What does the .filter() method do to a JavaScript array?", options: ["Sorts the array alphabetically", "Returns a new array containing only elements that pass a test", "Removes the last element", "Combines two arrays"], correct: 1, explanation: ".filter() creates a new array with only the elements for which your test function returns true. For example, numbers.filter(n => n > 10) returns only numbers greater than 10. It does not modify the original array.", xp: 20 },

  // Floor 4 — Independence
  { title: "What is localStorage?", question: "localStorage in the browser allows you to...", options: ["Store data on a server", "Save small amounts of data that persists between page refreshes", "Share data between different users", "Compress images"], correct: 1, explanation: "localStorage is a browser feature that lets you save key-value pairs locally on the user's device. Unlike regular variables, localStorage data survives page refreshes and browser restarts — useful for saving preferences, drafts, or progress.", xp: 20 },
  { title: "JSON", question: "JSON is used in web development to...", options: ["Style HTML elements", "Format and transfer structured data between systems", "Run server-side code", "Create animations"], correct: 1, explanation: "JSON (JavaScript Object Notation) is a text format for representing structured data. It looks like a JavaScript object and is used to send data between a frontend and a backend, or to store structured data in localStorage.", xp: 20 },
  { title: "What is debugging?", question: "The browser Developer Console is used to...", options: ["Edit the website permanently", "See JavaScript errors, log output, and inspect the page", "Speed up page loading", "Write CSS"], correct: 1, explanation: "The Developer Console (opened with F12) shows JavaScript errors with line numbers, lets you log values with console.log(), and allows you to inspect and modify the live DOM. It is your most important debugging tool.", xp: 20 },
  { title: "Reading error messages", question: "When JavaScript throws a \"ReferenceError\", it means...", options: ["The page has no internet connection", "You tried to use a variable or function that has not been defined", "A CSS rule is invalid", "The HTML is malformed"], correct: 1, explanation: "A ReferenceError means JavaScript cannot find what you are referring to. Usually this means a typo in a variable name, using a variable before declaring it, or calling a function that does not exist. The error message tells you the name it could not find.", xp: 20 },

  // Floor 5 — Full Stack
  { title: "Frontend vs Backend", question: "Which of these tasks belongs to the backend?", options: ["Styling a button with CSS", "Animating a dropdown menu", "Securely processing a payment", "Choosing a font family"], correct: 2, explanation: "The backend handles tasks that must be done securely and away from the user's browser — things like processing payments, validating credentials, querying a database, or running sensitive business logic. The frontend is everything the user sees directly.", xp: 20 },
  { title: "What is SQL?", question: "SQL is primarily used to...", options: ["Style web pages", "Build mobile apps", "Query and manage relational databases", "Write server-side JavaScript"], correct: 2, explanation: "SQL (Structured Query Language) is the language for communicating with relational databases. It lets you create tables, insert data, retrieve specific records, update values, and delete data. Every major web application uses SQL or a similar query language.", xp: 20 },
  { title: "HTTP methods", question: "In a REST API, a POST request is used to...", options: ["Retrieve data", "Create new data", "Delete existing data", "Update all records"], correct: 1, explanation: "REST APIs use HTTP methods to indicate the type of action: GET retrieves data, POST creates new data, PUT/PATCH updates existing data, DELETE removes data. These map directly to the CRUD operations (Create, Read, Update, Delete) of a database.", xp: 20 },
  { title: "What is an API key?", question: "An API key is used to...", options: ["Encrypt user passwords", "Identify and authenticate who is making a request to an API", "Speed up API responses", "Format JSON data"], correct: 1, explanation: "An API key is a unique identifier passed with requests to an external API. It tells the API who is making the request, allows the provider to track usage, and lets them block keys that are misused or over their rate limit. Never expose API keys in public code.", xp: 20 },
  { title: "Git commit", question: "What does \"git commit\" do?", options: ["Sends your code to GitHub", "Saves a permanent snapshot of your current changes with a message", "Creates a new branch", "Merges two branches together"], correct: 1, explanation: "A commit is a saved snapshot of your code at a specific point in time, with a message describing what changed. It is local — it lives on your machine until you push. Think of commits as save points in a game that you can always return to.", xp: 20 },

  // Floor 6 — Specialisation
  { title: "What is React?", question: "React is best described as...", options: ["A CSS framework", "A backend web server", "A JavaScript library for building user interfaces from reusable components", "A database management tool"], correct: 2, explanation: "React is a JavaScript library created by Facebook for building UIs. It lets you break your interface into reusable components, each managing its own state. When state changes, React efficiently updates only the affected parts of the page.", xp: 20 },
  { title: "Component state", question: "In React, \"state\" refers to...", options: ["The CSS styles of a component", "Data that belongs to a component and can change over time", "The server location of the app", "The HTML structure of the page"], correct: 1, explanation: "State is data that lives inside a component and can change. When state changes, React re-renders the component to reflect the new data. This is the core idea behind reactive UIs — the display automatically stays in sync with the data.", xp: 20 },
  { title: "What is Node.js?", question: "Node.js allows developers to...", options: ["Write CSS with JavaScript syntax", "Run JavaScript on the server, outside of a browser", "Build native mobile apps", "Manage SQL databases directly"], correct: 1, explanation: "Node.js is a runtime that lets JavaScript run on a server rather than just in a browser. This means you can use JavaScript for both the frontend and the backend — one language across your entire stack.", xp: 20 },
  { title: "REST vs GraphQL", question: "The main advantage of GraphQL over REST is...", options: ["It is faster in all situations", "The client can request exactly the data it needs, no more, no less", "It does not require a server", "It only works with React"], correct: 1, explanation: "REST APIs return fixed data structures per endpoint — sometimes more than you need, sometimes less. GraphQL lets the client define exactly what data it wants in a single query, reducing over-fetching and under-fetching. It is particularly useful for complex UIs with varied data needs.", xp: 20 },

  // Floor 7 — Professional Grade
  { title: "What is code review?", question: "The main purpose of a code review is to...", options: ["Count lines of code written", "Check spelling in comments", "Have another developer examine your code for quality, bugs, and improvements", "Measure how fast the code runs"], correct: 2, explanation: "Code review is when one or more developers read and critique another's code before it is merged. It catches bugs, improves code quality, spreads knowledge across the team, and ensures the codebase stays consistent. It is standard practice in all professional development teams.", xp: 20 },
  { title: "What is system design?", question: "System design in software engineering is about...", options: ["Choosing colour schemes for an app", "Deciding which font to use", "Planning how the components of a large application fit together to handle scale and failure", "Writing the first version of code quickly"], correct: 2, explanation: "System design is the process of planning how an application's components — databases, servers, caches, queues, APIs — fit together to be reliable, scalable, and maintainable. Senior developers are often distinguished by their system design thinking.", xp: 20 },
  { title: "What is caching?", question: "Caching in web development means...", options: ["Deleting old files regularly", "Storing copies of frequently requested data so future requests are faster", "Encrypting sensitive user data", "Compressing images for faster loading"], correct: 1, explanation: "Caching stores a copy of data closer to where it is needed — in memory, a CDN, or the browser. Instead of fetching the same data from a database on every request, a cache serves it instantly. It is one of the most effective ways to make applications faster and more scalable.", xp: 20 },
  { title: "What makes clean code?", question: "Which of these is the best indicator of clean code?", options: ["It has no comments at all", "Another developer can understand what it does without explanation", "It is written in as few lines as possible", "It uses advanced language features"], correct: 1, explanation: "Clean code communicates its intent clearly to any developer who reads it. Good naming, small focused functions, and logical structure matter more than brevity or cleverness. The goal is code that is easy to understand, modify, and debug — often by yourself six months later.", xp: 20 }
];

// ── SHARED CHALLENGE MODAL ────────────────────────────────────────────────────
// All challenge modes use this single helper to open the modal.
// xpKey is a unique string to prevent awarding XP twice for the same question.
function _openChallengeModal(challenge, headingText, subText, xpKey) {
  document.getElementById('challenge-title').textContent = headingText;
  document.getElementById('challenge-body').textContent = subText;
  document.getElementById('challenge-question').textContent = challenge.question;
  document.getElementById('challenge-result').style.display = 'none';

  document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b){ b.remove(); });

  var optionsEl = document.getElementById('challenge-options');
  optionsEl.innerHTML = '';
  challenge.options.forEach(function(opt, i) {
    var btn = document.createElement('button');
    btn.style.cssText = 'padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;cursor:pointer;text-align:left;transition:all 0.2s ease;width:100%;';
    btn.textContent = opt;
    btn.addEventListener('click', function() {
      answerChallenge(i, challenge.correct, challenge.xp, challenge.explanation, xpKey);
    });
    optionsEl.appendChild(btn);
  });

  document.getElementById('daily-challenge').style.display = 'flex';
}

// ── DAILY CHALLENGE ────────────────────────────────────────────────────────────
// ── DAILY CHALLENGE HELPERS ──────────────────────────────────────────
var _dailyChallengeShownThisSession = false;

function _isDailyChallengeAvailable() {
  var ts = parseInt(localStorage.getItem('codebook_challenge_ts') || '0');
  return !ts || (Date.now() - ts >= 86400000);
}

function _markDailyChallengeComplete() {
  localStorage.setItem('codebook_challenge_ts', String(Date.now()));
}

function _dailyChallengeResetsIn() {
  var ts = parseInt(localStorage.getItem('codebook_challenge_ts') || '0');
  if (!ts) return null;
  var msLeft = 86400000 - (Date.now() - ts);
  if (msLeft <= 0) return null;
  var h = Math.floor(msLeft / 3600000);
  var m = Math.floor((msLeft % 3600000) / 60000);
  return h > 0 ? h + 'h ' + m + 'm' : m + 'm';
}

// Advances one question per calendar day. Deterministic but changes daily.
function _showChallengeLockPopup(resetsIn) {
  var el = document.getElementById('challenge-lock-popup');
  if (el) el.remove();
  el = document.createElement('div');
  el.id = 'challenge-lock-popup';
  el.innerHTML =
    '<div class="clp-card">' +
    '<div class="clp-owl">🦉</div>' +
    '<div class="clp-title">Already completed today</div>' +
    '<div class="clp-timer">Resets in <strong>' + resetsIn + '</strong></div>' +
    '<button class="clp-btn" onclick="document.getElementById(\'challenge-lock-popup\').remove()">Got it</button>' +
    '</div>';
  el.addEventListener('click', function(e) { if (e.target === el) el.remove(); });
  document.body.appendChild(el);
}

function showDailyChallenge() {
  if (!_isDailyChallengeAvailable()) {
    _showChallengeLockPopup(_dailyChallengeResetsIn());
    return;
  }
  _dailyChallengeShownThisSession = true;
  showChallengeIntro('daily', function() {
    var today = new Date().toDateString();
    var epoch = new Date('2025-01-01').getTime();
    var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
    var challenge = DAILY_CHALLENGES[daysSinceEpoch % DAILY_CHALLENGES.length];
    _openChallengeModal(
      challenge,
      challenge.title,
      "Complete today's challenge and earn +" + challenge.xp + ' bonus XP.',
      'challenge-' + today
    );
  });
}

function answerChallenge(chosen, correct, xp, explanation, xpKey) {
  var today = new Date().toDateString();
  // Use provided xpKey (unique per question+mode), fall back to today for daily
  var key = xpKey || ('challenge-' + today);

  var buttons = document.querySelectorAll('#challenge-options button');
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === correct) btn.style.borderColor = 'var(--success)';
    else if (i === chosen && chosen !== correct) btn.style.borderColor = 'var(--floor3)';
  });

  var resultEl = document.getElementById('challenge-result');
  resultEl.style.display = 'block';

  if (chosen === correct) {
    resultEl.style.background = 'rgba(110,200,126,0.08)';
    resultEl.style.border = '1px solid var(--success)';
    resultEl.style.color = 'var(--text-dim)';
    resultEl.innerHTML = '<strong style="color:var(--success)">Correct! +' + xp + ' XP</strong><br><br>' + explanation;
    awardXP(xp, key, window.innerWidth / 2, 200);
  } else {
    resultEl.style.background = 'rgba(200,126,154,0.08)';
    resultEl.style.border = '1px solid var(--floor3)';
    resultEl.style.color = 'var(--text-dim)';
    resultEl.innerHTML = '<strong style="color:var(--floor3)">Not quite.</strong><br><br>' + explanation;
  }

  // Mark daily challenge done in localStorage only for the daily mode
  if (!xpKey || xpKey.indexOf('challenge-') === 0) {
    _markDailyChallengeComplete();
    updateChallengeDot();
    checkAndUnlockBadges();
  }

  setTimeout(function() {
    document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b){ b.remove(); });
    var closeBtn = document.createElement('button');
    closeBtn.className = 'auth-btn';
    closeBtn.textContent = 'Continue learning →';
    closeBtn.onclick = closeDailyChallenge;
    closeBtn.style.marginTop = '8px';
    var lastChild = document.querySelector('#daily-challenge > div > div:last-child');
    if (lastChild) lastChild.prepend(closeBtn);
  }, 500);
}

function closeDailyChallenge() {
  document.getElementById('daily-challenge').style.display = 'none';
  updateChallengeDot();
}

function updateChallengeDot() {
  var btn = document.getElementById('tnav-challenge');
  if (!btn) return;
  var done = !_isDailyChallengeAvailable();
  var dot = btn.querySelector('.ch-notif-dot');
  if (!done) {
    if (!dot) {
      dot = document.createElement('span');
      dot.className = 'ch-notif-dot';
      btn.appendChild(dot);
    }
  } else {
    if (dot) dot.remove();
  }
}

// ── CHALLENGE INTRO SYSTEM ────────────────────────────────────────────
var CHALLENGE_INTROS = {
  daily:  { emoji: '⚡', name: 'KNOWLEDGE CHECK',   rule: 'ONE QUESTION · EARN BONUS XP',       accent: '#7dd3fc' },
  recall: { emoji: '🧠', name: 'SPACED RECALL',     rule: 'REINFORCE · STRENGTHEN · RETAIN',    accent: '#a78bfa' },
  speed:  { emoji: '⏱',  name: 'SPEED ROUND',       rule: '10 QUESTIONS · 10 SECONDS EACH',     accent: '#f87171' },
  streak: { emoji: '🔥', name: 'STREAK CHALLENGE',  rule: 'FIVE IN A ROW · NO MISTAKES',        accent: '#fb923c' },
  boss:   { emoji: '🏆', name: 'FLOOR BOSS',        rule: 'COMPREHENSIVE KNOWLEDGE ASSESSMENT', accent: '#fbbf24' }
};

var _ciCallback = null;
var _ciTimer = null;

function showChallengeIntro(key, callback) {
  var cfg = CHALLENGE_INTROS[key];
  if (!cfg) { callback(); return; }
  _ciCallback = callback;

  var overlay = document.getElementById('challenge-intro');
  if (!overlay) { callback(); return; }

  overlay.style.setProperty('--ci-accent', cfg.accent);
  var _ciType = key === 'boss' ? 'FLOOR' : key.toUpperCase();
  document.getElementById('ci-icon').innerHTML = getChallengeIcon(_ciType, cfg.accent, 80);
  document.getElementById('ci-rule').textContent = cfg.rule;

  var nameEl = document.getElementById('ci-name');
  nameEl.textContent = '';
  var cd = document.getElementById('ci-countdown');
  cd.textContent = '';
  cd.className = 'ci-countdown';

  overlay.classList.remove('ci-leaving');
  overlay.style.display = 'flex';

  setTimeout(function() { _ciScramble(nameEl, cfg.name, 650); }, 180);
  setTimeout(function() { _ciCountdown(3); }, 1100);
}

function _ciScramble(el, text, duration) {
  var pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>/\\_-';
  var start = Date.now();
  var frame = setInterval(function() {
    var p = Math.min((Date.now() - start) / duration, 1);
    var out = '';
    for (var i = 0; i < text.length; i++) {
      if (text[i] === ' ' || text[i] === '·' || text[i] === '-') { out += text[i]; continue; }
      out += (i / text.length < p) ? text[i] : pool[Math.floor(Math.random() * pool.length)];
    }
    el.textContent = out;
    if (p >= 1) clearInterval(frame);
  }, 40);
}

function _ciCountdown(n) {
  var cd = document.getElementById('ci-countdown');
  if (!cd) return;
  cd.className = 'ci-countdown' + (n === 0 ? ' ci-go' : '');
  cd.textContent = n === 0 ? 'GO' : (n < 10 ? '0' + n : String(n));
  void cd.offsetWidth;
  cd.classList.add('ci-ticking');
  _ciTimer = setTimeout(function() {
    if (n > 0) _ciCountdown(n - 1);
    else _ciClose();
  }, n === 0 ? 680 : 760);
}

function _ciClose() {
  var overlay = document.getElementById('challenge-intro');
  if (!overlay) return;
  overlay.classList.add('ci-leaving');
  setTimeout(function() {
    overlay.style.display = 'none';
    overlay.classList.remove('ci-leaving');
    if (_ciCallback) { var cb = _ciCallback; _ciCallback = null; cb(); }
  }, 350);
}

function skipChallengeIntro() {
  clearTimeout(_ciTimer);
  _ciClose();
}

// ── SECTION RECAP ────────────────────────────────────────────────
var _srDoneCallback = null;

function _dismissSectionRecap() {
  var el = document.getElementById('section-recap');
  if (el) el.remove();
  if (_srDoneCallback) { var cb = _srDoneCallback; _srDoneCallback = null; cb(); }
}

function showSectionRecap(section, onComplete) {
  // Strip HTML tags to get plain text for term matching
  var bodyText = ((section && section.body) || '').replace(/<[^>]+>/g, ' ').toLowerCase();
  var map = getTermMap();
  var matched = [];
  if (typeof REVISION_CARDS !== 'undefined') {
    REVISION_CARDS.forEach(function(c) {
      var t = c.term.toLowerCase();
      var re = new RegExp('(?<![a-z])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![a-z])');
      if (re.test(bodyText)) matched.push(c);
    });
  }

  if (!matched.length) { onComplete(); return; }

  _srDoneCallback = onComplete;

  var termsHtml = matched.map(function(c) {
    return '<span class="sr-term">' + c.term + '</span>';
  }).join('');

  var el = document.createElement('div');
  el.id = 'section-recap';
  el.innerHTML =
    '<div class="sr-card">' +
    '<div class="sr-owl">&#x1F989;</div>' +
    '<div class="sr-heading">Section Complete</div>' +
    '<div class="sr-sub">Key terms you encountered</div>' +
    '<div class="sr-terms">' + termsHtml + '</div>' +
    '<button class="sr-btn" onclick="_dismissSectionRecap()">Continue &nbsp;&rarr;</button>' +
    '</div>';
  document.body.appendChild(el);
}

function renderChallengePanel() {
  var panel = document.getElementById('panel-challenge');
  if (!panel) return;

  var challenges = [
    (function() { var _dd = !_isDailyChallengeAvailable(); var _dr = _dd ? _dailyChallengeResetsIn() : null; return { type: 'DAILY', color: '#7dd3fc', title: "Today's Knowledge Check", desc: _dd && _dr ? 'Resets in ' + _dr + '.' : 'One question. Earn bonus XP. Returns 24 hours after completion.', xp: '+20 XP', action: 'showDailyChallenge()', done: _dd }; })(),
    { type: 'RECALL', color: '#a78bfa', title: 'Spaced Repetition Quiz', desc: 'Questions from sections you completed. Reinforce what you know.', xp: '+15 XP each', action: 'startRecallQuiz()', done: false },
    { type: 'SPEED', color: '#f87171', title: 'Speed Round', desc: '10 questions. 10 seconds each. Auto-advances every answer. Resets daily.', xp: '+50 XP', action: 'startSpeedRound()', done: !!localStorage.getItem('codebook_speed_done_' + new Date().toDateString()), locked: state.xp < 100 },
    { type: 'STREAK', color: '#fb923c', title: 'Streak Challenge', desc: '5 questions in a row. One wrong answer ends it. Resets daily.', xp: '+75 XP', action: 'startStreakChallenge()', done: !!localStorage.getItem('codebook_streak_done_' + new Date().toDateString()), locked: state.xp < 200 },
    { type: 'FLOOR', color: '#fbbf24', title: 'Floor Boss', desc: 'A comprehensive quiz on everything in the floor you just completed.', xp: '+100 XP', action: 'startFloorBoss()', done: false, locked: !isFloorComplete(state.currentFloor - 1) },
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">CHALLENGE MODE</div>' +
    '<div class="panel-hero-title">Test Yourself</div>' +
    '<div class="panel-hero-sub">Challenges earn bonus XP and reinforce what you\'ve learned. The daily check resets at midnight.</div>' +
    '</div>' +
    '<div class="challenge-list">';

  challenges.forEach(function(ch) {
    var isLocked = ch.locked;
    var isDone = ch.done;
    html += '<div class="challenge-item' + (isLocked ? ' ch-locked' : '') + (isDone ? ' ch-done' : '') + '"' +
      (!isLocked ? ' onclick="' + ch.action + '"' : '') + '>' +
      '<div class="ch-icon">' + getChallengeIcon(ch.type, ch.color) + '</div>' +
      '<div class="ch-body">' +
      '<div class="ch-tag">' + ch.type + (isDone ? ' — DONE TODAY' : isLocked ? ' — LOCKED' : '') + '</div>' +
      '<div class="ch-title">' + ch.title + '</div>' +
      '<div class="ch-desc">' + ch.desc + '</div>' +
      '</div>' +
      '<div class="ch-xp">' + (isDone ? '✓' : ch.xp) + '</div>' +
      '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

// ── RECALL QUIZ ──────────────────────────────────────────────────────────────
// Picks a random question the user has NOT seen today, avoiding repetition.
function startRecallQuiz() {
  var answered = Object.keys(state.quizAnswered);
  if (answered.length === 0) {
    sageMessage('Complete some sections first to unlock recall quizzes.', 'tip');
    return;
  }
  showChallengeIntro('recall', function() {
    var today = new Date().toDateString();
    var epoch = new Date('2025-01-01').getTime();
    var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
    var dailyIdx = daysSinceEpoch % DAILY_CHALLENGES.length;
    var recallIdx = (dailyIdx + 1) % DAILY_CHALLENGES.length;
    var challenge = DAILY_CHALLENGES[recallIdx];
    _openChallengeModal(
      challenge,
      'Spaced Repetition',
      'Reinforce what you already know. +' + challenge.xp + ' XP for a correct answer.',
      'recall-' + today + '-' + recallIdx
    );
  });
}

// ── SPEED ROUND ──────────────────────────────────────────────────────────────
// 10 questions, 10 seconds each. Auto-advances on any answer or timeout.
// Locked for the rest of the day once completed; resets at midnight.
var _speedRoundScore = 0;
var _speedRoundTotal = 10;
var _speedRoundCurrent = 0;
var _speedRoundTimer = null;
var _speedRoundTimeLeft = 10;
var _speedRoundAnswered = false;

function startSpeedRound() {
  var today = new Date().toDateString();
  if (localStorage.getItem('codebook_speed_done_' + today)) {
    sageMessage('Speed Round already completed today. Come back tomorrow!', 'tip');
    return;
  }
  if (state.xp < 100) { sageMessage('Earn 100 XP to unlock the Speed Round — complete more sections to get there.', 'tip'); return; }
  showChallengeIntro('speed', function() {
    _speedRoundScore = 0;
    _speedRoundCurrent = 0;
    _nextSpeedQuestion();
  });
}

function _nextSpeedQuestion() {
  if (_speedRoundCurrent >= _speedRoundTotal) { _endSpeedRound(); return; }
  clearInterval(_speedRoundTimer);
  _speedRoundAnswered = false;

  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + _speedRoundCurrent + 2) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var questionNum = _speedRoundCurrent + 1;

  document.getElementById('daily-challenge').style.display = 'flex';
  document.getElementById('challenge-title').textContent = 'Speed Round — ' + questionNum + ' of ' + _speedRoundTotal;
  document.getElementById('challenge-body').textContent = 'Score: ' + _speedRoundScore + ' correct';
  document.getElementById('challenge-question').textContent = challenge.question;
  document.getElementById('challenge-result').style.display = 'none';
  document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b) { b.remove(); });

  var existingBar = document.getElementById('speed-timer-bar');
  if (existingBar) existingBar.remove();
  var timerWrap = document.createElement('div');
  timerWrap.id = 'speed-timer-bar';
  timerWrap.style.cssText = 'height:4px;background:var(--border);border-radius:4px;margin-bottom:16px;overflow:hidden;';
  var timerFill = document.createElement('div');
  timerFill.id = 'speed-timer-fill';
  timerFill.style.cssText = 'height:100%;background:var(--accent);border-radius:4px;width:100%;transition:width 1s linear;';
  timerWrap.appendChild(timerFill);

  var questionEl = document.getElementById('challenge-question');
  questionEl.parentNode.insertBefore(timerWrap, questionEl);

  var optionsEl = document.getElementById('challenge-options');
  optionsEl.innerHTML = '';
  challenge.options.forEach(function(opt, i) {
    var btn = document.createElement('button');
    btn.style.cssText = 'padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;cursor:pointer;text-align:left;transition:border-color 0.2s ease;width:100%;';
    btn.textContent = opt;
    btn.addEventListener('click', function() { _answerSpeedQuestion(i, challenge.correct); });
    optionsEl.appendChild(btn);
  });

  _speedRoundTimeLeft = 10;
  _speedRoundTimer = setInterval(function() {
    _speedRoundTimeLeft--;
    var fill = document.getElementById('speed-timer-fill');
    if (fill) fill.style.width = ((_speedRoundTimeLeft / 10) * 100) + '%';
    if (_speedRoundTimeLeft <= 0) {
      clearInterval(_speedRoundTimer);
      if (!_speedRoundAnswered) _answerSpeedQuestion(-1, challenge.correct);
    }
  }, 1000);
}

function _answerSpeedQuestion(chosen, correct) {
  if (_speedRoundAnswered) return;
  _speedRoundAnswered = true;
  clearInterval(_speedRoundTimer);
  if (chosen === correct) _speedRoundScore++;

  var buttons = document.querySelectorAll('#challenge-options button');
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === correct) btn.style.borderColor = 'var(--success)';
    else if (i === chosen) btn.style.borderColor = 'var(--floor3)';
  });
  var fill = document.getElementById('speed-timer-fill');
  if (fill) { fill.style.transition = 'none'; fill.style.width = '0%'; }

  _speedRoundCurrent++;
  setTimeout(_nextSpeedQuestion, 700);
}

function _endSpeedRound() {
  clearInterval(_speedRoundTimer);
  var today = new Date().toDateString();
  localStorage.setItem('codebook_speed_done_' + today, 'true');
  var bar = document.getElementById('speed-timer-bar');
  if (bar) bar.remove();

  var score = _speedRoundScore;
  var xpEarned = score * 5;
  awardXP(xpEarned, 'speed-round-' + today, window.innerWidth / 2, 200);
  checkAndUnlockBadges();
  renderChallengePanel();

  document.getElementById('challenge-title').textContent = 'Speed Round Complete!';
  document.getElementById('challenge-body').textContent = score + ' of ' + _speedRoundTotal + ' correct — +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = score >= 8 ? '🏆 Excellent!' : score >= 5 ? '👍 Good effort!' : '💪 Keep practising!';
  document.getElementById('challenge-options').innerHTML = '';
  document.getElementById('challenge-result').style.display = 'none';
  var doneBtn = document.createElement('button');
  doneBtn.className = 'auth-btn';
  doneBtn.textContent = 'Done →';
  doneBtn.style.marginTop = '16px';
  doneBtn.onclick = closeDailyChallenge;
  document.getElementById('challenge-options').appendChild(doneBtn);
}



// ── STREAK CHALLENGE ─────────────────────────────────────────────
// 5 questions in a row. One wrong answer ends the run. Resets daily.
var _streakTotal = 5;
var _streakCurrent = 0;
var _streakCorrect = 0;
var _streakFailed = false;
var _streakAnswered = false;

function startStreakChallenge() {
  if (state.xp < 200) { sageMessage('Earn 200 XP to unlock the Streak Challenge — keep completing sections.', 'tip'); return; }
  var today = new Date().toDateString();
  if (localStorage.getItem('codebook_streak_done_' + today)) {
    sageMessage('Streak Challenge already completed today. Come back tomorrow!', 'tip');
    return;
  }
  showChallengeIntro('streak', function() {
    _streakCurrent = 0;
    _streakCorrect = 0;
    _streakFailed = false;
    _nextStreakQuestion();
  });
}

function _nextStreakQuestion() {
  if (_streakFailed || _streakCurrent >= _streakTotal) {
    _endStreakChallenge();
    return;
  }
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + 3 + _streakCurrent) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var qNum = _streakCurrent + 1;

  document.getElementById('daily-challenge').style.display = 'flex';
  document.getElementById('challenge-title').textContent = 'Streak Challenge — ' + qNum + ' of ' + _streakTotal;
  document.getElementById('challenge-body').innerHTML = '🔥 Streak: <strong>' + _streakCorrect + '</strong>' + (_streakCorrect > 0 ? ' &nbsp;•&nbsp; Keep it going!' : ' &nbsp;•&nbsp; One wrong ends it.');
  document.getElementById('challenge-question').textContent = challenge.question;
  document.getElementById('challenge-result').style.display = 'none';
  document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b) { b.remove(); });
  _streakAnswered = false;

  var optionsEl = document.getElementById('challenge-options');
  optionsEl.innerHTML = '';
  challenge.options.forEach(function(opt, i) {
    var btn = document.createElement('button');
    btn.style.cssText = 'padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;cursor:pointer;text-align:left;transition:border-color 0.2s ease;width:100%;';
    btn.textContent = opt;
    btn.addEventListener('click', function() { _answerStreakQuestion(i, challenge.correct); });
    optionsEl.appendChild(btn);
  });
}

function _answerStreakQuestion(chosen, correct) {
  if (_streakAnswered) return;
  _streakAnswered = true;
  var isCorrect = chosen === correct;
  var buttons = document.querySelectorAll('#challenge-options button');
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === correct) btn.style.borderColor = 'var(--success)';
    else if (i === chosen) btn.style.borderColor = 'var(--floor3)';
  });
  if (isCorrect) {
    _streakCorrect++;
    _streakCurrent++;
    setTimeout(_nextStreakQuestion, 700);
  } else {
    _streakFailed = true;
    _streakCurrent++;
    setTimeout(_endStreakChallenge, 1200);
  }
}

function _endStreakChallenge() {
  var today = new Date().toDateString();
  localStorage.setItem('codebook_streak_done_' + today, 'true');
  var xpEarned = (_streakFailed ? _streakCorrect * 10 : 75);
  awardXP(xpEarned, 'streak-challenge-' + today, window.innerWidth / 2, 200);
  checkAndUnlockBadges();
  renderChallengePanel();

  var perfect = !_streakFailed;
  document.getElementById('challenge-title').textContent = perfect ? 'Perfect Streak! 🔥' : 'Streak Broken!';
  document.getElementById('challenge-body').textContent = _streakCorrect + ' of ' + _streakTotal + ' correct — +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = perfect ? '🌟 Flawless run!' : _streakCorrect >= 3 ? '👍 Good run — so close!' : '💪 Keep practising!';
  document.getElementById('challenge-options').innerHTML = '';
  document.getElementById('challenge-result').style.display = 'none';
  var doneBtn = document.createElement('button');
  doneBtn.className = 'auth-btn';
  doneBtn.textContent = 'Done →';
  doneBtn.style.marginTop = '16px';
  doneBtn.onclick = closeDailyChallenge;
  document.getElementById('challenge-options').appendChild(doneBtn);
}


// ── FLOOR BOSS ────────────────────────────────────────────────────────────────
// 5 questions drawn from the current floor. All must be answered.
var _bossScore = 0;
var _bossTotal = 5;
var _bossCurrent = 0;

function startFloorBoss() {
  var fi = state.currentFloor - 1;
  if (!isFloorComplete(fi)) return;
  showChallengeIntro('boss', function() {
    _bossScore = 0;
    _bossCurrent = 0;
    _nextBossQuestion();
  });
}

function _nextBossQuestion() {
  if (_bossCurrent >= _bossTotal) {
    _endFloorBoss();
    return;
  }
  var fi = state.currentFloor - 1;
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + fi + 4 + _bossCurrent) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  var qNum = _bossCurrent + 1;
  var originalCorrect = challenge.correct;

  _openChallengeModal(
    challenge,
    'Floor ' + state.currentFloor + ' Boss — ' + qNum + ' of ' + _bossTotal,
    'Prove you mastered this floor. ' + _bossScore + ' correct so far.',
    'boss-floor' + fi + '-' + today + '-' + _bossCurrent
  );

  var optionsEl = document.getElementById('challenge-options');
  optionsEl.querySelectorAll('button').forEach(function(btn, i) {
    btn.replaceWith(btn.cloneNode(true));
  });
  optionsEl.querySelectorAll('button').forEach(function(btn, i) {
    btn.addEventListener('click', function() {
      answerChallenge(i, originalCorrect, challenge.xp, challenge.explanation, 'boss-floor' + fi + '-' + today + '-' + _bossCurrent);
      if (i === originalCorrect) _bossScore++;
      _bossCurrent++;
      setTimeout(function() {
        if (_bossCurrent >= _bossTotal) {
          _endFloorBoss();
        } else {
          _nextBossQuestion();
        }
      }, 1800);
    });
  });
}

function _endFloorBoss() {
  var fi = state.currentFloor - 1;
  var xpEarned = _bossScore === _bossTotal ? 100 : _bossScore * 15;
  var today = new Date().toDateString();
  awardXP(xpEarned, 'floor-boss-' + fi + '-' + today, window.innerWidth / 2, 200);
  checkAndUnlockBadges();
  renderChallengePanel();
  document.getElementById('challenge-title').textContent = 'Floor Boss Complete!';
  document.getElementById('challenge-body').textContent = _bossScore + ' of ' + _bossTotal + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = _bossScore === _bossTotal ? '🏆 Perfect — Floor ' + state.currentFloor + ' mastered!' : _bossScore >= 3 ? '👍 Solid knowledge!' : '📖 Revisit this floor.';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}
