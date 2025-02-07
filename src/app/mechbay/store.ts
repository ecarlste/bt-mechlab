import { toast } from "sonner";
import { create } from "zustand";

import { MechEquipmentType } from "~/lib/equipment/mech-equipment-type";

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

interface EquipmentState {
  initialized: boolean;
  maxMechTonnage: MechTonnage;
  currentMechTonnage: number;
  mechHeatPerTurn: number;
  mechCoolingPerTurn: number;
  mechInternalStructureTonnage: number;
  draggableOver: Location | undefined;
  equipmentLocations: Record<Location, MechEquipmentLocation>;
  initialize: (equipment: MechEquipmentType[]) => void;
  changeMechArmorInLocationBy: (location: Location, armorSide: ArmorSide, amount: number) => void;
  maxAllArmor: () => void;
  updateDraggableOver: (location: Location) => void;
  addEquipment: (location: Location, equipment: MechEquipmentType) => void;
  removeEquipment: (location: Location, index: number) => void;
  removeAllEquipment: () => void;
  enableDraggableOver: (location: Location) => void;
  resetAllDraggableOver: () => void;
}

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

export const useEquipmentStore = create<EquipmentState>()((set) => ({
  initialized: false,
  maxMechTonnage: 75,
  currentMechTonnage: getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard),
  mechInternalStructureTonnage: getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard),
  mechHeatPerTurn: 0,
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
  initialize: (equipment) => {
    set((state) => {
      if (state.initialized) return state;

      const lowerArmActuator = equipment.find((item) => item.name === "Lower Arm Actuator");
      const handActuator = equipment.find((item) => item.name === "Hand Actuator");

      if (!lowerArmActuator || !handActuator) {
        throw new Error("Lower Arm Actuator or Hand Actuator not found in equipment");
      }

      const armActuators = [lowerArmActuator, handActuator];
      const criticalSlotsUsed = armActuators.reduce((total, item) => total + item.criticalSlots, 0);
      const updatedRightArm = {
        ...state.equipmentLocations[Location.RightArm],
        criticalSlotsUsed,
        installedEquipment: [...armActuators],
      };
      const updatedLeftArm = {
        ...state.equipmentLocations[Location.LeftArm],
        criticalSlotsUsed,
        installedEquipment: [...armActuators],
      };

      const updatedEquipmentLocations = {
        ...state.equipmentLocations,
        [Location.RightArm]: updatedRightArm,
        [Location.LeftArm]: updatedLeftArm,
      };

      return {
        initialized: true,
        equipmentLocations: updatedEquipmentLocations,
      };
    });
  },
  maxAllArmor: () =>
    set((state) => {
      const updatedEquipmentLocations = { ...state.equipmentLocations };
      let totalArmor = 0;
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

        totalArmor += equipmentLocation.armor.frontArmor + equipmentLocation.armor.rearArmor;
      });

      return {
        currentMechTonnage: state.mechInternalStructureTonnage + getMechArmorTonnage(totalArmor),
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

      if (equipment.name.includes("Actuator")) {
        const { isValid, errorMessage } = isValidActuatorInstall(equipment, mechEquipmentLocation);
        if (!isValid) {
          toast.error(errorMessage, { duration: 10000 });
          return state;
        }
      }

      const { criticalSlots: slots, criticalSlotsUsed: slotsUsed } = mechEquipmentLocation;
      if (slotsUsed + equipment.criticalSlots <= slots) {
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
          currentMechTonnage: state.currentMechTonnage + equipment.weight,
          equipmentLocations: {
            ...state.equipmentLocations,
            [location]: updatedEquipmentLocation,
          },
        };
      } else {
        toast.error(`Not enough free slots to equip ${equipment.name}`, { duration: 10000 });
        return state;
      }
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

      if (
        equipmentToRemove.name === "Lower Arm Actuator" &&
        locationHasActuatorInstalled(mechEquipmentLocation, "Hand Actuator")
      ) {
        toast.error("Cannot remove Lower Arm Actuator while Hand Actuator is installed", { duration: 10000 });
        return state;
      }

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
        currentMechTonnage: state.currentMechTonnage - equipmentToRemove.weight,
        equipmentLocations: {
          ...state.equipmentLocations,
          [location]: updatedEquipmentLocation,
        },
      };
    }),
  removeAllEquipment: () =>
    set((state) => {
      const updatedEquipmentLocations = { ...state.equipmentLocations };
      Object.values(updatedEquipmentLocations).forEach((equipmentLocation) => {
        equipmentLocation.installedEquipment = [];
        equipmentLocation.criticalSlotsUsed = 0;
      });

      const totalArmor = getCurrentTotalMechArmor(Object.values(updatedEquipmentLocations));

      return {
        mechHeatPerTurn: 0,
        mechCoolingPerTurn: 0,
        currentMechTonnage: state.mechInternalStructureTonnage + getMechArmorTonnage(totalArmor),
        equipmentLocations: updatedEquipmentLocations,
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
}));

function isValidActuatorInstall(equipment: MechEquipmentType, equipmentLocation: MechEquipmentLocation) {
  if (![Location.LeftArm, Location.RightArm].includes(equipmentLocation.id)) {
    return {
      isValid: false,
      errorMessage: `${equipment.name} can only be installed in the Arm location`,
    };
  }

  if (locationHasActuatorInstalled(equipmentLocation, equipment.name)) {
    return {
      isValid: false,
      errorMessage: `${equipment.name} already installed in Right Arm`,
    };
  }

  if (equipment.name === "Hand Actuator" && !locationHasActuatorInstalled(equipmentLocation, "Lower Arm Actuator")) {
    return {
      isValid: false,
      errorMessage: `Lower Arm Actuator must be installed before installing ${equipment.name}`,
    };
  }

  return { isValid: true };
}

function locationHasActuatorInstalled(equipmentLocation: MechEquipmentLocation, actuatorName: string) {
  return equipmentLocation.installedEquipment.find((item) => item.name === actuatorName) !== undefined;
}
