"use client";

import { useDroppable } from "@dnd-kit/core";
import { SquareX } from "lucide-react";
import { MouseEvent } from "react";

import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";

import { MechEquipmentLocation } from "../location";
import { useEquipmentStore } from "../store";

interface EquipmentInLocationProps {
  equipmentLocation: MechEquipmentLocation;
}

export default function EquipmentInLocation({ equipmentLocation }: EquipmentInLocationProps) {
  const removeEquipment = useEquipmentStore((state) => state.removeEquipment);

  const { setNodeRef } = useDroppable({
    id: equipmentLocation.id,
  });

  function handleRemoveItem(e: MouseEvent) {
    const idToRemove = (e.target as HTMLElement).id;
    removeEquipment(equipmentLocation.id, idToRemove);
  }

  function renderEquipmentInLocation(equipmentLocation: MechEquipmentLocation) {
    const equipped = equipmentLocation.installedEquipment.map((item, index) => {
      const height = `${item.criticalSlots * 36}px`;

      return (
        <div className="flex w-full items-center border-b bg-blue-800" key={index} style={{ height }}>
          <div className="flex h-9 w-full items-center justify-between whitespace-nowrap p-2 pl-4 text-sm font-medium text-secondary-foreground">
            {item.name}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 hover:bg-primary/25 cursor-pointer"
              onClick={handleRemoveItem}
              id={item.id}
            >
              <SquareX />
            </Button>
          </div>
        </div>
      );
    });

    const { criticalSlots: slots, criticalSlotsUsed: slotsUsed } = equipmentLocation;
    const freeSlots = slots - slotsUsed;
    for (let i = 0; i < freeSlots; i++) {
      equipped.push(
        <div
          className={cn("flex h-9 w-full border-b", equipmentLocation.hasDraggableOver ? "bg-primary/25" : "")}
          key={i + slotsUsed}
        ></div>,
      );
    }

    return equipped;
  }

  return (
    <div ref={setNodeRef} className="border-t-2">
      {renderEquipmentInLocation(equipmentLocation)}
    </div>
  );
}
