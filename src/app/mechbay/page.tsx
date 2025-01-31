"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { Button } from "~/components/ui/button";

import MechBuildLocation from "./_components/mech-build-location";
import MechBuildSummary from "./_components/mech-build-summary";
import { MechEquipmentList } from "./_components/mech-equipment-list";
import { MechEquipmentType } from "./_components/mech-equipment-type";

import { Location } from "./location";
import { useEquipmentStore } from "./store";

const equipment = [
  { name: "L Laser", weight: 5, criticalSlots: 2 },
  { name: "M Laser", weight: 2, criticalSlots: 1 },
  { name: "S Laser", weight: 1, criticalSlots: 1 },
];

export default function MechBayPage() {
  const mechEquipmentLocations = useEquipmentStore((state) => state.equipmentLocations);
  const addEquipment = useEquipmentStore((state) => state.addEquipment);
  const resetAllDraggableOver = useEquipmentStore((state) => state.resetAllDraggableOver);

  function handleDragEnd(event: DragEndEvent) {
    const itemToEquip = event.active.data.current as MechEquipmentType;

    if (event.over) {
      const location = event.over.id as Location;
      addEquipment(location, itemToEquip);
      resetAllDraggableOver();
    }
  }

  function handleMaxArmor(): void {
    useEquipmentStore.getState().maxAllArmor();
  }

  function handleStripEquipment(): void {
    useEquipmentStore.getState().removeAllEquipment();
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto flex py-10">
        <div className="flex w-full space-x-1">
          <div>
            <MechBuildSummary name="Marauder" variant="MAD-3R" tonnage={75} currentTonnage={70} />
            <div className="flex flex-col space-y-1.5 p-2 pt-3">
              <Button onClick={handleStripEquipment}>Strip Equipment</Button>
              <Button onClick={handleMaxArmor}>Max Armor</Button>
            </div>
            <MechEquipmentList equipment={equipment} />
          </div>
          <div className="w-full">
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.RightArm]} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.RightTorso]} />
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.RightLeg]} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.Head]} />
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.CenterTorso]} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.LeftTorso]} />
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.LeftLeg]} />
          </div>
          <div className="w-full">
            <MechBuildLocation equipmentLocation={mechEquipmentLocations[Location.LeftArm]} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
