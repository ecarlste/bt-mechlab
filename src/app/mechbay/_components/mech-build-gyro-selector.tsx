"use client";

import { useEquipmentStore } from "../store";

export default function MechBuildGyroSelector() {
  const mechGyro = useEquipmentStore((state) => state.mechGyro);

  return (
    <div className="px-2 py-0.5 text-sm bg-accent/50 rounded-sm">
      <div className="flex justify-between">
        <span>Gyro</span>
        <span>{mechGyro.gyroType}</span>
      </div>
    </div>
  );
}
