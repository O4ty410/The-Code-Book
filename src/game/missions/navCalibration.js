export default {
  id: 'nav_calibration',
  title: 'Trajectory Control',
  objective: 'Fix the comparison operator to lock the orbital trajectory',

  challenge: {
    context: "The guidance computer checks whether current velocity meets the orbital insertion threshold — but the comparison is broken. Instead of testing the condition, the script overwrites velocity with the threshold value. The trajectory cannot lock.",
    brokenCode: `let velocity = 7800;          // m/s — current ascent speed
let escapeVelocity = 11200;   // m/s — orbital insertion threshold

if (velocity = escapeVelocity) {
  console.log("Trajectory locked. Orbital insertion confirmed.");
}`,
    hint: "The operator inside the if check is = — that's assignment, not comparison. Use >= to ask: is velocity at or above escapeVelocity?",
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, ' ').trim();
      return (
        stripped.includes('velocity >= escapeVelocity') ||
        stripped.includes('velocity > escapeVelocity')
      );
    },
  },

  success: {
    worldEffect: 'nav_calibrated',
    dialogue: [
      { text: "Guidance computer: nominal. Trajectory condition confirmed. Orbital insertion logic responding correctly." },
      { text: "The `=` operator was overwriting `escapeVelocity` with the value of `velocity`, then evaluating the assigned number as a condition — always resolving to true. `>=` compares the two values without modifying either." },
      { text: "Conditionals are how the guidance system determines what to do at each flight phase. Every decision depends on the comparison operator being exact.", isLast: true },
    ],
  },
};
