import powerRestoration from './powerRestoration';

const REGISTRY = {
  [powerRestoration.id]: powerRestoration,
};

export function getMission(id) {
  return REGISTRY[id] ?? null;
}

export function registerMission(config) {
  REGISTRY[config.id] = config;
}
