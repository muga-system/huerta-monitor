// src/presentation/moisture/monitor-status.ts

import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

export type MonitorSampleState = 'disconnected' | 'waiting' | 'received';

export interface MonitorStatusViewModel {
  connection: string;
  sampleState: MonitorSampleState;
  sampleStatus: string;
  calibration: string;
  rawValue: string;
  lastSampleAt: string;
  lastReading: string;
}

export const toMonitorStatusViewModel = (
  monitor: MoistureMonitor,
): MonitorStatusViewModel => {
  const sampleState: MonitorSampleState =
    monitor.kind === 'disconnected'
      ? 'disconnected'
      : monitor.lastSample === null
        ? 'waiting'
        : 'received';

  const sampleStatus =
    sampleState === 'disconnected'
      ? 'Sin señal'
      : sampleState === 'waiting'
        ? 'Esperando muestra'
        : 'Muestra recibida';

  return {
    sampleState,
    sampleStatus,
    connection: monitor.kind === 'connected' ? 'Conectado' : 'Desconectado',
    calibration:
      monitor.kind === 'connected'
        ? monitor.calibration === 'ready'
          ? 'Lista'
          : 'Pendiente'
        : '—',
    rawValue:
      monitor.lastSample !== null ? String(monitor.lastSample.rawValue) : '—',
    lastSampleAt:
      monitor.lastSample !== null
        ? formatMeasuredAt(monitor.lastSample.measuredAt)
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
