import { MechTonnage } from "~/app/mechbay/location";

export const jumpJetName = "Jump Jet";

export type JumpJet = {
  name: string;
  heat: number;
  weight: number;
  criticalSlots: number;
};

export function createJumpJetForMechTonnage(mechTonnage: MechTonnage): JumpJet {
  return {
    name: jumpJetName,
    heat: 0,
    weight: getJumpJetWeightForMechTonnage(mechTonnage),
    criticalSlots: 1,
  };
}

export function getJumpJetWeightForMechTonnage(mechTonnage: MechTonnage) {
  if (mechTonnage > 85) return 2;
  if (mechTonnage > 55) return 1;
  return 0.5;
}
