import { MechTonnage } from "../mechs/battlemech";

export const jumpJetName = "Jump Jet";

export type JumpJet = {
  name: string;
  weight: number;
  criticalSlots: number;
};

export function createJumpJetForMechTonnage(mechTonnage: MechTonnage): JumpJet {
  return {
    name: jumpJetName,
    weight: getJumpJetWeightForMechTonnage(mechTonnage),
    criticalSlots: 1,
  };
}

export function getJumpJetWeightForMechTonnage(mechTonnage: MechTonnage) {
  if (mechTonnage > 85) return 2;
  if (mechTonnage > 55) return 1;
  return 0.5;
}
