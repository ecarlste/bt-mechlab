import { weaponTypeColors, WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { Equipment, Weapon } from "~/server/db/schema";

import { JumpJet } from "./mech-jump-jets";

export type MechEquipmentType = Weapon | Equipment | JumpJet;

export enum MechEquipmentChange {
  Add = 1,
  Remove = -1,
}

export function getEquipmentTypeBgColor(item: MechEquipmentType) {
  let bgColor = "";
  if ("weaponType" in item) {
    bgColor = weaponTypeColors[item.weaponType as WeaponTypeEnum];
  } else {
    bgColor = "bg-secondary";
  }

  return bgColor;
}
