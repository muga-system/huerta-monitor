import type { MoistureReading } from '@/domain/moisture/moisture-reading';

export type MoistureMonitor =
  | {
      kind: 'disconnected';
      reading: Extract<MoistureReading, { kind: 'unavailable' }>;
    }
  | {
      kind: 'connected';
      calibration: 'pending' | 'ready';
      reading: MoistureReading;
    };