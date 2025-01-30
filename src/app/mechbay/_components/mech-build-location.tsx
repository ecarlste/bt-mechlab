import { MechEquipmentLocation, Location } from "../location";
import EquipmentInLocation from "./equipment-in-location";

interface MechBuildLocationProps {
  equipmentLocation: MechEquipmentLocation;
}

export default function MechBuildLocation({ equipmentLocation }: MechBuildLocationProps) {
  const locationName = equipmentLocation.id.replace(/([A-Z])/g, " $1").trim();

  const locationsWithRearArmor = [Location.CenterTorso, Location.RightTorso, Location.LeftTorso];
  const enableRearArmor = locationsWithRearArmor.includes(equipmentLocation.id as Location);

  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <div className="p-2">
        <h2 className="text-lg font-semibold capitalize tracking-tight pb-2">{locationName}</h2>
        <div className="flex flex-col space-y-1.5">
          <div className="px-2 py-0.5 text-sm  bg-accent/50 rounded-sm">
            <div className="flex justify-between">
              <span>Armor</span>
              <span>
                {equipmentLocation.armor.frontArmor + equipmentLocation.armor.rearArmor}/
                {equipmentLocation.armor.maxArmor}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Front</span>
              <span>{equipmentLocation.armor.frontArmor}</span>
            </div>
            {enableRearArmor && (
              <div className="flex justify-between">
                <span>Rear</span>
                <span>{equipmentLocation.armor.rearArmor}</span>
              </div>
            )}
          </div>
          <div className="px-2 py-0.5 text-sm flex justify-between bg-accent/50 rounded-sm">
            <span>Structure</span>
            <span>{equipmentLocation.internalStructure}</span>
          </div>
        </div>
      </div>
      <EquipmentInLocation equipmentLocation={equipmentLocation} />
    </div>
  );
}
