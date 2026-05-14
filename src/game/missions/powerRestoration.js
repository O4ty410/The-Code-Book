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
      { text: "Power distribution: nominal. Thruster Array B is receiving current. All modules at operational status." },
      { text: "The variable was declared as `power`. The log was reading `powr` — a name that was never stored. The system found nothing to retrieve and halted distribution." },
      { text: "In any script, the name used to store a value and the name used to retrieve it must match exactly. That precision is what keeps every dependent system operational.", isLast: true },
    ],
  },
};
