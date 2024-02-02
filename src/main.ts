import "./style.css";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { GameObject } from "./GameObject";
import { Hero } from "./objects/Hero/Hero";
import { gridCells } from "./helpers/grid";
import { events } from "./Events";

// Grab the canvas to draw to
const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Establish the root scene
const mainScene = new GameObject({ position: new Vector2(0, 0) });

// Build up the scene by adding a sky, ground, and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

// Add an input class to the main scene
mainScene.input = new Input();

events.on("HERO_POSITION", mainScene, (position: Vector2) => {
  console.log("HERO MOVED! ", position);
});

// Establish the update and draw loops
function update(delta: number) {
  mainScene.stepEntry(delta, mainScene);
}

function draw() {
  mainScene.draw(ctx, 0, 0);
}

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
