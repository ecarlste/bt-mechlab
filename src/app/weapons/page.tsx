import { isUserAdmin } from "~/data/auth";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getWeapons } from "./actions";

export default async function WeaponsPage() {
  const weaponList = await getWeapons();
  const isAdmin = await isUserAdmin();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={weaponList} enableAdmin={isAdmin} />
    </div>
  );
}
