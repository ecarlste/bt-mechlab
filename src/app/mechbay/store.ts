import { toast } from "sonner";
import { create } from "zustand";

import {
  ArmActuatorsInstalled,
  ArmLocation,
  defaultMechActuatorsInstalled,
  MechActuatorsInstalled,
} from "~/lib/equipment/mech-actuators";
import { defaultMechEngine, MechEngine, mechEnginesByRating } from "~/lib/equipment/mech-engines";
import { MechEquipmentChange, MechEquipmentType } from "~/lib/equipment/mech-equipment-type";
import { defaultMechGyro, getGyroTonnageForEngineByRating, MechGyro } from "~/lib/equipment/mech-gyros";
import { jumpJetName } from "~/lib/equipment/mech-jump-jets";
import { initialMechMovement, MechMovement } from "~/lib/movement/mech-movement";

import {
  ArmorSide,
  criticalSlots,
  getCurrentTotalMechArmor,
  getInternalStructureAmount,
  getInternalStructureTonnage,
  getMechArmorTonnage,
  InternalStructureTechnologyBase,
  Location,
  MechEquipmentLocation,
  MechTonnage,
} from "./location";

type MechBuilderState = {
  maxMechTonnage: MechTonnage;
  currentMechTonnage: number;
  mechHeatPerTurn: number;
  mechCoolingPerTurn: number;
  mechEngine: MechEngine;
  mechInternalStructureTonnage: number;
  draggableOver: Location | undefined;
  equipmentLocations: Record<Location, MechEquipmentLocation>;
  mechActuatorsInstalled: MechActuatorsInstalled;
  mechGyro: MechGyro;
  mechMovement: MechMovement;
};

type MechBuilderActions = {
  changeMechArmorInLocationBy: (location: Location, armorSide: ArmorSide, amount: number) => void;
  maxAllArmor: () => void;
  updateDraggableOver: (location: Location) => void;
  addEquipment: (location: Location, equipment: MechEquipmentType) => void;
  setMechEngineRating: (rating: number) => void;
  changeMechEngineHeatSinksBy: (amount: number) => void;
  removeEquipment: (location: Location, index: number) => void;
  removeAllEquipment: () => void;
  enableDraggableOver: (location: Location) => void;
  resetAllDraggableOver: () => void;
  installLowerArmActuator: (location: ArmLocation) => void;
  installHandActuator: (location: ArmLocation) => void;
  removeLowerArmActuator: (location: ArmLocation) => void;
  removeHandActuator: (location: ArmLocation) => void;
};

type MechBuilderStore = MechBuilderState & MechBuilderActions;

function getInitialEquipmentLocation(location: Location, tonnage: MechTonnage): MechEquipmentLocation {
  const internalStructure = getInternalStructureAmount(tonnage, location);
  const maxArmor = location === Location.Head ? 9 : internalStructure * 2;

  return {
    id: location,
    internalStructure: internalStructure,
    armor: {
      maxArmor: maxArmor,
      frontArmor: 0,
      rearArmor: 0,
    },
    criticalSlots: criticalSlots[location],
    criticalSlotsUsed: 0,
    installedEquipment: [],
    hasDraggableOver: false,
  };
}

const initialMechTonnage =
  getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard) +
  defaultMechEngine.tonnage +
  getGyroTonnageForEngineByRating(defaultMechGyro, defaultMechEngine.engineRating);

