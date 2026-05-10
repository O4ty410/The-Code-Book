
console.log("JS is working");
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
    duration: "3\u20134 weeks",
    sessions: "5 per week",
    length: "45\u201360 min",
    tag: "Floor 01 \u2014 Foundation",
    sections: [
      {
        id: "1-1",
        title: "How the Internet Actually Works",
       body: "Before you write a single line of code, you need to think of it like this. When you type a web address, that entire process happens in milliseconds, every single time you visit a site.",

        
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
        hint: `Imagine the internet like a postal service. You are the sender. The website is the recipient. Your browser writes the letter (the request), sends it to the right address (the server), and the server writes back with everything needed to paint the page on your screen.\n\n<strong>Still fuzzy?</strong> Try this \u2014 next time you visit a website, think: "somewhere in the world, a computer just received my request and sent me back a bunch of files." That's literally all that happened.`,
        quiz: {
          question: "When you visit a website, what is your browser actually doing?",
          options: ["Creating the website from scratch", "Requesting and displaying files from another computer", "Downloading the entire internet", "Connecting directly to the website owner"],
          correct: 1,
          feedback: "Correct. Your browser sends a request to a server \u2014 another computer \u2014 which sends back files. Your browser reads those files and displays them. That's it. That's the web."
        }
      },
      {
        id: "1-2",
        title: "How a Computer Reads Instructions",
        body: `Computers are extraordinarily fast. But they are not smart. They do <strong>exactly</strong> what you tell them \u2014 nothing more, nothing less. This is both the challenge and the power of coding.

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
        hint: `Think of a recipe. If it says "serve the cake" before "bake the cake" \u2014 you have a problem. Computers are the same. They do exactly what you say, in exactly the order you say it. No guessing, no common sense.\n\n<strong>Still fuzzy?</strong> Write out 5 instructions for making a cup of tea in order. That sequential thinking \u2014 that's exactly how a computer reads code.`,
        quiz: {
          question: "If your code says: Step 1: Display the result. Step 2: Calculate the result. What happens?",
          options: ["It works fine, computers are smart enough to reorder", "It displays nothing or an error, because the result doesn't exist yet", "It calculates first anyway", "It asks you what to do"],
          correct: 1,
          feedback: "The computer tries to display the result before it's been calculated \u2014 so there's nothing to show. Order is everything. This is one of the most common beginner mistakes, and now you already understand why it happens."
        }
      },
      {
        id: "1-3",
        title: "The Logic Behind All Code",
        body: "Every programming language in the world \u2014 no matter how different they look \u2014 is based on: <strong>1. Conditions</strong> \u2014 If this is true, do this. Otherwise, do that. <strong>2. Loops</strong> \u2014 Do this thing repeatedly until something changes. <strong>3. Functions</strong> \u2014 A named set of instructions you can use again and again. That's it. Every app, every game, every website you've ever used is built on combinations of those three ideas.",

        callout: {
          type: "default",
          label: "Real World Example",
          text: "A traffic light is a loop (keeps cycling) with conditions (if it's been red for 60 seconds, turn green) and functions (a reusable set of steps for each colour change). You already understand code logic. You just haven't written it yet."
        },
        hint: `A <strong>condition</strong> is a fork in the road \u2014 if it's raining, take an umbrella, otherwise don't.\nA <strong>loop</strong> is like brushing your teeth \u2014 you repeat the same motion until the job is done.\nA <strong>function</strong> is like a vending machine \u2014 you press a button (call the function) and it always does the same thing.\n\n<strong>Still fuzzy?</strong> Look around the room and find one real-world example of each. A thermostat is a condition. A washing machine cycle is a loop. A light switch is a function.`,
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
        body: `You're not going to write code yet. You're going to <strong>read</strong> it. This is important \u2014 before you write a language, you learn to read it. Same principle.

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
          text: "Those angle brackets \u2014 the &lt; and &gt; \u2014 are called <strong>tags</strong>. They're labels that tell the browser what each piece of content is. h1 means a big heading. p means a paragraph. button means a clickable button. Open tag, content, close tag. That's the pattern."
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
        title: "Floor 1 Check \u2014 Explain It Back",
        body: `This is the most important section of Floor 1. Not because it's the hardest \u2014 but because explaining something back is how you prove to yourself that it has actually landed.

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
          text: "If you can answer all four in plain English without looking back \u2014 you're ready for Floor 2. If one or two feel shaky \u2014 go back to that section, not the whole floor. One weak brick, not a broken building."
        },
        hint: `If you can't answer one of the four questions, that's not failure \u2014 that's information. It tells you exactly which section to go back to.\n\n<strong>Tip:</strong> Don't go back to the beginning. Go back to the one section that felt unclear and just read that part again. One weak spot doesn't mean you don't understand the rest.`,
      }
    ]
  },
  {
    id: 2,
    title: "Seeing It Come Alive",
    subtitle: "HTML & CSS \u2014 the visual layer",
    color: "#7eb8c8",
    duration: "6\u20138 weeks",
    sessions: "5 per week",
    length: "45\u201360 min",
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
        body: `Every webpage you have ever visited is built with HTML at its core. HTML gives a page its <strong>structure</strong>. It says: here is a heading. Here is a paragraph. Here is a button.\n\nThink of it like the frame of a house. Before the walls, before the paint \u2014 there's a frame. HTML is the frame.`,
        callout: { type: "default", label: "The Pattern", text: "Every HTML element follows the same pattern: opening tag, content, closing tag. That's it. That's the whole language." },
        hint: `Open any website, right-click anywhere and choose "View Page Source." Everything you see is HTML. Scan it and try to spot tags you recognise \u2014 h1, p, button. They're everywhere.`,
        code: { lang: "HTML", lines: ['<span class="code-tag">&lt;h1&gt;</span>This is a heading<span class="code-tag">&lt;/h1&gt;</span>', '<span class="code-tag">&lt;p&gt;</span>This is a paragraph.<span class="code-tag">&lt;/p&gt;</span>', '<span class="code-tag">&lt;button&gt;</span>Click Me<span class="code-tag">&lt;/button&gt;</span>'] },
        checklist: ["I understand that HTML provides structure", "I can read the open tag / content / close tag pattern"]
      },
      {
        id: "2-3",
        title: "CSS \u2014 Making It Look Like Something",
        body: `If HTML is the skeleton, <strong>CSS is the skin and the style</strong>. CSS tells the browser how to display things. What colour is that heading? How big is that text? Where does that button sit?\n\nWithout CSS, every website would look like a plain text document.`,
        callout: { type: "focus", label: "Visual Learner Moment", text: "CSS is where the visual magic lives. Every colour, every font, every layout. This is going to be one of your strongest areas." },
        hint: `Think of CSS like instructions to an interior designer. "The headings \u2014 make them gold. The background \u2014 make it dark." CSS is just that conversation written in a specific format: what you're targeting, then what you want to change.`,
        code: { lang: "CSS", lines: ['<span class="code-tag">h1</span> {', '  <span class="code-attr">color</span>: <span class="code-string">#c8a96e</span>;', '  <span class="code-attr">font-size</span>: <span class="code-value">48px</span>;', '}'] },
        checklist: ["I understand the difference between HTML and CSS", "I can read basic CSS syntax"]
      },
      {
        id: "2-4",
        title: "Your First Webpage",
        body: `Now you build something. Open a plain text editor on your device. Type the code below exactly as you see it. Save the file as <strong>index.html</strong> and open it in your browser.\n\nYou will see a real webpage. One that you made.`,
        callout: { type: "warning", label: "The Cautious Learner", text: "You might be tempted to skip this and just read it. Don't. The physical act of typing the code activates something different in the brain than reading it. Do the thing." },
        hint: `If your page isn't showing anything \u2014 check that you saved with the .html extension, not .txt. And make sure you're opening it in a browser, not a text editor.`,
        code: { lang: "HTML + CSS", lines: ['<span class="code-tag">&lt;!DOCTYPE html&gt;</span>', '<span class="code-tag">&lt;html&gt;&lt;head&gt;&lt;style&gt;</span>', '  <span class="code-tag">body</span> { background: #0a0a0a; color: white; }', '  <span class="code-tag">h1</span> { color: #c8a96e; }', '<span class="code-tag">&lt;/style&gt;&lt;/head&gt;&lt;body&gt;</span>', '  <span class="code-tag">&lt;h1&gt;</span>I built this.<span class="code-tag">&lt;/h1&gt;</span>', '  <span class="code-tag">&lt;p&gt;</span>Day one. Already making things.<span class="code-tag">&lt;/p&gt;</span>', '<span class="code-tag">&lt;/body&gt;&lt;/html&gt;</span>'] },
        checklist: ["I typed the code out", "I saved it as index.html", "I opened it and saw my webpage", "I changed at least one thing"]
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
    duration: "8\u201310 weeks",
    sessions: "5 per week",
    length: "60 min",
    tag: "Floor 03 \u2014 Interactivity",
    sections: [
      {
        id: "3-1",
        title: "What JavaScript Does",
        body: `HTML is structure. CSS is style. <strong>JavaScript is behaviour.</strong>

It's the language that makes things happen when you interact with a page. A button that does something when you click it. A form that validates your input. A menu that slides open. An image that changes. A countdown timer. A game.

All of that is JavaScript. It's the language that brings web pages to life.

Unlike HTML and CSS, JavaScript is a <strong>proper programming language</strong>. It has variables, conditions, loops, functions \u2014 all three of those core concepts from Floor 1, but now written out in real code.`,
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
        hint: `HTML = the bones. CSS = the look. JavaScript = the brain.\n\nWithout JavaScript a page is just a static document. JavaScript is what makes things respond to you \u2014 clicks, typing, scrolling. It's what makes a website feel alive.\n\n<strong>Feeling nervous about this floor?</strong> That's completely normal. JavaScript is a step up. But remember \u2014 you already understand the three concepts it's built on: conditions, loops, functions. You met them in Floor 1. Now you just get to see them written out for real.`,
      },
      {
        id: "3-2",
        title: "Variables, Conditions and Loops in Real Code",
        body: `You already understand these concepts from Floor 1. Now you see what they look like when actually written.`,
        code: {
          lang: "JAVASCRIPT",
          lines: [
            '<span class="code-comment">// A variable \u2014 storing a piece of information</span>',
            '<span class="code-keyword">let</span> myName = <span class="code-string">"Your Name Here"</span>;',
            '',
            '<span class="code-comment">// A condition \u2014 if this, do that</span>',
            '<span class="code-keyword">if</span> (myName === <span class="code-string">"Your Name Here"</span>) {',
            '  console.log(<span class="code-string">"You haven\'t changed the name yet!"</span>);',
            '} <span class="code-keyword">else</span> {',
            '  console.log(<span class="code-string">"Hello, "</span> + myName);',
            '}',
            '',
            '<span class="code-comment">// A loop \u2014 do this 5 times</span>',
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
        hint: `<strong>Variable:</strong> A named box that holds a value. let age = 25 means "create a box called age and put 25 in it."\n\n<strong>Condition:</strong> if (age > 18) { do this } else { do that }. Reads almost like plain English.\n\n<strong>Loop:</strong> for (let i = 1; i <= 5; i++) \u2014 this says "start at 1, keep going as long as i is 5 or less, add 1 each time."\n\n<strong>Still fuzzy?</strong> Copy the code into a blank HTML file inside script tags, open it in your browser, then open the Developer Console (F12). You'll see the output printed there. Seeing it run is worth more than reading it ten times.`,
      },
      {
        id: "3-3",
        title: "Buttons That Actually Do Things",
        body: `This is the session that changes everything. You're going to connect JavaScript to HTML so that when someone clicks a button, <strong>something actually happens.</strong>

This is called <strong>DOM manipulation</strong> \u2014 DOM stands for Document Object Model, which is just a fancy way of saying "the HTML that's currently on screen." JavaScript can reach in and change it.`,
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

The browser has a built-in tool called the <strong>Developer Console</strong>. Press F12 in any browser to open it. When your code breaks, the error will be described there \u2014 what went wrong, and on which line.`,
        callout: {
          type: "warning",
          label: "The Cautious Learner",
          text: "Broken code is not failure. It is the process. Every error message is the computer telling you exactly what it needs from you. Learn to read them as information, not as judgement."
        },
        callout2: {
          type: "focus",
          label: "ADHD Note",
          text: "When something breaks and you can't find why \u2014 <strong>stop, step away for 5 minutes, come back.</strong> The answer is almost always obvious after a short break. This is true for every developer at every level."
        },
        hint: `When something breaks, the first question is always: <strong>what does the console say?</strong> Open it with F12, click "Console." If there's a red error message, read it carefully \u2014 it usually tells you the line number and what went wrong.\n\n<strong>Most common beginner errors:</strong>\n\u2014 Typo in a variable name (JavaScript is case-sensitive \u2014 myName and myname are different things)\n\u2014 Missing a closing bracket or curly brace\n\u2014 Calling a function before it's been defined\n\nIf you're truly stuck, copy the error message exactly and search it on Google. Someone has had that exact error before.`,
      },
      {
        id: "3-5",
        title: "Floor 3 Project \u2014 An Interactive Webpage",
        body: `Your Floor 3 project is your most complex build yet. You're going to combine everything \u2014 HTML structure, CSS style, and JavaScript behaviour \u2014 into one working interactive piece.

<strong>The brief:</strong> Build a simple quiz. Any topic you like. At least 3 questions. The user clicks their answer, the page tells them if they're right or wrong, and at the end it shows their score.

This will feel like a lot. Break it into pieces. One question first. Then add the score. Then add the rest.`,
        callout: {
          type: "default",
          label: "Why a Quiz",
          text: "A quiz uses conditions (is this answer correct?), functions (check the answer, show the score), and DOM manipulation (change what's on screen). It exercises everything from this floor in one build."
        },
        hint: `Break it into the smallest possible steps. Don't try to build the whole quiz at once.\n\nStep 1: Show one question on screen. That's it. Just the text.\nStep 2: Add the answer buttons.\nStep 3: Make one button check if it's correct.\nStep 4: Show "correct" or "wrong."\nStep 5: Add a score variable that goes up by 1 when correct.\nStep 6: Repeat for questions 2 and 3.\nStep 7: Show the final score.\n\n<strong>Each step is small enough to not be scary.</strong> You never have to build the whole thing \u2014 just the next small piece.`,
      }
    ]
  },
  {
    id: 4,
    title: "Building Alone",
    subtitle: "Where the doer starts to emerge",
    color: "#9a7ec8",
    duration: "10\u201312 weeks",
    sessions: "5 per week",
    length: "60\u201390 min",
    tag: "Floor 04 \u2014 Independence",
    sections: [
      { id: "4-1", title: "Receiving a Brief", body: `From this floor onward, things change. I give you a brief \u2014 a description of what to build \u2014 and you figure out how to build it without being walked through every step.\n\nThis is how real development works. A client, a manager, or your own idea gives you a target. You use what you know, research what you don't, and produce something that works.\n\nThe first brief is simple. More complex ones follow. But the pattern is the same: <strong>understand the brief, plan before you code, build, review.</strong>`, callout: { type: "default", label: "Brief 01", text: "Build a tip calculator. The user enters a bill amount and selects a tip percentage (10%, 15%, 20%). The page calculates and displays the tip amount and the total." }, callout2: { type: "focus", label: "Plan First", text: "Before you write a single line of code, write out in plain English what the calculator needs to do. Then identify which HTML elements you need, which CSS styles, and which JavaScript functions. Plan first. Code second." }, hint: `Break the tip calculator into just three questions before touching code:\n\n1. What does the user need to type or click? (inputs)\n2. What does the page need to calculate? (logic)\n3. What does the page need to show? (output)\n\nAnswer those in plain English first. Then each answer becomes a piece of code.\n\n<strong>Still stuck?</strong> Start even smaller \u2014 just get an input box on screen. Then get the number out of it with JavaScript. Then multiply it. One tiny piece at a time.`, checklist: ["I read the brief carefully", "I planned the build before starting", "I built the tip calculator", "It works correctly with different inputs"] },
      { id: "4-2", title: "How Developers Actually Think", body: `Professional developers don't memorise everything. They can't \u2014 there's too much. What they have instead is a <strong>process</strong>.\n\nWhen they face a new problem: they break it down into smaller pieces. They solve the smallest piece first. Then the next. They use documentation and search engines without shame. They test constantly. And they know that the first version doesn't have to be perfect \u2014 it just has to work.\n\nThis floor is about building that process in you.`, callout: { type: "default", label: "The Developer Mindset", text: "A professional developer Googles things every single day. Knowing how to find answers quickly and evaluate them correctly is itself a core skill. You are learning to think like a developer, not to become a dictionary." }, hint: `If you feel like you should already know the answer without looking it up \u2014 let that feeling go. It isn't how this works.\n\nThe skill isn't memorising. The skill is knowing <strong>how to find the answer quickly and recognise a good one</strong>. That takes time to build and it builds through practice, not through reading.\n\n<strong>Practical tip:</strong> When you search for something, after you've solved it, close the tab and try to write the solution again from memory. That repetition is what moves it from "I found it" to "I know it."`, checklist: ["I understand that looking things up is normal", "I can break a problem into smaller steps", "I test my code as I build, not just at the end"] },
      { id: "4-3", title: "Introduction to Storing Data", body: `So far, everything your code does disappears when the page refreshes. Real applications need to <strong>remember things</strong>.\n\nThis section introduces you to two ideas: <strong>localStorage</strong> (the browser can remember small amounts of data even after the page closes) and the concept of <strong>databases</strong> (which we'll build in Floor 5).\n\nFor now, localStorage lets you build things that actually persist. A to-do list that remembers your items. A preference that saves your chosen colour theme. Small but powerful.`, callout: { type: "default", label: "Why This Matters", text: "The moment your code can remember things is the moment it starts feeling like a real product rather than a demo. This is a significant step." }, hint: `localStorage works like a small notepad the browser keeps.\n\nTo save something: localStorage.setItem('myKey', 'myValue')\nTo get it back: localStorage.getItem('myKey')\nTo delete it: localStorage.removeItem('myKey')\n\n<strong>Important:</strong> localStorage only stores text. If you want to save a list or an object, convert it first with JSON.stringify() and convert it back with JSON.parse(). That sounds complicated but it's just two words to remember.\n\n<strong>Still fuzzy?</strong> Build a page with a text input and a save button. When you click save, store what's in the input. Reload the page. Check if it's still there. That moment of "it remembered!" is worth a hundred explanations.`, checklist: ["I understand what localStorage does", "I built something that saves data between page refreshes", "I understand that databases do the same thing at a much larger scale"] },
      { id: "4-4", title: "Code Review \u2014 Looking at What You Built", body: `A code review is when you look back at your own code with fresh eyes \u2014 or when someone else does \u2014 and asks: is this the best way to do it?\n\nAs you review your previous projects, ask yourself:\n\n<strong>Is it readable?</strong> Could someone else understand what this code does?\n<strong>Is it repetitive?</strong> Am I writing the same thing multiple times when a function could handle it?\n<strong>Does it handle mistakes?</strong> What happens if the user enters something unexpected?`, callout: { type: "focus", label: "The Logical Thinker's Favourite Section", text: "Code review is where your logical mind shines. You're not just making things work \u2014 you're asking why it works and whether it could work better. That habit separates good developers from great ones." }, hint: `When reviewing your own code, read it as if you've never seen it before. Better still \u2014 leave it for a day, then come back.\n\n<strong>Three quick questions for any piece of code:</strong>\n1. If I read this variable name alone, do I know what it holds?\n2. Could I explain what this function does in one sentence?\n3. What happens if the user does something I didn't expect?\n\nIf any answer is "I'm not sure" \u2014 that's what needs fixing. Not because it's broken, but because unclear code causes problems later.`, checklist: ["I reviewed my Floor 3 project with fresh eyes", "I found at least one thing I could improve", "I improved it"] },
      { id: "4-5", title: "Floor 4 Project \u2014 Something You Designed", body: `No brief this time. Just a constraint.\n\n<strong>Build something that solves a problem you actually have.</strong>\n\nIt can be small. A habit tracker. A simple budget tool. A random meal picker. A reading list. Anything that would genuinely be useful to you.\n\nIt must use HTML, CSS, and JavaScript. It must store at least one piece of data. And it must be something you'd actually use.`, callout: { type: "warning", label: "The Fear of the Blank Page", text: "This is where the cautious learner hesitates. You might feel like your idea isn't good enough or too simple. <strong>Build it anyway.</strong> The idea doesn't matter as much as the act of designing and building something from nothing." }, hint: `If you truly cannot think of an idea, use one of these:\n\u2014 A mood tracker that saves today's mood with a date\n\u2014 A simple counter that remembers its number after refresh\n\u2014 A personal quote collection where you save your favourite quotes\n\u2014 A daily water intake tracker\n\nNone of these are impressive. All of them are real. The point isn't the idea \u2014 it's the experience of making every decision yourself, from the first line to the last.`, checklist: ["I identified a real problem to solve", "I planned the build before starting", "I built it", "It uses localStorage", "I would actually use it", "I'm ready for Floor 5"] }
    ]
  },
  {
    id: 5,
    title: "Solving Real Problems",
    subtitle: "Backend, databases, APIs \u2014 the full picture",
    color: "#7ec8a9",
    duration: "4\u20135 months",
    sessions: "5 per week",
    length: "60\u201390 min",
    tag: "Floor 05 \u2014 Full Stack",
    sections: [
      { id: "5-1", title: "What is the Backend?", body: `Everything you've built so far lives in the <strong>frontend</strong> \u2014 the part the user sees and interacts with in the browser. But most real applications have a second layer: the <strong>backend</strong>.\n\nThe backend is a computer (a server) that runs code the user never directly sees. It handles things that can't be done safely in the browser: storing sensitive data, processing payments, managing user accounts, running complex logic.\n\nIf the frontend is the shop floor, the backend is the warehouse and the office. The customer sees the shop floor. Everything that makes it function is behind the scenes.`, callout: { type: "default", label: "The Stack", text: "When you can build both the frontend and the backend, you are a Full Stack developer. That's what Floor 7 looks like. Floor 5 is where the second half begins." }, hint: `Think of a bank. The website you log into is the frontend \u2014 buttons, forms, your balance on screen. But the actual money, the security checks, the transaction history \u2014 none of that lives in your browser. It all lives on the bank's servers. That's the backend.\n\n<strong>Why can't we just do everything in the browser?</strong> Because the browser is public. Anyone can open developer tools and see your JavaScript. You would never put a password or payment logic somewhere anyone can read. The backend is where the sensitive work happens safely.`, checklist: ["I understand the difference between frontend and backend", "I understand why a backend is necessary", "I understand what a server does"] },
      { id: "5-2", title: "Databases \u2014 Storing Real Information", body: `A database is an organised system for storing and retrieving information. Think of it like an enormous, structured spreadsheet that code can read from and write to instantly.\n\nThe most common type of database is a <strong>relational database</strong> \u2014 it stores data in tables with rows and columns, and tables can relate to each other. The language used to talk to these databases is called <strong>SQL</strong>.\n\nSQL lets you: create tables, add data, retrieve data, update data, and delete data. Four operations. Everything a database ever does is a variation of one of those four.`, callout: { type: "default", label: "Your First SQL", text: "SELECT * FROM users WHERE name = 'You';\n\nThis reads as: 'Get everything from the users table where the name column equals You.' Plain English that has become code. That's SQL." }, hint: `The four database operations have a nickname: <strong>CRUD</strong>.\nCreate \u2014 add new data\nRead \u2014 get existing data\nUpdate \u2014 change existing data\nDelete \u2014 remove data\n\nEvery app you've ever used is CRUD at its core. Instagram: Create a post. Read your feed. Update your bio. Delete a comment. That's it.\n\n<strong>SQL still looks strange?</strong> Read it out loud as a sentence. SELECT name FROM users WHERE age > 18 \u2014 "Give me the name column, from the users table, where the age is over 18." It reads like a question asked to the database.`, checklist: ["I understand what a database is", "I understand the four basic database operations", "I can read basic SQL"] },
      { id: "5-3", title: "APIs \u2014 Making Systems Talk to Each Other", body: `An API (Application Programming Interface) is how different pieces of software talk to each other. When you check the weather on your phone, your app doesn't have its own weather satellite. It asks a weather API for the data.\n\nAPIs are everywhere. When you log into a website using Google, that's an API. When you see a map embedded in a page, that's a Google Maps API. When an app processes a payment, that's a payment API.\n\nAs a developer, you'll both <strong>use</strong> other people's APIs and eventually <strong>build</strong> your own.`, callout: { type: "focus", label: "The Exciting Part", text: "APIs are what let you build powerful things quickly. Instead of building a mapping system from scratch, you use Google's. Instead of building payment infrastructure, you use Stripe's. You focus on the unique part of your idea." }, hint: `An API is like a waiter in a restaurant. You (the app) don't go into the kitchen (the server) yourself. You tell the waiter (the API) what you want. The waiter goes and gets it and brings it back.\n\nYou make a <strong>request</strong> \u2014 "give me the current weather for London."\nThe API returns a <strong>response</strong> \u2014 usually a chunk of data in JSON format (which looks like a JavaScript object).\nYou then use that data however you need in your app.\n\n<strong>Best way to understand APIs:</strong> Go to openweathermap.org, get a free API key, and make your first real API call. Seeing live data appear on your screen from a request you wrote is one of the best moments in learning to code.`, checklist: ["I understand what an API is", "I made a request to a real API and displayed the data", "I understand the concept of API keys and why they exist"] },
      { id: "5-4", title: "Version Control \u2014 How Professionals Manage Work", body: `Every professional developer uses version control. The most common tool is called <strong>Git</strong>.\n\nGit keeps a complete history of every change you've ever made to your code. It lets you go back to any previous version. It lets multiple people work on the same codebase without overwriting each other. And it lets you experiment safely \u2014 try something, see if it works, and undo it if it doesn't.\n\n<strong>GitHub</strong> is a website where you store your Git projects online. It's also where employers look when they want to see your work.`, callout: { type: "warning", label: "Start Using Git Now", text: "Don't wait until you feel ready. Start putting all your projects from this point forward into Git repositories. Your GitHub profile becomes your portfolio. Every commit is evidence of your growth." }, hint: `The three Git commands you'll use 90% of the time:\n\ngit add . \u2014 "package up all my changes"\ngit commit -m "what I did" \u2014 "save a snapshot with a label"\ngit push \u2014 "send it up to GitHub"\n\nThat's it to start. Everything else \u2014 branches, merging, pull requests \u2014 comes naturally once those three are muscle memory.\n\n<strong>Common first mistake:</strong> Writing vague commit messages like "fixed stuff." Write what you actually did \u2014 "added tip calculation function" or "fixed button colour on mobile." Future you will thank present you.`, checklist: ["I installed Git", "I created a GitHub account", "I pushed at least one project to GitHub", "I understand the basic Git workflow: add, commit, push"] },
      { id: "5-5", title: "Deploying \u2014 Putting Work Live on the Internet", body: `Everything you've built so far only exists on your computer. Deployment is the process of putting your work on a server so anyone in the world can access it through a URL.\n\nFor frontend projects, <strong>Netlify</strong> and <strong>Vercel</strong> let you deploy for free in minutes. For full stack projects with a backend, platforms like <strong>Railway</strong> or <strong>Render</strong> handle the server side.\n\nThe moment you deploy your first project, you cross a line. You're no longer a student with files on a hard drive. You're a developer with work on the internet.`, callout: { type: "default", label: "Floor 5 Project", text: "Build a full stack application. It should have a frontend the user interacts with, a backend that handles data, and a database that stores it. A simple one: a note-taking app where users can create, read, update and delete notes. Deploy it. Share the link." }, hint: `Netlify is the easiest starting point for frontend deployment.\n\n1. Push your project to GitHub\n2. Go to netlify.com and sign up\n3. Click "Add new site" \u2192 "Import from Git"\n4. Connect your GitHub and select your repo\n5. Click deploy\n\nThat's genuinely it. Your project gets a live URL in under two minutes.\n\n<strong>Something broke after deploying?</strong> Check the deploy log in Netlify \u2014 it shows exactly what went wrong. Usually it's a file path that works on your computer but not on the server, or a missing dependency.`, checklist: ["I built a full stack application", "It has a real backend", "It uses a database", "It is deployed and accessible via a URL", "I'm ready for Floor 6"] }
    ]
  },
  {
    id: 6,
    title: "Specialisation",
    subtitle: "Finding your lane and going deep",
    color: "#c8967e",
    duration: "3\u20134 months",
    sessions: "5 per week",
    length: "60\u201390 min",
    tag: "Floor 06 \u2014 Your Direction",
    sections: [
      { id: "6-1", title: "Identifying Your Lane", body: `By now you have built enough to know what excites you. That feeling when you're working on something and time disappears \u2014 that's your signal.\n\nThe main lanes are:\n\n<strong>Frontend focused</strong> \u2014 You love building beautiful, interactive user interfaces. React is your next major skill.\n<strong>Backend focused</strong> \u2014 You love the logic, the architecture, the systems. Node.js, Python, databases.\n<strong>Full Stack product builder</strong> \u2014 You want to build complete products alone. Both sides, end to end.\n<strong>Data and AI</strong> \u2014 You're drawn to working with information, finding patterns, building intelligent systems. Python is your language.`, callout: { type: "focus", label: "No Wrong Answer", text: "Every lane leads to professional grade work. The best developers aren't the ones who know the most \u2014 they're the ones who went deepest in the direction that excited them most." }, hint: `Can't decide? Ask yourself these:\n\n\u2014 When you finished a project, what part did you most enjoy building \u2014 how it looked, or how it worked?\n\u2014 Do you find yourself thinking more about the user experience or about the logic underneath?\n\u2014 When you imagine your ideal job, are you designing interfaces or engineering systems?\n\nIf you genuinely enjoy both equally, Full Stack is your lane. If one made you lose track of time and the other felt like a chore \u2014 that's your answer.`, checklist: ["I know which direction pulls me most", "I've chosen my lane for this floor"] },
      { id: "6-2", title: "Going Deep in Your Chosen Direction", body: `This section is yours to shape. Based on the lane you chose, your curriculum from here looks different from someone else who chose a different lane.\n\nBut the structure is the same regardless:\n\n<strong>Week 1\u20132:</strong> Learn the core new technology for your lane\n<strong>Week 3\u20134:</strong> Build something small with it\n<strong>Week 5\u20138:</strong> Build something more ambitious\n<strong>Week 9\u201312:</strong> Build your Floor 6 project \u2014 the most complex thing you've made so far\n\nEvery session still ends with something built. Every week you can feel yourself moving forward.`, callout: { type: "default", label: "Resources by Lane", text: "Frontend: React docs, Scrimba, Frontend Mentor challenges\nBackend: Node.js docs, The Odin Project\nFull Stack: Build your own product idea\nData/AI: Python.org, fast.ai, Kaggle" }, hint: `Learning a new technology always has the same awkward first phase \u2014 everything feels unfamiliar and slower than before. That's not regression. That's what learning something new feels like.\n\n<strong>The pattern that works:</strong> Official docs first for the overview, then a short tutorial to see it in action, then immediately build something of your own with it \u2014 even tiny. The gap between following a tutorial and building something yourself is where real learning happens.\n\n<strong>Feeling lost in a tutorial?</strong> Stop. Close it. Try to recreate just the first part from memory. What you can't recreate is what you need to understand better \u2014 not what you need to watch again.`, checklist: ["I've started learning the core technology for my lane", "I've built my first thing with it", "I'm working toward my Floor 6 project"] },
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
    duration: "3\u20134 months",
    sessions: "5 per week",
    length: "90 min",
    tag: "Floor 07 \u2014 Arrival",
    sections: [
      { id: "7-1", title: "System Design \u2014 Thinking at Scale", body: `At a professional level, writing code that works is the baseline. What separates senior developers is the ability to <strong>design systems</strong> \u2014 to think about how all the pieces of a large application fit together before writing a single line.\n\nSystem design asks questions like: How does this handle a million users? What happens if one part fails? How do different services communicate? Where is the data stored and why?\n\nYou don't need to master this now. But you need to start thinking this way.`, callout: { type: "default", label: "Start Small", text: "Take one of your previous projects and ask: how would I redesign this if 100,000 people used it tomorrow? What would break? What would I change? That thinking exercise is the beginning of system design." }, hint: `System design sounds intimidating but starts with simple questions.\n\nImagine your note-taking app from Floor 5 suddenly had 10,000 users. Ask:\n\u2014 Where is all that data stored? One database? Multiple?\n\u2014 What happens if the database goes down?\n\u2014 How do you make sure two people can't accidentally overwrite each other's notes?\n\u2014 How do you stop the server from crashing under the load?\n\nYou don't need to answer these perfectly. You need to know they're the right questions. That awareness is what system design thinking looks like at the beginning.`, checklist: ["I understand what system design means", "I've thought about scalability in the context of my own projects"] },
      { id: "7-2", title: "Code Quality \u2014 Writing Code Others Can Read", body: `Professional code is read far more than it is written. A codebase is a living document that multiple people touch over years. Code that only you can understand is a liability.\n\nCode quality means:\n\n<strong>Clear naming</strong> \u2014 variables and functions named for what they actually do\n<strong>Small functions</strong> \u2014 each function does one thing only\n<strong>Comments where necessary</strong> \u2014 not explaining what the code does, but why you made a particular decision\n<strong>Consistent formatting</strong> \u2014 looks the same throughout, follows conventions\n\nThis is what makes the difference between a junior developer and one who is genuinely valued in a team.`, callout: { type: "focus", label: "The Logical Thinker's Final Level", text: "Code quality is applied logical thinking. You're not just solving the problem \u2014 you're solving it in the clearest possible way for the next person who has to understand it." }, hint: `The naming test: cover the rest of the code and read just the variable or function name. Do you know what it does?\n\nBad: let x = getUserData();\nGood: let currentUserProfile = getUserData();\n\nBad: function calc(a, b) {}\nGood: function calculateTotalWithTax(price, taxRate) {}\n\n<strong>When to add a comment:</strong> Not to explain what the code does \u2014 the code should do that itself. Comments explain <em>why</em> you made a decision that isn't obvious. "Using setTimeout here because the API occasionally returns stale data on the first call" \u2014 that's a useful comment.`, checklist: ["I reviewed my Floor 6 project for code quality", "I renamed at least 3 things to be clearer", "I broke at least one large function into smaller ones"] },
      { id: "7-3", title: "Real World Problem Solving", body: `This section has no lessons. Only problems.\n\nEach session of Floor 7 begins with a real-world scenario \u2014 the kind of problem an actual developer would face \u2014 and you figure out how to solve it.\n\nSome will be technical. Some will be architectural. Some will be about communicating a technical decision to a non-technical person. All of them are the job.\n\nThe only rule: attempt a solution before looking anything up. Even if it's wrong. The attempt is where the learning lives.`, callout: { type: "warning", label: "The Final Discomfort", text: "This section will make you feel uncertain. That feeling is accurate \u2014 real problems don't come with a right answer attached. What you're building here is the confidence to move forward anyway. That's what professional grade actually means." }, hint: `When you face a problem and don't know where to start:\n\n1. Write down what you know about the problem\n2. Write down what you don't know\n3. Pick the smallest unknown and research just that\n4. Come back and update what you know\n5. Repeat\n\nThis isn't a workaround. This is the actual process senior developers use. The difference between a junior and a senior developer isn't that the senior knows more \u2014 it's that they're more comfortable sitting with not knowing while they systematically work toward an answer.`, checklist: ["I'm working through real-world problems", "I attempt a solution before researching", "I'm becoming comfortable with uncertainty"] },
      { id: "7-4", title: "Portfolio Building", body: `Your portfolio is your evidence. For someone without a degree or years of employment history, it is everything.\n\nBy the end of this floor your portfolio should include:\n\n<strong>3-5 deployed projects</strong> \u2014 accessible via URL, each with a README explaining what it does and how you built it\n<strong>A personal website</strong> \u2014 built by you, representing you, linking to your work\n<strong>A GitHub profile</strong> \u2014 with consistent commit history showing that you show up regularly\n<strong>A written case study</strong> \u2014 for your most complex project, walking through the problem, your decisions, and what you'd do differently\n\nThis is what you send instead of a CV.`, callout: { type: "default", label: "The Honest Truth", text: "A portfolio of 4 real projects built and deployed by someone who started from nothing 18 months ago is more compelling to most employers than a degree with no work to show. The work is the argument." }, hint: `Your personal website doesn't need to be complex. In fact, simpler is often better.\n\nIt needs: your name, one sentence about what you do, links to your projects, a way to contact you.\n\nThat's it. Clean, fast, works on mobile. The personal website is itself a project \u2014 it shows you can build something professional and make decisions about design and content.\n\n<strong>GitHub activity matters:</strong> Employers look at the contribution graph \u2014 the grid of green squares showing when you've been committing code. Consistent small contributions over 18 months tells a better story than a burst of activity followed by silence.`, checklist: ["I have 3-5 deployed projects", "Each has a README", "I have a personal website", "My GitHub shows consistent activity", "I've written a case study for my best project"] },
      { id: "7-5", title: "The Final Project \u2014 Something You're Proud Of", body: `No brief. No requirements. No checklist.\n\nBuild the thing you've been thinking about since you started this book.\n\nThe idea that made you want to learn in the first place \u2014 or the one that appeared somewhere along the way and wouldn't leave you alone.\n\nUse everything. Take your time. Make it right.\n\nWhen it's done, you're not a student anymore.`, callout: { type: "default", label: "The Only Instruction", text: "Build something that, when you show it to someone, makes you feel proud rather than apologetic. That feeling is the destination. Everything in this book was the road to it." }, callout2: { type: "focus", label: "You Made It Here", text: "Floors 1 through 6 built you. Floor 7 is just proof. The person who finishes this is not the same person who started it. That gap \u2014 between who you were and who you became \u2014 was crossed one session at a time.\n\nNow go build something." }, hint: `If the idea still feels too big \u2014 shrink it.\n\nThe final project doesn't have to be an empire. It has to be yours. A tool that helps one person do one thing better. A product that solves one real problem cleanly.\n\nStart with the smallest version that would still make you proud. Build that. Then, if you want to keep going, add to it.\n\n<strong>The most important thing:</strong> Finish it. Ship it. Put it in the world. An imperfect thing that exists is worth infinitely more than a perfect thing that doesn't.`, checklist: ["I built my final project", "I'm proud of it", "I deployed it", "I am a developer"] }
    ]
  }
];

var sectionGateState = {}; // ADD HERE
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
    const medals = ['\u1F947', '\u1F948', '\u1F949'];
    list.innerHTML = rows.map((r, i) => `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface);border:1px solid ${i === 0 ? '#c8a96e' : i === 1 ? '#aaaaaa' : i === 2 ? '#cd7f32' : 'var(--border)'};border-radius:10px;${i === 0 ? 'box-shadow:0 0 20px rgba(200,169,110,0.15);' : ''}">
        <div style="font-size:${i < 3 ? '24px' : '14px'};width:36px;text-align:center;font-family:'IBM Plex Mono',monospace;color:var(--text-muted);">${medals[i] || '' + (i+1) + ''}</div>
        <div style="flex:1;">
          <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:15px;">${r.username || 'Anonymous'}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--floor3);">\u1F525 ${r.streak || 0} day streak</div>
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
    msg.textContent = 'Password reset is not available.';
    msg.className = 'auth-message error';
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
  document.getElementById('dashboard-greeting').textContent = name ? '' + (greeting) + ', ' + (name) + '.' : '' + (greeting) + '.';

  // Level
  const cur = getCurrentLevel();
  const LEVEL_LABELS = ['', 'Curious', 'Beginning', 'Learning', 'Building', 'Developing', 'Coding', 'Fluent'];
  document.getElementById('dashboard-level-label').textContent = LEVEL_LABELS[cur.level] || 'Level ' + (cur.level) + '';
  document.getElementById('dashboard-xp').textContent = '' + (state.xp) + ' XP';

  // Streak
  const streak = state.streak || 0;
  const streakIcon = streak >= 30 ? '\u1F525\u1F525\u1F525' : streak >= 14 ? '\u1F525\u1F525' : '\u1F525';
  document.getElementById('dashboard-streak-icon').textContent = streakIcon;
  document.getElementById('dashboard-streak-text').textContent = streak === 0 ? 'No streak yet' : '' + (streak) + ' day streak';
  document.getElementById('dashboard-streak-sub').textContent = streak === 0 ? 'Complete a section to start your streak' : streak >= 7 ? 'You\'re on fire. Keep it going.' : 'Come back tomorrow to keep it alive.';

  // Daily goal
  const today = new Date().toDateString();
  const todayKey = 'daily_sections_' + (today) + '';
  const todaySections = parseInt(localStorage.getItem(todayKey) || '0');
  const dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal') || '1');
  const goalPct = Math.min(100, Math.round((todaySections / dailyGoal) * 100));
  document.getElementById('dashboard-goal-text').textContent = '' + (todaySections) + '/' + (dailyGoal) + ' sections';
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
  if (nextSection) preview = 'Up next: ' + (nextSection.title) + '';
  else if (nextFloor) preview = 'Up next: ' + (nextFloor.title) + '';
  else preview = 'You\'ve completed the entire curriculum.';
  document.getElementById('dashboard-next-preview').textContent = preview;
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
  document.getElementById('session-streak').textContent = '' + (state.streak) + '\u1F525';
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
  document.getElementById('cover').style.display = 'flex';
  const coverUser = document.getElementById('cover-user');
  if (coverUser) coverUser.style.display = 'none';
  populateDashboard();
}

async function handleAuth() {
  continueAsGuest();
}

async function onUserLoggedIn() {
  continueAsGuest();
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

  continueAsGuest();
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

checkOnboarding();

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
  } else if (field === 'time') {
    // Set daily goal based on time selection
    const goalMap = { '15': 1, '30': 2, '60': 3 };
    localStorage.setItem('codebook_daily_goal', goalMap[value] || 1);

    document.getElementById('onboarding-step-3').style.display = 'none';
    document.getElementById('onboarding-step-4').style.display = 'block';

    const messages = {
      never: { title: 'You\'re in the right place, ' + (onboardingData.name) + '.', msg: 'Starting from zero is actually an advantage. No bad habits to unlearn. We\'ll build everything from the ground up, one clear step at a time.' },
      tried: { title: 'This time will be different, ' + (onboardingData.name) + '.', msg: 'Whatever stopped you before \u2014 the overwhelm, the confusion, the loss of momentum \u2014 this was built specifically for that. Sage is here every time you get stuck.' },
      some: { title: 'Good. Let\'s build on that, ' + (onboardingData.name) + '.', msg: 'You\'ve got a foundation. Now we give it structure. Work at your own pace \u2014 skip ahead if something\'s easy, slow down when it\'s not.' }
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
  { title: "HTTP methods", question: "In a REST API, a POST request is used to...", options: ["Retrieve data", "Create new data", "Delete existing data", "Update all records"], correct: 1, explanation: "REST APIs use HTTP methods to indicate the type of action: GET retrieves data, POST creates new data, PUT/PATCH updates existing data, DELETE removes data. These map directly to the CRUD operations (Create, Read, 
