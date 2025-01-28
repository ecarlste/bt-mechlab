import { isUserAdmin } from "~/data/auth";
import { getAllWeapons } from "~/data/weapon-dto";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function WeaponsPage() {
  const weaponList = await getAllWeapons();
  const isAdmin = await isUserAdmin();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={weaponList} enableAdmin={isAdmin} />
    </div>
  );
}
