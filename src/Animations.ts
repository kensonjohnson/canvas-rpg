import { FrameIndexPattern } from "./FrameIndexPattern";

type AnimationConfig = Record<string, FrameIndexPattern>;
export class Animations {
  patterns: AnimationConfig;
  activeKey: string;

  constructor(patterns: AnimationConfig) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startAtTime = 0) {
    if (key === this.activeKey) return;
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta);
  }
}
