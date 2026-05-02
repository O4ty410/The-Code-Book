

const FLOORS = [
  {
    id: 1,
    title: "Understanding Before Touching",
    subtitle: "How code actually thinks",
    color: "#c8a96e",
    duration: "3–4 weeks",
    sessions: "5 per week",
    length: "45–60 min",
    tag: "Floor 01 — Foundation",
    sections: [
      {
        id: "1-1",
        title: "How the Internet Actually Works",
        body: `Before you write a single line of code, you need to understand the world your code lives in. The internet isn't magic — it's a system, and like any system, once you understand how it works, you can start to control it.

<strong>Think of it like this.</strong> When you type a web address into your browser, your computer sends a message — like posting a letter — to another computer somewhere in the world called a <strong>server</strong>. That server receives your request, finds the right files, and sends them back. Your browser then reads those files and paints what you see on screen.

That entire process happens in milliseconds, every single time you visit a website.`,
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
        hint: `Imagine the internet like a postal service. You are the sender. The website is the recipient. Your browser writes the letter (the request), sends it to the right address (the server), and the server writes back with everything needed to paint the page on your screen.\n\n<strong>Still fuzzy?</strong> Try this — next time you visit a website, think: "somewhere in the world, a computer just received my request and sent me back a bunch of files." That's literally all that happened.`,
        quiz: {
          question: "When you visit a website, what is your browser actually doing?",
          options: ["Creating the website from scratch", "Requesting and displaying files from another computer", "Downloading the entire internet", "Connecting directly to the website owner"],
          correct: 1,
          feedback: "Correct. Your browser sends a request to a server — another computer — which sends back files. Your browser reads those files and displays them. That's it. That's the web."
        }
      },
      {
        id: "1-2",
        title: "How a Computer Reads Instructions",
        body: `Computers are extraordinarily fast. But they are not smart. They do <strong>exactly</strong> what you tell them — nothing more, nothing less. This is both the challenge and the power of coding.

A computer reads code <strong>line by line, top to bottom</strong>. It doesn't skip ahead. It doesn't assume. It reads instruction 1, executes it, then reads instruction 2. This is called <strong>sequential execution</strong>.

This means that the order you write things in <strong>matters enormously</strong>. A recipe that says "eat the cake" before "bake the cake" is going to cause problems. Code works the same way.`,
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
          question: "If your code says: Step 1: Display the result. Step 2: Calculate the result. What happens?",
          options: ["It works fine, computers are smart enough to reorder", "It displays nothing or an error, because the result doesn't exist yet", "It calculates first anyway", "It asks you what to do"],
          correct: 1,
          feedback: "The computer tries to display the result before it's been calculated — so there's nothing to show. Order is everything. This is one of the most common beginner mistakes, and now you already understand why it happens."
        }
      },
      {
        id: "1-3",
        title: "The Logic Behind All Code",
        body: `Every programming language in the world — no matter how different they look — is built on the same three ideas. Learn these three things and you understand the skeleton of all code everywhere.

<strong>1. Conditions</strong> — If this is true, do this. Otherwise, do that.
<strong>2. Loops</strong> — Do this thing repeatedly until something changes.
<strong>3. Functions</strong> — A named set of instructions you can use again and again.

That's it. Every app, every game, every website you've ever used is built on combinations of those three ideas.`,
        callout: {
          type: "default",
          label: "Real World Example",
          text: "A traffic light is a loop (keeps cycling) with conditions (if it's been red for 60 seconds, turn green) and functions (a reusable set of steps for each colour change). You already understand code logic. You just haven't written it yet."
        },
        hint: `A <strong>condition</strong> is a fork in the road — if it's raining, take an umbrella, otherwise don't.\nA <strong>loop</strong> is like brushing your teeth — you repeat the same motion until the job is done.\nA <strong>function</strong> is like a vending machine — you press a button (call the function) and it always does the same thing.\n\n<strong>Still fuzzy?</strong> Look around the room and find one real-world example of each. A thermostat is a condition. A washing machine cycle is a loop. A light switch is a function.`,
        quiz: {
          question: "Which of the three core concepts means: 'Do this over and over until something stops you'?",
          options: ["A condition", "A function", "A loop", "A variable"],
          correct: 2,
          feedback: "A loop repeats instructions until a condition tells it to stop. A condition decides which path to take. A function is a reusable block of instructions. These three are the building blocks of everything."
        }
      },
      {
        id: "1-4",
        title: "Your First Look at Real Code",
        body: `You're not going to write code yet. You're going to <strong>read</strong> it. This is important — before you write a language, you learn to read it. Same principle.

Look at the code below. Don't panic. Don't try to memorise it. Just try to read it like a sentence and see if you can guess what it does before reading the explanation.`,
        code: {
          lang: "HTML",
          lines: [
            '<span class="code-comment"><!-- This is a comment. The computer ignores it. It\'s just a note for humans. --></span>',
            '',
            '<span class="code-tag">&lt;h1&gt;</span>Hello, World<span class="code-tag">&lt;/h1&gt;</span>',
            '<span class="code-tag">&lt;p&gt;</span>This is my first piece of code.<span class="code-tag">&lt;/p&gt;</span>',
            '<span class="code-tag">&lt;button&gt;</span>Click Me<span class="code-tag">&lt;/button&gt;</span>'
          ]
        },
        callout: {
          type: "default",
          label: "What You're Looking At",
          text: "Those angle brackets — the &lt; and &gt; — are called <strong>tags</strong>. They're labels that tell the browser what each piece of content is. h1 means a big heading. p means a paragraph. button means a clickable button. Open tag, content, close tag. That's the pattern."
        },
        callout2: {
          type: "focus",
          label: "Visual Learner Note",
          text: "In the next floor, everything you read here becomes something you can actually <strong>see on screen</strong>. The visual reward is coming. For now just let the pattern land."
        },
        hint: `Don't read the code like a sentence. Read it like signs on a road.\n\nThe tag name tells you what type of thing it is. &lt;h1&gt; = big heading. &lt;p&gt; = paragraph. &lt;button&gt; = button. The words between the opening and closing tag are what actually appears on screen.\n\n<strong>Still fuzzy?</strong> Think of tags like labels on boxes. The label tells you what's inside. The content is the thing inside the box. Open the box (opening tag), here's what's inside (content), close the box (closing tag).`,
      },
      {
        id: "1-5",
        title: "Floor 1 Check — Explain It Back",
        body: `This is the most important section of Floor 1. Not because it's the hardest — but because explaining something back is how you prove to yourself that it has actually landed.

Answer these in your head, or write them down, as if you were explaining them to a friend who knows nothing about coding.

<strong>The questions:</strong>`,
        callout: {
          type: "default",
          label: "Your Floor 1 Check",
          text: "1. What happens when you type a web address into your browser?\n\n2. Why does the order of code instructions matter?\n\n3. What are the three building blocks of all code?\n\n4. What does an HTML tag do?"
        },
        callout2: {
          type: "focus",
          label: "Honest Assessment",
          text: "If you can answer all four in plain English without looking back — you're ready for Floor 2. If one or two feel shaky — go back to that section, not the whole floor. One weak brick, not a broken building."
        },
        hint: `If you can't answer one of the four questions, that's not failure — that's information. It tells you exactly which section to go back to.\n\n<strong>Tip:</strong> Don't go back to the beginning. Go back to the one section that felt unclear and just read that part again. One weak spot doesn't mean you don't understand the rest.`,
      }
    ]
  },
  {
    id: 2,
    title: "Seeing It Come Alive",
    subtitle: "HTML & CSS — the visual layer",
    color: "#7eb8c8",
    duration: "6–8 weeks",
    sessions: "5 per week",
    length: "45–60 min",
    tag: "Floor 02 — Visual Building",
    sections: [
      {
        id: "2-1",
        title: "System Online — Boot Sequence",
        body: `The system has detected an error. Your job is to fix it.\n\nBelow is a live console. A variable has been declared but not assigned. Assign the correct value to bring Floor 2 online.`,
        interactive: 'f2-variable',
        hint: `Variables hold values. We are on Floor 2. The value must be exactly 2 — an integer, not text.`,
        checklist: ["I understand what a variable is", "I assigned the correct value", "The system came online"]
      },
      {
        id: "2-2",
        title: "HTML — The Skeleton",
        body: `Every webpage you have ever visited is built with HTML at its core. HTML gives a page its <strong>structure</strong>. It says: here is a heading. Here is a paragraph. Here is a button.\n\nThink of it like the frame of a house. Before the walls, before the paint — there's a frame. HTML is the frame.`,
        callout: { type: "default", label: "The Pattern", text: "Every HTML element follows the same pattern: opening tag, content, closing tag. That's it. That's the whole language." },
        hint: `Open any website, right-click anywhere and choose "View Page Source." Everything you see is HTML. Scan it and try to spot tags you recognise — h1, p, button. They're everywhere.`,
        code: { lang: "HTML", lines: ['<span class="code-tag">&lt;h1&gt;</span>This is a heading<span class="code-tag">&lt;/h1&gt;</span>', '<span class="code-tag">&lt;p&gt;</span>This is a paragraph.<span class="code-tag">&lt;/p&gt;</span>', '<span class="code-tag">&lt;button&gt;</span>Click Me<span class="code-tag">&lt;/button&gt;</span>'] },
        checklist: ["I understand that HTML provides structure", "I can read the open tag / content / close tag pattern"]
      },
      {
        id: "2-3",
        title: "CSS — Making It Look Like Something",
        body: `If HTML is the skeleton, <strong>CSS is the skin and the style</strong>. CSS tells the browser how to display things. What colour is that heading? How big is that text? Where does that button sit?\n\nWithout CSS, every website would look like a plain text document.`,
        callout: { type: "focus", label: "Visual Learner Moment", text: "CSS is where the visual magic lives. Every colour, every font, every layout. This is going to be one of your strongest areas." },
        hint: `Think of CSS like instructions to an interior designer. "The headings — make them gold. The background — make it dark." CSS is just that conversation written in a specific format: what you're targeting, then what you want to change.`,
        code: { lang: "CSS", lines: ['<span class="code-tag">h1</span> {', '  <span class="code-attr">color</span>: <span class="code-string">#c8a96e</span>;', '  <span class="code-attr">font-size</span>: <span class="code-value">48px</span>;', '}'] },
        checklist: ["I understand the difference between HTML and CSS", "I can read basic CSS syntax"]
      },
      {
        id: "2-4",
        title: "Your First Webpage",
        body: `Now you build something. Open a plain text editor on your device. Type the code below exactly as you see it. Save the file as <strong>index.html</strong> and open it in your browser.\n\nYou will see a real webpage. One that you made.`,
        callout: { type: "warning", label: "The Cautious Learner", text: "You might be tempted to skip this and just read it. Don't. The physical act of typing the code activates something different in the brain than reading it. Do the thing." },
        hint: `If your page isn't showing anything — check that you saved with the .html extension, not .txt. And make sure you're opening it in a browser, not a text editor.`,
        code: { lang: "HTML + CSS", lines: ['<span class="code-tag">&lt;!DOCTYPE html&gt;</span>', '<span class="code-tag">&lt;html&gt;&lt;head&gt;&lt;style&gt;</span>', '  <span class="code-tag">body</span> { background: #0a0a0a; color: white; }', '  <span class="code-tag">h1</span> { color: #c8a96e; }', '<span class="code-tag">&lt;/style&gt;&lt;/head&gt;&lt;body&gt;</span>', '  <span class="code-tag">&lt;h1&gt;</span>I built this.<span class="code-tag">&lt;/h1&gt;</span>', '  <span class="code-tag">&lt;p&gt;</span>Day one. Already making things.<span class="code-tag">&lt;/p&gt;</span>', '<span class="code-tag">&lt;/body&gt;&lt;/html&gt;</span>'] },
        checklist: ["I typed the code out", "I saved it as index.html", "I opened it and saw my webpage", "I changed at least one thing"]
      },
      {
        id: "2-5",
        title: "Floor 2 Project — Your Personal Page",
        body: `Build a webpage about yourself. It must include your name as a heading, a short paragraph, a list of 3 interests, a background colour that feels like you, a custom font, and one thing you added that wasn't in any lesson.\n\nThat last requirement is the most important. It forces you to figure something out yourself.`,
        callout: { type: "default", label: "Why This Matters", text: "That self-directed addition is where the developer mindset begins. Figuring something out alone — even once — builds more confidence than ten guided examples." },
        hint: `If you're staring at a blank file not knowing where to start — start with just the HTML. No CSS yet. Get the words on the page first. Then add the style. One thing at a time.`,
        checklist: ["I built my personal webpage", "It has all 6 elements", "I added something I figured out myself", "I'm happy with how it looks", "I'm ready for Floor 3"]
      }
    ]
  },
  {
    id: 3,
    title: "Building With Training Wheels",
    subtitle: "JavaScript — making things actually work",
    color: "#c87e9a",
    duration: "8–10 weeks",
    sessions: "5 per week",
    length: "60 min",
    tag: "Floor 03 — Interactivity",
    sections: [
      {
        id: "3-1",
        title: "What JavaScript Does",
        body: `HTML is structure. CSS is style. <strong>JavaScript is behaviour.</strong>

It's the language that makes things happen when you interact with a page. A button that does something when you click it. A form that validates your input. A menu that slides open. An image that changes. A countdown timer. A game.

All of that is JavaScript. It's the language that brings web pages to life.

Unlike HTML and CSS, JavaScript is a <strong>proper programming language</strong>. It has variables, conditions, loops, functions — all three of those core concepts from Floor 1, but now written out in real code.`,
        callout: {
          type: "default",
          label: "The Shift",
          text: "This is where it starts to feel like real programming. It will feel harder than Floors 1 and 2. That feeling is normal and expected. It means you're actually learning something new, not just practising something familiar."
        },
        callout2: {
          type: "warning",
          label: "For the Cautious Learner",
          text: "The steps stay small here. You will not be thrown in at the deep end. Every concept gets a visual example before you have to use it yourself."
        },
        hint: `HTML = the bones. CSS = the look. JavaScript = the brain.\n\nWithout JavaScript a page is just a static document. JavaScript is what makes things respond to you — clicks, typing, scrolling. It's what makes a website feel alive.\n\n<strong>Feeling nervous about this floor?</strong> That's completely normal. JavaScript is a step up. But remember — you already understand the three concepts it's built on: conditions, loops, functions. You met them in Floor 1. Now you just get to see them written out for real.`,
      },
      {
        id: "3-2",
        title: "Variables, Conditions and Loops in Real Code",
        body: `You already understand these concepts from Floor 1. Now you see what they look like when actually written.`,
        code: {
          lang: "JAVASCRIPT",
          lines: [
            '<span class="code-comment">// A variable — storing a piece of information</span>',
            '<span class="code-keyword">let</span> myName = <span class="code-string">"Your Name Here"</span>;',
            '',
            '<span class="code-comment">// A condition — if this, do that</span>',
            '<span class="code-keyword">if</span> (myName === <span class="code-string">"Your Name Here"</span>) {',
            '  console.log(<span class="code-string">"You haven\'t changed the name yet!"</span>);',
            '} <span class="code-keyword">else</span> {',
            '  console.log(<span class="code-string">"Hello, "</span> + myName);',
            '}',
            '',
            '<span class="code-comment">// A loop — do this 5 times</span>',
            '<span class="code-keyword">for</span> (<span class="code-keyword">let</span> i = <span class="code-value">1</span>; i <= <span class="code-value">5</span>; i++) {',
            '  console.log(<span class="code-string">"Loop number: "</span> + i);',
            '}'
          ]
        },
        callout: {
          type: "focus",
          label: "Logical Thinker Note",
          text: "Read each block and trace through what it does before looking at the explanation. Your logical brain will get most of it right. Trust it."
        },
        hint: `<strong>Variable:</strong> A named box that holds a value. let age = 25 means "create a box called age and put 25 in it."\n\n<strong>Condition:</strong> if (age > 18) { do this } else { do that }. Reads almost like plain English.\n\n<strong>Loop:</strong> for (let i = 1; i <= 5; i++) — this says "start at 1, keep going as long as i is 5 or less, add 1 each time."\n\n<strong>Still fuzzy?</strong> Copy the code into a blank HTML file inside script tags, open it in your browser, then open the Developer Console (F12). You'll see the output printed there. Seeing it run is worth more than reading it ten times.`,
      },
      {
        id: "3-3",
        title: "Buttons That Actually Do Things",
        body: `This is the session that changes everything. You're going to connect JavaScript to HTML so that when someone clicks a button, <strong>something actually happens.</strong>

This is called <strong>DOM manipulation</strong> — DOM stands for Document Object Model, which is just a fancy way of saying "the HTML that's currently on screen." JavaScript can reach in and change it.`,
        code: {
          lang: "HTML + JAVASCRIPT",
          lines: [
            '<span class="code-tag">&lt;button</span> <span class="code-attr">onclick</span>=<span class="code-string">"changeText()"</span><span class="code-tag">&gt;</span>Click Me<span class="code-tag">&lt;/button&gt;</span>',
            '<span class="code-tag">&lt;p</span> <span class="code-attr">id</span>=<span class="code-string">"message"</span><span class="code-tag">&gt;</span>Nothing has happened yet.<span class="code-tag">&lt;/p&gt;</span>',
            '',
            '<span class="code-tag">&lt;script&gt;</span>',
            '  <span class="code-keyword">function</span> changeText() {',
            '    <span class="code-keyword">let</span> msg = document.getElementById(<span class="code-string">"message"</span>);',
            '    msg.innerText = <span class="code-string">"You just ran JavaScript."</span>;',
            '  }',
            '<span class="code-tag">&lt;/script&gt;</span>'
          ]
        },
        callout: {
          type: "default",
          label: "What Just Happened",
          text: "The button calls a function. The function finds the paragraph by its id. Then it changes the text inside it. Three lines of JavaScript. Real interactivity. This is the moment it starts to feel like power."
        },
        hint: `The id is like a name tag. You put id="message" on the paragraph so JavaScript can find it by name.\n\ndocument.getElementById("message") means "go find the element with the name tag that says message."\n\n.innerText = "..." means "change what's written on it."\n\n<strong>Still fuzzy?</strong> Read the code out loud as if you were giving instructions to someone. "Find the thing called message. Change its text to this." That's literally what the code says.`,
      },
      {
        id: "3-4",
        title: "Understanding Why Things Break",
        body: `Every developer in the world, at every level, writes code that breaks. The difference between a beginner and a professional isn't that professionals don't make mistakes. It's that <strong>professionals know how to find and fix them.</strong>

This skill is called <strong>debugging</strong>. And it's one of the most important things you'll learn on this entire journey.

The browser has a built-in tool called the <strong>Developer Console</strong>. Press F12 in any browser to open it. When your code breaks, the error will be described there — what went wrong, and on which line.`,
        callout: {
          type: "warning",
          label: "The Cautious Learner",
          text: "Broken code is not failure. It is the process. Every error message is the computer telling you exactly what it needs from you. Learn to read them as information, not as judgement."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "When something breaks and you can't find why — <strong>stop, step away for 5 minutes, come back.</strong> The answer is almost always obvious after a short break. This is true for every developer at every level."
        },
        hint: `When something breaks, the first question is always: <strong>what does the console say?</strong> Open it with F12, click "Console." If there's a red error message, read it carefully — it usually tells you the line number and what went wrong.\n\n<strong>Most common beginner errors:</strong>\n— Typo in a variable name (JavaScript is case-sensitive — myName and myname are different things)\n— Missing a closing bracket or curly brace\n— Calling a function before it's been defined\n\nIf you're truly stuck, copy the error message exactly and search it on Google. Someone has had that exact error before.`,
      },
      {
        id: "3-5",
        title: "Floor 3 Project — An Interactive Webpage",
        body: `Your Floor 3 project is your most complex build yet. You're going to combine everything — HTML structure, CSS style, and JavaScript behaviour — into one working interactive piece.

<strong>The brief:</strong> Build a simple quiz. Any topic you like. At least 3 questions. The user clicks their answer, the page tells them if they're right or wrong, and at the end it shows their score.

This will feel like a lot. Break it into pieces. One question first. Then add the score. Then add the rest.`,
        callout: {
          type: "default",
          label: "Why a Quiz",
          text: "A quiz uses conditions (is this answer correct?), functions (check the answer, show the score), and DOM manipulation (change what's on screen). It exercises everything from this floor in one build."
        },
        hint: `Break it into the smallest possible steps. Don't try to build the whole quiz at once.\n\nStep 1: Show one question on screen. That's it. Just the text.\nStep 2: Add the answer buttons.\nStep 3: Make one button check if it's correct.\nStep 4: Show "correct" or "wrong."\nStep 5: Add a score variable that goes up by 1 when correct.\nStep 6: Repeat for questions 2 and 3.\nStep 7: Show the final score.\n\n<strong>Each step is small enough to not be scary.</strong> You never have to build the whole thing — just the next small piece.`,
      }
    ]
  },
  {
    id: 4,
    title: "Building Alone",
    subtitle: "Where the doer starts to emerge",
    color: "#9a7ec8",
    duration: "10–12 weeks",
    sessions: "5 per week",
    length: "60–90 min",
    tag: "Floor 04 — Independence",
    sections: [
      { id: "4-1", title: "Receiving a Brief", body: `From this floor onward, things change. I give you a brief — a description of what to build — and you figure out how to build it without being walked through every step.\n\nThis is how real development works. A client, a manager, or your own idea gives you a target. You use what you know, research what you don't, and produce something that works.\n\nThe first brief is simple. More complex ones follow. But the pattern is the same: <strong>understand the brief, plan before you code, build, review.</strong>`, callout: { type: "default", label: "Brief 01", text: "Build a tip calculator. The user enters a bill amount and selects a tip percentage (10%, 15%, 20%). The page calculates and displays the tip amount and the total." }, callout2: { type: "focus", label: "Plan First", text: "Before you write a single line of code, write out in plain English what the calculator needs to do. Then identify which HTML elements you need, which CSS styles, and which JavaScript functions. Plan first. Code second." }, hint: `Break the tip calculator into just three questions before touching code:\n\n1. What does the user need to type or click? (inputs)\n2. What does the page need to calculate? (logic)\n3. What does the page need to show? (output)\n\nAnswer those in plain English first. Then each answer becomes a piece of code.\n\n<strong>Still stuck?</strong> Start even smaller — just get an input box on screen. Then get the number out of it with JavaScript. Then multiply it. One tiny piece at a time.`, checklist: ["I read the brief carefully", "I planned the build before starting", "I built the tip calculator", "It works correctly with different inputs"] },
      { id: "4-2", title: "How Developers Actually Think", body: `Professional developers don't memorise everything. They can't — there's too much. What they have instead is a <strong>process</strong>.\n\nWhen they face a new problem: they break it down into smaller pieces. They solve the smallest piece first. Then the next. They use documentation and search engines without shame. They test constantly. And they know that the first version doesn't have to be perfect — it just has to work.\n\nThis floor is about building that process in you.`, callout: { type: "default", label: "The Developer Mindset", text: "A professional developer Googles things every single day. Knowing how to find answers quickly and evaluate them correctly is itself a core skill. You are learning to think like a developer, not to become a dictionary." }, hint: `If you feel like you should already know the answer without looking it up — let that feeling go. It isn't how this works.\n\nThe skill isn't memorising. The skill is knowing <strong>how to find the answer quickly and recognise a good one</strong>. That takes time to build and it builds through practice, not through reading.\n\n<strong>Practical tip:</strong> When you search for something, after you've solved it, close the tab and try to write the solution again from memory. That repetition is what moves it from "I found it" to "I know it."`, checklist: ["I understand that looking things up is normal", "I can break a problem into smaller steps", "I test my code as I build, not just at the end"] },
      { id: "4-3", title: "Introduction to Storing Data", body: `So far, everything your code does disappears when the page refreshes. Real applications need to <strong>remember things</strong>.\n\nThis section introduces you to two ideas: <strong>localStorage</strong> (the browser can remember small amounts of data even after the page closes) and the concept of <strong>databases</strong> (which we'll build in Floor 5).\n\nFor now, localStorage lets you build things that actually persist. A to-do list that remembers your items. A preference that saves your chosen colour theme. Small but powerful.`, callout: { type: "default", label: "Why This Matters", text: "The moment your code can remember things is the moment it starts feeling like a real product rather than a demo. This is a significant step." }, hint: `localStorage works like a small notepad the browser keeps.\n\nTo save something: localStorage.setItem('myKey', 'myValue')\nTo get it back: localStorage.getItem('myKey')\nTo delete it: localStorage.removeItem('myKey')\n\n<strong>Important:</strong> localStorage only stores text. If you want to save a list or an object, convert it first with JSON.stringify() and convert it back with JSON.parse(). That sounds complicated but it's just two words to remember.\n\n<strong>Still fuzzy?</strong> Build a page with a text input and a save button. When you click save, store what's in the input. Reload the page. Check if it's still there. That moment of "it remembered!" is worth a hundred explanations.`, checklist: ["I understand what localStorage does", "I built something that saves data between page refreshes", "I understand that databases do the same thing at a much larger scale"] },
      { id: "4-4", title: "Code Review — Looking at What You Built", body: `A code review is when you look back at your own code with fresh eyes — or when someone else does — and asks: is this the best way to do it?\n\nAs you review your previous projects, ask yourself:\n\n<strong>Is it readable?</strong> Could someone else understand what this code does?\n<strong>Is it repetitive?</strong> Am I writing the same thing multiple times when a function could handle it?\n<strong>Does it handle mistakes?</strong> What happens if the user enters something unexpected?`, callout: { type: "focus", label: "The Logical Thinker's Favourite Section", text: "Code review is where your logical mind shines. You're not just making things work — you're asking why it works and whether it could work better. That habit separates good developers from great ones." }, hint: `When reviewing your own code, read it as if you've never seen it before. Better still — leave it for a day, then come back.\n\n<strong>Three quick questions for any piece of code:</strong>\n1. If I read this variable name alone, do I know what it holds?\n2. Could I explain what this function does in one sentence?\n3. What happens if the user does something I didn't expect?\n\nIf any answer is "I'm not sure" — that's what needs fixing. Not because it's broken, but because unclear code causes problems later.`, checklist: ["I reviewed my Floor 3 project with fresh eyes", "I found at least one thing I could improve", "I improved it"] },
      { id: "4-5", title: "Floor 4 Project — Something You Designed", body: `No brief this time. Just a constraint.\n\n<strong>Build something that solves a problem you actually have.</strong>\n\nIt can be small. A habit tracker. A simple budget tool. A random meal picker. A reading list. Anything that would genuinely be useful to you.\n\nIt must use HTML, CSS, and JavaScript. It must store at least one piece of data. And it must be something you'd actually use.`, callout: { type: "warning", label: "The Fear of the Blank Page", text: "This is where the cautious learner hesitates. You might feel like your idea isn't good enough or too simple. <strong>Build it anyway.</strong> The idea doesn't matter as much as the act of designing and building something from nothing." }, hint: `If you truly cannot think of an idea, use one of these:\n— A mood tracker that saves today's mood with a date\n— A simple counter that remembers its number after refresh\n— A personal quote collection where you save your favourite quotes\n— A daily water intake tracker\n\nNone of these are impressive. All of them are real. The point isn't the idea — it's the experience of making every decision yourself, from the first line to the last.`, checklist: ["I identified a real problem to solve", "I planned the build before starting", "I built it", "It uses localStorage", "I would actually use it", "I'm ready for Floor 5"] }
    ]
  },
  {
    id: 5,
    title: "Solving Real Problems",
    subtitle: "Backend, databases, APIs — the full picture",
    color: "#7ec8a9",
    duration: "4–5 months",
    sessions: "5 per week",
    length: "60–90 min",
    tag: "Floor 05 — Full Stack",
    sections: [
      { id: "5-1", title: "What is the Backend?", body: `Everything you've built so far lives in the <strong>frontend</strong> — the part the user sees and interacts with in the browser. But most real applications have a second layer: the <strong>backend</strong>.\n\nThe backend is a computer (a server) that runs code the user never directly sees. It handles things that can't be done safely in the browser: storing sensitive data, processing payments, managing user accounts, running complex logic.\n\nIf the frontend is the shop floor, the backend is the warehouse and the office. The customer sees the shop floor. Everything that makes it function is behind the scenes.`, callout: { type: "default", label: "The Stack", text: "When you can build both the frontend and the backend, you are a Full Stack developer. That's what Floor 7 looks like. Floor 5 is where the second half begins." }, hint: `Think of a bank. The website you log into is the frontend — buttons, forms, your balance on screen. But the actual money, the security checks, the transaction history — none of that lives in your browser. It all lives on the bank's servers. That's the backend.\n\n<strong>Why can't we just do everything in the browser?</strong> Because the browser is public. Anyone can open developer tools and see your JavaScript. You would never put a password or payment logic somewhere anyone can read. The backend is where the sensitive work happens safely.`, checklist: ["I understand the difference between frontend and backend", "I understand why a backend is necessary", "I understand what a server does"] },
      { id: "5-2", title: "Databases — Storing Real Information", body: `A database is an organised system for storing and retrieving information. Think of it like an enormous, structured spreadsheet that code can read from and write to instantly.\n\nThe most common type of database is a <strong>relational database</strong> — it stores data in tables with rows and columns, and tables can relate to each other. The language used to talk to these databases is called <strong>SQL</strong>.\n\nSQL lets you: create tables, add data, retrieve data, update data, and delete data. Four operations. Everything a database ever does is a variation of one of those four.`, callout: { type: "default", label: "Your First SQL", text: "SELECT * FROM users WHERE name = 'You';\n\nThis reads as: 'Get everything from the users table where the name column equals You.' Plain English that has become code. That's SQL." }, hint: `The four database operations have a nickname: <strong>CRUD</strong>.\nCreate — add new data\nRead — get existing data\nUpdate — change existing data\nDelete — remove data\n\nEvery app you've ever used is CRUD at its core. Instagram: Create a post. Read your feed. Update your bio. Delete a comment. That's it.\n\n<strong>SQL still looks strange?</strong> Read it out loud as a sentence. SELECT name FROM users WHERE age > 18 — "Give me the name column, from the users table, where the age is over 18." It reads like a question asked to the database.`, checklist: ["I understand what a database is", "I understand the four basic database operations", "I can read basic SQL"] },
      { id: "5-3", title: "APIs — Making Systems Talk to Each Other", body: `An API (Application Programming Interface) is how different pieces of software talk to each other. When you check the weather on your phone, your app doesn't have its own weather satellite. It asks a weather API for the data.\n\nAPIs are everywhere. When you log into a website using Google, that's an API. When you see a map embedded in a page, that's a Google Maps API. When an app processes a payment, that's a payment API.\n\nAs a developer, you'll both <strong>use</strong> other people's APIs and eventually <strong>build</strong> your own.`, callout: { type: "focus", label: "The Exciting Part", text: "APIs are what let you build powerful things quickly. Instead of building a mapping system from scratch, you use Google's. Instead of building payment infrastructure, you use Stripe's. You focus on the unique part of your idea." }, hint: `An API is like a waiter in a restaurant. You (the app) don't go into the kitchen (the server) yourself. You tell the waiter (the API) what you want. The waiter goes and gets it and brings it back.\n\nYou make a <strong>request</strong> — "give me the current weather for London."\nThe API returns a <strong>response</strong> — usually a chunk of data in JSON format (which looks like a JavaScript object).\nYou then use that data however you need in your app.\n\n<strong>Best way to understand APIs:</strong> Go to openweathermap.org, get a free API key, and make your first real API call. Seeing live data appear on your screen from a request you wrote is one of the best moments in learning to code.`, checklist: ["I understand what an API is", "I made a request to a real API and displayed the data", "I understand the concept of API keys and why they exist"] },
      { id: "5-4", title: "Version Control — How Professionals Manage Work", body: `Every professional developer uses version control. The most common tool is called <strong>Git</strong>.\n\nGit keeps a complete history of every change you've ever made to your code. It lets you go back to any previous version. It lets multiple people work on the same codebase without overwriting each other. And it lets you experiment safely — try something, see if it works, and undo it if it doesn't.\n\n<strong>GitHub</strong> is a website where you store your Git projects online. It's also where employers look when they want to see your work.`, callout: { type: "warning", label: "Start Using Git Now", text: "Don't wait until you feel ready. Start putting all your projects from this point forward into Git repositories. Your GitHub profile becomes your portfolio. Every commit is evidence of your growth." }, hint: `The three Git commands you'll use 90% of the time:\n\ngit add . — "package up all my changes"\ngit commit -m "what I did" — "save a snapshot with a label"\ngit push — "send it up to GitHub"\n\nThat's it to start. Everything else — branches, merging, pull requests — comes naturally once those three are muscle memory.\n\n<strong>Common first mistake:</strong> Writing vague commit messages like "fixed stuff." Write what you actually did — "added tip calculation function" or "fixed button colour on mobile." Future you will thank present you.`, checklist: ["I installed Git", "I created a GitHub account", "I pushed at least one project to GitHub", "I understand the basic Git workflow: add, commit, push"] },
      { id: "5-5", title: "Deploying — Putting Work Live on the Internet", body: `Everything you've built so far only exists on your computer. Deployment is the process of putting your work on a server so anyone in the world can access it through a URL.\n\nFor frontend projects, <strong>Netlify</strong> and <strong>Vercel</strong> let you deploy for free in minutes. For full stack projects with a backend, platforms like <strong>Railway</strong> or <strong>Render</strong> handle the server side.\n\nThe moment you deploy your first project, you cross a line. You're no longer a student with files on a hard drive. You're a developer with work on the internet.`, callout: { type: "default", label: "Floor 5 Project", text: "Build a full stack application. It should have a frontend the user interacts with, a backend that handles data, and a database that stores it. A simple one: a note-taking app where users can create, read, update and delete notes. Deploy it. Share the link." }, hint: `Netlify is the easiest starting point for frontend deployment.\n\n1. Push your project to GitHub\n2. Go to netlify.com and sign up\n3. Click "Add new site" → "Import from Git"\n4. Connect your GitHub and select your repo\n5. Click deploy\n\nThat's genuinely it. Your project gets a live URL in under two minutes.\n\n<strong>Something broke after deploying?</strong> Check the deploy log in Netlify — it shows exactly what went wrong. Usually it's a file path that works on your computer but not on the server, or a missing dependency.`, checklist: ["I built a full stack application", "It has a real backend", "It uses a database", "It is deployed and accessible via a URL", "I'm ready for Floor 6"] }
    ]
  },
  {
    id: 6,
    title: "Specialisation",
    subtitle: "Finding your lane and going deep",
    color: "#c8967e",
    duration: "3–4 months",
    sessions: "5 per week",
    length: "60–90 min",
    tag: "Floor 06 — Your Direction",
    sections: [
      { id: "6-1", title: "Identifying Your Lane", body: `By now you have built enough to know what excites you. That feeling when you're working on something and time disappears — that's your signal.\n\nThe main lanes are:\n\n<strong>Frontend focused</strong> — You love building beautiful, interactive user interfaces. React is your next major skill.\n<strong>Backend focused</strong> — You love the logic, the architecture, the systems. Node.js, Python, databases.\n<strong>Full Stack product builder</strong> — You want to build complete products alone. Both sides, end to end.\n<strong>Data and AI</strong> — You're drawn to working with information, finding patterns, building intelligent systems. Python is your language.`, callout: { type: "focus", label: "No Wrong Answer", text: "Every lane leads to professional grade work. The best developers aren't the ones who know the most — they're the ones who went deepest in the direction that excited them most." }, hint: `Can't decide? Ask yourself these:\n\n— When you finished a project, what part did you most enjoy building — how it looked, or how it worked?\n— Do you find yourself thinking more about the user experience or about the logic underneath?\n— When you imagine your ideal job, are you designing interfaces or engineering systems?\n\nIf you genuinely enjoy both equally, Full Stack is your lane. If one made you lose track of time and the other felt like a chore — that's your answer.`, checklist: ["I know which direction pulls me most", "I've chosen my lane for this floor"] },
      { id: "6-2", title: "Going Deep in Your Chosen Direction", body: `This section is yours to shape. Based on the lane you chose, your curriculum from here looks different from someone else who chose a different lane.\n\nBut the structure is the same regardless:\n\n<strong>Week 1–2:</strong> Learn the core new technology for your lane\n<strong>Week 3–4:</strong> Build something small with it\n<strong>Week 5–8:</strong> Build something more ambitious\n<strong>Week 9–12:</strong> Build your Floor 6 project — the most complex thing you've made so far\n\nEvery session still ends with something built. Every week you can feel yourself moving forward.`, callout: { type: "default", label: "Resources by Lane", text: "Frontend: React docs, Scrimba, Frontend Mentor challenges\nBackend: Node.js docs, The Odin Project\nFull Stack: Build your own product idea\nData/AI: Python.org, fast.ai, Kaggle" }, hint: `Learning a new technology always has the same awkward first phase — everything feels unfamiliar and slower than before. That's not regression. That's what learning something new feels like.\n\n<strong>The pattern that works:</strong> Official docs first for the overview, then a short tutorial to see it in action, then immediately build something of your own with it — even tiny. The gap between following a tutorial and building something yourself is where real learning happens.\n\n<strong>Feeling lost in a tutorial?</strong> Stop. Close it. Try to recreate just the first part from memory. What you can't recreate is what you need to understand better — not what you need to watch again.`, checklist: ["I've started learning the core technology for my lane", "I've built my first thing with it", "I'm working toward my Floor 6 project"] },
      { id: "6-3", title: "Building More Complex Products", body: `The projects in this floor are bigger. They take longer. They'll hit walls you don't know how to get past yet.\n\nWhen that happens — and it will — the process is:\n\n<strong>1.</strong> Define exactly what you're stuck on. Not "it doesn't work" but "this specific function isn't returning what I expect."\n<strong>2.</strong> Search for that specific thing.\n<strong>3.</strong> Try the solution.\n<strong>4.</strong> If it doesn't work, define the new problem and repeat.\n\nThis isn't struggling. This is the job. Every developer does this every day.`, callout: { type: "focus", label: "ADHD Note", text: "Complex projects can feel overwhelming at the start. Break them into the smallest possible next task. Not 'build the login system' — 'make the input field appear on screen.' Then the next tiny thing. Momentum builds from small wins." }, hint: `When a project feels too big to start, use the "next physical action" approach.\n\nDon't write "build the dashboard." Write "create a new file called dashboard.html." That's it. One physical action.\n\nWhen that's done, the next physical action becomes obvious. Then the next. The project builds itself one tiny step at a time — you just have to keep asking "what is the very next thing I can do right now?"\n\n<strong>Losing motivation mid-project?</strong> Ship something. Deploy whatever you have, even unfinished. Seeing it live makes it real. Real things are worth finishing.`, checklist: ["I'm working on my most complex project yet", "I've hit at least one wall and pushed through it", "I understand that getting stuck is normal"] },
      { id: "6-4", title: "Using Professional Tools and Resources", body: `By Floor 6 you should be comfortable with:\n\n<strong>Documentation</strong> — every technology has official docs. Learning to read them is a superpower.\n<strong>Stack Overflow</strong> — the world's largest database of developer questions and answers.\n<strong>GitHub</strong> — not just storing your work, but reading other people's code.\n<strong>AI coding assistants</strong> — tools like GitHub Copilot that suggest code as you type. Powerful when you know enough to evaluate what they suggest.\n\nNone of these replace understanding. But all of them accelerate it.`, callout: { type: "warning", label: "The Dependency Trap", text: "AI coding tools are powerful and useful. They are also dangerous if you rely on them before you understand what the code does. Use them to speed up work you understand, not to skip understanding." }, hint: `Reading documentation feels hard at first because docs are written for people who already know the basics. Here's how to approach them:\n\n1. Read the "Getting Started" section fully\n2. Skim the rest to know what exists\n3. Come back to specific sections when you need them\n\nYou don't read docs cover to cover like a book. You use them like a reference — you know they contain the answer, and you know roughly where to look.\n\n<strong>Stack Overflow tip:</strong> If your question has already been asked (it almost always has), look for the answer with the most votes AND check the date. A highly voted answer from 2015 might be outdated. Prefer recent answers for modern technologies.`, checklist: ["I'm comfortable reading documentation", "I've used Stack Overflow to solve a real problem", "I've read someone else's code on GitHub", "I understand when and how to use AI coding tools"] },
      { id: "6-5", title: "Floor 6 Project — Your Speciality in Action", body: `The most ambitious thing you've built yet. It must be in your chosen lane, use the technology you've learned this floor, and be something you couldn't have built six months ago.\n\nThere is no specific brief. You choose the idea. You plan the build. You execute it.\n\nWhen it's done, deploy it, write a short description of what it does and how you built it, and add it to your GitHub portfolio.`, callout: { type: "default", label: "The Portfolio", text: "By the end of Floor 6 you should have at least 3 deployed projects on GitHub with descriptions. This is your portfolio. This is what you show people." }, hint: `If you're struggling with the idea, think about who you were before you started coding. What problem did that person have that a developer could have solved?\n\nOr think forward — what's the simplest possible version of something you'd actually want to exist?\n\n<strong>The README matters as much as the code.</strong> When an employer looks at your GitHub, they read the README first. Write it like you're explaining the project to someone smart who isn't a developer. What does it do? Why did you build it? What did you learn making it?`, checklist: ["I built my most complex project yet", "It demonstrates my speciality", "It is deployed and on GitHub", "I wrote a description of how I built it", "I'm ready for Floor 7"] }
    ]
  },
  {
    id: 7,
    title: "Professional Grade",
    subtitle: "The destination",
    color: "#e8d5a0",
    duration: "3–4 months",
    sessions: "5 per week",
    length: "90 min",
    tag: "Floor 07 — Arrival",
    sections: [
      { id: "7-1", title: "System Design — Thinking at Scale", body: `At a professional level, writing code that works is the baseline. What separates senior developers is the ability to <strong>design systems</strong> — to think about how all the pieces of a large application fit together before writing a single line.\n\nSystem design asks questions like: How does this handle a million users? What happens if one part fails? How do different services communicate? Where is the data stored and why?\n\nYou don't need to master this now. But you need to start thinking this way.`, callout: { type: "default", label: "Start Small", text: "Take one of your previous projects and ask: how would I redesign this if 100,000 people used it tomorrow? What would break? What would I change? That thinking exercise is the beginning of system design." }, hint: `System design sounds intimidating but starts with simple questions.\n\nImagine your note-taking app from Floor 5 suddenly had 10,000 users. Ask:\n— Where is all that data stored? One database? Multiple?\n— What happens if the database goes down?\n— How do you make sure two people can't accidentally overwrite each other's notes?\n— How do you stop the server from crashing under the load?\n\nYou don't need to answer these perfectly. You need to know they're the right questions. That awareness is what system design thinking looks like at the beginning.`, checklist: ["I understand what system design means", "I've thought about scalability in the context of my own projects"] },
      { id: "7-2", title: "Code Quality — Writing Code Others Can Read", body: `Professional code is read far more than it is written. A codebase is a living document that multiple people touch over years. Code that only you can understand is a liability.\n\nCode quality means:\n\n<strong>Clear naming</strong> — variables and functions named for what they actually do\n<strong>Small functions</strong> — each function does one thing only\n<strong>Comments where necessary</strong> — not explaining what the code does, but why you made a particular decision\n<strong>Consistent formatting</strong> — looks the same throughout, follows conventions\n\nThis is what makes the difference between a junior developer and one who is genuinely valued in a team.`, callout: { type: "focus", label: "The Logical Thinker's Final Level", text: "Code quality is applied logical thinking. You're not just solving the problem — you're solving it in the clearest possible way for the next person who has to understand it." }, hint: `The naming test: cover the rest of the code and read just the variable or function name. Do you know what it does?\n\nBad: let x = getUserData();\nGood: let currentUserProfile = getUserData();\n\nBad: function calc(a, b) {}\nGood: function calculateTotalWithTax(price, taxRate) {}\n\n<strong>When to add a comment:</strong> Not to explain what the code does — the code should do that itself. Comments explain <em>why</em> you made a decision that isn't obvious. "Using setTimeout here because the API occasionally returns stale data on the first call" — that's a useful comment.`, checklist: ["I reviewed my Floor 6 project for code quality", "I renamed at least 3 things to be clearer", "I broke at least one large function into smaller ones"] },
      { id: "7-3", title: "Real World Problem Solving", body: `This section has no lessons. Only problems.\n\nEach session of Floor 7 begins with a real-world scenario — the kind of problem an actual developer would face — and you figure out how to solve it.\n\nSome will be technical. Some will be architectural. Some will be about communicating a technical decision to a non-technical person. All of them are the job.\n\nThe only rule: attempt a solution before looking anything up. Even if it's wrong. The attempt is where the learning lives.`, callout: { type: "warning", label: "The Final Discomfort", text: "This section will make you feel uncertain. That feeling is accurate — real problems don't come with a right answer attached. What you're building here is the confidence to move forward anyway. That's what professional grade actually means." }, hint: `When you face a problem and don't know where to start:\n\n1. Write down what you know about the problem\n2. Write down what you don't know\n3. Pick the smallest unknown and research just that\n4. Come back and update what you know\n5. Repeat\n\nThis isn't a workaround. This is the actual process senior developers use. The difference between a junior and a senior developer isn't that the senior knows more — it's that they're more comfortable sitting with not knowing while they systematically work toward an answer.`, checklist: ["I'm working through real-world problems", "I attempt a solution before researching", "I'm becoming comfortable with uncertainty"] },
      { id: "7-4", title: "Portfolio Building", body: `Your portfolio is your evidence. For someone without a degree or years of employment history, it is everything.\n\nBy the end of this floor your portfolio should include:\n\n<strong>3-5 deployed projects</strong> — accessible via URL, each with a README explaining what it does and how you built it\n<strong>A personal website</strong> — built by you, representing you, linking to your work\n<strong>A GitHub profile</strong> — with consistent commit history showing that you show up regularly\n<strong>A written case study</strong> — for your most complex project, walking through the problem, your decisions, and what you'd do differently\n\nThis is what you send instead of a CV.`, callout: { type: "default", label: "The Honest Truth", text: "A portfolio of 4 real projects built and deployed by someone who started from nothing 18 months ago is more compelling to most employers than a degree with no work to show. The work is the argument." }, hint: `Your personal website doesn't need to be complex. In fact, simpler is often better.\n\nIt needs: your name, one sentence about what you do, links to your projects, a way to contact you.\n\nThat's it. Clean, fast, works on mobile. The personal website is itself a project — it shows you can build something professional and make decisions about design and content.\n\n<strong>GitHub activity matters:</strong> Employers look at the contribution graph — the grid of green squares showing when you've been committing code. Consistent small contributions over 18 months tells a better story than a burst of activity followed by silence.`, checklist: ["I have 3-5 deployed projects", "Each has a README", "I have a personal website", "My GitHub shows consistent activity", "I've written a case study for my best project"] },
      { id: "7-5", title: "The Final Project — Something You're Proud Of", body: `No brief. No requirements. No checklist.\n\nBuild the thing you've been thinking about since you started this book.\n\nThe idea that made you want to learn in the first place — or the one that appeared somewhere along the way and wouldn't leave you alone.\n\nUse everything. Take your time. Make it right.\n\nWhen it's done, you're not a student anymore.`, callout: { type: "default", label: "The Only Instruction", text: "Build something that, when you show it to someone, makes you feel proud rather than apologetic. That feeling is the destination. Everything in this book was the road to it." }, callout2: { type: "focus", label: "You Made It Here", text: "Floors 1 through 6 built you. Floor 7 is just proof. The person who finishes this is not the same person who started it. That gap — between who you were and who you became — was crossed one session at a time.\n\nNow go build something." }, hint: `If the idea still feels too big — shrink it.\n\nThe final project doesn't have to be an empire. It has to be yours. A tool that helps one person do one thing better. A product that solves one real problem cleanly.\n\nStart with the smallest version that would still make you proud. Build that. Then, if you want to keep going, add to it.\n\n<strong>The most important thing:</strong> Finish it. Ship it. Put it in the world. An imperfect thing that exists is worth infinitely more than a perfect thing that doesn't.`, checklist: ["I built my final project", "I'm proud of it", "I deployed it", "I am a developer"] }
    ]
  }
];


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
      state.currentSection = s.currentSection || 0;
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
  } catch(e) {}
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
    saveToSupabase();
  } catch(e) {}
}

