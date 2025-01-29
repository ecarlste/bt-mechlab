// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { sql } from "drizzle-orm";
import { index, integer, pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `bt-mechlab_${name}`);

export const weapons = createTable(
  "weapon",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    heat: integer("heat").notNull(),
    damage: integer("damage").notNull(),
    range: varchar("range", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

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
