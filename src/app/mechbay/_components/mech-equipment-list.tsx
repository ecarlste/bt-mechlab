"use client";

import { useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

import { MechEquipmentType } from "~/lib/equipment/mech-equipment-type";
import { MechLocation } from "~/lib/mechs/mech-equipment-location";
import { WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { useEquipmentStore } from "~/app/mechbay/store";

import { Weapon } from "~/server/db/schema";

import { Button } from "~/components/ui/button";

import MechEquipmentListFilterButton from "./mech-equipment-list-filter-button";
import MechEquipmentListItem from "./mech-equipment-list-item";

const equipmentListPageSize = 10;

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
  const [filteredEquipment, setFilteredEquipment] = useState(equipment);
  const [equipmentListPageItems, setEquipmentListPageItems] = useState(
    getPageItems(equipment, equipmentListPageSize, 1),
  );
  const [equipmentListPage, setEquipmentListPage] = useState(1);
  const [lastEquipmentListPage, setLastEquipmentListPage] = useState(
    Math.ceil(equipment.length / equipmentListPageSize),
  );

  useDndMonitor({
    onDragMove: (event) => {
      if (draggableOver !== event.over?.id) {
        const newDraggableOver = event.over?.id as MechLocation;
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

    let newFilteredEquipment: MechEquipmentType[] = [];
    if (filter === WeaponAndEquipmentFilter.All) {
      newFilteredEquipment = equipment;
    } else if (filter === WeaponAndEquipmentFilter.BallisticWeapons) {
      newFilteredEquipment = equipment.filter((item) => (item as Weapon).weaponType === WeaponTypeEnum.Ballistic);
    } else if (filter === WeaponAndEquipmentFilter.EnergyWeapons) {
      newFilteredEquipment = equipment.filter((item) => (item as Weapon).weaponType === WeaponTypeEnum.Energy);
    } else if (filter === WeaponAndEquipmentFilter.MissileWeapons) {
      newFilteredEquipment = equipment.filter((item) => (item as Weapon).weaponType === WeaponTypeEnum.Missile);
    } else {
      newFilteredEquipment = equipment.filter((item) => !("weaponType" in item));
    }

    setFilteredEquipment(newFilteredEquipment);
    setEquipmentListPage(1);
    setLastEquipmentListPage(Math.ceil(newFilteredEquipment.length / equipmentListPageSize));
    setEquipmentListPageItems(getPageItems(newFilteredEquipment, equipmentListPageSize, 1));
  }

  function handlePreviousPage() {
    const newPage = equipmentListPage - 1;
    setEquipmentListPage(newPage);
    setEquipmentListPageItems(getPageItems(filteredEquipment, equipmentListPageSize, newPage));
  }

  function handleNextPage() {
    const newPage = equipmentListPage + 1;
    setEquipmentListPage(newPage);
    setEquipmentListPageItems(getPageItems(filteredEquipment, equipmentListPageSize, newPage));
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
        {equipmentListPageItems.map((item) => (
          <MechEquipmentListItem key={item.name} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={equipmentListPage <= 1}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={equipmentListPage >= lastEquipmentListPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function getPageItems(list: MechEquipmentType[], pageSize: number, page: number) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return list.slice(startIndex, endIndex);
}
