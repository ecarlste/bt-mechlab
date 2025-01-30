import { MechEquipmentLocation } from "../location";
import EquipmentInLocation from "./equipment-in-location";

interface MechBuildLocationProps {
  equipmentLocation: MechEquipmentLocation;
}

export default function MechBuildLocation({ equipmentLocation }: MechBuildLocationProps) {
  const locationName = equipmentLocation.id.replace(/([A-Z])/g, " $1").trim();

  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <div className="pt-2 px-2 pb-1">
        <h2 className="text-lg font-semibold capitalize tracking-tight">{locationName}</h2>
        <div className="px-2 py-0.5 text-sm flex justify-between bg-accent/50 rounded-sm">
          <span>Structure</span>
          <span>{equipmentLocation.internalStructure}</span>
        </div>
      </div>
      <EquipmentInLocation equipmentLocation={equipmentLocation} />
    </div>
  );
}
