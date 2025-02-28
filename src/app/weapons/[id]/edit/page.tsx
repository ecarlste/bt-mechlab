import { notFound } from "next/navigation";

import { WeaponFormData } from "~/lib/schemas/weapon-schemas";

import { WeaponForm } from "~/app/weapons/_components/weapon-form";

import { getWeaponById } from "~/server/dto/weapon-dto";

interface WeaponsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WeaponsPage({ params }: WeaponsPageProps) {
  const id = (await params).id;
  const weapon = await getWeaponById(id);

  if (!weapon) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <WeaponForm weapon={weapon as WeaponFormData} />
    </div>
  );
}
