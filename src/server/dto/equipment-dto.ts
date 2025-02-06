import "server-only";

import { asc } from "drizzle-orm";

import { db } from "../db";
import { equipment } from "../db/schema";

export async function getAllEquipment() {
  return db.query.equipment.findMany({
    orderBy: [asc(equipment.name)],
  });
}
