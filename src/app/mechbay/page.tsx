import { getAllEquipment } from "~/server/dto/equipment-dto";
import { getAllWeapons } from "~/server/dto/weapon-dto";

import MechBuilder from "./_components/mech-builder";
import { MechEquipmentType } from "./_components/mech-equipment-type";

export default async function MechBayPage() {
  const weapons = await getAllWeapons();
  const equipment = await getAllEquipment();

  const allWeaponsAndEquipment = [...weapons, ...equipment].sort((a, b) =>
    a.name.localeCompare(b.name),
  ) as MechEquipmentType[];

  return (
    <div className="container mx-auto flex py-10">
      <MechBuilder equipment={allWeaponsAndEquipment} />
    </div>
  );
}
