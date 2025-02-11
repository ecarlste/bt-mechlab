import { Location } from "~/app/mechbay/location";

export type ArmActuatorsInstalled = {
  lowerArm: boolean;
  hand: boolean;
};

export type ArmLocation = Location.LeftArm | Location.RightArm;

export type MechActuatorsInstalled = Record<ArmLocation, ArmActuatorsInstalled>;

export const defaultMechActuatorsInstalled: MechActuatorsInstalled = {
  [Location.LeftArm]: {
    lowerArm: true,
    hand: true,
  },
  [Location.RightArm]: {
    lowerArm: true,
    hand: true,
  },
};
