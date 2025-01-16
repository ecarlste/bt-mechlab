import { asc } from "drizzle-orm";

import { db } from "~/server/db";
import { weapons } from "~/server/db/schema";

export default async function HomePage() {
  const weaponList = await db.query.weapons.findMany({
    orderBy: [asc(weapons.name)],
  });

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
      </div>
    </main>
  );
}
