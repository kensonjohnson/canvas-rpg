export class Resources {
  toLoad: Record<string, string>;
  images: Record<string, { image: HTMLImageElement; isLoaded: boolean }>;

  constructor() {
    // Everything that we need to download
    this.toLoad = {
      sky: import.meta.env.BASE_URL + "sprites/sky.png",
      ground: import.meta.env.BASE_URL + "sprites/ground.png",
      hero: import.meta.env.BASE_URL + "sprites/hero-sheet.png",
      shadow: import.meta.env.BASE_URL + "sprites/shadow.png",
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
