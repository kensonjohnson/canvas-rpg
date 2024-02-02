import { GameObject } from "@/GameObject";

import { Vector2 } from "../Vector2";

export function moveTowards(
  person: GameObject,
  destinationPosition: Vector2,
  speed: number
): number {
  let distanceToTravelX = destinationPosition.x - person.position.x;
  let distanceToTravelY = destinationPosition.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    // If we are close enough to the destination, we will just snap to it.
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
  } else {
    // Otherwise, we will move towards the destination at given speed.
    const normalizedX = distanceToTravelX / distance;
    const normalizedY = distanceToTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    // Recalculate the distance after moving.
    distanceToTravelX = destinationPosition.x - person.position.x;
    distanceToTravelY = destinationPosition.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}
