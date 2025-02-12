import { MechEquipmentType } from "~/lib/equipment/mech-equipment-type";

import { getAllEquipment } from "~/server/dto/equipment-dto";
import { getAllWeapons } from "~/server/dto/weapon-dto";

import MechBuilder from "./_components/mech-builder";

export default async function MechBayPage() {
  const weapons = await getAllWeapons();
  const equipment = await getAllEquipment();

  const allWeaponsAndEquipment = [...weapons, ...equipment] as MechEquipmentType[];

  return (
    <div className="container mx-auto flex py-10">
      <MechBuilder equipment={allWeaponsAndEquipment} />
    </div>
  );
}
