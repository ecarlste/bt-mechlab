import { Location } from "../location";
import EquipmentInLocation from "./equipment-in-location";

interface MechBuildLocationProps {
  location: Location;
}

export default function MechBuildLocation({ location }: MechBuildLocationProps) {
  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <h2 className="py-2 text-lg font-semibold tracking-tight">{location}</h2>
      <EquipmentInLocation location={location} />
    </div>
  );
}
