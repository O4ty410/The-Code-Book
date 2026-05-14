export default {
  id: 'comms_signal',
  title: 'Communications Signal',
  objective: 'Fix the undefined variable reference in the broadcast string',

  challenge: {
    context: "The communications array is offline. The broadcast script references a variable name that was never declared. The console log throws a ReferenceError and no signal is transmitted.",
    brokenCode: `let callsign = "LAUNCH-BAY-01";
let statusMessage = "ALL SYSTEMS NOMINAL";

let broadcast = callsign + " — " + statusMsg; // ERROR: 'statusMsg' is not defined
console.log(broadcast);`,
    hint: 'Compare the variable declared on line 2 with the name used on line 4. Are they the same?',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('+statusMessage') || stripped.includes('statusMessage+') || stripped.includes('"statusMessage"');
    },
  },

  success: {
    worldEffect: 'comms_online',
    dialogue: [
      {
        text: 'Signal confirmed. Broadcast transmitted: "LAUNCH-BAY-01 — ALL SYSTEMS NOMINAL".',
      },
      {
        text: "Strings are how systems communicate — status logs, callsigns, messages. When you concatenate with `+`, every piece must be a declared variable or a literal value in quotes.",
      },
      {
        text: '`statusMsg` was never declared. The system looked for a name that didn\'t exist. Renaming it to `statusMessage` gave it the correct reference.',
        isLast: true,
      },
    ],
  },
};
