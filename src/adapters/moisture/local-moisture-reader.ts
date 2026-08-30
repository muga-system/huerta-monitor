// src/adapters/moisture/local-moisture-reader.ts

import type { MoistureReading } from '@/domain/moisture/moisture-reading';

export const getCurrentMoistureReading =
    async (): Promise<MoistureReading> => {
        return {
            kind: 'unavailable',
        };
    };