import "./style.css";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Direction, Input } from "./Input";

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
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPosition = new Vector2(16 * 6, 16 * 5);
const heroOffset = new Vector2(-8, -21);

const input = new Input();

function update() {
  if (input.direction === DOWN) {
    heroPosition.y += 1;
    hero.frame = 0;
  }
  if (input.direction === UP) {
    heroPosition.y -= 1;
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    heroPosition.x -= 1;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    heroPosition.x += 1;
    hero.frame = 3;
  }
}

function draw() {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroPositionX = heroPosition.x + heroOffset.x;
  const heroPositionY = heroPosition.y + heroOffset.y;

  shadow.drawImage(ctx, heroPositionX, heroPositionY);
  hero.drawImage(ctx, heroPositionX, heroPositionY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
