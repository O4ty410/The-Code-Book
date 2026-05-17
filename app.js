let isLoggedIn = false;
let isGuest = false;
let currentFloor = 1;

let sageIdleTimer = null;

// Shared AudioContext \u2014 created once on first use to avoid browser limits
let _sharedAudioCtx = null;
function getAudioContext() {
  if (!_sharedAudioCtx) {
    _sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (_sharedAudioCtx.state === 'suspended') {
    _sharedAudioCtx.resume();
  }
  return _sharedAudioCtx;
}

const FLOORS = [
  
    {
    id: 1,
    title: "Understanding Before Touching",
    subtitle: "How code actually thinks",
    color: "#c8a96e",
    duration: "3-4 weeks",
    sessions: "5 per week",
    length: "45-60 min",
    tag: "Floor 01 — Foundation",
    sections: [
      {
        id: "1-1",
        title: "How the Internet Actually Works",
        body: `The page you're reading right now travelled from a server to your browser in under 200 milliseconds. Here's exactly what happened.\n\nYou typed an address and pressed Enter. Your browser sent a <strong>request</strong> — a message that said "give me this page." That request travelled to a server — another computer, always on, always connected — that found the right files and sent them back. Your browser read those files and drew what you're looking at now. That entire sequence happened before you could blink.\n\nEvery webpage — Gmail, Airbnb, the BBC, this one — is the result of that same cycle. And every page is made of exactly three types of files:\n\n<strong>HTML</strong> — the structure. Headings, paragraphs, buttons.\n<strong>CSS</strong> — the visual style. Colours, fonts, layout.\n<strong>JavaScript</strong> — the behaviour. What happens when you click, type, or scroll.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — right-click anywhere on this page and choose "View Page Source." What you see is the exact file the server sent to your browser. Scan it. Can you spot the three types of files at work?</div>\n\nYou are going to learn all three. But the most important thing to understand right now is this: you are not creating magic. You are creating files. Files that any computer in the world can read and display.\n\nEvery developer at Google, Stripe, and Spotify is doing exactly that. So will you.`,
        callout: {
          type: "default",
          label: "The Key Idea",
          text: "Every website you've ever visited is just a set of files sitting on a computer somewhere in the world. Your job as a developer is to create those files."
        },
        callout2: {
          type: "focus",
          label: "For Your Brain",
          text: "Don't try to memorise this. Just let the idea sit. You're building a mental picture, not a fact sheet. The detail comes later through doing."
        },
        hint: `The request-response cycle is how the entire web works. Browser asks. Server answers.\n\n<strong>Try this right now:</strong> Open any website. Right-click anywhere on the page and choose "View Page Source." What you see — all of it — is what the server sent back to your browser. Every site you've ever visited sent files that looked like that.\n\n<strong>Still fuzzy?</strong> Think of it like ordering food. You place an order (request). The kitchen prepares it (server processes). The waiter brings it to your table (response). Your browser is the waiter. You're the one eating.`,
        quiz: {
          question: "When you visit a website, what is your browser actually doing?",
          options: [
            "Creating the website from scratch using your computer's resources",
            "Requesting and displaying files sent from another computer called a server",
            "Downloading the entire internet to your hard drive",
            "Connecting directly to the website owner's personal computer"
          ],
          correct: 1,
          feedback: "Your browser sends a request to a server — another computer — which sends back files. Your browser reads those files and displays them. That's it. Option A is wrong because browsers don't create content — they display it. Option C is wrong because only the specific files for that page are sent. Option D is wrong because servers are dedicated machines, not personal computers."
        },
        match: {
          prompt: "Every webpage is built from three types of files. Match each to what it does:",
          pairs: [
            { term: "HTML", def: "The structure — headings, paragraphs, buttons" },
            { term: "CSS", def: "The visual style — colours, fonts, layout" },
            { term: "JavaScript", def: "The behaviour — what happens when you interact" }
          ]
        }
      },
      {
        id: "1-2",
        title: "How a Computer Reads Instructions",
        body: `Computers are extraordinarily fast. But they are not smart. They do <strong>exactly</strong> what you tell them — nothing more, nothing less.\n\nA computer reads code <strong>line by line, top to bottom</strong>. It doesn't skip ahead. It doesn't assume. It reads instruction 1, executes it, then reads instruction 2. This is called <strong>sequential execution</strong> and it is the foundation of everything.\n\nThe order you write things in <strong>matters enormously</strong>. A recipe that says "serve the cake" before "bake the cake" produces nothing edible. Code works the same way. Ask a computer to display a result before it has calculated the result — and it has nothing to show.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — can you think of a real situation in your daily life where the order of steps is non-negotiable? What goes wrong if you change the order?</div>\n\nThis is one of the most common beginner mistakes. And now you already understand why it happens.\n\nProfessional developers spend a lot of time thinking about order. Not just what to do — but when.`,
        callout: {
          type: "default",
          label: "The Logical Thinker in You",
          text: "This is where your logical thinking becomes your biggest advantage. Code is pure logic. There is always a reason why something works or doesn't. You just have to find it."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "<strong>Don't rush this section.</strong> The concept of sequential execution is small but everything else is built on top of it. Two minutes understanding this properly saves hours of confusion later."
        },
        hint: `Think of a recipe. If it says "serve the cake" before "bake the cake" — you have a problem. Computers are the same. They do exactly what you say, in exactly the order you say it. No guessing, no common sense.\n\n<strong>Still fuzzy?</strong> Write out 5 instructions for making a cup of tea in order. That sequential thinking — that's exactly how a computer reads code.`,
        quiz: {
          question: "Your code has two steps: Step 1 displays a discount amount, Step 2 calculates what that discount is. What happens when you run it?",
          options: [
            "It works fine — computers are smart enough to figure out the right order",
            "It displays nothing or an error, because the discount hasn't been calculated yet when Step 1 runs",
            "It automatically calculates the discount first, then displays it",
            "It asks you which step to run first"
          ],
          correct: 1,
          feedback: "The computer tries to display the discount before it's been calculated — so there's nothing to show. Sequential execution means instructions run in the exact order written, top to bottom. Option A is wrong because computers have no 'common sense' — they follow instructions literally. Options C and D are wrong because computers never reorder or negotiate with you about steps."
        },
        code: {
          lang: "JavaScript",
          starter: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:\'IBM Plex Mono\',monospace;padding:24px;font-size:13px;line-height:1.7;">\n<h2 style="color:#c8a96e;margin-top:0;">Order Matters</h2>\n<div id="output"></div>\n<script>\n  var out = \'\';\n\n  // Step 1: Set a price\n  var price = 40;\n  out += \'<p>1. Price set to: £\' + price + \'</p>\';\n\n  // Step 2: Calculate a 10% discount\n  var discount = price * 0.10;\n  out += \'<p>2. Discount calculated: £\' + discount.toFixed(2) + \'</p>\';\n\n  // Step 3: Apply it\n  var finalPrice = price - discount;\n  out += \'<p style="color:#c8a96e;font-size:18px;margin-top:16px;">You pay: £\' + finalPrice.toFixed(2) + \'</p>\';\n\n  document.getElementById(\'output\').innerHTML = out;\n<\/script>\n</body>\n</html>',
          challenges: [
            "Move Step 3 above Step 2 — what breaks and why?",
            "Change the price from 40 to 120",
            "Change the discount from 10% to 25%"
          ]
        }
      },
      {
        id: "1-3",
        title: "The Logic Behind All Code",
        body: `Every program ever written — from a calculator app to a social network — is built from exactly three ideas.\n\n<strong>Conditions</strong> decide which path to take. If the user is logged in, show the dashboard. If not, show the login page. Every decision in code is a condition. There are no exceptions.\n\n<strong>Loops</strong> repeat instructions until something changes. Check every item in a shopping cart and add up the total. Send a notification to every user in a list. Any time something needs to happen "for each item" or "until a condition is met" — that is a loop.\n\n<strong>Functions</strong> are named, reusable blocks of instructions. Instead of writing the same ten lines every time you need to validate a form, you write it once, give it a name, and call that name whenever you need it. Functions are how professional code stays manageable as it scales.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — pick any app on your phone. Can you identify one decision it makes (condition), one thing it does repeatedly (loop), and one action it reuses across multiple screens (function)?</div>\n\nThere is nothing in any programming language — not one thing — that is not built on some combination of these three ideas. When you are writing complex software in two years, you will still be thinking in conditions, loops and functions.`,
        callout: {
          type: "default",
          label: "The Professional Lens",
          text: `When a developer reads someone else's code for the first time, this is what they look for: where are the conditions, where are the loops, where are the functions. Everything else is just detail. Master these three and you can read any codebase.`
        },
        hint: `A <strong>condition</strong> is a fork in the road. The road splits. You go one way or the other based on what's true.\nA <strong>loop</strong> is a roundabout. You go around until you're told to exit.\nA <strong>function</strong> is a shortcut. You name a journey once. Then you can take it anytime just by saying its name.\n\n<strong>Try this:</strong> Pick any app on your phone. Describe one condition it uses, one loop it uses, and one repeated action that is probably a function. You will find all three in under a minute.`,
        quiz: {
          question: "A shopping cart calculates tax on every item in the basket. Which concept handles the 'do this for every item' part?",
          options: [
            "A condition — because the cart needs to decide whether tax applies",
            "A function — because the tax calculation is reused",
            "A loop — because it repeats the same operation for each item until all items are processed",
            "A variable — because it stores the running total"
          ],
          correct: 2,
          feedback: "A loop repeats instructions for each item until there are no more items left. A condition (option A) would decide whether something applies — like whether tax is applicable at all. A function (option B) would hold the tax calculation logic, but the 'do this for every item' part is still a loop calling that function. A variable (option D) stores data, not a repeated process."
        },
        code: {
          lang: "JavaScript",
          starter: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:\'IBM Plex Mono\',monospace;padding:24px;font-size:13px;line-height:1.8;">\n<h2 style="color:#c8a96e;margin-top:0;">All Three Building Blocks</h2>\n<div id="output"></div>\n<script>\n  var out = \'\';\n\n  // CONDITION\n  var isLoggedIn = true;\n  if (isLoggedIn) {\n    out += \'<p style="color:#7eb8c8;">&#x2713; Condition: logged in &rarr; showing dashboard</p>\';\n  } else {\n    out += \'<p style="color:#7eb8c8;">&#x2717; Condition: not logged in &rarr; redirecting to login</p>\';\n  }\n\n  // LOOP\n  for (var i = 1; i <= 3; i++) {\n    out += \'<p style="color:#a8d5a2;">Loop iteration \' + i + \' of 3</p>\';\n  }\n\n  // FUNCTION\n  function greet(name) {\n    return \'Welcome, \' + name + \'. You are ready to build.\';\n  }\n  out += \'<p style="color:#c8a96e;margin-top:8px;">\' + greet(\'Developer\') + \'</p>\';\n\n  document.getElementById(\'output\').innerHTML = out;\n<\/script>\n</body>\n</html>',
          challenges: [
            "Change isLoggedIn to false — watch the condition take the other path",
            "Change the loop to run 10 times instead of 3",
            "Pass your own name to the greet() function"
          ]
        },
        match: {
          prompt: "Match each concept to what it does:",
          pairs: [
            { term: "Condition", def: "Decides which path the code takes" },
            { term: "Loop", def: "Repeats instructions until something changes" },
            { term: "Function", def: "A named, reusable block of instructions" }
          ]
        }
      },
      {
        id: "1-4",
        title: "Your First Look at Real Code",
        body: `You are not going to write code yet. You are going to <strong>read</strong> it.\n\nThis is deliberate. Every professional developer spends more time reading code than writing it. The engineers at GitHub read code written by people they've never met. The engineers at Stripe read code that was written years before they joined. Reading fluently is not a step toward writing — it is the more important skill.\n\nBefore you speak a language fluently, you learn to recognise it. Same principle here. Reading code before writing it trains your brain to see structure and meaning rather than just symbols.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — look at the five lines of code below without reading any explanation. Cover the hints. Just guess: what does each line tell the browser to do? Write your guesses down. Then compare. The act of guessing — even incorrectly — is already how developers think when they open an unfamiliar file.</div>\n\nLook at the example. Do not panic. Do not try to memorise it. Read it like road signs, not like a textbook.`,
        code: {
          lang: "HTML",
          lines: [
            '<span class="code-comment">&lt;!-- This is a comment. The computer ignores it. It\'s just a note for humans. --&gt;</span>',
            '',
            '<span class="code-tag">&lt;h1&gt;</span>Hello, World<span class="code-tag">&lt;/h1&gt;</span>',
            '<span class="code-tag">&lt;p&gt;</span>This is my first piece of code.<span class="code-tag">&lt;/p&gt;</span>',
            '<span class="code-tag">&lt;button&gt;</span>Click Me<span class="code-tag">&lt;/button&gt;</span>'
          ],
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; }\n    h1 { color: #c8a96e; }\n    button {\n      background: #c8a96e; border: none; color: #0a0a0a;\n      padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;\n    }\n  </style>\n</head>\n<body>\n  <!-- This is a comment. The browser ignores it. -->\n  <h1>Hello, World</h1>\n  <p>This is my first piece of code.</p>\n  <button>Click Me</button>\n</body>\n</html>',
          challenges: [
            "Change 'Hello, World' to your own name",
            "Add a second paragraph below the first",
            "Change the button text to 'I built this'",
            "Add a second heading using <h2>"
          ]
        },
        callout: {
          type: "default",
          label: "What You're Looking At",
          text: "Those angle brackets — the &lt; and &gt; — are called <strong>tags</strong>. They're labels that tell the browser what each piece of content is. h1 means a big heading. p means a paragraph. button means a clickable button. Open tag, content, close tag. That's the pattern."
        },
        callout2: {
          type: "focus",
          label: "What You're Actually Learning",
          text: `The three lines below represent three of the most-used elements in all of web development. Every professional developer has written h1, p and button hundreds of times. By the end of this course, so will you.`
        },
        hint: `Don't read the code like a sentence. Read it like signs on a road.\n\nThe tag name tells you what type of thing it is. &lt;h1&gt; = big heading. &lt;p&gt; = paragraph. &lt;button&gt; = button. The words between the opening and closing tag are what actually appears on screen.\n\n<strong>Still fuzzy?</strong> Think of tags like labels on boxes. The label tells you what's inside. The content is the thing inside the box. Open the box (opening tag), here's what's inside (content), close the box (closing tag).`,
        quiz: {
          question: "Looking at the code example — what does the &lt;p&gt; tag tell the browser about the content inside it?",
          options: [
            "That this content should be in a large, bold font",
            "That this content is a paragraph of regular body text",
            "That this content should be clickable like a button",
            "That this line is a comment the browser should ignore"
          ],
          correct: 1,
          feedback: "The &lt;p&gt; tag labels its content as a paragraph — regular body text. It doesn't style it bold (that's CSS, not HTML), it doesn't make it clickable (that's &lt;button&gt;), and comments use &lt;!-- --&gt; syntax, not tags. Tags are labels: they tell the browser what type of content is inside, and the browser applies its default styling for that type."
        }
      },
      {
        id: "1-5",
        title: "Floor 1 Check — Prove It Back",
        body: `Before you move to Floor 2, do a genuine check — not for this app, but for yourself.\n\nYou have covered the four ideas that underpin everything in web development: how the internet works, how computers read instructions sequentially, the three building blocks of all code, and your first look at HTML tags.\n\nThis is not a small thing. Most people who try to learn to code never properly understand these foundations — they rush to write syntax before they understand what it is or why it works. You have not done that.\n\nThe questions below get progressively harder. They test whether you can connect and apply what you've learned — not just recall it. Answer each one honestly in your head before selecting. If something feels shaky, go back to that one section. Not the whole floor — just that section.`,
        callout: {
          type: "default",
          label: "The Foundation",
          text: `What you have learned on Floor 1 is not beginner knowledge that you will forget when things get advanced. It is the foundation every professional developer still thinks from. The concepts scale with you.`
        },
        callout2: {
          type: "focus",
          label: "Floor 2 Preview",
          text: `Floor 2 is where it becomes real. You will write actual HTML and CSS and see the results on screen immediately. Everything you understood here becomes something you can build.`
        },
        hint: `If you cannot answer the questions below without guessing — that is useful information, not failure. It tells you exactly which section to return to. One weak brick does not mean a broken building. It means one brick to fix.`,
        quiz: {
          questions: [
            {
              question: "What is the correct term for what happens when a browser sends a message to a server asking for a webpage?",
              options: [
                "A download — because the page is saved to your computer",
                "A request — the browser asks, the server responds with files",
                "A render — because the browser draws the page",
                "A compile — because the browser converts the files"
              ],
              correct: 1,
              feedback: "The browser sends a request and the server sends a response containing files. This request-response cycle is the foundation of how the entire web works. 'Download' implies permanent storage. 'Render' happens after the files arrive — it's what the browser does with them. 'Compile' is a different process entirely (converting source code to machine code)."
            },
            {
              question: "Code is written in this order: Line 1 displays a total. Line 2 calculates the total. What happens?",
              options: [
                "The total is displayed correctly because computers optimise execution order",
                "Line 1 displays nothing or an error because the total hasn't been calculated yet",
                "Line 2 runs first automatically because calculations must precede display",
                "An error is thrown and the program stops before either line runs"
              ],
              correct: 1,
              feedback: "Sequential execution means the computer runs Line 1 exactly as written — before Line 2. The total doesn't exist yet. Computers don't optimise or reorder instructions. They don't 'know' that a calculation should come first. This is why order is everything in code."
            },
            {
              question: "Which of the three core building blocks would you use to 'send a welcome email to every new user who signed up this week'?",
              options: [
                "A condition — because you need to check if they signed up this week",
                "A function — because the email-sending logic should be reusable",
                "A loop — because you need to repeat the action for each user in the list",
                "A combination of loop and function — the loop iterates users, the function sends each email"
              ],
              correct: 3,
              feedback: "This is the most sophisticated answer — and the correct one. The loop handles 'for each new user,' and the function holds the reusable email-sending logic that the loop calls. A condition alone can't repeat. A function alone doesn't iterate. The combination is how real code works: loops call functions, and conditions live inside both."
            },
            {
              question: "A developer builds a system that: checks whether a user has paid (condition), processes each item in their order one by one (loop), and uses the same discount calculation in three different places (function). Which statement is true?",
              options: [
                "This system uses all three core building blocks of programming",
                "Loops and functions are the same thing — both repeat code",
                "Conditions are not needed here — loops can make decisions",
                "You would need a fourth concept beyond conditions, loops, and functions"
              ],
              correct: 0,
              feedback: "Exactly right. One condition, one loop, one function — and you have described a real piece of professional software. Every system, no matter how complex, is built from combinations of these three things. Loops repeat but don't hold logic the way functions do. Conditions decide but don't repeat. All three serve distinct purposes."
            },
            {
              question: "What does the &lt;h1&gt; tag communicate to the browser?",
              options: [
                "Make this text large and bold using the browser's default heading style",
                "This content is the most important heading on the page",
                "Both A and B — h1 instructs styling AND declares semantic importance",
                "Ignore this line — h1 is a comment tag"
              ],
              correct: 2,
              feedback: "Both are true, but for different reasons. &lt;h1&gt; semantically declares this as the page's primary heading (most important), which search engines and screen readers use. The browser also applies default styling (large, bold) to headings. The semantic meaning is HTML's job. The styling is the browser's default — and CSS can override it entirely. &lt;h1&gt; is definitely not a comment — comments use &lt;!-- --&gt;."
            },
            {
              question: "You want to explain 'what a server is' to a friend who has never coded. Which explanation is most accurate?",
              options: [
                "A server is special software that creates websites when users visit them",
                "A server is another computer — always on, always connected — that stores and sends files when browsers request them",
                "A server is what a browser uses to translate HTML into visual pages",
                "A server is a type of database that stores website passwords"
              ],
              correct: 1,
              feedback: "A server is fundamentally another computer — one that is always running and connected, waiting to respond to requests. It stores files and sends them when asked. It doesn't create websites on demand (the files already exist), it doesn't translate HTML (the browser does that), and it's not specifically a database or a password store — though servers often connect to databases."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Seeing It Come Alive",
    subtitle: "HTML, CSS and the browser",
    color: "#7eb8c8",
    duration: "3-4 weeks",
    sessions: "5 per week",
    length: "45-60 min",
    tag: "Floor 02 — Structure",
    sections: [
      {
        id: "2-1",
        title: "What HTML Is",
        body: `HTML is not a programming language. It has no logic, no conditions, no loops. What it has is something more fundamental: a way to describe what content <strong>is</strong>.\n\nHTML stands for HyperText Markup Language. The "markup" part is the key idea. You take a piece of content — a heading, a paragraph, an image, a button — and you wrap it in a tag that labels it. <code>&lt;h1&gt;My Title&lt;/h1&gt;</code> doesn't tell the browser to make text big and bold. It tells the browser: this is a level-one heading. The browser then applies its own default styling to that heading. CSS is what overrides those defaults.\n\nThis distinction matters. When YouTube marks up a video title with <code>&lt;h1&gt;</code>, when GitHub wraps a code block in <code>&lt;pre&gt;&lt;code&gt;</code>, when Twitter marks each post with <code>&lt;article&gt;</code> — they're not making visual decisions. They're declaring meaning. Search engines, screen readers, and other tools all use that meaning.\n\nThe tags you'll use most: <strong>h1 through h6</strong> for headings (h1 is the most important, h6 the least), <strong>p</strong> for paragraphs, <strong>a</strong> for links, <strong>img</strong> for images, <strong>ul</strong> and <strong>li</strong> for unordered lists, <strong>div</strong> for grouping content without semantic meaning, <strong>button</strong> for clickable controls, and <strong>input</strong> for form fields.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — if HTML describes what content IS rather than how it looks, what do you think happens when a screen reader for a blind user encounters an &lt;h1&gt; vs a &lt;div&gt; containing the same text?</div>\n\nBeyond those basics, HTML has semantic elements: <strong>header</strong>, <strong>main</strong>, <strong>nav</strong>, <strong>footer</strong>, <strong>section</strong>, <strong>article</strong>. These are divs with meaning attached. Use them where they fit the content. A screen reader navigating your page will thank you. So will your future self six months later trying to read your own code.`,
        callout: {
          type: "default",
          label: "The Key Distinction",
          text: "HTML describes what content is, not how it looks. A heading tag doesn't mean 'make this big' — it means 'this is a heading.' Appearance is entirely CSS's job. Keeping these responsibilities separate is one of the most important ideas in web development."
        },
        callout2: {
          type: "focus",
          label: "Why Semantic HTML Matters",
          text: "When you use the right element for the right content — nav for navigation, article for articles, button for buttons — you're building something that works for everyone: search engines rank it better, screen readers navigate it correctly, and your code communicates its intent to every developer who reads it."
        },
        hint: `HTML is about labelling, not styling. The easiest way to internalise this: open any major website, right-click the page, click "View Page Source." Scan for tags. You'll see h1, p, nav, div, a, img — the same handful of elements used thousands of times.\n\n<strong>Try this:</strong> Before writing any HTML, write out what your page contains in plain English. "A heading. A paragraph. A list of three items. A button." Then translate each thing into the correct tag. Structure first, appearance never — that's CSS's job.\n\n<strong>Still fuzzy on semantic elements?</strong> Think of them as named boxes. A <code>&lt;div&gt;</code> is a box with no label. A <code>&lt;nav&gt;</code> is a box with a sign that says "navigation lives here." Both behave the same visually — the label is for humans and machines, not the browser's renderer.`,
        quiz: {
          question: "A developer uses a &lt;div&gt; for their site's main navigation instead of a &lt;nav&gt; element. The page looks identical either way. Why does the choice still matter?",
          options: [
            "It doesn't — if the page looks the same, the HTML makes no difference",
            "Screen readers and search engines use element semantics to understand page structure, so the wrong tag reduces accessibility and SEO",
            "Browsers render &lt;div&gt; faster than &lt;nav&gt;, so &lt;div&gt; is technically the better choice",
            "The &lt;nav&gt; element requires CSS to function, while &lt;div&gt; works without any styles"
          ],
          correct: 1,
          feedback: "Appearance is only one output of HTML. Screen readers use element type to help users navigate — a blind user can jump directly to the &lt;nav&gt; element to find links. Search engines use semantic tags to understand page structure and weight content accordingly. Option A ignores non-visual users entirely. Option C is false — there is no meaningful rendering speed difference. Option D is false — both work without CSS."
        },
        checklist: [
          "I can explain in my own words why HTML describes structure rather than appearance — without looking at the lesson",
          "I could write the 10 most common HTML tags from memory right now without looking them up",
          "I can describe the difference between a &lt;div&gt; and a &lt;nav&gt; to someone who has never coded",
          "I understand why semantic HTML matters — not just what it is",
          "I could look at any webpage and name the HTML elements making up its structure before seeing the source"
        ]
      },
      {
        id: "2-2",
        title: "What CSS Is",
        body: `CSS stands for Cascading Style Sheets. Every visual decision on every website you've ever used — every colour, every font, every spacing choice, every hover effect — is a CSS rule.\n\nThe syntax is consistent and readable once you see the pattern. You write a <strong>selector</strong> (what to target), then inside curly braces you write <strong>property: value</strong> pairs. <code>h1 { color: #1a1a1a; font-size: 32px; }</code> targets every h1 element on the page and sets two properties. That's the entire pattern.\n\nTargeting works three ways. A <strong>tag selector</strong> like <code>p { }</code> targets every paragraph. A <strong>class selector</strong> like <code>.card { }</code> targets every element with class="card" — a class can be reused across many elements. An <strong>ID selector</strong> like <code>#header { }</code> targets the single element with id="header" — IDs are unique per page. Classes are what you'll use most.\n\nThe "Cascading" in CSS is the important part that trips up beginners. When two rules target the same element, the more specific one wins. An ID selector beats a class selector. A class beats a tag name. If specificity is equal, the rule that appears last in the file wins. This hierarchy is called the <strong>cascade</strong>.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — if a tag selector, a class selector, and an ID selector all target the same element with conflicting colour values, which one do you predict wins? Why?</div>\n\nSpotify's entire dark theme — the black backgrounds, the white text, the green accents — is CSS <code>background-color</code> and <code>color</code> properties applied systematically. Nothing magic. Just properties on elements.\n\nCSS can live in three places: as an inline <code>style</code> attribute on an element (avoid this except for quick tests), inside a <code>&lt;style&gt;</code> tag in the HTML head, or in a completely separate <code>.css</code> file linked with <code>&lt;link&gt;</code>. External files are the professional standard — they keep style separate from structure and let one stylesheet control an entire site.`,
        callout: {
          type: "default",
          label: "Specificity in One Sentence",
          text: "When two CSS rules conflict, the browser applies the more specific one. ID beats class beats tag. If specificity ties, the later rule wins. Understanding this eliminates most CSS confusion."
        },
        callout2: {
          type: "focus",
          label: "Why External Stylesheets",
          text: "An external CSS file linked to 50 HTML pages means one change to the stylesheet updates all 50 pages instantly. Inline styles mean changing the same thing 50 times. Professional CSS lives in separate files. Always."
        },
        hint: `The selector is who. The property is what. The value is how much.\n\n<code>p { color: red; }</code> — who: all paragraphs, what: text colour, how much: red.\n\n<strong>Try this:</strong> Open the browser DevTools (F12), click the Elements tab, click any element on the page. The Styles panel on the right shows every CSS rule targeting that element, where it came from, and whether it's being overridden by a more specific rule. Spend five minutes just clicking around a site you know — you'll see specificity in action immediately.\n\n<strong>Still confused by classes vs IDs?</strong> Use classes for anything you might want to style more than once. Use IDs only when a thing is guaranteed to be unique on the page — and even then, many developers prefer classes because IDs have high specificity that can cause unexpected overriding.`,
        quiz: {
          question: "A page has two CSS rules: <code>p { color: black; }</code> and <code>.intro { color: blue; }</code>. A paragraph has class='intro'. What colour is the text and why?",
          options: [
            "Black, because the p rule appears first in the file",
            "Blue, because the class selector (.intro) is more specific than the tag selector (p)",
            "Neither — conflicting rules cancel each other out and the browser uses its default",
            "Black, because tag selectors always override class selectors"
          ],
          correct: 1,
          feedback: "The class selector .intro is more specific than the tag selector p. Specificity determines the winner, not document order — document order only breaks ties between rules of equal specificity. Option A is wrong because specificity outweighs order. Option C is wrong — rules don't cancel out. Option D is wrong — it's the opposite: class beats tag."
        },
        checklist: [
          "I can write a complete CSS rule from memory — selector, property, value — without looking it up",
          "I can explain the difference between tag, class, and ID selectors to someone who has never seen CSS",
          "I understand why more specific rules win — not just that they do, but why that makes CSS manageable",
          "I could look at a CSS rule and describe in plain English exactly what it does and what it affects",
          "I understand why external stylesheets are preferred over inline styles in professional projects"
        ]
      },
      {
        id: "2-3",
        title: "How a Browser Renders Code",
        body: `Browsers don't just display HTML files. They go through a precise sequence every time — and understanding it explains several decisions you'll make every day as a developer.\n\nWhen a browser receives an HTML file, it reads it from top to bottom and constructs the <strong>DOM</strong> — the Document Object Model. The DOM is the browser's internal tree-like representation of the page. Every element is a node. Every node has a parent, children, and siblings. When JavaScript adds, removes, or changes elements later, it's modifying this DOM tree.\n\nAs the browser parses HTML, it discovers linked resources — CSS files, images, scripts. CSS files are fetched and parsed into a structure called the <strong>CSSOM</strong>. The DOM and CSSOM are combined into a <strong>render tree</strong> — the set of elements that will actually be drawn on screen with their computed styles. Then comes <strong>layout</strong> (calculating each element's size and position) and <strong>paint</strong> (drawing pixels to screen). This full sequence is called the <strong>critical rendering path</strong>.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — based on this sequence, where do you think CSS should be placed in an HTML file to prevent a flash of unstyled content? And where should JavaScript go to prevent the page appearing blank while it loads?</div>\n\nThis explains two conventions you'll see everywhere. CSS goes in the <code>&lt;head&gt;</code>: because the browser needs styles before painting. If CSS arrives late, the page flashes unstyled content for a split second — this is called a FOUC (Flash of Unstyled Content) and it looks broken. JavaScript usually goes at the bottom of <code>&lt;body&gt;</code>, or uses the <code>defer</code> attribute: because JavaScript blocks parsing while it executes. A large JS file in the head means the user stares at a blank page while it downloads and runs.\n\nWhen you open DevTools and inspect an element, you're looking at the live DOM — not the original HTML file. If JavaScript has modified the page, the DevTools shows the current state. The "View Page Source" option shows the original HTML the server sent. They're often different, and that difference is JavaScript.`,
        callout: {
          type: "default",
          label: "The DOM vs The Source",
          text: "View Page Source shows what the server sent. DevTools shows the live DOM — what the browser is actually working with right now. On sites that use JavaScript to build the page dynamically (like React apps), the source might be nearly empty while the DOM contains hundreds of elements."
        },
        callout2: {
          type: "focus",
          label: "Why This Matters Practically",
          text: "Every time you wonder why your CSS isn't applying, or why your page loads slowly, or why a JavaScript change doesn't show up — the answer is somewhere in this rendering sequence. Understanding it turns debugging from guesswork into diagnosis."
        },
        hint: `The critical rendering path is HTML → DOM, CSS → CSSOM, DOM + CSSOM → Render Tree → Layout → Paint.\n\n<strong>Try this:</strong> Open any website and press F12. In the Elements tab, right-click any element and click "Edit as HTML." Change something. Watch it update instantly. You're directly editing the DOM — not the file on the server, just the browser's in-memory model. Refresh the page and your change is gone.\n\n<strong>Still unclear on render-blocking?</strong> Think of parsing HTML like reading a book. When you hit a script tag with no defer, it's like someone interrupting your reading and making you solve a puzzle before you can continue. defer says "I'll tell you what puzzle to solve after you finish the page." The reading continues uninterrupted.`,
        quiz: {
          question: "Why do professional developers typically put &lt;link&gt; stylesheet tags in the &lt;head&gt; but &lt;script&gt; tags at the bottom of &lt;body&gt; or use the defer attribute?",
          options: [
            "It's just a convention with no technical reason — browsers handle both equally",
            "CSS in the head prevents unstyled content flashes; scripts at the bottom or with defer prevent blocking HTML parsing",
            "Scripts must be at the bottom because they can only access elements that exist above them in the source",
            "Browsers only read the head section for CSS and ignore styles placed anywhere else"
          ],
          correct: 1,
          feedback: "Both decisions come directly from the critical rendering path. CSS must arrive before the browser paints, so it goes in the head. JavaScript blocks HTML parsing while it executes — a large script in the head leaves users staring at a blank page. Option C is partially true for inline scripts without defer, but the primary reason is blocking. Option D is false — browsers can process CSS from the body, but the FOUC is the problem."
        },
        checklist: [
          "I can describe the critical rendering path in the correct order from memory",
          "I can explain what the DOM is and how it differs from the raw HTML source to someone else",
          "I understand why CSS goes in the head and can explain the technical reason, not just the rule",
          "I know what FOUC is, why it happens, and how to prevent it",
          "I could open DevTools on any page and point to the live DOM versus explain what View Page Source shows"
        ]
      },
      {
        id: "2-phase1-review",
        title: "Phase 1 Review — HTML, CSS, and the Browser",
        body: `Before moving further, test whether you can connect what you've learned across the first three sections. These questions are harder than the section quizzes — they test understanding and application, not just recall.`,
        quiz: {
          questions: [
            {
              question: "A developer wants to make a site's navigation accessible to screen reader users. They currently use &lt;div class='nav'&gt;. What is the single most impactful change they can make?",
              options: [
                "Add role='navigation' to the div as an ARIA attribute",
                "Replace the div with a &lt;nav&gt; element — semantic HTML communicates meaning natively without extra attributes",
                "Add a hidden heading inside the div that says 'Navigation'",
                "Add tabindex='0' so keyboard users can focus on it"
              ],
              correct: 1,
              feedback: "Using &lt;nav&gt; is the correct semantic approach. It communicates the element's role to screen readers natively, without needing extra ARIA attributes. ARIA role='navigation' on a div achieves a similar effect but is a workaround for when you can't change the HTML. The semantic element is always preferred when available."
            },
            {
              question: "You have a CSS rule: <code>h2 { color: red; }</code> and <code>#headline { color: green; }</code>. An h2 element has id='headline'. What colour does it appear?",
              options: [
                "Red — the h2 tag selector applies to the element directly",
                "Green — the ID selector is more specific than the tag selector",
                "The last rule in the file wins regardless of specificity",
                "Both colours apply and the element appears brown"
              ],
              correct: 1,
              feedback: "ID selectors have higher specificity than tag selectors. The cascade applies the most specific matching rule. Document order only matters when specificity is equal. CSS properties don't blend — one value wins."
            },
            {
              question: "A React app sends nearly empty HTML from the server. After the JavaScript loads, the DOM contains 500 elements. What would 'View Page Source' show versus what DevTools Elements panel shows?",
              options: [
                "Both show the same 500-element structure — browsers sync the source with the DOM",
                "View Page Source shows the original near-empty HTML; DevTools shows the live DOM after JavaScript built it",
                "DevTools shows the source code; View Page Source shows the rendered DOM",
                "View Page Source shows the CSS; DevTools shows the HTML"
              ],
              correct: 1,
              feedback: "View Page Source always shows the original HTML the server sent — before any JavaScript runs. DevTools shows the live DOM, which reflects all JavaScript modifications. This distinction is critical for debugging React and other JavaScript-heavy apps where the source is nearly empty but the live page is rich with content."
            },
            {
              question: "Which sequence correctly describes what the browser does after receiving an HTML file?",
              options: [
                "Parse HTML → Paint pixels → Build DOM → Apply CSS",
                "Parse HTML → Build DOM → Fetch and parse CSS → Build render tree → Layout → Paint",
                "Fetch CSS → Build CSSOM → Parse HTML → Paint → Layout",
                "Build render tree → Parse HTML → Apply CSS → Layout → Paint"
              ],
              correct: 1,
              feedback: "The critical rendering path goes: parse HTML → build DOM, fetch and parse CSS → build CSSOM, combine into render tree → calculate layout → paint pixels. CSS must be parsed before the render tree can be built. Layout must happen before painting. The order is not arbitrary — each step depends on the previous one."
            },
            {
              question: "A developer writes all their CSS as inline style attributes directly on each HTML element. What is the primary professional problem with this approach?",
              options: [
                "Inline styles cause slower page rendering because they are parsed separately",
                "Inline styles cannot use class selectors or hover states",
                "Inline styles mix structure and appearance, cannot be reused, and require updating every element individually when a design changes",
                "Inline styles have lower specificity than external stylesheets and are frequently overridden"
              ],
              correct: 2,
              feedback: "The main problems with inline styles are architectural: they mix HTML (structure) with CSS (appearance), they cannot be shared across elements, and changing a design means editing every single element. Option B is partially true — inline styles can't use hover. Option D is wrong — inline styles actually have the highest specificity, which can cause override problems."
            }
          ]
        }
      },
      {
        id: "2-4",
        title: "Building Your First Page",
        body: `Every HTML page on the internet starts with the same scaffold. GitHub's code viewer. The New York Times homepage. Every Airbnb listing page. The scaffold is not optional — it's the contract the browser needs before it will parse anything.\n\nAt the top: <code>&lt;!DOCTYPE html&gt;</code> tells the browser this is a modern HTML5 document. Without it, the browser switches into "quirks mode" — a compatibility layer for 1990s pages that breaks modern CSS in subtle, maddening ways. Then the root <code>&lt;html&gt;</code> element wraps everything. Inside it, <code>&lt;head&gt;</code> contains information about the page that isn't displayed: the character encoding (<code>&lt;meta charset="UTF-8"&gt;</code>, which ensures text renders correctly), the page title (shown in the browser tab), and any linked CSS files. Then <code>&lt;body&gt;</code> contains everything the user actually sees.\n\nConnecting CSS is a single line in the head: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>. The path in href must exactly match your CSS file's location — it's case-sensitive on most servers.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — the head element contains information the browser needs but the user never sees. The body contains everything the user sees. What does that tell you about where to put: a page title, a paragraph of text, a link to a CSS file, a button?</div>\n\nProfessional habit worth building from day one: write all your HTML first. Get the complete structure in place with real content. Only then open the CSS file. When you try to build both simultaneously, you end up with neither fully thought through. HTML is structure. CSS is style. They're different problems and they deserve separate focus.`,
        callout: {
          type: "default",
          label: "The Scaffold Never Changes",
          text: "DOCTYPE, html, head (with meta charset and title), body. This is the starting point for every HTML file you will ever write. After a week it becomes muscle memory. After a month you type it faster than you can think about it."
        },
        callout2: {
          type: "focus",
          label: "Structure Before Style",
          text: "Write HTML first, CSS second. Always. When you write both at once you context-switch between two different problems and solve neither well. Finish the structure completely, then style it. Every experienced developer works this way."
        },
        hint: `If you open an HTML file in a browser and see nothing, check the order: Did you close all your tags? Did the link tag href actually match your CSS filename exactly (case-sensitive on some systems)? Is the CSS file in the same folder?\n\n<strong>Try this:</strong> Type out the scaffold from memory without looking at this section. DOCTYPE, html, head, meta charset, title, link, body. Five minutes. If you can do it without looking, it's yours. If you can't, type it out once more with the section open, then close it and try again.\n\n<strong>Still confused about the head vs body?</strong> Head = information about the page, not displayed to users. Body = the actual content the user sees. Meta tags, titles, CSS links — head. Headings, paragraphs, images, buttons — body. If it should appear on screen, it goes in body.`,
        quiz: {
          question: "Where should a &lt;link&gt; tag connecting an external CSS file be placed, and why?",
          options: [
            "At the bottom of the body, so HTML loads first before styles are applied",
            "In the head element, so styles are available before the browser paints any content",
            "Anywhere in the document — browsers find it regardless of placement",
            "Inside the body, directly above the first element that needs styling"
          ],
          correct: 1,
          feedback: "The link tag goes in the head so the browser has the stylesheet before it begins painting. If the stylesheet arrives after painting starts, users briefly see unstyled content (a FOUC). The head is specifically designed for metadata and resources the browser needs before rendering. Option A would guarantee a FOUC. Option C is technically possible but breaks the rendering path. Option D is similarly problematic."
        },
        checklist: [
          "I can write the full HTML scaffold from memory right now without looking it up",
          "I can explain what each part of the scaffold does and why it's required — not just that it exists",
          "I can connect an external CSS file using the correct link tag syntax",
          "I completed my HTML structure entirely before writing a single line of CSS",
          "I understand the difference between what belongs in &lt;head&gt; versus &lt;body&gt; and can explain it"
        ],
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My First Page</title>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 32px; }\n    h1 { color: #7eb8c8; }\n    p { line-height: 1.6; color: #ccc; }\n    nav a { color: #7eb8c8; margin-right: 16px; text-decoration: none; }\n    nav a:hover { text-decoration: underline; }\n  </style>\n</head>\n<body>\n  <nav>\n    <a href="#">Home</a>\n    <a href="#">About</a>\n    <a href="#">Contact</a>\n  </nav>\n  <h1>Welcome to My Page</h1>\n  <p>This is the first paragraph of content on my page.</p>\n</body>\n</html>',
          challenges: [
            "Add a second paragraph below the first",
            "Add an unordered list with 3 items below the paragraphs",
            "Add an image element (the src can be any URL from the web)",
            "Add a fourth navigation link"
          ]
        }
      },
      {
        id: "2-5",
        title: "Styling Basics",
        body: `CSS has hundreds of properties. In practice, you'll use the same twenty for 80% of your work. The engineers building Spotify's interface, Notion's editor, and Stripe's dashboard are reaching for the same small set of properties you're about to learn. Learn those well and look up the rest as you need it.\n\nText: <strong>color</strong> (text colour, not background), <strong>font-family</strong> (typeface — stack multiple in order of preference with a generic fallback last), <strong>font-size</strong> (how large), <strong>font-weight</strong> (100 to 900, or named values like bold), <strong>line-height</strong> (vertical space between lines — 1.5 to 1.7 is comfortable for body text).\n\nSpacing: <strong>margin</strong> (space outside the element — transparent, pushes other elements away), <strong>padding</strong> (space inside the element, between the content and the border — background colour fills through it). Both accept 1 to 4 values: one value sets all four sides, two values set top/bottom and left/right, four values set top, right, bottom, left — clockwise from the top.\n\nVisual: <strong>background-color</strong>, <strong>border</strong> (width style colour, e.g. 1px solid #333), <strong>border-radius</strong> (rounds corners — border-radius: 50% makes a circle), <strong>width</strong> and <strong>max-width</strong> (max-width is more flexible than fixed width for responsive layouts).\n\nLayout: <strong>display</strong> controls how an element participates in layout. The most important values: <code>block</code> (takes full width, stacks vertically), <code>inline</code> (flows with text, no width/height control), <code>inline-block</code> (flows with text but accepts width/height), <code>flex</code> (enables flexbox layout on the container), <code>none</code> (removes the element from the page entirely).\n\nFor units: <strong>px</strong> is an exact pixel count. <strong>%</strong> is relative to the parent element's size. <strong>rem</strong> is relative to the root (html) element's font-size. Use rem for font sizes. Here's why it matters: some users increase their browser's default font size because small text is hard for them to read. If you set font-size in px, that preference is silently ignored. If you use rem, your text scales with it. Stripe's design system, GitHub's design system, and GOV.UK's design system all specify font sizes in rem for exactly this reason. It's one line of reasoning that changes a habit permanently.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — open Spotify or any site you use regularly in DevTools (F12). Click any text element. In the Styles panel, find the font-size property. Is it in px or rem? What does that tell you about how that team handles accessibility?</div>`,
        callout: {
          type: "default",
          label: "Why rem Over px for Fonts",
          text: "Some users increase their browser's default font size because they have difficulty reading small text. If you set font sizes in px, that preference is ignored. If you use rem, your text scales with it. This is a small change that has real impact on real people."
        },
        callout2: {
          type: "focus",
          label: "Shorthand Properties",
          text: "margin: 16px 32px sets top and bottom to 16px, left and right to 32px. margin: 16px sets all four sides. border: 2px solid #333 sets width, style, and colour in one line. Shorthand properties are everywhere in CSS — recognise the pattern rather than memorising each one."
        },
        hint: `When a CSS property isn't doing what you expect, open DevTools (F12), click the element, and look at the Styles panel. It shows every rule applying to that element, which rule is winning, and which rules are being crossed out (overridden). You can edit values live to experiment without touching your files.\n\n<strong>Try this:</strong> Open Spotify or any dark-themed website. In DevTools, find the body element and change background-color to white. Watch the theme collapse instantly. That's CSS in action — one property change, entire visual impact.\n\n<strong>Still confused by margin vs padding?</strong> Padding is inside the element, between the content and the edge. Margin is outside the element, pushing it away from other elements. If you add a background colour, padding sits inside the colour. Margin is transparent.`,
        quiz: {
          question: "A developer sets font-size: 1.5rem on a paragraph. The user has set their browser's default font size to 20px. What size does the paragraph text appear at?",
          options: [
            "15px, because rem is relative to the standard 10px root size",
            "1.5px, because rem values are very small units requiring multiplication",
            "30px, because 1.5 multiplied by the 20px root size equals 30px",
            "20px, because rem ignores the multiplier and uses the root size directly"
          ],
          correct: 2,
          feedback: "1rem equals the root element's font size. The user set it to 20px, so 1rem = 20px and 1.5rem = 30px. This is exactly why rem is preferred — it respects the user's accessibility preferences. Option A assumes a fixed 10px root (a browser default that users can override). Option D misunderstands how multiplication works with rem."
        },
        checklist: [
          "I know the core text, spacing, and visual CSS properties and could write them from memory",
          "I can explain the difference between display: block, inline, and flex in plain language",
          "I understand why rem is preferred over px for font sizes — and I can explain the accessibility reason",
          "I can describe the difference between margin and padding to someone who has never coded",
          "I wrote all my CSS after fully completing the HTML structure"
        ],
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 32px; }\n    .card {\n      background: #1a1a1a;\n      padding: 24px;\n      max-width: 400px;\n      margin: 0 auto;\n    }\n    .card h2 { color: #7eb8c8; font-size: 1.4rem; margin-top: 0; }\n    .card p { color: #aaa; line-height: 1.6; font-size: 1rem; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>Card Title</h2>\n    <p>This card demonstrates basic CSS styling with text, spacing, and visual properties.</p>\n  </div>\n</body>\n</html>',
          challenges: [
            "Change the heading colour to any hex value you choose",
            "Add a border-radius of 12px to the card to round its corners",
            "Change the paragraph font-size to 1.1rem",
            "Add a box-shadow to the card: try 0 4px 20px rgba(0,0,0,0.4)"
          ]
        }
      },
      {
        id: "2-6",
        title: "The Box Model",
        body: `Everything in CSS is a box. Every element — a heading, an image, a button, a div — is a rectangular box, and that box has four layers.\n\nFrom inside out: <strong>content</strong> (the text, image, or whatever lives inside), <strong>padding</strong> (transparent space between the content and the border), <strong>border</strong> (the edge of the element, can be visible or invisible), <strong>margin</strong> (transparent space outside the border, separating this element from its neighbours).\n\nThe box model has a quirk that causes confusion until you understand it. By default, <code>width</code> applies to the content area only. Add padding and border on top of that, and your element ends up wider than you specified. A 200px wide element with 20px padding on each side is actually 240px wide on screen.\n\nThe fix is <code>box-sizing: border-box</code>. With this property, width includes content, padding, and border. A 200px wide element with 20px padding is 200px wide — the content shrinks to accommodate the padding. This is so universally useful that Airbnb, GitHub, and essentially every professional CSS codebase starts with a global reset that applies it everywhere: <code>*, *::before, *::after { box-sizing: border-box; }</code>.\n\nMargin collapse is CSS's most confusing behaviour for beginners: when two block elements are stacked vertically, their vertical margins merge (collapse) into the larger of the two. A paragraph with 24px bottom margin and a heading with 16px top margin don't add up to 40px of space — they collapse to 24px. This doesn't happen with horizontal margins, flexbox children, or absolutely positioned elements. Knowing it exists means you won't waste an hour trying to figure out why your spacing doesn't add up.`,
        callout: {
          type: "default",
          label: "The Professional Reset",
          text: "The first CSS rule in most professional projects: *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }. This resets browser defaults and makes layout predictable. Add it to the top of every CSS file you write."
        },
        callout2: {
          type: "focus",
          label: "DevTools for the Box Model",
          text: "In browser DevTools, click any element and scroll down in the Styles panel to find the box model diagram. It shows the exact content, padding, border, and margin values in a visual diagram. Use this constantly when layouts don't behave as expected."
        },
        hint: `If your layout is off by a mysterious amount — an element is wider than expected, spacing doesn't add up — the box model is usually why.\n\n<strong>Try this:</strong> Open DevTools, click any block element, and look at the box model diagram in the Styles panel. You'll see the four layers as coloured rings. Hover over each one — the browser highlights that layer on the page.\n\n<strong>Still confused by margin collapse?</strong> Picture two magnets with the same pole facing each other. They don't stack their repulsion — the stronger one wins. That's vertical margin collapse. The larger margin wins; the smaller one disappears. Horizontal margins never collapse, and neither do flex or grid container children.`,
        quiz: {
          question: "A div has width: 300px, padding: 20px, and border: 5px solid black. With the default box-sizing: content-box, what is the total rendered width of the element?",
          options: [
            "300px — the width property always controls the total width",
            "325px — only the border adds to the width, not padding",
            "350px — padding (40px total) and border (10px total) are added to the 300px content width",
            "280px — padding reduces the available content area inside the width"
          ],
          correct: 2,
          feedback: "With box-sizing: content-box (the default), width applies only to the content area. Padding and border are added on top. 20px padding on each side = 40px total. 5px border on each side = 10px total. Total: 300 + 40 + 10 = 350px. This is why box-sizing: border-box exists — it makes the specified width include padding and border, so 300px actually means 300px."
        },
        checklist: [
          "I can name the four layers of the CSS box model in order from inside to outside",
          "I understand why box-sizing: border-box changes how width is calculated — not just that it does",
          "I can explain margin collapse to someone else without looking at the lesson",
          "I have added a global box-sizing reset to my CSS files",
          "I can use DevTools to visually inspect the box model of any element on a real page"
        ],
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n    body { background: #0a0a0a; padding: 32px; font-family: sans-serif; color: white; }\n    .card {\n      background: #1a1a1a;\n      width: 300px;\n      padding: 16px;\n      border: 2px solid #7eb8c8;\n      margin-bottom: 16px;\n    }\n    .card h3 { color: #7eb8c8; margin-bottom: 8px; }\n    .card p { color: #aaa; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h3>Card One</h3>\n    <p>This card uses box-sizing: border-box.</p>\n  </div>\n  <div class="card">\n    <h3>Card Two</h3>\n    <p>Both cards are exactly 300px wide.</p>\n  </div>\n</body>\n</html>',
          challenges: [
            "Increase the padding on both cards from 16px to 32px — note the width stays 300px with border-box",
            "Remove the box-sizing reset and observe how the width changes",
            "Add margin-top: 40px to the second card and observe the gap",
            "Add a third card with a different border colour"
          ]
        }
      },
      {
        id: "2-7",
        title: "Flexbox Layout",
        body: `Before flexbox, CSS layout was genuinely difficult. Centering something vertically required tricks. Equal-height columns needed hacks. Developers used floats, clearfixes, and negative margins to achieve layouts that should have been simple. If you've ever seen old CSS with <code>clear: both</code> and a mysterious empty div — that's what layout looked like before 2012.\n\nFlexbox solved all of it. It's now universally supported and is the layout tool you'll reach for most often as a professional.\n\nFlexbox works on a container-and-children model. Set <code>display: flex</code> on a parent element, and all its direct children become <strong>flex items</strong>. You control their arrangement by setting properties on the container — not on the children.\n\nThe key concept is <strong>axes</strong>. Flex items lay out along a <strong>main axis</strong>. By default, that axis runs horizontally (row). The perpendicular is the <strong>cross axis</strong>. <code>flex-direction: column</code> flips them — main axis runs vertically, items stack top to bottom.\n\nThe four properties you'll use in almost every layout:\n\n<strong>justify-content</strong> — positions items along the main axis: <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>space-between</code> (first and last at edges, rest evenly spaced).\n\n<strong>align-items</strong> — positions items along the cross axis: <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>stretch</code> (default).\n\n<strong>gap</strong> — consistent space between items, no margin hacks needed.\n\n<strong>flex-wrap: wrap</strong> — allows items to wrap to the next line when they don't fit.\n\nAirbnb's listing card grid, Spotify's top navigation bar, GitHub's file explorer toolbar, the action buttons at the bottom of this panel — all built with exactly these four properties in combination. The same tool, applied to different problems.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — open any site you use and inspect a navigation bar in DevTools. Look for <code>display: flex</code> on the nav element. When you find it, look at which justify-content and align-items values they've set. What problem is each one solving?</div>\n\nUse flexbox for one-dimensional layouts: a row of buttons, a navbar, a card row, a vertical stack. For two-dimensional layouts (rows and columns simultaneously), CSS Grid is the right tool.`,
        callout: {
          type: "default",
          label: "Centering With Flexbox",
          text: "The two lines that center anything: display: flex; justify-content: center; align-items: center; on the parent element. This was notoriously difficult before flexbox. Now it's four words. Learn this combination — you'll use it hundreds of times."
        },
        callout2: {
          type: "focus",
          label: "Flexbox vs Grid",
          text: "Flexbox is for one dimension: either a row or a column. CSS Grid is for two dimensions: rows and columns at the same time. Navigation bars, button groups, and card rows — flexbox. Full page layouts with both columns and rows — Grid. When in doubt, start with flexbox."
        },
        hint: `The mental model: the container is a flexible box. The children are flexible items inside it. You control how items sit in that box by setting rules on the container.\n\n<strong>Try this:</strong> Add display: flex to any element in your code editor. Watch its children line up horizontally. Then add justify-content: center. Then try space-between. Each property change reshapes the layout instantly.\n\n<strong>Still confused by justify-content vs align-items?</strong> justify-content works along the direction items are flowing (the main axis). align-items works perpendicular to that. In a row layout: justify-content controls left-right positioning, align-items controls up-down. In a column layout, they flip.`,
        quiz: {
          question: "A flex container has flex-direction: row (the default). Which property and value would push all items to the right side of the container?",
          options: [
            "align-items: flex-end — because flex-end pushes items to the end of an axis",
            "justify-content: flex-end — because justify-content controls the main (horizontal) axis in a row",
            "flex-wrap: reverse — because reversing the wrap direction moves items right",
            "align-content: flex-end — because align-content positions groups of items"
          ],
          correct: 1,
          feedback: "In a row-direction flex container, the main axis runs horizontally. justify-content controls placement along the main axis. flex-end pushes items to the end of that axis — the right side. Option A is wrong: align-items controls the cross axis (vertical), so align-items: flex-end pushes items to the bottom. Option C doesn't exist. Option D (align-content) only works when there are multiple lines of flex items."
        },
        checklist: [
          "I can explain what display: flex does to a container's children in plain language",
          "I know the difference between the main axis and cross axis — and could flip my explanation for column direction",
          "I can use justify-content and align-items correctly without looking them up",
          "I understand when to use flex-wrap and can explain why it matters for responsive layouts",
          "I know when a layout problem calls for flexbox versus CSS Grid"
        ],
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n    body { background: #0a0a0a; padding: 32px; font-family: sans-serif; }\n    .container {\n      display: flex;\n      gap: 16px;\n      justify-content: flex-start;\n      align-items: stretch;\n    }\n    .card {\n      background: #1a1a1a;\n      border: 1px solid #333;\n      padding: 20px;\n      color: white;\n      flex: 1;\n    }\n    .card h3 { color: #7eb8c8; margin-bottom: 8px; }\n    .card p { color: #aaa; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="card"><h3>Card A</h3><p>First card in a flex row.</p></div>\n    <div class="card"><h3>Card B</h3><p>Second card, equal width.</p></div>\n    <div class="card"><h3>Card C</h3><p>Third card in the row.</p></div>\n  </div>\n</body>\n</html>',
          challenges: [
            "Change flex-direction to column and observe how items stack vertically",
            "Change justify-content to space-between and observe the spacing",
            "Add a fourth card and add flex-wrap: wrap to the container",
            "Use align-items: flex-end to align all cards to the bottom of the container"
          ]
        }
      },
      {
        id: "2-phase2-review",
        title: "Phase 2 Review — Layout and the Box Model",
        body: `Test your understanding across the layout sections before moving to building real components. These questions require connecting ideas, not just recalling individual facts.`,
        quiz: {
          questions: [
            {
              question: "An element has width: 200px, padding: 30px on all sides, and box-sizing: border-box. How wide is the content area inside the padding?",
              options: [
                "200px — border-box means the full element including padding is 200px",
                "140px — the 200px total minus 30px padding on each side (60px total)",
                "260px — width plus padding on both sides",
                "170px — 200px minus 30px on one side only"
              ],
              correct: 1,
              feedback: "With border-box, the specified width (200px) is the total element width including padding. 30px padding on each side = 60px total padding. Content area = 200 - 60 = 140px. This is the advantage of border-box: the element stays 200px wide regardless of padding."
            },
            {
              question: "You have a flex container with flex-direction: column. Which property controls how items are spaced along the vertical axis?",
              options: [
                "align-items — it always controls the vertical axis",
                "justify-content — it controls the main axis, which is vertical in column direction",
                "flex-wrap — it controls how items stack when there are multiple",
                "align-content — it always controls vertical distribution"
              ],
              correct: 1,
              feedback: "justify-content always controls the main axis. In flex-direction: row, main axis is horizontal. In flex-direction: column, main axis is vertical. So in column direction, justify-content controls vertical spacing and align-items controls horizontal alignment — the opposite of row direction."
            },
            {
              question: "Two paragraphs are stacked vertically. The first has margin-bottom: 32px. The second has margin-top: 16px. How much space appears between them?",
              options: [
                "48px — the margins add together",
                "32px — the larger margin wins due to margin collapse",
                "16px — the smaller margin overrides when elements are adjacent",
                "0px — vertical margins between block elements cancel each other"
              ],
              correct: 1,
              feedback: "This is margin collapse. When block elements are stacked vertically, adjacent margins merge into the larger of the two. 32px beats 16px. The gap is 32px, not 48px. This only applies to vertical margins between block elements — not to flex children, not to horizontal margins."
            },
            {
              question: "A navigation bar needs to have the logo on the left and navigation links on the right, vertically centred. Which CSS layout approach and properties solve this?",
              options: [
                "display: block with float: right on the links",
                "display: flex on the nav, with justify-content: space-between and align-items: center",
                "display: grid with two columns defined",
                "display: inline-block on both the logo and links"
              ],
              correct: 1,
              feedback: "Flexbox with justify-content: space-between pushes items to opposite ends of the main axis (logo left, links right). align-items: center vertically centres all children within the flex container. This is one of the most common flexbox patterns in professional navigation bars. Float-based layouts are a legacy approach. Grid works but is more complex for this simple one-dimensional case."
            }
          ]
        }
      },
      {
        id: "2-8",
        title: "Building a Real Component",
        body: `Real interfaces are made of components. A Spotify song card. A GitHub repository card. A Twitter post. A product tile on an e-commerce site. Look at any of them and you see the same anatomy: a container, an image or icon, a text hierarchy, interactive elements.\n\nBreak apart a typical card. A container div with a fixed width, background, border-radius, and box-shadow. Inside it: an image (or placeholder) that fills the top. Below the image: a title in larger text, a subtitle in smaller muted text, metadata like a date or a label. At the bottom, action elements — buttons, links, icons.\n\nNothing about this is complex individually. What makes professional work feel polished is the consistency: padding that's the same multiple throughout (8px, 16px, 24px — always multiples of 8), colours from a defined palette, font sizes that follow a logical scale.\n\nThe approach professional developers use to build a component: HTML structure first — container, then the hierarchy inside it, no CSS yet. Then CSS from outside in: style the container first, then the layout inside it (flex or grid), then individual elements. Never start styling the small details before the structure is solid.\n\nThis is the session where HTML and CSS stop feeling like separate things you're applying and start feeling like a vocabulary you're speaking. When a layout problem appears, you know which property to reach for. When something looks wrong, you know where to look.`,
        callout: {
          type: "default",
          label: "CSS From Outside In",
          text: "When building any component, style in this order: container first, then layout (flex/grid), then child elements, then typography, then interactive states (hover, focus). Working outside-in prevents you from spending an hour perfecting a detail that will move when the container changes."
        },
        callout2: {
          type: "focus",
          label: "The 8px Grid",
          text: "Most design systems (including Airbnb's, GitHub's, Spotify's) use multiples of 8 for spacing: 8px, 16px, 24px, 32px, 48px, 64px. When you use consistent spacing multiples, layouts feel ordered even without a design spec. It's one of the easiest habits that makes the biggest visible difference."
        },
        hint: `If the component doesn't look right, check this order. Is the container the right size? Is the internal layout (flex/grid) working? Are the children the right sizes? Then check the individual styling.\n\n<strong>Try this:</strong> Before writing CSS, sketch the component on paper. Just boxes and labels. Container. Image area. Title. Subtitle. Button. That sketch becomes your HTML structure. The CSS then has a clear plan to follow.\n\n<strong>Hover states feel hard?</strong> Add a <code>:hover</code> selector to any element. Whatever properties you change inside it only apply when the cursor is over the element. <code>transform: translateY(-4px)</code> lifts it. <code>box-shadow</code> adds depth. <code>transition: all 0.2s ease</code> on the base element smooths the change.`,
        quiz: {
          question: "When building a card component, you write all the HTML first and then open the CSS file. What is the main advantage of this approach?",
          options: [
            "The browser loads HTML faster than CSS, so pages appear sooner",
            "It forces you to fully think through the content structure before any visual decisions, preventing structural changes after styling has begun",
            "HTML cannot reference CSS classes that don't exist yet, so HTML must be written first technically",
            "Writing HTML first is only useful for beginners — professionals write both simultaneously"
          ],
          correct: 1,
          feedback: "Structure and style are different problems that deserve separate focus. When you write HTML first, you commit to the content hierarchy before styling it. If you build both simultaneously, you often style elements that then need to move — wasting effort and creating inconsistency. Every experienced developer structures before styling. Option C is technically false — HTML can reference non-existent classes."
        },
        checklist: [
          "I built a multi-element card component from scratch without following a step-by-step guide",
          "I wrote all the HTML completely before writing a single CSS rule",
          "I styled from outside in — container first, then layout, then child elements",
          "I added at least one hover state using the :hover selector and transition",
          "I used spacing multiples of 8 throughout the component"
        ],
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n    body { background: #0a0a0a; padding: 32px; font-family: sans-serif; display: flex; gap: 16px; flex-wrap: wrap; }\n    .card {\n      background: #1a1a1a;\n      border-radius: 12px;\n      width: 280px;\n      overflow: hidden;\n      transition: transform 0.2s ease, box-shadow 0.2s ease;\n    }\n    .card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }\n    .card-image { background: #2a2a3a; height: 160px; display: flex; align-items: center; justify-content: center; color: #7eb8c8; font-size: 2rem; }\n    .card-body { padding: 16px; }\n    .card-body h3 { color: white; font-size: 1rem; margin-bottom: 4px; }\n    .card-body p { color: #888; font-size: 0.85rem; line-height: 1.5; margin-bottom: 16px; }\n    .card-body button { background: #7eb8c8; border: none; color: #0a0a0a; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <div class="card-image">&#9834;</div>\n    <div class="card-body">\n      <h3>Track Title</h3>\n      <p>Artist name &mdash; Album name</p>\n      <button>Play</button>\n    </div>\n  </div>\n  <div class="card">\n    <div class="card-image">&#9835;</div>\n    <div class="card-body">\n      <h3>Another Track</h3>\n      <p>Different artist &mdash; Another album</p>\n      <button>Play</button>\n    </div>\n  </div>\n</body>\n</html>',
          challenges: [
            "Add a 'like' button to each card with a heart icon (use ♥)",
            "Add a badge to one card (like a 'NEW' or 'FEATURED' label) using absolute positioning",
            "Add a third card with different content",
            "Make the cards responsive so they stack on narrow screens using flex-wrap"
          ]
        }
      },
      {
        id: "2-9",
        title: "Guided Profile Page Project",
        body: `You've seen profile pages hundreds of times: Dribbble, Behance, GitHub, LinkedIn. They all follow the same pattern because that pattern works. A header with name and role. An about section with a short bio. A skills section. A projects grid. Contact links.\n\nThe scaffold in the code editor covers that full structure: a header with your name and title, a bio section, a skills grid using flexbox, project cards, and footer links. The HTML is structured. The base CSS is styled. The layout is there.\n\nYour job is threefold. First: replace every piece of placeholder content with your actual information. Don't leave a single word of placeholder text — this is your page now. Second: change the visual design. The colour scheme, the typography choices, the spacing — make it feel like you, not the template. Third: add something the scaffold doesn't have. A section, an element, an interaction. Anything that requires you to figure it out yourself.\n\nThe third part is the most important. The first two are filling in blanks. The third is actual building.`,
        callout: {
          type: "default",
          label: "What This Builds",
          text: "By the end of this session you'll have a real, personal webpage. Not a tutorial exercise — a page that represents you, with your name, your projects, your design choices. That is the first thing you'll show people when they ask what you can do."
        },
        callout2: {
          type: "focus",
          label: "Make It Yours",
          text: "The most common mistake with guided projects: leaving the template colours and changing only the text. Colour scheme is the first thing anyone notices. Pick two or three colours that feel right to you and apply them throughout. A page that looks like the template is a template. A page that looks like you is a portfolio piece."
        },
        hint: `If you don't know what to add as your original element, here are three options that require real CSS work: a horizontal scrolling skills bar, a timeline for your learning journey, or a dark/light mode toggle (research CSS custom properties and class toggling with JavaScript).\n\n<strong>Feeling stuck on the design?</strong> Open Dribbble or Behance and look at three profile pages you find visually interesting. Don't copy any of them. Instead, write down what they have in common: spacing generosity, font weight contrast, a strong accent colour. Use those patterns, not the specific designs.\n\n<strong>Testing on mobile:</strong> In DevTools (F12), click the icon that looks like a phone and tablet (Toggle Device Toolbar). This lets you simulate different screen sizes. If your page looks broken on mobile, the most common fix is adding max-width: 100% to images and checking that your flex containers have flex-wrap: wrap.`,
        quiz: {
          question: "You've built a profile page using the scaffold. You replaced all text but kept all original colours and layout. A recruiter views it alongside the original template. What's the most accurate description of what you've built?",
          options: [
            "A complete portfolio piece that demonstrates your HTML and CSS ability",
            "A filled-in template — it shows you can edit HTML but not that you can make independent design decisions",
            "An excellent starting point that just needs to be deployed to be portfolio-ready",
            "A technically correct page that only needs JavaScript to be professionally complete"
          ],
          correct: 1,
          feedback: "Replacing text in a template demonstrates that you can edit HTML. Making visual and structural decisions — the colour scheme, layout modifications, added sections — demonstrates that you can build with CSS. A portfolio piece should show decision-making, not just content-filling. The template is a starting point. The destination is a page that looks like you, not the template."
        },
        checklist: [
          "I replaced every piece of placeholder content with my own real information — nothing generic remains",
          "I changed the colour scheme to something that feels like my personal aesthetic",
          "I added at least one section or element not included in the scaffold that required me to figure it out",
          "I tested the page at multiple different browser widths",
          "I would feel comfortable showing this page to someone as something I created"
        ],
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Your Name — Developer</title>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n    body { background: #0a0a0a; color: white; font-family: sans-serif; }\n    header { padding: 64px 32px; text-align: center; border-bottom: 1px solid #222; }\n    header h1 { font-size: 2.5rem; color: #7eb8c8; margin-bottom: 8px; }\n    header p { color: #888; font-size: 1.1rem; }\n    section { padding: 48px 32px; max-width: 800px; margin: 0 auto; }\n    section h2 { color: #7eb8c8; margin-bottom: 24px; font-size: 1.4rem; }\n    .skills { display: flex; flex-wrap: wrap; gap: 8px; }\n    .skill { background: #1a1a1a; border: 1px solid #333; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; color: #ccc; }\n    .projects { display: flex; flex-wrap: wrap; gap: 16px; }\n    .project-card { background: #1a1a1a; border-radius: 8px; padding: 20px; flex: 1; min-width: 220px; border: 1px solid #2a2a2a; }\n    .project-card h3 { color: white; margin-bottom: 8px; }\n    .project-card p { color: #888; font-size: 0.9rem; line-height: 1.5; }\n    footer { padding: 32px; text-align: center; border-top: 1px solid #222; color: #555; }\n    footer a { color: #7eb8c8; text-decoration: none; margin: 0 12px; }\n  </style>\n</head>\n<body>\n  <header>\n    <h1>Your Name Here</h1>\n    <p>Junior Web Developer &mdash; Learning every day</p>\n  </header>\n  <section>\n    <h2>About</h2>\n    <p style="color:#aaa;line-height:1.7;">Replace this with a real bio. Write 2-3 sentences about who you are, what you\'re learning, and what you\'re building toward.</p>\n  </section>\n  <section>\n    <h2>Skills</h2>\n    <div class="skills">\n      <span class="skill">HTML</span>\n      <span class="skill">CSS</span>\n      <span class="skill">JavaScript</span>\n      <span class="skill">Add your own</span>\n    </div>\n  </section>\n  <section>\n    <h2>Projects</h2>\n    <div class="projects">\n      <div class="project-card"><h3>Project One</h3><p>Replace with a real project description.</p></div>\n      <div class="project-card"><h3>Project Two</h3><p>Replace with a real project description.</p></div>\n    </div>\n  </section>\n  <footer>\n    <a href="#">GitHub</a>\n    <a href="#">LinkedIn</a>\n    <a href="#">Email</a>\n  </footer>\n</body>\n</html>',
          challenges: [
            "Replace all placeholder text with your own real information",
            "Change the colour scheme — replace all #7eb8c8 with a colour that feels like you",
            "Add a fourth section not included in the scaffold (timeline, testimonials, contact form, etc.)",
            "Make it work on mobile — test by resizing your browser to 375px wide"
          ]
        }
      },
      {
        id: "2-10",
        title: "Floor 2 Check — No Template",
        body: `Before you advance to Floor 3, prove to yourself you understood this floor.\n\nNo scaffold. No starter code. No template. A blank file and a brief.\n\n<strong>The brief:</strong> Build a landing page for something that doesn't exist yet. An app idea you've had. A fictional brand. A band. A game. A product. It can be anything — the subject doesn't matter. What matters is that you make every decision.\n\nThe page must have three sections minimum: a hero (the top section with a heading and a call-to-action), a features or about section (three or more benefits or facts), and a footer with at minimum two links.\n\nEvery HTML element — your choice. Every colour — your choice. Every font, every spacing value, every layout approach — yours. When something doesn't work, you figure out why. When you want something you don't know how to do, you search for it.\n\nThis is what the work actually feels like. There's no right answer to compare yourself to. There's only: does it work, does it look intentional, and is it something you made.\n\nThe questions below assess the full floor — not just this final section.`,
        callout: {
          type: "default",
          label: "The Blank Page Problem",
          text: "The hardest part of this project is starting. The fix: open a file, write the HTML scaffold, write an h1 with your idea's name. That's it. Once there's something on screen, the next step is always obvious. The blank page is only terrifying until you put one word on it."
        },
        callout2: {
          type: "focus",
          label: "Searching Is Part of the Work",
          text: "If you want a feature you don't know how to build — a sticky navigation, a gradient background, a CSS animation — search for it. Searching for CSS solutions is not cheating. It's exactly what every professional developer does. The skill is knowing what to search for and evaluating what you find."
        },
        hint: `If you're completely blank on an idea: don't make it about an app. Make it about something you know. A landing page for your favourite book, for a coffee shop that should exist in your city, for a service that would have helped you learn to code faster. Anything you have opinions about is easier to design than something abstract.\n\n<strong>When the design feels off but you can't say why:</strong> Look at the spacing. Inconsistent spacing makes pages feel unpolished more than almost anything else. Pick one spacing unit (like 8px) and make every margin and padding a multiple of it.\n\n<strong>Still fuzzy on the hero section?</strong> A hero needs: a strong headline, a brief supporting line, and a button or link. That's the complete minimum.`,
        quiz: {
          questions: [
            {
              question: "You've finished your landing page but something feels visually off. The structure is correct and the colours are fine. What should you check first?",
              options: [
                "Add more CSS animations and transitions to make it more dynamic",
                "Check the spacing — inconsistent padding and margins create visual disorder that is the most common cause of 'something feels off'",
                "Change the font to something more distinctive and unusual",
                "Add more sections to give the page more visual weight"
              ],
              correct: 1,
              feedback: "Inconsistent spacing is the most common reason a page 'feels off' when structure and colours are fine. When padding jumps between arbitrary values, the eye perceives disorder. A consistent spacing scale — multiples of 8 — creates visual rhythm that makes layouts feel considered."
            },
            {
              question: "A paragraph element has a tag selector rule setting color: gray and a class selector rule setting color: white. The element has the class applied. What colour does the text appear?",
              options: [
                "Gray — the tag selector is more fundamental to the element",
                "White — the class selector is more specific than the tag selector",
                "A mix of both — the browser averages conflicting colour values",
                "Gray — the tag selector rule appears first in the stylesheet"
              ],
              correct: 1,
              feedback: "Class selectors are more specific than tag selectors, so the class rule wins regardless of document order. This is the cascade: specificity determines which rule applies when multiple rules target the same element."
            },
            {
              question: "You want to centre three cards in a row both horizontally and have equal spacing between them. Which CSS properties on the container achieve this?",
              options: [
                "text-align: center on the container",
                "display: flex; justify-content: center; gap: 16px",
                "display: flex; justify-content: space-between with fixed widths on cards",
                "display: block; margin: auto on each card"
              ],
              correct: 1,
              feedback: "display: flex enables the flexbox layout. justify-content: center centres the items on the main axis. gap: 16px adds consistent space between items. Space-between (option C) places items at the edges, not centred. text-align only works for inline content. margin: auto on block elements only centres horizontally when width is defined."
            },
            {
              question: "A developer builds their entire landing page with inline style attributes on every element. They want to change the primary colour from blue to green. What happens?",
              options: [
                "They change one value in the CSS file and all blue elements update instantly",
                "They must change the style attribute on every single element individually — potentially dozens of edits",
                "They use a find-and-replace in their editor, which takes 30 seconds",
                "They add a CSS class and it automatically overrides the inline styles"
              ],
              correct: 1,
              feedback: "Inline styles are one of the core reasons external stylesheets exist. Changing a colour across a site with inline styles requires editing every element. An external stylesheet means one change updates everything. Option C is technically possible but fragile. Option D is wrong — inline styles have the highest specificity and override class rules."
            },
            {
              question: "The browser's DevTools shows an element as 350px wide, but your CSS says width: 300px with padding: 20px. What explains the discrepancy?",
              options: [
                "DevTools is displaying incorrect information and the element is actually 300px",
                "The element is using the default box-sizing: content-box, so padding (40px total) is added to the content width (300px)",
                "The browser automatically adds 50px for accessibility reasons",
                "The element has margin: 25px which is included in the rendered width"
              ],
              correct: 1,
              feedback: "With box-sizing: content-box (the default), width applies to the content only. 20px padding on each side adds 40px. 300 + 40 = 340px — though 350 would suggest other factors like a border. The fix is box-sizing: border-box so the specified width includes padding. Margin is never included in the element's own width calculation."
            },
            {
              question: "You've built a profile page from a scaffold by replacing all text but keeping the original colours and layout. You've also built a landing page from scratch with your own design choices. Which is stronger portfolio evidence of CSS ability?",
              options: [
                "The profile page — it's more polished because it started with a solid foundation",
                "The landing page — it demonstrates independent decision-making across structure, layout, and visual design",
                "They're equally strong — both demonstrate HTML and CSS knowledge",
                "The profile page — recruiters prefer clean, recognisable layouts"
              ],
              correct: 1,
              feedback: "A page built from scratch demonstrates that you can make independent design decisions: choosing layout approaches, establishing visual hierarchy, picking colour palettes, solving structural problems. A filled-in template demonstrates that you can edit HTML. Both have value, but the from-scratch project is stronger evidence of CSS engineering ability."
            }
          ]
        }
      }
    ]
  },
    {
    id: 3,
    title: "Building With Training Wheels",
    subtitle: "JavaScript \u2014 the language of the web",
    color: "#c87e9a",
    duration: "4-5 weeks",
    sessions: "5 per week",
    length: "60-75 min",
    tag: "Floor 03 \u2014 JavaScript",
    sections: [
      {
        id: "3-1",
        title: "What JavaScript Does",
        body: `HTML is structure. CSS is appearance. JavaScript is behaviour \u2014 what happens when you actually interact with a page.\n\nEvery programming language you'll encounter later in your career \u2014 Python, Go, Rust, Swift \u2014 lives on servers or devices. JavaScript is the only language browsers run natively. If it happens in a browser and it responds to you, JavaScript made it happen.\n\nThe mental model to internalise: JavaScript is <strong>event-driven</strong>. It doesn't run top-to-bottom once and stop. It loads onto the page, then sits waiting. Waiting for a click, a keypress, a timer firing, a network response arriving. When one of those things happens, the relevant function runs. When it's done, JavaScript goes back to waiting. This is fundamentally different from the sequential scripts you saw in Floor 1.\n\nJavaScript's view of the page is the <strong>DOM</strong> \u2014 Document Object Model. The browser represents every HTML element as a JavaScript object in a tree structure. JavaScript can find any node in that tree, read its properties, change its content or style, add new nodes, or remove existing ones \u2014 all without reloading the page. This is called DOM manipulation, and it's the core mechanism behind every interactive website.\n\nWhen Instagram shows a like animation the instant you tap the heart \u2014 no page reload, just an immediate response \u2014 JavaScript found the heart element in the DOM, changed its CSS class to the filled version, incremented the like count, and sent a network request to save the like to the server. All of that in milliseconds, without you seeing anything except the animation.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — pick one interaction on a website you use daily. Can you name the event that triggers it, what changes in the DOM, and whether a network request is involved?</div>\n\nThat is what you're about to learn to do.`,
        callout: {
          type: "default",
          label: "The Third Layer",
          text: "HTML gives the page content. CSS gives it appearance. JavaScript gives it behaviour. A page without JavaScript is a static document \u2014 it looks the same regardless of what you do. A page with JavaScript is a living interface that responds to you. This is the difference between a poster and an application."
        },
        callout2: {
          type: "focus",
          label: "Expect the Difficulty",
          text: "Floor 3 is harder than Floors 1 and 2. JavaScript is a programming language \u2014 it has logic, state, and behaviour that HTML and CSS don't. That difficulty is real and expected. Every developer found JavaScript harder than HTML. The ones who got through it weren't smarter \u2014 they were more patient with the confusion."
        },
        hint: `The best way to start is to see it, not read about it. Open any website, press F12, click the Console tab. Type: document.body.style.background = 'red' and press Enter. Watch the page turn red. That's JavaScript modifying the DOM in real time.\n\n<strong>Try this:</strong> On any page, in the console, type: document.querySelectorAll('p').forEach(p => p.style.color = 'lime'). Every paragraph on the page turns lime green. You just ran DOM manipulation from the console. That exact pattern is what JavaScript does when you write it in a script file.\n\n<strong>Still fuzzy on event-driven?</strong> Think of JavaScript as a security guard sitting at the door. When nothing is happening, they wait. When someone knocks (a click), they check who it is and respond. When the phone rings (a timer), they answer. They don't patrol the building constantly \u2014 they respond to events. That's the event-driven model.`,
        quiz: {
          question: "When you click a 'Like' button on Instagram and the count updates immediately without the page reloading, what is happening technically?",
          options: ["The server sends a new version of the entire page with the updated count", "JavaScript handles the click event, updates the DOM to show the new count, and sends a network request in the background", "CSS animations handle the like effect and the count is recalculated automatically", "The browser caches the updated count and displays it without contacting the server"],
          correct: 1,
          feedback: "When you click Like, JavaScript is listening for that click event. An event handler function runs: it updates the heart icon's appearance in the DOM (no reload needed), updates the count display, and sends an asynchronous network request to save the like to Instagram's server. The DOM update is instant because it's local. The server request happens in the background. This is exactly how modern web applications work."
        },
        checklist: ["I can explain the event-driven model without using the word 'event' — JavaScript sits idle, then runs a function when something happens", "I can describe three specific things JavaScript can do to the DOM without looking anything up", "I've opened the browser console and changed something on a live page using JavaScript", "I can explain in plain terms how Instagram's Like button works without a page reload", "I understand why JavaScript is the only language that runs natively in browsers"]
      },
      {
        id: "3-2",
        title: "Variables and Data Types",
        body: `Variables are named containers that hold values. In JavaScript, you create them with <code>const</code> or <code>let</code>. The rule is simple: use <code>const</code> by default. Only use <code>let</code> when the value genuinely needs to change over time \u2014 a counter, a toggle state, an accumulating total. <code>var</code> is the old way; it has scoping behaviours that cause bugs. Avoid it.\n\nJavaScript has four primitive data types you need now. <strong>String</strong>: text, wrapped in single quotes, double quotes, or backticks. <strong>Number</strong>: all numeric values \u2014 integers and decimals alike, no distinction. <strong>Boolean</strong>: exactly two values, <code>true</code> or <code>false</code>. <strong>Undefined</strong>: a variable that's been declared but not yet assigned a value.\n\nThe <code>typeof</code> operator tells you what type a value is: <code>typeof "hello"</code> returns <code>"string"</code>, <code>typeof 42</code> returns <code>"number"</code>.\n\nTemplate literals are backtick strings that allow embedded expressions: <code>\`Hello, \${name}. You have \${count} messages.\`</code> The <code>\${}</code> interpolates any JavaScript expression. This replaces string concatenation with <code>+</code> in nearly every case.\n\nJavaScript's most confusing behaviour is <strong>type coercion</strong>: the language automatically converts between types in certain situations. <code>"5" + 3</code> is <code>"53"</code> because <code>+</code> with a string triggers string concatenation. <code>"5" - 3</code> is <code>2</code> because <code>-</code> has no string version, so JavaScript converts "5" to a number first. This is why you always use <code>===</code> (strict equality, checks value AND type) instead of <code>==</code> (loose equality, coerces types before comparing). <code>0 == false</code> is <code>true</code>. <code>0 === false</code> is <code>false</code>. The second is correct.`,
        callout: {
          type: "default",
          label: "const by Default",
          text: "Start every variable with const. If you get an error because you're trying to reassign it, change it to let. This approach forces you to think consciously about which values change \u2014 and that habit prevents entire categories of bugs."
        },
        callout2: {
          type: "focus",
          label: "Always Use ===",
          text: "Never use == in JavaScript. Always use ===. The loose equality operator performs type coercion in ways that are hard to predict and create subtle bugs. Strict equality (===) checks both value and type with no surprises. This is one of the few rules with no exceptions."
        },
        hint: `Type coercion catches everyone. The key: <code>+</code> with any string becomes concatenation. Every other operator (<code>-</code>, <code>*</code>, <code>/</code>) converts strings to numbers. So <code>"10" * 2</code> is <code>20</code>, but <code>"10" + 2</code> is <code>"102"</code>.\n\n<strong>Try this:</strong> Open the browser console (F12) and try these one at a time: <code>typeof "hello"</code>, <code>typeof 42</code>, <code>typeof true</code>, <code>typeof undefined</code>, <code>"5" + 3</code>, <code>"5" - 3</code>, <code>5 == "5"</code>, <code>5 === "5"</code>. Understanding the output of each is worth more than reading about it.\n\n<strong>Still fuzzy on template literals?</strong> They're backtick strings that can contain expressions inside <code>\${}</code>. Anything JavaScript can evaluate goes inside: variables, calculations, function calls. <code>\`Total: \${price * quantity}\`</code> embeds a calculation directly in the string.`,
        quiz: {
          question: "What is the output of: console.log('10' + 5); and why?",
          options: ["15, because JavaScript adds the numbers together", "'105', because the + operator with a string triggers concatenation, not addition", "Error, because you cannot use + with mixed types", "NaN, because '10' is not a valid number"],
          correct: 1,
          feedback: "When + encounters a string on either side, it concatenates \u2014 joins them together as text. '10' is a string, so '10' + 5 becomes '10' + '5' (5 is coerced to a string) which is '105'. This is why parseInt() or Number() is used to convert string inputs to numbers before doing maths, and why === catches this kind of type mismatch."
        },
        checklist: ["I default to const and can explain WHY — without looking it up", "I can name the four primitive types and give a concrete example of each", "I can write a template literal with a calculation inside \${} from memory", "I always use === and can predict the result of '5' == 5 vs '5' === 5 before running it", "I can predict what '10' + 3 returns and explain why it differs from '10' - 3"]
      },
      {
        id: "3-3",
        title: "Logic and Conditions",
        body: `Conditions are how code makes decisions. The basic form: <code>if (expression) { } else if (expression) { } else { }</code>. The expression inside the parentheses must evaluate to truthy or falsy. If truthy, the block runs. If not, it falls through to the next else if, or the else.\n\nComparison operators produce booleans: <code>===</code> (strictly equal), <code>!==</code> (not equal), <code>></code> (greater than), <code><</code> (less than), <code>>=</code> (greater than or equal), <code><=</code> (less than or equal).\n\nLogical operators combine conditions: <code>&&</code> (AND \u2014 both sides must be truthy), <code>||</code> (OR \u2014 at least one side must be truthy), <code>!</code> (NOT \u2014 inverts the boolean).\n\nNow the important part that most courses underexplain: <strong>truthy and falsy</strong>. JavaScript doesn't just work with true and false \u2014 it treats every value as either truthy or falsy. The falsy values in JavaScript are exactly six: <code>false</code>, <code>0</code>, <code>""</code> (empty string), <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Every other value \u2014 including empty arrays and empty objects \u2014 is truthy. This means <code>if (username)</code> checks whether username is a non-empty string without an explicit comparison.\n\nThe ternary operator is a shorthand condition on one line: <code>condition ? valueIfTrue : valueIfFalse</code>. Use it for simple assignments. Don't nest them \u2014 nested ternaries are unreadable.\n\nShort-circuit evaluation is a subtlety that shows up constantly in real code. <code>a && b</code> returns <code>a</code> if <code>a</code> is falsy (never evaluates <code>b</code>), or returns <code>b</code> if <code>a</code> is truthy. <code>a || b</code> returns <code>a</code> if truthy, or <code>b</code> if <code>a</code> is falsy. That's why <code>const name = user.name || 'Anonymous'</code> works as a default value pattern \u2014 if user.name is falsy (undefined, empty string), it falls back to 'Anonymous'.`,
        callout: {
          type: "default",
          label: "The Six Falsy Values",
          text: "false, 0, '' (empty string), null, undefined, NaN. Memorise these six. Everything else is truthy \u2014 including [], {}, and '0'. The most common mistake: assuming an empty array is falsy. It isn't. Only an empty string is falsy, not an empty array."
        },
        callout2: {
          type: "focus",
          label: "Short-Circuit as a Pattern",
          text: "const value = input || 'default' is one of the most common patterns in JavaScript. If input is falsy (undefined, null, empty string), value gets 'default'. You'll see this pattern in essentially every real JavaScript codebase. Recognising it and using it is a sign of fluency."
        },
        hint: `The best way to internalise truthy and falsy: open the console and type <code>Boolean(0)</code>, <code>Boolean('')</code>, <code>Boolean(null)</code>, <code>Boolean([])</code>, <code>Boolean({})</code>, <code>Boolean('hello')</code>. The output for each tells you directly whether it's truthy or falsy.\n\n<strong>Try this:</strong> Write a condition without a comparison operator. <code>if (username) { console.log('has username') }</code>. Set username to different values \u2014 'Alex', '', null, undefined, 0 \u2014 and see when the block runs. This is the truthy/falsy concept made concrete.\n\n<strong>Still unclear on &&?</strong> Think of it as a chain of guards. If the first guard says no (falsy), nobody else is checked \u2014 the whole chain returns false. If the first guard says yes, the second is checked, and so on. The chain only succeeds if every guard approves.`,
        quiz: {
          question: "A function checks: if (userInput) { processInput(userInput) }. For which of the following userInput values will processInput NOT be called?",
          options: ["'hello' \u2014 because it's a non-empty string", "[] \u2014 because empty arrays are falsy", "0 \u2014 because 0 is one of JavaScript's falsy values", "'false' \u2014 because it contains the word false"],
          correct: 2,
          feedback: "0 is one of the six falsy values in JavaScript, so if (0) evaluates to false and processInput is skipped. 'hello' is truthy. [] is truthy (empty arrays are truthy \u2014 only empty strings are falsy). 'false' is also truthy \u2014 it's a non-empty string containing the text 'false', not the boolean false."
        },
        checklist: ["I can list all six falsy values without looking them up", "I can predict whether if ([]) runs — and explain why", "I can write a default value using || and explain what happens when the left side is falsy", "I can use the ternary operator for a simple assignment and read one written by someone else", "I can explain && short-circuit evaluation using a concrete example"]
      },
      {
        id: "3-4",
        title: "Functions",
        body: `A function is a named, reusable block of code. You define it once and call it by name whenever you need it to run. Without functions, code would be an unmanageable sequence of repeated instructions.\n\nThe classic declaration syntax: <code>function greet(name) { return 'Hello, ' + name; }</code>. The words inside the parentheses are <strong>parameters</strong> \u2014 placeholders that receive values when the function is called. When you call <code>greet('Alex')</code>, the string 'Alex' is the <strong>argument</strong> \u2014 the actual value that fills the parameter slot.\n\nThe <code>return</code> statement sends a value back to wherever the function was called. A function without a return statement returns <code>undefined</code> \u2014 it runs for its side effects (displaying something, modifying the DOM, logging to console) rather than producing a value.\n\nArrow functions are a shorter syntax: <code>const greet = (name) => 'Hello, ' + name;</code>. For a single expression, the return is implicit. Arrow functions are preferred in modern code for short callbacks and expressions. Regular function declarations are still used for named, top-level functions \u2014 they have the advantage of being hoisted (available before they're defined in the file), which matters in certain architectures.\n\nFunction scope: variables declared inside a function don't exist outside it. They're created when the function runs and destroyed when it finishes. This means two functions can have a variable called <code>count</code> without them interfering with each other.\n\n<strong>Pure functions</strong> are the gold standard: given the same inputs, they always return the same output, and they have no side effects (they don't modify anything outside themselves). Every time you click "Add to Cart" on Amazon, a function runs that takes the item and the current cart and returns a new cart. Same inputs, same output, no surprises.`,
        callout: {
          type: "default",
          label: "Parameters vs Arguments",
          text: "Parameters are the placeholders in the function definition: function add(a, b). Arguments are the actual values passed when calling it: add(3, 5). Parameters are names. Arguments are values. The distinction matters when reading error messages and documentation."
        },
        callout2: {
          type: "focus",
          label: "When to Use Arrow vs Regular Functions",
          text: "Arrow functions for callbacks, array methods, and short expressions: array.map(item => item.name). Regular function declarations for top-level named functions you'll call throughout a file. Don't overthink this early on \u2014 both work, and the style preference becomes natural with exposure."
        },
        hint: `If a function doesn't return a value and you try to use its result, you get <code>undefined</code>. This is one of the most common bugs. Check: does your function have a return statement? Does it return the right thing? Add <code>console.log</code> inside the function to verify what it's producing before it returns.\n\n<strong>Try this:</strong> Write a function that takes two numbers and returns their sum. Call it with three different pairs of numbers and log the results. Then remove the return keyword \u2014 see what happens. Experiencing undefined is more memorable than reading about it.\n\n<strong>Confused about scope?</strong> Any variable declared inside a function with const or let is invisible outside it. This is protective \u2014 functions can do their work without accidentally overwriting variables from elsewhere. Think of a function's scope as a room: what happens in the room stays in the room.`,
        quiz: {
          question: "A function is defined as: function double(x) { x * 2; }. You call it with console.log(double(5)). What is logged and why?",
          options: ["10, because the function multiplies x by 2", "undefined, because the function calculates x * 2 but never returns the result", "Error, because x is not defined outside the function", "null, because the function has no explicit return type"],
          correct: 1,
          feedback: "The function performs the calculation x * 2 but the result is never returned. A function without a return statement returns undefined. To fix it: function double(x) { return x * 2; }. This is one of the most common early mistakes \u2014 computing a value inside a function but forgetting to send it back with return."
        },
        checklist: ["I can write a function with parameters and a return value from memory", "I can explain in one sentence the difference between parameters and arguments", "I can write an arrow function equivalent of a regular function declaration", "I can explain what happens to a variable declared inside a function when the function finishes", "I can describe what makes a function 'pure' and give an example from a real app"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.8}
h2{color:#c87e9a;margin:0 0 16px}
#output p{margin:4px 0}
.result{color:#c8a96e;font-size:16px;margin-top:12px}
</style></head><body>
<h2>Functions</h2>
<div id="output"></div>
<script>
var out='';
function greet(name){return 'Hello, '+name+'! Welcome to The Code Book.';}
function add(a,b){return a+b;}
function applyDiscount(price,pct){return price-(price*(pct/100));}
out+='<p>'+greet('Developer')+'</p>';
out+='<p>3 + 7 = '+add(3,7)+'</p>';
out+='<p class="result">After 20% discount: £'+applyDiscount(50,20).toFixed(2)+'</p>';
document.getElementById('output').innerHTML=out;
</script></body></html>`,
          challenges: ["Add a third parameter to the greet function for a title (Mr, Ms, Dr) and include it in the output", "Write a function called calculateDiscount(price, percent) that returns the discounted price", "Convert the function declaration to an arrow function", "Write a function that takes an array of numbers and returns the largest one"]
        }
      },
      {
        id: "3-phase1-review",
        title: "Phase 1 Review — JavaScript Foundations",
        body: `Five questions covering what JavaScript is, variables, conditions, and functions. If any question gives you trouble, go back to that section before continuing.`,
        quiz: {
          questions: [
            {
              question: "JavaScript is event-driven. What does this mean in practice?",
              options: [
                "JavaScript runs all code top-to-bottom once when the page loads, then stops",
                "JavaScript loads onto the page and then waits for events — clicks, keypresses, timers — and runs the relevant function when each event fires",
                "JavaScript runs continuously in an infinite loop checking for changes",
                "JavaScript only runs when the user explicitly calls it from the browser console"
              ],
              correct: 1,
              feedback: "Event-driven means JavaScript sits idle after loading, responding to events as they occur rather than running once or looping constantly. An event listener registers interest in an event; when the event fires, the handler function runs. This is what lets a page stay responsive without blocking."
            },
            {
              question: "What is the difference between const and let in JavaScript?",
              options: [
                "const is faster than let at runtime",
                "const cannot be reassigned after declaration; let can be reassigned",
                "let is for strings; const is for numbers",
                "const is only available in browser environments; let works everywhere"
              ],
              correct: 1,
              feedback: "const declares a binding that cannot be reassigned. let declares one that can. Use const by default — it signals that the value should not change. Only reach for let when the value genuinely needs to be updated (counters, toggles, accumulating results). This discipline prevents accidental reassignment bugs."
            },
            {
              question: "Which values in JavaScript are falsy?",
              options: [
                "false, null, undefined, 0, NaN, and '' (empty string)",
                "false, null, and undefined only",
                "false, 0, null, undefined, '', [], and {}",
                "false, 0, and '' — null and undefined are truthy"
              ],
              correct: 0,
              feedback: "There are exactly six falsy values in JavaScript: false, 0, '' (empty string), null, undefined, and NaN. Everything else is truthy — including [], {}, 'false', and -1. Empty arrays and objects are truthy, which surprises many developers. Memorise the six falsy values; everything else is truthy."
            },
            {
              question: "function multiply(x, y) { x * y; } — what does console.log(multiply(3, 4)) print?",
              options: [
                "12, because x * y is calculated inside the function",
                "undefined, because the function performs the calculation but has no return statement",
                "NaN, because the parameters haven't been declared with const or let",
                "Error: x is not defined"
              ],
              correct: 1,
              feedback: "Without a return statement, a function returns undefined regardless of what it calculates internally. The expression x * y computes 12 but the result is immediately discarded. To fix it: return x * y. This is one of the most common beginner mistakes — compute a value inside a function but forget to send it back."
            },
            {
              question: "What is the difference between a function's parameters and its arguments?",
              options: [
                "Parameters are the actual values passed in; arguments are the placeholders in the definition",
                "Parameters are the named placeholders in the function definition; arguments are the actual values passed when calling the function",
                "They're the same thing — the terms are interchangeable",
                "Parameters are for arrow functions; arguments are for regular function declarations"
              ],
              correct: 1,
              feedback: "Parameters are defined in the function signature: function add(a, b) — a and b are parameters. Arguments are the values passed when calling: add(3, 5) — 3 and 5 are arguments. Parameters are names (placeholders). Arguments are values. The distinction matters when reading error messages and documentation."
            }
          ]
        }
      },
      {
        id: "3-5",
        title: "Loops",
        body: `A loop runs a block of code repeatedly until a condition says to stop. Every time JavaScript renders a list \u2014 Spotify's playlist tracks, Instagram's feed posts, Airbnb's search results \u2014 it loops through an array of data and renders a component for each item. Loops are ubiquitous.\n\nThe <strong>for loop</strong> has three parts in the parentheses: initialisation (what to set up before the loop starts), condition (run the loop while this is true), and update (what to do after each iteration). <code>for (let i = 0; i < 10; i++)</code> runs ten times, with i going from 0 to 9.\n\nThe <strong>while loop</strong> is simpler but less safe for counted iterations: it runs while a condition is true, with no built-in counter. Use it when you don't know how many iterations are needed in advance \u2014 reading items from a stream until it's empty, for example.\n\n<code>forEach</code> is an array method that runs a function for each item: <code>songs.forEach(song => { render(song); })</code>. Clean and readable for arrays.\n\n<code>for...of</code> iterates over values in an iterable: <code>for (const song of songs)</code>. <code>for...in</code> iterates over the keys of an object \u2014 use it for objects, not arrays.\n\n<code>break</code> exits a loop immediately. <code>continue</code> skips the rest of the current iteration and moves to the next. Both are useful for early termination and filtering within loops.\n\nThe most common mistake: the infinite loop. A while loop whose condition never becomes false, or a for loop whose counter never reaches the stopping condition, will freeze the browser. Always double-check: will the condition eventually be false? Will the counter actually reach the limit?`,
        callout: {
          type: "default",
          label: "for...of vs forEach",
          text: "for...of works with any iterable (arrays, strings, NodeLists). forEach is an array method that only works on arrays. Both are fine for arrays. Prefer for...of when you might need break or continue \u2014 you can't break out of a forEach."
        },
        callout2: {
          type: "focus",
          label: "The Infinite Loop Risk",
          text: "An infinite loop crashes the browser tab. Before you run any while loop, ask: what changes in each iteration that will eventually make the condition false? If nothing changes, the loop runs forever. For loops are safer because the update step is built into the syntax."
        },
        hint: `If your browser freezes after writing a loop, it's almost certainly infinite. Close the tab. Reopen your editor. Check: does the while condition eventually become false? Does the for loop's counter actually reach the limit?\n\n<strong>Try this:</strong> Write a for loop that logs numbers 1 to 10. Then modify it to only log odd numbers by adding <code>if (i % 2 === 0) continue;</code>. Then modify the condition to stop at 7 instead of 10. Three small changes, three different loop behaviours.\n\n<strong>Confused by for...in vs for...of?</strong> for...in gives you keys (property names or array indices as strings). for...of gives you values. For arrays, almost always use for...of or forEach \u2014 for...in on arrays gives you index strings and includes any inherited properties, which causes subtle bugs.`,
        quiz: {
          question: "A for loop is written as: for (let i = 0; i < 5; i++). On which value of i does the loop stop executing its body?",
          options: ["When i reaches 5, because the condition i < 5 becomes false", "When i reaches 4, because arrays are zero-indexed", "When i reaches 6, because i++ runs once more after the last iteration", "The loop never stops unless break is called explicitly"],
          correct: 0,
          feedback: "The condition is i < 5. After i increments to 5, the condition is checked: 5 < 5 is false, so the loop body does not execute and the loop ends. The body runs for i = 0, 1, 2, 3, 4 \u2014 five times total. When i becomes 5, the condition fails and the loop exits."
        },
        checklist: ["I can write a for loop from memory with correct initialisation, condition, and update", "I can explain why break doesn't work inside forEach — and what to use instead", "I can use forEach for clean array iteration without looking at examples", "I can explain the difference between for...of and for...in and when to use each", "I can write a loop that exits early when a condition is met"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#c87e9a;margin:0 0 16px}
.section{margin-bottom:20px}
.label{color:#888;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
p{margin:2px 0}
.highlight{color:#c8a96e}
</style></head><body>
<h2>Loops in Action</h2>
<div id="output"></div>
<script>
var out='';
out+='<div class="section"><div class="label">For Loop (1 to 5)</div>';
for(var i=1;i<=5;i++){out+='<p>Iteration '+i+'</p>';}
out+='</div>';
out+='<div class="section"><div class="label">Odd numbers only (continue)</div>';
for(var j=1;j<=10;j++){if(j%2===0)continue;out+='<p class="highlight">'+j+'</p>';}
out+='</div>';
var languages=['HTML','CSS','JavaScript','Python'];
out+='<div class="section"><div class="label">forEach on array</div>';
languages.forEach(function(lang,idx){out+='<p>'+(idx+1)+'. '+lang+'</p>';});
out+='</div>';
document.getElementById('output').innerHTML=out;
</script></body></html>`,
          challenges: ["Change the for loop to count down from 10 to 1 instead of up", "Add a condition inside the loop that skips even numbers (use if (i % 2 === 0) continue)", "Rewrite the for loop as a while loop", "Write a loop that finds the first number in the array greater than 50 and stops"]
        }
      },
      {
        id: "3-6",
        title: "Arrays and Objects",
        body: `Arrays and objects are the two data structures you'll work with constantly. Every real JavaScript application is essentially arrays of objects, transformed and displayed.\n\nAn <strong>array</strong> is an ordered list. You access items by index (starting at 0). Core methods:\n\n<code>push(item)</code> adds to the end. <code>pop()</code> removes from the end. <code>shift()</code> removes from the start. <code>unshift(item)</code> adds to the start. <code>slice(start, end)</code> returns a portion without modifying the original. <code>splice(start, count)</code> removes items in place. <code>indexOf(item)</code> finds the position. <code>includes(item)</code> returns true/false.\n\nThe three array methods that change how you write code:\n\n<code>map(fn)</code> transforms every item, returns a new array of the same length: <code>prices.map(p => p * 1.2)</code>.\n<code>filter(fn)</code> keeps only items where the function returns true: <code>movies.filter(m => m.rating > 8)</code>.\n<code>reduce(fn, initial)</code> reduces an array to a single value: totals, averages, grouped objects.\n\nAn <strong>object</strong> is a collection of key-value pairs. Access values with dot notation (<code>user.name</code>) or bracket notation (<code>user['name']</code> \u2014 useful when the key is in a variable). Objects can contain any values \u2014 strings, numbers, arrays, other objects, functions.\n\nThe most common data structure in real applications: an array of objects. A Netflix category row is an array of movie objects, each with title, imageUrl, rating, and description. When JavaScript renders the row, it maps over the array and creates a DOM element for each object.\n\n<strong>JSON</strong> (JavaScript Object Notation) is how data is sent between frontend and backend. It looks like JavaScript object and array syntax, but it's a text format \u2014 all keys must be in double quotes, values can only be strings, numbers, booleans, arrays, objects, or null. <code>JSON.stringify()</code> converts a JavaScript object to a JSON string. <code>JSON.parse()</code> converts JSON back to a JavaScript object.`,
        callout: {
          type: "default",
          label: "map, filter, reduce",
          text: "These three array methods replace most for loops in modern JavaScript. map for transformation, filter for selection, reduce for aggregation. Learning them makes code shorter, more readable, and less error-prone. They don't modify the original array \u2014 they return new ones."
        },
        callout2: {
          type: "focus",
          label: "Arrays of Objects",
          text: "const users = [{name: 'Alex', age: 28}, {name: 'Sam', age: 34}] is the most common data shape in real applications. API responses return this format. Databases return this format. Knowing how to navigate and transform arrays of objects is one of the most practically useful skills in JavaScript."
        },
        hint: `The difference between dot and bracket notation: use dot when you know the key name at write time (<code>user.name</code>). Use bracket notation when the key is in a variable (<code>obj[keyVariable]</code>) or when the key has special characters.\n\n<strong>Try this:</strong> Create an array of 5 objects, each with a name and a score. Use filter to get only items with a score above 50. Use map on the result to get just the names. Use reduce to sum all scores. Three method chains, three transformations, no for loops.\n\n<strong>Confused by reduce?</strong> Think of it as a running total. The accumulator starts at your initial value. For each item, your function receives the current accumulator and the current item, and returns the new accumulator. <code>arr.reduce((total, item) => total + item.price, 0)</code> starts at 0 and adds each price.`,
        quiz: {
          question: "Given: const nums = [3, 7, 1, 9, 4]. What does nums.filter(n => n > 4) return?",
          options: ["[7, 9] \u2014 only values strictly greater than 4", "[4, 7, 9] \u2014 values greater than or equal to 4", "[3, 1, 4] \u2014 values less than or equal to 4", "5 \u2014 the count of values greater than 4"],
          correct: 0,
          feedback: "filter returns a new array containing only the items where the callback function returns true. n > 4 is true for 7 and 9. 3 is not greater than 4. 1 is not greater than 4. 4 is not greater than 4 (the condition is strictly greater than, not greater than or equal). Result: [7, 9]."
        },
        checklist: ["I can access a nested property in an object without looking up the syntax", "I can use filter() to get a subset of an array and explain what it returns", "I can use map() to transform an array and explain how its return value differs from forEach", "I can chain filter() and map() together and predict the result", "I can explain the difference between an array of primitives and an array of objects"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px;line-height:1.7}
h2{color:#c87e9a;margin:0 0 16px;font-size:16px}
.card{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:14px;margin-bottom:10px}
.title{color:#c8a96e;font-size:13px;margin-bottom:4px}
.meta{color:#888;font-size:11px}
.rating{color:#ffd700}
.section-label{color:#888;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:16px 0 8px}
.filtered{border-color:#3a4a2a}
.titles{color:#7eb8c8}
</style></head><body>
<h2>Arrays & Objects</h2>
<div id="output"></div>
<script>
var movies=[
  {title:'Interstellar',rating:8.6,genre:'Sci-Fi'},
  {title:'The Dark Knight',rating:9.0,genre:'Action'},
  {title:'Inception',rating:8.8,genre:'Sci-Fi'},
  {title:'Tenet',rating:7.4,genre:'Action'},
  {title:'Dunkirk',rating:7.9,genre:'War'}
];
var out='<div class="section-label">All Movies</div>';
movies.forEach(function(m){
  out+='<div class="card"><div class="title">'+m.title+'</div>';
  out+='<div class="meta"><span class="rating">★ '+m.rating+'</span>  '+m.genre+'</div></div>';
});
var highRated=movies.filter(function(m){return m.rating>8.5;});
out+='<div class="section-label">filter: rating > 8.5</div>';
highRated.forEach(function(m){out+='<div class="card filtered"><div class="title">'+m.title+'</div></div>';});
var titles=movies.map(function(m){return m.title;});
out+='<div class="section-label">map: titles only</div>';
out+='<div class="card"><div class="titles">'+titles.join(', ')+'</div></div>';
document.getElementById('output').innerHTML=out;
</script></body></html>`,
          challenges: ["Use .filter() to show only movies with a rating above 8.0", "Add a new movie to the array using .push() and re-render the list", "Use .map() to create a new array of just the movie titles", "Sort the movies by rating using .sort()"]
        }
      },
      {
        id: "3-7",
        title: "DOM Manipulation",
        body: `The DOM is the browser's live, in-memory model of the page as a tree of objects. JavaScript can navigate this tree, read its nodes, change them, add new ones, or remove existing ones. This is how every interactive website works.\n\nFinding elements. <code>document.getElementById('id')</code> finds one element by its id attribute \u2014 fast and explicit. <code>document.querySelector('.class')</code> finds the first element matching any CSS selector. <code>document.querySelectorAll('p')</code> returns all matching elements as a NodeList, which you can loop over with forEach.\n\nReading and writing. <code>element.textContent</code> reads or sets the text inside an element \u2014 safe, just text. <code>element.innerHTML</code> reads or sets HTML content \u2014 powerful but dangerous with user-provided content because a malicious string could inject scripts (this is called XSS, Cross-Site Scripting). If you're displaying user input, always use textContent.\n\n<code>element.setAttribute('href', 'https://example.com')</code> sets any HTML attribute. <code>element.getAttribute('href')</code> reads it.\n\n<code>element.classList.add('active')</code> adds a class. <code>element.classList.remove('active')</code> removes it. <code>element.classList.toggle('active')</code> adds it if absent, removes it if present. This toggle pattern is how most show/hide, open/close, and active/inactive interactions work.\n\nCreating and removing. <code>document.createElement('div')</code> creates a new element (not yet on the page). <code>parent.appendChild(child)</code> attaches it. <code>element.remove()</code> deletes it from the DOM.\n\nWhen Twitter's compose box enables the Tweet button only when text exists, and disables it when the box is empty, that's a JavaScript event listener reading the textContent length and toggling a disabled attribute. Six lines of DOM manipulation powering a feature used billions of times daily.`,
        callout: {
          type: "default",
          label: "textContent vs innerHTML",
          text: "Use textContent when displaying text \u2014 especially any text that came from user input. textContent treats everything as plain text, so malicious script tags are displayed as text, not executed. innerHTML is for when you're constructing HTML programmatically and you control the content entirely. Never use innerHTML with user-provided strings."
        },
        callout2: {
          type: "focus",
          label: "classList.toggle Is Your Most-Used DOM Tool",
          text: "The pattern: add a CSS class that defines one state (hidden, active, expanded), then use classList.toggle to switch between states. No if/else needed, no style manipulation, just toggling a class. This is how 80% of interactive UI behaviours work in professional code."
        },
        hint: `If your JavaScript isn't finding an element, there are three things to check. One: is the id or class name spelled correctly, including capitalisation? Two: is the script running before the element exists in the DOM? (script tags at the bottom of body fix this). Three: is the element actually in the HTML?\n\n<strong>Try this:</strong> In the browser console on any page, run <code>document.querySelectorAll('a')</code>. You'll get a NodeList of every link on the page. Run <code>document.querySelectorAll('a').length</code> to count them. Then <code>document.querySelectorAll('a')[0].textContent</code> to read the first link's text.\n\n<strong>Confused by appendChild vs innerHTML?</strong> appendChild attaches a single element you've created with createElement. innerHTML replaces everything inside a parent with an HTML string. appendChild is better for adding single items. innerHTML is often used to re-render an entire list (write the full HTML string, set it once).`,
        quiz: {
          question: "You're building a dropdown menu. Clicking a button should show the menu if it's hidden, and hide it if it's showing. Which DOM method handles this most cleanly?",
          options: ["element.style.display = 'block' or 'none' \u2014 toggling the display property directly", "element.setAttribute('visible', true) \u2014 setting a custom attribute to track state", "element.classList.toggle('hidden') \u2014 adding or removing a CSS class that controls visibility", "element.innerHTML = '' \u2014 clearing the menu content to hide it"],
          correct: 2,
          feedback: "classList.toggle adds the class if absent, removes it if present \u2014 in one call. Pair it with a CSS rule like .hidden { display: none; } and the behaviour is clean and reusable. Directly manipulating style is harder to override and mixes presentation logic into JavaScript. Setting a custom attribute requires extra code to read and act on it. Clearing innerHTML destroys the content entirely rather than hiding it."
        },
        checklist: ["I can find an element with querySelector and change its text without looking up the syntax", "I can explain when to use textContent vs innerHTML — and why innerHTML carries a security risk", "I can add, remove, and toggle a CSS class on an element from memory", "I can create a new element, set its content, and append it to the DOM", "I've used classList.toggle to build a show/hide interaction"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px}
h2{color:#c87e9a;margin:0 0 20px}
button{font-family:inherit;font-size:12px;letter-spacing:1px;cursor:pointer;border:none;border-radius:6px;padding:10px 20px}
#count-btn{background:#7eb8c8;color:#000;margin-right:10px}
#count-btn:hover{background:#a8d8e8}
#toggle-btn{background:#333;color:#fff;border:1px solid #555}
#counter{font-size:48px;color:#c8a96e;margin:20px 0;font-weight:900}
#message{margin-top:20px;padding:16px;border-radius:8px;background:#1a2a1a;color:#6dbf6d}
.hidden{display:none}
</style></head><body>
<h2>DOM Manipulation</h2>
<button id="count-btn" onclick="increment()">Click to Count</button>
<button id="toggle-btn" onclick="toggleMessage()">Show Message</button>
<div id="counter">0</div>
<div id="message" class="hidden">JavaScript found this element and toggled its visibility using classList.toggle('hidden')</div>
<script>
var count=0;
function increment(){count++;document.getElementById('counter').textContent=count;}
function toggleMessage(){
  var msg=document.getElementById('message');
  var btn=document.getElementById('toggle-btn');
  msg.classList.toggle('hidden');
  btn.textContent=msg.classList.contains('hidden')?'Show Message':'Hide Message';
}
</script></body></html>`,
          challenges: ["Change the button text to 'Updated!' after clicking it", "Use classList.toggle to show/hide the message instead of changing textContent", "Add a second counter that counts how many times the button has been clicked", "Create a new paragraph element with document.createElement and append it to the page"]
        }
      },
      {
        id: "3-8",
        title: "Events",
        body: `JavaScript is event-driven. Code doesn't run continuously \u2014 it waits for something to happen, then responds. An event is anything that happens in the browser: a click, a keypress, text being typed, a form being submitted, a page finishing loading.\n\n<code>addEventListener</code> is the professional way to attach event handlers. <code>button.addEventListener('click', handleClick)</code> is better than the inline <code>onclick="handleClick()"</code> attribute because it keeps behaviour separate from structure, allows multiple listeners on the same element, and can be removed later.\n\nCommon events: <code>click</code>, <code>input</code> (fires on every character typed), <code>change</code> (fires when an input loses focus after value changes), <code>submit</code> (form submission), <code>keydown</code> and <code>keyup</code> (keyboard events), <code>mouseover</code> and <code>mouseout</code>, <code>focus</code> and <code>blur</code>.\n\nEvery event handler receives an <strong>event object</strong> as its first argument. It contains information about the event: <code>event.target</code> (the element that triggered the event), <code>event.type</code> (which event occurred), <code>event.key</code> (for keyboard events, which key was pressed).\n\n<code>event.preventDefault()</code> stops the browser's default action. On a form submit, the default is to reload the page \u2014 <code>preventDefault()</code> stops that so you can handle the submission with JavaScript. On a link click, it prevents navigation.\n\n<strong>Event delegation</strong> is attaching one listener to a parent element instead of many listeners to individual children. When a list item is clicked, the event bubbles up to the parent. The listener on the parent can read <code>event.target</code> to determine which item was clicked. This scales to dynamic lists where items are added after the listeners are attached.\n\nGoogle's search suggestions use the <code>input</code> event: every character you type fires a request, and results update in real time. One listener, hundreds of keystrokes, millions of users.`,
        callout: {
          type: "default",
          label: "addEventListener Over onclick",
          text: "element.addEventListener('click', fn) over onclick='fn()' in every case. The attribute form mixes behaviour into HTML. addEventListener can attach multiple handlers to one element, handles the event object correctly, and can be removed with removeEventListener. It's the standard."
        },
        callout2: {
          type: "focus",
          label: "Event Delegation Scales",
          text: "If you have a list of 100 items and attach a click listener to each one, you have 100 listeners. Attach one listener to the parent list instead, and check event.target inside it. One listener handles any item, including ones added to the list after the listener was attached. This is how real applications handle dynamic lists."
        },
        hint: `If an event listener isn't firing, check these in order. One: is the listener attached to the right element? Use console.log inside the handler as the first test. Two: is the event name spelled correctly? ('click' not 'onClick'). Three: for keyboard events, log event.key to see what string the key produces.\n\n<strong>Try this:</strong> Add an event listener to the document that logs every keydown: <code>document.addEventListener('keydown', e => console.log(e.key))</code>. Press various keys. See what strings they produce. This reveals why keyboard shortcut code checks <code>e.key === 'Enter'</code> not <code>e.key === 13</code>.\n\n<strong>Confused by event bubbling?</strong> When you click an element, the event fires on that element, then on its parent, then its parent's parent, all the way up to the document. This is bubbling. Event delegation relies on it \u2014 a click on a child element bubbles up to the parent listener, which reads event.target to know which child was actually clicked.`,
        quiz: {
          question: "A form has a submit button. When clicked, the page reloads and the JavaScript handler seems to run for a split second then disappear. What is the most likely cause and fix?",
          options: ["The event listener is attached incorrectly \u2014 use onclick instead of addEventListener", "The browser's default form submit is reloading the page \u2014 call event.preventDefault() at the start of the handler", "JavaScript cannot handle form submissions \u2014 use a server-side language instead", "The handler function is asynchronous and needs to be awaited"],
          correct: 1,
          feedback: "Form submission's default behaviour is to send the form data and reload the page. The JavaScript runs briefly but then the reload wipes everything. event.preventDefault() stops that default action, letting your JavaScript handle the submission completely without a page reload. This is one of the most common patterns in web form handling."
        },
        checklist: ["I use addEventListener instead of onclick attributes and can explain why", "I can name four common event types and describe what triggers each one", "I can access e.target inside a handler to identify what was clicked", "I can use event.preventDefault() and explain one concrete example where it's needed", "I can implement event delegation on a dynamic list and explain why it's more efficient"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px}
h2{color:#c87e9a;margin:0 0 20px}
.field{margin-bottom:16px}
label{display:block;color:#888;font-size:11px;letter-spacing:1px;margin-bottom:6px;text-transform:uppercase}
input{background:#111;border:1px solid #333;color:#fff;padding:10px 14px;border-radius:6px;font-family:inherit;font-size:13px;width:100%;max-width:320px}
input:focus{outline:none;border-color:#7eb8c8}
button{background:#7eb8c8;color:#000;border:none;border-radius:6px;padding:10px 24px;font-family:inherit;font-size:12px;cursor:pointer;letter-spacing:1px}
button:hover{background:#a8d8e8}
#live{color:#c8a96e;font-size:18px;margin:16px 0;min-height:28px}
#log{margin-top:16px;color:#666;font-size:11px;line-height:1.8}
</style></head><body>
<h2>Events</h2>
<div class="field">
<label>Type something (input event fires on every key)</label>
<input type="text" id="text-input" placeholder="Start typing...">
</div>
<div id="live"></div>
<button id="submit-btn">Submit (uses preventDefault)</button>
<div id="log"></div>
<script>
var log=document.getElementById('log');
document.getElementById('text-input').addEventListener('input',function(e){
  document.getElementById('live').textContent=e.target.value;
});
document.getElementById('submit-btn').addEventListener('click',function(e){
  e.preventDefault();
  var val=document.getElementById('text-input').value;
  log.innerHTML+='<p>Submitted: "'+(val||'(empty)')+'" — page did NOT reload</p>';
});
</script></body></html>`,
          challenges: ["Add a keydown listener that fires when the user presses Enter", "Use event.preventDefault() on the form submit to prevent page reload", "Add a mouseover event that changes the button color when hovered (in JavaScript, not CSS)", "Use event delegation \u2014 attach one click listener to the list container instead of each item"]
        }
      },
      {
        id: "3-phase2-review",
        title: "Phase 2 Review — Loops, Arrays, DOM, and Events",
        body: `Five questions covering loops, arrays and objects, DOM manipulation, and events. If any question gives you trouble, return to that section.`,
        quiz: {
          questions: [
            {
              question: "An array contains 100 items. You want a new array containing only items where item.price > 50. Which method is correct?",
              options: [
                "array.forEach() — it loops through every item and lets you select some",
                "array.map() — it transforms every item to a new value",
                "array.filter() — it returns a new array containing only items that pass the test",
                "array.find() — it returns the first item that matches the condition"
              ],
              correct: 2,
              feedback: "filter() creates a new array containing only elements for which the callback returns truthy. forEach() is for side effects only — it always returns undefined. map() transforms every element but always returns an array of the same length. find() returns the first match, not all matches. filter() is the right tool when you want a subset."
            },
            {
              question: "What is the DOM?",
              options: [
                "The list of CSS rules applied to the current page",
                "The browser's tree-like representation of the page's HTML elements as JavaScript objects that can be read and modified",
                "The JavaScript engine that executes code in the browser",
                "The database of all websites indexed by the browser"
              ],
              correct: 1,
              feedback: "The DOM (Document Object Model) is the browser's internal representation of the page as a tree of objects. Each HTML element is a node. JavaScript can read, add, modify, or remove any node without reloading the page. When you call document.querySelector() or change element.textContent, you're working with the DOM."
            },
            {
              question: "What is the difference between a for loop and a forEach loop in JavaScript?",
              options: [
                "for loops are faster; forEach loops are for small arrays only",
                "for loops can break early or skip items with continue; forEach cannot use break or continue",
                "forEach loops work on arrays; for loops only work on numbers",
                "They are functionally identical — the syntax is just personal preference"
              ],
              correct: 1,
              feedback: "The key practical difference: for loops support break (exit early) and continue (skip to next iteration). forEach does not — calling break inside a forEach callback has no effect on the outer loop. Use for (or for...of) when you might need to exit early. Use forEach when you want to process every element without exceptions."
            },
            {
              question: "You call element.addEventListener('click', handler). When does the handler function run?",
              options: [
                "Immediately when the line of code is executed",
                "Every 100ms while the element exists on the page",
                "Only when the user explicitly calls handler() in the console",
                "Each time the user clicks the element"
              ],
              correct: 3,
              feedback: "addEventListener registers a callback that runs in response to the specified event. 'click' fires each time the user clicks the element. The registration happens immediately when the line runs, but the handler itself is only called when the event occurs. This is the event-driven model — register interest, respond when it happens."
            },
            {
              question: "What does event.preventDefault() do?",
              options: [
                "Stops the event from firing again if the user clicks twice",
                "Cancels the browser's default behaviour for the event — e.g., preventing a form submit from reloading the page",
                "Prevents the event from bubbling up to parent elements",
                "Removes the event listener after the first trigger"
              ],
              correct: 1,
              feedback: "Each event has a default browser behaviour: click on a link navigates, submit a form reloads the page, right-click opens a context menu. preventDefault() cancels that default behaviour so you can replace it with your own. It doesn't stop the event from firing or from bubbling — for that, you'd use stopPropagation()."
            }
          ]
        }
      },
      {
        id: "3-9",
        title: "Error Handling and Debugging",
        body: `Every developer writes broken code. The difference between a beginner and a professional isn't that professionals make fewer mistakes \u2014 it's that they find and fix mistakes faster because they have a systematic approach.\n\nJavaScript has three error types. A <strong>SyntaxError</strong> means the code isn't valid JavaScript \u2014 a missing bracket, an unclosed string, a typo in a keyword. The script doesn't execute at all. A <strong>ReferenceError</strong> means you tried to use a variable that doesn't exist \u2014 either it was never declared, or it's out of scope, or it's misspelled (JavaScript is case-sensitive). A <strong>TypeError</strong> means you performed an operation on a value of the wrong type \u2014 calling something that isn't a function, accessing a property on null or undefined.\n\nReading error messages is a skill that develops with practice. Every JavaScript error in the console tells you: the error type, a plain-English description of what went wrong, and the file name and line number where it was detected. Start there. Go to that line. The problem is usually either on that line or one line above.\n\n<code>console.log()</code> is the most-used debugging tool at every level of experience. Drop it inside a function to confirm it's being called. Log a variable to see its value at a specific moment in execution. Trace your assumptions before changing any code.\n\n<code>try { } catch (error) { }</code> wraps code that might fail and handles the error gracefully instead of crashing. The catch block receives the error object. <code>error.message</code> is the human-readable description. <code>throw new Error('Something went wrong')</code> creates a custom error with a message you choose.\n\nThe browser DevTools debugger is more powerful than console.log: click the line number in the Sources tab to set a breakpoint, run the code, and execution pauses there. You can inspect every variable's current value and step through code one line at a time. Systematic debugging \u2014 forming a hypothesis, testing it, narrowing it down \u2014 solves bugs faster than random changes.`,
        callout: {
          type: "default",
          label: "Debugging Is Systematic",
          text: "When something is broken, resist the urge to change things randomly. Instead: read the error message, identify the line, form a hypothesis about what's wrong, test it with console.log or a breakpoint, confirm or revise the hypothesis. One change at a time. Random changes compound bugs."
        },
        callout2: {
          type: "focus",
          label: "try/catch for Expected Failures",
          text: "Use try/catch when you're calling code that might legitimately fail \u2014 parsing JSON, accessing an API, reading from localStorage. Don't wrap everything in try/catch; that suppresses bugs you need to see. Use it at the boundary where controlled failure is the correct response."
        },
        hint: `When the error message says something 'is not a function', the thing you're calling isn't a function. It might be undefined (the function name is misspelled), or null, or a string. Log the thing before calling it to see what it actually is.\n\n<strong>Try this:</strong> Open the DevTools Sources tab on any page, find a JavaScript file, and click on a line number to set a breakpoint. Reload the page. Execution pauses there. Hover over any variable name to see its current value. Use the step controls to move through execution one line at a time. This is what professional debugging looks like.\n\n<strong>Stuck on a bug for more than 20 minutes?</strong> Stop trying to fix it. Instead, explain the problem out loud \u2014 to a rubber duck, to the wall, to anyone. Articulating "I expect X but I'm getting Y because..." forces your brain to reprocess the logic, and the answer often appears while you're still talking. This is known as rubber duck debugging and it works.`,
        quiz: {
          question: "You see this error: TypeError: Cannot read properties of undefined (reading 'name'). What most likely caused it?",
          options: ["The variable 'name' was declared with let instead of const", "You're trying to access the .name property on a value that is undefined \u2014 the object you expected to exist doesn't", "The name property needs to be in quotes to be accessed correctly", "TypeError means the JavaScript engine doesn't recognise the type of the variable"],
          correct: 1,
          feedback: "This TypeError means you wrote something like user.name where user is undefined. The object you expected to be there (user) doesn't exist at the moment your code runs \u2014 it might not have been returned yet, the variable is initialised as undefined, or a function didn't return a value. Log the variable just before the failing line to confirm what it contains."
        },
        checklist: ["I can identify a TypeError, ReferenceError, and SyntaxError from their messages alone", "I read error messages completely before touching any code", "I use console.log systematically — at specific points to trace values, not randomly", "I can write a try/catch block and explain when it's appropriate vs not", "I've set a breakpoint in DevTools and stepped through execution line by line"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#c87e9a;margin:0 0 16px}
.section{margin-bottom:24px}
.label{color:#888;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
.ok{color:#6dbf6d}.err{color:#ff6b6b}
</style></head><body>
<h2>Error Handling</h2>
<div class="section"><div class="label">Bug #1 — Spot and fix this:</div><div id="bug1"></div></div>
<div class="section"><div class="label">try/catch in action</div><div id="trycatch"></div></div>
<script>
function double(x){x*2;} // BUG: missing return
var result=double(5);
document.getElementById('bug1').innerHTML=
  '<p class="err">double(5) returned: '+result+' (expected 10 — can you see the bug?)</p>';

function parseData(input){
  try{var p=JSON.parse(input);return '<p class="ok">✓ Parsed: '+JSON.stringify(p)+'</p>';}
  catch(e){return '<p class="err">✗ Error: '+e.message+'</p>';}
}
var el=document.getElementById('trycatch');
el.innerHTML=parseData('{"name":"Alex"}');
el.innerHTML+=parseData('this is not valid JSON');
</script></body></html>`,
          challenges: ["Fix the three intentional bugs in the code \u2014 read the error messages in the console for guidance", "Add a try/catch block around the broken function call and display the error message instead of crashing", "Add console.log statements to trace what value each variable holds", "Add input validation that throws a custom error if the input is empty"]
        }
      },
      {
        id: "3-10",
        title: "Guided To-Do List Project",
        body: `The to-do list is the classic beginner project because it isn't trivial. Done properly, it exercises every concept from this floor: DOM creation, event listeners, array state management, and localStorage persistence.\n\nThe scaffold in the editor handles the visual layout and structure. Your job is to complete four functions. Read every comment in the code before writing a single line \u2014 the comments describe exactly what each function needs to do.\n\n<code>addTodo</code>: read the input value, validate it's not empty, add it to the todos array, create a DOM element for it, append to the list, clear the input.\n\n<code>deleteTodo</code>: given an id, remove the matching item from the todos array, remove its DOM element.\n\n<code>toggleComplete</code>: given an id, find the item in the todos array, flip its completed boolean, update the DOM element's visual state.\n\n<code>saveToStorage</code>: convert the todos array to JSON and save it to localStorage. Call this after every state change.\n\nThe sequence matters. Get addTodo working first \u2014 confirm items appear in the list. Then deleteTodo. Then toggleComplete. Then saveToStorage and the load-on-startup logic. Each function is a small, self-contained problem. Solve them one at a time and the whole system assembles itself.`,
        callout: {
          type: "default",
          label: "Read Before Writing",
          text: "Read all four function stubs and their comments completely before implementing any of them. Understanding how they interact \u2014 what data each expects, what each one changes \u2014 prevents you from building yourself into a corner halfway through."
        },
        callout2: {
          type: "focus",
          label: "State and DOM Must Stay in Sync",
          text: "The todos array is the source of truth. The DOM is a visual representation of that array. Every time the array changes, the relevant part of the DOM must update to match. If you ever manually change the DOM without updating the array first, they get out of sync and bugs appear."
        },
        hint: `If items are appearing in the list but deletion isn't working, check that each todo has a unique id and that the delete button is referencing that same id. If toggleComplete isn't updating the visual state, confirm you're finding the right DOM element \u2014 log the id you're looking for and the element you found.\n\n<strong>For addTodo:</strong> The most common mistake is forgetting to clear the input after adding. The second most common is not validating for empty strings \u2014 <code>if (!input.trim()) return;</code> stops empty todos.\n\n<strong>For localStorage:</strong> Save after every state-changing operation. Load on startup with <code>JSON.parse(localStorage.getItem('todos')) || []</code>. The <code>|| []</code> handles the case where nothing is saved yet \u2014 without it, JSON.parse(null) throws an error.`,
        quiz: {
          question: "The to-do list stores todos in both a JavaScript array and the DOM. When a user deletes an item, you correctly remove its DOM element but forget to remove it from the todos array. What happens on the next page refresh?",
          options: ["The item is permanently deleted because the DOM update is authoritative", "The item reappears, because localStorage was saved from the array which still contains it", "Nothing \u2014 the DOM and array don't affect each other", "A TypeError is thrown because the array and DOM are out of sync"],
          correct: 1,
          feedback: "The array is the source of truth. localStorage is saved from the array. On refresh, the saved data is loaded from localStorage and the list is re-rendered from the array. If the item was removed from the DOM but not from the array, it was saved to localStorage and will reappear on refresh. Always update the source of truth (the array) first, then update the DOM to reflect it."
        },
        checklist: ["I read and understood the full scaffold before writing any code", "My addTodo function validates input, updates the array, and creates a DOM element", "My deleteTodo removes the item from both the array and the DOM in sync", "My toggleComplete updates both the data state and the DOM visual state correctly", "Todos persist through a page refresh — I can explain how localStorage makes this work"],
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;min-height:100vh}
h2{color:#c87e9a;margin-bottom:20px}
.add-row{display:flex;gap:10px;margin-bottom:20px}
input{flex:1;background:#111;border:1px solid #333;color:#fff;padding:10px 14px;border-radius:6px;font-family:inherit;font-size:13px}
input:focus{outline:none;border-color:#c87e9a}
button{background:#c87e9a;color:#fff;border:none;border-radius:6px;padding:10px 18px;font-family:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
button:hover{background:#d89ab5}
#todo-list{list-style:none}
.todo-item{display:flex;align-items:center;gap:12px;padding:12px;background:#111;border:1px solid #222;border-radius:6px;margin-bottom:8px}
.todo-item.done .todo-text{text-decoration:line-through;color:#555}
.todo-text{flex:1;cursor:pointer}
.del-btn{background:transparent;border:1px solid #444;color:#888;border-radius:4px;padding:4px 10px;font-size:11px}
.del-btn:hover{border-color:#ff6b6b;color:#ff6b6b;background:transparent}
.empty{color:#555;font-size:12px;padding:16px 0}
</style></head><body>
<h2>To-Do List</h2>
<div class="add-row">
<input type="text" id="todo-input" placeholder="Add a task...">
<button onclick="addTodo()">Add</button>
</div>
<ul id="todo-list"><li class="empty">No tasks yet — add one above</li></ul>
<script>
var todos=JSON.parse(localStorage.getItem('codebook_todos'))||[];
var nextId=todos.length?Math.max.apply(null,todos.map(function(t){return t.id;}))+1:1;
function render(){
  var list=document.getElementById('todo-list');
  if(!todos.length){list.innerHTML='<li class="empty">No tasks yet — add one above</li>';return;}
  list.innerHTML=todos.map(function(t){
    return '<li class="todo-item'+(t.done?' done':'')+'">'+
      '<span class="todo-text" onclick="toggleTodo('+t.id+')">'+t.text+'</span>'+
      '<button class="del-btn" onclick="deleteTodo('+t.id+')">Remove</button></li>';
  }).join('');
}
function addTodo(){
  var input=document.getElementById('todo-input');
  var text=input.value.trim();if(!text)return;
  todos.push({id:nextId++,text:text,done:false});
  input.value='';save();render();
}
function deleteTodo(id){todos=todos.filter(function(t){return t.id!==id;});save();render();}
function toggleTodo(id){
  todos=todos.map(function(t){return t.id===id?{id:t.id,text:t.text,done:!t.done}:t;});
  save();render();
}
function save(){localStorage.setItem('codebook_todos',JSON.stringify(todos));}
document.getElementById('todo-input').addEventListener('keydown',function(e){if(e.key==='Enter')addTodo();});
render();
</script></body></html>`,
          challenges: ["Complete the addTodo function so new items appear in the list", "Complete the deleteTodo function so items can be removed", "Complete the toggleComplete function so items can be marked done", "Add localStorage persistence so the list survives a page refresh"]
        }
      },
      {
        id: "3-11",
        title: "Solo Interactive Project",
        body: `No scaffold. No hints until you've spent 30 minutes trying on your own. The brief is intentionally open.\n\n<strong>Build something interactive that responds to user input.</strong> Ideas: a tip calculator, a colour picker, a character counter with a limit, a random quote generator, a unit converter, a password strength checker, a countdown timer. The complexity is yours to choose. The subject is yours to choose. But it must actually work.\n\nMinimum requirements: at least one input or button, JavaScript that reads from that input, and DOM manipulation that changes the page based on what the user does. Beyond that, the decisions are yours. How much to build, how polished to make it, what edge cases to handle.\n\nWhen you hit a wall \u2014 and you will \u2014 apply the debugging process. Read the error. Identify the line. Form a hypothesis. Test it with console.log. One change at a time.\n\nSearching for solutions is not cheating. Every professional developer searches. The skill is knowing what to search for, evaluating what you find, and integrating it into code you understand. If you copy something without understanding it, run it, break it, and figure out why. Understanding is the requirement, not original authorship.`,
        callout: {
          type: "default",
          label: "Choose Scope Deliberately",
          text: "The difference between a good solo project and a half-finished one is choosing a scope you can complete. A tip calculator that fully works is worth more than a social network that's 10% built. Constraint is not failure. Building something complete is the skill being practised here."
        },
        callout2: {
          type: "focus",
          label: "The 30-Minute Rule",
          text: "Spend at least 30 minutes genuinely attempting a problem before searching for a solution. Not 30 minutes of staring \u2014 30 minutes of forming hypotheses, trying things, reading error messages, and narrowing down what's wrong. That process is the skill. The answer matters less than developing the ability to find it."
        },
        hint: `If you're completely blank on a project idea: open your phone, look at the last 10 apps you used. Every one of them takes input and produces output. A calculator. A unit converter. A text formatter. A colour tool. Pick the simplest one. Build the simplest version of it. Then add one feature. Then another.\n\n<strong>Feeling overwhelmed before you start?</strong> Open a file. Write the HTML scaffold. Add an h1 with the project name. That's it for the first five minutes. Momentum is built by starting, not by planning.\n\n<strong>Something works but looks broken?</strong> That's a CSS problem, not a JavaScript problem. Get the functionality completely working first \u2014 correct output in the right elements. Then improve the appearance. Trying to fix both simultaneously is how sessions go nowhere.`,
        quiz: {
          question: "You find a Stack Overflow answer that solves your problem. You paste the code in and it works. What is the most important next step?",
          options: ["Nothing \u2014 if it works, it works, and moving on is the right choice", "Delete the answer and write it yourself from memory to ensure you've understood it", "Read the code line by line until you can explain what each part does and why it works", "Add a comment crediting the Stack Overflow answer"],
          correct: 2,
          feedback: "Code you can't explain is code you don't own. It will behave unexpectedly when conditions change, and you won't know how to modify or debug it. Read it until you understand each line. Break it intentionally \u2014 remove a line, change a value \u2014 and observe what fails. Understanding a solution is the real goal, not just having one that runs."
        },
        checklist: ["I built something without following a guide — the idea and approach were mine", "The project responds to real user input and produces meaningful output", "I can explain every line of code I wrote, including code I found online", "When I got stuck, I read the error, formed a hypothesis, and tested it before searching", "The project is complete enough that I'd show it to someone as evidence of what I can build"]
      },
      {
        id: "3-12",
        title: "Floor Check",
        body: `Before Floor 4, a hard check. Not "did you finish the sections" \u2014 that's the minimum. The question is whether you actually understand what you built.\n\nFloor 4 has no guided building. You receive a brief and produce working code. There are no step-by-step walkthroughs. If you're missing foundations from Floor 3, Floor 4 will not teach them to you \u2014 it will expose the gap and it will be harder to fill from there.\n\nSo before moving: can you explain the DOM to someone who has never coded? Not recite the definition \u2014 explain it, with an example, in a way that would make sense to them. Can you write a function from memory that takes parameters, does something with them, and returns a value? Without looking anything up? Can you debug your own code? When something breaks, do you read the error, identify the line, form a hypothesis, and test it \u2014 or do you change things randomly and hope?\n\nIf any of these feel shaky, spend another week on Floor 3 projects. Not re-reading sections \u2014 building things. Build two more interactive projects. Build them without scaffolds. Debug the inevitable breakages. The foundation solidifies through doing, not through reviewing.\n\nIf you can answer all three questions clearly: you're ready. Floor 4 is waiting.`,
        callout: {
          type: "default",
          label: "Understanding vs Completion",
          text: "Completing sections and understanding concepts are different things. You can finish every section by reading and clicking without internalising anything. The check is whether you can use the knowledge independently \u2014 produce something new without being walked through it. If you can, move on. If you can't, more projects are the prescription."
        },
        callout2: {
          type: "focus",
          label: "Another Week Is Not Failure",
          text: "Spending an extra week on Floor 3 because the foundations aren't solid is the smart choice. Rushing to Floor 4 with shaky fundamentals creates a debt that compounds. Every floor is built on the one before it. A solid Floor 3 makes Floor 4 easier. A shaky one makes every subsequent floor harder."
        },
        hint: `Three things to test right now, before deciding you're ready.\n\nOne: close this app, open a blank HTML file, and write a complete page with a JavaScript function that responds to a button click and modifies the DOM. No looking anything up. If you can do it, the fundamentals are there.\n\nTwo: take one of the projects you built this floor and add a feature that wasn't in the original. Something you have to figure out. If the process of figuring it out feels manageable, you're ready.\n\nThree: read someone else's short JavaScript snippet \u2014 something you didn't write. Can you explain what it does line by line? If yes, you're reading code fluently enough for Floor 4.`,
        quiz: {
          questions: [
            {
              question: "Without looking anything up: what is the DOM and what can JavaScript do with it?",
              options: [
                "The DOM is the JavaScript engine — it executes code and cannot be directly modified",
                "The DOM is the browser's object representation of the page's HTML. JavaScript can read, modify, add, and remove elements without a page reload",
                "The DOM is the CSS styling system — JavaScript modifies visual properties through the DOM",
                "The DOM is a database of all elements ever created in HTML history"
              ],
              correct: 1,
              feedback: "The DOM is the browser's live, object-based representation of the HTML document. Every element is a node in a tree. JavaScript accesses it through document.querySelector(), document.getElementById(), etc. and can change content (.textContent, .innerHTML), attributes, classes, and styles — all without reloading the page."
            },
            {
              question: "A variable is declared as: const users = []; Then later: users = ['Alex']; What happens?",
              options: [
                "users now holds ['Alex'] — const allows you to change the contents of arrays",
                "TypeError: Assignment to constant variable — const prevents reassignment of the binding",
                "The original empty array and the new array both exist in memory",
                "Nothing — JavaScript silently ignores reassignment of const variables"
              ],
              correct: 1,
              feedback: "const prevents reassignment of the variable binding. users = ['Alex'] is reassignment and throws a TypeError. However, the array's contents can still be changed: users.push('Alex') works fine because you're mutating the array, not reassigning the binding. const means 'this variable always points to the same thing' — not 'the thing can't change internally'."
            },
            {
              question: "You want to loop through an array of 10 users and stop as soon as you find a user with admin: true. Which approach is correct?",
              options: [
                "array.forEach(user => { if (user.admin) break; }) — break exits the forEach",
                "array.filter(user => user.admin) — it automatically stops at the first match",
                "A for or for...of loop with break inside the if block — forEach cannot use break",
                "array.map(user => user.admin) and check the result"
              ],
              correct: 2,
              feedback: "forEach cannot use break — break inside a forEach callback has no effect on the outer iteration. For early exit, use a for loop, for...of loop, or array.find(). Array.find() returns the first matching element and stops iterating — it's the cleanest solution for this exact case: const admin = users.find(u => u.admin);"
            },
            {
              question: "Explain what happens when this code runs: const btn = document.querySelector('#submit'); btn.addEventListener('click', e => { e.preventDefault(); });",
              options: [
                "The button is found, a click handler is attached, and when clicked the button's default submit action is prevented",
                "The code throws an error because arrow functions cannot be used as event handlers",
                "The button's click event is permanently disabled — it can never fire again",
                "The code does nothing until the button's default action fires first"
              ],
              correct: 0,
              feedback: "querySelector finds the element with id='submit'. addEventListener attaches a click handler. When the button is clicked, the handler runs, e.preventDefault() cancels the browser's default action (likely submitting a form and reloading the page). The handler runs on every click unless the listener is removed. Arrow functions work perfectly as event handlers."
            },
            {
              question: "A function named processOrder takes an order object and updates a total variable defined outside the function. Is this a pure function? Why does it matter?",
              options: [
                "Yes — it's pure because it takes a parameter and produces an output",
                "No — it's impure because it modifies state outside itself (a side effect). Impure functions are harder to test and can cause bugs when called multiple times",
                "Yes — modifying external variables is the standard way functions communicate results",
                "The purity classification only applies to arrow functions, not regular function declarations"
              ],
              correct: 1,
              feedback: "A pure function always returns the same output for the same inputs and has no side effects — it doesn't modify anything outside itself. Modifying total (an external variable) is a side effect, making processOrder impure. Impure functions are harder to test (you need to set up external state), harder to reason about (calling it twice has different results), and can cause hidden bugs when refactored."
            },
            {
              question: "You're debugging: a button click should show a message but nothing happens. What is the correct debugging sequence?",
              options: [
                "Refresh the page and try clicking multiple times",
                "Rewrite the function from scratch — the original approach is probably wrong",
                "Open DevTools console → check for errors → add console.log inside the handler → verify the event listener is attached to the right element",
                "Delete and re-add the event listener code"
              ],
              correct: 2,
              feedback: "Systematic debugging: (1) Console first — errors tell you what broke and where. (2) Log at the entry point — does the handler even run? If no log appears, the listener isn't attached. (3) If it runs but doesn't work, log the intermediate values to find where the logic fails. Random changes waste time. Read errors, form a hypothesis, test it."
            }
          ]
        },
        checklist: ["I can explain the DOM to someone who has never coded, using a concrete example", "I can write a function from memory that takes parameters and returns a value", "I can debug broken JavaScript systematically, not by making random changes", "I've built at least two interactive projects without a scaffold", "I am confident I understand the material, not just that I completed the sections"]
      },
      {
        id: "3-api-bridge",
        title: "Your First API Call",
        body: `Everything you've built so far uses data you created yourself — arrays, objects, hardcoded values. The real web is different. Almost every useful application pulls live data from somewhere: current weather, stock prices, user profiles, search results. That data comes from <strong>APIs</strong>.\n\nAn API (Application Programming Interface) is a URL that returns data in response to a request. You visit a URL in your browser and see a webpage. Your JavaScript visits a URL and gets back structured data — usually JSON. The request works the same way. The response is different.\n\nHere's what a real API call looks like in JavaScript:\n\n<pre style="background:#0f0f0f;border-radius:6px;padding:12px;font-size:12px;line-height:1.7;overflow:auto"><code>fetch('https://api.example.com/users/1')\n  .then(function(response) {\n    return response.json();\n  })\n  .then(function(user) {\n    console.log(user.name);\n  });</code></pre>\n\n<code>fetch()</code> sends the request. The server responds with a <code>Response</code> object — not the data yet, just the response. <code>response.json()</code> reads the body and converts it from JSON text to a JavaScript object. That object is what you work with.\n\nThe API you'll use in the editor: <code>https://jsonplaceholder.typicode.com</code> — a free, public test API used by millions of developers. It has fake users, posts, and comments you can fetch without an API key. Perfect for learning.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — based on the fetch pattern above, what do you think happens to your code while the request is in flight? Does the browser freeze, or does something else continue running?</div>\n\nYou'll explore what's actually happening inside the fetch mechanism in Floor 4. For now, the pattern is enough: fetch a URL, handle the response, use the data. This is exactly how every weather app, social media feed, and news site works.`,
        callout: {
          type: "default",
          label: "JSON Is Just Text",
          text: "JSON (JavaScript Object Notation) looks exactly like a JavaScript object literal, but it's just a string — a specific format for serialising data. fetch() receives it as text, and .json() parses that text into a real JavaScript object your code can work with. Anything you can do with a regular object, you can do with parsed JSON."
        },
        callout2: {
          type: "focus",
          label: "The Two-Step Pattern",
          text: "Every fetch call follows the same pattern: await the fetch to get the Response, then await .json() to get the data. Forgetting the second step is one of the most common mistakes in JavaScript. You get a Promise object back instead of your data, and nothing in your code works as expected."
        },
        hint: `The fetch call isn't returning what you expected.\n\n<strong>First check:</strong> Open the Network tab in DevTools (F12). Find the request. Click it. Look at the Response tab — you'll see exactly what the API sent back. Compare that to what you're accessing in your code. If the API returned <code>{"user": {"name": "Alex"}}</code>, you need <code>data.user.name</code>, not <code>data.name</code>.\n\n<strong>Still confused?</strong> Add <code>console.log(data)</code> immediately after parsing — before trying to access any properties. Look at the shape of the object. Then access what you actually see.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#9c8dc0;margin-bottom:16px}
button{background:#9c8dc0;color:#fff;border:none;border-radius:6px;padding:10px 20px;font-family:inherit;font-size:13px;cursor:pointer;margin-bottom:16px}
button:hover{background:#b3a6d4}
#output{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:16px;min-height:80px}
.loading{color:#666;font-style:italic}
.field{display:flex;gap:16px;margin-bottom:6px}
.key{color:#888;font-size:11px;min-width:90px;margin-top:2px}
.val{color:#9c8dc0}
.label{color:#555;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
</style></head><body>
<h2>Your First API Call</h2>
<button onclick="fetchUser()">Fetch a User</button>
<div id="output"><p class="loading">Press the button to make a real API request...</p></div>
<script>
function fetchUser() {
  var output = document.getElementById('output');
  output.innerHTML = '<p class="loading">Fetching...</p>';

  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      output.innerHTML = '<div class="label">Response received</div>' +
        '<div class="field"><span class="key">name</span><span class="val">' + user.name + '</span></div>' +
        '<div class="field"><span class="key">email</span><span class="val">' + user.email + '</span></div>' +
        '<div class="field"><span class="key">city</span><span class="val">' + user.address.city + '</span></div>' +
        '<div class="field"><span class="key">company</span><span class="val">' + user.company.name + '</span></div>';
    })
    .catch(function(error) {
      output.innerHTML = '<p style="color:#f87171">Error: ' + error.message + '</p>';
    });
}
<\/script></body></html>`,
          challenges: [
            "Change the user ID from 1 to 5 — you'll get a different user's data",
            "Display 2 more fields from the user object (log the full object first to see what's available)",
            "Fetch a post instead of a user: https://jsonplaceholder.typicode.com/posts/1",
            "Display a loading spinner or 'Fetching...' message while the request is in flight"
          ]
        },
        quiz: {
          question: "You call <code>fetch('https://api.example.com/data')</code> and immediately on the next line try to use the response. Why doesn't it work?",
          options: [
            "fetch() requires a callback function to return data — you can't chain from it",
            "fetch() is asynchronous — the next line runs before the response arrives. You must handle the result inside .then() or use await",
            "fetch() only works inside event handlers",
            "The API hasn't received the request yet when the next line runs"
          ],
          correct: 1,
          feedback: "fetch() starts the network request and returns a Promise immediately — before the response has arrived. JavaScript doesn't pause and wait. The next line runs with no data yet. To use the response, you must either chain .then() (which runs when the response arrives) or use async/await (which tells the function to pause at that point). This is the fundamental behaviour of all asynchronous JavaScript."
        },
        checklist: [
          "I made a real API call that fetched live data and displayed it on screen",
          "I can explain what .json() does and why it's a separate step from fetch()",
          "I handle the error case with .catch() — I don't assume the request always succeeds",
          "I can read a JSON response in the Network tab and map it to properties in my JavaScript code",
          "I understand that fetch() is asynchronous — the data doesn't exist on the next line"
        ]
      },
      {
        id: "3-testing-intro",
        title: "Testing: Does Your Code Actually Work?",
        body: `You've been testing code all along — you run it, look at the output, and check it matches what you expected. That's manual testing. It works when you have five functions. It breaks down when you have fifty.\n\nAutomated testing is writing code that tests your code. You write a function, then write a small test that calls it with known inputs and checks the output matches what you expect. Run the test suite and you get an instant report: everything passes, or something broke.\n\nThe simplest possible test is just an assertion — a check that something is true:\n\n<pre style="background:#0f0f0f;border-radius:6px;padding:12px;font-size:12px;line-height:1.7;overflow:auto"><code>function add(a, b) {\n  return a + b;\n}\n\n// Manual test\nconsole.log(add(2, 3)); // you check it looks like 5\n\n// Automated test\nif (add(2, 3) !== 5) {\n  throw new Error('add(2, 3) should return 5');\n}</code></pre>\n\nReal testing frameworks (Jest is the most popular for JavaScript) provide better syntax and run hundreds of tests automatically:\n<pre style="background:#0f0f0f;border-radius:6px;padding:12px;font-size:12px;line-height:1.7;overflow:auto"><code>test('add returns correct sum', () => {\n  expect(add(2, 3)).toBe(5);\n  expect(add(-1, 1)).toBe(0);\n  expect(add(0, 0)).toBe(0);\n});</code></pre>\n\nThe value becomes obvious the moment you change a function. Without tests: you make a change, then manually click through every feature that might be affected — hoping you caught everything. With tests: you make a change and run one command. If anything broke, you're told exactly what and where in two seconds.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — pick any function you wrote this floor. What are three different inputs you'd want to test it with — beyond the obvious happy path?</div>\n\nThe discipline to apply now: when something breaks, before you fix it, write a test that reproduces the bug. Fix the bug. The test now passes. Next time someone changes that code, the test prevents the same bug from silently reappearing. This is how professional codebases stay stable as they grow.`,
        callout: {
          type: "default",
          label: "Tests Are Documentation",
          text: "A test suite tells the next developer — or your future self — exactly what each function is supposed to do. <code>expect(formatDate('2024-01-01')).toBe('1 January 2024')</code> is more precise than any comment. Tests don't get out of date the way comments do — a failing test is immediately visible."
        },
        callout2: {
          type: "focus",
          label: "What to Test",
          text: "Test edge cases more than happy paths. The happy path (valid input, expected output) usually works. Edge cases break things: empty strings, null values, zero, very large numbers, inputs in unexpected formats. Think: 'what's the weirdest thing someone could pass to this function?' Write a test for that."
        },
        hint: `Writing your first test and not sure what to assert.\n\n<strong>Start with: </strong> what is the function supposed to return? Write that as an assertion first. Then think: what should happen with an empty input? A negative number? A null? A string where a number is expected? Write one test for each case.\n\n<strong>The naming pattern:</strong> Good test names describe the scenario: <code>'returns empty array when input is empty'</code>, <code>'throws error for negative values'</code>, <code>'handles strings with leading spaces'</code>. The test name is the spec.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#9c8dc0;margin-bottom:4px}
p{color:#666;margin-bottom:16px;font-size:12px}
.test-block{background:#111;border:1px solid #222;border-radius:8px;padding:16px;margin-bottom:12px}
.test-title{color:#9c8dc0;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
button{background:#9c8dc0;color:#fff;border:none;border-radius:6px;padding:10px 20px;font-family:inherit;font-size:13px;cursor:pointer;margin-bottom:16px;font-weight:600}
button:hover{background:#b3a6d4}
.result{margin-top:4px;padding:6px 10px;border-radius:4px;font-size:12px}
.pass{background:#052e16;color:#4ade80;border:1px solid #14532d}
.fail{background:#450a0a;color:#f87171;border:1px solid #7f1d1d}
.summary{margin-top:12px;padding:10px 14px;border-radius:6px;font-size:12px}
.summary.all-pass{background:#052e16;color:#4ade80}.summary.has-fail{background:#450a0a;color:#f87171}
</style></head><body>
<h2>Write Your Own Tests</h2>
<p>The functions below have tests. Run them. Then add more tests.</p>
<button onclick="runTests()">Run All Tests</button>
<div id="results"></div>
<script>
// --- Functions under test ---
function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function countWords(sentence) {
  if (!sentence.trim()) return 0;
  return sentence.trim().split(/\\s+/).length;
}

function isEven(n) {
  return n % 2 === 0;
}

// --- Test suite ---
const tests = [
  // capitalise tests
  { name: 'capitalise: makes first letter uppercase', fn: () => capitalise('hello') === 'Hello' },
  { name: 'capitalise: leaves rest unchanged', fn: () => capitalise('hELLO') === 'HELLO' },
  { name: 'capitalise: handles empty string', fn: () => capitalise('') === '' },
  { name: 'capitalise: single character', fn: () => capitalise('a') === 'A' },
  // countWords tests
  { name: 'countWords: counts words in sentence', fn: () => countWords('Hello World') === 2 },
  { name: 'countWords: handles single word', fn: () => countWords('Hello') === 1 },
  { name: 'countWords: handles multiple spaces', fn: () => countWords('  two  words  ') === 2 },
  { name: 'countWords: empty string returns 0', fn: () => countWords('') === 0 },
  // isEven tests
  { name: 'isEven: even number returns true', fn: () => isEven(4) === true },
  { name: 'isEven: odd number returns false', fn: () => isEven(3) === false },
  { name: 'isEven: zero is even', fn: () => isEven(0) === true },
  // ADD YOUR OWN TESTS BELOW:
];

function runTests() {
  let passed = 0, failed = 0, html = '';
  tests.forEach(t => {
    try {
      const ok = t.fn();
      html += '<div class="result ' + (ok ? 'pass' : 'fail') + '">' + (ok ? '✓' : '✗') + ' ' + t.name + '</div>';
      ok ? passed++ : failed++;
    } catch(e) {
      html += '<div class="result fail">✗ ' + t.name + ' — threw: ' + e.message + '</div>';
      failed++;
    }
  });
  html += '<div class="summary ' + (failed ? 'has-fail' : 'all-pass') + '">' +
    passed + ' passed, ' + failed + ' failed</div>';
  document.getElementById('results').innerHTML = html;
}
<\/script></body></html>`,
          challenges: [
            "Add a test for capitalise(null) — what should it return? Make the test pass.",
            "Add a test for isEven(-2) — negative even numbers",
            "Add a new function reverse(str) that reverses a string, then write 4 tests for it",
            "Intentionally break the capitalise function and watch the tests catch it — then fix it"
          ]
        },
        quiz: {
          question: "You fix a bug in a function. Before writing a single line of code, what should you do first?",
          options: [
            "Run the whole app to confirm the bug exists",
            "Write a test that reproduces the failing behaviour — so when the fix lands, the test passes and the bug can never silently return",
            "Look at the git log to find when the bug was introduced",
            "Ask a colleague to review the code before changing anything"
          ],
          correct: 1,
          feedback: "Test-first bug fixing — often called TDD (Test-Driven Development) applied to bugs — ensures two things: (1) you've confirmed you can reproduce the bug programmatically, and (2) when the test passes, the fix is verified. More importantly, the test stays in the suite permanently. The next time someone modifies that function, the test prevents the same bug from reappearing silently."
        },
        checklist: [
          "I can write a test function from scratch that calls code with known inputs and asserts the outputs",
          "I test edge cases: empty inputs, nulls, zeros, boundary values — not just the happy path",
          "I can explain why automated tests are more reliable than manual testing for growing codebases",
          "I've written at least 5 tests for functions I built this floor",
          "I understand what 'test-first' bug fixing means and why it prevents regressions"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Building Alone",
    subtitle: "Independence, APIs and the developer mindset",
    color: "#9a7ec8",
    duration: "2-3 months",
    sessions: "5 per week",
    length: "60-90 min",
    tag: "Floor 04 — Independence",
    sections: [
      {
        id: "4-1",
        title: "How Developers Think",
        body: `Professional developers don't memorise — they have a process. When they face a new problem, they break it down into the smallest possible piece, solve that piece, then move to the next. The first version doesn't need to be perfect. It needs to work. Then you improve it.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — think of the last time you got stuck on something for more than 20 minutes. What was the smallest piece of the problem you could have isolated and searched for specifically? What would that search query have looked like?</div>

One of the most useful debugging techniques has a ridiculous name: rubber duck debugging. You explain your code, line by line, to an inanimate object. The act of explaining forces you to articulate assumptions you didn't know you were making. The bug usually reveals itself before you finish the sentence.

The 20-minute rule: try to solve something yourself for 20 minutes before searching. After 20 minutes of searching, ask someone. Both limits matter — the first builds genuine problem-solving capacity, the second prevents you from losing an hour to something a colleague could answer in 30 seconds.

Reading error messages properly is a skill most beginners skip. Every error has a type (what kind of error), a message (what went wrong in plain English), a file name, and a line number. The line number is where the error was <em>detected</em>, not always where the bug <em>is</em>. Stack traces show the chain of function calls that led to the error — read them from the bottom up.`,
        callout: {
          type: "default",
          label: "The Process",
          text: "Break it down. Solve the smallest piece. Test it. Move to the next piece. Repeat. Every professional developer works this way — the ones who don't are the ones who ship broken software."
        },
        callout2: {
          type: "focus",
          label: "Common Confusion",
          text: "The line number in an error message tells you where the problem was detected, not necessarily where you made the mistake. A missing variable declared on line 5 might only cause an error when it's used on line 40."
        },
        hint: `You're stuck and you don't know why the code isn't working. That is the normal state of development. It isn't a sign you're doing it wrong.

<strong>Try this:</strong> Explain what the code should be doing, line by line, out loud. Don't skip lines. If you can't explain a line, that line is probably where the problem is.

<strong>Still stuck?</strong> Read the error message in full before doing anything else. The error type tells you what category of problem it is. The message tells you what specifically went wrong. The line number tells you where to look. You have more information than you think.`,
        quiz: {
          question: "You see an error on line 47 of your code. What does this tell you about where the bug actually is?",
          options: ["The bug is definitely on line 47", "Line 47 is where the error was detected, but the actual mistake could be on an earlier line", "The bug is on a line after line 47", "The error message is unreliable and should be ignored"],
          correct: 1,
          feedback: "Line 47 is where JavaScript noticed something was wrong, not necessarily where you made the mistake. If a variable is misspelled on line 12, the error might only surface when you try to use it on line 47. Start at the reported line, then trace backwards through the call stack to find the root cause."
        },
        checklist: ["I can break an unfamiliar problem into pieces small enough to search for individually", "I've used the 20-minute rule: attempted a problem genuinely before searching", "I can read an error message, identify the type and line number, and form a hypothesis before changing anything", "I've used rubber duck debugging — explained a problem out loud — and it helped", "I can identify the minimal reproducible version of a bug I'm debugging"]
      },
      {
        id: "4-2",
        title: "Reading Documentation",
        body: `MDN Web Docs is the authoritative reference for everything on the web. Not a blog post, not a Stack Overflow answer — MDN. It is maintained by Mozilla and browser vendors and reflects the actual specification. When you want to know how something works, MDN is where you go.

Reading documentation is a skill. A doc page has a consistent structure: description of what the thing is, syntax showing how to call it, parameters explaining what it accepts, return value describing what it gives back, and examples. Skim the structure first, then read the part that answers your specific question.

Searching docs effectively means knowing what you're looking for. Searching "array remove item" in MDN gives you Array.prototype.splice() and Array.prototype.filter(). From there you can decide which fits your situation. Documentation is a reference, not a textbook — you look things up when you need them, not memorise them in advance.

Stack Overflow answers require more evaluation. Before trusting an answer: check when it was posted (a 2012 answer may use outdated syntax), check the vote count (highly voted answers are usually correct), and check whether the question matches your exact situation (the question might look similar but have a crucial difference).

The browser console is an underused sandbox. Any line of JavaScript can be typed directly into the console and run immediately. Before adding code to a file, test the concept in the console first. It saves the file-save, browser-refresh cycle entirely.`,
        callout: {
          type: "default",
          label: "MDN First",
          text: "When something on the web confuses you, go to MDN first. developer.mozilla.org. Bookmark it. It is more reliable than any tutorial, blog, or AI-generated explanation. It is what the browser vendors themselves use."
        },
        callout2: {
          type: "focus",
          label: "Stack Overflow Gotcha",
          text: "A Stack Overflow answer with 800 upvotes from 2014 can be completely wrong for modern JavaScript. Always check the date alongside the vote count. The most dangerous answers are the highly-voted outdated ones — they look authoritative but lead you to deprecated patterns."
        },
        hint: `You're reading a doc page and it makes no sense. That's normal. Documentation is written for people who already understand the basics — it's a reference, not a tutorial.

<strong>Try this:</strong> Skip to the Examples section at the bottom. Read a working example first, then go back to the description. Code before theory makes the theory stick.

<strong>Still stuck?</strong> Type the specific thing you want to do into the browser console. If it works, you understand it. If it errors, read the error. The console gives you immediate feedback that documentation can't.`,
        quiz: {
          question: "You find a Stack Overflow answer that perfectly matches your problem. It has 1,200 upvotes. Before using it, what should you check?",
          options: ["Nothing — 1,200 upvotes means it's definitely correct and up to date", "The date it was posted and whether the question describes exactly your situation", "Whether the answerer has a gold badge", "Whether the page has been viewed more than 10,000 times"],
          correct: 1,
          feedback: "Vote counts measure historical usefulness, not current accuracy. A JavaScript answer from 2013 may use var, callbacks, and patterns that have been superseded. Always check the date. Also verify the question actually matches your situation — similar-looking problems can have different root causes."
        },
        checklist: ["I can navigate MDN to find the syntax, parameters, and return value of a method I've never used", "I can read a function signature and understand what it expects and returns", "I've successfully read API documentation and written a working fetch call from it without a tutorial", "I can distinguish between the method's description, its parameters, and its return value in docs", "I know where to look first when something isn't working: docs before Stack Overflow"]
      },
      {
        id: "4-3",
        title: "What APIs Are",
        body: `APIs let your code talk to other systems. Every major product you use is built on top of other people's APIs. Uber doesn't build maps — it uses Google Maps API. Spotify doesn't build payment processing — it uses Stripe. Every "Login with Google" button you've ever clicked is an OAuth API call.

REST APIs use the same HTTP methods your browser uses to load pages. GET retrieves data. POST creates something new. PUT or PATCH updates something existing. DELETE removes something. These four methods map onto the four database operations: read, create, update, delete.

Every API call goes to an <strong>endpoint</strong> — a URL that represents a specific resource or action. https://api.spotify.com/v1/tracks/123 is an endpoint that returns data about a specific track. The request goes out, the server processes it, and the response comes back with data and a status code.

HTTP status codes tell you what happened: 200 means success, 201 means something was created, 400 means your request was malformed, 401 means you're not authenticated, 403 means you don't have permission, 404 means the resource doesn't exist, 500 means the server broke. Knowing these by feel speeds up debugging dramatically.

APIs speak in JSON — JavaScript Object Notation. It is the universal format for data exchange between systems: key-value pairs, arrays, nested objects. Any language on any platform can read it. That's why it won.`,
        callout: {
          type: "default",
          label: "APIs Are Everywhere",
          text: "Every feature you use that involves another company's service is an API: weather data, maps, payments, authentication, email delivery, image recognition. Learning to use APIs is learning to leverage thousands of engineers' work from a single function call."
        },
        callout2: {
          type: "focus",
          label: "Status Codes That Bite Everyone",
          text: "401 Unauthorized means you're not authenticated (no valid credentials sent). 403 Forbidden means you ARE authenticated but don't have permission for this resource. These two look similar but require completely different fixes. Getting them confused wastes time."
        },
        hint: `You're calling an API and getting an error status code but don't know what it means.

<strong>Try this:</strong> Look up the status code directly — "HTTP 422" in a search returns the exact meaning immediately. Then look at the response body — most APIs include a JSON error message explaining exactly what went wrong.

<strong>Still stuck?</strong> Open the Network tab in DevTools. Find your API request, click it, and look at the Headers and Response tabs. You'll see the exact request that went out and the exact response that came back. This is the fastest way to diagnose any API problem.`,
        quiz: {
          question: "An API returns a 401 status code. What does this tell you about what went wrong?",
          options: ["The server crashed and needs to be restarted", "The resource you requested does not exist", "Your request did not include valid authentication credentials", "You have permission to read but not to write to this resource"],
          correct: 2,
          feedback: "401 Unauthorized means the server doesn't know who you are — no valid API key, token, or credentials were included in the request. 403 Forbidden means the server knows who you are but won't let you do this specific thing. 404 means the resource doesn't exist. 500 means the server failed."
        },
        checklist: ["I can explain what an API is to someone non-technical using a concrete real-world analogy", "I can name the four HTTP methods and describe what each one is used for", "I can read an HTTP status code and know whether the request succeeded or failed — and why", "I can describe what JSON looks like and how it relates to JavaScript objects", "I can identify an API endpoint in a URL and explain what each part means"]
      },
      {
        id: "4-promises",
        title: "Understanding Promises",
        body: `JavaScript is single-threaded: it can only do one thing at a time. When you make a network request, read a file, or set a timer, you can't just stop and wait — the page would freeze completely. So these operations are <strong>asynchronous</strong>: you start the operation, register what should happen when it's done, and move on. The result arrives later.\n\nA <strong>Promise</strong> is an object that represents the eventual result of an asynchronous operation. It exists in one of three states: <strong>pending</strong> (the operation hasn't finished), <strong>fulfilled</strong> (it succeeded, there's a value), or <strong>rejected</strong> (it failed, there's an error). Once a Promise moves from pending to either fulfilled or rejected, it stays there — it never changes state again.\n\nYou handle a fulfilled Promise with <code>.then()</code>, and a rejected one with <code>.catch()</code>:\n\n<pre style="background:#0f0f0f;border-radius:6px;padding:12px;font-size:12px;line-height:1.7;overflow:auto"><code>fetch('https://api.example.com/data')\n  .then(response => response.json())   // runs when fetch succeeds\n  .then(data => console.log(data))     // runs when .json() resolves\n  .catch(error => console.error(error)) // runs if anything fails\n  .finally(() => setLoading(false));   // runs always</code></pre>\n\nEach <code>.then()</code> returns a new Promise, so you can chain them. Each link in the chain receives the return value of the previous one. If any link throws an error or rejects, the chain skips straight to <code>.catch()</code>.\n\n<strong>Promise.all()</strong> runs multiple Promises in parallel and waits for all of them: <code>const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()])</code>. If any one rejects, the whole thing rejects. <strong>Promise.allSettled()</strong> waits for all to complete regardless of success or failure, giving you each result individually.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — if a Promise chain has three .then() calls and the second one throws an error, what happens to the third .then()? Where does the error go?</div>\n\nUnderstanding this is essential before using <code>async/await</code> — the next section. async/await is syntax that makes Promise code easier to read, but it's built entirely on Promises underneath. When you <code>await</code> something, you're waiting for a Promise to settle. If it rejects, you get an error. Knowing this makes the next section click immediately.`,
        callout: {
          type: "default",
          label: "Promises vs Callbacks",
          text: "Before Promises, async code used callbacks — functions passed as arguments that run when an operation completes. Callbacks work but nesting them creates 'callback hell': deeply nested code that's hard to read and harder to handle errors in correctly. Promises flatten that nesting into a linear chain. async/await flattens it further into code that looks synchronous."
        },
        callout2: {
          type: "focus",
          label: "Always Handle Rejection",
          text: "An unhandled Promise rejection is a silent failure. The operation fails, your code does nothing, and the user sees nothing change — no error, no loading state, nothing. Always add .catch() or wrap await in try/catch. The browser console will warn about unhandled rejections, but in production you might never see them."
        },
        hint: `You have a <code>.then()</code> chain but can't see where an error is happening.\n\n<strong>Try this:</strong> Add a <code>.catch(err => console.error('CAUGHT:', err))</code> at the end of the chain. Run the code. The error will appear in the console with the message that explains what failed.\n\n<strong>Still confused about chain order?</strong> Read the chain top to bottom. Each <code>.then()</code> receives what the previous one returned. <code>fetch()</code> resolves to a Response. <code>.then(r => r.json())</code> converts it to an object. <code>.then(data => ...)</code> now has your actual data. Think of each <code>.then()</code> as one step in an assembly line.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#818cf8;margin-bottom:16px}
button{background:#818cf8;color:#000;border:none;border-radius:6px;padding:10px 20px;font-family:inherit;font-size:13px;cursor:pointer;margin-right:10px;margin-bottom:12px;font-weight:600}
button:hover{background:#a5b4fc}
button:disabled{opacity:0.5;cursor:not-allowed}
#log{background:#111;border:1px solid #222;border-radius:8px;padding:16px;min-height:120px;font-size:12px;line-height:1.8}
.pending{color:#fbbf24}.fulfilled{color:#4ade80}.rejected{color:#f87171}.info{color:#818cf8}
.ts{color:#555;font-size:11px;margin-right:8px}
</style></head><body>
<h2>Promise States in Action</h2>
<button onclick="runSuccess()" id="btn1">Fetch Real Data</button>
<button onclick="runFailure()" id="btn2">Trigger a Rejection</button>
<button onclick="runParallel()" id="btn3">Promise.all (parallel)</button>
<div id="log"><p class="info">Click a button to see Promises in action...</p></div>
<script>
function log(msg, cls) {
  const ts = new Date().toISOString().slice(11,23);
  document.getElementById('log').innerHTML +=
    '<div><span class="ts">'+ts+'</span><span class="'+cls+'">'+msg+'</span></div>';
}
function clearLog() { document.getElementById('log').innerHTML = ''; }

function runSuccess() {
  clearLog();
  log('Promise created — state: PENDING', 'pending');
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      log('First .then() — got Response object, calling .json()', 'info');
      return response.json();
    })
    .then(data => {
      log('Second .then() — state: FULFILLED', 'fulfilled');
      log('Title: ' + data.title.slice(0, 50), 'fulfilled');
    })
    .catch(err => log('REJECTED: ' + err.message, 'rejected'))
    .finally(() => log('finally() runs regardless of outcome', 'info'));
}

function runFailure() {
  clearLog();
  log('Promise created — state: PENDING', 'pending');
  fetch('https://does-not-exist-404xyz.invalid/api')
    .then(response => {
      log('.then() — this will NOT run', 'fulfilled');
      return response.json();
    })
    .catch(err => {
      log('REJECTED: state changed to REJECTED', 'rejected');
      log('Error: ' + err.message, 'rejected');
    })
    .finally(() => log('finally() still runs after rejection', 'info'));
}

function runParallel() {
  clearLog();
  log('Promise.all — 3 requests starting simultaneously...', 'pending');
  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(r=>r.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/2').then(r=>r.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/3').then(r=>r.json())
  ]).then(([p1, p2, p3]) => {
    log('All 3 resolved — FULFILLED', 'fulfilled');
    log('Post 1: ' + p1.title.slice(0,30)+'...', 'fulfilled');
    log('Post 2: ' + p2.title.slice(0,30)+'...', 'fulfilled');
    log('Post 3: ' + p3.title.slice(0,30)+'...', 'fulfilled');
  }).catch(err => log('One failed — all rejected: ' + err.message, 'rejected'));
}
<\/script></body></html>`,
          challenges: [
            "Add a fourth button that uses Promise.race() — it resolves with the first Promise to settle",
            "In runSuccess(), add a second stage that constructs an object from the fetched data and returns it",
            "What happens if you remove the .catch() from runFailure()? Try it and check the browser console",
            "Modify runParallel() to use Promise.allSettled() instead and log which succeeded vs failed"
          ]
        },
        quiz: {
          question: "A Promise chain: <code>fetch(url).then(r => r.json()).then(data => processData(data)).catch(err => handleError(err))</code> — the <code>r.json()</code> call fails. Which parts of the chain run?",
          options: [
            "All three .then() calls run, then .catch() runs at the end",
            "The first .then() runs, then the failure skips to .catch() — the second .then() is skipped",
            "Nothing runs — the whole chain is cancelled",
            ".catch() only runs if fetch() itself fails — .json() failures are swallowed"
          ],
          correct: 1,
          feedback: "When a .then() callback throws or returns a rejected Promise, the chain skips all subsequent .then() callbacks and jumps straight to the next .catch(). So r.json() failing means processData() is never called — the error goes directly to handleError(). This is one of the key behaviours of Promise chains: one failure propagates to the nearest .catch()."
        },
        checklist: [
          "I can describe the three states of a Promise and explain that a settled Promise never changes state",
          "I can chain .then() calls and explain what each one receives from the previous",
          "I always handle rejection with .catch() — I never leave Promises without error handling",
          "I can explain the difference between Promise.all() and Promise.allSettled()",
          "I understand that async/await is syntax built on top of Promises — I can explain what await is actually doing"
        ]
      },
      {
        id: "4-4",
        title: "Fetch and Async/Await",
        body: `The browser's fetch() function sends HTTP requests from JavaScript. When you search GitHub and results appear without a page reload, that's fetch() making API calls as you type.

fetch() is <strong>asynchronous</strong> — it doesn't block the rest of your code while waiting for the server to respond. Instead, it returns a <strong>Promise</strong>: an object that represents a value that will be available in the future. When the response arrives, the Promise resolves and your code continues.

async/await is syntax that makes asynchronous code read like synchronous code. Mark a function as async, then use await before any operation that returns a Promise. The function pauses at that point, waits for the Promise to resolve, and continues. Under the hood it's still a Promise — async/await is just cleaner syntax on top.

Error handling in async functions uses try/catch. Wrap your await calls in try, and handle network failures or bad responses in catch. An unhandled async error silently fails — the user sees nothing, and the bug is invisible. Always handle errors in production code.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — if you write const data = await fetch(url) and the network is down, what happens? Where does the error go if there’s no try/catch? What does the user see?</div>

A critical mistake: never try to use fetched data outside the async function without properly awaiting it.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — if you write const data = await fetch(url) and the network is down, what exception is thrown? Where does it go if there is no try/catch around the await?</div> The data doesn't exist yet at the point the outer code runs — the Promise hasn't resolved. This is the number one source of undefined errors in code that makes API calls.`,
        callout: {
          type: "default",
          label: "Why Async Exists",
          text: "JavaScript runs on a single thread. If fetch() blocked while waiting for a server response, the entire page would freeze — no scrolling, no clicks, nothing. Async operations keep the thread free while waiting. That's why the page stays responsive during network requests."
        },
        callout2: {
          type: "focus",
          label: "The Classic Mistake",
          text: "fetch() returns a Response object, not the data. You need to call .json() on the response to parse the body — and .json() is also async. So you await fetch(), then await response.json(). Forgetting the second await gives you a Promise object where you expected data."
        },
        hint: `Your fetch call returns undefined or a Promise object instead of the data you expected.

<strong>Try this:</strong> Add console.log() immediately after each await line. If you see [object Promise] instead of your data, you're missing an await somewhere. If you see undefined, the data property you're accessing doesn't exist — console.log the whole response object first to see its actual shape.

<strong>Still stuck?</strong> Open the Network tab in DevTools, find your fetch request, and look at the Response tab. That shows exactly what the API returned. Compare that structure to how you're accessing the data in your code.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px}
h2{color:#6dbf6d;margin:0 0 16px}
button{background:#6dbf6d;color:#000;border:none;border-radius:6px;padding:10px 20px;font-family:inherit;font-size:13px;cursor:pointer;margin-bottom:16px}
button:hover{background:#8de08d}
button:disabled{opacity:0.5;cursor:not-allowed}
#result{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:16px;min-height:80px}
.field{display:flex;gap:16px;margin-bottom:8px;flex-wrap:wrap}
.key{color:#888;font-size:11px;min-width:100px}
.val{color:#c8a96e}
.loading{color:#666;font-style:italic}
.err{color:#ff6b6b}
.label{color:#555;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
</style></head><body>
<h2>Fetch & Async/Await</h2>
<button id="btn" onclick="loadUser()">Fetch User from API</button>
<div id="result"><p class="loading">Press the button to make a real API call...</p></div>
<script>
async function loadUser(){
  var btn=document.getElementById('btn');
  var result=document.getElementById('result');
  btn.disabled=true;
  result.innerHTML='<p class="loading">Fetching...</p>';
  try{
    var response=await fetch('https://jsonplaceholder.typicode.com/users/1');
    if(!response.ok)throw new Error('HTTP '+response.status);
    var user=await response.json();
    result.innerHTML='<div class="label">User fetched successfully</div>'+
      field('name',user.name)+field('email',user.email)+
      field('username',user.username)+field('city',user.address.city)+
      field('company',user.company.name);
  }catch(e){
    result.innerHTML='<p class="err">Error: '+e.message+'</p>';
  }
  btn.disabled=false;
}
function field(k,v){return '<div class="field"><span class="key">'+k+'</span><span class="val">'+v+'</span></div>';}
</script></body></html>`,
          challenges: ["Change the API call to fetch user ID 5 instead of 1", "Add error handling that shows a message if the fetch fails", "Display 3 more fields from the response object", "Add a loading indicator that shows while the fetch is in progress"]
        },
        quiz: {
          question: "Why can't you use data fetched from an API on the line immediately after calling fetch() without async/await?",
          options: ["Because fetch() only works inside event listeners", "Because fetch() is asynchronous — the data doesn't exist yet when the next line runs", "Because the data needs to be converted from binary before use", "Because fetch() requires a callback function to return data"],
          correct: 1,
          feedback: "fetch() starts a network request and returns immediately with a Promise — it doesn't wait for the response. The next line of code runs before the server has responded. To wait for the data, you must either use .then() chaining or mark the function as async and use await before fetch()."
        },
        checklist: ["I can write a complete async/await fetch call with error handling from memory", "I can explain why you need to await both fetch() and .json() — and what happens if you forget", "I wrap all async operations in try/catch and show the user a meaningful error message on failure", "I never try to use fetched data outside the async function without proper awaiting", "I can explain what a Promise is in one sentence without using the word 'asynchronous'"]
      },
      {
        id: "4-phase1-review",
        title: "Phase 1 Review — Developer Mindset, APIs, and Async",
        body: `Five questions covering how developers think, reading documentation, what APIs are, and fetch with async/await.`,
        quiz: {
          questions: [
            {
              question: "A developer is building a feature and doesn't know how to do part of it. What is the professional approach?",
              options: [
                "Stop working until someone more experienced can help",
                "Skip the difficult part and implement a simpler alternative",
                "Break the problem into the smallest possible unknown, search for that specific thing, read the documentation, try it, iterate",
                "Copy the closest Stack Overflow answer without reading it"
              ],
              correct: 2,
              feedback: "Professional developers decompose problems. They identify the specific unknown, search for exactly that, read documentation or examples, implement a minimal test, and iterate. The skill isn't knowing everything — it's knowing how to find what you don't know and integrating it quickly. This process is repeatable regardless of the technology."
            },
            {
              question: "An API endpoint is documented as: GET /api/users/{id} Returns: { id, name, email }. You call fetch('/api/users/42'). What do you expect to receive?",
              options: [
                "An array of all users — the id in the path is ignored",
                "A JSON object with id, name, and email for user 42",
                "A raw HTML page with user 42's profile",
                "A number — the user's ID as a plain integer"
              ],
              correct: 1,
              feedback: "The documentation tells you: path parameter {id} identifies which user, the method is GET (read only), and the response is a JSON object with three fields. You'd get: { id: 42, name: 'Alex Chen', email: 'alex@...' }. Reading documentation before writing code prevents guessing — the documentation is the contract."
            },
            {
              question: "Why must you call .json() on a fetch response AND await that call?",
              options: [
                ".json() is only needed for large responses to decompress them",
                "fetch() returns a Response object, not the data. .json() reads and parses the body — and it's also async because it streams data, so it must be awaited",
                ".json() converts the response to a JavaScript array automatically",
                ".json() is optional — the data is already on the response object as response.data"
              ],
              correct: 1,
              feedback: "fetch() gives you a Response object, not the data. The actual body hasn't been read yet — it streams from the network. .json() reads the body stream and parses it as JSON. Because reading the stream is asynchronous (it might not be fully arrived yet), .json() returns a Promise that must be awaited. Forgetting either await — for fetch or for .json() — gives you a Promise object instead of data."
            },
            {
              question: "An async function contains: const data = fetch('https://api.example.com/data'); console.log(data); — what does the console show?",
              options: [
                "The response data from the API",
                "undefined — fetch hasn't finished yet",
                "A Promise object — fetch is asynchronous and returns a Promise, not the data",
                "An error — you cannot use fetch without await"
              ],
              correct: 2,
              feedback: "Without await, fetch() returns a Promise immediately. The console.log runs before the network request completes and logs the Promise object, not the data. To get the data: const response = await fetch(url); const data = await response.json(); The absence of await is one of the most common async bugs — you get a Promise where you expected data."
            },
            {
              question: "How should you find information about a new JavaScript method you've never used?",
              options: [
                "Ask a colleague — documentation is too complex to read effectively",
                "Trial and error — run variations until something works",
                "Search MDN Web Docs for the method name, read the Syntax section, then look at the Examples",
                "Search Stack Overflow for the exact question you have and use the top answer"
              ],
              correct: 2,
              feedback: "MDN (Mozilla Developer Network) is the authoritative reference for all web APIs. The pattern: Syntax section shows the method signature and all parameters. Parameters section explains each option. Return value section tells you what you get back. Examples section shows real usage. Stack Overflow is useful for problems — MDN is the reference for how things work."
            }
          ]
        }
      },
      {
        id: "4-5",
        title: "Local Storage",
        body: `localStorage is the browser's built-in key-value store. Data saved to localStorage survives page refreshes and browser restarts — it persists until explicitly cleared. Medium uses it to save your draft article so you don't lose it if you close the tab by accident.

localStorage stores strings only. Save a number or boolean and it becomes a string when you read it back. To save objects or arrays, use JSON.stringify() to convert them to a string before saving, and JSON.parse() to convert them back after reading.

The API is minimal: localStorage.setItem('key', value) to save, localStorage.getItem('key') to read (returns null if the key doesn't exist), localStorage.removeItem('key') to delete one item, localStorage.clear() to wipe everything.

sessionStorage works identically but is cleared when the tab closes. The difference matters: use localStorage for things that should persist (user preferences, saved data), sessionStorage for things that should reset each session (temporary UI state, one-time notices).

Common use cases: dark mode preference (so the user doesn't have to toggle it every visit), draft content (so input isn't lost on refresh), cached API responses (so you don't re-fetch the same data), and shopping cart state (so items don't vanish on navigation).`,
        callout: {
          type: "default",
          label: "The String Trap",
          text: "localStorage.setItem('count', 5) saves the number 5. localStorage.getItem('count') returns the string '5'. Then '5' + 1 equals '51', not 6. Always parse numbers back with Number() or parseInt(), and objects with JSON.parse()."
        },
        callout2: {
          type: "focus",
          label: "sessionStorage vs localStorage",
          text: "If you save something to sessionStorage and the user closes the tab and reopens it, the data is gone. localStorage survives that. Pick based on whether the data should outlast the session — don't default to one or the other without thinking about it."
        },
        hint: `Your data disappears on page refresh even though you're using localStorage.

<strong>Try this:</strong> Open DevTools, go to Application > Local Storage. You can see exactly what's stored, what keys exist, and what values they hold. If your key isn't there, setItem isn't running correctly — add a console.log just before it to confirm it's being called.

<strong>Still stuck?</strong> The most common mistake is saving an object without JSON.stringify. localStorage.setItem('user', {name: 'Alex'}) saves the string '[object Object]' — completely useless. Always stringify objects before saving.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px}
h2{color:#6dbf6d;margin-bottom:20px}
.row{display:flex;gap:10px;margin-bottom:16px}
input{flex:1;background:#111;border:1px solid #333;color:#fff;padding:10px;border-radius:6px;font-family:inherit;font-size:13px}
input:focus{outline:none;border-color:#6dbf6d}
button{background:#6dbf6d;color:#000;border:none;border-radius:6px;padding:10px 18px;font-family:inherit;font-size:13px;cursor:pointer;white-space:nowrap}
button:hover{background:#8de08d}
.note{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.note-text{flex:1;line-height:1.6;color:#ccc}
.del{background:none;border:1px solid #444;color:#888;border-radius:4px;padding:4px 10px;font-size:11px;cursor:pointer;white-space:nowrap}
.del:hover{border-color:#ff6b6b;color:#ff6b6b}
.empty{color:#555;font-size:12px;padding:16px 0}
.meta{color:#555;font-size:10px;margin-top:8px}
</style></head><body>
<h2>Local Storage Notes</h2>
<div class="row">
<input type="text" id="note-input" placeholder="Write a note...">
<button onclick="addNote()">Save</button>
</div>
<div id="notes"></div>
<script>
var notes=JSON.parse(localStorage.getItem('codebook_notes'))||[];
function render(){
  var el=document.getElementById('notes');
  if(!notes.length){el.innerHTML='<p class="empty">No notes yet — type one above and click Save</p>';return;}
  el.innerHTML=notes.map(function(n,i){
    return '<div class="note"><div><div class="note-text">'+n.text+'</div>'+
      '<div class="meta">Saved: '+n.date+'</div></div>'+
      '<button class="del" onclick="deleteNote('+i+')">Delete</button></div>';
  }).join('');
}
function addNote(){
  var input=document.getElementById('note-input');
  var text=input.value.trim();if(!text)return;
  notes.push({text:text,date:new Date().toLocaleTimeString()});
  input.value='';
  localStorage.setItem('codebook_notes',JSON.stringify(notes));
  render();
}
function deleteNote(i){
  notes.splice(i,1);
  localStorage.setItem('codebook_notes',JSON.stringify(notes));
  render();
}
document.getElementById('note-input').addEventListener('keydown',function(e){if(e.key==='Enter')addNote();});
render();
</script></body></html>`,
          challenges: ["Add a clear all button that removes all saved notes", "Add a timestamp to each saved note", "Add a character count that updates as the user types", "Make the notes list sortable by date saved"]
        },
        quiz: {
          question: "You save an array to localStorage with localStorage.setItem('items', myArray). When you retrieve it with getItem, what do you get?",
          options: ["The original array, ready to use", "The string '[object Array]'", "The array converted to a comma-separated string", "null, because localStorage cannot store arrays"],
          correct: 1,
          feedback: "localStorage coerces anything that isn't a string using .toString(). An array's toString() returns '[object Array]'. To save an array properly, use JSON.stringify(myArray) before saving. To retrieve it, use JSON.parse(localStorage.getItem('items')). Skipping this step is one of the most common localStorage bugs."
        },
        checklist: ["I always JSON.stringify objects before saving to localStorage — and can explain why", "I always JSON.parse when reading objects back — and handle the case where the value is null", "I can name three appropriate use cases for localStorage and one case where it's wrong", "I know the difference between localStorage and sessionStorage in terms of persistence", "I can view and clear localStorage in DevTools without looking up the steps"]
      },
      {
        id: "4-6",
        title: "Error Handling at Scale",
        body: `try/catch is not optional in production code. The question is not whether errors will happen — they will. The question is whether your application handles them gracefully or crashes silently and confuses the user.

There are two categories of error. <strong>Expected errors</strong> are things you anticipate: the user enters invalid input, the network times out, the API returns no results. These should be handled explicitly with informative messages. <strong>Unexpected errors</strong> are bugs: null pointer exceptions, type mismatches, logic errors. These should be caught, logged, and surfaced in a way that doesn't expose your internals to users.

Defensive programming means checking that data exists before trying to use it. If an API response might not include a nested property, don't access it directly — use optional chaining: user?.address?.city returns undefined instead of throwing a TypeError when address doesn't exist.

Nullish coalescing (??) provides fallback values for null or undefined. user?.name ?? 'Anonymous' returns 'Anonymous' if name is null or undefined, but returns the actual name otherwise. It's more precise than || because || also triggers on 0 and empty string, which are valid values.

Production applications fail gracefully. When Spotify can't load your playlist, it shows a retry button — not a blank screen, not a stack trace. The user should always know what happened and what they can do about it.`,
        callout: {
          type: "default",
          label: "The Production Standard",
          text: "A blank screen is never acceptable. A console error the user can't see is never acceptable. Every error state your application can reach should show the user something useful: what went wrong and what to do next."
        },
        callout2: {
          type: "focus",
          label: "Optional Chaining",
          text: "user.profile.avatar.url throws a TypeError if any step in that chain is null or undefined. user?.profile?.avatar?.url returns undefined safely. Use optional chaining whenever you're accessing data that came from an API — you can't guarantee the shape of every response."
        },
        hint: `Your code crashes when the API returns unexpected data, but you're not sure where to add the error handling.

<strong>Try this:</strong> Find every place you access a property on data that came from an API. Ask: what happens if this property doesn't exist? Add optional chaining (?.) to every nested property access. Then add ?? fallbacks wherever you need a default value.

<strong>Still stuck?</strong> Add console.log(data) before any property access to inspect the full shape of what you're working with. API responses often differ from the documentation in edge cases.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#6dbf6d;margin:0 0 20px}
.section{margin-bottom:24px}
.label{color:#888;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.ok{color:#6dbf6d}.err{color:#ff6b6b}.warn{color:#c8a96e}
button{background:#333;color:#fff;border:1px solid #555;border-radius:6px;padding:8px 18px;font-family:inherit;font-size:12px;cursor:pointer;margin-bottom:10px}
button:hover{border-color:#6dbf6d}
#log{background:#111;border:1px solid #222;border-radius:8px;padding:16px;max-height:200px;overflow-y:auto}
#log p{margin:3px 0}
</style></head><body>
<h2>Error Handling at Scale</h2>
<div class="section">
<div class="label">Retry with exponential backoff</div>
<button onclick="runRetry()">Simulate Unstable API Call</button>
<div id="log"><p class="warn">Click the button to run...</p></div>
</div>
<script>
var logEl=document.getElementById('log');
function log(msg,cls){var p=document.createElement('p');p.className=cls||'';p.textContent=msg;logEl.appendChild(p);logEl.scrollTop=logEl.scrollHeight;}

async function fakeUnstableApi(attempt){
  await new Promise(function(r){setTimeout(r,300);});
  if(attempt<3)throw new Error('Network timeout (attempt '+attempt+')');
  return {status:'ok',data:'Response received'};
}

async function fetchWithRetry(fn,maxRetries){
  for(var i=1;i<=maxRetries;i++){
    try{
      log('Attempt '+i+'...','warn');
      var result=await fn(i);
      log('✓ Success: '+JSON.stringify(result),'ok');
      return result;
    }catch(e){
      log('✗ Failed: '+e.message,'err');
      if(i<maxRetries){
        var delay=Math.pow(2,i)*200;
        log('Retrying in '+delay+'ms...','warn');
        await new Promise(function(r){setTimeout(r,delay);});
      }else{
        log('All retries exhausted.','err');
        throw e;
      }
    }
  }
}

function runRetry(){
  logEl.innerHTML='';
  fetchWithRetry(fakeUnstableApi,4).catch(function(){});
}
</script></body></html>`,
          challenges: ["Add a case that handles when the API returns no results", "Wrap the main function in try/catch and display a friendly error message", "Use optional chaining to safely access a nested property that might not exist", "Add a retry button that re-runs the failed operation"]
        },
        quiz: {
          question: "What does the optional chaining operator (?.) do in the expression data?.user?.name?",
          options: ["It makes the expression run asynchronously", "It checks if data is optional before proceeding", "It safely accesses nested properties, returning undefined instead of throwing if any step is null or undefined", "It creates optional parameters in a function definition"],
          correct: 2,
          feedback: "Optional chaining stops the property access chain early and returns undefined if any value in the chain is null or undefined, rather than throwing a TypeError. data?.user?.name is equivalent to: data && data.user && data.user.name — but shorter and clearer. Essential when working with API data where any nested property might be absent."
        },
        checklist: ["I use try/catch in every async function that makes network requests", "I distinguish between errors the user caused (400) and errors the server caused (500) in my UI", "I use optional chaining (?.) when accessing nested API data that might be undefined", "I use nullish coalescing (??) to provide fallback values for missing data", "My error states show the user something helpful — not a blank screen or a raw error object"]
      },
      {
        id: "4-7",
        title: "Git and Version Control",
        body: `Git is non-negotiable. Every professional developer uses it every day. If it's not in Git, it doesn't exist. A file on your hard drive that isn't committed is a file that can be lost.

The core workflow: git init to start tracking a folder. git add filename (or git add . for everything) to stage changes. git commit -m "describe what you did" to save a snapshot. git push to send it to GitHub. That four-command sequence is 90% of day-to-day Git.

Branches let you work on something new without breaking what already works. git checkout -b feature/new-thing creates a new branch and switches to it. Work there, commit there. When it's ready, merge it back with git merge. If the same line was changed in both branches, that's a merge conflict — Git will mark the conflict and you resolve it manually.

Commit messages matter. "fixed stuff" tells your future self nothing. "fix: prevent crash when API returns empty array" tells your future self exactly what changed and why. The history of your commit messages is the history of your thinking. Write them accordingly.

The GitHub workflow for team projects: fork the repo, clone your fork, create a branch, make commits, push the branch, open a pull request. The pull request is where code gets reviewed before it's merged into the main codebase.`,
        callout: {
          type: "default",
          label: "Start Now",
          text: "Go back to every project you've built. Create a GitHub repository for each one. Push them. Your GitHub profile is your portfolio and your commit history is evidence of consistent work. Start building that record today."
        },
        callout2: {
          type: "focus",
          label: "git restore vs git revert",
          text: "git restore unstages changes or discards uncommitted edits — it modifies your working directory. git revert creates a new commit that undoes a previous commit — it's safe for shared branches because it preserves history. Never use git reset --hard on a branch others are using."
        },
        hint: `You made a commit with a mistake and want to undo it.

<strong>Try this:</strong> If the commit isn't pushed yet, git reset HEAD~1 moves the commit back to staged changes. You can fix the mistake and recommit. If it's already pushed and others may have pulled it, use git revert HEAD instead — this creates a new commit that undoes it safely.

<strong>Still stuck?</strong> Run git log to see your commit history. Each commit has a hash (a long string like a3f9d2b). git revert <hash> undoes that specific commit. git diff <hash> shows what changed in it.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#6dbf6d;margin-bottom:20px;font-size:16px}
.cmd-list{list-style:none;margin-bottom:24px}
.cmd-item{display:flex;align-items:flex-start;gap:14px;padding:10px 14px;border-radius:6px;cursor:pointer;transition:background 0.15s;margin-bottom:4px;border:1px solid transparent}
.cmd-item:hover,.cmd-item.active{background:#111;border-color:#2a2a2a}
.cmd-code{color:#6dbf6d;min-width:200px;font-size:12px}
.cmd-desc{color:#888;font-size:11px;line-height:1.5}
.detail{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:16px;min-height:60px}
.detail h3{color:#c8a96e;font-size:12px;margin-bottom:6px}
.detail p{color:#aaa;line-height:1.7;font-size:12px}
</style></head><body>
<h2>Git Cheatsheet — Click a command</h2>
<ul class="cmd-list" id="cmd-list"></ul>
<div class="detail" id="detail"><p style="color:#555">Select a command above to see details.</p></div>
<script>
var cmds=[
  {cmd:'git init',desc:'Start a new repository',detail:'Creates a hidden .git directory. Run once per project in the project root.'},
  {cmd:'git add .',desc:'Stage all changes',detail:'Moves changes to the staging area. Only staged files are included in the next commit. Use "git add filename" to stage specific files.'},
  {cmd:'git commit -m "msg"',desc:'Save a snapshot',detail:'Records the staged changes permanently with a message explaining why. The message should describe what changed and why, not what files were changed.'},
  {cmd:'git push origin main',desc:'Upload to remote',detail:'Sends your commits to the remote repository (GitHub, etc). Others can now see and pull your changes.'},
  {cmd:'git pull',desc:'Download and merge',detail:'Fetches commits from the remote and merges them into your current branch. Do this before starting work each day.'},
  {cmd:'git branch feature-x',desc:'Create a branch',detail:'Branches let you work on features without touching main. Work on feature-x, test it, then merge back to main when done.'},
  {cmd:'git status',desc:'Show working tree status',detail:'Shows which files are modified, staged, or untracked. Run this frequently — it tells you exactly where you are.'},
];
var list=document.getElementById('cmd-list');
var detail=document.getElementById('detail');
cmds.forEach(function(c,i){
  var li=document.createElement('li');li.className='cmd-item';
  li.innerHTML='<span class="cmd-code">'+c.cmd+'</span><span class="cmd-desc">'+c.desc+'</span>';
  li.onclick=function(){
    document.querySelectorAll('.cmd-item').forEach(function(el){el.classList.remove('active');});
    li.classList.add('active');
    detail.innerHTML='<h3>'+c.cmd+'</h3><p>'+c.detail+'</p>';
  };
  list.appendChild(li);
});
</script></body></html>`,
          challenges: ["Write a commit message for each of these changes: adding a new feature, fixing a bug, updating documentation", "Create a new branch called 'feature/dark-mode' using git checkout -b", "Explain in plain English what git merge does and what a merge conflict is", "Write the exact sequence of git commands to push your first project to GitHub"]
        },
        quiz: {
          question: "You're working on a new feature and you want to make sure it doesn't break the existing working code. What's the correct Git approach?",
          options: ["Edit the files directly on the main branch and commit as you go", "Create a new branch for the feature, work on it there, and merge when it's ready", "Create a copy of the entire project folder and work in that", "Delete the old code before writing the new feature"],
          correct: 1,
          feedback: "Branches exist exactly for this: isolate work-in-progress from working code. Create a branch, make commits on it, and only merge when the feature is tested and working. The main branch should always be in a deployable state. Working directly on main without branching is how teams break each other's work."
        },
        checklist: ["I have Git installed, configured, and have pushed at least one project to GitHub", "I write commit messages that describe WHY, not just what files changed", "I can create a branch, make commits on it, and explain why branches matter for teams", "I can use git status and git log and read their output correctly", "I've resolved at least one merge conflict — I understand what it is and how to fix it"]
      },
      {
        id: "4-8",
        title: "Debugging Like a Developer",
        body: `Debugging is a systematic process, not a random one. The instinct to change things and hope something improves is the most expensive debugging habit you can have — it wastes time, introduces new bugs, and teaches you nothing.

The correct process: first, reproduce the bug reliably. A bug you can't reproduce consistently is a bug you can't fix confidently. Then isolate where it breaks. Then fix the root cause, not the symptom.

The DevTools debugger in the Sources tab is more powerful than console.log for complex bugs. Set a breakpoint by clicking a line number. When code execution hits that line, it pauses. You can then step over (run the next line), step into (go inside a function call), or step out (finish the current function and return). You can inspect every variable's value at that exact moment.

console.log is not embarrassing. Every developer at every level uses it. The art is in knowing where to put it and what to log. Log variable values at key points in your logic. Log the start and end of functions you're unsure about.

The Network tab shows every request your page makes and the exact response that came back. When an API call isn't working, the Network tab shows you whether the request was even sent, what URL it went to, what headers were included, and what the server returned. This eliminates guessing.

The most important debugging habit: change one thing at a time. Change two things simultaneously and you don't know which one fixed it or which one caused the new problem.`,
        callout: {
          type: "default",
          label: "The Single Change Rule",
          text: "When debugging: change one thing. Test. If it's fixed, you know what the bug was. If not, revert that change and try a different one. Changing multiple things at once makes it impossible to understand cause and effect."
        },
        callout2: {
          type: "focus",
          label: "Breakpoints vs console.log",
          text: "console.log requires you to know in advance what you want to inspect. Breakpoints let you pause execution and inspect everything at once. Use console.log for quick checks on values you already know you want. Use breakpoints when you're not sure what's wrong or where."
        },
        hint: `Something is broken but you can't figure out where the problem is.

<strong>Try this:</strong> Add console.log('reached here', variableName) at key points in your code. Run it and watch the console. The last log that prints before the error tells you which section the bug is in. Then narrow it down further with more logs.

<strong>Still stuck?</strong> Open DevTools Sources tab, find your script, and click the line number where you think the problem might be to set a breakpoint. Run the code and when it pauses, look at the Scope panel on the right — it shows every variable's current value. This is often faster than reasoning about what might be wrong.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px}
h2{color:#6dbf6d;margin-bottom:16px}
.bugs{display:grid;gap:12px;margin-bottom:20px}
.bug{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:16px;cursor:pointer;transition:border-color 0.15s}
.bug:hover{border-color:#6dbf6d}
.bug.revealed{border-color:#c8a96e}
.bug-code{color:#ff9966;font-size:12px;margin-bottom:8px;white-space:pre-wrap}
.bug-q{color:#888;font-size:12px}
.bug-a{color:#c8a96e;font-size:12px;margin-top:8px;display:none;line-height:1.6}
.bug.revealed .bug-a{display:block}
.hint-text{color:#555;font-size:11px;margin-top:4px}
</style></head><body>
<h2>Debugging — Click to reveal the fix</h2>
<div class="bugs">
<div class="bug" onclick="this.classList.toggle('revealed')">
<div class="bug-code">function getTotal(prices) {
  var total = 0;
  prices.forEach(function(p) { total + p; });
  return total;
}</div>
<div class="bug-q">getTotal([10, 20, 30]) returns 0. Why?</div>
<div class="bug-a">✓ Bug: total + p computes the sum but doesn't assign it. Fix: total += p;</div>
</div>
<div class="bug" onclick="this.classList.toggle('revealed')">
<div class="bug-code">var user = { name: 'Alex' };
console.log(user.adress.city);</div>
<div class="bug-q">This throws "Cannot read properties of undefined". Why?</div>
<div class="bug-a">✓ Bug: "adress" is misspelled — it should be "address". Also, user.address doesn't exist in this object, so user.address is undefined and .city throws. Fix the typo and add address to the object.</div>
</div>
<div class="bug" onclick="this.classList.toggle('revealed')">
<div class="bug-code">for (var i = 0; i &lt; 5; i++) {
  setTimeout(function() { console.log(i); }, 1000);
}</div>
<div class="bug-q">Logs "5" five times instead of 0,1,2,3,4. Why?</div>
<div class="bug-a">✓ Bug: var is function-scoped. By the time the timeout fires, the loop has finished and i is 5. Fix: replace var with let (block-scoped) or use an IIFE to capture i at each iteration.</div>
</div>
</div>
</body></html>`,
          challenges: ["Use the debugger to step through the code and find where the wrong value is assigned", "Fix all three bugs in the code — each bug is a different type (reference, type, logic)", "Add console.log statements to trace the exact value of the variable at each step", "Open the Network tab in DevTools, reload the page, and identify all the resources it loads"]
        },
        quiz: {
          question: "You change three things at once trying to fix a bug, and the bug disappears. What problem does this create?",
          options: ["No problem — fixing the bug is all that matters regardless of how", "You don't know which of the three changes fixed it, making future debugging harder", "The other two changes will definitely cause new bugs", "You need to revert to zero changes and start again from scratch"],
          correct: 1,
          feedback: "If you fix a bug by changing three things simultaneously, you've learned nothing about what caused it. When a similar bug appears later, you have no basis for diagnosing it. Worse, you might have introduced subtle problems with the two changes that weren't needed. Change one thing, test, understand what changed. This habit compounds over time."
        },
        checklist: ["I can reproduce a bug reliably before attempting to fix it", "I change one thing at a time when debugging — not multiple things simultaneously", "I can set a breakpoint in DevTools and use step-over/step-into to trace execution", "I read error messages completely and identify type, message, and line before changing anything", "I use the Network tab to inspect API requests and verify what was actually sent and received"]
      },
      {
        id: "4-npm",
        title: "npm and Package Management",
        body: `Every serious JavaScript project uses npm — the Node Package Manager. npm is two things: a registry containing over two million packages that other developers have published, and a command-line tool for installing, managing, and updating those packages.\n\n<code>npm init</code> creates a <code>package.json</code> file — the manifest for your project. It records your project's name, version, and most importantly, its <strong>dependencies</strong>: the packages your project needs to run. When someone else clones your project, they run <code>npm install</code> and npm reads <code>package.json</code> to install exactly the right packages.\n\nInstalling a package: <code>npm install express</code> downloads Express and adds it to <code>dependencies</code> in package.json. <code>npm install --save-dev jest</code> installs Jest as a <strong>devDependency</strong> — a tool only needed during development, not in production. Your test runner doesn't need to be installed on the production server.\n\n<strong>Semantic versioning (semver)</strong> is the version number system: <code>MAJOR.MINOR.PATCH</code>. A patch release (1.0.1 → 1.0.2) fixes bugs without changing the API. A minor release (1.0.0 → 1.1.0) adds features backward-compatibly. A major release (1.0.0 → 2.0.0) breaks backward compatibility — upgrading may require code changes. The <code>^</code> prefix in package.json (e.g. <code>"express": "^4.18.0"</code>) means "accept any minor or patch update to version 4, but not a major version change."\n\n<code>node_modules</code> is the folder where installed packages live. It can be enormous (gigabytes on large projects). You never commit it to git — add it to <code>.gitignore</code>. The package.json and <code>package-lock.json</code> files are what you commit. The lock file records the exact version of every installed package (including dependencies of dependencies) so the install is reproducible.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — why would you commit package.json but not node_modules? What would happen if two developers on the same project had different versions of the same package installed?</div>`,
        callout: {
          type: "default",
          label: "The Lock File Matters",
          text: "package-lock.json records the exact version tree of every installed package. Without it, npm install might grab a newer patch of a dependency that breaks something. Commit the lock file. When you see 'npm ci' in CI/CD scripts — that's a stricter version of npm install that uses only the lock file. This is how teams ensure reproducible builds."
        },
        callout2: {
          type: "focus",
          label: "dependencies vs devDependencies",
          text: "dependencies are packages your app needs to run in production (express, mongoose, jsonwebtoken). devDependencies are tools you need during development only (jest, eslint, prettier, nodemon). When you deploy, most platforms run npm install --production which skips devDependencies. Putting a test runner in dependencies wastes bandwidth and memory in production."
        },
        hint: `You run npm install and get a red wall of errors.\n\n<strong>First: read the last error,</strong> not the first. npm error output is verbose — the final ERESOLVE or ERR! line is the actual cause. Common causes: Node.js version incompatibility (check the 'engines' field in the failing package's npm page), peer dependency conflicts, or corrupted cache.\n\n<strong>Quick reset:</strong> Delete <code>node_modules</code> and <code>package-lock.json</code>, then run <code>npm install</code> again. This forces a clean resolution and fixes most mysterious npm errors.\n\n<strong>To see what's installed:</strong> Run <code>npm list --depth=0</code> to see all top-level packages and their installed versions.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#fb923c;margin-bottom:4px}
p{color:#666;margin-bottom:16px;font-size:12px}
.file{background:#111;border:1px solid #222;border-radius:8px;padding:16px;margin-bottom:12px}
.filename{color:#fb923c;font-size:11px;letter-spacing:1px;margin-bottom:8px}
pre{margin:0;color:#ccc;font-size:12px;line-height:1.6;overflow:auto}
.key{color:#93c5fd}.str{color:#86efac}.num{color:#fbbf24}.note{color:#555}
.cmd{background:#0f0f0f;border:1px solid #333;border-radius:4px;padding:12px;margin-bottom:12px}
.cmd-line{margin-bottom:4px}.prompt{color:#4ade80}.command{color:#fff}
.comment{color:#555}
</style></head><body>
<h2>npm Project Structure</h2>
<p>A well-configured project — the files that travel with your code</p>
<div class="file">
<div class="filename">package.json</div>
<pre>{
  <span class="key">"name"</span>: <span class="str">"my-project"</span>,
  <span class="key">"version"</span>: <span class="str">"1.0.0"</span>,
  <span class="key">"scripts"</span>: {
    <span class="key">"start"</span>: <span class="str">"node server.js"</span>,
    <span class="key">"dev"</span>: <span class="str">"nodemon server.js"</span>,
    <span class="key">"test"</span>: <span class="str">"jest"</span>
  },
  <span class="key">"dependencies"</span>: {
    <span class="key">"express"</span>: <span class="str">"^4.18.0"</span>,   <span class="note">// ^ = allow minor updates</span>
    <span class="key">"mongoose"</span>: <span class="str">"^7.5.0"</span>
  },
  <span class="key">"devDependencies"</span>: {
    <span class="key">"jest"</span>: <span class="str">"^29.0.0"</span>,
    <span class="key">"nodemon"</span>: <span class="str">"^3.0.0"</span>   <span class="note">// dev only — not in production</span>
  }
}</pre>
</div>
<div class="file">
<div class="filename">.gitignore</div>
<pre><span class="note"># Never commit these</span>
node_modules/
.env
.env.local
dist/
*.log</pre>
</div>
<div class="cmd">
<div class="cmd-line"><span class="prompt">$</span> <span class="command">npm init -y</span>         <span class="comment"># create package.json with defaults</span></div>
<div class="cmd-line"><span class="prompt">$</span> <span class="command">npm install express</span>  <span class="comment"># add to dependencies</span></div>
<div class="cmd-line"><span class="prompt">$</span> <span class="command">npm install -D jest</span>  <span class="comment"># add to devDependencies</span></div>
<div class="cmd-line"><span class="prompt">$</span> <span class="command">npm install</span>          <span class="comment"># install everything from package.json</span></div>
<div class="cmd-line"><span class="prompt">$</span> <span class="command">npm run test</span>         <span class="comment"># run the test script</span></div>
<div class="cmd-line"><span class="prompt">$</span> <span class="command">npm outdated</span>         <span class="comment"># see which packages have updates</span></div>
</div>
</body></html>`,
          challenges: [
            "What does the ^ before a version number mean — and what would ~ mean?",
            "What is the difference between npm install and npm ci?",
            "Why is nodemon listed as a devDependency rather than a regular dependency?",
            "Add a 'build' script entry to the package.json that runs 'webpack --mode production'"
          ]
        },
        quiz: {
          question: "You clone a project from GitHub. There is no node_modules folder but there is a package.json and a package-lock.json. What command installs the dependencies and why?",
          options: [
            "npm init — to create the package.json first",
            "npm install — reads package.json (and uses package-lock.json for exact versions) to install all dependencies",
            "npm start — this automatically installs missing packages",
            "You need to manually create the node_modules folder first"
          ],
          correct: 1,
          feedback: "npm install reads package.json to know what to install and uses package-lock.json to install the exact same version tree that the original developer had. node_modules is never committed to git — it can be enormous and is fully reproducible from package.json. npm install is the standard first step after cloning a JavaScript project."
        },
        checklist: [
          "I can create a new npm project from scratch and explain what each field in package.json does",
          "I know the difference between dependencies and devDependencies — and can give two examples of each",
          "I understand semantic versioning and can explain what 1.2.3, ^1.2.3, and ~1.2.3 each mean",
          "My projects have a .gitignore that excludes node_modules and .env files",
          "I commit package.json and package-lock.json but never node_modules"
        ]
      },
      {
        id: "4-pr-workflow",
        title: "Pull Requests and Code Reviews",
        body: `In professional teams, code doesn't go directly to the main branch. It goes through a <strong>pull request</strong> (PR) — a formal request to merge a branch into main, with the opportunity for review before the merge happens. Every company that ships reliable software does this. The exceptions are either very small or very late-stage startups moving fast and accepting the risk.\n\nThe workflow: create a feature branch, build the feature, push the branch, open a PR, teammates review, you address feedback, the PR is approved and merged. The main branch always contains reviewed, tested, deployable code. Feature branches are where work-in-progress lives.\n\nA good PR description answers three questions for the reviewer: <strong>What</strong> does this change? <strong>Why</strong> was this change needed? <strong>How</strong> can it be tested? A PR description that says only "fixes login bug" fails all three. A good description says: "The login endpoint was accepting expired JWTs because we were only checking the signature, not the expiry claim. Added expiry validation in the auth middleware. To test: generate a token, wait for expiry (or manually set exp to a past timestamp), and confirm the 401 response."\n\nCode review is not a gatekeeping exercise. Its purpose is to catch bugs before production, share knowledge across the team, and maintain code quality as the codebase grows. As a reviewer, your job is not to impose your style preferences — it's to ask whether the code is correct, readable, and appropriately handles edge cases.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — if a reviewer leaves a comment saying "I'd write this differently," but the current code works correctly and is readable, what's the appropriate response?</div>\n\nHandling review feedback professionally: distinguish between blocking issues (the code is wrong or unsafe — must be changed) and suggestions (the reviewer's preference, not a requirement). Address all blocking issues. Respond to suggestions either by implementing them or by explaining why you didn't. Never silently ignore a reviewer's comment — even "acknowledged, keeping original approach because X" is the professional response.',`,
        callout: {
          type: "default",
          label: "Small PRs Get Better Reviews",
          text: "A 2,000-line pull request gets rubber-stamped. A 200-line PR gets read carefully. This is human nature, not poor practice. Professional developers make small, focused PRs: one feature, one bug fix, one refactor. If your PR touches ten different things, it should probably be ten PRs. Reviewers can only give you useful feedback on code they can actually understand."
        },
        callout2: {
          type: "focus",
          label: "The Nit Convention",
          text: "In code review, 'nit:' before a comment means 'nitpick' — a minor stylistic suggestion that is not blocking. 'nit: rename x to userCount for clarity' means the reviewer prefers it but won't block the PR. Learning to distinguish nitpicks from real issues is a skill. Don't get defensive about nits, and don't die on hills over them."
        },
        hint: `You've opened a PR and the reviewer left 12 comments. It feels personal. It isn't.\n\n<strong>Read all the comments first before responding to any.</strong> Some comments clarify earlier ones. Some you'll agree with immediately. Some you'll want to think about.\n\n<strong>The right framing:</strong> Every comment is the reviewer doing their job — trying to make the code better before it ships. The ideal outcome is better code, not winning an argument.\n\n<strong>If you disagree:</strong> Explain your reasoning concisely. "Keeping the current approach because X" with X being a technical reason is a valid response. "Because I prefer it" is not. If it's a genuine disagreement, bring it to a conversation — don't fight it out in PR comments.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#34d399;margin-bottom:4px}
p{color:#666;margin-bottom:16px;font-size:12px}
.pr{background:#111;border:1px solid #222;border-radius:8px;padding:16px;margin-bottom:12px}
.pr-title{color:#34d399;font-size:14px;font-weight:600;margin-bottom:8px}
.pr-label{font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
.good-label{color:#34d399}.bad-label{color:#f87171}
.pr-body{color:#ccc;font-size:12px;line-height:1.6;white-space:pre-wrap}
.review{background:#0f1a14;border:1px solid #14532d;border-radius:6px;padding:12px;margin-top:12px;font-size:12px}
.review-header{color:#4ade80;margin-bottom:6px;font-size:11px;text-transform:uppercase;letter-spacing:1px}
.comment{margin-bottom:8px;padding:8px;background:#111;border-radius:4px;border-left:2px solid #333}
.comment.blocking{border-left-color:#f87171}.comment.nit{border-left-color:#f59e0b}.comment.suggest{border-left-color:#60a5fa}
.badge{font-size:10px;padding:2px 6px;border-radius:3px;margin-right:6px}
.badge.block{background:#7f1d1d;color:#fca5a5}
.badge.nit-b{background:#78350f;color:#fcd34d}
.badge.suggest-b{background:#1e3a5f;color:#93c5fd}
</style></head><body>
<h2>PR Description Quality</h2>
<p>The difference between a PR that gets reviewed and one that gets ignored</p>
<div class="pr">
<div class="bad-label">Bad PR description</div>
<div class="pr-title">Fix bug</div>
<div class="pr-body">Fixed the login issue.</div>
</div>
<div class="pr">
<div class="good-label">Good PR description</div>
<div class="pr-title">Fix: JWT expiry not validated on login endpoint</div>
<div class="pr-body">What: Added expiry claim validation to auth middleware.
Why: The /api/login endpoint verified JWT signatures but not the exp claim — expired tokens were accepted as valid, allowing session continuation after logout or token expiry.
How to test:
  1. Log in, copy the JWT from localStorage
  2. Manually set the exp field to a past timestamp (use jwt.io)
  3. Make a request to /api/protected with the modified token
  4. Confirm 401 Unauthorized — previously this returned 200</div>
</div>
<div class="review">
<div class="review-header">Example review comments</div>
<div class="comment blocking"><span class="badge block">BLOCKING</span>auth.js:47 — This doesn't handle the case where exp is missing entirely. A token with no exp field will throw here.</div>
<div class="comment nit"><span class="badge nit-b">NIT</span>auth.js:52 — Minor: const tokenAge is never used below, can be removed.</div>
<div class="comment suggest"><span class="badge suggest-b">SUGGEST</span>Consider extracting the validation logic to a helper function — makes it easier to test in isolation.</div>
</div>
</body></html>`,
          challenges: [
            "Write a PR description for a feature you built this floor using the What/Why/How format",
            "What's the difference between a 'blocking' and a 'nit' comment in a review?",
            "How would you respond professionally to the blocking comment above?",
            "What command creates a new branch for a feature and what's the git workflow to open a PR?"
          ]
        },
        quiz: {
          question: "A code reviewer leaves a comment: 'nit: I'd rename userObj to userData for consistency with the rest of the codebase.' The code works correctly either way. What is the appropriate response?",
          options: [
            "Ignore the comment — it's a nitpick and doesn't affect functionality",
            "Either make the rename (explaining you're accepting the suggestion) or briefly explain why you're keeping the current name — never silently ignore a comment",
            "Push back firmly — the reviewer is overstepping by commenting on naming",
            "Only accept the feedback if the reviewer is senior to you"
          ],
          correct: 1,
          feedback: "Every PR comment deserves a response — even a nit. 'Done' or 'Good call, updated' if you make the change. 'Keeping userObj here because it matches the pattern in authService — open to discussion' if you don't. Silent ignoring creates uncertainty: did the author see it? Did they disagree? Respond to everything, even briefly. This is professional code review culture."
        },
        checklist: [
          "I can explain the PR workflow from feature branch to merged main — every step",
          "My PR descriptions answer What, Why, and How to test — not just what changed",
          "I know the difference between a blocking review comment and a nit",
          "I respond to every review comment, even if only to acknowledge it",
          "I've submitted at least one PR with a proper description and addressed the feedback"
        ]
      },
      {
        id: "4-phase2-review",
        title: "Phase 2 Review — Storage, Error Handling, Git, and Debugging",
        body: `Five questions covering localStorage, error handling at scale, git version control, and debugging like a developer.`,
        quiz: {
          questions: [
            {
              question: "You save an object to localStorage: localStorage.setItem('user', { name: 'Alex' }). When you retrieve it, what do you get?",
              options: [
                "The object { name: 'Alex' }",
                "The string '[object Object]' — localStorage converts objects to strings automatically",
                "undefined — localStorage only stores numbers",
                "null — objects must be serialised differently"
              ],
              correct: 1,
              feedback: "localStorage stores strings only. Passing an object directly calls .toString() on it, which produces '[object Object]' — useless. You must serialise with JSON.stringify before saving and parse with JSON.parse when reading: localStorage.setItem('user', JSON.stringify(user)); and const user = JSON.parse(localStorage.getItem('user'));"
            },
            {
              question: "What is the correct way to handle an error in an async function?",
              options: [
                "Add a .catch() method to every line that might fail",
                "Wrap the await calls in a try/catch block — catch receives the error if any awaited Promise rejects",
                "Check the return value of each await — if it's undefined, an error occurred",
                "Async functions never throw errors — they return undefined on failure"
              ],
              correct: 1,
              feedback: "try/catch in async functions works exactly as it does in synchronous code. If any awaited Promise rejects, the catch block runs with the error. The pattern: try { const data = await fetch(url); ... } catch (error) { console.error(error); showErrorMessage(); } Without this, a network failure silently breaks the function with no user feedback."
            },
            {
              question: "What does git commit do, and what should a commit message describe?",
              options: [
                "git commit saves a snapshot of all staged changes permanently in the repository. The message should describe WHY the change was made",
                "git commit sends your code to GitHub immediately",
                "git commit is a temporary save that can be undone at any time without consequence",
                "git commit saves only the currently open file"
              ],
              correct: 0,
              feedback: "git commit creates a permanent snapshot of everything in the staging area, with a message. The message should explain WHY — what problem this solves, what behaviour it changes, what it enables. 'Fix bug' is useless. 'Fix null pointer when user has no profile image' is useful. The what is visible in the diff. The why is only in the message."
            },
            {
              question: "You're debugging: a function returns undefined when it should return a number. What is the most efficient first step?",
              options: [
                "Rewrite the function from scratch",
                "Add console.log(result) at the return statement to check what the function is actually returning",
                "Search Stack Overflow for 'JavaScript function returns undefined'",
                "Add a try/catch to catch the error"
              ],
              correct: 1,
              feedback: "When a function returns an unexpected value, log at the return statement first: does the function run? Does it reach the return? What is it returning? This immediately isolates whether the issue is (a) the function not running, (b) not reaching the return, or (c) returning the wrong value. Each case has a different fix. Random changes without this information waste time."
            },
            {
              question: "What is the purpose of git branch and why do developers use branches?",
              options: [
                "git branch creates a copy of a file for backup purposes",
                "git branch creates a parallel line of development — you work on a feature without affecting the main codebase. When done and tested, you merge it",
                "git branch is used to push code to GitHub",
                "git branch creates a tag in the repository history for marking releases"
              ],
              correct: 1,
              feedback: "A branch is a parallel line of development. You create a branch for a feature or fix, make commits on it, test it, and then merge it into main when ready. This means the main branch always contains tested, working code. Multiple developers can work on different branches simultaneously without interfering. Feature branches are the standard workflow in professional teams."
            }
          ]
        }
      },
      {
        id: "4-9",
        title: "Weather App with Real API",
        body: `This is your first real application using a real external API. The OpenWeatherMap API is free, well-documented, and used by thousands of real applications. The scaffold connects to the API and displays current weather — your job is to extend it.

This is exactly how professional development works. You inherit a codebase. You read it. You understand it. You extend it. The difference between a junior and senior developer is not who writes things from scratch — it's who reads, understands, and extends code more effectively.

Read every line of the scaffold before changing anything. Understand what each function does. Understand what data the API returns by checking the Network tab when you run it. Then extend it. Make it yours.

Real APIs have real constraints: rate limits (you can only make a certain number of requests per hour), authentication requirements (your API key goes in the request, not the code you commit to GitHub), and data formats that can change. These are not hypothetical concerns — they are things you will hit in the first hour of working with a real API.`,
        callout: {
          type: "default",
          label: "API Key Security",
          text: "Your OpenWeatherMap API key should never be committed to a public GitHub repository. Anyone who finds it can use your API quota. For learning projects, it's acceptable to use it directly. For anything public, environment variables are the answer — covered in section 5-8."
        },
        callout2: {
          type: "focus",
          label: "Read Before You Change",
          text: "The professional habit with inherited code: read the entire file, understand the data flow, then make your first change. Developers who jump straight to changing things without reading spend three times as long fixing the confusion they created."
        },
        hint: `The app isn't showing data and you can't tell if it's the API call or the display code.

<strong>Try this:</strong> Open the Network tab in DevTools and run the app. Find the API request. Check the status code first — 200 means it reached the API, anything else means the call failed. If it's 200, click the request and look at the Response tab to see the raw JSON the API returned. Now you know whether the problem is the fetch or the display.

<strong>Still stuck?</strong> Add console.log(data) right after you receive the API response. Look at the actual shape of what came back and compare it to what your display code expects. APIs don't always match documentation exactly.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px}
h2{color:#6dbf6d;margin-bottom:20px}
.search-row{display:flex;gap:10px;margin-bottom:20px}
input{flex:1;background:#111;border:1px solid #333;color:#fff;padding:10px;border-radius:6px;font-family:inherit;font-size:13px}
input:focus{outline:none;border-color:#6dbf6d}
button{background:#6dbf6d;color:#000;border:none;border-radius:6px;padding:10px 18px;font-family:inherit;font-size:13px;cursor:pointer}
button:hover{background:#8de08d}
button:disabled{opacity:0.5}
#result{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:20px;min-height:80px}
.weather-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:8px}
.stat{background:#1a1a2a;border-radius:6px;padding:12px}
.stat-label{color:#555;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.stat-val{color:#c8a96e;font-size:20px;font-weight:bold}
.ok{color:#6dbf6d}.err{color:#ff6b6b}.loading{color:#666;font-style:italic}
</style></head><body>
<h2>Weather App — Open-Meteo API (no key needed)</h2>
<div class="search-row">
<input type="text" id="city" placeholder="e.g. London — uses fixed London coordinates">
<button id="btn" onclick="getWeather()">Get Weather</button>
</div>
<div id="result"><p class="loading">Click the button to fetch real weather data...</p></div>
<script>
async function getWeather(){
  var btn=document.getElementById('btn');
  var result=document.getElementById('result');
  btn.disabled=true;
  result.innerHTML='<p class="loading">Fetching weather for London...</p>';
  try{
    var url='https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true&hourly=relative_humidity_2m,apparent_temperature&timezone=Europe/London';
    var res=await fetch(url);
    if(!res.ok)throw new Error('HTTP '+res.status);
    var data=await res.json();
    var cw=data.current_weather;
    var wmo={0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',61:'Light rain',63:'Moderate rain',71:'Light snow',80:'Rain showers'};
    var desc=wmo[cw.weathercode]||('Code '+cw.weathercode);
    result.innerHTML='<p class="ok">✓ Live data for London</p>'+
      '<div class="weather-grid">'+
      stat('Temperature',cw.temperature+'°C')+
      stat('Wind speed',cw.windspeed+' km/h')+
      stat('Wind dir',cw.winddirection+'°')+
      stat('Condition',desc)+
      '</div>';
  }catch(e){result.innerHTML='<p class="err">Error: '+e.message+'</p>';}
  btn.disabled=false;
}
function stat(label,val){return '<div class="stat"><div class="stat-label">'+label+'</div><div class="stat-val">'+val+'</div></div>';}
</script></body></html>`,
          challenges: ["Add a 5-day forecast section below the current weather", "Add weather icons using the icon code from the API response", "Add a toggle between Celsius and Fahrenheit", "Save the last 3 searched cities to localStorage and show them as quick-access buttons"]
        },
        quiz: {
          question: "The weather app shows no data and throws no errors. What should you do first?",
          options: ["Rewrite the fetch function from scratch", "Open the Network tab in DevTools to see if the API request was made and what it returned", "Check the CSS to see if the data might be hidden", "Add more console.log statements randomly until something appears"],
          correct: 1,
          feedback: "Silent failures in network requests are almost always visible in the Network tab. It shows whether the request was sent, what URL it went to, what the response status code was, and what data came back. This is the fastest way to separate a network/API problem from a display/logic problem."
        },
        checklist: ["I read the full scaffold before writing any code and understood the data structure the API returns", "I extended the app with at least one feature not in the original brief — I had to figure it out myself", "I handle the case where the city isn't found and show the user a clear message", "My loading state prevents the user from submitting duplicate requests", "The app works correctly with at least five different city names I tested"]
      },
      {
        id: "4-10",
        title: "Quiz App with Score Tracking",
        body: `A quiz app is more complex than it looks. It has <strong>state</strong>: the current question index, the score, whether the user has answered the current question. It has multiple <strong>UI states</strong>: showing a question, showing answer feedback, showing results. Managing state and driving UI from it is the fundamental challenge of interactive application development.

This is the kind of stateful thinking that React, Vue, and Angular formalise with hooks, reactive properties, and components. Understanding how to manage it in vanilla JavaScript first means you'll understand those frameworks at a conceptual level, not just a syntactic one. You'll know why they exist, not just how to use them.

The scaffold handles the rendering. Your job is to implement the state logic: what happens when an answer is selected, how the score is updated, when to advance to the next question, when to show results. Every piece of the logic should update state first, then re-render from that state. Never update the DOM directly without first updating the underlying data.

The relationship between state and UI is: state is the truth, DOM is the display of that truth. When state changes, the DOM should be regenerated from state. When the DOM changes, state should update first. This single discipline prevents an entire category of synchronisation bugs.`,
        callout: {
          type: "default",
          label: "State Before DOM",
          text: "Every interactive application has state — data that changes over time and drives what the user sees. The discipline is: always update state first, then render from state. Never update the DOM and then try to remember what state it represents."
        },
        callout2: {
          type: "focus",
          label: "The 'Answered' Flag",
          text: "The answered boolean is a common source of bugs in quiz apps. Without it, a user can click multiple answers and the score increments multiple times. Check answered at the start of every checkAnswer function and return early if it's already true. State guards prevent invalid state transitions."
        },
        hint: `The quiz is advancing to the next question before the user can see the feedback.

<strong>Try this:</strong> Add a small delay before calling nextQuestion(), or better, show a "Next" button that only appears after the answer is checked. The user should explicitly advance, not have it happen automatically. This is also a better user experience — it gives them time to read the feedback.

<strong>Still stuck?</strong> Log the state variables (currentIndex, score, answered) to the console at the start of every function that modifies them. If the values aren't what you expect, you'll see exactly where state is diverging from your intention.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;min-height:100vh}
h2{color:#6dbf6d;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:24px}
.question-card{background:#111;border:1px solid #2a2a2a;border-radius:10px;padding:20px;margin-bottom:16px}
.q-text{color:#fff;font-size:14px;margin-bottom:16px;line-height:1.6}
.options{display:grid;gap:8px}
.opt{background:#1a1a1a;border:1px solid #333;border-radius:6px;padding:12px 16px;cursor:pointer;color:#ccc;transition:border-color 0.15s;text-align:left;font-family:inherit;font-size:12px;width:100%}
.opt:hover:not(:disabled){border-color:#6dbf6d;color:#fff}
.opt.correct{border-color:#6dbf6d;background:#0a2a0a;color:#6dbf6d}
.opt.wrong{border-color:#ff6b6b;background:#2a0a0a;color:#ff6b6b}
.score{background:#111;border:1px solid #2a2a2a;border-radius:10px;padding:24px;text-align:center}
.score-num{font-size:48px;color:#c8a96e;font-weight:900}
.score-label{color:#888;font-size:12px;margin-top:8px}
button.restart{background:#6dbf6d;color:#000;border:none;border-radius:6px;padding:10px 24px;font-family:inherit;font-size:13px;cursor:pointer;margin-top:16px}
</style></head><body>
<h2>Quiz App</h2>
<p class="sub">JavaScript fundamentals — 4 questions</p>
<div id="app"></div>
<script>
var questions=[
  {q:'What does typeof null return in JavaScript?',opts:['null','undefined','object','boolean'],correct:2,
   explain:'This is a known JavaScript quirk. typeof null returns "object" — a bug in the original implementation that was never fixed for backwards compatibility.'},
  {q:'Which array method creates a new array with transformed elements?',opts:['forEach','filter','map','reduce'],correct:2,
   explain:'map() returns a new array with each element transformed by the callback. forEach() returns undefined. filter() returns elements that pass a test.'},
  {q:'What is the output of: console.log(0.1 + 0.2 === 0.3)?',opts:['true','false','NaN','Error'],correct:1,
   explain:'false — floating point arithmetic is imprecise in binary. 0.1 + 0.2 = 0.30000000000000004. Compare with a tolerance instead: Math.abs(a - b) < 0.0001.'},
  {q:'A function declared with const can be called before its declaration. True or false?',opts:['True — all functions are hoisted','False — only function declarations are hoisted','True — const is block-scoped','True — arrow functions are always hoisted'],correct:1,
   explain:'Only function declarations (function foo(){}) are hoisted. const/let arrow functions are NOT hoisted. Calling them before their line throws a ReferenceError.'},
];
var current=0,score=0,answered=false;
function render(){
  var app=document.getElementById('app');
  if(current>=questions.length){
    app.innerHTML='<div class="score"><div class="score-num">'+score+' / '+questions.length+'</div>'+
      '<div class="score-label">'+(score===questions.length?'Perfect score!':score>=3?'Great job!':'Keep practising!')+
      '<br>Score saved to localStorage</div>'+
      '<button class="restart" onclick="restart()">Restart</button></div>';
    localStorage.setItem('quiz_score',score);
    return;
  }
  var q=questions[current];
  app.innerHTML='<div class="question-card">'+
    '<div class="q-text">Q'+(current+1)+'. '+q.q+'</div>'+
    '<div class="options">'+
    q.opts.map(function(o,i){return '<button class="opt" onclick="answer('+i+')">'+o+'</button>';}).join('')+
    '</div><div id="explain" style="margin-top:12px;font-size:11px;color:#555;display:none;line-height:1.7"></div></div>'+
    '<div style="color:#555;font-size:11px">Question '+(current+1)+' of '+questions.length+' — Score: '+score+'</div>';
}
function answer(i){
  if(answered)return;answered=true;
  var q=questions[current];
  var opts=document.querySelectorAll('.opt');
  opts[i].className='opt '+(i===q.correct?'correct':'wrong');
  opts[q.correct].className='opt correct';
  opts.forEach(function(o){o.disabled=true;});
  document.getElementById('explain').style.display='block';
  document.getElementById('explain').textContent=q.explain;
  if(i===q.correct)score++;
  setTimeout(function(){current++;answered=false;render();},2200);
}
function restart(){current=0;score=0;answered=false;render();}
render();
</script></body></html>`,
          challenges: ["Add a progress bar that fills as the user progresses through questions", "Add a timer that counts down from 30 seconds per question", "Add a high score tracker using localStorage", "Add a review screen at the end showing each question and the user's answer"]
        },
        quiz: {
          question: "In a quiz app, the score keeps incrementing every time the user clicks, even after they've already answered. What state variable is missing?",
          options: ["A variable tracking how many questions are left", "A boolean that tracks whether the current question has already been answered", "A timer that prevents clicks for 2 seconds after each answer", "A counter tracking how many times each option was clicked"],
          correct: 1,
          feedback: "An 'answered' boolean (initially false, set to true when the user first clicks) is the standard guard against multiple submissions. At the start of your click handler: if (answered) return; answered = true; then process the answer. This is called a state guard — it prevents the system from entering an invalid state."
        },
        checklist: ["I understand what application state means and can point to where it lives in my code", "I update state before updating the DOM — the data and the UI stay in sync", "I prevent multiple submissions to the same question after it's been answered", "Correct and incorrect answers show distinct visual feedback immediately", "The final score is accurate and stored in localStorage — I can explain how both work"]
      },
      {
        id: "4-11",
        title: "Solo Project — No Brief",
        body: `No brief. No scaffold. No requirements beyond this: build something that uses a real external API.

It must make at least one fetch request and display real data. The idea, the design, the implementation — all yours. This is the first time in this course that nothing is given to you.

Stuck for ideas? GitHub's API lets you search repositories and display star counts and descriptions. The NASA API has photos from Mars taken by the Curiosity rover, updated daily. The Dictionary API can power a word lookup tool. The Open Library API has data on millions of books. The CocktailDB has thousands of cocktail recipes. Any of these work.

The constraint is the point. Working with real external data forces you to handle things that don't exist in contrived examples: missing properties, unexpected response shapes, rate limits, API keys, authentication. These are the problems you'll solve every day as a professional.

The project doesn't have to be impressive. It has to be finished and working. A working, deployed tool that shows real API data is worth more than an ambitious unfinished one.`,
        callout: {
          type: "default",
          label: "The Only Rule",
          text: "It must use a real external API and display real data. Everything else — the idea, the design, the features — is yours. If it works and it's deployed, you've done it correctly."
        },
        callout2: {
          type: "focus",
          label: "Starting Point",
          text: "Pick the API first. Read its documentation for 20 minutes. Make one working fetch call and log the response to the console. Once you can see real data in your console, you have the foundation. Build the UI around what the data actually looks like, not what you imagined it would look like."
        },
        hint: `You have an idea but you can't get the API to return data.

<strong>Try this:</strong> Test the API URL directly in your browser before writing any code. If it's a GET endpoint with no authentication, paste the URL into the browser address bar. You should see the raw JSON response. If you see an error there, the problem is the URL or the API key — not your JavaScript.

<strong>Still stuck?</strong> Use the API's official documentation examples first, unchanged. Get those working. Then modify them step by step to return the data you actually want. Don't write custom code until you understand what the API returns.`,
        quiz: {
          question: "You're building a project with a public API and getting a 401 error on every request. What is the most likely cause?",
          options: ["The API server is down", "You're missing or incorrectly sending an API key", "Your JavaScript has a syntax error", "The API doesn't support the data format you're requesting"],
          correct: 1,
          feedback: "401 Unauthorized means the server received your request but doesn't recognise you as an authorised caller. Most public APIs require an API key to be sent in a header or as a query parameter. Check the API documentation for exactly how it expects the key to be sent — the format varies by API."
        },
        checklist: ["I chose an API and read its documentation before writing any code", "I confirmed the exact shape of the API response before building the UI", "I built a UI that renders real fetched data — not hardcoded mock data", "I handle loading state (spinner or disabled button) and error state (user-facing message)", "The project is deployed and accessible via a public URL — I can share it right now"]
      },
      {
        id: "4-12",
        title: "Code Review of Own Work",
        body: `Take every project you've built on Floor 4. Review each one as if it belongs to a colleague you've never met — not to you. Remove the emotional attachment to your decisions and ask the questions a reviewer would ask.

Can someone unfamiliar with this code understand what it does in five minutes? If not, the naming or structure is the problem. Are there functions doing more than one thing? Split them. Are error cases handled? Add them. Is there repetition that a function could eliminate? Refactor it. Are variable names descriptive enough to replace comments? If you need a comment to explain what a variable is, the variable name is wrong.

Write down one genuine improvement for each project. Not a vague note — a specific change: "rename variable x to userSearchQuery", "extract the renderCard logic into a separate function", "add error handling to the fetch call in getWeatherData". Then implement at least three of them.

Code review is where you stop being a person who writes code and start being a person who thinks about code. The most valuable developers on any team are not the fastest typists — they're the ones who catch problems before they become production incidents. That skill starts here, reviewing your own work with honesty.`,
        callout: {
          type: "default",
          label: "The Reviewer's Question",
          text: "The question every code reviewer asks: if I had to maintain this code for the next two years without the original author available, would I be able to? If the answer is no, something needs to change. Apply that lens to your own work."
        },
        callout2: {
          type: "focus",
          label: "Naming Is Architecture",
          text: "If you have to read a function's implementation to understand what it does, the function name is wrong. A well-named function is self-documenting. calculateTotalWithTax(price, taxRate) tells you everything. calc(p, r) tells you nothing. Naming is not a minor detail — it's the most read part of your code."
        },
        hint: `You're looking at your own code and everything seems fine — you understand it perfectly.

<strong>Try this:</strong> Leave the code for 48 hours without looking at it. Come back and read it as if you wrote it a year ago. The things that are actually unclear will reveal themselves immediately when the memory of writing it fades.

<strong>Still not sure what to improve?</strong> Apply one test to every function: cover the body and read only the name. Without reading the implementation, can you predict what it does and what it returns? If not, the name needs work.`,
        quiz: {
          questions: [
            {
              question: "You've written this code: const data = fetch('https://api.example.com/users').then(r => r.json()); — then you immediately do: console.log(data.length). What is logged?",
              options: [
                "The number of users returned by the API",
                "undefined — you cannot call .length on a Promise",
                "Error: data is not defined",
                "0 — empty arrays have length 0"
              ],
              correct: 1,
              feedback: "fetch().then() returns a Promise, not the resolved data. console.log runs synchronously before the Promise resolves. data is a Promise object and Promise objects don't have a .length property — it's undefined. To get the data: use async/await or chain another .then(data => console.log(data.length))."
            },
            {
              question: "localStorage.setItem('cart', JSON.stringify(cartArray)) — why JSON.stringify?",
              options: [
                "JSON.stringify compresses the data to save storage space",
                "localStorage stores strings only. JSON.stringify converts the array to a JSON string so it can be stored and later reconstructed with JSON.parse",
                "JSON.stringify is required to trigger the browser's localStorage event",
                "JSON.stringify adds encryption to prevent other sites from reading the cart"
              ],
              correct: 1,
              feedback: "localStorage accepts only strings. Passing an array directly stores '[object Object]' or a comma-separated version — not the original data. JSON.stringify serialises the array to a JSON string ('[]' or '[{...}]'). JSON.parse converts it back. This is the only correct way to store complex data in localStorage."
            },
            {
              question: "Your fetch request to a public API works in Postman but returns a CORS error in the browser. Where is the fix applied?",
              options: [
                "In the browser settings — enable cross-origin requests in DevTools",
                "On the server — it must include the correct Access-Control-Allow-Origin header",
                "In the fetch() call — add mode: 'no-cors'",
                "On the client — use a different HTTP method"
              ],
              correct: 1,
              feedback: "CORS is enforced by the browser, not Postman (which doesn't apply same-origin restrictions). The fix is always server-side: the server must include Access-Control-Allow-Origin in its response headers allowing your origin. mode: 'no-cors' prevents you from reading the response — it doesn't fix CORS. If you control the server, add the CORS middleware. If you don't, you need a proxy."
            },
            {
              question: "You have a git repository with uncommitted changes. A teammate asks you to urgently fix a bug on the main branch. What is the correct git workflow?",
              options: [
                "Commit your incomplete work to main, fix the bug, then sort out your changes later",
                "git stash your current changes, switch to main (or a new branch), fix and commit the bug, then git stash pop to restore your work",
                "Delete your changes and start fresh after fixing the bug",
                "Make the bug fix on top of your current uncommitted changes and commit everything together"
              ],
              correct: 1,
              feedback: "git stash temporarily saves your working changes without committing them. You can then switch branches, fix the bug, commit and push, then return to your branch and git stash pop to restore your work exactly as it was. This is one of the most useful day-to-day git techniques for context switching without losing work."
            },
            {
              question: "Your application makes a fetch request and the response data structure doesn't match what you expected. What is the fastest way to debug this?",
              options: [
                "Guess the correct field name based on similar APIs you've used before",
                "Open the Network tab in DevTools, find the request, click the Response tab — the exact JSON the server returned is there",
                "Add error handling and assume the data will eventually be correct",
                "Re-read the API documentation until you find what changed"
              ],
              correct: 1,
              feedback: "The Network tab shows the exact HTTP request and response. The Response tab shows the exact JSON. This eliminates guessing — you see exactly what the server returned. Compare that to what your code expects. The mismatch is usually immediately obvious. DevTools Network tab is the first stop for any API-related bug."
            }
          ]
        },
        checklist: ["I reviewed all my Floor 4 projects as if reading a colleague's code for the first time", "I identified at least one genuine improvement per project and implemented it", "My function names describe what the function does — reading the name tells you its purpose", "Error cases are explicitly handled in each project — no silent failures", "I can explain the trade-offs I made in each project if asked in an interview"]
      }
    ]
  },
  {
    id: 5,
    title: "Solving Real Problems",
    subtitle: "Backend, databases and full stack",
    color: "#7ec8a9",
    duration: "4-5 months",
    sessions: "5 per week",
    length: "60-90 min",
    tag: "Floor 05 — Full Stack",
    sections: [
      {
        id: "5-1",
        title: "What Full Stack Means",
        body: `Full stack means you can build the complete system: <strong>frontend</strong> (what the user sees), <strong>backend</strong> (what the server runs), and <strong>database</strong> (where data lives). Each layer has a distinct responsibility and a distinct set of technologies.

Frontend is HTML, CSS, and JavaScript running in the browser. The browser downloads these files from the server and executes them locally on the user's machine. This is what you've been building. It's what Instagram's photo grid is, what Airbnb's search page is.

Backend is code running on a server — Node.js, Python, Go, Java, or dozens of other languages. The user never sees this code and can never modify it. This is where business logic lives, where authentication happens, where data is validated before it touches a database.

The database is where data persists after the user leaves. Without a database, every user's data disappears when they close the browser. With one, it's there when they return — across devices, across time.

The HTTP request cycle across the full stack: browser sends a request → server receives it, authenticates the user, queries the database, formats the response → database returns data to the server → server returns formatted response to browser → browser renders what the user sees.

The separation matters for three reasons: security (you never trust the browser to validate data), scale (servers handle thousands of simultaneous users), and persistence (data survives after the user leaves).\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — if a server keeps all user data in a JavaScript object in memory, what happens to that data when the server process restarts? What does that tell you about why databases exist?</div>`,
        callout: {
          type: "default",
          label: "Why the Separation",
          text: "The browser is a public environment. Anything you put in JavaScript can be read, modified, or replicated by anyone with DevTools. Business logic, passwords, payment processing, and data validation must happen on the server where the user can't touch them."
        },
        callout2: {
          type: "focus",
          label: "The Instagram Example",
          text: "When you post on Instagram, the browser sends a POST request to Instagram's backend with the image data and caption. The backend validates it, compresses the image, stores it (likely in object storage like S3), saves metadata to a database, updates your follower feeds, and returns a success response. None of that happens in the browser."
        },
        hint: `You're confused about which layer handles what.

<strong>Try this:</strong> Take any feature of an app you use daily. Ask three questions: does this run in the browser, on a server, or in a database? Login button click = browser. Password verification = server. Stored password hash = database. Tracing features through layers builds the mental model faster than any explanation.

<strong>Still fuzzy?</strong> The rule of thumb: anything that must be secure, private, or persistent goes on the server or database. Anything that's just about what the user sees and interacts with goes in the browser.`,
        quiz: {
          question: "A user submits a payment form on an e-commerce site. Where must the actual payment processing happen and why?",
          options: ["In the browser's JavaScript, for the fastest user experience", "On the server, because JavaScript in the browser can be modified by anyone", "In the database, because it needs to persist", "In the browser's localStorage for security"],
          correct: 1,
          feedback: "Payment processing must happen server-side. Any JavaScript in the browser can be read, modified, and re-sent by someone with DevTools. A user could modify the price, skip validation, or steal API keys. The server is a controlled environment the user cannot modify. This applies to any security-sensitive operation: authentication, authorisation, payment, data validation."
        },
        checklist: ["I can describe the role of frontend, backend, and database in one sentence each", "I can explain why sensitive business logic must live on the server, not the client", "I can trace a complete user login request from browser click to database and back", "I can give three concrete examples of what belongs on the server vs the client", "I understand that data persistence requires a database — not localStorage or in-memory state"]
      },
      {
        id: "5-2",
        title: "How Servers Work",
        body: `A server is a computer running continuously, waiting for HTTP requests. When a request arrives, it goes to the right piece of code based on the URL and HTTP method, that code runs, and the response goes back. That's it. Everything else is detail.

A web server handles <strong>routing</strong>: mapping URLs and methods to code. When a GET request arrives for /users/123, what code runs? The router matches the URL pattern and calls the corresponding handler function. Handler functions receive a request object (the incoming data) and a response object (the channel to send data back).

<strong>Middleware</strong> is code that runs before your route handlers. Authentication middleware runs first — if the user isn't logged in, the request never reaches the route. Logging middleware records every request. Request parsing middleware converts the raw request body into usable JavaScript objects. Middleware runs in a chain; each piece decides whether to pass the request along or end it.

The distinction between server types matters as applications grow. A web server handles HTTP and routing. An application server runs business logic. A database server stores and retrieves data. In small applications, all three often run on the same machine. At Instagram's scale, each is a separate fleet of hundreds of servers.

Ports: a server listens on a specific port number. Port 80 is HTTP, 443 is HTTPS, 3000 and 8080 are common development defaults. When you visit http://localhost:3000, you're connecting to port 3000 on your own machine.`,
        callout: {
          type: "default",
          label: "Middleware Is the Architecture",
          text: "In a production Express application, 80% of the interesting logic lives in middleware: authentication, rate limiting, request validation, logging, error handling. Route handlers are often just one or two lines that call a database and return the result. Middleware is where security and reliability live."
        },
        callout2: {
          type: "focus",
          label: "Request Object vs Response Object",
          text: "In Express (and most web frameworks), every route handler receives req (the incoming request: headers, body, params, the user's identity) and res (the outgoing response: what to send back and with what status code). Understanding what lives on each object is the foundation of server-side development."
        },
        hint: `You're building a server route but the request isn't reaching your handler.

<strong>Try this:</strong> Add console.log('Route hit') as the very first line of your handler. If it doesn't print, the request isn't matching your route. Check: is the HTTP method correct (GET vs POST)? Is the URL path exact? Is there middleware before it that might be blocking?

<strong>Still stuck?</strong> Add a catch-all route at the very bottom: app.use((req, res) => res.status(404).send('Not found: ' + req.path)). This catches any request that didn't match a defined route and tells you exactly what URL the server is seeing.`,
        quiz: {
          question: "Authentication middleware is registered before route handlers in an Express app. A request arrives for a protected route. What is the correct order of execution?",
          options: ["Route handler runs first, then auth middleware verifies the result", "Auth middleware runs, checks the credentials, and either passes the request to the route handler or rejects it", "Both run simultaneously in parallel", "Auth middleware runs after the route handler returns data"],
          correct: 1,
          feedback: "Middleware executes in the order it's registered, before route handlers. Authentication middleware checks credentials and calls next() to pass to the route handler if valid, or sends a 401 response directly if not. The route handler only runs if middleware allows it through. This is the gatekeeper pattern — protect the resource before the handler ever runs."
        },
        checklist: ["I can explain what a server is and what it does when it receives an HTTP request", "I can explain what routing means and give an example of a route handler", "I can explain what middleware does and give a real example of when you'd use it", "I can explain the difference between req and res in an Express route handler", "I can explain what a port is and why your local server runs on localhost:3000"]
      },
      {
        id: "5-3",
        title: "Databases",
        body: `Every application that stores user data has a database. The database's job is to persist data reliably, retrieve it quickly, and enforce data integrity.

The two main categories: <strong>relational databases</strong> (PostgreSQL, MySQL, SQLite) store data in tables with rows and columns. Relationships between tables are defined by foreign keys: a posts table has a user_id column that references the users table. SQL is the language for querying them.

<strong>Document databases</strong> (MongoDB, Firestore) store data as JSON-like documents. There's no fixed schema — different documents in the same collection can have different fields. Flexible, but at the cost of enforced structure.

SQL commands you need to know: SELECT (retrieve data), INSERT (add data), UPDATE (modify data), DELETE (remove data). With WHERE clauses to filter, ORDER BY to sort, JOIN to combine tables, and LIMIT to paginate. These are the tools for 90% of database work.

<strong>Indexes</strong> are how databases stay fast as data grows. Without an index, a query scans every row in the table. With an index on the column you're filtering by, the database finds matching rows in milliseconds. Add indexes on columns you query frequently, especially foreign keys.

<strong>ACID</strong> properties guarantee data integrity: Atomicity (a transaction either fully succeeds or fully fails, never halfway), Consistency (the database stays in a valid state), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). When a bank transfer fails halfway through, ACID properties ensure neither account is left in an inconsistent state.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — if you fetch 20 blog posts and then make a separate database query for each post’s author, how many total queries have you made? What is this problem called, and how would a JOIN fix it?</div>`,
        callout: {
          type: "default",
          label: "SQL vs NoSQL",
          text: "The honest answer: use PostgreSQL for most things. It's relational, ACID-compliant, scales well, and handles most use cases correctly. Reach for MongoDB when your data genuinely has no fixed schema and changes shape frequently. Don't choose NoSQL to avoid learning SQL."
        },
        callout2: {
          type: "focus",
          label: "Indexes or Slow Queries",
          text: "A query that takes 50ms with 1,000 rows takes 50 seconds with 1,000,000 rows without an index. Database queries are almost always the performance bottleneck in web applications. Add an index on every column you filter by in a WHERE clause and every foreign key column."
        },
        hint: `Your database query is returning wrong or unexpected results.

<strong>Try this:</strong> Run the query directly in the database tool (pgAdmin for PostgreSQL, Compass for MongoDB) before running it through your application code. If the query is wrong there, it's a SQL problem. If it's correct there but wrong in your app, it's a code problem. Isolate the layer first.

<strong>Still stuck?</strong> Add a LIMIT 5 clause to your SELECT to see a small sample of results. Check the actual data that's in the table — sometimes the issue is that the data was never inserted correctly, or was inserted with the wrong values.`,
        quiz: {
          question: "A bank transfer involves debiting one account and crediting another. The server crashes after the debit but before the credit. What database property prevents both accounts from ending up in an inconsistent state?",
          options: ["Indexing — fast lookups ensure both operations complete before timeout", "Atomicity — the transaction either fully completes or fully rolls back, never partially", "Isolation — other transactions can't see the debit until the credit is complete", "Durability — the data is written to disk immediately"],
          correct: 1,
          feedback: "Atomicity means all operations in a transaction succeed together or fail together. If the credit operation fails (or the server crashes before it), the debit is automatically rolled back. The database returns to the state before the transaction started. This is why financial applications use ACID-compliant relational databases, not eventually-consistent document stores."
        },
        checklist: ["I can explain the key difference between relational and document databases with a concrete example", "I can write SELECT, INSERT, UPDATE, and DELETE queries without looking up the syntax", "I can explain what an index is and name one case where you'd add one", "I can explain ACID in plain terms — not the acronym, but what each property means in practice", "I can explain when I'd choose PostgreSQL over MongoDB for a new project"]
      },
      {
        id: "5-4",
        title: "Authentication",
        body: `Authentication is proving who you are. Authorisation is proving what you're allowed to do. The distinction matters: you can be authenticated (the server knows you're Alex) but not authorised (Alex doesn't have admin access). These are two separate checks.

The session-based approach: after login, the server creates a session record in a database and sends a session ID to the browser in a cookie. Every subsequent request includes that cookie. The server looks up the session ID to identify the user. Sessions are revocable: delete the session record and the user is logged out everywhere.

The token-based approach (JWT): after login, the server creates a signed token containing the user's ID and sends it to the client. The client stores it (usually in memory or localStorage) and sends it in the Authorization header of every subsequent request. The server verifies the signature — no database lookup needed. JWTs expire but can't be revoked before expiry without additional infrastructure.

Password storage: you never, under any circumstances, store plain text passwords. If your database is compromised and passwords are plain text, every user's password is exposed. You store a hash: a one-way transformation of the password. bcrypt is the standard — it's deliberately slow (to make brute-force attacks expensive) and adds a random salt (to prevent rainbow table attacks).

OAuth: "Login with Google" delegates authentication to a trusted provider. Google verifies the user's identity and tells your application who it is. You never handle the password. This is the right approach for any application where managing credentials securely is more complexity than you want to take on.`,
        callout: {
          type: "default",
          label: "Never Build Auth From Scratch",
          text: "Authentication has too many failure modes that aren't obvious. For new applications, use an established library: Passport.js for Node, Devise for Rails, or a service like Auth0 or Clerk. Build it from scratch only once you understand the security model thoroughly. This is one of the few areas where 'do it yourself' is genuinely dangerous."
        },
        callout2: {
          type: "focus",
          label: "JWT Expiry",
          text: "JWTs have an expiry time (typically 15 minutes to 24 hours). After expiry, the token is invalid and the user must re-authenticate. To avoid constant logouts, applications use refresh tokens: a longer-lived token that can exchange for a new JWT. Get the access/refresh token pattern right before shipping any JWT-based auth."
        },
        hint: `Users are getting logged out unexpectedly or tokens aren't working.

<strong>Try this:</strong> Decode your JWT at jwt.io (it's a public tool for inspection). Check the exp field — it's a Unix timestamp showing when the token expires. If tokens expire faster than expected, check that the server clock is accurate (time drift breaks JWT validation).

<strong>Still stuck?</strong> Log the Authorization header on the server for every request. If it's missing, the client isn't sending it — check the fetch call. If it's there but invalid, the server-side verification code has an issue — check the secret key.`,
        quiz: {
          question: "A user's JWT token is compromised. The token expires in 7 days. What is the fundamental limitation of JWT-based authentication in this scenario?",
          options: ["Nothing — the server can delete the token from its database to invalidate it immediately", "The token cannot be revoked before its expiry time without additional infrastructure like a token blocklist", "The user must change their password to invalidate the token", "JWTs can be recalled remotely by the token issuer at any time"],
          correct: 1,
          feedback: "JWTs are stateless — the server doesn't store them, so there's nothing to delete. Any request with a valid, unexpired JWT will be accepted, even if the token was stolen. To immediately revoke a JWT, you need a server-side blocklist of invalidated tokens, which reintroduces statefulness. This is JWT's main trade-off compared to session-based auth where you just delete the session record."
        },
        checklist: ["I can explain the difference between authentication and authorisation without confusing them", "I can describe the full JWT flow: login → token generation → storage → verification", "I can explain why passwords must be hashed and what bcrypt does — not just that it's 'secure'", "I can explain what OAuth does and why you'd use it instead of building your own auth", "I would use an existing auth library rather than building it myself — and I can explain why"]
      },
      {
        id: "5-phase1-review",
        title: "Phase 1 Review — Full Stack Concepts, Servers, Databases, and Auth",
        body: `Five questions covering full stack architecture, how servers work, databases, and authentication.`,
        quiz: {
          questions: [
            {
              question: "In a full stack application, what is the correct description of the frontend's role?",
              options: [
                "The frontend stores all the data and handles business logic",
                "The frontend is what the user sees and interacts with — it requests data from the backend and renders it as a user interface",
                "The frontend runs on the server and generates HTML to send to the browser",
                "The frontend directly accesses the database using JavaScript"
              ],
              correct: 1,
              feedback: "The frontend is the client-side layer: HTML, CSS, and JavaScript that runs in the browser. It renders the UI, handles user interactions, and communicates with the backend via HTTP requests (typically fetch). It does not store persistent data or contain sensitive business logic — those belong on the backend where they're protected."
            },
            {
              question: "What happens between the moment a user submits a login form and the moment they see their dashboard?",
              options: [
                "The browser checks a local database and loads the dashboard if credentials match",
                "The browser sends credentials to the server, the server checks the database, if valid issues a token, the browser stores the token and redirects to the dashboard",
                "The form data is encrypted in the browser and compared to a local hash",
                "The server sends the user's complete profile to the browser which then validates the credentials"
              ],
              correct: 1,
              feedback: "Login flow: frontend sends credentials via POST → server receives them → server queries the database to find the user → if found, compares the hashed password → if valid, generates a JWT or creates a session → returns the token to the client → client stores it (localStorage or cookie) → subsequent requests include the token → server validates it on protected routes."
            },
            {
              question: "What is the difference between a relational database (PostgreSQL) and a document database (MongoDB)?",
              options: [
                "Relational databases are only for small projects; document databases scale to any size",
                "Relational databases store data in structured tables with relationships enforced by schema. Document databases store data as flexible JSON documents without a strict schema",
                "PostgreSQL is open source; MongoDB is proprietary",
                "There is no meaningful difference — they're interchangeable for most applications"
              ],
              correct: 1,
              feedback: "Relational databases organise data into tables with fixed schemas and enforce relationships via foreign keys. They excel at complex queries with joins. Document databases store data as JSON-like documents with flexible schemas — no joins, but more natural for hierarchical data. Choose relational when data is structured and relationships matter; document when data shapes vary and you need flexibility."
            },
            {
              question: "A password must never be stored in plain text. Why, and what is the correct approach?",
              options: [
                "Plain text wastes storage — passwords should be compressed",
                "Plain text passwords are readable if the database is breached. Passwords must be hashed with bcrypt — a one-way function that cannot be reversed",
                "Passwords should be encrypted with AES so they can be decrypted for verification",
                "Passwords should be stored as base64 — this provides sufficient protection"
              ],
              correct: 1,
              feedback: "If your database is breached and passwords are in plain text, every account is immediately compromised. Hashing with bcrypt produces a fixed-length output that cannot be reversed. To verify: hash the submitted password and compare the hashes — the original password is never stored. Encryption is reversible (wrong — the decryption key could be stolen). Base64 is encoding, not protection."
            },
            {
              question: "A server receives a GET request to /api/products. What HTTP status code should it return if the database query succeeds and returns 0 products?",
              options: [
                "404 Not Found — no products were found",
                "204 No Content — the response has no body",
                "200 OK with an empty array [] — the request succeeded, there are simply no products",
                "500 Internal Server Error — returning 0 results indicates a server problem"
              ],
              correct: 2,
              feedback: "200 OK means the request was handled correctly. An empty array is a valid successful response — there are no products, and the client should handle that. 404 means the resource itself doesn't exist (the /api/products endpoint doesn't exist). 204 is for DELETE responses where there's no body. Returning 404 for empty results is a common mistake that misleads clients into thinking the endpoint is broken."
            }
          ]
        }
      },
      {
        id: "5-5",
        title: "Node and Express",
        body: `Node.js runs JavaScript on the server. The same language you've been writing in the browser now runs outside it — with access to the filesystem, the network, and the ability to listen for HTTP connections. No DOM, no window object, but full access to the operating system.

Express is the most widely used Node.js web framework. It provides routing, middleware, and request/response handling. The core concept: register handlers for HTTP method + path combinations. When a matching request arrives, the handler runs.

The request object (req) contains everything about the incoming request: req.params for URL parameters (/users/:id makes id available on req.params), req.query for query string parameters (?page=2 makes page available on req.query), req.body for the request body (POST/PUT data, after body-parser middleware), req.headers for HTTP headers including Authorization.

The response object (res) is how you send data back: res.json(data) sends JSON with a 200 status, res.status(404).json({error: 'Not found'}) sends an error, res.send() for plain text.

Middleware with app.use() runs before route handlers. Order matters: body parser before routes that need req.body, auth middleware before protected routes, error handler after all routes.

GitHub's API, Stripe's API, Shopify's API — all built on frameworks equivalent to Express. Every endpoint you call as a developer is a route handler like the ones you're about to write.`,
        callout: {
          type: "default",
          label: "Node Is JavaScript",
          text: "The mental model adjustment: Node.js is the same JavaScript you know, running in a different environment. The syntax is identical. What changes is what's available — no document or window, but fs (file system), http, and process instead. Your existing JavaScript knowledge transfers directly."
        },
        callout2: {
          type: "focus",
          label: "Body Parser",
          text: "Without body-parsing middleware, req.body is undefined. Express doesn't parse request bodies automatically. Add app.use(express.json()) before any route that needs to read POST or PUT body data. This is one of the most common 'why is req.body undefined' mistakes in new Express applications."
        },
        hint: `Your Express route isn't receiving the data you're sending from the frontend.

<strong>Try this:</strong> Add console.log('Headers:', req.headers, 'Body:', req.body) at the top of your route handler. If body is undefined, you're missing body-parsing middleware. If headers don't include Content-Type: application/json, the client isn't sending JSON correctly. Both of these are fixable in one line.

<strong>Still stuck?</strong> Test the route directly with Postman or Thunder Client before connecting the frontend. Send the exact request you expect the frontend to send. If it works in Postman but not from the browser, the problem is in the frontend fetch call, not the server.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#c87e9a;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.server{background:#0a1a0a;border:1px solid #2a4a2a;border-radius:10px;padding:20px;margin-bottom:20px}
.server-label{color:#6dbf6d;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
.routes{display:grid;gap:8px}
.route{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:#111;border:1px solid #222;border-radius:6px;cursor:pointer;transition:border-color 0.15s}
.route:hover{border-color:#6dbf6d}
.method{padding:3px 8px;border-radius:4px;font-size:10px;font-weight:bold;min-width:44px;text-align:center}
.GET{background:#1a3a1a;color:#6dbf6d}.POST{background:#1a2a3a;color:#7eb8c8}.DELETE{background:#3a1a1a;color:#ff6b6b}.PATCH{background:#2a2a1a;color:#c8a96e}
.path{color:#fff;font-size:12px;min-width:140px}.route-desc{color:#666;font-size:11px;line-height:1.4}
.response{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:16px;min-height:60px;font-size:11px;color:#c8a96e}
.response-label{color:#555;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
</style></head><body>
<h2>Express Route Explorer</h2>
<p class="sub">Click a route to see what it returns. This simulates a real Express server.</p>
<div class="server">
<div class="server-label">Running on localhost:3000</div>
<div class="routes" id="routes"></div>
</div>
<div class="response-label">Response</div>
<div class="response" id="response">Select a route above to see the simulated response...</div>
<script>
var routes=[
  {method:'GET',path:'/api/users',desc:'List all users',response:{data:[{id:1,name:'Alex Chen'},{id:2,name:'Jordan Lee'}],total:2}},
  {method:'GET',path:'/api/users/:id',desc:'Get user by ID (e.g. /api/users/1)',response:{id:1,name:'Alex Chen',email:'alex@example.com',role:'developer'}},
  {method:'POST',path:'/api/users',desc:'Create a new user (body: {name, email})',response:{id:3,name:'New User',email:'new@example.com',createdAt:'2026-05-16T12:00:00Z'}},
  {method:'PATCH',path:'/api/users/:id',desc:'Update a user field',response:{id:1,name:'Alex Chen Updated',email:'alex@example.com'}},
  {method:'DELETE',path:'/api/users/:id',desc:'Delete a user',response:{message:'User 1 deleted successfully',deleted:true}},
];
var routesEl=document.getElementById('routes');
var responseEl=document.getElementById('response');
routes.forEach(function(r){
  var div=document.createElement('div');div.className='route';
  div.innerHTML='<span class="method '+r.method+'">'+r.method+'</span>'+
    '<span class="path">'+r.path+'</span>'+
    '<span class="route-desc">'+r.desc+'</span>';
  div.onclick=function(){responseEl.textContent=JSON.stringify(r.response,null,2);};
  routesEl.appendChild(div);
});
</script></body></html>`,
          challenges: ["Add a new GET route for /api/products that returns an array of product objects", "Add middleware that logs the request method and path for every request", "Add a POST route that reads data from req.body and returns it back", "Add a 404 handler for any route that doesn't match the defined routes"]
        },
        quiz: {
          question: "An Express route needs to read data from the request body sent by a POST request. req.body is undefined. What is missing?",
          options: ["The route needs to be registered before app.listen()", "Body-parsing middleware (app.use(express.json())) is not registered before the route", "POST requests don't support body data in Express", "The route handler needs to manually parse req.rawBody"],
          correct: 1,
          feedback: "Express doesn't parse request bodies by default. app.use(express.json()) must be registered before any route that reads req.body. It reads the raw request body, parses it as JSON, and attaches the result to req.body. Without it, req.body is undefined for all routes. Register it near the top of your app, before route definitions."
        },
        checklist: ["I can start an Express server and explain what each line of the basic setup does", "I can write GET and POST route handlers that read from req and write to res", "I can explain the difference between req.params, req.query, and req.body with examples", "I can add middleware with app.use() and explain why order matters", "I return appropriate status codes: 200 for success, 201 for created, 400 for bad input, 404 for not found, 500 for server errors"]
      },
      {
        id: "5-6",
        title: "Connecting to a Database",
        body: `The connection between your server and database is managed by a client library. For PostgreSQL, pg or Prisma. For MongoDB, Mongoose. The library handles the connection, translates your code into database queries, and returns results as JavaScript objects.

<strong>Connection pooling</strong> is critical for performance. Opening a new database connection for every request takes 50-200ms and has an upper limit on concurrent connections. A connection pool maintains a set of open connections that are reused. pg and Prisma handle this automatically when configured correctly.

The decision between an ORM (Object-Relational Mapper) and raw SQL has real trade-offs. ORMs like Prisma let you write JavaScript that generates SQL — faster to write, database-agnostic, but hides complexity and can generate inefficient queries. Raw SQL gives you precise control and transparency but requires writing more code. Know both. Use ORMs for productivity, drop to raw SQL for performance-critical queries.

<strong>Database transactions</strong> are essential when multiple operations must succeed or fail together. Transferring money between two accounts requires both the debit and credit to succeed — if the credit fails after the debit, the transaction rolls back and both accounts return to their original state. Without transactions, partial writes corrupt your data.

Profile before optimising. The query that looks slow might be fast. The query that looks simple might be doing a full table scan. Add EXPLAIN ANALYZE before any PostgreSQL query to see exactly what the database is doing and where time is spent.`,
        callout: {
          type: "default",
          label: "Queries Are the Bottleneck",
          text: "In most web applications, database queries are the performance bottleneck — not JavaScript, not network latency. Before optimising anything else, profile your queries. Add EXPLAIN ANALYZE, look for sequential scans on large tables, and add indexes. Ten minutes of query optimisation often outperforms days of JavaScript optimisation."
        },
        callout2: {
          type: "focus",
          label: "N+1 Queries",
          text: "The N+1 problem: you fetch 10 posts, then for each post you fetch the author in a separate query — 11 queries total. With 100 posts it's 101 queries. The fix is a JOIN query that fetches posts and authors together in one query. ORMs can generate N+1 problems silently. Always check what SQL your ORM actually produces."
        },
        hint: `Your database queries are working in isolation but failing when called from your Express routes.

<strong>Try this:</strong> Test each database function in isolation with a small test script before integrating with the server. If the function works standalone but fails in the route, the problem is usually that you're not awaiting an async function, or an error isn't being caught.

<strong>Still stuck?</strong> Add try/catch to every database function and log the full error including the error.code. PostgreSQL error codes are specific — 23505 means a unique constraint violation (duplicate data), 23503 means a foreign key violation (referencing a row that doesn't exist). The code tells you exactly what's wrong.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#c87e9a;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.tabs{display:flex;gap:8px;margin-bottom:16px;border-bottom:1px solid #222;padding-bottom:12px}
.tab{background:none;border:1px solid #333;color:#888;border-radius:6px;padding:6px 14px;font-family:inherit;font-size:11px;cursor:pointer}
.tab.active{border-color:#c87e9a;color:#c87e9a}
.query{background:#0a1a2a;border:1px solid #2a4a6a;border-radius:8px;padding:16px;margin-bottom:16px;font-size:11px;color:#a8d5f5;white-space:pre-wrap}
.results{background:#111;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden}
.results table{width:100%;border-collapse:collapse}
.results th{background:#1a1a1a;color:#888;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:10px 14px;text-align:left;border-bottom:1px solid #222}
.results td{padding:10px 14px;border-bottom:1px solid #1a1a1a;color:#ccc;font-size:11px}
.results tr:last-child td{border-bottom:none}
.id-col{color:#c87e9a}.name-col{color:#fff}.status-col{color:#6dbf6d}
</style></head><body>
<h2>Database Query Explorer</h2>
<p class="sub">Select a query pattern to see the SQL and simulated results.</p>
<div class="tabs" id="tabs"></div>
<div class="query" id="query"></div>
<div class="results" id="results"></div>
<script>
var queries=[
  {label:'SELECT all',sql:'SELECT * FROM users\\nORDER BY created_at DESC\\nLIMIT 10;',
   cols:['id','name','email','role'],
   rows:[[1,'Alex Chen','alex@example.com','admin'],[2,'Jordan Lee','jordan@example.com','developer'],[3,'Sam Park','sam@example.com','developer']]},
  {label:'WHERE filter',sql:"SELECT id, name, email\\nFROM users\\nWHERE role = 'developer'\\nAND created_at > '2025-01-01';",
   cols:['id','name','email'],
   rows:[[2,'Jordan Lee','jordan@example.com'],[3,'Sam Park','sam@example.com']]},
  {label:'JOIN query',sql:'SELECT u.name, p.title, p.published_at\\nFROM users u\\nINNER JOIN posts p ON p.author_id = u.id\\nWHERE p.status = \\'published\\'\\nORDER BY p.published_at DESC;',
   cols:['name','title','published_at'],
   rows:[['Alex Chen','Building REST APIs','2026-05-10'],['Jordan Lee','Async JavaScript','2026-05-08']]},
  {label:'Transaction',sql:'BEGIN;\\nINSERT INTO orders (user_id, total)\\nVALUES (1, 99.99)\\nRETURNING id;\\nUPDATE inventory\\nSET stock = stock - 1\\nWHERE product_id = 42;\\nCOMMIT;',
   cols:['operation','status','rows_affected'],
   rows:[['BEGIN','OK','-'],['INSERT orders','OK','1'],['UPDATE inventory','OK','1'],['COMMIT','OK','-']]},
];
var tabsEl=document.getElementById('tabs');var queryEl=document.getElementById('query');var resultsEl=document.getElementById('results');
function show(i){
  var q=queries[i];queryEl.textContent=q.sql;
  var th=q.cols.map(function(c){return '<th>'+c+'</th>';}).join('');
  var tb=q.rows.map(function(r){return '<tr>'+r.map(function(v){return '<td>'+v+'</td>';}).join('')+'</tr>';}).join('');
  resultsEl.innerHTML='<table><thead><tr>'+th+'</tr></thead><tbody>'+tb+'</tbody></table>';
  document.querySelectorAll('.tab').forEach(function(t,j){t.className='tab'+(j===i?' active':'');});
}
queries.forEach(function(q,i){
  var btn=document.createElement('button');btn.className='tab'+(i===0?' active':'');
  btn.textContent=q.label;btn.onclick=function(){show(i);};tabsEl.appendChild(btn);
});
show(0);
</script></body></html>`,
          challenges: ["Write a function that retrieves a single user by ID", "Write a function that creates a new user and returns the created record", "Add error handling for when the user is not found (return 404)", "Write a transaction that creates a post and increments the author's post count atomically"]
        },
        quiz: {
          question: "You need to create a new order and deduct the items from inventory. If the inventory update fails, the order should not be created. What database feature handles this?",
          options: ["A foreign key constraint that links the order to the inventory table", "A database transaction that wraps both operations and rolls back if either fails", "A trigger that automatically runs when an order is created", "An index on the inventory table to speed up the update"],
          correct: 1,
          feedback: "A transaction wraps multiple operations into a single atomic unit. BEGIN starts the transaction, you run both the INSERT and the UPDATE, and COMMIT applies both permanently. If any operation fails, ROLLBACK undoes everything — the database returns to its state before BEGIN. This is how all multi-step operations that must stay consistent are handled."
        },
        checklist: ["I can connect to a PostgreSQL database from Node.js and make a query", "I can explain what connection pooling is and why it matters for performance", "I can write parameterised queries — and explain why string-concatenated queries are dangerous", "I can wrap multiple related operations in a transaction and explain when that's necessary", "I can run EXPLAIN ANALYZE on a slow query and identify where the time is spent"]
      },
      {
        id: "5-7",
        title: "Building a REST API",
        body: `A REST API is a set of HTTP endpoints that expose your data and operations in a consistent, predictable way. RESTful conventions are not a standard — they're widely adopted patterns that make APIs easier to use and understand.

The conventions: GET /users returns all users. GET /users/123 returns user 123. POST /users creates a new user. PUT /users/123 replaces user 123 entirely. PATCH /users/123 updates specific fields of user 123. DELETE /users/123 removes user 123. These patterns are recognisable to any developer who's worked with APIs before.

Request validation must happen before any database interaction. If required fields are missing or values are invalid, return a 400 status with a clear error message explaining exactly what's wrong. Never let invalid data reach the database.

Response consistency matters. Always return the same shape for the same type of response. If success responses look like {data: {...}} and error responses look like {error: '...'}, that's a contract every client can depend on. Inconsistent response shapes are one of the most common sources of frontend bugs.

Versioning protects existing clients when you change the API: /api/v1/users and /api/v2/users can coexist. Clients using v1 aren't broken by changes to v2. Don't version until you have external consumers, but design with versioning in mind from the start.

Design your API as if a developer you've never met needs to use it without documentation. The URL should say what the resource is. The method should say what operation. The status code should tell them what happened. The response body should have everything they need.`,
        callout: {
          type: "default",
          label: "API Design Is a Skill",
          text: "A well-designed API is a pleasure to use. A poorly designed one causes bugs on every client that integrates with it. Spend time on naming, consistency, and error messages. The people integrating with your API — including future you — will notice."
        },
        callout2: {
          type: "focus",
          label: "Validate Before Touching the Database",
          text: "Every POST and PUT request should validate its input before running any database query. Check required fields are present, types are correct, values are in valid ranges. Return 400 with a specific error message if anything is wrong. Letting invalid data reach the database causes harder-to-diagnose problems than a clear 400 response."
        },
        hint: `Your API is returning data but the frontend is having trouble using it.

<strong>Try this:</strong> Open the Network tab in the browser DevTools and look at the actual response your API is sending. Is it the shape you expected? Compare the exact JSON structure to what the frontend code expects to receive. The mismatch is usually obvious once you look at both side by side.

<strong>Still stuck?</strong> Test your API with Postman or curl to isolate it from the frontend. If the API returns correct data in Postman but the frontend breaks, the problem is how the frontend is parsing the response — not the API itself.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#c87e9a;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.endpoint-row{display:flex;align-items:flex-start;gap:12px;padding:12px;background:#111;border:1px solid #222;border-radius:8px;margin-bottom:8px;cursor:pointer;transition:border-color 0.15s}
.endpoint-row:hover,.endpoint-row.active{border-color:#c87e9a}
.badge{font-size:10px;font-weight:bold;padding:3px 8px;border-radius:4px;min-width:50px;text-align:center;flex-shrink:0}
.GET{background:#1a3a1a;color:#6dbf6d}.POST{background:#1a2a3a;color:#7eb8c8}
.PUT{background:#2a2a0a;color:#c8a96e}.DELETE{background:#3a0a0a;color:#ff6b6b}
.ep-path{color:#fff;font-size:13px;min-width:180px}.ep-desc{color:#666;font-size:11px}
.detail-panel{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:16px;margin-top:16px;display:none}
.detail-panel.visible{display:block}
.section-title{color:#888;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;margin-top:12px}
.code-block{background:#0a0a0a;border:1px solid #222;border-radius:6px;padding:12px;font-size:11px;color:#c8a96e;white-space:pre-wrap}
</style></head><body>
<h2>REST API Reference</h2>
<p class="sub">Click an endpoint to see request/response shapes and status codes.</p>
<div id="endpoints"></div>
<div class="detail-panel" id="detail"></div>
<script>
var endpoints=[
  {method:'GET',path:'/api/users',desc:'List all users',
   request:'No body required',
   response:'200 OK\\n{\\n  "data": [\\n    { "id": 1, "name": "Alex Chen", "email": "alex@example.com" }\\n  ],\\n  "total": 1\\n}'},
  {method:'POST',path:'/api/users',desc:'Create a new user',
   request:'Content-Type: application/json\\n{\\n  "name": "Alex Chen",\\n  "email": "alex@example.com"\\n}',
   response:'201 Created\\n{\\n  "id": 2,\\n  "name": "Alex Chen",\\n  "email": "alex@example.com",\\n  "createdAt": "2026-05-16T12:00:00Z"\\n}'},
  {method:'GET',path:'/api/users/:id',desc:'Get user by ID',
   request:'No body required',
   response:'200 OK\\n{\\n  "id": 1,\\n  "name": "Alex Chen",\\n  "email": "alex@example.com"\\n}\\n\\n404 Not Found\\n{\\n  "error": "User not found"\\n}'},
  {method:'PUT',path:'/api/users/:id',desc:'Replace user record',
   request:'Content-Type: application/json\\n{\\n  "name": "Updated Name",\\n  "email": "updated@example.com"\\n}',
   response:'200 OK\\n{\\n  "id": 1,\\n  "name": "Updated Name",\\n  "email": "updated@example.com"\\n}'},
  {method:'DELETE',path:'/api/users/:id',desc:'Delete user',
   request:'No body required',
   response:'200 OK\\n{\\n  "message": "User deleted",\\n  "deleted": true\\n}'},
];
var epEl=document.getElementById('endpoints');
var detailEl=document.getElementById('detail');
endpoints.forEach(function(ep,i){
  var div=document.createElement('div');div.className='endpoint-row';
  div.innerHTML='<span class="badge '+ep.method+'">'+ep.method+'</span>'+
    '<span class="ep-path">'+ep.path+'</span>'+
    '<span class="ep-desc">'+ep.desc+'</span>';
  div.onclick=function(){
    document.querySelectorAll('.endpoint-row').forEach(function(e){e.classList.remove('active');});
    div.classList.add('active');
    detailEl.className='detail-panel visible';
    detailEl.innerHTML='<strong>'+ep.method+' '+ep.path+'</strong>'+
      '<div class="section-title">Request</div><div class="code-block">'+ep.request+'</div>'+
      '<div class="section-title">Response</div><div class="code-block">'+ep.response+'</div>';
  };
  epEl.appendChild(div);
});
</script></body></html>`,
          challenges: ["Add input validation that returns a 400 error if required fields are missing", "Add pagination to the list endpoint: accept page and limit query parameters", "Add a search endpoint that filters results by a query parameter", "Document your API endpoints in the code comments in the format: METHOD /path — description"]
        },
        quiz: {
          question: "A client sends a POST request to create a user but omits the required email field. What should the API return?",
          options: ["201 Created with a partial user record that has no email", "500 Internal Server Error if the database rejects the insert", "400 Bad Request with an error message specifying that email is required", "200 OK with a flag indicating the request was incomplete"],
          correct: 2,
          feedback: "400 Bad Request means the client sent something invalid. The error message should tell them exactly what's wrong: 'email is required' or 'email must be a valid email address'. Don't let invalid data reach the database — validate first and return 400 immediately. 500 is for server failures, not client mistakes. 201 with missing required data is incorrect by definition."
        },
        checklist: ["I can build RESTful CRUD endpoints for a resource following standard URL conventions", "I validate all request input before any database interaction — invalid data returns 400", "I return consistent response shapes: the same structure for every success, a clear error shape for failures", "I use correct HTTP status codes and can explain the choice for each endpoint", "I've tested my API with Postman before connecting the frontend"]
      },
      {
        id: "5-8",
        title: "Environment Variables and Security",
        body: `Environment variables store secrets and configuration outside your code. Database passwords, API keys, JWT secrets, and third-party service credentials must never be committed to a Git repository. A public GitHub repository with a database password in it is a security incident, not just a mistake.

The dotenv package reads a .env file and loads its contents into process.env. Add .env to your .gitignore immediately when you create any project. Commit a .env.example file that shows what variables are needed with placeholder values — this is the convention for onboarding new developers without exposing secrets.

SQL injection is the most common web application vulnerability. It happens when you build SQL queries with string concatenation: 'SELECT * FROM users WHERE name = ' + userInput. If userInput is ' OR '1'='1, the query returns every row in the table. The fix is parameterised queries: the query and the data are sent separately, and the database handles the escaping. Never build SQL with string concatenation.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — if req.body.username is the string \' OR \'1\'=\'1, what does the concatenated query look like? What does it return, and what does that mean for your users?</div>

XSS (Cross-Site Scripting) happens when user input is rendered as HTML without sanitisation. If a user submits <script>steal(document.cookie)</script> as a comment and you display it directly, that script runs in every reader's browser. Sanitise or encode user content before rendering it.

CORS (Cross-Origin Resource Sharing) is the browser's mechanism for restricting which domains can call your API. Configure CORS explicitly: list the specific origins your frontend runs on. Never set Access-Control-Allow-Origin: * in a production application that uses authentication — it allows any website to make authenticated requests on behalf of your users.`,
        callout: {
          type: "default",
          label: "The .gitignore Rule",
          text: "Before your first git add on any project: add .env to .gitignore. Check it's there before your first commit. Once a secret is committed to Git, assume it's compromised even if you remove it later — Git history is permanent and crawled by automated tools."
        },
        callout2: {
          type: "focus",
          label: "Parameterised Queries",
          text: "Every database client supports parameterised queries: pg uses db.query('SELECT * FROM users WHERE id = $1', [userId]). The $1 is a placeholder — the database treats the value as data, not SQL syntax. This is not optional in production code. SQL injection vulnerabilities have caused some of the largest data breaches in history."
        },
        hint: `You've committed sensitive data to a public repository.

<strong>What to do right now:</strong> Revoke and regenerate the compromised credentials immediately — new database password, new API key, new JWT secret. Do this before doing anything else. Then remove the secrets from the codebase and add them to .env. Then use BFG Repo Cleaner or git filter-branch to purge them from Git history. Removing a file from the current commit doesn't remove it from history.

<strong>Prevention:</strong> Use git-secrets or pre-commit hooks that block commits containing credential patterns. The few minutes of setup prevents this conversation.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#c87e9a;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.checker{display:grid;gap:10px;margin-bottom:20px}
.item{background:#111;border-radius:8px;padding:14px 16px;display:flex;align-items:flex-start;gap:12px;border:1px solid transparent}
.item.safe{border-color:#2a4a2a}.item.unsafe{border-color:#4a2a2a}
.icon{font-size:18px;flex-shrink:0;margin-top:1px}
.content{flex:1}
.check-title{color:#fff;font-size:12px;margin-bottom:4px}
.check-detail{color:#888;font-size:11px;line-height:1.5}
.label{font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
.unsafe-label{color:#ff6b6b}.safe-label{color:#6dbf6d}
.code{color:#c8a96e;font-family:'IBM Plex Mono',monospace;font-size:11px;background:#0a0a0a;padding:2px 6px;border-radius:3px}
</style></head><body>
<h2>Security Checklist</h2>
<p class="sub">Common security mistakes and their fixes.</p>
<div class="label unsafe-label">These are vulnerabilities — fix them before shipping</div>
<div class="checker">
<div class="item unsafe"><span class="icon">🚨</span><div class="content">
<div class="check-title">SQL Injection — String concatenation in queries</div>
<div class="check-detail">Bad: <span class="code">"SELECT * FROM users WHERE id = " + req.params.id</span><br>
Fix: Parameterised query — <span class="code">db.query("SELECT * FROM users WHERE id = $1", [req.params.id])</span></div>
</div></div>
<div class="item unsafe"><span class="icon">🚨</span><div class="content">
<div class="check-title">Secrets in code</div>
<div class="check-detail">Bad: <span class="code">const API_KEY = "sk_live_abc123"</span> committed to Git<br>
Fix: Move to <span class="code">.env</span> file, add <span class="code">.env</span> to <span class="code">.gitignore</span>, use <span class="code">process.env.API_KEY</span></div>
</div></div>
<div class="item unsafe"><span class="icon">🚨</span><div class="content">
<div class="check-title">Unvalidated user input</div>
<div class="check-detail">Bad: Inserting req.body.comment directly into HTML<br>
Fix: Sanitise with DOMPurify or escape special chars. Never trust user input.</div>
</div></div>
</div>
<div class="label safe-label">These protect your application — implement them</div>
<div class="checker">
<div class="item safe"><span class="icon">✓</span><div class="content">
<div class="check-title">Helmet.js middleware</div>
<div class="check-detail"><span class="code">app.use(helmet())</span> sets secure HTTP headers in one line. Prevents clickjacking, XSS, and sniffing attacks.</div>
</div></div>
<div class="item safe"><span class="icon">✓</span><div class="content">
<div class="check-title">CORS configured explicitly</div>
<div class="check-detail"><span class="code">cors({ origin: 'https://yourapp.com' })</span> — never use <span class="code">origin: '*'</span> in production with authentication.</div>
</div></div>
<div class="item safe"><span class="icon">✓</span><div class="content">
<div class="check-title">Rate limiting</div>
<div class="check-detail"><span class="code">express-rate-limit</span> — limit each IP to 100 requests per 15 minutes. Prevents brute force and abuse.</div>
</div></div>
</div>
</body></html>`,
          challenges: ["Move the hardcoded API key in the code to a .env file", "Add CORS middleware that only allows requests from http://localhost:3000", "Add rate limiting middleware that blocks IPs making more than 100 requests per minute", "Identify and fix the SQL injection vulnerability in the code"]
        },
        quiz: {
          question: "A developer builds a query: 'SELECT * FROM users WHERE username = \'' + req.body.username + '\'' What is wrong with this?",
          options: ["String concatenation is slower than template literals for SQL queries", "The query is vulnerable to SQL injection — malicious input can manipulate the query logic", "Single quotes should be escaped differently in SQL", "The WHERE clause syntax is incorrect for PostgreSQL"],
          correct: 1,
          feedback: "String-concatenated SQL is vulnerable to injection. If req.body.username is ' OR '1'='1, the query becomes: SELECT * FROM users WHERE username = '' OR '1'='1' — which returns every user. Use parameterised queries: db.query('SELECT * FROM users WHERE username = $1', [req.body.username]). The database treats $1 as data, making injection impossible."
        },
        checklist: ["All API keys and secrets are in .env — none are in the codebase or git history", ".env is in .gitignore — I verified this before the first commit", "I use parameterised queries for every database operation — no string concatenation", "I can explain what CORS is and have configured it to allow only my frontend's origin", "I can explain what XSS is and how I prevent it when rendering user-generated content"]
      },
      {
        id: "5-phase2-review",
        title: "Phase 2 Review — Node/Express, Databases, REST APIs, and Security",
        body: `Five questions covering Express routes, database connections, REST API design, and security fundamentals.`,
        quiz: {
          questions: [
            {
              question: "An Express route handler has req.body as undefined. What is the most likely cause?",
              options: [
                "POST routes do not support request bodies in Express",
                "The request was sent with GET instead of POST",
                "app.use(express.json()) middleware is not registered before the route",
                "req.body is always undefined for security — you must use req.params instead"
              ],
              correct: 2,
              feedback: "Express doesn't parse request bodies by default. app.use(express.json()) must be registered before routes that need req.body — it reads the raw request body and parses it as JSON, attaching the result to req.body. Register it near the top of the app, before route definitions. Missing this middleware is the most common Express beginner mistake."
            },
            {
              question: "What is the N+1 query problem?",
              options: [
                "A SQL error caused by selecting more than N columns in a query",
                "Fetching a list of N items and then making a separate database query for each item's related data — N+1 queries total instead of 1",
                "An index that grows beyond the database's maximum size",
                "A bug in connection pooling that creates extra connections"
              ],
              correct: 1,
              feedback: "N+1: you fetch 10 posts (1 query), then for each post you fetch the author separately (10 queries) = 11 queries total. With 100 posts it's 101 queries. The fix: a JOIN query that fetches posts and authors together in one query. ORMs can generate N+1 silently — always check what SQL your ORM actually produces."
            },
            {
              question: "A client sends POST /api/users without the required email field. What should the API return?",
              options: [
                "201 Created with a user record that has email set to null",
                "400 Bad Request with a message: 'email is required'",
                "500 Internal Server Error when the database rejects the insert",
                "200 OK with a warning flag in the response body"
              ],
              correct: 1,
              feedback: "Validate all input before touching the database. If required fields are missing or invalid, return 400 Bad Request with a specific message. 400 means the client sent a bad request. 500 means something broke on the server — letting invalid data reach the database and fail there is the wrong approach. Validate early, return clear error messages."
            },
            {
              question: "Why is this dangerous: 'SELECT * FROM users WHERE name = \'' + req.body.name + '\''",
              options: [
                "String concatenation is slower than template literals in Node.js",
                "It's vulnerable to SQL injection — a malicious name input can change the query logic and expose all data",
                "Single quotes are not valid in PostgreSQL queries",
                "The query returns too many columns and wastes bandwidth"
              ],
              correct: 1,
              feedback: "SQL injection: if req.body.name is ' OR '1'='1, the query becomes SELECT * FROM users WHERE name = '' OR '1'='1' — which returns every row. Fix: parameterised queries — db.query('SELECT * FROM users WHERE name = $1', [req.body.name]). The database treats $1 as data, not SQL syntax, making injection impossible. This is non-negotiable in production code."
            },
            {
              question: "What is the correct way to store API keys and database passwords in a Node.js application?",
              options: [
                "Hardcode them as constants at the top of the file for easy access",
                "Store in a .env file (excluded from git via .gitignore) and access via process.env.KEY_NAME",
                "Store in a config.json file committed to the repository for the team to share",
                "Encode them in base64 before storing in the codebase"
              ],
              correct: 1,
              feedback: ".env file + .gitignore is the standard approach. The dotenv package loads .env into process.env. Commit .env.example with placeholder values for onboarding. The actual .env file is never committed. Once a secret is committed to Git, assume it's compromised even if removed — bots scan public repos continuously. Base64 is encoding, not protection."
            }
          ]
        }
      },
      {
        id: "5-9",
        title: "Deployment",
        body: `Deployment is putting your application on a server that anyone on the internet can reach. Until you deploy, only you can use what you've built.

For Node/Express backends, Railway, Render, and Fly.io offer free or low-cost hosting with minimal configuration. You connect your GitHub repository, configure environment variables in the platform dashboard (never in the code), and the platform handles the server, the network, and keeping your process running.

For frontends, Netlify and Vercel detect your repository, build it automatically on every push to main, and serve it from a global CDN. Deployment becomes automatic: push to main, wait two minutes, the live site is updated.

Process managers like PM2 keep your Node.js application running if it crashes. Without PM2 or an equivalent, your server goes down every time there's an unhandled error. Railway and Render handle process management for you — on a VPS, you manage it yourself.

Environment variables in production are set in the platform dashboard, not in code or .env files (which you'd never deploy). Every platform has a variables section. Set them before your first deployment.

<strong>Monitoring</strong> is knowing your application is down before users tell you. A basic uptime monitor (UptimeRobot is free) pings your /health endpoint every 5 minutes and notifies you if it doesn't respond. On day one this feels unnecessary. On the day your app is down and you find out from a tweet, it feels essential.

Deployment is not the end. It's where the real work begins: watching logs, responding to errors, iterating from real user feedback.`,
        callout: {
          type: "default",
          label: "Continuous Deployment",
          text: "Connect your GitHub repository to Railway or Render and enable automatic deployments. Every push to main triggers a new build and deploy. This removes the manual deploy step and means your production environment always reflects your main branch. It's the standard for any team moving faster than once a week."
        },
        callout2: {
          type: "focus",
          label: "Logs Are Your Eyes",
          text: "In production, you can't open DevTools. Logs are how you see what's happening. Every platform has a log viewer. Check them when something breaks. Add structured logging (Winston or Pino) to your Node application so you have context when things go wrong: which user, which endpoint, what data, what error."
        },
        hint: `Your application works locally but fails after deployment.

<strong>Try this:</strong> Check the deployment logs first — every platform shows the build and runtime logs. Most production failures are one of: missing environment variable, port mismatch (your app must listen on process.env.PORT, not a hardcoded 3000), or a dependency that wasn't in package.json.

<strong>Still stuck?</strong> Compare your .env file to the environment variables set in the platform dashboard. A missing variable causes the exact application startup failure that's hardest to diagnose without logs.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#c87e9a;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.pipeline{display:grid;gap:4px;margin-bottom:20px}
.step{display:flex;align-items:flex-start;gap:14px;padding:14px 16px;background:#111;border:1px solid #222;border-radius:8px;cursor:pointer;transition:all 0.2s}
.step.done{border-color:#2a4a2a;background:#0a1a0a}
.step.active{border-color:#c8a96e;background:#1a1a0a}
.step-num{width:24px;height:24px;border-radius:50%;background:#333;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;color:#fff}
.step.done .step-num{background:#2a4a2a;color:#6dbf6d}
.step.active .step-num{background:#3a3a0a;color:#c8a96e}
.step-content{flex:1}
.step-title{color:#fff;font-size:12px;margin-bottom:3px}
.step-desc{color:#555;font-size:11px;line-height:1.5}
.step.done .step-title{color:#6dbf6d}
button{background:#c87e9a;color:#fff;border:none;border-radius:6px;padding:10px 20px;font-family:inherit;font-size:12px;cursor:pointer;margin-top:8px}
button:hover{background:#d89ab5}
.status{color:#555;font-size:11px;margin-top:12px}
</style></head><body>
<h2>Deployment Pipeline</h2>
<p class="sub">Simulate a deploy from code push to live. Click Run Deploy.</p>
<div class="pipeline" id="pipeline"></div>
<button onclick="runDeploy()">Run Deploy</button>
<div class="status" id="status"></div>
<script>
var steps=[
  {title:'Push to main',desc:'git push origin main triggers the pipeline'},
  {title:'Run tests',desc:'npm test — all tests must pass to proceed'},
  {title:'Build application',desc:'npm run build — create optimised production bundle'},
  {title:'Run security scan',desc:'Check dependencies for known vulnerabilities'},
  {title:'Deploy to staging',desc:'Deploy to staging environment for final checks'},
  {title:'Health check',desc:'GET /health must return 200 OK within 10 seconds'},
  {title:'Deploy to production',desc:'Zero-downtime deploy — new instances before old ones stop'},
  {title:'Smoke test',desc:'Automated check of critical user paths in production'},
];
var currentStep=-1;
var pipelineEl=document.getElementById('pipeline');
var statusEl=document.getElementById('status');
function renderSteps(){
  pipelineEl.innerHTML=steps.map(function(s,i){
    var cls='step'+(i<currentStep?' done':i===currentStep?' active':'');
    return '<div class="'+cls+'">'+
      '<div class="step-num">'+(i<currentStep?'✓':(i+1))+'</div>'+
      '<div class="step-content"><div class="step-title">'+s.title+'</div>'+
      '<div class="step-desc">'+s.desc+'</div></div></div>';
  }).join('');
}
function runDeploy(){
  currentStep=0;
  document.querySelector('button').disabled=true;
  renderSteps();
  statusEl.textContent='Deploying...';
  function nextStep(){
    currentStep++;
    renderSteps();
    if(currentStep>=steps.length){statusEl.textContent='✓ Deployed to production successfully';document.querySelector('button').disabled=false;currentStep=-1;return;}
    var delay=600+Math.random()*800;
    setTimeout(nextStep,delay);
  }
  setTimeout(nextStep,800);
}
renderSteps();
</script></body></html>`,
          challenges: ["Write the exact sequence of commands to deploy a Node.js app to Railway", "Write a health check endpoint GET /health that returns {status: 'ok', uptime: process.uptime()}", "Add environment-specific configuration — different database URLs for development and production", "Set up a basic monitoring check: a script that hits your /health endpoint every 5 minutes and logs if it fails"]
        },
        quiz: {
          question: "Your Node.js app works on localhost:3000 but fails to start on Railway. What is the most common reason?",
          options: ["Railway doesn't support Node.js applications", "The application is listening on a hardcoded port 3000 instead of process.env.PORT", "The package.json is missing from the repository", "Railway requires a separate configuration file for every environment variable"],
          correct: 1,
          feedback: "Cloud platforms assign a dynamic port to your application via the PORT environment variable. Your app must listen on process.env.PORT. If it's hardcoded to 3000, it starts on 3000, but the platform is routing traffic to a different port — the app is running but unreachable. The fix: app.listen(process.env.PORT || 3000)."
        },
        checklist: ["I can deploy a Node.js application to Railway or Render from a GitHub repository", "Environment variables are set in the platform dashboard — not in code or .env files", "My app listens on process.env.PORT — not a hardcoded port number", "I have a GET /health endpoint that returns a 200 status code", "When something breaks in production, I check the deployment logs first"]
      },
      {
        id: "5-10",
        title: "Connecting Frontend to Backend",
        body: `The frontend and backend are separate systems that communicate over HTTP. They might be on different domains. They might be built with different technologies. They talk to each other exactly the same way your browser talks to any other server: HTTP requests.

CORS is the browser's mechanism for restricting cross-origin requests. When your frontend on localhost:3000 calls your API on localhost:8000, the browser blocks it unless the server explicitly allows that origin. Configure the cors middleware on your Express server: cors({ origin: 'http://localhost:3000' }). In production, replace that with your deployed frontend URL.

The standard fetch workflow from the frontend: for read operations, GET request, handle loading and error states. For write operations, POST/PATCH/DELETE with Content-Type: application/json and JSON.stringify in the body. Always handle the loading state (show a spinner or disable the submit button) and the error state (show a message, don't just fail silently).

Authentication headers: after login, store the JWT in memory or localStorage. Send it with every authenticated request: headers: { 'Authorization': 'Bearer ' + token }. The server extracts and verifies the token in auth middleware before the route handler runs.

Treat your backend API as if it belongs to a completely separate team. Test it with Postman before connecting the frontend. Define the response shape before writing either side. This discipline exposes misalignments early, when they're cheap to fix.`,
        callout: {
          type: "default",
          label: "Design the Contract First",
          text: "Before writing the frontend fetch code or the backend route handler, write down the API contract: URL, method, request body shape, success response shape, error response shapes. Both sides build to the same contract. This is how teams that don't talk constantly still build systems that work together."
        },
        callout2: {
          type: "focus",
          label: "Optimistic UI",
          text: "Optimistic UI updates the interface immediately when the user takes an action, before the server confirms. If the server returns an error, the update is reverted. Twitter uses this for likes — the heart fills instantly, the server is updated in the background. It makes applications feel fast. Instagram, Notion, and Linear all use it extensively."
        },
        hint: `Your fetch request is being blocked by CORS.

<strong>Try this:</strong> Look at the browser console error message carefully. It will say exactly which origin is blocked and which origin the server allows. The fix is always server-side: add the correct origin to your CORS configuration. The browser enforces CORS — you can't bypass it client-side.

<strong>Still stuck?</strong> A CORS error only appears in browsers. If you test with curl or Postman and it works, the API is fine. The CORS error is specifically the browser blocking the cross-origin request. Configure the cors middleware with the exact origin your frontend is running on, including the port number.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#c87e9a;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.toolbar{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
button{background:#c87e9a;color:#fff;border:none;border-radius:6px;padding:8px 16px;font-family:inherit;font-size:11px;cursor:pointer;letter-spacing:0.5px}
button:hover{background:#d89ab5}button:disabled{opacity:0.4}
.posts{display:grid;gap:10px;margin-bottom:16px}
.post{background:#111;border:1px solid #222;border-radius:8px;padding:14px}
.post-title{color:#fff;font-size:13px;margin-bottom:4px}
.post-body{color:#777;font-size:11px;line-height:1.5}
.post-meta{color:#555;font-size:10px;margin-top:6px}
.loading{color:#666;font-style:italic;padding:16px 0}
.err{color:#ff6b6b;padding:16px 0}
.ok{color:#6dbf6d;font-size:11px;margin-bottom:8px}
</style></head><body>
<h2>Frontend ↔ Backend</h2>
<p class="sub">Fetch posts from JSONPlaceholder — simulating a real backend API.</p>
<div class="toolbar">
<button id="load-btn" onclick="loadPosts()">Load Posts (GET)</button>
<button id="create-btn" onclick="createPost()" disabled>Create Post (POST)</button>
</div>
<div id="status"></div>
<div id="posts"></div>
<script>
var posts=[];
async function loadPosts(){
  var btn=document.getElementById('load-btn');
  var postsEl=document.getElementById('posts');
  var statusEl=document.getElementById('status');
  btn.disabled=true;
  postsEl.innerHTML='<p class="loading">Fetching from API...</p>';
  statusEl.innerHTML='';
  try{
    var res=await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if(!res.ok)throw new Error('HTTP '+res.status);
    posts=await res.json();
    statusEl.innerHTML='<p class="ok">✓ Loaded '+posts.length+' posts — GET /api/posts returned 200 OK</p>';
    renderPosts();
    document.getElementById('create-btn').disabled=false;
  }catch(e){postsEl.innerHTML='<p class="err">Error: '+e.message+'</p>';}
  btn.disabled=false;
}
async function createPost(){
  var btn=document.getElementById('create-btn');
  var statusEl=document.getElementById('status');
  btn.disabled=true;
  try{
    var res=await fetch('https://jsonplaceholder.typicode.com/posts',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title:'My New Post',body:'Created by the frontend at '+new Date().toLocaleTimeString(),userId:1})
    });
    var created=await res.json();
    statusEl.innerHTML='<p class="ok">✓ POST /api/posts returned 201 Created — id: '+created.id+'</p>';
    posts.unshift(created);
    renderPosts();
  }catch(e){statusEl.innerHTML='<p class="err">Error: '+e.message+'</p>';}
  btn.disabled=false;
}
function renderPosts(){
  document.getElementById('posts').innerHTML=posts.map(function(p){
    return '<div class="post"><div class="post-title">'+p.title+'</div>'+
      '<div class="post-body">'+p.body.slice(0,100)+'...</div>'+
      '<div class="post-meta">ID: '+p.id+' · User: '+p.userId+'</div></div>';
  }).join('');
}
</script></body></html>`,
          challenges: ["Add a loading state that shows a spinner while the request is in progress", "Add error handling that shows a specific message for 401 (unauthorized) vs 404 (not found) vs 500 (server error)", "Add an Authorization header with a JWT token to the fetch request", "Implement optimistic UI: update the list immediately when a new item is added, before the server confirms"]
        },
        quiz: {
          question: "Your frontend fetch request to the backend is blocked with a CORS error. Where is the fix applied?",
          options: ["In the frontend fetch() call, by adding mode: 'no-cors'", "In the browser settings, by disabling the same-origin policy", "On the backend server, by adding CORS middleware that allows the frontend's origin", "In the HTTP request headers, by adding a CORS bypass header"],
          correct: 2,
          feedback: "CORS is enforced by the browser based on what the server allows. The server must include the correct Access-Control-Allow-Origin header in its response. Adding mode: 'no-cors' to fetch doesn't solve the problem — it just hides the error while preventing you from reading the response. The fix is always server-side: configure cors middleware to explicitly allow your frontend's origin."
        },
        checklist: ["I can explain why CORS exists and configure it correctly for both local and production environments", "I send JWT tokens in the Authorization header for authenticated requests", "I handle loading and error states for every fetch call — no silent failures", "I test my API endpoints with Postman before writing the frontend fetch code", "I can explain what optimistic UI is and implement a basic example"]
      },
      {
        id: "5-11",
        title: "Guided Full Stack Notes App",
        body: `The notes app is your first complete full stack project: frontend, backend, database, deployed. Not a tutorial you follow — a system you build by connecting the pieces you've learned on this floor.

The scaffold provides a React-style HTML frontend, an Express backend with in-memory array storage, and basic CRUD endpoints for notes. Your job is to connect the frontend to the backend, replace the in-memory array with a real database, add proper error handling to every operation, and deploy both services.

This is the project where everything from Floor 5 becomes a single working system. The database you learned in section 5-3. The Express server from 5-5. The database connection from 5-6. The REST API design from 5-7. The environment variables from 5-8. The deployment from 5-9. The frontend-backend connection from 5-10. It all converges here.

Read the full scaffold before writing a single line. Understand the data flow: what does the frontend send, what does the backend receive, what does the database store, what does the response look like. Draw it on paper if it helps. Build the data layer first, then the API layer, then connect the frontend, then deploy.

The order matters. A working backend you can test with Postman before the frontend exists is much easier to debug than a system where everything breaks simultaneously.`,
        callout: {
          type: "default",
          label: "Build Order",
          text: "Database schema first. Then database functions. Then Express routes that use those functions. Test with Postman. Then connect the frontend. Then deploy. Each layer is independently testable before the next layer is added. This is how professionals build systems — not all at once."
        },
        callout2: {
          type: "focus",
          label: "In-Memory vs Database",
          text: "The scaffold uses an in-memory array to store notes. It works, but data is lost every time the server restarts. Replacing it with real database queries is the most important change you'll make. Every note stored in the array needs a corresponding row in a database table."
        },
        hint: `The frontend and backend are both working independently but don't communicate correctly.

<strong>Try this:</strong> Open the browser Network tab and watch the request your frontend sends when you create a note. Check: is the URL correct? Is the method POST? Is the body JSON? Is the Content-Type header set? Then look at the server logs for the same moment — did the request arrive? What does the server log?

<strong>Still stuck?</strong> Add console.log(req.method, req.path, req.body) at the top of every route. This shows you exactly what the server receives. If the route isn't logging, the request isn't reaching Express. If it's logging but req.body is empty, body-parsing middleware is missing.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;font-size:13px;height:100vh;display:grid;grid-template-rows:auto 1fr auto}
header{background:#111;border-bottom:1px solid #222;padding:16px 24px;display:flex;align-items:center;justify-content:space-between}
header h1{font-size:16px;color:#c87e9a}
header span{color:#555;font-size:11px}
main{display:grid;grid-template-columns:260px 1fr;height:100%;overflow:hidden}
.sidebar{background:#0d0d0d;border-right:1px solid #1a1a1a;overflow-y:auto;padding:12px}
.sidebar-label{color:#444;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:8px 8px 4px}
.note-item{padding:10px 8px;border-radius:6px;cursor:pointer;border:1px solid transparent;margin-bottom:2px}
.note-item:hover{background:#111;border-color:#222}
.note-item.active{background:#1a1a2a;border-color:#3a3a5a}
.note-item-title{color:#fff;font-size:12px;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.note-item-preview{color:#555;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.editor{display:flex;flex-direction:column;height:100%}
.editor-toolbar{padding:12px 20px;border-bottom:1px solid #1a1a1a;display:flex;gap:8px}
button{background:#c87e9a;color:#fff;border:none;border-radius:6px;padding:6px 14px;font-family:inherit;font-size:11px;cursor:pointer}
button:hover{background:#d89ab5}
.del-btn{background:#333;color:#888;border:1px solid #444}
.del-btn:hover{border-color:#ff6b6b;color:#ff6b6b;background:transparent}
#note-title{flex:1;background:#111;border:1px solid #2a2a2a;color:#fff;padding:14px 20px;font-family:inherit;font-size:16px;border-radius:0;border-left:none;border-right:none}
#note-title:focus{outline:none}
#note-body{flex:1;background:#0d0d0d;border:none;color:#ccc;padding:20px;font-family:'IBM Plex Mono',monospace;font-size:13px;resize:none;line-height:1.7}
#note-body:focus{outline:none}
</style></head><body>
<header><h1>Notes App</h1><span id="save-status">All changes saved</span></header>
<main>
<div class="sidebar">
<div class="sidebar-label">Notes</div>
<div id="sidebar-notes"></div>
<button style="width:100%;margin-top:8px;background:#1a1a2a;border:1px dashed #333;color:#666" onclick="newNote()">+ New Note</button>
</div>
<div class="editor">
<div class="editor-toolbar">
<button onclick="saveNote()">Save</button>
<button class="del-btn" onclick="deleteNote()">Delete</button>
</div>
<input type="text" id="note-title" placeholder="Note title...">
<textarea id="note-body" placeholder="Start writing your note here..."></textarea>
</div>
</main>
<script>
var notes=JSON.parse(localStorage.getItem('fullstack_notes'))||[{id:1,title:'Welcome',body:'This is a full-stack style notes app. Your notes are stored in localStorage (simulating a database). Create, edit, and delete notes.',date:new Date().toISOString()}];
var currentId=notes[0]?notes[0].id:null;
var nextId=notes.length?Math.max.apply(null,notes.map(function(n){return n.id;}))+1:1;
var saveTimeout=null;
function save(){localStorage.setItem('fullstack_notes',JSON.stringify(notes));}
function renderSidebar(){
  var el=document.getElementById('sidebar-notes');
  el.innerHTML=notes.map(function(n){
    return '<div class="note-item'+(n.id===currentId?' active':'')+'\\" onclick="selectNote('+n.id+')">'+
      '<div class="note-item-title">'+(n.title||'Untitled')+'</div>'+
      '<div class="note-item-preview">'+(n.body||'').slice(0,40)+'</div></div>';
  }).join('');
}
function selectNote(id){
  currentId=id;
  var n=notes.find(function(n){return n.id===id;});
  if(!n)return;
  document.getElementById('note-title').value=n.title;
  document.getElementById('note-body').value=n.body;
  renderSidebar();
}
function newNote(){
  var n={id:nextId++,title:'New Note',body:'',date:new Date().toISOString()};
  notes.unshift(n);currentId=n.id;save();selectNote(n.id);
}
function saveNote(){
  var n=notes.find(function(n){return n.id===currentId;});
  if(!n)return;
  n.title=document.getElementById('note-title').value||'Untitled';
  n.body=document.getElementById('note-body').value;
  save();renderSidebar();
  document.getElementById('save-status').textContent='Saved at '+new Date().toLocaleTimeString();
}
function deleteNote(){
  if(!currentId)return;
  notes=notes.filter(function(n){return n.id!==currentId;});
  currentId=notes[0]?notes[0].id:null;
  save();
  if(currentId){selectNote(currentId);}
  else{document.getElementById('note-title').value='';document.getElementById('note-body').value='';}
  renderSidebar();
}
['note-title','note-body'].forEach(function(id){
  document.getElementById(id).addEventListener('input',function(){
    document.getElementById('save-status').textContent='Unsaved changes';
    clearTimeout(saveTimeout);saveTimeout=setTimeout(saveNote,1500);
  });
});
if(currentId)selectNote(currentId);else renderSidebar();
</script></body></html>`,
          challenges: ["Connect the frontend fetch calls to the backend API endpoints", "Replace the in-memory array with real database queries", "Add a loading state for each async operation", "Deploy both frontend and backend and update the frontend API URL to point to the live backend"]
        },
        quiz: {
          question: "You've built the notes API and tested it with Postman. Now you connect the frontend and notes aren't saving. What should you check first?",
          options: ["The database schema for errors", "The browser Network tab to see the exact request being sent and the response received", "The frontend HTML for layout issues", "The Express router registration order"],
          correct: 1,
          feedback: "The Network tab shows you the exact request the browser sends and the exact response it receives. You already know the backend works (Postman proved it), so the problem is either the frontend isn't sending the right request, or isn't handling the response correctly. The Network tab shows both. This is the fastest way to find the disconnect."
        },
        checklist: ["The frontend makes real API calls to the backend — no hardcoded mock data", "Notes persist in a real database and survive a full server restart", "Loading and error states are handled and visible to the user", "Both frontend and backend are deployed and reachable via public URLs", "The app works end-to-end: I tested it by creating, editing, and deleting notes on the live URL"]
      },
      {
        id: "5-12",
        title: "Adding Authentication",
        body: `Adding authentication to the notes app means building the complete auth flow: register endpoint, login endpoint, JWT generation, auth middleware, and route protection. Then on the frontend: storing the token, sending it with every request, handling logout, and redirecting unauthenticated users.

The notes should be private per user. A user should only see their own notes, not everyone's. This requires adding a userId foreign key to the notes table. Every note is owned by a user. Every query for notes filters by the authenticated user's ID extracted from the JWT.

The auth flow in detail: the user submits a login form → the frontend POSTs credentials to /api/auth/login → the server finds the user by email, verifies the password with bcrypt.compare(), generates a JWT signed with the secret key, and returns it → the frontend stores the token and includes it in the Authorization header of every subsequent request → the auth middleware on the server verifies the JWT, extracts the userId, and attaches it to req.user → route handlers use req.user.id to filter data to the authenticated user's records.

Common mistakes: not hashing passwords with bcrypt before storage, not verifying the JWT secret matches between generation and verification, not filtering database queries by userId so users can see each other's notes, and not handling the case where a token is expired or invalid.`,
        callout: {
          type: "default",
          label: "The JWT Secret",
          text: "The JWT secret is what makes your tokens trustworthy. It must be a long, random string that only your server knows. Store it in an environment variable. If someone learns your secret, they can generate valid tokens for any user. Rotate it if it's ever compromised."
        },
        callout2: {
          type: "focus",
          label: "Filter by User ID",
          text: "After adding auth, every database query for notes must include WHERE user_id = $1 with the authenticated user's ID. Without this filter, any logged-in user can read any note. This is the most common data isolation bug in new full stack applications. Test it explicitly: log in as user A, try to access user B's note ID, confirm you get a 403."
        },
        hint: `Authentication works but users can see each other's notes.

<strong>Try this:</strong> Look at your database query for fetching notes. Does it have a WHERE user_id = $1 clause? If not, add it. The userId comes from req.user.id, which your auth middleware should be attaching. Log req.user at the top of the route to confirm it's there and contains the correct ID.

<strong>Still stuck?</strong> Test with two different accounts in two different browser windows (or one regular, one incognito). Create a note in each. Confirm each account only sees its own notes. This test exposes data isolation bugs that unit tests often miss.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:0;font-size:13px;min-height:100vh;display:flex;align-items:center;justify-content:center}
.auth-container{width:100%;max-width:400px;padding:24px}
.card{background:#111;border:1px solid #2a2a2a;border-radius:12px;padding:32px}
.card h2{color:#c87e9a;font-size:18px;margin-bottom:4px}
.card .sub{color:#555;font-size:11px;margin-bottom:24px}
.tabs{display:flex;gap:0;margin-bottom:24px;border-radius:8px;overflow:hidden;border:1px solid #222}
.tab{flex:1;background:none;border:none;color:#666;padding:10px;font-family:inherit;font-size:12px;cursor:pointer}
.tab.active{background:#c87e9a;color:#fff}
.field{margin-bottom:14px}
label{display:block;color:#888;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
input{width:100%;background:#0a0a0a;border:1px solid #333;color:#fff;padding:10px 12px;border-radius:6px;font-family:inherit;font-size:13px}
input:focus{outline:none;border-color:#c87e9a}
.submit-btn{width:100%;background:#c87e9a;color:#fff;border:none;border-radius:6px;padding:12px;font-family:inherit;font-size:13px;cursor:pointer;margin-top:8px;letter-spacing:0.5px}
.submit-btn:hover{background:#d89ab5}
.msg{padding:10px 12px;border-radius:6px;font-size:12px;margin-top:12px;text-align:center}
.msg.ok{background:#0a2a0a;color:#6dbf6d;border:1px solid #2a4a2a}
.msg.err{background:#2a0a0a;color:#ff6b6b;border:1px solid #4a2a2a}
.token-display{background:#0a0a0a;border:1px solid #222;border-radius:8px;padding:16px;margin-top:20px;word-break:break-all;font-size:10px;color:#c8a96e;line-height:1.6}
.dashboard{text-align:center;padding:8px}
.dashboard p{color:#aaa;font-size:12px;margin-bottom:16px}
.logout-btn{background:#333;color:#888;border:1px solid #444;border-radius:6px;padding:8px 20px;font-family:inherit;font-size:12px;cursor:pointer}
.logout-btn:hover{border-color:#c87e9a;color:#c87e9a}
</style></head><body>
<div class="auth-container">
<div class="card" id="auth-card">
<h2>Authentication</h2>
<p class="sub">Simulation of JWT-based login flow</p>
<div class="tabs">
<button class="tab active" onclick="setTab('login')">Login</button>
<button class="tab" onclick="setTab('register')">Register</button>
</div>
<div id="form-area"></div>
</div>
</div>
<script>
var currentTab='login';
var fakeUsers=[{email:'demo@example.com',password:'password123',name:'Demo User'}];
function setTab(tab){
  currentTab=tab;
  document.querySelectorAll('.tab').forEach(function(t,i){
    t.className='tab'+(i===(tab==='login'?0:1)?' active':'');
  });
  renderForm();
}
function renderForm(){
  var area=document.getElementById('form-area');
  if(currentTab==='login'){
    area.innerHTML='<div class="field"><label>Email</label><input type="email" id="email" value="demo@example.com"></div>'+
      '<div class="field"><label>Password</label><input type="password" id="password" value="password123"></div>'+
      '<button class="submit-btn" onclick="doLogin()">Login</button><div id="msg"></div>';
  }else{
    area.innerHTML='<div class="field"><label>Name</label><input type="text" id="name" placeholder="Your name"></div>'+
      '<div class="field"><label>Email</label><input type="email" id="email" placeholder="your@email.com"></div>'+
      '<div class="field"><label>Password</label><input type="password" id="password" placeholder="Min 8 chars"></div>'+
      '<button class="submit-btn" onclick="doRegister()">Create Account</button><div id="msg"></div>';
  }
}
function makeJWT(payload){
  var header=btoa(JSON.stringify({alg:'HS256',typ:'JWT'}));
  var body=btoa(JSON.stringify(payload));
  var sig=btoa('simulated_signature_'+Date.now());
  return header+'.'+body+'.'+sig;
}
function showMsg(text,type){document.getElementById('msg').innerHTML='<div class="msg '+type+'">'+text+'</div>';}
function doLogin(){
  var email=document.getElementById('email').value;
  var pass=document.getElementById('password').value;
  var user=fakeUsers.find(function(u){return u.email===email&&u.password===pass;});
  if(!user){showMsg('Invalid email or password','err');return;}
  var token=makeJWT({sub:1,email:user.email,name:user.name,exp:Date.now()+3600000});
  localStorage.setItem('auth_token',token);
  showDashboard(user,token);
}
function doRegister(){
  var name=document.getElementById('name').value;
  var email=document.getElementById('email').value;
  var pass=document.getElementById('password').value;
  if(!name||!email||!pass){showMsg('All fields required','err');return;}
  if(pass.length<8){showMsg('Password must be at least 8 characters','err');return;}
  if(fakeUsers.find(function(u){return u.email===email;})){showMsg('Email already registered','err');return;}
  fakeUsers.push({email:email,password:pass,name:name});
  showMsg('Account created! Logging you in...','ok');
  setTimeout(function(){setTab('login');document.getElementById('email').value=email;},1000);
}
function showDashboard(user,token){
  document.getElementById('auth-card').innerHTML='<h2>Welcome, '+user.name+'</h2>'+
    '<div class="sub">You are authenticated</div>'+
    '<div class="dashboard">'+
    '<p>The JWT below would be sent in the Authorization header<br>of every subsequent API request.</p>'+
    '<div class="token-display">Authorization: Bearer<br>'+token+'</div>'+
    '</div>'+
    '<button class="logout-btn" onclick="logout()" style="margin-top:16px;width:100%">Logout</button>';
}
function logout(){localStorage.removeItem('auth_token');document.getElementById('auth-card').innerHTML='';init();}
function init(){document.getElementById('auth-card').innerHTML='<h2>Authentication</h2><p class="sub">Simulation of JWT-based login flow</p><div class="tabs"><button class="tab active" onclick="setTab(\\'login\\')">Login</button><button class="tab" onclick="setTab(\\'register\\')">Register</button></div><div id="form-area"></div>';renderForm();}
var savedToken=localStorage.getItem('auth_token');
if(savedToken){showDashboard({name:'Demo User'},savedToken);}else{renderForm();}
</script></body></html>`,
          challenges: ["Implement the register endpoint that hashes the password and creates a user", "Implement the login endpoint that verifies the password and returns a JWT", "Add the auth middleware that verifies the JWT and attaches the user to req", "Update the notes endpoints to filter by the authenticated user's ID"]
        },
        quiz: {
          question: "After adding authentication, a logged-in user can still see notes belonging to other users. What is missing from the database query?",
          options: ["The JWT is not being verified correctly on the server", "The database query is not filtering notes by the authenticated user's ID", "The frontend is not sending the Authorization header", "The notes table is missing a primary key"],
          correct: 1,
          feedback: "Authentication tells you who the user is. But if your SELECT query for notes doesn't include WHERE user_id = req.user.id, it returns all notes regardless of who's asking. Authentication without data scoping is incomplete. Every query that returns user-owned data must filter by the authenticated user's identifier."
        },
        checklist: ["Users can register with email and password — passwords are hashed with bcrypt", "JWTs are generated on login and sent to the client — I can explain each part of the token", "Protected routes verify the JWT in middleware before the handler runs", "Notes are filtered to show only the authenticated user's data", "If I log in as User A, I cannot see User B's notes — I tested this explicitly"]
      },
      {
        id: "5-13",
        title: "Deploying It Live",
        body: `Deploy the complete authenticated notes application to production. This is not a practice run — it's a real deployed application with real authentication and real data persistence.

Backend to Railway or Render. Database to Supabase or PlanetScale (both have free tiers sufficient for this project). Frontend to Netlify or Vercel. Set every environment variable in the platform dashboards: DATABASE_URL, JWT_SECRET, the frontend API base URL, and CORS origin.

Test the deployed app end-to-end after deployment: register a new account using the live URL, create a note, log out, log back in, confirm the note is still there. Then register a second account and confirm the first account's notes are not visible. If anything breaks, check the deployment logs — they contain the exact error.

Share the URL. Not because it's required, but because a deployed, working, authenticated full stack application is something worth showing. This is not beginner-level work. A production-ready notes application with authentication is something many developers with years of experience have never built cleanly from scratch.

Monitor it for 24 hours after deployment. Watch the logs. Note what errors appear in real usage that you didn't catch in development. Fix them. This is the production feedback loop that makes software better.`,
        callout: {
          type: "default",
          label: "This Is Real",
          text: "A deployed full stack application with user authentication and a real database is a production-grade project. It has the same architecture as the internal tools used at companies you've heard of. The scale is different. The architecture is not."
        },
        callout2: {
          type: "focus",
          label: "Environment Variables Are Critical",
          text: "The most common production deployment failure is a missing environment variable. Before deploying, make a list of every variable in your .env file. Confirm every single one is set in the platform dashboard. A missing JWT_SECRET or DATABASE_URL will cause immediate startup failure."
        },
        hint: `The deployed app works but database changes aren't persisting.

<strong>Try this:</strong> Check that your production DATABASE_URL points to the hosted database (Supabase or PlanetScale), not to localhost. If it points to localhost, the server is trying to connect to a database on its own machine rather than the hosted one. This is a common mistake when copying local environment variables to production.

<strong>Still stuck?</strong> Add a log at application startup that prints (safely) which database host is being connected to. Never log the full connection string, but logging the host is enough to confirm you're connecting to the right place.`,
        quiz: {
          question: "After deploying, the app registers users but their notes disappear after a few hours. What is the most likely cause?",
          options: ["JWTs expire after a few hours, deleting the user's data", "The backend is using an in-memory array instead of the database, and the server restarts periodically", "The database has a scheduled cleanup job running", "The frontend is clearing localStorage on page load"],
          correct: 1,
          feedback: "Cloud platforms restart your server process periodically (for updates, scaling, or failure recovery). An in-memory array is wiped clean on every restart. If notes disappear periodically, the backend is storing them in memory instead of the database. This is exactly why in-memory storage is only acceptable for development — production requires a persistent database."
        },
        checklist: ["The backend is deployed to Railway or Render and running correctly", "The database is hosted on a managed service — not running locally", "The frontend is deployed to Netlify or Vercel and connected to the production API", "All environment variables are set in the production platforms — I can verify this without looking at code", "The complete app works end-to-end on the live URLs with two separate user accounts"]
      },
      {
        id: "5-14",
        title: "Solo Full Stack Project",
        body: `Design and build a full stack application from scratch. No scaffold, no starter code, no prescribed idea. Yours completely.

The requirements are structural: a frontend (HTML/CSS/JS or React), a backend (Node/Express or another language if you've explored one), a database, user authentication, and deployment. The idea is yours. It should be something you would actually use or that solves a real problem you've encountered.

The complexity target is honest: more complex than the notes app, less complex than Airbnb. That's a wide range. Ideas that fit: a expense tracker that splits bills between friends, a recipe manager that generates shopping lists, a habit tracker with streaks, a link organiser with tags and search, a reading list with notes per book. All of these are within reach. All of them are worth building.

Timeline: 3-4 weeks at full session intensity. This is a real project that takes real time. Resist the urge to rush the planning phase — the decisions you make before writing code determine how hard the last 40% is.

When it's deployed: write a README that explains what the application does, the technical decisions you made (why this database, why this architecture), and what you'd do differently. This written reflection is as valuable as the code — it's evidence of how you think, not just what you can build.`,
        callout: {
          type: "default",
          label: "The Planning Phase",
          text: "Before writing code: define the data model (what tables, what columns, what relationships). Define the API (what endpoints, what they accept, what they return). Sketch the UI (even rough boxes on paper). Three hours of planning prevents three days of refactoring."
        },
        callout2: {
          type: "focus",
          label: "Scope Ruthlessly",
          text: "Every feature you add to the spec is time you're committing to. Start with the minimum version: the smallest set of features that makes the application genuinely useful. Build that first. Deploy it. Then add features from a position of working software rather than an incomplete prototype."
        },
        hint: `The project feels too big to start.

<strong>Try this:</strong> Write the database schema first — just the CREATE TABLE statements. No code, no server, no frontend. Just the data model. If you can define what data the application stores, you understand the application. The schema is the clearest expression of what the system does.

<strong>Still stuck?</strong> Build the most boring version first. Ignore design, ignore edge cases, ignore optimisation. Get one thing working end-to-end: create one record through the API and see it in the database. That first working vertical slice is the hardest part. Everything after it is extending something that already works.`,
        quiz: {
          questions: [
            {
              question: "A user signs up. Walk through the complete server-side flow: what happens from POST /api/auth/register to the response?",
              options: [
                "Receive credentials → store plain text password → create session → return user object",
                "Receive credentials → validate input → check email isn't taken → hash password with bcrypt → insert user record → generate JWT → return token",
                "Receive credentials → forward to auth provider → receive token → store in database → return to client",
                "Receive credentials → create user immediately → hash password in the background after responding"
              ],
              correct: 1,
              feedback: "Registration flow: validate input (required fields, email format) → check email uniqueness → hash password with bcrypt (never store plain text) → INSERT user record → generate JWT → return { token, user }. Hashing must happen before the database insert, not after. Validation must happen before everything else."
            },
            {
              question: "A database query is slow. What should you do before optimising?",
              options: [
                "Add an index on every column — more indexes always improve performance",
                "Run EXPLAIN ANALYZE before the query to see the execution plan and identify where time is spent",
                "Rewrite the query in raw SQL even if you're using an ORM",
                "Increase the connection pool size to handle more queries in parallel"
              ],
              correct: 1,
              feedback: "Profile before optimising. EXPLAIN ANALYZE (in PostgreSQL) shows the execution plan: which indexes are used, where sequential scans happen, where time is spent. You might find the slow part is not what you expected. Adding indexes to the right columns often fixes performance in minutes. Adding random indexes without profiling can actually slow down writes."
            },
            {
              question: "Your Express API is running on localhost:3000 and your React frontend is on localhost:5173. The fetch call fails with a CORS error. Where do you fix this?",
              options: [
                "In the React fetch call — add mode: 'no-cors'",
                "In the browser — whitelist localhost:3000 in security settings",
                "On the Express server — install the cors package and use app.use(cors({ origin: 'http://localhost:5173' }))",
                "In package.json — add a proxy field that routes API calls"
              ],
              correct: 2,
              feedback: "CORS is enforced by the browser. The fix is always server-side: the server must allow the frontend's origin in its response headers. The cors package makes this trivial: app.use(cors({ origin: 'http://localhost:5173' })). In production, replace with your deployed frontend URL. mode: 'no-cors' prevents you from reading the response — it's not a fix."
            },
            {
              question: "Your Node.js app works locally but fails to start on Railway with 'address already in use'. What is the most likely cause?",
              options: [
                "The app is hardcoded to port 3000 instead of using process.env.PORT",
                "Railway doesn't support Node.js",
                "The package.json is missing a start script",
                "The database connection string is wrong"
              ],
              correct: 0,
              feedback: "Cloud platforms assign a dynamic port via the PORT environment variable. Your app must listen on process.env.PORT. If hardcoded to 3000, the platform routes traffic to a different port — the app starts but is unreachable. Fix: app.listen(process.env.PORT || 3000). This is the most common reason a Node.js app works locally but fails on a cloud platform."
            },
            {
              question: "You're debugging: the frontend makes a POST request but the backend receives an empty req.body. List the debugging steps in order.",
              options: [
                "Restart the server → clear the browser cache → try a different browser",
                "Check that express.json() middleware is registered → verify the fetch call sets Content-Type: application/json → verify JSON.stringify is called on the request body → check Network tab for the actual request sent",
                "Add more console.log statements → search Stack Overflow → ask a teammate",
                "Rewrite the endpoint to use GET instead of POST"
              ],
              correct: 1,
              feedback: "Systematic debugging: (1) Is express.json() registered before the route? (2) Does the fetch call include 'Content-Type': 'application/json'? (3) Is JSON.stringify called on the body? (4) Open Network tab → find the request → check the Request Headers and Payload tabs to see exactly what was sent. Each step eliminates a possible cause. Random guessing wastes time."
            }
          ]
        },
        checklist: ["I planned the data model before writing any code — tables/collections and relationships", "The application has working frontend, backend, database, and authentication", "It is deployed and accessible via a public URL anyone can visit", "The README explains what the app does, why I built it, and how to run it locally", "I'm proud of it and would show it to a potential employer as evidence of what I can build"]
      },
      {
        id: "5-testing",
        title: "Testing Your Application",
        body: `Untested code is code you can only trust by running it. As applications grow, manual testing becomes impossible — you can't click every path after every change. Automated tests do it for you, in seconds, every time.\n\nThe three levels of testing: <strong>unit tests</strong> test one function in isolation, with no database, no network, no UI. You call the function with known inputs and assert the output matches expectations. Fast to write, fast to run, cheap to maintain. <strong>Integration tests</strong> test multiple pieces working together — your API endpoint plus the database it writes to, or your frontend component plus the API it calls. <strong>End-to-end tests</strong> simulate a real user in a real browser clicking through real flows. Slow to write, slow to run, but catch problems the other levels miss.\n\nFor Node.js and JavaScript, <strong>Jest</strong> is the dominant testing framework. The pattern is always the same: describe a unit, list test cases, call the function, assert the result.\n\n<pre style="background:#0f0f0f;border-radius:6px;padding:12px;font-size:12px;line-height:1.7;overflow:auto"><code>// sum.js\nfunction sum(a, b) { return a + b; }\nmodule.exports = sum;\n\n// sum.test.js\nconst sum = require('./sum');\n\ntest('adds positive numbers', () => {\n  expect(sum(2, 3)).toBe(5);\n});\n\ntest('handles negative numbers', () => {\n  expect(sum(-1, 1)).toBe(0);\n});</code></pre>\n\nThe most important principle: test behaviour, not implementation. Don't test that a function calls another function internally — test that given these inputs, the visible output is correct. Tests tied to implementation break every refactor. Tests tied to behaviour survive them.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — if you have a function that formats a currency amount (e.g. <code>formatCurrency(1050)</code> → <code>'£1,050.00'</code>), what are three edge cases you should write tests for beyond the basic happy path?</div>\n\nFor API integration testing, tools like <strong>Supertest</strong> let you make HTTP requests to your Express app in tests without starting a real server. You can test your routes, your middleware, your error responses — all without deployment.\n\nWhat not to test: don't test library code (someone else already did), don't test trivial getters and setters, don't chase 100% coverage as a metric. Coverage is a tool for finding what you missed — it's not the goal. A test suite with 70% coverage and meaningful assertions beats one with 100% coverage and useless ones.`,
        callout: {
          type: "default",
          label: "The Confidence Argument",
          text: "Tests don't prove code is correct — they prove it behaves correctly under the scenarios you thought to test. The value is confidence: when you refactor, add features, or fix bugs, your tests tell you within seconds whether you've broken existing behaviour. Without tests, every change is a guess."
        },
        callout2: {
          type: "focus",
          label: "Where to Start",
          text: "Don't try to retrofit tests to an existing untested codebase all at once. Start with the most critical path: what would be worst to break? Write tests for that first. Then, as a rule: when you fix a bug, write a test that would have caught it. Over time, the coverage grows where it matters most."
        },
        hint: `You're writing a test and it's hard to write because the function depends on a database call or an API call.\n\n<strong>Try this:</strong> Extract the pure logic from the function. A function that fetches users and formats their names can be split into fetchUsers() and formatNames(names). You test formatNames() with pure arrays — no database needed. Difficult-to-test code is usually code that's doing too many things.\n\n<strong>Mocking:</strong> When you must test code that calls an API or database, use Jest mocks to replace the real call with a fake one that returns controlled data. jest.fn() creates a mock function. jest.mock('./database') replaces the whole module. Mocks let you test logic without real infrastructure.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#a78bfa;margin-bottom:4px}
p{color:#666;margin-bottom:20px;font-size:12px}
.suite{background:#111;border:1px solid #222;border-radius:8px;padding:16px;margin-bottom:12px}
.suite-title{color:#a78bfa;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
.test{display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;font-size:12px}
.pass{color:#4ade80}.fail{color:#f87171}
.test-name{color:#ccc}
.run-btn{background:#a78bfa;color:#000;border:none;border-radius:6px;padding:10px 20px;font-family:inherit;font-size:13px;cursor:pointer;font-weight:600;margin-bottom:20px}
.run-btn:hover{background:#c4b5fd}
#results{display:none}
.summary{margin-top:12px;color:#666;font-size:12px}
</style></head><body>
<h2>Mini Test Runner</h2>
<p>Click Run Tests to execute the test suite against the functions below</p>
<button class="run-btn" onclick="runAllTests()">Run Tests</button>
<div id="results"></div>
<script>
// --- Code Under Test ---
function formatCurrency(amount) {
  if (typeof amount !== 'number') return 'Invalid';
  return '£' + amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

// --- Mini Test Framework ---
const suites = [];
function describe(name, fn) { const s={name,tests:[]}; suites.push(s); const t=(n,f)=>s.tests.push({name:n,fn:f}); fn(t); }
function expect(val) {
  return {
    toBe: exp => ({ ok: val===exp, msg: 'expected '+JSON.stringify(val)+' to be '+JSON.stringify(exp) }),
    toEqual: exp => ({ ok: JSON.stringify(val)===JSON.stringify(exp), msg: 'expected '+JSON.stringify(val)+' to equal '+JSON.stringify(exp) }),
    toBeTruthy: () => ({ ok: !!val, msg: 'expected '+JSON.stringify(val)+' to be truthy' })
  };
}

// --- Test Suites ---
describe('formatCurrency', t => {
  t('formats whole number', () => expect(formatCurrency(1000)).toBe('£1,000.00'));
  t('formats decimal', () => expect(formatCurrency(9.5)).toBe('£9.50'));
  t('handles zero', () => expect(formatCurrency(0)).toBe('£0.00'));
  t('rejects non-number', () => expect(formatCurrency('abc')).toBe('Invalid'));
  t('formats large amount', () => expect(formatCurrency(1234567)).toBe('£1,234,567.00'));
});

describe('clamp', t => {
  t('returns value within range', () => expect(clamp(5, 0, 10)).toBe(5));
  t('clamps below min', () => expect(clamp(-5, 0, 10)).toBe(0));
  t('clamps above max', () => expect(clamp(15, 0, 10)).toBe(10));
  t('handles equal to min', () => expect(clamp(0, 0, 10)).toBe(0));
});

describe('truncate', t => {
  t('returns short strings unchanged', () => expect(truncate('Hello', 10)).toBe('Hello'));
  t('truncates long strings with ellipsis', () => expect(truncate('Hello World', 8)).toBe('Hello...'));
  t('handles exact length', () => expect(truncate('Hi', 2)).toBe('Hi'));
});

function runAllTests() {
  let passed=0, failed=0, html='';
  suites.forEach(s => {
    html += '<div class="suite"><div class="suite-title">'+s.name+'</div>';
    s.tests.forEach(t => {
      try {
        const r = t.fn();
        if (!r || r.ok) { html+='<div class="test"><span class="pass">PASS</span><span class="test-name">'+t.name+'</span></div>'; passed++; }
        else { html+='<div class="test"><span class="fail">FAIL</span><span class="test-name">'+t.name+' — '+r.msg+'</span></div>'; failed++; }
      } catch(e) { html+='<div class="test"><span class="fail">ERR</span><span class="test-name">'+t.name+' — '+e.message+'</span></div>'; failed++; }
    });
    html += '</div>';
  });
  const el = document.getElementById('results');
  el.style.display='block';
  el.innerHTML = html + '<div class="summary">'+passed+' passed, '+failed+' failed</div>';
}
<\/script></body></html>`,
          challenges: [
            "Add a test for formatCurrency(-10) — what should negative currency return?",
            "Make the truncate function fail a test by introducing a bug, then fix it",
            "Add a new function isPalindrome(str) and write at least 4 tests for it",
            "Add a test that you know will fail — observe how the failure message looks"
          ]
        },
        quiz: {
          question: "You write a unit test that asserts a function calls another internal function. Then you refactor to use a different internal approach but the output stays identical. The test fails. What does this tell you?",
          options: [
            "The refactor broke something — the test is correctly catching the regression",
            "The test is testing implementation details rather than behaviour — it should be rewritten to assert on outputs",
            "Unit tests should always be rewritten after every refactor",
            "The failing test means the refactor was wrong and should be reverted"
          ],
          correct: 1,
          feedback: "A test that breaks when behaviour hasn't changed is testing implementation, not behaviour. Tests should assert: 'given these inputs, the output is X.' They shouldn't care about how the function produces that output internally. Tests tied to implementation are brittle — they make refactoring expensive without adding safety. Rewrite the test to verify the output, not the internals."
        },
        checklist: [
          "I can explain the difference between unit, integration, and end-to-end tests — and when to use each",
          "I can write a Jest-style test suite with at least three test cases for a pure function",
          "I test behaviour (inputs → outputs) not implementation (which functions are called internally)",
          "I know what a mock is and can describe when you'd use one",
          "I've identified the three most critical paths in one of my projects and written tests for them"
        ]
      },
      {
        id: "5-security",
        title: "Security in Practice",
        body: `Security is not a feature you add at the end. Every input your application accepts from the outside world is an attack surface. The vulnerabilities below are responsible for the majority of real-world breaches — not because developers are careless, but because they didn't know what to look for.\n\n<strong>Cross-Site Scripting (XSS)</strong> happens when you render user-supplied text as HTML instead of as a string. A user submits: <code>&lt;script&gt;document.cookie='stolen='+document.cookie&lt;/script&gt;</code> as their username. Your app renders that as HTML. Their script runs in every other user's browser, stealing session cookies.\n\nFix: never use <code>innerHTML</code> with user data. Use <code>textContent</code> instead — it renders the string as text, not markup. In templating engines, use the safe output syntax (e.g. <code>{{name}}</code> not <code>{{{name}}}</code> in Handlebars).\n\n<strong>SQL Injection</strong> happens when user input is concatenated directly into a SQL query. A login form with username=<code>admin' OR '1'='1</code> can bypass authentication entirely if the query is built as: <code>'SELECT * FROM users WHERE username = '' + input + '''</code>.\n\nFix: always use parameterised queries (prepared statements). <code>db.query('SELECT * FROM users WHERE username = ?', [input])</code> — the database treats the parameter as data, never as SQL. Never concatenate user input into SQL strings.\n\n<strong>Cross-Site Request Forgery (CSRF)</strong> tricks a logged-in user's browser into making requests to your server without their knowledge. A hidden form on a malicious website, when loaded by someone logged into your bank, can submit a transfer.\n\nFix: CSRF tokens — include a secret, unique token in every form that your server validates. The malicious site doesn't have the token and can't forge it. Express uses csurf middleware, or modern frameworks handle it automatically.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — look at the notes app you built in Floor 5. Which of these three vulnerabilities does it currently protect against? Which does it not?</div>\n\n<strong>The broader principle:</strong> Never trust input from the client. Validate on the server, escape on output, use parameterised queries for data access. Security is a mindset applied to every piece of data that crosses a trust boundary.`,
        callout: {
          type: "default",
          label: "The OWASP Top 10",
          text: "The Open Web Application Security Project maintains the OWASP Top 10 — the ten most critical web application security risks, updated every few years based on real vulnerability data. XSS, SQL injection, and broken authentication are perennial entries. Reading the current OWASP Top 10 once is worth an hour of your time."
        },
        callout2: {
          type: "focus",
          label: "innerHTML Is Dangerous",
          text: "The single most common XSS mistake in JavaScript is using innerHTML to render user-provided content. Every time you write element.innerHTML = userInput, ask: is this string something a user typed, clicked, or submitted? If yes, use textContent instead, or sanitise with DOMPurify before rendering."
        },
        hint: `You're not sure if your application is vulnerable to XSS.\n\n<strong>Quick test:</strong> Find any input field or URL parameter your app renders back on screen. Submit the string <code>&lt;b&gt;test&lt;/b&gt;</code>. If the word "test" appears bold on screen, you're rendering HTML and you're vulnerable to XSS. If it appears literally as &lt;b&gt;test&lt;/b&gt; on screen, you're escaping correctly.\n\n<strong>For SQL injection:</strong> Look at every database query in your codebase. If you see string concatenation (+ or template literals) inside the query string, that's the vulnerability. Replace with parameterised queries.\n\n<strong>Never test security vulnerabilities on systems you don't own</strong> — test only on your own local application.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#f87171;margin-bottom:4px}
p{color:#666;margin-bottom:20px;font-size:12px}
.demo{background:#111;border-radius:8px;padding:16px;margin-bottom:16px}
.demo-title{font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
.vulnerable{border:1px solid #7f1d1d}.safe{border:1px solid #14532d}
.vulnerable .demo-title{color:#f87171}.safe .demo-title{color:#4ade80}
input{width:100%;background:#1a1a1a;border:1px solid #333;border-radius:4px;padding:8px;color:#fff;font-family:inherit;font-size:12px;box-sizing:border-box;margin-bottom:8px}
button{background:#333;color:#fff;border:none;border-radius:4px;padding:6px 14px;font-family:inherit;font-size:12px;cursor:pointer;margin-bottom:8px}
button:hover{background:#444}
.output{background:#0f0f0f;border-radius:4px;padding:10px;min-height:36px;font-size:12px;border:1px solid #222}
.vuln-label{color:#f87171;font-size:11px;margin-top:4px}
.safe-label{color:#4ade80;font-size:11px;margin-top:4px}
</style></head><body>
<h2>XSS: Vulnerable vs Safe Rendering</h2>
<p>Type some text — including HTML tags — and see the difference</p>
<div class="demo vulnerable">
<div class="demo-title">Vulnerable: using innerHTML</div>
<input id="v-input" type="text" placeholder="Try: &lt;b&gt;bold&lt;/b&gt; or &lt;em style='color:red'&gt;red&lt;/em&gt;" value="<b>This text is bold</b>">
<button onclick="renderVulnerable()">Render with innerHTML</button>
<div class="output" id="v-output"></div>
<div class="vuln-label">⚠ HTML is being interpreted — an attacker could inject scripts</div>
</div>
<div class="demo safe">
<div class="demo-title">Safe: using textContent</div>
<input id="s-input" type="text" placeholder="Same input, safe output" value="<b>This text is bold</b>">
<button onclick="renderSafe()">Render with textContent</button>
<div class="output" id="s-output"></div>
<div class="safe-label">✓ HTML tags are displayed as literal text — no injection possible</div>
</div>
<script>
function renderVulnerable() {
  document.getElementById('v-output').innerHTML = document.getElementById('v-input').value;
}
function renderSafe() {
  document.getElementById('s-output').textContent = document.getElementById('s-input').value;
}
renderVulnerable(); renderSafe();
<\/script></body></html>`,
          challenges: [
            "Try typing <img src=x onerror=\"alert('XSS')\"> in the vulnerable input — what happens?",
            "Try the same string in the safe input — confirm it appears as literal text",
            "Add a third demo showing DOMPurify sanitisation (safe innerHTML with a library)",
            "Add a 'SQL Injection' demo section showing a vulnerable string-concatenated query vs a parameterised one"
          ]
        },
        quiz: {
          question: "A login form builds a SQL query: 'SELECT * FROM users WHERE email = '' + email + '' AND password = '' + password + '''. A user submits email = <code>admin@site.com' --</code>. What happens?",
          options: [
            "The query returns no results because the email is invalid",
            "The -- comments out the password check, returning the admin user without a correct password",
            "SQL rejects the query because of the apostrophe syntax",
            "The application crashes with an unhandled exception"
          ],
          correct: 1,
          feedback: "The -- in SQL is a comment delimiter. The constructed query becomes: SELECT * FROM users WHERE email = 'admin@site.com' -- AND password = '...'. Everything after -- is ignored. The password check is commented out. The query returns the admin user. The attacker logs in without knowing the password. Parameterised queries prevent this entirely — the parameter is treated as data, not SQL syntax."
        },
        checklist: [
          "I can explain XSS, SQL injection, and CSRF to a non-technical person using a real-world analogy",
          "I never use innerHTML with user-supplied data — I use textContent or sanitise first",
          "Every database query in my projects uses parameterised queries, not string concatenation",
          "I can perform a basic XSS test on my own application (the <b>test</b> technique) and know what a vulnerable result looks like",
          "I've audited at least one project I built this floor for the three vulnerabilities covered here"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Specialisation",
    subtitle: "Finding your lane and going deep",
    color: "#c8967e",
    duration: "3-4 months",
    sessions: "5 per week",
    length: "90 min",
    tag: "Floor 06 \u2014 Direction",
    sections: [
      {
        id: "6-1",
        title: "The Fork in the Road",
        body: `You've reached the point where "web developer" is no longer a precise enough description. The skills you have now \u2014 HTML, CSS, JavaScript, basic backend, databases \u2014 are the foundation. What you build on top of that foundation is your choice. And the choice matters more than most people tell you.\n\nSpecialisation is not about closing doors. It's about going deep enough in one direction to become genuinely valuable. Netflix doesn't hire "web developers." They hire frontend engineers who know React's reconciliation algorithm, or backend engineers who understand distributed consensus, or data engineers who can process petabytes. The title reflects the depth.\n\nThe main paths: <strong>frontend engineering</strong> (UI, browser performance, accessibility, design systems), <strong>backend engineering</strong> (APIs, databases, system design, infrastructure), <strong>mobile development</strong> (iOS, Android, or cross-platform), <strong>DevOps and cloud</strong> (infrastructure, deployment pipelines, reliability), <strong>data engineering</strong> (pipelines, warehousing, analytics), <strong>AI/ML engineering</strong> (model training, inference, deployment), and <strong>security engineering</strong> (application security, penetration testing, threat modelling).\n\nNone of these paths requires you to forget everything else. A backend engineer who understands CSS is more valuable than one who doesn't. A frontend engineer who can write a SQL query is easier to work with. What you're choosing is your primary depth \u2014 the area where you become expert rather than competent.\n\nThe practical advice: pick based on what you've enjoyed most so far, not what pays the most or what someone told you is "in demand." Demand shifts. Enjoyment is what keeps you grinding through the hard parts three years in.\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — think back over your projects. Which parts did you find yourself wanting to improve or extend beyond what was required? That pull is real data about where your interest lies.</div>`,
        callout: {
          type: "default",
          label: "Depth vs Breadth",
          text: "Early in your career, going deep in one area makes you more hireable than being average at three. Once you have your first role and real projects under your belt, you can expand deliberately. But the first job usually requires a clear answer to 'what do you specialise in?'"
        },
        callout2: {
          type: "focus",
          label: "The T-Shape Model",
          text: "The most effective engineers have a T-shaped skill set: deep expertise in one area (the vertical bar), with enough breadth to collaborate across the stack (the horizontal bar). You're building the vertical bar now. The horizontal bar fills in naturally over years of working with teammates who have their own vertical bars."
        },
        hint: `The question isn't which path is objectively best \u2014 it's which problems you find genuinely interesting. Frontend engineers care about how things feel and how fast they render. Backend engineers care about how systems hold together under load. Neither is superior. Both are essential.\n\n<strong>Honest self-audit:</strong> Look at the projects you've built so far. Which parts did you spend extra time on, beyond what was required? Which parts did you rush to get through? That pattern tells you something real.\n\n<strong>If you're still not sure:</strong> Spend one week going deep on frontend (build a complex UI component with state), and one week going deep on backend (build an API with authentication and a database). The week that felt like flow is the answer.`,
        quiz: {
          question: "A junior developer is choosing between frontend and backend specialisation. Their backend projects work correctly but they always find themselves spending extra time polishing the UI. What does this suggest?",
          options: ["They should specialise in backend because it's working correctly", "They should choose frontend because the extra time they spend on UI signals genuine interest", "They should stay generalist to keep all options open", "They should ask a recruiter what is most in demand"],
          correct: 1,
          feedback: "Where you voluntarily spend extra time \u2014 beyond what's required \u2014 is one of the most reliable signals of genuine interest. Interest drives the sustained effort that turns competence into expertise. A recruiter can tell you what's in demand this year; only you can tell you what you'll still enjoy working on in five years."
        },
        checklist: ["I can describe the main specialisation paths in two sentences each without looking anything up", "I can honestly name which parts of my past projects I found most engaging — not most impressive", "I've chosen a primary direction to focus on for this floor and can explain why", "I understand that specialisation means going deeper, not ignoring everything else", "I know I can change direction — this is a direction to explore, not a permanent identity"]
      },
      {
        id: "6-2",
        title: "Frontend Engineering",
        body: `Frontend engineering is harder than it looks from the outside. The browser is a hostile environment: inconsistent rendering across Safari, Chrome, Firefox and Edge, network requests that fail unpredictably, device widths that range from 320px to 2560px, users with screen readers, slow connections, and high expectations. Making something that works in all those conditions requires engineering.\n\nThe dominant tool is React, but React is not the job \u2014 it's a means to an end. The job is building interfaces that are fast, accessible, and maintainable. React's core idea is the component: a self-contained piece of UI with its own state and rendering logic. Spotify's "Now Playing" bar is a component. GitHub's code diff is a component. Airbnb's date picker \u2014 the one that has to handle time zones and disabled dates and keyboard navigation \u2014 is a notoriously complex component.\n\nState management is where frontend complexity lives. React's local useState hook handles component-level state. When that state needs to be shared across many components, you reach for Context, or a library like Redux or Zustand. The question is always: what is the minimum state needed to describe the UI, and where does it live? Answering this well is what separates frontend engineers from frontend coders.\n\nPerformance is measurable and professional frontend engineers measure it. The browser's Network tab shows every request and how long it takes. Lighthouse gives you a performance score with specific recommendations. Core Web Vitals \u2014 Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint \u2014 are what Google uses to rank pages. Instagram's feed loads images lazily, prioritises above-the-fold content, and pre-fetches the next page before you scroll to it. These are deliberate engineering decisions.\n\nAccessibility is not optional if you're engineering professionally. ARIA attributes, keyboard navigation, colour contrast ratios, focus management \u2014 these ensure your interface works for the estimated 15% of users who have some form of disability. Screen readers like VoiceOver and NVDA announce elements based on semantic HTML and ARIA roles. Building accessibly from the start is far easier than retrofitting it.`,
        callout: {
          type: "default",
          label: "Components Are Contracts",
          text: "A well-built component has a clear API: specific props it accepts, predictable behaviour, and no hidden dependencies. When you can use a component without reading its implementation \u2014 just its interface \u2014 that's good component design. This is what Airbnb and Spotify's design systems enforce at scale."
        },
        callout2: {
          type: "focus",
          label: "The Performance Gotcha",
          text: "React re-renders a component every time its state or props change. If a parent component re-renders, all its children re-render too, by default. This is usually fine. But if a child component is expensive to render, you reach for React.memo, useMemo, or useCallback. These are optimisation tools \u2014 reach for them when you measure a problem, not preemptively."
        },
        hint: `Frontend is not just making things look good \u2014 it's managing the gap between what designers draw and what the browser actually renders, across every possible device and network condition.\n\n<strong>If you're learning React:</strong> Don't start with Redux. Don't start with TypeScript. Start with useState and useEffect. Build five things using only those two hooks before reaching for anything else. The fundamentals compound into everything.\n\n<strong>Measure before optimising:</strong> The browser's Lighthouse tab can run a performance audit on any page in 30 seconds. Run it on your projects. Fix the things that score below 80. Learning to read Lighthouse output is more valuable than memorising React's reconciliation algorithm.`,
        quiz: {
          question: "A React component re-renders every time its parent re-renders, causing visible lag. What is the correct first step?",
          options: ["Rewrite the component using vanilla JavaScript", "Add React.memo to the component immediately", "Use the browser's Performance tab to confirm the render is actually causing the lag before optimising", "Move all state to Redux to prevent unnecessary re-renders"],
          correct: 2,
          feedback: "Optimisation without measurement is guesswork. React DevTools Profiler and the browser's Performance tab show exactly which renders are expensive and how much time they take. React.memo is only useful if the component is actually expensive \u2014 wrapping cheap components in memo adds overhead without benefit. Measure first, then decide whether and how to optimise."
        },
        checklist: ["I understand what React components are and can explain the difference between props and state", "I can explain when to lift state up and when to keep it local", "I've used the Network tab and Lighthouse to identify a performance bottleneck", "I understand semantic HTML and ARIA well enough to make a page accessible to a screen reader", "I've built a React application with multiple components sharing state"]
      },
      {
        id: "6-3",
        title: "Backend Engineering",
        body: `Backend engineering is the engineering of systems that users never directly see. The Stripe API that processes millions of payments daily, the GitHub API that serves billions of code requests, the Netflix recommendation engine that decides what 230 million users watch next \u2014 all backend. Invisible, foundational, and unforgiving of mistakes.\n\nThe core of backend work is designing APIs and the services behind them. A well-designed API is consistent, predictable, and hard to misuse. RESTful APIs use HTTP methods and status codes correctly, version their endpoints (/v1/, /v2/), and return errors with enough information to debug without exposing internal implementation. GraphQL takes a different approach: the client specifies exactly what data it needs, and the server returns exactly that \u2014 GitHub's API v4 is GraphQL.\n\nDatabases are where most backend complexity lives. Choosing between relational (PostgreSQL, MySQL) and non-relational (MongoDB, DynamoDB) depends on your data's structure and access patterns. Relational databases enforce referential integrity and make complex queries possible. Non-relational databases offer flexible schemas and horizontal scaling. Most systems use both: Airbnb uses MySQL for structured booking data and Redis for caching. Understanding indexing, query optimisation, and connection pooling is what separates senior backend engineers from junior ones.\n\nAuthentication and security are non-negotiable. Passwords must be hashed with bcrypt or Argon2 \u2014 never MD5, never SHA1, never stored plaintext. JWTs (JSON Web Tokens) handle session management in stateless APIs. Rate limiting prevents abuse. Input validation at every API boundary prevents injection attacks. Stripe's security team publishes their practices publicly; reading them is an education.\n\nScaling is the final layer. A backend that handles 100 users might need to handle 100,000. Horizontal scaling (more servers) requires stateless design. Caching frequently-accessed data in Redis or Memcached reduces database load. Message queues (RabbitMQ, SQS, Kafka) decouple services so one slow component doesn't block everything else. These patterns are what system design interviews test.`,
        callout: {
          type: "default",
          label: "Design APIs for Consumers",
          text: "An API's primary stakeholder is the developer who calls it, not the one who built it. The best APIs are self-documenting, consistent, and make wrong usage difficult. When you design an API, think about what a developer who has never seen your code will try to do with it. Make the obvious use case trivially easy."
        },
        callout2: {
          type: "focus",
          label: "The N+1 Query Problem",
          text: "Fetching a list of 50 users and then making a separate database query for each user's posts is 51 queries (1 + 50). This is the N+1 problem, and it's a silent performance killer that looks fine in development and catastrophic in production. ORM tools like Sequelize and Prisma have eager loading features that collapse this into 2 queries. Learn to spot it."
        },
        hint: `Backend work punishes assumptions. Every input is potentially malicious. Every external service can go down. Every database query can fail. The discipline of defensive programming \u2014 validating inputs, handling errors explicitly, timing out slow dependencies \u2014 is what makes backend systems reliable.\n\n<strong>Build a habit now:</strong> Every time you write a route handler, ask: what happens if the database is slow? What if the input is malformed? What if the external API call fails? Handle those cases before they happen in production.\n\n<strong>On SQL:</strong> Write raw SQL queries before using an ORM. Understand joins, indexes, and EXPLAIN ANALYZE before letting a library abstract them. ORM convenience has a cost \u2014 the cost is understanding what SQL it's generating. Know the SQL first.`,
        quiz: {
          question: "Your API endpoint returns a list of posts, and for each post you make a separate database query to get the author's name. In development with 10 posts this is fast. In production with 500 posts it's slow. What is happening?",
          options: ["Production servers are slower than development machines", "The N+1 query problem: 500 posts trigger 501 database queries instead of 2", "The database needs more indexes on the posts table", "The API response needs to be compressed with gzip"],
          correct: 1,
          feedback: "This is the N+1 query problem. 1 query fetches the posts, then N queries (one per post) fetch the author. With 500 posts that's 501 database round trips. The fix is eager loading: one JOIN query that fetches posts and their authors together. Every ORM has a way to do this. Learning to recognise this pattern saves significant production debugging time."
        },
        checklist: ["I can design RESTful API endpoints for a new feature before writing any code", "I can explain the difference between relational and document databases and choose correctly for a scenario", "I can explain password hashing, JWT auth, and three common API security vulnerabilities", "I can identify the N+1 query problem in code I didn't write and explain the fix", "I've built a backend API with auth, a real database, and proper error handling"]
      },
      {
        id: "6-4",
        title: "Full Stack vs Specialised",
        body: `The debate between being full stack and being specialised misses a more useful question: what does the market you're entering actually need? A startup with 5 engineers needs everyone to touch everything. An engineering org with 500 engineers has dedicated frontend, backend, data, and platform teams. The same person can be differently described as "full stack" or "frontend specialist" depending on which company they're talking to.\n\nFull stack means you can contribute meaningfully to both the frontend and backend of a product. Not equally expert in both \u2014 almost no one is \u2014 but capable enough to work across the codebase without being blocked. At a startup, this is enormously valuable. A full stack engineer who can take a feature from database schema to React component without handing off to anyone is a multiplier.\n\nSpecialisation means you go deep enough in one domain to tackle problems that generalists can't. A pure frontend specialist who knows every rendering optimisation, every browser quirk, every accessibility standard, and every design system pattern is exactly what a company like Figma or Linear needs for their editor. A pure backend specialist who understands distributed systems, consensus algorithms, and database internals is what Cockroach Labs or Cloudflare hires.\n\nThe practical career advice: start by being capable across the stack, then identify where you add the most value and go deeper there. Most engineers who call themselves "full stack" actually have a primary depth in one area \u2014 they're just also fluent enough in the other side to not be blocked. That's the realistic version of the term.\n\nSalary data doesn't settle this debate. Both paths can reach the same senior levels and compensation. The difference is how you get there: the full stack path rewards versatility and shipping, the specialist path rewards depth and the ability to solve very hard problems in a narrow domain.`,
        callout: {
          type: "default",
          label: "Context Determines Value",
          text: "At a 5-person startup, being the only person who can fix both the React component and the Postgres query is invaluable. At a 500-person company, being the person who can make the query 10x faster through careful indexing and query planning is invaluable. Know which context you're optimising for."
        },
        callout2: {
          type: "focus",
          label: "The Hidden Advantage of Full Stack",
          text: "Full stack engineers have a systems-level view that pure specialists sometimes lack. When you've written both the frontend code that makes an API call and the backend code that handles it, you understand latency, data shapes, and error propagation in ways that make you a better engineer on either side. The full stack experience is a foundation, not a ceiling."
        },
        hint: `Most job postings that say "full stack" actually mean "frontend-leaning with some backend capability." Most job postings that say "backend engineer" mean someone who can write an API endpoint and a SQL query. Read job descriptions literally, not aspirationally.\n\n<strong>Signal over noise:</strong> Look at the tech stack listed in job postings for roles you want. React + Node means different depths than React + Go + Kubernetes. The stack tells you what you actually need to know.\n\n<strong>Practical test:</strong> Can you build a complete feature end-to-end in your current skill set, touching both the UI and the server? If yes, you're functionally full stack. Whether you call it that on a CV is a positioning choice, not a technical one.`,
        quiz: {
          question: "A developer with strong React skills and intermediate Node.js skills is applying to a 6-person startup. Should they position themselves as a frontend specialist or full stack developer?",
          options: ["Frontend specialist, because specialisation always commands higher rates", "Full stack developer, because the startup's context requires cross-stack contribution and their skills cover both", "They should not apply until their Node skills match their React skills exactly", "Backend specialist, because that's the rarer and more in-demand skill"],
          correct: 1,
          feedback: "Positioning is context-dependent. A startup with 6 engineers needs people who can contribute across the stack. 'Intermediate Node.js' is enough to be unblocked on backend work. Calling yourself a frontend specialist in that context undersells your utility. In a larger company with dedicated teams, the same developer might more accurately position as a frontend engineer."
        },
        checklist: ["I can explain the real trade-offs between full stack and specialised roles — not just the labels", "I know which context I'm optimising for right now and can articulate why", "I've built at least one complete feature that touched both frontend and backend", "I can honestly assess where my primary depth lies today", "I understand that 'full stack' is a positioning choice relative to team context, not a fixed definition"]
      },
      {
        id: "6-typescript",
        title: "TypeScript: Why Teams Use It",
        body: `TypeScript is JavaScript with type annotations. Every JavaScript file is valid TypeScript. The difference is that TypeScript adds a compile step that checks your types before the code runs — catching a category of bugs that JavaScript would only surface at runtime, in production, when a user hits them.\n\nThe basic idea: instead of writing <code>function greet(name) { return 'Hello, ' + name; }</code>, you write <code>function greet(name: string): string { return 'Hello, ' + name; }</code>. You've declared that name must be a string and the function returns a string. TypeScript now enforces this everywhere greet is called — pass a number, get a compile-time error instead of a runtime bug.\n\nWhere TypeScript pays off most: large codebases with many contributors, functions that call functions that call functions, API responses being shaped and passed around, and refactoring. When you rename a property, TypeScript shows you every place in the codebase that uses the old name — instantly. In JavaScript you find out by testing, or by users reporting errors.\n\nThe interfaces feature is where experienced developers say TypeScript changes how they think. You define the shape of an object once:\n<code>interface User { id: number; email: string; role: 'admin' | 'member'; }</code>\nNow every function that accepts a User gets type-checked. If an API response adds a new field or changes a type, TypeScript tells you before you deploy.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Before you continue — in a JavaScript codebase with 50 files, if you rename a property from <code>user.name</code> to <code>user.fullName</code>, how would you find every place that uses it? How does TypeScript change that?</div>\n\nWhen should you use it? If you're building something that will grow, working in a team, or building a library other people will consume — TypeScript pays for itself quickly. If you're building a 200-line script for yourself, it may be overhead. The industry has largely moved toward TypeScript for production JavaScript — React, Node, Vue, and most major frameworks have first-class TypeScript support.`,
        callout: {
          type: "default",
          label: "TypeScript Doesn't Change JavaScript",
          text: "TypeScript compiles to plain JavaScript. Your users never see TypeScript — the browser runs the compiled JS. TypeScript is a development tool: it makes the experience of writing and maintaining JavaScript safer and more productive. The runtime is identical."
        },
        callout2: {
          type: "focus",
          label: "The Adoption Decision",
          text: "Most professional JavaScript teams use TypeScript today. When you join a team or contribute to an open source project, you'll encounter it. You don't need to master it now — understanding what it is and why it exists is enough for this stage. Floor 7 assumes TypeScript literacy."
        },
        hint: `The fastest way to start: open any JavaScript project and rename a file from <code>.js</code> to <code>.ts</code>. Run <code>npx tsc --noEmit</code>. TypeScript will immediately show you every place it has questions about your types. You don't have to fix all of them — they tell you where the most ambiguity lives in your code.\n\n<strong>Key terms to know:</strong> Type annotation (<code>: string</code>), interface (a named object shape), union type (<code>'admin' | 'member'</code>), generic (<code>Array&lt;User&gt;</code>), type inference (TypeScript guesses the type when you don't declare it).\n\n<strong>Still unclear why it matters?</strong> Try building a fetch call that returns user data and passes it through three functions. In JavaScript, each function has to trust that the shape is right. In TypeScript, each function checks the shape at compile time. The first time TypeScript catches a real bug you would have only found in production, the value is obvious.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:13px;line-height:1.7}
h2{color:#60a5fa;margin-bottom:16px}
.card{background:#111;border:1px solid #222;border-radius:8px;padding:16px;margin-bottom:12px}
.ts-label{color:#60a5fa;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
.js-label{color:#f59e0b;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
code{background:#1a1a1a;border-radius:4px;padding:2px 6px;color:#86efac;font-family:inherit;font-size:12px}
.error{color:#f87171}.ok{color:#4ade80}
</style></head><body>
<h2>TypeScript: Catching Bugs Before Runtime</h2>
<div class="card">
<div class="js-label">JavaScript — error only at runtime</div>
<pre style="color:#f59e0b;margin:0;font-size:12px">function greet(user) {
  return "Hello, " + user.name.toUpperCase();
}
greet(null); // TypeError at runtime — user is null</pre>
</div>
<div class="card">
<div class="ts-label">TypeScript — error at compile time</div>
<pre style="color:#86efac;margin:0;font-size:12px">interface User { name: string; }

function greet(user: User): string {
  return "Hello, " + user.name.toUpperCase();
}
// greet(null) → TS error: Argument of type 'null'
// is not assignable to parameter of type 'User'</pre>
</div>
<div class="card">
<div class="ts-label">Union types — valid values only</div>
<pre style="color:#86efac;margin:0;font-size:12px">type Role = 'admin' | 'member' | 'viewer';

function setRole(role: Role) {
  console.log("Role set to:", role);
}
// setRole('superuser') → TS error immediately
// setRole('admin') → compiles fine</pre>
</div>
<div id="demo" style="margin-top:16px"></div>
<script>
// This is compiled JS — types are stripped at runtime
// But we can demonstrate type-safety logic:
function validateRole(role) {
  const valid = ['admin', 'member', 'viewer'];
  const ok = valid.includes(role);
  document.getElementById('demo').innerHTML =
    '<p class="' + (ok ? 'ok' : 'error') + '">' +
    (ok ? '✓' : '✗') + ' Role "' + role + '" is ' + (ok ? 'valid' : 'INVALID — TypeScript would catch this at compile time') + '</p>';
}
validateRole('admin');
<\/script></body></html>`,
          challenges: [
            "Change validateRole('admin') to validateRole('superuser') and see the runtime validation fail",
            "Add a second role to the valid array and test it works",
            "Add a greet() function that takes a name parameter and returns 'Hello, ' + name",
            "What error would TypeScript show if you called greet(42) — where a number is passed instead of a string?"
          ]
        },
        quiz: {
          question: "A TypeScript function is declared as: function processUser(user: User): string. A colleague calls it with processUser(null). What happens?",
          options: [
            "The function runs normally — null is a valid JavaScript value",
            "TypeScript reports a compile-time error before the code runs, because null is not assignable to type User",
            "The function returns an empty string because null doesn't match User",
            "The error only appears if the function tries to access a property on user"
          ],
          correct: 1,
          feedback: "TypeScript checks types at compile time — before the code runs. Passing null where a User is expected is a type error that TypeScript reports immediately. In plain JavaScript, the error only surfaces when processUser(null) executes and tries to access user.name — at runtime, potentially in production. This is the core value of TypeScript: catching an entire category of bugs before deployment."
        },
        checklist: [
          "I can explain what TypeScript adds on top of JavaScript — in one sentence — without using the word 'better'",
          "I understand that TypeScript compiles to JavaScript and users never see TypeScript directly",
          "I can describe what a type annotation is and write a basic one from memory",
          "I can explain what an interface is and why defining object shapes explicitly helps in large codebases",
          "I understand why most professional JavaScript teams have adopted TypeScript and when it's worth the overhead"
        ]
      },
      {
        id: "6-5",
        title: "Mobile Development",
        body: `Mobile development is split into three camps and choosing between them is one of the most consequential decisions in this path. <strong>Native iOS</strong> (Swift + SwiftUI or UIKit), <strong>native Android</strong> (Kotlin + Jetpack Compose or XML layouts), and <strong>cross-platform</strong> frameworks (React Native, Flutter) each have genuine trade-offs that no amount of preference will make disappear.\n\nNative development gives you direct access to platform APIs, the best performance, and the tightest integration with OS features. The iOS app for Airbnb, the Android app for Spotify \u2014 these are built natively because the experience demands it. Features like widgets, live activities, background processing, and deep system integrations are easiest with native code. The cost is maintaining two codebases in two different languages and frameworks.\n\nReact Native lets you write JavaScript that renders native UI components. Facebook built it and uses it in production across Instagram and the Facebook app. The main promise is code sharing across platforms \u2014 in practice, a meaningful amount of platform-specific code is still needed. The performance is close to native for most use cases; the gap shows in animation-heavy or graphics-intensive apps.\n\nFlutter, Google's framework, uses the Dart language and renders every pixel itself rather than delegating to native components. This gives precise control over appearance and consistent cross-platform behaviour. Apps built with Flutter include Google Pay and eBay Motors. The framework is excellent; Dart is less widely known than JavaScript, which affects the talent pool and library ecosystem.\n\nThe practical choice: if you know JavaScript and want to get into mobile quickly, React Native has the lowest barrier. If you're committed to iOS specifically, Swift is worth learning from scratch. Flutter is worth considering if you want genuinely cross-platform with great visual control. All three paths lead to professional mobile roles.`,
        callout: {
          type: "default",
          label: "Mobile-First Is Not Mobile-Only",
          text: "Understanding mobile constraints \u2014 touch targets, network variability, battery usage, limited screen real estate \u2014 makes you a better engineer for any platform. Many concepts from mobile (offline-first design, efficient data fetching, responsive layouts) translate directly to web engineering."
        },
        callout2: {
          type: "focus",
          label: "App Store Distribution",
          text: "Shipping a mobile app involves a review process that web deployment doesn't. Apple's App Store review can take 24-48 hours. A critical bug fix in production can't be shipped in minutes like a web deploy \u2014 it waits for review. This changes how you think about feature flags, remote configuration, and testing before release."
        },
        hint: `The mobile ecosystem moves fast. APIs change, OS versions fragment, and review guidelines evolve. The skill that matters most isn't knowing the current API \u2014 it's knowing how to read official documentation and adapt quickly when things change.\n\n<strong>If starting React Native:</strong> Use Expo for the first few projects. It abstracts away the build tooling and lets you focus on the app. When you hit Expo's limits, you'll understand enough to eject with confidence.\n\n<strong>Test on real devices early:</strong> The simulator lies. Touch targets that feel fine with a mouse are unusable with a thumb. Animations that are smooth on a high-end simulator chug on a 3-year-old mid-range Android. Get a real device in hand as early as possible.`,
        quiz: {
          question: "A web developer who knows React well wants to build a mobile app that works on both iOS and Android. They have limited time to learn new tools. Which approach makes the most sense?",
          options: ["Learn Swift for iOS first, then Kotlin for Android", "Use React Native, leveraging their existing JavaScript and React knowledge", "Use Flutter because it has better performance than React Native", "Build a mobile-optimised website instead of a native app"],
          correct: 1,
          feedback: "React Native has the lowest barrier for an existing React developer. The component model, state management, and JavaScript are all transferable. The mobile-specific concepts (navigation, gestures, native APIs) are learnable incrementally. Starting with native Swift and Kotlin requires learning two new languages and two new ecosystems simultaneously \u2014 a steeper ramp for the same outcome."
        },
        checklist: ["I can explain the trade-offs between native (Swift/Kotlin) and cross-platform (React Native/Flutter) mobile development", "I've chosen a primary mobile path and can explain my reasoning", "I've built at least one mobile app that runs on a real physical device", "I understand the App Store / Play Store submission process at a conceptual level", "I know the key mobile constraints — touch targets, varied network quality, OS fragmentation — and how they affect design decisions"]
      },
      {
        id: "6-phase1-review",
        title: "Phase 1 Review — Specialisation Paths",
        body: `Five questions covering the specialisation fork — frontend, backend, full stack, and mobile — and how to choose a direction.`,
        quiz: {
          questions: [
            {
              question: "What is the primary distinction between frontend and backend engineering?",
              options: [
                "Frontend engineers earn less than backend engineers",
                "Frontend is what users see and interact with (browser/client); backend is the server, APIs, databases, and business logic users don't see",
                "Frontend uses JavaScript; backend uses Python — they never overlap",
                "Frontend development requires design skills; backend does not require any design knowledge"
              ],
              correct: 1,
              feedback: "Frontend: everything the user interacts with — browser-rendered HTML, CSS, JavaScript, state management, performance, accessibility. Backend: server logic, APIs, databases, authentication, security, data processing. The distinction is where the code runs (client vs server) and what problems it solves (UI vs data/logic)."
            },
            {
              question: "A company needs to build a new iOS and Android app. Which specialisation is most relevant?",
              options: [
                "Backend engineering — mobile apps just need good APIs",
                "Frontend engineering — the skills transfer directly",
                "Mobile development — React Native, Flutter, Swift, or Kotlin depending on requirements",
                "DevOps — mobile apps require special deployment pipelines"
              ],
              correct: 2,
              feedback: "Mobile development is its own specialisation: React Native and Flutter for cross-platform, Swift (iOS) and Kotlin (Android) for native. Frontend skills (components, state, events) transfer conceptually but the APIs, tooling, and deployment are completely different — App Store submissions, device testing, performance on constrained hardware."
            },
            {
              question: "What does 'full stack' mean in practice for a developer?",
              options: [
                "A full stack developer has mastered both frontend and backend and can work at the same level as specialists in both",
                "A full stack developer can work across both frontend and backend — useful for smaller teams, startups, and building complete features solo, but typically at less depth than specialists",
                "Full stack is a job title only — it doesn't describe a real skill set",
                "Full stack means working with all programming languages across all platforms"
              ],
              correct: 1,
              feedback: "Full stack means breadth across the entire application — frontend, backend, databases, deployment. Valuable at startups and for solo projects where one person needs to build everything. At scale, specialists go deeper. The trade-off is real: full stack developers are versatile but typically less deep than dedicated specialists. Many developers start full stack and specialise over time."
            },
            {
              question: "You love making interfaces feel fast, smooth, and delightful. You care deeply about what the user sees and how interactions feel. Which specialisation fits best?",
              options: [
                "Backend engineering — performance optimisation is primarily a server concern",
                "Data engineering — user interfaces are driven by data",
                "Frontend engineering — it's the specialisation focused entirely on user-facing experiences, performance, and interaction design",
                "DevOps — page load speed is an infrastructure problem"
              ],
              correct: 2,
              feedback: "Frontend engineering owns the user experience layer: rendering performance, animation, state management, accessibility, responsive design, and the feel of every interaction. If you're drawn to how interfaces look, feel, and perform — that's frontend. Backend solves different problems: data integrity, API design, concurrency, security."
            },
            {
              question: "How should you decide which specialisation to pursue at this stage of your career?",
              options: [
                "Choose the one with the highest average salary",
                "Build in all areas, notice which problems you find genuinely interesting rather than just tolerable, and specialise in that direction",
                "Ask a hiring manager which specialisation has the most open roles",
                "Choose the one that took you the least time to learn so far"
              ],
              correct: 1,
              feedback: "Specialisation follows interest and aptitude — both discovered through exposure, not chosen abstractly. Build full-stack features. Notice: do you find yourself wanting to improve the UI, or do you find yourself more interested in how data flows through the system? The specialisation that fits is the one where the problems feel interesting rather than just tasks to complete."
            }
          ]
        }
      },
      {
        id: "6-6",
        title: "DevOps and Cloud Infrastructure",
        body: `DevOps is the discipline of closing the gap between writing code and running code in production reliably. It emerged as a response to the old model where developers threw code "over the wall" to operations teams who deployed and maintained it. The dysfunction that model caused \u2014 slow releases, unclear ownership, production fires blamed on whoever touched last \u2014 drove the industry toward teams that own their software from commit to production.\n\nThe major cloud platforms \u2014 AWS, Google Cloud, Azure \u2014 provide the infrastructure that replaced physical servers. Instead of buying and racking hardware, you provision virtual machines, managed databases, object storage, and load balancers through an API or console. Netflix runs entirely on AWS and famously uses chaos engineering \u2014 deliberately causing failures in production \u2014 to test resilience. Airbnb uses AWS for its compute and Google BigQuery for analytics. Understanding how to use at least one cloud provider is now a baseline competency.\n\nContainers changed how software is packaged and deployed. Docker bundles your application and its dependencies into a container image that runs identically on any host. Kubernetes orchestrates containers at scale \u2014 scheduling them across machines, restarting failures, scaling up when load increases, and routing traffic. Spotify's backend services run in Kubernetes. Understanding containers is no longer optional for backend or DevOps engineers.\n\nCI/CD \u2014 Continuous Integration and Continuous Deployment \u2014 is the automation pipeline that takes code from a developer's branch to running in production. GitHub Actions, CircleCI, and Jenkins define the pipeline: run tests, build the container, push to a registry, deploy to staging, then production. A good CI/CD pipeline is what lets teams deploy dozens of times a day safely. Stripe reportedly deploys to production thousands of times per day.\n\nInfrastructure as Code (IaC) means defining your infrastructure in version-controlled configuration files rather than clicking through a console. Terraform lets you describe what AWS resources you need, and it creates them. Changing infrastructure becomes a code review, not a manual process. This is how teams keep infrastructure consistent across environments and recoverable after disaster.`,
        callout: {
          type: "default",
          label: "Own Your Deployment",
          text: "The shift from 'I write code' to 'I own this service in production' is one of the most important mental shifts in software engineering. Understanding how your code gets to users \u2014 containers, pipelines, health checks, rollbacks \u2014 makes you a fundamentally better developer even if DevOps is not your primary specialisation."
        },
        callout2: {
          type: "focus",
          label: "Start with One Cloud, One Tool",
          text: "AWS has over 200 services. Trying to learn all of them is how people give up. Start with EC2 (virtual machines), S3 (object storage), and RDS (managed databases). Get comfortable there. Add Lambda (serverless functions) when you have a use case. Add everything else only when a real problem requires it."
        },
        hint: `DevOps has the highest density of acronyms and tooling in any engineering discipline. The tools are not the job \u2014 they're how the job gets done. The underlying problems (reliability, deployability, observability) existed before any of these tools.\n\n<strong>Best first project:</strong> Take an application you've already built and deploy it properly: containerise it with Docker, run it on a cloud VM, put a reverse proxy (Nginx) in front of it, and add a GitHub Actions workflow that redeploys on every push to main. That end-to-end experience teaches more than any course.\n\n<strong>Learn to read logs:</strong> Every production system generates logs. Learning to grep, tail, and query logs \u2014 in CloudWatch, Datadog, or just a terminal \u2014 is how you diagnose problems after they've already happened. This is one of the highest-leverage DevOps skills.`,
        code: {
          lang: "HTML",
          starter: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a0a;color:#fff;font-family:'IBM Plex Mono',monospace;padding:24px;font-size:12px}
h2{color:#7eb8c8;margin-bottom:4px}
.sub{color:#555;font-size:11px;margin-bottom:20px}
.pipeline{display:flex;align-items:center;gap:4px;margin-bottom:24px;overflow-x:auto;padding-bottom:8px}
.stage{background:#111;border:1px solid #222;border-radius:8px;padding:14px 16px;min-width:120px;flex-shrink:0;text-align:center;cursor:pointer;transition:all 0.2s}
.stage:hover{border-color:#7eb8c8}
.stage.active{border-color:#7eb8c8;background:#0a1a2a}
.stage.ok{border-color:#2a4a2a;background:#0a1a0a}
.stage.fail{border-color:#4a2a2a;background:#1a0a0a}
.stage-icon{font-size:20px;margin-bottom:6px}
.stage-name{color:#888;font-size:10px;letter-spacing:1px;text-transform:uppercase}
.stage-status{font-size:10px;margin-top:4px}
.stage.ok .stage-status{color:#6dbf6d}
.stage.fail .stage-status{color:#ff6b6b}
.arrow{color:#333;font-size:18px;flex-shrink:0}
.detail{background:#111;border:1px solid #2a2a2a;border-radius:8px;padding:20px;margin-bottom:16px}
.detail h3{color:#c8a96e;font-size:13px;margin-bottom:12px}
.detail p{color:#aaa;line-height:1.7;font-size:12px;margin-bottom:8px}
.detail code{color:#c8a96e;background:#0a0a0a;padding:2px 6px;border-radius:3px;font-size:11px}
.controls{display:flex;gap:10px}
button{background:#7eb8c8;color:#000;border:none;border-radius:6px;padding:8px 18px;font-family:inherit;font-size:12px;cursor:pointer}
button:hover{background:#a8d8e8}
button.secondary{background:#333;color:#fff;border:1px solid #555}
button.secondary:hover{border-color:#7eb8c8;color:#7eb8c8}
</style></head><body>
<h2>CI/CD Pipeline</h2>
<p class="sub">Click a stage to learn about it. Press Run Pipeline to simulate a deployment.</p>
<div class="pipeline" id="pipeline"></div>
<div class="controls" style="margin-bottom:16px">
<button onclick="runPipeline()">▶ Run Pipeline</button>
<button class="secondary" onclick="showFail()">Simulate Failure</button>
</div>
<div class="detail" id="detail">
<h3>What is CI/CD?</h3>
<p>Continuous Integration (CI) automatically builds and tests every code change. Continuous Deployment (CD) automatically deploys passing builds to production.</p>
<p>The pipeline below runs on every push to main. If any stage fails, deployment stops and you get an alert. This is how professional teams ship code multiple times per day safely.</p>
</div>
<script>
var stages=[
  {icon:'📤',name:'Trigger',desc:'A git push to main triggers the pipeline via a webhook. GitHub sends a POST request to your CI server (GitHub Actions, CircleCI, Jenkins) with information about the commit.',yml:'on:\\n  push:\\n    branches: [main]'},
  {icon:'📦',name:'Install',desc:'Dependencies are installed fresh in a clean environment: npm ci (faster and stricter than npm install — uses package-lock.json exactly). This ensures the build is reproducible.',yml:'- run: npm ci'},
  {icon:'🔍',name:'Lint',desc:'Code is checked for style errors and potential bugs. ESLint catches issues before they reach review. If lint fails, the pipeline stops here — saving wasted test and deploy time.',yml:'- run: npm run lint'},
  {icon:'🧪',name:'Test',desc:'All automated tests run. Unit tests, integration tests, snapshot tests. If any test fails, the pipeline stops. No failures reach production.',yml:'- run: npm test -- --coverage'},
  {icon:'🏗️',name:'Build',desc:'The production build is created: TypeScript compiled, code minified, assets optimised. The output is a deployable artifact — the exact same build that will run in production.',yml:'- run: npm run build'},
  {icon:'🔒',name:'Security',desc:'Dependencies are scanned for known vulnerabilities (npm audit). Container images are scanned if used. SAST (Static Application Security Testing) checks the code for security issues.',yml:'- run: npm audit --audit-level=high'},
  {icon:'🚀',name:'Deploy',desc:'The build artifact is deployed to the target environment. Blue-green or rolling deployments mean zero downtime. Health checks confirm the new version is serving traffic before old instances are removed.',yml:'- run: railway deploy'},
];
var currentStage=-1;
var pipelineEl=document.getElementById('pipeline');
var detailEl=document.getElementById('detail');
function renderPipeline(failAt){
  pipelineEl.innerHTML=stages.map(function(s,i){
    var cls='stage';
    if(failAt!=null){if(i<failAt)cls+=' ok';else if(i===failAt)cls+=' fail';}
    else if(currentStage>=0){if(i<currentStage)cls+=' ok';else if(i===currentStage)cls+=' active';}
    var status='';
    if(failAt!=null){if(i<failAt)status='<div class="stage-status">✓ passed</div>';else if(i===failAt)status='<div class="stage-status">✗ failed</div>';}
    return '<div class="'+cls+'" onclick="showStage('+i+')">'+
      '<div class="stage-icon">'+s.icon+'</div>'+
      '<div class="stage-name">'+s.name+'</div>'+status+
      '</div>'+(i<stages.length-1?'<div class="arrow">→</div>':'');
  }).join('');
}
function showStage(i){
  var s=stages[i];
  detailEl.innerHTML='<h3>'+s.icon+' '+s.name+'</h3><p>'+s.desc+'</p>'+
    '<p style="margin-top:12px;color:#555;font-size:10px;letter-spacing:1px">YAML CONFIG</p>'+
    '<p><code>'+s.yml+'</code></p>';
}
function runPipeline(){
  currentStage=0;renderPipeline(null);
  detailEl.innerHTML='<h3>Pipeline running...</h3><p>Stages complete in green. Click any stage for details.</p>';
  function next(){currentStage++;renderPipeline(null);if(currentStage<stages.length)setTimeout(next,700);else{currentStage=-1;detailEl.innerHTML='<h3>✓ Deployed to production</h3><p>All '+stages.length+' stages passed. The new version is live.</p>';}}
  setTimeout(next,700);
}
function showFail(){
  var failAt=2+Math.floor(Math.random()*3);
  renderPipeline(failAt);
  detailEl.innerHTML='<h3>✗ Pipeline failed at '+stages[failAt].name+'</h3><p>Deployment was stopped. The previous version remains in production. Fix the failing stage and push again to retry.</p>';
}
renderPipeline(null);
</script></body></html>`,
          challenges: ["Add a step that randomly fails with a 30% chance and shows an error message in red", "Add a timer that shows total pipeline duration when complete", "Add a step counter showing '3 of 7 steps complete'", "Add a cancel button that stops the pipeline mid-run"]
        },
        quiz: {
          question: "A team deploys by manually SSHing into a server and running git pull. What is the primary problem with this approach?",
          options: ["SSH is a security risk and should never be used", "Manual deployments are error-prone, inconsistent, and not auditable \u2014 CI/CD automation solves all three", "git pull is slower than other deployment methods", "This approach doesn't support Docker containers"],
          correct: 1,
          feedback: "The problem is not SSH itself \u2014 it's the manual, human-dependent process. Someone can run the wrong branch, skip a migration, forget to restart a service, or deploy at the wrong time. CI/CD pipelines are automated, consistent, run only when tests pass, and produce an audit trail of every deployment. The reliability difference between the two approaches is enormous at scale."
        },
        checklist: ["I can explain what DevOps means and the core problems it exists to solve", "I can containerise an application with Docker and explain what a container is vs a virtual machine", "I've deployed something to a cloud platform and configured at least one infrastructure resource", "I can describe what a CI/CD pipeline does at each stage — from code push to production deploy", "I can explain what Infrastructure as Code means and why it matters for reliability"]
      },
      {
        id: "6-7",
        title: "Data Engineering",
        body: `Data engineering is the work of making data reliably available to the people and systems that need it. Not analysing the data \u2014 that's data science. Not building ML models \u2014 that's ML engineering. Data engineering is building and maintaining the pipelines, warehouses, and infrastructure that make all of that possible.\n\nThe core problem data engineers solve is that raw data is messy, scattered, and arrives at different rates. User events come from mobile apps. Orders come from the transaction database. Page views come from web analytics. Support tickets come from Zendesk. Each source has a different schema, different cadence, and different reliability characteristics. The data engineer's job is to pull all of this together \u2014 <strong>extract</strong> from source systems, <strong>transform</strong> into a consistent schema, and <strong>load</strong> into a warehouse where analysts can query it. This is ETL, and it is the foundation of data engineering.\n\nThe modern data stack has standardised around a set of tools. Fivetran or Airbyte handle extraction from common sources automatically. dbt (data build tool) handles SQL-based transformations, adding version control and testing to what used to be spaghetti SQL. Snowflake, BigQuery, or Redshift serve as the analytical warehouse. Airflow or Prefect orchestrate the pipelines \u2014 scheduling them, retrying failures, and sending alerts. Spotify uses a version of this stack internally; so does Airbnb, which open-sourced Apache Airflow from their internal tooling.\n\nData quality is where data engineers spend significant time. A pipeline that silently drops 10% of records, or that introduces a schema mismatch, or that duplicates events \u2014 these failures corrupt the data that analysts and ML models depend on. Data quality tools like Great Expectations and dbt tests add assertions: this column should never be null, this count should be within 5% of yesterday's count. When an assertion fails, the pipeline fails loudly rather than passing garbage downstream.\n\nStreaming vs batch is a fundamental architecture choice. Batch pipelines run on a schedule \u2014 every hour, every day \u2014 and process accumulated data. Streaming pipelines process events as they arrive, with latency measured in seconds. Kafka is the dominant streaming infrastructure. Flink and Spark Streaming process the Kafka events. Netflix uses streaming to update recommendations in near-real-time. Which you need depends entirely on how fresh the data needs to be.`,
        callout: {
          type: "default",
          label: "Bad Data Is Worse Than No Data",
          text: "An analysis based on incomplete or incorrect data produces confident wrong conclusions. Data quality is not a nice-to-have \u2014 it is the difference between a data team that adds value and one that erodes trust over time. Every pipeline should have assertions. Every transformation should be testable."
        },
        callout2: {
          type: "focus",
          label: "SQL Is the Core Skill",
          text: "Most data engineering work is SQL \u2014 complex SQL. Window functions, CTEs, incremental materialisation, query optimisation. The engineers who go deep on SQL and understand how query planners work are disproportionately effective in data roles. Python is important too, but SQL is the primary tool."
        },
        hint: `Data engineering rewards systems thinking. Every decision \u2014 batch or streaming, wide or narrow schema, early or late aggregation \u2014 has downstream consequences for the analysts and engineers who consume the data. Build with the consumer in mind.\n\n<strong>Start here:</strong> Build a pipeline that reads from a public API (weather, GitHub events, Reddit), stores the raw data, transforms it into a clean schema using SQL or dbt, and loads it into a SQLite or Postgres database. That end-to-end experience covers the entire data engineering lifecycle in miniature.\n\n<strong>Learn to love SQL:</strong> Before learning Spark or Kafka, write 50 SQL queries of increasing complexity. Window functions (ROW_NUMBER, LAG, LEAD) and CTEs are where data engineering SQL separates from basic SELECT. Spend the time.`,
        quiz: {
          question: "A data pipeline runs successfully every night but analysis teams notice their sales numbers change retroactively \u2014 yesterday's report shows different numbers today than it did yesterday. What is most likely happening?",
          options: ["The data warehouse is corrupted and needs to be rebuilt", "The pipeline is overwriting historical data on each run instead of appending or using incremental logic correctly", "The analysts are querying the wrong table", "The transformation SQL has a syntax error that appears randomly"],
          correct: 1,
          feedback: "Retroactive changes to historical data almost always indicate a pipeline overwrite problem. Pipelines that delete and recreate data on each run will reflect late-arriving data or corrected source records in historical periods. Whether that's correct depends on business requirements. Slowly Changing Dimensions (SCD) and immutable event logs are the data engineering patterns that control how historical data is handled."
        },
        checklist: ["I can explain the ETL pattern and give a real example of when each step applies", "I can write a SQL query with window functions and explain what they do", "I can explain what a data warehouse is and how it differs from a transactional database", "I understand what a pipeline orchestrator does — not just the name, but the problem it solves", "I've built a pipeline that extracts data from a source, transforms it, and loads it to a destination"]
      },
      {
        id: "6-8",
        title: "AI and ML Engineering",
        body: `AI engineering is distinct from AI research. Researchers discover new model architectures and training techniques. AI engineers take models \u2014 often pre-trained, often from third parties \u2014 and build reliable, scalable systems around them. The gap between a proof-of-concept that works on a laptop and a production system that handles 10 million requests per day is where AI engineering lives.\n\nThe most accessible entry point is the API layer. OpenAI, Anthropic, Google, and Cohere all expose powerful models through HTTP APIs. Building an application that calls these APIs, handles the responses, manages context, and delivers a useful experience is AI engineering at the application layer. Retrieval-Augmented Generation (RAG) \u2014 augmenting a language model with external knowledge by retrieving relevant documents and including them in the context \u2014 is the most widely deployed technique for making LLMs useful on specific data.\n\nVector databases (Pinecone, Weaviate, pgvector) store embeddings \u2014 high-dimensional numerical representations of text, images, or other data. Semantic search works by converting a query into an embedding and finding the database records with the closest embeddings. This is how Spotify's "search by mood" or Google's semantic search work. The engineering challenge is indexing millions of vectors and retrieving the most similar ones in milliseconds.\n\nDeploying and serving ML models introduces a set of engineering problems distinct from serving regular software. Models are large \u2014 sometimes gigabytes. Inference (running the model on new inputs) is compute-intensive. Latency requirements are strict. Model versioning, A/B testing between model versions, and monitoring for model drift (when production inputs differ from training data in ways that degrade performance) are all problems that don't exist in conventional software.\n\nThe engineering principles underneath AI systems are the same as all other systems: reliability, observability, testability, deployability. What's different is the probabilistic nature of model outputs. A conventional function returns the same output for the same input. A model doesn't. Evaluating model quality at scale, catching regressions before deployment, and monitoring live accuracy \u2014 these are the uniquely hard problems of AI engineering.`,
        callout: {
          type: "default",
          label: "Prompt Engineering Is Engineering",
          text: "How you phrase a prompt to an LLM dramatically affects the output quality. System prompts, few-shot examples, chain-of-thought instructions \u2014 these are not workarounds for bad models. They're the primary mechanism for controlling model behaviour. Treating prompt engineering as a first-class engineering concern, with version control and systematic evaluation, is what separates good AI products from bad ones."
        },
        callout2: {
          type: "focus",
          label: "Eval Before Deploy",
          text: "Before deploying any AI feature, define how you'll measure whether it's working. What does success look like? How will you know if a new model version is better or worse? An evaluation framework \u2014 a set of test cases with expected outputs \u2014 is the AI engineering equivalent of a test suite. Build the eval before building the feature."
        },
        hint: `The AI tooling landscape changes faster than almost any other area of engineering. A framework that was standard six months ago may be superseded. The fundamentals \u2014 embeddings, context windows, inference, retrieval \u2014 are stable. Build your mental model around the fundamentals, not the tools.\n\n<strong>Best first project:</strong> Build a RAG system over a document set you care about. Chunk the documents, embed them, store in a vector database, and build a query interface that retrieves relevant chunks and synthesises an answer. This covers the full AI engineering stack in miniature.\n\n<strong>On fine-tuning:</strong> Most production use cases don't need fine-tuned models. RAG and prompt engineering solve the majority of problems cheaper and more maintainably. Fine-tune only when you have a clearly defined task, high-quality labelled data, and evidence that base models with RAG can't achieve the required quality.`,
        quiz: {
          question: "An AI feature works well in testing but produces noticeably worse outputs for certain user queries in production. What is this phenomenon called and what is the correct response?",
          options: ["Overfitting \u2014 retrain the model on a larger dataset", "Model drift \u2014 analyse which input types are failing, add them to your evaluation suite, and investigate whether the model, prompt, or retrieval is the weak link", "API rate limiting \u2014 implement request queuing", "Context overflow \u2014 reduce the system prompt length"],
          correct: 1,
          feedback: "When model performance degrades on a subset of real-world inputs that weren't well represented in testing, this is a distribution mismatch \u2014 sometimes called model drift when it's the production environment shifting, or evaluation gap when the test suite didn't cover the real distribution. The correct response is to analyse failures, characterise the failing input types, add them to your evaluation suite, and diagnose whether the model, the prompt, or the retrieval step is the weak point."
        },
        checklist: ["I can explain the difference between AI research and AI engineering in one sentence each", "I can build a RAG pipeline using embeddings and a vector database — I've done it, not just read about it", "I can explain what model drift is and describe one approach to monitoring for it", "I've built an application using an LLM API with proper error handling and retry logic", "I understand why evaluations are essential before deploying AI features to production"]
      },
      {
        id: "6-9",
        title: "Security Engineering",
        body: `Security engineering is the discipline of building systems that resist attack. Not just knowing what vulnerabilities exist \u2014 every developer should know that \u2014 but deeply understanding how attackers think, how systems fail, and how to build software that fails safely when the inevitable compromise happens.\n\nThe OWASP Top 10 is the standard reference for web application vulnerabilities. Injection attacks (SQL injection, command injection) occur when untrusted input is executed as code. A query built by concatenating user input \u2014 <code>"SELECT * FROM users WHERE name = '" + username + "'"</code> \u2014 is an injection vector. Parameterised queries eliminate this class of vulnerability. Cross-Site Scripting (XSS) occurs when untrusted content is rendered as HTML, allowing attacker-controlled JavaScript to run in a user's browser. Output encoding prevents it. Broken authentication, insecure direct object references, security misconfiguration \u2014 these are the patterns behind the majority of real-world breaches.\n\nThreat modelling is the practice of systematically identifying what can go wrong in a system before building it. STRIDE \u2014 Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege \u2014 is a structured framework for thinking through threats. Who are the attackers? What are they trying to achieve? What access do they have? Where are the trust boundaries? Answering these questions before writing code is how security-conscious teams avoid being reactive.\n\nPenetration testing \u2014 attempting to compromise your own systems using attacker techniques \u2014 is how you validate that defences actually work. Tools like Burp Suite intercept and modify HTTP traffic, revealing how an application handles unexpected inputs. SQL injection can be tested by entering <code>' OR '1'='1</code> in input fields and observing the response. Responsible disclosure and bug bounty programs (GitHub, Stripe, and most major tech companies run them) allow external researchers to report vulnerabilities safely.\n\nAt the infrastructure level, security means least-privilege access (each component has only the permissions it needs), encrypted data at rest and in transit, comprehensive audit logging, and incident response planning. The Equifax breach (147 million records) came from an unpatched Apache Struts vulnerability. The Capital One breach came from a misconfigured AWS WAF. Both were preventable with engineering discipline.`,
        callout: {
          type: "default",
          label: "Never Trust Input",
          text: "Every piece of data that comes from outside your system \u2014 user input, API responses, file uploads, URL parameters, HTTP headers \u2014 is potentially adversarial. Validate at the boundary. Sanitise before storage. Encode before rendering. This single principle eliminates entire categories of vulnerabilities."
        },
        callout2: {
          type: "focus",
          label: "Security by Default",
          text: "The most effective security is built into the framework so developers don't have to think about it. Django's ORM uses parameterised queries by default. React escapes rendered content by default. Rails has CSRF protection on by default. Using frameworks that are secure by default reduces the surface area of human error."
        },
        hint: `The most dangerous security posture is assuming you're not a target. Small applications get compromised at scale by automated scanners that test every IP on the internet for known vulnerabilities. The scan doesn't care if your app has five users.\n\n<strong>Start with the OWASP Top 10:</strong> Read each category, understand the attack, and then look for that vulnerability class in code you've written. You will find things. That's the exercise.\n\n<strong>Set up a bug bounty mindset:</strong> When you finish building a feature, spend 30 minutes trying to break it. What happens if you inject quotes into form fields? What happens if you modify the URL parameters? What happens if you send a request without authentication? This habit catches more issues than any automated tool.`,
        quiz: {
          question: "A web application builds SQL queries by concatenating user input directly into the query string. An attacker enters \u2018 OR 1=1 -- as their username. What attack is this and what is the fix?",
          options: ["A brute force attack \u2014 add rate limiting to the login endpoint", "SQL injection \u2014 fix by using parameterised queries or prepared statements instead of string concatenation", "A CSRF attack \u2014 add CSRF tokens to all forms", "An XSS attack \u2014 encode all output before rendering it in HTML"],
          correct: 1,
          feedback: "This is SQL injection. The input \u2018 OR 1=1 -- breaks out of the quoted string context in SQL, adding a condition that is always true (OR 1=1), and comments out the rest of the query with --. The result is typically returning all rows. Parameterised queries solve this by separating SQL code from data \u2014 the database treats the parameter as literal data regardless of its contents."
        },
        checklist: ["I can explain five of the OWASP Top 10 vulnerabilities without looking them up", "I use parameterised queries for every database operation — no exceptions, no string concatenation", "I can explain output encoding and demonstrate how it prevents XSS in a template", "I've completed at least one threat model exercise on a system I built", "I apply least privilege in my access control design — roles only get the permissions they need"]
      },
      {
        id: "6-10",
        title: "Building a Portfolio That Works",
        body: `A portfolio is evidence. Not a declaration of what you know \u2014 evidence of what you've built. The distinction matters because every candidate claims to know React and Node and Postgres. The ones who have built three real projects that someone can click through, poke at, and inspect the code of are the ones who get callbacks.\n\nProject selection is where most portfolios fail. Avoid tutorial clones (a to-do app, a weather app, a blog from a YouTube tutorial). Every hiring manager has seen hundreds of them. They demonstrate that you can follow instructions; they don't demonstrate that you can engineer. Instead, build projects that solve a problem you actually have, or recreate the core functionality of a tool you use and respect. A minimal Notion clone, a GitHub repository analyser, a budget tracker with multi-currency support \u2014 these are more interesting than a weather app.\n\nThree projects is enough if each is genuinely complete. "Complete" means: it works without a local setup guide, it handles edge cases and errors gracefully, it has a real data set or realistic dummy data, and the code would not embarrass you if a senior engineer reviewed it. Deployed and accessible beats impressive-on-paper every time. A working link is worth more than a beautiful screenshot.\n\nYour GitHub profile is part of the portfolio. Commit history matters. A repository with 50 small, well-named commits tells a story of a developer who works iteratively. A repository with two commits ("Initial commit" and "Final version") tells a different story. Write descriptive commit messages. Maintain a good README: what the project does, why you built it, the tech stack, and how to run it.\n\nThe code itself is the most important signal. Before putting a project in your portfolio, do a self-review: consistent naming conventions, no dead code, no console.log() statements, readable structure, and no obvious security issues (hardcoded API keys, SQL injection vectors). Assume a reviewer will read the code. Because they will.`,
        callout: {
          type: "default",
          label: "Deployed Beats Impressive",
          text: "A working, deployed project with straightforward code beats a technically ambitious project that doesn't run. Reviewers click links. When a link produces a 404 or a blank page, the project ceases to exist for that reviewer. Deployment is part of the project, not an afterthought."
        },
        callout2: {
          type: "focus",
          label: "The README Is a Cover Letter",
          text: "Your project README is the first thing a reviewer reads. It should explain what the project does in one sentence, why you built it, and what technical decisions you made (and why). A good README demonstrates communication skills alongside engineering skills. Most portfolios have READMEs that say only 'Installation: npm install && npm start.'"
        },
        hint: `The goal of a portfolio project is to give a hiring manager something to say about you in an interview debrief. "I looked at their GitHub and they built a real-time collaborative editor using WebSockets \u2014 the code was clean and they had 80+ commits." That sentence is what gets you to the next round.\n\n<strong>The most common portfolio mistake:</strong> Too many projects, none of them complete. Three polished, deployed projects outperform ten unfinished ones every time. Pick three, finish them properly, then stop.\n\n<strong>Before adding a project to your portfolio:</strong> Ask someone outside tech to use it without instructions. If they get confused or hit errors, fix those problems first. If a hiring manager can't use the app in 30 seconds without help, the first impression is bad.`,
        quiz: {
          question: "A developer has a portfolio with 8 projects, but most are tutorial clones and none are deployed. Another developer has 3 original projects, all deployed, with clean READMEs. Who has the stronger portfolio?",
          options: ["The first, because more projects demonstrates more breadth", "The second, because deployed original projects with good READMEs demonstrate far more than a large quantity of incomplete tutorials", "They are equivalent \u2014 both show evidence of learning", "The first, because 8 is more impressive than 3"],
          correct: 1,
          feedback: "Quality, originality, and deployability are what make a portfolio compelling. Tutorial clones are the most common portfolio project; they don't differentiate. Deployed original projects require independent decision-making, problem-solving, and the engineering discipline to finish \u2014 which is what hiring managers are trying to assess. Three strong projects is a better signal than eight weak ones."
        },
        checklist: ["I have at least two original deployed projects — not tutorial clones — with live URLs", "Each project has a README that explains what it does, why it exists, and how to run it", "My commit history shows iterative work — not one massive initial commit", "I've reviewed my portfolio as if I were the hiring manager and made at least three improvements", "Every link in my portfolio works and loads within five seconds on a normal connection"]
      },
      {
        id: "6-11",
        title: "Technical Interview Preparation",
        body: `Technical interviews test a different skill from daily engineering work. In daily work you have context, documentation, a codebase to reference, and time to think. In a coding interview you have a whiteboard or a shared editor, a time limit, and someone watching you. These are genuinely different conditions that require specific preparation, and failing to prepare specifically is the most common reason good engineers perform badly in interviews.\n\nAlgorithm and data structure interviews \u2014 LeetCode-style problems \u2014 are still the dominant format at most large tech companies. Google, Meta, Stripe, and many others use them in some form. The goal is not to test whether you memorised quicksort. The goal is to test how you approach unfamiliar problems: do you understand the constraints, identify the bottleneck, choose an appropriate data structure, and communicate your reasoning? The algorithm is the vehicle; the process is what's being evaluated.\n\nThe core data structures to know deeply: arrays, hash maps (and when they're O(1) vs O(n)), linked lists, stacks and queues, trees (binary search trees, in particular), and graphs. The core algorithms: binary search, depth-first search, breadth-first search, two pointers, sliding window, and dynamic programming fundamentals. You do not need to know every graph algorithm. You need to know how to recognise when a problem is a graph problem and apply BFS or DFS.\n\nSystem design interviews test a different dimension. "Design a URL shortener," "Design Twitter's feed," "Design a notification system." These are open-ended problems with no single right answer. The interviewer is evaluating whether you ask clarifying questions, estimate scale, propose sensible components, identify bottlenecks, and discuss trade-offs. Reading the architecture blog posts of companies like Airbnb, Dropbox, and GitHub is better preparation than any textbook.\n\nBehavioural interviews \u2014 "Tell me about a time you had a conflict with a teammate," "Tell me about a technical decision you regret" \u2014 are evaluated using structured frameworks. STAR (Situation, Task, Action, Result) keeps your answers focused and completeable within 2 minutes. Prepare 6-8 stories from your experience that can be adapted to different questions. The best stories are specific, have a clear challenge, and result in a concrete outcome.`,
        callout: {
          type: "default",
          label: "Think Out Loud",
          text: "In an algorithm interview, silence is the worst possible response. Interviewers are evaluating your problem-solving process, not just your solution. Narrate your thinking: 'I'm considering a hash map here because I need O(1) lookup, but the space trade-off might be a concern.' Wrong answers with good process often beat correct answers with no explanation."
        },
        callout2: {
          type: "focus",
          label: "LeetCode Isn't the Goal",
          text: "Solving 300 LeetCode problems without understanding the underlying patterns is less effective than solving 50 problems while deeply understanding why each solution works. Pattern recognition \u2014 'this is a sliding window problem,' 'this needs BFS' \u2014 is what makes you fast on unfamiliar problems."
        },
        hint: `The most reliable preparation strategy: solve 1-2 problems per day for 2 months, review the solution after 15 minutes if stuck, and write out why the solution works. Space the topics: one week on arrays, one week on trees, one week on graphs.\n\n<strong>Practice talking while coding:</strong> Solve problems out loud, alone. Explain every line as you write it. This feels awkward and is the point \u2014 the awkwardness disappears after 10 sessions and what remains is the habit of communicating during problem-solving.\n\n<strong>System design prep:</strong> Read 3 engineering blog posts per week from Airbnb, Uber, Stripe, GitHub, or Cloudflare's engineering blog. Each post teaches a real system design decision with the context that made it the right choice. That contextual knowledge is what makes system design answers concrete rather than generic.`,
        quiz: {
          question: "In a technical interview, you encounter a problem you've never seen before and don't immediately know the solution. What is the best first response?",
          options: ["Ask to skip to a different problem", "Stay silent and think until you have the full solution", "Restate the problem in your own words, ask a clarifying question about constraints, and describe your initial thinking out loud before writing any code", "Start coding immediately to show you're action-oriented"],
          correct: 2,
          feedback: "The first two minutes of an algorithm interview set the tone. Restating the problem confirms you understood it correctly. Clarifying questions surface constraints that affect the solution (array size? value range? sorted?). Describing your thinking before coding shows process and gives the interviewer a chance to redirect if you're heading somewhere wrong. Silent coding or immediate coding without understanding are both antipatterns."
        },
        checklist: ["I can solve array, hash map, and basic tree problems — I've practised, not just read about them", "I can explain my reasoning out loud while solving a problem — I've practised this explicitly", "I have 6-8 STAR stories ready for behavioural questions, each tied to a real project or experience", "I've read at least five system design case studies from real engineering blogs", "I've done at least two mock technical interviews — with a timer and someone watching"]
      },
      {
        id: "6-12",
        title: "Open Source Contribution",
        body: `Open source contribution is one of the most underused career accelerators available to early-career developers. A merged pull request to a well-known project is public, verifiable evidence of code quality. A GitHub profile that shows contributions to React, Postgres, or Django tells a hiring manager more than most interview performances.\n\nThe barrier most people imagine \u2014 "I'm not good enough to contribute to real projects" \u2014 is false. The vast majority of open source contributions are not new features or performance optimisations. They're documentation improvements, test additions, small bug fixes, and typo corrections. These are how almost every open source contributor starts, and they're genuinely valuable. Projects depend on them.\n\nFinding where to start: look at the issue trackers of projects you actually use. Sort by "good first issue" or "help wanted" labels. Read the contributing guide. Clone the repo, run the tests, and make sure you can reproduce the issue described before writing any code. A response to an issue that says "I've reproduced this, here's what I found" is valued before a single line of code is written.\n\nThe review process is an education that no tutorial provides. Submitting a PR to an active open source project means having your code reviewed by maintainers who have seen thousands of pull requests. Their feedback \u2014 on style, approach, edge cases, performance \u2014 is high-signal and directly applicable to professional engineering. This kind of feedback is not available from side projects or tutorials.\n\nBeyond individual contribution: maintaining an open source project \u2014 even a small one \u2014 teaches a different set of skills. API design, documentation, issue triage, versioning, community management. These are the skills that senior engineers exercise daily and that are hard to develop without real users depending on your software.`,
        callout: {
          type: "default",
          label: "Start With What You Use",
          text: "The best first open source contributions come from projects you depend on. You already understand what the tool does. You've probably run into a bug or confusing documentation. That personal context is the best starting point for a contribution that's genuinely useful, not just performative."
        },
        callout2: {
          type: "focus",
          label: "The PR Description Matters",
          text: "Open source maintainers review dozens of PRs. A PR with a clear description \u2014 what problem it solves, how it was tested, any trade-offs considered \u2014 gets reviewed faster and merged more often than a PR with no description. Writing well is part of contributing well."
        },
        hint: `Your first PR will probably be rejected or significantly revised. That is the normal experience, not a failure. Read the feedback carefully, respond professionally, and update the PR. The interaction is training for professional code review, which operates the same way.\n\n<strong>Good first targets:</strong> Projects that are actively maintained (recent commits), have a contributing guide, and have issues labelled "good first issue." Projects with hundreds of open issues and no recent maintainer activity are harder places to contribute.\n\n<strong>Before submitting:</strong> Read three merged PRs in the same repository. Match their style: commit message format, test structure, documentation update pattern. PRs that follow the project's conventions get merged; PRs that don't create extra work for maintainers and often get abandoned.`,
        quiz: {
          question: "A developer wants to contribute to open source but feels their skills aren't good enough to help. What is the most accurate assessment of this belief?",
          options: ["It's accurate \u2014 open source projects only accept contributions from experienced engineers", "It's inaccurate \u2014 documentation improvements, bug reproductions, and test additions are valuable contributions accessible to early-career developers", "It's partially accurate \u2014 they should wait until they can contribute features, not just documentation", "It depends entirely on which project they choose"],
          correct: 1,
          feedback: "The belief that open source requires expert-level skill is the single biggest barrier to contribution and it is false. Documentation is frequently outdated, tests are frequently missing, and bug reports often lack reproducible examples. All of these are valuable contributions that projects depend on. The skill level required for a 'fix a typo in the docs' PR is zero. The learning that comes from navigating the codebase to find the typo and submitting a clean PR is significant."
        },
        checklist: ["I've found a project I use that has 'good first issue' labels — and I've read its contributing guide", "I understand the project's code standards well enough to write code that fits", "I've submitted at least one PR to an open source project — even if it's docs or tests", "I've read review feedback on merged PRs in the target project to understand what good looks like", "I can explain why documentation and test contributions are valuable — not consolation prizes"]
      },
      {
        id: "6-13",
        title: "Building in Public",
        body: `Building in public means sharing your work, your progress, and your thinking while you're building \u2014 not just when it's complete. It's not self-promotion. It's a discipline that forces clarity of thinking, builds a discoverable track record, and creates connections with people working on similar problems.\n\nThe mechanism is straightforward: write about what you're building, what you're learning, what you got wrong, and what you figured out. Twitter threads, blog posts, LinkedIn updates, YouTube videos \u2014 the format matters less than the consistency. Developers who document their process publicly accumulate an audience of people interested in the same problems. That audience becomes a network of collaborators, users, and referrers.\n\nSpecificity beats generality. "I'm learning web development" generates no signal. "I spent three hours today debugging a React useEffect infinite loop and this is what finally fixed it" is useful to every developer who will face that problem. The more specific and honest the post, the more valuable it is. This is counterintuitive \u2014 documenting struggle feels risky, but it's what resonates.\n\nThe compounding effect is the reason it works. A blog post written today continues attracting readers for years through search. A well-written Twitter thread gets shared across developer communities. A solved GitHub issue with a clear explanation gets starred. Each piece of public work is a permanent signal that accumulates. Developers who have been building in public for two years have a track record that no portfolio of projects can fully replicate.\n\nPractical concerns: you don't need a large audience for this to be valuable. Even a blog with 50 readers per month is evidence of commitment and clarity. The side effect of explaining something clearly \u2014 for yourself, if for no one else \u2014 is that you understand it more deeply. The act of writing about what you built surfaces gaps in your understanding that the building itself didn't reveal.`,
        callout: {
          type: "default",
          label: "Document the Struggle",
          text: "The most valuable public developer content documents problems honestly: what you tried, what failed, what you misunderstood, and what finally worked. Polished success stories are common. Honest accounts of debugging are rare and disproportionately useful. The struggle is the content."
        },
        callout2: {
          type: "focus",
          label: "Consistency Over Viral",
          text: "One post a week for a year is more valuable than ten posts in one week and nothing after. Audiences and search rankings compound over time. The developers with large audiences almost universally describe the same thing: they showed up consistently for longer than felt reasonable, and then things started to compound."
        },
        hint: `The most common objection: "I don't have anything valuable to say." Every problem you've solved this week was a problem that someone else will face. Your explanation of how you solved it is the content. Start there.\n\n<strong>Lowest-friction start:</strong> Write a Twitter thread or a short blog post about the most interesting thing you debugged this week. Describe the symptom, what you tried, what the actual cause was, and how you fixed it. That's it. That's the post.\n\n<strong>On imposter syndrome:</strong> You don't need to be an expert to explain something. You need to be one step ahead of someone else on the same path. A developer who just figured out async/await can explain it better to another beginner than an expert can, because the expert has forgotten what was confusing.`,
        quiz: {
          question: "A developer is reluctant to build in public because they're not an expert and worry about sharing incorrect information. What is the most useful framing of this concern?",
          options: ["The concern is valid \u2014 only experts should share technical information publicly", "The concern is natural but counterproductive \u2014 sharing your learning process (including corrections) is valuable, and documenting your own problem-solving is useful regardless of expertise level", "The concern is irrelevant \u2014 audience size is what determines whether building in public is worthwhile", "The concern is valid for blog posts but not for Twitter threads"],
          correct: 1,
          feedback: "Expertise is not required for public documentation of a learning process. The developer who documents their path through confusion \u2014 including corrections and updates \u2014 provides a service to every developer behind them on the same path. The fear of being wrong is better addressed by being explicit about your current understanding and inviting correction, not by staying silent."
        },
        checklist: ["I've published at least one piece of public writing about something I built or learned", "I have a consistent, maintained place to document my work", "At least one post documents a specific problem I solved — not just 'I learned X'", "I understand that showing up consistently for three months matters more than one viral post", "My public writing is linked from my portfolio and GitHub profile"]
      },
      {
        id: "6-14",
        title: "Choosing Your First Role",
        body: `Your first engineering role shapes the next five years more than any course or project. Who you work with, what kind of code you're exposed to, how much autonomy you have, how much mentorship exists \u2014 these compound. Choosing thoughtfully matters more than most people realise when they're just trying to get any offer.\n\nStartups vs large companies is the most common framing, and it's useful as far as it goes. At a startup with 10-50 engineers, you ship faster, have broader responsibility, and are closer to the product decisions. The downside: less mentorship structure, more chaotic codebase, higher probability the company doesn't survive. At a large company (Google, Stripe, Shopify, a bank), you have structured onboarding, access to senior engineers who have solved hard problems, and a defined career ladder. The downside: slower decision-making, more specialised and narrower scope.\n\nTitle inflation is real and it cuts both ways. A "senior engineer" at a 5-person startup is different from a "senior engineer" at Microsoft. Be sceptical of inflated titles at tiny companies \u2014 you might be the most experienced engineer in a team with no one to learn from. Be equally sceptical of large company prestige \u2014 the brand matters less than the team and the problem.\n\nThe most important question to ask in every interview: "What does the code review process look like?" A company with rigorous code review has a culture of shared standards and learning. A company where "we just merge when we're happy with it" has no structured feedback mechanism. Code review culture is a proxy for engineering culture more broadly.\n\nCompensation negotiation is expected and not rude. Research salaries using Levels.fyi, Glassdoor, and LinkedIn Salary before any negotiation. The first offer is rarely the best offer. "Thank you for the offer \u2014 I was hoping to be closer to [X] based on my research into the market rate for this role in this city. Is there flexibility?" is a sentence that works. Most candidates leave money on the table because they don't say it.`,
        callout: {
          type: "default",
          label: "Team Over Company",
          text: "The company name on your CV matters less than the team you join and the work you do. A strong team at a company you've never heard of will teach you more and open more doors than a passive role at a famous company. Interview the team as much as they interview you."
        },
        callout2: {
          type: "focus",
          label: "The Mentorship Question",
          text: "In every first-role interview, ask: 'Who will I learn from on this team, and how does that typically happen?' If the answer is vague or they can't name specific people and mechanisms, that's a signal. If they describe pair programming sessions, structured code review, and experienced engineers who actively mentor juniors, that's a very different signal."
        },
        hint: `The pressure of getting any offer can make you accept the wrong role. Don't. If you get one offer, you'll probably get two. Evaluate each one against what you actually want to learn and who you want to work with.\n\n<strong>Red flags in interviews:</strong> Defensive responses to questions about tech stack, inability to describe how the team communicates, engineers who seem bored or disengaged during the interview, or a hiring process that feels disorganised. These reflect the culture you'd be joining.\n\n<strong>Green flags:</strong> Engineers who are genuinely enthusiastic about the technical problems they're solving, a clear answer to "what does good look like on this team," evidence of psychological safety (people admit mistakes and discuss them openly), and a hiring process that respects your time.`,
        quiz: {
          questions: [
            {
              question: "You're applying for a frontend role. Your portfolio has three projects but they all look similar — dark-themed card layouts. What does this signal to a hiring manager and what would make it stronger?",
              options: [
                "Nothing — consistent style signals a strong personal brand",
                "It signals limited range. A stronger portfolio shows different domains (not just the same app type), different UI patterns, and at least one project solving a real problem — not just a tutorial clone",
                "Three projects is too few — add 10 more projects of any type",
                "Dark themes are professional and preferred by most companies"
              ],
              correct: 1,
              feedback: "Portfolios with identical-looking projects suggest the developer only knows one pattern. Hiring managers want to see range: different problem types, different UI approaches, at least one project that demonstrates problem-solving rather than feature implementation. One genuinely useful project that solves a real problem outweighs five tutorial recreations."
            },
            {
              question: "An interviewer asks: 'Tell me about a technical challenge you faced and how you solved it.' You don't have a prepared story. How should you approach this?",
              options: [
                "Say you haven't faced any real technical challenges yet",
                "Make up a plausible story — interviewers can't verify it",
                "Think of a specific debugging session or architectural decision from a real project. Describe the problem, what you tried, what you learned, and how you'd approach it differently now",
                "Describe a challenge from the curriculum you're following"
              ],
              correct: 2,
              feedback: "Behavioural questions are answered with real specifics. STAR format: Situation (what was the context), Task (what needed solving), Action (what you specifically did), Result (what happened). The challenge doesn't need to be impressive — it needs to be real. A genuine story about debugging a CORS error with clear problem-solving shows more than a vague story about building a complex feature."
            },
            {
              question: "What makes a GitHub profile strong from a hiring perspective?",
              options: [
                "The number of repositories — more is always better",
                "Pinned repositories with descriptive READMEs, regular commit history, and real projects that are deployed and accessible — not just tutorials",
                "A high number of stars on repositories",
                "Following many other developers and organisations"
              ],
              correct: 1,
              feedback: "A strong GitHub profile: pinned repos with README that explains what the project does, why it exists, and how to run it; regular commit history that shows consistent work; real projects (not just tutorial clones); and ideally a live deployed version. Stars reflect popularity, not your skill. Number of repos matters less than quality of the pinned ones."
            },
            {
              question: "How should you approach contributing to open source as a junior developer?",
              options: [
                "Start by fixing a critical performance bug in a major framework — show ambition",
                "Clone popular repos and submit major feature additions without prior discussion",
                "Start with documentation, tests, and good-first-issue bugs. Read contributing guidelines. Comment on issues before submitting PRs. Follow the existing code style",
                "Wait until you're a senior developer before attempting open source contributions"
              ],
              correct: 2,
              feedback: "Open source contribution is a skill in itself. Start small: docs improvements, typo fixes, test additions, good-first-issue bugs. Read CONTRIBUTING.md first. Comment on the issue before submitting a PR — maintainers need to confirm the approach before you invest time. Follow the existing code style. A small accepted contribution demonstrates you can work in a real codebase and collaborate."
            },
            {
              question: "You're deciding between a junior role at a startup (full ownership, no senior mentorship) and a graduate programme at a larger company (structured mentorship, less ownership). Which factors should drive the decision?",
              options: [
                "Always choose the startup — you'll learn faster with more ownership",
                "Always choose the programme — structured mentorship is essential for junior developers",
                "Consider your learning style, the quality of the specific people you'll work with, your financial runway, and which problems you'd be working on — neither is universally better",
                "Choose based on salary — the highest-paying role will provide the best resources"
              ],
              correct: 2,
              feedback: "Both paths can produce excellent engineers. The startup gives autonomy and breadth but sink-or-swim risk without senior guidance. The programme gives mentorship and structure but potentially slower autonomy growth. The deciding factors: (1) the actual people you'd work with, (2) the problems you'd solve, (3) your financial situation (startups often pay less early), (4) your learning style. Neither path is universally correct."
            }
          ]
        },
        checklist: ["I can articulate the real trade-offs between startup and larger-company roles — not just the clichés", "I've identified what I most want from my first role: learning, ownership, mentorship, or domain", "I know what questions to ask in an interview to assess team culture and code quality", "I've researched salary benchmarks using Levels.fyi or similar before any offer conversations", "I've practised asking about mentorship, code review process, and on-call expectations in mock conversations"]
      }
    ]
  },
  {
    id: 7,
    title: "Professional Grade",
    subtitle: "The destination",
    color: "#e8d5a0",
    duration: "3-4 months",
    sessions: "5 per week",
    length: "90 min",
    tag: "Floor 07 \u2014 Arrival",
    sections: [
      {
        id: "7-1",
        title: "Your First Week",
        body: `The first week of your first engineering job is not a test of technical skill. It's a test of how quickly you can build context: how the team works, what the codebase does, how decisions get made, and where to go when you're stuck. Technical skill gets you the offer. Context-building determines whether you thrive in the first six months.\n\nResist the urge to immediately produce. The instinct to prove yourself by shipping something in week one is understandable and usually counterproductive. Week one is for understanding, not contributing. Read the codebase. Set up your dev environment properly. Run the tests. Follow the CI/CD pipeline through a deploy. Trace a user request from the frontend to the database and back. Ask "how does this work" about ten different things before forming any opinions about what should change.\n\nThe questions you ask in week one matter. Good questions signal attention to context: "How does the team decide what gets prioritised?", "What's the preferred way to get a code review when the reviewer is busy?", "What does done look like for a ticket?" Bad questions signal impatience: "Why is this codebase structured this way?" or "Has anyone considered using X instead?" on day three. The second set of questions is fine eventually; it's not fine when you have zero context.\n\nFind your onboarding buddy or mentor within the first two days and schedule regular 1:1 time. Not for tasks \u2014 for context. "Can you walk me through the most important parts of the codebase?" and "What should I know about how this team operates that isn't written down?" are two of the highest-value questions you can ask.\n\nBy the end of week one, you should know: who to ask about what, how to run the project locally, how to submit a PR, what the team is currently working on, and at least three things about the codebase that you don't fully understand yet. That last point is not a gap \u2014 it's an accurate inventory. Write it down. It becomes your learning list.`,
        callout: {
          type: "default",
          label: "Context Before Contribution",
          text: "The engineers who make the strongest first impressions are the ones who understand the system deeply before suggesting changes to it. Asking good questions and demonstrating genuine comprehension signals capability more effectively than shipping code in week one."
        },
        callout2: {
          type: "focus",
          label: "Write Everything Down",
          text: "Your first week produces an enormous amount of new information. You will not remember it all. Take notes: how to run the dev environment, what the acronyms mean, what each service does, who owns what. A well-maintained onboarding doc you write for yourself becomes valuable for the next person who joins \u2014 which makes it a contribution worth sharing."
        },
        hint: `Everyone remembers their first week as overwhelming. The amount of new information is not a sign of incompetence \u2014 it's just the normal state of starting somewhere new. The engineers who look calm in week one have either been there before or are very good at not showing how much they're processing.\n\n<strong>One thing to do immediately:</strong> Find something small, self-contained, and well-defined to work on. Fixing a minor bug or updating some documentation in week two gives you the experience of going through the full PR process \u2014 branch, commit, review, merge, deploy \u2014 without the pressure of high-stakes work.\n\n<strong>On imposter syndrome:</strong> It peaks in week one and two and then recedes as context builds. Every person who has started a new engineering role has experienced it. The engineers who look confident around you have their own version of the same feeling about different things.`,
        quiz: {
          question: "In your first week at a new engineering job, your manager asks you to share your first impressions of the codebase architecture. What is the most appropriate response?",
          options: ["Share a detailed critique of the architecture's weaknesses and suggested improvements", "Describe what you've observed and understood so far, ask clarifying questions about decisions you don't yet understand the context for, and reserve judgment until you have more context", "Say the architecture looks good to avoid creating conflict early", "Propose a refactoring plan to demonstrate initiative"],
          correct: 1,
          feedback: "Architecture decisions have context that a new joiner doesn't have yet: historical constraints, deliberate trade-offs, failed alternatives, team capability at the time. Critiquing before understanding that context creates an impression of poor judgment even if the critique is technically valid. Describing what you observe, asking about the reasoning, and reserving judgment while you build context is the signal of a high-quality engineer."
        },
        checklist: ["I understand that the first week is for learning and building context — not proving value through output", "I can run the project locally, run the tests, and trace a request through the system", "I've documented things I don't understand yet — as a list to work through, not something to hide", "I ask questions after genuinely trying to find the answer myself first", "I've scheduled regular 1:1 time with my manager or onboarding buddy"]
      },
      {
        id: "7-2",
        title: "Reading a Large Codebase",
        body: `Professional codebases are not like tutorial projects. A real production codebase might have 500,000 lines of code across 200 services, built over ten years by engineers who have long since left the company. Reading it is a skill that is almost never taught but is among the most practically valuable things a professional engineer does.\n\nThe first principle: never start by reading code. Start by understanding what the code is supposed to do. Read the documentation, the API contracts, the test descriptions, the commit messages, the pull request descriptions. These tell you the intended behaviour. The code tells you the actual behaviour. Understanding both, and the gap between them, is the full picture.\n\nThe second principle: read from the outside in. Find the entry point \u2014 the HTTP route handler, the main function, the CLI entry point \u2014 and trace the execution path for one complete user action. Don't get distracted by branches or edge cases on the first pass. The goal is to understand the happy path for one concrete request before exploring anything else.\n\nGit history is underused by most developers. <code>git log --follow -p path/to/file</code> shows every change to a file, with context. <code>git blame</code> shows who changed each line and when. <code>git bisect</code> finds the exact commit that introduced a bug by binary search. When code looks strange and you want to know why, git history tells you the reason more reliably than any comment or documentation.\n\nThe skill that separates senior from junior engineers in large codebases: the ability to identify what doesn't need to be understood. Not everything in a 500,000-line codebase is relevant to your current task. Experienced engineers scope their reading to what's relevant, hold the rest at arm's length, and resist the urge to understand everything before acting.`,
        callout: {
          type: "default",
          label: "Git Blame Is Not an Accusation",
          text: "git blame shows you who wrote each line and when. It's a navigation tool, not a judgment. Finding the engineer who wrote a confusing section lets you ask them why they made the choice they made \u2014 often the answer reveals a constraint or business requirement that makes the code make sense immediately."
        },
        callout2: {
          type: "focus",
          label: "Tests Are Documentation",
          text: "In a well-maintained codebase, the test suite documents expected behaviour more reliably than any comment or README. Read the tests for a module before reading its implementation. The tests tell you what the module is supposed to do, with concrete inputs and outputs, in a way that is verified to be accurate."
        },
        hint: `When you're dropped into an unfamiliar codebase and asked to make a change, the fastest path is usually: find the test for the behaviour closest to what you're changing, understand what it tests, find the code under test, make the change, update the test. This scope-limited approach avoids getting lost in the 99% of the codebase irrelevant to your task.\n\n<strong>Build a map:</strong> When you first encounter a large codebase, draw a diagram. Boxes for services or major modules, arrows for the dependencies between them. This doesn't need to be accurate in every detail \u2014 it needs to give you a mental model that stops you getting disoriented.\n\n<strong>Use the tooling:</strong> IDE features like "go to definition," "find all references," and "show call hierarchy" are how professional engineers navigate large codebases quickly. Learning the keyboard shortcuts for these in your IDE is a multiplier.`,
        quiz: {
          question: "You need to make a change in an unfamiliar part of a 400,000-line codebase. What is the most efficient first step?",
          options: ["Read the entire module that contains the code you need to change", "Find the test that covers the behaviour you need to change, read it to understand the expected behaviour, then find the code under test", "Ask a senior engineer to explain the entire module before you start", "Search the codebase for similar changes made previously and follow the same pattern"],
          correct: 1,
          feedback: "Tests are the most reliable documentation for specific behaviour. Finding the test for what you need to change tells you exactly what the current expected behaviour is (in verifiable, executable form), shows you where the code under test lives, and gives you a target to update when you make your change. Reading the entire module is almost always too broad a scope for a focused change."
        },
        checklist: ["I start reading unfamiliar code from where it's called — not from the implementation", "I can trace a request through a large codebase from HTTP handler to database and back", "I use the debugger and logging to understand code behaviour — not just reading it", "I leave code I read in a better state than I found it: a comment, a renamed variable, a removed dead path", "I can identify the architectural pattern of a codebase without someone explaining it"]
      },
      {
        id: "7-3",
        title: "Code Reviews",
        body: `Code review is the primary mechanism by which professional engineering teams maintain quality, share knowledge, and transmit standards. A pull request without a code review is just code that went to production \u2014 it might be fine, but you don't know. Code review is how you find out.\n\nGiving good code review is a skill that takes years to develop. The signal-to-noise ratio matters enormously. A review that flags 40 issues, half of which are stylistic preferences rather than real problems, is harder to act on than a review that flags 8 real issues clearly. Prioritise ruthlessly: blocking issues (bugs, security vulnerabilities, broken interfaces) must be addressed before merge. Suggestions (better variable names, alternative approaches) are advisory. Preferences (your preferred way to structure a loop) don't belong in a code review at all.\n\nThe tone of a code review is not separable from its content. "This is wrong" and "I think this might cause a race condition when two requests arrive simultaneously \u2014 can you think through that case?" are not equivalent, even if the underlying concern is the same. The second invites thinking. The first provokes defensiveness. The most effective reviewers ask questions rather than issue directives: "What happens if this value is null?" rather than "This will crash if the value is null."\n\nReceiving code review is its own skill. Read every comment before responding to any. Understand what the reviewer is concerned about before deciding whether you agree. "I disagree because..." is a valid response if the reasoning is sound. "Thanks, fixed" is appropriate for clear bugs. "I see what you're suggesting \u2014 I went with X because Y, but happy to change if you feel strongly" is appropriate for trade-offs. The worst response is silence \u2014 leaving review comments unaddressed.\n\nThe hidden function of code review is knowledge transfer. The reviewer learns about the change and its context. The author learns about the codebase and standards through the reviewer's questions. Both parties develop shared understanding of how the system works. This is how teams remain coherent as they grow. GitHub's engineering team has written publicly about code review as a culture-building tool, not just a quality gate.`,
        callout: {
          type: "default",
          label: "Review the Code, Not the Person",
          text: "Every comment in a code review should be about the code, not the author. 'This variable name is ambiguous' is a code review comment. 'You always name variables poorly' is not. The distinction seems obvious and is frequently violated under time pressure or frustration. The best code review cultures are psychologically safe precisely because this boundary is maintained."
        },
        callout2: {
          type: "focus",
          label: "The 24-Hour Rule",
          text: "A code review left unreviewed for more than 24 hours blocks the person who submitted it. At most high-functioning engineering teams, responding to a review request within 24 hours \u2014 even if it's just to say 'I'll look at this tomorrow morning' \u2014 is a team norm. Unreviewed PRs sitting for days demoralise contributors and slow delivery."
        },
        hint: `The quality of your code reviews is how senior engineers assess your engineering judgment before you have a track record. A junior engineer who asks precise, useful review questions signals more than one who approves everything with a thumbs-up.\n\n<strong>Framework for reviewing:</strong> Read the PR description first (understand the intent). Scan the diff at a high level (understand the shape of the change). Then read carefully for: bugs, unhandled edge cases, security issues, performance problems, and interface design. Leave blocking comments clearly marked as such.\n\n<strong>On approving PRs:</strong> Only approve if you would be comfortable being the one who merged it. "Looks good to me" is a commitment, not a formality. If you're uncertain about something but it's not your domain, say so: "I can't fully evaluate the database query, but the application logic looks correct to me."`,
        quiz: {
          question: "A code reviewer leaves a comment saying 'This will definitely cause performance problems at scale.' The author believes the performance is acceptable for current requirements and has benchmarked it. What is the best response?",
          options: ["Immediately change the code to match the reviewer's preference", "Close the PR and start over with a different approach", "Respond with the benchmark results, explain why performance meets current requirements, and ask whether they see a specific scenario where it would be insufficient", "Ignore the comment and merge anyway"],
          correct: 2,
          feedback: "A code review comment is the beginning of a conversation, not a directive. The author has context the reviewer may lack (current scale, benchmarks, business requirements). The right response is to provide that context, explain the trade-off, and engage with the specific concern. If the reviewer has a scenario in mind where performance would be insufficient, that's worth knowing. If they don't, the benchmarks resolve the concern."
        },
        checklist: ["I give code review feedback that is specific, explains the why, and offers a concrete alternative", "I distinguish between required changes (the code has a bug or violates a constraint) and suggestions (I'd prefer this approach)", "When I disagree with review feedback, I explain my reasoning professionally — I don't silently comply or silently ignore", "I treat code reviews as conversations, not verdicts", "I've reviewed junior code and given feedback that helped them grow — not just found errors"]
      },
      {
        id: "7-4",
        title: "Technical Debt and Refactoring",
        body: `Technical debt is a deliberate or accidental trade-off: you write code that is faster to ship now and harder to maintain later. Ward Cunningham coined the metaphor. The "debt" is real \u2014 it accrues interest in the form of slower feature development, more frequent bugs, and higher cognitive load for every engineer who touches the affected code. Like financial debt, it's not inherently bad. Shipping fast with some debt to validate a product idea is a reasonable decision. Never paying it down is how systems become unmaintainable.\n\nThe distinction between necessary and unnecessary debt matters. Necessary debt: you shipped a feature quickly before a deadline because validating it was more important than the quality of the implementation. You knew it was debt when you made the decision. Unnecessary debt: code that is poorly structured because of lack of care, skills, or time \u2014 not a deliberate trade-off but accumulated neglect.\n\nRefactoring is the process of restructuring existing code without changing its observable behaviour. The refactoring is safe if you have good test coverage \u2014 you can change the structure and verify the behaviour hasn't changed by running the tests. The refactoring is risky without tests, because you can't verify equivalence. Before refactoring untested code, write tests for the current behaviour first. Then refactor. Then verify the tests still pass.\n\nThe Boy Scout Rule: leave the code better than you found it. Not a massive refactor on every PR \u2014 small, consistent improvements. Rename an ambiguous variable. Extract a readable function from a 60-line block. Add a comment explaining why, not what. These accumulate into healthier codebases over years.\n\nKnowing when not to refactor is as important as knowing how. Refactoring code that is rarely touched, that works correctly, and that is clearly understood is risk for no benefit. Refactoring code you're actively working on \u2014 that you need to extend and have to understand thoroughly anyway \u2014 is when the cost-benefit works. The decision is always: does the risk of change outweigh the benefit of clarity?\n\n<div class=\"inline-q\"><span class=\"iq-label\">Think about this:</span> Before you continue — think of a shortcut you took in a past project. Was it explicit (you or a comment documented it) or hidden (you moved on hoping to fix it)? What would have made it manageable?</div>`,
        callout: {
          type: "default",
          label: "Make It Work, Then Make It Right",
          text: "The phrase has an important third part that gets omitted: make it work, make it right, make it fast. In order. A working solution with technical debt is preferable to an unshipped perfect solution. But 'make it right' is not optional \u2014 it just happens after 'make it work' is validated."
        },
        callout2: {
          type: "focus",
          label: "Tests Before Refactoring",
          text: "Refactoring untested code is rewriting it. You cannot know whether you've changed the behaviour if you have no specification of what the behaviour was. Write characterisation tests \u2014 tests that document the current behaviour, not the desired behaviour \u2014 before touching a legacy codebase. Then refactor. Then verify the tests still pass."
        },
        hint: `The biggest mistake teams make with technical debt: treating it as an all-or-nothing. "We'll do a big refactor quarter" never happens, because the refactor is never as urgent as the next feature. Incremental improvement, on every PR, adds up to a meaningfully better codebase over six months.\n\n<strong>The 20% heuristic:</strong> Some teams reserve 20% of engineering time for technical debt and maintenance. It's not a magic number, but the principle is right: if tech debt is never scheduled, it never happens. Make it explicit.\n\n<strong>Before a refactor:</strong> Be able to answer: what specific problem does this solve? How will I know it's an improvement? What's the risk of getting it wrong? How will I test that the behaviour hasn't changed? If you can't answer these questions, you're not ready to refactor.`,
        quiz: {
          question: "An engineer wants to refactor a critical, untested module that handles payment processing. The module works correctly but the code is difficult to read. What is the most responsible approach?",
          options: ["Refactor it immediately \u2014 the risk is worth the improved readability", "Don't touch it \u2014 if it works, never change it", "Write characterisation tests to document the current behaviour first, then refactor incrementally, verifying tests pass after each change", "Rewrite the module from scratch in a new file and switch to it once complete"],
          correct: 2,
          feedback: "Refactoring payment-critical code without tests is extremely high risk. The current behaviour is undocumented, and any change that introduces a regression could process payments incorrectly. Characterisation tests document the current behaviour (including any bugs or quirks that callers depend on). With those tests in place, you can refactor incrementally with a safety net. A complete rewrite is higher risk still \u2014 it's easy to miss edge cases that the original code handled."
        },
        checklist: ["I can explain technical debt in one sentence without using the word 'technical'", "I can identify which existing debt in a codebase is manageable and which is genuinely blocking", "When I take a deliberate shortcut, I document it — a comment, a ticket, a decision record", "I can refactor a complex function into smaller, named functions without changing its behaviour", "I know when to fix the debt now vs ship and track it — and I make that call deliberately"]
      },
      {
        id: "7-5",
        title: "System Design",
        body: `System design is the practice of making high-level architectural decisions about how a system is structured before (or while) building it. It's where engineering meets scale: how do you build something that works for a million users when you're starting with ten? The decisions made at this level \u2014 which services to separate, where to put the database, how to handle state, whether to use queues \u2014 are expensive to change later and cheap to change now.\n\nThe vocabulary of system design: <strong>horizontal scaling</strong> (adding more servers to distribute load), <strong>vertical scaling</strong> (making each server more powerful), <strong>load balancing</strong> (distributing requests across multiple servers), <strong>caching</strong> (storing frequently accessed data in memory to avoid repeated computation or database queries), <strong>sharding</strong> (splitting a database across multiple servers by some partition key), <strong>replication</strong> (keeping copies of data on multiple servers for availability), and <strong>eventual consistency</strong> (accepting that distributed nodes may temporarily disagree on state, with convergence guaranteed later).\n\nCAP theorem states that a distributed system can guarantee at most two of: Consistency (every read returns the most recent write), Availability (every request receives a response), and Partition tolerance (the system works despite network failures). In practice, partition tolerance is non-negotiable \u2014 networks fail. The real choice is between consistency and availability during a partition. Stripe prioritises consistency for payment data (a wrong balance is worse than an error). Twitter prioritises availability for tweet delivery (seeing an older timeline is acceptable).\n\nMicroservices vs monolith is not a question with a universal answer. A monolith is a single deployable unit containing all the application's functionality. Microservices split functionality into many independently deployable services. Monoliths are simpler to develop, test, and debug \u2014 they're how most successful products start. Microservices provide independent deployability, technology flexibility, and fault isolation \u2014 they're how large teams work without stepping on each other. Netflix moved from a monolith to microservices because the monolith deployment affected hundreds of features simultaneously. Shopify still runs its core commerce platform as a modular monolith.\n\nThe practitioner's perspective: system design interviews ask you to design at a scale you've probably never operated at. What they're actually testing is whether you know the vocabulary, understand the trade-offs, ask the right clarifying questions, and reason systematically. "It depends" is often the honest answer. The quality of the follow-up \u2014 "it depends on whether consistency or availability matters more for this use case" \u2014 is what they're evaluating.`,
        callout: {
          type: "default",
          label: "Design for the Next 10x",
          text: "Don't over-engineer for a scale you'll never reach. Design for the next order of magnitude, not the theoretical maximum. A system designed for 10x your current load is a reasonable investment. A system designed for 1000x current load before you've validated the product is waste. The premature optimisation problem exists at the architecture level too."
        },
        callout2: {
          type: "focus",
          label: "Caching Is the Most Powerful Tool",
          text: "Caching \u2014 storing expensive computations in memory so you don't repeat them \u2014 is responsible for a disproportionate share of web performance improvements. A database query that takes 100ms cached at the application layer takes microseconds. Netflix caches movie metadata at every layer. Understanding when and what to cache, and the consistency implications, is high-leverage system design knowledge."
        },
        hint: `System design interviews reward structured thinking, not encyclopedic knowledge. The pattern: clarify requirements and scale, estimate rough numbers, choose the major components, identify bottlenecks, propose solutions to each bottleneck, discuss trade-offs. Following this structure with incomplete knowledge beats wandering through perfect knowledge.\n\n<strong>Read real architecture posts:</strong> Airbnb's engineering blog on their service mesh. GitHub's description of how they handle merge conflicts at scale. Cloudflare's explanation of their CDN architecture. Stripe's approach to idempotency. These are the real answers to system design questions \u2014 learn from how professionals solved actual problems.\n\n<strong>The most common system design mistake:</strong> Jumping to microservices because that's what large companies use. Start with a monolith in almost every design exercise. Then describe what scale or team size would cause you to split it, and which services you'd extract first. That's a more sophisticated answer than immediately drawing 15 boxes.`,
        quiz: {
          question: "A designer wants to build a URL shortener that needs to handle millions of reads per day but far fewer writes. Which component would most improve read performance at scale?",
          options: ["Rewrite the application in a faster language", "Add a caching layer (Redis) to store frequently accessed short URL mappings in memory, reducing database load", "Use a NoSQL database instead of a relational one", "Add more application servers"],
          correct: 1,
          feedback: "For a read-heavy system where the data changes rarely (a URL mapping doesn't change once created), caching is the highest-leverage improvement. A Redis cache serving hot URLs from memory handles millions of reads per second with millisecond latency, while the database only receives cache misses. Adding more application servers helps with compute but doesn't reduce database load. Changing languages has minimal impact compared to eliminating database round trips."
        },
        checklist: ["I can explain the difference between vertical and horizontal scaling with a concrete example", "I can describe where a system's bottleneck is likely to be before profiling — and verify it after", "I understand what a load balancer does and when you add one", "I can explain the trade-offs of adding a caching layer for a specific system", "I can draw a simple architecture diagram for a system I've designed and explain every component"]
      },
      {
        id: "7-phase1-review",
        title: "Phase 1 Review — Professional Engineering",
        body: `Five questions covering your first week, reading codebases, code reviews, technical debt, and system design.`,
        quiz: {
          questions: [
            {
              question: "It's your first week as a junior developer. You've been given access to the codebase. What is the most effective approach?",
              options: [
                "Start making improvements immediately to demonstrate value",
                "Ask lots of questions to show enthusiasm and initiative",
                "Read the codebase, run it locally, fix a small bug or add a small feature to get familiar with the deployment process, and observe team workflows before suggesting changes",
                "Wait for formal onboarding before touching anything"
              ],
              correct: 2,
              feedback: "First week: understand before changing. Run the application locally. Read the main modules to understand the architecture. Identify a small, well-scoped task (a bug fix or tiny feature) and complete the full cycle from development to deployment. This builds context and shows competence without overstepping. Questions are good, but demonstrate you've tried to find the answer first."
            },
            {
              question: "You're reading an unfamiliar codebase and encounter a complex function with no comments. What is the most effective approach?",
              options: [
                "Add a comment explaining what you think it does and move on",
                "Rewrite it in a style you find more readable",
                "Trace the call chain: find where it's called, what it receives, what it returns. Add console.log or a debugger to observe its behaviour with real data. Then read the implementation",
                "Skip it and only work with parts of the codebase you already understand"
              ],
              correct: 2,
              feedback: "Reading unfamiliar code: start from usage (where is it called?) not implementation (what does it do?). The call site tells you the inputs and expected outputs. Then read the function with that context. For complex logic, add temporary logging or use a debugger to observe actual values. Understanding comes from running the code, not just reading it."
            },
            {
              question: "You're reviewing a colleague's pull request. You find code that works but is harder to read than it needs to be. How should you frame the comment?",
              options: [
                "Approve it — working code is correct code and readability is subjective",
                "Request changes with a comment explaining the readability concern and suggesting a specific alternative: 'Could we extract this into a named function? It would make the intent clearer — something like: validateUserPermissions()'",
                "Comment: 'This is hard to read. Please rewrite it.'",
                "Fix it yourself and push to their branch"
              ],
              correct: 1,
              feedback: "Good code review feedback is specific, explains the why, and offers a concrete alternative. 'Hard to read' is not actionable. 'Extract into a named function called X because it would make the intent clear' gives the author exactly what to do and why. Reviews are a conversation — suggest, explain, and be open to the author's perspective. Never push to someone else's branch without permission."
            },
            {
              question: "What is technical debt and when is it acceptable?",
              options: [
                "Technical debt is code written in old programming languages — acceptable only for legacy projects",
                "Technical debt is intentional shortcuts taken now that will need proper implementation later. Acceptable when speed matters and you plan and document the debt explicitly",
                "Technical debt is any code written by developers who are no longer at the company",
                "Technical debt is never acceptable — always write code correctly the first time"
              ],
              correct: 1,
              feedback: "Technical debt is a deliberate trade-off: implement something quickly now (incurring debt) with the intention to implement it properly later. It's acceptable when the business genuinely needs speed and the team understands and documents the debt. The problem is debt without a plan — it accumulates interest: it takes longer to change, causes bugs, and slows down every future feature. Explicit debt is manageable; hidden debt is dangerous."
            },
            {
              question: "A system must handle 100,000 concurrent users. The current single-server architecture can handle 10,000. What is the first question to ask before proposing a solution?",
              options: [
                "Which cloud provider should we use?",
                "How quickly must this scale — is this a gradual growth or a sudden expected spike?",
                "How many more servers should we buy?",
                "Should we rewrite in a different programming language?"
              ],
              correct: 1,
              feedback: "Before any solution: understand the constraint. Gradual growth → horizontal scaling with a load balancer is the standard solution. Sudden spike (e.g., a product launch) → pre-warm capacity or use auto-scaling. In both cases: profile first (is the bottleneck CPU, memory, database, or I/O?), add caching for repeated reads, optimise the database before throwing more hardware at it. The right solution depends on the specific problem."
            }
          ]
        }
      },
      {
        id: "7-6",
        title: "Engineering in Teams",
        body: `Software engineering is a team sport and most of its hardest problems are human, not technical. The technical problems have known solution spaces; the human problems \u2014 communication, alignment, trust, conflict \u2014 are where engineering velocity actually lives or dies.\n\nThe daily collaboration loops that matter most: standup (what are you working on, what's blocking you), code review (how does the team maintain quality and share context), planning (how does the team decide what to build and in what order), and retrospectives (how does the team reflect on what's working and what isn't). Each of these is a ritual that compounds into culture when done consistently, and degrades into theatre when done mechanically.\n\nWritten communication is disproportionately important in engineering teams, especially distributed ones. A well-written engineering design doc \u2014 explaining the problem, the options considered, the decision made, and the rationale \u2014 replaces hours of meetings and creates a record that new team members can learn from months later. Google, Airbnb, and Stripe all have design doc cultures. The discipline of writing down architectural decisions before making them surfaces assumptions, invites feedback, and prevents revisiting settled questions.\n\nConflict is inevitable in teams where smart people care about outcomes. The productive form: technical disagreement argued with evidence, decided with data, and committed to fully once the decision is made. The dysfunctional form: personal, unresolved, and affecting code quality or team morale. "Disagree and commit" \u2014 Amazon's phrase for it \u2014 is a genuinely useful norm: you can disagree with a decision, but once it's made, you implement it fully and don't passive-aggressively undermine it.\n\nPsychological safety \u2014 the belief that you can say a wrong thing, ask a stupid question, or disagree with someone senior without punishment \u2014 is the most predictive factor in high-performing engineering teams. Google's Project Aristotle found this more important than team composition, manager quality, or any other variable. You can't control whether your team has it; you can contribute to it by modelling the behaviour: admitting mistakes openly, asking questions without self-deprecation, and responding to others' wrong answers with curiosity rather than judgment.`,
        callout: {
          type: "default",
          label: "Write It Down",
          text: "A decision made in a meeting that isn't documented doesn't exist \u2014 six months later, nobody agrees on what was decided or why. Engineering teams that write down decisions (in docs, in PR descriptions, in ADRs \u2014 Architecture Decision Records) have fewer revisited arguments and faster onboarding. The cost of writing a decision down is minutes. The benefit compounds indefinitely."
        },
        callout2: {
          type: "focus",
          label: "Disagree and Commit",
          text: "Healthy teams debate decisions vigorously before they're made and implement them fully after. The alternative \u2014 losing the debate and then half-implementing the decision \u2014 is the worst outcome. It combines the costs of the decision you didn't want (you're doing it) with the costs of the decision you wanted (you're not getting the benefits). Make your case clearly, then commit."
        },
        hint: `Your reputation on an engineering team is built almost entirely through written artefacts: code reviews, PR descriptions, design docs, Slack messages, tickets. People who have never worked with you directly will form opinions based on these. Write with precision and generosity \u2014 precise about what you mean, generous about what others mean.\n\n<strong>On meetings:</strong> A meeting without an agenda is usually replaceable with a document. A meeting without a decision or action item is a ceremony. Value your team's time as you value your own, and push for async over sync wherever the work allows it.\n\n<strong>On disagreement:</strong> The most effective way to win a technical argument is with data. "I think approach A is faster" is an opinion. "I benchmarked both approaches and A was 3x faster under load" is a data point. Arguments from data are easier to resolve and leave less residue.`,
        quiz: {
          question: "Two senior engineers disagree about the database choice for a new service. Discussion has gone in circles for a week. What is the most effective way to resolve this?",
          options: ["Escalate to the engineering manager to make the final call", "Let the engineer with more seniority decide", "Write a design doc presenting both options with their trade-offs, share it for async feedback, and set a specific decision date", "Do both implementations and see which performs better in production"],
          correct: 2,
          feedback: "A design doc forces both sides to articulate their position with reasoning, allows broader input from people not in the original discussion, and creates a record of the decision. Escalating to a manager removes ownership from the engineers closest to the problem. Defaulting to seniority bypasses the reasoning that should drive technical decisions. Building both in production is high cost for what is usually a resolvable trade-off."
        },
        checklist: ["I can work on a feature branch, get it reviewed, and merge it without breaking the main branch", "I participate in planning and refinement — I ask clarifying questions before estimating", "I update my team proactively when I'm blocked — I don't disappear for a day then report a problem", "I can give an accurate progress update without being asked", "I understand that my velocity affects the team — I flag risks early, not late"]
      },
      {
        id: "7-7",
        title: "Production and On-Call",
        body: `Production is where your code meets real users, real load, and real failure modes that staging never anticipated. The discipline of operating production systems \u2014 monitoring, alerting, incident response, post-mortem analysis \u2014 is distinct from the discipline of building them. Both are required for senior engineering competence.\n\nObservability is the property of a system that lets you understand its internal state from external outputs. The three pillars: <strong>metrics</strong> (numeric measurements over time: error rate, latency, throughput), <strong>logs</strong> (timestamped records of events: a request came in, a query ran, an error occurred), and <strong>traces</strong> (end-to-end records of a request's path through distributed services). Prometheus collects metrics. Datadog, New Relic, and Grafana visualise them. OpenTelemetry instruments traces. Without these, production is opaque \u2014 you know something is wrong but not where or why.\n\nAlerting should be actionable. An alert that fires when a metric exceeds a threshold is useful only if there is something a human can do in response. Alerts that fire constantly and are ignored \u2014 alert fatigue \u2014 are worse than no alerts, because they train the team to ignore all alerts, including the critical ones. Good alerting culture: alert on symptoms (user-facing errors) rather than causes (CPU usage), tune thresholds to eliminate false positives, and review alerts in retrospectives to remove the noise.\n\nOn-call is the rotation where engineers carry a pager \u2014 or phone \u2014 and are responsible for responding to production incidents outside business hours. It is uncomfortable and educational. The discomfort is real: being woken at 3am by an alert that a service is down is stressful. The education is also real: on-call teaches you more about how a system actually behaves \u2014 at real load, with real failures \u2014 than any amount of development work.\n\nPost-mortems are blameless analyses of what went wrong in an incident. Blameless means the focus is on system failures, process gaps, and missing safeguards \u2014 not on who made the mistake. This distinction is fundamental. When people fear being blamed, they hide information, which prevents learning. Stripe's incident response culture, like most mature engineering organisations, produces public post-mortems that document the timeline, contributing factors, and action items. These documents are some of the most valuable engineering learning available.`,
        callout: {
          type: "default",
          label: "Every Incident Is a Learning",
          text: "An incident that is resolved without a post-mortem is a wasted learning opportunity. The post-mortem process \u2014 timeline reconstruction, contributing factor analysis, action items \u2014 converts a painful experience into improved systems and processes. Teams that do blameless post-mortems consistently improve faster than teams that don't."
        },
        callout2: {
          type: "focus",
          label: "The On-Call Covenant",
          text: "If engineers are on-call for a system, they need the authority to fix it. On-call without deployment access, without the ability to change configuration, or without understanding of the system is an untenable position. The deal is: carry the pager, have the tools. Teams that put engineers on-call without tools and authority have an on-call problem, not an on-call rotation."
        },
        hint: `The fastest way to learn how a production system really works is to be on-call for it. Incidents expose assumptions that years of development work never surface. The system you think you built and the system that runs in production are always different. On-call closes that gap.\n\n<strong>Before your first on-call shift:</strong> Know how to check the health dashboard, how to read the logs, how to roll back a deployment, and who to escalate to if you're stuck. Having these answers written down \u2014 in a runbook \u2014 is a sign of a mature on-call setup.\n\n<strong>During an incident:</strong> Stay calm, communicate clearly ("I'm investigating the payment service \u2014 will update in 10 minutes"), and don't make speculative changes. The most common incident antipattern is making multiple changes simultaneously in a panic, making it impossible to know which change fixed (or further broke) the system.`,
        quiz: {
          question: "After a production incident, a post-mortem is being conducted. The on-call engineer who made the change that triggered the incident is worried about being blamed. What does 'blameless post-mortem' mean in this context?",
          options: ["The engineer will not face any consequences regardless of how serious the incident was", "The analysis focuses on systemic factors (missing safeguards, process gaps, ambiguous documentation) rather than individual blame, to maximise honest information sharing and learning", "The post-mortem is optional and the engineer can choose not to participate", "Blame is assigned to the system rather than any person for legal liability reasons"],
          correct: 1,
          feedback: "Blameless means the post-mortem investigates systems and processes, not individuals. The reasoning: if an engineer made a reasonable decision given the information available and the system's safeguards didn't prevent the outcome, the problem is the system and process, not the person. This framing encourages honest reporting of what actually happened \u2014 critical for learning. It doesn't mean engineers face no professional consequences for grossly negligent decisions; it means well-intentioned mistakes are treated as system design opportunities."
        },
        checklist: ["I can respond to a production incident with correct priority: restore service first, then diagnose", "I check logs before changing anything in a production incident", "I communicate status to stakeholders during an incident — even if the update is 'still investigating'", "I've written a post-mortem that identifies root cause and preventive measures — not blame", "I know when to escalate and who to escalate to"]
      },
      {
        id: "7-8",
        title: "The Career Ladder",
        body: `Engineering career ladders describe levels of increasing scope, independence, and impact. The labels vary: Junior, Mid, Senior, Staff, Principal, Distinguished Fellow. The progression from junior to senior describes expanding technical capability. The progression from senior upward describes expanding organisational scope \u2014 impact that reaches beyond your immediate team.\n\nJunior engineers execute defined tasks with guidance. The expectation is that you produce working code when given a clear problem, ask for help when blocked, and learn the team's norms. Mistakes are expected and handled by the system (code review, tests, staging). The primary growth edge is increasing the scope of what you can execute independently.\n\nMid-level engineers own features end-to-end. You take a requirement from ticket to production without being guided through each step. You debug independently, review others' code, and contribute to technical discussions. The primary growth edge is increasing the ambiguity you can handle \u2014 moving from "implement this spec" to "figure out how to solve this problem."\n\nSenior engineers own problems, not tasks. They understand the business context behind technical decisions, push back on requirements that would create unnecessary complexity, mentor more junior engineers, and make architectural decisions that affect the team's velocity for months. The primary growth edge is multiplying others' effectiveness rather than only your own.\n\nStaff engineers and above work at the organisational level. They identify the technical problems the company doesn't know it has yet. They define technical strategy, build alignment across teams, and make decisions that affect multiple engineering organisations. The competencies at this level are partly technical and heavily about communication, influence, and systems thinking at an organisational scale.`,
        callout: {
          type: "default",
          label: "Scope Is the Ladder",
          text: "Promotion is fundamentally about demonstrating that you already operate at the next level. Asking for a promotion before demonstrating the behaviours is common and ineffective. Operating at the next level consistently, then asking for the title to match, is the sequence that works. The gap is usually: at what scope does your influence extend?"
        },
        callout2: {
          type: "focus",
          label: "The Senior Engineer Shift",
          text: "The most important shift in a senior engineer career is moving from 'how do I build this?' to 'should we build this, and if so, why this way?' Questioning requirements, surfacing trade-offs, and thinking about long-term maintainability are senior behaviours. Junior engineers implement the plan. Senior engineers shape the plan."
        },
        hint: `The engineers who get promoted aren't necessarily the best coders. They're the ones who make their teams more effective. Code quality matters. Communication matters more at senior levels. Making your work legible to others \u2014 well-documented PRs, clear design docs, proactive updates \u2014 is what gets you noticed for promotion.\n\n<strong>Ask for a career growth conversation early:</strong> In your first three months, ask your manager what the next level looks like and what you'd need to demonstrate to get there. This conversation aligns you and gives you a target. Many engineers wait for their annual review to get this information \u2014 that's a year of potentially growing in the wrong direction.\n\n<strong>The hidden key to promotion:</strong> Make your manager's job easier. Proactively communicate what you're working on, flag blockers early, and handle the things in your scope without requiring follow-up. Managers promote engineers whose work they trust to be visible and complete.`,
        quiz: {
          question: "A mid-level engineer consistently delivers high-quality code on assigned tasks but rarely participates in technical discussions and has not mentored any junior engineers. What is the most accurate assessment of their career progression?",
          options: ["They're ready for senior and should request a promotion based on their code quality", "They're demonstrating mid-level competence but missing the broader contributions (technical leadership, mentoring, independent problem scoping) required for senior", "They should focus on shipping faster before worrying about mentoring", "Their situation is fine \u2014 code quality is the primary criterion for promotion"],
          correct: 1,
          feedback: "Senior engineering is not a function of code quality alone. A mid-level engineer who executes assigned tasks well is meeting the mid-level bar. Senior requires demonstrating expanded scope: contributing to technical direction, mentoring others, taking ownership of ambiguous problems, and making the team more effective. These are different skills that require deliberate development alongside technical craft."
        },
        checklist: ["I understand the difference between individual contributor and engineering management tracks", "I can identify the skills gap between my current level and the next level above me", "I actively seek feedback — not just during reviews — and use it to direct my practice", "I've taken on at least one project that stretched me beyond my current comfortable capability", "I know what 'staff engineer' or 'principal engineer' means at real companies and what those roles require"]
      },
      {
        id: "7-9",
        title: "Engineering Leadership",
        body: `Engineering leadership is not the same as engineering management. Management involves direct reports, performance reviews, headcount, and organisational structure. Leadership is about influence \u2014 shaping how technical work gets done, setting standards, enabling other engineers, and moving the organisation in the right direction. You can lead without being a manager. You can be a manager without leading. The best engineering organisations have both.\n\nTechnical leadership at the senior and staff level manifests in specific behaviours. Writing design docs that help the team make better decisions. Setting up coding standards that reduce review friction. Giving talks that transfer knowledge across teams. Mentoring engineers who then mentor others. Identifying the technical problem the company doesn't know it has yet \u2014 and driving the solution. These compound over time and their impact is felt long after the individual engineer has moved on.\n\nEngineering management is a separate career track that some engineers choose. The manager's job is to ensure the team has clear goals, the context to make good decisions, the feedback to grow, and the support to remove blockers. Good engineering managers were usually strong engineers first \u2014 the technical credibility is needed to have informed conversations about trade-offs and to earn team trust. But the skills are genuinely different: coaching, hiring, performance management, and cross-functional coordination are not extensions of coding skills.\n\nThe most common mistake in the engineering-to-management transition: continuing to do the engineering work rather than enabling others to do it. A manager who codes instead of coaching is getting in their reports' way. The hardest part of the transition is that shipping code feels productive and impactful in an immediate, measurable way. Enabling someone else to grow and ship is slower feedback and less personally visible. The leverage ratio is completely different \u2014 ten engineers shipping well is 10x a single manager shipping well \u2014 but it takes time to feel that.\n\nMany engineers find that the technical leadership path \u2014 Staff, Principal, Distinguished Engineer \u2014 is more aligned with what they actually want than people management. This path is available at most large tech companies now, and it's a legitimate, senior, and well-compensated path. The decision between IC (individual contributor) and management is not a judgment about ambition. It's a judgment about where you create the most value and what work you find fulfilling.`,
        callout: {
          type: "default",
          label: "Leadership Is a Practice",
          text: "Engineering leadership is not a title conferred on you. It's a set of behaviours practised consistently: sharing knowledge, raising the team's quality bar, mentoring, asking the inconvenient questions, and taking ownership of problems that don't have a clear owner. These behaviours are available to engineers at every level."
        },
        callout2: {
          type: "focus",
          label: "The Manager's Primary Job",
          text: "A good engineering manager's job is not to have the best technical ideas \u2014 it's to create the conditions where the team produces good technical ideas. That means clear goals, psychological safety, useful feedback, and protection from organisational noise. Managers who substitute their technical opinions for their reports' are underusing their engineers and over-using themselves."
        },
        hint: `The question of whether to go into management should be answered by what you want to do every day, not by what you think is more prestigious or better paid. Management involves significantly more communication, less coding, and different sources of satisfaction. Take an honest inventory before deciding.\n\n<strong>Try leadership before committing to management:</strong> Mentor a junior engineer. Lead a design doc process. Run a team retrospective. Own a cross-team technical initiative. These give you real data about whether leadership work is energising or draining for you.\n\n<strong>On the staff engineer path:</strong> The Staff+ track requires that your influence extends meaningfully beyond your immediate team. This usually means driving alignment across teams, setting technical standards, and identifying and solving the problems that are blocking multiple teams. If your influence is mostly within your team, you're operating at the senior level regardless of title.`,
        quiz: {
          question: "A senior engineer is considering whether to pursue engineering management or the staff individual contributor track. What is the most useful framework for making this decision?",
          options: ["Choose management \u2014 it has higher compensation and more career progression", "Choose staff IC \u2014 staying technical is always better than going into management", "Reflect on what you want to do daily: management is primarily coaching, communication, and organisational coordination; staff IC is primarily technical leadership and cross-team influence. Choose based on which work you find energising", "Ask your current manager what they recommend based on your skills"],
          correct: 2,
          feedback: "The IC vs management decision is fundamentally about what kind of work you find meaningful and energising. Compensation is similar at senior levels across both tracks. Prestige is not a useful criterion. Your manager's recommendation is input, not the answer. The people who make the transition successfully and stay effective are those who genuinely want to do the work of management \u2014 not those who thought it was the next logical step."
        },
        checklist: ["I can give clear technical context to a non-technical stakeholder without condescension or jargon", "I understand that the best technical decision sometimes isn't the one you'd make with unlimited time", "I've helped a junior engineer grow a specific skill — not just reviewed their code", "I create technical artefacts (RFCs, ADRs, runbooks) that help the team operate without me present", "I understand that engineering leadership is about multiplying team capability, not individual output"]
      },
      {
        id: "7-10",
        title: "The Long Game",
        body: `A software engineering career is not a sprint to a destination. It's a compounding investment that pays increasing returns over time if the fundamentals are right. The engineers who are most effective at 15 years in are not those who learned the most frameworks. They're the ones who built deep judgment, maintained intellectual curiosity, cultivated strong professional relationships, and developed the communication skills to translate technical decisions into terms non-technical stakeholders can act on.\n\nLearning strategy changes as you become more senior. Early career: learn the fundamentals deeply (algorithms, systems, the properties of the languages you use). Mid career: learn adjacent skills that multiply your effectiveness (product thinking, data fluency, communication). Senior and above: learn through doing high-stakes, high-ambiguity work that you haven't done before. The frontier moves. Your learning approach should move with it.\n\nRelationships are professional infrastructure. The engineers you work with closely in your 20s and 30s become the senior leaders who recommend you for roles, invest in your startup, or invite you into interesting projects in your 40s. Technical skill gets you in the room; relationships keep you in the network. This is not cynical \u2014 it's the observed mechanics of how careers actually work. Build genuine relationships, not transactional ones.\n\nBurnout is a real occupational hazard in engineering. High cognitive load, deadline pressure, always-on communication, and the pressure to keep up with a rapidly evolving field can accumulate into exhaustion that doesn't respond to a week off. The engineers who avoid burnout share practices: they protect focused work time aggressively, they maintain interests outside engineering, they set sustainable pace expectations rather than heroic ones, and they escalate scope creep before it becomes overtime.\n\nThe honest truth about the long game: most of what you learn in the first two years of your career will be superseded. The frameworks will change. The languages will evolve. The architectures will shift. What won't change: your ability to learn, to think systematically, to communicate clearly, and to build trust with the people you work with. Invest disproportionately in those fundamentals.`,
        callout: {
          type: "default",
          label: "Fundamentals Over Frameworks",
          text: "React will be replaced. Node will evolve. Kubernetes will be abstracted away. The fundamentals \u2014 how computers work, how networks work, how databases work, how to reason about complexity \u2014 will not be replaced. Every hour invested in fundamentals compounds across every technology you'll ever use. Every hour invested in framework-specific knowledge has a deprecation date."
        },
        callout2: {
          type: "focus",
          label: "Pace Is Strategy",
          text: "Sustained 60-hour weeks produce less output than consistent 40-hour weeks over a year because of the cognitive degradation that accumulates. Engineering that requires heroic effort to maintain is poorly structured engineering. Optimise for a pace you can sustain for decades, not sprints you can sustain for months. The engineers with the most impact over long careers are almost uniformly those who worked sustainably."
        },
        hint: `The most underrated long-game move: staying curious about the work itself. The engineers who remain excellent at 20 years are genuinely interested in the craft \u2014 they're excited about new ideas not because they need to be but because they still find them interesting. If you stop finding the work interesting, that's worth taking seriously as information, not suppressing.\n\n<strong>Career insurance:</strong> Write. Teach. Speak. Engineers with a public record of their thinking \u2014 blog posts, talks, open source, documented work \u2014 are resilient to layoffs and downturns in ways that engineers who only work internally are not. A public record is career insurance.\n\n<strong>On regrets:</strong> The most common regret engineers report late in their careers is not writing enough, not building enough in public, and not investing enough in relationships. The technical skills were fine. The artefacts and connections that would have made the work visible and durable are what was missing. Start now. Literally now.`,
        quiz: {
          questions: [
            {
              question: "A production incident is happening: users can't log in. You're on call. What is the correct order of actions?",
              options: [
                "Find the root cause → fix the code → deploy → notify users",
                "Restore service first (rollback, feature flag, cache clear) → notify stakeholders → diagnose root cause → implement and test a proper fix → post-mortem",
                "Notify users → escalate to the team → wait for someone more senior to fix it",
                "Rewrite the authentication system to prevent future issues"
              ],
              correct: 1,
              feedback: "Incident response priority: (1) Restore service — the fastest path to users being able to log in again, even if it's a rollback. (2) Communicate — stakeholders need to know. (3) Diagnose — what actually caused it? (4) Fix properly with tests. (5) Post-mortem — what process changes prevent recurrence? Never diagnose and fix while users are blocked if a faster restore path exists."
            },
            {
              question: "You receive a code review comment you disagree with. The reviewer is more senior. How should you respond?",
              options: [
                "Accept all feedback from more senior engineers — they know better",
                "Reject the feedback privately — implement your approach anyway",
                "Respond with your reasoning: 'I chose this approach because [specific reason]. I'm open to [their suggestion] but I think the trade-off is [specific thing]. Can we discuss?'",
                "Escalate immediately to the engineering manager"
              ],
              correct: 2,
              feedback: "Code review is a technical discussion, not a hierarchy exercise. If you have a genuine technical reason for your approach, explain it clearly and professionally. Senior engineers can be wrong; juniors can be right. 'I disagree because X' followed by openness to discussion is professional. Silently accepting feedback you disagree with produces worse code; silently ignoring feedback is disrespectful to the process."
            },
            {
              question: "What is the long-term pattern that distinguishes engineers who advance from those who plateau?",
              options: [
                "Working longer hours than colleagues",
                "Specialising deeply in one technology and never leaving their comfort zone",
                "Continuously investing in fundamentals, seeking feedback, writing and teaching, and working on increasingly complex problems",
                "Switching companies frequently to get salary increases"
              ],
              correct: 2,
              feedback: "Engineering growth compounds: fundamentals (data structures, system design, debugging) improve your ceiling. Feedback reveals blind spots you can't see yourself. Writing and teaching crystallise what you know and build your reputation. Working on harder problems is the only way to develop the skill to solve harder problems. The plateau happens when comfort replaces challenge."
            },
            {
              question: "A colleague writes: 'This is a clever solution!' in a PR description. Is 'clever' code desirable in production?",
              options: [
                "Yes — clever code demonstrates technical skill and impresses other engineers",
                "No — clever code is typically harder to read, debug, and maintain. The best production code is boring: clear names, obvious logic, and predictable patterns",
                "It depends on the language — clever code is acceptable in Python but not in JavaScript",
                "Yes — if the code is correct and passes tests, cleverness doesn't matter"
              ],
              correct: 1,
              feedback: "'Clever' in code is usually a warning sign. Code is read far more often than it's written. Clever solutions optimise for impressing the author's past self at the expense of every future reader, including the author six months later. The best code reads like prose: obvious at a glance, easy to modify. When you're tempted to write something clever, ask: what would this look like if it were boring? Usually the boring version is better."
            },
            {
              question: "You're three years into your engineering career. How should you measure progress?",
              options: [
                "Number of commits and lines of code written",
                "Salary increases relative to peers",
                "The complexity of problems you can solve independently, the quality of your system design decisions, and the clarity of your technical communication — not just output metrics",
                "Number of programming languages you've learned"
              ],
              correct: 2,
              feedback: "Lines of code is a vanity metric — deleting 500 lines of complexity might be more valuable than writing 500 new ones. Real progress: can you break down an ambiguous requirement into a concrete implementation plan? Can you design a system that will work at 10x current scale? Can you explain a complex technical decision to a non-technical stakeholder? These capabilities compound. Output metrics don't."
            }
          ]
        },
        checklist: ["I have a sustainable learning practice — regular, deliberate, not heroic-effort sprints", "I'm investing in professional relationships — people I learn from, collaborate with, and can call on", "I know the signs of burnout in myself and have concrete strategies to prevent it", "I'm building public artefacts — writing, open source, documentation — that compound over time", "I can honestly describe where I am now, where I want to be in three years, and what the path looks like"]
      }
    ]
  }
];

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
        awardXP(15, 'match-' + mid, window.innerWidth / 2, 300);
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
// ── SAGE API CONFIG ────────────────────────────────────────────────────────
// To enable live AI responses, set your Anthropic API key here.
// Leave as null to use built-in contextual guidance instead.
const SAGE_API_KEY = null;
const SAGE_TOTAL_USES = 10;

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
  sageUsesLeft: SAGE_TOTAL_USES,
  challengesDone: {},
  streakProtectedToday: false
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
      state.sageUsesLeft = (s.sageUsesLeft !== undefined) ? s.sageUsesLeft : SAGE_TOTAL_USES;
      state.challengesDone = s.challengesDone || {};
      state.streakProtectedToday = s.streakProtectedToday || false;
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
    sageUsesLeft: state.sageUsesLeft,
    challengesDone: state.challengesDone || {},
    streakProtectedToday: state.streakProtectedToday || false
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

// ── Landing canvas: twinkling code background ──────────────────────────────

var _landingRAF = null;

function startLandingCanvas() {
  var canvas = document.getElementById('landing-canvas');
  if (!canvas) return;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  canvas._lcResize = resize;
  window.addEventListener('resize', resize);

  // [x_frac, y_frac, text]
  var lines = [
    [0.01, 0.04, 'function fetchData(url) {'],
    [0.01, 0.07, '  return fetch(url)'],
    [0.01, 0.09, '    .then(r => r.json())'],
    [0.01, 0.11, '    .catch(err => null);'],
    [0.01, 0.13, '}'],
    [0.01, 0.22, 'const state = { user: null, xp: 0 };'],
    [0.01, 0.25, 'localStorage.setItem(key,'],
    [0.01, 0.27, '  JSON.stringify(state));'],
    [0.01, 0.35, 'try {'],
    [0.01, 0.37, '  const v = JSON.parse(raw);'],
    [0.01, 0.39, '  setState(v);'],
    [0.01, 0.41, '} catch(e) { return false; }'],
    [0.01, 0.50, 'for (let i = 0; i < n; i++) {'],
    [0.01, 0.52, '  if (arr[i] > max) max = arr[i];'],
    [0.01, 0.54, '}'],
    [0.01, 0.63, 'const lerp = (a, b, t) =>'],
    [0.01, 0.65, '  a + (b - a) * Math.max(0,'],
    [0.01, 0.67, '    Math.min(1, t));'],
    [0.01, 0.76, 'return false;'],
    [0.01, 0.80, 'export { lerp, clamp, round };'],
    [0.01, 0.87, 'returnValue = setStateValue(key, v);'],
    [0.72, 0.03, 'const main = async () => {'],
    [0.72, 0.05, '  const n = parseInt(input);'],
    [0.72, 0.07, '  for (let i=2; i<=n; i++) {'],
    [0.72, 0.09, '    fib[i] = fib[i-1]+fib[i-2];'],
    [0.72, 0.11, '  }'],
    [0.72, 0.13, '  return fib[n];'],
    [0.72, 0.15, '};'],
    [0.72, 0.24, 'SELECT id, username, email,'],
    [0.72, 0.26, '       created_at'],
    [0.72, 0.28, 'FROM users'],
    [0.72, 0.30, 'WHERE active = 1'],
    [0.72, 0.32, 'ORDER BY created_at DESC'],
    [0.72, 0.34, 'LIMIT 50;'],
    [0.72, 0.43, 'const cloneDeep = (obj) => {'],
    [0.72, 0.45, '  if (typeof obj !== "object")'],
    [0.72, 0.47, '    return obj;'],
    [0.72, 0.49, '  return JSON.parse('],
    [0.72, 0.51, '    JSON.stringify(obj)'],
    [0.72, 0.53, '  );'],
    [0.72, 0.55, '};'],
    [0.72, 0.64, 'function quickSort(arr) {'],
    [0.72, 0.66, '  if (!arr.length) return arr;'],
    [0.72, 0.68, '  const pivot = arr[Math.floor('],
    [0.72, 0.70, '    arr.length / 2)];'],
    [0.72, 0.72, '  const left  = arr.filter(x => x < pivot);'],
    [0.72, 0.74, '  const right = arr.filter(x => x > pivot);'],
    [0.72, 0.76, '  return [...quickSort(left),'],
    [0.72, 0.78, '    pivot, ...quickSort(right)];'],
    [0.72, 0.80, '}'],
  ];

  var ls = lines.map(function() {
    return {
      phase:     Math.random() * Math.PI * 2,
      speed:     0.25 + Math.random() * 0.9,
      baseAlpha: 0.16 + Math.random() * 0.12,
      spark:     0,
      sparkDecay: 1.2 + Math.random() * 1.4,
      sparkColor: Math.random() > 0.5 ? 0 : 1, // 0=cyan, 1=green
    };
  });

  // Schedule random spark events
  function spark() {
    var idx = Math.floor(Math.random() * ls.length);
    ls[idx].spark = 0.65 + Math.random() * 0.35;
    canvas._lcSpark = setTimeout(spark, 60 + Math.random() * 200);
  }
  spark();

  var t0 = performance.now() / 1000;
  var lastT = t0;

  function draw() {
    var now = performance.now() / 1000;
    var dt  = Math.min(0.05, now - lastT);
    lastT   = now;
    var t   = now - t0;
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');

    // Background gradient
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,   '#000a18');
    bg.addColorStop(0.5, '#000d22');
    bg.addColorStop(1,   '#000814');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.font = '11px "IBM Plex Mono",Consolas,monospace';
    ctx.textBaseline = 'top';

    lines.forEach(function(line, i) {
      var s = ls[i];
      var twinkle = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
      var a = s.baseAlpha * (0.35 + 0.65 * twinkle);

      if (s.spark > 0) {
        s.spark = Math.max(0, s.spark - dt * s.sparkDecay);
      }

      var glowing = s.spark > 0.05;
      var fa = Math.min(0.95, a + s.spark * 0.75);

      ctx.save();
      if (glowing) {
        ctx.shadowColor = s.sparkColor === 0
          ? 'rgba(0,230,255,' + (s.spark * 0.95).toFixed(2) + ')'
          : 'rgba(0,255,160,' + (s.spark * 0.95).toFixed(2) + ')';
        ctx.shadowBlur = 12 + s.spark * 24;
      } else {
        ctx.shadowColor = 'rgba(80,200,195,0.35)';
        ctx.shadowBlur = 4;
      }
      ctx.fillStyle = 'rgba(80,200,195,' + fa.toFixed(3) + ')';
      ctx.fillText(line[2], line[0] * W, line[1] * H);
      ctx.restore();
    });

    _landingRAF = requestAnimationFrame(draw);
  }

  draw();
}

function stopLandingCanvas() {
  if (_landingRAF) { cancelAnimationFrame(_landingRAF); _landingRAF = null; }
  var canvas = document.getElementById('landing-canvas');
  if (canvas) {
    if (canvas._lcResize) { window.removeEventListener('resize', canvas._lcResize); canvas._lcResize = null; }
    if (canvas._lcSpark)  { clearTimeout(canvas._lcSpark); canvas._lcSpark = null; }
  }
}

// ── Hub canvas: twinkling code background (theme-coloured) ─────────────────

var _hubRAF = null;

function getHubThemeRGB() {
  var id = getProfTheme();
  var map = {
    'cosmic-blue':   [0, 180, 255],
    'aurora-teal':   [0, 220, 160],
    'royal-violet':  [168, 85, 247],
    'ember-crimson': [255, 80, 80],
    'obsidian-gold': [200, 169, 110],
  };
  return map[id] || [0, 180, 255];
}

function startHubCanvas() {
  stopHubCanvas();
  var canvas = document.getElementById('hub-canvas');
  if (!canvas) return;

  var rgb = getHubThemeRGB();
  var cr = rgb[0], cg = rgb[1], cb = rgb[2];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  canvas._hcResize = resize;
  window.addEventListener('resize', resize);

  var lines = [
    // Left column
    [0.01, 0.02, 'import { useState, useEffect } from "react";'],
    [0.01, 0.04, 'function fetchData(url) {'],
    [0.01, 0.06, '  return fetch(url)'],
    [0.01, 0.08, '    .then(r => r.json())'],
    [0.01, 0.10, '    .catch(err => null);'],
    [0.01, 0.12, '}'],
    [0.01, 0.18, 'const state = { user: null, xp: 0 };'],
    [0.01, 0.20, 'localStorage.setItem(key,'],
    [0.01, 0.22, '  JSON.stringify(state));'],
    [0.01, 0.28, 'try {'],
    [0.01, 0.30, '  const v = JSON.parse(raw);'],
    [0.01, 0.32, '  setState(v);'],
    [0.01, 0.34, '} catch(e) { return false; }'],
    [0.01, 0.40, 'for (let i = 0; i < n; i++) {'],
    [0.01, 0.42, '  if (arr[i] > max) max = arr[i];'],
    [0.01, 0.44, '}'],
    [0.01, 0.50, 'const lerp = (a, b, t) =>'],
    [0.01, 0.52, '  a + (b - a) * Math.max(0,'],
    [0.01, 0.54, '    Math.min(1, t));'],
    [0.01, 0.60, 'return false;'],
    [0.01, 0.63, 'export { lerp, clamp, round };'],
    [0.01, 0.70, 'const debounce = (fn, ms) => {'],
    [0.01, 0.72, '  let timer;'],
    [0.01, 0.74, '  return (...args) => {'],
    [0.01, 0.76, '    clearTimeout(timer);'],
    [0.01, 0.78, '    timer = setTimeout(fn, ms);'],
    [0.01, 0.80, '  };'],
    [0.01, 0.82, '};'],
    [0.01, 0.88, 'returnValue = setStateValue(key, v);'],
    [0.01, 0.91, 'class EventEmitter {'],
    [0.01, 0.93, '  on(e, fn) { (this._m[e] ||= []).push(fn); }'],
    [0.01, 0.95, '}'],
    // Centre column
    [0.37, 0.05, 'type User = {'],
    [0.37, 0.07, '  id: number;'],
    [0.37, 0.09, '  name: string;'],
    [0.37, 0.11, '  role: "admin" | "user";'],
    [0.37, 0.13, '};'],
    [0.37, 0.20, 'async function getUser(id) {'],
    [0.37, 0.22, '  const res = await fetch('],
    [0.37, 0.24, '    `/api/users/${id}`'],
    [0.37, 0.26, '  );'],
    [0.37, 0.28, '  return res.json();'],
    [0.37, 0.30, '}'],
    [0.37, 0.37, 'const [count, setCount]'],
    [0.37, 0.39, '  = useState(0);'],
    [0.37, 0.41, 'useEffect(() => {'],
    [0.37, 0.43, '  document.title = count;'],
    [0.37, 0.45, '}, [count]);'],
    [0.37, 0.52, 'function memoize(fn) {'],
    [0.37, 0.54, '  const cache = new Map();'],
    [0.37, 0.56, '  return function(...a) {'],
    [0.37, 0.58, '    const k = JSON.stringify(a);'],
    [0.37, 0.60, '    if (cache.has(k)) return cache.get(k);'],
    [0.37, 0.62, '    const r = fn(...a);'],
    [0.37, 0.64, '    cache.set(k, r); return r;'],
    [0.37, 0.66, '  };'],
    [0.37, 0.68, '}'],
    [0.37, 0.75, 'const pipe = (...fns) =>'],
    [0.37, 0.77, '  x => fns.reduce('],
    [0.37, 0.79, '    (v, f) => f(v), x'],
    [0.37, 0.81, '  );'],
    [0.37, 0.88, 'module.exports = { pipe };'],
    // Right column
    [0.73, 0.02, 'const main = async () => {'],
    [0.73, 0.04, '  const n = parseInt(input);'],
    [0.73, 0.06, '  for (let i=2; i<=n; i++) {'],
    [0.73, 0.08, '    fib[i] = fib[i-1]+fib[i-2];'],
    [0.73, 0.10, '  }'],
    [0.73, 0.12, '  return fib[n];'],
    [0.73, 0.14, '};'],
    [0.73, 0.21, 'SELECT id, username, email,'],
    [0.73, 0.23, '       created_at'],
    [0.73, 0.25, 'FROM users'],
    [0.73, 0.27, 'WHERE active = 1'],
    [0.73, 0.29, 'ORDER BY created_at DESC'],
    [0.73, 0.31, 'LIMIT 50;'],
    [0.73, 0.38, 'const cloneDeep = (obj) => {'],
    [0.73, 0.40, '  if (typeof obj !== "object")'],
    [0.73, 0.42, '    return obj;'],
    [0.73, 0.44, '  return JSON.parse('],
    [0.73, 0.46, '    JSON.stringify(obj)'],
    [0.73, 0.48, '  );'],
    [0.73, 0.50, '};'],
    [0.73, 0.57, 'function quickSort(arr) {'],
    [0.73, 0.59, '  if (!arr.length) return arr;'],
    [0.73, 0.61, '  const pivot = arr[Math.floor('],
    [0.73, 0.63, '    arr.length / 2)];'],
    [0.73, 0.65, '  const left  = arr.filter('],
    [0.73, 0.67, '    x => x < pivot);'],
    [0.73, 0.69, '  const right = arr.filter('],
    [0.73, 0.71, '    x => x > pivot);'],
    [0.73, 0.73, '  return [...quickSort(left),'],
    [0.73, 0.75, '    pivot, ...quickSort(right)];'],
    [0.73, 0.77, '}'],
    [0.73, 0.84, 'git commit -m "feat: add hub canvas"'],
    [0.73, 0.87, 'git push origin main'],
    [0.73, 0.91, 'npm run build && npm test'],
    [0.73, 0.94, 'docker compose up --build'],
  ];

  var ls = lines.map(function() {
    return {
      phase:      Math.random() * Math.PI * 2,
      speed:      0.25 + Math.random() * 0.9,
      baseAlpha:  0.18 + Math.random() * 0.12,
      spark:      0,
      sparkDecay: 1.2 + Math.random() * 1.4,
    };
  });

  function scheduleSpark() {
    var idx = Math.floor(Math.random() * ls.length);
    ls[idx].spark = 0.65 + Math.random() * 0.35;
    canvas._hcSpark = setTimeout(scheduleSpark, 60 + Math.random() * 220);
  }
  scheduleSpark();

  var t0 = performance.now() / 1000;
  var lastT = t0;

  function draw() {
    var now = performance.now() / 1000;
    var dt  = Math.min(0.05, now - lastT);
    lastT   = now;
    var t   = now - t0;
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, W, H);
    ctx.font = '11px "IBM Plex Mono",Consolas,monospace';
    ctx.textBaseline = 'top';

    lines.forEach(function(line, i) {
      var s = ls[i];
      var twinkle = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
      var a = s.baseAlpha * (0.35 + 0.65 * twinkle);
      if (s.spark > 0) s.spark = Math.max(0, s.spark - dt * s.sparkDecay);
      var glowing = s.spark > 0.05;
      var fa = Math.min(0.95, a + s.spark * 0.6);

      ctx.save();
      if (glowing) {
        ctx.shadowColor = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + (s.spark * 0.9).toFixed(2) + ')';
        ctx.shadowBlur  = 12 + s.spark * 20;
      } else {
        ctx.shadowColor = 'rgba(' + cr + ',' + cg + ',' + cb + ',0.20)';
        ctx.shadowBlur  = 3;
      }
      ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + fa.toFixed(3) + ')';
      ctx.fillText(line[2], line[0] * W, line[1] * H);
      ctx.restore();
    });

    _hubRAF = requestAnimationFrame(draw);
  }

  draw();
}

function stopHubCanvas() {
  if (_hubRAF) { cancelAnimationFrame(_hubRAF); _hubRAF = null; }
  var canvas = document.getElementById('hub-canvas');
  if (canvas) {
    if (canvas._hcResize) { window.removeEventListener('resize', canvas._hcResize); canvas._hcResize = null; }
    if (canvas._hcSpark)  { clearTimeout(canvas._hcSpark); canvas._hcSpark = null; }
  }
}

function showAuthFromLanding() {
  // Check if user has already started \u2014 skip auth and go straight in
  const sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  const completedCount = Object.keys(state.completed).filter(function(k) {
    return sectionIds.has(k) && state.completed[k];
  }).length;
  const hasStarted = completedCount > 0 || state.currentSection > 0 || state.currentFloor > 1 || state.xp > 0;
  if (hasStarted) {
    // Returning user — go straight into the app
    loadState();
    updateStreak();
    stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('app').style.display = 'block';
    applyTheme();
    launchApp();
  } else {
    // New user — show onboarding or auth
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
  const overlay = document.getElementById('leaderboard-overlay');
  overlay.style.display = 'flex';
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">Leaderboard unavailable.</div>';
  try {
    const rows = null;
    if (!rows || rows.length === 0) {
      list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">No entries yet. Be the first!</div>';
      return;
    }
    const medals = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
    list.innerHTML = rows.map((r, i) => `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface);border:1px solid ${i === 0 ? '#c8a96e' : i === 1 ? '#aaaaaa' : i === 2 ? '#cd7f32' : 'var(--border)'};border-radius:10px;${i === 0 ? 'box-shadow:0 0 20px rgba(200,169,110,0.15);' : ''}">
        <div style="font-size:${i < 3 ? '24px' : '14px'};width:36px;text-align:center;font-family:'IBM Plex Mono',monospace;color:var(--text-muted);">${medals[i] || '' + (i+1) + ''}</div>
        <div style="flex:1;">
          <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:15px;">${r.username || 'Anonymous'}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--floor3);">\uD83D\uDD25 ${r.streak || 0} day streak</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:18px;color:var(--accent);font-weight:700;">${r.xp || 0}</div>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:1px;">XP</div>
        </div>
      </div>
    `).join('');
  } catch(e) {
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

  try {
    msg.textContent = 'Password reset is not available.';
    msg.className = 'auth-message error';
  } catch(e) {
    msg.textContent = 'Something went wrong. Please try again.';
    msg.className = 'auth-message error';
  }
}

function populateDashboard() {
  // Apply saved profile colour theme to body on startup
  applyProfThemeToBody(getProfTheme());
  // Apply saved cover screen theme (independent from app theme)
  applyCoverTheme(getCoverTheme());

  // Show the landing overlay and start animated canvas
  var landing = document.getElementById('new-user-landing');
  if (landing) {
    landing.style.display = 'block';
    landing.style.position = 'fixed';
    landing.style.top = '0';
    landing.style.left = '0';
    landing.style.width = '100vw';
    landing.style.height = '100vh';
    landing.style.zIndex = '99999';
    landing.style.background = 'transparent';
    startLandingCanvas();
  }
  var cover = document.getElementById('cover');
  if (cover) cover.style.display = 'none';
}

function trackDailySection() {
  const today = new Date().toDateString();
  const todayKey = 'daily_sections_' + (today) + '';
  const current = parseInt(localStorage.getItem(todayKey) || '0');
  const newCount = current + 1;
  localStorage.setItem(todayKey, newCount);

  const dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal') || '1');
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
    document.getElementById('cover').style.display = 'flex';
    populateDashboard();
  }
}

function showPrivacy() {
  document.getElementById('privacy-overlay').style.display = 'flex';
}

function hidePrivacy() {
  document.getElementById('privacy-overlay').style.display = 'none';
}

async function handleForgotPassword() {
  const email = document.getElementById('auth-email').value.trim();
  const msg = document.getElementById('auth-message');
  if (!email) {
    msg.textContent = 'Enter your email address first, then tap Forgot your password.';
    msg.className = 'auth-message error';
    return;
  }
  msg.textContent = 'Password reset is not available.';
  msg.className = 'auth-message error';
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

async function onUserLoggedIn() {
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
}

async function signOut() {
  currentUser = null;
  localStorage.removeItem('codebook_user');
  localStorage.removeItem('codebook_v1');
  document.getElementById('user-bar').style.display = 'none';
  document.getElementById('app').style.display = 'none';
  var ag = document.querySelector('.app-grid'); if (ag) ag.style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  document.getElementById('cover-user').style.display = 'none';
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
  var byFloor = [25, 35, 50, 65, 80, 100, 125];
  return byFloor[fi] !== undefined ? byFloor[fi] : 25;
}

function getFloorXP(fi) {
  var byFloor = [150, 200, 300, 400, 500, 600, 750];
  return byFloor[fi] !== undefined ? byFloor[fi] : 250;
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
  spawnGoldenDust(x || window.innerWidth / 2, y || 200);
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
  if (state.lastVisit === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastVisit === yesterday) {
    state.streak += 1;
    state.streakProtectedToday = false; // reset for new day
  } else if (state.lastVisit !== null) {
    state.streak = 0;
    state.streakProtectedToday = false;
  }
  state.lastVisit = today;
  saveState();
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

function startSectionTimer(sectionId) {
  state.sectionStartTime = Date.now();
  setTimeout(() => {
    const key = 'read-' + (sectionId) + '';
    if (!state.xpAwarded[key]) {
      awardXP(10, key, window.innerWidth - 100, 100);
    }
  }, 20000);
}

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return '' + (h) + 'h ' + (m) + 'm';
  return '' + (m) + 'm';
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
  const challengeDone = localStorage.getItem('codebook_challenge_done_' + today);
  if (!challengeDone) {
    setTimeout(() => showDailyChallenge(), 800);
  }
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

  // Render content
  renderNav();
  renderLearnHub();
  updateTimeLog();
  updateXPPanel();
  resetSageIdleTimer();

  // Wire up new layout sidebars
  setTimeout(function() {
    renderAllNav();
    initSageSidebarSync();
    patchRenderNav();
    updateAchievements();
    updateDailyGoalBar();
    updateLeftStats();
    updateTopChips();
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
  }
}

function onboardingSelect(field, value) {
  onboardingData[field] = value;
  if (field === 'experience') {
    document.getElementById('onboarding-step-2').style.display = 'none';
    document.getElementById('onboarding-step-3').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Almost there.';
    document.getElementById('onboarding-body').textContent = 'Last question \u2014 and then we begin.';
  } else if (field === 'goal') {
    onboardingData.goal = value;
    localStorage.setItem('codebook_goal', value);

    document.getElementById('onboarding-step-3').style.display = 'none';
    document.getElementById('onboarding-step-4').style.display = 'block';

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
  } else {
    document.getElementById('auth-screen').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// --- DAILY CHALLENGE SYSTEM ---
const DAILY_CHALLENGES = [
  { title: "What does HTML stand for?", question: "Choose the correct answer:", options: ["Hyper Text Markup Language", "High Text Making Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correct: 0, explanation: "HTML stands for HyperText Markup Language. It is the standard language used to create and structure content on the web.", xp: 20 },
  { title: "CSS stands for...", question: "Choose the correct answer:", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 1, explanation: "CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen.", xp: 20 },
  { title: "Which tag creates a heading?", question: "Which HTML tag creates the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2, explanation: "The h1 tag creates the largest heading. Headings go from h1 (largest) to h6 (smallest).", xp: 20 },
  { title: "What is a variable?", question: "In coding, a variable is...", options: ["A type of HTML tag", "A named container that stores a value", "A CSS property", "A type of loop"], correct: 1, explanation: "A variable is a named container that stores a value. You can think of it like a labelled box that holds information your code can use and change.", xp: 20 },
  { title: "What does a loop do?", question: "A loop in code...", options: ["Creates a circular design", "Connects to the internet", "Repeats a set of instructions", "Stores data in a database"], correct: 2, explanation: "A loop repeats a set of instructions until a condition tells it to stop. Think of it like a washing machine cycle that keeps going until the cycle is complete.", xp: 20 },
  { title: "What is a function?", question: "A function in coding is...", options: ["A type of variable", "A reusable block of instructions with a name", "A CSS animation", "A database query"], correct: 1, explanation: "A function is a named, reusable block of instructions. You define it once and can call it as many times as you need \u2014 like pressing a button on a vending machine.", xp: 20 },
  { title: "What does JavaScript do?", question: "JavaScript is primarily used to...", options: ["Style web pages", "Create database tables", "Add behaviour and interactivity to web pages", "Set up servers"], correct: 2, explanation: "JavaScript adds behaviour to web pages. HTML provides structure, CSS provides style, and JavaScript makes things happen when users interact with the page.", xp: 20 },
  { title: "What is the DOM?", question: "The DOM in web development refers to...", options: ["A CSS layout system", "A type of server", "The Document Object Model - a live map of the page JavaScript can change", "A database format"], correct: 2, explanation: "The Document Object Model (DOM) is a live tree structure of your HTML that JavaScript can read and modify in real time - changing text, styles, and structure without reloading the page.", xp: 20 },
  { title: "What does an API do?", question: "An API is used to...", options: ["Style web pages", "Let two programs talk to each other and share data", "Write HTML structure", "Store passwords"], correct: 1, explanation: "An API lets two pieces of software communicate. When a weather app shows you the forecast, it used an API to ask a weather service for that data.", xp: 20 },
  { title: "What is a boolean?", question: "A boolean value in code can only be...", options: ["A number or a letter", "True or false", "A list of items", "A colour value"], correct: 1, explanation: "A boolean is the simplest data type - it is either true or false. Conditions and if-statements are built on booleans.", xp: 20 },
  { title: "What does \"debugging\" mean?", question: "Debugging means...", options: ["Writing new features", "Finding and fixing errors in code", "Deleting old code", "Speeding up a program"], correct: 1, explanation: "Debugging is the process of finding, understanding, and fixing errors (bugs) in your code. Every developer debugs - it is the job.", xp: 20 },
  { title: "What is a string?", question: "In coding, a string is...", options: ["A type of loop", "A sequence of characters - text", "A CSS measurement unit", "A database table"], correct: 1, explanation: "A string is text data wrapped in quotes. \"Hello world\" is a string. Strings are one of the most common data types in any language.", xp: 20 },
  { title: "What does \"responsive\" mean in web design?", question: "A responsive website...", options: ["Loads very fast", "Adapts its layout to different screen sizes", "Has animated elements", "Uses a database"], correct: 1, explanation: "A responsive website adjusts its layout automatically depending on the screen size - looks good on a phone, tablet, and desktop without separate versions.", xp: 20 },
  { title: "What is version control?", question: "Version control (like Git) is used to...", options: ["Speed up websites", "Track changes to code over time", "Style HTML", "Compress images"], correct: 1, explanation: "Version control tracks every change made to your code. Git is the most popular tool - you can always go back to a working version and collaborate without overwriting each other.", xp: 20 },

  // Floor 1 \u2014 Foundation
  { title: "What is a server?", question: "In web development, a server is...", options: ["A type of browser plugin", "A computer that stores and sends files when requested", "A CSS layout technique", "A JavaScript framework"], correct: 1, explanation: "A server is a computer that waits for requests and responds by sending back files. When you visit a website, a server somewhere in the world receives your request and sends back the HTML, CSS, and JS files your browser needs.", xp: 20 },
  { title: "What does a browser do?", question: "A web browser's main job is to...", options: ["Write HTML files", "Request files from servers and display them to the user", "Store websites on your computer", "Connect you directly to other users"], correct: 1, explanation: "A browser sends requests to servers, receives files back, and renders them visually on screen. It reads HTML for structure, CSS for style, and JavaScript for behaviour \u2014 turning code into the visual pages you see.", xp: 20 },
  { title: "Sequential execution", question: "What does \"sequential execution\" mean in code?", options: ["Code runs in random order", "Code runs in parallel on multiple processors", "Code runs line by line from top to bottom", "Code only runs when clicked"], correct: 2, explanation: "Sequential execution means the computer reads and runs instructions one at a time, top to bottom. It does not skip ahead or assume anything. The order you write code matters enormously because of this.", xp: 20 },
  { title: "What is a condition in code?", question: "A condition in programming means...", options: ["A type of HTML tag", "A rule that says: if this is true, do this \u2014 otherwise do that", "A way to repeat instructions", "A named block of reusable code"], correct: 1, explanation: "A condition is a decision point. \"If it is raining, take an umbrella, otherwise leave it at home.\" In code this is written as an if/else statement. Conditions are one of the three universal building blocks of all programming.", xp: 20 },

  // Floor 2 \u2014 HTML & CSS
  { title: "HTML tag structure", question: "Which of these is the correct HTML structure?", options: ["<p>Hello/p>", "<p>Hello</p>", "p>Hello</p>", "<p Hello>"], correct: 1, explanation: "Every HTML element has an opening tag, content, and a closing tag. The closing tag has a forward slash before the element name. <p>Hello</p> is the correct pattern \u2014 open, content, close.", xp: 20 },
  { title: "What does CSS stand for?", question: "CSS controls which aspect of a webpage?", options: ["The structure and content", "The visual appearance and layout", "The interactive behaviour", "The server-side logic"], correct: 1, explanation: "CSS (Cascading Style Sheets) controls how HTML elements look \u2014 colours, fonts, sizes, spacing, layout. Without CSS, every website would look like a plain text document.", xp: 20 },
  { title: "The box model", question: "In CSS, the \"box model\" refers to...", options: ["A 3D animation technique", "How every element is treated as a box with margin, border, padding, and content", "A way to create modal popups", "A CSS grid layout method"], correct: 1, explanation: "Every HTML element is a box. The CSS box model defines the space around and inside that box: content (the actual stuff), padding (space inside the border), border (the edge), and margin (space outside the border).", xp: 20 },
  { title: "Inline vs block elements", question: "What is the difference between a block and inline HTML element?", options: ["Block elements are invisible, inline elements are visible", "Block elements start on a new line and take full width; inline elements flow within text", "Block elements need JavaScript; inline elements do not", "There is no difference"], correct: 1, explanation: "Block elements like <div>, <p>, and <h1> start on a new line and stretch the full width. Inline elements like <span>, <a>, and <strong> flow within text without breaking to a new line. Understanding this prevents many layout headaches.", xp: 20 },
  { title: "CSS specificity", question: "If two CSS rules target the same element, which one wins?", options: ["The first one written always wins", "The more specific selector wins", "The shorter rule wins", "They are always combined"], correct: 1, explanation: "CSS specificity determines which rule applies when multiple rules target the same element. An ID selector beats a class selector beats an element selector. When specificity is equal, the last rule written wins. This is the \"Cascading\" in CSS.", xp: 20 },

  // Floor 3 \u2014 JavaScript
  { title: "let vs const", question: "What is the difference between let and const in JavaScript?", options: ["let is faster than const", "const cannot be reassigned after declaration; let can", "They are identical", "const only works with numbers"], correct: 1, explanation: "const declares a variable whose value cannot be reassigned. let declares a variable that can change. Use const by default and let when you know the value needs to change. This makes your code easier to reason about.", xp: 20 },
  { title: "What is the DOM?", question: "JavaScript uses the DOM to...", options: ["Connect to databases", "Read and change the HTML currently on screen", "Style elements with CSS", "Send emails"], correct: 1, explanation: "The Document Object Model (DOM) is a live map of the HTML on the page. JavaScript can read and modify it in real time \u2014 changing text, hiding elements, adding new ones \u2014 without refreshing the page.", xp: 20 },
  { title: "Event listeners", question: "What does addEventListener do in JavaScript?", options: ["Adds a new HTML element", "Waits for a specific user action and runs code when it happens", "Connects to an external API", "Styles an element on hover"], correct: 1, explanation: "addEventListener tells the browser: when this specific thing happens (a click, a keypress, a scroll), run this function. It is the foundation of interactive web pages \u2014 everything that responds to user input uses event listeners.", xp: 20 },
  { title: "Array methods", question: "What does the .filter() method do to a JavaScript array?", options: ["Sorts the array alphabetically", "Returns a new array containing only elements that pass a test", "Removes the last element", "Combines two arrays"], correct: 1, explanation: ".filter() creates a new array with only the elements for which your test function returns true. For example, numbers.filter(n => n > 10) returns only numbers greater than 10. It does not modify the original array.", xp: 20 },

  // Floor 4 \u2014 Independence
  { title: "What is localStorage?", question: "localStorage in the browser allows you to...", options: ["Store data on a server", "Save small amounts of data that persists between page refreshes", "Share data between different users", "Compress images"], correct: 1, explanation: "localStorage is a browser feature that lets you save key-value pairs locally on the user's device. Unlike regular variables, localStorage data survives page refreshes and browser restarts \u2014 useful for saving preferences, drafts, or progress.", xp: 20 },
  { title: "JSON", question: "JSON is used in web development to...", options: ["Style HTML elements", "Format and transfer structured data between systems", "Run server-side code", "Create animations"], correct: 1, explanation: "JSON (JavaScript Object Notation) is a text format for representing structured data. It looks like a JavaScript object and is used to send data between a frontend and a backend, or to store structured data in localStorage.", xp: 20 },
  { title: "What is debugging?", question: "The browser Developer Console is used to...", options: ["Edit the website permanently", "See JavaScript errors, log output, and inspect the page", "Speed up page loading", "Write CSS"], correct: 1, explanation: "The Developer Console (opened with F12) shows JavaScript errors with line numbers, lets you log values with console.log(), and allows you to inspect and modify the live DOM. It is your most important debugging tool.", xp: 20 },
  { title: "Reading error messages", question: "When JavaScript throws a \"ReferenceError\", it means...", options: ["The page has no internet connection", "You tried to use a variable or function that has not been defined", "A CSS rule is invalid", "The HTML is malformed"], correct: 1, explanation: "A ReferenceError means JavaScript cannot find what you are referring to. Usually this means a typo in a variable name, using a variable before declaring it, or calling a function that does not exist. The error message tells you the name it could not find.", xp: 20 },

  // Floor 5 \u2014 Full Stack
  { title: "Frontend vs Backend", question: "Which of these tasks belongs to the backend?", options: ["Styling a button with CSS", "Animating a dropdown menu", "Securely processing a payment", "Choosing a font family"], correct: 2, explanation: "The backend handles tasks that must be done securely and away from the user's browser \u2014 things like processing payments, validating credentials, querying a database, or running sensitive business logic. The frontend is everything the user sees directly.", xp: 20 },
  { title: "What is SQL?", question: "SQL is primarily used to...", options: ["Style web pages", "Build mobile apps", "Query and manage relational databases", "Write server-side JavaScript"], correct: 2, explanation: "SQL (Structured Query Language) is the language for communicating with relational databases. It lets you create tables, insert data, retrieve specific records, update values, and delete data. Every major web application uses SQL or a similar query language.", xp: 20 },
  { title: "HTTP methods", question: "In a REST API, a POST request is used to...", options: ["Retrieve data", "Create new data", "Delete existing data", "Update all records"], correct: 1, explanation: "REST APIs use HTTP methods to indicate the type of action: GET retrieves data, POST creates new data, PUT/PATCH updates existing data, DELETE removes data. These map directly to the CRUD operations (Create, Read, Update, Delete) of a database.", xp: 20 },
  { title: "What is an API key?", question: "An API key is used to...", options: ["Encrypt user passwords", "Identify and authenticate who is making a request to an API", "Speed up API responses", "Format JSON data"], correct: 1, explanation: "An API key is a unique identifier passed with requests to an external API. It tells the API who is making the request, allows the provider to track usage, and lets them block keys that are misused or over their rate limit. Never expose API keys in public code.", xp: 20 },
  { title: "Git commit", question: "What does \"git commit\" do?", options: ["Sends your code to GitHub", "Saves a permanent snapshot of your current changes with a message", "Creates a new branch", "Merges two branches together"], correct: 1, explanation: "A commit is a saved snapshot of your code at a specific point in time, with a message describing what changed. It is local \u2014 it lives on your machine until you push. Think of commits as save points in a game that you can always return to.", xp: 20 },

  // Floor 6 \u2014 Specialisation
  { title: "What is React?", question: "React is best described as...", options: ["A CSS framework", "A backend web server", "A JavaScript library for building user interfaces from reusable components", "A database management tool"], correct: 2, explanation: "React is a JavaScript library created by Facebook for building UIs. It lets you break your interface into reusable components, each managing its own state. When state changes, React efficiently updates only the affected parts of the page.", xp: 20 },
  { title: "Component state", question: "In React, \"state\" refers to...", options: ["The CSS styles of a component", "Data that belongs to a component and can change over time", "The server location of the app", "The HTML structure of the page"], correct: 1, explanation: "State is data that lives inside a component and can change. When state changes, React re-renders the component to reflect the new data. This is the core idea behind reactive UIs \u2014 the display automatically stays in sync with the data.", xp: 20 },
  { title: "What is Node.js?", question: "Node.js allows developers to...", options: ["Write CSS with JavaScript syntax", "Run JavaScript on the server, outside of a browser", "Build native mobile apps", "Manage SQL databases directly"], correct: 1, explanation: "Node.js is a runtime that lets JavaScript run on a server rather than just in a browser. This means you can use JavaScript for both the frontend and the backend \u2014 one language across your entire stack.", xp: 20 },
  { title: "REST vs GraphQL", question: "The main advantage of GraphQL over REST is...", options: ["It is faster in all situations", "The client can request exactly the data it needs, no more, no less", "It does not require a server", "It only works with React"], correct: 1, explanation: "REST APIs return fixed data structures per endpoint \u2014 sometimes more than you need, sometimes less. GraphQL lets the client define exactly what data it wants in a single query, reducing over-fetching and under-fetching. It is particularly useful for complex UIs with varied data needs.", xp: 20 },

  // Floor 7 \u2014 Professional Grade
  { title: "What is code review?", question: "The main purpose of a code review is to...", options: ["Count lines of code written", "Check spelling in comments", "Have another developer examine your code for quality, bugs, and improvements", "Measure how fast the code runs"], correct: 2, explanation: "Code review is when one or more developers read and critique another's code before it is merged. It catches bugs, improves code quality, spreads knowledge across the team, and ensures the codebase stays consistent. It is standard practice in all professional development teams.", xp: 20 },
  { title: "What is system design?", question: "System design in software engineering is about...", options: ["Choosing colour schemes for an app", "Deciding which font to use", "Planning how the components of a large application fit together to handle scale and failure", "Writing the first version of code quickly"], correct: 2, explanation: "System design is the process of planning how an application's components \u2014 databases, servers, caches, queues, APIs \u2014 fit together to be reliable, scalable, and maintainable. Senior developers are often distinguished by their system design thinking.", xp: 20 },
  { title: "What is caching?", question: "Caching in web development means...", options: ["Deleting old files regularly", "Storing copies of frequently requested data so future requests are faster", "Encrypting sensitive user data", "Compressing images for faster loading"], correct: 1, explanation: "Caching stores a copy of data closer to where it is needed \u2014 in memory, a CDN, or the browser. Instead of fetching the same data from a database on every request, a cache serves it instantly. It is one of the most effective ways to make applications faster and more scalable.", xp: 20 },
  { title: "What makes clean code?", question: "Which of these is the best indicator of clean code?", options: ["It has no comments at all", "Another developer can understand what it does without explanation", "It is written in as few lines as possible", "It uses advanced language features"], correct: 1, explanation: "Clean code communicates its intent clearly to any developer who reads it. Good naming, small focused functions, and logical structure matter more than brevity or cleverness. The goal is code that is easy to understand, modify, and debug \u2014 often by yourself six months later.", xp: 20 }
];

// \u2500\u2500 SHARED CHALLENGE MODAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

// \u2500\u2500 DAILY CHALLENGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Advances one question per calendar day. Deterministic but changes daily.
function showDailyChallenge() {
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
  localStorage.setItem('codebook_challenge_done_' + today, 'true');
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
    localStorage.setItem('codebook_challenge_done_' + today, 'true');
  }

  setTimeout(function() {
    document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b){ b.remove(); });
    var closeBtn = document.createElement('button');
    closeBtn.className = 'auth-btn';
    closeBtn.textContent = 'Continue learning \u2192';
    closeBtn.onclick = closeDailyChallenge;
    closeBtn.style.marginTop = '8px';
    var lastChild = document.querySelector('#daily-challenge > div > div:last-child');
    if (lastChild) lastChild.prepend(closeBtn);
  }, 500);
}

function closeDailyChallenge() {
  document.getElementById('daily-challenge').style.display = 'none';
}

// --- FLOOR CELEBRATION SYSTEM ---
const FLOOR_MESSAGES = [
  { icon: '\uD83C\uDF93', sage: 'You now understand what the internet is, how computers read instructions, and the logic behind every program ever written. Most people who try to learn to code never properly understand these things. You do. That is not nothing.' },
  { icon: '\uD83C\uDFA8', sage: 'HTML describes what content is. CSS controls how it looks. The browser renders both. You\'ve built real pages that look the way you intended. The visual web is no longer something that happens to you \u2014 it\'s something you make.' },
  { icon: '\u26A1', sage: 'JavaScript. Events. The DOM. Functions that respond to the world. This is where most learners stop \u2014 it gets hard and they step back. You didn\'t. Everything from here is built on what you just proved you can do.' },
  { icon: '\uD83D\uDD28', sage: 'No scaffold. No step-by-step. A brief and a blank editor. You produced working code. That is the developer mindset \u2014 not knowing everything, but knowing how to figure it out. That skill is permanent.' },
  { icon: '\uD83C\uDF10', sage: 'Frontend. Backend. Database. Authentication. Deployment. You built the whole thing. Full stack is a title people throw around loosely. You\'ve now earned the right to use it precisely.' },
  { icon: '\uD83C\uDFAF', sage: 'The fork in the road is behind you. You chose a direction and went deep enough to become genuinely valuable in it. Generalists are useful. Specialists are sought after. You know which you\'re becoming.' },
  { icon: '\uD83C\uDFC6', sage: 'Floor 7. You started from nothing and you built your way here. Every floor, every section, every debugging session at midnight \u2014 that distance is yours. Nobody can take the understanding back out of your head.' }
];

function showFloorCelebration(floorIndex) {
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
        '<div class="fc-icon" id="fc-icon">' + msg.icon + '</div>' +
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
        '<div class="fc-sage-owl">\uD83E\uDD89</div>' +
        '<div class="fc-sage-text" id="fc-sage-text"></div>' +
      '</div>' +
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
        '<button class="fc-btn-share" onclick="shareAchievement()">Share this achievement</button>' +
      '</div>' +
    '</div>';

  el.style.display = 'flex';

  // Animate stats counting up
  animateCount('fc-stat-sections', 0, sectionsCompleted, sectionsTotal, 800);
  animateCount('fc-stat-xp', 0, xpOnFloor, null, 1000);

  // Typewrite Sage message
  setTimeout(function() { typewriteText('fc-sage-text', msg.sage, 18); }, 600);

  // Particle burst in floor color
  setTimeout(function() { burstFloorParticles(floorColor); }, 200);
  setTimeout(function() { burstFloorParticles(floorColor); }, 700);
}

function animateCount(elId, from, to, outOf, duration) {
  var el = document.getElementById(elId);
  if (!el) return;
  var start = Date.now();
  var suffix = outOf !== null ? '/' + outOf : '';
  function tick() {
    var elapsed = Date.now() - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(from + (to - from) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function typewriteText(elId, text, msPerChar) {
  var el = document.getElementById(elId);
  if (!el) return;
  var i = 0;
  el.textContent = '';
  function next() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(next, msPerChar);
    }
  }
  next();
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
}

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
    <div style="font-size:20px;margin-bottom:8px;">\uD83E\uDD89</div>
    <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:13px;margin-bottom:6px;">${name ? 'Halfway there, ' + (name) + '!' : 'Halfway there!'}</div>
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
      <div style="font-size:40px;margin-bottom:16px;">\uD83E\uDD89</div>
      <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--accent);font-style:italic;margin-bottom:12px;">Save your progress?</div>
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
      '<div class="floor-num" style="color:' + f.color + '">' + (isGuestLocked ? '&#128274;' : isComplete ? '2713' : fi + 1) + '</div>' +
      '<div class="floor-nav-label">' + f.title + (isGuestLocked ? ' 2014 Account required' : '') + '</div>' +
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
    'Before you write a single line of code, let me make sure you understand how the internet actually works — and why it works that way.<br><br>In Floor 1 we cover how browsers talk to servers, what HTML, CSS and JavaScript actually are, and the three ideas that every program ever written is built on: conditions, loops and functions.<br><br>Five sections. No prior experience needed. Take your time with each one.'
  ];
  var text = introTexts[fi] || 'This floor builds directly on everything you have learned so far. Each section is designed to be completed in one sitting.';

  var el = document.createElement('div');
  el.id = 'sage-floor-intro-overlay';
  el.innerHTML = [
    '<div class="sfi-card">',
      '<div class="sfi-owl">🦉</div>',
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
            html: "index.html",
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
    var style = isCurrent
      ? ' style="color:' + color + ';border-color:' + color + '"'
      : '';
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
    if (!quizGateDone && section.quiz && section.quiz.questions) {
      var _ms = state.quizMultiState && state.quizMultiState[section.id];
      if (_ms && _ms.done) {
        var _total = section.quiz.questions.length;
        var _score = 0;
        section.quiz.questions.forEach(function(q, qi) { if (_ms.answers[qi] === q.correct) _score++; });
        if (_score >= Math.ceil(_total * 0.7)) quizGateDone = true;
      }
    }
    sectionGateState[section.id] = { read: true, code: false, quiz: quizGateDone };
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
    '<div class="go-back-wrap"><button class="go-back-btn" onclick="renderLearnHub()">&#8592; Go Back</button></div>';

  // READ
   var r = '<div class="floor-hero" data-floor="' + (fi+1) + '">' +
    '<div class="floor-tag" style="color:' + floor.color + '">' + floor.tag + '</div>' +
    '<div class="floor-title">' + floor.title + '<br><em>' + floor.subtitle + '</em></div>' +
    '<div class="floor-meta">' +
    '<div class="floor-meta-item"><div class="floor-meta-label">SECTION</div><div class="floor-meta-value">' + (si+1) + ' of ' + floor.sections.length + '</div></div>' +
    '<div class="floor-meta-item floor-meta-listen"><button class="listen-btn" id="listen-btn-' + section.id + '" onclick="toggleNarration(\'' + section.id + '\')"><span class="listen-dot"></span>&#9654; Listen</button></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">OFFLINE</div><div class="floor-meta-value floor-meta-offline"><span class="offline-dot-pulse"></span>Available</div></div>' +
    '</div>' +
    '<div class="floor-section-title">' + section.title + '</div>' +
    '</div>' +
    '<div class="section-content">' +
    (section.hint ? '<button class="hint-btn" onclick="toggleHint(\'hint-' + section.id + '\')" title="Need help?">?</button>' : '');

  if (section.hint) {
    r += '<div class="hint-box" id="hint-' + section.id + '">' +
      '<div class="owl-wrap"><div class="owl-avatar">&#x1F989;</div>' +
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

  // Sage Ask button
  var usesLeft = (state.sageUsesLeft !== undefined) ? state.sageUsesLeft : SAGE_TOTAL_USES;
  r += '<div class="sage-ask-strip">' +
    '<div class="sage-ask-owl">🦉</div>' +
    '<div class="sage-ask-info">' +
      '<div class="sage-ask-label">Stuck? Ask Sage</div>' +
      '<div class="sage-ask-sub">' + usesLeft + ' question' + (usesLeft !== 1 ? 's' : '') + ' remaining</div>' +
    '</div>' +
    (usesLeft > 0
      ? '<button class="sage-ask-btn" onclick="openSageChat(\'' + section.id + '\',' + fi + ')">Ask</button>'
      : '<div class="sage-ask-empty">Used up — work through it yourself.</div>') +
    '</div>';

  r += '</div>';

  // CODE EDITOR
  var savedCode = localStorage.getItem('code_' + section.id) || editorDef.code;
  var c = '<div style="padding:24px 32px;">' +
    '<div style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:700;margin-bottom:6px;">Live Code Editor</div>' +
    '<div style="font-size:14px;color:var(--text-dim);margin-bottom:20px;">Write code on the left. See it render live on the right.</div>' +
    '<div class="editor-wrapper">' +
    '<div class="editor-topbar">' +
    '<div class="editor-mac-dots"><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div></div>' +
    '<div class="editor-filename">' + editorDef.filename + '</div>' +
    '<div class="editor-action-row">' +
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
    '<iframe class="editor-preview-iframe" id="preview-' + section.id + '"></iframe>' +
    '</div></div>' +
    '<div class="editor-console" id="console-' + section.id + '">' +
    '<div class="editor-console-line">&#9658; Click Run or edit to preview</div></div></div>' +
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
  var q = '<div style="padding:24px 32px;">' +
    '<div style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:700;margin-bottom:6px;">Knowledge Check</div>' +
    '<div style="font-size:14px;color:var(--text-dim);margin-bottom:24px;">Answer to unlock the section and earn XP.</div>';
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
        q += '<div class="quiz-block">' +
          '<div class="quiz-label">KNOWLEDGE CHECK COMPLETE</div>' +
          '<div class="quiz-multi-results">' +
          '<div class="quiz-results-score">' + msScore + '<span> / ' + totalQs + '</span></div>' +
          '<div class="quiz-results-label">' + (msPassed ? 'Nicely done.' : 'Keep studying.') + '</div>' +
          '<div class="quiz-results-msg">' + (msPassed ? 'Section unlocked — mark it complete when ready.' : 'Review the material above, then try again.') + '</div>' +
          (!msPassed ? '<button class="quiz-retry-btn" onclick="retryMultiQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">Retry Quiz</button>' : '') +
          '</div></div>';
      } else {
        var cur = ms.current;
        var curQ = qz.questions[cur];
        var curAnswered = ms.answers && ms.answers[cur] !== undefined ? ms.answers[cur] : undefined;
        var pct = Math.round(cur / totalQs * 100);
        q += '<div class="quiz-block">' +
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
          q += '<button class="quiz-option ' + cls + '" onclick="answerMultiQuiz(\'' + section.id + '\',' + cur + ',' + oi + ',' + fi + ',' + si + ')"' +
            (curAnswered !== undefined ? ' disabled' : '') + '>' + icon + opt + '</button>';
        });
        q += '</div>' +
          '<div class="quiz-feedback ' + (curAnswered !== undefined ? 'visible' : '') + '">' +
          (curAnswered !== undefined ? curQ.feedback : '') + '</div>';
        if (curAnswered !== undefined) {
          var isLast = cur === totalQs - 1;
          q += '<button class="quiz-next-btn" onclick="' + (isLast ? 'finishMultiQuiz' : 'nextMultiQuiz') + '(\'' + section.id + '\',' + fi + ',' + si + ')">' +
            (isLast ? 'See Results' : 'Next Question →') + '</button>';
        }
        q += '</div>';
      }
    } else {
      // Single-question quiz
      q += '<div class="quiz-block"><div class="quiz-label">KNOWLEDGE CHECK</div>' +
        '<div class="quiz-question">' + qz.question + '</div><div class="quiz-options">';
      ((qz && qz.options) || []).forEach(function(opt, oi) {
        var cls = '';
        if (answered !== undefined) {
          if (oi === qz.correct) cls = 'correct';
          else if (oi === answered) cls = 'wrong';
        }
        var icon = '<span class="quiz-opt-icon">' + (cls === 'correct' ? '✓' : cls === 'wrong' ? '✗' : '') + '</span>';
        q += '<button class="quiz-option ' + cls + '" onclick="answerQuizTabbed(\'' + section.id + '\',' + oi + ',' + qz.correct + ',' + fi + ',' + si + ')"' +
          (answered !== undefined ? ' disabled' : '') + '>' + icon + opt + '</button>';
      });
      q += '</div><div class="quiz-feedback ' + (answered !== undefined ? 'visible' : '') + '" id="qf-' + section.id + '">' +
        (answered !== undefined ? qz.feedback : '') + '</div></div>';
    }
  } else {
    q += '<div class="quiz-block"><div class="quiz-label">READING SECTION</div>' +
      '<div style="font-size:14px;color:var(--text-dim);margin-top:8px;">Complete the reading, then mark as done below.</div></div>';
  }
  q += '</div>';

  // NOTES
  var noteVal = localStorage.getItem('note_' + section.id) || '';
  var noteWords = noteVal.trim() ? noteVal.trim().split(/\s+/).length : 0;
  var n = '<div class="notes-panel">' +
    '<div class="notes-header">' +
      '<div class="notes-header-left">' +
        '<div class="notes-icon">📝</div>' +
        '<div>' +
          '<div class="notes-title">Your Notes</div>' +
          '<div class="notes-subtitle">Explain what you learned in your own words</div>' +
        '</div>' +
      '</div>' +
      '<div class="notes-save-status" id="notes-saved-' + section.id + '">Saved</div>' +
    '</div>' +
    '<div class="notes-prompt-card">' +
      '<div class="notes-prompt-q">What would you tell a friend about this section?</div>' +
      '<div class="notes-prompt-hint">No jargon needed. Explain it like they\'ve never coded before.</div>' +
    '</div>' +
    '<textarea class="notes-textarea" id="notes-ta-' + section.id + '" placeholder="e.g. \'A function is basically a named set of instructions. You write it once, then call it whenever you need it. Like a recipe.\'" oninput="onNoteInput(\'' + section.id + '\')">' + escHtml(noteVal) + '</textarea>' +
    '<div class="notes-footer">' +
      '<span class="notes-wordcount" id="notes-wc-' + section.id + '">' + noteWords + ' word' + (noteWords !== 1 ? 's' : '') + '</span>' +
      '<span class="notes-footer-hint">Auto-saved to your browser</span>' +
    '</div>' +
    '</div>';

  // GATE
  var g = '<div class="gate-box" style="margin:0 32px 32px;">' +
    '<div class="gate-label">TO COMPLETE THIS SECTION</div>' +
    '<div class="gate-checks">' +
    '<div class="gate-check-row done" id="gate-read-' + section.id + '"><div class="gate-check-dot">&#10003;</div>Read the section</div>' +
    '<div class="gate-check-row ' + (gate.code ? 'done' : '') + '" id="gate-code-' + section.id + '"><div class="gate-check-dot">' + (gate.code ? '&#10003;' : '') + '</div>Try the code editor</div>' +
    '<div class="gate-check-row ' + (gate.quiz ? 'done' : '') + '" id="gate-quiz-' + section.id + '"><div class="gate-check-dot">' + (gate.quiz ? '&#10003;' : '') + '</div>' + (section.quiz ? 'Pass the knowledge check' : 'Complete the checklist') + '</div>' +
    '</div>' +
    '<button class="complete-btn" id="complete-btn-' + section.id + '" onclick="completeSection(\'' + section.id + '\',' + fi + ',' + si + ')"' + (isDone ? ' disabled' : '') + '>' +
    (isDone ? '&#10003; Section Complete' : 'Mark as Complete \u2192 +' + getSectionXP(fi) + ' XP') +
    '</button></div>';

  // NAV
  var nav = '<div class="section-nav">' +
    '<button class="nav-btn" onclick="prevSection(' + fi + ',' + si + ')"' + ((fi === 0 && si === 0) ? ' disabled' : '')  + '>&#8592; Previous</button>' +
    '<button class="nav-btn primary" onclick="nextSection(' + fi + ',' + si + ')">' +
  ((fi === FLOORS.length - 1 && si === floor.sections.length - 1)
  ? (fi < FLOORS.length - 1 ? 'Next Floor \u2192' : 'Complete')
  : 'Next \u2192') +
    '</button></div>';

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
  if (showEditor) setTimeout(function() { initEditor(section.id, editorDef.code); }, 100);
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
  if (!ta || !wc) return;
  var words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
  wc.textContent = words + ' word' + (words !== 1 ? 's' : '');
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

function markGate(sectionId, key) {
  if (!sectionGateState[sectionId]) sectionGateState[sectionId] = { read: true, code: false, quiz: false };
  if (sectionGateState[sectionId][key]) return;
  sectionGateState[sectionId][key] = true;
  var el = document.getElementById('gate-' + key + '-' + sectionId);
  if (el) {
    el.classList.add('done');
    var dot = el.querySelector('.gate-check-dot');
    if (dot) dot.innerHTML = '&#10003;';
  }
  var gate = sectionGateState[sectionId];
  if (gate.read && gate.code && gate.quiz) {
    var btn = document.getElementById('complete-btn-' + sectionId);
    if (btn && !btn.disabled) btn.textContent = 'Mark as Complete \u2192 +' + getSectionXP(state.currentFloor - 1) + ' XP';
    sageMessage('All gates cleared. Mark this section complete when ready.', 'celebrate');
  }
}

function answerQuizTabbed(sectionId, chosen, correct, fi, si) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
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
      awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
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

var editorTimers = {};

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
  markGate(sectionId, 'code');
}

function runEditorCode(sectionId) {
  var ta = document.getElementById('editor-' + sectionId);
  var frame = document.getElementById('preview-' + sectionId);
  var con = document.getElementById('console-' + sectionId);
  if (!ta || !frame) return;
  try {
    frame.srcdoc = ta.value;
    if (con) con.innerHTML = '<div class="editor-console-line ok">&#9658; Rendered successfully</div>';
    markGate(sectionId, 'code');
  } catch(e) {
    if (con) con.innerHTML = '<div class="editor-console-line err">&#9658; Error: ' + e.message + '</div>';
  }
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
  var mobMap = { learn: 'mob-learn', build: 'mob-build', challenge: 'mob-challenge', map: 'mob-map', tools: 'mob-tools', premium: 'mob-premium', profile: 'mob-profile' };
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
  }

  // Show/hide panels
  document.querySelectorAll('.top-panel').forEach(function(p){ p.classList.remove('active'); });
  var mainContent = document.getElementById('main-content');
  var ls = document.getElementById('left-sidebar');

  if (tab === 'learn') {
    if (mainContent) mainContent.style.display = '';
    renderLearnHub();
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
  var goal = parseInt(localStorage.getItem('codebook_daily_goal') || '1');
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
}

function updateAchievements() {
  var items = document.querySelectorAll('.ach-item');
  var checks = [
    isFloorComplete(0),
    (state.streak || 0) >= 7,
    Object.keys(localStorage).some(function(k){ return k.indexOf('code_') === 0; }),
    isFloorComplete(1),
    isFloorComplete(6),
    (state.streak || 0) >= 30
  ];
  items.forEach(function(item, i) {
    if (checks[i]) item.classList.remove('ach-locked');
    else item.classList.add('ach-locked');
  });
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

function initSageSidebarSync() {
  var orig = window.sageMessage;
  if (orig) {
    window.sageMessage = function(text, mood) {
      orig.call(this, text, mood);
      updateSageSidebar(text);
    };
  }
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
    awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
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
    const rect = el.getBoundingClientRect();
    awardXP(30, 'check-' + key, rect.left + rect.width / 2, rect.top);
  }
  saveState();
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
        '<span class="fc-sage-owl" style="transform:scaleX(' + pose.flip + ')">🦉</span>' +
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

function getFloorIcon(fi) {
  var fid = 'hfi' + fi;
  var flt = '<defs><filter id="' + fid + '" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var open = '<svg viewBox="0 0 48 48" width="44" height="44" class="holo-icon" style="display:block;margin:0 auto;overflow:visible">' + flt + '<g filter="url(#' + fid + ')">';
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
    '.fc-header-title{color:#d0eeff!important;background:none!important;-webkit-text-fill-color:unset!important;animation:none!important;text-shadow:0 0 40px rgba(126,184,200,0.45)!important;}' +
    '.fc-title{font-size:11px!important;width:100%!important;word-break:normal!important;overflow-wrap:normal!important;display:block!important;}' +
    '.fc-card{min-width:130px!important;}' +
    '.fc-stats{width:100%!important;display:flex!important;justify-content:center!important;text-align:center!important;}' +
    '.fc-stat{flex:1!important;text-align:center!important;}' +
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
    '<canvas id="hub-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;"></canvas>' +
    '<div class="fc-hub">' +
    '<div class="fc-header">' +
      '<div class="fc-header-label">Your Learning Path</div>' +
      '<div class="fc-header-title">Seven Floors.<br>One Goal.</div>' +
      '<div class="fc-header-sub">Work through each floor in order. Each one builds directly on the last.</div>' +
      '<div style="margin-top:16px;">' + overallBar + '</div>' +
      '<button class="hub-notes-btn" onclick="openNotesReview()">📝 Review your notes</button>' +
    '</div>' +
    '<div class="fc-stats" style="display:flex;width:100%;margin:0 auto 28px;border-top:1px solid #0a1828;border-bottom:1px solid #0a1828;padding:14px 0;">' +
      '<div class="fc-stat" style="flex:1;text-align:center;"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + floorsUnlocked + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Floors Unlocked</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.06);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + (state.xp || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">XP Earned</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.06);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + (state.streak || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Day Streak</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.06);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + floorsComplete + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Floors Complete</div></div>' +
    '</div>' +
    '<div class="fc-row" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;">' + cardsHtml + '</div>' +
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
  startHubCanvas();
}
function renderFloor1(si) {
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = 'flex';
  var floor = FLOORS[0];
  var fi = 0;

  // Progress calculation
  var totalSecs = floor.sections.length;
  var doneSecs = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
  var pct = Math.round((doneSecs / totalSecs) * 100);
  var streak = state.streak || 0;

  // Section list for right sidebar
  var sectionListHtml = floor.sections.map(function(s, i) {
    var done = state.completed[s.id];
    var active = i === si;
    return '<div class="f1-sec-row ' + (active ? 'f1-sec-active' : '') + ' ' + (done ? 'f1-sec-done' : '') + '" onclick="renderFloor1(' + i + ')">' +
      '<div class="f1-sec-num">' + (done ? '&#10003;' : (i + 1)) + '</div>' +
      '<div class="f1-sec-name">' + s.title + '</div>' +
      (active ? '<div class="f1-sec-indicator"></div>' : '') +
      '</div>';
  }).join('');

  // Activity log
  var actLog = getActivityLog();
  var actHtml = actLog.length ? actLog.slice(0, 3).map(function(a) {
    return '<div class="f1-activity-row">' +
      '<div class="f1-activity-dot"></div>' +
      '<div class="f1-activity-label">' + a.label + '</div>' +
      (a.xp ? '<div class="f1-activity-xp">+' + a.xp + ' XP</div>' : '') +
      '<div class="f1-activity-time">' + timeAgo(a.time) + '</div>' +
      '</div>';
  }).join('') : '<div class="f1-activity-empty">No activity yet. Start your first section!</div>';

  // Today\'s goal
  var dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal')) || 3;
  var todayKey = 'codebook_daily_' + new Date().toDateString();
  var todayDone = parseInt(localStorage.getItem(todayKey)) || 0;
  var goalPct = Math.min(100, Math.round((todayDone / dailyGoal) * 100));
  var circumference = 2 * Math.PI * 28;
  var dashOffset = circumference - (circumference * goalPct / 100);

  // Section cards
  var section = floor.sections[si];
  var sectionCardsHtml = floor.sections.map(function(s, i) {
    var done = state.completed[s.id];
    var active = i === si;
    var num = i < 9 ? '0' + (i + 1) : '' + (i + 1);
    var badge = done && !active
      ? '<span class="f1-card-badge f1-card-badge-done">&#10003; Complete</span>'
      : active
      ? '<span class="f1-card-badge f1-card-badge-active">Active</span>'
      : '<span class="f1-card-badge f1-card-badge-locked">Locked</span>';
    var cardClass = 'f1-section-card ' + (active ? 'f1-section-active' : done ? 'f1-section-done' : 'f1-section-locked');
    var clickFn = active ? 'loadSection(0,' + i + ')' : 'renderFloor1(' + i + ')';
    var inner = '<div class="f1-card-header">' +
      '<div class="f1-card-num">' + num + '</div>' +
      badge +
      '</div>' +
      '<div class="f1-section-title">' + s.title + '</div>';
    if (active) {
      inner += '<div class="f1-section-desc">' + (s.body ? s.body.replace(/<[^>]+>/g, '').substring(0, 90) + '...' : '') + '</div>' +
        '<div class="f1-section-actions"><button class="f1-continue-btn" onclick="event.stopPropagation();loadSection(0,' + i + ')">Continue &#8594;</button></div>';
    }
    return '<div class="' + cardClass + '" onclick="' + clickFn + '">' + inner + '</div>';
  }).join('');

  // CSS orb illustration
  var orbHtml = '<div class="f1-orb-wrap">' +
    '<div class="f1-orb-outer">' +
    '<div class="f1-orb-inner">' +
    '<div class="f1-orb-core"></div>' +
    '</div>' +
    '</div>' +
    '<div class="f1-orb-shadow"></div>' +
    '</div>';

  var html =
    '<div class="f1-layout">' +

    // \u2500\u2500 MAIN COLUMN \u2500\u2500
    '<div class="f1-main">' +

    // Hero
    '<div class="f1-hero">' +
    orbHtml +
    '<div class="f1-hero-content">' +
    '<div class="f1-floor-tag">FLOOR 01 &bull; FOUNDATION</div>' +
    '<div class="f1-floor-title">' + floor.title + '</div>' +
    '<div class="f1-floor-desc">' + floor.sections[0].body.substring(0, 90) + '...</div>' +
    '<div class="f1-stats-row">' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#128337;</span><div><div class="f1-stat-label">DURATION</div><div class="f1-stat-value">' + floor.duration + '</div></div></div>' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#128197;</span><div><div class="f1-stat-label">SESSIONS</div><div class="f1-stat-value">' + floor.sessions + '</div></div></div>' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#9200;</span><div><div class="f1-stat-label">LENGTH</div><div class="f1-stat-value">' + floor.length + '</div></div></div>' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#128200;</span><div><div class="f1-stat-label">DIFFICULTY</div><div class="f1-stat-value">Curious</div></div></div>' +
    '</div>' +
    '<div class="f1-hero-btns">' +
    '<button class="f1-start-btn" onclick="loadSection(0,0)">Start Floor 01 &#8594;</button>' +
    '<button class="f1-preview-btn" onclick="sageMessage(\'Floor 1 covers how the internet works, how computers read code, and the logic behind all programming. Five sections, no prior experience needed.\', \'info\')">&#9654; Preview</button>' +
    '</div>' +
    '</div>' +
    '</div>' +

    // Progress bar
    '<div class="f1-progress-wrap">' +
    '<div class="f1-progress-label">YOUR PROGRESS</div>' +
    '<div class="f1-progress-center">' +
    '<span class="f1-progress-floor">FLOOR 01</span>' +
    '<div class="f1-progress-track"><div class="f1-progress-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="f1-progress-pct">' + pct + '%</span>' +
    '</div>' +
    '<div class="f1-progress-streak">&#128293; ' + streak + ' days</div>' +
    '</div>' +

    // Section cards
    '<div class="f1-sections">' + sectionCardsHtml + '</div>' +

    '</div>' + // end f1-main

    // \u2500\u2500 RIGHT SIDEBAR \u2500\u2500
    '<div class="f1-sidebar">' +

    // Section list
    '<div class="f1-sidebar-card">' +
    '<div class="f1-sidebar-label">FLOOR 01 &bull; SECTIONS</div>' +
    sectionListHtml +
    '</div>' +

    // Sage guide
    '<div class="f1-sidebar-card f1-sage-card">' +
    '<div class="f1-sage-header">' +
    '<div class="f1-sage-avatar">&#129497;</div>' +
    '<div class="f1-sage-name">YOUR GUIDE</div>' +
    '</div>' +
    '<div class="f1-sage-quote">Every expert was once a beginner who refused to quit.</div>' +
    '</div>' +

    // Today\'s goal
    '<div class="f1-sidebar-card">' +
    '<div class="f1-sidebar-label">TODAY\'S GOAL</div>' +
    '<div class="f1-goal-row">' +
    '<svg class="f1-goal-circle" viewBox="0 0 64 64">' +
    '<circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" stroke-width="4"/>' +
    '<circle cx="32" cy="32" r="28" fill="none" stroke="var(--accent)" stroke-width="4" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + dashOffset + '" stroke-linecap="round" transform="rotate(-90 32 32)"/>' +
    '<text x="32" y="37" text-anchor="middle" fill="var(--accent)" font-size="13" font-family="IBM Plex Mono">' + todayDone + '/' + dailyGoal + '</text>' +
    '</svg>' +
    '<div class="f1-goal-text">' +
    '<div class="f1-goal-title">Complete ' + dailyGoal + ' sections</div>' +
    '<div class="f1-goal-sub">Earn XP and keep your streak!</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    // Recent activity
    '<div class="f1-sidebar-card">' +
    '<div class="f1-sidebar-label">RECENT ACTIVITY</div>' +
    '<div class="f1-activity-list">' + actHtml + '</div>' +
    '</div>' +

    // Motivational footer
    '<div class="f1-sidebar-card f1-motive-card">' +
    '<div class="f1-motive-text">Stay consistent.<br>Progress compounds.</div>' +
    '<div class="f1-motive-icon">&#128218;</div>' +
    '</div>' +

    '</div>' + // end f1-sidebar
    '</div>'; // end f1-layout

  document.getElementById('main-content').innerHTML = html;
  state.currentFloor = 1;
  state.currentSection = si;
  saveState();
  updateTopChips();
}

function completeSection(sectionId, fi, si) {
  // Check gates before allowing completion
  var gate = sectionGateState[sectionId] || {};
  var section = FLOORS[fi].sections[si];
  var needsQuiz = !!(section && section.quiz);
  if (needsQuiz && !gate.quiz) {
    sageMessage('Answer the knowledge check first \u2014 then you can mark this section complete.', 'warn');
    return;
  }

  state.completed[sectionId] = true;
  markStreakProtected();
  var secXP = getSectionXP(fi);
  awardXP(secXP, 'complete-' + sectionId, window.innerWidth / 2, 300);
  playCompletionSound();
  trackDailySection();

  // Log to activity feed
  var secName = FLOORS[fi] && FLOORS[fi].sections[si] ? FLOORS[fi].sections[si].title : sectionId;
  logActivity('section', 'Completed: ' + secName, secXP);

  const isNowComplete = isFloorComplete(fi);
  if (isNowComplete) {
    awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
    setTimeout(() => showFloorCelebration(fi), 600);
  }
  saveState();
  checkGuestSavePrompt();
  const content = document.querySelector('.section-content');
  if (content) {
    content.classList.add('section-complete-flash');
    setTimeout(() => content.classList.remove('section-complete-flash'), 1000);
  }
  updateAchievements();
  updateDailyGoalBar();
  updateTopChips();
  renderNav();
  renderFloor(fi, si);
}

function prevSection(fi, si) {
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-right');
  setTimeout(function() {
    if (si > 0) { state.currentSection = si - 1; saveState(); renderNav(); renderFloor(fi, si - 1); }
    else if (fi > 0) { goToFloor(fi - 1); }
  }, 220);
}

function nextSection(fi, si) {
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
      markStreakProtected();
      awardXP(getSectionXP(fi), 'complete-' + section.id, window.innerWidth / 2, 300);
      var isNowComplete = isFloorComplete(fi);
      if (isNowComplete) {
        awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
        setTimeout(function() { showFloorCelebration(fi); }, 600);
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

// --- VOICE NARRATION SYSTEM ---
let currentUtterance = null;
let currentNarrationId = null;

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
  if (section.hint) parts.push('Hint. ' + strip(section.hint));
  return parts.join(' ... ');
}

function toggleNarration(sectionId) {
  const btn = document.getElementById('listen-btn-' + sectionId);
  if (currentNarrationId === sectionId && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    currentNarrationId = null;
    if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Listen'; }
    return;
  }
  window.speechSynthesis.cancel();
  const text = getReadableText(sectionId);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onend = () => {
    currentNarrationId = null;
    if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Listen'; }
  };
  currentUtterance = utterance;
  currentNarrationId = sectionId;
  window.speechSynthesis.speak(utterance);
  if (btn) { btn.classList.add('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u23F8 Pause'; }
}

function stopNarration() {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
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
      awardXP(50, 'f2-variable-task', window.innerWidth / 2, 200);
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
  if (ls) ls.style.display = 'flex';
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
}
function renderFloorWithElevator(fi, si) {
  const direction = fi > lastFloorIndex ? 'up' : fi < lastFloorIndex ? 'down' : null;
  lastFloorIndex = fi;
  renderFloor(fi, si);
  if (direction) {
    const panel = document.querySelector('.floor-panel') || document.getElementById('main-content').firstElementChild;
    if (panel) {
      panel.classList.remove('elevator-up', 'elevator-down');
      void panel.offsetWidth;
      panel.classList.add(direction === 'up' ? 'elevator-up' : 'elevator-down');
    }
  }
}

// ============================================
// SYSTEM 2 \u2014 SAGE SPEECH BUBBLE
// ============================================
let sageBubbleTimeout = null;
let sageIdleTimeout = null;


const SAGE_MOODS = {
  encourage: { icon: '\uD83E\uDD89', color: 'var(--accent)' },
  tip:       { icon: '\uD83E\uDD89', color: 'var(--accent2)' },
  warn:      { icon: '\uD83E\uDD89', color: 'var(--floor3)' },
  celebrate: { icon: '\uD83E\uDD89', color: 'var(--success)' }
};

const SAGE_IDLE_MESSAGES = [
  { text: "Every great structure starts with a foundation that refuses to be rushed. Take the time this section needs.", mood: 'encourage' },
  { text: "The best architects read the blueprint three times before they lift a tool. Read this again.", mood: 'tip' },
  { text: "Three minutes on one section is not slow. It is precise. Precision is what separates builders from dreamers.", mood: 'encourage' },
  { text: "If something is unclear, tap the hint. I designed it for exactly this moment.", mood: 'tip' },
  { text: "A building is only as strong as the floor you are standing on. Do not ascend until this one is solid.", mood: 'warn' },
  { text: "Stillness before understanding is not wasted time. It is the load-bearing wall of knowledge.", mood: 'encourage' }
];

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
function openSageChat(sectionId, fi) {
  var existing = document.getElementById('sage-chat-overlay');
  if (existing) existing.remove();

  var section = FLOORS[fi] && FLOORS[fi].sections.find(function(s) { return s.id === sectionId; });
  var floorTitle = FLOORS[fi] ? FLOORS[fi].title : '';
  var sectionTitle = section ? section.title : '';
  var usesLeft = (state.sageUsesLeft !== undefined) ? state.sageUsesLeft : SAGE_TOTAL_USES;

  var overlay = document.createElement('div');
  overlay.id = 'sage-chat-overlay';
  overlay.className = 'sage-chat-overlay';
  overlay.innerHTML =
    '<div class="sage-chat-panel">' +
      '<div class="sage-chat-header">' +
        '<div class="sage-chat-title"><span class="sage-chat-owl">🦉</span> Ask Sage</div>' +
        '<div class="sage-chat-meta">Floor ' + (fi+1) + ' · ' + sectionTitle + ' · ' +
          '<span class="sage-uses-badge">' + usesLeft + ' left</span></div>' +
        '<button class="sage-chat-close" onclick="document.getElementById(\'sage-chat-overlay\').remove()">×</button>' +
      '</div>' +
      '<div class="sage-chat-warning">' +
        '⚠️ Each question uses one of your <strong>' + SAGE_TOTAL_USES + ' lifetime questions</strong>. ' +
        'Try reading the section hint first — Sage is for when you\'re genuinely stuck.' +
      '</div>' +
      '<div class="sage-chat-messages" id="sage-chat-messages">' +
        '<div class="sage-msg sage-msg-owl">' +
          '<span class="sage-msg-icon">🦉</span>' +
          '<div class="sage-msg-text">What are you stuck on? Be specific — the more detail you give me, the more useful I can be.</div>' +
        '</div>' +
      '</div>' +
      '<div class="sage-chat-input-row">' +
        '<textarea class="sage-chat-input" id="sage-chat-input" placeholder="Describe what you\'re stuck on..." rows="3"></textarea>' +
        '<button class="sage-chat-send" onclick="submitSageQuestion(\'' + sectionId + '\',' + fi + ')">Send</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.getElementById('sage-chat-input').focus();
}

function submitSageQuestion(sectionId, fi) {
  var input = document.getElementById('sage-chat-input');
  var question = input ? input.value.trim() : '';
  if (!question) return;

  var usesLeft = (state.sageUsesLeft !== undefined) ? state.sageUsesLeft : SAGE_TOTAL_USES;
  if (usesLeft <= 0) return;

  // Deduct use
  state.sageUsesLeft = usesLeft - 1;
  saveState();

  // Show question in chat
  var msgs = document.getElementById('sage-chat-messages');
  if (msgs) {
    msgs.innerHTML += '<div class="sage-msg sage-msg-user"><div class="sage-msg-text">' + escHtml(question) + '</div></div>';
    msgs.innerHTML += '<div class="sage-msg sage-msg-owl" id="sage-thinking"><span class="sage-msg-icon">🦉</span><div class="sage-msg-text sage-thinking-dots">Thinking<span>.</span><span>.</span><span>.</span></div></div>';
    msgs.scrollTop = msgs.scrollHeight;
  }
  if (input) { input.value = ''; input.disabled = true; }
  var sendBtn = document.querySelector('.sage-chat-send');
  if (sendBtn) sendBtn.disabled = true;

  // Update uses badge
  var badge = document.querySelector('.sage-uses-badge');
  if (badge) badge.textContent = state.sageUsesLeft + ' left';

  // Update the strip in READ tab
  var strip = document.querySelector('.sage-ask-sub');
  if (strip) strip.textContent = state.sageUsesLeft + ' question' + (state.sageUsesLeft !== 1 ? 's' : '') + ' remaining';

  getSageResponse(question, sectionId, fi, function(response) {
    var thinking = document.getElementById('sage-thinking');
    if (thinking) thinking.remove();
    if (msgs) {
      msgs.innerHTML += '<div class="sage-msg sage-msg-owl"><span class="sage-msg-icon">🦉</span><div class="sage-msg-text">' + response + '</div></div>';
      if (state.sageUsesLeft === 0) {
        msgs.innerHTML += '<div class="sage-msg sage-msg-system">You\'ve used all your Sage questions. From here, trust your own reasoning — that\'s where real learning happens.</div>';
      }
      msgs.scrollTop = msgs.scrollHeight;
    }
    if (input) input.disabled = state.sageUsesLeft <= 0;
    if (sendBtn) sendBtn.disabled = state.sageUsesLeft <= 0;
  });
}

function getSageResponse(question, sectionId, fi, callback) {
  var section = FLOORS[fi] && FLOORS[fi].sections.find(function(s) { return s.id === sectionId; });
  var floorTitle = FLOORS[fi] ? FLOORS[fi].title : '';

  // If API key is configured, use Claude API
  if (SAGE_API_KEY) {
    var systemPrompt = 'You are Sage, a wise and patient coding tutor for The Code Book — a self-paced web development curriculum. ' +
      'The learner is currently on Floor ' + (fi+1) + ' (' + floorTitle + '), section "' + (section ? section.title : '') + '". ' +
      'Answer in 2-4 short paragraphs. Be direct and practical. Do not write code unless they specifically ask for a hint — ' +
      'guide their thinking instead. Never give away the full answer to a coding exercise. ' +
      'Remind them they have limited questions if the answer is something the hint section already covers.';

    var sectionContext = section ? ('Section content: ' + (section.body || '').replace(/<[^>]*>/g,'').slice(0, 800)) : '';

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SAGE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-iab-override': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: 'user', content: sectionContext + '\n\nLearner question: ' + question }]
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var text = (data.content && data.content[0] && data.content[0].text) ? data.content[0].text : 'I couldn\'t reach the server. Try the hint in the section instead.';
      callback(text);
    })
    .catch(function() {
      callback(buildContextualResponse(question, section, fi));
    });
    return;
  }

  // No API key — use built-in contextual guidance
  setTimeout(function() {
    callback(buildContextualResponse(question, section, fi));
  }, 800);
}

function buildContextualResponse(question, section, fi) {
  var q = question.toLowerCase();
  var floor = fi + 1;

  // General debugging questions
  if (q.includes('error') || q.includes('not work') || q.includes('broke') || q.includes('bug') || q.includes('undefined')) {
    return 'The first thing to do with any error is read the message in full — the browser console tells you the type, a plain-English description, and the line number. Before changing anything, go to that line. The bug is usually there or one line above.\n\nIf the error says "undefined", something you\'re trying to use doesn\'t exist yet at that point in execution. Check the order of your code — is the value being set before it\'s being read?';
  }
  if (q.includes('console') || q.includes('log') || q.includes('debug')) {
    return 'console.log() is your most reliable tool here. Add it right at the entry point of the function you\'re unsure about — just to confirm the function is being called at all. Then add another one after each key step to trace where the value changes unexpectedly.\n\nThe goal is to narrow down the location: is the function running? Is the variable set? Is the conditional taking the right branch? Each log eliminates a possibility.';
  }

  // Floor-specific contextual responses
  var floorTips = {
    1: 'At this stage, the most important thing is building the mental model — not memorising syntax. Try to explain the concept back to yourself out loud, in plain English, without looking at the section. If you can\'t, that\'s the gap. Go back to the specific paragraph that covers it.',
    2: 'With HTML and CSS, the best debugging tool is the browser\'s DevTools. Right-click the element, inspect it, and you can see exactly which CSS rules are applying and which are being overridden. The cascade is always the reason something looks wrong.',
    3: 'JavaScript is precise about types and order. If something is undefined, either the variable doesn\'t exist in that scope, or it hasn\'t been assigned yet at the point you\'re using it. Add a console.log right before the line that errors to see the actual value.',
    4: 'When working with async code, the most common mistake is trying to use data before it\'s arrived. Make sure every async operation is properly awaited. Open the Network tab in DevTools — it shows you exactly what requests went out and what came back.',
    5: 'Backend errors often live in the server logs, not the browser console. Check both. If a request returns a 500, the detailed error is on the server side. Express will log it to the terminal.',
    6: 'At this stage, the answer to most questions is in the documentation. MDN for browser APIs, the framework\'s own docs for everything else. The skill of reading docs precisely — not scanning, reading — is what you\'re really building here.',
    7: 'Professional-level problems rarely have one right answer. If you\'re stuck on an architectural decision, try writing down both options and what breaks if each assumption turns out to be wrong. The constraint that matters most usually reveals itself that way.'
  };

  var hint = section && section.hint ? section.hint.replace(/<[^>]*>/g,'').slice(0, 300) : '';

  return (floorTips[floor] || floorTips[1]) +
    (hint ? '\n\nThe section hint covers: ' + hint.slice(0, 200) + (hint.length > 200 ? '...' : '') + '\n\nHave you read through it carefully? Hints are written for exactly the kind of moment you\'re in.' : '');
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

function resetSageIdleTimer() {
  if (sageIdleTimer) clearTimeout(sageIdleTimer);
  sageIdleTimer = setTimeout(() => {
    const msg = SAGE_IDLE_MESSAGES[Math.floor(Math.random() * SAGE_IDLE_MESSAGES.length)];
    sageMessage(msg.text, msg.mood);
  }, 3 * 60 * 1000); // 3 minutes
}

// Reset idle timer on user activity
['click', 'scroll', 'keydown', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, resetSageIdleTimer, { passive: true });
});

// ============================================
// SYSTEM 3 \u2014 GOLDEN DUST XP PARTICLES
// ============================================
function spawnGoldenDust(x, y) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'xp-particle';
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.8;
    const dist  = 30 + Math.random() * 50;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 20;
    const dur = 0.6 + Math.random() * 0.5;
    const size = 3 + Math.random() * 4;
    particle.style.cssText =
  "left:" + x + "px; top:" + y + "px;" +
  "width:" + size + "px; height:" + size + "px;";
     
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), dur * 1000 + 100);
  }
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

// --- AUDIO SYSTEM ---
function playTone(frequency, duration, volume, type = 'sine') {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playFiveMinuteWarning() {
  // Single soft tone
  playTone(440, 0.6, 0.15);
}

function playOneMinuteWarning() {
  // Two quick tones
  playTone(523, 0.3, 0.2);
  setTimeout(() => playTone(523, 0.3, 0.2), 400);
}

function playCompletionSound() {
  // Three ascending tones \u2014 calm and satisfying
  playTone(523, 0.4, 0.2);
  setTimeout(() => playTone(659, 0.4, 0.2), 300);
  setTimeout(() => playTone(784, 0.6, 0.2), 600);
}

// --- THEME SYSTEM ---
function toggleTheme() {
  var isLight = document.body.classList.toggle('light');
  document.body.classList.toggle('light-mode', isLight);
  localStorage.setItem('codebook_theme', isLight ? 'light' : 'dark');
  // Update all theme toggle buttons
  var emoji = isLight ? '\u2600\uFE0F' : '\uD83C\uDF19';
  ['theme-toggle', 'theme-toggle-real'].forEach(function(id) {
    var btn = document.getElementById(id);
    if (btn) btn.textContent = emoji;
  });
}
function applyTheme() {
  var saved = localStorage.getItem('codebook_theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    document.body.classList.add('light-mode');
    ['theme-toggle', 'theme-toggle-real'].forEach(function(id) {
      var btn = document.getElementById(id);
      if (btn) btn.textContent = '\u2600\uFE0F';
    });
  }
}
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
        awardXP(40, null, window.innerWidth - 100, 60);
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
// Registered from sw.js \u2014 Blob URLs are not supported for service workers
// in modern browsers due to same-origin scope requirements.

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
      initSageSidebarSync();
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
  awardXP(100, 'build-project-' + floorNum, window.innerWidth / 2, 300);
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
      icon: '🖥️',
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
      icon: '🌿',
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
      icon: '🐙',
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
      icon: '🔍',
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
      icon: '⬡',
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
      icon: '🚀',
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
      icon: '🎨',
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
      icon: '📮',
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
      icon: '🎬',
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
      '<div class="build-card-icon">' + t.icon + '</div>' +
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
  saveState();
  awardXP(xp || 25, stateKey, window.innerWidth / 2, 300);
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
  { id: 'initiate',  name: 'Initiate',  sub: 'The beginning of all things',   icon: '◈', color: '#60a5fa', glow: 'rgba(59,130,246,0.45)',  border: 'rgba(96,165,250,0.60)',  grad: 'linear-gradient(135deg,#60a5fa,#1d4ed8)' },
  { id: 'builder',   name: 'Builder',   sub: 'Craft with patience and fire',   icon: '⬡', color: '#fb923c', glow: 'rgba(249,115,22,0.45)',  border: 'rgba(251,146,60,0.60)',  grad: 'linear-gradient(135deg,#fb923c,#c2410c)' },
  { id: 'archivist', name: 'Archivist', sub: 'Knowledge is the true power',    icon: '⟡', color: '#c084fc', glow: 'rgba(168,85,247,0.45)',  border: 'rgba(192,132,252,0.60)', grad: 'linear-gradient(135deg,#c084fc,#7e22ce)' },
  { id: 'runner',    name: 'Runner',    sub: 'Speed and clarity in motion',    icon: '◐', color: '#34d399', glow: 'rgba(16,185,129,0.45)',  border: 'rgba(52,211,153,0.60)',  grad: 'linear-gradient(135deg,#34d399,#047857)' },
  { id: 'ascended',  name: 'Ascended',  sub: 'Mastery beyond all boundaries', icon: '✦', color: '#fbbf24', glow: 'rgba(234,179,8,0.45)',   border: 'rgba(251,191,36,0.60)',  grad: 'linear-gradient(135deg,#fbbf24,#92400e)' },
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

function renderGamePanel() {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  panel.innerHTML =
    '<div class="game-hub gh-lights-off" id="game-hub-root">' +

      '<div class="gh-switch-row">' +
        '<button class="gh-light-switch" onclick="toggleGameLight()" title="Toggle light">' +
          '<div class="gh-switch-plate">' +
            '<div class="gh-switch-rocker"></div>' +
          '</div>' +
        '</button>' +
      '</div>' +

      '<div class="gh-dark-overlay" id="gh-dark-overlay">' +
        '<div class="gh-sage-dark">' +
          '<div class="gh-sage-owl">&#129417;</div>' +
          '<div class="gh-sage-msg">Switch on the light to reveal the room.</div>' +
        '</div>' +
      '</div>' +

      '<div class="gh-content">' +
        '<div class="gh-header">' +
          '<div class="gh-title">GAME HUB</div>' +
          '<div class="gh-sub">Choose your mission. More games coming soon.</div>' +
        '</div>' +
        '<div class="gh-grid">' +

          '<div class="gh-card gh-card--active" onclick="launchGame(\'launch-sequence\')">' +
            '<div class="gh-card-badge gh-card-badge--live">LIVE</div>' +
            '<div class="gh-card-icon">&#128640;</div>' +
            '<div class="gh-card-name">LAUNCH SEQUENCE</div>' +
            '<div class="gh-card-desc">Educational sci-fi mission. Repair rocket systems, debug code faults, and launch to Mars.</div>' +
            '<button class="gh-card-btn">PLAY NOW</button>' +
          '</div>' +

          '<div class="gh-card gh-card--locked">' +
            '<div class="gh-card-badge gh-card-badge--soon">COMING SOON</div>' +
            '<div class="gh-card-icon">&#128274;</div>' +
            '<div class="gh-card-name">MISSION 2</div>' +
            '<div class="gh-card-desc">A new challenge is being prepared. Stand by for further transmissions.</div>' +
            '<button class="gh-card-btn gh-card-btn--locked" disabled>LOCKED</button>' +
          '</div>' +

          '<div class="gh-card gh-card--locked">' +
            '<div class="gh-card-badge gh-card-badge--soon">COMING SOON</div>' +
            '<div class="gh-card-icon">&#128274;</div>' +
            '<div class="gh-card-name">MISSION 3</div>' +
            '<div class="gh-card-desc">A new challenge is being prepared. Stand by for further transmissions.</div>' +
            '<button class="gh-card-btn gh-card-btn--locked" disabled>LOCKED</button>' +
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
  var src = gameId === 'launch-sequence' ? './game/index.html' : './game/index.html';
  panel.innerHTML =
    '<div class="gh-back-bar">' +
      '<button class="gh-back-btn" onclick="renderGamePanel()">&#8592; GAME HUB</button>' +
    '</div>' +
    '<iframe src="' + src + '" title="' + gameId + '" allowfullscreen ' +
      'style="width:100%;height:calc(100% - 44px);border:none;display:block;"></iframe>';
}

function renderProfilePanel() {
  var panel = document.getElementById('panel-profile');
  if (!panel) return;

  var currentTheme = getProfTheme();
  var name = state.playerName || localStorage.getItem('codebook_player_name') || 'Learner';
  var initials = name.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().substring(0, 2) || '?';
  var cur = getCurrentLevel();
  var next = getNextLevel();
  var levelName = LEVEL_NAMES[cur.level] || 'Level ' + cur.level;
  var nextName = next ? (LEVEL_NAMES[next.level] || 'Level ' + next.level) : 'Max';
  var xpIntoLevel = state.xp - cur.xp;
  var xpForNextLevel = next ? (next.xp - cur.xp) : 1;
  var levelPct = next ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100)) : 100;

  // Totals
  var totalSecs = 0;
  FLOORS.forEach(function(f) { totalSecs += f.sections.length; });
  var doneSecs = Object.keys(state.completed).filter(function(k){
    return state.completed[k] && FLOORS.some(function(f){ return f.sections.some(function(s){ return s.id === k; }); });
  }).length;
  var floorsComplete = FLOORS.filter(function(f, fi){ return isFloorComplete(fi); }).length;
  var totalMinutes = Math.round((state.totalSeconds || 0) / 60);

  // 28-day activity grid (4 weeks)
  var actLog = getActivityLog();
  var actMap = {};
  actLog.forEach(function(a) {
    var d = new Date(a.time); d.setHours(0,0,0,0);
    actMap[d.toDateString()] = (actMap[d.toDateString()] || 0) + 1;
  });
  var today = new Date(); today.setHours(0,0,0,0);
  var calDays = [];
  for (var i = 27; i >= 0; i--) {
    var d = new Date(today); d.setDate(d.getDate() - i);
    calDays.push({ label: d.toDateString(), count: actMap[d.toDateString()] || 0, isToday: i === 0 });
  }

  // Achievements
  var ACHIEVEMENTS = [
    { id: 'first_section', icon: '🎯', label: 'First Step',    desc: 'Complete your first section',  check: function(){ return doneSecs >= 1; } },
    { id: 'five_sections', icon: '📚', label: 'On A Roll',     desc: 'Complete 5 sections',           check: function(){ return doneSecs >= 5; } },
    { id: 'floor_1_done',  icon: '🏗️', label: 'Foundation',    desc: 'Complete Floor 1',              check: function(){ return isFloorComplete(0); } },
    { id: 'floor_any',     icon: '🏆', label: 'Floor Cleared', desc: 'Complete any floor',            check: function(){ return floorsComplete >= 1; } },
    { id: 'streak_3',      icon: '🔥', label: 'On Fire',       desc: '3-day streak',                  check: function(){ return state.streak >= 3; } },
    { id: 'streak_7',      icon: '💪', label: 'Dedicated',     desc: '7-day streak',                  check: function(){ return state.streak >= 7; } },
    { id: 'xp_100',        icon: '⭐', label: 'XP Hunter',     desc: 'Earn 100 XP',                  check: function(){ return state.xp >= 100; } },
    { id: 'xp_500',        icon: '🌟', label: 'XP Master',     desc: 'Earn 500 XP',                  check: function(){ return state.xp >= 500; } },
    { id: 'all_floors',    icon: '🎓', label: 'Graduate',      desc: 'Complete all 7 floors',         check: function(){ return floorsComplete === 7; } },
  ];

  // Floor progress rows
  var floorRows = FLOORS.map(function(f, fi) {
    var done = f.sections.filter(function(s){ return state.completed[s.id]; }).length;
    var total = f.sections.length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    var isUnlocked = true; // all floors unlocked
    var color = f.color || '#c8a96e';
    var status = isFloorComplete(fi) ? 'Complete' : (done > 0 ? 'In Progress' : (isUnlocked ? 'Not Started' : 'Locked'));
    return '<div class="prof-floor-row">' +
      '<div class="prof-floor-num" style="color:' + color + '">F' + (fi + 1) + '</div>' +
      '<div class="prof-floor-info">' +
      '<div class="prof-floor-name">' + f.title + '</div>' +
      '<div class="prof-floor-bar-wrap">' +
      '<div class="prof-floor-track"><div class="prof-floor-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
      '<span class="prof-floor-stat">' + done + '/' + total + '</span>' +
      '</div></div>' +
      '<div class="prof-floor-status prof-status-' + (isFloorComplete(fi) ? 'done' : (done > 0 ? 'active' : 'locked')) + '">' + status + '</div>' +
      '</div>';
  }).join('');

  var calHtml = '<div class="prof-cal-grid">' +
    calDays.map(function(day) {
      var intensity = day.count === 0 ? 'empty' : day.count >= 3 ? 'high' : day.count >= 2 ? 'mid' : 'low';
      return '<div class="prof-cal-day prof-cal-' + intensity + (day.isToday ? ' prof-cal-today' : '') + '" title="' + day.label + '"></div>';
    }).join('') +
    '</div>';

  var achieveHtml = ACHIEVEMENTS.map(function(a) {
    var earned = a.check();
    return '<div class="prof-badge' + (earned ? ' prof-badge-earned' : '') + '">' +
      '<div class="prof-badge-icon">' + a.icon + '</div>' +
      '<div class="prof-badge-label">' + a.label + '</div>' +
      '<div class="prof-badge-desc">' + a.desc + '</div>' +
      '</div>';
  }).join('');

  var heroSwatchesHtml = '<div class="prof-hero-swatches">' +
    PROF_THEMES.map(function(t) {
      var isActive = t.id === currentTheme;
      return '<button class="prof-hswatch' + (isActive ? ' active' : '') + '"' +
        ' title="' + t.name + ' — ' + t.mood + '"' +
        ' onclick="switchProfTheme(\'' + t.id + '\')"' +
        ' style="--sw-dot:' + t.dot + ';--sw-glow:' + t.glow + ';--sw-border:' + t.border + '">' +
        '</button>';
    }).join('') +
    '</div>';

  var selectedAv = AVATARS.find(function(a) { return a.id === getSelectedAvatar(); }) || null;
  var avatarInner = selectedAv
    ? '<span style="font-size:32px;line-height:1;color:' + selectedAv.color + ';filter:drop-shadow(0 0 8px ' + selectedAv.glow + ')">' + selectedAv.icon + '</span>'
    : initials;
  var avatarStyle = selectedAv
    ? ' style="background:' + selectedAv.grad + ';box-shadow:0 0 0 3px ' + selectedAv.border + ',0 4px 16px rgba(0,0,0,0.4)"'
    : '';

  panel.innerHTML =
    '<div class="prof-layout" data-prof-theme="' + currentTheme + '">' +

    // Header
    '<div class="prof-hero">' +
    '<div class="prof-avatar-wrap">' +
    '<div class="prof-avatar"' + avatarStyle + '>' + avatarInner + '</div>' +
    '<button class="prof-avatar-plus" onclick="showAvatarPicker()" title="Choose archetype">+</button>' +
    '</div>' +
    '<div class="prof-hero-info">' +
    '<div class="prof-name">' + name + '</div>' +
    '<div class="prof-level-name">Level ' + cur.level + ' &mdash; ' + levelName + '</div>' +
    heroSwatchesHtml +
    '</div>' +
    '</div>' +

    // Stats row
    '<div class="prof-stats-row">' +
    '<div class="prof-stat-card"><div class="prof-stat-val">' + state.xp + '</div><div class="prof-stat-lbl">Total XP</div></div>' +
    '<div class="prof-stat-card"><div class="prof-stat-val">' + state.streak + '</div><div class="prof-stat-lbl">Day Streak</div></div>' +
    '<div class="prof-stat-card"><div class="prof-stat-val">' + floorsComplete + '</div><div class="prof-stat-lbl">Floors Done</div></div>' +
    '<div class="prof-stat-card"><div class="prof-stat-val">' + doneSecs + '</div><div class="prof-stat-lbl">Sections Done</div></div>' +
    '</div>' +

    // Level progress
    '<div class="prof-section">' +
    '<div class="prof-section-title">Level Progress</div>' +
    '<div class="prof-level-bar-wrap">' +
    '<span class="prof-level-tag">' + levelName + '</span>' +
    '<div class="prof-level-track"><div class="prof-level-fill" style="width:' + levelPct + '%"></div></div>' +
    '<span class="prof-level-tag">' + nextName + '</span>' +
    '</div>' +
    '<div class="prof-level-sub">' + state.xp + ' XP' + (next ? ' &mdash; ' + (next.xp - state.xp) + ' XP to ' + nextName : ' &mdash; Max level reached') + '</div>' +
    '</div>' +

    // Achievements
    '<div class="prof-section">' +
    '<div class="prof-section-title">Achievements</div>' +
    '<div class="prof-badges">' + achieveHtml + '</div>' +
    '</div>' +

    // Floor progress
    '<div class="prof-section">' +
    '<div class="prof-section-title">Floor Progress</div>' +
    '<div class="prof-floors">' + floorRows + '</div>' +
    '</div>' +

    '</div>';
}

function renderPremiumPanel() {
  var panel = document.getElementById('panel-premium');
  if (!panel) return;

  var alreadyNotified = !!localStorage.getItem('codebook_premium_notify');

  var features = [
    {
      icon: '🔑', name: 'All 7 Floors Unlocked',
      desc: 'Every floor available from day one — no waiting, no gates.',
      fullDesc: 'Free users access Floors 1 and 2. Premium unlocks all seven immediately so you move at your own pace without hitting walls. No floor is hidden from you on day one.',
      problem: 'Solves: hitting a paywall mid-momentum.'
    },
    {
      icon: '🧑‍💻', name: 'Mentorship Sessions',
      desc: 'Live 1-on-1 calls with an experienced developer, booked on your schedule.',
      fullDesc: 'Book a 45-minute video call with a working developer whenever you need a second opinion. Bring a project, a problem, or just questions — we\'ll talk through it. Included every month.',
      problem: 'Solves: learning alone with no one to ask.'
    },
    {
      icon: '📋', name: 'Code Reviews',
      desc: 'Submit any project and get written, line-by-line feedback within 48 hours.',
      fullDesc: 'Submit any project you\'ve built and receive written feedback within 48 hours. Comments are specific and actionable — not generic. Real code, real notes, real improvement.',
      problem: 'Solves: never knowing if your code is actually good.'
    },
    {
      icon: '📜', name: 'Completion Certificate',
      desc: 'A verifiable certificate issued when you finish all seven floors.',
      fullDesc: 'Finishing all seven floors earns you a certificate with a unique verification link. Share it on your CV or LinkedIn. Employers can confirm it is genuine with one click.',
      problem: 'Solves: having no credential to show for your effort.'
    },
    {
      icon: '💬', name: 'Private Community',
      desc: 'Access to a members-only space for questions, accountability, and feedback.',
      fullDesc: 'A members-only space where premium learners share progress, ask questions, and give each other feedback. No noise — just people doing the same work as you.',
      problem: 'Solves: learning in isolation with no peers to compare notes with.'
    },
    {
      icon: '🎯', name: 'Career Coaching',
      desc: 'CV review, portfolio feedback, and mock interview prep included.',
      fullDesc: 'One session focused entirely on your job search: CV review, portfolio critique, and a mock technical interview. Practical, specific, and honest.',
      problem: 'Solves: not knowing if you\'re actually ready to apply.'
    },
    {
      icon: '⚡', name: 'Priority Support',
      desc: 'Any question answered by a human within 24 hours, guaranteed.',
      fullDesc: 'Post any question — about the curriculum, your code, or your career — and a human responds within 24 hours. Not a bot. Not a forum. A person.',
      problem: 'Solves: getting stuck with nowhere to turn.'
    },
    {
      icon: '📦', name: 'Resource Packs',
      desc: 'Cheat sheets, starter templates, and reference guides for every floor.',
      fullDesc: 'Floor-by-floor cheat sheets, reusable HTML/CSS/JS starter templates, and quick-reference cards for every major concept. Download them, keep them, use them forever.',
      problem: 'Solves: rebuilding from scratch every time you start something new.'
    },
    {
      icon: '🧭', name: 'Adaptive Paths',
      desc: 'Personalized learning paths that adjust based on performance.',
      fullDesc: 'Dynamically adjusts what you learn next based on your strengths, weaknesses, and completed tools. Keeps you in an optimal challenge zone and removes wasted time.',
      problem: 'Solves: following a fixed path that doesn\'t match where you actually are.'
    },
    {
      icon: '🎧', name: 'Deep Work Mode',
      desc: 'Distraction-free learning sessions with focus tracking.',
      fullDesc: 'Locks the interface into a clean, minimal mode, tracks uninterrupted focus time, and rewards longer deep work sessions with bonus XP.',
      problem: 'Solves: short, scattered sessions that never build momentum.'
    },
    {
      icon: '🏗️', name: 'Project Builder',
      desc: 'Guided real-world projects to apply your skills.',
      fullDesc: 'Step-by-step project workflows that turn your knowledge into portfolio-ready work. Includes milestones, checkpoints, and completion validation.',
      problem: 'Solves: knowing the theory but not knowing how to build something real.'
    },
    {
      icon: '📊', name: 'Skill Benchmarking',
      desc: 'Compare your progress against real-world standards.',
      fullDesc: 'Shows how your current skill level compares to industry expectations. Highlights gaps and suggests what to improve next.',
      problem: 'Solves: not knowing if you\'re actually job-ready.'
    },
    {
      icon: '🤖', name: 'AI Code Review',
      desc: 'Instant feedback on your code and projects.',
      fullDesc: 'Analyzes your work and gives actionable feedback on structure, readability, and best practices — like having a senior developer review your code.',
      problem: 'Solves: submitting work with no idea if it\'s any good.'
    },
    {
      icon: '⚡', name: 'Momentum Boost',
      desc: 'Temporary XP boosts for consistent progress.',
      fullDesc: 'Rewards streaks and consistent activity with short-term XP multipliers, encouraging daily engagement and habit building.',
      problem: 'Solves: losing motivation between sessions.'
    },
    {
      icon: '💼', name: 'Opportunity Board',
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
      '<div class="premium-card-icon">' + f.icon + '</div>' +
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

function renderChallengePanel() {
  var panel = document.getElementById('panel-challenge');
  if (!panel) return;

  var challenges = [
    { icon: '\u26A1', type: 'DAILY', title: "Today's Knowledge Check", desc: 'One question. Earn bonus XP. Resets every day.', xp: '+20 XP', action: 'showDailyChallenge()', done: !!localStorage.getItem('codebook_challenge_done_' + new Date().toDateString()) },
    { icon: '\uD83E\uDDE0', type: 'RECALL', title: 'Spaced Repetition Quiz', desc: 'Questions from sections you completed. Reinforce what you know.', xp: '+15 XP each', action: 'startRecallQuiz()', done: false },
    { icon: '\u23F1\uFE0F', type: 'SPEED', title: 'Speed Round', desc: '10 questions. 30 seconds each. How fast can you go?', xp: '+50 XP', action: 'startSpeedRound()', done: false, locked: state.xp < 100 },
    { icon: '\uD83D\uDD25', type: 'STREAK', title: 'Streak Challenge', desc: 'Answer 5 questions in a row without getting one wrong.', xp: '+75 XP', action: 'startStreakChallenge()', done: false, locked: state.xp < 200 },
    { icon: '\uD83C\uDFC6', type: 'FLOOR', title: 'Floor Boss', desc: 'A comprehensive quiz on everything in the floor you just completed.', xp: '+100 XP', action: 'startFloorBoss()', done: false, locked: !isFloorComplete(state.currentFloor - 1) },
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
      '<div class="ch-icon">' + ch.icon + '</div>' +
      '<div class="ch-body">' +
      '<div class="ch-tag">' + ch.type + (isDone ? ' \u2014 DONE TODAY' : isLocked ? ' \u2014 LOCKED' : '') + '</div>' +
      '<div class="ch-title">' + ch.title + '</div>' +
      '<div class="ch-desc">' + ch.desc + '</div>' +
      '</div>' +
      '<div class="ch-xp">' + (isDone ? '\u2713' : ch.xp) + '</div>' +
      '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

// \u2500\u2500 RECALL QUIZ \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Picks a random question the user has NOT seen today, avoiding repetition.
function startRecallQuiz() {
  var answered = Object.keys(state.quizAnswered);
  if (answered.length === 0) {
    sageMessage('Complete some sections first to unlock recall quizzes.', 'tip');
    return;
  }
  // Pick a question not already used as today's daily challenge
  var today = new Date().toDateString();
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var dailyIdx = daysSinceEpoch % DAILY_CHALLENGES.length;
  // Offset by 1 from the daily so it is always a different question
  var recallIdx = (dailyIdx + 1) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[recallIdx];
  _openChallengeModal(
    challenge,
    'Spaced Repetition',
    'Reinforce what you already know. +' + challenge.xp + ' XP for a correct answer.',
    'recall-' + today + '-' + recallIdx
  );
}

// \u2500\u2500 SPEED ROUND \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Picks a question offset by 2 from the daily so it is always different.
var _speedRoundIndex = 0;
// \u2500\u2500 SPEED ROUND \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 10 questions, one per round. Tracks score across the session.
var _speedRoundIndex = 0;
var _speedRoundScore = 0;
var _speedRoundTotal = 10;
var _speedRoundCurrent = 0;
var _speedRoundTimer = null;
var _speedRoundTimeLeft = 30;

function startSpeedRound() {
  if (state.xp < 100) return;
  _speedRoundScore = 0;
  _speedRoundCurrent = 0;
  _speedRoundTimeLeft = 30;
  _nextSpeedQuestion();
}

function _nextSpeedQuestion() {
  if (_speedRoundCurrent >= _speedRoundTotal) {
    _endSpeedRound();
    return;
  }
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + _speedRoundCurrent + 2) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  var questionNum = _speedRoundCurrent + 1;

  _openChallengeModal(
    challenge,
    'Speed Round \u2014 ' + questionNum + ' of ' + _speedRoundTotal,
    '30 seconds. Score: ' + _speedRoundScore + ' correct.',
    'speed-' + today + '-' + idx
  );

  // Inject the timer bar into the modal
  var existingTimer = document.getElementById('speed-timer-bar');
  if (existingTimer) existingTimer.parentNode.removeChild(existingTimer);
  var timerWrap = document.createElement('div');
  timerWrap.id = 'speed-timer-bar';
  timerWrap.style.cssText = 'height:4px;background:var(--border);border-radius:4px;margin-bottom:16px;overflow:hidden;';
  var timerFill = document.createElement('div');
  timerFill.style.cssText = 'height:100%;background:var(--accent);border-radius:4px;width:100%;transition:width 1s linear;';
  timerWrap.appendChild(timerFill);
  var questionEl = document.getElementById('challenge-question');
  questionEl.parentNode.insertBefore(timerWrap, questionEl);

  _speedRoundTimeLeft = 30;
  clearInterval(_speedRoundTimer);
  _speedRoundTimer = setInterval(function() {
    _speedRoundTimeLeft--;
    timerFill.style.width = ((_speedRoundTimeLeft / 30) * 100) + '%';
    if (_speedRoundTimeLeft <= 0) {
      clearInterval(_speedRoundTimer);
      _speedRoundCurrent++;
      setTimeout(_nextSpeedQuestion, 600);
    }
  }, 1000);
}

function _endSpeedRound() {
  clearInterval(_speedRoundTimer);
  var total = _speedRoundTotal;
  var score = _speedRoundScore;
  var xpEarned = score * 5;
  var today = new Date().toDateString();
  awardXP(xpEarned, 'speed-round-' + today, window.innerWidth / 2, 200);
  document.getElementById('challenge-title').textContent = 'Speed Round Complete!';
  document.getElementById('challenge-body').textContent = score + ' of ' + total + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = score >= 8 ? '\uD83C\uDFC6 Excellent!' : score >= 5 ? '\uD83D\uDC4D Good effort!' : '\uD83D\uDCAA Keep practising!';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}

// Override answerChallenge to track speed round score
var _inSpeedRound = false;
var _origAnswerChallenge = null;

// \u2500\u2500 STREAK CHALLENGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 5 questions in a row. One wrong answer ends the run.
var _streakIndex = 0;
var _streakCorrect = 0;
var _streakTotal = 5;
var _streakCurrent = 0;
var _streakFailed = false;

function startStreakChallenge() {
  if (state.xp < 200) return;
  _streakCorrect = 0;
  _streakCurrent = 0;
  _streakFailed = false;
  _nextStreakQuestion();
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
  var today = new Date().toDateString();

  // Wrap challenge to detect wrong answers
  var wrappedChallenge = Object.assign({}, challenge);
  var originalCorrect = challenge.correct;
  var qNum = _streakCurrent + 1;

  _openChallengeModal(
    challenge,
    'Streak Challenge \u2014 ' + qNum + ' of ' + _streakTotal,
    'Answer correctly to keep your streak alive. ' + _streakCorrect + ' correct so far.',
    'streak-' + today + '-' + idx
  );

  // Patch the option buttons to intercept streak logic
  var optionsEl = document.getElementById('challenge-options');
  var buttons = optionsEl.querySelectorAll('button');
  buttons.forEach(function(btn, i) {
    btn.replaceWith(btn.cloneNode(true)); // strip old listeners
  });
  optionsEl.querySelectorAll('button').forEach(function(btn, i) {
    btn.addEventListener('click', function() {
      answerChallenge(i, originalCorrect, challenge.xp, challenge.explanation, 'streak-' + today + '-' + idx);
      if (i !== originalCorrect) {
        _streakFailed = true;
      } else {
        _streakCorrect++;
        _streakCurrent++;
      }
      setTimeout(function() {
        if (_streakFailed || _streakCurrent >= _streakTotal) {
          _endStreakChallenge();
        } else {
          _nextStreakQuestion();
        }
      }, 1800);
    });
  });
}

function _endStreakChallenge() {
  var xpEarned = _streakFailed ? _streakCorrect * 10 : 75;
  var today = new Date().toDateString();
  awardXP(xpEarned, 'streak-challenge-' + today, window.innerWidth / 2, 200);
  document.getElementById('challenge-title').textContent = _streakFailed ? 'Streak Broken!' : 'Perfect Streak!';
  document.getElementById('challenge-body').textContent = _streakCorrect + ' of ' + _streakTotal + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = !_streakFailed ? '\uD83D\uDD25 Flawless!' : _streakCorrect >= 3 ? '\uD83D\uDC4D Good run!' : '\uD83D\uDCAA Try again!';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}

// \u2500\u2500 FLOOR BOSS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 5 questions drawn from the current floor. All must be answered.
var _bossScore = 0;
var _bossTotal = 5;
var _bossCurrent = 0;

function startFloorBoss() {
  var fi = state.currentFloor - 1;
  if (!isFloorComplete(fi)) return;
  _bossScore = 0;
  _bossCurrent = 0;
  _nextBossQuestion();
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
    'Floor ' + state.currentFloor + ' Boss \u2014 ' + qNum + ' of ' + _bossTotal,
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
  document.getElementById('challenge-title').textContent = 'Floor Boss Complete!';
  document.getElementById('challenge-body').textContent = _bossScore + ' of ' + _bossTotal + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = _bossScore === _bossTotal ? '\uD83C\uDFC6 Perfect \u2014 Floor ' + state.currentFloor + ' mastered!' : _bossScore >= 3 ? '\uD83D\uDC4D Solid knowledge!' : '\uD83D\uDCD6 Revisit this floor.';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}
