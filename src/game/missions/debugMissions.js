export const DEBUG_MISSIONS = [
  {
    id: 'debug_wrong_variable',
    title: 'Cross-System Reference Fault',

    // Step 1
    systemContext: 'The navigation power check is referencing a variable that was never declared. The condition evaluates incorrectly — navigation reports OFFLINE despite the reactor running at 87%.',

    // Step 2
    systemExplanation: 'Navigation systems continuously verify that available power meets minimum operating thresholds. The check compares a live sensor reading against a stored minimum. If the wrong variable name is used, the system reads an undefined reference and the condition fails regardless of actual power output.',

    // Step 3
    codingConcept: 'VARIABLES',
    conceptDetail: 'A value is stored under a specific name. The name used to retrieve it must exactly match the name it was stored under. A mismatched name is treated as a different, undefined variable.',

    // Step 4
    brokenCode: `let currentPower = 87;  // % — current reactor output
let minPower = 80;      // % — minimum threshold for navigation

if (minimumPower >= minPower) { // ERROR: 'minimumPower' is not defined
  console.log("Navigation: ONLINE");
} else {
  console.log("Navigation: OFFLINE — insufficient power");
}`,
    hint: 'The variable declared on line 1 and the variable used in the condition are not the same name.',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('currentPower>=minPower') || stripped.includes('currentPower>=80');
    },

    // Step 5
    successText: 'Reference resolved. Navigation confirms: ONLINE. currentPower (87) is above minPower (80). Power check operational.',
  },

  {
    id: 'debug_wrong_operator',
    title: 'Engine Cut-Off Logic Inverted',

    // Step 1
    systemContext: 'The engine cut-off logic is inverted. At launch altitude (0 m), the main engines are reading CUT-OFF. The vehicle cannot begin its ascent.',

    // Step 2
    systemExplanation: 'Engine cut-off logic determines when the main engines should fire and when they should shut down. The engines must be active during ascent — below the designated cut-off altitude. Above that point they shut down for staging or orbital insertion. An inverted comparison reverses this entirely.',

    // Step 3
    codingConcept: 'CONDITIONALS',
    conceptDetail: 'An if statement evaluates whether a condition is true or false and executes different code for each result. The comparison operator — `>` or `<` — determines what the condition is actually testing. Reversing the operator reverses the decision.',

    // Step 4
    brokenCode: `let altitude       = 0;      // m — current altitude
let cutOffAltitude = 80000; // m — engine cut-off point

if (altitude > cutOffAltitude) { // ERROR: engines should fire BELOW cut-off
  console.log("Main engines: ACTIVE");
} else {
  console.log("Main engines: CUT-OFF");
}`,
    hint: 'The rocket fires its engines while climbing toward 80,000 m. Should the condition be > or <?',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('altitude<cutOffAltitude') || stripped.includes('altitude<80000');
    },

    // Step 5
    successText: 'Logic corrected. altitude (0) < cutOffAltitude (80,000) — condition true. Main engines: ACTIVE. Ascent sequence cleared.',
  },

  {
    id: 'debug_missing_return',
    title: 'Diagnostic Loop — Return Value Discarded',

    // Step 1
    systemContext: 'The pre-launch diagnostic scanner is reporting zero systems ready. The scan loop runs without error, but readyCount never increments. Three modules are operational — none are being counted.',

    // Step 2
    systemExplanation: 'Diagnostic systems scan each subsystem and count how many are operational before authorising launch. The scanner uses a function to check each module and returns a boolean result. If that result is never used, the count stays at zero regardless of the actual system states.',

    // Step 3
    codingConcept: 'FUNCTIONS',
    conceptDetail: 'A function can return a value when called. That return value must be captured and used by the calling code. Calling a function without acting on its return value discards the result entirely — the function ran, but nothing was done with what it found.',

    // Step 4
    brokenCode: `function checkSystem(system) {
  return system.status === "NOMINAL";
}

let systems = [
  { name: "engine-A",  status: "NOMINAL" },
  { name: "engine-B",  status: "FAULT"   },
  { name: "fuel-pump", status: "NOMINAL" },
];

let readyCount = 0;

for (let i = 0; i < systems.length; i++) {
  checkSystem(systems[i]); // ERROR: return value ignored
}

console.log("Systems ready: " + readyCount);`,
    hint: 'The function returns true or false. Use that return value inside an if statement to conditionally increment readyCount.',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return (
        stripped.includes('if(checkSystem(systems[i]))') ||
        stripped.includes('if(checkSystem(systems[i]))readyCount++')
      );
    },

    // Step 5
    successText: 'Scan complete. Systems ready: 2 / 3. engine-B flagged FAULT. Diagnostic loop confirmed operational. Launch authorisation check passed.',
  },
];
