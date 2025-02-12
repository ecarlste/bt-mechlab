import { WeaponTypeEnum } from "../weapons/weapon-type";

export enum MechAmmoType {
  LRM5Ammo = "Ammo (LRM 5)",
  LRM10Ammo = "Ammo (LRM 10)",
  LRM15Ammo = "Ammo (LRM 15)",
  LRM20Ammo = "Ammo (LRM 20)",
  SRM2Ammo = "Ammo (SRM 2)",
  SRM4Ammo = "Ammo (SRM 4)",
  SRM6Ammo = "Ammo (SRM 6)",
  AC2Ammo = "Ammo (AC 2)",
  AC5Ammo = "Ammo (AC 5)",
  AC10Ammo = "Ammo (AC 10)",
  AC20Ammo = "Ammo (AC 20)",
  MGAmmo = "Ammo (MG)",
  MGAmmoHalf = "Ammo (MG) / Half",
}

export type MechAmmoWeight = 0.5 | 1;

export type MechAmmo = {
  name: string;
  type: MechAmmoType;
  weaponType: WeaponTypeEnum;
  ammoCount: number;
  weight: MechAmmoWeight;
  criticalSlots: number;
};

export const mechAmmoList: MechAmmo[] = [
  {
    name: "Autocannon/2 Ammo",
    type: MechAmmoType.AC2Ammo,
    weaponType: WeaponTypeEnum.Ballistic,
    ammoCount: 45,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "Autocannon/5 Ammo",
    type: MechAmmoType.AC5Ammo,
    weaponType: WeaponTypeEnum.Ballistic,
    ammoCount: 20,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "Autocannon/10 Ammo",
    type: MechAmmoType.AC10Ammo,
    weaponType: WeaponTypeEnum.Ballistic,
    ammoCount: 10,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "Autocannon/20 Ammo",
    type: MechAmmoType.AC20Ammo,
    weaponType: WeaponTypeEnum.Ballistic,
    ammoCount: 5,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "LRM 5 Ammo",
    type: MechAmmoType.LRM5Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 24,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "LRM 10 Ammo",
    type: MechAmmoType.LRM10Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 12,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "LRM 15 Ammo",
    type: MechAmmoType.LRM15Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 8,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "LRM 20 Ammo",
    type: MechAmmoType.LRM20Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 6,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "Machine Gun Ammo",
    type: MechAmmoType.MGAmmo,
    weaponType: WeaponTypeEnum.Ballistic,
    ammoCount: 200,
    weight: 0.5,
    criticalSlots: 1,
  },
  {
    name: "Machine Gun Ammo (Half)",
    type: MechAmmoType.MGAmmoHalf,
    weaponType: WeaponTypeEnum.Ballistic,
    ammoCount: 100,
    weight: 0.5,
    criticalSlots: 1,
  },
  {
    name: "SRM 2 Ammo",
    type: MechAmmoType.SRM2Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 50,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "SRM 4 Ammo",
    type: MechAmmoType.SRM4Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 25,
    weight: 1,
    criticalSlots: 1,
  },
  {
    name: "SRM 6 Ammo",
    type: MechAmmoType.SRM6Ammo,
    weaponType: WeaponTypeEnum.Missile,
    ammoCount: 15,
    weight: 1,
    criticalSlots: 1,
  },
];

export const mechAmmoByType: Record<MechAmmoType, MechAmmo> = mechAmmoList.reduce(
  (acc, ammo) => ({ ...acc, [ammo.type]: ammo }),
  {} as Record<MechAmmoType, MechAmmo>,
);
