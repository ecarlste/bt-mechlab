import { isUserAdmin } from "~/data/auth";
import { getAllWeapons } from "~/data/weapon-dto";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const weaponList = await getAllWeapons();

  const isAdmin = await isUserAdmin();

  return (
    <main className="">
      <div className="flex flex-wrap">
        {weaponList.map((weapon) => (
          <div
            key={weapon.id}
            className="w-full rounded-lg border border-white p-4"
          >
            <h2>{weapon.name}</h2>
            <div className="justify-left flex space-x-4">
              <span>Heat: {weapon.heat}</span>
              <span>Damage: {weapon.damage}</span>
              <span>Range: {weapon.range}</span>
            </div>
          </div>
        ))}
        {isAdmin && (
          <div className="rounded-lg border border-white px-2">
            <button>+</button>
          </div>
        )}
      </div>
    </main>
  );
}
