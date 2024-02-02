import { events } from "./Events";
import { Input } from "./Input";
import { Vector2 } from "./Vector2";

type GameObjectConfig = {
  position?: Vector2;
};

export class GameObject {
  position: Vector2;
  children: GameObject[];
  input?: Input;
  parent?: GameObject;

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

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.parent?.removeChild(this);
  }

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    events.unsubscibe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }
}
