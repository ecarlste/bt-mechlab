export type MechEngineRating =
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
  | 50
  | 55
  | 60
  | 65
  | 70
  | 75
  | 80
  | 85
  | 90
  | 95
  | 100
  | 105
  | 110
  | 115
  | 120
  | 125
  | 130
  | 135
  | 140
  | 145
  | 150
  | 155
  | 160
  | 165
  | 170
  | 175
  | 180
  | 185
  | 190
  | 195
  | 200
  | 205
  | 210
  | 215
  | 220
  | 225
  | 230
  | 235
  | 240
  | 245
  | 250
  | 255
  | 260
  | 265
  | 270
  | 275
  | 280
  | 285
  | 290
  | 295
  | 300
  | 305
  | 310
  | 315
  | 320
  | 325
  | 330
  | 335
  | 340
  | 345
  | 350
  | 355
  | 360
  | 365
  | 370
  | 375
  | 380
  | 385
  | 390
  | 395
  | 400;

export enum MechEngineType {
  Standard = "Standard",
  Light = "Light",
  Compact = "Compact",
  InnerSphereXL = "Inner Sphere XL",
  ClanXL = "Clan XL",
}

export const defaultEngineType = MechEngineType.Standard;

export type MechEngineTypeModifierValue = 0.5 | 0.75 | 1;

export type MechEngineTypeModifier = {
  engineType: MechEngineType;
  modifier: MechEngineTypeModifierValue;
};

export const defaultMechEngineTypeModifier: MechEngineTypeModifier = {
  engineType: defaultEngineType,
  modifier: 1,
};

export const mechEngineTypeModifiers: MechEngineTypeModifier[] = [
  defaultMechEngineTypeModifier,
  { engineType: MechEngineType.Light, modifier: 0.75 },
  { engineType: MechEngineType.Compact, modifier: 1 },
  { engineType: MechEngineType.InnerSphereXL, modifier: 0.5 },
  { engineType: MechEngineType.ClanXL, modifier: 0.75 },
];

export const mechEngineTypeModifiersByEngineType = mechEngineTypeModifiers.reduce(
  (acc, modifier) => {
    acc[modifier.engineType] = modifier;
    return acc;
  },
  {} as Record<MechEngineType, MechEngineTypeModifier>,
);

export type MechEngine = {
  engineRating: MechEngineRating;
  tonnage: number;
  integralHeatSinks: number;
  maxIntegralHeatSinks: number;
};

export const defaultMechEngine: MechEngine = {
  engineRating: 20,
  tonnage: 0.5,
  integralHeatSinks: 0,
  maxIntegralHeatSinks: 1,
};

