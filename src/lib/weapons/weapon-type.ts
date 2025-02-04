export enum WeaponTypeEnum {
  Ballistic = "ballistic",
  Energy = "energy",
  Missile = "missile",
}

export const weaponTypeColors = {
  [WeaponTypeEnum.Ballistic]: "bg-purple-800",
  [WeaponTypeEnum.Energy]: "bg-blue-800",
  [WeaponTypeEnum.Missile]: "bg-green-800",
};