const SUPABASE_URL = 'https://xcvjjqzmetkjqyurxduh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdmpqcXptZXRranF5dXJ4ZHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjg1MTQsImV4cCI6MjA5MjcwNDUxNH0.8KETwjLadsyhzQGLTXdDsqtAuraqZ3_7-jR5uOdcd_g';

let currentUser = null;
let authMode = 'login';

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
  list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">Loading...</div>';
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?select=username,xp,streak&order=xp.desc&limit=20`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const rows = await res.json();
    if (!rows || rows.length === 0) {
      list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">No entries yet. Be the first!</div>';
      return;
    }
    const medals = ['🥇', '🥈', '🥉'];
    list.innerHTML = rows.map((r, i) => `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface);border:1px solid ${i === 0 ? '#c8a96e' : i === 1 ? '#aaaaaa' : i === 2 ? '#cd7f32' : 'var(--border)'};border-radius:10px;${i === 0 ? 'box-shadow:0 0 20px rgba(200,169,110,0.15);' : ''}">
        <div style="font-size:${i < 3 ? '24px' : '14px'};width:36px;text-align:center;font-family:'IBM Plex Mono',monospace;color:var(--text-muted);">${medals[i] || `${i+1}`}</div>
        <div style="flex:1;">
          <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:15px;">${r.username || 'Anonymous'}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--floor3);">🔥 ${r.streak || 0} day streak</div>
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
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.error) {
      msg.textContent = data.error || 'Something went wrong. Try requesting a new reset link.';
      msg.className = 'auth-message error';
      return;
    }
    msg.textContent = 'Password updated. You can now sign in.';
    msg.className = 'auth-message success';
    setTimeout(() => {
      document.getElementById('reset-overlay').style.display = 'none';
      document.getElementById('auth-screen').style.display = 'flex';
      window.history.replaceState(null, '', window.location.pathname);
    }, 2000);
  } catch(e) {
    msg.textContent = 'Something went wrong. Please try again.';
    msg.className = 'auth-message error';
  }
}

