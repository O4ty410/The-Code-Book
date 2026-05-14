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
      {
        text: 'Guidance computer is back online. Trajectory arc is locked. Orbital insertion window confirmed at 94.3 seconds post-ignition.',
      },
      {
        text: "What failed was a comparison operator. The script used = — assignment — instead of >= — greater-than-or-equal. In JavaScript, = stores a value. >= asks a question.",
      },
      {
        text: "Every flight decision the computer makes runs through an if statement. Speed checks, altitude thresholds, fuel burn rates — all conditionals. The rocket doesn't guess. It tests.",
        isLast: true,
      },
    ],
  },
};
