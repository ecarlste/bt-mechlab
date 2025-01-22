"use client";

import { useDraggable } from "@dnd-kit/core";

import { MechEquipmentType } from "./mech-equipment-list";
import { CSSProperties } from "react";
import { cn } from "~/lib/utils";

interface MechEquipmentListItemProps {
  item: MechEquipmentType;
}

export default function MechEquipmentListItem({ item }: MechEquipmentListItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.name,
  });

  const style: CSSProperties | undefined = isDragging
    ? {
        position: "absolute",
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        cursor: "move",
      }
    : { cursor: "pointer" };

  const className =
    "mb-1 h-9 whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground w-60";

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
