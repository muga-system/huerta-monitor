// src\presentation\moisture\moisture-interpretation.ts

import type { MoistureMonitor } from '@/domain/moisture/moisture-monitor';

export type MoistureInterpretationTone = 'neutral' | 'dry' | 'optimal' | 'wet';

export interface MoistureInterpretationViewModel {
  tone: MoistureInterpretationTone;
  value: string;
  status: string;
  title: string;
  description: string;
}

export const toMoistureInterpretationViewModel = (
  monitor: MoistureMonitor,
): MoistureInterpretationViewModel => {
  if (monitor.reading.kind === 'unavailable') {
    return {
      tone: 'neutral',
      value: '--%',
      status: 'Sin lectura',
      title: 'Todavía no hay una condición que interpretar.',
      description:
        'El sistema necesita una lectura calibrada antes de determinar el estado de humedad del suelo.',
    };
  }

  const { percentage, status } = monitor.reading;

  if (status === 'dry') {
    return {
      tone: 'dry',
      value: `${percentage}%`,
      status: 'Seco',
      title: 'La humedad está por debajo del rango esperado.',
      description:
        'La lectura calibrada indica una condición seca. El dato puede utilizarse como señal para evaluar si corresponde regar.',
    };
  }

  if (status === 'optimal') {
    return {
      tone: 'optimal',
      value: `${percentage}%`,
      status: 'Óptimo',
      title: 'La humedad está dentro del rango esperado.',
      description:
        'La lectura calibrada se encuentra dentro del intervalo definido como adecuado para esta tierra.',
    };
  }

  return {
    tone: 'wet',
    value: `${percentage}%`,
    status: 'Húmedo',
    title: 'La humedad está por encima del rango esperado.',
    description:
      'La lectura calibrada indica una presencia de agua mayor al intervalo definido como adecuado.',
  };
};
