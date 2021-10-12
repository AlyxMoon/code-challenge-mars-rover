import { Rover } from 'src/typings'
import navigateRover, { AdditionalOptions } from './navigateRover'

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

  it('if argument is set, throw error if rover goes out of bounds', () => {
    const options: AdditionalOptions = { width: 10, height: 20, allowGoingOffMap: false }

    const roverUp: Rover = {
      position: { x: 1, y: 17, d: 'N' },
      instructions: 'MMMM',
    }

    expect(() => navigateRover(roverUp, options)).toThrow()
    expect(roverUp).toEqual({
      position: { x: 1, y: 20, d: 'N' },
      instructions: 'MMMM',
    })

    const roverDown: Rover = {
      position: { x: 1, y: 2, d: 'S' },
      instructions: 'MMMM',
    }

    expect(() => navigateRover(roverDown, options)).toThrow()
    expect(roverDown).toEqual({
      position: { x: 1, y: -1, d: 'S' },
      instructions: 'MMMM',
    })

    const roverLeft: Rover = {
      position: { x: 4, y: 17, d: 'W' },
      instructions: 'MMMMM',
    }

    expect(() => navigateRover(roverLeft, options)).toThrow()
    expect(roverLeft).toEqual({
      position: { x: -1, y: 17, d: 'W' },
      instructions: 'MMMMM',
    })

    const roverRight: Rover = {
      position: { x: 9, y: 5, d: 'E' },
      instructions: 'MM',
    }

    expect(() => navigateRover(roverRight, options)).toThrow()
    expect(roverRight).toEqual({
      position: { x: 10, y: 5, d: 'E' },
      instructions: 'MM',
    })
  })
})