export const useEquipmentStore = create<MechBuilderStore>()((set) => ({
  maxMechTonnage: 75,
  currentMechTonnage: initialMechTonnage,
  mechActuatorsInstalled: defaultMechActuatorsInstalled,
  mechInternalStructureTonnage: getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard),
  mechEngine: defaultMechEngine,
  mechHeatPerTurn: 0,
  mechExternalHeatSinks: 0,
  mechCoolingPerTurn: 0,
  draggableOver: undefined,
  equipmentLocations: {
    [Location.RightArm]: getInitialEquipmentLocation(Location.RightArm, 75),
    [Location.RightTorso]: getInitialEquipmentLocation(Location.RightTorso, 75),
    [Location.RightLeg]: getInitialEquipmentLocation(Location.RightLeg, 75),
    [Location.Head]: getInitialEquipmentLocation(Location.Head, 75),
    [Location.CenterTorso]: getInitialEquipmentLocation(Location.CenterTorso, 75),
    [Location.LeftTorso]: getInitialEquipmentLocation(Location.LeftTorso, 75),
    [Location.LeftLeg]: getInitialEquipmentLocation(Location.LeftLeg, 75),
    [Location.LeftArm]: getInitialEquipmentLocation(Location.LeftArm, 75),
  },
  mechGyro: defaultMechGyro,
  mechMovement: initialMechMovement,
  maxAllArmor: () =>
    set((state) => {
      const updatedEquipmentLocations = { ...state.equipmentLocations };

      Object.values(updatedEquipmentLocations).forEach((equipmentLocation) => {
        if ([Location.LeftTorso, Location.RightTorso].includes(equipmentLocation.id)) {
          const oneFourthMaxArmor = Math.floor(equipmentLocation.armor.maxArmor / 4);
          const remainder = equipmentLocation.armor.maxArmor % 4;

          equipmentLocation.armor.frontArmor = oneFourthMaxArmor * 3 + remainder;
          equipmentLocation.armor.rearArmor = oneFourthMaxArmor;
        } else if (equipmentLocation.id === Location.CenterTorso) {
          const oneFifthMaxArmor = Math.floor(equipmentLocation.armor.maxArmor / 5);
          const remainder = equipmentLocation.armor.maxArmor % 5;

          equipmentLocation.armor.frontArmor = oneFifthMaxArmor * 4 + remainder;
          equipmentLocation.armor.rearArmor = oneFifthMaxArmor;
        } else {
          equipmentLocation.armor.frontArmor = equipmentLocation.armor.maxArmor;
        }
      });

      return {
        currentMechTonnage: getCurrentMechTonnage(
          Object.values(updatedEquipmentLocations),
          state.mechEngine,
          state.maxMechTonnage,
        ),
        equipmentLocations: updatedEquipmentLocations,
      };
    }),
  changeMechArmorInLocationBy: (location, armorSide, amount) =>
    set((state) => {
      const mechEquipmentLocation = state.equipmentLocations[location];
      if (!mechEquipmentLocation) {
        throw new Error(`Location ${location} does not exist in the store`);
      }

      const currentSideArmor = mechEquipmentLocation.armor[armorSide];
      const maxLocationArmor = mechEquipmentLocation.armor.maxArmor;
      const newLocationArmor = mechEquipmentLocation.armor.frontArmor + mechEquipmentLocation.armor.rearArmor + amount;
      const amountNeededForMaxLocationArmor = maxLocationArmor - newLocationArmor;

      let newSideArmor = currentSideArmor + amount;
      if (amountNeededForMaxLocationArmor < 0) {
        newSideArmor = newSideArmor + amountNeededForMaxLocationArmor;
      } else if (currentSideArmor + amount < 0) {
        newSideArmor = 0;
      }

      let currentMechTonnage = state.currentMechTonnage;
      if (newSideArmor !== currentSideArmor) {
        const currentTotalMechArmor = getCurrentTotalMechArmor(Object.values(state.equipmentLocations));
        const currentTotalMechAmrmorTonnage = getMechArmorTonnage(currentTotalMechArmor);

        const newTotalMechArmor = currentTotalMechArmor - currentSideArmor + newSideArmor;
        const newTotalMechArmorTonnage = getMechArmorTonnage(newTotalMechArmor);

        currentMechTonnage = currentMechTonnage + newTotalMechArmorTonnage - currentTotalMechAmrmorTonnage;
      }

      return {
        currentMechTonnage: currentMechTonnage,
        equipmentLocations: {
          ...state.equipmentLocations,
          [location]: {
            ...mechEquipmentLocation,
            armor: {
              ...mechEquipmentLocation.armor,
              [armorSide]: newSideArmor,
            },
          },
        },
      };
    }),
  updateDraggableOver: (location) =>
    set(() => ({
      draggableOver: location,
    })),
  addEquipment: (location, equipment) =>
    set((state) => {
      const mechEquipmentLocation = state.equipmentLocations[location];
      if (!mechEquipmentLocation) {
        throw new Error(`Location ${location} does not exist in the store`);
      }

      const { criticalSlots: slots, criticalSlotsUsed: slotsUsed } = mechEquipmentLocation;
      if (slotsUsed + equipment.criticalSlots <= slots) {
        const equipmentWeight = isHeatSinkAndIsWeightFreeOnAdd(equipment, state) ? 0 : equipment.weight;

        const updatedEquipmentLocation = {
          ...mechEquipmentLocation,
          criticalSlotsUsed: slotsUsed + equipment.criticalSlots,
          installedEquipment: [...mechEquipmentLocation.installedEquipment, equipment],
        };

        const mechHeatPerTurn = state.mechHeatPerTurn + (equipment.heat > 0 ? equipment.heat : 0);
        const mechCoolingPerTurn = state.mechCoolingPerTurn + (equipment.heat < 0 ? equipment.heat * -1 : 0);

        return {
          mechHeatPerTurn,
          mechCoolingPerTurn,
          currentMechTonnage: state.currentMechTonnage + equipmentWeight,
          equipmentLocations: {
            ...state.equipmentLocations,
            [location]: updatedEquipmentLocation,
          },
          mechMovement: updateMechMovementIfEquipmentIsJumpJet(state.mechMovement, equipment, MechEquipmentChange.Add),
        };
      } else {
        toast.error(`Not enough free slots to equip ${equipment.name}`, { duration: 10000 });
        return state;
      }
    }),
  setMechEngineRating: (rating) =>
    set((state) => {
      const currentMechEngine = state.mechEngine;
      const newMechEngine = mechEnginesByRating[rating];

      if (!newMechEngine) {
        throw new Error(`Engine with rating ${rating} not found`);
      }

      let newIntegralHeatSinks = 0;
      let mechCoolingChange = 0;
      if (currentMechEngine) {
        newIntegralHeatSinks = Math.min(currentMechEngine.integralHeatSinks, newMechEngine.maxIntegralHeatSinks);
        mechCoolingChange = newIntegralHeatSinks - currentMechEngine.integralHeatSinks;
      }

      const newMechCoolingPerTurn = state.mechCoolingPerTurn + mechCoolingChange;

      return {
        mechCoolingPerTurn: newMechCoolingPerTurn,
        currentMechTonnage: getCurrentMechTonnage(
          Object.values(state.equipmentLocations),
          newMechEngine,
          state.maxMechTonnage,
        ),
        mechEngine: {
          ...newMechEngine,
          integralHeatSinks: newIntegralHeatSinks,
        },
        mechMovement: {
          ...state.mechMovement,
          ...getWalkingAndRunningMpForEngineRatingAndMechTonnage(rating, state.maxMechTonnage),
        },
      };
    }),
  changeMechEngineHeatSinksBy: (amount) =>
    set((state) => {
      const currentMechEngine = state.mechEngine;
      if (!currentMechEngine) {
        return state;
      }

      const currentIntegralHeatSinks = currentMechEngine.integralHeatSinks;

      let newIntegralHeatSinks = currentMechEngine.integralHeatSinks + amount;
      if (amount < 0 && newIntegralHeatSinks < 0) {
        newIntegralHeatSinks = 0;
      } else if (amount > 0 && newIntegralHeatSinks > currentMechEngine.maxIntegralHeatSinks) {
        newIntegralHeatSinks = currentMechEngine.maxIntegralHeatSinks;
      }

      const integralHeatSinkChange = newIntegralHeatSinks - currentIntegralHeatSinks;
      const newMechCoolingPerTurn = state.mechCoolingPerTurn + integralHeatSinkChange;

      const mechTonnageChange = calculateInternalHeatSinkTonnageChange(currentIntegralHeatSinks, newIntegralHeatSinks);

      return {
        currentMechTonnage: state.currentMechTonnage + mechTonnageChange,
        mechCoolingPerTurn: newMechCoolingPerTurn,
        mechEngine: {
          ...currentMechEngine,
          integralHeatSinks: newIntegralHeatSinks,
        },
      };
    }),
  removeEquipment: (location, index) =>
    set((state) => {
      const mechEquipmentLocation = state.equipmentLocations[location];
      if (!mechEquipmentLocation) {
        throw new Error(`Location ${location} does not exist in the store`);
      }

      const equipmentToRemove = mechEquipmentLocation.installedEquipment[index];

      if (!equipmentToRemove) {
        throw new Error(`Equipment not found at index ${index} in location ${location}`);
      }

      const removeWeight = isHeatSinkAndIsWeightFreeOnRemove(equipmentToRemove, state) ? 0 : equipmentToRemove.weight;

      const updatedInstalledEquipment = [...mechEquipmentLocation.installedEquipment];
      updatedInstalledEquipment.splice(index, 1);

      const updatedEquipmentLocation = {
        ...mechEquipmentLocation,
        criticalSlotsUsed: mechEquipmentLocation.criticalSlotsUsed - equipmentToRemove.criticalSlots,
        installedEquipment: updatedInstalledEquipment,
      };

      const mechHeatPerTurn = state.mechHeatPerTurn - (equipmentToRemove.heat > 0 ? equipmentToRemove.heat : 0);
      const mechCoolingPerTurn =
        state.mechCoolingPerTurn - (equipmentToRemove.heat < 0 ? equipmentToRemove.heat * -1 : 0);

      return {
        mechHeatPerTurn,
        mechCoolingPerTurn,
        currentMechTonnage: state.currentMechTonnage - removeWeight,
        equipmentLocations: {
          ...state.equipmentLocations,
          [location]: updatedEquipmentLocation,
        },
        mechMovement: updateMechMovementIfEquipmentIsJumpJet(
          state.mechMovement,
          equipmentToRemove,
          MechEquipmentChange.Remove,
        ),
      };
    }),
  removeAllEquipment: () =>
    set((state) => {
      const updatedEquipmentLocations = { ...state.equipmentLocations };
      Object.values(updatedEquipmentLocations).forEach((equipmentLocation) => {
        equipmentLocation.installedEquipment = [];
        equipmentLocation.criticalSlotsUsed = 0;
      });

      return {
        mechExternalHeatSinks: 0,
        mechHeatPerTurn: 0,
        mechCoolingPerTurn: state.mechEngine.integralHeatSinks,
        currentMechTonnage: getCurrentMechTonnage(
          Object.values(updatedEquipmentLocations),
          state.mechEngine,
          state.maxMechTonnage,
        ),
        equipmentLocations: updatedEquipmentLocations,
        mechMovement: { ...state.mechMovement, jumpingMp: 0 },
      };
    }),
  enableDraggableOver: (location) =>
    set((state) => {
      const mechEquipmentLocation = state.equipmentLocations[location];
      if (!mechEquipmentLocation) {
        throw new Error(`Location ${location} does not exist in the store`);
      }

      const updatedEquipmentLocations = { ...state.equipmentLocations };
      Object.values(updatedEquipmentLocations).forEach((equipmentLocation) => {
        equipmentLocation.hasDraggableOver = equipmentLocation.id === location ? true : false;
      });

      return {
        equipmentLocations: updatedEquipmentLocations,
      };
    }),
  resetAllDraggableOver: () =>
    set((state) => {
      const updatedEquipmentLocations = { ...state.equipmentLocations };
      Object.values(updatedEquipmentLocations).forEach((equipmentLocation) => {
        equipmentLocation.hasDraggableOver = false;
      });

      return {
        equipmentLocations: updatedEquipmentLocations,
      };
    }),
  installLowerArmActuator: (location) =>
    set((state) => {
      if (state.mechActuatorsInstalled[location].lowerArm) return state;

      return updateArmLocationActuators(location, state, { lowerArm: true });
    }),
  installHandActuator: (location) =>
    set((state) => {
      if (state.mechActuatorsInstalled[location].hand) return state;

      return updateArmLocationActuators(location, state, { lowerArm: true, hand: true });
    }),
  removeLowerArmActuator: (location) =>
    set((state) => {
      if (!state.mechActuatorsInstalled[location].lowerArm) return state;

      return updateArmLocationActuators(location, state, { lowerArm: false, hand: false });
    }),
  removeHandActuator: (location) =>
    set((state) => {
      if (!state.mechActuatorsInstalled[location].hand) return state;

      return updateArmLocationActuators(location, state, { hand: false });
    }),
}));

