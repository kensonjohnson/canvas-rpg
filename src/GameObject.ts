import { events } from "./Events";
import { Input } from "./Input";
import { Vector2 } from "./Vector2";

export type GameObjectConfig = {
  position?: Vector2;
};

export class GameObject {
  position: Vector2;
  children: GameObject[];
  hasReadyBeenCalled: boolean;
  input?: Input;
  parent?: GameObject;
  isSolid: boolean;
  drawLayer?: string;

  constructor({ position }: GameObjectConfig) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.hasReadyBeenCalled = false;
    this.input = undefined;
    this.isSolid = false;
    this.drawLayer = undefined;
  }

  stepEntry(delta: number, root: GameObject) {
    // Call updates on all the children first
    this.children.forEach((child) => {
      child.stepEntry(delta, root);
    });

    // Call ready on the first step
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented step code
    this.step(delta, root);
  }

  // Called before the first step
  ready() {
    //...
  }

  step(_delta: number, _root: GameObject) {}

  draw(context: CanvasRenderingContext2D, x: number, y: number) {
    const drawPositionX = this.position.x + x;
    const drawPositionY = this.position.y + y;

    // Do the actual drawing for Images
    this.drawImage(context, drawPositionX, drawPositionY);

    // Pass on to children
    this.getDrawChildrenOrdered().forEach((child) => {
      child.draw(context, drawPositionX, drawPositionY);
    });
  }

  getDrawChildrenOrdered() {
    return [...this.children].sort((a, b) => {
      if (b.drawLayer === "FLOOR") return 1;
      return a.position.y > b.position.y ? 1 : -1;
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
