import "./style.css";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Direction, Input } from "./Input";
import { gridCells, isSpaceFree } from "./helpers/grid";
import { moveTowards } from "./helpers/move-towards";
import { walls } from "./levels/level1";
import { Animations } from "./Animations";
import { FrameIndexPattern } from "./FrameIndexPattern";
import {
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
  STAND_RIGHT,
  STAND_UP,
  STAND_LEFT,
  STAND_DOWN,
} from "./objects/Hero/hero-animations";

const { UP, DOWN, LEFT, RIGHT } = Direction;

const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hframes: 3,
  vframes: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
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

const heroDestinationPosition = hero.position.duplicate();
let heroFacing = DOWN;

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroOffset = new Vector2(-8, -21);

const input = new Input();

function update(delta: number) {
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  // Attempt to move again if the hero is at his position
  if (hasArrived) {
    tryMove();
  }

  // Work on hero animations
  hero.step(delta);
}

function tryMove() {
  if (!input.direction) {
    if (heroFacing === DOWN) {
      hero.animations?.play("standDown");
    }
    if (heroFacing === UP) {
      hero.animations?.play("standUp");
    }
    if (heroFacing === LEFT) {
      hero.animations?.play("standLeft");
    }
    if (heroFacing === RIGHT) {
      hero.animations?.play("standRight");
    }

    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.animations?.play("walkDown");
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    hero.animations?.play("walkUp");
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.animations?.play("walkLeft");
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.animations?.play("walkRight");
  }

  heroFacing = input.direction ?? heroFacing;

  // Check if the next position is free
  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }
}

function draw() {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroPositionX = hero.position.x + heroOffset.x;
  const heroPositionY = hero.position.y + heroOffset.y;

  shadow.drawImage(ctx, heroPositionX, heroPositionY);
  hero.drawImage(ctx, heroPositionX, heroPositionY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
