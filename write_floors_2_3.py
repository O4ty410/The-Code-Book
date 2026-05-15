#!/usr/bin/env python3
"""
Generates JavaScript content for Floor 2 (10 sections) and Floor 3 (12 sections)
and writes it to /tmp/floors_2_3.js
"""

floor_content = '''  {
    id: 2,
    title: "Seeing It Come Alive",
    subtitle: "HTML, CSS and the browser",
    color: "#7eb8c8",
    duration: "3-4 weeks",
    sessions: "5 per week",
    length: "45-60 min",
    tag: "Floor 02 \\u2014 Structure",
    sections: [
      {
        id: "2-1",
        title: "What HTML Is",
        body: `HTML is not a programming language. It has no logic, no conditions, no loops. What it has is something more fundamental: a way to describe what content <strong>is</strong>.\\n\\nHTML stands for HyperText Markup Language. The "markup" part is the key idea. You take a piece of content \\u2014 a heading, a paragraph, an image, a button \\u2014 and you wrap it in a tag that labels it. <code>&lt;h1&gt;My Title&lt;/h1&gt;</code> doesn't tell the browser to make text big and bold. It tells the browser: this is a level-one heading. The browser then applies its own default styling to that heading. CSS is what overrides those defaults.\\n\\nThis distinction matters. When YouTube marks up a video title with <code>&lt;h1&gt;</code>, when GitHub wraps a code block in <code>&lt;pre&gt;&lt;code&gt;</code>, when Twitter marks each post with <code>&lt;article&gt;</code> \\u2014 they're not making visual decisions. They're declaring meaning. Search engines, screen readers, and other tools all use that meaning.\\n\\nThe tags you'll use most: <strong>h1 through h6</strong> for headings (h1 is the most important, h6 the least), <strong>p</strong> for paragraphs, <strong>a</strong> for links, <strong>img</strong> for images, <strong>ul</strong> and <strong>li</strong> for unordered lists, <strong>div</strong> for grouping content without semantic meaning, <strong>button</strong> for clickable controls, and <strong>input</strong> for form fields.\\n\\nBeyond those basics, HTML has semantic elements: <strong>header</strong>, <strong>main</strong>, <strong>nav</strong>, <strong>footer</strong>, <strong>section</strong>, <strong>article</strong>. These are divs with meaning attached. Use them where they fit the content. A screen reader navigating your page will thank you. So will your future self six months later trying to read your own code.`,
        callout: {
          type: "default",
          label: "The Key Distinction",
          text: "HTML describes what content is, not how it looks. A heading tag doesn't mean 'make this big' \\u2014 it means 'this is a heading.' Appearance is entirely CSS's job. Keeping these responsibilities separate is one of the most important ideas in web development."
        },
        callout2: {
          type: "focus",
          label: "Why Semantic HTML Matters",
          text: "When you use the right element for the right content \\u2014 nav for navigation, article for articles, button for buttons \\u2014 you're building something that works for everyone: search engines rank it better, screen readers navigate it correctly, and your code communicates its intent to every developer who reads it."
        },
        hint: `HTML is about labelling, not styling. The easiest way to internalise this: open any major website, right-click the page, click "View Page Source." Scan for tags. You'll see h1, p, nav, div, a, img \\u2014 the same handful of elements used thousands of times.\\n\\n<strong>Try this:</strong> Before writing any HTML, write out what your page contains in plain English. "A heading. A paragraph. A list of three items. A button." Then translate each thing into the correct tag. Structure first, appearance never \\u2014 that's CSS's job.\\n\\n<strong>Still fuzzy on semantic elements?</strong> Think of them as named boxes. A <code>&lt;div&gt;</code> is a box with no label. A <code>&lt;nav&gt;</code> is a box with a sign that says "navigation lives here." Both behave the same visually \\u2014 the label is for humans and machines, not the browser's renderer.`,
        quiz: {
          question: "A developer uses a <div> for their site's main navigation instead of a <nav> element. The page looks identical either way. Why does the choice still matter?",
          options: ["It doesn't \\u2014 if the page looks the same, the HTML makes no difference", "Screen readers and search engines use element semantics to understand page structure, so the wrong tag reduces accessibility and SEO", "Browsers render <div> faster than <nav>, so <div> is technically the better choice", "The <nav> element requires CSS to function, while <div> works without any styles"],
          correct: 1,
          feedback: "Appearance is only one output of HTML. Screen readers use element type to help users navigate \\u2014 a blind user can jump directly to the <nav> element to find links. Search engines use semantic tags to understand page structure and weight content accordingly. The <div> and <nav> look identical on screen, but one communicates meaning and one doesn't."
        },
        checklist: ["I understand that HTML describes content structure, not visual appearance", "I can name the core tags and what each one represents", "I understand the difference between semantic elements (nav, header, main) and generic containers (div)", "I could look at a webpage and describe its HTML structure before seeing the source", "I know that the same page can look completely different with different CSS applied to identical HTML"]
      },
      {
        id: "2-2",
        title: "What CSS Is",
        body: `CSS stands for Cascading Style Sheets. Every visual decision on every website you've ever used \\u2014 every colour, every font, every spacing choice, every hover effect \\u2014 is a CSS rule.\\n\\nThe syntax is consistent and readable once you see the pattern. You write a <strong>selector</strong> (what to target), then inside curly braces you write <strong>property: value</strong> pairs. <code>h1 { color: #1a1a1a; font-size: 32px; }</code> targets every h1 element on the page and sets two properties. That's the entire pattern.\\n\\nTargeting works three ways. A <strong>tag selector</strong> like <code>p { }</code> targets every paragraph. A <strong>class selector</strong> like <code>.card { }</code> targets every element with class="card" \\u2014 a class can be reused across many elements. An <strong>ID selector</strong> like <code>#header { }</code> targets the single element with id="header" \\u2014 IDs are unique per page. Classes are what you'll use most.\\n\\nThe "Cascading" in CSS is the important part that trips up beginners. When two rules target the same element, the more specific one wins. An ID selector beats a class selector. A class beats a tag name. If specificity is equal, the rule that appears last in the file wins. This hierarchy is called the <strong>cascade</strong>.\\n\\nSpotify's entire dark theme \\u2014 the black backgrounds, the white text, the green accents \\u2014 is CSS <code>background-color</code> and <code>color</code> properties applied systematically. Nothing magic. Just properties on elements.\\n\\nCSS can live in three places: as an inline <code>style</code> attribute on an element (avoid this except for quick tests), inside a <code>&lt;style&gt;</code> tag in the HTML head, or in a completely separate <code>.css</code> file linked with <code>&lt;link&gt;</code>. External files are the professional standard \\u2014 they keep style separate from structure and let one stylesheet control an entire site.`,
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
        hint: `The selector is who. The property is what. The value is how much.\\n\\n<code>p { color: red; }</code> \\u2014 who: all paragraphs, what: text colour, how much: red.\\n\\n<strong>Try this:</strong> Open the browser DevTools (F12), click the Elements tab, click any element on the page. The Styles panel on the right shows every CSS rule targeting that element, where it came from, and whether it's being overridden by a more specific rule. Spend five minutes just clicking around a site you know \\u2014 you'll see specificity in action immediately.\\n\\n<strong>Still confused by classes vs IDs?</strong> Use classes for anything you might want to style more than once. Use IDs only when a thing is guaranteed to be unique on the page \\u2014 and even then, many developers prefer classes because IDs have high specificity that can cause unexpected overriding.`,
        quiz: {
          question: "A page has two CSS rules: <code>p { color: black; }</code> and <code>.intro { color: blue; }</code>. A paragraph has class='intro'. What colour is the text?",
          options: ["Black, because the p rule comes first in the file", "Blue, because the class selector is more specific than the tag selector", "Neither \\u2014 conflicting rules cancel each other out", "Black, because tag selectors always override class selectors"],
          correct: 1,
          feedback: "The class selector .intro is more specific than the tag selector p. When two rules target the same element, specificity determines the winner \\u2014 not document order. Class beats tag. So the paragraph is blue. This is the cascade in action."
        },
        checklist: ["I understand the selector-property-value syntax of CSS", "I can explain the difference between tag, class, and ID selectors", "I understand why more specific rules override less specific ones", "I know the three ways to include CSS and which one is preferred in professional code", "I could look at a CSS rule and describe in plain English what it does"]
      },
      {
        id: "2-3",
        title: "How a Browser Renders Code",
        body: `Browsers don't just display HTML files. They go through a precise sequence every time \\u2014 and understanding it explains several decisions you'll make every day as a developer.\\n\\nWhen a browser receives an HTML file, it reads it from top to bottom and constructs the <strong>DOM</strong> \\u2014 the Document Object Model. The DOM is the browser's internal tree-like representation of the page. Every element is a node. Every node has a parent, children, and siblings. When JavaScript adds, removes, or changes elements later, it's modifying this DOM tree.\\n\\nAs the browser parses HTML, it discovers linked resources \\u2014 CSS files, images, scripts. CSS files are fetched and parsed into a structure called the <strong>CSSOM</strong>. The DOM and CSSOM are combined into a <strong>render tree</strong> \\u2014 the set of elements that will actually be drawn on screen with their computed styles. Then comes <strong>layout</strong> (calculating each element's size and position) and <strong>paint</strong> (drawing pixels to screen). This full sequence is called the <strong>critical rendering path</strong>.\\n\\nThis explains two conventions you'll see everywhere. CSS goes in the <code>&lt;head&gt;</code>: because the browser needs styles before painting. If CSS arrives late, the page flashes unstyled content for a split second \\u2014 this is called a FOUC (Flash of Unstyled Content) and it looks broken. JavaScript usually goes at the bottom of <code>&lt;body&gt;</code>, or uses the <code>defer</code> attribute: because JavaScript blocks parsing while it executes. A large JS file in the head means the user stares at a blank page while it downloads and runs.\\n\\nWhen you open DevTools and inspect an element, you're looking at the live DOM \\u2014 not the original HTML file. If JavaScript has modified the page, the DevTools shows the current state. The "View Page Source" option shows the original HTML the server sent. They're often different, and that difference is JavaScript.`,
        callout: {
          type: "default",
          label: "The DOM vs The Source",
          text: "View Page Source shows what the server sent. DevTools shows the live DOM \\u2014 what the browser is actually working with right now. On sites that use JavaScript to build the page dynamically (like React apps), the source might be nearly empty while the DOM contains hundreds of elements."
        },
        callout2: {
          type: "focus",
          label: "Why This Matters Practically",
          text: "Every time you wonder why your CSS isn't applying, or why your page loads slowly, or why a JavaScript change doesn't show up \\u2014 the answer is somewhere in this rendering sequence. Understanding it turns debugging from guesswork into diagnosis."
        },
        hint: `The critical rendering path is HTML \\u2192 DOM, CSS \\u2192 CSSOM, DOM + CSSOM \\u2192 Render Tree \\u2192 Layout \\u2192 Paint.\\n\\n<strong>Try this:</strong> Open any website and press F12. In the Elements tab, right-click any element and click "Edit as HTML." Change something. Watch it update instantly. You're directly editing the DOM \\u2014 not the file on the server, just the browser's in-memory model. Refresh the page and your change is gone.\\n\\n<strong>Still unclear on render-blocking?</strong> Think of parsing HTML like reading a book. When you hit a script tag with no defer, it's like someone interrupting your reading and making you solve a puzzle before you can continue. defer says "I'll tell you what puzzle to solve after you finish the page." The reading continues uninterrupted.`,
        quiz: {
          question: "Why do professional developers typically put <link> stylesheet tags in the <head> but <script> tags at the bottom of <body> or use the defer attribute?",
          options: ["It's just a convention with no technical reason \\u2014 browsers handle both equally", "CSS in the head prevents unstyled content flashes; scripts at the bottom or with defer prevent blocking HTML parsing", "Scripts must be at the bottom because they can only access elements that exist above them", "Browsers only read the head section for CSS and ignore styles placed elsewhere"],
          correct: 1,
          feedback: "CSS must arrive before the browser paints, so it goes in the head. JavaScript blocks HTML parsing while it executes, so large scripts in the head leave users staring at a blank page. Scripts at the bottom or with defer let the HTML parse and render first, then execute JavaScript. Both decisions come directly from how the critical rendering path works."
        },
        checklist: ["I can describe the critical rendering path in order", "I understand what the DOM is and how it differs from the raw HTML source", "I know why CSS goes in the head and why JS often goes at the bottom", "I understand what FOUC is and why it happens", "I could open DevTools on any page and identify the DOM structure"]
      },
      {
        id: "2-4",
        title: "Building Your First Page",
        body: `Every HTML page starts with the same scaffold. Not as a suggestion \\u2014 as a requirement. The browser needs these pieces to know what it's working with.\\n\\nAt the top: <code>&lt;!DOCTYPE html&gt;</code> tells the browser this is a modern HTML5 document. Then the root <code>&lt;html&gt;</code> element wraps everything. Inside it, <code>&lt;head&gt;</code> contains information about the page that isn't displayed: the character encoding (<code>&lt;meta charset="UTF-8"&gt;</code>, which ensures text renders correctly), the page title (shown in the browser tab), and any linked CSS files. Then <code>&lt;body&gt;</code> contains everything the user actually sees.\\n\\nConnecting CSS is a single line in the head: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>. This tells the browser to fetch and apply the stylesheet before rendering the page. The path in href must match the actual location of your CSS file.\\n\\nWhen you start writing elements, read the HTML like prose. A heading, then a paragraph, then a list \\u2014 in the order a user would encounter them. HTML's logical reading order should match the visual reading order. This isn't just good practice; it's how screen readers navigate the page.\\n\\nProfessional habit worth building from day one: write all your HTML first. Get the complete structure in place with real content. Only then open the CSS file. When you try to build both simultaneously, you end up with neither fully thought through. HTML is structure. CSS is style. They're different problems and they deserve separate focus.`,
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
        hint: `If you open an HTML file in a browser and see nothing, check the order: Did you close all your tags? Did the link tag href actually match your CSS filename exactly (case-sensitive on some systems)? Is the CSS file in the same folder?\\n\\n<strong>Try this:</strong> Type out the scaffold from memory without looking at this section. DOCTYPE, html, head, meta charset, title, link, body. Five minutes. If you can do it without looking, it's yours. If you can't, type it out once more with the section open, then close it and try again.\\n\\n<strong>Still confused about the head vs body?</strong> Head = information about the page, not displayed to users. Body = the actual content the user sees. Meta tags, titles, CSS links \\u2014 head. Headings, paragraphs, images, buttons \\u2014 body. If it should appear on screen, it goes in body.`,
        quiz: {
          question: "Where should a <link> tag connecting an external CSS file be placed, and why?",
          options: ["At the bottom of the body, so HTML loads first before styles are applied", "In the head element, so styles are available before the browser paints any content", "Anywhere in the document \\u2014 browsers find it regardless of placement", "Inside the body, directly above the first element that needs styling"],
          correct: 1,
          feedback: "The link tag goes in the head so the browser has the stylesheet before it begins painting. If the stylesheet arrives after painting starts, users briefly see unstyled content (a FOUC). The head is specifically designed for metadata and resources the browser needs before rendering the page."
        },
        checklist: ["I can write the HTML scaffold from memory without looking it up", "I know what each part of the scaffold does and why it's needed", "I can connect an external CSS file using a link tag", "I wrote my HTML structure completely before touching CSS", "I understand why meta charset UTF-8 matters"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a second paragraph below the first", "Add an unordered list with 3 items", "Add an image element (the src can be any URL)", "Add a navigation bar using the nav element with 3 links"]
        }
      },
      {
        id: "2-5",
        title: "Styling Basics",
        body: `CSS has hundreds of properties. In practice, you'll use the same twenty for 80% of your work. Learn those well and the rest you look up as needed.\\n\\nText: <strong>color</strong> (text colour, not background), <strong>font-family</strong> (typeface \\u2014 stack multiple in order of preference with a generic fallback last), <strong>font-size</strong> (how large), <strong>font-weight</strong> (100 to 900, or named values like bold), <strong>line-height</strong> (vertical space between lines \\u2014 1.5 to 1.7 is comfortable for body text).\\n\\nSpacing: <strong>margin</strong> (space outside the element), <strong>padding</strong> (space inside the element, between content and border). Both accept 1 to 4 values: one value sets all four sides, two values set top/bottom and left/right, four values set top, right, bottom, left \\u2014 clockwise from the top.\\n\\nVisual: <strong>background-color</strong>, <strong>border</strong> (width style colour, e.g. 1px solid #333), <strong>border-radius</strong> (rounds corners), <strong>width</strong> and <strong>max-width</strong> (max-width is more flexible than fixed width for responsive layouts).\\n\\nLayout: <strong>display</strong> controls how an element participates in layout. The most important values: <code>block</code> (takes full width, stacks vertically), <code>inline</code> (flows with text, no width/height control), <code>inline-block</code> (flows with text but accepts width/height), <code>flex</code> (enables flexbox layout on the container), <code>none</code> (removes the element from the page entirely).\\n\\nFor units, <strong>px</strong> is an exact pixel count. <strong>%</strong> is relative to the parent element's size. <strong>em</strong> is relative to the current element's font-size. <strong>rem</strong> is relative to the root (html) element's font-size \\u2014 use rem for font sizes. When the user adjusts their browser's default font size for accessibility, rem scales with it. px does not.`,
        callout: {
          type: "default",
          label: "Why rem Over px for Fonts",
          text: "Some users increase their browser's default font size because they have difficulty reading small text. If you set font sizes in px, that preference is ignored. If you use rem, your text scales with it. This is a small change that has real impact on real people."
        },
        callout2: {
          type: "focus",
          label: "Shorthand Properties",
          text: "margin: 16px 32px sets top and bottom to 16px, left and right to 32px. margin: 16px sets all four sides. border: 2px solid #333 sets width, style, and colour in one line. Shorthand properties are everywhere in CSS \\u2014 recognise the pattern rather than memorising each one."
        },
        hint: `When a CSS property isn't doing what you expect, open DevTools (F12), click the element, and look at the Styles panel. It shows every rule applying to that element, which rule is winning, and which rules are being crossed out (overridden). You can edit values live to experiment without touching your files.\\n\\n<strong>Try this:</strong> Open Spotify or any dark-themed website. In DevTools, find the body element and change background-color to white. Watch the theme collapse instantly. That's CSS in action \\u2014 one property change, entire visual impact.\\n\\n<strong>Still confused by margin vs padding?</strong> Padding is inside the element, between the content and the edge. Margin is outside the element, pushing it away from other elements. If you add a background colour, padding sits inside the colour. Margin is transparent.`,
        quiz: {
          question: "A developer sets font-size: 1.5rem on a paragraph. The user has set their browser's default font size to 20px. What size does the paragraph text appear at?",
          options: ["15px, because rem is relative to the standard 10px root size", "1.5px, because rem values are very small units", "30px, because 1.5 multiplied by the 20px root size equals 30px", "20px, because rem ignores the multiplier and uses the root size directly"],
          correct: 2,
          feedback: "1 rem equals the root (html) element's font size. If the user's browser sets that to 20px, then 1rem = 20px and 1.5rem = 30px. This is exactly why rem is preferred for font sizes \\u2014 it respects the user's accessibility settings and scales proportionally."
        },
        checklist: ["I know the core CSS properties for text, spacing, and visual styling", "I understand what display: block, inline, and flex each do", "I understand the difference between px, %, em, and rem", "I can write CSS rules from scratch without copying from somewhere else", "I know why rem is preferred over px for font sizes"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Change the heading color to any hex value you choose", "Add a border-radius to the card to make it rounded", "Make the font-size of the paragraph 18px", "Add a box-shadow to the container"]
        }
      },
      {
        id: "2-6",
        title: "The Box Model",
        body: `Everything in CSS is a box. Every element \\u2014 a heading, an image, a button, a div \\u2014 is a rectangular box, and that box has four layers.\\n\\nFrom inside out: <strong>content</strong> (the text, image, or whatever lives inside), <strong>padding</strong> (transparent space between the content and the border), <strong>border</strong> (the edge of the element, can be visible or invisible), <strong>margin</strong> (transparent space outside the border, separating this element from its neighbours).\\n\\nThe box model has a quirk that causes confusion until you understand it. By default, <code>width</code> applies to the content area only. Add padding and border on top of that, and your element ends up wider than you specified. A 200px wide element with 20px padding on each side is actually 240px wide on screen.\\n\\nThe fix is <code>box-sizing: border-box</code>. With this property, width includes content, padding, and border. A 200px wide element with 20px padding is 200px wide \\u2014 the content shrinks to accommodate the padding. This is so universally useful that Airbnb, GitHub, and essentially every professional CSS codebase starts with a global reset that applies it everywhere: <code>*, *::before, *::after { box-sizing: border-box; }</code>.\\n\\nMargin collapse is CSS's most confusing behaviour for beginners: when two block elements are stacked vertically, their vertical margins merge (collapse) into the larger of the two. A paragraph with 24px bottom margin and a heading with 16px top margin don't add up to 40px of space \\u2014 they collapse to 24px. This doesn't happen with horizontal margins, flexbox children, or absolutely positioned elements. Knowing it exists means you won't waste an hour trying to figure out why your spacing doesn't add up.`,
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
        hint: `If your layout is off by a mysterious amount \\u2014 an element is wider than expected, spacing doesn't add up \\u2014 the box model is usually why.\\n\\n<strong>Try this:</strong> Open DevTools, click any block element, and look at the box model diagram in the Styles panel. You'll see the four layers as coloured rings. Hover over each one \\u2014 the browser highlights that layer on the page.\\n\\n<strong>Still confused by margin collapse?</strong> Picture two magnets with the same pole facing each other. They don't stack their repulsion \\u2014 the stronger one wins. That's vertical margin collapse. The larger margin wins; the smaller one disappears. Horizontal margins never collapse, and neither do flex or grid container children.`,
        quiz: {
          question: "A div has width: 300px, padding: 20px, and border: 5px solid black. With the default box-sizing: content-box, what is the total rendered width of the element?",
          options: ["300px \\u2014 the width property always controls the total width", "325px \\u2014 the border adds 5px total to each side", "350px \\u2014 padding (40px) and border (10px) are added to the 300px content width", "280px \\u2014 padding reduces the available content area"],
          correct: 2,
          feedback: "With box-sizing: content-box (the default), width applies only to the content area. Padding and border are added on top. 20px padding on each side = 40px. 5px border on each side = 10px. Total: 300 + 40 + 10 = 350px. This is why box-sizing: border-box exists \\u2014 it makes the specified width include padding and border, so 300px actually means 300px."
        },
        checklist: ["I can describe the four layers of the CSS box model in order", "I understand why box-sizing: border-box is almost always preferable", "I know what margin collapse is and when it occurs", "I can use DevTools to visually inspect the box model of any element", "I've added a global box-sizing reset to my CSS files"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Increase the padding on the card from 16px to 32px and observe the change", "Add a 3px solid border and observe how it pushes content if box-sizing is content-box", "Add margin-top: 40px to the second card", "Make both cards use box-sizing: border-box and compare"]
        }
      },
      {
        id: "2-7",
        title: "Flexbox Layout",
        body: `Before flexbox, CSS layout was genuinely difficult. Centering something vertically required tricks. Equal-height columns needed hacks. Developers used floats, clearfixes, and negative margins to achieve layouts that should have been simple. Flexbox, introduced as a CSS standard in 2012 and now universally supported, solved all of this.\\n\\nFlexbox works on a container-and-children model. Set <code>display: flex</code> on a parent element, and all its direct children become <strong>flex items</strong>. The parent becomes a <strong>flex container</strong>. You control the children's arrangement by setting properties on the container.\\n\\nThe key concept is <strong>axes</strong>. Flex items lay out along a <strong>main axis</strong>. By default, that axis runs horizontally (row). The perpendicular is the <strong>cross axis</strong>. <code>flex-direction: column</code> flips them \\u2014 now main axis runs vertically and items stack top to bottom.\\n\\nThe properties you'll use constantly:\\n\\n<strong>justify-content</strong> aligns items along the main axis. Values: <code>flex-start</code> (packed to the start), <code>flex-end</code> (packed to the end), <code>center</code>, <code>space-between</code> (first and last at edges, rest evenly spaced), <code>space-around</code>.\\n\\n<strong>align-items</strong> aligns items along the cross axis. Values: <code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>stretch</code> (default \\u2014 fills the cross axis).\\n\\n<strong>gap</strong> adds consistent space between flex items without needing margins.\\n\\n<strong>flex-wrap: wrap</strong> allows items to wrap onto the next line when they don't fit \\u2014 essential for responsive layouts.\\n\\nUse flexbox for one-dimensional layouts: a row of buttons, a navbar, a card row, a vertical stack. For two-dimensional layouts (rows and columns simultaneously), CSS Grid is the right tool.`,
        callout: {
          type: "default",
          label: "Centering With Flexbox",
          text: "The two lines that center anything: display: flex; justify-content: center; align-items: center; on the parent element. This was notoriously difficult before flexbox. Now it's four words. Learn this combination \\u2014 you'll use it hundreds of times."
        },
        callout2: {
          type: "focus",
          label: "Flexbox vs Grid",
          text: "Flexbox is for one dimension: either a row or a column. CSS Grid is for two dimensions: rows and columns at the same time. Navigation bars, button groups, and card rows \\u2014 flexbox. Full page layouts with both columns and rows \\u2014 Grid. When in doubt, start with flexbox."
        },
        hint: `The mental model: the container is a flexible box. The children are flexible items inside it. You control how items sit in that box by setting rules on the container.\\n\\n<strong>Try this:</strong> Add display: flex to any element in your code editor. Watch its children line up horizontally. Then add justify-content: center. Then try space-between. Each property change reshapes the layout instantly.\\n\\n<strong>Still confused by justify-content vs align-items?</strong> justify-content works along the direction items are flowing (the main axis). align-items works perpendicular to that. In a row layout: justify-content controls left-right positioning, align-items controls up-down. In a column layout, they flip.`,
        quiz: {
          question: "A flex container has flex-direction: row (the default). Which property and value would you use to push the items to the right side of the container?",
          options: ["align-items: flex-end \\u2014 because flex-end pushes items to the end of the axis", "justify-content: flex-end \\u2014 because justify-content controls the main axis, which is horizontal in a row", "flex-wrap: reverse \\u2014 because reversing the wrap direction moves items right", "align-content: flex-end \\u2014 because align-content positions groups of items"],
          correct: 1,
          feedback: "In a row-direction flex container, the main axis runs horizontally. justify-content controls placement along the main axis. flex-end pushes items to the end of that axis \\u2014 the right side. align-items controls the cross axis (vertical), so align-items: flex-end would push items to the bottom, not the right."
        },
        checklist: ["I understand what display: flex does to a container's children", "I know the difference between the main axis and cross axis", "I can use justify-content and align-items to control item positioning", "I understand when to use flex-wrap and why", "I know when to use flexbox versus CSS Grid"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Change flex-direction to column and observe how items stack", "Change justify-content to space-between", "Add a fourth card and add flex-wrap: wrap to the container", "Use align-items: flex-end to align items to the bottom"]
        }
      },
      {
        id: "2-8",
        title: "Building a Real Component",
        body: `Real interfaces are made of components. A Spotify song card. A GitHub repository card. A Twitter post. A product tile on an e-commerce site. Look at any of them and you see the same anatomy: a container, an image or icon, a text hierarchy, interactive elements.\\n\\nBreak apart a typical card. A container div with a fixed width, background, border-radius, and box-shadow. Inside it: an image (or placeholder) that fills the top. Below the image: a title in larger text, a subtitle in smaller muted text, metadata like a date or a label. At the bottom, action elements \\u2014 buttons, links, icons.\\n\\nNothing about this is complex individually. What makes professional work feel polished is the consistency: padding that's the same multiple throughout (8px, 16px, 24px \\u2014 always multiples of 8), colours from a defined palette, font sizes that follow a logical scale.\\n\\nThe approach professional developers use to build a component: HTML structure first \\u2014 container, then the hierarchy inside it, no CSS yet. Then CSS from outside in: style the container first, then the layout inside it (flex or grid), then individual elements. Never start styling the small details before the structure is solid.\\n\\nThis is the session where HTML and CSS stop feeling like separate things you're applying and start feeling like a vocabulary you're speaking. When a layout problem appears, you know which property to reach for. When something looks wrong, you know where to look.`,
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
        hint: `If the component doesn't look right, check this order. Is the container the right size? Is the internal layout (flex/grid) working? Are the children the right sizes? Then check the individual styling.\\n\\n<strong>Try this:</strong> Before writing CSS, sketch the component on paper. Just boxes and labels. Container. Image area. Title. Subtitle. Button. That sketch becomes your HTML structure. The CSS then has a clear plan to follow.\\n\\n<strong>Hover states feel hard?</strong> Add a <code>:hover</code> selector to any element. Whatever properties you change inside it only apply when the cursor is over the element. <code>transform: translateY(-4px)</code> lifts it. <code>box-shadow</code> adds depth. <code>transition: all 0.2s ease</code> on the base element smooths the change.`,
        quiz: {
          question: "When building a card component, you write all the HTML first and then open the CSS file. What is the main advantage of this approach over writing HTML and CSS simultaneously?",
          options: ["It loads faster because the browser processes HTML before CSS", "It forces you to fully think through the content structure before making any visual decisions, preventing structural changes after styling has begun", "HTML cannot reference CSS classes that don't exist yet, so HTML must be written first", "Writing HTML first is only useful for beginners \\u2014 professionals write both at once"],
          correct: 1,
          feedback: "Structure and style are different problems. When you write HTML first, you commit to the content structure before styling it. If you build both simultaneously, you often style elements that then need to move or change \\u2014 wasting effort and creating inconsistency. Every experienced developer structures before they style."
        },
        checklist: ["I built a multi-element card component from scratch", "I wrote HTML completely before writing CSS", "I styled from outside in (container first, then inner elements)", "I added at least one hover state", "I understand the anatomy of a real-world component"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a 'like' button to each card with a heart icon (use \\u2665)", "Add a hover state that lifts the card slightly using transform: translateY(-4px)", "Add a badge to one card (like 'NEW' or 'FEATURED')", "Make the cards responsive so they stack on small screens using flex-wrap"]
        }
      },
      {
        id: "2-9",
        title: "Guided Profile Page Project",
        body: `You've seen profile pages hundreds of times: Dribbble, Behance, GitHub, LinkedIn. They all follow the same pattern because that pattern works. A header with name and role. An about section with a short bio. A skills section. A projects grid. Contact links.\\n\\nThe scaffold in the code editor covers that full structure: a header with your name and title, a bio section, a skills grid using flexbox, project cards, and footer links. The HTML is structured. The base CSS is styled. The layout is there.\\n\\nYour job is threefold. First: replace every piece of placeholder content with your actual information. Don't leave a single word of placeholder text \\u2014 this is your page now. Second: change the visual design. The colour scheme, the typography choices, the spacing \\u2014 make it feel like you, not the template. Third: add something the scaffold doesn't have. A section, an element, an interaction. Anything that requires you to figure it out yourself.\\n\\nThe third part is the most important. The first two are filling in blanks. The third is actual building.`,
        callout: {
          type: "default",
          label: "What This Builds",
          text: "By the end of this session you'll have a real, personal webpage. Not a tutorial exercise \\u2014 a page that represents you, with your name, your projects, your design choices. That is the first thing you'll show people when they ask what you can do."
        },
        callout2: {
          type: "focus",
          label: "Make It Yours",
          text: "The most common mistake with guided projects: leaving the template colours and changing only the text. Colour scheme is the first thing anyone notices. Pick two or three colours that feel right to you and apply them throughout. A page that looks like the template is a template. A page that looks like you is a portfolio piece."
        },
        hint: `If you don't know what to add as your original element, here are three options that require real CSS work: a horizontal scrolling skills bar, a timeline for your learning journey, or a dark/light mode toggle (research CSS custom properties and class toggling with JavaScript).\\n\\n<strong>Feeling stuck on the design?</strong> Open Dribbble or Behance and look at three profile pages you find visually interesting. Don't copy any of them. Instead, write down what they have in common: spacing generosity, font weight contrast, a strong accent colour. Use those patterns, not the specific designs.\\n\\n<strong>Testing on mobile:</strong> In DevTools (F12), click the icon that looks like a phone and tablet (Toggle Device Toolbar). This lets you simulate different screen sizes. If your page looks broken on mobile, the most common fix is adding max-width: 100% to images and checking that your flex containers have flex-wrap: wrap.`,
        quiz: {
          question: "You've built a profile page using a scaffold. You've replaced all placeholder text but kept all the original colours and layout choices. A recruiter views it alongside the original template. What's the most accurate description of what you've built?",
          options: ["A complete portfolio piece that demonstrates your HTML and CSS ability", "A filled-in template \\u2014 it shows you can read HTML but not that you can make design decisions", "An excellent starting point that just needs to be deployed to be portfolio-ready", "A technically correct page that only needs JavaScript to be complete"],
          correct: 1,
          feedback: "Replacing text in a template demonstrates that you can edit HTML. Making visual and structural decisions \\u2014 the colour scheme, the layout modifications, the added section \\u2014 demonstrates that you can build with CSS. A portfolio piece should show decision-making, not just content-filling. The template is a starting point, not the destination."
        },
        checklist: ["I replaced every piece of placeholder content with my own real information", "I changed the colour scheme to something that feels personal to me", "I added at least one section or element not included in the scaffold", "I tested the page at different window sizes", "I'm satisfied that this page represents me, not the template"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Replace all placeholder text with your own real information", "Change the color scheme to something that feels like you", "Add a fourth section not included in the template", "Make it work on mobile (test by resizing your browser window)"]
        }
      },
      {
        id: "2-10",
        title: "Solo Project \\u2014 No Template",
        body: `No scaffold. No starter code. No template. A blank file and a brief.\\n\\n<strong>The brief:</strong> Build a landing page for something that doesn't exist yet. An app idea you've had. A fictional brand. A band. A game. A product. It can be anything \\u2014 the subject doesn't matter. What matters is that you make every decision.\\n\\nThe page must have three sections minimum: a hero (the top section that communicates what the thing is, immediately, with a heading and a call-to-action), a features or about section (three or more reasons, benefits, or facts), and a footer with at minimum two links.\\n\\nEvery HTML element you use \\u2014 your choice. Every colour \\u2014 your choice. Every font, every spacing value, every layout approach \\u2014 yours. When something doesn't work, you figure out why. When you want something you don't know how to do, you search for it.\\n\\nThis is what the work actually feels like. There's no right answer to compare yourself to. There's only: does it work, does it look intentional, and is it something you made.`,
        callout: {
          type: "default",
          label: "The Blank Page Problem",
          text: "The hardest part of this project is starting. The fix: open a file, write the HTML scaffold, write an h1 with your idea's name. That's it. That's the start. Once there's something on screen, the next step is always obvious. The blank page is only terrifying until you put one word on it."
        },
        callout2: {
          type: "focus",
          label: "Searching Is Part of the Work",
          text: "If you want a feature you don't know how to build \\u2014 a sticky navigation, a gradient background, a CSS animation \\u2014 search for it. Searching for CSS solutions is not cheating. It's exactly what every professional developer does. The skill is knowing what to search for and evaluating what you find."
        },
        hint: `If you're completely blank on an idea: don't make it about an app. Make it about something you know. A landing page for your favourite book, for a coffee shop that should exist in your city, for a service that would have helped you learn to code faster. Anything you have opinions about is easier to design than something abstract.\\n\\n<strong>When the design feels off but you can't say why:</strong> Look at the spacing. Inconsistent spacing makes pages feel unpolished more than almost anything else. Pick one spacing unit (like 8px) and make every margin and padding a multiple of it. The page will immediately feel more ordered.\\n\\n<strong>Still fuzzy on the hero section?</strong> A hero needs: a strong headline (what is this), a brief supporting line (why it matters), and a button or link (what to do next). That's the complete minimum. Everything else is enhancement.`,
        quiz: {
          question: "You've finished the landing page. You look at it and think the layout is fine but something feels off about the design. Which of the following is most likely to make the biggest improvement?",
          options: ["Adding more CSS animations and transitions throughout the page", "Reviewing the spacing \\u2014 inconsistent padding and margins are the most common cause of layouts that look unpolished", "Changing the font to something more distinctive", "Adding more sections to give the page more content"],
          correct: 1,
          feedback: "Inconsistent spacing is the most common reason a page 'feels off' even when the structure and colours are correct. When padding and margins jump between arbitrary values (13px here, 21px there, 37px elsewhere), the eye perceives disorder. Switching to a consistent spacing scale \\u2014 multiples of 8 \\u2014 creates visual rhythm that makes layouts feel considered even without a designer."
        },
        checklist: ["I built the landing page from a blank file with no starter code", "It has a hero section, a features or about section, and a footer", "I made every visual decision myself", "When I didn't know how to do something, I searched for it rather than leaving it out", "I would show this page to someone as an example of what I can build"]
      }
    ]
  },
  {
    id: 3,
    title: "Building With Training Wheels",
    subtitle: "JavaScript \\u2014 the language of the web",
    color: "#c87e9a",
    duration: "4-5 weeks",
    sessions: "5 per week",
    length: "60-75 min",
    tag: "Floor 03 \\u2014 JavaScript",
    sections: [
      {
        id: "3-1",
        title: "What JavaScript Does",
        body: `HTML is structure. CSS is appearance. JavaScript is behaviour \\u2014 what happens when you actually interact with a page.\\n\\nEvery programming language you'll encounter later in your career \\u2014 Python, Go, Rust, Swift \\u2014 lives on servers or devices. JavaScript is the only language browsers run natively. If it happens in a browser and it responds to you, JavaScript made it happen.\\n\\nThe mental model to internalise: JavaScript is <strong>event-driven</strong>. It doesn't run top-to-bottom once and stop. It loads onto the page, then sits waiting. Waiting for a click, a keypress, a timer firing, a network response arriving. When one of those things happens, the relevant function runs. When it's done, JavaScript goes back to waiting. This is fundamentally different from the sequential scripts you saw in Floor 1.\\n\\nJavaScript's view of the page is the <strong>DOM</strong> \\u2014 Document Object Model. The browser represents every HTML element as a JavaScript object in a tree structure. JavaScript can find any node in that tree, read its properties, change its content or style, add new nodes, or remove existing ones \\u2014 all without reloading the page. This is called DOM manipulation, and it's the core mechanism behind every interactive website.\\n\\nWhen Instagram shows a like animation the instant you tap the heart \\u2014 no page reload, just an immediate response \\u2014 JavaScript found the heart element in the DOM, changed its CSS class to the filled version, incremented the like count, and sent a network request to save the like to the server. All of that in milliseconds, without you seeing anything except the animation.\\n\\nThat is what you're about to learn to do.`,
        callout: {
          type: "default",
          label: "The Third Layer",
          text: "HTML gives the page content. CSS gives it appearance. JavaScript gives it behaviour. A page without JavaScript is a static document \\u2014 it looks the same regardless of what you do. A page with JavaScript is a living interface that responds to you. This is the difference between a poster and an application."
        },
        callout2: {
          type: "focus",
          label: "Expect the Difficulty",
          text: "Floor 3 is harder than Floors 1 and 2. JavaScript is a programming language \\u2014 it has logic, state, and behaviour that HTML and CSS don't. That difficulty is real and expected. Every developer found JavaScript harder than HTML. The ones who got through it weren't smarter \\u2014 they were more patient with the confusion."
        },
        hint: `The best way to start is to see it, not read about it. Open any website, press F12, click the Console tab. Type: document.body.style.background = 'red' and press Enter. Watch the page turn red. That's JavaScript modifying the DOM in real time.\\n\\n<strong>Try this:</strong> On any page, in the console, type: document.querySelectorAll('p').forEach(p => p.style.color = 'lime'). Every paragraph on the page turns lime green. You just ran DOM manipulation from the console. That exact pattern is what JavaScript does when you write it in a script file.\\n\\n<strong>Still fuzzy on event-driven?</strong> Think of JavaScript as a security guard sitting at the door. When nothing is happening, they wait. When someone knocks (a click), they check who it is and respond. When the phone rings (a timer), they answer. They don't patrol the building constantly \\u2014 they respond to events. That's the event-driven model.`,
        quiz: {
          question: "When you click a 'Like' button on Instagram and the count updates immediately without the page reloading, what is happening technically?",
          options: ["The server sends a new version of the entire page with the updated count", "JavaScript handles the click event, updates the DOM to show the new count, and sends a network request in the background", "CSS animations handle the like effect and the count is recalculated automatically", "The browser caches the updated count and displays it without contacting the server"],
          correct: 1,
          feedback: "When you click Like, JavaScript is listening for that click event. An event handler function runs: it updates the heart icon's appearance in the DOM (no reload needed), updates the count display, and sends an asynchronous network request to save the like to Instagram's server. The DOM update is instant because it's local. The server request happens in the background. This is exactly how modern web applications work."
        },
        checklist: ["I understand that JavaScript is the only language browsers run natively", "I can explain the event-driven model \\u2014 JavaScript waits, then responds to events", "I understand what the DOM is and what DOM manipulation means", "I've opened the browser console and run at least one JavaScript command", "I can describe in plain terms how Instagram's Like button works"]
      },
      {
        id: "3-2",
        title: "Variables and Data Types",
        body: `Variables are named containers that hold values. In JavaScript, you create them with <code>const</code> or <code>let</code>. The rule is simple: use <code>const</code> by default. Only use <code>let</code> when the value genuinely needs to change over time \\u2014 a counter, a toggle state, an accumulating total. <code>var</code> is the old way; it has scoping behaviours that cause bugs. Avoid it.\\n\\nJavaScript has four primitive data types you need now. <strong>String</strong>: text, wrapped in single quotes, double quotes, or backticks. <strong>Number</strong>: all numeric values \\u2014 integers and decimals alike, no distinction. <strong>Boolean</strong>: exactly two values, <code>true</code> or <code>false</code>. <strong>Undefined</strong>: a variable that's been declared but not yet assigned a value.\\n\\nThe <code>typeof</code> operator tells you what type a value is: <code>typeof "hello"</code> returns <code>"string"</code>, <code>typeof 42</code> returns <code>"number"</code>.\\n\\nTemplate literals are backtick strings that allow embedded expressions: <code>\\`Hello, ${name}. You have ${count} messages.\\`</code> The <code>${}</code> interpolates any JavaScript expression. This replaces string concatenation with <code>+</code> in nearly every case.\\n\\nJavaScript's most confusing behaviour is <strong>type coercion</strong>: the language automatically converts between types in certain situations. <code>"5" + 3</code> is <code>"53"</code> because <code>+</code> with a string triggers string concatenation. <code>"5" - 3</code> is <code>2</code> because <code>-</code> has no string version, so JavaScript converts "5" to a number first. This is why you always use <code>===</code> (strict equality, checks value AND type) instead of <code>==</code> (loose equality, coerces types before comparing). <code>0 == false</code> is <code>true</code>. <code>0 === false</code> is <code>false</code>. The second is correct.`,
        callout: {
          type: "default",
          label: "const by Default",
          text: "Start every variable with const. If you get an error because you're trying to reassign it, change it to let. This approach forces you to think consciously about which values change \\u2014 and that habit prevents entire categories of bugs."
        },
        callout2: {
          type: "focus",
          label: "Always Use ===",
          text: "Never use == in JavaScript. Always use ===. The loose equality operator performs type coercion in ways that are hard to predict and create subtle bugs. Strict equality (===) checks both value and type with no surprises. This is one of the few rules with no exceptions."
        },
        hint: `Type coercion catches everyone. The key: <code>+</code> with any string becomes concatenation. Every other operator (<code>-</code>, <code>*</code>, <code>/</code>) converts strings to numbers. So <code>"10" * 2</code> is <code>20</code>, but <code>"10" + 2</code> is <code>"102"</code>.\\n\\n<strong>Try this:</strong> Open the browser console (F12) and try these one at a time: <code>typeof "hello"</code>, <code>typeof 42</code>, <code>typeof true</code>, <code>typeof undefined</code>, <code>"5" + 3</code>, <code>"5" - 3</code>, <code>5 == "5"</code>, <code>5 === "5"</code>. Understanding the output of each is worth more than reading about it.\\n\\n<strong>Still fuzzy on template literals?</strong> They're backtick strings that can contain expressions inside <code>${}</code>. Anything JavaScript can evaluate goes inside: variables, calculations, function calls. <code>\\`Total: ${price * quantity}\\`</code> embeds a calculation directly in the string.`,
        quiz: {
          question: "What is the output of: console.log('10' + 5); and why?",
          options: ["15, because JavaScript adds the numbers together", "'105', because the + operator with a string triggers concatenation, not addition", "Error, because you cannot use + with mixed types", "NaN, because '10' is not a valid number"],
          correct: 1,
          feedback: "When + encounters a string on either side, it concatenates \\u2014 joins them together as text. '10' is a string, so '10' + 5 becomes '10' + '5' (5 is coerced to a string) which is '105'. This is why parseInt() or Number() is used to convert string inputs to numbers before doing maths, and why === catches this kind of type mismatch."
        },
        checklist: ["I use const by default and only reach for let when values genuinely need to change", "I understand the four primitive types: string, number, boolean, undefined", "I can write template literals with embedded expressions", "I always use === instead of ==", "I understand what type coercion is and which operators trigger it"]
      },
      {
        id: "3-3",
        title: "Logic and Conditions",
        body: `Conditions are how code makes decisions. The basic form: <code>if (expression) { } else if (expression) { } else { }</code>. The expression inside the parentheses must evaluate to truthy or falsy. If truthy, the block runs. If not, it falls through to the next else if, or the else.\\n\\nComparison operators produce booleans: <code>===</code> (strictly equal), <code>!==</code> (not equal), <code>></code> (greater than), <code><</code> (less than), <code>>=</code> (greater than or equal), <code><=</code> (less than or equal).\\n\\nLogical operators combine conditions: <code>&&</code> (AND \\u2014 both sides must be truthy), <code>||</code> (OR \\u2014 at least one side must be truthy), <code>!</code> (NOT \\u2014 inverts the boolean).\\n\\nNow the important part that most courses underexplain: <strong>truthy and falsy</strong>. JavaScript doesn't just work with true and false \\u2014 it treats every value as either truthy or falsy. The falsy values in JavaScript are exactly six: <code>false</code>, <code>0</code>, <code>""</code> (empty string), <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Every other value \\u2014 including empty arrays and empty objects \\u2014 is truthy. This means <code>if (username)</code> checks whether username is a non-empty string without an explicit comparison.\\n\\nThe ternary operator is a shorthand condition on one line: <code>condition ? valueIfTrue : valueIfFalse</code>. Use it for simple assignments. Don't nest them \\u2014 nested ternaries are unreadable.\\n\\nShort-circuit evaluation is a subtlety that shows up constantly in real code. <code>a && b</code> returns <code>a</code> if <code>a</code> is falsy (never evaluates <code>b</code>), or returns <code>b</code> if <code>a</code> is truthy. <code>a || b</code> returns <code>a</code> if truthy, or <code>b</code> if <code>a</code> is falsy. That's why <code>const name = user.name || 'Anonymous'</code> works as a default value pattern \\u2014 if user.name is falsy (undefined, empty string), it falls back to 'Anonymous'.`,
        callout: {
          type: "default",
          label: "The Six Falsy Values",
          text: "false, 0, '' (empty string), null, undefined, NaN. Memorise these six. Everything else is truthy \\u2014 including [], {}, and '0'. The most common mistake: assuming an empty array is falsy. It isn't. Only an empty string is falsy, not an empty array."
        },
        callout2: {
          type: "focus",
          label: "Short-Circuit as a Pattern",
          text: "const value = input || 'default' is one of the most common patterns in JavaScript. If input is falsy (undefined, null, empty string), value gets 'default'. You'll see this pattern in essentially every real JavaScript codebase. Recognising it and using it is a sign of fluency."
        },
        hint: `The best way to internalise truthy and falsy: open the console and type <code>Boolean(0)</code>, <code>Boolean('')</code>, <code>Boolean(null)</code>, <code>Boolean([])</code>, <code>Boolean({})</code>, <code>Boolean('hello')</code>. The output for each tells you directly whether it's truthy or falsy.\\n\\n<strong>Try this:</strong> Write a condition without a comparison operator. <code>if (username) { console.log('has username') }</code>. Set username to different values \\u2014 'Alex', '', null, undefined, 0 \\u2014 and see when the block runs. This is the truthy/falsy concept made concrete.\\n\\n<strong>Still unclear on &&?</strong> Think of it as a chain of guards. If the first guard says no (falsy), nobody else is checked \\u2014 the whole chain returns false. If the first guard says yes, the second is checked, and so on. The chain only succeeds if every guard approves.`,
        quiz: {
          question: "A function checks: if (userInput) { processInput(userInput) }. For which of the following userInput values will processInput NOT be called?",
          options: ["'hello' \\u2014 because it's a non-empty string", "[] \\u2014 because empty arrays are falsy", "0 \\u2014 because 0 is one of JavaScript's falsy values", "'false' \\u2014 because it contains the word false"],
          correct: 2,
          feedback: "0 is one of the six falsy values in JavaScript, so if (0) evaluates to false and processInput is skipped. 'hello' is truthy. [] is truthy (empty arrays are truthy \\u2014 only empty strings are falsy). 'false' is also truthy \\u2014 it's a non-empty string containing the text 'false', not the boolean false."
        },
        checklist: ["I can write if/else if/else chains and explain how they evaluate", "I know all six falsy values in JavaScript", "I understand that && and || return values, not just booleans", "I can use the ternary operator for simple conditional assignments", "I can use the || operator as a default value pattern"]
      },
      {
        id: "3-4",
        title: "Functions",
        body: `A function is a named, reusable block of code. You define it once and call it by name whenever you need it to run. Without functions, code would be an unmanageable sequence of repeated instructions.\\n\\nThe classic declaration syntax: <code>function greet(name) { return 'Hello, ' + name; }</code>. The words inside the parentheses are <strong>parameters</strong> \\u2014 placeholders that receive values when the function is called. When you call <code>greet('Alex')</code>, the string 'Alex' is the <strong>argument</strong> \\u2014 the actual value that fills the parameter slot.\\n\\nThe <code>return</code> statement sends a value back to wherever the function was called. A function without a return statement returns <code>undefined</code> \\u2014 it runs for its side effects (displaying something, modifying the DOM, logging to console) rather than producing a value.\\n\\nArrow functions are a shorter syntax: <code>const greet = (name) => 'Hello, ' + name;</code>. For a single expression, the return is implicit. Arrow functions are preferred in modern code for short callbacks and expressions. Regular function declarations are still used for named, top-level functions \\u2014 they have the advantage of being hoisted (available before they're defined in the file), which matters in certain architectures.\\n\\nFunction scope: variables declared inside a function don't exist outside it. They're created when the function runs and destroyed when it finishes. This means two functions can have a variable called <code>count</code> without them interfering with each other.\\n\\n<strong>Pure functions</strong> are the gold standard: given the same inputs, they always return the same output, and they have no side effects (they don't modify anything outside themselves). Every time you click "Add to Cart" on Amazon, a function runs that takes the item and the current cart and returns a new cart. Same inputs, same output, no surprises.`,
        callout: {
          type: "default",
          label: "Parameters vs Arguments",
          text: "Parameters are the placeholders in the function definition: function add(a, b). Arguments are the actual values passed when calling it: add(3, 5). Parameters are names. Arguments are values. The distinction matters when reading error messages and documentation."
        },
        callout2: {
          type: "focus",
          label: "When to Use Arrow vs Regular Functions",
          text: "Arrow functions for callbacks, array methods, and short expressions: array.map(item => item.name). Regular function declarations for top-level named functions you'll call throughout a file. Don't overthink this early on \\u2014 both work, and the style preference becomes natural with exposure."
        },
        hint: `If a function doesn't return a value and you try to use its result, you get <code>undefined</code>. This is one of the most common bugs. Check: does your function have a return statement? Does it return the right thing? Add <code>console.log</code> inside the function to verify what it's producing before it returns.\\n\\n<strong>Try this:</strong> Write a function that takes two numbers and returns their sum. Call it with three different pairs of numbers and log the results. Then remove the return keyword \\u2014 see what happens. Experiencing undefined is more memorable than reading about it.\\n\\n<strong>Confused about scope?</strong> Any variable declared inside a function with const or let is invisible outside it. This is protective \\u2014 functions can do their work without accidentally overwriting variables from elsewhere. Think of a function's scope as a room: what happens in the room stays in the room.`,
        quiz: {
          question: "A function is defined as: function double(x) { x * 2; }. You call it with console.log(double(5)). What is logged and why?",
          options: ["10, because the function multiplies x by 2", "undefined, because the function calculates x * 2 but never returns the result", "Error, because x is not defined outside the function", "null, because the function has no explicit return type"],
          correct: 1,
          feedback: "The function performs the calculation x * 2 but the result is never returned. A function without a return statement returns undefined. To fix it: function double(x) { return x * 2; }. This is one of the most common early mistakes \\u2014 computing a value inside a function but forgetting to send it back with return."
        },
        checklist: ["I can write a function declaration with parameters and a return value", "I understand the difference between parameters and arguments", "I can write an arrow function and know when to prefer it", "I understand what function scope means and why it matters", "I know what a pure function is and why it's considered good practice"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a third parameter to the greet function for a title (Mr, Ms, Dr) and include it in the output", "Write a function called calculateDiscount(price, percent) that returns the discounted price", "Convert the function declaration to an arrow function", "Write a function that takes an array of numbers and returns the largest one"]
        }
      },
      {
        id: "3-5",
        title: "Loops",
        body: `A loop runs a block of code repeatedly until a condition says to stop. Every time JavaScript renders a list \\u2014 Spotify's playlist tracks, Instagram's feed posts, Airbnb's search results \\u2014 it loops through an array of data and renders a component for each item. Loops are ubiquitous.\\n\\nThe <strong>for loop</strong> has three parts in the parentheses: initialisation (what to set up before the loop starts), condition (run the loop while this is true), and update (what to do after each iteration). <code>for (let i = 0; i < 10; i++)</code> runs ten times, with i going from 0 to 9.\\n\\nThe <strong>while loop</strong> is simpler but less safe for counted iterations: it runs while a condition is true, with no built-in counter. Use it when you don't know how many iterations are needed in advance \\u2014 reading items from a stream until it's empty, for example.\\n\\n<code>forEach</code> is an array method that runs a function for each item: <code>songs.forEach(song => { render(song); })</code>. Clean and readable for arrays.\\n\\n<code>for...of</code> iterates over values in an iterable: <code>for (const song of songs)</code>. <code>for...in</code> iterates over the keys of an object \\u2014 use it for objects, not arrays.\\n\\n<code>break</code> exits a loop immediately. <code>continue</code> skips the rest of the current iteration and moves to the next. Both are useful for early termination and filtering within loops.\\n\\nThe most common mistake: the infinite loop. A while loop whose condition never becomes false, or a for loop whose counter never reaches the stopping condition, will freeze the browser. Always double-check: will the condition eventually be false? Will the counter actually reach the limit?`,
        callout: {
          type: "default",
          label: "for...of vs forEach",
          text: "for...of works with any iterable (arrays, strings, NodeLists). forEach is an array method that only works on arrays. Both are fine for arrays. Prefer for...of when you might need break or continue \\u2014 you can't break out of a forEach."
        },
        callout2: {
          type: "focus",
          label: "The Infinite Loop Risk",
          text: "An infinite loop crashes the browser tab. Before you run any while loop, ask: what changes in each iteration that will eventually make the condition false? If nothing changes, the loop runs forever. For loops are safer because the update step is built into the syntax."
        },
        hint: `If your browser freezes after writing a loop, it's almost certainly infinite. Close the tab. Reopen your editor. Check: does the while condition eventually become false? Does the for loop's counter actually reach the limit?\\n\\n<strong>Try this:</strong> Write a for loop that logs numbers 1 to 10. Then modify it to only log odd numbers by adding <code>if (i % 2 === 0) continue;</code>. Then modify the condition to stop at 7 instead of 10. Three small changes, three different loop behaviours.\\n\\n<strong>Confused by for...in vs for...of?</strong> for...in gives you keys (property names or array indices as strings). for...of gives you values. For arrays, almost always use for...of or forEach \\u2014 for...in on arrays gives you index strings and includes any inherited properties, which causes subtle bugs.`,
        quiz: {
          question: "A for loop is written as: for (let i = 0; i < 5; i++). On which value of i does the loop stop executing its body?",
          options: ["When i reaches 5, because the condition i < 5 becomes false", "When i reaches 4, because arrays are zero-indexed", "When i reaches 6, because i++ runs once more after the last iteration", "The loop never stops unless break is called explicitly"],
          correct: 0,
          feedback: "The condition is i < 5. After i increments to 5, the condition is checked: 5 < 5 is false, so the loop body does not execute and the loop ends. The body runs for i = 0, 1, 2, 3, 4 \\u2014 five times total. When i becomes 5, the condition fails and the loop exits."
        },
        checklist: ["I can write a for loop with correct initialisation, condition, and update", "I understand when to use while vs for", "I can use forEach for clean array iteration", "I know the difference between for...of and for...in", "I understand what break and continue do and can use them correctly"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Change the for loop to count down from 10 to 1 instead of up", "Add a condition inside the loop that skips even numbers (use if (i % 2 === 0) continue)", "Rewrite the for loop as a while loop", "Write a loop that finds the first number in the array greater than 50 and stops"]
        }
      },
      {
        id: "3-6",
        title: "Arrays and Objects",
        body: `Arrays and objects are the two data structures you'll work with constantly. Every real JavaScript application is essentially arrays of objects, transformed and displayed.\\n\\nAn <strong>array</strong> is an ordered list. You access items by index (starting at 0). Core methods:\\n\\n<code>push(item)</code> adds to the end. <code>pop()</code> removes from the end. <code>shift()</code> removes from the start. <code>unshift(item)</code> adds to the start. <code>slice(start, end)</code> returns a portion without modifying the original. <code>splice(start, count)</code> removes items in place. <code>indexOf(item)</code> finds the position. <code>includes(item)</code> returns true/false.\\n\\nThe three array methods that change how you write code:\\n\\n<code>map(fn)</code> transforms every item, returns a new array of the same length: <code>prices.map(p => p * 1.2)</code>.\\n<code>filter(fn)</code> keeps only items where the function returns true: <code>movies.filter(m => m.rating > 8)</code>.\\n<code>reduce(fn, initial)</code> reduces an array to a single value: totals, averages, grouped objects.\\n\\nAn <strong>object</strong> is a collection of key-value pairs. Access values with dot notation (<code>user.name</code>) or bracket notation (<code>user['name']</code> \\u2014 useful when the key is in a variable). Objects can contain any values \\u2014 strings, numbers, arrays, other objects, functions.\\n\\nThe most common data structure in real applications: an array of objects. A Netflix category row is an array of movie objects, each with title, imageUrl, rating, and description. When JavaScript renders the row, it maps over the array and creates a DOM element for each object.\\n\\n<strong>JSON</strong> (JavaScript Object Notation) is how data is sent between frontend and backend. It looks like JavaScript object and array syntax, but it's a text format \\u2014 all keys must be in double quotes, values can only be strings, numbers, booleans, arrays, objects, or null. <code>JSON.stringify()</code> converts a JavaScript object to a JSON string. <code>JSON.parse()</code> converts JSON back to a JavaScript object.`,
        callout: {
          type: "default",
          label: "map, filter, reduce",
          text: "These three array methods replace most for loops in modern JavaScript. map for transformation, filter for selection, reduce for aggregation. Learning them makes code shorter, more readable, and less error-prone. They don't modify the original array \\u2014 they return new ones."
        },
        callout2: {
          type: "focus",
          label: "Arrays of Objects",
          text: "const users = [{name: 'Alex', age: 28}, {name: 'Sam', age: 34}] is the most common data shape in real applications. API responses return this format. Databases return this format. Knowing how to navigate and transform arrays of objects is one of the most practically useful skills in JavaScript."
        },
        hint: `The difference between dot and bracket notation: use dot when you know the key name at write time (<code>user.name</code>). Use bracket notation when the key is in a variable (<code>obj[keyVariable]</code>) or when the key has special characters.\\n\\n<strong>Try this:</strong> Create an array of 5 objects, each with a name and a score. Use filter to get only items with a score above 50. Use map on the result to get just the names. Use reduce to sum all scores. Three method chains, three transformations, no for loops.\\n\\n<strong>Confused by reduce?</strong> Think of it as a running total. The accumulator starts at your initial value. For each item, your function receives the current accumulator and the current item, and returns the new accumulator. <code>arr.reduce((total, item) => total + item.price, 0)</code> starts at 0 and adds each price.`,
        quiz: {
          question: "Given: const nums = [3, 7, 1, 9, 4]. What does nums.filter(n => n > 4) return?",
          options: ["[7, 9] \\u2014 only values strictly greater than 4", "[4, 7, 9] \\u2014 values greater than or equal to 4", "[3, 1, 4] \\u2014 values less than or equal to 4", "5 \\u2014 the count of values greater than 4"],
          correct: 0,
          feedback: "filter returns a new array containing only the items where the callback function returns true. n > 4 is true for 7 and 9. 3 is not greater than 4. 1 is not greater than 4. 4 is not greater than 4 (the condition is strictly greater than, not greater than or equal). Result: [7, 9]."
        },
        checklist: ["I know the core array methods: push, pop, slice, splice, indexOf, includes", "I can use map, filter, and reduce to transform arrays", "I can create and navigate nested objects using both dot and bracket notation", "I understand what JSON is and can convert between JSON and JavaScript objects", "I can work with arrays of objects \\u2014 the most common data structure in real applications"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Use .filter() to show only movies with a rating above 8.0", "Add a new movie to the array using .push() and re-render the list", "Use .map() to create a new array of just the movie titles", "Sort the movies by rating using .sort()"]
        }
      },
      {
        id: "3-7",
        title: "DOM Manipulation",
        body: `The DOM is the browser's live, in-memory model of the page as a tree of objects. JavaScript can navigate this tree, read its nodes, change them, add new ones, or remove existing ones. This is how every interactive website works.\\n\\nFinding elements. <code>document.getElementById('id')</code> finds one element by its id attribute \\u2014 fast and explicit. <code>document.querySelector('.class')</code> finds the first element matching any CSS selector. <code>document.querySelectorAll('p')</code> returns all matching elements as a NodeList, which you can loop over with forEach.\\n\\nReading and writing. <code>element.textContent</code> reads or sets the text inside an element \\u2014 safe, just text. <code>element.innerHTML</code> reads or sets HTML content \\u2014 powerful but dangerous with user-provided content because a malicious string could inject scripts (this is called XSS, Cross-Site Scripting). If you're displaying user input, always use textContent.\\n\\n<code>element.setAttribute('href', 'https://example.com')</code> sets any HTML attribute. <code>element.getAttribute('href')</code> reads it.\\n\\n<code>element.classList.add('active')</code> adds a class. <code>element.classList.remove('active')</code> removes it. <code>element.classList.toggle('active')</code> adds it if absent, removes it if present. This toggle pattern is how most show/hide, open/close, and active/inactive interactions work.\\n\\nCreating and removing. <code>document.createElement('div')</code> creates a new element (not yet on the page). <code>parent.appendChild(child)</code> attaches it. <code>element.remove()</code> deletes it from the DOM.\\n\\nWhen Twitter's compose box enables the Tweet button only when text exists, and disables it when the box is empty, that's a JavaScript event listener reading the textContent length and toggling a disabled attribute. Six lines of DOM manipulation powering a feature used billions of times daily.`,
        callout: {
          type: "default",
          label: "textContent vs innerHTML",
          text: "Use textContent when displaying text \\u2014 especially any text that came from user input. textContent treats everything as plain text, so malicious script tags are displayed as text, not executed. innerHTML is for when you're constructing HTML programmatically and you control the content entirely. Never use innerHTML with user-provided strings."
        },
        callout2: {
          type: "focus",
          label: "classList.toggle Is Your Most-Used DOM Tool",
          text: "The pattern: add a CSS class that defines one state (hidden, active, expanded), then use classList.toggle to switch between states. No if/else needed, no style manipulation, just toggling a class. This is how 80% of interactive UI behaviours work in professional code."
        },
        hint: `If your JavaScript isn't finding an element, there are three things to check. One: is the id or class name spelled correctly, including capitalisation? Two: is the script running before the element exists in the DOM? (script tags at the bottom of body fix this). Three: is the element actually in the HTML?\\n\\n<strong>Try this:</strong> In the browser console on any page, run <code>document.querySelectorAll('a')</code>. You'll get a NodeList of every link on the page. Run <code>document.querySelectorAll('a').length</code> to count them. Then <code>document.querySelectorAll('a')[0].textContent</code> to read the first link's text.\\n\\n<strong>Confused by appendChild vs innerHTML?</strong> appendChild attaches a single element you've created with createElement. innerHTML replaces everything inside a parent with an HTML string. appendChild is better for adding single items. innerHTML is often used to re-render an entire list (write the full HTML string, set it once).`,
        quiz: {
          question: "You're building a dropdown menu. Clicking a button should show the menu if it's hidden, and hide it if it's showing. Which DOM method handles this most cleanly?",
          options: ["element.style.display = 'block' or 'none' \\u2014 toggling the display property directly", "element.setAttribute('visible', true) \\u2014 setting a custom attribute to track state", "element.classList.toggle('hidden') \\u2014 adding or removing a CSS class that controls visibility", "element.innerHTML = '' \\u2014 clearing the menu content to hide it"],
          correct: 2,
          feedback: "classList.toggle adds the class if absent, removes it if present \\u2014 in one call. Pair it with a CSS rule like .hidden { display: none; } and the behaviour is clean and reusable. Directly manipulating style is harder to override and mixes presentation logic into JavaScript. Setting a custom attribute requires extra code to read and act on it. Clearing innerHTML destroys the content entirely rather than hiding it."
        },
        checklist: ["I can find elements using getElementById, querySelector, and querySelectorAll", "I know when to use textContent vs innerHTML and why innerHTML can be a security risk", "I can add, remove, and toggle CSS classes on elements", "I can create new elements with createElement and attach them with appendChild", "I understand the classList.toggle pattern for show/hide interactions"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Change the button text to 'Updated!' after clicking it", "Use classList.toggle to show/hide the message instead of changing textContent", "Add a second counter that counts how many times the button has been clicked", "Create a new paragraph element with document.createElement and append it to the page"]
        }
      },
      {
        id: "3-8",
        title: "Events",
        body: `JavaScript is event-driven. Code doesn't run continuously \\u2014 it waits for something to happen, then responds. An event is anything that happens in the browser: a click, a keypress, text being typed, a form being submitted, a page finishing loading.\\n\\n<code>addEventListener</code> is the professional way to attach event handlers. <code>button.addEventListener('click', handleClick)</code> is better than the inline <code>onclick="handleClick()"</code> attribute because it keeps behaviour separate from structure, allows multiple listeners on the same element, and can be removed later.\\n\\nCommon events: <code>click</code>, <code>input</code> (fires on every character typed), <code>change</code> (fires when an input loses focus after value changes), <code>submit</code> (form submission), <code>keydown</code> and <code>keyup</code> (keyboard events), <code>mouseover</code> and <code>mouseout</code>, <code>focus</code> and <code>blur</code>.\\n\\nEvery event handler receives an <strong>event object</strong> as its first argument. It contains information about the event: <code>event.target</code> (the element that triggered the event), <code>event.type</code> (which event occurred), <code>event.key</code> (for keyboard events, which key was pressed).\\n\\n<code>event.preventDefault()</code> stops the browser's default action. On a form submit, the default is to reload the page \\u2014 <code>preventDefault()</code> stops that so you can handle the submission with JavaScript. On a link click, it prevents navigation.\\n\\n<strong>Event delegation</strong> is attaching one listener to a parent element instead of many listeners to individual children. When a list item is clicked, the event bubbles up to the parent. The listener on the parent can read <code>event.target</code> to determine which item was clicked. This scales to dynamic lists where items are added after the listeners are attached.\\n\\nGoogle's search suggestions use the <code>input</code> event: every character you type fires a request, and results update in real time. One listener, hundreds of keystrokes, millions of users.`,
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
        hint: `If an event listener isn't firing, check these in order. One: is the listener attached to the right element? Use console.log inside the handler as the first test. Two: is the event name spelled correctly? ('click' not 'onClick'). Three: for keyboard events, log event.key to see what string the key produces.\\n\\n<strong>Try this:</strong> Add an event listener to the document that logs every keydown: <code>document.addEventListener('keydown', e => console.log(e.key))</code>. Press various keys. See what strings they produce. This reveals why keyboard shortcut code checks <code>e.key === 'Enter'</code> not <code>e.key === 13</code>.\\n\\n<strong>Confused by event bubbling?</strong> When you click an element, the event fires on that element, then on its parent, then its parent's parent, all the way up to the document. This is bubbling. Event delegation relies on it \\u2014 a click on a child element bubbles up to the parent listener, which reads event.target to know which child was actually clicked.`,
        quiz: {
          question: "A form has a submit button. When clicked, the page reloads and the JavaScript handler seems to run for a split second then disappear. What is the most likely cause and fix?",
          options: ["The event listener is attached incorrectly \\u2014 use onclick instead of addEventListener", "The browser's default form submit is reloading the page \\u2014 call event.preventDefault() at the start of the handler", "JavaScript cannot handle form submissions \\u2014 use a server-side language instead", "The handler function is asynchronous and needs to be awaited"],
          correct: 1,
          feedback: "Form submission's default behaviour is to send the form data and reload the page. The JavaScript runs briefly but then the reload wipes everything. event.preventDefault() stops that default action, letting your JavaScript handle the submission completely without a page reload. This is one of the most common patterns in web form handling."
        },
        checklist: ["I use addEventListener instead of inline onclick attributes", "I know the common event types and what triggers each one", "I can access and use the event object inside a handler", "I understand event.preventDefault() and know when to use it", "I understand event delegation and can implement it on a dynamic list"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a keydown listener that fires when the user presses Enter", "Use event.preventDefault() on the form submit to prevent page reload", "Add a mouseover event that changes the button color when hovered (in JavaScript, not CSS)", "Use event delegation \\u2014 attach one click listener to the list container instead of each item"]
        }
      },
      {
        id: "3-9",
        title: "Error Handling and Debugging",
        body: `Every developer writes broken code. The difference between a beginner and a professional isn't that professionals make fewer mistakes \\u2014 it's that they find and fix mistakes faster because they have a systematic approach.\\n\\nJavaScript has three error types. A <strong>SyntaxError</strong> means the code isn't valid JavaScript \\u2014 a missing bracket, an unclosed string, a typo in a keyword. The script doesn't execute at all. A <strong>ReferenceError</strong> means you tried to use a variable that doesn't exist \\u2014 either it was never declared, or it's out of scope, or it's misspelled (JavaScript is case-sensitive). A <strong>TypeError</strong> means you performed an operation on a value of the wrong type \\u2014 calling something that isn't a function, accessing a property on null or undefined.\\n\\nReading error messages is a skill that develops with practice. Every JavaScript error in the console tells you: the error type, a plain-English description of what went wrong, and the file name and line number where it was detected. Start there. Go to that line. The problem is usually either on that line or one line above.\\n\\n<code>console.log()</code> is the most-used debugging tool at every level of experience. Drop it inside a function to confirm it's being called. Log a variable to see its value at a specific moment in execution. Trace your assumptions before changing any code.\\n\\n<code>try { } catch (error) { }</code> wraps code that might fail and handles the error gracefully instead of crashing. The catch block receives the error object. <code>error.message</code> is the human-readable description. <code>throw new Error('Something went wrong')</code> creates a custom error with a message you choose.\\n\\nThe browser DevTools debugger is more powerful than console.log: click the line number in the Sources tab to set a breakpoint, run the code, and execution pauses there. You can inspect every variable's current value and step through code one line at a time. Systematic debugging \\u2014 forming a hypothesis, testing it, narrowing it down \\u2014 solves bugs faster than random changes.`,
        callout: {
          type: "default",
          label: "Debugging Is Systematic",
          text: "When something is broken, resist the urge to change things randomly. Instead: read the error message, identify the line, form a hypothesis about what's wrong, test it with console.log or a breakpoint, confirm or revise the hypothesis. One change at a time. Random changes compound bugs."
        },
        callout2: {
          type: "focus",
          label: "try/catch for Expected Failures",
          text: "Use try/catch when you're calling code that might legitimately fail \\u2014 parsing JSON, accessing an API, reading from localStorage. Don't wrap everything in try/catch; that suppresses bugs you need to see. Use it at the boundary where controlled failure is the correct response."
        },
        hint: `When the error message says something 'is not a function', the thing you're calling isn't a function. It might be undefined (the function name is misspelled), or null, or a string. Log the thing before calling it to see what it actually is.\\n\\n<strong>Try this:</strong> Open the DevTools Sources tab on any page, find a JavaScript file, and click on a line number to set a breakpoint. Reload the page. Execution pauses there. Hover over any variable name to see its current value. Use the step controls to move through execution one line at a time. This is what professional debugging looks like.\\n\\n<strong>Stuck on a bug for more than 20 minutes?</strong> Stop trying to fix it. Instead, explain the problem out loud \\u2014 to a rubber duck, to the wall, to anyone. Articulating "I expect X but I'm getting Y because..." forces your brain to reprocess the logic, and the answer often appears while you're still talking. This is known as rubber duck debugging and it works.`,
        quiz: {
          question: "You see this error: TypeError: Cannot read properties of undefined (reading 'name'). What most likely caused it?",
          options: ["The variable 'name' was declared with let instead of const", "You're trying to access the .name property on a value that is undefined \\u2014 the object you expected to exist doesn't", "The name property needs to be in quotes to be accessed correctly", "TypeError means the JavaScript engine doesn't recognise the type of the variable"],
          correct: 1,
          feedback: "This TypeError means you wrote something like user.name where user is undefined. The object you expected to be there (user) doesn't exist at the moment your code runs \\u2014 it might not have been returned yet, the variable is initialised as undefined, or a function didn't return a value. Log the variable just before the failing line to confirm what it contains."
        },
        checklist: ["I can identify the three JavaScript error types and what each one means", "I read error messages fully before touching any code", "I use console.log systematically to trace values, not randomly to hope for clues", "I understand try/catch and know when it's appropriate to use", "I've used the DevTools debugger to set a breakpoint and step through execution"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Fix the three intentional bugs in the code \\u2014 read the error messages in the console for guidance", "Add a try/catch block around the broken function call and display the error message instead of crashing", "Add console.log statements to trace what value each variable holds", "Add input validation that throws a custom error if the input is empty"]
        }
      },
      {
        id: "3-10",
        title: "Guided To-Do List Project",
        body: `The to-do list is the classic beginner project because it isn't trivial. Done properly, it exercises every concept from this floor: DOM creation, event listeners, array state management, and localStorage persistence.\\n\\nThe scaffold in the editor handles the visual layout and structure. Your job is to complete four functions. Read every comment in the code before writing a single line \\u2014 the comments describe exactly what each function needs to do.\\n\\n<code>addTodo</code>: read the input value, validate it's not empty, add it to the todos array, create a DOM element for it, append to the list, clear the input.\\n\\n<code>deleteTodo</code>: given an id, remove the matching item from the todos array, remove its DOM element.\\n\\n<code>toggleComplete</code>: given an id, find the item in the todos array, flip its completed boolean, update the DOM element's visual state.\\n\\n<code>saveToStorage</code>: convert the todos array to JSON and save it to localStorage. Call this after every state change.\\n\\nThe sequence matters. Get addTodo working first \\u2014 confirm items appear in the list. Then deleteTodo. Then toggleComplete. Then saveToStorage and the load-on-startup logic. Each function is a small, self-contained problem. Solve them one at a time and the whole system assembles itself.`,
        callout: {
          type: "default",
          label: "Read Before Writing",
          text: "Read all four function stubs and their comments completely before implementing any of them. Understanding how they interact \\u2014 what data each expects, what each one changes \\u2014 prevents you from building yourself into a corner halfway through."
        },
        callout2: {
          type: "focus",
          label: "State and DOM Must Stay in Sync",
          text: "The todos array is the source of truth. The DOM is a visual representation of that array. Every time the array changes, the relevant part of the DOM must update to match. If you ever manually change the DOM without updating the array first, they get out of sync and bugs appear."
        },
        hint: `If items are appearing in the list but deletion isn't working, check that each todo has a unique id and that the delete button is referencing that same id. If toggleComplete isn't updating the visual state, confirm you're finding the right DOM element \\u2014 log the id you're looking for and the element you found.\\n\\n<strong>For addTodo:</strong> The most common mistake is forgetting to clear the input after adding. The second most common is not validating for empty strings \\u2014 <code>if (!input.trim()) return;</code> stops empty todos.\\n\\n<strong>For localStorage:</strong> Save after every state-changing operation. Load on startup with <code>JSON.parse(localStorage.getItem('todos')) || []</code>. The <code>|| []</code> handles the case where nothing is saved yet \\u2014 without it, JSON.parse(null) throws an error.`,
        quiz: {
          question: "The to-do list stores todos in both a JavaScript array and the DOM. When a user deletes an item, you correctly remove its DOM element but forget to remove it from the todos array. What happens on the next page refresh?",
          options: ["The item is permanently deleted because the DOM update is authoritative", "The item reappears, because localStorage was saved from the array which still contains it", "Nothing \\u2014 the DOM and array don't affect each other", "A TypeError is thrown because the array and DOM are out of sync"],
          correct: 1,
          feedback: "The array is the source of truth. localStorage is saved from the array. On refresh, the saved data is loaded from localStorage and the list is re-rendered from the array. If the item was removed from the DOM but not from the array, it was saved to localStorage and will reappear on refresh. Always update the source of truth (the array) first, then update the DOM to reflect it."
        },
        checklist: ["I read all function stubs and comments before implementing anything", "The addTodo function correctly validates input, updates the array, and creates a DOM element", "The deleteTodo function removes items from both the array and the DOM", "The toggleComplete function updates both the array state and the DOM visual state", "The todos persist through page refresh using localStorage"],
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Complete the addTodo function so new items appear in the list", "Complete the deleteTodo function so items can be removed", "Complete the toggleComplete function so items can be marked done", "Add localStorage persistence so the list survives a page refresh"]
        }
      },
      {
        id: "3-11",
        title: "Solo Interactive Project",
        body: `No scaffold. No hints until you've spent 30 minutes trying on your own. The brief is intentionally open.\\n\\n<strong>Build something interactive that responds to user input.</strong> Ideas: a tip calculator, a colour picker, a character counter with a limit, a random quote generator, a unit converter, a password strength checker, a countdown timer. The complexity is yours to choose. The subject is yours to choose. But it must actually work.\\n\\nMinimum requirements: at least one input or button, JavaScript that reads from that input, and DOM manipulation that changes the page based on what the user does. Beyond that, the decisions are yours. How much to build, how polished to make it, what edge cases to handle.\\n\\nWhen you hit a wall \\u2014 and you will \\u2014 apply the debugging process. Read the error. Identify the line. Form a hypothesis. Test it with console.log. One change at a time.\\n\\nSearching for solutions is not cheating. Every professional developer searches. The skill is knowing what to search for, evaluating what you find, and integrating it into code you understand. If you copy something without understanding it, run it, break it, and figure out why. Understanding is the requirement, not original authorship.`,
        callout: {
          type: "default",
          label: "Choose Scope Deliberately",
          text: "The difference between a good solo project and a half-finished one is choosing a scope you can complete. A tip calculator that fully works is worth more than a social network that's 10% built. Constraint is not failure. Building something complete is the skill being practised here."
        },
        callout2: {
          type: "focus",
          label: "The 30-Minute Rule",
          text: "Spend at least 30 minutes genuinely attempting a problem before searching for a solution. Not 30 minutes of staring \\u2014 30 minutes of forming hypotheses, trying things, reading error messages, and narrowing down what's wrong. That process is the skill. The answer matters less than developing the ability to find it."
        },
        hint: `If you're completely blank on a project idea: open your phone, look at the last 10 apps you used. Every one of them takes input and produces output. A calculator. A unit converter. A text formatter. A colour tool. Pick the simplest one. Build the simplest version of it. Then add one feature. Then another.\\n\\n<strong>Feeling overwhelmed before you start?</strong> Open a file. Write the HTML scaffold. Add an h1 with the project name. That's it for the first five minutes. Momentum is built by starting, not by planning.\\n\\n<strong>Something works but looks broken?</strong> That's a CSS problem, not a JavaScript problem. Get the functionality completely working first \\u2014 correct output in the right elements. Then improve the appearance. Trying to fix both simultaneously is how sessions go nowhere.`,
        quiz: {
          question: "You find a Stack Overflow answer that solves your problem. You paste the code in and it works. What is the most important next step?",
          options: ["Nothing \\u2014 if it works, it works, and moving on is the right choice", "Delete the answer and write it yourself from memory to ensure you've understood it", "Read the code line by line until you can explain what each part does and why it works", "Add a comment crediting the Stack Overflow answer"],
          correct: 2,
          feedback: "Code you can't explain is code you don't own. It will behave unexpectedly when conditions change, and you won't know how to modify or debug it. Read it until you understand each line. Break it intentionally \\u2014 remove a line, change a value \\u2014 and observe what fails. Understanding a solution is the real goal, not just having one that runs."
        },
        checklist: ["I spent at least 30 minutes attempting the project before searching for anything", "The project responds to real user input", "I can explain every line of code I wrote or incorporated", "When I got stuck, I applied the debugging process systematically", "The project is complete enough that I'd show it to someone as an example of what I built"]
      },
      {
        id: "3-12",
        title: "Floor Check",
        body: `Before Floor 4, a hard check. Not "did you finish the sections" \\u2014 that's the minimum. The question is whether you actually understand what you built.\\n\\nFloor 4 has no guided building. You receive a brief and produce working code. There are no step-by-step walkthroughs. If you're missing foundations from Floor 3, Floor 4 will not teach them to you \\u2014 it will expose the gap and it will be harder to fill from there.\\n\\nSo before moving: can you explain the DOM to someone who has never coded? Not recite the definition \\u2014 explain it, with an example, in a way that would make sense to them. Can you write a function from memory that takes parameters, does something with them, and returns a value? Without looking anything up? Can you debug your own code? When something breaks, do you read the error, identify the line, form a hypothesis, and test it \\u2014 or do you change things randomly and hope?\\n\\nIf any of these feel shaky, spend another week on Floor 3 projects. Not re-reading sections \\u2014 building things. Build two more interactive projects. Build them without scaffolds. Debug the inevitable breakages. The foundation solidifies through doing, not through reviewing.\\n\\nIf you can answer all three questions clearly: you're ready. Floor 4 is waiting.`,
        callout: {
          type: "default",
          label: "Understanding vs Completion",
          text: "Completing sections and understanding concepts are different things. You can finish every section by reading and clicking without internalising anything. The check is whether you can use the knowledge independently \\u2014 produce something new without being walked through it. If you can, move on. If you can't, more projects are the prescription."
        },
        callout2: {
          type: "focus",
          label: "Another Week Is Not Failure",
          text: "Spending an extra week on Floor 3 because the foundations aren't solid is the smart choice. Rushing to Floor 4 with shaky fundamentals creates a debt that compounds. Every floor is built on the one before it. A solid Floor 3 makes Floor 4 easier. A shaky one makes every subsequent floor harder."
        },
        hint: `Three things to test right now, before deciding you're ready.\\n\\nOne: close this app, open a blank HTML file, and write a complete page with a JavaScript function that responds to a button click and modifies the DOM. No looking anything up. If you can do it, the fundamentals are there.\\n\\nTwo: take one of the projects you built this floor and add a feature that wasn't in the original. Something you have to figure out. If the process of figuring it out feels manageable, you're ready.\\n\\nThree: read someone else's short JavaScript snippet \\u2014 something you didn't write. Can you explain what it does line by line? If yes, you're reading code fluently enough for Floor 4.`,
        quiz: {
          question: "You've finished every Floor 3 section but when you try to build something from scratch you feel lost without the guided structure. What does this most accurately indicate?",
          options: ["You're ready for Floor 4 \\u2014 feeling uncertain at the start of new projects is normal for everyone", "The sections were too difficult and Floor 3 content needs to be simplified", "You've understood the concepts passively but haven't yet built the ability to apply them independently \\u2014 more project practice is needed before Floor 4", "Floor 4 will teach you to build independently so it's fine to proceed"],
          correct: 2,
          feedback: "Passive understanding (reading, following along) and active capability (building independently) are different skills that develop at different rates. The sections built passive understanding. Independent projects build active capability. If the second is missing, more project practice \\u2014 not more section reading \\u2014 is what closes the gap. Floor 4 assumes active capability. It does not build it from scratch."
        },
        checklist: ["I can explain the DOM to someone who has never coded, using a concrete example", "I can write a function from memory that takes parameters and returns a value", "I can debug broken JavaScript systematically, not by making random changes", "I've built at least two interactive projects without a scaffold", "I am confident I understand the material, not just that I completed the sections"]
      }
    ]
  }'''

output_path = '/tmp/floors_2_3.js'

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(floor_content)

char_count = len(floor_content)
print(f"Done. {char_count:,} characters written to {output_path}")
