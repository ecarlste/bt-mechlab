import EquipmentInLocation from "./equipment-in-location";
import { MechEquipmentType } from "./mech-equipment-list";

interface MechBuildLocationProps {
  name: string;
  criticalSlots: number;
  installedEquipment: MechEquipmentType[];
}

export default function MechBuildLocation({ name, criticalSlots, installedEquipment }: MechBuildLocationProps) {
  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <h2 className="py-2 text-lg font-semibold tracking-tight">{name}</h2>
      <EquipmentInLocation criticalSlots={criticalSlots} locationName={name} installedEquipment={installedEquipment} />
    </div>
  );
}
