export default {
  id: 'power',
  label: 'Power Systems',
  statusLine: 'REACTOR CORE · 94% EFFICIENCY · NOMINAL',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: "Commander. I'm ARIA — your station intelligence. I monitor all critical systems aboard this facility. Welcome to Hangar Bay 1.",
    },
    {
      text: "Reactor core is running at 94% efficiency. All power conduits are stable. We have a clean launch window in T-minus 6 hours. Everything is holding.",
    },
    {
      text: "Before you can fly this mission, you'll need to prove you understand the systems that keep this station alive. That knowledge lives in these terminals.",
    },
    {
      text: "I'll guide you through each one. I won't waste your time — only what you need, when you need it. The rest will come from doing.",
    },
    {
      text: "Explore the other terminals around the hangar when you're ready. Each one controls a different sector of the station. Start anywhere — there's no wrong order.",
      isLast: true,
    },
  ],
};
