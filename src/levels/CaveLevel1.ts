import { events } from "@/Events";
import { resources } from "@/Resource";
import { Sprite } from "@/Sprite";
import { Vector2 } from "@/Vector2";
import { gridCells } from "@/helpers/grid";
import { Exit } from "@/objects/Exit/Exit";
import { Hero } from "@/objects/Hero/Hero";
import { Level, LevelConfig } from "@/objects/Level/Level";
import { Rod } from "@/objects/Rod/Rod";
import { OutdoorLevel1 } from "./OutdoorLevel1";
import { NPC } from "@/objects/NPC/NPC";
import { TALKED_TO_NPC_A, TALKED_TO_NPC_B } from "@/StoryFlags";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(6), gridCells(5));

export class CaveLevel1 extends Level {
  constructor(config: LevelConfig = {}) {
    super(config);

    this.background = new Sprite({
      resource: resources.images.cave,
      frameSize: new Vector2(320, 180),
    });

    const ground = new Sprite({
      resource: resources.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(ground);

    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    this.heroPosition = config.heroPosition || DEFAULT_HERO_POSITION;
    const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    this.addChild(hero);

    const rod = new Rod(gridCells(9), gridCells(6));
    this.addChild(rod);

    const npc1 = new NPC({
      position: new Vector2(gridCells(5), gridCells(5)),
      content: [
        {
          string: "I just can't stand that guy.",
          requires: [TALKED_TO_NPC_B],
          bypass: [TALKED_TO_NPC_A],
          addsFlag: TALKED_TO_NPC_A,
        },
        {
          string: "He is just the worst!",
          requires: [TALKED_TO_NPC_A],
        },
        {
          string: "Grumble grumble. Another day at work.",
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc1);

    const npc2 = new NPC({
      position: new Vector2(gridCells(9), gridCells(5)),
      content: [
        {
          string: "What a wonderful day at work in the cave!",
          addsFlag: TALKED_TO_NPC_B,
        },
      ],
      portraitFrame: 1,
    });
    this.addChild(npc2);

    this.walls.add(`${gridCells(1)},${gridCells(0)}`); // Sky
    this.walls.add(`${gridCells(2)},${gridCells(0)}`);
    this.walls.add(`${gridCells(3)},${gridCells(0)}`);
    this.walls.add(`${gridCells(4)},${gridCells(0)}`);
    this.walls.add(`${gridCells(5)},${gridCells(0)}`);
    this.walls.add(`${gridCells(6)},${gridCells(0)}`);
    this.walls.add(`${gridCells(7)},${gridCells(0)}`);
    this.walls.add(`${gridCells(8)},${gridCells(0)}`);
    this.walls.add(`${gridCells(9)},${gridCells(0)}`);
    this.walls.add(`${gridCells(10)},${gridCells(0)}`);
    this.walls.add(`${gridCells(11)},${gridCells(0)}`);
    this.walls.add(`${gridCells(12)},${gridCells(0)}`);
    this.walls.add(`${gridCells(13)},${gridCells(0)}`);
    this.walls.add(`${gridCells(14)},${gridCells(0)}`);
    this.walls.add(`${gridCells(15)},${gridCells(0)}`);
    this.walls.add(`${gridCells(16)},${gridCells(0)}`);
    this.walls.add(`${gridCells(17)},${gridCells(0)}`);
    this.walls.add(`${gridCells(18)},${gridCells(1)}`);
    this.walls.add(`${gridCells(18)},${gridCells(2)}`);
    this.walls.add(`${gridCells(18)},${gridCells(3)}`);
    this.walls.add(`${gridCells(18)},${gridCells(4)}`);
    this.walls.add(`${gridCells(18)},${gridCells(5)}`);
    this.walls.add(`${gridCells(18)},${gridCells(6)}`);
    this.walls.add(`${gridCells(18)},${gridCells(7)}`);
    this.walls.add(`${gridCells(17)},${gridCells(8)}`);
    this.walls.add(`${gridCells(16)},${gridCells(8)}`);
    this.walls.add(`${gridCells(15)},${gridCells(8)}`);
    this.walls.add(`${gridCells(14)},${gridCells(8)}`);
    this.walls.add(`${gridCells(13)},${gridCells(8)}`);
    this.walls.add(`${gridCells(12)},${gridCells(8)}`);
    this.walls.add(`${gridCells(11)},${gridCells(8)}`);
    this.walls.add(`${gridCells(10)},${gridCells(8)}`);
    this.walls.add(`${gridCells(9)},${gridCells(8)}`);
    this.walls.add(`${gridCells(8)},${gridCells(8)}`);
    this.walls.add(`${gridCells(7)},${gridCells(8)}`);
    this.walls.add(`${gridCells(6)},${gridCells(8)}`);
    this.walls.add(`${gridCells(5)},${gridCells(8)}`);
    this.walls.add(`${gridCells(4)},${gridCells(8)}`);
    this.walls.add(`${gridCells(3)},${gridCells(8)}`);
    this.walls.add(`${gridCells(2)},${gridCells(8)}`);
    this.walls.add(`${gridCells(1)},${gridCells(8)}`);
    this.walls.add(`${gridCells(1)},${gridCells(7)}`);
    this.walls.add(`${gridCells(1)},${gridCells(6)}`);
    this.walls.add(`${gridCells(1)},${gridCells(5)}`);
    this.walls.add(`${gridCells(1)},${gridCells(4)}`);
    this.walls.add(`${gridCells(1)},${gridCells(3)}`);
    this.walls.add(`${gridCells(1)},${gridCells(2)}`);
    this.walls.add(`${gridCells(1)},${gridCells(1)}`);

    this.walls.add(`${gridCells(3)},${gridCells(1)}`); // Squares
    this.walls.add(`${gridCells(4)},${gridCells(1)}`);
    this.walls.add(`${gridCells(5)},${gridCells(3)}`);
    this.walls.add(`${gridCells(6)},${gridCells(3)}`);
    this.walls.add(`${gridCells(8)},${gridCells(3)}`);
    this.walls.add(`${gridCells(6)},${gridCells(4)}`);
    this.walls.add(`${gridCells(7)},${gridCells(4)}`);
    this.walls.add(`${gridCells(12)},${gridCells(5)}`);
    this.walls.add(`${gridCells(13)},${gridCells(5)}`);
    this.walls.add(`${gridCells(14)},${gridCells(6)}`);

    this.walls.add(`${gridCells(9)},${gridCells(1)}`); // Rocks
    this.walls.add(`${gridCells(12)},${gridCells(2)}`);
    this.walls.add(`${gridCells(13)},${gridCells(2)}`);
    this.walls.add(`${gridCells(13)},${gridCells(3)}`);
    this.walls.add(`${gridCells(16)},${gridCells(5)}`);

    this.walls.add(`${gridCells(15)},${gridCells(2)}`); // Water
    this.walls.add(`${gridCells(16)},${gridCells(2)}`);
    this.walls.add(`${gridCells(6)},${gridCells(6)}`);
    this.walls.add(`${gridCells(7)},${gridCells(6)}`);
    this.walls.add(`${gridCells(8)},${gridCells(6)}`);
    this.walls.add(`${gridCells(11)},${gridCells(6)}`);
    this.walls.add(`${gridCells(12)},${gridCells(6)}`);
    this.walls.add(`${gridCells(13)},${gridCells(6)}`);
  }

  ready(): void {
    events.on("HERO_EXITS", this, () => {
      events.emit(
        "CHANGE_LEVEL",
        new OutdoorLevel1({
          heroPosition: new Vector2(gridCells(7), gridCells(3)),
        })
      );
    });
  }
}