function populateDashboard() {
  // Check real section completions only (not checklist items)
  const sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  const completedCount = Object.keys(state.completed).filter(function(k) {
    return sectionIds.has(k) && state.completed[k];
  }).length;
  const hasStarted = completedCount > 0 || state.currentSection > 0 || state.currentFloor > 1 || state.xp > 0;
  if (!hasStarted) return;

  // Show dashboard, hide new user landing
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('new-user-landing').style.display = 'none';

  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('dashboard-greeting').textContent = name ? `${greeting}, ${name}.` : `${greeting}.`;

  // Level
  const cur = getCurrentLevel();
  const LEVEL_LABELS = ['', 'Curious', 'Beginning', 'Learning', 'Building', 'Developing', 'Coding', 'Fluent'];
  document.getElementById('dashboard-level-label').textContent = LEVEL_LABELS[cur.level] || `Level ${cur.level}`;
  document.getElementById('dashboard-xp').textContent = `${state.xp} XP`;

  // Streak
  const streak = state.streak || 0;
  const streakIcon = streak >= 30 ? '🔥🔥🔥' : streak >= 14 ? '🔥🔥' : '🔥';
  document.getElementById('dashboard-streak-icon').textContent = streakIcon;
  document.getElementById('dashboard-streak-text').textContent = streak === 0 ? 'No streak yet' : `${streak} day streak`;
  document.getElementById('dashboard-streak-sub').textContent = streak === 0 ? 'Complete a section to start your streak' : streak >= 7 ? 'You\'re on fire. Keep it going.' : 'Come back tomorrow to keep it alive.';

  // Daily goal
  const today = new Date().toDateString();
  const todayKey = `daily_sections_${today}`;
  const todaySections = parseInt(localStorage.getItem(todayKey) || '0');
  const dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal') || '1');
  const goalPct = Math.min(100, Math.round((todaySections / dailyGoal) * 100));
  document.getElementById('dashboard-goal-text').textContent = `${todaySections}/${dailyGoal} sections`;
  document.getElementById('dashboard-goal-bar').style.width = goalPct + '%';

  // Current position
  const fi = state.currentFloor - 1;
  const si = state.currentSection;
  const floor = FLOORS[fi];
  const section = floor?.sections[si];
  document.getElementById('dashboard-position').textContent = section ? section.title : 'All done!';

  // Next section preview
  const nextSi = si + 1;
  const nextSection = floor?.sections[nextSi];
  const nextFloor = FLOORS[fi + 1];
  let preview = '';
  if (nextSection) preview = `Up next: ${nextSection.title}`;
  else if (nextFloor) preview = `Up next: ${nextFloor.title}`;
  else preview = 'You\'ve completed the entire curriculum.';
  document.getElementById('dashboard-next-preview').textContent = preview;
}

