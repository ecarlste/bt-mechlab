type LightMechTonnage = 20 | 25 | 30 | 35;
type MediumMechTonnage = 40 | 45 | 50 | 55;
type HeavyMechTonnage = 60 | 65 | 70 | 75;
type AssaultMechTonnage = 80 | 85 | 90 | 95 | 100;
export type MechTonnage = LightMechTonnage | MediumMechTonnage | HeavyMechTonnage | AssaultMechTonnage;

export const criticalSlots = {
  rightArm: 8,
  rightTorso: 12,
  rightLeg: 2,
  head: 1,
  centerTorso: 2,
  leftTorso: 12,
  leftLeg: 2,
  leftArm: 8,
};
