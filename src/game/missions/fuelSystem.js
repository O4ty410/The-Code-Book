export default {
  id: 'fuel_calculation',
  title: 'Fuel Calculation',
  objective: 'Fix the arithmetic operator in the thrust calculation',

  challenge: {
    context: "The fuel flow controller is producing negative thrust values. The formula is correct — thrust equals mass flow rate multiplied by exhaust velocity — but the operator is wrong.",
    brokenCode: `let massFlow = 350;         // kg/s — propellant flow rate
let exhaustVelocity = 4400; // m/s — exhaust exit speed

let thrust = massFlow - exhaustVelocity; // ERROR: wrong operator
console.log("Thrust: " + thrust + " N");`,
    hint: 'Thrust = mass flow rate × exhaust velocity. Which operator means multiply?',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('massFlow*exhaustVelocity') || stripped.includes('350*4400');
    },
  },

  success: {
    worldEffect: 'fuel_online',
    dialogue: [
      { text: "Fuel flow controller: nominal. Thrust output: 1,540,000 N. Engine command accepted. Propulsion line cleared." },
      { text: "The script used subtraction: 350 minus 4,400. Result: -4,050 — a negative thrust value the engine controller refused. Multiplication gives 1,540,000 N — a physically valid force." },
      { text: "Numbers are how the rocket quantifies everything measurable. Every calculated value must use the correct operation, or the downstream systems receive data they cannot use.", isLast: true },
    ],
  },
};
