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
      { text: "Engine core: nominal. Specific impulse confirmed: 448.8 s. Ignition sequence authorised." },
      { text: "The function `calculateIsp` was defined but never invoked. The variable `isp` remained at 0. Calling the function and assigning its return value gave the ignition controller a valid reading." },
      { text: "Defining a function creates the capability. Calling it and capturing the return value is what makes the result available to the system. Without the call, the calculation never runs.", isLast: true },
    ],
  },
};
