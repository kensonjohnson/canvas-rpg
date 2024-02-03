export type Resource = {
  image: HTMLImageElement;
  isLoaded: boolean;
};

export class Resources {
  toLoad: Record<string, string>;
  images: Record<string, Resource>;

  constructor() {
    // Everything that we need to download
    this.toLoad = {
      hero: import.meta.env.BASE_URL + "sprites/hero-sheet.png",
      portraits: import.meta.env.BASE_URL + "sprites/portraits-sheet.png",
      shadow: import.meta.env.BASE_URL + "sprites/shadow.png",
      rod: import.meta.env.BASE_URL + "sprites/rod.png",
      exit: import.meta.env.BASE_URL + "sprites/exit.png",

      // Outdoor
      sky: import.meta.env.BASE_URL + "sprites/sky.png",
      ground: import.meta.env.BASE_URL + "sprites/ground.png",
      // Cave
      cave: import.meta.env.BASE_URL + "sprites/cave.png",
      caveGround: import.meta.env.BASE_URL + "sprites/cave-ground.png",
      // NPCs
      knight: import.meta.env.BASE_URL + "sprites/knight-sheet.png",
    };

    // A bucket to store the downloaded images
    this.images = {};

    // Load the images
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
