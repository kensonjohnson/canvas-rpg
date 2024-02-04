import { Direction } from "./Input";
const { UP, DOWN, LEFT, RIGHT } = Direction;

export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }

  matches(other: Vector2) {
    return this.x === other.x && this.y === other.y;
  }

  toNeighbor(direction: string) {
    let x = this.x;
    let y = this.y;
    if (direction === UP) y -= 16;
    if (direction === DOWN) y += 16;
    if (direction === LEFT) x -= 16;
    if (direction === RIGHT) x += 16;

    return new Vector2(x, y);
  }
}
