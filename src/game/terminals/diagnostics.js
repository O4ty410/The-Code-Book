export default {
  id: 'diagnostics',
  label: 'Diagnostics',
  statusLine: 'DIAGNOSTICS · SCAN UNDERREPORTING · INDEX FAULT',
  ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
  sequence: [
    {
      text: "Commander. The diagnostic scanner is reporting incorrect data. It shows three systems online — four are active. The scan is silently missing one system on every pass. No fault alert has been raised.",
    },
    {
      text: "A spacecraft's diagnostic system runs automated scans of every subsystem — checking status, temperature, power draw, and response time. The scan moves through each system one by one in sequence. If the scan routine starts at the wrong position, one or more systems are never checked — and no error is generated.",
    },
    {
      text: "This scan uses a loop — a block of code that repeats an action for each item in a list. The loop counter controls where the scan begins. JavaScript arrays are zero-indexed: the first element is at position zero, not position one. A loop starting at index 1 silently skips the first system on every execution.",
    },
    {
      text: "The fault script is on your terminal. The loop is starting one position too late. Correct the starting index. Ensure all four systems are included in every scan.",
      type: 'mission',
      missionId: 'diagnostics_scan',
    },
  ],
};
