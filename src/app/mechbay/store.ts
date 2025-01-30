import { toast } from "sonner";
import { create } from "zustand";

import { MechEquipmentType } from "./_components/mech-equipment-type";

import {
  criticalSlots,
  getInternalStructureAmount,
  getInternalStructureTonnage,
  InternalStructureTechnologyBase,
  Location,
  MechEquipmentLocation,
  MechTonnage,
} from "./location";

interface EquipmentState {
  maxMechTonnage: MechTonnage;
  currentMechTonnage: number;
  mechInternalStructureTonnage: number;
  draggableOver: Location | undefined;
  equipmentLocations: Record<Location, MechEquipmentLocation>;
  updateDraggableOver: (location: Location) => void;
  addEquipment: (location: Location, equipment: MechEquipmentType) => void;
  removeEquipment: (location: Location, equipmentId: string) => void;
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
  maxMechTonnage: 75,
  currentMechTonnage: getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard),
  mechInternalStructureTonnage: getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard),
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
        const updatedEquipmentLocation = {
          ...mechEquipmentLocation,
          criticalSlotsUsed: slotsUsed + equipment.criticalSlots,
          installedEquipment: [...mechEquipmentLocation.installedEquipment, equipment],
        };

        return {
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
  removeEquipment: (location, equipmentId) =>
    set((state) => {
      const mechEquipmentLocation = state.equipmentLocations[location];
      if (!mechEquipmentLocation) {
        throw new Error(`Location ${location} does not exist in the store`);
      }

      const equipmentToRemove = mechEquipmentLocation.installedEquipment.find((item) => item.id === equipmentId);

      if (!equipmentToRemove) {
        throw new Error(`Equipment with id ${equipmentId} not found in location ${location}`);
      }

      const updatedEquipmentLocation = {
        ...mechEquipmentLocation,
        criticalSlotsUsed: mechEquipmentLocation.criticalSlotsUsed - equipmentToRemove.criticalSlots,
        installedEquipment: mechEquipmentLocation.installedEquipment.filter((item) => item.id !== equipmentId),
      };

      return {
        currentMechTonnage: state.currentMechTonnage - equipmentToRemove.weight,
        equipmentLocations: {
          ...state.equipmentLocations,
          [location]: updatedEquipmentLocation,
        },
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
