import { SquareMinus, SquarePlus } from "lucide-react";

import { cn } from "~/lib/utils";

import { ArmorSide, MechEquipmentLocationArmor, Location } from "../location";

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
  const armorName = armorSide
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ")[0];

  const armorAdjustButtonCn = cn("h-3.5 w-3.5 hover:bg-primary/25 rounded-xs cursor-pointer");

  function handleRemoveArmor(e: React.MouseEvent<SVGSVGElement>) {
    const armorChange = e.shiftKey ? 5 : 1;

    console.log(`remove ${armorChange} ${armorSide} from ${location}`);
  }

  function handleAddArmor(e: React.MouseEvent<SVGSVGElement>) {
    const armorChange = e.shiftKey ? 5 : 1;

    console.log(`remove ${armorChange} ${armorSide} from ${location}`);
  }

  return (
    <div className="px-2 flex justify-between">
      <span className="capitalize">{armorName}</span>
      <div className="flex space-x-1.5 items-center">
        <SquareMinus className={armorAdjustButtonCn} onClick={handleRemoveArmor} />
        <span>{armor.frontArmor}</span>
        <SquarePlus className={armorAdjustButtonCn} onClick={handleAddArmor} />
      </div>
    </div>
  );
}
