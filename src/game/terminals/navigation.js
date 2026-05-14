export default {
  id: 'nav',
  label: 'Navigation',
  statusLine: 'GUIDANCE COMPUTER · TRAJECTORY FAULT · STANDBY',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: "The guidance computer is throwing a critical fault. It can't lock the orbital trajectory — the velocity comparison in the flight control script is returning an invalid state.",
    },
    {
      text: "Rockets don't fly blind. Every second, the computer checks conditions: Has velocity reached orbital speed? Is altitude above the abort threshold? Is fuel burn within range?",
    },
    {
      text: "Those checks are called conditionals. An if statement lets the system make a decision based on real-time data. If the condition is true — the system acts. If not — it holds.",
    },
    {
      text: "The fault is in the velocity check. I'm routing the broken script to your terminal. Fix the comparison and I'll lock the trajectory.",
      type: 'mission',
      missionId: 'nav_calibration',
    },
  ],
};
