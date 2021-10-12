import { Rover } from 'src/typings'
import navigateRover from './navigateRover'

type FunctionParameters = Parameters<typeof navigateRover>

describe('util: navigateRover', () => {
  it('should navigate the rover in a single direction', () => {
    expect(navigateRover({
      position: { x: 5, y: 5, d: 'N' },
      instructions: 'MMM',
    })).toEqual({
      position: { x: 5, y: 8, d: 'N'},
      instructions: 'MMM'
    })

    expect(navigateRover({
      position: { x: 5, y: 5, d: 'S' },
      instructions: 'MMM',
    })).toEqual({
      position: { x: 5, y: 2, d: 'S'},
      instructions: 'MMM'
    })

    expect(navigateRover({
      position: { x: 5, y: 5, d: 'W' },
      instructions: 'MMM',
    })).toEqual({
      position: { x: 2, y: 5, d: 'W'},
      instructions: 'MMM'
    })

    expect(navigateRover({
      position: { x: 5, y: 5, d: 'E' },
      instructions: 'MMM',
    })).toEqual({
      position: { x: 8, y: 5, d: 'E'},
      instructions: 'MMM'
    })
  })

  it('handles turning left', () => {
    const rover: Rover = {
      position: { x: 5, y: 5, d: 'N' },
      instructions: 'L',
    }

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'W' },
      instructions: 'L',
    })

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'S' },
      instructions: 'L',
    })

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'E' },
      instructions: 'L',
    })

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'N' },
      instructions: 'L',
    })
  })

  it('handles turning right', () => {
    const rover: Rover = {
      position: { x: 5, y: 5, d: 'N' },
      instructions: 'R',
    }

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'E' },
      instructions: 'R',
    })

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'S' },
      instructions: 'R',
    })

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'W' },
      instructions: 'R',
    })

    expect(navigateRover(rover)).toEqual({
      position: { x: 5, y: 5, d: 'N' },
      instructions: 'R',
    })
  })

  it('handles default provided cases', () => {
    const rover1: Rover = {
      position: { x: 1, y: 2, d: 'N' },
      instructions: 'LMLMLMLMM'
    }

    expect(navigateRover(rover1)).toEqual({
      position: { x: 1, y: 3, d: 'N' },
      instructions: 'LMLMLMLMM',
    })

    const rover2: Rover = {
      position: { x: 3, y: 3, d: 'E' },
      instructions: 'MMRMMRMRRM'
    }

    expect(navigateRover(rover2)).toEqual({
      position: { x: 5, y: 1, d: 'E' },
      instructions: 'MMRMMRMRRM',
    })
  })
})