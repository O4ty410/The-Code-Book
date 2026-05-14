export const VISUAL_CHALLENGES = [
  {
    id: 'visual_fuel',
    title: 'Fuel Burn Calculation',
    systemContext: 'Fuel System',
    instruction: 'This code runs during the first 40 seconds of flight. What is the value of `remaining` when it finishes?',
    code: `let totalFuel = 20000; // kg — initial load
let burnRate  = 350;   // kg/s
let burnTime  = 40;    // seconds

let consumed  = burnRate * burnTime;
let remaining = totalFuel - consumed;`,
    options: [
      { label: '20,000 kg', value: 'a' },
      { label: '14,000 kg', value: 'b' },
      { label: '6,000 kg',  value: 'c' },
      { label: '350 kg',    value: 'd' },
    ],
    correct: 'c',
    explanation: '350 × 40 = 14,000 kg consumed. 20,000 − 14,000 = 6,000 kg remaining. The arithmetic runs in sequence: multiplication first, then subtraction.',
  },
  {
    id: 'visual_comms',
    title: 'Communication Log Output',
    systemContext: 'Communications',
    instruction: 'What does the communication log display when this code runs?',
    code: `let system = "ENGINE";
let code   = 200;
let log    = "SYSTEM-" + system + ": CODE " + code;
console.log(log);`,
    options: [
      { label: 'SYSTEM-ENGINE: CODE 200',  value: 'a' },
      { label: 'SYSTEM-: CODE 200',        value: 'b' },
      { label: 'SYSTEM-ENGINE: CODE code', value: 'c' },
      { label: 'SYSTEM-engine: CODE 200',  value: 'd' },
    ],
    correct: 'a',
    explanation: 'String concatenation with `+` joins the pieces in order. `system` holds "ENGINE" (uppercase). `code` holds the number 200, which JavaScript converts to a string automatically when joined.',
  },
  {
    id: 'visual_diagnostics',
    title: 'Thermal Sensor Loop',
    systemContext: 'Diagnostics',
    instruction: 'How many overheated sensors does this scan detect?',
    code: `let temperatures = [320, 285, 410, 290, 305]; // °C
let overheated   = 0;

for (let i = 0; i < temperatures.length; i++) {
  if (temperatures[i] > 300) {
    overheated++;
  }
}`,
    options: [
      { label: '1 sensor',  value: 'a' },
      { label: '2 sensors', value: 'b' },
      { label: '3 sensors', value: 'c' },
      { label: '5 sensors', value: 'd' },
    ],
    correct: 'c',
    explanation: '320 > 300 ✓, 285 > 300 ✗, 410 > 300 ✓, 290 > 300 ✗, 305 > 300 ✓. Three sensors exceed the 300°C threshold.',
  },
];
