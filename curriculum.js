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
        body: `The web is simpler than it looks. That's not something you say to make someone feel better. It's just true.

Every page you've ever visited — Gmail, YouTube, your bank — is a set of files sitting on a computer somewhere. When you type an address and press enter, your browser sends a message to that computer: give me those files. The computer finds them and sends them back. Your browser reads them and draws what you see. That whole exchange takes less than a second.

Those files are always one of three types.

<strong>HTML</strong> — what's on the page. Text, headings, buttons. The structure.
<strong>CSS</strong> — what it looks like. Colours, fonts, spacing. The appearance.
<strong>JavaScript</strong> — what it does. What happens when you click, type, scroll. The behaviour.

Three types. That's the entire web.

<div class="inline-q"><span class="iq-label">Do this now:</span> Right-click anywhere on this page and choose View Page Source. Don't try to understand it yet — just look. That's the actual file your browser received. Somewhere in all of that, those three types are there. You're going to learn to write files that look exactly like that.</div>

Nobody's hiding a secret here. The developers building Stripe, Airbnb, the BBC — they're writing those same three file types. Different scale. Same building blocks.

You start with the same materials as everyone else.`,
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
        hint: `Every website works the same way. Your browser asks. A server answers.

Right-click on any page and choose View Page Source. That wall of text is the actual file the server sent back. Every site you've visited works like that.

<strong>Still not clicking?</strong> Think of it like ordering food. You ask for something (request). The kitchen makes it (server). It arrives at your table (response). Your browser is the last step — it takes what arrives and draws it on screen.`,
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
        body: `A computer is not smart. It is fast. Those are different things.

It reads your code line by line, top to bottom. It doesn't skip ahead. It doesn't assume you meant something different. It reads instruction one, runs it, then moves to instruction two. That's called <strong>sequential execution</strong>, and it's the foundation of everything else you'll learn.

The order you write things in matters more than almost anything else when you're starting out.

A recipe that says "serve the cake" before "bake the cake" produces nothing edible. Code is the same. Tell a computer to display a number before it's calculated that number and it has nothing to show you. Sometimes not even an error. Just nothing — which is harder to debug.

<div class="inline-q"><span class="iq-label">Think about this:</span> Think of something in your daily life where the order of steps is non-negotiable — where switching two steps breaks the whole thing. That instinct for sequence is exactly what you're building here.</div>

This is the mistake that catches most beginners early. Not because it's complicated — because it's invisible. The code looks right. The order is just wrong.`,
        callout: {
          type: "default",
          label: "Remember This",
          text: "Code is pure logic. There is always a reason why something works or doesn't. Finding that reason is the skill you're building."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "<strong>Don't rush this section.</strong> The concept of sequential execution is small but everything else is built on top of it. Two minutes understanding this properly saves hours of confusion later."
        },
        hint: `Think of a recipe. "Serve the cake" before "bake the cake" — nothing comes out right. A computer does exactly what you say, in exactly the order you say it. No guessing. No common sense. No filling in the gaps.

<strong>Try this:</strong> Write out five steps for making a cup of tea. That sequential thinking is exactly what a computer does with your code.`,
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
          target: "36.00",
          starter: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:\'IBM Plex Mono\',monospace;padding:24px;font-size:13px;line-height:1.7;">\n<h2 style="color:#c8a96e;margin-top:0;">Order Matters</h2>\n<div id="output"></div>\n<script>\n  var out = \'\';\n\n  // Step 1: Set a price\n  var price = 40;\n  out += \'<p>1. Price set to: £\' + price + \'</p>\';\n\n  // Step 2: Calculate a 10% discount\n  var discount = price * 0.10;\n  out += \'<p>2. Discount calculated: £\' + discount.toFixed(2) + \'</p>\';\n\n  // Step 3: Apply it\n  var finalPrice = price - discount;\n  out += \'<p style="color:#c8a96e;font-size:18px;margin-top:16px;">You pay: £\' + finalPrice.toFixed(2) + \'</p>\';\n\n  console.log(finalPrice.toFixed(2));\n  document.getElementById(\'output\').innerHTML = out;\n<\/script>\n</body>\n</html>',
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
        body: `Every program ever written is built from three ideas. Not most programs. Every one.

<strong>Conditions</strong> decide which path to take. If the user is logged in, show the dashboard. If not, show the login page. Every decision in every piece of code is a condition.

<strong>Loops</strong> repeat something until something changes. Add up every item in a shopping cart. Send a notification to every user in a list. Any time code does something "for each" or "until" — that's a loop.

<strong>Functions</strong> are instructions you write once and reuse. Instead of writing the same ten lines every time you need to do the same job, you write it once, give it a name, and call that name whenever you need it. That's how code stays manageable when it grows.

<div class="inline-q"><span class="iq-label">Think about this:</span> Pick any app on your phone. Find one decision it makes (condition), one thing it does repeatedly (loop), one action it reuses across multiple screens (function). They're all there.</div>

These three ideas don't go away as you get more advanced. When the code is far more complex than anything in this floor, you'll still be thinking in conditions, loops, and functions.`,
        callout: {
          type: "default",
          label: "How Developers Read Code",
          text: `When a developer opens an unfamiliar codebase for the first time, they look for three things: where are the conditions, where are the loops, where are the functions. Everything else is detail. These three are the skeleton.`
        },
        hint: `A <strong>condition</strong> is a fork in the road — you go one way or the other based on what's true.
A <strong>loop</strong> is going around a roundabout — you keep going until you're told to exit.
A <strong>function</strong> is a named shortcut — you describe a journey once, then take it whenever you need it by name.

<strong>Try this:</strong> Open any app on your phone. Find one condition, one loop, one function. You'll find all three in under a minute.`,
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
          target: "Welcome, Developer. You are ready to build.",
          starter: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:\'IBM Plex Mono\',monospace;padding:24px;font-size:13px;line-height:1.8;">\n<h2 style="color:#c8a96e;margin-top:0;">All Three Building Blocks</h2>\n<div id="output"></div>\n<script>\n  var out = \'\';\n\n  // CONDITION\n  var isLoggedIn = true;\n  if (isLoggedIn) {\n    out += \'<p style="color:#7eb8c8;">&#x2713; Condition: logged in &rarr; showing dashboard</p>\';\n  } else {\n    out += \'<p style="color:#7eb8c8;">&#x2717; Condition: not logged in &rarr; redirecting to login</p>\';\n  }\n\n  // LOOP\n  for (var i = 1; i <= 3; i++) {\n    out += \'<p style="color:#a8d5a2;">Loop iteration \' + i + \' of 3</p>\';\n  }\n\n  // FUNCTION\n  function greet(name) {\n    return \'Welcome, \' + name + \'. You are ready to build.\';\n  }\n  out += \'<p style="color:#c8a96e;margin-top:8px;">\' + greet(\'Developer\') + \'</p>\';\n\n  console.log(greet(\'Developer\'));\n  document.getElementById(\'output\').innerHTML = out;\n<\/script>\n</body>\n</html>',
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
        body: `Before you write code, you're going to read it.

This is deliberate. Professional developers spend more time reading code than writing it — code written by people they've never met, in files from years before they arrived. Reading fluently isn't a step towards writing. It's the more important skill.

Before you speak a language, you learn to recognise it. Same thing here. Reading code first trains your brain to see structure, not just symbols.

<div class="inline-q"><span class="iq-label">Try this:</span> Look at the code example below before reading any explanation. Cover the hints. Just guess what each line tells the browser to do — write it down, then compare. Getting it wrong doesn't matter. The act of guessing is already how developers think when they open an unfamiliar file.</div>

Don't try to memorise what you see. Don't panic at the syntax. Read it like a road sign — you don't need to know how the sign was made to understand what it's telling you.`,
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
        hint: `Don't read code like a sentence. Read it like signs.

The tag name tells you what it is. &lt;h1&gt; is a big heading. &lt;p&gt; is a paragraph. &lt;button&gt; is a button. The words between the opening and closing tag are what actually appears on screen.

<strong>Still fuzzy?</strong> Think of tags like labels on boxes. The label says what's inside. The content is the thing inside. Open the box (opening tag), here's what's inside (content), close the box (closing tag).`,
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
        body: `Before Floor 2, do an honest check.

Not for this app. For yourself.

You've covered four things: how the internet moves files between computers, how a computer reads instructions in order, the three ideas that underpin all code, and your first look at real HTML. That's the foundation everything else is built on.

The questions below aren't testing your memory. They're testing whether the ideas have actually connected — whether you can use them, not just recognise them.

If something feels shaky, go back to that section. Not the whole floor. Just that one. There's no penalty. No timer. The only person this matters to is you.`,
        callout: {
          type: "default",
          label: "Before You Move On",
          text: `The concepts in Floor 1 don't get left behind as things get more advanced. Conditions, loops, functions, request and response — they're still there in every piece of professional code. They just look different at scale.`
        },
        callout2: {
          type: "focus",
          label: "Floor 2 Preview",
          text: `Floor 2 is where it becomes real. You will write actual HTML and CSS and see the results on screen immediately. Everything you understood here becomes something you can build.`
        },
        hint: `If you can't answer the questions without guessing, that's not failure — it's information. It tells you exactly which section to go back to. Not the whole floor. Just that one.

One gap doesn't undo everything else. It just shows you where to look.`,
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
        body: `HTML is not a programming language. It has no logic, no decisions, no loops. What it has is more fundamental: a way to describe what something is.

You take a piece of content — a heading, a paragraph, an image — and you wrap it in a tag that labels it. <strong>&lt;h1&gt;</strong> means this is the most important heading. <strong>&lt;p&gt;</strong> means this is a paragraph. <strong>&lt;img&gt;</strong> means this is an image. The browser reads those labels and knows how to treat each one.

That's the entire job of HTML. Not how something looks. Not what happens when you click it. Just: what is this?

<div class="inline-q"><span class="iq-label">Try this:</span> Right-click any website and choose View Page Source. Scan for angle brackets. Every one of them is labelling a piece of content — h1, p, a, div, img. All of them doing exactly this one job.</div>

CSS handles appearance. JavaScript handles behaviour. HTML describes structure. Keep those three jobs separate in your head and they'll stay separate in your code.`,
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
        hint: `HTML is about labelling. Not styling, not behaviour — just describing what content is.

Right-click any website, choose View Page Source. Every pair of angle brackets is a label. h1 means big heading. p means paragraph. a means link. div means a generic container.

<strong>Still fuzzy?</strong> Think of tags like labels on filing folders. The label doesn't change what's inside — it tells you (and the browser) what to expect.`,
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
        body: `Every visual decision on every website you've ever used was a CSS rule. The colour of a button. The space between paragraphs. The font on a heading. The way something shifts when you hover over it. All CSS.

The pattern is always the same: who gets the rule, what changes, and by how much.

<strong>p { color: red; }</strong>

Who: all paragraphs. What: text colour. How much: red. The entire CSS language follows that structure — selector, property, value.

<div class="inline-q"><span class="iq-label">Try this:</span> Press F12 on any website and click the Elements tab. Click any piece of text on the page. In the Styles panel you'll see every CSS rule applying to that element. That's the real code running the site.</div>

The properties are numerous but you'll use the same small set constantly. You'll learn those in the next section. The pattern never changes.`,
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
        hint: `The pattern is always the same. Who (selector). What (property). How much (value).

p { color: red; } — all paragraphs, text colour, red.

Press F12 on any website. Click an element. Look at the Styles panel. You'll see exactly this pattern, repeated for every visual decision on the page.

<strong>Still fuzzy?</strong> Pick one element and find every CSS rule applying to it in DevTools. The pattern will be obvious immediately.`,
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
        body: `When a browser receives an HTML file it doesn't just display it. It goes through a sequence — and understanding the sequence explains why certain things break in ways that seem illogical.

The browser reads the HTML top to bottom and builds a tree called the <strong>DOM</strong> — a structured map of every element on the page. At the same time it reads any linked CSS and builds a separate map called the <strong>CSSOM</strong>. It combines them into a render tree, calculates where everything goes (layout), then draws it (paint).

<div class="inline-q"><span class="iq-label">Think about this:</span> This is why CSS goes in the <strong>&lt;head&gt;</strong> and JavaScript at the bottom of <strong>&lt;body&gt;</strong>. CSS needs to be ready before the page renders. JavaScript, which often manipulates the DOM, is safer after the page has loaded.</div>

You don't need to memorise the sequence. You need to understand why it exists. When something renders out of order or a style doesn't apply when you expect it to — this is usually the reason.`,
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
        hint: `The sequence: HTML builds the DOM, CSS builds the CSSOM, they combine into a Render Tree, then Layout, then Paint.

You don't need those names. What matters: the browser needs everything before it can draw anything — which is why loading order affects what the user sees and when.

<strong>Try this:</strong> Press F12, go to the Elements tab, click any element on the page. The highlighted entry in the panel is that element's position in the DOM.`,
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
        body: `Every HTML page starts with the same scaffold. Not most pages — every page. GitHub, the BBC, every Airbnb listing. The scaffold is the contract the browser needs before it will parse anything reliably.

<strong>&lt;!DOCTYPE html&gt;</strong> tells the browser what version of HTML to expect. The <strong>&lt;html&gt;</strong> tag wraps everything. Inside it, <strong>&lt;head&gt;</strong> contains metadata — the page title, links to CSS, instructions the browser needs but the user never sees. <strong>&lt;body&gt;</strong> contains what the user actually sees.

That structure doesn't change. The content inside <strong>&lt;body&gt;</strong> does.

<div class="inline-q"><span class="iq-label">Try this:</span> Paste the scaffold from the code editor into a blank text file, save it as page.html, and open it in a browser. You've just run HTML on your machine. Everything you build from here is a version of that file.</div>

One thing that catches people early: linking a CSS file uses a <strong>&lt;link&gt;</strong> tag inside <strong>&lt;head&gt;</strong>, not inside <strong>&lt;body&gt;</strong>. The browser needs to know about styles before it starts drawing.`,
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
        hint: `If nothing appears when you open your file in a browser, check in this order: Did you save the file? Did you close all your tags? Does the CSS filename in your link tag match the actual file exactly (including capitalisation)? Is the CSS file in the same folder?

<strong>Still fuzzy?</strong> Start from the bare scaffold and add one element at a time. That way you always know which change caused the problem.`,
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
        body: `You don't need to know every CSS property. You need the twenty or so you'll reach for constantly, and look up the rest when you need them.

For text: <strong>color</strong> (text colour — not background), <strong>font-family</strong>, <strong>font-size</strong>, <strong>font-weight</strong>, <strong>line-height</strong>.
For spacing: <strong>margin</strong> (space outside the element), <strong>padding</strong> (space inside).
For size: <strong>width</strong>, <strong>height</strong>, <strong>max-width</strong>.
For appearance: <strong>background</strong>, <strong>border</strong>, <strong>border-radius</strong>, <strong>opacity</strong>.
For layout: <strong>display</strong>, <strong>position</strong> — these get their own sections.

<div class="inline-q"><span class="iq-label">Try this:</span> Press F12, click any element on any page, and look at the Styles panel. Rules with a strikethrough are being overridden by something else. That panel is one of the most useful tools you have — use it constantly.</div>

Don't treat CSS like a list to memorise. Write a rule, see what it does, adjust it. The feedback loop is immediate. That's how you learn it.`,
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
        hint: `When a property isn't doing what you expect, press F12, click the element, and look at the Styles panel. Rules with a strikethrough are being overridden by another rule.

The most common early mistake: using color for background colour. The property for that is background or background-color. color controls text only.

<strong>Try this:</strong> Pick any element on any page and count how many CSS rules are applying to it in DevTools. The number is usually surprising.`,
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
        body: `Every element in CSS is a rectangular box. Not visually — structurally. The heading, the button, the image, the paragraph — each one is a box with four layers.

From inside out: <strong>content</strong> (what's actually in it), <strong>padding</strong> (transparent space between the content and the border), <strong>border</strong> (the edge — visible or invisible), and <strong>margin</strong> (space outside the element, separating it from everything else).

This matters because when you set <strong>width: 200px</strong>, you're setting the content width. Padding and border are added on top. The element ends up wider than 200px. This surprises almost everyone the first time.

<div class="inline-q"><span class="iq-label">Try this:</span> Open DevTools, click any block element, and look at the box model diagram in the Styles or Computed panel. Every number maps directly to one of those four layers.</div>

There's a fix: <strong>box-sizing: border-box</strong> makes width include padding and border. Most developers apply it globally to every project before writing anything else.`,
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
        hint: `If an element is wider than you expected, the box model is usually why. Width sets the content width — padding and border add to it by default.

Fix it: add box-sizing: border-box to the element (or * { box-sizing: border-box; } for everything). Now width includes padding and border.

<strong>Try this:</strong> Open DevTools, click any block element, and look at the box diagram. Every number maps to one of the four layers — content, padding, border, margin.`,
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
        body: `Before flexbox, CSS layout required hacks. Centering something vertically was harder than it should have been. Equal-height columns needed workarounds. If you ever look at old CSS and see <strong>float</strong>, <strong>clear: both</strong>, or negative margins doing strange things — that's what developers used before something better existed.

Flexbox made layout logical.

You add <strong>display: flex</strong> to a container. The children of that container automatically arrange in a row. From there: <strong>flex-direction</strong> controls the axis, <strong>justify-content</strong> controls distribution along it, <strong>align-items</strong> controls alignment across it.

Centering something both ways — the thing that used to require tricks — is now three lines:
<strong>display: flex; justify-content: center; align-items: center;</strong>

<div class="inline-q"><span class="iq-label">Think about this:</span> Flex properties go on the container, not the children. The container controls the rules. The children respond. Keep that distinction clear and flexbox becomes predictable.</div>

You'll use flexbox in almost everything you build. Spend time in the code editor until the mental model clicks.`,
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
        hint: `The container holds the flex rules. The children respond.

justify-content spreads children along the main axis (horizontal by default).
align-items aligns children on the cross axis (vertical by default).

To centre something: display: flex; justify-content: center; align-items: center;

<strong>Still fuzzy?</strong> Add display: flex to any container and watch what happens. Then add justify-content and align-items one at a time and watch the children respond.`,
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
        body: `Real interfaces are built from components — self-contained pieces that do one job. A song card. A user profile tile. A product listing. Look closely at any of them and the anatomy is the same: a container, something visual, a text hierarchy, sometimes an action.

Building one from scratch is how CSS, HTML, and layout decisions stop being abstract.

The process: start with the container and get its dimensions right. Add the internal layout. Add the children in the right order. Then style each child. Don't jump to details before the structure is in place — details fight you when the structure is wrong.

<div class="inline-q"><span class="iq-label">Before you code:</span> Look at the component and describe it in plain language. What's the container? What are the children? What layout do they use? Naming things before writing them is a habit worth starting now.</div>

If something isn't sitting where you expect, check the container first. Most layout problems are the container, not the child.`,
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
        hint: `If the component doesn't look right, check in this order: container size, container layout (flex or not), children in the right order, then individual child styles.

Going straight to child styles when the container layout is wrong is the most common mistake. Structure first.

<strong>Quick debug:</strong> Add border: 1px solid red to each element temporarily. It makes every box visible and shows exactly what space each element is taking up.`,
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
        body: `Profile pages follow a consistent pattern because the pattern works. A header with name and role. A short bio. Skills. Projects. Contact links. You've seen it on GitHub, Dribbble, LinkedIn. The structure isn't unoriginal — it's a convention. Conventions exist because they're what people already know how to read.

The code editor has a scaffold. Your job is to finish it, then go beyond it.

Finishing it is guided — fill in the gaps. Going beyond is yours. Add at least one section that isn't in the scaffold. It doesn't need to be complex. It needs to be something you decided to put there.

<div class="inline-q"><span class="iq-label">Think about this:</span> If someone from the industry saw this page, what would you actually want on it? That question is more useful than any brief.</div>

The goal isn't a polished portfolio. It's a page where you made real decisions without being told exactly what to decide. That shift — from following instructions to owning the outcome — is what this section is actually for.`,
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
        hint: `Not sure what to add as your own section? Three options that use what you've learned: a horizontal skills bar, a simple two-column projects grid, or a timeline.

None of those require anything beyond Floor 2. They just require you to apply it without step-by-step instructions.

<strong>Stuck on content?</strong> The content doesn't matter as much as the CSS. Use placeholder text if you need to — just make the layout yours.`,
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
        body: `No scaffold. No starter code. A blank file and a brief.

The brief: build a landing page for something that doesn't exist yet. An app idea. A fictional brand. A band. A product. A service. Anything — as long as you're not copying something that already exists.

The page needs: a headline, a short description, at least two sections, a call to action, and CSS you wrote yourself.

<div class="inline-q"><span class="iq-label">The point:</span> Floor 2 covered HTML structure, CSS properties, the box model, flexbox, and component building. This check is whether those things are actually in your hands — not just in your notes.</div>

If you're not sure where to start: write all the HTML first, then add CSS. Separating structure from appearance is how professionals work on new pages. It stops the two things from interfering with each other while you're still thinking.

If it looks nothing like what you pictured, that's normal. The gap between what you imagined and what you built is exactly the gap that practice closes.`,
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
        hint: `If you're blank on what to build: don't reach for an app idea. Build a landing page for something you actually know — your favourite restaurant, a coffee shop that should exist, a service you wish was available. Real content makes the decisions easier.

HTML structure first. Completely. Don't start adding styles until the HTML says what you want it to say.

<strong>Stuck on layout?</strong> Start with a container div for each section. Get the sections stacking correctly before you worry about what's inside them.`,
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
        body: `HTML is structure. CSS is appearance. JavaScript is what happens when you interact with a page.

Every other language you'll encounter — Python, Go, Swift — runs on servers or devices. JavaScript is the only language browsers run natively. If something happens in a browser and it responds to you, JavaScript made it happen.

It doesn't run top to bottom and stop. It loads onto the page and waits. Waiting for a click, a keypress, a timer, a network response. When something happens, it reacts. That pattern — event, response, event, response — is how every interactive website works.

<div class="inline-q"><span class="iq-label">Try this:</span> Press F12 on any website. Click the Console tab. Type: document.body.style.background = 'red' and press Enter. You just ran JavaScript directly in the browser — the language talked to the page and the page changed.</div>

The relationship between the three: HTML gives JavaScript something to attach to. CSS handles how things look before and after. JavaScript decides when and how they change.`,
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
        hint: `The best way to start is to see it. Open any website, press F12, click the Console tab. Type: document.body.style.background = 'red' and press Enter. Watch the page change. You just ran JavaScript.

That console is your testing ground throughout this floor. Use it constantly — type code, see what happens, adjust.`,
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
        body: `Every JavaScript bug where you stare at the screen thinking "but the value IS 5" has the same root cause: the value is not 5. It's the string "5". In JavaScript, "5" + 3 is "53". Not 8. "5" minus 3 is 2. Same value, different type, completely different result.

This is type coercion, and it catches everyone.

Variables are containers with labels. <strong>let</strong> can be reassigned. <strong>const</strong> cannot. Use const by default — it makes your intentions clear — and use let when you know the value will change.

The types you'll use constantly: strings (text, in quotes), numbers, booleans (true or false), null (intentional emptiness), undefined (something that has no value yet), arrays, and objects.

<div class="inline-q"><span class="iq-label">Try this:</span> Open the console (F12). Type: "5" + 3 and press Enter. Then "5" - 3. Then typeof "5" and typeof 5. JavaScript sees those last two as completely different things.</div>

The rule that prevents most coercion bugs: use === instead of == for comparisons. It checks value AND type, not just value.`,
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
        hint: `Type coercion catches everyone. The key: + with any string becomes string concatenation. Every other operator (-, *, /) converts strings to numbers first.

So "10" * 2 is 20, but "10" + 2 is "102".

<strong>Test it:</strong> Open the console and try both. Then try typeof "5" and typeof 5 — JavaScript sees those as different types entirely.`,
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
        body: `Code makes decisions with conditions. The basic structure: if something is true, do this. If not, do that.

The expression inside the if() evaluates to truthy or falsy. JavaScript considers these falsy: 0, "" (empty string), null, undefined, NaN, and false itself. Everything else is truthy — including empty arrays and empty objects, which surprises people.

The comparison operators you'll use most: <strong>===</strong> (same value AND same type), <strong>!==</strong> (not equal), <strong>&gt;</strong>, <strong>&lt;</strong>, <strong>&gt;=</strong>, <strong>&lt;=</strong>. Use === instead of == unless you specifically need type coercion — which is almost never.

Chain conditions with <strong>&amp;&amp;</strong> (and) and <strong>||</strong> (or).

<div class="inline-q"><span class="iq-label">Try this:</span> Open the console (F12) and type Boolean(0), then Boolean([]), then Boolean(''), then Boolean('hello'). The results show exactly which values JavaScript treats as false — and which ones surprise you.</div>

The ternary operator is a one-line condition: result = condition ? ifTrue : ifFalse. Useful for simple cases. When the condition gets complex, use a full if statement — readability matters more than brevity.`,
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
        hint: `Truthy and falsy: the falsy values are 0, "" (empty string), null, undefined, NaN, and false. Everything else is truthy — yes, even an empty array or empty object.

Test it: open the console and type Boolean(0), Boolean([]), Boolean(''), Boolean('hello'). The output tells you exactly what JavaScript considers true or false.

<strong>Use ===</strong> not == for comparisons. It checks value and type. == does type coercion and produces results that are hard to predict.`,
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
        body: `Functions let you write something once and use it as many times as you need. Without them, code repeats itself — and repeated code means bugs in multiple places when something needs to change.

The basic syntax: <strong>function name(parameters) { return something; }</strong>. The name is what you call it by. Parameters are inputs. The return statement is what comes back.

Arrow functions are the modern shorthand:
<strong>const add = (a, b) =&gt; a + b;</strong>

Same idea, shorter to write. Both work. Arrow functions are the default style in most professional codebases today.

<div class="inline-q"><span class="iq-label">Watch out:</span> A function that doesn't have a return statement returns undefined automatically. If you're calling a function and getting undefined back, that's almost always why — check whether the function actually returns something.</div>

Functions can call other functions. A complex problem broken into small functions, each doing one thing, is not a best practice — it's just how maintainable code works. Start thinking in that direction now.`,
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
        hint: `If a function returns undefined when you expect a value, check two things: does the function have a return statement, and does that return statement have the right variable in it?

Common mistake: returning from inside an if block but not from the function's main path. If the condition isn't met, the function falls off the end and returns undefined.

<strong>Test any function</strong> by calling it in the console with different inputs and checking what comes back.`,
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
        body: `A loop runs the same block of code repeatedly until a condition says to stop.

The three kinds you'll use: the <strong>for</strong> loop (set a start, a stop condition, and a step), the <strong>while</strong> loop (runs as long as a condition is true), and <strong>for...of</strong> (walks through every item in an array).

Every list you've ever seen rendered on a page — Spotify's tracks, Instagram's feed, Amazon's search results — is a loop walking through an array and drawing one element per item. That's it.

<div class="inline-q"><span class="iq-label">Watch out:</span> If your browser freezes after writing a loop, it's almost certainly an infinite loop — the stopping condition never becomes false. Close the tab, fix the condition, reload. This happens to everyone at least once.</div>

The array methods — <strong>map</strong>, <strong>filter</strong>, <strong>reduce</strong> — are loops written more cleanly. You'll use them more than raw for loops once you're comfortable with functions. They come in the next section.`,
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
        hint: `If your browser freezes: infinite loop. The while condition never became false, or the for loop's counter never reached its stop value. Close the tab. Fix the condition.

for...of is the cleanest way to walk an array:
for (const item of items) { console.log(item); }

<strong>For each item in the list, do this.</strong> That's all a loop is. If you find yourself repeating the same block of code for different items, a loop is the answer.`,
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
        body: `Almost every real JavaScript application is arrays and objects in some combination. You fetch data from a server. It comes back as objects inside arrays. You filter them, transform them, display them. That's the job, at different scales.

<strong>An array</strong> is an ordered list. Items are accessed by position, starting at 0. The methods you'll reach for constantly: <strong>push</strong> (add to end), <strong>filter</strong> (return items matching a condition), <strong>map</strong> (transform every item), <strong>find</strong> (first item matching a condition).

<strong>An object</strong> is a set of key-value pairs. You access values by key name. Most real data is arrays of objects — a list of users, products, messages, each one an object with multiple properties.

<div class="inline-q"><span class="iq-label">Think about this:</span> Before writing any code that works with data, ask: is this a list of things (array) or a description of one thing (object)? Getting that right first makes everything else simpler.</div>

Arrays and objects can contain each other. An object can have an array as one of its values. An array can hold objects. Real data is almost always nested — start small and build up.`,
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
        hint: `The difference between dot and bracket notation: use dot when you know the key at write time (user.name). Use bracket notation when the key is in a variable (obj[keyVariable]).

The array methods worth learning first: push, pop, filter, map, find, forEach. Open the console and try each one on a small array. Seeing them work on real data is faster than reading about them.

<strong>Common mistake:</strong> forgetting that array indexes start at 0. The first item is items[0], not items[1].`,
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
        body: `The DOM is the browser's live map of the page. Every element you see is a node in that map. JavaScript can find those nodes, read them, change them, add new ones, or remove them. That's how every interactive website works.

<strong>Finding elements:</strong> document.getElementById('id') for one specific element. document.querySelector('.class') for the first match. document.querySelectorAll('.class') for all matches.

<strong>Changing them:</strong> element.textContent changes the text. element.innerHTML sets the HTML inside. element.style.color = 'red' changes a style. element.classList.add('active') adds a CSS class.

<strong>Creating new ones:</strong> document.createElement('div') makes a new element. parent.appendChild(newElement) puts it in the page.

<div class="inline-q"><span class="iq-label">Try this:</span> Open any website, press F12, go to the Console. Type: document.querySelector('h1').textContent = 'I changed this'. The heading changes — you're directly manipulating the DOM.</div>

When updating many elements at once, batch changes and update the DOM once rather than in separate operations. You'll understand why this matters more once your code is working with larger amounts of data.`,
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
        hint: `If JavaScript isn't finding an element, check these in order: is the id or class spelled correctly including capitalisation? Is the script running before the element exists in the DOM (put it at the bottom of body, or use DOMContentLoaded)? Is the selector correct?

<strong>Quick test:</strong> console.log(document.querySelector('#your-id')). If it logs null, the element isn't being found. That tells you which problem to fix.`,
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
        body: `JavaScript waits. It loads onto the page and sits there, doing nothing, until something happens. A click. A keypress. Text being typed. A form submitted. A timer running out. Those are events.

When an event happens, a function you've registered runs. That registration is an event listener:

<strong>element.addEventListener('click', function(event) {</strong>
<strong>  // this runs when the element is clicked</strong>
<strong>});</strong>

The first argument is the event type. The second is the function that handles it. That function receives an event object — it contains information about what happened: which key was pressed, what was typed, where the mouse was.

<div class="inline-q"><span class="iq-label">Think about this:</span> Every user interaction on every website is an event listener firing. The like button. The search input updating results. The dropdown opening. All of them are addEventListener calls waiting for the right moment.</div>

Common event types: <strong>click</strong>, <strong>keydown</strong>, <strong>input</strong> (fires as text changes), <strong>submit</strong> (form submitted), <strong>change</strong> (select or checkbox changed).

Remove listeners you no longer need. Ones that aren't cleaned up can slow pages and cause unexpected behaviour over time.`,
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
        hint: `If an event listener isn't firing: is it attached to the right element? Log the element first to confirm it's what you think it is. Is the event type spelled correctly? Try console.log('fired') as the first line inside the handler — if that doesn't appear, the listener isn't reaching the handler at all.

<strong>Common mistake:</strong> attaching the listener to the wrong element — a parent instead of the child, or the document instead of the button.`,
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
        body: `Every developer writes broken code. That's not a beginner problem — it's the nature of the work. The skill isn't avoiding errors. It's finding them faster.

JavaScript has three main error types. <strong>Syntax errors</strong>: the code can't be parsed — a missing bracket, a misspelled keyword. <strong>Reference errors</strong>: you're using a variable that doesn't exist. <strong>Type errors</strong>: you're trying to do something with a value that doesn't support it — calling a function on null, for instance.

Read the error message before doing anything else. It gives you the type, a description, and the file and line number where it was detected. The line number is where the problem was noticed — not always where it actually is.

<div class="inline-q"><span class="iq-label">The most useful habit:</span> Put console.log() before the line that's failing and log every value you're working with. Nine times out of ten the problem is immediately obvious when you can see the actual values instead of assuming what they are.</div>

try...catch lets you handle errors you expect might happen — network requests that fail, data in an unexpected format. Wrap the risky code in try, handle the failure in catch. Don't wrap everything — only what you genuinely expect might fail.`,
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
        hint: `When an error says something "is not a function", the thing you're calling isn't a function. It might be undefined (misspelled name), null, or a string. console.log it before calling it.

When the line number in the error seems wrong, the real error is usually a few lines earlier — the browser can only report where it noticed the problem, not where the bug is.

<strong>First step every time:</strong> console.log the values you're working with. Most bugs are visible the moment you can see the actual data.`,
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
        body: `The to-do list is the classic beginner project because it's not trivial. Done properly it touches everything from this floor: adding elements to the DOM, listening for events, managing state in an array, and persisting data with localStorage so it survives a page refresh.

The scaffold handles the structure. Your job is to wire it up.

Work in this order: get items adding to the list first. Then deletion. Then toggling completion. Then localStorage last — once the rest works, persistence is straightforward. Building in layers is how professionals approach unfamiliar code.

<div class="inline-q"><span class="iq-label">The test that matters:</span> When you're done, refresh the page. Do your items still appear? If yes, localStorage is working. If not, you're probably saving to it once instead of every time the list changes.</div>

If you finish and want to go further: add the ability to edit an item in place, sort by completion, or filter between active and completed. None of those require anything beyond what you've already learned.`,
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
        hint: `If items appear but deletion doesn't work: check that each item has a unique id and the delete button is referencing that exact id.

If localStorage isn't persisting: check that you're saving after every change, not just once. JSON.stringify() before saving, JSON.parse() when loading.

<strong>Debugging order:</strong> get one feature working completely before moving to the next. A partially working app with three broken features is harder to debug than three features completed one at a time.`,
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
        body: `No scaffold. A brief and a blank file.

Build something interactive that responds to user input. Ideas: a tip calculator that splits a bill, a character counter with a limit, a colour picker that outputs hex codes, a random quote generator, a quiz with a score. Anything that takes input and produces output.

The only rules: no scaffold, no copied templates. The HTML, CSS, and JavaScript are yours.

<div class="inline-q"><span class="iq-label">Before you write a line:</span> Write in plain language what the thing does. What does the user put in? What happens? What do they see? One or two sentences. If you can't describe it simply, the code will be harder than it needs to be.</div>

If you're blank on an idea: look at the last ten apps you used on your phone. Every one of them takes input and produces output. A calculator. A unit converter. A timer. Any of those, stripped to their simplest form, is this project.

It doesn't need to be impressive. It needs to be built.`,
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
        hint: `If you're blank on what to build: don't try to invent something. Build the simplest version of something you already use. A tip calculator. A countdown timer. A word counter.

HTML first, then JavaScript. Write all the inputs and outputs in HTML before writing a single line of JavaScript. Separating structure from behaviour makes both easier to think about.

<strong>Stuck halfway through?</strong> console.log the value of every variable at the point where things stop working. The problem will usually be visible immediately.`,
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
        body: `Before Floor 4, an honest check.

Not whether you finished the sections. Whether the ideas are actually in your hands.

Floor 4 has no guided building. You get a brief and produce working code. If the concepts from Floor 3 aren't solid — variables, functions, DOM manipulation, events — Floor 4 will be harder than it needs to be.

<div class="inline-q"><span class="iq-label">Three things to test now:</span> Open a blank file and write a function from memory. Write an event listener from memory. Write something that reads from and writes to the DOM without looking anything up. If those three come easily, you're ready.</div>

If they don't, go back to the sections that feel shaky. Not the whole floor — just those sections. One more pass through something you half-understood is worth more than pushing forward on unstable ground.

The quiz below will show you where the gaps are.`,
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
        hint: `Three things to test before deciding you're ready.

One: close this app, open a blank HTML file, and write a complete page with a JavaScript function that responds to a button click — no looking anything up.

Two: write an array of five objects and use .filter() to return only the ones matching a condition.

Three: explain out loud what the DOM is and how JavaScript changes it.

If any of those are hard, go back to that section. Not the whole floor.`,
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
        body: `At some point your code won't work and you won't know why. That happens to everyone. What matters is what you do next.

Make the problem smaller. Not clearer — smaller. Find the least amount of code that still breaks, and fix that. Everything else follows from that instinct.

The first working version doesn't need to be clean. Get it working first, then improve it. In that order. Always.

There's a technique called rubber duck debugging. You explain your code out loud, line by line, to something that can't respond. Saying it aloud forces you to hear what the code actually does — not what you think it does. The mistake usually surfaces before you finish.

<div class="inline-q"><span class="iq-label">Think about this:</span> The last time you got stuck on something — anything, not just code — what was the smallest part of it you could have isolated? What would have changed if you'd started there?</div>

Error messages tell you four things: what kind of error, what went wrong, which file, which line. Read them before you search. The line number is where the problem was noticed — not always where it actually is.`,
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
        hint: `Stuck and don't know why the code isn't working? That's the normal state of development — not a sign you're doing it wrong.

Explain the code out loud, line by line. What is it actually doing? Not what you think it's doing — what does it literally say? The bug usually surfaces during that explanation.

<strong>Then:</strong> add console.log() at the line before the problem and log every value. Most bugs become visible immediately when you can see the actual data.`,
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
        body: `Nobody reads documentation start to finish. That's not what it's for.

Documentation is a reference. You go to it when you need to know something specific — what arguments a function takes, what it returns, what happens when something fails. You don't need to understand everything on a page. You need the one part that answers your question.

MDN Web Docs is the authoritative reference for web development. When a blog post and MDN disagree, go with MDN. It's maintained by browser vendors and reflects how things actually work.

The pattern for reading a doc page: find the function you need. Read the syntax. Read the parameters. Look at the examples — working examples are usually faster to understand than descriptions. Check the return value.

<div class="inline-q"><span class="iq-label">Try this:</span> Search "MDN Array filter". Open the result. Find the syntax, the parameters, and one example. Practice reading it as a reference — extract the specific thing you need and move on.</div>

If a doc page makes no sense, you're probably missing a prerequisite. Don't fight through it — find the prerequisite first. Documentation assumes context.`,
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
        hint: `Documentation is written for people who already understand the basics. If a page makes no sense, you're missing context — not intelligence.

The fastest way to use docs: go straight to the examples. A working example usually explains the concept faster than the description does.

<strong>MDN pattern:</strong> search "MDN" + the thing you're looking for. Find the syntax section. Find an example. Apply it. Look up the details if something doesn't work as expected.`,
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
        body: `Most software doesn't build everything itself. Uber doesn't build maps. Spotify doesn't build payment processing. Airbnb doesn't build email delivery. They use APIs — interfaces that let one system talk to another without knowing how the other system works internally.

An API is a defined way of asking another system for something or sending it something. You make a request. It responds. The response is usually JSON — structured data your code can read and work with.

Every major platform exposes an API: GitHub, Google Maps, OpenWeatherMap, Stripe. Some are free. Some require payment. All of them require an API key — a credential that identifies your application and controls your access.

<div class="inline-q"><span class="iq-label">Think about this:</span> The next time you use an app that shows data from another service — a weather widget, a map embed, a payment form — that's an API call happening in the background. One system asking another for something.</div>

Read the documentation before writing any code. The documentation is the contract. It tells you exactly what you can ask for, how to ask for it, and what you'll get back. Guessing wastes more time than reading.`,
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
        hint: `Getting an error status code and don't know what it means? Search "HTTP [code]" — 404 means not found, 401 means unauthorised, 422 means the data you sent is invalid, 500 means the server failed.

Always check the API documentation for the exact format of the request — what headers it needs, what parameters it expects, what the response looks like.

<strong>Before writing code:</strong> paste the API URL into your browser. If it returns data you can read, the URL is correct. If it errors, fix the URL before writing any fetch calls.`,
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
        body: `When you search GitHub and results appear without the page reloading, that's fetch() making API calls as you type.

fetch() sends an HTTP request from JavaScript and returns a Promise — a placeholder for data that hasn't arrived yet. Because network requests take time, JavaScript doesn't wait. It registers what to do when the response arrives and moves on. That's asynchronous code.

async/await is the readable way to write it:

<strong>const response = await fetch(url);</strong>
<strong>const data = await response.json();</strong>

The await keyword pauses that line until the Promise resolves. The function must be marked async. The data comes back as JSON, which you convert with .json().

<div class="inline-q"><span class="iq-label">Watch out:</span> You need two awaits. One for the network request. One to convert the response to JSON. Missing the second one is the most common fetch bug — you get a Response object when you expected the actual data.</div>

Always wrap fetch calls in try...catch. Networks fail. APIs go down. Servers return errors. Code that doesn't handle those cases breaks in ways that confuse users without telling you what went wrong.`,
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
        hint: `Getting undefined or a Promise object instead of data? Add console.log() immediately after each await line. If you see [object Promise], you're missing an await somewhere.

Two awaits, always. One for the request. One for .json().

<strong>Check the Network tab</strong> in DevTools when a fetch isn't working. It shows every request, its status code, and the full response. If the request isn't appearing at all, the code never ran. If it appears with a 4xx or 5xx status, the API is returning an error — read the response body.`,
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
        body: `localStorage saves data in the browser that survives a page refresh. Close the tab, come back tomorrow — it's still there. That's how draft articles are still around when you accidentally close a tab, why shopping carts don't empty when you navigate away.

The API: localStorage.setItem('key', value) to save. localStorage.getItem('key') to retrieve. localStorage.removeItem('key') to delete.

One thing to know: localStorage only stores strings. Saving an object or array requires converting it first:

<strong>localStorage.setItem('user', JSON.stringify({ name: 'Alex', score: 42 }));</strong>
<strong>const user = JSON.parse(localStorage.getItem('user'));</strong>

<div class="inline-q"><span class="iq-label">Try this:</span> Open DevTools (F12) and go to Application &gt; Local Storage. You can see everything stored for this site, edit values directly, and delete keys. It's the fastest way to debug storage issues.</div>

localStorage is not secure storage. Don't put sensitive data — passwords, tokens, personal information — in localStorage. It's accessible to any JavaScript running on the page.`,
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
        hint: `Data disappearing on refresh even though you're using localStorage? Open DevTools &gt; Application &gt; Local Storage. You can see exactly what's stored and with what keys.

Most common mistake: forgetting JSON.stringify() when saving objects and JSON.parse() when loading them. Without those, you save "[object Object]" and get the string back — not the data.

<strong>Check the key name.</strong> localStorage.getItem('User') and localStorage.getItem('user') are different keys. Capitalisation matters.`,
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
        body: `Something will go wrong. A network request will fail. An API will return unexpected data. A user will do something you didn't anticipate. The question isn't whether errors happen — it's whether your code handles them gracefully or silently breaks and confuses the user.

try/catch is how you handle expected failures:

<strong>try {</strong>
<strong>  const data = await fetchUserData();</strong>
<strong>  displayUser(data);</strong>
<strong>} catch (error) {</strong>
<strong>  showMessage('Could not load. Try again.');</strong>
<strong>  console.error(error);</strong>
<strong>}</strong>

Wrap the risky code in try. Handle the failure in catch. Give the user a useful message. Log the error so you can see it.

<div class="inline-q"><span class="iq-label">Think about this:</span> Don't wrap everything in try...catch — only what can genuinely fail for reasons outside your control. Network requests. JSON parsing. External APIs. Wrapping everything hides real bugs by catching errors that should propagate.</div>

Error handling at the edges of your system — API calls, user input, external data — protects the interior. Interior code that works with already-validated data doesn't need wrapping.`,
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
        hint: `Not sure where to add error handling? Find every place you access data that came from outside your code — API responses, user input, localStorage. Those are the boundaries. Everything that crosses a boundary should be wrapped.

Interior code — functions that receive validated data from your own code — usually doesn't need try...catch.

<strong>Always log the error</strong> in the catch block, even if you're showing a friendly message to the user. console.error(error) gives you the stack trace. Without it, you'll have no idea what went wrong.`,
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
        body: `Git is how you don't lose work. Every professional developer uses it every day. If it's not committed, it's one accident away from being gone.

The core workflow: make changes. Stage what you want to include: <strong>git add filename</strong>. Commit with a message explaining what changed and why: <strong>git commit -m "add user authentication"</strong>. Push to a remote when ready: <strong>git push</strong>.

That's 90% of daily Git usage.

Branches let you work on something new without affecting what's already working. Create a branch, make changes, merge it back when it's ready. This is how every team works — main stays stable, new work happens in branches.

<div class="inline-q"><span class="iq-label">The habit that matters:</span> Commit often. Small commits with clear messages are easier to understand, easier to review, and easier to undo when something goes wrong. "Fixed everything" is not a commit message.</div>

git log shows every commit in the history. git diff shows what's changed since the last commit. Those two commands will answer most of your questions when something breaks.`,
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
        hint: `Made a commit with a mistake and want to undo it? If it's not pushed yet, git reset HEAD~1 moves the commit back to staged changes. Fix the mistake and commit again.

If it's already pushed, create a new commit that reverses it — don't rewrite shared history.

<strong>Commit message rule:</strong> write it as a short instruction. "Add login form", "Fix cart total calculation", "Remove unused import". If you can't describe the change in one short sentence, the commit is probably too large.`,
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
        body: `Debugging is a process. Changing things randomly and hoping something improves isn't debugging — it's guessing. Guessing wastes time and introduces new problems.

The process: reproduce the bug reliably first. If you can't reproduce it consistently, you can't know when you've fixed it. Isolate it — remove everything unrelated until you have the smallest version that still breaks. Fix it. Understand why the fix works. If you don't understand why, you haven't really fixed it.

The tools: console.log() is still the fastest way to see what's happening. Log every value before the broken line. The Network tab shows every API call and its response. The Sources tab lets you set breakpoints and step through code line by line.

<div class="inline-q"><span class="iq-label">Before you change anything:</span> Write down what you think the bug is and what you think causes it. Being wrong about your hypothesis is useful — it tells you something about your mental model that needs adjusting.</div>

The most expensive habit: changing multiple things at once. Change one thing. Test. Change another. Test. If you change three things and the bug disappears, you don't know which one fixed it.`,
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
        hint: `Broken but can't find where? Add console.log('reached here', variableName) at key points in the code. Run it and watch the console. The last log that appears before the error tells you roughly where the problem is.

<strong>Then narrow it down:</strong> add more logs between the last working point and the first broken point. The bug will be in that gap.

For API bugs specifically: open the Network tab in DevTools. Click the request. Check the status code and the response body. The API is usually telling you exactly what went wrong.`,
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
        body: `This is your first application using a real external API. The OpenWeatherMap API is free, requires registration for a key, and is well-documented.

The scaffold connects to the API and displays current weather for a searched city. Your job: wire it up completely, handle the cases where things go wrong — city not found, network error, empty search — and add at least one feature that isn't in the scaffold.

Work in this order: get a successful API response and log it to the console first. Once you can see the data, build the display. Once the display works, add error handling. The extra feature comes last.

<div class="inline-q"><span class="iq-label">Before you start:</span> Open the Network tab in DevTools while the app is running. Find the API request. Look at the response. Understanding the shape of the data before trying to display it saves significant time.</div>

The extra feature doesn't need to be complex — a five-day forecast, a Celsius/Fahrenheit toggle, or a list of recently searched cities are all straightforward with the data you already have. Pick one and build it completely.`,
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
        hint: `App isn't showing data and you can't tell if it's the API call or the display code? Check them separately. Open the Network tab and run the app. Find the API request. If the request is failing, fix the API call. If the request is succeeding, the data is there — log the response and check its shape before trying to display it.

<strong>Most common mistake:</strong> trying to access a property that doesn't exist in the response. Log the full response object first and check exactly what fields are available.`,
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
        body: `A quiz app has more moving parts than it looks like. It has state — the current question, the score, whether the user has already answered. It has multiple UI states — showing a question, showing feedback, showing the final score. Getting those transitions right is the actual challenge.

Think about state before you write any code. What does the app need to remember at each point? Write it out: the questions array, the current index, the score, whether the current question is answered. Those are your state variables. Everything else responds to changes in them.

<div class="inline-q"><span class="iq-label">Common mistake:</span> letting the user answer the same question twice. Once an answer is selected, disable the other options immediately. Handle this in the event listener before doing anything else.</div>

If transition timing feels wrong — feedback disappears too fast, or the next question appears before the user can read the result — add a "Next" button that appears after feedback is shown and advances on click. That gives the user control over when to move forward.`,
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
        hint: `Quiz advancing before the user can read the feedback? Add a "Next" button that appears after an answer is selected rather than using a setTimeout delay. It gives the user control and makes the flow more reliable.

Score not tracking correctly? Log the score variable every time it should change. If the log shows the right value but the display doesn't, the display function isn't reading the variable correctly. If the log is wrong, the logic updating the score has a bug.

<strong>State first.</strong> Get the state management right before building the display. A quiz with correct state and broken display is easier to fix than one with broken state.`,
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
        body: `No brief. No scaffold. One requirement: build something that uses a real external API.

It must make at least one fetch request and display real data. The idea, the design, and the implementation are yours.

Find a free API first. Public APIs with no authentication or simple key-based auth are the starting point — weather, quotes, country data, dictionaries, currency rates. Don't choose an API with complex OAuth authentication for a first solo project. The complexity should be in the build, not the auth setup.

<div class="inline-q"><span class="iq-label">Before you write anything:</span> Test the API endpoint directly in your browser. If it returns readable data, you can work with it. If you get an error, figure out why before writing any code. Starting with a working API call saves hours.</div>

When you're stuck: the problem is almost always the API call (wrong URL, wrong key, wrong parameters) or the data shape (accessing a property that doesn't exist). Log the raw response before doing anything with it.

Ship something that works over something ambitious that doesn't.`,
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
        hint: `Have an idea but can't get the API to return data? Test the URL directly in your browser before writing any JavaScript. If it returns data there, the URL is correct and the issue is in your code. If it doesn't, fix the URL first.

<strong>API key issues:</strong> check that the key is in the right place in the URL or headers — the documentation will tell you exactly where. Check that the key is active (some require email verification).

Log the full response before trying to use the data: console.log(data). See exactly what came back before assuming what structure it has.`,
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
        body: `Look at every project you've built on this floor as if someone else wrote it.

That's harder than it sounds. You know what you meant. The code makes sense to you because you wrote it. A review requires reading what's actually there — not what you intended.

Ask these questions for each piece: Does this function do one thing or several? Would someone who didn't write it understand what it does from the name alone? Are there variables named x, temp, or data that could be more specific? Is there duplicated logic that could be a function?

<div class="inline-q"><span class="iq-label">The test:</span> Read the code out loud. Literally say it. Awkward or verbose code usually reveals itself when you hear it spoken. If a variable name takes more than a few words to explain aloud, it needs a better name.</div>

You don't need to refactor everything. Find the two or three things that would make the code clearest and do those. Readability isn't a nice-to-have — it's what makes code maintainable six months from now when you've forgotten exactly what it was supposed to do.`,
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
        hint: `Looking at your own code and everything seems fine? Leave it for 48 hours. Come back and read it as if a colleague wrote it. Things that seemed obvious will start to look ambiguous. That's normal — distance reveals what familiarity hides.

<strong>Questions to ask:</strong> Does every function have a name that says what it does? Does every variable name make sense without context? Is there any code that does the same thing in two places?

Fix the names first. Good names make the logic easier to read without changing how it works.`,
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
        body: `When you double-tap a photo on Instagram, three separate systems fire in under half a second. The animation in the browser. A server recording the like. A database storing it so it's there when you come back tomorrow. You built the browser layer in the first four floors. This floor is the other two.

Frontend is HTML, CSS, and JavaScript running in your browser — on your device. Backend is code running on a server somewhere, handling requests, making decisions, talking to a database.

The split exists for a reason. You don't want your database accessible directly from a browser — that would mean anyone could query it. The server sits between them. It receives requests, validates them, queries the database, and sends back only what the frontend is allowed to see.

<div class="inline-q"><span class="iq-label">Think about this:</span> Pick any feature of an app you use daily. Ask three questions: does this run in the browser, on a server, or in a database? Most features touch all three. Being able to answer that question for any feature is what full stack actually means.</div>

The skills from the first four floors stay. You're adding a layer underneath them.`,
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
        hint: `Confused about which layer handles what? Take any feature and ask three questions: does this run in the browser (frontend), on a server (backend), or in a database?

The browser handles display and interaction. The server handles logic, validation, and security. The database handles persistence — data that outlasts any individual request.

<strong>Most problems in full stack</strong> come from confusing which layer should own a responsibility. When something breaks, asking "which layer is this" points you to where to look.`,
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
        body: `A server is a computer that does nothing but wait for requests and respond to them. No screen. No keyboard. It runs continuously, receiving messages from browsers and sending responses back.

The request arrives with three things: a method (GET, POST, PUT, DELETE), a path (/users, /posts/42), and sometimes a body of data. The server reads those and decides what to do. That decision — written in code — is your route handler.

Every URL you've ever typed was a GET request to a server. Every form you've submitted was a POST. Every delete button that works without reloading sent a DELETE or POST from JavaScript. HTTP is just messages.

<div class="inline-q"><span class="iq-label">Think about this:</span> When you search something on a website, what GET request do you think the browser is sending? What path? What query parameters? What does the server probably do with that request before returning results?</div>

The response comes back with a status code (200 OK, 404 Not Found, 500 Server Error), headers, and a body — usually JSON. Your frontend reads that and decides what to display.`,
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
        hint: `Building a route but the request isn't reaching your handler? Add console.log('Route hit') as the very first line. If it doesn't appear in the server logs, the request never reached that route — check the method and path match exactly. If it does appear, the problem is inside the handler.

<strong>Check the method.</strong> A POST request won't match a GET route. A route at /user won't match a request to /users. Exact match, exact method.`,
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
        body: `Close your browser. Shut down the server. Restart everything. Every message you've sent, every photo you've uploaded, every account you follow — still there. That's the database. Everything that needs to outlast a request lives there.

Two main kinds: relational databases (PostgreSQL, MySQL, SQLite) store data in tables — rows and columns, linked by relationships. A users table and a posts table, each post linked to a user. SQL is the language you use to query them. Non-relational databases (MongoDB) store documents — flexible, JSON-like objects without a rigid schema.

For most applications, start with a relational database. The structure it forces you into is usually a feature, not a constraint.

<div class="inline-q"><span class="iq-label">Before you write any code:</span> design the data first. What needs to be stored? What relationships exist between things? Sketch the tables and their connections. The database schema is the foundation — everything else is built on top of it.</div>

SQL is not difficult. The four operations you'll use constantly: SELECT (read), INSERT (create), UPDATE (change), DELETE (remove). Everything else is a variation on those four.`,
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
        hint: `Query returning wrong or unexpected results? Run it directly in the database tool first — pgAdmin for PostgreSQL, Compass for MongoDB. If the query is wrong there, fix it there before touching the application code.

If the query works in the tool but fails in the app, the issue is how you're passing parameters. Check that the values are the right type and in the right order.

<strong>Always test queries</strong> in isolation before calling them from routes. It separates "is my SQL right" from "is my route right".`,
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
        body: `Authentication is proving who you are. Authorisation is proving what you're allowed to do. Those are different things and confusing them causes security problems.

The standard pattern: a user registers with an email and password. The password is hashed — converted by a one-way function into something unrecognisable — before it's stored. When they log in, the submitted password is hashed the same way and compared to the stored hash. If they match, the user is who they say they are.

The server then issues a JWT (JSON Web Token) that the browser stores and sends with every subsequent request. The token proves the user is authenticated without them logging in every time.

<div class="inline-q"><span class="iq-label">Important:</span> Never store plain text passwords. If your database is ever compromised and passwords are plain text, every user is exposed. Hash with bcrypt. The hash cannot be reversed back to the original password. This is not optional.</div>

Authorisation comes after authentication. Once you know who someone is, you check what they're allowed to do. That check is usually middleware — code that runs before the route handler and either allows or rejects the request.`,
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
        hint: `Users getting logged out unexpectedly? Decode your JWT at jwt.io and check the exp field. If the token is expired, increase the expiration time or implement refresh tokens.

If tokens work but users are accessing data they shouldn't, the authorisation check is missing or incomplete. Every query that returns user-specific data should filter by the authenticated user's ID.

<strong>Checklist:</strong> password hashed before storing, JWT signed with a secret from environment variables, protected routes check for valid token, queries filter by user ID.`,
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
        body: `Node.js runs JavaScript on the server. The language you've been writing in the browser runs outside it — with access to the filesystem, the network, and the ability to listen for HTTP connections.

Express is the most common framework for Node servers. It gives you routing, middleware, and request/response handling.

The pattern for every route:

<strong>app.get('/users', (req, res) =&gt; {</strong>
<strong>  res.json({ users: [] });</strong>
<strong>});</strong>

The handler receives the request (req) and response (res). Every route follows that pattern — the method, the path, and a function that does the work.

<div class="inline-q"><span class="iq-label">Try this:</span> Build the smallest possible Express server — one route, one response. Run it locally and request it from your browser. Once you can see the response, the fundamentals are clear. Everything else is adding routes and logic on top of that.</div>

Middleware runs before your route handlers. Middleware for logging, for parsing JSON request bodies, for auth checks. You register it with app.use() and it runs in order for every request — or for specific routes if you need it to.`,
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
        hint: `Route not receiving the data you're sending from the frontend? Add console.log('Body:', req.body) at the top of the handler. If req.body is undefined, you're missing express.json() middleware — add app.use(express.json()) before your routes.

If req.body appears but the values are wrong, check how the frontend is sending the data — is it sending JSON with the right Content-Type header?

<strong>Start minimal:</strong> one working route before building anything else. Confirm the server starts, confirm a request reaches the handler, confirm the response reaches the browser. Then build.`,
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
        body: `Your server and database are separate systems. The connection between them is managed by a client library — pg or Prisma for PostgreSQL, Mongoose for MongoDB. The library handles the connection, translates your code into database queries, and returns results.

The connection is usually a pool — multiple open connections ready to handle simultaneous requests. You set it up once when the server starts and reuse it for every query.

The single most important practice: use parameterised queries.

<strong>pool.query('SELECT * FROM users WHERE id = $1', [userId])</strong>

The $1 is a placeholder. The actual value is passed separately. This prevents SQL injection — one of the most damaging vulnerabilities in web applications. Never build queries by joining strings directly.

<div class="inline-q"><span class="iq-label">Think about this:</span> Keep database functions separate from route handlers. Routes should be thin — receive a request, call a function, send a response. The database logic lives in its own file. Separating them makes both easier to test and easier to debug.</div>

Test database functions in isolation before wiring them into routes. Write a function, call it directly, log the result. Once that works, connect it to the route.`,
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
        hint: `Database queries working in isolation but failing from routes? Test each database function separately with a small script first. If the function works there, the bug is in how the route calls it or handles the result.

<strong>Parameterised queries every time.</strong> No string concatenation. No template literals with user input. Only parameterised placeholders.

Connection failing? Check the DATABASE_URL format against the library documentation — it's usually postgres://user:password@host:port/dbname. A single typo breaks it.`,
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
        body: `A REST API is a set of HTTP endpoints that expose your data in a predictable, consistent way. RESTful conventions make APIs readable: GET retrieves, POST creates, PUT or PATCH updates, DELETE removes. The path describes the resource.

GET /notes — all notes
GET /notes/42 — one note
POST /notes — create a note
PUT /notes/42 — update that note
DELETE /notes/42 — delete it

That pattern, applied consistently, means anyone familiar with REST can understand your API without reading documentation.

Status codes matter: 200 for success, 201 for created, 400 for bad request (the client sent something wrong), 404 for not found, 401 for unauthorised, 500 for server error. Return the code that reflects what actually happened.

<div class="inline-q"><span class="iq-label">Before writing any route:</span> define the contract. Method, path, what the request body contains, what the response looks like. Write it in a comment. A route with a clear contract is much easier to implement than one you're figuring out as you go.</div>

Always validate request data before using it. If a route expects a userId and the request doesn't include one, return 400 immediately. Don't let invalid data reach your database.`,
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
        hint: `API returning data but the frontend is having trouble using it? Open the Network tab and look at the actual response the server sent. Compare the structure to what the frontend expects. The mismatch is usually visible immediately.

<strong>Status codes matter.</strong> If a route returns 200 but the operation failed, the frontend won't know to show an error. Return the code that reflects what actually happened.

Test routes with a tool like Postman or Insomnia before connecting the frontend. Confirm they return exactly what you expect before adding display logic.`,
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
        body: `Database passwords, API keys, JWT secrets — none of these belong in your code. Code gets shared. Code gets committed to repositories. A secret in your code is a secret that will leak.

Environment variables store configuration outside the code. On your machine, a .env file holds them. In production, the platform's settings hold them. Your code reads them at runtime — process.env.DATABASE_URL — without ever containing the actual value.

The .env file must be in your .gitignore before you ever commit. Before pushing anything, confirm it's there. If you commit the file by mistake, the secret is in the git history — even if you delete the file later, the history still contains it.

<div class="inline-q"><span class="iq-label">If you've already committed secrets:</span> revoke and regenerate the credentials immediately. Rotate everything exposed. Then fix the history. Assume the secret is already compromised. This happens at every level — the important thing is acting immediately.</div>

Create a .env.example file with the same keys but empty values and commit that. It documents what variables the project needs without exposing what they contain.`,
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
        hint: `Accidentally committed a secret to a public repository? Act immediately: revoke the credential, generate a new one, update it in your environment variables and any deployment platforms. Then address the git history.

To prevent it: add .env to .gitignore before your first commit. Run git status before every commit and check that .env doesn't appear.

<strong>Create .env.example</strong> with keys but no values — DATABASE_URL=, JWT_SECRET=, API_KEY=. Commit that. It documents what the project needs without exposing anything.`,
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
        body: `Deployment means putting your application on a server anyone on the internet can reach. Until you deploy, only you can use what you've built.

For Node/Express backends: Railway, Render, and Fly.io handle the infrastructure — you push code and they run it. For databases: Supabase and PlanetScale provide hosted databases that connect to your deployed backend.

The process: push code to GitHub. Connect the platform to the repository. Set environment variables in the platform's dashboard. Deploy. The platform installs dependencies and starts the server.

<div class="inline-q"><span class="iq-label">When things break after deployment:</span> check the logs first. Every platform provides build and runtime logs. Most deployment failures are a missing environment variable, a dependency issue, or code that assumes something about the local environment that doesn't hold in production.</div>

"Works locally, broken in production" is the most common deployment problem. The cause is almost always environment difference — something on your machine that isn't replicated in production. The logs will usually point directly to it.`,
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
        hint: `App works locally but fails after deployment? Check the deployment logs first — the platform will show exactly where the build or startup failed.

Most common causes: a missing environment variable (DATABASE_URL not set in the platform dashboard), a dependency that's in devDependencies instead of dependencies, or a file path that works on your machine but not on the deployment server.

<strong>Check environment variables first.</strong> It's the cause of the majority of deployment failures. Every value in your .env file needs to be set in the platform's environment settings.`,
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
        body: `The frontend and backend are separate systems. They communicate over HTTP — the frontend makes fetch requests, the backend receives them, processes them, and sends responses. The frontend reads the response and updates the UI.

The practical issue that appears immediately: CORS. Browsers block requests to a different origin by default — a different domain, a different port. Your frontend at localhost:3000 making a request to localhost:4000 will be blocked unless the backend explicitly allows it.

On the Express backend: install the cors package and add app.use(cors()). In production, configure it to allow only your frontend's domain specifically.

<div class="inline-q"><span class="iq-label">When debugging connection issues:</span> open the Network tab in DevTools. Find the request. Check the status code and the response body. If the request isn't appearing, the fetch call isn't running. If it's a CORS error, fix the backend configuration first — no amount of frontend changes will fix a CORS problem.</div>

Use environment variables for the backend URL in the frontend too — localhost in development, the deployed URL in production. Don't hardcode URLs in either direction.`,
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
        hint: `Fetch request blocked by CORS? Look at the browser console error — it says exactly which origin is blocked and what's missing. The fix is always on the server side, not the frontend.

Add cors() middleware to the Express backend before your routes. In production, configure it to allow only your frontend's exact domain.

<strong>CORS is a browser security feature.</strong> It doesn't affect server-to-server requests — only browser-to-server requests from a different origin. Testing with Postman will work even without CORS configured, which is why it seems to work in testing but fail in the browser.`,
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
        body: `Your first complete full stack project: a frontend, a backend, a database, deployed and accessible to anyone. Not a tutorial to follow — a system to build by connecting the pieces from this floor.

The scaffold defines the structure. Your job is the implementation.

The backend needs four endpoints: GET all notes, POST a new note, PUT to update one, DELETE to remove one. The database needs a notes table. The frontend fetches from those endpoints, displays results, and sends user actions as requests.

<div class="inline-q"><span class="iq-label">Build in this order:</span> database schema first. Then backend endpoints, tested directly before the frontend touches them. Then the frontend. Deploy last. Building everything simultaneously makes it impossible to know what's broken.</div>

If something isn't working, check the Network tab to see what the frontend is actually sending, and the server logs to see what the backend is receiving. The gap between those two is usually where the problem is.

Once the basic version works, add at least one feature that's not in the scaffold — sorting notes, character limits, timestamps. The decision is yours.`,
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
        hint: `Frontend and backend both working independently but not communicating? Check the Network tab in DevTools. Find the request your frontend is making. Look at the URL — is it pointing to the right port? Is the method correct? Is the request body being sent?

Then check the server logs. Is the request appearing? If yes, the issue is in the handler. If no, the request isn't reaching the server at all.

<strong>Build the backend first.</strong> Test every endpoint with Postman before writing a single line of frontend code. A backend you've confirmed works is much easier to connect to the frontend than one you're debugging simultaneously.`,
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
        body: `Adding authentication means building the full flow: register, login, protected routes on the backend, and token management on the frontend.

Backend flow: a /register endpoint that hashes the password and creates a user. A /login endpoint that verifies credentials and returns a JWT. Middleware that checks for the token on protected routes. Each notes endpoint updated to only return and modify notes belonging to the authenticated user.

Frontend flow: a login form that stores the returned JWT. Every subsequent request to the backend includes that token in the Authorization header.

<div class="inline-q"><span class="iq-label">The most important thing to verify:</span> can one user see another user's notes? If yes, the query is missing a user_id filter. Every query that returns notes needs WHERE user_id = $1, with the authenticated user's ID as the parameter. No exceptions.</div>

Test each piece in order: register works, login returns a token, a protected route rejects a request with no token, a protected route accepts a valid one. Then wire in the notes endpoints. Don't connect pieces until the previous piece is confirmed working.`,
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
        hint: `Users seeing each other's notes? Check every database query that returns notes — does each one have WHERE user_id = $1? If not, add it.

Auth middleware not blocking unauthorised requests? Log the token in the middleware before verifying it. If it's undefined, the frontend isn't sending the Authorization header correctly. If it's there but verification fails, check the JWT_SECRET in the environment variables.

<strong>Test authorisation specifically:</strong> log in as user A, get the token, try to fetch user B's notes using that token. If you can see them, the authorisation is broken.`,
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
        body: `Deploy the complete authenticated notes application. Not a test — a real deployed application with real authentication and real data persistence.

Backend to Railway or Render: push to GitHub, connect the repository, set the environment variables (DATABASE_URL, JWT_SECRET, and CORS_ORIGIN pointing at your frontend URL). Deploy.

Frontend to Netlify or Vercel: update the backend URL environment variable to point at the deployed backend, not localhost. If the frontend calls localhost in production, it won't find the server.

<div class="inline-q"><span class="iq-label">The check that matters:</span> register a new account from the deployed URL. Log in. Create a note. Refresh the page. Is the note still there? If yes, the database, authentication, and frontend are all connected and working. That's a deployed full stack application.</div>

If the database isn't persisting data between deployments, the production DATABASE_URL is probably pointing at a local or ephemeral database. Confirm it points to Supabase or another hosted database, not a file-based SQLite that gets wiped on redeploy.`,
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
        hint: `App deployed but database changes not persisting? Check that your production DATABASE_URL points to the hosted database — Supabase, PlanetScale, or similar. If it's pointing at localhost or a local file, it's connecting to a database that doesn't exist in production.

Frontend deployed but still calling localhost? Check the environment variable for the backend URL. It needs to be the deployed backend URL in production, not localhost:3000.

<strong>The full check:</strong> register → login → create data → refresh → data still there. If that sequence works, the deployment is correct.`,
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
        body: `Design and build a full stack application from scratch. No scaffold, no starter code. Yours completely.

The structural requirements: a frontend, a backend with at least four endpoints, a database with at least two tables, and deployment to a live URL. What you build within those constraints is your decision.

Start with the data. Before writing any code, design the schema: what tables do you need, what columns, what relationships. The schema tells you what the API needs to expose, which tells you what the frontend needs to display. Getting the data model right first means the rest follows naturally.

<div class="inline-q"><span class="iq-label">If the scope feels too large:</span> build the smallest version that meets the requirements and deploy it. A working simple app is more valuable than an ambitious one that doesn't run. Add features after the foundation is live, not before.</div>

This is the project that belongs in a portfolio — not because of its complexity, but because every decision in it is yours. The data model. The API design. The interface. That's the work of a developer.`,
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
        hint: `Project feels too big to start? Write the database schema first — just the CREATE TABLE statements. No code, no server, no frontend. When the tables and their relationships make sense, the rest of the architecture follows from them.

<strong>Then:</strong> build one endpoint and confirm it works. Build one frontend interaction connected to that endpoint. Confirm it works end to end. Then add the next piece.

A working application with one feature is more valuable than a complex application that doesn't run. Ship the simple version first.`,
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
        body: `The skills you have now — HTML, CSS, JavaScript, backend, databases — are general-purpose. They're the foundation of everything. What you specialise in from here is a real choice, not a curriculum decision.

Frontend, backend, full stack, mobile, DevOps, data, security — these aren't just different job titles. They're different problems, different mindsets, different things you'll spend your days thinking about. The right choice isn't whichever pays the most or sounds most impressive. It's which problems you find genuinely interesting. That interest is what sustains the work when it's difficult.

<div class="inline-q"><span class="iq-label">Think about this:</span> In the projects you've built so far, which parts did you spend extra time on — not because you had to, but because you wanted to get them right? The UI and interactions? The API design? The deployment? That's a signal worth paying attention to.</div>

You don't have to decide permanently now. Most developers move between areas in the first few years. But picking a direction — even temporarily — is more useful than staying deliberately undefined. It focuses your learning and makes you legible to employers.`,
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
        hint: `Not sure which path to choose? The question isn't which is objectively best — it's which problems you find genuinely interesting.

Frontend engineers care about how things feel and behave in the browser. Backend engineers care about reliability, data, and systems. DevOps engineers care about how code gets from a developer's machine to production reliably.

<strong>Look at the projects you've built.</strong> Which parts did you revisit even after they were working? That's the direction.`,
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
        body: `The browser is a hostile environment. Frontend code runs on hardware you don't control, in browsers you can't predict, on network connections that fail unpredictably. Frontend engineering is the work of making things feel fast, correct, and consistent in those conditions.

The skills that define the specialisation: understanding how the browser renders and what makes it slow, state management (keeping complex UIs consistent as data changes), accessibility (building for users who interact differently), and performance (measuring and improving how fast something feels).

React dominates the ecosystem. Vue and Angular have significant footprints. The framework matters less than understanding the problems they solve — component architecture, reactivity, data flow. A developer who understands those concepts can learn any framework.

<div class="inline-q"><span class="iq-label">Try this:</span> Open any website you use and run a Lighthouse audit in DevTools. Look at the performance and accessibility scores. You'll see immediately whether the frontend engineers were thinking about those things. The gap between what exists and what's possible is the job.</div>

CSS has become genuinely powerful — modern layout, animations, custom properties, container queries. Frontend engineers who only know the basics are leaving a significant part of the job undone.`,
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
        hint: `Frontend is not just making things look good — it's managing the gap between what designs show and what the browser actually renders, across devices, network conditions, and accessibility needs.

The skills worth going deep on: React (state, effects, performance), CSS beyond the basics (Grid, custom properties, animations), browser DevTools (Performance, Accessibility, Network tabs).

<strong>The test of frontend understanding:</strong> can you explain why a layout looks different on Safari vs Chrome? Can you fix a component that re-renders too often? Can you make a page usable without a mouse?`,
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
        body: `Backend engineering is the work of systems users never see. The API processing payments, the service delivering video streams, the pipeline moving data between systems. The user sees the result. The backend engineer owns what's underneath.

The defining characteristic: reliability. A backend bug can silently corrupt data, lose requests, or expose sensitive information at scale — affecting thousands of users before anyone notices. The discipline is building systems that don't fail, and knowing what to do when they do.

The skills that define the specialisation: API design that other systems can depend on, database modelling and query optimisation, understanding how multiple services coordinate, and observability — knowing what's happening in a system you can't directly see.

<div class="inline-q"><span class="iq-label">Think about this:</span> When an application you use goes down, what do you think happened? A database connection failed? A service ran out of memory? A deployment went wrong? Being able to reason through those scenarios is the backend engineering mindset.</div>

Scale changes everything. Code that works for 100 users can fail badly for 10,000. Backend engineers think about that asymmetry constantly — not to over-engineer for scale that doesn't exist yet, but to avoid decisions that make it impossible to scale later.`,
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
        hint: `Backend work punishes assumptions. Every input is potentially malformed or malicious. Every external service can go down. Every database query can fail.

The discipline is defensive programming: validate inputs at every boundary, handle failures explicitly, never assume the data is what you expect.

<strong>The backend mindset:</strong> before writing any code, ask what happens when this fails. What happens if the database is slow? What happens if the external API returns an error? What happens if the user sends unexpected input? The answers to those questions are your error handling.`,
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
        body: `The debate between full stack and specialised misses a more useful question: what does the team and market you're entering actually need?

A five-person startup needs everyone to touch everything. A hundred-person company with dedicated teams needs specialists. Both are real job markets with different expectations.

Full stack done well means being genuinely capable across the stack — not shallow in both areas. That breadth is valuable at certain company sizes. It's also harder to maintain as each area grows in depth and complexity.

Specialisation gives you depth. Depth is what makes you genuinely difficult to replace in a specific domain and what makes you legible to employers looking for a particular skill.

<div class="inline-q"><span class="iq-label">Think about this:</span> Most job postings that say "full stack" actually mean "frontend-leaning with some backend exposure." Most "backend engineer" postings mean someone who also works comfortably in the database layer. Read job descriptions carefully — the actual requirement is often different from the title.</div>

Your first role will probably make this decision based on what the team needs. That's fine. Where you direct your own learning after that matters more.`,
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
        hint: `Most job postings that say "full stack" mean "frontend with some backend." Most "backend engineer" postings mean someone comfortable in the database layer too. Read the actual requirements, not just the title.

The most honest answer to full stack vs specialised: early in your career, breadth helps you get hired. Depth helps you grow and get paid more. Most developers specialise over time as they discover which problems they find most interesting.

<strong>Don't optimise for the title.</strong> Optimise for the team you'll be working with and the problems you'll be solving.`,
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
        body: `Mobile development splits into three options with meaningfully different tradeoffs.

Native iOS (Swift, SwiftUI) and native Android (Kotlin, Jetpack Compose) give you the best performance and deepest access to device capabilities. You write separate apps for each platform — more work, but the result integrates with the OS in ways cross-platform tools can't fully replicate.

React Native lets you write JavaScript and deploy to both platforms, sharing most of the code. The experience is close to native for many use cases. The tradeoff: some things require dropping into native code anyway, and you're dependent on the bridge between JavaScript and the native layer.

Flutter uses Dart and renders its own UI components rather than translating to native ones. Cross-platform consistency is higher than React Native's, but it's a separate language and ecosystem from web development.

<div class="inline-q"><span class="iq-label">Think about this:</span> The mobile app you use most — does it feel smooth and integrated with your phone? Or slightly disconnected? That difference is often the native vs cross-platform difference. Whether that difference matters for what you want to build is a real decision.</div>

If you already know JavaScript, React Native is the fastest path to a working mobile app. If performance and platform integration matter most, native is the choice.`,
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
        hint: `The mobile ecosystem moves fast. APIs change, OS versions fragment, review guidelines evolve. The skill that matters most isn't knowing the current API — it's being able to read documentation and adapt when things change.

If you're coming from web development: React Native is the most natural starting point. The JavaScript is familiar. The differences are the native-specific concepts — navigation, platform differences, device APIs.

<strong>Before committing to a platform:</strong> look at two or three job postings for mobile roles you'd actually want. What do they list? That tells you what the market wants.`,
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
        body: `DevOps is the discipline of making software run reliably in production. Writing the code is only part of the work — deploying it, keeping it running, knowing when it's failing, and recovering from failure quickly is the other part.

The tools: CI/CD pipelines (GitHub Actions, CircleCI) automate testing and deployment. Docker packages applications consistently so they run the same anywhere. Kubernetes manages clusters of containers at scale. AWS, Google Cloud, and Azure provide the infrastructure.

The underlying concept that matters: infrastructure as code. Instead of manually configuring servers, you write code that defines and creates the infrastructure. A new environment is created the same way every time, from the same source. That reproducibility is the point.

<div class="inline-q"><span class="iq-label">Think about this:</span> Every time you push code to a repository and it automatically tests and deploys, that's a CI/CD pipeline someone built. The complexity behind that "it just works" experience is significant. DevOps engineers are the ones who make it feel automatic.</div>

DevOps has more acronyms per square inch than any other engineering discipline. The tools are not the job — they're how the job gets done. The actual job is reliability: systems that fail rarely, recover quickly, and tell you clearly when something goes wrong.`,
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
        hint: `DevOps has the highest density of tools and acronyms in any engineering area. Start with the concept, not the tools.

The concept: code goes from a developer's machine to a production server reliably, automatically, and with confidence that it works. Everything else — Docker, Kubernetes, Terraform, GitHub Actions — is in service of that.

<strong>The starting point that actually makes sense:</strong> set up a CI pipeline for a project you've already built. Watch it run tests automatically on every push. Then add automatic deployment. That hands-on experience makes the rest of the ecosystem legible.`,
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
        body: `Data engineering is the work of making data reliably available to the people and systems that need it. Not analysing it — that's data science. Not training models — that's ML engineering. Moving data from where it's generated to where it's useful, correctly and on time.

The day-to-day: building pipelines that extract data from sources (databases, APIs, event streams), transform it into a usable structure, and load it somewhere queryable. This is ETL — Extract, Transform, Load — and it's how companies understand what's happening in their systems.

The tools: Apache Spark for large-scale processing. Airflow for orchestrating pipelines. dbt for SQL-based transformation. Kafka for streaming. Cloud data warehouses — BigQuery, Snowflake, Redshift — for storing and querying large volumes of structured data.

<div class="inline-q"><span class="iq-label">Think about this:</span> The analytics dashboard that tells a company how many users signed up yesterday, what they did, and where they dropped off — that's only possible because a pipeline moved and transformed raw events into something queryable. Someone built that pipeline.</div>

SQL is the core language. More important than any specific tool is the ability to think clearly about data relationships, schema design, and how structure decisions affect what questions can be answered later.`,
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
        hint: `Data engineering rewards systems thinking. Every decision — batch or streaming, wide or narrow schema, early or late aggregation — has downstream consequences that are hard to reverse.

The discipline before the tools: understand what questions need to be answered and design the data model to support them. The right schema makes queries fast and natural. The wrong schema makes them slow and convoluted.

<strong>Start here:</strong> SQL, really well. Everything in data engineering builds on the ability to query, transform, and model data in SQL. That foundation doesn't go out of date even as the tools around it change.`,
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
        body: `AI engineering is distinct from AI research. Researchers discover new model architectures. AI engineers take models — often pre-trained, often from third parties — and integrate them into systems that solve real problems.

The practical work: calling LLM APIs and building application logic around them, fine-tuning existing models on domain-specific data, building retrieval systems that give models relevant context, and deploying models with the reliability production requires.

The skills that matter: understanding what models can and can't do reliably, designing systems that degrade gracefully when models produce unexpected outputs, and evaluating quality in a domain where "correct" is often not binary.

<div class="inline-q"><span class="iq-label">Think about this:</span> Most AI applications fail not because the model is bad but because the application logic around it is fragile — it doesn't handle unexpected outputs, doesn't give the model enough context, or doesn't validate what the model returns. That application logic is AI engineering.</div>

The tooling changes fast. The fundamentals — how transformers work, what embeddings represent, how retrieval-augmented generation operates — change more slowly. Understanding the concepts is more durable than knowing the current favourite framework.`,
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
        hint: `The AI tooling landscape changes faster than almost any other area. A framework that was standard six months ago may be superseded.

The concepts that don't change: what a prompt is and how to design one, what embeddings represent and why they're useful for retrieval, what fine-tuning is and when it's actually worth doing vs just prompt engineering.

<strong>The best starting point:</strong> build something small with an LLM API — a summariser, a classifier, a question-answering system. The gap between what you expect and what you get will teach you more about AI engineering than any reading.`,
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
        body: `Security engineering is building systems that resist attack. Not just knowing what vulnerabilities exist — every developer should know that — but deeply understanding how attacks work and designing systems that stay secure even when things go wrong.

The most important thing to internalise: you are always a target. Automated scanners test every public IP address continuously, looking for known vulnerabilities. Small applications get compromised at scale by tools that don't care who runs them.

The baseline every developer should have: parameterised queries (prevent SQL injection), HTTPS everywhere, proper auth checks, dependencies kept current, secrets never in code.

Security engineering as a specialisation goes deeper: threat modelling, penetration testing, cryptography, incident response, and building the monitoring that tells you something is wrong before users do.

<div class="inline-q"><span class="iq-label">Think about this:</span> Go to haveibeenpwned.com and enter your email. The breaches that appear — how did the attacker get that data? Understanding that question for each breach is security engineering thinking.</div>

The engineers who understand security deeply are rare. It's increasingly valued not as a separate specialism but as a skill embedded in every engineering role — especially as regulations around data handling continue to tighten.`,
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
        hint: `The most dangerous security posture is assuming you're not a target. Automated tools scan every public-facing application continuously. Size doesn't protect you.

The developer security baseline: never trust input from outside your system, use parameterised queries always, keep dependencies updated, never commit secrets, use HTTPS.

<strong>The test:</strong> can you explain why SQL injection works and how parameterised queries prevent it? Can you explain what a JWT is and why you shouldn't put sensitive data in one without encrypting it? Can you explain what HTTPS actually does? Those three things are the floor.`,
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
        body: `A portfolio is evidence — not a list of what you know, but proof of what you've built. The difference matters because every candidate claims to know React and Node and databases. The ones who show up with working, interesting projects make a different impression.

Three or four projects done properly beat ten shallow ones. A shallow project is one from a tutorial left exactly as the tutorial left it. A real project is one where you made decisions — what to build, how to structure it, what problem it solves. The decisions are what an employer is looking at.

What makes a project portfolio-ready: it works, it has a public GitHub repository with a clear README, and if it's a web application it's deployed and accessible. A project that can't be seen running can't be evaluated.

<div class="inline-q"><span class="iq-label">Think about this:</span> What would a hiring manager say about you in an interview debrief? "I looked at their GitHub and they built a real application with auth and a database, and the code was readable." That sentence is what the portfolio is trying to produce.</div>

Don't include projects you can't talk about confidently. If you built it from a tutorial and couldn't explain every decision, don't put it on the list yet.`,
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
        hint: `The goal of a portfolio project is to give a hiring manager something concrete to say about you. "They built a real application that does X" is concrete. "They did some projects" is not.

The checklist: does it work? Is it deployed and accessible? Is the code on GitHub? Is the README clear? Could you explain every decision in the codebase in an interview?

<strong>If the answer to any of those is no</strong>, fix it before adding it to your portfolio. A broken or undeployed project works against you.`,
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
        body: `Technical interviews test a different skill from daily engineering work. At work you have context, documentation, a codebase to reference, and time to think. In a coding interview you have a blank editor, a time limit, and someone watching.

The skill is learnable, but it requires specific practice. Solving problems you've never seen under time pressure is its own muscle. Leetcode-style problems — arrays, strings, trees, graphs — are the standard format. You don't need to master every category. You need competence in the most common ones.

The approach that works: solve one or two problems per day for eight to twelve weeks. When stuck after fifteen minutes, look at the solution. Understand why it works — don't just memorise it. Write the approach in your own words. The goal is pattern recognition, not memorisation.

<div class="inline-q"><span class="iq-label">Think about this:</span> Most failed interviews fail on communication, not code. Explaining your approach while you work — thinking out loud, asking clarifying questions, stating tradeoffs — distinguishes candidates with similar technical ability. Practice speaking while coding, not just coding.</div>

System design interviews matter more at senior levels. Learn the basics: load balancing, caching, database scaling, API design, rate limiting. You don't need to be an expert — you need to be able to reason about the tradeoffs.`,
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
        hint: `The most reliable preparation: solve one or two problems per day for two months. When stuck after fifteen minutes, look at the solution and understand it rather than fighting for another hour.

Write out why each solution works in your own words. Pattern recognition comes from understanding the approach, not from having seen the specific problem.

<strong>Practice explaining out loud.</strong> The ability to communicate your thinking while coding is what distinguishes similarly-skilled candidates. Interviewers are evaluating whether they'd want to work with you — not just whether you can code.`,
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
        body: `Contributing to open source is one of the most underused ways to build real credibility early. A merged pull request to a well-known project is public, verifiable, and tells an employer something concrete: you can read unfamiliar code, navigate an existing codebase, and produce a change that meets someone else's quality bar.

The start: find a project you actually use. Look at issues labelled "good first issue" or "help wanted." Read the contribution guidelines. Set up the development environment. Find something small — a documentation fix, a minor bug, a failing test. Submit it.

Your first PR will probably be rejected or revised. That's the normal experience. Read the feedback, respond professionally, improve the code. The review process is what you're there for.

<div class="inline-q"><span class="iq-label">Think about this:</span> The barrier to contributing is almost entirely psychological. The technical barrier for documentation, tests, and small bugs is usually low. What stops most people is the fear of being corrected publicly. That fear passes after the first one.</div>

Consistent small contributions to a single project build more credibility than scattered single contributions to many. Maintainers notice people who keep showing up.`,
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
        hint: `Your first PR will probably be rejected or significantly revised. That's the normal experience, not a failure. Read the feedback carefully and respond professionally.

Where to start: documentation improvements, fixing typos or unclear explanations, adding tests for uncovered code paths, or small bugs labelled "good first issue". These have the lowest barrier and the highest chance of being merged.

<strong>Setup matters.</strong> If you can't run the project locally, you can't contribute reliably. Getting the development environment working is the first real task. It's also where most beginners give up — don't.`,
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
        body: `Building in public means sharing your work, your progress, and your thinking while you're building — not after it's finished and polished. It's not self-promotion. It's a discipline that forces clarity of thought and creates a visible track record.

When you have to explain what you're building and why, you find out how well you actually understand it. Writing about a problem you solved requires understanding the solution well enough to communicate it. That process makes the understanding more durable.

The format doesn't matter — Twitter/X, LinkedIn, a blog, a newsletter. What matters is specificity and consistency. "I'm learning to code" is not building in public. "I spent three hours debugging a CORS error and here's what I found" is.

<div class="inline-q"><span class="iq-label">Think about this:</span> Every problem you've solved in this curriculum was a problem someone else is about to face. Your explanation of how you solved it — specifically, in your own words — is genuinely useful. You don't need to be a senior developer to help someone who hasn't reached that point yet.</div>

The compounding effect takes time. Build the habit before the audience.`,
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
        hint: `The most common objection: "I don't have anything valuable to say." Every problem you've solved this week was a problem someone else will face. Your explanation of how you approached it — even imperfectly — is useful to someone one step behind you.

Specific always beats general. "Here's how I fixed a race condition in my useEffect" is more useful — and more interesting — than "here's what I learned about React".

<strong>Start with one post.</strong> Describe one specific problem you solved, what you tried, and what worked. That's the format. Repeat it consistently.`,
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
        body: `Your first engineering role shapes the next five years more than any course or project. Who you work with, what you work on, how much autonomy you have, how much mentorship exists — these affect how fast you grow and in which direction.

The things that matter more than salary at this stage: the quality of the engineers around you, how much you'll be pushed into unfamiliar territory, and whether the team has a culture of code review and technical rigour. A role that pays slightly less but puts you with strong engineers will put you further ahead than one that pays more and stagnates your growth.

Company size matters too. A startup might have you owning entire features from day one. A large company might have more structured onboarding but also more process and more specialisation.

<div class="inline-q"><span class="iq-label">Ask in every interview:</span> "What does the first 90 days look like?" and "How does the team handle code review?" The answers tell you more about the team's culture than any benefits package.</div>

If you get an offer and it doesn't feel right, you can negotiate or decline. The pressure of the first offer makes it feel like the last. It isn't. Evaluate it against what you actually need — not against the fear of not getting another one.`,
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
        hint: `The pressure of getting any offer can make you accept the wrong role. If you get one offer, you'll probably get two. Evaluate it clearly.

The questions that reveal the most: ask how the team does code review (tells you about quality culture), ask what the first project will be (tells you how much autonomy you'll have), ask how people on the team have grown (tells you whether growth is supported).

<strong>Red flags:</strong> a team that can't describe how code review works, a role where you'd be the only developer, an offer that seems rushed or pressured. None of those are guaranteed problems, but they're worth probing.`,
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
        body: `The urge to prove yourself fast is real. It’s also usually counterproductive. Week one isn’t a test of how much you can ship — it’s a test of how quickly you can understand where you are.

Before you write a line of production code, you need to know: how the team deploys, how they review code, who owns what, and what the codebase actually does. Most of that comes from watching, asking, and reading — not from building.

The questions that serve you best in week one aren’t “what should I build?” They’re “how does this work?” and “why was this decision made?” Ask 10 of those before forming any opinions about what should change.

Find the smallest possible real task you can take from branch to deploy without hand-holding. Not because shipping early is impressive — it isn’t, in week one — but because going through the full PR and deploy cycle once teaches you more about how the team works than any amount of reading documentation.

At the end of week one, write down the three things you understand least well. That’s not a gap — it’s your next list.`,
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
        hint: `Everyone is overwhelmed in week one. The engineers who look calm have been through it before and are hiding it well. Don’t mistake calm faces for confidence.

<strong>Your first move:</strong> Don’t wait for a task to be assigned. Find the dev setup docs, get the project running locally, run the tests. The ability to run the code yourself without asking for help is a signal worth sending early.

<strong>On questions:</strong> Ask them — but try to find the answer yourself first. “I looked in the docs and couldn’t find X” is a better opener than “what is X?” One signals initiative; the other signals impatience.`,
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
        body: `Your first real task at a new job. The repo has 300,000 lines of code built over six years by people who mostly left. Where do you start? Reading from line one is not the answer.

Don’t start by reading code. Start by understanding what the code is supposed to do — then read the code to see if it does it. Documentation, test descriptions, PR history, and commit messages tell you the intent. The code tells you the reality. The gap between them is where the bugs live.

When you do read code, read from the outside in. Find where the thing you care about gets called — not where it’s defined. Usage tells you the contract: what goes in, what comes out. The implementation makes more sense once you know that.

The git log is underused. <code>git log -p path/to/file</code> shows every change to a file with context. <code>git blame</code> shows who changed each line and when. When code looks strange and you want to know why, git history usually has a better answer than any comment.

The senior skill: knowing what <em>not</em> to read. Not everything is relevant to your task. Scope your understanding deliberately.`,
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
        hint: `Start from the test for the behaviour you’re trying to change. The test tells you what it’s supposed to do, where the code is, and what done looks like. That’s your map into an unfamiliar codebase.

<strong>Use the IDE tools:</strong> “Go to definition,” “find all references,” “show call hierarchy.” Learn the keyboard shortcuts. These are how professional engineers navigate large codebases quickly. Reading code sequentially is not a strategy.

<strong>Make a sketch:</strong> A rough diagram of services and how they connect — not accurate in every detail, just enough to stay oriented — saves more time than you’d expect when you’re dropped into something unfamiliar.`,
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
        body: `Code review is how professional teams maintain quality and share knowledge. It’s also a consistent source of friction, misread tone, and bruised egos — partly because people treat it as a verdict rather than a conversation.

The actual purpose: catch things the author missed. Verify correctness. Transfer context. Both sides learn.

Giving good review: fewer, higher-quality comments beat a long list of minor issues. Separate blocking issues (bugs, incorrect interface changes) from suggestions (I’d do this differently, but it’s not wrong). Comments that are just your preference don’t belong in a review. Lead with questions rather than verdicts: “what happens if this value is null?” works better than “this will crash if the value is null.”

Receiving review: read all comments before responding to any. “I disagree because...” with a reason is a valid response. Silence is not — unaddressed comments are the biggest source of blocked PRs.

The quality of your code reviews is one of the clearest signals senior engineers use to assess your judgment — especially before you have a track record. A junior engineer who asks precise, useful review questions signals more than one who approves everything with a thumbs-up.`,
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
        hint: `When you see something in a code review that doesn’t make sense to you, check git blame before commenting. It often explains why the code looks the way it does — a constraint, a workaround, a decision that made sense at the time.

<strong>Phrasing that lands:</strong> “What happens if X?” reads as curiosity. “X will cause Y” reads as accusation. Same concern, different response. The first invites thinking; the second invites defensiveness. This distinction sounds small and matters more than you’d expect.

<strong>On approving PRs:</strong> Only approve if you’d be comfortable being the one who merged it. “Looks good to me” is a commitment, not a formality.`,
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
        body: `Technical debt is a trade-off, not a mistake by default. The mistake version is writing bad code because you didn’t know better. The trade-off version is writing something faster to ship now, knowing it’ll be harder to maintain later, because validating an idea mattered more than implementation quality.

The difference: documented vs hidden. Explicit debt is manageable — it’s a decision with a ticket and a plan. Hidden debt is code that looks finished but has fragility baked in that nobody admitted to.

Refactoring is restructuring code without changing its observable behaviour. It’s only safe if you have tests — because the tests verify that observable behaviour didn’t change. Refactoring untested code is effectively rewriting it. Before touching anything in a legacy codebase you don’t fully understand, write tests for the current behaviour first. Then change. Then verify.

The Boy Scout rule is worth following: leave the code better than you found it. Not a big refactor — small things. Rename an ambiguous variable. Extract a 50-line block into a named function. Add a comment explaining why, not what. Over time, this compounds into a healthier codebase.

The hardest part: treating debt as a deliberate choice, not something that just accumulates. Debt you decided to take on is manageable. Debt you didn’t notice is how codebases become painful to work in.`,
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
        hint: `Before any refactor, answer three questions: What specific problem does this solve? How will I verify the behaviour hasn’t changed? What’s the rollback if it breaks? Without clear answers to all three, you’re not ready to start.

<strong>On “big refactor quarters”:</strong> They almost never happen because they’re never as urgent as the next feature. Small, consistent improvements on every PR add up to real change. Schedule larger refactors explicitly — or they won’t happen.

<strong>The 20% heuristic:</strong> Some teams reserve 20% of engineering time for technical debt and maintenance. The specific number isn’t the point. The principle is: if tech debt isn’t scheduled, it doesn’t happen.`,
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
        body: `System design is the set of decisions that determine how a system behaves at scale, under load, and when components fail. Monolith or services. SQL or NoSQL. Cache or no cache. These decisions are cheap to make early and expensive to reverse later.

The vocabulary: <strong>horizontal scaling</strong> (more servers to share load), <strong>vertical scaling</strong> (a more powerful server), <strong>load balancing</strong> (distributing requests across servers), <strong>caching</strong> (storing computed results to skip recomputation), <strong>sharding</strong> (splitting a database by partition key), <strong>replication</strong> (copies of data on multiple servers for availability). Each one is a trade-off between cost, complexity, and the property you’re trying to protect.

CAP theorem: a distributed system can guarantee at most two of Consistency (every read returns the latest write), Availability (every request gets a response), and Partition tolerance (the system works despite network failures). Networks always fail eventually, so Partition tolerance is non-negotiable. The real choice is Consistency vs Availability when a partition happens. Banking systems choose Consistency — a wrong balance is worse than an error. Social feeds choose Availability — a slightly stale timeline is better than no timeline.

System design interviews aren’t testing whether you know the right answer. They’re testing whether you can reason about trade-offs systematically.`,
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
        hint: `Most system design mistakes come from over-engineering too early. Monoliths are simpler to build, test, and debug. Most successful products start as monoliths. In a design exercise, describe what scale or team size would make you split it, and which services you’d extract first. That’s a more sophisticated answer than immediately drawing 15 boxes.

<strong>Caching is the highest-leverage single tool:</strong> A query that takes 100ms from the database takes microseconds from a cache. For read-heavy systems with slowly changing data, caching changes the performance equation completely.

<strong>Design for the next 10x, not the theoretical maximum:</strong> A system designed for 10x your current load is a reasonable investment. Designing for 1000x before validating the product is waste. The premature optimisation problem exists at the architecture level too.`,
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
        body: `Software engineering is a team discipline. Most of its hardest problems aren’t technical. The technical problems have known solution spaces. The human problems — misaligned expectations, unspoken assumptions, communication failures at the handoff between teams — are where delivery actually breaks down.

The daily loops that matter: what you’re working on (standup), how code gets reviewed and merged (PR process), how work gets planned and prioritised (planning), and how the team reflects on what’s working (retrospectives). Done consistently, these become culture. Done mechanically, they become ceremony.

Written communication is disproportionately important in engineering teams, especially distributed ones. A well-written design doc — problem, options considered, decision, rationale — replaces multiple meetings and creates a record new team members can read months later. Teams that write decisions down have fewer repeated arguments.

Conflict in technical discussions is fine when it’s about the code and argued with evidence. It becomes a problem when it’s personal, unresolved, or passive. “Disagree and commit” is a useful norm: argue your case clearly, then implement the decision fully once it’s made. Half-implementing a decision you lost is the worst outcome — you bear the cost without getting the benefit.

The biggest predictor of high-performing engineering teams, according to Google’s Project Aristotle: psychological safety. The belief that you can ask a stupid question or disagree with someone senior without punishment.`,
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
        hint: `Your reputation on a team is built through written artefacts more than verbal ones — especially on distributed or remote teams. Code reviews, PR descriptions, Slack messages, design docs. People who’ve never worked with you directly form opinions based on these. Write with precision and generosity.

<strong>On meetings:</strong> A meeting without an agenda is usually a document waiting to be written. A meeting without a decision or action item is a ceremony. Value your team’s time as you value your own.

<strong>On disagreement:</strong> The most effective way to win a technical argument is with data. “I think approach A is faster” is an opinion. “I benchmarked both — A was 3x faster under load” is a data point. Arguments from data are easier to resolve and leave less residue.`,
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
        body: `Production is where your code meets real load, real failures, and edge cases that staging never surfaces. Operating production systems — monitoring, alerting, incident response, post-mortems — is a distinct skill from building them. Both matter for senior engineering.

Observability: the ability to understand a system’s internal state from its external outputs. Three pillars: <strong>metrics</strong> (numbers over time: error rate, latency, throughput), <strong>logs</strong> (timestamped records of events), <strong>traces</strong> (the path of a single request through multiple services). Without these, production is opaque — you know something’s wrong but not where or why.

Alerting should be actionable. An alert is useful only if there’s something a human can do in response. Alerts that fire constantly and get ignored are worse than no alerts — they train the team to ignore all alerts, including critical ones. Good practice: alert on symptoms (users can’t log in) not causes (CPU at 90%).

On-call teaches you more about how a system actually behaves than almost anything else. Real load, real failures, real cascading effects. The discomfort is real; so is the education.

Blameless post-mortems: after an incident, the analysis focuses on system failures and process gaps — not who made the mistake. When people fear blame, they hide information, which prevents learning. The goal is understanding what happened and preventing it from happening again.`,
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
        hint: `During an incident, stay calm and communicate clearly. “I’m investigating the login service — will update in 10 minutes” is enough. Make one change at a time and verify its effect before making another. The most common antipattern: multiple simultaneous changes in a panic, then not knowing which one fixed it.

<strong>Before your first on-call shift:</strong> Know how to read the health dashboard, how to read the logs, how to roll back a deployment, and who to escalate to. A runbook that exists before the incident is worth 10x one written during.

<strong>The incident priority order:</strong> Restore service first (rollback, feature flag, cache clear). Communicate to stakeholders. Then diagnose. Then fix properly. Never diagnose while users are blocked if a faster restore path exists.`,
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
        body: `Engineering career ladders use different titles — Junior, Mid, Senior, Staff, Principal — but describe the same fundamental progression: increasing scope, increasing independence, and increasing impact beyond yourself.

Junior engineers execute defined tasks with guidance. The work is scoped and reviewed closely. The primary growth edge is handling more without being walked through each step.

Mid-level engineers own features end-to-end. You take a requirement from ticket to production without someone guiding you through it. The primary growth edge is handling ambiguity — moving from “implement this spec” to “figure out how to solve this problem.”

Senior engineers own problems, not tasks. They understand the business context behind technical decisions, push back on requirements that create unnecessary complexity, and mentor junior engineers. The primary growth edge is multiplying other people’s effectiveness, not just your own.

Staff and above work at the organisational level — identifying technical problems the company doesn’t know it has yet, building alignment across teams, defining technical strategy.

The consistent pattern for getting promoted: demonstrate you’re already operating at the next level before asking for the title. Asking for a promotion before you’ve shown the behaviours consistently doesn’t work. Showing the behaviours, then asking for the match, does.`,
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
        hint: `The engineers who get promoted aren’t necessarily the best coders. They’re the ones who make their teams more effective — clear PRs, good design docs, proactive communication, flagging risks before they become problems. Make your work legible to others.

<strong>Ask for the growth conversation early:</strong> In your first three months, ask your manager what the next level looks like and what you’d need to demonstrate. Many engineers wait for their annual review. That’s a year of potentially growing in the wrong direction.

<strong>Operating at the next level:</strong> Promotions happen when you’re already demonstrating the behaviours of the next level consistently. Asking for the title before that doesn’t work. Showing the behaviours, then asking for the match, is the sequence that does.`,
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
        body: `Engineering leadership and engineering management are not the same thing. Management means direct reports, performance reviews, headcount decisions. Leadership is influence — shaping how technical work gets done, setting standards, enabling other engineers to be more effective. You can lead without managing. You can manage without leading.

Technical leadership at the senior and staff level looks like: writing design docs that help teams make better decisions, setting coding standards that reduce review friction, mentoring engineers who then mentor others, identifying the technical problem the company doesn’t know it has yet.

Engineering management is a real separate career track. The manager’s job is ensuring the team has clear goals, the context to make good decisions, feedback to grow, and support to remove blockers. Technical credibility matters — you need it to earn team trust and have informed trade-off conversations. But the skills are genuinely different: coaching, hiring, performance management, cross-functional coordination.

The most common mistake in the transition from engineering to management: continuing to do the engineering work instead of enabling others to do it. A manager who codes instead of coaching is in their reports’ way.

The IC vs management decision should be based on what kind of work you want to do every day. Both are legitimate senior paths at most large companies. Neither is the more ambitious or serious choice.`,
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
        hint: `The IC vs management decision should be made based on what kind of work you want to do every day — not what you think is more prestigious or better paid. Management is primarily coaching, communication, and coordination. Staff IC is primarily technical leadership and cross-team influence.

<strong>Try before committing:</strong> Mentor a junior engineer. Lead a design doc process. Own a cross-team technical initiative. These give you real data about whether leadership work is energising or draining for you. Real data beats assumptions.

<strong>On the staff engineer path:</strong> The Staff+ track requires your influence to extend meaningfully beyond your immediate team. If your impact is mostly within your team, you’re operating at the senior level regardless of what your title says.`,
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
        body: `A software engineering career compounds. The fundamentals you learn early — how memory works, how networks work, how to read and debug code you didn’t write — pay dividends across every technology you’ll ever use. Framework-specific knowledge has a deprecation date. The fundamentals don’t.

The engineers most effective at 15 years in aren’t those who learned the most frameworks. They built deep judgment, maintained intellectual curiosity, cultivated professional relationships, and developed the communication skills to translate technical decisions for non-technical stakeholders.

Learning strategy shifts as you progress. Early career: fundamentals, deep. Mid-career: adjacent skills — product thinking, data fluency, communication. Senior and above: high-stakes, high-ambiguity work you haven’t done before. The frontier moves. Your approach should move with it.

Relationships are professional infrastructure. The engineers you work with closely in your 20s and 30s become the senior leaders who recommend you for roles 10 years later. Build genuine relationships. The mechanics are the same as transactional ones; the durability isn’t.

Burnout is a real occupational hazard: high cognitive load, deadline pressure, and keeping up with a fast-moving field accumulate. The engineers who avoid it protect focused work time, maintain interests outside engineering, and set sustainable pace expectations rather than heroic ones.

What won’t change across your entire career: your ability to learn, think systematically, communicate clearly, and build trust. Invest disproportionately in those.`,
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
        hint: `The most underrated long-game move is staying genuinely curious about the work. The engineers who remain excellent at 20 years still find it interesting — not because they force themselves to. If you stop finding it interesting, take that seriously as information, not something to suppress.

<strong>Build in public:</strong> Write. Teach. Contribute open source. Engineers with a public record of their thinking are resilient to layoffs and downturns in ways engineers who only work internally are not. A clear explanation of a hard problem you wrote three years ago is still working for you now. Start early.

<strong>On regrets:</strong> The most common ones engineers report late in career: not writing enough, not building enough in public, not investing enough in relationships. The technical skills were fine. It’s the artefacts and connections that were missing.`,
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

