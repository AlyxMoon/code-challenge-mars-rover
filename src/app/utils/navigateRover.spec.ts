import { Rover } from 'src/typings'
import navigateRover from './navigateRover'

type FunctionParamers = Parameters<typeof navigateRover>

describe('util: navigateRover', () => {
  it('should navigate the rover in a single direction', () => {
    const inputsMoveUp: FunctionParamers = [
      {
        position: { x: 5, y: 5, d: 'N' },
        instructions: 'MMM',
      },
      11,
      11,
    ]

    const inputsMoveDown: FunctionParamers = [
      {
        position: { x: 5, y: 5, d: 'S' },
        instructions: 'MMM',
      },
      11,
      11,
    ]

    const inputsMoveLeft: FunctionParamers = [
      {
        position: { x: 5, y: 5, d: 'W' },
        instructions: 'MMM',
      },
      11,
      11,
    ]

    const inputsMoveRight: FunctionParamers = [
      {
        position: { x: 5, y: 5, d: 'E' },
        instructions: 'MMM',
      },
      11,
      11,
    ]

    expect(navigateRover(...inputsMoveUp)).toEqual({
      position: { x: 5, y: 8, d: 'N'},
      instructions: 'MMM'
    })

    expect(navigateRover(...inputsMoveDown)).toEqual({
      position: { x: 5, y: 2, d: 'S'},
      instructions: 'MMM'
    })

    expect(navigateRover(...inputsMoveLeft)).toEqual({
      position: { x: 2, y: 5, d: 'W'},
      instructions: 'MMM'
    })

    expect(navigateRover(...inputsMoveRight)).toEqual({
      position: { x: 8, y: 5, d: 'E'},
      instructions: 'MMM'
    })
  })

  it('handles default provided cases', () => {
    const rover1: Rover = {
      position: { x: 1, y: 2, d: 'N' },
      instructions: 'LMLMLMLMM'
    }

    expect(navigateRover(rover1, 10, 10)).toEqual({
      position: { x: 1, y: 3, d: 'N' },
      instructions: 'LMLMLMLMM',
    })

    const rover2: Rover = {
      position: { x: 3, y: 3, d: 'E' },
      instructions: 'MMRMMRMRRM'
    }

    expect(navigateRover(rover2, 10, 10)).toEqual({
      position: { x: 5, y: 1, d: 'E' },
      instructions: 'MMRMMRMRRM',
    })
  })
})