interface MechBuildLocationProps {
  name: string;
  criticalSlots: number;
}

function currentEquipmentInLocation(criticalSlots: number) {
  const equipped = [];

  for (let i = 0; i < criticalSlots; i++) {
    equipped.push(<div className="flex h-10 w-full border-b" key={i}></div>);
  }

  return equipped;
}

export default function MechBuildLocation({ name, criticalSlots }: MechBuildLocationProps) {
  return (
    <div className="w-full rounded-md border-2 text-center">
      <h2 className="py-2 text-lg font-semibold tracking-tight">{name}</h2>
      <div className="border-t-4">{currentEquipmentInLocation(criticalSlots)}</div>
    </div>
  );
}
