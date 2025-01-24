import { MechEquipmentType } from "./_components/mech-equipment-type";

export enum Location {
  RightArm = "rightArm",
  RightTorso = "rightTorso",
  RightLeg = "rightLeg",
  Head = "head",
  CenterTorso = "centerTorso",
  LeftTorso = "leftTorso",
  LeftLeg = "leftLeg",
  LeftArm = "leftArm",
}

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

export type MechEquipmentLocation = {
  id: Location;
  criticalSlots: number;
  criticalSlotsUsed: number;
  installedEquipment: MechEquipmentType[];
};
