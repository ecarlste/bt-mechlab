import { Button } from "~/components/ui/button";

type MechEquipmentType = {
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
      <div className="flex flex-col space-y-1">
        {equipment.map((item) => (
          <Button key={item.name} className="w-full justify-start" variant="secondary">
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
