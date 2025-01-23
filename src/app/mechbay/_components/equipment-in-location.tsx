"use client";

import { useDroppable } from "@dnd-kit/core";
import { SquareX } from "lucide-react";
import { MouseEvent } from "react";

import { MechEquipmentType } from "./mech-equipment-list";
import { Button } from "~/components/ui/button";

interface EquipmentInLocationProps {
  criticalSlots: number;
  locationName: string;
  installedEquipment: MechEquipmentType[];
  setInstalledEquipment: React.Dispatch<React.SetStateAction<MechEquipmentType[]>>;
}

export default function EquipmentInLocation({
  criticalSlots,
  locationName,
  installedEquipment,
  setInstalledEquipment,
}: EquipmentInLocationProps) {
  const { setNodeRef } = useDroppable({
    id: locationNameToCamelCase(locationName),
  });

  const filledSlots = installedEquipment.reduce((acc, item) => acc + item.criticalSlots, 0);
  const freeSlots = criticalSlots - filledSlots;

  return (
    <div ref={setNodeRef} className="border-t-2">
      {currentEquipmentInLocation(installedEquipment, setInstalledEquipment, filledSlots, freeSlots)}
    </div>
  );
}

function locationNameToCamelCase(locationName: string) {
  return locationName.toLocaleLowerCase().replace(/ ([a-z])/g, (_, group1) => group1.toUpperCase());
}

function currentEquipmentInLocation(
  installedEquipment: MechEquipmentType[],
  setInstalledEquipment: React.Dispatch<React.SetStateAction<MechEquipmentType[]>>,
  filledSlots: number,
  freeSlots: number,
) {
  function handleRemoveItem(e: MouseEvent) {
    const idToRemove = (e.target as HTMLElement).id;
    setInstalledEquipment((prev) => prev.filter((item) => item.id !== idToRemove));
  }

  const equipped = installedEquipment.map((item, index) => {
    const height = `${item.criticalSlots * 36}px`;

    return (
      <div className="flex w-full items-center border-b bg-blue-800" key={index} style={{ height }}>
        <div className="flex h-9 w-60 items-center justify-between whitespace-nowrap p-2 pl-4 text-sm font-medium text-secondary-foreground">
          {item.name}
          <Button variant="ghost" size="icon" className="h-4 w-4" onClick={handleRemoveItem} id={item.id}>
            <SquareX />
          </Button>
        </div>
      </div>
    );
  });

  for (let i = 0; i < freeSlots; i++) {
    equipped.push(<div className="flex h-9 w-full border-b" key={i + filledSlots}></div>);
  }

  return equipped;
}
