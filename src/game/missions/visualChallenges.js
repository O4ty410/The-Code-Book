export const VISUAL_CHALLENGES = [
  {
    id: 'visual_fuel',
    title: 'Fuel Tank Alert Scan',

    // Step 1
    systemContext: 'The fuel monitoring display is showing zero low-fuel alerts. Telemetry confirms multiple tanks are critically below threshold. The monitoring loop is running but the alert count is not updating correctly.',

    // Step 2
    systemExplanation: 'Fuel monitoring systems scan all onboard tanks and flag those below a safe minimum. Each flagged tank triggers an alert in the mission control display. The loop processes every tank in sequence and increments the alert counter when a tank falls below the threshold.',

    // Step 3
    codingConcept: 'LOOPS',
    conceptDetail: 'A loop runs a block of code repeatedly, once for each item in a list. The loop counter moves through each position in sequence. On each pass, the loop body evaluates the current item — here, checking whether a tank is below the minimum and incrementing the alert count if so.',

    // Step 4
    instruction: 'How many low-fuel alerts does this scan produce?',
    code: `let tanks = [450, 120, 89, 310, 55]; // kg remaining
let alerts = 0;

for (let i = 0; i < tanks.length; i++) {
  if (tanks[i] < 100) {
    alerts++;
  }
}`,
    options: [
      { label: '1 alert',  value: 'a' },
      { label: '2 alerts', value: 'b' },
      { label: '3 alerts', value: 'c' },
      { label: '0 alerts', value: 'd' },
    ],
    correct: 'b',

    // Step 5
    explanation: 'The loop checks each tank in order. 450 ≥ 100 (skip), 120 ≥ 100 (skip), 89 < 100 (alert), 310 ≥ 100 (skip), 55 < 100 (alert). Two tanks are below threshold. Fuel alert count restored: 2.',
  },

  {
    id: 'visual_comms',
    title: 'Signal Routing Logic',

    // Step 1
    systemContext: 'The telemetry router is directing signals to the wrong relay. Mission control is receiving data on the backup link when the primary should be active. The routing logic uses signal strength to select a channel.',

    // Step 2
    systemExplanation: 'Signal routing systems use conditional logic to determine which communication channel to use based on measured signal strength. Each condition is evaluated in order — the first one that is true determines the output. Misreading the thresholds causes the router to select the wrong channel.',

    // Step 3
    codingConcept: 'CONDITIONALS',
    conceptDetail: 'An if/else if chain evaluates conditions in sequence. The first condition that is true executes its block and the rest are skipped entirely. The order and values of the thresholds determine which path the system takes for any given input.',

    // Step 4
    instruction: 'Which route does the system select when signalStrength is 42?',
    code: `let signalStrength = 42;
let route;

if (signalStrength >= 80) {
  route = "PRIMARY — Direct link";
} else if (signalStrength >= 40) {
  route = "RELAY — Secondary link";
} else {
  route = "BACKUP — Emergency link";
}`,
    options: [
      { label: 'PRIMARY — Direct link',    value: 'a' },
      { label: 'RELAY — Secondary link',   value: 'b' },
      { label: 'BACKUP — Emergency link',  value: 'c' },
      { label: 'No route selected',        value: 'd' },
    ],
    correct: 'b',

    // Step 5
    explanation: '42 is not ≥ 80 — first condition false. 42 is ≥ 40 — second condition true. The chain stops here. RELAY selected. Signal routing restored to correct channel.',
  },

  {
    id: 'visual_diagnostics',
    title: 'Engine Status Function',

    // Step 1
    systemContext: 'The engine temperature monitor is displaying inconsistent status readings. Mission control cannot determine whether the engine is within safe operating parameters. The status function is being called with live sensor data.',

    // Step 2
    systemExplanation: 'Engine monitoring systems use functions to evaluate sensor readings and return a status classification. The function runs the same logic each time it is called, returning a result based on the input value. Operators must be able to read what a function will return for any given input to interpret telemetry correctly.',

    // Step 3
    codingConcept: 'FUNCTIONS',
    conceptDetail: 'A function takes an input, runs a defined set of instructions, and returns a result. The return value depends on which condition inside the function is satisfied first. Once a return statement is reached, the function stops — no further conditions are checked.',

    // Step 4
    instruction: 'What does getEngineStatus(1250) return?',
    code: `function getEngineStatus(temp) {
  if (temp > 1500) {
    return "CRITICAL";
  }
  if (temp > 1000) {
    return "NOMINAL";
  }
  return "COLD";
}

let status = getEngineStatus(1250);`,
    options: [
      { label: '"CRITICAL"',  value: 'a' },
      { label: '"NOMINAL"',   value: 'b' },
      { label: '"COLD"',      value: 'c' },
      { label: 'undefined',   value: 'd' },
    ],
    correct: 'b',

    // Step 5
    explanation: '1250 is not > 1500 — first return skipped. 1250 is > 1000 — second return executes: "NOMINAL". The function exits. The third return is never reached. Engine status confirmed: NOMINAL.',
  },
];
