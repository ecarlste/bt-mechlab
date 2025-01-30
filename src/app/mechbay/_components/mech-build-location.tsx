import { MechEquipmentLocation } from "../location";
import EquipmentInLocation from "./equipment-in-location";

interface MechBuildLocationProps {
  equipmentLocation: MechEquipmentLocation;
}

export default function MechBuildLocation({ equipmentLocation }: MechBuildLocationProps) {
  const locationName = equipmentLocation.id.replace(/([A-Z])/g, " $1").trim();

  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <h2 className="py-2 text-lg font-semibold capitalize tracking-tight">{locationName}</h2>
      <div className="flex justify-between">
        <span>Structure</span>
        <span>{equipmentLocation.internalStructure}</span>
      </div>
      <EquipmentInLocation equipmentLocation={equipmentLocation} />
    </div>
  );
}
