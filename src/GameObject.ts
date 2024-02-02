import { Input } from "./Input";
import { Vector2 } from "./Vector2";

type GameObjectConfig = {
  position?: Vector2;
  children?: GameObject[];
};

export class GameObject {
  position: Vector2;
  children: GameObject[];
  input?: Input;

  constructor({ position }: GameObjectConfig) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
  }

  stepEntry(delta: number, root: GameObject) {
    this.children.forEach((child) => {
      child.stepEntry(delta, root);
    });

    this.step(delta, root);
  }

  step(_delta: number, _root: GameObject) {}

  draw(context: CanvasRenderingContext2D, x: number, y: number) {
    const drawPositionX = this.position.x + x;
    const drawPositionY = this.position.y + y;

    // Do the actual drawing for Images
    this.drawImage(context, drawPositionX, drawPositionY);

    // Pass on to children
    this.children.forEach((child) => {
      child.draw(context, drawPositionX, drawPositionY);
    });
  }

  drawImage(_context: CanvasRenderingContext2D, _x: number, _y: number) {}

  addChild(child: GameObject) {
    this.children.push(child);
  }

  removeChild(child: GameObject) {
    this.children = this.children.filter((c) => c !== child);
  }
}
