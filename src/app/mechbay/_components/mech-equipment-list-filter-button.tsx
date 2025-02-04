import { cn } from "~/lib/utils";

type MechEquipmentListFilterButtonProps = {
  text: string;
  filter: string;
  setFilter: () => void;
};

export default function MechEquipmentListFilterButton({
  text,
  filter,
  setFilter,
}: MechEquipmentListFilterButtonProps) {
  const bgColor = filter === text ? "bg-secondary" : "bg-primary/25";
  const bottomBorderColor = filter === text ? "border-b-accent-foreground" : "border-b-transparent";
  const cursor = filter === text ? "cursor-default" : "cursor-pointer";
  const hoverStyles = filter === text ? "" : "hover:bg-secondary/50 hover:border-b-accent-foreground";

  return (
    <div
      className={cn(bgColor, bottomBorderColor, cursor, hoverStyles, "w-full text-center text-xs py-1 border-y-1")}
      onClick={setFilter}
    >
      {text}
    </div>
  );
}
