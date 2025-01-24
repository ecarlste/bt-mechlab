"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import MechBuildLocation from "./_components/mech-build-location";
import { MechEquipmentList } from "./_components/mech-equipment-list";
import { MechEquipmentType } from "./_components/mech-equipment-type";
import { criticalSlots, Location } from "./location";
import { useEquipmentStore } from "./store";

const equipment = [
  { name: "L Laser", weight: 5, criticalSlots: 2 },
  { name: "M Laser", weight: 2, criticalSlots: 1 },
  { name: "S Laser", weight: 1, criticalSlots: 1 },
];

export default function MechBayPage() {
  const addEquipment = useEquipmentStore((state) => state.addEquipment);

  function handleDragEnd(event: DragEndEvent) {
    const itemToEquip = event.active.data.current as MechEquipmentType;

    if (event.over) {
      const location = event.over.id as Location;
      addEquipment(location, itemToEquip);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto flex py-10">
        <div className="flex w-full space-x-1">
          <MechEquipmentList equipment={equipment} />
          <div className="w-full">
            <MechBuildLocation location={Location.RightArm} criticalSlots={criticalSlots.rightArm} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation location={Location.RightTorso} criticalSlots={criticalSlots.rightTorso} />
            <MechBuildLocation location={Location.RightLeg} criticalSlots={criticalSlots.rightLeg} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation location={Location.Head} criticalSlots={criticalSlots.head} />
            <MechBuildLocation location={Location.CenterTorso} criticalSlots={criticalSlots.centerTorso} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation location={Location.LeftTorso} criticalSlots={criticalSlots.leftTorso} />
            <MechBuildLocation location={Location.LeftLeg} criticalSlots={criticalSlots.leftLeg} />
          </div>
          <div className="w-full">
            <MechBuildLocation location={Location.LeftArm} criticalSlots={criticalSlots.leftArm} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
