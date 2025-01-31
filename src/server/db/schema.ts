// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `bt-mechlab_${name}`);

export enum WeaponTypeEnum {
  Ballistic = "ballistic",
  Energy = "energy",
  Missile = "missile",
}
const weaponEnumValues = Object.values(WeaponTypeEnum) as [string, ...string[]];
export const weaponTypeEnum = pgEnum("weapon_type", weaponEnumValues);

export enum TechnologyRatingEnum {
  Primitive = "A",
  LowTech = "B",
  CommonTech = "C",
  HighTech = "D",
  Advanced = "E",
  HyperAdvanced = "F",
}
const technologyRatingEnumValues = Object.values(TechnologyRatingEnum) as [string, ...string[]];
export const technologyRatingEnum = pgEnum("technology_rating", technologyRatingEnumValues);

export const weapons = createTable("weapon", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  heat: integer("heat").notNull(),
  damage: integer("damage").notNull(),
  range: varchar("range", { length: 256 }).notNull(),
  weaponType: weaponTypeEnum("weapon_type").notNull(),
  techRating: technologyRatingEnum("tech_rating").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
});

export const weaponsRelations = relations(weapons, ({ one }) => ({
  technologyRating: one(technologyRatings, {
    fields: [weapons.techRating],
    references: [technologyRatings.rating],
  }),
}));

export const technologyRatings = createTable("technology_rating", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  rating: technologyRatingEnum("rating").unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
});

export const weaponSelectSchema = createSelectSchema(weapons);
export const weaponInsertSchema = createInsertSchema(weapons).omit({ id: true, createdAt: true, updatedAt: true });
export const weaponUpdateSchema = createUpdateSchema(weapons).omit({ id: true, createdAt: true, updatedAt: true });
export const weaponDeleteSchema = createUpdateSchema(weapons).pick({ id: true });
export const weaponFormSchema = createSelectSchema(weapons)
  .partial({ id: true })
  .omit({ createdAt: true, updatedAt: true });

export type Weapon = z.infer<typeof weaponSelectSchema>;
export type WeaponInsert = z.infer<typeof weaponInsertSchema>;
export type WeaponUpdate = z.infer<typeof weaponUpdateSchema>;
export type WeaponFormData = z.infer<typeof weaponFormSchema>;
