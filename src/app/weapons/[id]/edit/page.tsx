import { getWeaponById } from "~/data/weapon-dto";

import { WeaponForm } from "~/app/weapons/_components/weapon-form";

interface WeaponsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WeaponsPage({ params }: WeaponsPageProps) {
  const id = (await params).id;
  const weapon = await getWeaponById(Number(id));

  return (
    <div className="container mx-auto py-10">
      <WeaponForm weapon={weapon} />
    </div>
  );
}
