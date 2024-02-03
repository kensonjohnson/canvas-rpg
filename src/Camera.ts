import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  constructor() {
    super({});
    events.on("HERO_POSITION", this, (position: Vector2) => {
      this.centerPositionOnTarget(position);
    });

    events.on("CHANGE_LEVEL", this, (newMap: { heroPosition: Vector2 }) => {
      this.centerPositionOnTarget(newMap.heroPosition);
    });
  }

  centerPositionOnTarget(position: Vector2) {
    const personHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;

    this.position = new Vector2(
      -position.x + halfWidth,
      -position.y + halfHeight
    );
  }
}
