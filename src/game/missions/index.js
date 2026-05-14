import powerRestoration from './powerRestoration';
import navCalibration   from './navCalibration';

const REGISTRY = {
  [powerRestoration.id]: powerRestoration,
  [navCalibration.id]:   navCalibration,
};

export function getMission(id) {
  return REGISTRY[id] ?? null;
}

export function registerMission(config) {
  REGISTRY[config.id] = config;
}
