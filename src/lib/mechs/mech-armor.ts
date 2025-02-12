import { MechEquipmentLocation } from "./mech-equipment-location";

export enum MechArmorType {
  Standard = "Standard",
}

export const defaultMechArmorType = MechArmorType.Standard;

export type MechArmorTypeModifierValue = 0.5 | 1;

export type MechArmorTypeModifier = {
  armorType: MechArmorType;
  modifier: MechArmorTypeModifierValue;
};

export const defaultMechArmorTypeModifier: MechArmorTypeModifier = {
  armorType: MechArmorType.Standard,
  modifier: 1,
};

export const mechArmorTypeModifiers: MechArmorTypeModifier[] = [defaultMechArmorTypeModifier];

export const mechArmorTypeModifiersByArmorType = mechArmorTypeModifiers.reduce(
  (acc, modifier) => {
    acc[modifier.armorType] = modifier;
    return acc;
  },
  {} as Record<MechArmorType, MechArmorTypeModifier>,
);

export enum ArmorSide {
  FrontArmor = "frontArmor",
  RearArmor = "rearArmor",
}

export function getMechArmorTonnage(totalArmor: number) {
  // 1 ton of armor = 16 points of armor
  // round up to the nearest half ton
  return Math.ceil((totalArmor / 16) * 2) / 2;
}

export function getTotalMechArmor(equipmentLocations: MechEquipmentLocation[]) {
  return equipmentLocations.reduce((acc, location) => {
    return acc + location.armor.frontArmor + location.armor.rearArmor;
  }, 0);
}
