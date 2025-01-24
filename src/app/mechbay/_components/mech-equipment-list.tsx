import MechEquipmentListItem from "./mech-equipment-list-item";

export type MechEquipmentType = {
  id?: string;
  name: string;
  weight: number;
  criticalSlots: number;
};

interface MechEquipmentListProps {
  equipment: MechEquipmentType[];
}

export function MechEquipmentList({ equipment }: MechEquipmentListProps) {
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
