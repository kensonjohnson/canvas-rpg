import { events } from "@/Events";
import { GameObject } from "@/GameObject";
import { Resource, resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";

export class Inventory extends GameObject {
  nextId: number;
  items: { id: number; image: Resource }[];

  constructor() {
    super({
      position: new Vector2(0, 1),
    });
    this.drawLayer = "HUD";
    this.nextId = 0;
    this.items = [
      { id: -1, image: resources.images.rod },
      { id: -2, image: resources.images.rod },
    ];

    // React to hero picking up an item
    events.on("HERO_PICKS_UP_ITEM", this, (_data: any) => {
      this.nextId++;
      this.items.push({
        id: this.nextId,
        image: resources.images.rod,
      });
      this.renderInventory();
    });

    this.renderInventory();
  }

  renderInventory() {
    // Remove stale drawings
    this.children.forEach((child) => {
      child.destroy();
    });

    // Draw fresh from the items list
    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 12, 0),
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
