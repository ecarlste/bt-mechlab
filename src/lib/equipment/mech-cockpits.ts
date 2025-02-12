export enum MechCockpitType {
  Standard = "Standard",
  Small = "Small",
}

export type MechCockpit = {
  cockpitType: MechCockpitType;
  weight: number;
  cockpitSlots: number;
  cockpitSlotLocations: number[];
  sensorSlots: number;
  sensorSlotLocations: number[];
  lifeSupportSlots: number;
  lifeSupportSlotLocations: number[];
};

export const defaultMechCockpit: MechCockpit = {
  cockpitType: MechCockpitType.Standard,
  weight: 3,
  cockpitSlots: 1,
  cockpitSlotLocations: [3],
  sensorSlots: 2,
  sensorSlotLocations: [2, 5],
  lifeSupportSlots: 2,
  lifeSupportSlotLocations: [1, 6],
};

export const mechCockpits: MechCockpit[] = [
  defaultMechCockpit,
  {
    cockpitType: MechCockpitType.Small,
    weight: 2,
    cockpitSlots: 1,
    cockpitSlotLocations: [3],
    sensorSlots: 2,
    sensorSlotLocations: [2, 4],
    lifeSupportSlots: 1,
    lifeSupportSlotLocations: [1],
  },
];

export const mechCockpitsByType = mechCockpits.reduce(
  (acc, cockpit) => {
    acc[cockpit.cockpitType] = cockpit;
    return acc;
  },
  {} as Record<MechCockpitType, MechCockpit>,
);
