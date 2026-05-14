export const DEBUG_MISSIONS = [
  {
    id: 'debug_wrong_variable',
    title: 'Cross-System Reference Fault',
    systemContext: 'Power & Navigation',
    description: 'The navigation check reads the wrong variable. Fix the reference.',
    brokenCode: `let currentPower = 87;  // % — current reactor output
let minPower = 80;      // % — minimum threshold for navigation

if (minimumPower >= minPower) { // ERROR: 'minimumPower' is not defined — should be 'currentPower'
  console.log("Navigation: ONLINE");
} else {
  console.log("Navigation: OFFLINE — insufficient power");
}`,
    hint: 'The variable declared on line 1 and the variable used in the condition are not the same name.',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return (stripped.includes('currentPower>=minPower') || stripped.includes('currentPower>=80'));
    },
    successText: 'Reference resolved. Navigation confirms: ONLINE. currentPower (87) is above minPower (80).',
  },
  {
    id: 'debug_wrong_operator',
    title: 'Engine Altitude Logic Fault',
    systemContext: 'Engine & Flight Computer',
    description: 'The engine cut-off condition is inverted. Engines are shut down at launch altitude.',
    brokenCode: `let altitude       = 0;      // m — current altitude
let cutOffAltitude = 80000; // m — engine cut-off point

if (altitude > cutOffAltitude) { // ERROR: engines should fire BELOW cut-off altitude
  console.log("Main engines: ACTIVE");
} else {
  console.log("Main engines: CUT-OFF");
}`,
    hint: 'The rocket fires its engines while climbing toward 80,000 m. Should the condition be > or < ?',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('altitude<cutOffAltitude') || stripped.includes('altitude<80000');
    },
    successText: 'Logic corrected. altitude (0) < cutOffAltitude (80,000) — condition is true. Main engines: ACTIVE.',
  },
  {
    id: 'debug_missing_return',
    title: 'Diagnostic Loop — Return Value Ignored',
    systemContext: 'Diagnostics & Engine Core',
    description: 'The checkSystem function is called but its return value is never used. readyCount stays at zero.',
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
  checkSystem(systems[i]); // ERROR: return value ignored — readyCount never updates
}

console.log("Systems ready: " + readyCount);`,
    hint: 'The function returns true or false. Use that inside an if statement to conditionally increment readyCount.',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('if(checkSystem(systems[i]))') || stripped.includes('if(checkSystem(systems[i]))readyCount++');
    },
    successText: 'Scan complete. Systems ready: 2 / 3. engine-B flagged FAULT. Diagnostic loop confirmed operational.',
  },
];
