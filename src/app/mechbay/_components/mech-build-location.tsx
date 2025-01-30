import { MechEquipmentLocation, Location, ArmorSide } from "../location";
import EquipmentInLocation from "./equipment-in-location";
import MechBuildLocationArmorAdjuster from "./mech-build-location-armor-adjuster";

interface MechBuildLocationProps {
  equipmentLocation: MechEquipmentLocation;
}

const locationsWithRearArmor = [Location.CenterTorso, Location.RightTorso, Location.LeftTorso];

export default function MechBuildLocation({ equipmentLocation }: MechBuildLocationProps) {
  const locationName = equipmentLocation.id.replace(/([A-Z])/g, " $1").trim();
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
            <MechBuildLocationArmorAdjuster
              armor={equipmentLocation.armor}
              location={equipmentLocation.id as Location}
              armorSide={ArmorSide.FrontArmor}
            />
            {enableRearArmor && (
              <MechBuildLocationArmorAdjuster
                armor={equipmentLocation.armor}
                location={equipmentLocation.id as Location}
                armorSide={ArmorSide.RearArmor}
              />
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
