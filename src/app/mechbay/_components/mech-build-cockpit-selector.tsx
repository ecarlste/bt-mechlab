"use client";

import { useEquipmentStore } from "../store";

export default function MechBuildCockpitSelector() {
  const mechCockpit = useEquipmentStore((state) => state.mechCockpit);

  return (
    <div className="px-2 py-0.5 text-sm bg-accent/50 rounded-sm">
      <div className="flex justify-between">
        <span>Cockpit</span>
        <span>{mechCockpit.cockpitType}</span>
      </div>
    </div>
  );
}
