import { ArmLocation } from "~/lib/equipment/mech-actuators";
import { ArmorSide } from "~/lib/mechs/mech-armor";
import { MechEquipmentLocation } from "~/lib/mechs/mech-equipment-location";
import { MechLocation } from "~/lib/mechs/mech-equipment-location";

import EquipmentInLocation from "./equipment-in-location";
import MechBuildArmActuatorSelector from "./mech-build-arm-actuator-selector";
import MechBuildCockpitSelector from "./mech-build-cockpit-selector";
import MechBuildEngineSelector from "./mech-build-engine-selector";
import MechBuildGyroSelector from "./mech-build-gyro-selector";
import MechBuildLocationArmorAdjuster from "./mech-build-location-armor-adjuster";

interface MechBuildLocationProps {
  equipmentLocation: MechEquipmentLocation;
}

const locationsWithRearArmor = [MechLocation.CenterTorso, MechLocation.RightTorso, MechLocation.LeftTorso];
const armLocations = [MechLocation.RightArm, MechLocation.LeftArm];

export default function MechBuildLocation({ equipmentLocation }: MechBuildLocationProps) {
  const locationName = equipmentLocation.id.replace(/([A-Z])/g, " $1").trim();
  const enableRearArmor = locationsWithRearArmor.includes(equipmentLocation.id as MechLocation);

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
              location={equipmentLocation.id as MechLocation}
              armorSide={ArmorSide.FrontArmor}
            />
            {enableRearArmor && (
              <MechBuildLocationArmorAdjuster
                armor={equipmentLocation.armor}
                location={equipmentLocation.id as MechLocation}
                armorSide={ArmorSide.RearArmor}
              />
            )}
          </div>
          <div className="px-2 py-0.5 text-sm flex justify-between bg-accent/50 rounded-sm">
            <span>Structure</span>
            <span>{equipmentLocation.internalStructure}</span>
          </div>
          {equipmentLocation.id === MechLocation.Head && <MechBuildCockpitSelector />}
          {equipmentLocation.id === MechLocation.CenterTorso && (
            <>
              <MechBuildEngineSelector />
              <MechBuildGyroSelector />
            </>
          )}
          {armLocations.includes(equipmentLocation.id as MechLocation) && (
            <MechBuildArmActuatorSelector location={equipmentLocation.id as ArmLocation} />
          )}
        </div>
      </div>
      <EquipmentInLocation equipmentLocation={equipmentLocation} />
    </div>
  );
}
