"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { MechEquipmentType } from "~/lib/equipment/mech-equipment-type";
import { createJumpJetForMechTonnage, jumpJetName } from "~/lib/equipment/mech-jump-jets";

import { Button } from "~/components/ui/button";

import { Location, MechTonnage } from "../location";
import { useEquipmentStore } from "../store";
import MechBuildLocation from "./mech-build-location";
import MechBuildSummary from "./mech-build-summary";
import { MechEquipmentList } from "./mech-equipment-list";

type MechBuilderProps = {
  equipment: MechEquipmentType[];
};

export default function MechBuilder({ equipment }: MechBuilderProps) {
  const { equipmentLocations, maxMechTonnage, addEquipment, resetAllDraggableOver } = useEquipmentStore(
    (state) => state,
  );

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

  equipment = addJumpJetForMechTonnageToEquipment(maxMechTonnage, equipment);

  return (
    <DndContext onDragEnd={handleDragEnd} id="mech-bay-dnd-context">
      <div className="flex w-full space-x-1">
        <div className="w-full">
          <MechBuildSummary name="Marauder" variant="MAD-3R" />
          <div className="flex flex-col space-y-1.5 p-2 pt-3">
            <Button onClick={handleStripEquipment}>Strip Equipment</Button>
            <Button onClick={handleMaxArmor}>Max Armor</Button>
          </div>
          <MechEquipmentList equipment={equipment} />
        </div>
        <div className="w-full">
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.RightArm]} />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.RightTorso]} />
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.RightLeg]} />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.Head]} />
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.CenterTorso]} />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.LeftTorso]} />
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.LeftLeg]} />
        </div>
        <div className="w-full">
          <MechBuildLocation equipmentLocation={equipmentLocations[Location.LeftArm]} />
        </div>
      </div>
    </DndContext>
  );
}

function addJumpJetForMechTonnageToEquipment(maxMechTonnage: MechTonnage, equipment: MechEquipmentType[]) {
  if (equipment.find((item) => item.name === jumpJetName)) return equipment;

  const jumpJet = createJumpJetForMechTonnage(maxMechTonnage);
  return [...equipment, jumpJet];
}
