"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

import { MechEquipmentType } from "./mech-equipment-type";

interface MechEquipmentListItemProps {
  item: MechEquipmentType;
}

export default function MechEquipmentListItem({ item }: MechEquipmentListItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.name,
    data: { ...item, id: uuidv4() },
  });

  const style: CSSProperties | undefined = isDragging
    ? {
        position: "absolute",
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        cursor: "move",
      }
    : { cursor: "pointer" };

  const className =
    "mb-1 h-9 whitespace-nowrap bg-blue-800 px-4 py-2 text-sm font-medium text-secondary-foreground w-60";

  return (
    <>
      <div ref={setNodeRef} style={style} key={item.name} className={className} {...listeners} {...attributes}>
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
