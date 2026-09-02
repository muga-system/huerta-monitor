import { describe, expect, it } from 'vitest';

import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

import { toMonitorStatusViewModel } from './monitor-status';

describe('toMonitorStatusViewModel', () => {
  it('representa un monitor desconectado', () => {
    const monitor: MoistureMonitor = {
      kind: 'disconnected',
      lastSample: null,
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result).toEqual({
      connection: 'Desconectado',
      sampleState: 'disconnected',
      sampleStatus: 'Sin señal',
      calibration: '—',
      rawValue: '—',
      lastSampleAt: '—',
      lastReading: '—',
    });
  });

  it('representa un monitor conectado pendiente de calibración', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'pending',
      lastSample: null,
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result).toEqual({
      connection: 'Conectado',
      sampleState: 'waiting',
      sampleStatus: 'Esperando muestra',
      calibration: 'Pendiente',
      rawValue: '—',
      lastSampleAt: '—',
      lastReading: '—',
    });
  });

  it('representa un monitor conectado y calibrado', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'ready',
      lastSample: null,
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result).toEqual({
      connection: 'Conectado',
      sampleState: 'waiting',
      sampleStatus: 'Esperando muestra',
      calibration: 'Lista',
      rawValue: '—',
      lastSampleAt: '—',
      lastReading: '—',
    });
  });

  it('muestra los datos de la última muestra', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'pending',
      lastSample: {
        rawValue: 2417,
        measuredAt: '2026-08-30T10:15:00-03:00',
      },
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result.rawValue).toBe('2417');
    expect(result.lastSampleAt).not.toBe('—');
    expect(result.lastReading).toBe('—');
    expect(result.sampleState).toBe('received');
    expect(result.sampleStatus).toBe('Muestra recibida');
  });

  it('muestra una fecha cuando existe una lectura válida', () => {
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

    const result = toMonitorStatusViewModel(monitor);

    expect(result.connection).toBe('Conectado');
    expect(result.calibration).toBe('Lista');
    expect(result.lastReading).not.toBe('—');
  });

  it('protege la interfaz frente a una fecha inválida', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      calibration: 'ready',
      lastSample: {
        rawValue: 2160,
        measuredAt: 'fecha-invalida',
      },
      reading: {
        kind: 'available',
        percentage: 42,
        status: 'dry',
        measuredAt: 'fecha-invalida',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result.lastSampleAt).toBe('—');
    expect(result.lastReading).toBe('—');
  });
});
