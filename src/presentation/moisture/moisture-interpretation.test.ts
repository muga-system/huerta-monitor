import { describe, expect, it } from 'vitest';

import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

import { toMoistureInterpretationViewModel } from './moisture-interpretation';

describe('toMoistureInterpretationViewModel', () => {
  it('representa un monitor sin lectura como estado neutral', () => {
    const monitor: MoistureMonitor = {
      kind: 'disconnected',
      lastSample: null,
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMoistureInterpretationViewModel(monitor);

    expect(result).toEqual({
      tone: 'neutral',
      value: '--%',
      status: 'Sin lectura',
      title: 'Todavía no hay una condición que interpretar.',
      description:
        'El sistema necesita una lectura calibrada antes de determinar el estado de humedad del suelo.',
    });
  });

  it('representa una lectura seca', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'ready',
      lastSample: {
        rawValue: 2160,
        measuredAt: '2026-08-30T10:30:00-03:00',
      },
      reading: {
        kind: 'available',
        percentage: 42,
        status: 'dry',
        measuredAt: '2026-08-30T10:30:00-03:00',
      },
    };

    const result = toMoistureInterpretationViewModel(monitor);

    expect(result.tone).toBe('dry');
    expect(result.value).toBe('42%');
    expect(result.status).toBe('Seco');
  });

  it('representa una lectura óptima', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'ready',
      lastSample: {
        rawValue: 1740,
        measuredAt: '2026-08-30T10:45:00-03:00',
      },
      reading: {
        kind: 'available',
        percentage: 63,
        status: 'optimal',
        measuredAt: '2026-08-30T10:45:00-03:00',
      },
    };

    const result = toMoistureInterpretationViewModel(monitor);

    expect(result.tone).toBe('optimal');
    expect(result.value).toBe('63%');
    expect(result.status).toBe('Óptimo');
  });

  it('representa una lectura húmeda', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'ready',
      lastSample: {
        rawValue: 1320,
        measuredAt: '2026-08-30T11:00:00-03:00',
      },
      reading: {
        kind: 'available',
        percentage: 84,
        status: 'wet',
        measuredAt: '2026-08-30T11:00:00-03:00',
      },
    };

    const result = toMoistureInterpretationViewModel(monitor);

    expect(result.tone).toBe('wet');
    expect(result.value).toBe('84%');
    expect(result.status).toBe('Húmedo');
  });
});
