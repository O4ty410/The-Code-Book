export default {
  id: 'power',
  label: 'Power Systems',
  statusLine: 'REACTOR CORE · DISTRIBUTION FAULT · ARRAY B OFFLINE',
  ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
  sequence: [
    {
      text: "Commander. The power distribution script has a critical fault. Thruster Array B is drawing zero current. The reactor is running — but the energy is not reaching the module.",
    },
    {
      text: "A spacecraft's power system distributes electrical current from the reactor to every module on board. If the distribution script fails to read the correct value, a module loses power entirely. Reactor output makes no difference — the module is simply unreachable.",
    },
    {
      text: "This script stores the power level in a variable — a named container the system looks up by name. If the name used to retrieve that value doesn't exactly match the name it was stored under, the system throws a reference error. The module stays offline.",
    },
    {
      text: "The fault script is on your terminal. The variable is declared correctly — but it is being referenced by the wrong name. Fix the reference. Restore power to Thruster Array B.",
      type: 'mission',
      missionId: 'power_restoration',
    },
  ],
};
