import "./style.css";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";

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

function draw() {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroPositionX = heroPosition.x + heroOffset.x;
  const heroPositionY = heroPosition.y + heroOffset.y;

  shadow.drawImage(ctx, heroPositionX, heroPositionY);
  hero.drawImage(ctx, heroPositionX, heroPositionY);
}

setInterval(() => {
  hero.frame += 1;
  draw();
}, 300);
