"use client";

import { CheckedState } from "@radix-ui/react-checkbox";

import { ArmLocation } from "~/lib/equipment/mech-actuators";

import { Checkbox } from "~/components/ui/checkbox";

import { useEquipmentStore } from "../store";

type MechBuildArmActuatorSelectorProps = {
  location: ArmLocation;
};

export default function MechBuildArmActuatorSelector({ location }: MechBuildArmActuatorSelectorProps) {
  const {
    mechActuatorsInstalled,
    installLowerArmActuator,
    installHandActuator,
    removeLowerArmActuator,
    removeHandActuator,
  } = useEquipmentStore((state) => state);

  const armActuatorsInstalled = mechActuatorsInstalled[location];

  function handleLowerArmActuatorChange(checked: CheckedState) {
    if (checked) {
      installLowerArmActuator(location);
    } else {
      removeLowerArmActuator(location);
    }
  }

  function handleHandActuatorChange(checked: CheckedState) {
    if (checked) {
      installHandActuator(location);
    } else {
      removeHandActuator(location);
    }
  }

  return (
    <div className="px-2 py-0.5 text-sm bg-accent/50 rounded-sm">
      <div className="flex justify-left">
        <span>Actuators</span>
      </div>

      <div className="px-2 flex justify-between">
        <span>Lower Arm</span>
        <Checkbox checked={armActuatorsInstalled.lowerArm} onCheckedChange={handleLowerArmActuatorChange} />
      </div>

      <div className="px-2 flex justify-between space-x-5">
        <span>Hand</span>
        <Checkbox checked={armActuatorsInstalled.hand} onCheckedChange={handleHandActuatorChange} />
      </div>
    </div>
  );
}
