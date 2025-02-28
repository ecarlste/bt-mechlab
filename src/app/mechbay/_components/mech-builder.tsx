"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { mechAmmoList } from "~/lib/equipment/mech-ammo";
import { getAllEquipment } from "~/lib/equipment/mech-equipment";
import { MechEquipmentType } from "~/lib/equipment/mech-equipment-type";
import { createJumpJetForMechTonnage, jumpJetName } from "~/lib/equipment/mech-jump-jets";
import { MechTonnage } from "~/lib/mechs/battlemech";
import { MechLocation } from "~/lib/mechs/mech-equipment-location";

import { Button } from "~/components/ui/button";

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
      const location = event.over.id as MechLocation;
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

  equipment = addSpecialEquipmentToEquipment(equipment);
  equipment = addJumpJetForMechTonnageToEquipment(maxMechTonnage, equipment);
  equipment = addAmmoToEquipment(equipment).sort((a, b) => a.name.localeCompare(b.name));

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
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.RightArm]} />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.RightTorso]} />
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.RightLeg]} />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.Head]} />
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.CenterTorso]} />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.LeftTorso]} />
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.LeftLeg]} />
        </div>
        <div className="w-full">
          <MechBuildLocation equipmentLocation={equipmentLocations[MechLocation.LeftArm]} />
        </div>
      </div>
    </DndContext>
  );
}

function addSpecialEquipmentToEquipment(equipment: MechEquipmentType[]) {
  return [...equipment, ...getAllEquipment()];
}

function addAmmoToEquipment(equipment: MechEquipmentType[]) {
  return [...equipment, ...mechAmmoList];
}

function addJumpJetForMechTonnageToEquipment(maxMechTonnage: MechTonnage, equipment: MechEquipmentType[]) {
  if (equipment.find((item) => item.name === jumpJetName)) return equipment;

  const jumpJet = createJumpJetForMechTonnage(maxMechTonnage);
  return [...equipment, jumpJet];
}
