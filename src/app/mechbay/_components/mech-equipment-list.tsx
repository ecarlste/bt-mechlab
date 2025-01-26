import { useDndMonitor } from "@dnd-kit/core";
import MechEquipmentListItem from "./mech-equipment-list-item";
import { MechEquipmentType } from "./mech-equipment-type";
import { useEquipmentStore } from "../store";
import { Location } from "../location";

interface MechEquipmentListProps {
  equipment: MechEquipmentType[];
}

export function MechEquipmentList({ equipment }: MechEquipmentListProps) {
  const draggableOver = useEquipmentStore((state) => state.draggableOver);
  const setDraggableOver = useEquipmentStore((state) => state.updateDraggableOver);
  const enableDraggableOver = useEquipmentStore((state) => state.enableDraggableOver);
  const resetAllDraggableOver = useEquipmentStore((state) => state.resetAllDraggableOver);

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

  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Equipment</h2>
      <div>
        {equipment.map((item) => (
          <MechEquipmentListItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
