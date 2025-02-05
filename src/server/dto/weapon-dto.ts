import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "~/server/db";
import { WeaponInsert, weapons, WeaponUpdate } from "~/server/db/schema";

export async function createWeapon(weapon: WeaponInsert) {
  return db.insert(weapons).values(weapon).returning();
}

export async function getWeaponById(id: number) {
  return db.query.weapons.findFirst({
    where: eq(weapons.id, id),
  });
}

export async function getAllWeapons() {
  return db.query.weapons.findMany({
    orderBy: [asc(weapons.name)],
  });
}

export async function updateWeaponById(id: number, weapon: WeaponUpdate) {
  return db.update(weapons).set(weapon).where(eq(weapons.id, id)).returning();
}

export async function deleteWeaponById(id: number) {
  return db.delete(weapons).where(eq(weapons.id, id)).returning();
}
