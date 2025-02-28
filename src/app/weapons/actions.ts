"use server";

import { weapons } from "bt-weapons-client-ts";

import { WeaponFormData } from "~/lib/schemas/weapon-schemas";

import { createWeapon, deleteWeaponById, updateWeaponById } from "~/server/dto/weapon-dto";

export async function handleDeleteWeapon(id: string) {
  try {
    await deleteWeaponById(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting weapon:", error);
    return { success: false, message: "Failed to delete weapon" };
  }
}

export async function handleSaveCopyOfWeapon(weapon: weapons.WeaponDto) {
  try {
    const weaponCopy = weapon;
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
      const updatedWeapon = weapon as weapons.UpdateWeaponDto;
      await updateWeaponById(weapon.id, updatedWeapon);
    } else {
      const newWeapon = weapon as weapons.CreateWeaponDto;
      await createWeapon(newWeapon);
    }
    return { success: true };
  } catch (error) {
    console.error("Error creating weapon:", error);
    return { success: false, message: "Failed to create weapon" };
  }
}
