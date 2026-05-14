export default {
  id: 'comms',
  label: 'Communications',
  statusLine: 'COMMUNICATIONS · BROADCAST ARRAY OFFLINE',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: 'Commander. The communications array is down. The broadcast script is throwing a ReferenceError — it is trying to read a variable that was never declared.',
    },
    {
      text: 'Strings are how systems encode messages — status logs, callsigns, alerts. The broadcast message is built by combining string values with the `+` operator.',
    },
    {
      text: 'Every name you reference in code must have been declared first. If the name is wrong — even a single character different — the system cannot find it. The entire broadcast fails.',
    },
    {
      text: "The faulty broadcast script is on your terminal. One variable name needs correcting. Fix it and I'll restore the transmission.",
      type: 'mission',
      missionId: 'comms_signal',
    },
  ],
};
