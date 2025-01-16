import Link from "next/link";

const mockWeapons = [
  {
    id: "1",
    name: "Large Laser",
    heat: 8,
    damage: 8,
    range: "0/5/10/15"
  },
  {
    id: "2",
    name: "Medium Laser",
    heat: 5,
    damage: 5,
    range: "0/3/6/9"
  },
  {
    id: "3",
    name: "Small Laser",
    heat: 3,
    damage: 3,
    range: "0/1/2/3"
  },
];

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap">
        {mockWeapons.map((weapon) => (
          <div key={weapon.id} className="w-full p-4 border border-white rounded-lg">
              <h2>{weapon.name}</h2>
              <div className="flex justify-left space-x-4">
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
