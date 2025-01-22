import { MechEquipmentList } from "./_components/mech-equipment-list";

const equipment = [
  { name: "L Laser", weight: 5, criticalSlots: 2 },
  { name: "M Laser", weight: 2, criticalSlots: 1 },
  { name: "S Laser", weight: 1, criticalSlots: 1 },
];

export default async function MechBayPage() {
  return (
    <div className="container mx-auto flex py-10">
      <div className="grid w-full grid-cols-6">
        <MechEquipmentList equipment={equipment} />
        <div className="col-span-5 w-full text-center">mech build component</div>
      </div>
    </div>
  );
}
