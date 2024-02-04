import { GameObject, GameObjectConfig } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { storyFlags } from "@/StoryFlags";
import { Vector2 } from "@/Vector2";

export type NPCContent = {
  string: string;
  requires?: string[];
  bypass?: string[];
  addsFlag?: string;
};

type NPCConfig = GameObjectConfig & {
  content?: NPCContent[];
  portraitFrame?: number;
};

export class NPC extends GameObject {
  content: NPCContent[];
  portraitFrame: number;

  constructor(config: NPCConfig = {}) {
    super(config);

    // Opt in to beind solid
    this.isSolid = true;

    // Say something when interacted with
    this.content = config.content ?? [];
    this.portraitFrame = config.portraitFrame ?? 1;

    // Shadow
    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    const body = new Sprite({
      resource: resources.images.knight,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -20),
      hframes: 2,
      vframes: 1,
    });
    this.addChild(body);
  }

  getContent() {
    const match = storyFlags.getRelevantScenario(this.content);
    if (!match) {
      console.warn("No matching scenario found for NPC", this.content);
      return;
    }

    return {
      string: match.string,
      portraitFrame: this.portraitFrame,
      addsFlag: match.addsFlag,
    };
  }
}
