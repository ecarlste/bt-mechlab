import { toast } from "sonner";
import { create } from "zustand";

import { MechEquipmentType } from "./_components/mech-equipment-type";

import {
  criticalSlots,
  getInternalStructureTonnage,
  InternalStructureTechnologyBase,
  Location,
  MechEquipmentLocation,
  MechTonnage,
} from "./location";

interface EquipmentState {
  mechTonnage: MechTonnage;
  mechInternalStructureTonnage: number;
  draggableOver: Location | undefined;
  equipmentLocations: Record<Location, MechEquipmentLocation>;
  updateDraggableOver: (location: Location) => void;
  addEquipment: (location: Location, equipment: MechEquipmentType) => void;
  removeEquipment: (location: Location, equipmentId: string) => void;
  enableDraggableOver: (location: Location) => void;
  resetAllDraggableOver: () => void;
}

export const useEquipmentStore = create<EquipmentState>()((set) => ({
  mechTonnage: 75,
  mechInternalStructureTonnage: getInternalStructureTonnage(75, InternalStructureTechnologyBase.Standard),
  draggableOver: undefined,
  equipmentLocations: {
    [Location.RightArm]: {
      id: Location.RightArm,
      criticalSlots: criticalSlots.rightArm,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.RightTorso]: {
      id: Location.RightTorso,
      criticalSlots: criticalSlots.rightTorso,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.RightLeg]: {
      id: Location.RightLeg,
      criticalSlots: criticalSlots.rightLeg,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.Head]: {
      id: Location.Head,
      criticalSlots: criticalSlots.head,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.CenterTorso]: {
      id: Location.CenterTorso,
      criticalSlots: criticalSlots.centerTorso,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.LeftTorso]: {
      id: Location.LeftTorso,
      criticalSlots: criticalSlots.leftTorso,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.LeftLeg]: {
      id: Location.LeftLeg,
      criticalSlots: criticalSlots.leftLeg,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
    [Location.LeftArm]: {
      id: Location.LeftArm,
      criticalSlots: criticalSlots.leftArm,
      criticalSlotsUsed: 0,
      installedEquipment: [],
      hasDraggableOver: false,
    },
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
