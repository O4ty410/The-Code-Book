export default {
  id: 'engine_ignition',
  title: 'Engine Ignition',
  objective: 'Call the calculateIsp function and assign its return value',

  challenge: {
    context: "Engine specific impulse reads zero. The `calculateIsp` function exists and is correct, but it is never called. The result is hardcoded to 0, so the engine controller rejects the ignition sequence.",
    brokenCode: `function calculateIsp(thrust, fuelFlow) {
  return thrust / (fuelFlow * 9.81);
}

let thrust   = 1540000; // N
let fuelFlow = 350;     // kg/s

let isp = 0; // ERROR: calculateIsp is defined but never called
console.log("Engine Isp: " + isp + " s");`,
    hint: 'The function is defined above. Call it with the two variables and assign the result to `isp`.',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, '');
      return stripped.includes('calculateIsp(thrust,fuelFlow)') || stripped.includes('calculateIsp(1540000,350)');
    },
  },

  success: {
    worldEffect: 'engine_online',
    dialogue: [
      {
        text: 'Engine Isp confirmed at 448.8 seconds. Ignition sequence accepted. Engine core is online.',
      },
      {
        text: 'A function is a reusable block of instructions. Defining it with `function` does nothing on its own — it only runs when you call it by name and pass it the right values.',
      },
      {
        text: 'The return value is what the function sends back. If you never capture that value — never assign it to a variable — the calculation is lost. The function ran, but nothing received the result.',
        isLast: true,
      },
    ],
  },
};
