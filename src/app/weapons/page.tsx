// import { isUserAdmin } from "~/data/auth";
import { getAllWeapons } from "~/data/weapon-dto";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export const dynamic = "force-dynamic";

export default async function WeaponsPage() {
  const weaponList = await getAllWeapons();
  //   const isAdmin = await isUserAdmin();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={weaponList} />
    </div>
  );
}
