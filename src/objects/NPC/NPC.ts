import { GameObject, GameObjectConfig } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";

export class NPC extends GameObject {
  constructor(config: GameObjectConfig = {}) {
    super(config);

    // Opt in to beind solid
    this.isSolid = true;

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
}
