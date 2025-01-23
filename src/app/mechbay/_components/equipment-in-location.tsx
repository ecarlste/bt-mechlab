"use client";

import { useDroppable } from "@dnd-kit/core";

import { MechEquipmentType } from "./mech-equipment-list";

interface EquipmentInLocationProps {
  criticalSlots: number;
  locationName: string;
  installedEquipment: MechEquipmentType[];
}

export default function EquipmentInLocation({
  criticalSlots,
  locationName,
  installedEquipment,
}: EquipmentInLocationProps) {
  const { setNodeRef } = useDroppable({
    id: locationNameToCamelCase(locationName),
  });

  const filledSlots = installedEquipment.reduce((acc, item) => acc + item.criticalSlots, 0);
  const freeSlots = criticalSlots - filledSlots;

  return (
    <div ref={setNodeRef} className="border-t-4">
      {currentEquipmentInLocation(installedEquipment, filledSlots, freeSlots)}
    </div>
  );
}

function locationNameToCamelCase(locationName: string) {
  return locationName.toLocaleLowerCase().replace(/ ([a-z])/g, (_, group1) => group1.toUpperCase());
}

function currentEquipmentInLocation(installedEquipment: MechEquipmentType[], filledSlots: number, freeSlots: number) {
  const equipped = installedEquipment.map((item, index) => {
    return (
      <div className="flex h-10 w-full border-b" key={index}>
        {item.name}
      </div>
    );
  });

  for (let i = 0; i < freeSlots; i++) {
    equipped.push(<div className="flex h-10 w-full border-b" key={i + filledSlots}></div>);
  }

  return equipped;
}
