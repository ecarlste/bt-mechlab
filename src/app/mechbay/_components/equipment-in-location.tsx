interface EquipmentInLocationProps {
  criticalSlots: number;
}

export default function EquipmentInLocation({ criticalSlots }: EquipmentInLocationProps) {
  return <div className="border-t-4">{currentEquipmentInLocation(criticalSlots)}</div>;
}

function currentEquipmentInLocation(criticalSlots: number) {
  const equipped = [];

  for (let i = 0; i < criticalSlots; i++) {
    equipped.push(<div className="flex h-10 w-full border-b" key={i}></div>);
  }

  return equipped;
}
