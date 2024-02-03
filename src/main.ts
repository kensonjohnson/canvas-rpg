import "./style.css";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { GameObject } from "./GameObject";
import { Hero } from "./objects/Hero/Hero";
import { gridCells } from "./helpers/grid";
import { Camera } from "./Camera";
import { Rod } from "./objects/Rod/Rod";
import { Inventory } from "./objects/Inventory/Inventory";

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

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();

// Add an input class to the main scene
mainScene.input = new Input();

// Establish the update and draw loops
function update(delta: number) {
  mainScene.stepEntry(delta, mainScene);
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky at a static position
  skySprite.drawImage(ctx, 0, 0);

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw the main scene
  mainScene.draw(ctx, 0, 0);

  // Restore the state
  ctx.restore();

  // Draw anything above the game world
  inventory.draw(ctx, 0, 0);
}

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
