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
    tag: "Floor 01 \u2014 Foundation",
    sections: [
      {
        id: "1-1",
        title: "How the Internet Actually Works",
        body: `Before you write a single line of code, you need to understand what the internet actually is.\n\nEvery time you type a web address and press Enter, a precise sequence unfolds in under a second. Your browser sends a <strong>request</strong> \u2014 a message that says "give me this page." That request travels across the internet to a <strong>server</strong> \u2014 another computer, somewhere in the world, that is always on and waiting. The server finds the right files and sends them back. Your browser reads those files and draws the page you see.\n\nEvery webpage is made of three types of files working together:\n\n<strong>HTML</strong> \u2014 the structure. Headings, paragraphs, buttons.\n<strong>CSS</strong> \u2014 the visual style. Colours, fonts, layout.\n<strong>JavaScript</strong> \u2014 the behaviour. What happens when you click, type, or scroll.\n\nYou are going to learn all three. But the most important thing to understand right now is this: you are not creating magic. You are creating files. Files that any computer in the world can read and display.\n\nThat is what a web developer does.`,


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
        hint: `The request-response cycle is how the entire web works. Browser asks. Server answers.\n\n<strong>Try this right now:</strong> Open any website. Right-click anywhere on the page and choose "View Page Source." What you see \u2014 all of it \u2014 is what the server sent back to your browser. Every site you've ever visited sent files that looked like that.\n\n<strong>Still fuzzy?</strong> Think of it like ordering food. You place an order (request). The kitchen prepares it (server processes). The waiter brings it to your table (response). Your browser is the waiter. You're the one eating.`,
        quiz: {
          question: "When you visit a website, what is your browser actually doing?",
          options: ["Creating the website from scratch", "Requesting and displaying files from another computer", "Downloading the entire internet", "Connecting directly to the website owner"],
          correct: 1,
          feedback: "Correct. Your browser sends a request to a server \u2014 another computer \u2014 which sends back files. Your browser reads those files and displays them. That's it. That's the web."
        },
        match: {
          prompt: "Every webpage is built from three types of files. Match each to what it does:",
          pairs: [
            { term: "HTML", def: "The structure \u2014 headings, paragraphs, buttons" },
            { term: "CSS", def: "The visual style \u2014 colours, fonts, layout" },
            { term: "JavaScript", def: "The behaviour \u2014 what happens when you interact" }
          ]
        }
      },
      {
        id: "1-2",
        title: "How a Computer Reads Instructions",
        body: `Computers are extraordinarily fast. But they are not smart. They do <strong>exactly</strong> what you tell them \u2014 nothing more, nothing less.\n\nA computer reads code <strong>line by line, top to bottom</strong>. It doesn't skip ahead. It doesn't assume. It reads instruction 1, executes it, then reads instruction 2. This is called <strong>sequential execution</strong> and it is the foundation of everything.\n\nThe order you write things in <strong>matters enormously</strong>. A recipe that says "serve the cake" before "bake the cake" produces nothing edible. Code works the same way. Ask a computer to display a result before it has calculated the result \u2014 and it has nothing to show.\n\nThis is one of the most common beginner mistakes. And now you already understand why it happens.\n\nProfessional developers spend a lot of time thinking about order. Not just what to do \u2014 but when.`,
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
        hint: `Think of a recipe. If it says "serve the cake" before "bake the cake" \u2014 you have a problem. Computers are the same. They do exactly what you say, in exactly the order you say it. No guessing, no common sense.\n\n<strong>Still fuzzy?</strong> Write out 5 instructions for making a cup of tea in order. That sequential thinking \u2014 that's exactly how a computer reads code.`,
        quiz: {
          question: "If your code says: Step 1: Display the result. Step 2: Calculate the result. What happens?",
          options: ["It works fine, computers are smart enough to reorder", "It displays nothing or an error, because the result doesn't exist yet", "It calculates first anyway", "It asks you what to do"],
          correct: 1,
          feedback: "The computer tries to display the result before it's been calculated \u2014 so there's nothing to show. Order is everything. This is one of the most common beginner mistakes, and now you already understand why it happens."
        },
        code: {
          lang: "JavaScript",
          starter: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:\'IBM Plex Mono\',monospace;padding:24px;font-size:13px;line-height:1.7;">\n<h2 style="color:#c8a96e;margin-top:0;">Order Matters</h2>\n<div id="output"></div>\n<script>\n  var out = \'\';\n\n  // Step 1: Set a price\n  var price = 40;\n  out += \'<p>1. Price set to: \u00a3\' + price + \'</p>\';\n\n  // Step 2: Calculate a 10% discount\n  var discount = price * 0.10;\n  out += \'<p>2. Discount calculated: \u00a3\' + discount.toFixed(2) + \'</p>\';\n\n  // Step 3: Apply it\n  var finalPrice = price - discount;\n  out += \'<p style="color:#c8a96e;font-size:18px;margin-top:16px;">You pay: \u00a3\' + finalPrice.toFixed(2) + \'</p>\';\n\n  document.getElementById(\'output\').innerHTML = out;\n<\/script>\n</body>\n</html>',
          challenges: [
            "Move Step 3 above Step 2 \u2014 what breaks and why?",
            "Change the price from 40 to 120",
            "Change the discount from 10% to 25%"
          ]
        }
      },
      {
        id: "1-3",
        title: "The Logic Behind All Code",
        body: `Every program ever written \u2014 from a calculator app to a social network \u2014 is built from exactly three ideas.\n\n<strong>Conditions</strong> decide which path to take. If the user is logged in, show the dashboard. If not, show the login page. Every decision in code is a condition. There are no exceptions.\n\n<strong>Loops</strong> repeat instructions until something changes. Check every item in a shopping cart and add up the total. Send a notification to every user in a list. Any time something needs to happen "for each item" or "until a condition is met" \u2014 that is a loop.\n\n<strong>Functions</strong> are named, reusable blocks of instructions. Instead of writing the same ten lines every time you need to validate a form, you write it once, give it a name, and call that name whenever you need it. Functions are how professional code stays manageable as it scales.\n\nThere is nothing in any programming language \u2014 not one thing \u2014 that is not built on some combination of these three ideas. When you are writing complex software in two years, you will still be thinking in conditions, loops and functions.`,

        callout: {
          type: "default",
          label: "The Professional Lens",
          text: `When a developer reads someone else's code for the first time, this is what they look for: where are the conditions, where are the loops, where are the functions. Everything else is just detail. Master these three and you can read any codebase.`
        },
        hint: `A <strong>condition</strong> is a fork in the road. The road splits. You go one way or the other based on what's true.\nA <strong>loop</strong> is a roundabout. You go around until you're told to exit.\nA <strong>function</strong> is a shortcut. You name a journey once. Then you can take it anytime just by saying its name.\n\n<strong>Try this:</strong> Pick any app on your phone. Describe one condition it uses, one loop it uses, and one repeated action that is probably a function. You will find all three in under a minute.`,
        quiz: {
          question: "Which of the three core concepts means: 'Do this over and over until something stops you'?",
          options: ["A condition", "A function", "A loop", "A variable"],
          correct: 2,
          feedback: "A loop repeats instructions until a condition tells it to stop. A condition decides which path to take. A function is a reusable block of instructions. These three are the building blocks of everything."
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
        body: `You are not going to write code yet. You are going to <strong>read</strong> it.\n\nThis is deliberate. Before you speak a language fluently, you learn to recognise it. Same principle applies here. Reading code before writing it trains your brain to see structure and meaning rather than just symbols.\n\nLook at the example below. Do not panic. Do not try to memorise it. Just try to read it like a sentence \u2014 guess what each line does before you read the explanation. That act of guessing is already how developers think.`,
        code: {
          lang: "HTML",
          lines: [
            '<span class="code-comment"><!-- This is a comment. The computer ignores it. It\'s just a note for humans. --></span>',
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
          text: "Those angle brackets \u2014 the &lt; and &gt; \u2014 are called <strong>tags</strong>. They're labels that tell the browser what each piece of content is. h1 means a big heading. p means a paragraph. button means a clickable button. Open tag, content, close tag. That's the pattern."
        },
        callout2: {
          type: "focus",
          label: "What You're Actually Learning",
          text: `The three lines below represent three of the most-used elements in all of web development. Every professional developer has written h1, p and button hundreds of times. By the end of this course, so will you.`
        },
        hint: `Don't read the code like a sentence. Read it like signs on a road.\n\nThe tag name tells you what type of thing it is. &lt;h1&gt; = big heading. &lt;p&gt; = paragraph. &lt;button&gt; = button. The words between the opening and closing tag are what actually appears on screen.\n\n<strong>Still fuzzy?</strong> Think of tags like labels on boxes. The label tells you what's inside. The content is the thing inside the box. Open the box (opening tag), here's what's inside (content), close the box (closing tag).`,
        quiz: {
          question: "Looking at the code above — what does the <h1> tag tell the browser?",
          options: [
            "To make the text bold and underlined",
            "That this content is a large heading",
            "To link to another page",
            "To ignore this line — it is a comment"
          ],
          correct: 1,
          feedback: "h1 means 'heading level 1' — the largest, most important heading on the page. Tags are labels. They tell the browser what type of content is inside them. Open tag, content, close tag. That is the entire pattern of HTML."
        },
      },
      {
        id: "1-5",
        title: "Floor 1 Check \u2014 Explain It Back",
        body: `You have covered the four ideas that underpin everything in web development.\n\nHow the internet works. How computers read instructions. The three building blocks of all code. And your first look at HTML.\n\nThis is not a small thing. Most people who try to learn to code never properly understand these foundations \u2014 they rush to write syntax before they understand what it is or why it works. You have not done that.\n\nBefore you move to Floor 2, do one final check. Not for us \u2014 for you. Answer the question below in your head before selecting an option. If you can explain it clearly, you are ready. If something feels shaky, go back to that one section. Not the whole floor \u2014 just that section.`,
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
        hint: `If you cannot answer the question below without guessing \u2014 that is useful information, not failure. It tells you exactly which section to return to. One weak brick does not mean a broken building. It means one brick to fix.`,
        quiz: {
          question: "A developer builds a system that: checks whether a user has paid (condition), processes each item in their order one by one (loop), and uses the same discount calculation in three different places (function). Which statement is true?",
          options: [
            "This system uses all three core building blocks of programming",
            "Loops and functions are the same thing \u2014 both repeat code",
            "Conditions are not needed here \u2014 loops can make decisions",
            "You would need a fourth concept to build this"
          ],
          correct: 0,
          feedback: "Exactly right. One condition, one loop, one function \u2014 and you have described a real piece of professional software. Every system, no matter how complex, is built from combinations of these three things. You now have the lens every developer uses."
        },
      }
    ]
  },
  {
    id: 2,
    title: "Seeing It Come Alive",
    subtitle: "HTML & CSS \u2014 the visual layer",
    color: "#7eb8c8",
    duration: "6-8 weeks",
    sessions: "5 per week",
    length: "45-60 min",
    tag: "Floor 02 \u2014 Visual Building",
    sections: [
      {
        id: "2-1",
        title: "System Online \u2014 Boot Sequence",
        body: `The system has detected an error. Your job is to fix it.\n\nBelow is a live console. A variable has been declared but not assigned. Assign the correct value to bring Floor 2 online.`,
        interactive: 'f2-variable',
        hint: `Variables hold values. We are on Floor 2. The value must be exactly 2 \u2014 an integer, not text.`,
        checklist: ["I understand what a variable is", "I assigned the correct value", "The system came online"]
      },
      {
        id: "2-2",
        title: "HTML \u2014 The Skeleton",
        body: `Every webpage you have ever visited is built with HTML at its core. HTML gives a page its <strong>structure</strong> \u2014 it defines what each piece of content <em>is</em>, not how it looks.\n\nEvery HTML element follows the same pattern:\n\n<strong>Opening tag \u2192 Content \u2192 Closing tag</strong>\n\nSo <code>&lt;h1&gt;Hello&lt;/h1&gt;</code> means: this is a heading, the content is Hello, the heading is now closed. That pattern applies to every element without exception.\n\nThe elements you will use most:\n\n<strong>&lt;h1&gt; to &lt;h6&gt;</strong> \u2014 Six heading levels. h1 is the main title.\n<strong>&lt;p&gt;</strong> \u2014 A paragraph of text.\n<strong>&lt;a href="..."&gt;</strong> \u2014 A link. href is the URL it goes to.\n<strong>&lt;ul&gt; and &lt;li&gt;</strong> \u2014 An unordered list and its items.\n<strong>&lt;div&gt;</strong> \u2014 A container with no visual style of its own \u2014 used for grouping and layout.\n<strong>&lt;button&gt;</strong> \u2014 A clickable button.\n<strong>&lt;input&gt;</strong> \u2014 A text field or form control.\n<strong>&lt;img src="..."&gt;</strong> \u2014 An image. Self-closing \u2014 no closing tag needed.\n\nHTML is intentionally forgiving \u2014 browsers try to render even broken markup. But writing it correctly matters when CSS and JavaScript are added later.`,
        callout: {
          type: "default",
          label: "The Pattern Never Changes",
          text: "Opening tag, content, closing tag. That is the whole language. Knowing which elements exist and what attributes they accept comes from using them, not memorising them."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "Don't try to memorise the element list above. Use the Code Editor tab \u2014 try each tag, see what it does. Retention through doing is faster and sticks better than retention through reading."
        },
        hint: `Open any website. Right-click anywhere and choose "View Page Source." You will see the raw HTML the server sent. It looks overwhelming at first \u2014 but scan it. You will start recognising tags: h1, p, div, a, button. They are everywhere.\n\n<strong>What are attributes?</strong> An attribute adds extra information inside an opening tag. &lt;a href="https://google.com"&gt;Click here&lt;/a&gt; \u2014 href is the attribute, the URL is the value. Different elements have different attributes. You will encounter them as you build.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0d1117; color: #e6edf3; font-family: sans-serif; padding: 24px; line-height: 1.7; }\n    h1 { color: #7eb8c8; }\n    h2 { color: #c8a96e; font-size: 20px; }\n    a { color: #7eb8c8; }\n    button { background: #7eb8c8; color: #0d1117; border: none; padding: 8px 18px; border-radius: 5px; cursor: pointer; }\n    ul { margin: 8px 0; padding-left: 20px; }\n    li { margin: 4px 0; }\n  </style>\n</head>\n<body>\n  <h1>My HTML Page</h1>\n  <h2>A Smaller Heading</h2>\n  <p>This is a paragraph. HTML defines what type of content each piece is.</p>\n  <a href="#">A link (not pointing anywhere yet)</a>\n  <ul>\n    <li>First list item</li>\n    <li>Second list item</li>\n    <li>Third list item</li>\n  </ul>\n  <button>A Button</button>\n</body>\n</html>',
          challenges: [
            "Add an &lt;h3&gt; heading below the &lt;h2&gt; with any text you like",
            "Add a second &lt;p&gt; paragraph \u2014 write one sentence about what HTML does",
            "Change the &lt;a&gt; href attribute to a real URL like https://google.com",
            "Add a fourth &lt;li&gt; item to the list",
            "Add a second button below the first with different text"
          ]
        },
        quiz: {
          question: "What does the &lt;p&gt; tag define in an HTML document?",
          options: ["A clickable button", "A paragraph of text", "A page heading", "A hyperlink to another page"],
          correct: 1,
          feedback: "The &lt;p&gt; tag defines a paragraph. HTML tags label what type of content something is \u2014 not how it looks. Appearance is entirely CSS's job."
        },
        checklist: ["I understand that HTML defines structure not appearance", "I completed at least 3 code challenges", "I can write common HTML elements without looking them up"]
      },
      {
        id: "2-3",
        title: "CSS \u2014 Making It Look Like Something",
        body: `If HTML is the skeleton, <strong>CSS is everything visual</strong>. Colours, fonts, spacing, layout, animations \u2014 all of it is CSS.\n\nCSS works by <strong>selecting</strong> HTML elements and applying rules to them. A rule has two parts: a <strong>property</strong> (what you want to change) and a <strong>value</strong> (what you want to change it to).\n\n<code>h1 { color: #7eb8c8; font-size: 36px; }</code>\n\nThis reads: "find every h1 element and make its colour #7eb8c8 and its font size 36px."\n\nThe most useful CSS properties to know now:\n\n<strong>color</strong> \u2014 text colour\n<strong>background-color</strong> \u2014 background colour\n<strong>font-size</strong> \u2014 text size in px, em, or rem\n<strong>font-family</strong> \u2014 typeface\n<strong>margin</strong> \u2014 space outside an element\n<strong>padding</strong> \u2014 space inside an element, between content and border\n<strong>border</strong> \u2014 a line drawn around an element\n<strong>border-radius</strong> \u2014 rounds the corners\n<strong>width / height</strong> \u2014 sets dimensions\n<strong>display</strong> \u2014 controls layout behaviour (block, flex, grid, none)\n\nYou target elements three ways:\n\n<strong>By tag name</strong> \u2014 h1 { } targets all h1 elements\n<strong>By class</strong> \u2014 .highlight { } targets elements with class="highlight"\n<strong>By id</strong> \u2014 #header { } targets the element with id="header"\n\nClasses are the most common. You will use them constantly.`,
        callout: {
          type: "focus",
          label: "Visual Learner Moment",
          text: "CSS is where your visual instincts become an advantage. Every design decision \u2014 every colour, every space, every proportion \u2014 is yours to control. This floor will feel natural to you."
        },
        callout2: {
          type: "default",
          label: "The Professional Reality",
          text: "Senior developers don't memorise every CSS property. They know the common ones and look up the rest. Learning to read CSS documentation quickly is more valuable than memorising it."
        },
        hint: `Think of CSS as instructions to an interior designer. "The headings \u2014 make them blue. The background \u2014 dark. The button \u2014 rounded corners with a hover effect." CSS is that conversation written in a format the browser understands.\n\n<strong>The cascade:</strong> CSS stands for Cascading Style Sheets. "Cascading" means that if two rules target the same element, the more specific one wins. An id selector beats a class selector. A class beats a tag name. When something looks wrong, specificity is usually why.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* Tag selector \u2014 targets all h1 elements */\n    h1 {\n      color: #7eb8c8;\n      font-size: 36px;\n      letter-spacing: 2px;\n    }\n\n    /* Tag selector \u2014 targets the body */\n    body {\n      background: #0d1117;\n      font-family: sans-serif;\n      padding: 32px;\n    }\n\n    /* Class selector \u2014 targets elements with class="highlight" */\n    .highlight {\n      background: #c8a96e;\n      color: #0d1117;\n      padding: 2px 8px;\n      border-radius: 4px;\n    }\n\n    /* Tag selector with hover state */\n    button {\n      background: #7eb8c8;\n      color: #0d1117;\n      border: none;\n      padding: 12px 24px;\n      border-radius: 6px;\n      font-size: 14px;\n      cursor: pointer;\n    }\n    button:hover {\n      background: #a8d4e2;\n    }\n\n    p { color: #e6edf3; line-height: 1.7; max-width: 500px; }\n  </style>\n</head>\n<body>\n  <h1>CSS Changes Everything</h1>\n  <p>Without CSS this would be black text on a white background. Every colour, font, and layout decision is CSS.</p>\n  <p>This word is <span class="highlight">highlighted</span> using a CSS class.</p>\n  <button>I Have Styles</button>\n</body>\n</html>',
          challenges: [
            "Change the h1 color from #7eb8c8 to any hex colour you like",
            "Change the h1 font-size from 36px to 52px",
            "Change the button background colour",
            "Add border-radius: 0 to the button to make it square",
            "Add font-style: italic to the p selector to make all paragraphs italic",
            "Create a new class called .warning with a red background and white text, then add it to one element"
          ]
        },
        quiz: {
          question: "In CSS, what does the following rule do?  p { color: red; }",
          options: [
            "Makes all text on the page red",
            "Makes only the first paragraph red",
            "Makes all &lt;p&gt; elements display red text",
            "Creates a new HTML element called p"
          ],
          correct: 2,
          feedback: "p { color: red; } targets every &lt;p&gt; element on the page and sets its text colour to red. CSS selectors target HTML elements \u2014 a tag selector like p applies to every instance of that tag."
        },
        checklist: ["I understand the difference between HTML and CSS", "I completed at least 4 code challenges", "I understand the difference between tag, class, and id selectors"]
      },
      {
        id: "2-4",
        title: "Your First Webpage",
        body: `Now you build something real. Not a tutorial you follow \u2014 a page you own.\n\nThe code editor already has a working starting point. Read through it before you change anything. Notice how the HTML and CSS are connected: the HTML defines the elements, the CSS defines how they look.\n\nThen start with the challenges. Work through them one at a time. Each one teaches you something different about how HTML and CSS interact.\n\nWhen you are done, everything you have changed is yours. You wrote it. You understand why it works. That is different from copying code from a tutorial.`,
        callout: {
          type: "warning",
          label: "The Cautious Learner",
          text: "You might be tempted to just read the code rather than change it. Don't. The physical act of editing code and seeing what breaks or improves is where the actual learning happens. Watching someone drive doesn't teach you to drive."
        },
        callout2: {
          type: "focus",
          label: "What You're Actually Practising",
          text: "Reading code before changing it is a professional skill. Every developer who joins an existing codebase has to read it first. You are practising that right now."
        },
        hint: `If something breaks when you make a change \u2014 good. That's information. Ask yourself: what did I change, and what did that cause? Then undo just that one change and try again differently.\n\n<strong>Colours in CSS:</strong> You can use named colours (red, blue, gold) or hex codes (#c8a96e) or rgb values (rgb(200, 169, 110)). All three work. Hex codes give you the most precise control.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* === BASE STYLES === */\n    body {\n      background: #0a0a0a;\n      color: #e6edf3;\n      font-family: \'Georgia\', serif;\n      padding: 40px;\n      max-width: 700px;\n      margin: 0 auto;\n    }\n\n    /* === HEADING === */\n    h1 {\n      color: #c8a96e;\n      font-size: 40px;\n      letter-spacing: 1px;\n      border-bottom: 1px solid #333;\n      padding-bottom: 16px;\n    }\n\n    /* === PARAGRAPH === */\n    p {\n      line-height: 1.8;\n      color: #b0c4db;\n    }\n\n    /* === LINKS === */\n    a {\n      color: #7eb8c8;\n      text-decoration: none;\n    }\n    a:hover { text-decoration: underline; }\n\n    /* === BUTTON === */\n    .btn {\n      display: inline-block;\n      background: #c8a96e;\n      color: #0a0a0a;\n      padding: 12px 24px;\n      border: none;\n      border-radius: 6px;\n      cursor: pointer;\n      font-size: 14px;\n      margin-top: 16px;\n    }\n    .btn:hover { background: #d9bb88; }\n  </style>\n</head>\n<body>\n  <h1>I Built This</h1>\n  <p>This is a real webpage. The HTML gives it structure. The CSS gives it style. You now understand both.</p>\n  <p>Every professional website starts with exactly this \u2014 a document, some elements, some rules about how they should look.</p>\n  <a href="#">A link to somewhere</a>\n  <br><br>\n  <button class="btn">A Styled Button</button>\n</body>\n</html>',
          challenges: [
            "Change the h1 colour to anything other than gold",
            "Change the font-family from Georgia to any font you like \u2014 try \'Arial\', \'Verdana\', or \'Courier New\'",
            "Change the body background from #0a0a0a to a dark colour of your choosing",
            "Add a second paragraph below the first",
            "Add an &lt;h2&gt; subheading between the h1 and the first paragraph and style it with CSS",
            "Change the .btn class to have a different background colour and add a larger border-radius"
          ]
        },
        quiz: {
          question: "A CSS rule says: .btn { background: blue; }  What does the dot before btn mean?",
          options: [
            "btn is an HTML tag name",
            "btn is a CSS property",
            "btn is a class name \u2014 targets elements with class=\"btn\"",
            "btn is an id \u2014 targets the element with id=\"btn\""
          ],
          correct: 2,
          feedback: "A dot prefix means class selector. .btn targets all elements with class=\"btn\". An id selector uses a hash: #btn. Tag selectors have no prefix: button { }. Classes are the most commonly used selector in professional CSS."
        },
        checklist: ["I read through the starter code before changing it", "I completed at least 4 challenges", "I understand the difference between HTML structure and CSS style"]
      },
      {
        id: "2-5",
        title: "Floor 2 Project \u2014 Your Personal Page",
        body: `Build a webpage about yourself. It must include your name as a heading, a short paragraph, a list of 3 interests, a background colour that feels like you, a custom font, and one thing you added that wasn't in any lesson.\n\nThat last requirement is the most important. It forces you to figure something out yourself.`,
        callout: { type: "default", label: "Why This Matters", text: "That self-directed addition is where the developer mindset begins. Figuring something out alone \u2014 even once \u2014 builds more confidence than ten guided examples." },
        hint: `If you're staring at a blank file not knowing where to start \u2014 start with just the HTML. No CSS yet. Get the words on the page first. Then add the style. One thing at a time.`,
        checklist: ["I built my personal webpage", "It has all 6 elements", "I added something I figured out myself", "I'm happy with how it looks", "I'm ready for Floor 3"]
      }
    ]
  },
  {
    id: 3,
    title: "Building With Training Wheels",
    subtitle: "JavaScript \u2014 making things actually work",
    color: "#c87e9a",
    duration: "8-10 weeks",
    sessions: "5 per week",
    length: "60 min",
    tag: "Floor 03 \u2014 Interactivity",
    sections: [
      {
        id: "3-1",
        title: "What JavaScript Does",
        body: `HTML is structure. CSS is style. <strong>JavaScript is behaviour.</strong>\n\nIt is the language that makes things happen when you interact with a page. A button that does something when clicked. A form that validates your input before it is sent. A menu that slides open. A countdown timer. A map that responds to dragging. A game.\n\nAll of that is JavaScript. It is what transforms a static document into something that responds to the person using it.\n\nUnlike HTML and CSS, JavaScript is a <strong>full programming language</strong>. It has variables, conditions, loops, and functions \u2014 the three concepts from Floor 1, now written in real code that the browser executes line by line.\n\nJavaScript runs <strong>in the browser</strong>. When you visit a website, the server sends your browser the HTML, CSS, and JavaScript files. The browser reads them in order: HTML first, CSS second, JavaScript third. JavaScript can then reach into the HTML and change anything on the page in real time \u2014 without reloading.\n\nThis ability to read and change the HTML structure of a page is called <strong>DOM manipulation</strong>. DOM stands for Document Object Model \u2014 it is the browser's internal representation of the page. Every element you can see is a node in the DOM. JavaScript can find any node, read it, change it, add new ones, or remove them entirely.\n\nThat is the power you are about to learn to use.`,
        callout: {
          type: "default",
          label: "The Real Shift",
          text: "Floor 3 is where web development starts to feel like actual programming. It will be harder than Floors 1 and 2. That difficulty is the point \u2014 it means you are learning something genuinely new. Expect it. Work through it."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "Don't try to understand everything about JavaScript before you start using it. Use the editor below first. See JavaScript running. Then the explanations will have something concrete to attach to."
        },
        hint: `HTML = the structure. CSS = the appearance. JavaScript = the behaviour. Without JavaScript, a page cannot respond to what the user does.\n\n<strong>The console (F12):</strong> Open any website, press F12, click "Console." You are now looking at JavaScript's output channel. Type: alert("hello") and press Enter. That was JavaScript. It runs immediately, in the browser, right now.\n\n<strong>Feeling nervous?</strong> Good. Nervousness means it is new. You already understand conditions, loops, and functions from Floor 1. JavaScript is just those three things written out in code. You have more foundation than you think.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; }\n    h2 { color: #c87e9a; margin-top: 0; }\n    .demo { margin: 20px 0; }\n    .label { font-size: 10px; letter-spacing: 2px; color: #c8a96e; margin-bottom: 8px; font-family: monospace; }\n    button { background: #c87e9a; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 4px; }\n    button:hover { background: #d4a0b5; }\n    #output { background: #0d1117; padding: 16px; border-radius: 8px; margin-top: 16px; min-height: 50px; color: #c8a96e; font-family: monospace; font-size: 14px; }\n    input { background: #1e293b; border: 1px solid #334155; color: white; padding: 8px 12px; border-radius: 6px; margin: 4px; font-size: 14px; }\n  </style>\n</head>\n<body>\n  <h2>JavaScript in Action</h2>\n  <p style="color:#9ca3af;font-size:13px;">Every interaction below is JavaScript responding to you in real time.</p>\n\n  <div class="demo">\n    <div class="label">CLICK EVENT</div>\n    <button onclick="handleClick()">Click me</button>\n    <button onclick="changeColour()">Random colour</button>\n  </div>\n\n  <div class="demo">\n    <div class="label">LIVE INPUT \u2014 JavaScript reads as you type</div>\n    <input type="text" id="nameInput" placeholder="Type your name..." oninput="updateName()">\n  </div>\n\n  <div id="output">Click a button or start typing above.</div>\n\n  <script>\n    var clicks = 0;\n\n    function handleClick() {\n      clicks++;\n      var word = clicks === 1 ? \'time\' : \'times\';\n      document.getElementById(\'output\').textContent = \'Button clicked \' + clicks + \' \' + word + \'.\';\n    }\n\n    function changeColour() {\n      var colours = [\'#c87e9a\', \'#7eb8c8\', \'#c8a96e\', \'#a8d5a2\', \'#9a7ec8\'];\n      var pick = colours[Math.floor(Math.random() * colours.length)];\n      document.getElementById(\'output\').style.color = pick;\n      document.getElementById(\'output\').textContent = \'Colour changed to \' + pick;\n    }\n\n    function updateName() {\n      var name = document.getElementById(\'nameInput\').value;\n      if (name) {\n        document.getElementById(\'output\').textContent = \'Hello, \' + name + \'. JavaScript is reading what you type in real time.\';\n      } else {\n        document.getElementById(\'output\').textContent = \'Click a button or start typing above.\';\n      }\n    }\n  <\/script>\n</body>\n</html>',
          challenges: [
            "Change the button text \'Click me\' to your own name",
            "Add a third button that sets the output text to any message you choose",
            "Change the starting value of the clicks variable from 0 to 10 \u2014 what happens?",
            "Add a new colour to the colours array in the changeColour function"
          ]
        },
        quiz: {
          question: "What does DOM stand for, and what does JavaScript use it for?",
          options: [
            "Data Object Method \u2014 used to store information in a database",
            "Document Object Model \u2014 the browser\'s representation of the page that JavaScript can read and change",
            "Dynamic Output Mechanism \u2014 used to send data to a server",
            "Display Object Map \u2014 used to control CSS animations"
          ],
          correct: 1,
          feedback: "DOM stands for Document Object Model. It is the browser\'s internal representation of the HTML page as a tree of objects. JavaScript can find any element in the DOM, read its content, change it, add new elements, or remove them \u2014 all without the page reloading."
        },
      },
      {
        id: "3-2",
        title: "Variables, Conditions and Loops in Real Code",
        body: `The three most fundamental building blocks of any programming language are <strong>variables</strong>, <strong>conditions</strong>, and <strong>loops</strong>. Once you understand all three, you can write logic that solves real problems.\n\n<strong>Variables</strong> store information. You create one with <code>let</code> (value can change) or <code>const</code> (value is fixed). Give it a name that describes what it holds, then assign a value with <code>=</code>.\n\n<code>let score = 0;</code> — a number that starts at zero\n<code>let username = "Alex";</code> — text, always wrapped in quotes\n<code>let isLoggedIn = false;</code> — a boolean: either true or false\n<code>const MAX_LIVES = 3;</code> — a constant that cannot be reassigned\n\n<strong>Conditions</strong> let your code make decisions. The most common form is <code>if / else if / else</code>. The value inside <code>if ( )</code> must resolve to true or false. You compare values with: <code>===</code> (strictly equal), <code>!==</code> (not equal), <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>.\n\n<strong>Loops</strong> repeat code. A <code>for</code> loop has three parts: where to start, when to stop, what to do each iteration.\n\n<code>for (let i = 0; i < 5; i++)</code> runs five times (i goes 0, 1, 2, 3, 4). Inside the loop body, you can use <code>i</code> to know which iteration you are on.\n\nThese three concepts are the backbone of all programming logic. Everything else in any language is built on top of them.`,
        callout: {
          type: "focus",
          label: "Logical Thinker Note",
          text: "Read each block and trace through what it does before looking at the explanation. Your logical brain will get most of it right. Trust it."
        },
        callout2: {
          type: "default",
          label: "Three Concepts, One Mental Model",
          text: "Think of variables as memory, conditions as decisions, and loops as repetition. Every program ever written is a combination of these three things — store data, decide what to do with it, repeat where needed. If you understand these deeply you understand the core of programming."
        },
        hint: `<strong>let vs const:</strong> Use const by default. Only use let when the value genuinely needs to change (counters, accumulators, state). var is outdated — avoid it.\n\n<strong>=== vs ==:</strong> Always use === (strict equality). It checks both value and type. == does automatic type coercion which creates subtle bugs.\n\n<strong>Loop anatomy:</strong> for (initialise; condition; update). The loop runs while the condition is true. The update runs after every iteration. for (let i = 0; i < 10; i++) runs 10 times.\n\n<strong>Stuck?</strong> Open the browser console (F12 — Console tab). Type any variable name to see its value. Add console.log("reached step 2") inside loops to trace execution.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; }\n    h2 { color: #c87e9a; margin-top: 0; }\n    label { display: block; margin: 10px 0 4px; font-size: 13px; color: #a0b0c0; }\n    input[type=text], input[type=number] { background: #0d1117; border: 1px solid #30363d; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; width: 200px; }\n    .btn { background: #c87e9a; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 8px 4px 8px 0; font-size: 13px; }\n    .btn:hover { background: #d4a0b5; }\n    #output { background: #0d1117; padding: 16px; border-radius: 8px; margin-top: 16px; min-height: 60px; color: #c8a96e; font-family: monospace; font-size: 13px; white-space: pre-wrap; }\n  </style>\n</head>\n<body>\n  <h2>Variables, Conditions &amp; Loops</h2>\n\n  <label>Your name:</label>\n  <input type="text" id="nameInput" value="Alex" />\n\n  <label>Your score (0 – 150):</label>\n  <input type="number" id="scoreInput" value="75" />\n\n  <br>\n  <button class="btn" onclick="checkScore()">Check score grade</button>\n  <button class="btn" onclick="runLoop()">Loop 5 times</button>\n  <button class="btn" onclick="clearOutput()">Clear</button>\n\n  <div id="output">Click a button to see output here.</div>\n\n  <script>\n    function checkScore() {\n      const name = document.getElementById(\'nameInput\').value;\n      const score = Number(document.getElementById(\'scoreInput\').value);\n\n      let grade;\n      if (score >= 120) {\n        grade = \'A — Outstanding!\';\n      } else if (score >= 90) {\n        grade = \'B — Great work\';\n      } else if (score >= 60) {\n        grade = \'C — Decent, keep going\';\n      } else {\n        grade = \'F — Needs more effort\';\n      }\n\n      document.getElementById(\'output\').textContent = name + \'\\\'s score: \' + score + \'\\nGrade: \' + grade;\n    }\n\n    function runLoop() {\n      const name = document.getElementById(\'nameInput\').value;\n      let result = \'\';\n\n      for (let i = 1; i <= 5; i++) {\n        result += \'Loop \' + i + \': Hello, \' + name + \'!\\n\';\n      }\n\n      document.getElementById(\'output\').textContent = result;\n    }\n\n    function clearOutput() {\n      document.getElementById(\'output\').textContent = \'Click a button to see output here.\';\n    }\n  <\/script>\n</body>\n</html>',
          challenges: [
            "Add a fourth grade: S rank for scores above 140 (add another else if block)",
            "Change the loop to count DOWN from 10 to 1 instead of up from 1 to 5",
            "Add a third button that shows the length of the name (name.length) and whether it has more than 5 characters",
            "Change the greeting inside the loop to show a different message every other loop (use if (i % 2 === 0) to check even/odd)"
          ]
        },
        quiz: {
          question: "What is the difference between let and const in JavaScript?",
          options: [
            "let is for strings, const is for numbers",
            "let variables can be reassigned later, const variables cannot be reassigned after creation",
            "const is faster than let at runtime",
            "There is no real difference — they both work the same way"
          ],
          correct: 1,
          feedback: "const locks the binding — once assigned you cannot reassign it. let allows reassignment. Use const by default and only reach for let when you know the value must change (counters, state). This prevents entire categories of accidental bugs."
        },
      },
      {
        id: "3-3",
        title: "Buttons That Actually Do Things",
        body: `This is the lesson where it starts to feel like power. You are going to connect JavaScript to HTML so that when a user does something, <strong>the page responds</strong>.\n\nThe mechanism is called <strong>DOM manipulation</strong>. DOM stands for Document Object Model \u2014 it is the browser's internal map of all the elements on the page. JavaScript can navigate that map and change anything: text, styles, visibility, structure.\n\nThe three most commonly used tools for this:\n\n<code>document.getElementById('id')</code> \u2014 finds one specific element by its id attribute\n<code>element.textContent</code> \u2014 reads or sets the text content of an element\n<code>element.style.property</code> \u2014 reads or sets a CSS property directly\n\nThere is also:\n\n<code>document.querySelector('.className')</code> \u2014 finds the first element matching a CSS selector\n<code>document.querySelectorAll('.className')</code> \u2014 finds all matching elements (returns a list)\n<code>element.classList.add('class')</code> \u2014 adds a CSS class to an element\n<code>element.classList.remove('class')</code> \u2014 removes a CSS class\n<code>element.classList.toggle('class')</code> \u2014 adds the class if absent, removes it if present\n\nThe pattern you will use thousands of times in your career:\n1. User does something (clicks, types, hovers)\n2. An event fires and calls a JavaScript function\n3. The function finds the right element(s) using DOM methods\n4. The function reads or changes those elements\n5. The page updates instantly, no reload needed`,
        callout: {
          type: "default",
          label: "What Is Actually Happening",
          text: "The button calls a function. The function finds an element by its id. The function changes something about that element. Three steps. That is the entire pattern of interactive web development \u2014 everything else is just variations on those three steps."
        },
        callout2: {
          type: "focus",
          label: "Event-Driven Programming",
          text: "JavaScript is event-driven. Code doesn't run from top to bottom once \u2014 it sits and waits for things to happen (clicks, keypresses, timers, network responses), then runs the right function in response. This is a fundamentally different mental model from sequential scripts."
        },
        hint: `The id attribute is a unique name tag. You put id="message" on a paragraph so JavaScript can find exactly that paragraph.\n\ndocument.getElementById("message") says: "search the entire page and give me the element whose id is message."\n\n.textContent = "new text" says: "replace whatever is written inside that element with this."\n\n<strong>classList.toggle is one of the most useful tools in DOM manipulation.</strong> If you add a class that has a CSS style (e.g., .visible { display: block; }), toggling that class shows or hides an element. That is how most show/hide interactions work.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; }\n    h2 { color: #c87e9a; margin-top: 0; }\n    .btn { background: #c87e9a; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 4px; font-size: 13px; }\n    .btn:hover { background: #d4a0b5; }\n    #output { background: #0d1117; padding: 16px; border-radius: 8px; margin: 16px 0; min-height: 50px; color: #c8a96e; font-family: monospace; }\n    #counter { font-size: 64px; color: #7eb8c8; text-align: center; margin: 8px 0; }\n    .hidden { display: none; }\n    #secret { background: #1e3a5f; padding: 16px; border-radius: 8px; margin-top: 12px; color: #7eb8c8; }\n  </style>\n</head>\n<body>\n  <h2>DOM Manipulation</h2>\n\n  <button class="btn" onclick="changeMessage()">Change the text</button>\n  <button class="btn" onclick="increment()">Count up</button>\n  <button class="btn" onclick="resetCounter()">Reset</button>\n  <button class="btn" onclick="toggleSecret()">Show / Hide</button>\n\n  <div id="output">Click any button to see JavaScript change this text.</div>\n  <div id="counter">0</div>\n\n  <div id="secret" class="hidden">\n    This element was hidden. classList.toggle() revealed it.\n  </div>\n\n  <script>\n    let count = 0;\n\n    function changeMessage() {\n      document.getElementById(\'output\').textContent = \'JavaScript changed this. The DOM was updated without a page reload.\';\n    }\n\n    function increment() {\n      count++;\n      document.getElementById(\'counter\').textContent = count;\n    }\n\n    function resetCounter() {\n      count = 0;\n      document.getElementById(\'counter\').textContent = count;\n    }\n\n    function toggleSecret() {\n      document.getElementById(\'secret\').classList.toggle(\'hidden\');\n    }\n  <\/script>\n</body>\n</html>',
          challenges: [
            "Change the changeMessage function to set the text to something you choose",
            "Change the increment function to add 5 each click instead of 1",
            "Add a fourth button that sets the counter to exactly 100",
            "Change the counter text colour when it reaches 10 \u2014 use document.getElementById(\'counter\').style.color = \'#c87e9a\'"
          ]
        },
        quiz: {
          question: "What does document.getElementById('header').textContent = 'Hello' do?",
          options: [
            "Creates a new element with id=\'header\' containing Hello",
            "Finds the element with id=\'header\' and replaces its text content with Hello",
            "Adds a CSS class called Hello to the element with id=\'header\'",
            "Searches the entire internet for an element called header"
          ],
          correct: 1,
          feedback: "document.getElementById finds the element with that specific id. .textContent accesses the text inside it. Assigning a new value replaces whatever was there. The page updates instantly \u2014 no reload needed."
        },
      },
      {
        id: "3-4",
        title: "Understanding Why Things Break",
        body: `Every developer in the world, at every level, writes code that breaks. The difference between a beginner and a professional is not that professionals make fewer mistakes \u2014 it is that <strong>they know how to find and fix mistakes faster</strong>.\n\nThis skill is called <strong>debugging</strong>. It is one of the most important things you will develop in your entire career.\n\nThe browser has a built-in debugging tool called the <strong>Developer Console</strong>. Open it with F12 (or Cmd+Option+I on Mac), then click the Console tab. When your JavaScript has an error, the console shows you exactly what went wrong and on which line.\n\n<strong>Reading error messages is a skill.</strong> A JavaScript error message contains:\n\n<strong>The error type</strong> \u2014 ReferenceError, TypeError, SyntaxError. Each type tells you something different about what went wrong.\n<strong>The message</strong> \u2014 a description in plain English of what the problem is.\n<strong>The file and line number</strong> \u2014 exactly where in your code the problem was detected.\n\n<strong>ReferenceError: x is not defined</strong> \u2014 you tried to use a variable that doesn't exist yet (wrong name, or used before declaration)\n<strong>TypeError: x is not a function</strong> \u2014 you tried to call something as a function but it isn't one\n<strong>SyntaxError: Unexpected token</strong> \u2014 something is wrong with the structure of your code (missing bracket, comma, etc.)\n\nThe code editor below has three intentional bugs. Your job is to find and fix all three. Open the console (F12) as you work \u2014 it will show you errors and guide you to the right line.`,
        callout: {
          type: "warning",
          label: "Reframe This",
          text: "Broken code is not failure. Error messages are the computer telling you exactly what it needs. A developer who can read error messages efficiently is more valuable than one who never makes errors \u2014 the second one doesn't exist."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "When you are stuck and cannot find a bug \u2014 stop. Step away for five minutes. Come back with fresh eyes. The bug is almost always obvious when you return. This is not a beginner thing. This happens to everyone at every level."
        },
        hint: `<strong>The three most common bugs in this code:</strong>\n\n1. A variable is referenced by the wrong name (JavaScript is case-sensitive \u2014 Score and score are different variables)\n2. A comparison operator is wrong \u2014 making a condition always true or always false\n3. A calculation uses the wrong operator\n\n<strong>Debugging process:</strong>\n1. Open the console (F12)\n2. Read the error type and message\n3. Go to the line number it mentions\n4. Fix that specific thing\n5. Save and check if a new error appears\n6. Repeat until no errors remain and the output matches what is expected.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: \'IBM Plex Mono\', monospace; padding: 24px; font-size: 13px; line-height: 1.8; }\n    h2 { color: #c87e9a; margin-top: 0; }\n    .expected { color: #4ade80; padding: 12px; background: #0d2a1a; border-radius: 6px; margin-bottom: 12px; }\n    .actual { color: #f87171; padding: 12px; background: #2a0d0d; border-radius: 6px; }\n    .label { font-size: 10px; letter-spacing: 2px; color: #7d96b4; margin-bottom: 4px; }\n  </style>\n</head>\n<body>\n  <h2>Three Bugs. Find Them All.</h2>\n  <p style="color:#9ca3af;font-size:12px;">Expected output is green. Your current output is below it in red. Fix the code until they match. Open the console (F12) for error details.</p>\n  <div class="expected">\n    <div class="label">EXPECTED OUTPUT</div>\n    Full name: Alice Johnson | Age status: Adult | Total cost: \u00a354.00\n  </div>\n  <div class="actual">\n    <div class="label">YOUR OUTPUT</div>\n    <span id="result">Running...</span>\n  </div>\n  <script>\n    try {\n      // BUG 1: Wrong variable name \u2014 the variable is lastName, not last_name\n      var firstName = \'Alice\';\n      var lastName = \'Johnson\';\n      var fullName = firstName + \' \' + last_name;\n\n      // BUG 2: Wrong comparison operator \u2014 age is 25, should show \'Adult\' not \'Minor\'\n      var age = 25;\n      var status = (age <= 18) ? \'Adult\' : \'Minor\';\n\n      // BUG 3: Wrong operator \u2014 should multiply price by quantity, not add them\n      var price = 18;\n      var quantity = 3;\n      var total = \'\u00a3\' + (price + quantity).toFixed(2);\n\n      document.getElementById(\'result\').textContent =\n        \'Full name: \' + fullName + \' | Age status: \' + status + \' | Total cost: \' + total;\n    } catch(e) {\n      document.getElementById(\'result\').textContent = \'Error: \' + e.message + \' \u2014 check the console (F12) for details.\';\n    }\n  <\/script>\n</body>\n</html>',
          challenges: [
            "Fix Bug 1: the variable name is wrong on the fullName line",
            "Fix Bug 2: the comparison operator is backwards \u2014 age 25 should return \'Adult\'",
            "Fix Bug 3: total should be price multiplied by quantity, not added",
            "Once all three are fixed and output matches expected \u2014 add a fourth variable and display it too"
          ]
        },
        quiz: {
          question: "You see this error in the console: ReferenceError: userName is not defined. What does this most likely mean?",
          options: [
            "The variable userName was never created, or you misspelled its name somewhere",
            "userName is a reserved keyword that cannot be used",
            "The browser does not support modern JavaScript",
            "You need to add userName to your HTML file"
          ],
          correct: 0,
          feedback: "ReferenceError means JavaScript tried to use a variable that it cannot find. Either it was never declared, or it was declared with a different capitalisation (JavaScript is case-sensitive \u2014 userName and username are different variables). Always check both."
        },
      },
      {
        id: "3-5",
        title: "Floor 3 Project \u2014 An Interactive Webpage",
        body: `Your Floor 3 project is your most complex build yet. You're going to combine everything \u2014 HTML structure, CSS style, and JavaScript behaviour \u2014 into one working interactive piece.

<strong>The brief:</strong> Build a quiz. Any topic you like. At least 3 questions. The user clicks their answer, the page tells them right or wrong, and at the end it shows their final score.

A starter template is below. It already has the structure in place \u2014 your job is to fill in your own questions and complete the logic. Read every comment in the code; the comments explain exactly what each part needs to do.`,
        callout: {
          type: "default",
          label: "Why a Quiz",
          text: "A quiz uses conditions (is this answer correct?), functions (check answer, show score), DOM manipulation (change what's on screen), and variables (track the score). It exercises everything from this floor in one real build."
        },
        hint: `Break it into the smallest steps.\n\nStep 1: Change the questions array to topics you know.\nStep 2: Run it and confirm your first question loads.\nStep 3: Set the correctIndex for each question.\nStep 4: Confirm the score increments correctly.\nStep 5: Improve the styles to make it feel like yours.\n\n<strong>Each step is small enough to not be scary.</strong> You never have to build the whole thing \u2014 just the very next piece.`,
        code: {
          lang: "HTML",
          starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; }\n    h1 { color: #c87e9a; }\n    #question { font-size: 20px; margin: 24px 0 16px; line-height: 1.4; }\n    .answer-btn { display: block; width: 100%; text-align: left; background: #0d1117; border: 1px solid #30363d; color: white; padding: 12px 16px; border-radius: 8px; cursor: pointer; margin-bottom: 10px; font-size: 15px; }\n    .answer-btn:hover { border-color: #c87e9a; }\n    .answer-btn.correct { background: #1a3a1a; border-color: #4ade80; color: #4ade80; }\n    .answer-btn.wrong { background: #3a1a1a; border-color: #f87171; color: #f87171; }\n    #feedback { font-size: 16px; margin: 12px 0; min-height: 24px; font-weight: bold; }\n    #score-display { color: #c8a96e; font-size: 14px; margin-bottom: 16px; }\n    #next-btn { background: #c87e9a; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-size: 14px; display: none; margin-top: 8px; }\n    #result { display: none; text-align: center; padding: 32px; }\n    #result h2 { color: #c87e9a; font-size: 28px; }\n  </style>\n</head>\n<body>\n  <h1>Quiz Time</h1>\n  <div id="score-display">Score: 0 / 0</div>\n\n  <div id="quiz-area">\n    <div id="question">Loading...</div>\n    <div id="answers"></div>\n    <div id="feedback"></div>\n    <button id="next-btn" onclick="nextQuestion()">Next question &rarr;</button>\n  </div>\n\n  <div id="result">\n    <h2>Quiz Complete!</h2>\n    <p id="final-score"></p>\n    <button onclick="restartQuiz()" style="background:#c87e9a;color:white;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-size:14px;">Try again</button>\n  </div>\n\n  <script>\n    // YOUR QUESTIONS GO HERE\n    // Each needs: text, an array of 4 options, and correctIndex (0=first option, 1=second, etc.)\n    const questions = [\n      {\n        text: "What does HTML stand for?",\n        options: ["HyperText Markup Language", "High Tech Modern Language", "Hyperlink Text Making Language", "Home Tool Markup Language"],\n        correctIndex: 0\n      },\n      {\n        text: "Which CSS property changes the text colour?",\n        options: ["font-color", "text-color", "color", "foreground"],\n        correctIndex: 2\n      },\n      {\n        text: "What does === check in JavaScript?",\n        options: ["Assign a value", "Strictly equal (same value and type)", "Greater than or equal", "Approximately equal"],\n        correctIndex: 1\n      }\n      // ADD MORE QUESTIONS HERE (remember the comma after each object except the last)\n    ];\n\n    let currentQuestion = 0;\n    let score = 0;\n    let answered = false;\n\n    function loadQuestion() {\n      if (currentQuestion >= questions.length) {\n        showResult();\n        return;\n      }\n      const q = questions[currentQuestion];\n      document.getElementById(\'question\').textContent = q.text;\n      document.getElementById(\'feedback\').textContent = \'\';\n      document.getElementById(\'next-btn\').style.display = \'none\';\n      answered = false;\n      const answersDiv = document.getElementById(\'answers\');\n      answersDiv.innerHTML = \'\';\n      q.options.forEach(function(option, index) {\n        const btn = document.createElement(\'button\');\n        btn.className = \'answer-btn\';\n        btn.textContent = option;\n        btn.onclick = function() { checkAnswer(index); };\n        answersDiv.appendChild(btn);\n      });\n      updateScore();\n    }\n\n    function checkAnswer(selectedIndex) {\n      if (answered) return;\n      answered = true;\n      const q = questions[currentQuestion];\n      const buttons = document.querySelectorAll(\'.answer-btn\');\n      buttons.forEach(function(btn) { btn.onclick = null; });\n      if (selectedIndex === q.correctIndex) {\n        score++;\n        buttons[selectedIndex].classList.add(\'correct\');\n        document.getElementById(\'feedback\').textContent = \'Correct!\';\n        document.getElementById(\'feedback\').style.color = \'#4ade80\';\n      } else {\n        buttons[selectedIndex].classList.add(\'wrong\');\n        buttons[q.correctIndex].classList.add(\'correct\');\n        document.getElementById(\'feedback\').textContent = \'Wrong. Correct answer: \' + q.options[q.correctIndex];\n        document.getElementById(\'feedback\').style.color = \'#f87171\';\n      }\n      updateScore();\n      document.getElementById(\'next-btn\').style.display = \'inline-block\';\n    }\n\n    function nextQuestion() { currentQuestion++; loadQuestion(); }\n\n    function showResult() {\n      document.getElementById(\'quiz-area\').style.display = \'none\';\n      document.getElementById(\'result\').style.display = \'block\';\n      const pct = Math.round((score / questions.length) * 100);\n      document.getElementById(\'final-score\').textContent = \'You scored \' + score + \' out of \' + questions.length + \' (\' + pct + \'%)\';\n    }\n\n    function restartQuiz() {\n      currentQuestion = 0; score = 0; answered = false;\n      document.getElementById(\'quiz-area\').style.display = \'block\';\n      document.getElementById(\'result\').style.display = \'none\';\n      loadQuestion();\n    }\n\n    function updateScore() {\n      document.getElementById(\'score-display\').textContent = \'Score: \' + score + \' / \' + questions.length;\n    }\n\n    loadQuestion();\n  <\/script>\n</body>\n</html>',
          challenges: [
            "Replace all 3 questions with questions about a topic YOU know well",
            "Add 2 more questions (making 5 total) — remember the comma after each object except the last",
            "Show a percentage score at the end in addition to the raw score",
            "Add a progress indicator showing Question X of Y at the top"
          ]
        },
        quiz: {
          question: "In the quiz starter code, what does correctIndex: 0 mean?",
          options: [
            "The first question in the quiz is correct",
            "The user must score 0 points to pass",
            "The first item in the options array (index 0) is the correct answer",
            "Zero points are given for this question"
          ],
          correct: 2,
          feedback: "Arrays in JavaScript start at index 0. So correctIndex: 0 means the first option is correct, correctIndex: 1 means the second, and so on. When the user clicks an answer, selectedIndex is compared to correctIndex to decide if they got it right."
        },
      }
    ]
  },
  {
    id: 4,
    title: "Building Alone",
    subtitle: "Where the doer starts to emerge",
    color: "#9a7ec8",
    duration: "10-12 weeks",
    sessions: "5 per week",
    length: "60-90 min",
    tag: "Floor 04 \u2014 Independence",
    sections: [
      { id: "4-1", title: "Receiving a Brief", body: `From this floor onward, things change. I give you a brief — a description of what to build — and you figure out how to build it without being walked through every step.\n\nThis is how real development works. A client, a manager, or your own idea gives you a target. You use what you know, research what you don\'t, and produce something that works.\n\n<strong>The pattern is always the same:</strong> understand the brief, plan before you code, build, test, review.\n\nThe starter below gives you the HTML structure and styling for the tip calculator brief. Your job is to write the JavaScript logic that makes it work.`, callout: { type: "default", label: "Brief 01", text: "Build a tip calculator. The user enters a bill amount and selects a tip percentage (10%, 15%, 20%). The page calculates and displays the tip amount and the total bill." }, callout2: { type: "focus", label: "Plan First", text: "Before touching the code editor, write out in plain English what the calculator needs to do. Then identify: which elements you need to read from, what calculation to perform, which element shows the result. Plan first. Code second. This habit never stops being useful." }, hint: `Three questions before touching code:\n\n1. What does the user input? (the bill amount — read it with document.getElementById(\'bill\').value)\n2. What does the page calculate? (tip = billAmount * tipPercent / 100)\n3. What does the page display? (tip amount and the total = bill + tip)\n\n<strong>Still stuck?</strong> Start even smaller — just get the number out of the input with console.log(). Then multiply it. One tiny step at a time.`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 32px; max-width: 420px; margin: 0 auto; }\n    h2 { color: #9a7ec8; margin-top: 0; }\n    label { display: block; margin: 16px 0 6px; font-size: 13px; color: #a0b0c0; }\n    input[type=number] { background: #0d1117; border: 1px solid #30363d; color: white; padding: 10px 14px; border-radius: 6px; font-size: 16px; width: 100%; box-sizing: border-box; }\n    .tip-btns { display: flex; gap: 10px; margin: 6px 0; }\n    .tip-btn { flex: 1; padding: 10px; background: #0d1117; border: 1px solid #30363d; color: white; border-radius: 6px; cursor: pointer; font-size: 15px; }\n    .tip-btn.active { border-color: #9a7ec8; background: rgba(154,126,200,0.12); color: #9a7ec8; }\n    .result-box { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin-top: 20px; }\n    .result-row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 15px; }\n    .result-row.total { font-weight: bold; color: #9a7ec8; font-size: 18px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #30363d; }\n    #calc-btn { width: 100%; margin-top: 16px; padding: 12px; background: #9a7ec8; border: none; color: white; border-radius: 6px; font-size: 15px; cursor: pointer; }\n    #calc-btn:hover { background: #b09ada; }\n  </style>\n</head>\n<body>\n  <h2>Tip Calculator</h2>\n\n  <label>Bill amount (£)</label>\n  <input type="number" id="bill" placeholder="0.00" min="0" step="0.01" />\n\n  <label>Tip percentage</label>\n  <div class="tip-btns">\n    <button class="tip-btn" onclick="selectTip(10, this)">10%</button>\n    <button class="tip-btn" onclick="selectTip(15, this)">15%</button>\n    <button class="tip-btn" onclick="selectTip(20, this)">20%</button>\n  </div>\n\n  <button id="calc-btn" onclick="calculate()">Calculate</button>\n\n  <div class="result-box">\n    <div class="result-row"><span>Bill</span><span id="res-bill">£0.00</span></div>\n    <div class="result-row"><span>Tip</span><span id="res-tip">£0.00</span></div>\n    <div class="result-row total"><span>Total</span><span id="res-total">£0.00</span></div>\n  </div>\n\n  <script>\n    let selectedTip = 0;\n\n    function selectTip(pct, btn) {\n      selectedTip = pct;\n      // Remove active class from all buttons, add to clicked one\n      document.querySelectorAll(\'.tip-btn\').forEach(function(b) { b.classList.remove(\'active\'); });\n      btn.classList.add(\'active\');\n    }\n\n    function calculate() {\n      // TODO: Get the bill amount from the input (use parseFloat, not Number, for decimal currency)\n      const bill = 0; // replace 0 with the real value\n\n      // TODO: Calculate the tip\n      const tip = 0; // replace 0 with the formula\n\n      // TODO: Calculate the total\n      const total = 0; // replace 0 with the formula\n\n      // TODO: Display the results (format to 2 decimal places with .toFixed(2))\n      document.getElementById(\'res-bill\').textContent = \'£\' + bill.toFixed(2);\n      document.getElementById(\'res-tip\').textContent = \'£\' + tip.toFixed(2);\n      document.getElementById(\'res-total\').textContent = \'£\' + total.toFixed(2);\n    }\n  <\/script>\n</body>\n</html>', challenges: ["Complete the calculate() function — replace the 0s with the real formulas", "Add validation: if no tip percentage is selected, show an alert telling the user to select one first", "Add a split bill feature: a fourth input that divides the total by the number of people", "Add a custom tip percentage input field as a fourth option alongside 10%, 15%, 20%"] }, quiz: { question: "In the tip calculator, what does parseFloat(document.getElementById('bill').value) do?", options: ["Creates a new input field on the page", "Gets the text from the bill input and converts it to a decimal number", "Sets the value of the bill input to 0.0", "Checks if the bill input exists on the page"], correct: 1, feedback: "document.getElementById('bill') finds the input element. .value gets whatever the user typed as a string. parseFloat() converts that string to a floating-point number so you can do maths with it. Without parseFloat, '50' + 10 would give '5010' (string concatenation) instead of 60." }, checklist: ["I read the brief carefully", "I planned the build before starting", "I built the tip calculator", "It works correctly with different inputs"] },
      { id: "4-2", title: "How Developers Actually Think", body: `Professional developers don't memorise everything. They can't \u2014 there's too much. What they have instead is a <strong>process</strong>.\n\nWhen they face a new problem: they break it down into smaller pieces. They solve the smallest piece first. Then the next. They use documentation and search engines without shame. They test constantly. And they know that the first version doesn't have to be perfect \u2014 it just has to work.\n\nThis floor is about building that process in you.`, callout: { type: "default", label: "The Developer Mindset", text: "A professional developer Googles things every single day. Knowing how to find answers quickly and evaluate them correctly is itself a core skill. You are learning to think like a developer, not to become a dictionary." }, hint: `If you feel like you should already know the answer without looking it up \u2014 let that feeling go. It isn't how this works.\n\nThe skill isn't memorising. The skill is knowing <strong>how to find the answer quickly and recognise a good one</strong>. That takes time to build and it builds through practice, not through reading.\n\n<strong>Practical tip:</strong> When you search for something, after you've solved it, close the tab and try to write the solution again from memory. That repetition is what moves it from "I found it" to "I know it."`, checklist: ["I understand that looking things up is normal", "I can break a problem into smaller steps", "I test my code as I build, not just at the end"] },
      { id: "4-3", title: "Introduction to Storing Data", body: `So far, everything your code does disappears when the page refreshes. Real applications need to <strong>remember things</strong>.\n\nThis section introduces two ideas: <strong>localStorage</strong> (the browser can store small amounts of data that survives page closes and reopens) and the concept of <strong>databases</strong> (covered in Floor 5).\n\nlocalStorage is a key-value store: you save data under a name, and retrieve it by that name later. The critical thing to know: localStorage only stores strings. If you want to save a list or an object, convert it to a string with <code>JSON.stringify()</code> and convert it back with <code>JSON.parse()</code>.\n\nThe demo below builds a persistent note-saver. Type a note, save it, refresh the page — it\'s still there. That\'s localStorage.`, callout: { type: "default", label: "Why This Matters", text: "The moment your code can remember things is the moment it starts feeling like a real product rather than a demo. localStorage is the first step toward real data persistence." }, hint: `localStorage works like a notepad the browser keeps permanently.\n\nlocalStorage.setItem(\'key\', \'value\') — save something\nlocalStorage.getItem(\'key\') — read it back\nlocalStorage.removeItem(\'key\') — delete it\n\n<strong>Saving a list:</strong> localStorage.setItem(\'notes\', JSON.stringify(myArray))\n<strong>Reading it back:</strong> const myArray = JSON.parse(localStorage.getItem(\'notes\')) || [];\n\nThe || [] means "if there\'s nothing saved yet, use an empty array instead of null."`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; max-width: 500px; margin: 0 auto; }\n    h2 { color: #9a7ec8; margin-top: 0; }\n    textarea { width: 100%; background: #0d1117; border: 1px solid #30363d; color: white; padding: 12px; border-radius: 6px; font-size: 14px; resize: vertical; min-height: 80px; box-sizing: border-box; font-family: sans-serif; }\n    .btn { background: #9a7ec8; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 8px 4px 0 0; font-size: 13px; }\n    .btn.danger { background: rgba(248,113,113,0.15); border: 1px solid rgba(248,113,113,0.3); color: #f87171; }\n    #notes-list { margin-top: 24px; }\n    .note-item { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }\n    .note-text { flex: 1; font-size: 14px; line-height: 1.5; white-space: pre-wrap; }\n    .note-delete { background: none; border: none; color: #f87171; cursor: pointer; font-size: 18px; padding: 0; line-height: 1; }\n    #empty-msg { color: #4a5568; font-size: 14px; text-align: center; padding: 32px; }\n  </style>\n</head>\n<body>\n  <h2>Persistent Notes</h2>\n  <textarea id="note-input" placeholder="Type a note..."></textarea>\n  <br>\n  <button class="btn" onclick="saveNote()">Save note</button>\n  <button class="btn danger" onclick="clearAll()">Clear all</button>\n\n  <div id="notes-list"></div>\n\n  <script>\n    // Load existing notes from localStorage on startup\n    // JSON.parse converts the saved string back to a JavaScript array\n    // The || [] means "if nothing is saved yet, start with an empty array"\n    let notes = JSON.parse(localStorage.getItem(\'notes\')) || [];\n\n    function saveNote() {\n      const input = document.getElementById(\'note-input\');\n      const text = input.value.trim();\n\n      if (!text) return; // Do nothing if the input is empty\n\n      // Add the new note to our array\n      notes.push(text);\n\n      // Save the updated array to localStorage\n      // JSON.stringify converts the array to a string for storage\n      localStorage.setItem(\'notes\', JSON.stringify(notes));\n\n      input.value = \'\'; // Clear the textarea\n      renderNotes(); // Update the display\n    }\n\n    function deleteNote(index) {\n      // Remove one item at position index\n      notes.splice(index, 1);\n      localStorage.setItem(\'notes\', JSON.stringify(notes));\n      renderNotes();\n    }\n\n    function clearAll() {\n      notes = [];\n      localStorage.removeItem(\'notes\');\n      renderNotes();\n    }\n\n    function renderNotes() {\n      const list = document.getElementById(\'notes-list\');\n\n      if (notes.length === 0) {\n        list.innerHTML = \'<div id="empty-msg">No notes yet. Type one above.</div>\';\n        return;\n      }\n\n      list.innerHTML = \'\'; // Clear the list before re-rendering\n\n      // Loop through every note and create an element for it\n      notes.forEach(function(note, index) {\n        const div = document.createElement(\'div\');\n        div.className = \'note-item\';\n        div.innerHTML =\n          \'<span class="note-text">\' + note + \'</span>\' +\n          \'<button class="note-delete" onclick="deleteNote(\' + index + \')">✕</button>\';\n        list.appendChild(div);\n      });\n    }\n\n    // Render any notes that were saved in a previous session\n    renderNotes();\n  <\/script>\n</body>\n</html>', challenges: ["Add a timestamp to each note showing when it was saved (use new Date().toLocaleTimeString())", "Add the ability to edit a note after saving it", "Add a character limit of 200 — show a counter updating as the user types", "Save the notes with a title as well as body text (you'll need to change notes from an array of strings to an array of objects)"] }, quiz: { question: "Why do we use JSON.stringify() before saving an array to localStorage?", options: ["Because localStorage only accepts JSON format files", "Because localStorage only stores strings, and JSON.stringify converts an array to a string", "Because arrays cannot be used in JavaScript without converting them first", "Because JSON.stringify compresses the data to make it smaller"], correct: 1, feedback: "localStorage is a key-value store that only accepts string values. An array like ['note one', 'note two'] is not a string — it's a JavaScript object. JSON.stringify converts it to the string '[\"note one\",\"note two\"]' for storage. JSON.parse then converts it back to an array when you need it." }, checklist: ["I understand what localStorage does", "I built something that saves data between page refreshes", "I understand that databases do the same thing at a much larger scale"] },
      { id: "4-4", title: "Code Review \u2014 Looking at What You Built", body: `A code review is when you look back at your own code with fresh eyes \u2014 or when someone else does \u2014 and asks: is this the best way to do it?\n\nAs you review your previous projects, ask yourself:\n\n<strong>Is it readable?</strong> Could someone else understand what this code does?\n<strong>Is it repetitive?</strong> Am I writing the same thing multiple times when a function could handle it?\n<strong>Does it handle mistakes?</strong> What happens if the user enters something unexpected?`, callout: { type: "focus", label: "The Logical Thinker's Favourite Section", text: "Code review is where your logical mind shines. You're not just making things work \u2014 you're asking why it works and whether it could work better. That habit separates good developers from great ones." }, hint: `When reviewing your own code, read it as if you've never seen it before. Better still \u2014 leave it for a day, then come back.\n\n<strong>Three quick questions for any piece of code:</strong>\n1. If I read this variable name alone, do I know what it holds?\n2. Could I explain what this function does in one sentence?\n3. What happens if the user does something I didn't expect?\n\nIf any answer is "I'm not sure" \u2014 that's what needs fixing. Not because it's broken, but because unclear code causes problems later.`, checklist: ["I reviewed my Floor 3 project with fresh eyes", "I found at least one thing I could improve", "I improved it"] },
      { id: "4-5", title: "Floor 4 Project \u2014 Something You Designed", body: `No brief this time. Just a constraint.\n\n<strong>Build something that solves a problem you actually have.</strong>\n\nIt can be small. A habit tracker. A simple budget tool. A random meal picker. A reading list. Anything that would genuinely be useful to you.\n\nIt must use HTML, CSS, and JavaScript. It must store at least one piece of data. And it must be something you'd actually use.`, callout: { type: "warning", label: "The Fear of the Blank Page", text: "This is where the cautious learner hesitates. You might feel like your idea isn't good enough or too simple. <strong>Build it anyway.</strong> The idea doesn't matter as much as the act of designing and building something from nothing." }, hint: `If you truly cannot think of an idea, use one of these:\n\u2014 A mood tracker that saves today's mood with a date\n\u2014 A simple counter that remembers its number after refresh\n\u2014 A personal quote collection where you save your favourite quotes\n\u2014 A daily water intake tracker\n\nNone of these are impressive. All of them are real. The point isn't the idea \u2014 it's the experience of making every decision yourself, from the first line to the last.`, checklist: ["I identified a real problem to solve", "I planned the build before starting", "I built it", "It uses localStorage", "I would actually use it", "I'm ready for Floor 5"] }
    ]
  },
  {
    id: 5,
    title: "Solving Real Problems",
    subtitle: "Backend, databases, APIs \u2014 the full picture",
    color: "#7ec8a9",
    duration: "4-5 months",
    sessions: "5 per week",
    length: "60-90 min",
    tag: "Floor 05 \u2014 Full Stack",
    sections: [
      { id: "5-1", title: "What is the Backend?", body: `Everything you've built so far lives in the <strong>frontend</strong> \u2014 the part the user sees and interacts with in the browser. But most real applications have a second layer: the <strong>backend</strong>.\n\nThe backend is a computer (a server) that runs code the user never directly sees. It handles things that can't be done safely in the browser: storing sensitive data, processing payments, managing user accounts, running complex logic.\n\nIf the frontend is the shop floor, the backend is the warehouse and the office. The customer sees the shop floor. Everything that makes it function is behind the scenes.`, callout: { type: "default", label: "The Stack", text: "When you can build both the frontend and the backend, you are a Full Stack developer. That's what Floor 7 looks like. Floor 5 is where the second half begins." }, hint: `Think of a bank. The website you log into is the frontend \u2014 buttons, forms, your balance on screen. But the actual money, the security checks, the transaction history \u2014 none of that lives in your browser. It all lives on the bank's servers. That's the backend.\n\n<strong>Why can't we just do everything in the browser?</strong> Because the browser is public. Anyone can open developer tools and see your JavaScript. You would never put a password or payment logic somewhere anyone can read. The backend is where the sensitive work happens safely.`, checklist: ["I understand the difference between frontend and backend", "I understand why a backend is necessary", "I understand what a server does"] },
      { id: "5-2", title: "Databases \u2014 Storing Real Information", body: `A database is an organised system for storing and retrieving information. Think of it like an enormous, structured spreadsheet that code can read from and write to instantly.\n\nThe most common type of database is a <strong>relational database</strong> \u2014 it stores data in tables with rows and columns, and tables can relate to each other. The language used to talk to these databases is called <strong>SQL</strong>.\n\nSQL lets you: create tables, add data, retrieve data, update data, and delete data. Four operations. Everything a database ever does is a variation of one of those four.`, callout: { type: "default", label: "Your First SQL", text: "SELECT * FROM users WHERE name = 'You';\n\nThis reads as: 'Get everything from the users table where the name column equals You.' Plain English that has become code. That's SQL." }, hint: `The four database operations have a nickname: <strong>CRUD</strong>.\nCreate \u2014 add new data\nRead \u2014 get existing data\nUpdate \u2014 change existing data\nDelete \u2014 remove data\n\nEvery app you've ever used is CRUD at its core. Instagram: Create a post. Read your feed. Update your bio. Delete a comment. That's it.\n\n<strong>SQL still looks strange?</strong> Read it out loud as a sentence. SELECT name FROM users WHERE age > 18 \u2014 "Give me the name column, from the users table, where the age is over 18." It reads like a question asked to the database.`, checklist: ["I understand what a database is", "I understand the four basic database operations", "I can read basic SQL"] },
      { id: "5-3", title: "APIs — Making Systems Talk to Each Other", body: `An API (Application Programming Interface) is how different pieces of software talk to each other. When you check the weather on your phone, your app doesn\'t have its own satellite — it sends a request to a weather API and gets data back.\n\nAPIs are everywhere. Login with Google? API. Map embedded in a website? API. Payment on a checkout page? API. As a developer, you\'ll both <strong>use</strong> other people\'s APIs and eventually <strong>build</strong> your own.\n\n<strong>How an API call works:</strong>\n1. Your code sends an HTTP <strong>request</strong> to a URL (called an endpoint)\n2. The server processes the request\n3. The server sends back a <strong>response</strong> — usually data in JSON format\n4. Your code reads the JSON and uses it\n\nIn JavaScript, the modern way to make API calls is the <code>fetch()</code> function. It\'s asynchronous — meaning the code continues running while it waits for the response, then does something when the data arrives.\n\nThe demo below simulates an API call. It shows the exact pattern you\'ll use when connecting to real APIs.`, callout: { type: "focus", label: "The Exciting Part", text: "APIs are what let you build powerful things quickly. Instead of building a mapping system from scratch, you use Google\'s. Instead of payment infrastructure, you use Stripe\'s. You focus on the unique part of your idea — the API handles the rest." }, hint: `The fetch pattern every API call follows:\n\nfetch(\'https://api.example.com/data\')\n  .then(response => response.json())\n  .then(data => { /* use data here */ })\n  .catch(error => { /* handle errors */ });\n\nfetch returns a Promise — something that will complete in the future. The .then() chains run when the data arrives. The .catch() runs if anything goes wrong.\n\n<strong>Real first step:</strong> After this section, go to openweathermap.org, get a free API key (takes 2 minutes), and make a real weather call. Seeing real data appear from a URL you made is one of the best moments in learning to code.`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; max-width: 560px; margin: 0 auto; }\n    h2 { color: #7ec8a9; margin-top: 0; }\n    .btn { background: #7ec8a9; color: #0a0a0a; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 4px 4px 0 0; font-size: 13px; font-weight: bold; }\n    .btn:hover { background: #9ed8b9; }\n    #status { color: #c8a96e; font-size: 13px; margin: 12px 0 6px; min-height: 20px; }\n    #result { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px; margin-top: 8px; font-family: monospace; font-size: 13px; white-space: pre-wrap; min-height: 60px; color: #7ec8a9; }\n    .user-card { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px; margin-top: 10px; }\n    .user-card strong { color: #7ec8a9; }\n  </style>\n</head>\n<body>\n  <h2>API Fetch Demo</h2>\n  <p style="color:#8892a0;font-size:14px;">This demo calls a real public API — JSONPlaceholder, which returns fake user data for practice.</p>\n\n  <button class="btn" onclick="fetchUser()">Fetch random user</button>\n  <button class="btn" onclick="fetchPosts()">Fetch recent posts</button>\n\n  <div id="status"></div>\n  <div id="result">Click a button to make an API call.</div>\n\n  <script>\n    function setStatus(msg) {\n      document.getElementById(\'status\').textContent = msg;\n    }\n\n    function fetchUser() {\n      setStatus(\'Sending request...\');\n      document.getElementById(\'result\').textContent = \'\';\n\n      // Pick a random user ID between 1 and 10\n      const userId = Math.floor(Math.random() * 10) + 1;\n\n      // fetch() sends an HTTP GET request to the URL\n      fetch(\'https://jsonplaceholder.typicode.com/users/\' + userId)\n        .then(function(response) {\n          // response.json() reads the body and parses it as JSON\n          return response.json();\n        })\n        .then(function(user) {\n          // \'user\' is now a plain JavaScript object\n          setStatus(\'Response received:\');\n          document.getElementById(\'result\').textContent =\n            \'Name: \' + user.name + \'\\n\' +\n            \'Email: \' + user.email + \'\\n\' +\n            \'Company: \' + user.company.name + \'\\n\' +\n            \'City: \' + user.address.city;\n        })\n        .catch(function(error) {\n          // .catch() handles network errors or bad responses\n          setStatus(\'Error: \' + error.message);\n        });\n    }\n\n    function fetchPosts() {\n      setStatus(\'Sending request...\');\n      document.getElementById(\'result\').textContent = \'\';\n\n      // You can pass query parameters in the URL\n      fetch(\'https://jsonplaceholder.typicode.com/posts?_limit=3\')\n        .then(response => response.json())\n        .then(function(posts) {\n          setStatus(\'3 posts received:\');\n          let output = \'\';\n          posts.forEach(function(post, i) {\n            output += (i + 1) + \'. \' + post.title + \'\\n\';\n          });\n          document.getElementById(\'result\').textContent = output;\n        })\n        .catch(error => setStatus(\'Error: \' + error.message));\n    }\n  <\/script>\n</body>\n</html>', challenges: ["Modify fetchUser() to display all the fields in the user object (log the full object first with console.log(user) to see what's available)", "Add a third button that fetches a specific post by ID — let the user type the ID in an input", "Add a loading spinner or 'Loading...' message that shows while the request is in flight", "Handle the case where the API returns an error response (check response.ok before calling response.json())"] }, quiz: { question: "What does the .then(response => response.json()) part of a fetch call do?", options: ["Sends the data to a JSON file on the server", "Waits for the HTTP response to arrive, then parses its body as JSON data", "Converts JavaScript objects to JSON format for sending", "Checks whether the response contains valid JSON before fetching"], correct: 1, feedback: "fetch() is asynchronous — it immediately returns a Promise that resolves when the server responds. The first .then() receives the raw Response object. Calling .json() on it reads the response body and parses it into a JavaScript object. The second .then() receives that parsed object, which you can use directly in your code." }, checklist: ["I understand what an API is", "I made a request to a real API and displayed the data", "I understand the concept of API keys and why they exist"] },
      { id: "5-4", title: "Version Control \u2014 How Professionals Manage Work", body: `Every professional developer uses version control. The most common tool is called <strong>Git</strong>.\n\nGit keeps a complete history of every change you've ever made to your code. It lets you go back to any previous version. It lets multiple people work on the same codebase without overwriting each other. And it lets you experiment safely \u2014 try something, see if it works, and undo it if it doesn't.\n\n<strong>GitHub</strong> is a website where you store your Git projects online. It's also where employers look when they want to see your work.`, callout: { type: "warning", label: "Start Using Git Now", text: "Don't wait until you feel ready. Start putting all your projects from this point forward into Git repositories. Your GitHub profile becomes your portfolio. Every commit is evidence of your growth." }, hint: `The three Git commands you'll use 90% of the time:\n\ngit add . \u2014 "package up all my changes"\ngit commit -m "what I did" \u2014 "save a snapshot with a label"\ngit push \u2014 "send it up to GitHub"\n\nThat's it to start. Everything else \u2014 branches, merging, pull requests \u2014 comes naturally once those three are muscle memory.\n\n<strong>Common first mistake:</strong> Writing vague commit messages like "fixed stuff." Write what you actually did \u2014 "added tip calculation function" or "fixed button colour on mobile." Future you will thank present you.`, checklist: ["I installed Git", "I created a GitHub account", "I pushed at least one project to GitHub", "I understand the basic Git workflow: add, commit, push"] },
      { id: "5-5", title: "Deploying \u2014 Putting Work Live on the Internet", body: `Everything you've built so far only exists on your computer. Deployment is the process of putting your work on a server so anyone in the world can access it through a URL.\n\nFor frontend projects, <strong>Netlify</strong> and <strong>Vercel</strong> let you deploy for free in minutes. For full stack projects with a backend, platforms like <strong>Railway</strong> or <strong>Render</strong> handle the server side.\n\nThe moment you deploy your first project, you cross a line. You're no longer a student with files on a hard drive. You're a developer with work on the internet.`, callout: { type: "default", label: "Floor 5 Project", text: "Build a full stack application. It should have a frontend the user interacts with, a backend that handles data, and a database that stores it. A simple one: a note-taking app where users can create, read, update and delete notes. Deploy it. Share the link." }, hint: `Netlify is the easiest starting point for frontend deployment.\n\n1. Push your project to GitHub\n2. Go to netlify.com and sign up\n3. Click "Add new site" \u2192 "Import from Git"\n4. Connect your GitHub and select your repo\n5. Click deploy\n\nThat's genuinely it. Your project gets a live URL in under two minutes.\n\n<strong>Something broke after deploying?</strong> Check the deploy log in Netlify \u2014 it shows exactly what went wrong. Usually it's a file path that works on your computer but not on the server, or a missing dependency.`, checklist: ["I built a full stack application", "It has a real backend", "It uses a database", "It is deployed and accessible via a URL", "I'm ready for Floor 6"] }
    ]
  },
  {
    id: 6,
    title: "Specialisation",
    subtitle: "Finding your lane and going deep",
    color: "#c8967e",
    duration: "3-4 months",
    sessions: "5 per week",
    length: "60-90 min",
    tag: "Floor 06 \u2014 Your Direction",
    sections: [
      { id: "6-1", title: "Identifying Your Lane", body: `By now you have built enough to know what excites you. That feeling when you're working on something and time disappears \u2014 that's your signal.\n\nThe main lanes are:\n\n<strong>Frontend focused</strong> \u2014 You love building beautiful, interactive user interfaces. React is your next major skill.\n<strong>Backend focused</strong> \u2014 You love the logic, the architecture, the systems. Node.js, Python, databases.\n<strong>Full Stack product builder</strong> \u2014 You want to build complete products alone. Both sides, end to end.\n<strong>Data and AI</strong> \u2014 You're drawn to working with information, finding patterns, building intelligent systems. Python is your language.`, callout: { type: "focus", label: "No Wrong Answer", text: "Every lane leads to professional grade work. The best developers aren't the ones who know the most \u2014 they're the ones who went deepest in the direction that excited them most." }, hint: `Can't decide? Ask yourself these:\n\n\u2014 When you finished a project, what part did you most enjoy building \u2014 how it looked, or how it worked?\n\u2014 Do you find yourself thinking more about the user experience or about the logic underneath?\n\u2014 When you imagine your ideal job, are you designing interfaces or engineering systems?\n\nIf you genuinely enjoy both equally, Full Stack is your lane. If one made you lose track of time and the other felt like a chore \u2014 that's your answer.`, checklist: ["I know which direction pulls me most", "I've chosen my lane for this floor"] },
      { id: "6-2", title: "Going Deep in Your Chosen Direction", body: `This is where the curriculum diverges. Based on the lane you identified in section 6-1, the technology you focus on is different — but the approach is the same regardless.\n\n<strong>Frontend (React):</strong> React is the dominant UI library. Everything is a component — a reusable piece of UI that manages its own data (state) and renders based on that data. Below is an interactive React-style component built in vanilla JS so you can understand the mental model before installing anything.\n\n<strong>Backend (Node.js):</strong> Node runs JavaScript on a server. You build APIs that the frontend calls. Your first step is: install Node, run node app.js, see "Server running" in the terminal.\n\n<strong>Full Stack:</strong> You\'re doing both. Start with the React fundamentals, then build a backend API it can talk to. Your first full stack app will be a notes app with a real database.\n\n<strong>Data and AI (Python):</strong> Python dominates data science. Your first steps: install Python, install pandas with pip, load a CSV file and analyse it. Then move to machine learning with scikit-learn.\n\nWhatever your lane — the pattern is always the same: learn the concept, build a tiny thing with it immediately, then build something bigger. The demo below shows the React component mental model in a way that runs right now, no setup needed.`, callout: { type: "default", label: "The Technology Ladder", text: "Frontend: HTML/CSS/JS → React → Next.js\nBackend: Node.js → Express → databases → auth\nFull Stack: both ladders in parallel\nData/AI: Python → pandas → scikit-learn → PyTorch\n\nYou don\'t need to see the top of the ladder. You just need to take the next step." }, callout2: { type: "focus", label: "ADHD Note", text: "New technology feels overwhelming because everything is unfamiliar at once. That\'s normal. It\'s not a sign you\'ve chosen the wrong lane. Give yourself two weeks before judging whether something clicks. The first week is always the hardest." }, hint: `The biggest mistake at this stage: tutorial-hopping. You watch half of one React tutorial, then switch to a different one, then switch again.\n\n<strong>Instead:</strong> Pick one source, go through it completely, then build something small of your own before consuming any more content. The project you build yourself — even badly — teaches you ten times more than the tutorial.\n\n<strong>When you get stuck:</strong> That\'s not a signal to find a different tutorial. It\'s a signal to go to the official documentation and search for exactly the thing you\'re stuck on.`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; }\n    h2 { color: #c8967e; margin-top: 0; }\n    p { color: #8892a0; font-size: 14px; line-height: 1.6; }\n    .component { background: #0d1117; border: 1px solid #30363d; border-radius: 10px; padding: 20px; margin: 16px 0; }\n    .component h3 { color: #c8967e; margin: 0 0 12px; font-size: 16px; }\n    .count-display { font-size: 48px; text-align: center; color: #7ec8a9; margin: 10px 0; }\n    .btn { background: #c8967e; color: white; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; margin: 4px; font-size: 13px; }\n    .btn.secondary { background: rgba(200,150,126,0.15); border: 1px solid rgba(200,150,126,0.3); color: #c8967e; }\n    .todo-input { background: #111827; border: 1px solid #30363d; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; width: 60%; }\n    .todo-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 14px; }\n    .todo-item.done { text-decoration: line-through; opacity: 0.45; }\n    .todo-del { background: none; border: none; color: #f87171; cursor: pointer; font-size: 16px; }\n  </style>\n</head>\n<body>\n  <h2>React Component Mental Model</h2>\n  <p>In React, UIs are built from <strong>components</strong> — functions that hold state (data) and return HTML based on that data. When state changes, the component re-renders automatically. This demo shows that pattern in pure JavaScript so you can understand it before installing React.</p>\n\n  <!-- COMPONENT 1: Counter -->\n  <div class="component">\n    <h3>Counter Component</h3>\n    <p style="font-size:13px;color:#8892a0;">State: one number. When state changes, the display re-renders.</p>\n    <div class="count-display" id="count-display">0</div>\n    <div style="text-align:center">\n      <button class="btn" onclick="counterDispatch(\'decrement\')">− 1</button>\n      <button class="btn secondary" onclick="counterDispatch(\'reset\')">Reset</button>\n      <button class="btn" onclick="counterDispatch(\'increment\')">+ 1</button>\n    </div>\n  </div>\n\n  <!-- COMPONENT 2: Todo list -->\n  <div class="component">\n    <h3>Todo List Component</h3>\n    <p style="font-size:13px;color:#8892a0;">State: an array of items. Every change re-renders the list.</p>\n    <div style="display:flex;gap:8px;margin-bottom:12px">\n      <input class="todo-input" id="todo-input" placeholder="Add a task..." onkeydown="if(event.key===\'Enter\')addTodo()" />\n      <button class="btn" onclick="addTodo()">Add</button>\n    </div>\n    <div id="todo-list"></div>\n  </div>\n\n  <script>\n    // ===== COUNTER COMPONENT =====\n    // State: a single number\n    let count = 0;\n\n    // Reducer: a function that takes current state and an action, returns new state\n    // This is exactly how React\'s useReducer works\n    function counterReducer(state, action) {\n      if (action === \'increment\') return state + 1;\n      if (action === \'decrement\') return state - 1;\n      if (action === \'reset\') return 0;\n      return state;\n    }\n\n    function counterDispatch(action) {\n      count = counterReducer(count, action);\n      renderCounter(); // Re-render after state change\n    }\n\n    function renderCounter() {\n      document.getElementById(\'count-display\').textContent = count;\n    }\n\n    // ===== TODO COMPONENT =====\n    // State: an array of todo objects\n    let todos = [];\n\n    function addTodo() {\n      const input = document.getElementById(\'todo-input\');\n      const text = input.value.trim();\n      if (!text) return;\n      // Create new state — never mutate the existing array, create a new one\n      todos = [...todos, { id: Date.now(), text: text, done: false }];\n      input.value = \'\';\n      renderTodos();\n    }\n\n    function toggleTodo(id) {\n      // Map creates a new array — React requires immutable state updates\n      todos = todos.map(function(t) {\n        return t.id === id ? { ...t, done: !t.done } : t;\n      });\n      renderTodos();\n    }\n\n    function deleteTodo(id) {\n      todos = todos.filter(function(t) { return t.id !== id; });\n      renderTodos();\n    }\n\n    function renderTodos() {\n      const list = document.getElementById(\'todo-list\');\n      if (todos.length === 0) {\n        list.innerHTML = \'<div style="color:#4a5568;font-size:13px;padding:8px 0;">No tasks yet.</div>\';\n        return;\n      }\n      list.innerHTML = todos.map(function(t) {\n        return \'<div class="todo-item\' + (t.done ? \' done\' : \'\') + \'" onclick="toggleTodo(\' + t.id + \')">\'  +\n          \'<span style="flex:1">\' + t.text + \'</span>\' +\n          \'<button class="todo-del" onclick="event.stopPropagation();deleteTodo(\' + t.id + \')">✕</button>\' +\n          \'</div>\';\n      }).join(\'\');\n    }\n\n    renderTodos();\n  <\/script>\n</body>\n</html>', challenges: ["Add a 'step size' input to the counter — instead of always adding 1, add whatever number is in the input", "Add a filter to the todo list: three buttons (All / Active / Done) that show only the matching tasks", "Add localStorage persistence to the todo list so tasks survive a page refresh", "Add a \'clear completed\' button that removes all tasks marked as done in one click"] }, quiz: { question: "In the component mental model shown in the demo, what happens every time state changes?", options: ["The page reloads to show the new state", "The render function runs again to update only the affected part of the UI", "A new copy of the component is created and added to the page", "State changes are saved to the server before the UI updates"], correct: 1, feedback: "This is the core idea behind React and all modern UI frameworks: state drives the UI. When state changes, the render function runs again and updates the DOM to match. In React this happens automatically and efficiently — it only updates the parts that actually changed. Understanding this pattern is the conceptual foundation for all of React." }, checklist: ["I\'ve started learning the core technology for my lane", "I\'ve built my first thing with it", "I\'m working toward my Floor 6 project"] },
      { id: "6-3", title: "Building More Complex Products", body: `The projects in this floor are bigger. They take longer. They'll hit walls you don't know how to get past yet.\n\nWhen that happens \u2014 and it will \u2014 the process is:\n\n<strong>1.</strong> Define exactly what you're stuck on. Not "it doesn't work" but "this specific function isn't returning what I expect."\n<strong>2.</strong> Search for that specific thing.\n<strong>3.</strong> Try the solution.\n<strong>4.</strong> If it doesn't work, define the new problem and repeat.\n\nThis isn't struggling. This is the job. Every developer does this every day.`, callout: { type: "focus", label: "ADHD Note", text: "Complex projects can feel overwhelming at the start. Break them into the smallest possible next task. Not 'build the login system' \u2014 'make the input field appear on screen.' Then the next tiny thing. Momentum builds from small wins." }, hint: `When a project feels too big to start, use the "next physical action" approach.\n\nDon't write "build the dashboard." Write "create a new file called dashboard.html." That's it. One physical action.\n\nWhen that's done, the next physical action becomes obvious. Then the next. The project builds itself one tiny step at a time \u2014 you just have to keep asking "what is the very next thing I can do right now?"\n\n<strong>Losing motivation mid-project?</strong> Ship something. Deploy whatever you have, even unfinished. Seeing it live makes it real. Real things are worth finishing.`, checklist: ["I'm working on my most complex project yet", "I've hit at least one wall and pushed through it", "I understand that getting stuck is normal"] },
      { id: "6-4", title: "Using Professional Tools and Resources", body: `By Floor 6 you should be comfortable with:\n\n<strong>Documentation</strong> \u2014 every technology has official docs. Learning to read them is a superpower.\n<strong>Stack Overflow</strong> \u2014 the world's largest database of developer questions and answers.\n<strong>GitHub</strong> \u2014 not just storing your work, but reading other people's code.\n<strong>AI coding assistants</strong> \u2014 tools like GitHub Copilot that suggest code as you type. Powerful when you know enough to evaluate what they suggest.\n\nNone of these replace understanding. But all of them accelerate it.`, callout: { type: "warning", label: "The Dependency Trap", text: "AI coding tools are powerful and useful. They are also dangerous if you rely on them before you understand what the code does. Use them to speed up work you understand, not to skip understanding." }, hint: `Reading documentation feels hard at first because docs are written for people who already know the basics. Here's how to approach them:\n\n1. Read the "Getting Started" section fully\n2. Skim the rest to know what exists\n3. Come back to specific sections when you need them\n\nYou don't read docs cover to cover like a book. You use them like a reference \u2014 you know they contain the answer, and you know roughly where to look.\n\n<strong>Stack Overflow tip:</strong> If your question has already been asked (it almost always has), look for the answer with the most votes AND check the date. A highly voted answer from 2015 might be outdated. Prefer recent answers for modern technologies.`, checklist: ["I'm comfortable reading documentation", "I've used Stack Overflow to solve a real problem", "I've read someone else's code on GitHub", "I understand when and how to use AI coding tools"] },
      { id: "6-5", title: "Floor 6 Project \u2014 Your Speciality in Action", body: `The most ambitious thing you've built yet. It must be in your chosen lane, use the technology you've learned this floor, and be something you couldn't have built six months ago.\n\nThere is no specific brief. You choose the idea. You plan the build. You execute it.\n\nWhen it's done, deploy it, write a short description of what it does and how you built it, and add it to your GitHub portfolio.`, callout: { type: "default", label: "The Portfolio", text: "By the end of Floor 6 you should have at least 3 deployed projects on GitHub with descriptions. This is your portfolio. This is what you show people." }, hint: `If you're struggling with the idea, think about who you were before you started coding. What problem did that person have that a developer could have solved?\n\nOr think forward \u2014 what's the simplest possible version of something you'd actually want to exist?\n\n<strong>The README matters as much as the code.</strong> When an employer looks at your GitHub, they read the README first. Write it like you're explaining the project to someone smart who isn't a developer. What does it do? Why did you build it? What did you learn making it?`, checklist: ["I built my most complex project yet", "It demonstrates my speciality", "It is deployed and on GitHub", "I wrote a description of how I built it", "I'm ready for Floor 7"] }
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
      { id: "7-1", title: "System Design — Thinking at Scale", body: `At a professional level, writing code that works is the baseline. What separates senior developers is the ability to <strong>design systems</strong> — to think about how all the pieces of a large application fit together before writing a single line.\n\nSystem design asks: How does this handle a million users? What happens if one component fails? How do services communicate? Where is data stored and why? How do we prevent data loss?\n\nKey concepts to understand:\n\n<strong>Scalability:</strong> Horizontal scaling (add more servers) vs vertical scaling (make the server bigger). Stateless services scale horizontally. Stateful services are harder.\n\n<strong>Caching:</strong> Store frequently-requested data in fast memory (Redis) to avoid hitting the database every time. Twitter\'s timeline is cached. Wikipedia pages are cached.\n\n<strong>Load balancing:</strong> Distribute traffic across multiple servers so no single one is overwhelmed. NGINX and AWS ELB are common tools.\n\n<strong>Databases at scale:</strong> A single database hits limits. Strategies: read replicas (copies for read traffic), sharding (split data across multiple databases), CQRS (separate read and write paths).\n\n<strong>Failure design:</strong> Systems fail. Good design assumes failure and plans for it: retries, circuit breakers, fallbacks, health checks.\n\nThe exercise below walks through a real system design question — the kind asked in senior developer interviews.`, callout: { type: "default", label: "Start Small", text: "Take one of your previous projects and ask: how would I redesign this if 100,000 people used it tomorrow? What would break first? What would I change? That thinking exercise is where system design starts — not with giant diagrams, but with honest questions about your own work." }, hint: `System design interviews follow a pattern. Practice this structure:\n\n1. <strong>Clarify requirements</strong> — how many users? read-heavy or write-heavy? global or regional?\n2. <strong>Estimate scale</strong> — requests per second, storage needed\n3. <strong>Design the API</strong> — what endpoints exist?\n4. <strong>Design the data model</strong> — what tables/collections?\n5. <strong>Choose infrastructure</strong> — SQL or NoSQL? cache? CDN?\n6. <strong>Identify bottlenecks</strong> — what fails first under load?\n7. <strong>Propose improvements</strong> — caching, sharding, async processing\n\nYou don\'t need perfect answers. You need to show you ask the right questions and reason through trade-offs.`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; max-width: 680px; margin: 0 auto; }\n    h2 { color: #e8d5a0; margin-top: 0; }\n    h3 { color: #c8a96e; margin: 24px 0 8px; font-size: 15px; }\n    p, li { color: #c0cad8; font-size: 14px; line-height: 1.65; }\n    .question-box { background: #0d1117; border-left: 3px solid #e8d5a0; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 12px 0; }\n    .question-box p { margin: 0; color: #e8d5a0; font-weight: bold; font-size: 15px; }\n    textarea { width: 100%; background: #111827; border: 1px solid #30363d; color: white; padding: 10px 12px; border-radius: 6px; font-size: 13px; font-family: sans-serif; resize: vertical; min-height: 80px; box-sizing: border-box; margin-top: 8px; }\n    .btn { background: #e8d5a0; color: #0a0a0a; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; margin-top: 6px; }\n    .saved { color: #4ade80; font-size: 12px; margin-top: 4px; display: none; }\n    .tradeoff { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 14px 16px; margin: 8px 0; font-size: 13px; }\n    .tradeoff strong { color: #e8d5a0; }\n  </style>\n</head>\n<body>\n  <h2>System Design Exercise</h2>\n  <p>Design a URL shortener (like bit.ly). This is one of the most common system design interview questions. Work through each section before moving on.</p>\n\n  <h3>Step 1 — Clarify Requirements</h3>\n  <div class="question-box"><p>What does the system need to do? Write 3-5 core requirements.</p></div>\n  <p style="font-size:13px;color:#8892a0;">Example: "Users paste a long URL and get a short one. Short URL redirects to the original."</p>\n  <textarea id="req" placeholder="Write your requirements here..."></textarea>\n  <button class="btn" onclick="save(\'req\')">Save</button>\n  <div class="saved" id="req-saved">Saved.</div>\n\n  <h3>Step 2 — Estimate Scale</h3>\n  <div class="question-box"><p>Assume 100 million URLs shortened per day. How many redirects per second? How much storage after 5 years?</p></div>\n  <textarea id="scale" placeholder="Do the maths here: 100M URLs/day = ? per second. Average URL length 100 chars = ? GB/year..."></textarea>\n  <button class="btn" onclick="save(\'scale\')">Save</button>\n  <div class="saved" id="scale-saved">Saved.</div>\n\n  <h3>Step 3 — Key Design Decisions</h3>\n  <p style="font-size:13px;color:#8892a0;">Think through these trade-offs:</p>\n  <div class="tradeoff"><strong>Short code generation:</strong> Random string? Hash of the URL? Counter? What are the pros and cons of each?</div>\n  <div class="tradeoff"><strong>Database:</strong> SQL or NoSQL for this use case? The read:write ratio here is roughly 100:1 (far more redirects than creations). How does that affect your choice?</div>\n  <div class="tradeoff"><strong>Caching:</strong> Most traffic goes to a small number of popular links (Pareto principle). Where would you add a cache and what would it cache?</div>\n  <div class="tradeoff"><strong>Scale:</strong> How would you handle 10x more traffic than you designed for?</div>\n  <textarea id="decisions" placeholder="Write your answers to each trade-off above..."></textarea>\n  <button class="btn" onclick="save(\'decisions\')">Save</button>\n  <div class="saved" id="decisions-saved">Saved.</div>\n\n  <script>\n    [\'req\',\'scale\',\'decisions\'].forEach(function(id) {\n      const s = localStorage.getItem(\'sd-\' + id);\n      if (s) document.getElementById(id).value = s;\n    });\n    function save(id) {\n      localStorage.setItem(\'sd-\' + id, document.getElementById(id).value);\n      const el = document.getElementById(id + \'-saved\');\n      el.style.display = \'block\';\n      setTimeout(function() { el.style.display = \'none\'; }, 2000);\n    }\n  <\/script>\n</body>\n</html>', challenges: ["Complete all three steps of the URL shortener design with your own answers", "Research how bit.ly actually works and compare it to your design — what did you miss?", "Design a second system: a simple Twitter timeline (what you see when you open Twitter). Apply the same 3-step framework", "Write a paragraph explaining your URL shortener design to a non-technical person"] }, quiz: { question: "A URL shortener has 100 million URL creations per day but 10 billion redirects per day. What does this tell you about the system design?", options: ["The system should prioritise write performance since millions of URLs are added daily", "The system is read-heavy — caching redirect lookups is critical and could eliminate 90%+ of database reads", "The system needs equal optimisation for reads and writes", "The high redirect count means you need more servers for URL creation"], correct: 1, feedback: "A 100:1 read-to-write ratio means the system is overwhelmingly read-heavy. The dominant operation is looking up short codes and returning the original URL. A cache (like Redis) storing the most popular short codes means most redirects never need to hit the database at all — only cache misses go to the database. This kind of analysis is exactly what system design interviews test." }, checklist: ["I understand what system design means", "I\'ve thought about scalability in the context of my own projects"] },
      { id: "7-2", title: "Code Quality — Writing Code Others Can Read", body: `Professional code is read far more than it is written. A codebase is a living document that multiple people touch over years. Code that only you can understand is a liability — and a sign that the author was optimising for writing speed rather than team sustainability.\n\nCode quality has four dimensions:\n\n<strong>Naming:</strong> Variables and functions named for what they do, not what type they are. getUserProfile() not getObject(). totalPriceWithTax not x.\n\n<strong>Single responsibility:</strong> Each function does one thing. A function called validateAndSaveAndNotifyUser() does three things and should be three functions.\n\n<strong>Comments:</strong> Explain why, not what. The code already shows what. Comments explain the decision: "Using debounce here because the input fires on every keystroke and the API has a rate limit."\n\n<strong>Consistency:</strong> The same pattern used throughout. If you use camelCase, use it everywhere. If you format if blocks a certain way, do it the same way every time.\n\nThe editor below has deliberately bad code. Your job is to refactor it — make it do exactly the same thing, but clearly and cleanly.`, callout: { type: "focus", label: "The Logical Thinker\'s Final Level", text: "Code quality is applied logical thinking. You\'re not just solving the problem — you\'re solving it in the clearest possible way for the next person who has to understand it. In a team, that person is often yourself six months later." }, hint: `The naming test: cover the rest of the code and read just the variable or function name. Do you know what it holds or does?\n\nBad: let d = new Date(); let x = getUser(); function calc(a, b) {}\nGood: let currentDate = new Date(); let activeUser = getUser(); function calculateTotalWithTax(price, taxRate) {}\n\n<strong>The function length test:</strong> If a function is longer than 20 lines, it probably does more than one thing. Find where it changes topic and split it there.\n\n<strong>Before you submit code for review:</strong> Read it aloud. If you stumble or have to backtrack and re-read, that part needs simplifying.`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; max-width: 640px; margin: 0 auto; }\n    h2 { color: #e8d5a0; margin-top: 0; }\n    h3 { color: #c8a96e; font-size: 15px; }\n    p { color: #8892a0; font-size: 14px; line-height: 1.6; }\n    .btn { background: #e8d5a0; color: #0a0a0a; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: bold; margin: 4px 4px 4px 0; }\n    input[type=number] { background: #0d1117; border: 1px solid #30363d; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; width: 120px; }\n    #output { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px; margin-top: 16px; font-family: monospace; font-size: 13px; color: #c8a96e; white-space: pre-wrap; min-height: 60px; }\n  </style>\n</head>\n<body>\n  <h2>Code Quality Refactoring</h2>\n  <p>The JavaScript below works correctly but is written badly. Refactor it: the output should stay exactly the same, but the code should be clean, well-named, and readable. Run it first to understand what it does, then rewrite it.</p>\n\n  <h3>Input</h3>\n  <label style="font-size:13px;color:#a0b0c0;">Hours worked: </label>\n  <input type="number" id="h" value="40" min="0" />\n  <label style="font-size:13px;color:#a0b0c0;margin-left:12px;">Rate (£/hr): </label>\n  <input type="number" id="r" value="25" min="0" />\n  <br><br>\n  <button class="btn" onclick="go()">Calculate pay</button>\n\n  <div id="output">Click the button to see output.</div>\n\n  <script>\n    // ===== BAD CODE — REFACTOR THIS =====\n    // This code is intentionally poorly written.\n    // It works, but the names are cryptic, it does too many things in one function,\n    // and the logic is hard to follow.\n    // Your job: rewrite it so someone reading it for the first time understands it immediately.\n\n    var TAX = 0.2;\n    var NI = 0.12;\n    var OT = 1.5;\n    var OTLIMIT = 40;\n\n    function go() {\n      var h = parseFloat(document.getElementById(\'h\').value);\n      var r = parseFloat(document.getElementById(\'r\').value);\n      if (isNaN(h) || isNaN(r) || h < 0 || r < 0) { document.getElementById(\'output\').textContent = \'bad input\'; return; }\n      var g;\n      if (h > OTLIMIT) {\n        g = (OTLIMIT * r) + ((h - OTLIMIT) * r * OT);\n      } else {\n        g = h * r;\n      }\n      var t = g * TAX;\n      var n = g * NI;\n      var net = g - t - n;\n      var out = \'Gross pay: £\' + g.toFixed(2) + \'\\n\' +\n               \'Income tax (20%): -£\' + t.toFixed(2) + \'\\n\' +\n               \'NI (12%): -£\' + n.toFixed(2) + \'\\n\' +\n               \'Net pay: £\' + net.toFixed(2);\n      if (h > OTLIMIT) out += \'\\nOvertime hours: \' + (h - OTLIMIT) + \' @ £\' + (r * OT).toFixed(2) + \'/hr\';\n      document.getElementById(\'output\').textContent = out;\n    }\n    // ===== END OF BAD CODE =====\n    // Goals for your refactor:\n    // 1. Replace all single-letter variables with descriptive names\n    // 2. Replace TAX, NI, OT, OTLIMIT with self-describing names\n    // 3. Split go() into at least 3 functions: one to read inputs, one to calculate, one to display\n    // 4. Add one comment that explains WHY (not what) — a non-obvious decision in the logic\n  <\/script>\n</body>\n</html>', challenges: ["Rename every variable to be self-describing — no single letters, no abbreviations", "Split the go() function into at least 3 smaller functions with clear single responsibilities", "Add input validation that shows a helpful error message (not just 'bad input')", "After refactoring, compare your version to the original — count how many lines it takes and whether each line is immediately understandable"] }, quiz: { question: "A function is 80 lines long and handles input validation, data calculation, formatting, and DOM updates. What should you do?", options: ["Leave it — long functions show more work was done", "Add detailed comments explaining each section within the function", "Split it into four separate functions, one for each responsibility", "Move the logic to a separate file to reduce the visible length"], correct: 2, feedback: "The single responsibility principle: each function should do one thing. An 80-line function that does four things is four functions that haven\'t been separated yet. Splitting it makes each part independently testable, independently readable, and independently replaceable. This is one of the most consistently valuable habits in professional software development." }, checklist: ["I reviewed my Floor 6 project for code quality", "I renamed at least 3 things to be clearer", "I broke at least one large function into smaller ones"] },
      { id: "7-3", title: "Real World Problem Solving", body: `This section has no tutorials. Only problems.\n\nEach scenario below is the kind of situation actual developers face. Some are technical decisions. Some are about communicating with non-technical stakeholders. Some are architectural. All of them require you to think, not just apply a formula.\n\n<strong>Scenario 1 — The Slow Page:</strong> A client\'s e-commerce page takes 8 seconds to load on mobile. Users are leaving. You have one week and cannot rewrite the backend. What do you investigate first, and what changes would you make?\n\n<strong>Scenario 2 — The Database Decision:</strong> You\'re building a social app. Users create posts, comment on them, and tag each other. You need to choose between a relational database (SQL) and a document database (NoSQL). What questions do you ask before deciding?\n\n<strong>Scenario 3 — The Stakeholder:</strong> Your manager asks why the new feature is taking two weeks when it "should only take a few hours." How do you explain the technical complexity without being defensive or dismissive?\n\n<strong>Scenario 4 — The Bug Report:</strong> A user reports "the checkout is broken." That\'s all you have. No error message, no steps to reproduce, no device info. What is your exact process for investigating this?\n\n<strong>Scenario 5 — The Security Hole:</strong> A colleague\'s code stores user passwords as plain text in the database. They\'re about to deploy. What do you say, and what should the code look like instead?\n\nWork through each scenario below. Write your approach before looking at the hint.`, callout: { type: "warning", label: "The Final Discomfort", text: "These scenarios will make you feel uncertain. That feeling is accurate — real problems don\'t come with answers attached. What you\'re building here is the confidence to reason through ambiguity and take a position. That\'s what professional grade looks like." }, callout2: { type: "focus", label: "ADHD Note", text: "If all five scenarios feel overwhelming at once, pick just one. Spend a full session on it. Write your answer out. Then check the hint. Move on to the next scenario in the next session. Depth beats breadth here — one scenario fully worked is worth more than five glanced at." }, hint: `<strong>Scenario 1 (Slow page) — start here:</strong> Audit what loads. Open DevTools Network tab, filter by size. Images are the most common culprit — compress them (use WebP, add loading="lazy"). Next: check for render-blocking scripts (move to bottom of body or add defer). Then: check if assets are cached.\n\n<strong>Scenario 2 (Database choice):</strong> Ask — how relational is the data? Posts and comments with users are highly relational — SQL is the natural fit. If the schema changes constantly or data is highly variable per record — document DB. For social apps, most teams use SQL (PostgreSQL).\n\n<strong>Scenario 3 (Stakeholder):</strong> Don\'t defend, translate. "What looks like an input box is actually integrating with two APIs, a payment system, and email confirmation — each with edge cases and error handling. Here\'s what the two weeks covers..." Break down the work visibly.\n\n<strong>Scenario 4 (Bug report):</strong> Reproduce first. Try checkout yourself across browsers. Check error logs (server logs, browser console). Ask the user for their browser, device, and steps. Narrow down: which step in checkout fails?\n\n<strong>Scenario 5 (Passwords):</strong> Never store plain text passwords. Use a hashing library — bcrypt in Node, Werkzeug in Python. Hashing is one-way: you can verify a password without ever storing it. The conversation: "Hey, I noticed the passwords are stored as plain text — this is a security issue. Here\'s the fix..."`, code: { lang: "HTML", starter: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 24px; max-width: 640px; margin: 0 auto; }\n    h2 { color: #e8d5a0; margin-top: 0; }\n    .scenario { background: #0d1117; border: 1px solid #30363d; border-radius: 10px; padding: 20px; margin: 16px 0; }\n    .scenario h3 { color: #e8d5a0; margin: 0 0 10px; font-size: 15px; }\n    .scenario p { color: #c0cad8; font-size: 14px; line-height: 1.6; margin: 0 0 12px; }\n    textarea { width: 100%; background: #111827; border: 1px solid #30363d; color: white; padding: 10px 12px; border-radius: 6px; font-size: 13px; font-family: sans-serif; resize: vertical; min-height: 80px; box-sizing: border-box; line-height: 1.5; }\n    .btn { background: #e8d5a0; color: #0a0a0a; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; margin-top: 8px; }\n    .saved-msg { color: #4ade80; font-size: 12px; margin-top: 6px; display: none; }\n  </style>\n</head>\n<body>\n  <h2>Real World Problem Solving</h2>\n\n  <div class="scenario">\n    <h3>Scenario 1 — The Slow Page</h3>\n    <p>A client\'s e-commerce page takes 8 seconds to load on mobile. Users are leaving before the page finishes. You cannot rewrite the backend. What do you investigate first and what changes do you make?</p>\n    <textarea id="s1" placeholder="Write your approach here before reading the hint..."></textarea>\n    <button class="btn" onclick="save(\'s1\')">Save answer</button>\n    <div class="saved-msg" id="s1-msg">Saved.</div>\n  </div>\n\n  <div class="scenario">\n    <h3>Scenario 2 — The Database Decision</h3>\n    <p>You\'re building a social app: users, posts, comments, tags. You must choose between PostgreSQL (relational) and MongoDB (document). What questions do you ask before deciding, and which would you lean toward?</p>\n    <textarea id="s2" placeholder="Write your approach here before reading the hint..."></textarea>\n    <button class="btn" onclick="save(\'s2\')">Save answer</button>\n    <div class="saved-msg" id="s2-msg">Saved.</div>\n  </div>\n\n  <div class="scenario">\n    <h3>Scenario 3 — The Stakeholder</h3>\n    <p>Your manager says the new feature should "only take a few hours." It actually takes two weeks. How do you explain the technical complexity without being defensive?</p>\n    <textarea id="s3" placeholder="Write what you would actually say..."></textarea>\n    <button class="btn" onclick="save(\'s3\')">Save answer</button>\n    <div class="saved-msg" id="s3-msg">Saved.</div>\n  </div>\n\n  <div class="scenario">\n    <h3>Scenario 4 — The Bug Report</h3>\n    <p>A user reports: "the checkout is broken." No error message, no steps, no device info. What is your exact investigation process?</p>\n    <textarea id="s4" placeholder="Step by step — what do you do first?"></textarea>\n    <button class="btn" onclick="save(\'s4\')">Save answer</button>\n    <div class="saved-msg" id="s4-msg">Saved.</div>\n  </div>\n\n  <div class="scenario">\n    <h3>Scenario 5 — The Security Hole</h3>\n    <p>A colleague\'s code stores user passwords as plain text in the database. They\'re about to deploy. What do you say, and what should the correct code look like?</p>\n    <textarea id="s5" placeholder="How do you handle this conversation and what\'s the fix?"></textarea>\n    <button class="btn" onclick="save(\'s5\')">Save answer</button>\n    <div class="saved-msg" id="s5-msg">Saved.</div>\n  </div>\n\n  <script>\n    // Load any previously saved answers\n    [\'s1\',\'s2\',\'s3\',\'s4\',\'s5\'].forEach(function(id) {\n      const saved = localStorage.getItem(\'floor7-\' + id);\n      if (saved) document.getElementById(id).value = saved;\n    });\n\n    function save(id) {\n      const text = document.getElementById(id).value;\n      localStorage.setItem(\'floor7-\' + id, text);\n      const msg = document.getElementById(id + \'-msg\');\n      msg.style.display = \'block\';\n      setTimeout(function() { msg.style.display = \'none\'; }, 2000);\n    }\n  <\/script>\n</body>\n</html>', challenges: ["Work through all 5 scenarios — write your answer before reading the hint for each", "For Scenario 5, research bcrypt and write pseudocode showing how password hashing would work in a real Node.js app", "For Scenario 1, open DevTools on any slow website you know and run an actual performance audit — what do you find?", "Write a Scenario 6 of your own: a real problem you\'ve hit while building something, and how you solved it (or would solve it)"] }, quiz: { question: "A user reports 'it\'s broken.' What is the first thing a professional developer does?", options: ["Immediately look at the code and start changing things", "Ask the user for more detail and try to reproduce the bug yourself", "Revert the last deployment and restore a backup", "Apologise and tell the user it will be fixed in the next release"], correct: 1, feedback: "You cannot fix a bug you cannot reproduce. The first step is always: gather enough information to reproduce the exact failure. That means asking for the user\'s browser, device, steps, and any error messages — then trying those exact steps yourself. Only once you can reproduce it reliably should you start looking at code." }, checklist: ["I\'m working through real-world problems", "I attempt a solution before researching", "I\'m becoming comfortable with uncertainty"] },
      { id: "7-4", title: "Portfolio Building", body: `Your portfolio is your evidence. For someone without a degree or years of employment history, it is everything.\n\nBy the end of this floor your portfolio should include:\n\n<strong>3-5 deployed projects</strong> \u2014 accessible via URL, each with a README explaining what it does and how you built it\n<strong>A personal website</strong> \u2014 built by you, representing you, linking to your work\n<strong>A GitHub profile</strong> \u2014 with consistent commit history showing that you show up regularly\n<strong>A written case study</strong> \u2014 for your most complex project, walking through the problem, your decisions, and what you'd do differently\n\nThis is what you send instead of a CV.`, callout: { type: "default", label: "The Honest Truth", text: "A portfolio of 4 real projects built and deployed by someone who started from nothing 18 months ago is more compelling to most employers than a degree with no work to show. The work is the argument." }, hint: `Your personal website doesn't need to be complex. In fact, simpler is often better.\n\nIt needs: your name, one sentence about what you do, links to your projects, a way to contact you.\n\nThat's it. Clean, fast, works on mobile. The personal website is itself a project \u2014 it shows you can build something professional and make decisions about design and content.\n\n<strong>GitHub activity matters:</strong> Employers look at the contribution graph \u2014 the grid of green squares showing when you've been committing code. Consistent small contributions over 18 months tells a better story than a burst of activity followed by silence.`, checklist: ["I have 3-5 deployed projects", "Each has a README", "I have a personal website", "My GitHub shows consistent activity", "I've written a case study for my best project"] },
      { id: "7-5", title: "The Final Project \u2014 Something You're Proud Of", body: `No brief. No requirements. No checklist.\n\nBuild the thing you've been thinking about since you started this book.\n\nThe idea that made you want to learn in the first place \u2014 or the one that appeared somewhere along the way and wouldn't leave you alone.\n\nUse everything. Take your time. Make it right.\n\nWhen it's done, you're not a student anymore.`, callout: { type: "default", label: "The Only Instruction", text: "Build something that, when you show it to someone, makes you feel proud rather than apologetic. That feeling is the destination. Everything in this book was the road to it." }, callout2: { type: "focus", label: "You Made It Here", text: "Floors 1 through 6 built you. Floor 7 is just proof. The person who finishes this is not the same person who started it. That gap \u2014 between who you were and who you became \u2014 was crossed one session at a time.\n\nNow go build something." }, hint: `If the idea still feels too big \u2014 shrink it.\n\nThe final project doesn't have to be an empire. It has to be yours. A tool that helps one person do one thing better. A product that solves one real problem cleanly.\n\nStart with the smallest version that would still make you proud. Build that. Then, if you want to keep going, add to it.\n\n<strong>The most important thing:</strong> Finish it. Ship it. Put it in the world. An imperfect thing that exists is worth infinitely more than a perfect thing that doesn't.`, checklist: ["I built my final project", "I'm proud of it", "I deployed it", "I am a developer"] }
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
let state = {
  currentFloor: 1,
  currentSection: 0,
  completed: {},
  quizAnswered: {},
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
  sectionStartTime: null
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
      state.totalSeconds = s.totalSeconds || 0;
      state.sessionLog = s.sessionLog || [];
      state.xp = s.xp || 0;
      state.streak = s.streak || 0;
      state.lastVisit = s.lastVisit || null;
      state.xpAwarded = s.xpAwarded || {};
      state.checklistDone = s.checklistDone || {};
    }
  }  catch(e) {}
}

function saveState() {
  try {
    localStorage.setItem('codebook_v1', JSON.stringify({
      currentFloor: state.currentFloor,
      currentSection: state.currentSection,
      completed: state.completed,
      quizAnswered: state.quizAnswered,
      totalSeconds: state.totalSeconds,
      sessionLog: state.sessionLog,
      xp: state.xp,
      streak: state.streak,
      lastVisit: state.lastVisit,
      xpAwarded: state.xpAwarded,
      checklistDone: state.checklistDone || {}
    }));
  } catch(e) {}
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
    document.getElementById('new-user-landing').style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('app').style.display = 'block';
    applyTheme();
    launchApp();
  } else {
    // New user — show onboarding or auth
    document.getElementById('new-user-landing').style.display = 'none';
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

  // Show the BEGIN button overlay
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
  document.getElementById('new-user-landing').style.display = 'none';
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
  document.getElementById('new-user-landing').style.display = 'none';
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
    // Consecutive day \u2014 extend the streak
    state.streak += 1;
  } else if (state.lastVisit !== null) {
    // Gap of more than one day \u2014 reset streak
    state.streak = 0;
  }
  // If lastVisit is null this is the first ever visit \u2014 don't award a streak yet.
  // Streak starts properly when the user completes their first section.
  state.lastVisit = today;
  saveState();
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
  renderFloor(state.currentFloor - 1, state.currentSection);
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
  { icon: '\uD83C\uDF93', message: 'You understand how the internet works, how computers think, and the logic behind all code. That\'s the foundation everything else is built on.' },
  { icon: '\uD83C\uDFA8', message: 'You can build real webpages that look good. HTML and CSS are yours now. The visual web is no longer a mystery.' },
  { icon: '\u26A1', message: 'JavaScript. You made things move, respond, and think. This is where most people stop. You didn\'t.' },
  { icon: '\uD83D\uDD28', message: 'You built alone. No hand-holding. A real brief, a real product. That\'s the developer mindset.' },
  { icon: '\uD83C\uDF10', message: 'Frontend, backend, databases, APIs, deployment. You are a full stack developer. Let that land.' },
  { icon: '\uD83C\uDFAF', message: 'You found your lane and went deep. This is where developers become specialists.' },
  { icon: '\uD83C\uDFC6', message: 'Floor 7. Professional grade. You started from nothing and built your way here. That distance is yours forever.' }
];

function showFloorCelebration(floorIndex) {
  const floor = FLOORS[floorIndex];
  const msg = FLOOR_MESSAGES[floorIndex];
  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';

  document.getElementById('celebration-icon').textContent = msg.icon;
  document.getElementById('celebration-floor').textContent = floor.title;
  document.getElementById('celebration-message').textContent = msg.message;
  document.getElementById('celebration-xp').textContent = state.xp;
  document.getElementById('celebration-name').textContent = name ? 'Well done, ' + (name) + '.' : 'Well done.';
  document.getElementById('floor-celebration').style.display = 'flex';
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
    var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
    var isGuestLocked = isGuest && fi >= 2;
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
function goToFloor(fi) {
  // Guest users can only access floors 1 and 2
  if (isGuest && fi >= 2) {
    showGuestLockPopup();
    return;
  }
  var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
  if (!isUnlocked) {
    // Find which sections are still incomplete on the previous floor
    var prevFloorObj = FLOORS[fi - 1];
    var incomplete = prevFloorObj.sections.filter(function(s) { return !state.completed[s.id]; });
    var names = incomplete.slice(0, 2).map(function(s) { return '\u201c' + s.title + '\u201d'; }).join(', ');
    var extra = incomplete.length > 2 ? ' and ' + (incomplete.length - 2) + ' more' : '';
    sageMessage('Floor ' + (fi + 1) + ' is locked. Complete Floor ' + fi + ' first \u2014 still needed: ' + names + extra + '.', 'warn');
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
    sectionGateState[section.id] = { read: true, code: false, quiz: isDone || !section.quiz };
  }
  var gate = sectionGateState[section.id];
  var allDone = gate.read && gate.code && gate.quiz;
  var showEditor = !!(section.code);
  var showQuiz = !!(section.quiz || section.checklist);

  // Tab bar
  var tabs = '<div class="section-tabs-bar">' +
    '<button class="section-tab-btn active" onclick="switchSectionTab(\'read\',\'' + section.id + '\',this)">Read</button>' +
    (showEditor ? '<button class="section-tab-btn" onclick="switchSectionTab(\'code\',\'' + section.id + '\',this)">Code Editor</button>' : '') +
    (showQuiz ? '<button class="section-tab-btn" onclick="switchSectionTab(\'quiz\',\'' + section.id + '\',this)">Quiz</button>' : '') +
    '</div>';
var fi = state.currentFloor - 1;
  
  // READ
   var r = '<div class="floor-hero" data-floor="' + (fi+1) + '">' +
    '<div class="floor-tag" style="color:' + floor.color + '">' + floor.tag + '</div>' +
    '<div class="floor-title">' + floor.title + '<br><em>' + floor.subtitle + '</em></div>' +
    '<div class="floor-meta">' +
    '<div class="floor-meta-item"><div class="floor-meta-label">DURATION</div><div class="floor-meta-value">' + floor.duration + '</div></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">SESSIONS</div><div class="floor-meta-value">' + floor.sessions + '</div></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">LENGTH</div><div class="floor-meta-value">' + floor.length + '</div></div>' +
    '</div></div>' +
    '<div class="section-content">' +
    '<div class="section-number">Section ' + (si+1) + ' of ' + floor.sections.length + '</div>' +
    '<div class="section-title-row"><div class="section-title">' + section.title + '</div>' +
    (section.hint ? '<button class="hint-btn" onclick="toggleHint(\'hint-' + section.id + '\')" title="Need help?">?</button>' : '') +
    '</div>' +
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:20px;">' +
    '<button class="listen-btn" id="listen-btn-' + section.id + '" onclick="toggleNarration(\'' + section.id + '\')">' +
    '<span class="listen-dot"></span>&#9654; Listen</button>' +
    '<span class="offline-pill"><span class="offline-dot-pulse"></span>AVAILABLE OFFLINE</span>' +
    '</div>';

  if (section.hint) {
    r += '<div class="hint-box" id="hint-' + section.id + '">' +
      '<div class="owl-wrap"><div class="owl-avatar">&#x1F989;</div>' +
      '<div class="owl-bubble"><div class="owl-name">SAGE &mdash; YOUR GUIDE</div>' +
      '<div class="hint-text">' + section.hint.replace(/\n/g, '<br>') + '</div></div></div></div>';
  }

  r += '<div class="section-body">' + section.body.replace(/\n/g, '<br><br>') + '</div>';

  if (section.callout) {
    r += '<div class="callout ' + (section.callout.type || '') + '">' +
      '<div class="callout-label">' + section.callout.label + '</div>' +
      '<div class="callout-text">' + section.callout.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.code && section.code.lines) {
    r += '<div class="code-block"><div class="code-header">' +
      '<div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>' +
      '<div class="code-lang">' + section.code.lang + '</div></div>' +
      '<div class="code-body">' + section.code.lines.join('\n') + '</div></div>';
  }
  if (section.callout2) {
    r += '<div class="callout ' + (section.callout2.type || '') + '">' +
      '<div class="callout-label">' + section.callout2.label + '</div>' +
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
    r += '<ul class="checklist">';
    section.checklist.forEach(function(item, ci) {
      var key = section.id + '-' + ci;
      // Read from checklistDone, not completed, to keep section completion separate
      var checked = (state.checklistDone || {})[key];
      r += '<li class="' + (checked ? 'checked' : '') + '" onclick="toggleCheck(\'' + key + '\',this)">' +
        '<div class="check-box">' + (checked ? '&#10003;' : '') + '</div>' + item + '</li>';
    });
    r += '</ul>';
  }
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
  ((editorDef && editorDef.challenges) || []).forEach(function(ch) {
    c += '<div class="editor-challenge-item">&rarr; ' + ch + '</div>';
  });
  c += '</div></div>';

  // QUIZ
  var answered = state.quizAnswered[section.id];
  var q = '<div style="padding:24px 32px;">' +
    '<div style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:700;margin-bottom:6px;">Knowledge Check</div>' +
    '<div style="font-size:14px;color:var(--text-dim);margin-bottom:24px;">Answer to unlock the section and earn XP.</div>';
  if (section.quiz) {
    var qz = section.quiz;
    q += '<div class="quiz-block"><div class="quiz-label">KNOWLEDGE CHECK</div>' +
      '<div class="quiz-question">' + qz.question + '</div><div class="quiz-options">';
    ((qz && qz.options) || []).forEach(function(opt, oi) {
      var cls = '';
      if (answered !== undefined) {
        if (oi === qz.correct) cls = 'correct';
        else if (oi === answered) cls = 'wrong';
      }
      q += '<button class="quiz-option ' + cls + '" onclick="answerQuizTabbed(\'' + section.id + '\',' + oi + ',' + qz.correct + ',' + fi + ',' + si + ')"' +
        (answered !== undefined ? ' disabled' : '') + '>' + opt + '</button>';
    });
    q += '</div><div class="quiz-feedback ' + (answered !== undefined ? 'visible' : '') + '" id="qf-' + section.id + '">' +
      (answered !== undefined ? qz.feedback : '') + '</div></div>';
  } else {
    q += '<div class="quiz-block"><div class="quiz-label">READING SECTION</div>' +
      '<div style="font-size:14px;color:var(--text-dim);margin-top:8px;">Complete the reading, then mark as done below.</div></div>';
  }
  q += '</div>';

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
    g + nav;

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

  if (tab === 'learn') {
    if (mainContent) mainContent.style.display = '';
    renderLearnHub();
  } else {
    if (mainContent) mainContent.style.display = 'none';
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
    var isUnlocked = i === 0 || isFloorComplete(i - 1);
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
function renderLearnHub() {
  // Reset to standard two-col layout
  var rs = document.getElementById('right-sidebar');
  if (rs) rs.style.display = 'none';
  var grid = document.querySelector('.app-grid');
  if (grid) grid.style.gridTemplateColumns = '1fr';

  var html = '<div class="lh-layout">' +
    '<div class="lh-header">' +
    '<div class="lh-header-label">YOUR LEARNING PATH</div>' +
    '<div class="lh-header-title">Seven Floors.<br>One Goal.</div>' +
    '<div class="lh-header-sub">Work through each floor in order. Each one builds directly on the last.</div>' +
    '</div>' +
    '<div class="lh-floors">';

  FLOORS.forEach(function(floor, fi) {
    var isComplete = isFloorComplete(fi);
    var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
    var doneSecs = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
    var totalSecs = floor.sections.length;
    var pct = totalSecs > 0 ? Math.round((doneSecs / totalSecs) * 100) : 0;
    var num = fi < 9 ? '0' + (fi + 1) : '' + (fi + 1);
    var color = floor.color || '#c8a96e';

    var badge, badgeClass;
    if (isComplete) {
      badge = '&#10003; Complete'; badgeClass = 'lh-badge-complete';
    } else if (isUnlocked && doneSecs > 0) {
      badge = 'In Progress'; badgeClass = 'lh-badge-active';
    } else if (isUnlocked) {
      badge = 'Start'; badgeClass = 'lh-badge-open';
    } else {
      badge = 'Locked'; badgeClass = 'lh-badge-locked';
    }

    var cardClass = 'lh-floor-card' +
      (isComplete ? ' lh-complete' : (isUnlocked && doneSecs > 0 ? ' lh-in-progress' : '')) +
      (isUnlocked ? '' : ' lh-locked');

    var onClick = isUnlocked ? ' onclick="goToFloor(' + fi + ')"' : '';

    html += '<div class="' + cardClass + '"' + onClick + ' style="--lh-color:' + color + '">' +
      '<div class="lh-floor-num">' + num + '</div>' +
      '<div class="lh-floor-body">' +
      '<div class="lh-floor-title">' + floor.title + '</div>' +
      '<div class="lh-floor-sub">' + floor.subtitle + '</div>' +
      (isUnlocked
        ? '<div class="lh-floor-progress">' +
          '<div class="lh-progress-track"><div class="lh-progress-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
          '<span class="lh-progress-text">' + doneSecs + ' / ' + totalSecs + ' sections</span>' +
          '</div>'
        : '<div class="lh-floor-locked-hint">Complete Floor ' + fi + ' to unlock</div>') +
      '</div>' +
      '<div class="lh-floor-right">' +
      '<span class="lh-badge ' + badgeClass + '">' + badge + '</span>' +
      '</div>' +
      '</div>';
  });

  html += '</div></div>';

  var mc = document.getElementById('main-content');
  if (mc) { mc.style.display = ''; mc.innerHTML = html; }
}

function renderFloor1(si) {
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
  if (si > 0) { state.currentSection = si - 1; saveState(); renderNav(); renderFloor(fi, si - 1); }
  else if (fi > 0) { goToFloor(fi - 1); }
}

function nextSection(fi, si) {
  var floor = FLOORS[fi];
  var section = floor.sections[si];
  var gate = sectionGateState[section.id] || {};
  var hasQuiz = !!(section && section.quiz);

  if (!state.completed[section.id]) {
    if (hasQuiz && !gate.quiz) {
      // Quiz exists but not answered — navigate without awarding XP
      sageMessage('You skipped the quiz — no XP awarded for this section. You can come back to it anytime.', 'warn');
    } else {
      // No quiz (reading/checklist section) — auto-complete as before
      state.completed[section.id] = true;
      awardXP(getSectionXP(fi), 'complete-' + section.id, window.innerWidth / 2, 300);
      var isNowComplete = isFloorComplete(fi);
      if (isNowComplete) {
        awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
        setTimeout(function() { showFloorCelebration(fi); }, 600);
      }
      saveState();
    }
  }
  if (si < floor.sections.length - 1) { state.currentSection = si + 1; saveState(); renderNav(); renderFloor(fi, si + 1); }
  else if (fi < FLOORS.length - 1) { goToFloor(fi + 1); }
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
  // Propagate floor colour so all CSS hover states can use var(--floor-color)
  var mainCol = document.getElementById('main-col');
  if (mainCol) mainCol.style.setProperty('--floor-color', FLOORS[fi] ? FLOORS[fi].color : '#c8a96e');

  if (fi === 0) {
    // Hide old right sidebar \u2014 Floor 1 has its own built-in sidebar
    var rs = document.getElementById('right-sidebar');
    if (rs) rs.style.display = 'none';
    // Remove right sidebar column from grid
    var grid = document.querySelector('.app-grid');
    if (grid) grid.style.gridTemplateColumns = '1fr';
    renderFloor1(si);
    return;
  }
  // Restore right sidebar for other floors
  var rs = document.getElementById('right-sidebar');
  if (rs) rs.style.display = '';
  var grid = document.querySelector('.app-grid');
  if (grid) grid.style.gridTemplateColumns = '';
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
    var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
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
    var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
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
    var unlocked = isFloorComplete(p.floor - 1) || p.floor === 1;
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
    '<div class="game-hub">' +
      '<div class="gh-header">' +
        '<div class="gh-title">GAME HUB</div>' +
        '<div class="gh-sub">Choose your mission. More games coming soon.</div>' +
      '</div>' +
      '<div class="gh-grid">' +

        '<div class="gh-card gh-card--active" onclick="launchGame(\'launch-sequence\')">' +
          '<div class="gh-card-badge gh-card-badge--live">LIVE</div>' +
          '<div class="gh-card-icon">🚀</div>' +
          '<div class="gh-card-name">LAUNCH SEQUENCE</div>' +
          '<div class="gh-card-desc">Educational sci-fi mission. Repair rocket systems, debug code faults, and launch to Mars.</div>' +
          '<button class="gh-card-btn">PLAY NOW</button>' +
        '</div>' +

        '<div class="gh-card gh-card--locked">' +
          '<div class="gh-card-badge gh-card-badge--soon">COMING SOON</div>' +
          '<div class="gh-card-icon">🔒</div>' +
          '<div class="gh-card-name">MISSION 2</div>' +
          '<div class="gh-card-desc">A new challenge is being prepared. Stand by for further transmissions.</div>' +
          '<button class="gh-card-btn gh-card-btn--locked" disabled>LOCKED</button>' +
        '</div>' +

        '<div class="gh-card gh-card--locked">' +
          '<div class="gh-card-badge gh-card-badge--soon">COMING SOON</div>' +
          '<div class="gh-card-icon">🔒</div>' +
          '<div class="gh-card-name">MISSION 3</div>' +
          '<div class="gh-card-desc">A new challenge is being prepared. Stand by for further transmissions.</div>' +
          '<button class="gh-card-btn gh-card-btn--locked" disabled>LOCKED</button>' +
        '</div>' +

      '</div>' +
    '</div>';
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
    var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
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