function trackDailySection() {
  const today = new Date().toDateString();
  const todayKey = `daily_sections_${today}`;
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
  else if (nextFloor) tomorrowText = `Start of ${nextFloor.title}`;
  else tomorrowText = 'You\'ve completed the entire curriculum!';

  const greetings = [
    `That's a session, ${name || 'friend'}.`,
    `Well done today${name ? ', ' + name : ''}.`,
    `Another day done${name ? ', ' + name : ''}.`,
    `Consistent${name ? ', ' + name : ''}. That\'s everything.`
  ];

  const xpToday = state.xp - (sessionXpStart || 0);

  document.getElementById('session-title').textContent = greetings[Math.floor(Math.random() * greetings.length)];
  document.getElementById('session-message').textContent = 'Your daily goal is done. Come back tomorrow and keep the momentum going.';
  document.getElementById('session-xp-earned').textContent = `+${Math.max(0, xpToday)}`;
  document.getElementById('session-streak').textContent = `${state.streak}🔥`;
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
  msg.textContent = 'Sending reset email...';
  msg.className = 'auth-message';
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
      body: JSON.stringify({ email })
    });
    msg.textContent = 'Password reset email sent. Check your inbox.';
    msg.className = 'auth-message success';
  } catch(e) {
    msg.textContent = 'Something went wrong. Try again.';
    msg.className = 'auth-message error';
  }
}

async function handleAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const usernameEl = document.getElementById('auth-username');
  const username = usernameEl ? usernameEl.value.trim() : '';
  const msg = document.getElementById('auth-message');
  const btn = document.getElementById('auth-submit');

  // Validation
  if (!email || !password) { msg.textContent = 'Please enter your email and password.'; msg.className = 'auth-message error'; return; }
  if (authMode === 'signup' && !username) { msg.textContent = 'Please choose a display name.'; msg.className = 'auth-message error'; return; }
  if (password.length < 6) { msg.textContent = 'Password must be at least 6 characters.'; msg.className = 'auth-message error'; return; }

  btn.disabled = true;
  btn.textContent = authMode === 'login' ? 'Signing in...' : 'Creating account...';
  msg.textContent = '';
  msg.className = 'auth-message';

  let res, data;
  try {
    const endpoint = authMode === 'login' ? '/auth/v1/token?grant_type=password' : '/auth/v1/signup';
    res = await fetch(`${SUPABASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
      body: JSON.stringify({ email, password })
    });
    data = await res.json();
  } catch(e) {
    msg.textContent = 'No connection. Check your internet and try again.';
    msg.className = 'auth-message error';
    btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
    return;
  }

  // Signup: email confirmation required
  if (authMode === 'signup' && data.user && !data.access_token) {
    msg.textContent = 'Check your email to confirm your account, then sign in.';
    msg.className = 'auth-message success';
    btn.disabled = false;
    btn.textContent = 'Create Account';
    switchTab('login');
    return;
  }
  if (data.error || data.error_description || !data.access_token) {
    msg.textContent = data.error_description || data.error || 'Invalid email or password.';
    msg.className = 'auth-message error';
    btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
    return;
  }
  currentUser = { access_token: data.access_token, id: data.user?.id, email: data.user?.email, username: username || '' };
  localStorage.setItem('codebook_user', JSON.stringify(currentUser));
  if (username) state.username = username;
  await onUserLoggedIn();
}

async function onUserLoggedIn() {
  const userId = currentUser.id;
  const token = currentUser.access_token;
  const emailEl = document.getElementById('user-email');
  const barEl = document.getElementById('user-bar');
  if (emailEl) emailEl.textContent = currentUser.email || '';
  if (barEl) barEl.style.display = 'flex';

  // Show loading state while fetching progress
  const msg = document.getElementById('auth-message');
  const btn = document.getElementById('auth-submit');
  if (msg) { msg.textContent = 'Loading your progress...'; msg.className = 'auth-message'; }
  if (btn) btn.disabled = true;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/user_progress?id=eq.${userId}`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
    });
    const rows = await res.json();
    if (rows && rows.length > 0) {
      const p = rows[0];
      state.xp = p.xp || 0;
      state.streak = p.streak || 0;
      state.lastVisit = p.last_visit || null;
      state.currentFloor = p.current_floor || 1;
      state.currentSection = p.current_section || 0;
      state.completed = p.completed || {};
      state.quizAnswered = p.quiz_answered || {};
      state.xpAwarded = p.xp_awarded || {};
      state.totalSeconds = p.total_seconds || 0;
      state.sessionLog = p.session_log || [];
    }
  } catch(e) {}
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'flex';
  const coverUser = document.getElementById('cover-user');
  const coverEmail = document.getElementById('cover-user-email');
  if (coverUser) coverUser.style.display = 'block';
  if (coverEmail) coverEmail.textContent = currentUser.email || '';
  populateDashboard();
}