// ── SPECIALISATION TRACKS ─────────────────────────────────────────────────────
// Unlocked after all 7 floors are complete.
var TRACKS = [
  {
    id: 'react',
    title: 'React',
    subtitle: 'Web Development',
    desc: 'Build interactive user interfaces with the world\'s most popular front-end library.',
    color: '#61dafb',
    tag: 'REACT TRACK',
    sections: [
      {
        id: 'tr-react-1',
        title: 'Why React Exists',
        body: `Before React, building interactive web pages meant writing a lot of <strong>imperative</strong> code — code that described every step the browser must take. Add an item to a list? Find the list element, create a new <code>&lt;li&gt;</code>, set its text, append it, then maybe update a counter somewhere else, then maybe toggle a CSS class on a button. Every interaction required you to think about the current state of the DOM and manually synchronise it with the data you had in JavaScript.\n\nThis approach worked fine for small pages. But as applications grew — Gmail, Facebook, Airbnb — the DOM manipulation code became impossible to maintain. Change one thing and three other things broke, because the DOM was the source of truth for everything and nothing was coordinated.\n\n<strong>React's answer was the component model.</strong> Instead of thinking about DOM operations, you describe what the UI should look like for a given set of data. React handles the translation from description to DOM. When your data changes, you just update the data and let React figure out the minimum number of DOM operations needed to bring the page in line. This is what people mean when they say React is <strong>declarative</strong>: you declare the result, not the process.\n\nThe mechanism that makes this efficient is the <strong>virtual DOM</strong>. When state changes, React creates a new lightweight JavaScript representation of the desired DOM, compares it to the previous one (this is called <strong>reconciliation</strong>), and applies only the differences to the real DOM. This batching and diffing process means React rarely does more work than necessary, even when data changes frequently.\n\n<div class="inline-q"><span class="iq-label">Think about this:</span> Every time you type in a search box and the results update without a page reload — that\'s a component re-rendering in response to state change. The DOM didn\'t reload. React (or something like it) worked out the minimum change needed.</div>\n\nToday React is used by Meta, Netflix, Airbnb, Atlassian, and thousands of other companies. The job market for React developers is enormous, and the skills transfer directly to React Native (iOS and Android apps) and Next.js (full-stack web apps). Learning React is not learning one tool — it\'s learning a mental model that applies across an entire ecosystem.`,
        callout: {
          type: 'default',
          label: 'The Core Idea',
          text: 'React lets you describe your UI as a function of your data. When data changes, the UI updates automatically. You stop thinking about DOM operations and start thinking about state.'
        },
        hint: `If the virtual DOM still feels abstract, try this mental model: imagine you're editing a document. The naive approach is to re-print the entire document every time you change one word. React's approach is to compare the new version to the old, find the changed word, and only update that word in the printed copy.\n\n<strong>Reconciliation</strong> is React's diff-and-patch process. It's fast because JavaScript object comparisons are cheap; real DOM mutations are expensive.`,
        quiz: {
          question: "What problem does React's virtual DOM primarily solve?",
          options: [
            "Making pages load faster over the network",
            "Reducing the number of actual DOM updates by batching and diffing",
            "Replacing HTML with JavaScript entirely",
            "Encrypting data between client and server"
          ],
          correct: 1,
          feedback: "The virtual DOM is an in-memory representation of the real DOM. React diffs the new virtual DOM against the previous one (reconciliation) and applies only the changes. This batching and diffing dramatically reduces expensive real DOM mutations. It doesn't affect network speed, doesn't replace HTML, and has nothing to do with encryption."
        }
      },
      {
        id: 'tr-react-2',
        title: 'JSX and Components',
        body: `React introduces a syntax extension called <strong>JSX</strong> — JavaScript XML. It looks like HTML written inside JavaScript, which is precisely what it is. JSX is not valid JavaScript on its own; a build tool (or, in our case, Babel running in the browser) transforms it into regular <code>React.createElement()</code> calls. The end result is the same — a description of what should appear in the DOM — but JSX makes it dramatically more readable.\n\nA <strong>functional component</strong> is just a JavaScript function that returns JSX. That\'s the entire definition. If a function accepts an argument called <code>props</code> and returns something that looks like HTML, React will treat it as a component. You can compose components inside other components — a <code>&lt;App /&gt;</code> might contain a <code>&lt;Header /&gt;</code> which contains a <code>&lt;Nav /&gt;</code> — building up a tree of reusable UI pieces.\n\n<strong>Props</strong> (short for properties) are how you pass data into a component. They flow one way: from parent to child. A parent component decides what a child displays by passing props. The child cannot modify its props — they are read-only from the child\'s perspective. This one-way data flow makes React applications predictable: if a component looks wrong, you know to look at the props being passed in.\n\n<div class="inline-q"><span class="iq-label">The pattern:</span> Think of a component like a stamp. You define the stamp once — the shape, the design. Then you use it multiple times with different ink (props). The stamp doesn\'t change; the output does.</div>\n\nIn the code editor below, you\'ll work with a simple component that accepts props and renders a greeting card. The key habit to build here is: before you write the JSX, think about what data the component needs. That data becomes its props.`,
        callout: {
          type: 'focus',
          label: 'Props are read-only',
          text: 'A component should never modify its own props. Props are facts passed down from the parent. If a component needs to change something, it needs its own state — which comes in the next section.'
        },
        hint: `JSX expressions must return a single root element. If you need to return multiple elements without a wrapper div, use a React Fragment: <code>&lt;&gt;...&lt;/&gt;</code>.\n\n<strong>Common mistake:</strong> Using <code>class</code> instead of <code>className</code> in JSX. JSX compiles to JavaScript, and <code>class</code> is a reserved word. React uses <code>className</code> for the HTML class attribute.`,
        code: {
          lang: 'html',
          filename: 'component.html',
          starter: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0a0a0a; color: #e0e0e0; font-family: sans-serif; display: flex; justify-content: center; padding: 40px 20px; }
  .card { background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px 28px; max-width: 320px; width: 100%; }
  .card-name { font-size: 22px; font-weight: 700; color: #61dafb; margin-bottom: 4px; }
  .card-role { font-size: 13px; color: rgba(255,255,255,0.45); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    function GreetingCard({ name }) {
      return (
        <div className="card">
          <div className="card-name">Hello, {name}!</div>
          <div className="card-role">Welcome to React</div>
        </div>
      );
    }

    function App() {
      return <GreetingCard name="Developer" />;
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`,
          challenges: [
            'Add a second prop for a subtitle and display it below the name',
            'Render 3 different instances of GreetingCard with different names and subtitles',
            'Style it with inline styles to give each card a different border colour'
          ]
        }
      },
      {
        id: 'tr-react-3',
        title: 'State with useState',
        body: `Props are data passed in from outside. <strong>State</strong> is data owned and managed by the component itself. When state changes, React automatically re-renders the component — and only that component plus any children that depend on its data. This is the core reactivity mechanism.\n\nThe <strong>useState</strong> hook is the primary way to add state to a functional component. You call it with an initial value and it returns an array of two things: the current state value, and a function to update it. By convention, they're destructured immediately:\n\n<pre><code>const [count, setCount] = React.useState(0);</code></pre>\n\nWhen you call <code>setCount(newValue)</code>, React schedules a re-render. On the next render, <code>count</code> will have the new value. You never mutate state directly — you always go through the setter function. Direct mutation (<code>count = count + 1</code>) won't trigger a re-render and will cause subtle bugs.\n\n<strong>Event handlers</strong> are how user interactions update state. You pass a function to an element's event prop — <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code> — and that function calls the state setter with the new value. React handles the wiring from DOM event to your handler.\n\n<div class="inline-q"><span class="iq-label">The mental model:</span> A component is a snapshot of the UI at a given moment in time. State is the input that determines the snapshot. Change the state, get a new snapshot. React's job is to update the DOM to match the new snapshot as efficiently as possible.</div>\n\nIn the code editor below you\'ll build a counter component. The counter is simple by design — the pattern (state → render → event → state) is what matters, and you\'ll apply it to real features once the pattern is clear.`,
        callout: {
          type: 'warning',
          label: 'Never mutate state directly',
          text: 'Always use the setter function. count++ or count = count + 1 will change the variable but React won\'t know about it, so the UI won\'t update. React only re-renders when you call the setter.'
        },
        hint: `If you need the new state value to depend on the previous one, pass a function to the setter:\n\n<code>setCount(prev => prev + 1);</code>\n\nThis is safer than <code>setCount(count + 1)</code> because React may batch multiple state updates, so reading <code>count</code> directly might give you a stale value. The function form always receives the latest value.`,
        code: {
          lang: 'html',
          filename: 'state.html',
          starter: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0a0a0a; color: #e0e0e0; font-family: sans-serif; display: flex; justify-content: center; padding: 40px 20px; }
  .counter { background: #111; border: 1px solid #222; border-radius: 16px; padding: 32px; text-align: center; min-width: 240px; }
  .count-val { font-size: 64px; font-weight: 900; color: #61dafb; line-height: 1; margin: 16px 0; }
  .btn-row { display: flex; gap: 12px; justify-content: center; margin-top: 16px; }
  button { background: #1a2a3a; color: #61dafb; border: 1px solid #61dafb44; border-radius: 8px; padding: 10px 24px; font-size: 20px; cursor: pointer; }
  button:hover { background: #61dafb22; }
</style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    function Counter() {
      const [count, setCount] = React.useState(0);
      return (
        <div className="counter">
          <div>Count</div>
          <div className="count-val">{count}</div>
          <div className="btn-row">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);
  </script>
</body>
</html>`,
          challenges: [
            'Add a Reset button that sets the count back to 0',
            'Prevent the counter going below 0 — disable or guard the decrement',
            'Add a step input so the user can increment and decrement by any amount they type'
          ]
        }
      },
      {
        id: 'tr-react-4',
        title: 'Props, Lists and Keys',
        body: `Real applications rarely display static data. They display <strong>lists</strong> — a list of products, messages, tasks, users. In React, you render lists by transforming an array of data into an array of JSX elements using <code>.map()</code>. Because <code>.map()</code> returns an array of elements, React renders each one.\n\n<pre><code>const tasks = ['Design', 'Build', 'Deploy'];\nreturn (\n  &lt;ul&gt;\n    {tasks.map(task => &lt;li key={task}&gt;{task}&lt;/li&gt;)}\n  &lt;/ul&gt;\n);</code></pre>\n\nNotice the <strong>key</strong> prop. React needs keys to efficiently update lists. When the list changes — an item is added, removed, or reordered — React uses keys to identify which element is which. Without keys, React might re-render the entire list when only one item changed, or worse, it might mix up the elements and display incorrect data.\n\nKeys must be <strong>unique among siblings</strong> and <strong>stable</strong> — they shouldn't change between renders. Using array indices as keys works for static lists but causes bugs when items are reordered or filtered. Database IDs make the best keys; failing that, use a stable property like a slug or username.\n\n<strong>Composing components with lists</strong> is where React's reusability becomes visible. Instead of a list of raw <code>&lt;li&gt;</code> elements, you define a <code>&lt;TaskItem /&gt;</code> component and pass each task\'s data as props. Now you can style, test, and evolve the task display in one place.\n\n<div class="inline-q"><span class="iq-label">The rule of thumb:</span> If you find yourself copying and pasting JSX to make slight variations, that code wants to be a component with props. Create the component, then use .map() to render it once per data item.</div>`,
        callout: {
          type: 'warning',
          label: 'Never use array index as key for dynamic lists',
          text: 'If users can add, remove or sort items, index-based keys cause React to mix up component state. Use a unique, stable ID from your data instead.'
        },
        hint: `If your data doesn't have IDs, you can generate them once when the data is created using a simple counter or <code>crypto.randomUUID()</code>. The key requirement is that it doesn't change — not that it's globally unique across all of space and time.`,
        code: {
          lang: 'html',
          filename: 'lists.html',
          starter: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0a0a0a; color: #e0e0e0; font-family: sans-serif; display: flex; justify-content: center; padding: 40px 20px; }
  .task-list { background: #111; border: 1px solid #222; border-radius: 14px; padding: 24px; min-width: 300px; max-width: 400px; width: 100%; }
  h2 { font-size: 16px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px; }
  .task-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1a1a1a; font-size: 15px; }
  .task-item:last-child { border-bottom: none; }
</style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const initialTasks = [
      { id: 1, title: 'Learn React basics' },
      { id: 2, title: 'Build a counter' },
      { id: 3, title: 'Render a list with .map()' },
    ];

    function TaskItem({ task }) {
      return (
        <div className="task-item">
          <span>{task.title}</span>
        </div>
      );
    }

    function App() {
      return (
        <div className="task-list">
          <h2>Tasks</h2>
          {initialTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`,
          challenges: [
            'Add a completed boolean to each task and display a checkmark next to completed ones',
            'Add a form with an input and button to add new tasks to the list',
            'Add a toggle to filter the list and show only incomplete tasks'
          ]
        }
      },
      {
        id: 'tr-react-5',
        title: 'Your React App',
        body: `You now have all the building blocks: components that accept props, state that triggers re-renders, event handlers that update state, and lists rendered with <code>.map()</code>. A real React application is simply these four things composed together at increasing complexity.\n\nThe key discipline at this stage is knowing where to put state. A rule of thumb: state should live in the <strong>lowest common ancestor</strong> of all components that need it. If only one component needs a piece of data, state lives there. If two sibling components need to share data, state lifts up to their parent, which passes the data down as props and the update functions down as callback props.\n\nThis pattern — lifting state up, passing callbacks down — is fundamental to React. It keeps data flowing one direction and makes applications predictable. When something breaks, you can trace the data from the component that displays it, up through the props, to the state that owns it.\n\n<strong>The code editor below</strong> has a small task manager — the same list you built in the last section, but now with state. Tasks can be added, toggled complete, and filtered. Read through the code and understand each piece before attempting the checklist.\n\n<div class="inline-q"><span class="iq-label">Before you continue:</span> Can you explain, in plain English, what happens between pressing a button and seeing the UI change? Trace the path: event → handler → setState → render. If you can narrate that cycle, you understand React's core model.</div>`,
        callout: {
          type: 'focus',
          label: 'The React mental shift',
          text: 'Stop thinking about the DOM. Think about state. Ask: what data does this screen need? What events can change that data? Let React handle turning data into DOM — that\'s its job.'
        },
        code: {
          lang: 'html',
          filename: 'app.html',
          starter: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0a0a0a; color: #e0e0e0; font-family: sans-serif; display: flex; justify-content: center; padding: 40px 20px; }
  .app { background: #111; border: 1px solid #222; border-radius: 14px; padding: 24px; width: 100%; max-width: 400px; }
  h1 { font-size: 20px; font-weight: 700; color: #61dafb; margin: 0 0 20px; }
  .add-row { display: flex; gap: 8px; margin-bottom: 16px; }
  input { flex: 1; background: #0a1520; border: 1px solid #333; color: #e0e0e0; border-radius: 8px; padding: 8px 12px; font-size: 14px; }
  .add-btn { background: #61dafb22; border: 1px solid #61dafb44; color: #61dafb; border-radius: 8px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
  .filter-row { display: flex; gap: 6px; margin-bottom: 14px; }
  .filter-btn { background: transparent; border: 1px solid #333; color: rgba(255,255,255,0.4); border-radius: 6px; padding: 5px 12px; font-size: 11px; cursor: pointer; letter-spacing: 0.05em; text-transform: uppercase; }
  .filter-btn.active { border-color: #61dafb; color: #61dafb; }
  .task { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #1a1a1a; cursor: pointer; }
  .task:last-child { border-bottom: none; }
  .task.done span { text-decoration: line-through; opacity: 0.4; }
  .task-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #333; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
  .task.done .task-dot { border-color: #61dafb; background: #61dafb22; color: #61dafb; }
</style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    function App() {
      const [tasks, setTasks] = React.useState([
        { id: 1, title: 'Learn components', done: true },
        { id: 2, title: 'Understand state', done: false },
        { id: 3, title: 'Render lists', done: false },
      ]);
      const [input, setInput] = React.useState('');
      const [filter, setFilter] = React.useState('all');

      function addTask() {
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), title: input.trim(), done: false }]);
        setInput('');
      }

      function toggle(id) {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
      }

      const visible = tasks.filter(t => filter === 'all' || (filter === 'todo' && !t.done) || (filter === 'done' && t.done));

      return (
        <div className="app">
          <h1>Task Manager</h1>
          <div className="add-row">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Add a task…" />
            <button className="add-btn" onClick={addTask}>Add</button>
          </div>
          <div className="filter-row">
            {['all','todo','done'].map(f => (
              <button key={f} className={'filter-btn' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          {visible.map(task => (
            <div key={task.id} className={'task' + (task.done ? ' done' : '')} onClick={() => toggle(task.id)}>
              <div className="task-dot">{task.done ? '✓' : ''}</div>
              <span>{task.title}</span>
            </div>
          ))}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`,
          challenges: [
            'Add a delete button to each task item',
            'Show a count of remaining incomplete tasks below the filter row',
            'Persist the task list to localStorage so it survives a page refresh'
          ]
        },
        checklist: [
          "I can explain what a component is and why they're reusable",
          "I understand the difference between props (passed in) and state (owned by the component)",
          "I've built a component that renders a list from an array using .map()",
          "I know why React needs keys on list items and what makes a good key",
          "I've connected an input to state with onChange and seen the UI update live"
        ]
      }
    ]
  },

  {
    id: 'python',
    title: 'Python',
    subtitle: 'Data & AI',
    desc: 'Master the language that powers data science, machine learning, and modern AI tooling.',
    color: '#4584b6',
    tag: 'PYTHON TRACK',
    sections: [
      {
        id: 'tr-python-1',
        title: 'Why Python',
        body: `Python has become the dominant language for data science and artificial intelligence — not because it is the fastest language (it is not), but because it strikes the best balance between <strong>readability, ecosystem breadth, and community size</strong>.\n\nThe readability matters more than it sounds. Data work is fundamentally exploratory. You write a line, look at the output, revise, and write another. Python's syntax is close enough to plain English that this cycle is fast. You spend time thinking about the data problem, not fighting the language. Compare a list comprehension in Python to the equivalent in Java or C++ and the difference is immediately apparent.\n\nThe <strong>ecosystem</strong> is where Python's dominance becomes self-reinforcing. <strong>NumPy</strong> gives you fast numerical arrays. <strong>pandas</strong> gives you DataFrames — a spreadsheet-like structure for data manipulation. <strong>Matplotlib</strong> and <strong>seaborn</strong> handle visualisation. <strong>scikit-learn</strong> provides classical machine learning. <strong>PyTorch</strong> and <strong>TensorFlow</strong> handle deep learning. Every AI research paper publishes its code in Python. Every cloud provider's AI SDK has a Python client. This is not a coincidence — it is a network effect that has been compounding for over a decade.\n\n<div class="inline-q"><span class="iq-label">The reality:</span> OpenAI, Anthropic, Google DeepMind, and every other major AI lab use Python as their primary language. If you want to work with AI — building products on top of AI APIs, fine-tuning models, or doing research — Python is the starting point.</div>\n\nThis track does not try to teach you all of Python. It teaches you the parts that matter most for data and AI work: fundamentals, data manipulation with pandas, and how to interact with APIs and AI models. The goal is to give you enough to build something real and know how to find everything else.`,
        callout: {
          type: 'default',
          label: 'Python\'s Niche',
          text: 'Python is not the best language for building web servers at scale (Go, Rust) or mobile apps (Swift, Kotlin) or systems software (C, C++). It is the best language for data analysis, ML experimentation, scripting, and AI API integration. Know the tool, know the domain.'
        },
        hint: `Python runs server-side — it can't run natively in the browser, which is why this track uses quizzes and code examples rather than a live editor. To run Python yourself, install it from python.org, use a cloud notebook (Google Colab is free), or use an online REPL like repl.it. The concepts here are what matter.`,
        quiz: {
          question: "Which of the following best describes Python's primary advantage in data science?",
          options: [
            "A readable syntax combined with a vast ecosystem of specialist libraries (NumPy, pandas, PyTorch) that no other language can match in breadth or maturity",
            "It runs faster than all other programming languages, making it ideal for processing large datasets",
            "It is the only language that works in web browsers, allowing interactive data visualisations",
            "It enforces strict static typing, preventing data type errors at compile time"
          ],
          correct: 0,
          feedback: "Python's speed is actually one of its weaknesses (though NumPy and PyTorch offload heavy computation to optimised C and CUDA kernels). It cannot run in browsers natively. It is dynamically typed, not statically typed. Its real strength is the combination of readable syntax and an unmatched ecosystem — the tools that exist for Python in data/AI have no equivalent collection in any other language."
        }
      },
      {
        id: 'tr-python-2',
        title: 'Python Fundamentals',
        body: `Python is dynamically typed — you don't declare types, you just assign values. Python figures out the type from the value.\n\n<pre><code>name = "Alice"          # str\nage = 28               # int\nheight = 1.72          # float\nis_active = True       # bool</code></pre>\n\n<strong>Functions</strong> are defined with <code>def</code>. Indentation (whitespace) defines the block — Python has no braces. This is enforced by the language, not optional style.\n\n<pre><code>def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"</code></pre>\n\n<strong>Lists</strong> are ordered, mutable sequences. <strong>Dictionaries</strong> are key-value stores — the Python equivalent of JavaScript objects.\n\n<pre><code>scores = [95, 87, 92, 78]\nuser = {"name": "Alice", "age": 28, "active": True}</code></pre>\n\n<strong>Control flow</strong> uses <code>if / elif / else</code> and <code>for</code> loops:\n\n<pre><code>for score in scores:\n    if score >= 90:\n        print("A")\n    elif score >= 80:\n        print("B")\n    else:\n        print("C")</code></pre>\n\n<strong>List comprehensions</strong> are one of Python's most expressive features — a concise way to build a new list by transforming or filtering an existing one:\n\n<pre><code># squares of numbers 0–4\nsquares = [x**2 for x in range(5)]\n# [0, 1, 4, 9, 16]</code></pre>\n\n<div class="inline-q"><span class="iq-label">The pattern:</span> <code>[expression for item in iterable if condition]</code>. The <code>if condition</code> part is optional — use it to filter. The expression transforms each item.</div>`,
        callout: {
          type: 'focus',
          label: 'Indentation is syntax',
          text: 'In Python, indentation is not style — it is syntax. Inconsistent indentation causes IndentationError. Use 4 spaces per level. Never mix tabs and spaces. Most editors handle this automatically when configured for Python.'
        },
        hint: `<code>range(5)</code> produces 0, 1, 2, 3, 4 — five values starting from 0, not including 5. <code>range(1, 6)</code> produces 1, 2, 3, 4, 5.\n\n<code>f-strings</code> (formatted string literals) are the modern way to interpolate values into strings: <code>f"Hello, {name}"</code>. The <code>f</code> prefix before the opening quote enables it.`,
        quiz: {
          question: "What does the expression [x**2 for x in range(5)] evaluate to?",
          options: [
            "[0, 1, 4, 9, 16]",
            "[1, 4, 9, 16, 25]",
            "[0, 2, 4, 6, 8]",
            "SyntaxError — list comprehensions are not valid Python"
          ],
          correct: 0,
          feedback: "range(5) generates 0, 1, 2, 3, 4. The expression x**2 squares each value: 0²=0, 1²=1, 2²=4, 3²=9, 4²=16. Result: [0, 1, 4, 9, 16]. [1, 4, 9, 16, 25] would be the result of range(1, 6) — starting from 1. [0, 2, 4, 6, 8] would be x*2, not x**2. List comprehensions are absolutely valid Python."
        }
      },
      {
        id: 'tr-python-3',
        title: 'Working with Data',
        body: `<strong>pandas</strong> is the central tool for data manipulation in Python. Its primary data structure is the <strong>DataFrame</strong> — a two-dimensional table with labelled columns, much like a spreadsheet, but programmable.\n\n<pre><code>import pandas as pd\n\n# Read a CSV file into a DataFrame\ndf = pd.read_csv("sales.csv")\n\n# Inspect the data\nprint(df.head())          # first 5 rows\nprint(df.shape)           # (rows, columns)\nprint(df.describe())      # stats summary\nprint(df.dtypes)          # column types</code></pre>\n\n<strong>Selecting and filtering</strong> are the most common operations. You can select columns by name and filter rows by condition:\n\n<pre><code># Select a single column (returns a Series)\nnames = df["name"]\n\n# Filter rows where revenue > 10000\nhigh_revenue = df[df["revenue"] > 10000]\n\n# Multiple conditions\nfiltered = df[(df["revenue"] > 10000) & (df["region"] == "EMEA")]</code></pre>\n\n<strong>groupby</strong> is pandas's version of SQL's GROUP BY — split the data by a category, apply an aggregation, and combine the results:\n\n<pre><code># Average revenue per product category\ndf.groupby("category")["revenue"].mean()\n\n# Multiple aggregations at once\ndf.groupby("region").agg({"revenue": "sum", "orders": "count"})</code></pre>\n\n<div class="inline-q"><span class="iq-label">The real power:</span> In a few lines you can take a raw CSV with millions of rows, filter it, group it, aggregate it, and export the result. Operations that would take hours in a spreadsheet take seconds in pandas.</div>\n\nThe learning curve with pandas is mostly in remembering the method names and understanding how indexing works. The best approach: keep a pandas cheat sheet open and look things up as you need them. You'll remember the ones you use most.`,
        callout: {
          type: 'default',
          label: 'pandas and SQL',
          text: 'If you know SQL, pandas will feel familiar. SELECT → column selection. WHERE → boolean indexing. GROUP BY → groupby. JOIN → merge. ORDER BY → sort_values. The concepts are the same; the syntax is Python.'
        },
        hint: `Missing data is represented as <code>NaN</code> (Not a Number) in pandas. Before analysing, always check:\n<pre><code>df.isnull().sum()  # count missing values per column\ndf.dropna()        # remove rows with any NaN\ndf.fillna(0)       # replace NaN with 0</code></pre>\nIgnoring missing data is one of the most common causes of incorrect analysis results.`,
        quiz: {
          question: "What does df.groupby('category').mean() return?",
          options: [
            "A new DataFrame with one row per unique category value, containing the mean of all numeric columns for that category",
            "The single category with the highest average value across the entire DataFrame",
            "A filtered version of the original DataFrame containing only rows where category equals 'mean'",
            "An error — groupby requires an aggregation function to be specified separately with .agg()"
          ],
          correct: 0,
          feedback: "groupby('category') splits the DataFrame into groups by unique category values. .mean() then computes the arithmetic mean of every numeric column within each group. The result is a new DataFrame indexed by the unique category values, with one row per category. pandas does accept .mean() directly on a GroupBy object — you only need .agg() when you want different aggregations for different columns."
        }
      },
      {
        id: 'tr-python-4',
        title: 'APIs and AI Tools',
        body: `An <strong>API</strong> (Application Programming Interface) is a structured way for your code to talk to another service over the internet. You send an HTTP request with certain parameters, the service processes it, and returns a structured response — usually JSON.\n\nThe <code>requests</code> library is the standard Python tool for making HTTP requests:\n\n<pre><code>import requests\n\nresponse = requests.get(\n    "https://api.openweathermap.org/data/2.5/weather",\n    params={"q": "London", "appid": "YOUR_API_KEY"}\n)\n\ndata = response.json()          # parse JSON response\ntemp = data["main"]["temp"]     # extract a value\nprint(f"Temperature: {temp}K")</code></pre>\n\n<strong>AI APIs</strong> work the same way — you send a request with a prompt, the model generates a response, you receive it as JSON. The Anthropic and OpenAI SDKs wrap this HTTP pattern in Python objects:\n\n<pre><code>import anthropic\n\nclient = anthropic.Anthropic(api_key="sk-ant-...")  # never hardcode this\n\nmessage = client.messages.create(\n    model="claude-opus-4-5",\n    max_tokens=1024,\n    messages=[{"role": "user", "content": "Explain recursion simply."}]\n)\n\nprint(message.content[0].text)</code></pre>\n\n<strong>Prompt engineering</strong> — writing effective prompts — is a learnable skill. The key principles: be specific about what you want, specify the format of the output, provide examples if the task is complex, and break multi-step tasks into sequential messages.\n\n<div class="inline-q"><span class="iq-label">Security rule:</span> An API key is a password. Never put it in code you commit to a public repository. Never put it in frontend JavaScript — users can read your source code. Use environment variables (<code>os.environ["ANTHROPIC_API_KEY"]</code>) and load them from a <code>.env</code> file that is listed in <code>.gitignore</code>.</div>`,
        callout: {
          type: 'warning',
          label: 'API Keys in Frontend Code',
          text: 'Putting an API key in JavaScript that runs in the browser means every visitor to your site can steal it. Always make API calls from a backend (server-side Python, Node.js, etc.) where the key is in an environment variable the public cannot access.'
        },
        hint: `<strong>Rate limits:</strong> AI APIs charge per token (roughly per word) and enforce rate limits. Build your applications to handle <code>429 Too Many Requests</code> errors gracefully — catch the exception, wait, and retry. The <code>tenacity</code> library makes retry logic simple in Python.`,
        quiz: {
          question: "What is an API key and why must it never appear in frontend JavaScript?",
          options: [
            "An API key is a credential that authenticates your requests to a service. Placing it in frontend JS exposes it in the browser's source — anyone can copy it and use your account, incurring your costs or accessing your data",
            "An API key is an encryption algorithm that secures the connection. It must be frontend-only because servers cannot use HTTPS",
            "An API key is a cached response from a previous API call. It should not be in JS because it wastes bandwidth",
            "An API key is a database password. It must not be in JS because JavaScript cannot handle binary data"
          ],
          correct: 0,
          feedback: "An API key is a secret credential — it identifies and authenticates your application to the API provider. Browser JavaScript is public: anyone who opens DevTools can read it. An exposed key can be misused to make calls billed to your account, access private data, or exhaust your quota. The correct pattern: your frontend sends requests to your own backend, your backend authenticates with the API key (stored as an environment variable), and returns results. The key never leaves your server."
        }
      },
      {
        id: 'tr-python-5',
        title: 'Your Python Project',
        body: `The best way to solidify Python is to build something you actually care about. The skills from this track — fundamentals, data manipulation, API integration — combine into a huge range of possible projects.\n\n<strong>CLI tool:</strong> A command-line script that automates something tedious. Rename files based on a pattern, process a folder of CSVs and produce a summary report, pull data from an API and email you a daily digest. These projects are immediately useful and require only the core language.\n\n<strong>Data analyser:</strong> Take a dataset that interests you — personal finance exports, sports statistics, weather data, social media metrics — and explore it with pandas. Find patterns. Build visualisations with Matplotlib. Write up findings. This is the complete data workflow and it's excellent for a portfolio.\n\n<strong>AI chatbot or assistant:</strong> Use the Anthropic or OpenAI API to build an assistant that has a specific purpose — a code reviewer, a recipe suggester, a study partner for a subject you're learning. Adding a system prompt that defines the assistant's behaviour is the key technique.\n\n<div class="inline-q"><span class="iq-label">The project rule:</span> Pick the smallest version of the project that would be genuinely useful to you. Build that first. If it's useful, you'll naturally add features. If you start too big, you'll never finish.</div>\n\nPython's package ecosystem means almost any task you can imagine has a library for it. <code>pip install package-name</code> is one of the most powerful commands you'll learn. The ability to find, evaluate, and integrate a library in minutes is a core Python skill worth practising deliberately.`,
        callout: {
          type: 'focus',
          label: 'Your first Python project in 3 steps',
          text: '1. Pick a dataset or API you care about. 2. Write 10 lines that fetch or load the data and print it. 3. Extend from there. The first working output — no matter how rough — is the hardest part.'
        },
        checklist: [
          "I can write a Python function, pass arguments to it, and return a value",
          "I understand lists and dicts well enough to store and retrieve structured data",
          "I've made at least one HTTP request using the requests library (or I know exactly how to)",
          "I know the difference between calling an existing AI API and training a model from scratch",
          "I have a concrete project idea I can describe in one sentence and could start today"
        ]
      }
    ]
  },

  {
    id: 'swift',
    title: 'Swift',
    subtitle: 'iOS Development',
    desc: 'Build native iOS apps with Apple\'s modern language and the declarative SwiftUI framework.',
    color: '#F05138',
    tag: 'SWIFT TRACK',
    sections: [
      {
        id: 'tr-swift-1',
        title: 'Why Swift and iOS',
        body: `Apple introduced <strong>Swift</strong> in 2014 as a replacement for Objective-C — the language that had powered iOS and macOS development since the NeXT era. Objective-C was powerful but verbose and error-prone. Swift was designed to be safe, fast, and expressive, with modern language features like optionals, type inference, and closures built in from the start.\n\nToday Swift is the primary language for all Apple platform development: <strong>iOS</strong> (iPhone), <strong>iPadOS</strong>, <strong>macOS</strong>, <strong>watchOS</strong>, and <strong>tvOS</strong>. If you want to build a native Apple app — the kind distributed through the App Store — Swift is where you start.\n\nFor building the user interface, you have two options. <strong>UIKit</strong> is the older, imperative framework that has powered iOS apps since 2008. You describe UI by creating view objects, setting their properties, and arranging them in view hierarchies. <strong>SwiftUI</strong>, introduced in 2019, is declarative — you describe what the UI should look like for a given state, and SwiftUI handles the rendering. SwiftUI is Apple's investment in the future and the right place to start for new learners.\n\n<div class="inline-q"><span class="iq-label">The market:</span> There are over 2.2 billion active Apple devices. The App Store generates over $100 billion in annual developer revenue. iOS development is one of the highest-paid specialisations in software — senior iOS engineers at major companies regularly earn above £120,000 / $150,000. The barrier is Xcode, which requires a Mac, and the conceptual model of app development, which is different from web development.</div>\n\nThe transfer from web development to iOS is more significant than the transfer from, say, JavaScript to Python. You are learning not just a new language but a new platform with its own lifecycle, navigation model, data persistence layer, and UI paradigm. Give it the time it deserves.`,
        callout: {
          type: 'default',
          label: 'What you need',
          text: 'To develop for iOS you need a Mac running a recent version of macOS, and Xcode (free from the Mac App Store). To test on a real device you need a free Apple developer account. To publish to the App Store you need a paid Apple Developer Program membership ($99/year).'
        },
        hint: `SwiftUI previews in Xcode let you see the UI update live as you type code — no compile-run cycle required. This is one of the most productive development loops in all of software development. When you start with Xcode, spend time getting comfortable with the preview canvas before anything else.`,
        quiz: {
          question: "What is SwiftUI?",
          options: [
            "Apple's declarative UI framework, introduced in 2019, where you describe the desired state of the UI and SwiftUI handles rendering and updates automatically",
            "A JavaScript library for styling web pages to look like native iOS apps",
            "Apple's older, imperative UI framework that has powered iOS since 2008 and is still the primary choice for new apps",
            "A Swift package manager for downloading third-party libraries and dependencies"
          ],
          correct: 0,
          feedback: "SwiftUI is Apple's declarative framework, introduced at WWDC 2019. You describe what the UI should look like for a given state — SwiftUI renders it and re-renders when state changes. UIKit is the older imperative framework (option 3). SwiftUI has nothing to do with JavaScript or CSS (option 2). Swift Package Manager (SPM) is a separate tool for managing dependencies (option 4)."
        }
      },
      {
        id: 'tr-swift-2',
        title: 'Swift Fundamentals',
        body: `Swift's type system is one of its biggest strengths. <strong>Type inference</strong> means you rarely write types explicitly — Swift figures them out from context:\n\n<pre><code>let name = "Alice"      // inferred as String\nlet age = 28            // inferred as Int\nvar score = 95.5        // inferred as Double</code></pre>\n\n<code>let</code> declares a constant (immutable). <code>var</code> declares a variable (mutable). Prefer <code>let</code> wherever possible — it signals intent and enables compiler optimisations.\n\n<strong>Optionals</strong> are one of Swift's most important features. They represent a value that might be absent. A <code>String</code> is always a string. A <code>String?</code> is either a string or <code>nil</code>. The compiler forces you to handle the <code>nil</code> case before using the value:\n\n<pre><code>var username: String? = nil\nusername = "alice"\n\n// Safe unwrapping\nif let name = username {\n    print("Hello, \\(name)")\n} else {\n    print("No username")\n}\n\n// Nil coalescing — provide a default\nlet display = username ?? "Guest"</code></pre>\n\n<strong>Structs</strong> are value types — each assignment creates a copy. <strong>Classes</strong> are reference types — variables point to the same object. SwiftUI views are structs. Most of your data models will be structs.\n\n<strong>Closures</strong> are anonymous functions — the Swift equivalent of JavaScript arrow functions. They're used extensively for event handling, async completion handlers, and higher-order functions like <code>.map</code> and <code>.filter</code>:\n\n<pre><code>let doubled = [1, 2, 3].map { $0 * 2 }  // [2, 4, 6]</code></pre>\n\n<div class="inline-q"><span class="iq-label">The key habit:</span> When Swift gives you a compile error about an optional, read it carefully. The compiler is telling you about a real problem — a value that might not be there. Fix the unwrapping, don't force-unwrap with <code>!</code> unless you're absolutely certain the value exists.</div>`,
        callout: {
          type: 'warning',
          label: 'Avoid force-unwrapping',
          text: 'The ! operator force-unwraps an optional — if the value is nil at that point, your app crashes instantly with a fatal error. Use if let, guard let, or ?? instead. Force unwraps are a red flag in code review.'
        },
        hint: `<code>guard let</code> is an alternative to <code>if let</code> that exits early if the condition fails:\n\n<pre><code>func greet(username: String?) {\n    guard let name = username else {\n        print("No name")\n        return\n    }\n    print("Hello, \\(name)")\n}</code></pre>\n\nUse <code>guard let</code> when the nil case is the exceptional path and the non-nil case is the happy path — it keeps the happy path un-indented and easier to read.`,
        quiz: {
          question: "In Swift, what does String? represent?",
          options: [
            "An optional String — a value that is either a valid String or nil, requiring explicit unwrapping before use",
            "A required String that must be set at initialisation and cannot be nil",
            "A special syntax for string interpolation, equivalent to \\(value) in a string literal",
            "A String that has been validated and is safe to use without error handling"
          ],
          correct: 0,
          feedback: "In Swift, the ? suffix makes a type optional — it can hold a value of that type or nil. String? is either a String or nil. The compiler prevents you from using it directly as a String without unwrapping. Option 2 describes a non-optional String (without ?). Option 3 confuses the syntax — string interpolation uses \\(). Option 4 is not a Swift concept."
        }
      },
      {
        id: 'tr-swift-3',
        title: 'SwiftUI Basics',
        body: `SwiftUI is <strong>declarative</strong>: you describe what the UI should look like, and SwiftUI renders it. A SwiftUI view is a Swift struct that conforms to the <code>View</code> protocol, which requires a <code>body</code> property that returns some view content.\n\n<pre><code>struct ContentView: View {\n    var body: some View {\n        VStack(spacing: 16) {\n            Text("Hello, World!")\n                .font(.title)\n                .bold()\n                .foregroundColor(.blue)\n            Image(systemName: "star.fill")\n                .font(.system(size: 40))\n                .foregroundColor(.yellow)\n        }\n        .padding()\n    }\n}</code></pre>\n\n<strong>Modifiers</strong> are methods that return a modified copy of the view. They chain — each modifier wraps the previous result. Order matters: <code>.padding()</code> applied before <code>.background()</code> will pad inside the background; applied after, it pads outside.\n\n<strong>Layout containers</strong> arrange child views:\n- <code>VStack</code> — vertical stack (top to bottom)\n- <code>HStack</code> — horizontal stack (left to right)\n- <code>ZStack</code> — depth stack (back to front, for overlays)\n- <code>List</code> — scrollable list with automatic row dividers\n- <code>ScrollView</code> — any content made scrollable\n\n<div class="inline-q"><span class="iq-label">SF Symbols:</span> Apple provides over 6,000 system icons accessible by name via <code>Image(systemName: "icon-name")</code>. Browse them at developer.apple.com/sf-symbols or in the SF Symbols app. Using system icons gives your app a native look with zero effort.</div>\n\n<strong>The preview:</strong> Every SwiftUI file includes a preview struct that renders in Xcode's canvas. You can have multiple previews with different data or device sizes. The preview updates live as you type — this tight feedback loop is what makes SwiftUI so productive.`,
        callout: {
          type: 'focus',
          label: 'Think in views and modifiers',
          text: 'SwiftUI has one core pattern: everything is a view, and views are modified by chaining methods. Master VStack, HStack, ZStack, Text, Image, Button and the most common modifiers (font, foregroundColor, padding, background, frame) and you can build almost any screen.'
        },
        hint: `The <code>some View</code> return type is Swift's opaque type feature. You don't need to specify the exact type that <code>body</code> returns — you just say it's "some View" and Swift figures it out. This is necessary because modifier chains create deeply nested generic types that would be painful to write explicitly.`,
        quiz: {
          question: "What does a modifier do in SwiftUI?",
          options: [
            "It returns a new view that wraps the original with the specified visual or behavioural change applied — modifiers chain to build up the final appearance",
            "It permanently changes a property of the view struct in memory",
            "It sends a message to the view's parent to update the screen",
            "It defines a new type of view that can be reused elsewhere in the app"
          ],
          correct: 0,
          feedback: "SwiftUI modifiers are methods that return a new, modified view — they don't mutate the original. Each modifier in a chain wraps the result of the previous one. This is why order matters. SwiftUI views are value types (structs), so there is no permanent in-place mutation (option 2). Modifiers don't communicate with parent views (option 3) — that's done via bindings and environment. They don't define new types (option 4) — they return anonymous wrapper types."
        }
      },
      {
        id: 'tr-swift-4',
        title: 'State and Navigation',
        body: `SwiftUI's views are structs — they're recreated on every render. To persist data across renders, you need <strong>state</strong>. The <code>@State</code> property wrapper tells SwiftUI that this property owns a piece of mutable state. When the state changes, SwiftUI re-renders the body:\n\n<pre><code>struct CounterView: View {\n    @State private var count = 0\n\n    var body: some View {\n        VStack {\n            Text("\\(count)")\n                .font(.largeTitle)\n            Button("Increment") {\n                count += 1\n            }\n        }\n    }\n}</code></pre>\n\n<code>@Binding</code> allows a child view to read and write state owned by a parent. The parent passes a binding with the <code>$</code> prefix:\n\n<pre><code>struct ToggleRow: View {\n    @Binding var isOn: Bool\n    var label: String\n\n    var body: some View {\n        Toggle(label, isOn: $isOn)\n    }\n}\n\n// In the parent:\n@State private var darkMode = false\nToggleRow(isOn: $darkMode, label: "Dark Mode")</code></pre>\n\n<code>@ObservableObject</code> (or <code>@Observable</code> in Swift 5.9+) is for state that needs to be shared across multiple views or persists at a higher level than a single view. It's a class that publishes changes, and views observe it.\n\n<strong>Navigation</strong> in SwiftUI uses <code>NavigationStack</code> and <code>NavigationLink</code>:\n\n<pre><code>NavigationStack {\n    List(items) { item in\n        NavigationLink(item.title, destination: DetailView(item: item))\n    }\n    .navigationTitle("Items")\n}</code></pre>\n\n<div class="inline-q"><span class="iq-label">The rule:</span> Use @State for local, private state that belongs to one view. Use @Binding to share a piece of parent state with a child. Use @Observable/@ObservableObject for state that spans multiple views or the whole app.</div>`,
        callout: {
          type: 'default',
          label: 'Sheet vs Navigation',
          text: 'Use NavigationLink to push a new screen onto a stack (like drilling into a list item). Use .sheet() to present a modal overlay (like an edit form or settings). The choice tells users whether they\'re going deeper or doing a temporary action.'
        },
        hint: `To dismiss a presented view from within the view itself, use the <code>@Environment(\\.dismiss)</code> value:\n\n<pre><code>struct DetailView: View {\n    @Environment(\\.dismiss) var dismiss\n    var body: some View {\n        Button("Done") { dismiss() }\n    }\n}</code></pre>`,
        quiz: {
          question: "What does @State do in a SwiftUI view?",
          options: [
            "It marks a property as a source of truth owned by the view — when the property changes, SwiftUI automatically re-renders the view's body to reflect the new value",
            "It marks a property as read-only and prevents it from being changed after initialisation",
            "It shares a property across all views in the app so any view can read and write it",
            "It persists a property to disk so the value survives the app being closed and reopened"
          ],
          correct: 0,
          feedback: "@State marks a property as mutable state owned by the view. SwiftUI stores the actual value outside the struct (so it survives re-renders) and triggers a new render whenever it changes. Option 2 describes a constant (let). Option 3 describes @EnvironmentObject or @Observable. Option 4 describes UserDefaults or SwiftData persistence — @State only persists for the lifetime of the view."
        }
      },
      {
        id: 'tr-swift-5',
        title: 'Your iOS App Plan',
        body: `The workflow for building an iOS app is distinct from web development. You write and run code in <strong>Xcode</strong>, Apple's IDE (free, Mac-only). You test in the <strong>iOS Simulator</strong> — a full iPhone or iPad emulator that runs on your Mac — or on a physical device connected via USB.\n\nA typical development cycle: edit code in Xcode → simulator rebuilds → preview updates live (for SwiftUI) or you run the app → test the feature → repeat. The loop is fast for UI work because of SwiftUI's live previews.\n\nFor <strong>data persistence</strong>, you have several options depending on scale: <code>UserDefaults</code> for small key-value data (settings, preferences), <code>SwiftData</code> or <code>Core Data</code> for structured, queryable data (like a task list or journal), and network APIs for anything that needs to sync across devices.\n\nFor <strong>networking</strong>, Swift's <code>URLSession</code> handles HTTP requests natively. Combined with <code>Codable</code> — Swift's built-in JSON encoding and decoding protocol — you can fetch data from any API and map it directly to Swift structs with very little code.\n\n<div class="inline-q"><span class="iq-label">Before you start:</span> Sketch your app on paper first. Draw every screen. Draw the arrows between screens (the navigation flow). Identify what data each screen needs and where that data lives. A clear paper sketch will save you hours of refactoring once you start coding.</div>\n\nThe most important thing at this stage is to build <strong>something small and complete</strong>. A weather app that shows current conditions for one city. A simple timer. A personal daily journal. Completeness — an app that actually works end to end — is more valuable than a complex app that's half-finished.`,
        callout: {
          type: 'focus',
          label: 'The fastest path to your first app',
          text: 'Open Xcode. Create a new project (iOS → App → SwiftUI). Replace ContentView with a VStack containing Text and a Button connected to @State. See it work in the simulator. That first working screen is the foundation everything else is built on.'
        },
        checklist: [
          "I understand the difference between SwiftUI (declarative, modern) and UIKit (imperative, older)",
          "I know what an optional is and how to safely unwrap it with if let, guard let, or ??",
          "I can explain the difference between @State (local to one view) and @ObservableObject (shared across views)",
          "I know how to push a new view using NavigationLink inside a NavigationStack",
          "I have a concrete iOS app idea I can describe in one sentence and sketch on paper"
        ]
      }
    ]
  }
];
