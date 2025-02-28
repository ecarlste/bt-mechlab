import { weapons } from "bt-weapons-client-ts";

import { weaponTypeColors, WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { MechAmmo } from "./mech-ammo";
import { Equipment } from "./mech-equipment";
import { JumpJet } from "./mech-jump-jets";

export type MechEquipmentType = weapons.WeaponDto | Equipment | JumpJet | MechAmmo;

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
