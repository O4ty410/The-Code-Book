import powerRestoration    from './powerRestoration';
import navCalibration      from './navCalibration';
import fuelSystem          from './fuelSystem';
import communicationSystem from './communicationSystem';
import diagnosticsSystem   from './diagnosticsSystem';
import engineSystem        from './engineSystem';

const REGISTRY = {
  [powerRestoration.id]:    powerRestoration,
  [navCalibration.id]:      navCalibration,
  [fuelSystem.id]:          fuelSystem,
  [communicationSystem.id]: communicationSystem,
  [diagnosticsSystem.id]:   diagnosticsSystem,
  [engineSystem.id]:        engineSystem,
};

export function getMission(id) {
  return REGISTRY[id] ?? null;
}

export function registerMission(config) {
  REGISTRY[config.id] = config;
}
