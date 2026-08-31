import type { MoistureCalibration } from './moisture-calibration';
import { calibrateMoisturePercentage } from './moisture-calibration';
import type { MoistureReading } from './moisture-reading';
import type { MoistureThresholds } from './moisture-thresholds';
import { classifyMoisture } from './moisture-thresholds';
import type { MoistureSample } from './moisture-sample';

export interface CreateMoistureReadingInput {
  sample: MoistureSample;
  calibration: MoistureCalibration;
  thresholds: MoistureThresholds;
}

export const createMoistureReading = ({
  sample,
  calibration,
  thresholds,
}: CreateMoistureReadingInput): MoistureReading => {
  const { rawValue, measuredAt } = sample;
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
