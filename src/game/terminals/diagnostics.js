export default {
  id: 'diagnostics',
  label: 'Diagnostics',
  statusLine: 'DIAGNOSTICS · SCAN REPORTING FAULT',
  ai: {
    name: 'ARIA',
    title: 'Adaptive Response Intelligence',
  },
  sequence: [
    {
      text: "Commander. The diagnostics scanner is underreporting. It shows three systems online — we have four. The scan loop has an off-by-one error and is skipping the first system entirely.",
    },
    {
      text: 'Loops are how the station processes repeating tasks — scanning every system in sequence, reading every sensor, iterating through every value in a list.',
    },
    {
      text: 'In JavaScript, arrays start at index zero. If a loop begins at index 1, it silently skips whatever is at position 0. No error. No warning. Just a missing result.',
    },
    {
      text: "The broken scan script is on your terminal. Correct the loop start index and the scanner will check all systems correctly.",
      type: 'mission',
      missionId: 'diagnostics_scan',
    },
  ],
};
