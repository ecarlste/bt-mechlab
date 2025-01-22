import { Button } from "~/components/ui/button";
import { MechEquipmentType } from "./mech-equipment-list";

interface MechEquipmentListItemProps {
  item: MechEquipmentType;
}

export default function MechEquipmentListItem({ item }: MechEquipmentListItemProps) {
  return (
    <Button key={item.name} className="w-full justify-start" variant="secondary">
      {item.name}
    </Button>
  );
}
