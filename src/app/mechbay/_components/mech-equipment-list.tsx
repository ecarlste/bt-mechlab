"use client";

import { useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

import { Location } from "~/app/mechbay/location";
import { useEquipmentStore } from "~/app/mechbay/store";

import MechEquipmentListFilterButton from "./mech-equipment-list-filter-button";
import MechEquipmentListItem from "./mech-equipment-list-item";
import { MechEquipmentType } from "./mech-equipment-type";

enum WeaponAndEquipmentFilter {
  All = "All",
  BallisticWeapons = "BW",
  EnergyWeapons = "EW",
  MissileWeapons = "MW",
  Equipment = "Eq",
}

interface MechEquipmentListProps {
  equipment: MechEquipmentType[];
}

export function MechEquipmentList({ equipment }: MechEquipmentListProps) {
  const draggableOver = useEquipmentStore((state) => state.draggableOver);
  const setDraggableOver = useEquipmentStore((state) => state.updateDraggableOver);
  const enableDraggableOver = useEquipmentStore((state) => state.enableDraggableOver);
  const resetAllDraggableOver = useEquipmentStore((state) => state.resetAllDraggableOver);

  const [filter, setFilter] = useState(WeaponAndEquipmentFilter.All);

  useDndMonitor({
    onDragMove: (event) => {
      if (draggableOver !== event.over?.id) {
        const newDraggableOver = event.over?.id as Location;
        setDraggableOver(newDraggableOver);

        if (newDraggableOver) {
          enableDraggableOver(newDraggableOver);
        } else {
          resetAllDraggableOver();
        }
      }
    },
  });

  function handleSetFilter(filter: WeaponAndEquipmentFilter) {
    setFilter(filter);
  }

  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Equipment</h2>
      <div className="mb-2 flex bg-primary/25 px-0.5 space-x-0.5">
        <MechEquipmentListFilterButton
          text={WeaponAndEquipmentFilter.All}
          filter={filter}
          setFilter={() => handleSetFilter(WeaponAndEquipmentFilter.All)}
        />
        <MechEquipmentListFilterButton
          filter={filter}
          text={WeaponAndEquipmentFilter.BallisticWeapons}
          setFilter={() => handleSetFilter(WeaponAndEquipmentFilter.BallisticWeapons)}
        />
        <MechEquipmentListFilterButton
          filter={filter}
          text={WeaponAndEquipmentFilter.EnergyWeapons}
          setFilter={() => handleSetFilter(WeaponAndEquipmentFilter.EnergyWeapons)}
        />
        <MechEquipmentListFilterButton
          filter={filter}
          text={WeaponAndEquipmentFilter.MissileWeapons}
          setFilter={() => handleSetFilter(WeaponAndEquipmentFilter.MissileWeapons)}
        />
        <MechEquipmentListFilterButton
          filter={filter}
          text={WeaponAndEquipmentFilter.Equipment}
          setFilter={() => handleSetFilter(WeaponAndEquipmentFilter.Equipment)}
        />
      </div>
      <div>
        {equipment.map((item) => (
          <MechEquipmentListItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
