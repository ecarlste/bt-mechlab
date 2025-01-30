"use client";

import { useEquipmentStore } from "../store";

type MechBuildSummaryProps = {
  name: string;
  variant: string;
  tonnage: number;
  currentTonnage: number;
};

function MechBuildSummary({ name, variant }: MechBuildSummaryProps) {
  const mexMechTonnage = useEquipmentStore((state) => state.maxMechTonnage);
  const currentMechTonnage = useEquipmentStore((state) => state.currentMechTonnage);

  return (
    <div className="p-4 py-2 rounded-md border-2 flex justify-between">
      <span className="text-lg font-semibold">
        {name} {variant}
      </span>
      <span className="text-lg font-semibold">
        {currentMechTonnage}/{mexMechTonnage}
      </span>
    </div>
  );
}

export default MechBuildSummary;
