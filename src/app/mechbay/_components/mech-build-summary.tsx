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
  const mechCoolingPerTurn = useEquipmentStore((state) => state.mechCoolingPerTurn);

  return (
    <div className="p-2 rounded-md border-2 flex flex-col">
      <div className="flex justify-between text-lg font-semibold border-b-2 pb-1 px-1">
        <span>{name}</span>
        <span>{variant}</span>
      </div>
      <div className="flex justify-between pt-1 px-2 text-xs">
        <span>Weight:</span>
        <span>
          {currentMechTonnage}/{mexMechTonnage}
        </span>
      </div>
      <div className="flex justify-between pt-1 px-2 text-xs">
        <span>Cooling:</span>
        <span>{mechCoolingPerTurn}/turn</span>
      </div>
    </div>
  );
}

export default MechBuildSummary;