async function saveToSupabase() {
  if (!currentUser) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/user_progress`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${currentUser.access_token}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username || state.username || '',
        xp: state.xp, streak: state.streak, last_visit: state.lastVisit,
        current_floor: state.currentFloor, current_section: state.currentSection,
        completed: state.completed, quiz_answered: state.quizAnswered,
        xp_awarded: state.xpAwarded, total_seconds: state.totalSeconds,
        session_log: state.sessionLog
      })
    });
  } catch(e) {}
}

async function signOut() {
  try {
    if (currentUser) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${currentUser.access_token}` }
      });
    }
  } catch(e) {}
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

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
window.addEventListener('error', function(e) {
  console.error('App error:', e.message, 'at', e.filename, ':', e.lineno);
});
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});
// ─────────────────────────────────────────────────────────────────────────────

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

  const saved = localStorage.getItem('codebook_user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      // Verify the token is still valid
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${user.access_token}` }
      });
      const data = await res.json();
      if (data.id) {
        currentUser = { access_token: user.access_token, id: data.id, email: data.email, username: user.username || '' };
        await onUserLoggedIn();
        return;
      }
    } catch(e) {}
    localStorage.removeItem('codebook_user');
  }
  document.getElementById('auth-screen').style.display = 'flex';
});

// --- XP + LEVEL + STREAK SYSTEM ---

const LEVELS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 450 },
  { level: 5, xp: 700 },
  { level: 6, xp: 1000 },
  { level: 7, xp: 1400 }
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

function awardXP(amount, key, x, y) {
  if (key && state.xpAwarded[key]) return;
  const multiplier = getStreakMultiplier();
  const earned = Math.round(amount * multiplier);
  const prevLevel = getCurrentLevel().level;
  state.xp += earned;
  if (key) state.xpAwarded[key] = true;
  saveState();
  updateXPPanel();
  showFloatingXP(`+${earned} XP`, x, y);
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
    // Consecutive day — extend the streak
    state.streak += 1;
  } else if (state.lastVisit !== null) {
    // Gap of more than one day — reset streak
    state.streak = 0;
  }
  // If lastVisit is null this is the first ever visit — don't award a streak yet.
  // Streak starts properly when the user completes their first section.
  state.lastVisit = today;
  saveState();
}

function startSectionTimer(sectionId) {
  state.sectionStartTime = Date.now();
  setTimeout(() => {
    const key = `read-${sectionId}`;
    if (!state.xpAwarded[key]) {
      awardXP(10, key, window.innerWidth - 100, 100);
    }
  }, 20000);
}

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function updateTimeLog() {
  const el = document.getElementById('time-log');
  if (!el) return;
  const total = formatTime(state.totalSeconds);
  const sessions = state.sessionLog.length;
  el.innerHTML = `<span>${total} total</span><span>${sessions} session${sessions !== 1 ? 's' : ''}</span>`;
}
  function checkOnboarding() {
  const hasOnboarded = localStorage.getItem('codebook_onboarded');

  if (!hasOnboarded) {
    showOnboarding();
    return;
  }
}

checkOnboarding();

const today = new Date().toDateString();

function startBook() {
  if (!currentUser) {
    alert('Please sign in first');
    return;
  }

  loadState();
  updateStreak();
  document.getElementById('cover').style.display = 'none';
  applyTheme();
}



  
  const challengeDone = localStorage.getItem('codebook_challenge_done_' + today);

  launchApp();

  if (!challengeDone) {
    setTimeout(() => showDailyChallenge(), 800);
  }


function launchApp() {
  // Snapshot XP at session start so the end-of-session screen shows
  // only XP earned this session, not all-time XP.
  sessionXpStart = state.xp;

  // Show new three-column layout
  var appGrid = document.querySelector('.app-grid');
  if (appGrid) appGrid.style.display = 'grid';
  var mobileBar = document.getElementById('mobile-bottom-bar');
  if (mobileBar) mobileBar.style.display = '';

  // Render content
  renderNav();
 renderFloor(state.currentFloor - 1, parseInt(state.currentSection));
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
    document.getElementById('onboarding-title').textContent = `Nice to meet you, ${name}.`;
    document.getElementById('onboarding-body').textContent = 'Let me understand where you\'re starting from.';
  }
}

function onboardingSelect(field, value) {
  onboardingData[field] = value;
  if (field === 'experience') {
    document.getElementById('onboarding-step-2').style.display = 'none';
    document.getElementById('onboarding-step-3').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Almost there.';
    document.getElementById('onboarding-body').textContent = 'Last question — and then we begin.';
  } else if (field === 'time') {
    // Set daily goal based on time selection
    const goalMap = { '15': 1, '30': 2, '60': 3 };
    localStorage.setItem('codebook_daily_goal', goalMap[value] || 1);

    document.getElementById('onboarding-step-3').style.display = 'none';
    document.getElementById('onboarding-step-4').style.display = 'block';

    const messages = {
      never: { title: `You\'re in the right place, ${onboardingData.name}.`, msg: 'Starting from zero is actually an advantage. No bad habits to unlearn. We\'ll build everything from the ground up, one clear step at a time.' },
      tried: { title: `This time will be different, ${onboardingData.name}.`, msg: 'Whatever stopped you before — the overwhelm, the confusion, the loss of momentum — this was built specifically for that. Sage is here every time you get stuck.' },
      some: { title: `Good. Let\'s build on that, ${onboardingData.name}.`, msg: 'You\'ve got a foundation. Now we give it structure. Work at your own pace — skip ahead if something\'s easy, slow down when it\'s not.' }
    };

    const m = messages[onboardingData.experience] || messages.never;
    document.getElementById('onboarding-welcome').textContent = m.title;
    document.getElementById('onboarding-message').textContent = m.msg;
  }
}

function finishOnboarding() {
  localStorage.setItem('codebook_onboarded', 'true');
  localStorage.setItem('codebook_player_name', onboardingData.name);
  state.playerName = onboardingData.name;
  document.getElementById('onboarding').style.display = 'none';
  launchApp();
}

