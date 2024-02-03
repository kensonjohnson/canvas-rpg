import { events } from "@/Events";
import { GameObject } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";

export class Rod extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });
    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5), // Nudge it up visually
    });
    this.addChild(sprite);
  }

  ready() {
    events.on("HERO_POSITION", this, (position: Vector2) => {
      const roundedHeroPositionX = Math.round(position.x);
      const roundedHeroPositionY = Math.round(position.y);

      if (
        roundedHeroPositionX === this.position.x &&
        roundedHeroPositionY === this.position.y
      ) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove the rod from the scene
    this.destroy();

    // Alert other things that the rod was picked up
    events.emit("HERO_PICKS_UP_ITEM", {
      image: resources.images.rod,
      position: this.position,
    });
  }
}
