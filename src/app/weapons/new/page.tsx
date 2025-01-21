import { isUserAdmin } from "~/data/auth";
import { WeaponForm } from "./_components/weapon-form";

export default async function WeaponsPage() {
  const isAdmin = await isUserAdmin();

  return (
    <div className="container mx-auto py-10">
      <WeaponForm />
    </div>
  );
}
