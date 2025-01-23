import EquipmentInLocation from "./equipment-in-location";
import { MechEquipmentType } from "./mech-equipment-list";

interface MechBuildLocationProps {
  name: string;
  criticalSlots: number;
  installedEquipment: MechEquipmentType[];
  setInstalledEquipment: React.Dispatch<React.SetStateAction<MechEquipmentType[]>>;
}

export default function MechBuildLocation({
  name,
  criticalSlots,
  installedEquipment,
  setInstalledEquipment,
}: MechBuildLocationProps) {
  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <h2 className="py-2 text-lg font-semibold tracking-tight">{name}</h2>
      <EquipmentInLocation
        criticalSlots={criticalSlots}
        locationName={name}
        installedEquipment={installedEquipment}
        setInstalledEquipment={setInstalledEquipment}
      />
    </div>
  );
}
