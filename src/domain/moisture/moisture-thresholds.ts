import type { MoistureStatus } from './moisture-reading';

export interface MoistureThresholds {
  dryBelow: number;
  wetAbove: number;
}

export const classifyMoisture = (
  percentage: number,
  thresholds: MoistureThresholds,
): MoistureStatus | null => {
  const { dryBelow, wetAbove } = thresholds;

  const hasValidPercentage =
    Number.isFinite(percentage) && percentage >= 0 && percentage <= 100;

  const hasValidThresholds =
    Number.isFinite(dryBelow) &&
    Number.isFinite(wetAbove) &&
    dryBelow >= 0 &&
    wetAbove <= 100 &&
    dryBelow < wetAbove;

  if (!hasValidPercentage || !hasValidThresholds) {
    return null;
  }

  if (percentage < dryBelow) {
    return 'dry';
  }

  if (percentage > wetAbove) {
    return 'wet';
  }

  return 'optimal';
};
