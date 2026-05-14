export default {
  id: 'diagnostics_scan',
  title: 'Diagnostics Scan',
  objective: 'Fix the loop start index so the scan checks all systems',

  challenge: {
    context: "The diagnostics array is reporting only three systems online, but four are active. The scan loop starts at index 1, skipping the first system in the array.",
    brokenCode: `let systems = ["power", "fuel", "navigation", "engine"];
let onlineCount = 0;

for (let i = 1; i < systems.length; i++) { // ERROR: starts at 1, skips index 0
  onlineCount++;
}

console.log("Systems online: " + onlineCount + " / " + systems.length);`,
    hint: 'Arrays start at index 0. What should the loop counter start at?',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return (stripped.includes('leti=0') || stripped.includes('i=0;') || stripped.includes('i=0,')) && stripped.includes('for');
    },
  },

  success: {
    worldEffect: 'diagnostics_online',
    dialogue: [
      { text: "Diagnostic scanner: nominal. Scan confirmed: 4 / 4 systems online." },
      { text: "The loop was beginning at `i = 1`, skipping index 0 — the first system in the array. Changing to `i = 0` ensures every element is processed from the first position." },
      { text: "Loops are how the station automates repetition across system lists. The starting index defines exactly what is included. An off-by-one error produces no fault alert — only silent data loss.", isLast: true },
    ],
  },
};
