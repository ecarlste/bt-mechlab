import { isUserAdmin } from "~/data/auth";
import { getAllWeapons } from "~/data/weapon-dto";
import { DataTable } from "./data-table";
import { columns } from "./columns";

// export const dynamic = "force-dynamic";

export default async function WeaponsPage() {
  const weaponList = await getAllWeapons();
  //   const isAdmin = await isUserAdmin();

  console.log(columns);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={weaponList} />
    </div>
  );
}
