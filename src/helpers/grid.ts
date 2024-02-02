export function gridCells(number: number): number {
  return number * 16;
}

export function isSpaceFree(walls: Set<string>, x: number, y: number) {
  return !walls.has(`${x},${y}`);
}
