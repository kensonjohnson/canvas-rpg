import { GameObject } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";

export class TextBox extends GameObject {
  content: string;
  backdrop: Sprite;

  constructor() {
    super({
      position: new Vector2(32, 112),
    });
    this.content = "Hi! I'm a text box! I can display text!";
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(context: CanvasRenderingContext2D, x: number, y: number): void {
    // Draw the backdrop first
    this.backdrop.drawImage(context, x, y);

    // Now draw the text
    context.font = "12px fontRetroGaming";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "#fff";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    const words = this.content.split(" ");
    let line = "";

    for (const word of words) {
      const testLine = line + word + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > MAX_WIDTH) {
        context.fillText(line, x + PADDING_LEFT, y + PADDING_TOP, MAX_WIDTH);
        line = word + " ";
        y += LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x + PADDING_LEFT, y + PADDING_TOP, MAX_WIDTH);
  }
}
