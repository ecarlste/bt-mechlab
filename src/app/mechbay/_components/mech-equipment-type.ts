import { weaponTypeColors, WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { Equipment, Weapon } from "~/server/db/schema";

export type MechEquipmentType = Weapon | Equipment;

export function getEquipmentTypeBgColor(item: MechEquipmentType) {
  let bgColor = "";
  if ("weaponType" in item) {
    bgColor = weaponTypeColors[item.weaponType as WeaponTypeEnum];
  } else {
    bgColor = "bg-secondary";
  }

  return bgColor;
}
