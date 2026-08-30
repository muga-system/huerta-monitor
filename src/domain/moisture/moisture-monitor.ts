import type { MoistureReading } from '@/domain/moisture/moisture-reading';

type UnavailableReading = Extract<MoistureReading, { kind: 'unavailable' }>;

export type MoistureMonitor =
  | {
      kind: 'disconnected';
      reading: UnavailableReading;
    }
  | {
      kind: 'connected';
      calibration: 'pending';
      reading: UnavailableReading;
    }
  | {
      kind: 'connected';
      calibration: 'ready';
      reading: MoistureReading;
    };
