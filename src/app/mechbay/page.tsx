import { getAllWeapons } from "~/data/weapon-dto";

import MechBuilder from "./_components/mech-builder";
import { MechEquipmentType } from "./_components/mech-equipment-type";

export default async function MechBayPage() {
  const weapons = await getAllWeapons();

  return (
    <div className="container mx-auto flex py-10">
      <MechBuilder equipment={weapons as MechEquipmentType[]} />
    </div>
  );
}
