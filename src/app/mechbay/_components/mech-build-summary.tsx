"use client";

import { useEquipmentStore } from "../store";

type MechBuildSummaryProps = {
  name: string;
  variant: string;
};

export default function MechBuildSummary({ name, variant }: MechBuildSummaryProps) {
  const { mechMovement, maxMechTonnage, currentMechTonnage, mechHeatPerTurn, mechCoolingPerTurn } = useEquipmentStore(
    (state) => state,
  );

  return (
    <div className="p-2 rounded-md border-2 flex flex-col">
      <div className="flex justify-between text-lg font-semibold border-b-2 pb-1 px-1">
        <span>{name}</span>
        <span>{variant}</span>
      </div>
      <div className="flex justify-between pt-1 px-2 text-xs">
        <span>Weight:</span>
        <span>
          {currentMechTonnage}/{maxMechTonnage}
        </span>
      </div>
      <div className="flex justify-between pt-1 px-2 text-xs">
        <span>Heat:</span>
        <span>{mechHeatPerTurn}/turn</span>
      </div>
      <div className="flex justify-between pt-1 px-2 text-xs">
        <span>Cooling:</span>
        <span>{mechCoolingPerTurn}/turn</span>
      </div>
      <div className="flex justify-between pt-1 px-2 text-xs">
        <span>Speed(W/R/J):</span>
        <span>
          {mechMovement.walkingMp}/{mechMovement.runningMp}/{mechMovement.jumpingMp}
        </span>
      </div>
    </div>
  );
}