function updateArmLocationActuators(
  location: ArmLocation,
  state: MechBuilderStore,
  changedActuators: Partial<ArmActuatorsInstalled>,
) {
  const mechActuatorsInstalled = updateMechActuatorsInstalled(location, state, changedActuators);
  const updatedArmLocation = updateArmLocationForActuatorChange(location, state, mechActuatorsInstalled);

  return {
    equipmentLocations: {
      ...state.equipmentLocations,
      [location]: updatedArmLocation,
    },
    mechActuatorsInstalled,
  };
}

function updateMechActuatorsInstalled(
  location: ArmLocation,
  state: MechBuilderStore,
  changedActuators: Partial<ArmActuatorsInstalled>,
) {
  return {
    ...state.mechActuatorsInstalled,
    [location]: { ...state.mechActuatorsInstalled[location], ...changedActuators },
  };
}

function updateArmLocationForActuatorChange(
  location: ArmLocation,
  state: MechBuilderStore,
  mechActuators: MechActuatorsInstalled,
) {
  let bonusCriticalSlots = 0;
  bonusCriticalSlots += mechActuators[location].lowerArm ? 0 : 1;
  bonusCriticalSlots += mechActuators[location].hand ? 0 : 1;

  const updatedArmLocation = {
    ...state.equipmentLocations[location],
    criticalSlots: criticalSlots[location] + bonusCriticalSlots,
  };

  return updatedArmLocation;
}

