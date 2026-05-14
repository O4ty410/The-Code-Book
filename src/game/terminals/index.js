import powerSystems from './powerSystems';

const REGISTRY = {
  [powerSystems.id]: powerSystems,
};

// Terminals not yet in the registry show this message.
function offlineConfig(id, label) {
  return {
    id,
    label: label ?? id,
    statusLine: 'TERMINAL OFFLINE',
    offline: true,
    ai: {
      name: 'ARIA',
      title: 'Adaptive Response Intelligence',
    },
    sequence: [
      {
        text: `${label ?? id} terminal is currently offline. It will come online as you progress through the station. Check back after completing other sectors.`,
        isLast: true,
      },
    ],
  };
}

export function getTerminal(id, label) {
  return REGISTRY[id] ?? offlineConfig(id, label);
}

export function registerTerminal(config) {
  REGISTRY[config.id] = config;
}
