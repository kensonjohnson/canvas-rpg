import { GameObject, GameObjectConfig } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";

type NPCConfig = GameObjectConfig & {
  content?: {
    string: string;
    portraitFrame: number;
  };
};

export class NPC extends GameObject {
  textContent: string;
  portraitFrame: number;

  constructor(config: NPCConfig = {}) {
    super(config);

    // Opt in to beind solid
    this.isSolid = true;

    // Say something when interacted with
    this.textContent = config.content?.string ?? "Hello!";
    this.portraitFrame = config.content?.portraitFrame ?? 1;

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
    return {
      string: this.textContent,
      portraitFrame: this.portraitFrame,
    };
  }
}
