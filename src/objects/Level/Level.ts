import { GameObject, GameObjectConfig } from "@/GameObject";
import { Sprite } from "@/Sprite";

export class Level extends GameObject {
  background?: Sprite;
  walls: Set<string>;

  constructor(config: GameObjectConfig = {}) {
    super(config);
    this.background = undefined;
    this.walls = new Set<string>();
  }
}
