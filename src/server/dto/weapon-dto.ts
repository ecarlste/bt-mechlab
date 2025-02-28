import "server-only";

import { weapons } from "bt-weapons-client-ts";

import getRequestClient from "../clients/get-request-client";

export async function createWeapon(weapon: weapons.CreateWeaponDto) {
  const client = await getRequestClient();
  const response = await client.weapons.create({ data: weapon });

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.result as weapons.WeaponDto;
}

export async function getWeaponById(id: string) {
  const client = await getRequestClient();
  const response = await client.weapons.readOne(id);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.result as weapons.WeaponDto;
}

export async function getAllWeapons() {
  const client = await getRequestClient();
  const response = await client.weapons.read();

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.result as weapons.WeaponDto[];
}

export async function updateWeaponById(id: string, updatesForWeapon: weapons.UpdateWeaponDto) {
  const client = await getRequestClient();
  const response = await client.weapons.update(id, { data: updatesForWeapon });

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.result as weapons.WeaponDto;
}

export async function deleteWeaponById(id: string) {
  const client = await getRequestClient();
  const response = await client.weapons.destroy(id);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.result as weapons.WeaponDto;
}
