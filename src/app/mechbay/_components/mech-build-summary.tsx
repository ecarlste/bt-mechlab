"use client";

import { useEquipmentStore } from "../store";

type MechBuildSummaryProps = {
  name: string;
  variant: string;
  tonnage: number;
  currentTonnage: number;
};

function MechBuildSummary({ name, variant }: MechBuildSummaryProps) {
  const tonnage = useEquipmentStore((state) => state.mechTonnage);
  const currentTonnage = useEquipmentStore((state) => state.mechInternalStructureTonnage);

  return (
    <div className="p-4 py-2 rounded-md border-2 flex justify-between">
      <span className="text-lg font-semibold">
        {name} {variant}
      </span>
      <span className="text-lg font-semibold">
        {currentTonnage}/{tonnage}
      </span>
    </div>
  );
}

export default MechBuildSummary;
