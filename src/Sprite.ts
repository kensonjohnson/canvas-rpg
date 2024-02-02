import { Animations } from "./Animations";
import { GameObject } from "./GameObject";
import type { Resource } from "./Resource";

import { Vector2 } from "./Vector2";

type SpriteOptions = {
  resource: Resource;
  frameSize?: Vector2;
  hframes?: number;
  vframes?: number;
  frame?: number;
  scale?: number;
  position?: Vector2;
  animations?: Animations;
};

export class Sprite extends GameObject {
  resource: Resource;
  frameSize: Vector2;
  hframes: number;
  vframes: number;
  frame: number;
  frameMap: Map<number, Vector2>;
  scale: number;
  position: Vector2;
  animations?: Animations;

  constructor({
    resource, // image we want to draw
    frameSize, // size of the crop of the image
    hframes, // number of horizontal frames
    vframes, // number of vertical frames
    frame, // which frame to draw
    scale, // how large to draw the image
    position, // where to draw the image
    animations,
  }: SpriteOptions) {
    super({});
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hframes = hframes ?? 1;
    this.vframes = vframes ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap();
    this.animations = animations;
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vframes; v++) {
      for (let h = 0; h < this.hframes; h++) {
        this.frameMap.set(
          frameCount++,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
      }
    }
  }

  step(delta: number) {
    if (!this.animations) return;

    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) return;

    const frame = this.frameMap.get(this.frame);
    const frameCoordX = frame?.x ?? 0;
    const frameCoordY = frame?.y ?? 0;

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX, // Left corner of the crop
      frameCoordY, // Top corner of the crop
      frameSizeX, // How much to crop from the left (X)
      frameSizeY, // How much to crop from the top (Y)
      x, // Where to draw the image on the canvas (X)
      y, // Where to draw the image on the canvas (Y)
      frameSizeX * this.scale, // How large to draw the image (X)
      frameSizeY * this.scale // How large to draw the image (Y)
    );
  }
}
