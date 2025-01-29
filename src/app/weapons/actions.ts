"use server";

import { createWeapon, deleteWeaponById, updateWeaponById } from "~/data/weapon-dto";

import { Weapon, WeaponFormData, weaponInsertSchema, weaponUpdateSchema } from "~/server/db/schema";

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

export async function handleWeaponFormSubmit(weapon: WeaponFormData) {
  try {
    if (weapon.id) {
      const updatedWeapon = weaponUpdateSchema.parse(weapon);
      await updateWeaponById(weapon.id, updatedWeapon);
    } else {
      const newWeapon = weaponInsertSchema.parse(weapon);
      await createWeapon(newWeapon);
    }
    return { success: true };
  } catch (error) {
    console.error("Error creating weapon:", error);
    return { success: false, message: "Failed to create weapon" };
  }
}
