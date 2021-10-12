import { Rover, RoverDirection } from 'src/typings'

const dirs = {
  N: { x: 0, y: 1 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
  E: { x: 1, y: 0 },
}

const getNextDirection = (current: RoverDirection, turn: 'L' | 'R'): RoverDirection => {
  const d = { L: -1, R: 1 }[turn]
  const directions = 'NESW'

  const newIndex = (4 + directions.indexOf(current) + d) % 4
  return directions[newIndex] as RoverDirection
}

const navigateRover = (rover: Rover, width: number, height: number): Rover => {
  for (const instruction of rover.instructions) {
    if (instruction === 'M') {
      const change = dirs[rover.position.d]
      rover.position.x += change.x
      rover.position.y += change.y
    } else if (instruction === 'L' || instruction === 'R') {
      rover.position.d = getNextDirection(rover.position.d, instruction)
    }
  }

  return rover
}

export default navigateRover
