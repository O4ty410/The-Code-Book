export default {
  id: 'fuel',
  label: 'Fuel Systems',
  statusLine: 'FUEL SYSTEM · FLOW CONTROLLER OFFLINE',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: 'Commander. The fuel flow controller is returning a fault. Thrust output has collapsed to a negative value — the propulsion system has automatically shut down the line.',
    },
    {
      text: 'Thrust is a number. Specifically: mass flow rate multiplied by exhaust velocity. That arithmetic has to be correct — a wrong operator changes the result from 1.5 million Newtons to negative 4,050.',
    },
    {
      text: 'Numbers and arithmetic are how the rocket tracks every measurable quantity. Fuel remaining, burn rate, thrust, altitude. Every value the system monitors comes from a calculation like this.',
    },
    {
      text: "The fault script is on your terminal. One operator needs to change. Fix it and I'll bring the fuel line back online.",
      type: 'mission',
      missionId: 'fuel_calculation',
    },
  ],
};
