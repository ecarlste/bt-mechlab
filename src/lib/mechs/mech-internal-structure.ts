import { MechTonnage } from "./battlemech";
import { MechEquipmentLocation, MechLocation } from "./mech-equipment-location";

export enum InternalStructureType {
  Standard = "Standard",
  EndoSteel = "Endo-Steel",
}

export const defaultMechInternalStructureType = InternalStructureType.Standard;

export type MechInternalStructureTypeModifierValue = 0.5 | 1;

export type MechInternalStructureTypeModifier = {
  internalStructureType: InternalStructureType;
  modifier: MechInternalStructureTypeModifierValue;
};

export const defaultMechInternalStructureTypeModifier: MechInternalStructureTypeModifier = {
  internalStructureType: defaultMechInternalStructureType,
  modifier: 1,
};

export const mechInternalStructureTypeModifiers: MechInternalStructureTypeModifier[] = [
  defaultMechInternalStructureTypeModifier,
  {
    internalStructureType: InternalStructureType.EndoSteel,
    modifier: 1,
  },
];

export const mechInternalStructureTypeModifiersByInternalStructureType = mechInternalStructureTypeModifiers.reduce(
  (acc, modifier) => {
    acc[modifier.internalStructureType] = modifier;
    return acc;
  },
  {} as Record<InternalStructureType, MechInternalStructureTypeModifier>,
);

export function getInternalStructureTonnage(mechTonnage: MechTonnage, technologyBase: InternalStructureType) {
  switch (technologyBase) {
    case InternalStructureType.Standard:
      return mechTonnage * 0.1;
    case InternalStructureType.EndoSteel:
      return Math.ceil(mechTonnage * 0.1) / 2;
  }
}
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

export function getInternalStructureAmount(mechTonnage: MechTonnage, mechLocation: MechLocation) {
  switch (mechLocation) {
    case MechLocation.Head:
      return headInternalStructure;
    case MechLocation.CenterTorso:
      return centerTorsoInternalStructure[mechTonnage];
    case MechLocation.RightTorso:
    case MechLocation.LeftTorso:
      return sideTorsoInternalStructure[mechTonnage];
    case MechLocation.RightArm:
    case MechLocation.LeftArm:
      return armInternalStructure[mechTonnage];
    case MechLocation.RightLeg:
    case MechLocation.LeftLeg:
      return legInternalStructure[mechTonnage];
  }
}

export function getTotalMechInternalStructure(equipmentLocations: MechEquipmentLocation[]) {
  return equipmentLocations.reduce((total, location) => total + location.internalStructure, 0);
}
