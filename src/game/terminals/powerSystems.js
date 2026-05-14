export default {
  id: 'power',
  label: 'Power Systems',
  statusLine: 'REACTOR CORE · 94% EFFICIENCY · NOMINAL',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: "Commander. I'm ARIA — your station intelligence. We have a situation. The reactor's power management script is throwing a reference error. Thruster array B is offline.",
    },
    {
      text: 'Every system on this station runs on code. The rocket, the life support, the launch sequence — all of it stores values in variables. Fuel level, battery charge, power output.',
    },
    {
      text: "A variable is how we name and store a value. Once declared, you reference it by that exact name. If the name is wrong — even by one character — the system can't find it.",
    },
    {
      text: "I'm routing the broken script to your terminal now. Fix the variable name and I'll restore power. The station is depending on you.",
      type: 'mission',
      missionId: 'power_restoration',
    },
  ],
};
