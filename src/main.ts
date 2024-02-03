import "./style.css";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Main } from "./objects/Main/Main";
import { OutdoorLevel1 } from "./levels/OutdoorLevel1";

// Grab the canvas to draw to
const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Establish the root scene
const mainScene = new Main({ position: new Vector2(0, 0) });
mainScene.setLevel(new OutdoorLevel1());

// Establish the update and draw loops
function update(delta: number) {
  mainScene.stepEntry(delta, mainScene);
  // This has to come after the stepEntry call
  mainScene.input.update();
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky at a static position
  mainScene.drawBackground(ctx);

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by camera position
  if (mainScene.camera) {
    ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }

  // Draw the main scene
  mainScene.drawObjects(ctx);

  // Restore the state
  ctx.restore();

  // Draw anything above the game world
  mainScene.drawForeground(ctx);
}

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
