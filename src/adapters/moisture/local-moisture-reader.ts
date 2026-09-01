// src/adapters/moisture/local-moisture-reader.ts

import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

export const getCurrentMoistureMonitor = async (): Promise<MoistureMonitor> => {
  return {
    kind: 'disconnected',
    lastSample: null,
    reading: {
      kind: 'unavailable',
    },
  };
};