// --- DAILY CHALLENGE SYSTEM ---
const DAILY_CHALLENGES = [
  { title: 'What does HTML stand for?', question: 'Choose the correct answer:', options: ['Hyper Text Markup Language', 'High Text Making Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'], correct: 0, explanation: 'HTML stands for HyperText Markup Language. It is the standard language used to create and structure content on the web.', xp: 20 },
  { title: 'CSS stands for...', question: 'Choose the correct answer:', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], correct: 1, explanation: 'CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen.', xp: 20 },
  { title: 'Which tag creates a heading?', question: 'Which HTML tag creates the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], correct: 2, explanation: 'The h1 tag creates the largest heading. Headings go from h1 (largest) to h6 (smallest).', xp: 20 },
  { title: 'What is a variable?', question: 'In coding, a variable is...', options: ['A type of HTML tag', 'A named container that stores a value', 'A CSS property', 'A type of loop'], correct: 1, explanation: 'A variable is a named container that stores a value. You can think of it like a labelled box that holds information your code can use and change.', xp: 20 },
  { title: 'What does a loop do?', question: 'A loop in code...', options: ['Creates a circular design', 'Connects to the internet', 'Repeats a set of instructions', 'Stores data in a database'], correct: 2, explanation: 'A loop repeats a set of instructions until a condition tells it to stop. Think of it like a washing machine cycle that keeps going until the cycle is complete.', xp: 20 },
  { title: 'What is a function?', question: 'A function in coding is...', options: ['A type of variable', 'A reusable block of instructions with a name', 'A CSS animation', 'A database query'], correct: 1, explanation: 'A function is a named, reusable block of instructions. You define it once and can call it as many times as you need — like pressing a button on a vending machine.', xp: 20 },
  { title: 'What does JavaScript do?', question: 'JavaScript is primarily used to...', options: ['Style web pages', 'Create database tables', 'Add behaviour and interactivity to web pages', 'Set up servers'], correct: 2, explanation: 'JavaScript adds behaviour to web pages. HTML provides structure, CSS provides style, and JavaScript makes things happen when users interact with the page.', xp: 20 },
  { title: 'What is the DOM?', question: 'The DOM in web development refers to...', options: ['A CSS layout system', 'A type of server', 'The Document Object Model - a live map of the page JavaScript can change', 'A database format'], correct: 2, explanation: 'The Document Object Model (DOM) is a live tree structure of your HTML that JavaScript can read and modify in real time - changing text, styles, and structure without reloading the page.', xp: 20 },
  { title: 'What does an API do?', question: 'An API is used to...', options: ['Style web pages', 'Let two programs talk to each other and share data', 'Write HTML structure', 'Store passwords'], correct: 1, explanation: 'An API lets two pieces of software communicate. When a weather app shows you the forecast, it used an API to ask a weather service for that data.', xp: 20 },
  { title: 'What is a boolean?', question: 'A boolean value in code can only be...', options: ['A number or a letter', 'True or false', 'A list of items', 'A colour value'], correct: 1, explanation: 'A boolean is the simplest data type - it is either true or false. Conditions and if-statements are built on booleans.', xp: 20 },
  { title: 'What does "debugging" mean?', question: 'Debugging means...', options: ['Writing new features', 'Finding and fixing errors in code', 'Deleting old code', 'Speeding up a program'], correct: 1, explanation: 'Debugging is the process of finding, understanding, and fixing errors (bugs) in your code. Every developer debugs - it is the job.', xp: 20 },
  { title: 'What is a string?', question: 'In coding, a string is...', options: ['A type of loop', 'A sequence of characters - text', 'A CSS measurement unit', 'A database table'], correct: 1, explanation: 'A string is text data wrapped in quotes. "Hello world" is a string. Strings are one of the most common data types in any language.', xp: 20 },
  { title: 'What does "responsive" mean in web design?', question: 'A responsive website...', options: ['Loads very fast', 'Adapts its layout to different screen sizes', 'Has animated elements', 'Uses a database'], correct: 1, explanation: 'A responsive website adjusts its layout automatically depending on the screen size - looks good on a phone, tablet, and desktop without separate versions.', xp: 20 },
  { title: 'What is version control?', question: 'Version control (like Git) is used to...', options: ['Speed up websites', 'Track changes to code over time', 'Style HTML', 'Compress images'], correct: 1, explanation: 'Version control tracks every change made to your code. Git is the most popular tool - you can always go back to a working version and collaborate without overwriting each other.', xp: 20 },

  // Floor 1 — Foundation
  { title: 'What is a server?', question: 'In web development, a server is...', options: ['A type of browser plugin', 'A computer that stores and sends files when requested', 'A CSS layout technique', 'A JavaScript framework'], correct: 1, explanation: 'A server is a computer that waits for requests and responds by sending back files. When you visit a website, a server somewhere in the world receives your request and sends back the HTML, CSS, and JS files your browser needs.', xp: 20 },
  { title: 'What does a browser do?', question: 'A web browser\'s main job is to...', options: ['Write HTML files', 'Request files from servers and display them to the user', 'Store websites on your computer', 'Connect you directly to other users'], correct: 1, explanation: 'A browser sends requests to servers, receives files back, and renders them visually on screen. It reads HTML for structure, CSS for style, and JavaScript for behaviour — turning code into the visual pages you see.', xp: 20 },
  { title: 'Sequential execution', question: 'What does "sequential execution" mean in code?', options: ['Code runs in random order', 'Code runs in parallel on multiple processors', 'Code runs line by line from top to bottom', 'Code only runs when clicked'], correct: 2, explanation: 'Sequential execution means the computer reads and runs instructions one at a time, top to bottom. It does not skip ahead or assume anything. The order you write code matters enormously because of this.', xp: 20 },
  { title: 'What is a condition in code?', question: 'A condition in programming means...', options: ['A type of HTML tag', 'A rule that says: if this is true, do this — otherwise do that', 'A way to repeat instructions', 'A named block of reusable code'], correct: 1, explanation: 'A condition is a decision point. "If it is raining, take an umbrella, otherwise leave it at home." In code this is written as an if/else statement. Conditions are one of the three universal building blocks of all programming.', xp: 20 },

  // Floor 2 — HTML & CSS
  { title: 'HTML tag structure', question: 'Which of these is the correct HTML structure?', options: ['<p>Hello/p>', '<p>Hello</p>', 'p>Hello</p>', '<p Hello>'], correct: 1, explanation: 'Every HTML element has an opening tag, content, and a closing tag. The closing tag has a forward slash before the element name. <p>Hello</p> is the correct pattern — open, content, close.', xp: 20 },
  { title: 'What does CSS stand for?', question: 'CSS controls which aspect of a webpage?', options: ['The structure and content', 'The visual appearance and layout', 'The interactive behaviour', 'The server-side logic'], correct: 1, explanation: 'CSS (Cascading Style Sheets) controls how HTML elements look — colours, fonts, sizes, spacing, layout. Without CSS, every website would look like a plain text document.', xp: 20 },
  { title: 'The box model', question: 'In CSS, the "box model" refers to...', options: ['A 3D animation technique', 'How every element is treated as a box with margin, border, padding, and content', 'A way to create modal popups', 'A CSS grid layout method'], correct: 1, explanation: 'Every HTML element is a box. The CSS box model defines the space around and inside that box: content (the actual stuff), padding (space inside the border), border (the edge), and margin (space outside the border).', xp: 20 },
  { title: 'Inline vs block elements', question: 'What is the difference between a block and inline HTML element?', options: ['Block elements are invisible, inline elements are visible', 'Block elements start on a new line and take full width; inline elements flow within text', 'Block elements need JavaScript; inline elements do not', 'There is no difference'], correct: 1, explanation: 'Block elements like <div>, <p>, and <h1> start on a new line and stretch the full width. Inline elements like <span>, <a>, and <strong> flow within text without breaking to a new line. Understanding this prevents many layout headaches.', xp: 20 },
  { title: 'CSS specificity', question: 'If two CSS rules target the same element, which one wins?', options: ['The first one written always wins', 'The more specific selector wins', 'The shorter rule wins', 'They are always combined'], correct: 1, explanation: 'CSS specificity determines which rule applies when multiple rules target the same element. An ID selector beats a class selector beats an element selector. When specificity is equal, the last rule written wins. This is the "Cascading" in CSS.', xp: 20 },

  // Floor 3 — JavaScript
  { title: 'let vs const', question: 'What is the difference between let and const in JavaScript?', options: ['let is faster than const', 'const cannot be reassigned after declaration; let can', 'They are identical', 'const only works with numbers'], correct: 1, explanation: 'const declares a variable whose value cannot be reassigned. let declares a variable that can change. Use const by default and let when you know the value needs to change. This makes your code easier to reason about.', xp: 20 },
  { title: 'What is the DOM?', question: 'JavaScript uses the DOM to...', options: ['Connect to databases', 'Read and change the HTML currently on screen', 'Style elements with CSS', 'Send emails'], correct: 1, explanation: 'The Document Object Model (DOM) is a live map of the HTML on the page. JavaScript can read and modify it in real time — changing text, hiding elements, adding new ones — without refreshing the page.', xp: 20 },
  { title: 'Event listeners', question: 'What does addEventListener do in JavaScript?', options: ['Adds a new HTML element', 'Waits for a specific user action and runs code when it happens', 'Connects to an external API', 'Styles an element on hover'], correct: 1, explanation: 'addEventListener tells the browser: when this specific thing happens (a click, a keypress, a scroll), run this function. It is the foundation of interactive web pages — everything that responds to user input uses event listeners.', xp: 20 },
  { title: 'Array methods', question: 'What does the .filter() method do to a JavaScript array?', options: ['Sorts the array alphabetically', 'Returns a new array containing only elements that pass a test', 'Removes the last element', 'Combines two arrays'], correct: 1, explanation: '.filter() creates a new array with only the elements for which your test function returns true. For example, numbers.filter(n => n > 10) returns only numbers greater than 10. It does not modify the original array.', xp: 20 },

  // Floor 4 — Independence
  { title: 'What is localStorage?', question: 'localStorage in the browser allows you to...', options: ['Store data on a server', 'Save small amounts of data that persists between page refreshes', 'Share data between different users', 'Compress images'], correct: 1, explanation: 'localStorage is a browser feature that lets you save key-value pairs locally on the user\'s device. Unlike regular variables, localStorage data survives page refreshes and browser restarts — useful for saving preferences, drafts, or progress.', xp: 20 },
  { title: 'JSON', question: 'JSON is used in web development to...', options: ['Style HTML elements', 'Format and transfer structured data between systems', 'Run server-side code', 'Create animations'], correct: 1, explanation: 'JSON (JavaScript Object Notation) is a text format for representing structured data. It looks like a JavaScript object and is used to send data between a frontend and a backend, or to store structured data in localStorage.', xp: 20 },
  { title: 'What is debugging?', question: 'The browser Developer Console is used to...', options: ['Edit the website permanently', 'See JavaScript errors, log output, and inspect the page', 'Speed up page loading', 'Write CSS'], correct: 1, explanation: 'The Developer Console (opened with F12) shows JavaScript errors with line numbers, lets you log values with console.log(), and allows you to inspect and modify the live DOM. It is your most important debugging tool.', xp: 20 },
  { title: 'Reading error messages', question: 'When JavaScript throws a "ReferenceError", it means...', options: ['The page has no internet connection', 'You tried to use a variable or function that has not been defined', 'A CSS rule is invalid', 'The HTML is malformed'], correct: 1, explanation: 'A ReferenceError means JavaScript cannot find what you are referring to. Usually this means a typo in a variable name, using a variable before declaring it, or calling a function that does not exist. The error message tells you the name it could not find.', xp: 20 },

  // Floor 5 — Full Stack
  { title: 'Frontend vs Backend', question: 'Which of these tasks belongs to the backend?', options: ['Styling a button with CSS', 'Animating a dropdown menu', 'Securely processing a payment', 'Choosing a font family'], correct: 2, explanation: 'The backend handles tasks that must be done securely and away from the user\'s browser — things like processing payments, validating credentials, querying a database, or running sensitive business logic. The frontend is everything the user sees directly.', xp: 20 },
  { title: 'What is SQL?', question: 'SQL is primarily used to...', options: ['Style web pages', 'Build mobile apps', 'Query and manage relational databases', 'Write server-side JavaScript'], correct: 2, explanation: 'SQL (Structured Query Language) is the language for communicating with relational databases. It lets you create tables, insert data, retrieve specific records, update values, and delete data. Every major web application uses SQL or a similar query language.', xp: 20 },
  { title: 'HTTP methods', question: 'In a REST API, a POST request is used to...', options: ['Retrieve data', 'Create new data', 'Delete existing data', 'Update all records'], correct: 1, explanation: 'REST APIs use HTTP methods to indicate the type of action: GET retrieves data, POST creates new data, PUT/PATCH updates existing data, DELETE removes data. These map directly to the CRUD operations (Create, Read, Update, Delete) of a database.', xp: 20 },
  { title: 'What is an API key?', question: 'An API key is used to...', options: ['Encrypt user passwords', 'Identify and authenticate who is making a request to an API', 'Speed up API responses', 'Format JSON data'], correct: 1, explanation: 'An API key is a unique identifier passed with requests to an external API. It tells the API who is making the request, allows the provider to track usage, and lets them block keys that are misused or over their rate limit. Never expose API keys in public code.', xp: 20 },
  { title: 'Git commit', question: 'What does "git commit" do?', options: ['Sends your code to GitHub', 'Saves a permanent snapshot of your current changes with a message', 'Creates a new branch', 'Merges two branches together'], correct: 1, explanation: 'A commit is a saved snapshot of your code at a specific point in time, with a message describing what changed. It is local — it lives on your machine until you push. Think of commits as save points in a game that you can always return to.', xp: 20 },

  // Floor 6 — Specialisation
  { title: 'What is React?', question: 'React is best described as...', options: ['A CSS framework', 'A backend web server', 'A JavaScript library for building user interfaces from reusable components', 'A database management tool'], correct: 2, explanation: 'React is a JavaScript library created by Facebook for building UIs. It lets you break your interface into reusable components, each managing its own state. When state changes, React efficiently updates only the affected parts of the page.', xp: 20 },
  { title: 'Component state', question: 'In React, "state" refers to...', options: ['The CSS styles of a component', 'Data that belongs to a component and can change over time', 'The server location of the app', 'The HTML structure of the page'], correct: 1, explanation: 'State is data that lives inside a component and can change. When state changes, React re-renders the component to reflect the new data. This is the core idea behind reactive UIs — the display automatically stays in sync with the data.', xp: 20 },
  { title: 'What is Node.js?', question: 'Node.js allows developers to...', options: ['Write CSS with JavaScript syntax', 'Run JavaScript on the server, outside of a browser', 'Build native mobile apps', 'Manage SQL databases directly'], correct: 1, explanation: 'Node.js is a runtime that lets JavaScript run on a server rather than just in a browser. This means you can use JavaScript for both the frontend and the backend — one language across your entire stack.', xp: 20 },
  { title: 'REST vs GraphQL', question: 'The main advantage of GraphQL over REST is...', options: ['It is faster in all situations', 'The client can request exactly the data it needs, no more, no less', 'It does not require a server', 'It only works with React'], correct: 1, explanation: 'REST APIs return fixed data structures per endpoint — sometimes more than you need, sometimes less. GraphQL lets the client define exactly what data it wants in a single query, reducing over-fetching and under-fetching. It is particularly useful for complex UIs with varied data needs.', xp: 20 },

  // Floor 7 — Professional Grade
  { title: 'What is code review?', question: 'The main purpose of a code review is to...', options: ['Count lines of code written', 'Check spelling in comments', 'Have another developer examine your code for quality, bugs, and improvements', 'Measure how fast the code runs'], correct: 2, explanation: 'Code review is when one or more developers read and critique another\'s code before it is merged. It catches bugs, improves code quality, spreads knowledge across the team, and ensures the codebase stays consistent. It is standard practice in all professional development teams.', xp: 20 },
  { title: 'What is system design?', question: 'System design in software engineering is about...', options: ['Choosing colour schemes for an app', 'Deciding which font to use', 'Planning how the components of a large application fit together to handle scale and failure', 'Writing the first version of code quickly'], correct: 2, explanation: 'System design is the process of planning how an application\'s components — databases, servers, caches, queues, APIs — fit together to be reliable, scalable, and maintainable. Senior developers are often distinguished by their system design thinking.', xp: 20 },
  { title: 'What is caching?', question: 'Caching in web development means...', options: ['Deleting old files regularly', 'Storing copies of frequently requested data so future requests are faster', 'Encrypting sensitive user data', 'Compressing images for faster loading'], correct: 1, explanation: 'Caching stores a copy of data closer to where it is needed — in memory, a CDN, or the browser. Instead of fetching the same data from a database on every request, a cache serves it instantly. It is one of the most effective ways to make applications faster and more scalable.', xp: 20 },
  { title: 'What makes clean code?', question: 'Which of these is the best indicator of clean code?', options: ['It has no comments at all', 'Another developer can understand what it does without explanation', 'It is written in as few lines as possible', 'It uses advanced language features'], correct: 1, explanation: 'Clean code communicates its intent clearly to any developer who reads it. Good naming, small focused functions, and logical structure matter more than brevity or cleverness. The goal is code that is easy to understand, modify, and debug — often by yourself six months later.', xp: 20 }
];

// ── SHARED CHALLENGE MODAL ───────────────────────────────────────────────
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

// ── DAILY CHALLENGE ──────────────────────────────────────────────────────
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
  localStorage.setItem('codebook_last_challenge', today);
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
    closeBtn.textContent = 'Continue learning →';
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
  { icon: '🎓', message: 'You understand how the internet works, how computers think, and the logic behind all code. That\'s the foundation everything else is built on.' },
  { icon: '🎨', message: 'You can build real webpages that look good. HTML and CSS are yours now. The visual web is no longer a mystery.' },
  { icon: '⚡', message: 'JavaScript. You made things move, respond, and think. This is where most people stop. You didn\'t.' },
  { icon: '🔨', message: 'You built alone. No hand-holding. A real brief, a real product. That\'s the developer mindset.' },
  { icon: '🌐', message: 'Frontend, backend, databases, APIs, deployment. You are a full stack developer. Let that land.' },
  { icon: '🎯', message: 'You found your lane and went deep. This is where developers become specialists.' },
  { icon: '🏆', message: 'Floor 7. Professional grade. You started from nothing and built your way here. That distance is yours forever.' }
];

function showFloorCelebration(floorIndex) {
  const floor = FLOORS[floorIndex];
  const msg = FLOOR_MESSAGES[floorIndex];
  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';

  document.getElementById('celebration-icon').textContent = msg.icon;
  document.getElementById('celebration-floor').textContent = floor.title;
  document.getElementById('celebration-message').textContent = msg.message;
  document.getElementById('celebration-xp').textContent = state.xp;
  document.getElementById('celebration-name').textContent = name ? `Well done, ${name}.` : 'Well done.';
  document.getElementById('floor-celebration').style.display = 'flex';
}

function closeCelebration() {
  document.getElementById('floor-celebration').style.display = 'none';
}

function shareAchievement() {
  const name = state.playerName || localStorage.getItem('codebook_player_name') || 'Someone';
  const floor = FLOORS[state.currentFloor - 1];
  const text = `${name} just completed "${floor.title}" on The Code Book with ${state.xp} XP. Learning to code one step at a time. https://the-code-book.netlify.app`;
  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard — paste it wherever you want to share.'));
  }
}

// --- STREAK PROTECTION ---
function checkStreakProtection() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const twoDaysAgo = new Date(Date.now() - 172800000).toDateString();

  if (state.lastVisit === twoDaysAgo && state.streak > 0) {
    // Grace period — one day missed, show recovery option
    showStreakRecovery();
  }
}

