// src/domain/moisture/moisture-calibration.test.ts

import { describe, expect, it } from 'vitest';

import {
  calibrateMoisturePercentage,
  type MoistureCalibration,
} from './moisture-calibration';

describe('calibrateMoisturePercentage', () => {
  const calibration: MoistureCalibration = {
    dryRaw: 3000,
    wetRaw: 1000,
  };

  it('convierte la referencia seca en 0%', () => {
    expect(calibrateMoisturePercentage(3000, calibration)).toBe(0);
  });

  it('convierte la referencia húmeda en 100%', () => {
    expect(calibrateMoisturePercentage(1000, calibration)).toBe(100);
  });

  it('interpola valores entre ambas referencias', () => {
    expect(calibrateMoisturePercentage(2000, calibration)).toBe(50);
  });

  it('limita valores inferiores al rango', () => {
    expect(calibrateMoisturePercentage(3500, calibration)).toBe(0);
  });

  it('limita valores superiores al rango', () => {
    expect(calibrateMoisturePercentage(500, calibration)).toBe(100);
  });

  it('funciona aunque la dirección del sensor esté invertida', () => {
    const invertedCalibration: MoistureCalibration = {
      dryRaw: 1000,
      wetRaw: 3000,
    };

    expect(calibrateMoisturePercentage(2000, invertedCalibration)).toBe(50);
  });

  it('rechaza una calibración sin rango', () => {
    const invalidCalibration: MoistureCalibration = {
      dryRaw: 2000,
      wetRaw: 2000,
    };

    expect(calibrateMoisturePercentage(2000, invalidCalibration)).toBeNull();
  });
});
