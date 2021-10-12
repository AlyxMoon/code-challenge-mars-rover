export type RoverDirection = 'N' | 'E' | 'S' | 'W'

export type RoverPosition = {
  x: number,
  y: number,
  d: RoverDirection,
}

export type Rover = {
  position: RoverPosition,
  instructions: string,
}
