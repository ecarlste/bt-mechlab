import { z } from "zod";

import { TechnologyRatingEnum } from "../tech-rating";
import { WeaponTypeEnum } from "../weapons/weapon-type";

const singleNumberRegex = /^\d+$/;
const perShotRegex = /^\d+\/Shot$/;
const rangeBinRegex = /^\d+\/\d+\/\d+\/\d+$/;

const heatRegex = new RegExp(`^(${singleNumberRegex.source}|${perShotRegex.source})$`);
const damageRegex = new RegExp(`^(${singleNumberRegex.source}|${perShotRegex.source}|${rangeBinRegex.source})$`);

type RangeSplit = [number, number, number, number];

// Refinement for range validation: Ensures increasing values
const rangeSchema = z
  .string()
  .regex(rangeBinRegex, "Invalid range format. Use 'X/Y/Z/W' with increasing whole numbers")
  .refine((val) => {
    const [minimumRange, shortRange, mediumRange, longRange] = val.split("/").map(Number) as RangeSplit;
    return minimumRange < shortRange && shortRange < mediumRange && mediumRange < longRange;
  }, "Each range value must be greater than the previous one");

// Refinement for damage validation: If in "X/Y/Z/W" format, check for whole numbers
const damageSchema = z
  .string()
  .regex(damageRegex, "Invalid damage format. Use a single number, 'X/Shot', or 'X/Y/Z/W'")
  .refine((val) => {
    if (rangeBinRegex.test(val)) {
      return val.split("/").every((num) => singleNumberRegex.test(num));
    }
    return true; // all other patterns already validated by regex
  }, "All damage values must be whole numbers");

export const WeaponFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty(),
  heat: z.string().regex(heatRegex, "Invalid heat format. Use a whole number or 'X/Shot'"),
  damage: damageSchema,
  range: rangeSchema,
  ammoPerTon: z
    .number()
    .nullable()
    .refine((val) => val === null || val >= 0, "Ammo per ton must be non-negative"),
  weight: z.number().min(0, "Weight must be non-negative"),
  criticalSlots: z.number().min(1, "Critical slots must be at least 1"),
  techRating: z.nativeEnum(TechnologyRatingEnum),
  weaponType: z.nativeEnum(WeaponTypeEnum),
});

export type WeaponFormData = z.infer<typeof WeaponFormSchema>;
