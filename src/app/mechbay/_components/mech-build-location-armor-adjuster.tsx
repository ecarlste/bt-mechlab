"use client";

import { SquareMinus, SquarePlus } from "lucide-react";

import { cn } from "~/lib/utils";

import { ArmorSide, MechEquipmentLocationArmor, Location } from "../location";
import { useEquipmentStore } from "../store";

type MechBuildLocationArmorAdjusterProps = {
  location: Location;
  armor: MechEquipmentLocationArmor;
  armorSide: ArmorSide;
};

export default function MechBuildLocationArmorAdjuster({
  location,
  armor,
  armorSide,
}: MechBuildLocationArmorAdjusterProps) {
  const changeMechArmorInLocationBy = useEquipmentStore((state) => state.changeMechArmorInLocationBy);

  const armorName = armorSide
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ")[0];

  const armorAdjustButtonSharedCn = "h-3.5 w-3.5";
  const armorAdjustButtonCn = cn(armorAdjustButtonSharedCn, "hover:bg-primary/25 rounded-xs cursor-pointer");
  const armorAdjustButtonDisabledCn = cn(armorAdjustButtonSharedCn, "cursor-not-allowed opacity-20");

  function handleRemoveArmor(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();
    const armorChange = e.shiftKey ? -5 : -1;
    changeMechArmorInLocationBy(location, armorSide, armorChange);
  }

  function handleAddArmor(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();
    const armorChange = e.shiftKey ? 5 : 1;
    changeMechArmorInLocationBy(location, armorSide, armorChange);
  }

  function preventTextSelection(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();
  }

  function hasMaxArmor() {
    return armor[ArmorSide.FrontArmor] + armor[ArmorSide.RearArmor] >= armor.maxArmor;
  }

  return (
    <div className="px-2 flex justify-between">
      <span className="capitalize">{armorName}</span>
      <div className="flex space-x-1.5 items-center">
        <SquareMinus
          className={armor[armorSide] === 0 ? armorAdjustButtonDisabledCn : armorAdjustButtonCn}
          onMouseDown={preventTextSelection}
          onClick={armor[armorSide] === 0 ? preventTextSelection : handleRemoveArmor}
        />
        <span className="w-6">{armor[armorSide]}</span>
        <SquarePlus
          className={hasMaxArmor() ? armorAdjustButtonDisabledCn : armorAdjustButtonCn}
          onMouseDown={preventTextSelection}
          onClick={hasMaxArmor() ? preventTextSelection : handleAddArmor}
        />
      </div>
    </div>
  );
}
