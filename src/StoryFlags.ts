import { NPCContent } from "./objects/NPC/NPC";

export class StoryFlags {
  flags: Map<string, boolean>;

  constructor() {
    this.flags = new Map();
  }

  add(flag: string) {
    this.flags.set(flag, true);
  }

  getRelevantScenario(scenarios: NPCContent[] = []) {
    return scenarios.find((scenario) => {
      // Disqualify when any bypass flags are set
      const bypassFlags = scenario.bypass ?? [];
      for (const thisFlag of bypassFlags) {
        if (this.flags.has(thisFlag)) {
          return false;
        }
      }

      // Disqualify when any requires flags are not set
      const requiredFlags = scenario.requires ?? [];
      for (const thisFlag of requiredFlags) {
        if (!this.flags.has(thisFlag)) {
          return false;
        }
      }

      // If we made it this far, the scenario is relevant
      return true;
    });
  }
}

export const TALKED_TO_NPC_A = "TALKED_TO_NPC_A";
export const TALKED_TO_NPC_B = "TALKED_TO_NPC_B";

export const storyFlags = new StoryFlags();
