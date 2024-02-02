import { GameObject } from "@/GameObject";
import { Vector2 } from "@/Vector2";
import {
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
  STAND_RIGHT,
  STAND_UP,
  STAND_LEFT,
  STAND_DOWN,
} from "./hero-animations";
import { Direction } from "@/Input";
import { Sprite } from "@/Sprite";
import { resources } from "@/Resource";
import { isSpaceFree } from "@/helpers/grid";
import { Animations } from "@/Animations";
import { FrameIndexPattern } from "@/FrameIndexPattern";
import { moveTowards } from "@/helpers/move-towards";
import { walls } from "@/levels/level1";

const { UP, DOWN, LEFT, RIGHT } = Direction;

export class Hero extends GameObject {
  body: Sprite;
  facingDirection: Direction;
  destinationPosition: Vector2;
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });

    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hframes: 3,
      vframes: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
      }),
    });
    this.addChild(this.body);

    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
  }

  step(_delta: number, root: GameObject): void {
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    // Attempt to move again if the hero is at his position
    if (hasArrived) {
      this.tryMove(root);
    }
  }

  tryMove(root: GameObject) {
    const { input } = root;
    if (!input?.direction) {
      if (this.facingDirection === DOWN) {
        this.body.animations?.play("standDown");
      }
      if (this.facingDirection === UP) {
        this.body.animations?.play("standUp");
      }
      if (this.facingDirection === LEFT) {
        this.body.animations?.play("standLeft");
      }
      if (this.facingDirection === RIGHT) {
        this.body.animations?.play("standRight");
      }

      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    const gridSize = 16;

    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations?.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations?.play("walkUp");
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations?.play("walkLeft");
    }
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations?.play("walkRight");
    }

    this.facingDirection = input.direction ?? this.facingDirection;

    // Check if the next position is free
    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
