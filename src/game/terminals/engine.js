export default {
  id: 'engine',
  label: 'Engine Core',
  statusLine: 'ENGINE CORE · ISP ZERO · IGNITION BLOCKED',
  ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
  sequence: [
    {
      text: "Commander. The engine core is blocked. The ignition controller is reporting a specific impulse value of zero — a physically impossible reading that is preventing the ignition sequence from being authorised.",
    },
    {
      text: "Specific impulse measures how efficiently a rocket engine uses its propellant. It is one of the primary values the ignition system uses to confirm the engine is ready for operation. The calculation exists in the control script. The issue is not the calculation itself — the calculation is never executed.",
    },
    {
      text: "This script defines a function — a named, reusable block of instructions. Defining a function does not execute it. The function only runs when it is explicitly called by name. If the return value of that function is never assigned to a variable, the result is discarded and the system reads zero.",
    },
    {
      text: "The fault script is on your terminal. The function exists. It is correct. It is never called. Fix the call and capture the return value. Confirm the Isp reading.",
      type: 'mission',
      missionId: 'engine_ignition',
    },
  ],
};
