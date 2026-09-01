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
      calibration: '—',
      lastReading: '—',
    });
  });

  it('representa un monitor conectado pendiente de calibración', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      lastSample: null,
      calibration: 'pending',
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result).toEqual({
      connection: 'Conectado',
      calibration: 'Pendiente',
      lastReading: '—',
    });
  });

  it('representa un monitor conectado y calibrado', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      lastSample: null,
      calibration: 'ready',
      reading: {
        kind: 'unavailable',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result).toEqual({
      connection: 'Conectado',
      calibration: 'Lista',
      lastReading: '—',
    });
  });

  it('muestra una fecha cuando existe una lectura válida', () => {
    const monitor: MoistureMonitor = {
      kind: 'connected',
      lastSample: null,
      calibration: 'ready',
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
      lastSample: null,
      calibration: 'ready',
      reading: {
        kind: 'available',
        percentage: 42,
        status: 'dry',
        measuredAt: 'fecha-invalida',
      },
    };

    const result = toMonitorStatusViewModel(monitor);

    expect(result.lastReading).toBe('—');
  });
});
