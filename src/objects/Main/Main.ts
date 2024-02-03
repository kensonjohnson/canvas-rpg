import { Camera } from "@/Camera";
import { GameObject, GameObjectConfig } from "@/GameObject";
import { Input } from "@/Input";
import { Level } from "../Level/Level";
import { Inventory } from "../Inventory/Inventory";
import { events } from "@/Events";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString";

export class Main extends GameObject {
  level?: Level;
  input: Input;
  camera: Camera;

  constructor(config: GameObjectConfig = {}) {
    super(config);
    this.level = undefined;
    this.input = new Input();
    this.camera = new Camera();
  }

  ready(): void {
    const inventory = new Inventory();
    this.addChild(inventory);

    // Listen for level changes
    events.on("CHANGE_LEVEL", this, (newLevelInstance: Level) => {
      this.setLevel(newLevelInstance);
    });

    // Listen for hero action requests
    events.on("HERO_REQUESTS_ACTION", this, () => {
      const textBox = new SpriteTextString(
        "Hi! I'm a text box! I can display text! Some more text to test the line wrapping. I hope it works! I'm not sure if it will! I guess we'll see!"
      );
      this.addChild(textBox);
      events.emit("START_TEXT_BOX");

      // Unsubscribe when the text box is done
      const endingSub = events.on("END_TEXT_BOX", this, () => {
        textBox.destroy();
        events.off(endingSub);
      });
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

  drawObjects(context: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== "HUD") {
        child.draw(context, 0, 0);
      }
    });
  }

  drawForeground(context: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === "HUD") {
        child.draw(context, 0, 0);
      }
    });
  }
}
