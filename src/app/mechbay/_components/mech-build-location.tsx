import EquipmentInLocation from "./equipment-in-location";

interface MechBuildLocationProps {
  name: string;
  criticalSlots: number;
}

export default function MechBuildLocation({ name, criticalSlots }: MechBuildLocationProps) {
  return (
    <div className="w-full rounded-md border-2 text-center">
      <h2 className="py-2 text-lg font-semibold tracking-tight">{name}</h2>
      <EquipmentInLocation criticalSlots={criticalSlots} />
    </div>
  );
}
