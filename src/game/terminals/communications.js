export default {
  id: 'comms',
  label: 'Communications',
  statusLine: 'COMMUNICATIONS · REFERENCE ERROR · BROADCAST OFFLINE',
  ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
  sequence: [
    {
      text: "Commander. The communications array is offline. The broadcast controller is throwing a reference error — the transmission script is attempting to read a variable that does not exist. No signal is being transmitted.",
    },
    {
      text: "A spacecraft's communications system transmits status logs, telemetry data, and control confirmations to mission control and onboard systems. Every transmission is assembled as a text string — a sequence of characters built from system data. If the script cannot read a required value, the message cannot be constructed.",
    },
    {
      text: "This script assembles the broadcast using string concatenation — joining values together with the `+` operator. The fault is a variable name mismatch: the script references a name that was never declared. JavaScript throws a ReferenceError and halts the transmission entirely.",
    },
    {
      text: "The fault script is on your terminal. The declared variable and the referenced variable are not the same name. Correct the reference. Restore the broadcast.",
      type: 'mission',
      missionId: 'comms_signal',
    },
  ],
};