function isHeatSinkAndIsWeightFreeOnAdd(equipment: MechEquipmentType, state: MechBuilderStore) {
  return (
    equipment.name.includes("Heat Sink") &&
    isHeatSinkTonnageFree(getExternalHeatSinkCount(Object.values(state.equipmentLocations)) + 1, state.mechEngine)
  );
}

function isHeatSinkAndIsWeightFreeOnRemove(equipment: MechEquipmentType, state: MechBuilderStore) {
  return (
    equipment.name.includes("Heat Sink") &&
    isHeatSinkTonnageFree(getExternalHeatSinkCount(Object.values(state.equipmentLocations)), state.mechEngine)
  );
}

function calculateInternalHeatSinkTonnageChange(currentInternalHeatSinks: number, newInternalHeatSinks: number) {
  const currentHeatSinksAboveTen = currentInternalHeatSinks > 10 ? currentInternalHeatSinks - 10 : 0;
  const newHeatSinksAboveTen = newInternalHeatSinks > 10 ? newInternalHeatSinks - 10 : 0;

  return newHeatSinksAboveTen - currentHeatSinksAboveTen;
}

function getCurrentMechTonnage(
  mechEquipmentLocations: MechEquipmentLocation[],
  mechEngine: MechEngine,
  maxMechTonnage: MechTonnage,
  gyro: MechGyro = defaultMechGyro,
) {
  return (
    getInternalStructureTonnage(maxMechTonnage, InternalStructureTechnologyBase.Standard) +
    getMechArmorTonnage(getCurrentTotalMechArmor(mechEquipmentLocations)) +
    getTotalWeaponTonnage(mechEquipmentLocations) +
    getTotalHeatSinkTonnage(mechEquipmentLocations, mechEngine) +
    mechEngine.tonnage +
    getGyroTonnageForEngineByRating(gyro, mechEngine.engineRating)
  );
}

