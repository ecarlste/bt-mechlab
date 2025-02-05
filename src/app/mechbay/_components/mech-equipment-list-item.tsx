"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";

import { cn } from "~/lib/utils";
import { weaponTypeColors, WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { MechEquipmentType } from "./mech-equipment-type";

interface MechEquipmentListItemProps {
  item: MechEquipmentType;
}

export default function MechEquipmentListItem({ item }: MechEquipmentListItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.name,
    data: item,
  });

  const style: CSSProperties | undefined = isDragging
    ? {
        position: "absolute",
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        cursor: "move",
      }
    : { cursor: "pointer" };

  const bgColor = weaponTypeColors[item.weaponType as WeaponTypeEnum] || "";
  const draggableWidth = isDragging ? "w-60" : "";

  const className = cn(bgColor, "mb-1 h-9 whitespace-nowrap px-4 py-2 text-sm font-medium text-secondary-foreground");

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        key={item.name}
        className={cn(draggableWidth, className)}
        {...listeners}
        {...attributes}
      >
        {item.name}
      </div>
      {isDragging && (
        <div className={className} style={{ display: "none !important" }}>
          {item.name}
        </div>
      )}
    </>
  );
}
