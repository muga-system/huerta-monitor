import type { MoistureReading } from './moisture-reading';
import type { MoistureSample } from './moisture-sample';

type UnavailableReading = Extract<MoistureReading, { kind: 'unavailable' }>;

type AvailableReading = Extract<MoistureReading, { kind: 'available' }>;

export type MoistureMonitor =
  | {
      kind: 'disconnected';
      lastSample: null;
      reading: UnavailableReading;
    }
  | {
      kind: 'connected';
      calibration: 'pending';
      lastSample: MoistureSample | null;
      reading: UnavailableReading;
    }
  | {
      kind: 'connected';
      calibration: 'ready';
      lastSample: MoistureSample | null;
      reading: UnavailableReading;
    }
  | {
      kind: 'connected';
      calibration: 'ready';
      lastSample: MoistureSample;
      reading: AvailableReading;
    };
