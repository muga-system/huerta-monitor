// src/presentation/moisture/monitor-status.ts

import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

export interface MonitorStatusViewModel {
  connection: string;
  calibration: string;
  lastReading: string;
}

export const toMonitorStatusViewModel = (
  monitor: MoistureMonitor,
): MonitorStatusViewModel => {
  return {
    connection: monitor.kind === 'connected' ? 'Conectado' : 'Desconectado',

    calibration:
      monitor.kind === 'connected'
        ? monitor.calibration === 'ready'
          ? 'Lista'
          : 'Pendiente'
        : '—',

    lastReading:
      monitor.reading.kind === 'available'
        ? formatMeasuredAt(monitor.reading.measuredAt)
        : '—',
  };
};

const formatMeasuredAt = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};