export const mechEngines: MechEngine[] = [
  defaultMechEngine,
  { engineRating: 25, tonnage: 0.5, integralHeatSinks: 0, maxIntegralHeatSinks: 1 },
  { engineRating: 30, tonnage: 1, integralHeatSinks: 0, maxIntegralHeatSinks: 1 },
  { engineRating: 35, tonnage: 1, integralHeatSinks: 0, maxIntegralHeatSinks: 1 },
  { engineRating: 40, tonnage: 1, integralHeatSinks: 0, maxIntegralHeatSinks: 1 },
  { engineRating: 45, tonnage: 1, integralHeatSinks: 0, maxIntegralHeatSinks: 1 },
  { engineRating: 50, tonnage: 1.5, integralHeatSinks: 0, maxIntegralHeatSinks: 2 },
  { engineRating: 55, tonnage: 1.5, integralHeatSinks: 0, maxIntegralHeatSinks: 2 },
  { engineRating: 60, tonnage: 1.5, integralHeatSinks: 0, maxIntegralHeatSinks: 2 },
  { engineRating: 65, tonnage: 2, integralHeatSinks: 0, maxIntegralHeatSinks: 2 },
  { engineRating: 70, tonnage: 2, integralHeatSinks: 0, maxIntegralHeatSinks: 2 },
  { engineRating: 75, tonnage: 2, integralHeatSinks: 0, maxIntegralHeatSinks: 3 },
  { engineRating: 80, tonnage: 2.5, integralHeatSinks: 0, maxIntegralHeatSinks: 3 },
  { engineRating: 85, tonnage: 2.5, integralHeatSinks: 0, maxIntegralHeatSinks: 3 },
  { engineRating: 90, tonnage: 3, integralHeatSinks: 0, maxIntegralHeatSinks: 3 },
  { engineRating: 95, tonnage: 3, integralHeatSinks: 0, maxIntegralHeatSinks: 3 },
  { engineRating: 100, tonnage: 3, integralHeatSinks: 0, maxIntegralHeatSinks: 4 },
  { engineRating: 105, tonnage: 3.5, integralHeatSinks: 0, maxIntegralHeatSinks: 4 },
  { engineRating: 110, tonnage: 3.5, integralHeatSinks: 0, maxIntegralHeatSinks: 4 },
  { engineRating: 115, tonnage: 4, integralHeatSinks: 0, maxIntegralHeatSinks: 4 },
  { engineRating: 120, tonnage: 4, integralHeatSinks: 0, maxIntegralHeatSinks: 4 },
  { engineRating: 125, tonnage: 4, integralHeatSinks: 0, maxIntegralHeatSinks: 5 },
  { engineRating: 130, tonnage: 4.5, integralHeatSinks: 0, maxIntegralHeatSinks: 5 },
  { engineRating: 135, tonnage: 4.5, integralHeatSinks: 0, maxIntegralHeatSinks: 5 },
  { engineRating: 140, tonnage: 5, integralHeatSinks: 0, maxIntegralHeatSinks: 5 },
  { engineRating: 145, tonnage: 5, integralHeatSinks: 0, maxIntegralHeatSinks: 5 },
  { engineRating: 150, tonnage: 5.5, integralHeatSinks: 0, maxIntegralHeatSinks: 6 },
  { engineRating: 155, tonnage: 5.5, integralHeatSinks: 0, maxIntegralHeatSinks: 6 },
  { engineRating: 160, tonnage: 6, integralHeatSinks: 0, maxIntegralHeatSinks: 6 },
  { engineRating: 165, tonnage: 6, integralHeatSinks: 0, maxIntegralHeatSinks: 6 },
  { engineRating: 170, tonnage: 6, integralHeatSinks: 0, maxIntegralHeatSinks: 6 },
  { engineRating: 175, tonnage: 7, integralHeatSinks: 0, maxIntegralHeatSinks: 7 },
  { engineRating: 180, tonnage: 7, integralHeatSinks: 0, maxIntegralHeatSinks: 7 },
  { engineRating: 185, tonnage: 7.5, integralHeatSinks: 0, maxIntegralHeatSinks: 7 },
  { engineRating: 190, tonnage: 7.5, integralHeatSinks: 0, maxIntegralHeatSinks: 7 },
  { engineRating: 195, tonnage: 8, integralHeatSinks: 0, maxIntegralHeatSinks: 7 },
  { engineRating: 200, tonnage: 8.5, integralHeatSinks: 0, maxIntegralHeatSinks: 8 },
  { engineRating: 205, tonnage: 8.5, integralHeatSinks: 0, maxIntegralHeatSinks: 8 },
  { engineRating: 210, tonnage: 9, integralHeatSinks: 0, maxIntegralHeatSinks: 8 },
  { engineRating: 215, tonnage: 9.5, integralHeatSinks: 0, maxIntegralHeatSinks: 8 },
  { engineRating: 220, tonnage: 10, integralHeatSinks: 0, maxIntegralHeatSinks: 8 },
  { engineRating: 225, tonnage: 10, integralHeatSinks: 0, maxIntegralHeatSinks: 9 },
  { engineRating: 230, tonnage: 10.5, integralHeatSinks: 0, maxIntegralHeatSinks: 9 },
  { engineRating: 235, tonnage: 11, integralHeatSinks: 0, maxIntegralHeatSinks: 9 },
  { engineRating: 240, tonnage: 11.5, integralHeatSinks: 0, maxIntegralHeatSinks: 9 },
  { engineRating: 245, tonnage: 12, integralHeatSinks: 0, maxIntegralHeatSinks: 9 },
  { engineRating: 250, tonnage: 12.5, integralHeatSinks: 0, maxIntegralHeatSinks: 10 },
  { engineRating: 255, tonnage: 13, integralHeatSinks: 0, maxIntegralHeatSinks: 10 },
  { engineRating: 260, tonnage: 13.5, integralHeatSinks: 0, maxIntegralHeatSinks: 10 },
  { engineRating: 265, tonnage: 14, integralHeatSinks: 0, maxIntegralHeatSinks: 10 },
  { engineRating: 270, tonnage: 14.5, integralHeatSinks: 0, maxIntegralHeatSinks: 10 },
  { engineRating: 275, tonnage: 15.5, integralHeatSinks: 0, maxIntegralHeatSinks: 11 },
  { engineRating: 280, tonnage: 16, integralHeatSinks: 0, maxIntegralHeatSinks: 11 },
  { engineRating: 285, tonnage: 16.5, integralHeatSinks: 0, maxIntegralHeatSinks: 11 },
  { engineRating: 290, tonnage: 17.5, integralHeatSinks: 0, maxIntegralHeatSinks: 11 },
  { engineRating: 295, tonnage: 18, integralHeatSinks: 0, maxIntegralHeatSinks: 11 },
  { engineRating: 300, tonnage: 19, integralHeatSinks: 0, maxIntegralHeatSinks: 12 },
  { engineRating: 305, tonnage: 19.5, integralHeatSinks: 0, maxIntegralHeatSinks: 12 },
  { engineRating: 310, tonnage: 20.5, integralHeatSinks: 0, maxIntegralHeatSinks: 12 },
  { engineRating: 315, tonnage: 21.5, integralHeatSinks: 0, maxIntegralHeatSinks: 12 },
  { engineRating: 320, tonnage: 22.5, integralHeatSinks: 0, maxIntegralHeatSinks: 12 },
  { engineRating: 325, tonnage: 23.5, integralHeatSinks: 0, maxIntegralHeatSinks: 13 },
  { engineRating: 330, tonnage: 24.5, integralHeatSinks: 0, maxIntegralHeatSinks: 13 },
  { engineRating: 335, tonnage: 25.5, integralHeatSinks: 0, maxIntegralHeatSinks: 13 },
  { engineRating: 340, tonnage: 27, integralHeatSinks: 0, maxIntegralHeatSinks: 13 },
  { engineRating: 345, tonnage: 28.5, integralHeatSinks: 0, maxIntegralHeatSinks: 13 },
  { engineRating: 350, tonnage: 29.5, integralHeatSinks: 0, maxIntegralHeatSinks: 14 },
  { engineRating: 355, tonnage: 31.5, integralHeatSinks: 0, maxIntegralHeatSinks: 14 },
  { engineRating: 360, tonnage: 33, integralHeatSinks: 0, maxIntegralHeatSinks: 14 },
  { engineRating: 365, tonnage: 34.5, integralHeatSinks: 0, maxIntegralHeatSinks: 14 },
  { engineRating: 370, tonnage: 36.5, integralHeatSinks: 0, maxIntegralHeatSinks: 14 },
  { engineRating: 375, tonnage: 38.5, integralHeatSinks: 0, maxIntegralHeatSinks: 15 },
  { engineRating: 380, tonnage: 41, integralHeatSinks: 0, maxIntegralHeatSinks: 15 },
  { engineRating: 385, tonnage: 43.5, integralHeatSinks: 0, maxIntegralHeatSinks: 15 },
  { engineRating: 390, tonnage: 46, integralHeatSinks: 0, maxIntegralHeatSinks: 15 },
  { engineRating: 395, tonnage: 49, integralHeatSinks: 0, maxIntegralHeatSinks: 15 },
  { engineRating: 400, tonnage: 52.5, integralHeatSinks: 0, maxIntegralHeatSinks: 16 },
];

export const mechEnginesByRating = mechEngines.reduce(
  (acc, engine) => {
    acc[engine.engineRating] = engine;
    return acc;
  },
  {} as Record<number, MechEngine>,
);
