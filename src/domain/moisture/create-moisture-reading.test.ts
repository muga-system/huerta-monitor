import { describe, expect, it } from 'vitest';

import type { MoistureCalibration } from './moisture-calibration';
import { createMoistureReading } from './create-moisture-reading';
import type { MoistureSample } from './moisture-sample';
import type { MoistureThresholds } from './moisture-thresholds';

describe('createMoistureReading', () => {
  const calibration: MoistureCalibration = {
    dryRaw: 3000,
    wetRaw: 1000,
  };

  const thresholds: MoistureThresholds = {
    dryBelow: 35,
    wetAbove: 70,
  };

  const measuredAt = '2026-08-31T13:00:00-03:00';

  const createSample = (rawValue: number): MoistureSample => ({
    rawValue,
    measuredAt,
  });

  it('crea una lectura seca', () => {
    expect(
      createMoistureReading({
        sample: createSample(2800),
        calibration,
        thresholds,
      }),
    ).toEqual({
      kind: 'available',
      percentage: 10,
      status: 'dry',
      measuredAt,
    });
  });

  it('crea una lectura óptima', () => {
    expect(
      createMoistureReading({
        sample: createSample(2000),
        calibration,
        thresholds,
      }),
    ).toEqual({
      kind: 'available',
      percentage: 50,
      status: 'optimal',
      measuredAt,
    });
  });

  it('crea una lectura húmeda', () => {
    expect(
      createMoistureReading({
        sample: createSample(1200),
        calibration,
        thresholds,
      }),
    ).toEqual({
      kind: 'available',
      percentage: 90,
      status: 'wet',
      measuredAt,
    });
  });

  it('devuelve una lectura no disponible si la calibración es inválida', () => {
    expect(
      createMoistureReading({
        sample: createSample(2000),
        calibration: {
          dryRaw: 2000,
          wetRaw: 2000,
        },
        thresholds,
      }),
    ).toEqual({
      kind: 'unavailable',
    });
  });

  it('devuelve una lectura no disponible si los umbrales son inválidos', () => {
    expect(
      createMoistureReading({
        sample: createSample(2000),
        calibration,
        thresholds: {
          dryBelow: 80,
          wetAbove: 30,
        },
      }),
    ).toEqual({
      kind: 'unavailable',
    });
  });

  it('devuelve una lectura no disponible si la fecha es inválida', () => {
    expect(
      createMoistureReading({
        sample: {
          rawValue: 2000,
          measuredAt: 'fecha-invalida',
        },
        calibration,
        thresholds,
      }),
    ).toEqual({
      kind: 'unavailable',
    });
  });
});
