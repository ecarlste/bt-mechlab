"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import MechBuildLocation from "./_components/mech-build-location";
import { MechEquipmentList } from "./_components/mech-equipment-list";

const equipment = [
  { name: "L Laser", weight: 5, criticalSlots: 2 },
  { name: "M Laser", weight: 2, criticalSlots: 1 },
  { name: "S Laser", weight: 1, criticalSlots: 1 },
];

export default function MechBayPage() {
  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      console.log(event.active.id, event.over.id);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto flex py-10">
        <div className="flex w-full space-x-1">
          <MechEquipmentList equipment={equipment} />
          <div className="w-full">
            <MechBuildLocation name="Right Arm" criticalSlots={8} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation name="Right Torso" criticalSlots={12} />
            <MechBuildLocation name="Right Leg" criticalSlots={2} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation name="Head" criticalSlots={1} />
            <MechBuildLocation name="Center Torso" criticalSlots={2} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation name="Left Torso" criticalSlots={12} />
            <MechBuildLocation name="Left Leg" criticalSlots={2} />
          </div>
          <div className="w-full">
            <MechBuildLocation name="Left Arm" criticalSlots={8} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
