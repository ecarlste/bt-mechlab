import { MechLocation } from "../mechs/mech-equipment-location";

export type ArmActuatorsInstalled = {
  lowerArm: boolean;
  hand: boolean;
};

export type ArmLocation = MechLocation.LeftArm | MechLocation.RightArm;

export type MechActuatorsInstalled = Record<ArmLocation, ArmActuatorsInstalled>;

export const defaultMechActuatorsInstalled: MechActuatorsInstalled = {
  [MechLocation.LeftArm]: {
    lowerArm: true,
    hand: true,
  },
  [MechLocation.RightArm]: {
    lowerArm: true,
    hand: true,
  },
};
