export class GameLoop {
  private lastFrameTime: number;
  private accumulatedTime: number;
  private timeStep: number;
  private requestAnimationFrameId: number | null;
  isRunning: boolean;
  update: Function;
  render: Function;

  constructor(update: Function, render: Function) {
    this.update = update;
    this.render = render;

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; // 60fps

    this.requestAnimationFrameId = null;
    this.isRunning = false;
  }

  mainLoop(timestamp: number) {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all of the time since the last frame
    this.accumulatedTime += deltaTime;

    // Fixed time step updates
    // If there's enough accumulated time to run one or more fixed updates
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    // Render
    this.render();

    this.requestAnimationFrameId = requestAnimationFrame(
      this.mainLoop.bind(this)
    );
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.requestAnimationFrameId = requestAnimationFrame(
      this.mainLoop.bind(this)
    );
  }

  stop() {
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = null;
    }
    this.isRunning = false;
  }
}
