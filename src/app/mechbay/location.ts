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

export enum ArmorSide {
  FrontArmor = "frontArmor",
  RearArmor = "rearArmor",
}

export type MechEquipmentLocationArmor = {
  maxArmor: number;
  [ArmorSide.FrontArmor]: number;
  [ArmorSide.RearArmor]: number;
};

export type MechEquipmentLocation = {
  id: Location;
  internalStructure: number;
  armor: MechEquipmentLocationArmor;
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

const headInternalStructure = 3;
const centerTorsoInternalStructure = {
  20: 6,
  25: 8,
  30: 10,
  35: 11,
  40: 12,
  45: 14,
  50: 16,
  55: 18,
  60: 20,
  65: 21,
  70: 22,
  75: 23,
  80: 25,
  85: 27,
  90: 29,
  95: 30,
  100: 31,
};
const sideTorsoInternalStructure = {
  20: 5,
  25: 6,
  30: 7,
  35: 8,
  40: 10,
  45: 11,
  50: 12,
  55: 13,
  60: 14,
  65: 15,
  70: 15,
  75: 16,
  80: 17,
  85: 18,
  90: 19,
  95: 20,
  100: 21,
};
const armInternalStructure = {
  20: 3,
  25: 4,
  30: 5,
  35: 6,
  40: 6,
  45: 7,
  50: 8,
  55: 9,
  60: 10,
  65: 10,
  70: 11,
  75: 12,
  80: 13,
  85: 14,
  90: 15,
  95: 16,
  100: 17,
};
const legInternalStructure = {
  20: 4,
  25: 6,
  30: 7,
  35: 8,
  40: 10,
  45: 11,
  50: 12,
  55: 13,
  60: 14,
  65: 15,
  70: 15,
  75: 16,
  80: 17,
  85: 18,
  90: 19,
  95: 20,
  100: 21,
};

export function getInternalStructureAmount(mechTonnage: MechTonnage, mechLocation: Location) {
  switch (mechLocation) {
    case Location.Head:
      return headInternalStructure;
    case Location.CenterTorso:
      return centerTorsoInternalStructure[mechTonnage];
    case Location.RightTorso:
    case Location.LeftTorso:
      return sideTorsoInternalStructure[mechTonnage];
    case Location.RightArm:
    case Location.LeftArm:
      return armInternalStructure[mechTonnage];
    case Location.RightLeg:
    case Location.LeftLeg:
      return legInternalStructure[mechTonnage];
  }
}
