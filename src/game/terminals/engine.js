export default {
  id: 'engine',
  label: 'Engine Core',
  statusLine: 'ENGINE CORE · ISP ZERO — IGNITION BLOCKED',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: 'Commander. Engine core is blocked. Specific impulse is reading zero — the ignition controller will not engage with a zero Isp value. The calculation function exists but is never called.',
    },
    {
      text: 'Functions are named, reusable blocks of instructions. A function definition only describes what to do. It does nothing until you call it by name.',
    },
    {
      text: 'When you call a function, it runs its instructions and returns a value. If you define a function but never call it — or call it but never capture its return value — the result never reaches the system.',
    },
    {
      text: "The engine script is on your terminal. Call the function correctly and assign its return value. Once Isp is confirmed, I can authorise the ignition sequence.",
      type: 'mission',
      missionId: 'engine_ignition',
    },
  ],
};
