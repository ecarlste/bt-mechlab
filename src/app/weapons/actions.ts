"use server";

import { createWeapon, deleteWeaponById } from "~/data/weapon-dto";

import { Weapon, WeaponInsert, weaponInsertSchema } from "~/server/db/schema";

export async function handleDeleteWeapon(id: number) {
  try {
    await deleteWeaponById(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting weapon:", error);
    return { success: false, message: "Failed to delete weapon" };
  }
}

export async function handleSaveCopyOfWeapon(weapon: Weapon) {
  try {
    const weaponCopy = weaponInsertSchema.parse(weapon);
    weaponCopy.name = `${weaponCopy.name} Copy`;

    await createWeapon(weaponCopy);
    return { success: true };
  } catch (error) {
    console.error("Error copying weapon:", error);
    return { success: false, message: "Failed to copy weapon" };
  }
}

export async function handleWeaponFormSubmit(weapon: WeaponInsert) {
  try {
    const newWeapon = weaponInsertSchema.parse(weapon);

    await createWeapon(newWeapon);
    return { success: true };
  } catch (error) {
    console.error("Error creating weapon:", error);
    return { success: false, message: "Failed to create weapon" };
  }
}
