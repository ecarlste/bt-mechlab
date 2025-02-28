import "server-only";

import { weapons } from "bt-weapons-client-ts";

import getRequestClient from "../clients/get-request-client";

function handleErrorResponse(response: weapons.WeaponResponse) {
  if (!response.success) {
    throw new Error(response.message);
  }
}

export async function createWeapon(weapon: weapons.CreateWeaponDto) {
  const client = getRequestClient();
  const response = await client.weapons.create({ data: weapon });

  handleErrorResponse(response);

  return response.result as weapons.WeaponDto;
}

export async function getWeaponById(id: string) {
  const client = getRequestClient();
  const response = await client.weapons.readOne(id);

  handleErrorResponse(response);

  return response.result as weapons.WeaponDto;
}

export async function getAllWeapons() {
  const client = getRequestClient();
  const response = await client.weapons.read();

  handleErrorResponse(response);

  return response.result as weapons.WeaponDto[];
}

export async function updateWeaponById(id: string, updatesForWeapon: weapons.UpdateWeaponDto) {
  const client = getRequestClient();
  const response = await client.weapons.update(id, { data: updatesForWeapon });

  handleErrorResponse(response);

  return response.result as weapons.WeaponDto;
}

export async function deleteWeaponById(id: string) {
  const client = getRequestClient();
  const response = await client.weapons.destroy(id);

  handleErrorResponse(response);

  return response.result as weapons.WeaponDto;
}
