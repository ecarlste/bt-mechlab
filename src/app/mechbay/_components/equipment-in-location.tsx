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
    <div ref={setNodeRef} className="border-t-2">
      {currentEquipmentInLocation(installedEquipment, filledSlots, freeSlots)}
    </div>
  );
}

function locationNameToCamelCase(locationName: string) {
  return locationName.toLocaleLowerCase().replace(/ ([a-z])/g, (_, group1) => group1.toUpperCase());
}

function currentEquipmentInLocation(installedEquipment: MechEquipmentType[], filledSlots: number, freeSlots: number) {
  if (filledSlots > 0) {
    console.log(`Filled slots: ${filledSlots}, Free slots: ${freeSlots}`);
  }

  const equipped = installedEquipment.map((item, index) => {
    const height = `${item.criticalSlots * 36}px`;

    return (
      <div className={`flex w-full border-b`} key={index} style={{ height }}>
        <div className="flex w-60 items-center whitespace-nowrap bg-blue-800 px-4 py-2 text-sm font-medium text-secondary-foreground">
          {item.name}
        </div>
      </div>
    );
  });

  for (let i = 0; i < freeSlots; i++) {
    equipped.push(<div className="flex h-9 w-full border-b" key={i + filledSlots}></div>);
  }

  return equipped;
}
