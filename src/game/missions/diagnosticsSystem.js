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
      {
        text: 'Diagnostics confirmed. Four systems online. Count: 4 / 4.',
      },
      {
        text: 'Arrays in JavaScript are zero-indexed. The first element is at position 0, not 1. Starting your loop at `i = 1` silently skips whatever is at position zero.',
      },
      {
        text: 'Loops are how the station scans every system, checks every sensor, processes every reading. The loop bounds define exactly what gets checked and what gets missed.',
        isLast: true,
      },
    ],
  },
};
