export enum MechGyroType {
  Compact = "Compact",
  HeavyDuty = "Heavy-Duty",
  Standard = "Standard",
  ExtraLight = "Extra-light (XL)",
}

export type MechGyro = {
  gyroType: MechGyroType;
  weightMultiplier: number;
  slotsOccupied: number;
};

export const defaultMechGyro: MechGyro = {
  gyroType: MechGyroType.Standard,
  weightMultiplier: 1.0,
  slotsOccupied: 4,
};

export const mechGyros: MechGyro[] = [
  {
    gyroType: MechGyroType.Compact,
    weightMultiplier: 1.5,
    slotsOccupied: 2,
  },
  {
    gyroType: MechGyroType.HeavyDuty,
    weightMultiplier: 2.0,
    slotsOccupied: 4,
  },
  defaultMechGyro,
  {
    gyroType: MechGyroType.ExtraLight,
    weightMultiplier: 0.5,
    slotsOccupied: 6,
  },
];

export const mechGyrosByType = mechGyros.reduce(
  (acc, gyro) => {
    acc[gyro.gyroType] = gyro;
    return acc;
  },
  {} as Record<MechGyroType, MechGyro>,
);

export function getGyroTonnageForEngineByRating(gyro: MechGyro, engineRating: number) {
  return Math.ceil(engineRating / 100) * gyro.weightMultiplier;
}