function showStreakRecovery() {
  if (state.streak < 3) return; // Only show for meaningful streaks
  const banner = document.createElement('div');
  banner.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--floor3);border-radius:12px;padding:16px 20px;z-index:5000;max-width:320px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.4);`;
  banner.innerHTML = `
    <div style="font-size:24px;margin-bottom:8px;">🔥</div>
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
  const key = `nudge-halfway-${fi}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, 'true');

  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  const nudge = document.createElement('div');
  nudge.style.cssText = `position:fixed;bottom:80px;right:16px;background:var(--surface);border:1px solid var(--accent);border-radius:12px;padding:16px 20px;z-index:5000;max-width:260px;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeUp 0.4s ease;`;
  nudge.innerHTML = `
    <div style="font-size:20px;margin-bottom:8px;">🦉</div>
    <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:13px;margin-bottom:6px;">${name ? `Halfway there, ${name}!` : 'Halfway there!'}</div>
    <div style="font-size:12px;color:var(--text-dim);line-height:1.6;">You\'re halfway through this floor. The hard part is behind you.</div>
    <button onclick="this.parentElement.remove()" style="margin-top:10px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1px;padding:6px 14px;background:transparent;border:1px solid var(--accent);color:var(--accent);border-radius:4px;cursor:pointer;">Keep going</button>
  `;
  document.body.appendChild(nudge);
  setTimeout(() => nudge.remove && nudge.remove(), 6000);
}

// --- GUEST MODE ---
function startAsGuest() {
  localStorage.setItem('codebook_guest', 'true');
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'flex';
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
      <div style="font-size:40px;margin-bottom:16px;">🦉</div>
      <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--accent);font-style:italic;margin-bottom:12px;">Save your progress?</div>
      <div style="font-size:14px;color:var(--text-dim);line-height:1.8;margin-bottom:24px;">You\'ve completed 5 sections. Create a free account to make sure you never lose your progress.</div>
      <button onclick="this.closest('div[style*=fixed]').remove();document.getElementById('auth-screen').style.display='flex';switchTab('signup');" style="width:100%;padding:16px;background:var(--accent);border:none;border-radius:8px;color:var(--bg);font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:2px;cursor:pointer;margin-bottom:10px;">CREATE FREE ACCOUNT</button>
      <button onclick="this.closest('div[style*=fixed]').remove();" style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text-muted);background:transparent;border:none;cursor:pointer;">Continue without saving</button>
    </div>
  `;
  document.body.appendChild(prompt);
}

