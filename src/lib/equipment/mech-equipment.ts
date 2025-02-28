export type Equipment = {
  name: string;
  heat: number;
  weight: number;
  criticalSlots: number;
};

export const getAllEquipment = (): Equipment[] => {
  return [
    {
      name: "Heat Sink",
      heat: -1,
      weight: 1,
      criticalSlots: 1,
    },
  ];
};
