// Create an Enum for the directions
export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export class Input {
  heldDirection: Direction[];
  constructor() {
    this.heldDirection = [];

    document.addEventListener("keydown", (event) => {
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
