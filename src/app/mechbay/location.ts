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
  hasDraggableOver: boolean;
};

export enum InternalStructureTechnologyBase {
  Standard = "Standard",
  EndoSteel = "EndoSteel",
}

export function getInternalStructureTonnage(mechTonnage: number, technologyBase: InternalStructureTechnologyBase) {
  switch (technologyBase) {
    case InternalStructureTechnologyBase.Standard:
      return mechTonnage * 0.1;
    case InternalStructureTechnologyBase.EndoSteel:
      return Math.ceil(mechTonnage * 0.1) / 2;
  }
}

type LightMechTonnage = 20 | 25 | 30 | 35;
type MediumMechTonnage = 40 | 45 | 50 | 55;
type HeavyMechTonnage = 60 | 65 | 70 | 75;
type AssaultMechTonnage = 80 | 85 | 90 | 95 | 100;
export type MechTonnage = LightMechTonnage | MediumMechTonnage | HeavyMechTonnage | AssaultMechTonnage;
