import { SquareMinus, SquarePlus } from "lucide-react";

import { mechEngines } from "~/lib/equipment/mech-engines";
import { cn } from "~/lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { useEquipmentStore } from "../store";

export default function MechBuildEngineSelector() {
  const mechEngine = useEquipmentStore((state) => state.mechEngine);
  const setMechEngineRating = useEquipmentStore((state) => state.setMechEngineRating);
  const changeMechEngineHeatSinksBy = useEquipmentStore((state) => state.changeMechEngineHeatSinksBy);

  const heatSinkAdjustorButtonSharedCn = "h-3.5 w-3.5";
  const heatSinkAdjustorButtonCn = cn(heatSinkAdjustorButtonSharedCn, "hover:bg-primary/25 rounded-xs cursor-pointer");
  const heatSinkAdjustorButtonDisabledCn = cn(heatSinkAdjustorButtonSharedCn, "cursor-not-allowed opacity-20");

  function handleMechEngineRatingChange(value: string) {
    setMechEngineRating(parseInt(value));
  }

  function handleAddHeatSinks(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();
    const heatSinkChange = e.shiftKey ? 5 : 1;
    changeMechEngineHeatSinksBy(heatSinkChange);
  }

  function handleRemoveHeatSinks(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();
    const heatSinkChange = e.shiftKey ? -5 : -1;
    changeMechEngineHeatSinksBy(heatSinkChange);
  }

  let hasNoHeatSinks = true;
  let hasMaxHeatSinks = false;
  if (mechEngine) {
    hasNoHeatSinks = mechEngine.integralHeatSinks <= 0;
    hasMaxHeatSinks = mechEngine.integralHeatSinks >= mechEngine.maxIntegralHeatSinks;
  }

  return (
    <div className="px-2 py-0.5 text-sm bg-accent/50 rounded-sm">
      <div className="flex justify-between">
        <span>Engine</span>
      </div>

      <div className="px-2 flex justify-between space-x-15">
        <span>Rating</span>
        <Select onValueChange={handleMechEngineRatingChange} value={mechEngine?.engineRating.toString()}>
          <SelectTrigger className="text-xs text-end justify-end h-4 space-x-1.5">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            {mechEngines.map((engine) => (
              <SelectItem key={engine.engineRating} value={`${engine.engineRating}`} className="text-end text-xs">
                {engine.engineRating}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="px-2 flex justify-between space-x-6">
        <span>Heat Sinks</span>
        <div className="flex space-x-1.5 items-center">
          <SquareMinus
            className={cn(heatSinkAdjustorButtonCn, hasNoHeatSinks ? heatSinkAdjustorButtonDisabledCn : "")}
            onClick={handleRemoveHeatSinks}
          />
          <span className="w-13 text-xs">
            {mechEngine ? mechEngine.integralHeatSinks : "-"}/{mechEngine?.maxIntegralHeatSinks || "-"}
          </span>
          <SquarePlus
            className={cn(heatSinkAdjustorButtonCn, hasMaxHeatSinks ? heatSinkAdjustorButtonDisabledCn : "")}
            onClick={handleAddHeatSinks}
          />
        </div>
      </div>
    </div>
  );
}
