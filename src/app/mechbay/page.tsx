import { getAllWeapons } from "~/server/dto/weapon-dto";

import MechBuilder from "./_components/mech-builder";

export default async function MechBayPage() {
  const weapons = await getAllWeapons();

  return (
    <div className="container mx-auto flex py-10">
      <MechBuilder equipment={weapons} />
    </div>
  );
}
