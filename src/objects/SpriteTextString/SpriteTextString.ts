import { GameObject } from "@/GameObject";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";
import { getCharWidth, getCharacterFrame } from "./ExpressionFontMap";

export class SpriteTextString extends GameObject {
  backdrop: Sprite;
  words: {
    wordWidth: number;
    chars: {
      width: number;
      sprite: Sprite;
    }[];
  }[];

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

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
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

    this.words.forEach((word) => {
      // Decide if we need to wrap
      const spaceRemaining = x + LINE_WIDTH_MAX - cursorX;
      if (spaceRemaining < word.wordWidth) {
        cursorX = x + PADDING_LEFT;
        cursorY += LINE_VERTICAL_HEIGHT;
      }

      // Draw this segment of text
      word.chars.forEach((char) => {
        const { sprite, width } = char;

        const withCharOffset = cursorX - 5;
        sprite.drawImage(context, withCharOffset, cursorY);

        // Add the width of the character
        cursorX += width;

        // Give a little space between characters
        cursorX += 1;
      });
      // Add a space between words
      cursorX += 4;
    });
  }
}
