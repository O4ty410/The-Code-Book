floor_content = '''  {
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
        body: `Professional developers don't memorise — they have a process. When they face a new problem, they break it down into the smallest possible piece, solve that piece, then move to the next. The first version doesn't need to be perfect. It needs to work. Then you improve it.\n\nOne of the most useful debugging techniques has a ridiculous name: rubber duck debugging. You explain your code, line by line, to an inanimate object. The act of explaining forces you to articulate assumptions you didn't know you were making. The bug usually reveals itself before you finish the sentence.\n\nThe 20-minute rule: try to solve something yourself for 20 minutes before searching. After 20 minutes of searching, ask someone. Both limits matter — the first builds genuine problem-solving capacity, the second prevents you from losing an hour to something a colleague could answer in 30 seconds.\n\nReading error messages properly is a skill most beginners skip. Every error has a type (what kind of error), a message (what went wrong in plain English), a file name, and a line number. The line number is where the error was <em>detected</em>, not always where the bug <em>is</em>. Stack traces show the chain of function calls that led to the error — read them from the bottom up.`,
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
        hint: `You're stuck and you don't know why the code isn't working. That is the normal state of development. It isn't a sign you're doing it wrong.\n\n<strong>Try this:</strong> Explain what the code should be doing, line by line, out loud. Don't skip lines. If you can't explain a line, that line is probably where the problem is.\n\n<strong>Still stuck?</strong> Read the error message in full before doing anything else. The error type tells you what category of problem it is. The message tells you what specifically went wrong. The line number tells you where to look. You have more information than you think.`,
        quiz: {
          question: "You see an error on line 47 of your code. What does this tell you about where the bug actually is?",
          options: ["The bug is definitely on line 47", "Line 47 is where the error was detected, but the actual mistake could be on an earlier line", "The bug is on a line after line 47", "The error message is unreliable and should be ignored"],
          correct: 1,
          feedback: "Line 47 is where JavaScript noticed something was wrong, not necessarily where you made the mistake. If a variable is misspelled on line 12, the error might only surface when you try to use it on line 47. Start at the reported line, then trace backwards through the call stack to find the root cause."
        },
        checklist: ["I understand the 20-minute rule", "I can read an error message and extract the type, message, and line number", "I understand what a stack trace is", "I've tried rubber duck debugging at least once", "I break problems into smaller pieces before writing code"]
      },
      {
        id: "4-2",
        title: "Reading Documentation",
        body: `MDN Web Docs is the authoritative reference for everything on the web. Not a blog post, not a Stack Overflow answer — MDN. It is maintained by Mozilla and browser vendors and reflects the actual specification. When you want to know how something works, MDN is where you go.\n\nReading documentation is a skill. A doc page has a consistent structure: description of what the thing is, syntax showing how to call it, parameters explaining what it accepts, return value describing what it gives back, and examples. Skim the structure first, then read the part that answers your specific question.\n\nSearching docs effectively means knowing what you're looking for. Searching "array remove item" in MDN gives you Array.prototype.splice() and Array.prototype.filter(). From there you can decide which fits your situation. Documentation is a reference, not a textbook — you look things up when you need them, not memorise them in advance.\n\nStack Overflow answers require more evaluation. Before trusting an answer: check when it was posted (a 2012 answer may use outdated syntax), check the vote count (highly voted answers are usually correct), and check whether the question matches your exact situation (the question might look similar but have a crucial difference).\n\nThe browser console is an underused sandbox. Any line of JavaScript can be typed directly into the console and run immediately. Before adding code to a file, test the concept in the console first. It saves the file-save, browser-refresh cycle entirely.`,
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
        hint: `You're reading a doc page and it makes no sense. That's normal. Documentation is written for people who already understand the basics — it's a reference, not a tutorial.\n\n<strong>Try this:</strong> Skip to the Examples section at the bottom. Read a working example first, then go back to the description. Code before theory makes the theory stick.\n\n<strong>Still stuck?</strong> Type the specific thing you want to do into the browser console. If it works, you understand it. If it errors, read the error. The console gives you immediate feedback that documentation can't.`,
        quiz: {
          question: "You find a Stack Overflow answer that perfectly matches your problem. It has 1,200 upvotes. Before using it, what should you check?",
          options: ["Nothing — 1,200 upvotes means it's definitely correct and up to date", "The date it was posted and whether the question describes exactly your situation", "Whether the answerer has a gold badge", "Whether the page has been viewed more than 10,000 times"],
          correct: 1,
          feedback: "Vote counts measure historical usefulness, not current accuracy. A JavaScript answer from 2013 may use var, callbacks, and patterns that have been superseded. Always check the date. Also verify the question actually matches your situation — similar-looking problems can have different root causes."
        },
        checklist: ["I know how to navigate MDN Web Docs", "I understand the structure of a documentation page", "I can evaluate a Stack Overflow answer critically", "I use the browser console to test code before adding it to a file", "I read documentation examples before reading descriptions"]
      },
      {
        id: "4-3",
        title: "What APIs Are",
        body: `APIs let your code talk to other systems. Every major product you use is built on top of other people's APIs. Uber doesn't build maps — it uses Google Maps API. Spotify doesn't build payment processing — it uses Stripe. Every "Login with Google" button you've ever clicked is an OAuth API call.\n\nREST APIs use the same HTTP methods your browser uses to load pages. GET retrieves data. POST creates something new. PUT or PATCH updates something existing. DELETE removes something. These four methods map onto the four database operations: read, create, update, delete.\n\nEvery API call goes to an <strong>endpoint</strong> — a URL that represents a specific resource or action. https://api.spotify.com/v1/tracks/123 is an endpoint that returns data about a specific track. The request goes out, the server processes it, and the response comes back with data and a status code.\n\nHTTP status codes tell you what happened: 200 means success, 201 means something was created, 400 means your request was malformed, 401 means you're not authenticated, 403 means you don't have permission, 404 means the resource doesn't exist, 500 means the server broke. Knowing these by feel speeds up debugging dramatically.\n\nAPIs speak in JSON — JavaScript Object Notation. It is the universal format for data exchange between systems: key-value pairs, arrays, nested objects. Any language on any platform can read it. That's why it won.`,
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
        hint: `You're calling an API and getting an error status code but don't know what it means.\n\n<strong>Try this:</strong> Look up the status code directly — "HTTP 422" in a search returns the exact meaning immediately. Then look at the response body — most APIs include a JSON error message explaining exactly what went wrong.\n\n<strong>Still stuck?</strong> Open the Network tab in DevTools. Find your API request, click it, and look at the Headers and Response tabs. You'll see the exact request that went out and the exact response that came back. This is the fastest way to diagnose any API problem.`,
        quiz: {
          question: "An API returns a 401 status code. What does this tell you about what went wrong?",
          options: ["The server crashed and needs to be restarted", "The resource you requested does not exist", "Your request did not include valid authentication credentials", "You have permission to read but not to write to this resource"],
          correct: 2,
          feedback: "401 Unauthorized means the server doesn't know who you are — no valid API key, token, or credentials were included in the request. 403 Forbidden means the server knows who you are but won't let you do this specific thing. 404 means the resource doesn't exist. 500 means the server failed."
        },
        checklist: ["I understand what an API is and why they exist", "I know the four HTTP methods and when to use each", "I can read and understand common HTTP status codes", "I understand what JSON is and what it looks like", "I understand what an API endpoint is"]
      },
      {
        id: "4-4",
        title: "Fetch and Async/Await",
        body: `The browser's fetch() function sends HTTP requests from JavaScript. When you search GitHub and results appear without a page reload, that's fetch() making API calls as you type.\n\nfetch() is <strong>asynchronous</strong> — it doesn't block the rest of your code while waiting for the server to respond. Instead, it returns a <strong>Promise</strong>: an object that represents a value that will be available in the future. When the response arrives, the Promise resolves and your code continues.\n\nasync/await is syntax that makes asynchronous code read like synchronous code. Mark a function as async, then use await before any operation that returns a Promise. The function pauses at that point, waits for the Promise to resolve, and continues. Under the hood it's still a Promise — async/await is just cleaner syntax on top.\n\nError handling in async functions uses try/catch. Wrap your await calls in try, and handle network failures or bad responses in catch. An unhandled async error silently fails — the user sees nothing, and the bug is invisible. Always handle errors in production code.\n\nA critical mistake: never try to use fetched data outside the async function without properly awaiting it. The data doesn't exist yet at the point the outer code runs — the Promise hasn't resolved. This is the number one source of undefined errors in code that makes API calls.`,
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
        hint: `Your fetch call returns undefined or a Promise object instead of the data you expected.\n\n<strong>Try this:</strong> Add console.log() immediately after each await line. If you see [object Promise] instead of your data, you're missing an await somewhere. If you see undefined, the data property you're accessing doesn't exist — console.log the whole response object first to see its actual shape.\n\n<strong>Still stuck?</strong> Open the Network tab in DevTools, find your fetch request, and look at the Response tab. That shows exactly what the API returned. Compare that structure to how you're accessing the data in your code.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Change the API call to fetch user ID 5 instead of 1", "Add error handling that shows a message if the fetch fails", "Display 3 more fields from the response object", "Add a loading indicator that shows while the fetch is in progress"]
        },
        quiz: {
          question: "Why can't you use data fetched from an API on the line immediately after calling fetch() without async/await?",
          options: ["Because fetch() only works inside event listeners", "Because fetch() is asynchronous — the data doesn't exist yet when the next line runs", "Because the data needs to be converted from binary before use", "Because fetch() requires a callback function to return data"],
          correct: 1,
          feedback: "fetch() starts a network request and returns immediately with a Promise — it doesn't wait for the response. The next line of code runs before the server has responded. To wait for the data, you must either use .then() chaining or mark the function as async and use await before fetch()."
        },
        checklist: ["I understand what asynchronous code means", "I can write a fetch call using async/await", "I handle errors with try/catch in async functions", "I understand that .json() is also async and needs to be awaited", "I never try to use fetched data outside the async context without proper handling"]
      },
      {
        id: "4-5",
        title: "Local Storage",
        body: `localStorage is the browser's built-in key-value store. Data saved to localStorage survives page refreshes and browser restarts — it persists until explicitly cleared. Medium uses it to save your draft article so you don't lose it if you close the tab by accident.\n\nlocalStorage stores strings only. Save a number or boolean and it becomes a string when you read it back. To save objects or arrays, use JSON.stringify() to convert them to a string before saving, and JSON.parse() to convert them back after reading.\n\nThe API is minimal: localStorage.setItem('key', value) to save, localStorage.getItem('key') to read (returns null if the key doesn't exist), localStorage.removeItem('key') to delete one item, localStorage.clear() to wipe everything.\n\nsessionStorage works identically but is cleared when the tab closes. The difference matters: use localStorage for things that should persist (user preferences, saved data), sessionStorage for things that should reset each session (temporary UI state, one-time notices).\n\nCommon use cases: dark mode preference (so the user doesn't have to toggle it every visit), draft content (so input isn't lost on refresh), cached API responses (so you don't re-fetch the same data), and shopping cart state (so items don't vanish on navigation).`,
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
        hint: `Your data disappears on page refresh even though you're using localStorage.\n\n<strong>Try this:</strong> Open DevTools, go to Application > Local Storage. You can see exactly what's stored, what keys exist, and what values they hold. If your key isn't there, setItem isn't running correctly — add a console.log just before it to confirm it's being called.\n\n<strong>Still stuck?</strong> The most common mistake is saving an object without JSON.stringify. localStorage.setItem('user', {name: 'Alex'}) saves the string '[object Object]' — completely useless. Always stringify objects before saving.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a clear all button that removes all saved notes", "Add a timestamp to each saved note", "Add a character count that updates as the user types", "Make the notes list sortable by date saved"]
        },
        quiz: {
          question: "You save an array to localStorage with localStorage.setItem('items', myArray). When you retrieve it with getItem, what do you get?",
          options: ["The original array, ready to use", "The string '[object Array]'", "The array converted to a comma-separated string", "null, because localStorage cannot store arrays"],
          correct: 1,
          feedback: "localStorage coerces anything that isn't a string using .toString(). An array's toString() returns '[object Array]'. To save an array properly, use JSON.stringify(myArray) before saving. To retrieve it, use JSON.parse(localStorage.getItem('items')). Skipping this step is one of the most common localStorage bugs."
        },
        checklist: ["I understand what localStorage persists and what it doesn't", "I use JSON.stringify and JSON.parse with objects and arrays", "I know the difference between localStorage and sessionStorage", "I can read and clear localStorage using DevTools", "I can name three appropriate use cases for localStorage"]
      },
      {
        id: "4-6",
        title: "Error Handling at Scale",
        body: `try/catch is not optional in production code. The question is not whether errors will happen — they will. The question is whether your application handles them gracefully or crashes silently and confuses the user.\n\nThere are two categories of error. <strong>Expected errors</strong> are things you anticipate: the user enters invalid input, the network times out, the API returns no results. These should be handled explicitly with informative messages. <strong>Unexpected errors</strong> are bugs: null pointer exceptions, type mismatches, logic errors. These should be caught, logged, and surfaced in a way that doesn't expose your internals to users.\n\nDefensive programming means checking that data exists before trying to use it. If an API response might not include a nested property, don't access it directly — use optional chaining: user?.address?.city returns undefined instead of throwing a TypeError when address doesn't exist.\n\nNullish coalescing (??) provides fallback values for null or undefined. user?.name ?? 'Anonymous' returns 'Anonymous' if name is null or undefined, but returns the actual name otherwise. It's more precise than || because || also triggers on 0 and empty string, which are valid values.\n\nProduction applications fail gracefully. When Spotify can't load your playlist, it shows a retry button — not a blank screen, not a stack trace. The user should always know what happened and what they can do about it.`,
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
        hint: `Your code crashes when the API returns unexpected data, but you're not sure where to add the error handling.\n\n<strong>Try this:</strong> Find every place you access a property on data that came from an API. Ask: what happens if this property doesn't exist? Add optional chaining (?.) to every nested property access. Then add ?? fallbacks wherever you need a default value.\n\n<strong>Still stuck?</strong> Add console.log(data) before any property access to inspect the full shape of what you're working with. API responses often differ from the documentation in edge cases.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a case that handles when the API returns no results", "Wrap the main function in try/catch and display a friendly error message", "Use optional chaining to safely access a nested property that might not exist", "Add a retry button that re-runs the failed operation"]
        },
        quiz: {
          question: "What does the optional chaining operator (?.) do in the expression data?.user?.name?",
          options: ["It makes the expression run asynchronously", "It checks if data is optional before proceeding", "It safely accesses nested properties, returning undefined instead of throwing if any step is null or undefined", "It creates optional parameters in a function definition"],
          correct: 2,
          feedback: "Optional chaining stops the property access chain early and returns undefined if any value in the chain is null or undefined, rather than throwing a TypeError. data?.user?.name is equivalent to: data && data.user && data.user.name — but shorter and clearer. Essential when working with API data where any nested property might be absent."
        },
        checklist: ["I use try/catch in all async functions", "I distinguish between expected and unexpected errors", "I use optional chaining when accessing nested API data", "I use nullish coalescing to provide fallback values", "My error states show users something useful, not a blank screen"]
      },
      {
        id: "4-7",
        title: "Git and Version Control",
        body: `Git is non-negotiable. Every professional developer uses it every day. If it's not in Git, it doesn't exist. A file on your hard drive that isn't committed is a file that can be lost.\n\nThe core workflow: git init to start tracking a folder. git add filename (or git add . for everything) to stage changes. git commit -m "describe what you did" to save a snapshot. git push to send it to GitHub. That four-command sequence is 90% of day-to-day Git.\n\nBranches let you work on something new without breaking what already works. git checkout -b feature/new-thing creates a new branch and switches to it. Work there, commit there. When it's ready, merge it back with git merge. If the same line was changed in both branches, that's a merge conflict — Git will mark the conflict and you resolve it manually.\n\nCommit messages matter. "fixed stuff" tells your future self nothing. "fix: prevent crash when API returns empty array" tells your future self exactly what changed and why. The history of your commit messages is the history of your thinking. Write them accordingly.\n\nThe GitHub workflow for team projects: fork the repo, clone your fork, create a branch, make commits, push the branch, open a pull request. The pull request is where code gets reviewed before it's merged into the main codebase.`,
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
        hint: `You made a commit with a mistake and want to undo it.\n\n<strong>Try this:</strong> If the commit isn't pushed yet, git reset HEAD~1 moves the commit back to staged changes. You can fix the mistake and recommit. If it's already pushed and others may have pulled it, use git revert HEAD instead — this creates a new commit that undoes it safely.\n\n<strong>Still stuck?</strong> Run git log to see your commit history. Each commit has a hash (a long string like a3f9d2b). git revert <hash> undoes that specific commit. git diff <hash> shows what changed in it.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Write a commit message for each of these changes: adding a new feature, fixing a bug, updating documentation", "Create a new branch called 'feature/dark-mode' using git checkout -b", "Explain in plain English what git merge does and what a merge conflict is", "Write the exact sequence of git commands to push your first project to GitHub"]
        },
        quiz: {
          question: "You're working on a new feature and you want to make sure it doesn't break the existing working code. What's the correct Git approach?",
          options: ["Edit the files directly on the main branch and commit as you go", "Create a new branch for the feature, work on it there, and merge when it's ready", "Create a copy of the entire project folder and work in that", "Delete the old code before writing the new feature"],
          correct: 1,
          feedback: "Branches exist exactly for this: isolate work-in-progress from working code. Create a branch, make commits on it, and only merge when the feature is tested and working. The main branch should always be in a deployable state. Working directly on main without branching is how teams break each other's work."
        },
        checklist: ["I have Git installed and configured", "I have a GitHub account with at least one project pushed", "I write descriptive commit messages", "I understand what branches are and when to use them", "I know how to view commit history with git log"]
      },
      {
        id: "4-8",
        title: "Debugging Like a Developer",
        body: `Debugging is a systematic process, not a random one. The instinct to change things and hope something improves is the most expensive debugging habit you can have — it wastes time, introduces new bugs, and teaches you nothing.\n\nThe correct process: first, reproduce the bug reliably. A bug you can't reproduce consistently is a bug you can't fix confidently. Then isolate where it breaks. Then fix the root cause, not the symptom.\n\nThe DevTools debugger in the Sources tab is more powerful than console.log for complex bugs. Set a breakpoint by clicking a line number. When code execution hits that line, it pauses. You can then step over (run the next line), step into (go inside a function call), or step out (finish the current function and return). You can inspect every variable's value at that exact moment.\n\nconsole.log is not embarrassing. Every developer at every level uses it. The art is in knowing where to put it and what to log. Log variable values at key points in your logic. Log the start and end of functions you're unsure about.\n\nThe Network tab shows every request your page makes and the exact response that came back. When an API call isn't working, the Network tab shows you whether the request was even sent, what URL it went to, what headers were included, and what the server returned. This eliminates guessing.\n\nThe most important debugging habit: change one thing at a time. Change two things simultaneously and you don't know which one fixed it or which one caused the new problem.`,
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
        hint: `Something is broken but you can't figure out where the problem is.\n\n<strong>Try this:</strong> Add console.log('reached here', variableName) at key points in your code. Run it and watch the console. The last log that prints before the error tells you which section the bug is in. Then narrow it down further with more logs.\n\n<strong>Still stuck?</strong> Open DevTools Sources tab, find your script, and click the line number where you think the problem might be to set a breakpoint. Run the code and when it pauses, look at the Scope panel on the right — it shows every variable's current value. This is often faster than reasoning about what might be wrong.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Use the debugger to step through the code and find where the wrong value is assigned", "Fix all three bugs in the code — each bug is a different type (reference, type, logic)", "Add console.log statements to trace the exact value of the variable at each step", "Open the Network tab in DevTools, reload the page, and identify all the resources it loads"]
        },
        quiz: {
          question: "You change three things at once trying to fix a bug, and the bug disappears. What problem does this create?",
          options: ["No problem — fixing the bug is all that matters regardless of how", "You don't know which of the three changes fixed it, making future debugging harder", "The other two changes will definitely cause new bugs", "You need to revert to zero changes and start again from scratch"],
          correct: 1,
          feedback: "If you fix a bug by changing three things simultaneously, you've learned nothing about what caused it. When a similar bug appears later, you have no basis for diagnosing it. Worse, you might have introduced subtle problems with the two changes that weren't needed. Change one thing, test, understand what changed. This habit compounds over time."
        },
        checklist: ["I reproduce bugs reliably before trying to fix them", "I change one thing at a time when debugging", "I can set and use breakpoints in DevTools", "I read error messages in full before changing anything", "I use the Network tab to diagnose API problems"]
      },
      {
        id: "4-9",
        title: "Weather App with Real API",
        body: `This is your first real application using a real external API. The OpenWeatherMap API is free, well-documented, and used by thousands of real applications. The scaffold connects to the API and displays current weather — your job is to extend it.\n\nThis is exactly how professional development works. You inherit a codebase. You read it. You understand it. You extend it. The difference between a junior and senior developer is not who writes things from scratch — it's who reads, understands, and extends code more effectively.\n\nRead every line of the scaffold before changing anything. Understand what each function does. Understand what data the API returns by checking the Network tab when you run it. Then extend it. Make it yours.\n\nReal APIs have real constraints: rate limits (you can only make a certain number of requests per hour), authentication requirements (your API key goes in the request, not the code you commit to GitHub), and data formats that can change. These are not hypothetical concerns — they are things you will hit in the first hour of working with a real API.`,
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
        hint: `The app isn't showing data and you can't tell if it's the API call or the display code.\n\n<strong>Try this:</strong> Open the Network tab in DevTools and run the app. Find the API request. Check the status code first — 200 means it reached the API, anything else means the call failed. If it's 200, click the request and look at the Response tab to see the raw JSON the API returned. Now you know whether the problem is the fetch or the display.\n\n<strong>Still stuck?</strong> Add console.log(data) right after you receive the API response. Look at the actual shape of what came back and compare it to what your display code expects. APIs don't always match documentation exactly.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a 5-day forecast section below the current weather", "Add weather icons using the icon code from the API response", "Add a toggle between Celsius and Fahrenheit", "Save the last 3 searched cities to localStorage and show them as quick-access buttons"]
        },
        quiz: {
          question: "The weather app shows no data and throws no errors. What should you do first?",
          options: ["Rewrite the fetch function from scratch", "Open the Network tab in DevTools to see if the API request was made and what it returned", "Check the CSS to see if the data might be hidden", "Add more console.log statements randomly until something appears"],
          correct: 1,
          feedback: "Silent failures in network requests are almost always visible in the Network tab. It shows whether the request was sent, what URL it went to, what the response status code was, and what data came back. This is the fastest way to separate a network/API problem from a display/logic problem."
        },
        checklist: ["I read the full scaffold before making any changes", "I understand the data structure the API returns", "I extended the app with at least one new feature", "I handle the case where the city isn't found", "The app works with different city names"]
      },
      {
        id: "4-10",
        title: "Quiz App with Score Tracking",
        body: `A quiz app is more complex than it looks. It has <strong>state</strong>: the current question index, the score, whether the user has answered the current question. It has multiple <strong>UI states</strong>: showing a question, showing answer feedback, showing results. Managing state and driving UI from it is the fundamental challenge of interactive application development.\n\nThis is the kind of stateful thinking that React, Vue, and Angular formalise with hooks, reactive properties, and components. Understanding how to manage it in vanilla JavaScript first means you'll understand those frameworks at a conceptual level, not just a syntactic one. You'll know why they exist, not just how to use them.\n\nThe scaffold handles the rendering. Your job is to implement the state logic: what happens when an answer is selected, how the score is updated, when to advance to the next question, when to show results. Every piece of the logic should update state first, then re-render from that state. Never update the DOM directly without first updating the underlying data.\n\nThe relationship between state and UI is: state is the truth, DOM is the display of that truth. When state changes, the DOM should be regenerated from state. When the DOM changes, state should update first. This single discipline prevents an entire category of synchronisation bugs.`,
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
        hint: `The quiz is advancing to the next question before the user can see the feedback.\n\n<strong>Try this:</strong> Add a small delay before calling nextQuestion(), or better, show a "Next" button that only appears after the answer is checked. The user should explicitly advance, not have it happen automatically. This is also a better user experience — it gives them time to read the feedback.\n\n<strong>Still stuck?</strong> Log the state variables (currentIndex, score, answered) to the console at the start of every function that modifies them. If the values aren't what you expect, you'll see exactly where state is diverging from your intention.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a progress bar that fills as the user progresses through questions", "Add a timer that counts down from 30 seconds per question", "Add a high score tracker using localStorage", "Add a review screen at the end showing each question and the user's answer"]
        },
        quiz: {
          question: "In a quiz app, the score keeps incrementing every time the user clicks, even after they've already answered. What state variable is missing?",
          options: ["A variable tracking how many questions are left", "A boolean that tracks whether the current question has already been answered", "A timer that prevents clicks for 2 seconds after each answer", "A counter tracking how many times each option was clicked"],
          correct: 1,
          feedback: "An 'answered' boolean (initially false, set to true when the user first clicks) is the standard guard against multiple submissions. At the start of your click handler: if (answered) return; answered = true; then process the answer. This is called a state guard — it prevents the system from entering an invalid state."
        },
        checklist: ["I understand what application state is", "I update state before updating the DOM", "I handle the answered state to prevent multiple submissions", "The quiz shows correct feedback for right and wrong answers", "The final score is accurate"]
      },
      {
        id: "4-11",
        title: "Solo Project — No Brief",
        body: `No brief. No scaffold. No requirements beyond this: build something that uses a real external API.\n\nIt must make at least one fetch request and display real data. The idea, the design, the implementation — all yours. This is the first time in this course that nothing is given to you.\n\nStuck for ideas? GitHub's API lets you search repositories and display star counts and descriptions. The NASA API has photos from Mars taken by the Curiosity rover, updated daily. The Dictionary API can power a word lookup tool. The Open Library API has data on millions of books. The CocktailDB has thousands of cocktail recipes. Any of these work.\n\nThe constraint is the point. Working with real external data forces you to handle things that don't exist in contrived examples: missing properties, unexpected response shapes, rate limits, API keys, authentication. These are the problems you'll solve every day as a professional.\n\nThe project doesn't have to be impressive. It has to be finished and working. A working, deployed tool that shows real API data is worth more than an ambitious unfinished one.`,
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
        hint: `You have an idea but you can't get the API to return data.\n\n<strong>Try this:</strong> Test the API URL directly in your browser before writing any code. If it's a GET endpoint with no authentication, paste the URL into the browser address bar. You should see the raw JSON response. If you see an error there, the problem is the URL or the API key — not your JavaScript.\n\n<strong>Still stuck?</strong> Use the API's official documentation examples first, unchanged. Get those working. Then modify them step by step to return the data you actually want. Don't write custom code until you understand what the API returns.`,
        quiz: {
          question: "You're building a project with a public API and getting a 401 error on every request. What is the most likely cause?",
          options: ["The API server is down", "You're missing or incorrectly sending an API key", "Your JavaScript has a syntax error", "The API doesn't support the data format you're requesting"],
          correct: 1,
          feedback: "401 Unauthorized means the server received your request but doesn't recognise you as an authorised caller. Most public APIs require an API key to be sent in a header or as a query parameter. Check the API documentation for exactly how it expects the key to be sent — the format varies by API."
        },
        checklist: ["I chose an API and read its documentation", "I made a working fetch call and confirmed the response shape", "I built a UI that displays the real data", "I handle loading and error states", "The project is deployed and accessible via URL"]
      },
      {
        id: "4-12",
        title: "Code Review of Own Work",
        body: `Take every project you've built on Floor 4. Review each one as if it belongs to a colleague you've never met — not to you. Remove the emotional attachment to your decisions and ask the questions a reviewer would ask.\n\nCan someone unfamiliar with this code understand what it does in five minutes? If not, the naming or structure is the problem. Are there functions doing more than one thing? Split them. Are error cases handled? Add them. Is there repetition that a function could eliminate? Refactor it. Are variable names descriptive enough to replace comments? If you need a comment to explain what a variable is, the variable name is wrong.\n\nWrite down one genuine improvement for each project. Not a vague note — a specific change: "rename variable x to userSearchQuery", "extract the renderCard logic into a separate function", "add error handling to the fetch call in getWeatherData". Then implement at least three of them.\n\nCode review is where you stop being a person who writes code and start being a person who thinks about code. The most valuable developers on any team are not the fastest typists — they're the ones who catch problems before they become production incidents. That skill starts here, reviewing your own work with honesty.`,
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
        hint: `You're looking at your own code and everything seems fine — you understand it perfectly.\n\n<strong>Try this:</strong> Leave the code for 48 hours without looking at it. Come back and read it as if you wrote it a year ago. The things that are actually unclear will reveal themselves immediately when the memory of writing it fades.\n\n<strong>Still not sure what to improve?</strong> Apply one test to every function: cover the body and read only the name. Without reading the implementation, can you predict what it does and what it returns? If not, the name needs work.`,
        quiz: {
          question: "You're reviewing a function called processData() that is 60 lines long and handles fetching, parsing, validating, and displaying results. What is the main problem?",
          options: ["The function is too long — it needs to be shortened by removing some functionality", "The function has too many responsibilities — it should be split into four separate functions", "The function name is fine because it accurately describes processing data", "The function should be replaced with a class that has separate methods"],
          correct: 1,
          feedback: "A function that handles fetching, parsing, validating, and displaying has four responsibilities. The single responsibility principle says each function should do one thing. Split it: fetchData(), parseResponse(), validateInput(), displayResults(). Each part is now independently testable, readable, and replaceable — the name tells you exactly what it does."
        },
        checklist: ["I reviewed all Floor 4 projects as if reading a colleague's code", "I identified at least one real improvement per project", "I implemented at least three improvements", "My functions have descriptive names that don't require reading the body to understand", "Error cases are handled in each project"]
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
        body: `Full stack means you can build the complete system: <strong>frontend</strong> (what the user sees), <strong>backend</strong> (what the server runs), and <strong>database</strong> (where data lives). Each layer has a distinct responsibility and a distinct set of technologies.\n\nFrontend is HTML, CSS, and JavaScript running in the browser. The browser downloads these files from the server and executes them locally on the user's machine. This is what you've been building. It's what Instagram's photo grid is, what Airbnb's search page is.\n\nBackend is code running on a server — Node.js, Python, Go, Java, or dozens of other languages. The user never sees this code and can never modify it. This is where business logic lives, where authentication happens, where data is validated before it touches a database.\n\nThe database is where data persists after the user leaves. Without a database, every user's data disappears when they close the browser. With one, it's there when they return — across devices, across time.\n\nThe HTTP request cycle across the full stack: browser sends a request → server receives it, authenticates the user, queries the database, formats the response → database returns data to the server → server returns formatted response to browser → browser renders what the user sees.\n\nThe separation matters for three reasons: security (you never trust the browser to validate data), scale (servers handle thousands of simultaneous users), and persistence (data survives after the user leaves).`,
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
        hint: `You're confused about which layer handles what.\n\n<strong>Try this:</strong> Take any feature of an app you use daily. Ask three questions: does this run in the browser, on a server, or in a database? Login button click = browser. Password verification = server. Stored password hash = database. Tracing features through layers builds the mental model faster than any explanation.\n\n<strong>Still fuzzy?</strong> The rule of thumb: anything that must be secure, private, or persistent goes on the server or database. Anything that's just about what the user sees and interacts with goes in the browser.`,
        quiz: {
          question: "A user submits a payment form on an e-commerce site. Where must the actual payment processing happen and why?",
          options: ["In the browser's JavaScript, for the fastest user experience", "On the server, because JavaScript in the browser can be modified by anyone", "In the database, because it needs to persist", "In the browser's localStorage for security"],
          correct: 1,
          feedback: "Payment processing must happen server-side. Any JavaScript in the browser can be read, modified, and re-sent by someone with DevTools. A user could modify the price, skip validation, or steal API keys. The server is a controlled environment the user cannot modify. This applies to any security-sensitive operation: authentication, authorisation, payment, data validation."
        },
        checklist: ["I can describe the role of frontend, backend, and database", "I understand why sensitive logic must live on the server", "I understand the full HTTP request cycle from browser to database and back", "I can give three examples of what belongs server-side vs client-side", "I understand why data persistence requires a database"]
      },
      {
        id: "5-2",
        title: "How Servers Work",
        body: `A server is a computer running continuously, waiting for HTTP requests. When a request arrives, it goes to the right piece of code based on the URL and HTTP method, that code runs, and the response goes back. That's it. Everything else is detail.\n\nA web server handles <strong>routing</strong>: mapping URLs and methods to code. When a GET request arrives for /users/123, what code runs? The router matches the URL pattern and calls the corresponding handler function. Handler functions receive a request object (the incoming data) and a response object (the channel to send data back).\n\n<strong>Middleware</strong> is code that runs before your route handlers. Authentication middleware runs first — if the user isn't logged in, the request never reaches the route. Logging middleware records every request. Request parsing middleware converts the raw request body into usable JavaScript objects. Middleware runs in a chain; each piece decides whether to pass the request along or end it.\n\nThe distinction between server types matters as applications grow. A web server handles HTTP and routing. An application server runs business logic. A database server stores and retrieves data. In small applications, all three often run on the same machine. At Instagram's scale, each is a separate fleet of hundreds of servers.\n\nPorts: a server listens on a specific port number. Port 80 is HTTP, 443 is HTTPS, 3000 and 8080 are common development defaults. When you visit http://localhost:3000, you're connecting to port 3000 on your own machine.`,
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
        hint: `You're building a server route but the request isn't reaching your handler.\n\n<strong>Try this:</strong> Add console.log('Route hit') as the very first line of your handler. If it doesn't print, the request isn't matching your route. Check: is the HTTP method correct (GET vs POST)? Is the URL path exact? Is there middleware before it that might be blocking?\n\n<strong>Still stuck?</strong> Add a catch-all route at the very bottom: app.use((req, res) => res.status(404).send('Not found: ' + req.path)). This catches any request that didn't match a defined route and tells you exactly what URL the server is seeing.`,
        quiz: {
          question: "Authentication middleware is registered before route handlers in an Express app. A request arrives for a protected route. What is the correct order of execution?",
          options: ["Route handler runs first, then auth middleware verifies the result", "Auth middleware runs, checks the credentials, and either passes the request to the route handler or rejects it", "Both run simultaneously in parallel", "Auth middleware runs after the route handler returns data"],
          correct: 1,
          feedback: "Middleware executes in the order it's registered, before route handlers. Authentication middleware checks credentials and calls next() to pass to the route handler if valid, or sends a 401 response directly if not. The route handler only runs if middleware allows it through. This is the gatekeeper pattern — protect the resource before the handler ever runs."
        },
        checklist: ["I understand what a server does and how routing works", "I understand what middleware is and what it's used for", "I understand the request and response objects", "I know the difference between web server, application server, and database server", "I understand what ports are"]
      },
      {
        id: "5-3",
        title: "Databases",
        body: `Every application that stores user data has a database. The database's job is to persist data reliably, retrieve it quickly, and enforce data integrity.\n\nThe two main categories: <strong>relational databases</strong> (PostgreSQL, MySQL, SQLite) store data in tables with rows and columns. Relationships between tables are defined by foreign keys: a posts table has a user_id column that references the users table. SQL is the language for querying them.\n\n<strong>Document databases</strong> (MongoDB, Firestore) store data as JSON-like documents. There's no fixed schema — different documents in the same collection can have different fields. Flexible, but at the cost of enforced structure.\n\nSQL commands you need to know: SELECT (retrieve data), INSERT (add data), UPDATE (modify data), DELETE (remove data). With WHERE clauses to filter, ORDER BY to sort, JOIN to combine tables, and LIMIT to paginate. These are the tools for 90% of database work.\n\n<strong>Indexes</strong> are how databases stay fast as data grows. Without an index, a query scans every row in the table. With an index on the column you're filtering by, the database finds matching rows in milliseconds. Add indexes on columns you query frequently, especially foreign keys.\n\n<strong>ACID</strong> properties guarantee data integrity: Atomicity (a transaction either fully succeeds or fully fails, never halfway), Consistency (the database stays in a valid state), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). When a bank transfer fails halfway through, ACID properties ensure neither account is left in an inconsistent state.`,
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
        hint: `Your database query is returning wrong or unexpected results.\n\n<strong>Try this:</strong> Run the query directly in the database tool (pgAdmin for PostgreSQL, Compass for MongoDB) before running it through your application code. If the query is wrong there, it's a SQL problem. If it's correct there but wrong in your app, it's a code problem. Isolate the layer first.\n\n<strong>Still stuck?</strong> Add a LIMIT 5 clause to your SELECT to see a small sample of results. Check the actual data that's in the table — sometimes the issue is that the data was never inserted correctly, or was inserted with the wrong values.`,
        quiz: {
          question: "A bank transfer involves debiting one account and crediting another. The server crashes after the debit but before the credit. What database property prevents both accounts from ending up in an inconsistent state?",
          options: ["Indexing — fast lookups ensure both operations complete before timeout", "Atomicity — the transaction either fully completes or fully rolls back, never partially", "Isolation — other transactions can't see the debit until the credit is complete", "Durability — the data is written to disk immediately"],
          correct: 1,
          feedback: "Atomicity means all operations in a transaction succeed together or fail together. If the credit operation fails (or the server crashes before it), the debit is automatically rolled back. The database returns to the state before the transaction started. This is why financial applications use ACID-compliant relational databases, not eventually-consistent document stores."
        },
        checklist: ["I understand the difference between relational and document databases", "I can write basic SELECT, INSERT, UPDATE, DELETE queries", "I understand what indexes are and when to use them", "I can explain the ACID properties", "I understand when to use SQL vs NoSQL"]
      },
      {
        id: "5-4",
        title: "Authentication",
        body: `Authentication is proving who you are. Authorisation is proving what you're allowed to do. The distinction matters: you can be authenticated (the server knows you're Alex) but not authorised (Alex doesn't have admin access). These are two separate checks.\n\nThe session-based approach: after login, the server creates a session record in a database and sends a session ID to the browser in a cookie. Every subsequent request includes that cookie. The server looks up the session ID to identify the user. Sessions are revocable: delete the session record and the user is logged out everywhere.\n\nThe token-based approach (JWT): after login, the server creates a signed token containing the user's ID and sends it to the client. The client stores it (usually in memory or localStorage) and sends it in the Authorization header of every subsequent request. The server verifies the signature — no database lookup needed. JWTs expire but can't be revoked before expiry without additional infrastructure.\n\nPassword storage: you never, under any circumstances, store plain text passwords. If your database is compromised and passwords are plain text, every user's password is exposed. You store a hash: a one-way transformation of the password. bcrypt is the standard — it's deliberately slow (to make brute-force attacks expensive) and adds a random salt (to prevent rainbow table attacks).\n\nOAuth: "Login with Google" delegates authentication to a trusted provider. Google verifies the user's identity and tells your application who it is. You never handle the password. This is the right approach for any application where managing credentials securely is more complexity than you want to take on.`,
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
        hint: `Users are getting logged out unexpectedly or tokens aren't working.\n\n<strong>Try this:</strong> Decode your JWT at jwt.io (it's a public tool for inspection). Check the exp field — it's a Unix timestamp showing when the token expires. If tokens expire faster than expected, check that the server clock is accurate (time drift breaks JWT validation).\n\n<strong>Still stuck?</strong> Log the Authorization header on the server for every request. If it's missing, the client isn't sending it — check the fetch call. If it's there but invalid, the server-side verification code has an issue — check the secret key.`,
        quiz: {
          question: "A user's JWT token is compromised. The token expires in 7 days. What is the fundamental limitation of JWT-based authentication in this scenario?",
          options: ["Nothing — the server can delete the token from its database to invalidate it immediately", "The token cannot be revoked before its expiry time without additional infrastructure like a token blocklist", "The user must change their password to invalidate the token", "JWTs can be recalled remotely by the token issuer at any time"],
          correct: 1,
          feedback: "JWTs are stateless — the server doesn't store them, so there's nothing to delete. Any request with a valid, unexpired JWT will be accepted, even if the token was stolen. To immediately revoke a JWT, you need a server-side blocklist of invalidated tokens, which reintroduces statefulness. This is JWT's main trade-off compared to session-based auth where you just delete the session record."
        },
        checklist: ["I understand the difference between authentication and authorisation", "I understand session-based vs token-based authentication", "I know why passwords must be hashed and what bcrypt does", "I understand what OAuth is", "I would use an existing library rather than building auth from scratch"]
      },
      {
        id: "5-5",
        title: "Node and Express",
        body: `Node.js runs JavaScript on the server. The same language you've been writing in the browser now runs outside it — with access to the filesystem, the network, and the ability to listen for HTTP connections. No DOM, no window object, but full access to the operating system.\n\nExpress is the most widely used Node.js web framework. It provides routing, middleware, and request/response handling. The core concept: register handlers for HTTP method + path combinations. When a matching request arrives, the handler runs.\n\nThe request object (req) contains everything about the incoming request: req.params for URL parameters (/users/:id makes id available on req.params), req.query for query string parameters (?page=2 makes page available on req.query), req.body for the request body (POST/PUT data, after body-parser middleware), req.headers for HTTP headers including Authorization.\n\nThe response object (res) is how you send data back: res.json(data) sends JSON with a 200 status, res.status(404).json({error: 'Not found'}) sends an error, res.send() for plain text.\n\nMiddleware with app.use() runs before route handlers. Order matters: body parser before routes that need req.body, auth middleware before protected routes, error handler after all routes.\n\nGitHub's API, Stripe's API, Shopify's API — all built on frameworks equivalent to Express. Every endpoint you call as a developer is a route handler like the ones you're about to write.`,
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
        hint: `Your Express route isn't receiving the data you're sending from the frontend.\n\n<strong>Try this:</strong> Add console.log('Headers:', req.headers, 'Body:', req.body) at the top of your route handler. If body is undefined, you're missing body-parsing middleware. If headers don't include Content-Type: application/json, the client isn't sending JSON correctly. Both of these are fixable in one line.\n\n<strong>Still stuck?</strong> Test the route directly with Postman or Thunder Client before connecting the frontend. Send the exact request you expect the frontend to send. If it works in Postman but not from the browser, the problem is in the frontend fetch call, not the server.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a new GET route for /api/products that returns an array of product objects", "Add middleware that logs the request method and path for every request", "Add a POST route that reads data from req.body and returns it back", "Add a 404 handler for any route that doesn't match the defined routes"]
        },
        quiz: {
          question: "An Express route needs to read data from the request body sent by a POST request. req.body is undefined. What is missing?",
          options: ["The route needs to be registered before app.listen()", "Body-parsing middleware (app.use(express.json())) is not registered before the route", "POST requests don't support body data in Express", "The route handler needs to manually parse req.rawBody"],
          correct: 1,
          feedback: "Express doesn't parse request bodies by default. app.use(express.json()) must be registered before any route that reads req.body. It reads the raw request body, parses it as JSON, and attaches the result to req.body. Without it, req.body is undefined for all routes. Register it near the top of your app, before route definitions."
        },
        checklist: ["I can start a basic Express server", "I can write GET and POST route handlers", "I understand req.params, req.query, req.body, and req.headers", "I can add middleware with app.use()", "I can send JSON responses with correct status codes"]
      },
      {
        id: "5-6",
        title: "Connecting to a Database",
        body: `The connection between your server and database is managed by a client library. For PostgreSQL, pg or Prisma. For MongoDB, Mongoose. The library handles the connection, translates your code into database queries, and returns results as JavaScript objects.\n\n<strong>Connection pooling</strong> is critical for performance. Opening a new database connection for every request takes 50-200ms and has an upper limit on concurrent connections. A connection pool maintains a set of open connections that are reused. pg and Prisma handle this automatically when configured correctly.\n\nThe decision between an ORM (Object-Relational Mapper) and raw SQL has real trade-offs. ORMs like Prisma let you write JavaScript that generates SQL — faster to write, database-agnostic, but hides complexity and can generate inefficient queries. Raw SQL gives you precise control and transparency but requires writing more code. Know both. Use ORMs for productivity, drop to raw SQL for performance-critical queries.\n\n<strong>Database transactions</strong> are essential when multiple operations must succeed or fail together. Transferring money between two accounts requires both the debit and credit to succeed — if the credit fails after the debit, the transaction rolls back and both accounts return to their original state. Without transactions, partial writes corrupt your data.\n\nProfile before optimising. The query that looks slow might be fast. The query that looks simple might be doing a full table scan. Add EXPLAIN ANALYZE before any PostgreSQL query to see exactly what the database is doing and where time is spent.`,
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
        hint: `Your database queries are working in isolation but failing when called from your Express routes.\n\n<strong>Try this:</strong> Test each database function in isolation with a small test script before integrating with the server. If the function works standalone but fails in the route, the problem is usually that you're not awaiting an async function, or an error isn't being caught.\n\n<strong>Still stuck?</strong> Add try/catch to every database function and log the full error including the error.code. PostgreSQL error codes are specific — 23505 means a unique constraint violation (duplicate data), 23503 means a foreign key violation (referencing a row that doesn't exist). The code tells you exactly what's wrong.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Write a function that retrieves a single user by ID", "Write a function that creates a new user and returns the created record", "Add error handling for when the user is not found (return 404)", "Write a transaction that creates a post and increments the author's post count atomically"]
        },
        quiz: {
          question: "You need to create a new order and deduct the items from inventory. If the inventory update fails, the order should not be created. What database feature handles this?",
          options: ["A foreign key constraint that links the order to the inventory table", "A database transaction that wraps both operations and rolls back if either fails", "A trigger that automatically runs when an order is created", "An index on the inventory table to speed up the update"],
          correct: 1,
          feedback: "A transaction wraps multiple operations into a single atomic unit. BEGIN starts the transaction, you run both the INSERT and the UPDATE, and COMMIT applies both permanently. If any operation fails, ROLLBACK undoes everything — the database returns to its state before BEGIN. This is how all multi-step operations that must stay consistent are handled."
        },
        checklist: ["I can connect to a database from a Node.js application", "I understand connection pooling", "I can write CRUD queries using a database client", "I understand when to use transactions", "I understand the trade-offs between ORMs and raw SQL"]
      },
      {
        id: "5-7",
        title: "Building a REST API",
        body: `A REST API is a set of HTTP endpoints that expose your data and operations in a consistent, predictable way. RESTful conventions are not a standard — they're widely adopted patterns that make APIs easier to use and understand.\n\nThe conventions: GET /users returns all users. GET /users/123 returns user 123. POST /users creates a new user. PUT /users/123 replaces user 123 entirely. PATCH /users/123 updates specific fields of user 123. DELETE /users/123 removes user 123. These patterns are recognisable to any developer who's worked with APIs before.\n\nRequest validation must happen before any database interaction. If required fields are missing or values are invalid, return a 400 status with a clear error message explaining exactly what's wrong. Never let invalid data reach the database.\n\nResponse consistency matters. Always return the same shape for the same type of response. If success responses look like {data: {...}} and error responses look like {error: '...'}, that's a contract every client can depend on. Inconsistent response shapes are one of the most common sources of frontend bugs.\n\nVersioning protects existing clients when you change the API: /api/v1/users and /api/v2/users can coexist. Clients using v1 aren't broken by changes to v2. Don't version until you have external consumers, but design with versioning in mind from the start.\n\nDesign your API as if a developer you've never met needs to use it without documentation. The URL should say what the resource is. The method should say what operation. The status code should tell them what happened. The response body should have everything they need.`,
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
        hint: `Your API is returning data but the frontend is having trouble using it.\n\n<strong>Try this:</strong> Open the Network tab in the browser DevTools and look at the actual response your API is sending. Is it the shape you expected? Compare the exact JSON structure to what the frontend code expects to receive. The mismatch is usually obvious once you look at both side by side.\n\n<strong>Still stuck?</strong> Test your API with Postman or curl to isolate it from the frontend. If the API returns correct data in Postman but the frontend breaks, the problem is how the frontend is parsing the response — not the API itself.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add input validation that returns a 400 error if required fields are missing", "Add pagination to the list endpoint: accept page and limit query parameters", "Add a search endpoint that filters results by a query parameter", "Document your API endpoints in the code comments in the format: METHOD /path — description"]
        },
        quiz: {
          question: "A client sends a POST request to create a user but omits the required email field. What should the API return?",
          options: ["201 Created with a partial user record that has no email", "500 Internal Server Error if the database rejects the insert", "400 Bad Request with an error message specifying that email is required", "200 OK with a flag indicating the request was incomplete"],
          correct: 2,
          feedback: "400 Bad Request means the client sent something invalid. The error message should tell them exactly what's wrong: 'email is required' or 'email must be a valid email address'. Don't let invalid data reach the database — validate first and return 400 immediately. 500 is for server failures, not client mistakes. 201 with missing required data is incorrect by definition."
        },
        checklist: ["I can build RESTful endpoints for a resource", "I validate request input before any database interaction", "I return consistent response shapes across all endpoints", "I use correct HTTP status codes", "My endpoints follow RESTful URL conventions"]
      },
      {
        id: "5-8",
        title: "Environment Variables and Security",
        body: `Environment variables store secrets and configuration outside your code. Database passwords, API keys, JWT secrets, and third-party service credentials must never be committed to a Git repository. A public GitHub repository with a database password in it is a security incident, not just a mistake.\n\nThe dotenv package reads a .env file and loads its contents into process.env. Add .env to your .gitignore immediately when you create any project. Commit a .env.example file that shows what variables are needed with placeholder values — this is the convention for onboarding new developers without exposing secrets.\n\nSQL injection is the most common web application vulnerability. It happens when you build SQL queries with string concatenation: 'SELECT * FROM users WHERE name = ' + userInput. If userInput is ' OR '1'='1, the query returns every row in the table. The fix is parameterised queries: the query and the data are sent separately, and the database handles the escaping. Never build SQL with string concatenation.\n\nXSS (Cross-Site Scripting) happens when user input is rendered as HTML without sanitisation. If a user submits <script>steal(document.cookie)</script> as a comment and you display it directly, that script runs in every reader's browser. Sanitise or encode user content before rendering it.\n\nCORS (Cross-Origin Resource Sharing) is the browser's mechanism for restricting which domains can call your API. Configure CORS explicitly: list the specific origins your frontend runs on. Never set Access-Control-Allow-Origin: * in a production application that uses authentication — it allows any website to make authenticated requests on behalf of your users.`,
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
        hint: `You've committed sensitive data to a public repository.\n\n<strong>What to do right now:</strong> Revoke and regenerate the compromised credentials immediately — new database password, new API key, new JWT secret. Do this before doing anything else. Then remove the secrets from the codebase and add them to .env. Then use BFG Repo Cleaner or git filter-branch to purge them from Git history. Removing a file from the current commit doesn't remove it from history.\n\n<strong>Prevention:</strong> Use git-secrets or pre-commit hooks that block commits containing credential patterns. The few minutes of setup prevents this conversation.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Move the hardcoded API key in the code to a .env file", "Add CORS middleware that only allows requests from http://localhost:3000", "Add rate limiting middleware that blocks IPs making more than 100 requests per minute", "Identify and fix the SQL injection vulnerability in the code"]
        },
        quiz: {
          question: "A developer builds a query: 'SELECT * FROM users WHERE username = \\'' + req.body.username + '\\'' What is wrong with this?",
          options: ["String concatenation is slower than template literals for SQL queries", "The query is vulnerable to SQL injection — malicious input can manipulate the query logic", "Single quotes should be escaped differently in SQL", "The WHERE clause syntax is incorrect for PostgreSQL"],
          correct: 1,
          feedback: "String-concatenated SQL is vulnerable to injection. If req.body.username is ' OR '1'='1, the query becomes: SELECT * FROM users WHERE username = '' OR '1'='1' — which returns every user. Use parameterised queries: db.query('SELECT * FROM users WHERE username = $1', [req.body.username]). The database treats $1 as data, making injection impossible."
        },
        checklist: ["All secrets are stored in .env and never committed", ".env is in .gitignore", "I use parameterised queries for all database operations", "I understand what CORS is and have configured it explicitly", "I understand XSS and sanitise user-generated content before rendering"]
      },
      {
        id: "5-9",
        title: "Deployment",
        body: `Deployment is putting your application on a server that anyone on the internet can reach. Until you deploy, only you can use what you've built.\n\nFor Node/Express backends, Railway, Render, and Fly.io offer free or low-cost hosting with minimal configuration. You connect your GitHub repository, configure environment variables in the platform dashboard (never in the code), and the platform handles the server, the network, and keeping your process running.\n\nFor frontends, Netlify and Vercel detect your repository, build it automatically on every push to main, and serve it from a global CDN. Deployment becomes automatic: push to main, wait two minutes, the live site is updated.\n\nProcess managers like PM2 keep your Node.js application running if it crashes. Without PM2 or an equivalent, your server goes down every time there's an unhandled error. Railway and Render handle process management for you — on a VPS, you manage it yourself.\n\nEnvironment variables in production are set in the platform dashboard, not in code or .env files (which you'd never deploy). Every platform has a variables section. Set them before your first deployment.\n\n<strong>Monitoring</strong> is knowing your application is down before users tell you. A basic uptime monitor (UptimeRobot is free) pings your /health endpoint every 5 minutes and notifies you if it doesn't respond. On day one this feels unnecessary. On the day your app is down and you find out from a tweet, it feels essential.\n\nDeployment is not the end. It's where the real work begins: watching logs, responding to errors, iterating from real user feedback.`,
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
        hint: `Your application works locally but fails after deployment.\n\n<strong>Try this:</strong> Check the deployment logs first — every platform shows the build and runtime logs. Most production failures are one of: missing environment variable, port mismatch (your app must listen on process.env.PORT, not a hardcoded 3000), or a dependency that wasn't in package.json.\n\n<strong>Still stuck?</strong> Compare your .env file to the environment variables set in the platform dashboard. A missing variable causes the exact application startup failure that's hardest to diagnose without logs.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Write the exact sequence of commands to deploy a Node.js app to Railway", "Write a health check endpoint GET /health that returns {status: 'ok', uptime: process.uptime()}", "Add environment-specific configuration — different database URLs for development and production", "Set up a basic monitoring check: a script that hits your /health endpoint every 5 minutes and logs if it fails"]
        },
        quiz: {
          question: "Your Node.js app works on localhost:3000 but fails to start on Railway. What is the most common reason?",
          options: ["Railway doesn't support Node.js applications", "The application is listening on a hardcoded port 3000 instead of process.env.PORT", "The package.json is missing from the repository", "Railway requires a separate configuration file for every environment variable"],
          correct: 1,
          feedback: "Cloud platforms assign a dynamic port to your application via the PORT environment variable. Your app must listen on process.env.PORT. If it's hardcoded to 3000, it starts on 3000, but the platform is routing traffic to a different port — the app is running but unreachable. The fix: app.listen(process.env.PORT || 3000)."
        },
        checklist: ["I can deploy a Node.js application to Railway or Render", "Environment variables are set in the platform dashboard, not in code", "My app listens on process.env.PORT", "I have a /health endpoint", "I check deployment logs when something breaks"]
      },
      {
        id: "5-10",
        title: "Connecting Frontend to Backend",
        body: `The frontend and backend are separate systems that communicate over HTTP. They might be on different domains. They might be built with different technologies. They talk to each other exactly the same way your browser talks to any other server: HTTP requests.\n\nCORS is the browser's mechanism for restricting cross-origin requests. When your frontend on localhost:3000 calls your API on localhost:8000, the browser blocks it unless the server explicitly allows that origin. Configure the cors middleware on your Express server: cors({ origin: 'http://localhost:3000' }). In production, replace that with your deployed frontend URL.\n\nThe standard fetch workflow from the frontend: for read operations, GET request, handle loading and error states. For write operations, POST/PATCH/DELETE with Content-Type: application/json and JSON.stringify in the body. Always handle the loading state (show a spinner or disable the submit button) and the error state (show a message, don't just fail silently).\n\nAuthentication headers: after login, store the JWT in memory or localStorage. Send it with every authenticated request: headers: { 'Authorization': 'Bearer ' + token }. The server extracts and verifies the token in auth middleware before the route handler runs.\n\nTreat your backend API as if it belongs to a completely separate team. Test it with Postman before connecting the frontend. Define the response shape before writing either side. This discipline exposes misalignments early, when they're cheap to fix.`,
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
        hint: `Your fetch request is being blocked by CORS.\n\n<strong>Try this:</strong> Look at the browser console error message carefully. It will say exactly which origin is blocked and which origin the server allows. The fix is always server-side: add the correct origin to your CORS configuration. The browser enforces CORS — you can't bypass it client-side.\n\n<strong>Still stuck?</strong> A CORS error only appears in browsers. If you test with curl or Postman and it works, the API is fine. The CORS error is specifically the browser blocking the cross-origin request. Configure the cors middleware with the exact origin your frontend is running on, including the port number.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Add a loading state that shows a spinner while the request is in progress", "Add error handling that shows a specific message for 401 (unauthorized) vs 404 (not found) vs 500 (server error)", "Add an Authorization header with a JWT token to the fetch request", "Implement optimistic UI: update the list immediately when a new item is added, before the server confirms"]
        },
        quiz: {
          question: "Your frontend fetch request to the backend is blocked with a CORS error. Where is the fix applied?",
          options: ["In the frontend fetch() call, by adding mode: 'no-cors'", "In the browser settings, by disabling the same-origin policy", "On the backend server, by adding CORS middleware that allows the frontend's origin", "In the HTTP request headers, by adding a CORS bypass header"],
          correct: 2,
          feedback: "CORS is enforced by the browser based on what the server allows. The server must include the correct Access-Control-Allow-Origin header in its response. Adding mode: 'no-cors' to fetch doesn't solve the problem — it just hides the error while preventing you from reading the response. The fix is always server-side: configure cors middleware to explicitly allow your frontend's origin."
        },
        checklist: ["I understand why CORS exists and how to configure it", "I can send authenticated requests with JWT headers", "I handle loading and error states for every fetch operation", "I test my API with Postman before connecting the frontend", "I understand optimistic UI and when to use it"]
      },
      {
        id: "5-11",
        title: "Guided Full Stack Notes App",
        body: `The notes app is your first complete full stack project: frontend, backend, database, deployed. Not a tutorial you follow — a system you build by connecting the pieces you've learned on this floor.\n\nThe scaffold provides a React-style HTML frontend, an Express backend with in-memory array storage, and basic CRUD endpoints for notes. Your job is to connect the frontend to the backend, replace the in-memory array with a real database, add proper error handling to every operation, and deploy both services.\n\nThis is the project where everything from Floor 5 becomes a single working system. The database you learned in section 5-3. The Express server from 5-5. The database connection from 5-6. The REST API design from 5-7. The environment variables from 5-8. The deployment from 5-9. The frontend-backend connection from 5-10. It all converges here.\n\nRead the full scaffold before writing a single line. Understand the data flow: what does the frontend send, what does the backend receive, what does the database store, what does the response look like. Draw it on paper if it helps. Build the data layer first, then the API layer, then connect the frontend, then deploy.\n\nThe order matters. A working backend you can test with Postman before the frontend exists is much easier to debug than a system where everything breaks simultaneously.`,
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
        hint: `The frontend and backend are both working independently but don't communicate correctly.\n\n<strong>Try this:</strong> Open the browser Network tab and watch the request your frontend sends when you create a note. Check: is the URL correct? Is the method POST? Is the body JSON? Is the Content-Type header set? Then look at the server logs for the same moment — did the request arrive? What does the server log?\n\n<strong>Still stuck?</strong> Add console.log(req.method, req.path, req.body) at the top of every route. This shows you exactly what the server receives. If the route isn't logging, the request isn't reaching Express. If it's logging but req.body is empty, body-parsing middleware is missing.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Connect the frontend fetch calls to the backend API endpoints", "Replace the in-memory array with real database queries", "Add a loading state for each async operation", "Deploy both frontend and backend and update the frontend API URL to point to the live backend"]
        },
        quiz: {
          question: "You've built the notes API and tested it with Postman. Now you connect the frontend and notes aren't saving. What should you check first?",
          options: ["The database schema for errors", "The browser Network tab to see the exact request being sent and the response received", "The frontend HTML for layout issues", "The Express router registration order"],
          correct: 1,
          feedback: "The Network tab shows you the exact request the browser sends and the exact response it receives. You already know the backend works (Postman proved it), so the problem is either the frontend isn't sending the right request, or isn't handling the response correctly. The Network tab shows both. This is the fastest way to find the disconnect."
        },
        checklist: ["The frontend connects to the backend API", "Notes persist in a real database", "Loading and error states are handled", "Both frontend and backend are deployed", "The app works end-to-end on the live URL"]
      },
      {
        id: "5-12",
        title: "Adding Authentication",
        body: `Adding authentication to the notes app means building the complete auth flow: register endpoint, login endpoint, JWT generation, auth middleware, and route protection. Then on the frontend: storing the token, sending it with every request, handling logout, and redirecting unauthenticated users.\n\nThe notes should be private per user. A user should only see their own notes, not everyone's. This requires adding a userId foreign key to the notes table. Every note is owned by a user. Every query for notes filters by the authenticated user's ID extracted from the JWT.\n\nThe auth flow in detail: the user submits a login form → the frontend POSTs credentials to /api/auth/login → the server finds the user by email, verifies the password with bcrypt.compare(), generates a JWT signed with the secret key, and returns it → the frontend stores the token and includes it in the Authorization header of every subsequent request → the auth middleware on the server verifies the JWT, extracts the userId, and attaches it to req.user → route handlers use req.user.id to filter data to the authenticated user's records.\n\nCommon mistakes: not hashing passwords with bcrypt before storage, not verifying the JWT secret matches between generation and verification, not filtering database queries by userId so users can see each other's notes, and not handling the case where a token is expired or invalid.`,
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
        hint: `Authentication works but users can see each other's notes.\n\n<strong>Try this:</strong> Look at your database query for fetching notes. Does it have a WHERE user_id = $1 clause? If not, add it. The userId comes from req.user.id, which your auth middleware should be attaching. Log req.user at the top of the route to confirm it's there and contains the correct ID.\n\n<strong>Still stuck?</strong> Test with two different accounts in two different browser windows (or one regular, one incognito). Create a note in each. Confirm each account only sees its own notes. This test exposes data isolation bugs that unit tests often miss.`,
        code: {
          lang: "HTML",
          starter: 'PLACEHOLDER',
          challenges: ["Implement the register endpoint that hashes the password and creates a user", "Implement the login endpoint that verifies the password and returns a JWT", "Add the auth middleware that verifies the JWT and attaches the user to req", "Update the notes endpoints to filter by the authenticated user's ID"]
        },
        quiz: {
          question: "After adding authentication, a logged-in user can still see notes belonging to other users. What is missing from the database query?",
          options: ["The JWT is not being verified correctly on the server", "The database query is not filtering notes by the authenticated user's ID", "The frontend is not sending the Authorization header", "The notes table is missing a primary key"],
          correct: 1,
          feedback: "Authentication tells you who the user is. But if your SELECT query for notes doesn't include WHERE user_id = req.user.id, it returns all notes regardless of who's asking. Authentication without data scoping is incomplete. Every query that returns user-owned data must filter by the authenticated user's identifier."
        },
        checklist: ["Users can register and log in", "Passwords are hashed with bcrypt", "JWTs are generated on login and verified on protected routes", "Notes are filtered by the authenticated user's ID", "Users cannot access other users' notes"]
      },
      {
        id: "5-13",
        title: "Deploying It Live",
        body: `Deploy the complete authenticated notes application to production. This is not a practice run — it's a real deployed application with real authentication and real data persistence.\n\nBackend to Railway or Render. Database to Supabase or PlanetScale (both have free tiers sufficient for this project). Frontend to Netlify or Vercel. Set every environment variable in the platform dashboards: DATABASE_URL, JWT_SECRET, the frontend API base URL, and CORS origin.\n\nTest the deployed app end-to-end after deployment: register a new account using the live URL, create a note, log out, log back in, confirm the note is still there. Then register a second account and confirm the first account's notes are not visible. If anything breaks, check the deployment logs — they contain the exact error.\n\nShare the URL. Not because it's required, but because a deployed, working, authenticated full stack application is something worth showing. This is not beginner-level work. A production-ready notes application with authentication is something many developers with years of experience have never built cleanly from scratch.\n\nMonitor it for 24 hours after deployment. Watch the logs. Note what errors appear in real usage that you didn't catch in development. Fix them. This is the production feedback loop that makes software better.`,
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
        hint: `The deployed app works but database changes aren't persisting.\n\n<strong>Try this:</strong> Check that your production DATABASE_URL points to the hosted database (Supabase or PlanetScale), not to localhost. If it points to localhost, the server is trying to connect to a database on its own machine rather than the hosted one. This is a common mistake when copying local environment variables to production.\n\n<strong>Still stuck?</strong> Add a log at application startup that prints (safely) which database host is being connected to. Never log the full connection string, but logging the host is enough to confirm you're connecting to the right place.`,
        quiz: {
          question: "After deploying, the app registers users but their notes disappear after a few hours. What is the most likely cause?",
          options: ["JWTs expire after a few hours, deleting the user's data", "The backend is using an in-memory array instead of the database, and the server restarts periodically", "The database has a scheduled cleanup job running", "The frontend is clearing localStorage on page load"],
          correct: 1,
          feedback: "Cloud platforms restart your server process periodically (for updates, scaling, or failure recovery). An in-memory array is wiped clean on every restart. If notes disappear periodically, the backend is storing them in memory instead of the database. This is exactly why in-memory storage is only acceptable for development — production requires a persistent database."
        },
        checklist: ["The backend is deployed to Railway or Render", "The database is hosted on Supabase or PlanetScale", "The frontend is deployed to Netlify or Vercel", "All environment variables are set in production", "The app works end-to-end on the live URL with two different accounts"]
      },
      {
        id: "5-14",
        title: "Solo Full Stack Project",
        body: `Design and build a full stack application from scratch. No scaffold, no starter code, no prescribed idea. Yours completely.\n\nThe requirements are structural: a frontend (HTML/CSS/JS or React), a backend (Node/Express or another language if you've explored one), a database, user authentication, and deployment. The idea is yours. It should be something you would actually use or that solves a real problem you've encountered.\n\nThe complexity target is honest: more complex than the notes app, less complex than Airbnb. That's a wide range. Ideas that fit: a expense tracker that splits bills between friends, a recipe manager that generates shopping lists, a habit tracker with streaks, a link organiser with tags and search, a reading list with notes per book. All of these are within reach. All of them are worth building.\n\nTimeline: 3-4 weeks at full session intensity. This is a real project that takes real time. Resist the urge to rush the planning phase — the decisions you make before writing code determine how hard the last 40% is.\n\nWhen it's deployed: write a README that explains what the application does, the technical decisions you made (why this database, why this architecture), and what you'd do differently. This written reflection is as valuable as the code — it's evidence of how you think, not just what you can build.`,
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
        hint: `The project feels too big to start.\n\n<strong>Try this:</strong> Write the database schema first — just the CREATE TABLE statements. No code, no server, no frontend. Just the data model. If you can define what data the application stores, you understand the application. The schema is the clearest expression of what the system does.\n\n<strong>Still stuck?</strong> Build the most boring version first. Ignore design, ignore edge cases, ignore optimisation. Get one thing working end-to-end: create one record through the API and see it in the database. That first working vertical slice is the hardest part. Everything after it is extending something that already works.`,
        quiz: {
          question: "You're designing a full stack app where users can create posts and comment on them. What is the minimum schema you need?",
          options: ["One table: posts (with comments as a JSON column)", "Two tables: users and posts (comments can be added later)", "Three tables: users, posts, and comments (with foreign keys linking them)", "Four tables: users, posts, comments, and a junction table for user-post relationships"],
          correct: 2,
          feedback: "Users, posts, and comments are distinct entities with their own attributes and relationships. posts has a user_id foreign key (who created it). comments has both a user_id (who wrote it) and a post_id (which post it's on). A JSON column for comments breaks querying, filtering, and indexing. Start with normalised tables — you can always denormalise for performance later if needed."
        },
        checklist: ["I planned the data model before writing any code", "The application has a working frontend, backend, database, and authentication", "It is deployed and accessible via URL", "The README explains what it does and how I built it", "I'm proud of it and would show it to a potential employer"]
      }
    ]
  }'''

with open('/tmp/floors_4_5.js', 'w', encoding='utf-8') as f:
    f.write(floor_content)

char_count = len(floor_content)
print(f"Done. Character count: {char_count:,}")
