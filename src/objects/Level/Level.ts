import { GameObject, GameObjectConfig } from "@/GameObject";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";

export type LevelConfig = GameObjectConfig & {
  heroPosition?: Vector2;
};

export class Level extends GameObject {
  heroPosition?: Vector2;
  background?: Sprite;
  walls: Set<string>;

  constructor(config: LevelConfig = {}) {
    super(config);
    this.background = undefined;
    this.walls = new Set<string>();
  }
}
