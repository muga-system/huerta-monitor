// src/domain/moisture/moisture-calibration.ts

export interface MoistureCalibration {
  dryRaw: number;
  wetRaw: number;
}

export const calibrateMoisturePercentage = (
  rawValue: number,
  calibration: MoistureCalibration,
): number | null => {
  const { dryRaw, wetRaw } = calibration;

  if (dryRaw === wetRaw) {
    return null;
  }

  const percentage = ((rawValue - dryRaw) / (wetRaw - dryRaw)) * 100;

  return Math.round(Math.min(100, Math.max(0, percentage)));
};