function getTotalWeaponTonnage(mechEquipmentLocations: MechEquipmentLocation[]) {
  return mechEquipmentLocations.reduce((total, location) => {
    const weapons = location.installedEquipment.filter((item) => "weaponType" in item);
    return total + weapons.reduce((weaponTotal, weapon) => weaponTotal + weapon.weight, 0);
  }, 0);
}

function getTotalHeatSinkTonnage(mechEquipmentLocations: MechEquipmentLocation[], mechEngine: MechEngine) {
  return getInternalHeatSinkTonnage(mechEngine) + getExternalHeatSinkTonnage(mechEquipmentLocations, mechEngine);
}

function getInternalHeatSinkTonnage(mechEngine: MechEngine) {
  return mechEngine.integralHeatSinks > 10 ? mechEngine.integralHeatSinks - 10 : 0;
}

function getExternalHeatSinkTonnage(mechEquipmentLocations: MechEquipmentLocation[], mechEngine: MechEngine) {
  const externalHeatSinkCount = getExternalHeatSinkCount(mechEquipmentLocations);
  const noTonnageHeatSinks = mechEngine.maxIntegralHeatSinks < 10 ? 10 - mechEngine.maxIntegralHeatSinks : 0;

  const eternalHeatSinkTonnage = externalHeatSinkCount - noTonnageHeatSinks;

  return eternalHeatSinkTonnage < 0 ? 0 : eternalHeatSinkTonnage;
}

function getExternalHeatSinkCount(mechEquipmentLocations: MechEquipmentLocation[]) {
  return mechEquipmentLocations.reduce((total, location) => {
    const externalHeatSinks = location.installedEquipment.filter((item) => item.name === "Heat Sink");
    return total + externalHeatSinks.length;
  }, 0);
}

function isHeatSinkTonnageFree(currentExternalHeatSinkCount: number, mechEngine: MechEngine) {
  const noTonnageHeatSinks = mechEngine.maxIntegralHeatSinks < 10 ? 10 - mechEngine.maxIntegralHeatSinks : 0;

  return currentExternalHeatSinkCount <= noTonnageHeatSinks;
}

function getWalkingAndRunningMpForEngineRatingAndMechTonnage(
  rating: number,
  maxMechTonnage: MechTonnage,
): Omit<MechMovement, "jumpingMp"> {
  const walkingMp = Math.floor(rating / maxMechTonnage);
  const runningMp = Math.ceil(walkingMp * 1.5);

  return { walkingMp, runningMp };
}

function updateMechMovementIfEquipmentIsJumpJet(
  mechMovement: MechMovement,
  equipment: MechEquipmentType,
  mechEquipmentChange: MechEquipmentChange,
) {
  if (equipment.name !== jumpJetName) return mechMovement;

  return {
    ...mechMovement,
    jumpingMp: mechMovement.jumpingMp + mechEquipmentChange,
  };
}
