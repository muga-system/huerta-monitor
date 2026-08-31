import { describe, expect, it } from 'vitest';

import {
  classifyMoisture,
  type MoistureThresholds,
} from './moisture-thresholds';

describe('classifyMoisture', () => {
  const thresholds: MoistureThresholds = {
    dryBelow: 35,
    wetAbove: 70,
  };

  it('clasifica como seco un valor por debajo del límite inferior', () => {
    expect(classifyMoisture(20, thresholds)).toBe('dry');
  });

  it('incluye el límite inferior dentro del rango óptimo', () => {
    expect(classifyMoisture(35, thresholds)).toBe('optimal');
  });

  it('clasifica como óptimo un valor dentro del rango', () => {
    expect(classifyMoisture(50, thresholds)).toBe('optimal');
  });

  it('incluye el límite superior dentro del rango óptimo', () => {
    expect(classifyMoisture(70, thresholds)).toBe('optimal');
  });

  it('clasifica como húmedo un valor por encima del límite superior', () => {
    expect(classifyMoisture(85, thresholds)).toBe('wet');
  });

  it('rechaza umbrales invertidos', () => {
    const invalidThresholds: MoistureThresholds = {
      dryBelow: 70,
      wetAbove: 35,
    };

    expect(classifyMoisture(50, invalidThresholds)).toBeNull();
  });

  it('rechaza umbrales fuera del rango porcentual', () => {
    const invalidThresholds: MoistureThresholds = {
      dryBelow: -10,
      wetAbove: 70,
    };

    expect(classifyMoisture(50, invalidThresholds)).toBeNull();
  });

  it('rechaza porcentajes fuera de 0 a 100', () => {
    expect(classifyMoisture(120, thresholds)).toBeNull();
  });
});
