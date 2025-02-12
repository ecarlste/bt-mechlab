import { MechEquipmentType } from "../equipment/mech-equipment-type";
import { ArmorSide } from "./mech-armor";

export type MechEquipmentLocationArmor = {
  maxArmor: number;
  [ArmorSide.FrontArmor]: number;
  [ArmorSide.RearArmor]: number;
};

export type MechEquipmentLocation = {
  id: MechLocation;
  internalStructure: number;
  armor: MechEquipmentLocationArmor;
  criticalSlots: number;
  criticalSlotsUsed: number;
  installedEquipment: MechEquipmentType[];
  hasDraggableOver: boolean;
};

export enum MechLocation {
  RightArm = "rightArm",
  RightTorso = "rightTorso",
  RightLeg = "rightLeg",
  Head = "head",
  CenterTorso = "centerTorso",
  LeftTorso = "leftTorso",
  LeftLeg = "leftLeg",
  LeftArm = "leftArm",
}
