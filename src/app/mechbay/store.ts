import { create } from "zustand";

import { MechEquipmentType } from "./_components/mech-equipment-type";
import { criticalSlots, Location, MechEquipmentLocation } from "./location";

interface EquipmentState {
  equipmentLocations: Record<Location, MechEquipmentLocation>;
  addEquipment: (location: Location, equipment: MechEquipmentType) => void;
  removeEquipment: (location: Location, equipmentId: string) => void;
}

export const useEquipmentStore = create<EquipmentState>()((set) => ({
  equipmentLocations: {
    [Location.RightArm]: {
      id: Location.RightArm,
      criticalSlots: criticalSlots.rightArm,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.RightTorso]: {
      id: Location.RightTorso,
      criticalSlots: criticalSlots.rightTorso,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.RightLeg]: {
      id: Location.RightLeg,
      criticalSlots: criticalSlots.rightLeg,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.Head]: {
      id: Location.Head,
      criticalSlots: criticalSlots.head,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.CenterTorso]: {
      id: Location.CenterTorso,
      criticalSlots: criticalSlots.centerTorso,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.LeftTorso]: {
      id: Location.LeftTorso,
      criticalSlots: criticalSlots.leftTorso,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.LeftLeg]: {
      id: Location.LeftLeg,
      criticalSlots: criticalSlots.leftLeg,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
    [Location.LeftArm]: {
      id: Location.LeftArm,
      criticalSlots: criticalSlots.leftArm,
      criticalSlotsUsed: 0,
      installedEquipment: [],
    },
  },
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
        console.warn("Not enough free slots to equip", equipment.name);
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
        console.warn(`Equipment with id ${equipmentId} not found in location ${location}`);
        return state;
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
}));
