import type { MoistureCalibration } from './moisture-calibration';
import { calibrateMoisturePercentage } from './moisture-calibration';
import type { MoistureReading } from './moisture-reading';
import type { MoistureThresholds } from './moisture-thresholds';
import { classifyMoisture } from './moisture-thresholds';

export interface CreateMoistureReadingInput {
  rawValue: number;
  measuredAt: string;
  calibration: MoistureCalibration;
  thresholds: MoistureThresholds;
}

export const createMoistureReading = ({
  rawValue,
  measuredAt,
  calibration,
  thresholds,
}: CreateMoistureReadingInput): MoistureReading => {
  const percentage = calibrateMoisturePercentage(rawValue, calibration);

  if (percentage === null) {
    return {
      kind: 'unavailable',
    };
  }

  const status = classifyMoisture(percentage, thresholds);

  if (status === null) {
    return {
      kind: 'unavailable',
    };
  }

  const timestamp = Date.parse(measuredAt);

  if (Number.isNaN(timestamp)) {
    return {
      kind: 'unavailable',
    };
  }

  return {
    kind: 'available',
    percentage,
    status,
    measuredAt,
  };
};
