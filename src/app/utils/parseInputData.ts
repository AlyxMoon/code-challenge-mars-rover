type Direction = 'N' | 'E' | 'S' | 'W'

type Position = {
  x: number,
  y: number,
  d: Direction,
}

type Rover = {
  position: Position,
  instructions: string,
}

type ParsedInput = {
  width: number,
  height: number,
  rovers: Rover[],
}

const parseInputData = (inputString: string): ParsedInput => {
  const lines = inputString.trim().split('\n').map(line => line.trim())

  const [width, height] = lines[0].split(' ').map(char => Number(char) + 1)

  if (isNaN(width)) throw new Error('width is not a number')
  if (isNaN(height)) throw new Error('height is not a number.')
  if (width < 0) throw new Error('width is a negative number')
  if (height < 0) throw new Error('height is a negative number')

  const rovers: Rover[] = []

  for (let i = 1; i < lines.length; i += 2) {
    const id = (i + 1) / 2
    const positionValues = lines[i].split(' ')

    const position = {
      x: Number(positionValues[0]),
      y: Number(positionValues[1]),
      d: positionValues[2] as Direction
    }

    if (
      position.x < 0 || position.x >= width ||
      position.y < 0 || position.y >= height
    ) {
      throw new Error(`rover ${id} is outside the map`)
    }

    if (!['N', 'E', 'S', 'W'].includes(position.d)) {
      throw new Error(`rover ${id} has an invalid direction ${position.d}`)
    }

    const instructions = lines[i + 1]
    
    if (!instructions) {
      throw new Error(`no instructions provided for rover ${id}`)
    }

    if (/[^LRM]/g.test(instructions)) {
      throw new Error(`instructions for rover ${id} contain invalid characters`)
    }

    rovers.push({ position, instructions })
  }

  if (rovers.length === 0) throw new Error('no rover input provided')

  return {
    width,
    height,
    rovers,
  }
}

export default parseInputData
