export default {
  id: 'power_restoration',
  title: 'Power Restoration',
  objective: 'Fix the variable name error to restore thruster array B',

  challenge: {
    context: 'The power management script declares a variable called `power`, but the console.log call references `powr` — a name that doesn\'t exist. The system cannot resolve it. Fix the misspelling to restore power output.',
    brokenCode: 'let power = 100;\nconsole.log(powr);  // ERROR: powr is not defined',
    hint: 'Look at the name inside console.log — does it match exactly what was declared on line 1?',
    validate(code) {
      const stripped = code.replace(/\/\/.*/g, '').replace(/\s+/g, ' ').trim();
      return stripped.includes('console.log(power)') && !stripped.includes('console.log(powr)');
    },
  },

  success: {
    worldEffect: 'power_restored',
    dialogue: [
      {
        text: 'Power output confirmed. Thruster array B is back online. The reactor is responding normally.',
      },
      {
        text: 'What you just fixed was a variable reference error. The script declared `power`, but tried to read a name that didn\'t exist — `powr`. One missing letter, total failure.',
      },
      {
        text: 'Variables are precise by design. The name you declare is the exact name you must use — every character, every time. That rule keeps the whole system coherent.',
        isLast: true,
      },
    ],
  },
};
