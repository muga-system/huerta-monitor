import type { MoistureCalibration } from '@/domain/moisture/moisture-calibration';
import { createMoistureReading } from '@/domain/moisture/create-moisture-reading';
import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';
import type { MoistureSample } from '@/domain/moisture/moisture-sample';
import type { MoistureThresholds } from '@/domain/moisture/moisture-thresholds';

export const DEV_MONITOR_FIXTURE_NAMES = [
  'disconnected',
  'connected-pending',
  'connected-ready',
  'dry-reading',
  'optimal-reading',
  'wet-reading',
] as const;

export type DevMonitorFixtureName = (typeof DEV_MONITOR_FIXTURE_NAMES)[number];

const DEV_CALIBRATION: MoistureCalibration = {
  dryRaw: 3000,
  wetRaw: 1000,
};

const DEV_THRESHOLDS: MoistureThresholds = {
  dryBelow: 45,
  wetAbove: 75,
};

const createSample = (
  rawValue: number,
  measuredAt: string,
): MoistureSample => ({
  rawValue,
  measuredAt,
});

const createReadyMonitor = (
  rawValue: number,
  measuredAt: string,
): MoistureMonitor => {
  const sample = createSample(rawValue, measuredAt);

  return {
    kind: 'connected',
    calibration: 'ready',
    lastSample: sample,
    reading: createMoistureReading({
      sample,
      calibration: DEV_CALIBRATION,
      thresholds: DEV_THRESHOLDS,
    }),
  };
};

const fixtures = {
  disconnected: {
    kind: 'disconnected',
    lastSample: null,
    reading: {
      kind: 'unavailable',
    },
  },

  'connected-pending': {
    kind: 'connected',
    calibration: 'pending',
    lastSample: createSample(2417, '2026-08-30T10:15:00-03:00'),
    reading: {
      kind: 'unavailable',
    },
  },

  'connected-ready': {
    kind: 'connected',
    calibration: 'ready',
    lastSample: null,
    reading: {
      kind: 'unavailable',
    },
  },

  'dry-reading': createReadyMonitor(2160, '2026-08-30T10:30:00-03:00'),

  'optimal-reading': createReadyMonitor(1740, '2026-08-30T10:45:00-03:00'),

  'wet-reading': createReadyMonitor(1320, '2026-08-30T11:00:00-03:00'),
} satisfies Record<DevMonitorFixtureName, MoistureMonitor>;

export const getDevMonitorFixture = (
  name: string | null,
): MoistureMonitor | null => {
  if (!name) {
    return null;
  }

  return fixtures[name as DevMonitorFixtureName] ?? null;
};
