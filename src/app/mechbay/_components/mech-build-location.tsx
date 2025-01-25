import { Location } from "../location";
import EquipmentInLocation from "./equipment-in-location";

interface MechBuildLocationProps {
  location: Location;
}

export default function MechBuildLocation({ location }: MechBuildLocationProps) {
  const locationName = location.replace(/([A-Z])/g, " $1").trim();

  return (
    <div className="w-full rounded-t-md border-2 border-b text-center">
      <h2 className="py-2 text-lg font-semibold capitalize tracking-tight">{locationName}</h2>
      <EquipmentInLocation location={location} />
    </div>
  );
}
