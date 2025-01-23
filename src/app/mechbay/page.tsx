"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

import MechBuildLocation from "./_components/mech-build-location";
import { MechEquipmentList, MechEquipmentType } from "./_components/mech-equipment-list";

const equipment = [
  { name: "L Laser", weight: 5, criticalSlots: 2 },
  { name: "M Laser", weight: 2, criticalSlots: 1 },
  { name: "S Laser", weight: 1, criticalSlots: 1 },
];

enum Location {
  RightArm = "rightArm",
  RightTorso = "rightTorso",
  RightLeg = "rightLeg",
  Head = "head",
  CenterTorso = "centerTorso",
  LeftTorso = "leftTorso",
  LeftLeg = "leftLeg",
  LeftArm = "leftArm",
}

const criticalSlots = {
  rightArm: 8,
  rightTorso: 12,
  rightLeg: 2,
  head: 1,
  centerTorso: 2,
  leftTorso: 12,
  leftLeg: 2,
  leftArm: 8,
};

export default function MechBayPage() {
  const [rightArmEquipment, setRightArmEquipment] = useState<MechEquipmentType[]>([]);
  const [rightTorsoEquipment, setRightTorsoEquipment] = useState<MechEquipmentType[]>([]);
  const [rightLegEquipment, setRightLegEquipment] = useState<MechEquipmentType[]>([]);
  const [headEquipment, setHeadEquipment] = useState<MechEquipmentType[]>([]);
  const [centerTorsoEquipment, setCenterTorsoEquipment] = useState<MechEquipmentType[]>([]);
  const [leftTorsoEquipment, setLeftTorsoEquipment] = useState<MechEquipmentType[]>([]);
  const [leftLegEquipment, setLeftLegEquipment] = useState<MechEquipmentType[]>([]);
  const [leftArmEquipment, setLeftArmEquipment] = useState<MechEquipmentType[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const itemToEquip = event.active.data.current as MechEquipmentType;

    if (event.over) {
      const location = event.over.id as Location;

      switch (location) {
        case Location.RightArm:
          equipItemInLocation(itemToEquip, location, rightArmEquipment, setRightArmEquipment);
          break;
        case Location.RightTorso:
          equipItemInLocation(itemToEquip, location, rightTorsoEquipment, setRightTorsoEquipment);
          break;
        case Location.RightLeg:
          equipItemInLocation(itemToEquip, location, rightLegEquipment, setRightLegEquipment);
          break;
        case Location.Head:
          equipItemInLocation(itemToEquip, location, headEquipment, setHeadEquipment);
          break;
        case Location.CenterTorso:
          equipItemInLocation(itemToEquip, location, centerTorsoEquipment, setCenterTorsoEquipment);
          break;
        case Location.LeftTorso:
          equipItemInLocation(itemToEquip, location, leftTorsoEquipment, setLeftTorsoEquipment);
          break;
        case Location.LeftLeg:
          equipItemInLocation(itemToEquip, location, leftLegEquipment, setLeftLegEquipment);
          break;
        case Location.LeftArm:
          equipItemInLocation(itemToEquip, location, leftArmEquipment, setLeftArmEquipment);
          break;
        default:
          console.warn(`No equipment logic for ${location}`);
      }
    }
  }

  function equipItemInLocation(
    item: MechEquipmentType,
    location: Location,
    equipment: MechEquipmentType[],
    setEquipment: React.Dispatch<React.SetStateAction<MechEquipmentType[]>>,
  ) {
    const filledSlots = equipment.reduce((acc, item) => acc + item.criticalSlots, 0);
    const freeSlotsAfterEquip = criticalSlots[location] - filledSlots - item.criticalSlots;

    if (freeSlotsAfterEquip >= 0) {
      setEquipment([...equipment, item]);
    } else {
      console.warn(`No free slots in ${location} for ${item.name}`);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto flex py-10">
        <div className="flex w-full space-x-1">
          <MechEquipmentList equipment={equipment} />
          <div className="w-full">
            <MechBuildLocation
              name="Right Arm"
              criticalSlots={criticalSlots.rightArm}
              installedEquipment={rightArmEquipment}
            />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation name="Right Torso" criticalSlots={12} installedEquipment={rightTorsoEquipment} />
            <MechBuildLocation name="Right Leg" criticalSlots={2} installedEquipment={rightLegEquipment} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation name="Head" criticalSlots={1} installedEquipment={headEquipment} />
            <MechBuildLocation name="Center Torso" criticalSlots={2} installedEquipment={centerTorsoEquipment} />
          </div>
          <div className="flex w-full flex-col space-y-4">
            <MechBuildLocation name="Left Torso" criticalSlots={12} installedEquipment={leftTorsoEquipment} />
            <MechBuildLocation name="Left Leg" criticalSlots={2} installedEquipment={leftLegEquipment} />
          </div>
          <div className="w-full">
            <MechBuildLocation name="Left Arm" criticalSlots={8} installedEquipment={leftArmEquipment} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
