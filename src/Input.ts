// Create an Enum for the directions
export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export class Input {
  heldDirection: Direction[];
  keys: Record<string, boolean>;
  lastKeys: Record<string, boolean>;

  constructor() {
    this.heldDirection = [];
    this.keys = {};
    this.lastKeys = {};
    document.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;

      if (event.code === "ArrowUp" || event.code === "KeyW") {
        this.onArrowPressed(Direction.UP);
      }
      if (event.code === "ArrowDown" || event.code === "KeyS") {
        this.onArrowPressed(Direction.DOWN);
      }
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        this.onArrowPressed(Direction.LEFT);
      }
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        this.onArrowPressed(Direction.RIGHT);
      }
    });

    document.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;

      if (event.code === "ArrowUp" || event.code === "KeyW") {
        this.onArrowReleased(Direction.UP);
      }
      if (event.code === "ArrowDown" || event.code === "KeyS") {
        this.onArrowReleased(Direction.DOWN);
      }
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        this.onArrowReleased(Direction.LEFT);
      }
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        this.onArrowReleased(Direction.RIGHT);
      }
    });
  }

  get direction() {
    return this.heldDirection[0];
  }

  update() {
    // Diff the keys on the previous frame to
    // know when new ones are pressed
    this.lastKeys = { ...this.keys };
  }

  getActionJustPressed(keyCode: string) {
    let justPressed = false;
    if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
      justPressed = true;
    }
    return justPressed;
  }

  onArrowPressed(direction: Direction) {
    if (!this.heldDirection.includes(direction)) {
      this.heldDirection.unshift(direction);
    }
  }

  onArrowReleased(direction: Direction) {
    const index = this.heldDirection.indexOf(direction);
    if (index !== -1) {
      this.heldDirection.splice(index, 1);
    }
  }
}
