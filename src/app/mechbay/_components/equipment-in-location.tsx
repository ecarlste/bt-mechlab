"use client";

import { useDroppable } from "@dnd-kit/core";

interface EquipmentInLocationProps {
  criticalSlots: number;
  locationName: string;
}

export default function EquipmentInLocation({ criticalSlots, locationName }: EquipmentInLocationProps) {
  const locationId = locationName.replaceAll(" ", "-").toLocaleLowerCase();
  const { setNodeRef } = useDroppable({
    id: locationId,
  });

  return (
    <div ref={setNodeRef} className="border-t-4">
      {currentEquipmentInLocation(criticalSlots)}
    </div>
  );
}

function currentEquipmentInLocation(criticalSlots: number) {
  const equipped = [];

  for (let i = 0; i < criticalSlots; i++) {
    equipped.push(<div className="flex h-10 w-full border-b" key={i}></div>);
  }

  return equipped;
}
