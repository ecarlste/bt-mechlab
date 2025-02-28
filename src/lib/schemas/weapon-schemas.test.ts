import { describe, it, expect } from "vitest";

import { TechnologyRatingEnum } from "../tech-rating";
import { WeaponFormSchema } from "./weapon-schemas";

const validWeapon = {
  id: "weapon-001",
  name: "Rotary AC/2",
  heat: "1/Shot",
  damage: "2/Shot",
  range: "4/8/16/24",
  ammoPerTon: 45,
  weight: 7,
  criticalSlots: 3,
  techRating: TechnologyRatingEnum.HighTech, // Adjust based on TechnologyRatingEnum values
};

describe("WeaponFormSchema", () => {
  it("should validate a correct weapon form", () => {
    expect(() => WeaponFormSchema.parse(validWeapon)).not.toThrow();
  });

  describe("heat validation", () => {
    it("should allow a whole number", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, heat: "5" })).not.toThrow();
    });

    it("should allow X/Shot format", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, heat: "3/Shot" })).not.toThrow();
    });

    it("should reject invalid formats", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, heat: "5.5" })).toThrow();
    });
  });

  describe("damage validation", () => {
    it("should allow a whole number", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, damage: "10" })).not.toThrow();
    });

    it("should reject non-numeric values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, damage: "abc" })).toThrow();
    });
  });

  describe("range validation", () => {
    it("should allow valid range format with increasing values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, range: "0/6/12/18" })).not.toThrow();
    });

    it("should reject non-increasing values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, range: "6/6/12/18" })).toThrow();
    });
  });

  describe("ammoPerTon validation", () => {
    it("should allow null", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, ammoPerTon: null })).not.toThrow();
    });

    it("should reject negative values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, ammoPerTon: -10 })).toThrow();
    });
  });

  describe("weight validation", () => {
    it("should allow zero and positive values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, weight: 0 })).not.toThrow();
    });

    it("should reject negative values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, weight: -3 })).toThrow();
    });
  });

  describe("criticalSlots validation", () => {
    it("should allow values >= 1", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, criticalSlots: 1 })).not.toThrow();
    });

    it("should reject zero and negative values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, criticalSlots: 0 })).toThrow();
    });
  });

  describe("techRating validation", () => {
    it("should accept valid enum values", () => {
      expect(() =>
        WeaponFormSchema.parse({ ...validWeapon, techRating: TechnologyRatingEnum.CommonTech }),
      ).not.toThrow();
    });

    it("should reject invalid values", () => {
      expect(() => WeaponFormSchema.parse({ ...validWeapon, techRating: "Z" as string })).toThrow();
    });
  });
});
