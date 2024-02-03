import { Camera } from "@/Camera";
import { GameObject, GameObjectConfig } from "@/GameObject";
import { Input } from "@/Input";
import { Level } from "../Level/Level";
import { Inventory } from "../Inventory/Inventory";
import { events } from "@/Events";

export class Main extends GameObject {
  level?: Level;
  input: Input;
  camera: Camera;
  inventory: Inventory;

  constructor(config: GameObjectConfig = {}) {
    super(config);
    this.level = undefined;
    this.input = new Input();
    this.camera = new Camera();
    this.inventory = new Inventory();
  }

  ready(): void {
    events.on("CHANGE_LEVEL", this, (newLevelInstance: Level) => {
      this.setLevel(newLevelInstance);
    });
  }

  setLevel(newLevelInstance: Level) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  drawBackground(context: CanvasRenderingContext2D) {
    this.level?.background?.drawImage(context, 0, 0);
  }

  drawForeground(context: CanvasRenderingContext2D) {
    this.inventory.draw(
      context,
      this.inventory.position.x,
      this.inventory.position.y
    );
  }
}
