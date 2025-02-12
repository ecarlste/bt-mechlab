export enum MechGyroType {
  Compact = "Compact",
  HeavyDuty = "Heavy-Duty",
  Standard = "Standard",
  ExtraLight = "Extra-light (XL)",
}

export const defaultMechGyroType = MechGyroType.Standard;

export type MechGyro = {
  gyroType: MechGyroType;
  weightMultiplier: number;
  slotsOccupied: number;
};

export const defaultMechGyro: MechGyro = {
  gyroType: defaultMechGyroType,
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

export type MechGyroTypeModifierValue = 0.5 | 1;

export type MechGyroTypeModifier = {
  gyroType: MechGyroType;
  modifier: MechGyroTypeModifierValue;
};

export const defaultMechGyroTypeModifier: MechGyroTypeModifier = {
  gyroType: defaultMechGyroType,
  modifier: 0.5,
};

export const mechGyroTypeModifiers: MechGyroTypeModifier[] = [
  defaultMechGyroTypeModifier,
  { gyroType: MechGyroType.Compact, modifier: 0.5 },
  { gyroType: MechGyroType.HeavyDuty, modifier: 1 },
  { gyroType: MechGyroType.ExtraLight, modifier: 0.5 },
];

export const mechGyroTypeModifiersByGyroType = mechGyroTypeModifiers.reduce(
  (acc, modifier) => {
    acc[modifier.gyroType] = modifier;
    return acc;
  },
  {} as Record<MechGyroType, MechGyroTypeModifier>,
);

export function getGyroTonnageForEngineByRating(gyro: MechGyro, engineRating: number) {
  return Math.ceil(engineRating / 100) * gyro.weightMultiplier;
}