function renderNav() {
  const nav = document.getElementById('floor-nav');
  if (!nav) return; // guard against missing compat shim
  nav.innerHTML = FLOORS.map((f, fi) => {
    const isUnlocked = fi === 0 || isFloorComplete(fi - 1);
    const isActive = fi === state.currentFloor - 1;
    const isComplete = isFloorComplete(fi);
    const sections = isActive ? f.sections.map((s, si) => {
      const isDone = state.completed[s.id];
      const isActiveSec = si === state.currentSection;
      return `<span class="section-link ${isDone ? 'done' : ''} ${isActiveSec ? 'active' : ''}" onclick="goToSection(${fi}, ${si})">${s.title}</span>`;
    }).join('') : '';
    return `<div class="floor-nav-item ${isUnlocked ? 'unlocked' : ''} ${isActive ? 'active' : ''} ${isComplete ? 'completed' : ''}" onclick="goToFloor(${fi})">
      <div class="floor-nav-header">
        <div class="floor-num" style="color: ${f.color}">${isComplete ? '✓' : fi + 1}</div>
        <div class="floor-nav-label">${f.title}</div>
      </div>
      ${isActive ? `<div class="floor-sections">${sections}</div>` : ''}
    </div>`;
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
  var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
  if (!isUnlocked) {
    // Find which sections are still incomplete on the previous floor
    var prevFloor = FLOORS[fi - 1];
    var incomplete = prevFloor.sections.filter(function(s) { return !state.completed[s.id]; });
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

// ─── EDITOR DEFAULTS ───
var editorDefaults = {
  html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 20px; }\n    h1 { color: #c8a96e; }\n  </style>\n</head>\n<body>\n  <h1>I built this.</h1>\n  <p>Day one. Already making things.</p>\n</body>\n</html>',
  css: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nh1 {\n  color: #c8a96e;\n  font-size: 48px;\n  font-family: Georgia, serif;\n}\n.card {\n  background: #1a1a1a;\n  padding: 24px;\n  border-radius: 12px;\n}\n</style>\n</head>\n<body style="background:#0a0a0a;padding:20px;">\n  <h1>Style me</h1>\n  <div class="card">I am a card</div>\n</body>\n</html>',
  js: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:sans-serif;padding:20px;">\n<button onclick="go()" style="padding:12px 24px;background:#c8a96e;border:none;cursor:pointer;border-radius:6px;font-size:16px;">Click Me</button>\n<p id="msg" style="margin-top:16px;color:#999;">Nothing happened yet.</p>\n<sc' + 'ript>\nfunction go() {\n  document.getElementById("msg").innerText = "You just ran JavaScript.";\n  document.getElementById("msg").style.color = "#c8a96e";\n}\n</sc' + 'ript>\n</body>\n</html>'
};

function getEditorDefaults(section) {

    if (!section) {
        console.error("section is undefined");
        return { code: "", filename: "", challenges: [] };
    }

    if (section.code && section.code.lang) {
        var lang = section.code.lang.toLowerCase().trim();

if (lang.includes("html")) lang = "html";
else if (lang.includes("css")) lang = "css";
else if (lang.includes("js") || lang.includes("javascript")) lang = "js";
      
        var code = editorDefaults[lang];

        if (!code) {
            console.error("No editorDefaults for lang:", lang);
            return { code: "// unknown language", filename: "file.txt" };
        }
    }
        var filenameMap = {
            html: "index.html",
            css: "style.css",
            js: "script.js"
        };

        return {
            code: code,
            filename: filenameMap[lang] || "file.txt"
        };
    
console.error("Invalid section.code:", section);
return { code: "", filename: "", challenges: [] };
  
}
  
var sectionGateState = {}; // ✅ ADD HERE

function loadSection(f1, s1) {
 
var index = parseInt(s1);

var floor = FLOORS[f1];
var section = floor.sections[index];

var isFirst = index === 0;
var isLast = index === floor.sections.length - 1;
  var isDone = state.completed[section.id];
  console.log("SECTION:", section);
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
  if (section.code) {
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
  editorDef.challenges.forEach(function(ch) {
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
    qz.options.forEach(function(opt, oi) {
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
    (isDone ? '&#10003; Section Complete' : 'Mark as Complete \u2192 +25 XP') +
    '</button></div>';

  // NAV
  var nav = '<div class="section-nav">' +
    '<button class="nav-btn" onclick="prevSection(' + fi + ',' + si + ')"' + (isFirst ? ' disabled' : '') + '>&#8592; Previous</button>' +
    '<button class="nav-btn primary" onclick="nextSection(' + fi + ',' + si + ')">' +
    (isLast ? (fi < FLOORS.length - 1 ? 'Next Floor &#8594;' : 'Complete') : 'Next &#8594;') +
    '</button></div>';

  // F2 interactive override
  if (section.interactive === 'f2-variable') { 
    document.getElementById('main-content').innerHTML = tabs +
      '<div class="section-panel active" id="spanel-read-' + section.id + '">' +
      '<div class="floor-hero" data-floor="' + (fi+1) + '">' +
      '<div class="floor-tag" style="color:' + floor.color + '">' + floor.tag + '</div>' +
      '<div class="floor-title">' + floor.title + '<br><em>' + floor.subtitle + '</em></div></div>' +
      '<div class="section-content"><div class="section-number">Section ' + (si+1) + ' of ' + floor.sections.length + '</div>' +
      '<div class="section-title-row"><div class="section-title">' + section.title + '</div></div>' +
      '<div class="section-body">' + section.body.replace(/\n/g, '<br><br>') + '</div></div></div>' +
      '<div class="section-panel" id="spanel-quiz-' + section.id + '">' +
      '<div style="padding:24px 32px;"><div class="control-panel">' +
      '<div class="status-screen" id="f2-status-screen"><div class="status-dot"></div><div class="status-text">STATUS: FLOOR OFFLINE</div></div>' +
      '<div class="code-line"><span class="code-keyword">let</span>&nbsp;<span class="code-varname">currentFloor</span>&nbsp;<span class="code-equals">=</span>&nbsp;<span class="code-blank" id="f2-blank">?</span><span style="color:#cdd6f4">;</span></div>' +
      '<div class="pellet-row">' +
      '<button class="data-pellet" onclick="f2SelectValue(1)">1</button>' +
      '<button class="data-pellet" onclick="f2SelectValue(2)">2</button>' +
      '<button class="data-pellet" onclick="f2SelectValue(\'Lobby\')">\"Lobby\"</button>' +
      '</div><div class="panel-hint" id="f2-hint">Variables must be accurate. We are on Floor 2.</div>' +
      '<button class="ascend-btn" id="f2-ascend" onclick="f2Ascend()">&#9650; Ascend to Floor 3</button>' +
      '</div></div></div>' + g + nav;
    document.getElementById('main-content').scrollTop = 0;
    window.scrollTo(0, 0);
    startSectionTimer(section.id);
    checkProgressNudge(fi, si);
    checkStreakProtection();
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
    if (btn && !btn.disabled) btn.textContent = 'Mark as Complete \u2192 +25 XP';
    sageMessage('All gates cleared. Mark this section complete when ready.', 'celebrate');
  }
}

function answerQuizTabbed(sectionId, chosen, correct, fi, si) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
    markGate(sectionId, 'quiz');
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
  var mobMap = { learn: 'mob-learn', build: 'mob-build', challenge: 'mob-challenge', map: 'mob-map' };
  if (mobMap[tab]) {
    var mb = document.getElementById(mobMap[tab]);
    if (mb) mb.classList.add('active');
  }

  // Show/hide panels
  document.querySelectorAll('.top-panel').forEach(function(p){ p.classList.remove('active'); });
  var mainContent = document.getElementById('main-content');

  if (tab === 'learn') {
    if (mainContent) mainContent.style.display = '';
    var lp = document.getElementById('panel-learn');
    if (lp) lp.classList.add('active');
  } else {
    if (mainContent) mainContent.style.display = 'none';
    var panel = document.getElementById('panel-' + tab);
    if (panel) {
      panel.classList.add('active');
      if (tab === 'build') renderBuildPanel();
      if (tab === 'challenge') renderChallengePanel();
      if (tab === 'map') renderMapPanel();
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
      '<div class="vb-fnum">F' + (i+1) + (isComplete ? ' \u2713' : '') + '</div>';
    wrap.appendChild(div);
  }
}

function renderLeftNav() {
  var nav = document.getElementById('left-floor-nav');
  if (!nav) return;
  nav.innerHTML = '';
  FLOORS.forEach(function(floor, fi) {
    var isUnlocked = fi === 0 || isFloorComplete(fi - 1);
    var isActive = (state.currentFloor - 1) === fi;
    var isComplete = isFloorComplete(fi);
    var floorDiv = document.createElement('div');
    floorDiv.className = 'left-floor-item' + (isActive ? ' active' : '') + (isComplete ? ' completed' : '');
    if (isUnlocked) {
      floorDiv.onclick = (function(fii){ return function(){ goToFloor(fii); closeSidebar(); }; })(fi);
    }
    floorDiv.innerHTML = '<div class="left-floor-num">FLOOR ' + (fi+1) +
      (isComplete ? ' \u2713' : (!isUnlocked ? ' \uD83D\uDD12' : '')) + '</div>' +
      '<div class="left-floor-name">' + floor.title + '</div>';
    if (isActive) {
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
      floorDiv.appendChild(secList);
    }
    nav.appendChild(floorDiv);
  });
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
    awardXP(15, `quiz-${sectionId}`, window.innerWidth / 2, 300);
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
  el.querySelector('.check-box').textContent = state.checklistDone[key] ? '✓' : '';
  if (state.checklistDone[key]) {
    el.classList.add('just-checked');
    setTimeout(() => el.classList.remove('just-checked'), 400);
    const rect = el.getBoundingClientRect();
    awardXP(30, 'check-' + key, rect.left + rect.width / 2, rect.top);
  }
  saveState();
}

function completeSection(sectionId, fi, si) {
  // Check gates before allowing completion
  var gate = sectionGateState[sectionId] || {};
  var section = FLOORS[fi].sections[si];
  var needsQuiz = !!(section && section.quiz);
  if (needsQuiz && !gate.quiz) {
    sageMessage('Answer the knowledge check first — then you can mark this section complete.', 'warn');
    return;
  }

  state.completed[sectionId] = true;
  awardXP(25, 'complete-' + sectionId, window.innerWidth / 2, 300);
  playCompletionSound();
  trackDailySection();

  const isNowComplete = isFloorComplete(fi);
  if (isNowComplete) {
    awardXP(250, 'floor-' + fi, window.innerWidth / 2, 250);
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
  // Auto-complete the section if the user clicks Next without marking it done
  const floor = FLOORS[fi];
  const section = floor.sections[si];
  if (!state.completed[section.id]) {
    state.completed[section.id] = true;
    awardXP(25, 'complete-' + section.id, window.innerWidth / 2, 300);
    const isNowComplete = isFloorComplete(fi);
    if (isNowComplete) {
      awardXP(250, 'floor-' + fi, window.innerWidth / 2, 250);
      setTimeout(function() { showFloorCelebration(fi); }, 600);
    }
    saveState();
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
  const btn = document.getElementById(`listen-btn-${sectionId}`);
  if (currentNarrationId === sectionId && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    currentNarrationId = null;
    if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>▶ Listen'; }
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
    if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>▶ Listen'; }
  };
  currentUtterance = utterance;
  currentNarrationId = sectionId;
  window.speechSynthesis.speak(utterance);
  if (btn) { btn.classList.add('playing'); btn.innerHTML = '<span class="listen-dot"></span>⏸ Pause'; }
}

function stopNarration() {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  currentNarrationId = null;
}

// ============================================
// FLOOR 2 — CONTROL PANEL INTERACTION
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
    screen.querySelector('.status-text').textContent = 'STATUS: FLOOR 2 ✓';
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
    sageMessage('Variables must be accurate. We are on Floor 2 — so the value must be 2!', 'warn');
  }
}

function playF2Sound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
// SYSTEM 1 — ELEVATOR TRANSITIONS
// ============================================
let lastFloorIndex = 0;
function renderFloor(fi, si) {
    // TEMP FIX: just load section
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
// SYSTEM 2 — SAGE SPEECH BUBBLE
// ============================================
let sageBubbleTimeout = null;
let sageIdleTimeout = null;
let sageIdleTimer = null;

const SAGE_MOODS = {
  encourage: { icon: '🦉', color: 'var(--accent)' },
  tip:       { icon: '🦉', color: 'var(--accent2)' },
  warn:      { icon: '🦉', color: 'var(--floor3)' },
  celebrate: { icon: '🦉', color: 'var(--success)' }
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
  bubble.innerHTML = `
    <button class="sage-bubble-close" onclick="this.parentElement.remove()">✕</button>
    <div class="sage-bubble-header">
      <span class="sage-bubble-icon">${m.icon}</span>
      <span class="sage-bubble-name" style="color:${m.color}">SAGE</span>
    </div>
    <div class="sage-bubble-text">${text}</div>
  `;
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
// SYSTEM 3 — GOLDEN DUST XP PARTICLES
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
    particle.style.cssText = `
      left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;
      --tx:${tx}px;--ty:${ty}px;--dur:${dur}s;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), dur * 1000 + 100);
  }
}

// ============================================
// SYSTEM 4 — BUILDING MAP
// ============================================
function renderBuildingMap() {
  const map = document.getElementById('building-map');
  if (!map) return;
  const FLOOR_COLORS = ['--floor1','--floor2','--floor3','--floor4','--floor5','--floor6','--floor7'];
  map.innerHTML = [...FLOORS].reverse().map((f, ri) => {
    const fi = FLOORS.length - 1 - ri;
    const isUnlocked = fi === 0 || isFloorComplete(fi - 1);
    const isActive = fi === state.currentFloor - 1;
    const isComplete = isFloorComplete(fi);
    const color = `var(${FLOOR_COLORS[fi]})`;
    const shortName = f.title.split('—')[0].trim().replace('Understanding Before Touching', 'Foundation').replace('Seeing It Come Alive','Visual Build').replace('Building With Training Wheels','Interactivity').replace('Building Alone','Independence').replace('Solving Real Problems','Full Stack').replace('Specialisation','Your Lane').replace('Professional Grade','Arrival');
    return `<div class="building-floor ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}"
      style="--floor-color:${color};"
      onclick="${isUnlocked ? `goToFloor(${fi})` : ''}">
      <div class="building-window ${isComplete ? 'complete' : ''}" style="${isUnlocked ? `background:${color};border-color:${color};box-shadow:0 0 8px ${color};` : ''}"></div>
      <div class="building-floor-label">F${fi+1} · ${shortName}</div>
      ${isActive ? `<div style="margin-left:auto;width:5px;height:5px;border-radius:50%;background:${color};flex-shrink:0;"></div>` : ''}
    </div>`;
  }).join('');
}

function toggleHint(id) {
  const box = document.getElementById(id);
  if (box) box.classList.toggle('visible');
}

// --- AUDIO SYSTEM ---
function playTone(frequency, duration, volume, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
  // Three ascending tones — calm and satisfying
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
  var emoji = isLight ? '☀️' : '🌙';
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
      if (btn) btn.textContent = '☀️';
    });
  }
}
function toggleTimer() {
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    document.getElementById('timer-btn').textContent = '▶';
    const elapsed = (25 * 60) - state.timerSeconds;
    if (elapsed > 30) {
      state.totalSeconds += elapsed;
      state.sessionLog.push({ date: new Date().toDateString(), seconds: elapsed });
      saveState();
      updateTimeLog();
    }
  } else {
    state.timerRunning = true;
    document.getElementById('timer-btn').textContent = '⏸';
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
        document.getElementById('timer-btn').textContent = '▶';
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
  document.getElementById('timer-btn').textContent = '▶';
  document.getElementById('timer-display').style.color = '#c8a96e';
  updateTimerDisplay();
}
function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
  const s = (state.timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer-display').textContent = `${m}:${s}`;
}

// ─── PWA MANIFEST ───
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

// ─── SERVICE WORKER ───
if ('serviceWorker' in navigator) {
  var swCode = [
    "var CACHE='codebook-v1';",
    "self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./']);}));self.skipWaiting();});",
    "self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});",
    "self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(function(r){caches.open(CACHE).then(function(c){c.put(e.request,r.clone());});return r;}).catch(function(){return caches.match(e.request);}));});"
  ].join('\n');
  var swBlob = new Blob([swCode], {type:'application/javascript'});
  navigator.serviceWorker.register(URL.createObjectURL(swBlob), {scope:'./'}).catch(function(){});
}

// ─── INSTALL PROMPT ───
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



// ─── INIT LAYOUT PATCHES ───
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




// ─── MAP PANEL ───────────────────────────────────────────────────────────────
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
    '<div class="panel-hero-sub">Every section you complete builds another floor. ' + completedSections + ' of ' + totalSections + ' sections done — ' + overallPct + '% complete.</div>' +
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
    var statusLabel = isComplete ? 'COMPLETE ✓' : isActive ? 'IN PROGRESS' : isUnlocked ? 'UNLOCKED' : 'LOCKED';

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
            '<div class="map-sec-dot">' + (done ? '✓' : (si + 1)) + '</div>' +
            '<div class="map-sec-title">' + s.title + '</div>' +
            '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}
// ─────────────────────────────────────────────────────────────────────────────

function renderBuildPanel() {
  var panel = document.getElementById('panel-build');
  if (!panel) return;

  var projects = [
    {
      icon: '🌐', floor: 1, title: 'My First Webpage', desc: 'Build a personal "About Me" page using only what you learned in Floor 1.',
      skills: ['HTML', 'Structure'], time: '30 min',
      steps: [
        'Create a new file called <strong>index.html</strong> in a text editor.',
        'Add the basic HTML skeleton: DOCTYPE, html, head, and body tags.',
        'Inside body, add an &lt;h1&gt; with your name.',
        'Add a &lt;p&gt; tag with one sentence about yourself.',
        'Add a second &lt;p&gt; describing what you want to learn.',
        'Open the file in your browser. You should see your page.',
        'Change the heading text to something personal. Save and refresh.',
        'Add one more element — anything. A list, a quote, a second heading.'
      ]
    },
    {
      icon: '🎨', floor: 2, title: 'Styled Portfolio Card', desc: 'Take your About Me page and make it look like something real.',
      skills: ['CSS', 'Design'], time: '45 min',
      steps: [
        'Open your index.html from Floor 1 (or create a new one with the same structure).',
        'Add a &lt;style&gt; block inside &lt;head&gt;.',
        'Set the body background colour to something dark: <code>background: #0a0a0a; color: white;</code>',
        'Style the h1 — change the colour, font-size, and font-family.',
        'Wrap your content in a &lt;div class="card"&gt; and give it padding, a background, and border-radius.',
        'Add a Google Font by pasting a link tag from fonts.google.com into your &lt;head&gt;.',
        'Centre the card on the page using margin: auto and a max-width.',
        'Add one thing you figured out yourself — a hover effect, a border, a colour you chose.'
      ]
    },
    {
      icon: '⚡', floor: 3, title: 'Interactive Counter', desc: 'Build a counter that goes up and down when you click buttons.',
      skills: ['JavaScript', 'DOM'], time: '1 hour',
      steps: [
        'Create a new HTML file. Add a heading that says "Counter".',
        'Add a &lt;p id="count"&gt;0&lt;/p&gt; to display the current number.',
        'Add two buttons: one labelled "+ Add" and one labelled "− Subtract".',
        'Add a &lt;script&gt; block. Declare <code>let count = 0;</code>',
        'Write a function called <code>add()</code> that increases count by 1 and updates the paragraph text.',
        'Write a function called <code>subtract()</code> that decreases count by 1.',
        'Connect the functions to the buttons using onclick attributes.',
        'Add a reset button that sets count back to 0.',
        'Bonus: change the text colour to green when count is positive, red when negative.'
      ]
    },
    {
      icon: '📋', floor: 4, title: 'To-Do List App', desc: 'A working to-do list that remembers your tasks after refresh.',
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
      icon: '🌤️', floor: 5, title: 'Weather Dashboard', desc: 'Fetch live weather data from an API and display it in a custom UI.',
      skills: ['APIs', 'fetch()', 'JSON'], time: '3 hours',
      steps: [
        'Go to openweathermap.org and sign up for a free API key.',
        'Create a new HTML file with an input for a city name and a Search button.',
        'Add a &lt;div id="weather"&gt; where results will be displayed.',
        'Write a <code>fetchWeather(city)</code> async function using the fetch() API.',
        'Build the URL: <code>https://api.openweathermap.org/data/2.5/weather?q={city}&appid={YOUR_KEY}&units=metric</code>',
        'Parse the JSON response and extract: city name, temperature, weather description, humidity.',
        'Display the data inside the #weather div.',
        'Handle errors — what if the city is not found? Show a friendly message.',
        'Style the results card. Add a weather icon using the icon code from the API response.',
        'Push the project to GitHub and deploy on Netlify.'
      ]
    },
    {
      icon: '🚀', floor: 6, title: 'Full Portfolio Site', desc: 'A multi-page portfolio site that represents you professionally.',
      skills: ['HTML', 'CSS', 'JS', 'Deploy'], time: '1 week',
      steps: [
        'Plan on paper first: what pages do you need? (Home, Projects, About, Contact)',
        'Create an index.html and a shared nav bar that appears on every page.',
        'Home page: your name, one strong sentence about what you do, a call-to-action button.',
        'Projects page: a card for each of your Floor 1–5 builds with a title, screenshot, description, and live link.',
        'About page: your story, what you\'ve learned, where you\'re heading.',
        'Contact section: your email or a simple form (use Formspree for a working form without a backend).',
        'Make it fully responsive — test on a phone.',
        'Add a dark/light mode toggle.',
        'Push to GitHub with a clear README.',
        'Deploy on Netlify. Share the URL.'
      ]
    },
    {
      icon: '🏗️', floor: 7, title: 'Capstone Project', desc: 'Your final project. No constraints. Build something you\'re proud of.',
      skills: ['Everything'], time: 'Your call',
      steps: [
        'Identify the problem: write one sentence describing what your project does and who it helps.',
        'Define the MVP (Minimum Viable Product): the smallest version that still solves the problem.',
        'Plan the data model: what information does your app store? Sketch the database tables.',
        'Plan the UI: sketch the key screens on paper before writing any code.',
        'Set up your project: Git repo, folder structure, deployment pipeline first.',
        'Build the backend first — get your data model working and your API endpoints tested.',
        'Build the frontend next — connect it to your backend.',
        'Test everything: what happens when things go wrong? Handle errors gracefully.',
        'Write a README that explains what it is, how to run it, and what you learned building it.',
        'Deploy it, share it, and add it to your portfolio. You\'re done.'
      ]
    }
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">BUILD MODE</div>' +
    '<div class="panel-hero-title">Build Real Things</div>' +
    '<div class="panel-hero-sub">Projects unlock as you complete floors. Each one has guided steps to get you started — but the decisions are yours.</div>' +
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
        (!done ? '<button class="build-mark-done" onclick="markBuildDone(' + p.floor + ');event.stopPropagation()">Mark as Complete ✓</button>' : '') +
        '</div>';
    }
    html += '<div class="build-card' + (!unlocked ? ' locked' : '') + (done ? ' done' : '') + '">' +
      '<div class="build-card-icon">' + p.icon + '</div>' +
      '<div class="build-card-tag">FLOOR ' + p.floor + ' PROJECT' + (done ? ' ✓' : !unlocked ? ' — LOCKED' : '') + '</div>' +
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



function renderChallengePanel() {
  var panel = document.getElementById('panel-challenge');
  if (!panel) return;

  var challenges = [
    { icon: '⚡', type: 'DAILY', title: "Today's Knowledge Check", desc: 'One question. Earn bonus XP. Resets every day.', xp: '+20 XP', action: 'showDailyChallenge()', done: !!localStorage.getItem('codebook_challenge_done_' + new Date().toDateString()) },
    { icon: '🧠', type: 'RECALL', title: 'Spaced Repetition Quiz', desc: 'Questions from sections you completed. Reinforce what you know.', xp: '+15 XP each', action: 'startRecallQuiz()', done: false },
    { icon: '⏱️', type: 'SPEED', title: 'Speed Round', desc: '10 questions. 30 seconds each. How fast can you go?', xp: '+50 XP', action: 'startSpeedRound()', done: false, locked: state.xp < 100 },
    { icon: '🔥', type: 'STREAK', title: 'Streak Challenge', desc: 'Answer 5 questions in a row without getting one wrong.', xp: '+75 XP', action: 'startStreakChallenge()', done: false, locked: state.xp < 200 },
    { icon: '🏆', type: 'FLOOR', title: 'Floor Boss', desc: 'A comprehensive quiz on everything in the floor you just completed.', xp: '+100 XP', action: 'startFloorBoss()', done: false, locked: !isFloorComplete(state.currentFloor - 1) },
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

// ── RECALL QUIZ ─────────────────────────────────────────────────────────
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

// ── SPEED ROUND ──────────────────────────────────────────────────────────
// Picks a question offset by 2 from the daily so it is always different.
var _speedRoundIndex = 0;
function startSpeedRound() {
  if (state.xp < 100) return;
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + 2 + _speedRoundIndex) % DAILY_CHALLENGES.length;
  _speedRoundIndex = (_speedRoundIndex + 1) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  _openChallengeModal(
    challenge,
    'Speed Round',
    'Fast as you can. +' + challenge.xp + ' XP. Go.',
    'speed-' + today + '-' + idx
  );
}

// ── STREAK CHALLENGE ─────────────────────────────────────────────────────
// Picks a question offset by 3 from the daily.
var _streakIndex = 0;
function startStreakChallenge() {
  if (state.xp < 200) return;
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + 3 + _streakIndex) % DAILY_CHALLENGES.length;
  _streakIndex = (_streakIndex + 1) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  _openChallengeModal(
    challenge,
    'Streak Challenge',
    'Answer correctly to extend your streak. +' + challenge.xp + ' XP.',
    'streak-' + today + '-' + idx
  );
}

// ── FLOOR BOSS ───────────────────────────────────────────────────────────
// Picks a question offset by the current floor number so each floor feels different.
function startFloorBoss() {
  var fi = state.currentFloor - 1;
  if (!isFloorComplete(fi)) return;
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + fi + 4) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  _openChallengeModal(
    challenge,
    'Floor ' + state.currentFloor + ' Boss',
    'Prove you mastered this floor. +' + challenge.xp + ' bonus XP.',
    'boss-floor' + fi + '-' + today
  );
}
console.log("JS is running");
startFloorBoss();

