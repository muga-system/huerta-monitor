import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

export const DEV_MONITOR_FIXTURE_NAMES = [
  'disconnected',
  'connected-pending',
  'connected-ready',
  'dry-reading',
] as const;

export type DevMonitorFixtureName = (typeof DEV_MONITOR_FIXTURE_NAMES)[number];

const fixtures = {
  disconnected: {
    kind: 'disconnected',
    reading: {
      kind: 'unavailable',
    },
  },

  'connected-pending': {
    kind: 'connected',
    calibration: 'pending',
    reading: {
      kind: 'unavailable',
    },
  },

  'connected-ready': {
    kind: 'connected',
    calibration: 'ready',
    reading: {
      kind: 'unavailable',
    },
  },

  'dry-reading': {
    kind: 'connected',
    calibration: 'ready',
    reading: {
      kind: 'available',
      percentage: 42,
      status: 'dry',
      measuredAt: '2026-08-30T10:30:00-03:00',
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
