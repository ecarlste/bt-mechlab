import { isUserAdmin } from "~/data/auth";
import { getAllWeapons } from "~/data/weapon-dto";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const weaponList = await getAllWeapons();

  const isAdmin = await isUserAdmin();

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="shrink text-6xl">Welcome to the Mech Lab</div>
    </main>
  );
}
