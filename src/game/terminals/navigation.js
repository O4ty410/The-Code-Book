export default {
  id: 'nav',
  label: 'Navigation',
  statusLine: 'GUIDANCE COMPUTER · TRAJECTORY LOGIC FAULT',
  ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
  sequence: [
    {
      text: "Commander. The guidance computer has flagged a logic fault in the trajectory script. The script is supposed to confirm whether current velocity is sufficient for orbital insertion — but it is producing an incorrect result on every evaluation.",
    },
    {
      text: "A guidance computer makes real-time decisions during flight — checking whether speed, altitude, and trajectory meet the conditions required for each mission phase. If the decision logic is wrong, the computer will execute the wrong path even when all other systems are nominal.",
    },
    {
      text: "This script makes a decision using a conditional — an if statement that checks whether a condition is true. The fault is in the comparison operator. The assignment operator `=` stores a value into a variable. The comparison operator `>=` checks whether a value meets a threshold. They look almost identical but do opposite things.",
    },
    {
      text: "The fault script is on your terminal. One character separates a correct comparison from a broken assignment. Fix the operator. Confirm the trajectory check.",
      type: 'mission',
      missionId: 'nav_calibration',
    },
  ],
};
