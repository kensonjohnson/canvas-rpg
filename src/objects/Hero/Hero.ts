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
  PICK_UP_DOWN,
} from "./hero-animations";
import { Direction } from "@/Input";
import { Sprite } from "@/Sprite";
import { Resource, resources } from "@/Resource";
import { isSpaceFree } from "@/helpers/grid";
import { Animations } from "@/Animations";
import { FrameIndexPattern } from "@/FrameIndexPattern";
import { moveTowards } from "@/helpers/move-towards";
import { events } from "@/Events";
import { Main } from "../Main/Main";

const { UP, DOWN, LEFT, RIGHT } = Direction;

export class Hero extends GameObject {
  body: Sprite;
  facingDirection: Direction;
  destinationPosition: Vector2;
  lastX?: number;
  lastY?: number;
  itemPickupTime: number;
  itemPickupShell?: GameObject;
  isLocked: boolean;

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
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    });
    this.addChild(this.body);

    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
    this.itemPickupTime = 0;
    this.isLocked = false;

    // React to picking up an item
    events.on("HERO_PICKS_UP_ITEM", this, (data: any) => {
      this.onPickupItem(data);
    });
  }

  ready(): void {
    events.on("START_TEXT_BOX", this, () => {
      this.isLocked = true;
    });
    events.on("END_TEXT_BOX", this, () => {
      this.isLocked = false;
    });
  }

  step(delta: number, root: Main): void {
    // Do nothing when locked
    if (this.isLocked) {
      return;
    }

    // Lock movement while picking up an item
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const input = root.input;
    if (input.getActionJustPressed("Space")) {
      // Check if there is an object to interact with
      const objectAtPosition = this.parent?.children.find((child) => {
        return child.position.matches(
          this.position.toNeighbor(this.facingDirection)
        );
      });

      if (objectAtPosition) {
        events.emit("HERO_REQUESTS_ACTION", objectAtPosition);
      }
    }

    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    // Attempt to move again if the hero is at his position
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }

    this.lastX = this.position.x;
    this.lastY = this.position.y;

    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root: Main) {
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

    const spaceIsFree = isSpaceFree(root.level?.walls!, nextX, nextY);
    const solidBodyAtSpace = this.parent?.children.find((child) => {
      return (
        child.isSolid &&
        child.position.x === nextX &&
        child.position.y === nextY
      );
    });

    // Check if the next position is free
    if (spaceIsFree && !solidBodyAtSpace) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  onPickupItem({ image, position }: { image: Resource; position: Vector2 }) {
    // Make sure we land right on the item
    this.destinationPosition = position.duplicate();

    // Start the pickup animation
    this.itemPickupTime = 500;

    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(
      new Sprite({
        resource: image,
        position: new Vector2(0, -18),
      })
    );
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta: number) {
    this.itemPickupTime -= delta;
    this.body.animations?.play("pickUpDown");

    // Remove the item after the pickup time
    if (this.itemPickupTime <= 0) {
      this.itemPickupShell?.destroy();
      this.itemPickupShell = undefined;
    }
  }
}
