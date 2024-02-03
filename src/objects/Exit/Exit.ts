import { GameObject } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";
import { events } from "@/Events";

export class Exit extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      })
    );

    this.drawLayer = "FLOOR";
  }

  ready() {
    events.on("HERO_POSITION", this, (position: Vector2) => {
      const roundedHeroPositionX = Math.round(position.x);
      const roundedHeroPositionY = Math.round(position.y);

      if (
        roundedHeroPositionX === this.position.x &&
        roundedHeroPositionY === this.position.y
      ) {
        events.emit("HERO_EXITS");
      }
    });
  }
}
