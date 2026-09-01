import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

export const DEV_MONITOR_FIXTURE_NAMES = [
  'disconnected',
  'connected-pending',
  'connected-ready',
  'dry-reading',
  'optimal-reading',
  'wet-reading',
] as const;

export type DevMonitorFixtureName = (typeof DEV_MONITOR_FIXTURE_NAMES)[number];

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
    lastSample: {
      rawValue: 2417,
      measuredAt: '2026-08-30T10:15:00-03:00',
    },
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

  'dry-reading': {
    kind: 'connected',
    calibration: 'ready',
    lastSample: {
      rawValue: 2800,
      measuredAt: '2026-08-30T10:30:00-03:00',
    },
    reading: {
      kind: 'available',
      percentage: 42,
      status: 'dry',
      measuredAt: '2026-08-30T10:30:00-03:00',
    },
  },

  'optimal-reading': {
    kind: 'connected',
    calibration: 'ready',
    lastSample: {
      rawValue: 2000,
      measuredAt: '2026-08-30T10:45:00-03:00',
    },
    reading: {
      kind: 'available',
      percentage: 63,
      status: 'optimal',
      measuredAt: '2026-08-30T10:45:00-03:00',
    },
  },

  'wet-reading': {
    kind: 'connected',
    calibration: 'ready',
    lastSample: {
      rawValue: 1200,
      measuredAt: '2026-08-30T11:00:00-03:00',
    },
    reading: {
      kind: 'available',
      percentage: 84,
      status: 'wet',
      measuredAt: '2026-08-30T11:00:00-03:00',
    },
  },
} satisfies Record<DevMonitorFixtureName, MoistureMonitor>;

export const getDevMonitorFixture = (
  name: string | null,
): MoistureMonitor | null => {
  if (!name) {
    return null;
  }

  return fixtures[name as keyof typeof fixtures] ?? null;
};
