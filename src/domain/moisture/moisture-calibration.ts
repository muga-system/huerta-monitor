export interface MoistureCalibration {
  dryRaw: number;
  wetRaw: number;
}

export const calibrateMoisturePercentage = (
  rawValue: number,
  calibration: MoistureCalibration,
): number | null => {
  const { dryRaw, wetRaw } = calibration;

  const hasValidValues =
    Number.isFinite(rawValue) &&
    Number.isFinite(dryRaw) &&
    Number.isFinite(wetRaw);

  if (!hasValidValues || dryRaw === wetRaw) {
    return null;
  }

  const percentage = ((rawValue - dryRaw) / (wetRaw - dryRaw)) * 100;

  return Math.round(Math.min(100, Math.max(0, percentage)));
};
