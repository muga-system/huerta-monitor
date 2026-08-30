// src/domain/moisture/moisture-reading.ts

export type MoistureStatus = 'dry' | 'optimal' | 'wet';

export type MoistureReading =
    | {
        kind: 'unavailable';
    }
    | {
        kind: 'available';
        percentage: number;
        status: MoistureStatus;
        measuredAt: string;
    };