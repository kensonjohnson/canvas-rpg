import { GameObject } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";
import { getCharWidth, getCharacterFrame } from "./ExpressionFontMap";
import { events } from "@/Events";

export class SpriteTextString extends GameObject {
  backdrop: Sprite;
  words: {
    wordWidth: number;
    chars: {
      width: number;
      sprite: Sprite;
    }[];
  }[];
  showingIndex: number;
  finalIndex: number;
  textSpeed: number;
  timeUntilNextShow: number;

  constructor(string?: string) {
    super({
      position: new Vector2(32, 108),
    });

    this.drawLayer = "HUD";

    const content = string ?? "Default text!";
    this.words = content.split(" ").map((word) => {
      let wordWidth = 0;
      const chars = word.split("").map((char) => {
        const charWidth = getCharWidth(char);
        wordWidth += charWidth;
        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.expressionWhite,
            hframes: 26,
            vframes: 4,
            frame: getCharacterFrame(char),
          }),
        };
      });

      return {
        wordWidth,
        chars,
      };
    });

    // Create background for text
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });

    // Typewriter
    this.showingIndex = 0;
    this.finalIndex = content.replace(/\s/g, "").length;
    this.textSpeed = 30;
    this.timeUntilNextShow = this.textSpeed;
  }

  step(delta: number, root: GameObject): void {
    // Listen for user input
    const input = root.input;
    if (input?.getActionJustPressed("Space")) {
      if (this.showingIndex < this.finalIndex) {
        // Skip
        this.showingIndex = this.finalIndex;
        return;
      }

      // Destroy the text box
      events.emit("END_TEXT_BOX");
    }

    // Work on the typewriter effect
    this.timeUntilNextShow -= delta;
    if (this.timeUntilNextShow <= 0) {
      // Increase amount of characters that are drawn
      this.showingIndex++;

      // Reset the counter for the next character
      this.timeUntilNextShow = this.textSpeed;
    }
  }

  drawImage(context: CanvasRenderingContext2D, x: number, y: number): void {
    this.backdrop.drawImage(context, x, y);

    // Configuration options
    const PADDING_LEFT = 7;
    const PADDING_TOP = 4;
    const LINE_WIDTH_MAX = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    let cursorX = x + PADDING_LEFT;
    let cursorY = y + PADDING_TOP;
    let currentShowingIndex = 0;

    this.words.forEach((word) => {
      // Decide if we need to wrap
      const spaceRemaining = x + LINE_WIDTH_MAX - cursorX;
      if (spaceRemaining < word.wordWidth) {
        cursorX = x + PADDING_LEFT;
        cursorY += LINE_VERTICAL_HEIGHT;
      }

      // Draw this segment of text
      word.chars.forEach((char) => {
        if (currentShowingIndex > this.showingIndex) {
          return;
        }

        const { sprite, width } = char;

        const withCharOffset = cursorX - 5;
        sprite.drawImage(context, withCharOffset, cursorY);

        // Add the width of the character
        cursorX += width;

        // Give a little space between characters
        cursorX += 1;

        // Uptick the index we are counting
        currentShowingIndex++;
      });
      // Add a space between words
      cursorX += 4;
    });
  }
}
