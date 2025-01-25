"use client";

import { useDroppable } from "@dnd-kit/core";
import { SquareX } from "lucide-react";
import { MouseEvent } from "react";

import { Button } from "~/components/ui/button";
import { Location, MechEquipmentLocation } from "../location";
import { useEquipmentStore } from "../store";

interface EquipmentInLocationProps {
  location: Location;
}

export default function EquipmentInLocation({ location }: EquipmentInLocationProps) {
  const mechEquipmentLocations = useEquipmentStore((state) => state.equipmentLocations);

  const { setNodeRef } = useDroppable({
    id: location,
  });

  return (
    <div ref={setNodeRef} className="border-t-2">
      {renderEquipmentInLocation(mechEquipmentLocations[location])}
    </div>
  );
}

function renderEquipmentInLocation(equipmentLocation: MechEquipmentLocation) {
  const removeEquipment = useEquipmentStore((state) => state.removeEquipment);

  function handleRemoveItem(e: MouseEvent) {
    const idToRemove = (e.target as HTMLElement).id;
    removeEquipment(equipmentLocation.id, idToRemove);
  }

  const equipped = equipmentLocation.installedEquipment.map((item, index) => {
    const height = `${item.criticalSlots * 36}px`;

    return (
      <div className="flex w-full items-center border-b bg-blue-800" key={index} style={{ height }}>
        <div className="flex h-9 w-full items-center justify-between whitespace-nowrap p-2 pl-4 text-sm font-medium text-secondary-foreground">
          {item.name}
          <Button variant="ghost" size="icon" className="h-4 w-4" onClick={handleRemoveItem} id={item.id}>
            <SquareX />
          </Button>
        </div>
      </div>
    );
  });

  const { criticalSlots: slots, criticalSlotsUsed: slotsUsed } = equipmentLocation;
  const freeSlots = slots - slotsUsed;
  for (let i = 0; i < freeSlots; i++) {
    equipped.push(<div className="flex h-9 w-full border-b" key={i + slotsUsed}></div>);
  }

  return equipped;
}
