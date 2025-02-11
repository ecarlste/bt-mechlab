"use client";

import { useEquipmentStore } from "../store";

type MechBuildSummaryProps = {
  name: string;
  variant: string;
  tonnage: number;
  currentTonnage: number;
};

function MechBuildSummary({ name, variant }: MechBuildSummaryProps) {
  const { maxMechTonnage, currentMechTonnage, mechHeatPerTurn, mechCoolingPerTurn, mechEngine } = useEquipmentStore(
    (state) => state,
  );

  const walkingMp = Math.floor(mechEngine.engineRating / maxMechTonnage);
  const runningMp = Math.ceil(walkingMp * 1.5);
  const jumpingMp = 0;

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
          {walkingMp}/{runningMp}/{jumpingMp}
        </span>
      </div>
    </div>
  );
}

export default MechBuildSummary;
