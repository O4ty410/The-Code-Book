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
      {
        text: 'Thrust nominal. 1,540,000 Newtons. Fuel flow controller is back online.',
      },
      {
        text: "The `*` operator is multiplication. You used `-` subtraction — that gave a negative thrust value, which caused the propulsion system to reject the calculation entirely.",
      },
      {
        text: "Numbers and arithmetic are how the rocket tracks everything that can be measured: thrust, fuel mass, burn time, altitude. Every quantity the system monitors runs through an expression like this.",
        isLast: true,
      },
    ],
  },
};
