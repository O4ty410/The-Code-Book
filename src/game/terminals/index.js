import powerSystems   from './powerSystems';
import navigation     from './navigation';
import fuel           from './fuel';
import communications from './communications';
import diagnostics    from './diagnostics';
import engine         from './engine';

const REGISTRY = {
  [powerSystems.id]:   powerSystems,
  [navigation.id]:     navigation,
  [fuel.id]:           fuel,
  [communications.id]: communications,
  [diagnostics.id]:    diagnostics,
  [engine.id]:         engine,
};

function offlineConfig(id, label) {
  return {
    id,
    label: label ?? id,
    statusLine: 'TERMINAL OFFLINE',
    offline: true,
    ai: { name: 'ARIA', title: 'Adaptive Response Intelligence' },
    sequence: [
      {
        text: `${label ?? id} terminal is currently offline. It will come online as you progress through the station.`,
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
