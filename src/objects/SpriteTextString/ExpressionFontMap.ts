// Widths
const UPPER_CASE_DEFAULT_WIDTH = 7;
const LOWER_CASE_DEFAULT_WIDTH = 6;
const width = new Map();

// Add overrides
// TODO: Not all symbols have overrides
width.set("I", 6);
width.set("T", 8);
width.set("Y", 8);

width.set("a", 7);
width.set("d", 7);
width.set("f", 5);
width.set("h", 7);
width.set("i", 4);
width.set("j", 5);
width.set("l", 4);
width.set("m", 11);
width.set("n", 7);
width.set("t", 4);
width.set("v", 7);
width.set("w", 11);
width.set("z", 5);

width.set(" ", 3);
width.set("'", 2);
width.set("!", 2);
width.set(",", 3);
width.set(".", 2);

function isLowerCase(letter: string): boolean {
  return letter === letter.toLowerCase() && letter !== letter.toUpperCase();
}

export function getCharWidth(char: string): number {
  return isLowerCase(char)
    ? width.get(char) ?? LOWER_CASE_DEFAULT_WIDTH
    : width.get(char) ?? UPPER_CASE_DEFAULT_WIDTH;
}

// Frames
const frameMap = new Map();
[
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789+=*÷-€$£¢       ",
  ".,;:?!_~#\"'&()[]{}^|`/\\@° ",
]
  .join("")
  .split("")
  .forEach((char, index) => {
    frameMap.set(char, index);
  });

export function getCharacterFrame(char: string) {
  return frameMap.get(char) ?? 0;
}
