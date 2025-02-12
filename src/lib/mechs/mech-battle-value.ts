import { getCriticalSpaceForExplosiveAmmo } from "../equipment/mech-ammo";
import { defaultMechEngineTypeModifier } from "../equipment/mech-engines";
import { defaultMechGyroTypeModifier } from "../equipment/mech-gyros";
import { MechMovement } from "../movement/mech-movement";
import { MechTonnage } from "./battlemech";
import { defaultMechArmorTypeModifier, getTotalMechArmor } from "./mech-armor";
import { MechEquipmentLocation } from "./mech-equipment-location";
import { defaultMechInternalStructureTypeModifier, getTotalMechInternalStructure } from "./mech-internal-structure";

function calculateDefensiveBattleRating(
  equipmentLocations: MechEquipmentLocation[],
  mechTonnage: MechTonnage,
  mechMovement: MechMovement,
) {
  const mechArmorBattleValue = getTotalMechArmor(equipmentLocations) * 2.5 * defaultMechArmorTypeModifier.modifier;
  const mechInternalStructureBattleValue =
    getTotalMechInternalStructure(equipmentLocations) *
    1.5 *
    defaultMechInternalStructureTypeModifier.modifier *
    defaultMechEngineTypeModifier.modifier;
  const gyroBattleValue = mechTonnage * defaultMechGyroTypeModifier.modifier;

  const explosiveAmmoBattleValueReduction = getCriticalSpaceForExplosiveAmmo(equipmentLocations) * 15;

  return (
    (mechArmorBattleValue + mechInternalStructureBattleValue + gyroBattleValue - explosiveAmmoBattleValueReduction) *
    getMechDefensiveFactor(mechMovement)
  );
}

function calculateOffensiveBattleRating() {
  return 0;
}

export function calculateMechBattleValue(
  equipmentLocations: MechEquipmentLocation[],
  mechTonnage: MechTonnage,
  mechMovement: MechMovement,
) {
  return Math.round(
    calculateDefensiveBattleRating(equipmentLocations, mechTonnage, mechMovement) + calculateOffensiveBattleRating(),
  );
}

function getMechDefensiveFactor(mechMovement: MechMovement) {
  const targetModifier = mechMovement.jumpingMp;

  return targetModifier * 0.1 + 1;
}
