import { events } from "@/Events";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";
import { gridCells } from "@/helpers/grid";
import { Exit } from "@/objects/Exit/Exit";
import { Hero } from "@/objects/Hero/Hero";
import { Level, LevelConfig } from "@/objects/Level/Level";
import { Rod } from "@/objects/Rod/Rod";
import { CaveLevel1 } from "./CaveLevel1";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class OutdoorLevel1 extends Level {
  constructor(config: LevelConfig = {}) {
    super(config);
    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(320, 180),
    });

    const groundSprite = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    this.heroPosition = config.heroPosition || DEFAULT_HERO_POSITION;
    const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    this.addChild(hero);

    const rod = new Rod(gridCells(7), gridCells(6));
    this.addChild(rod);

    this.walls.add(`${gridCells(3)},${gridCells(2)}`); // Sky
    this.walls.add(`${gridCells(4)},${gridCells(2)}`);
    this.walls.add(`${gridCells(5)},${gridCells(2)}`);
    this.walls.add(`${gridCells(6)},${gridCells(2)}`);
    this.walls.add(`${gridCells(7)},${gridCells(1)}`);
    this.walls.add(`${gridCells(8)},${gridCells(1)}`);
    this.walls.add(`${gridCells(9)},${gridCells(1)}`);
    this.walls.add(`${gridCells(10)},${gridCells(1)}`);
    this.walls.add(`${gridCells(11)},${gridCells(1)}`);
    this.walls.add(`${gridCells(12)},${gridCells(1)}`);
    this.walls.add(`${gridCells(13)},${gridCells(1)}`);
    this.walls.add(`${gridCells(15)},${gridCells(2)}`);
    this.walls.add(`${gridCells(16)},${gridCells(3)}`);
    this.walls.add(`${gridCells(16)},${gridCells(4)}`);
    this.walls.add(`${gridCells(16)},${gridCells(5)}`);
    this.walls.add(`${gridCells(16)},${gridCells(6)}`);
    this.walls.add(`${gridCells(15)},${gridCells(7)}`);
    this.walls.add(`${gridCells(14)},${gridCells(7)}`);
    this.walls.add(`${gridCells(13)},${gridCells(7)}`);
    this.walls.add(`${gridCells(12)},${gridCells(7)}`);
    this.walls.add(`${gridCells(11)},${gridCells(7)}`);
    this.walls.add(`${gridCells(10)},${gridCells(7)}`);
    this.walls.add(`${gridCells(9)},${gridCells(7)}`);
    this.walls.add(`${gridCells(8)},${gridCells(7)}`);
    this.walls.add(`${gridCells(7)},${gridCells(7)}`);
    this.walls.add(`${gridCells(6)},${gridCells(7)}`);
    this.walls.add(`${gridCells(5)},${gridCells(7)}`);
    this.walls.add(`${gridCells(4)},${gridCells(7)}`);
    this.walls.add(`${gridCells(3)},${gridCells(7)}`);
    this.walls.add(`${gridCells(2)},${gridCells(6)}`);
    this.walls.add(`${gridCells(2)},${gridCells(5)}`);
    this.walls.add(`${gridCells(2)},${gridCells(4)}`);
    this.walls.add(`${gridCells(2)},${gridCells(3)}`);
    this.walls.add(`${gridCells(2)},${gridCells(2)}`);

    this.walls.add(`${gridCells(4)},${gridCells(3)}`); // Trees
    this.walls.add(`${gridCells(14)},${gridCells(2)}`);
    this.walls.add(`${gridCells(13)},${gridCells(4)}`);

    this.walls.add(`${gridCells(4)},${gridCells(4)}`); // squares
    this.walls.add(`${gridCells(4)},${gridCells(5)}`);
    this.walls.add(`${gridCells(5)},${gridCells(4)}`);
    this.walls.add(`${gridCells(5)},${gridCells(5)}`);
    this.walls.add(`${gridCells(8)},${gridCells(3)}`);
    this.walls.add(`${gridCells(9)},${gridCells(3)}`);

    this.walls.add(`${gridCells(7)},${gridCells(5)}`); // water
    this.walls.add(`${gridCells(8)},${gridCells(5)}`);
    this.walls.add(`${gridCells(9)},${gridCells(5)}`);
    this.walls.add(`${gridCells(10)},${gridCells(5)}`);

    this.walls.add(`${gridCells(12)},${gridCells(6)}`); // rocks
    this.walls.add(`${gridCells(13)},${gridCells(6)}`);
    this.walls.add(`${gridCells(14)},${gridCells(6)}`);
  }

  ready(): void {
    events.on("HERO_EXITS", this, () => {
      events.emit(
        "CHANGE_LEVEL",
        new CaveLevel1({
          heroPosition: new Vector2(gridCells(4), gridCells(5)),
        })
      );
    });
  }
}
