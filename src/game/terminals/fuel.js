export default {
  id: 'fuel',
  label: 'Fuel Systems',
  statusLine: 'FUEL SYSTEM · THRUST NEGATIVE · PROPULSION LINE SHUT DOWN',
  ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
  sequence: [
    {
      text: "Commander. The fuel flow controller has shut down the propulsion line. Thrust output is reading negative — a physically impossible value that caused the system to reject the engine command automatically.",
    },
    {
      text: "Rocket thrust is produced by burning propellant and expelling exhaust at high velocity. The controller calculates the force from two values: how fast propellant flows into the combustion chamber, and how fast exhaust exits the nozzle. These two quantities must be multiplied together. The wrong arithmetic operation produces a result that violates the system's safety limits.",
    },
    {
      text: "This calculation uses number arithmetic. JavaScript provides four operators: addition, subtraction, multiplication, and division. Each produces a fundamentally different result. The wrong operator here causes the thrust value to collapse below zero — a value the engine controller cannot act on.",
    },
    {
      text: "The fault script is on your terminal. One arithmetic operator needs to be changed. Restore a valid positive thrust value to clear the engine command.",
      type: 'mission',
      missionId: 'fuel_calculation',
    },
  ],
};
