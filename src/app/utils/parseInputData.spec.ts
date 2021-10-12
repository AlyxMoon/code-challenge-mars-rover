import parseInputData from './parseInputData'

describe('util: parseInputData', () => {
  it('correctly parses 1st test case', () => {
    const input = `
      5 5
      1 2 N
      LMLMLMLMM
      3 3 E
      MMRMMRMRRM
    `

    expect(parseInputData(input)).toEqual({
      width: 6,
      height: 6,
      rovers: [
        {
          position: { x: 1, y: 2, d: 'N' },
          instructions: 'LMLMLMLMM',
        },
        {
          position: { x: 3, y: 3, d: 'E' },
          instructions: 'MMRMMRMRRM',
        },
      ],
    })
  })

  it('throws error if not enough input provided', () => {
    const input1 = `
      1 2
    `

    const input2 = `
      2 3
      1 1 N
    `

    const input3 = `
      2 3
      1 1 N
      M
      2 2 N
    `

    expect(() => parseInputData(input1)).toThrow()
    expect(() => parseInputData(input2)).toThrow()
    expect(() => parseInputData(input3)).toThrow()
  })

  it('throws error if size is invalid (negative numbers)', () => {
    const input1 = `
      -2 5
      1 2 N
      LMLMLMLMM
    `

    const input2 = `
      2 -1
      1 2 N
      LMLMLMLMM
    `

    expect(() => parseInputData(input1)).toThrow()
    expect(() => parseInputData(input2)).toThrow()
  })

  it('throws error if rover would exist outside of grid', () => {
    const input1 = `
      10 10
      1 12 N
      M
    `

    const input2 = `
      10 10
      1 1 N
      M
      -12 1 W
      M
    `

    expect(() => parseInputData(input1)).toThrow()
    expect(() => parseInputData(input2)).toThrow()
  })

  it('throws error if rover direction is invalid', () => {
    const createInput = (direction: string): string => `
      5 5
      1 1 ${direction}
      M
    `

    const allowedChars = [78, 69, 83, 87] // N, E, S, W
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      if (allowedChars.includes(i)) {
        expect(() => parseInputData(createInput(char))).not.toThrow()
      } else {
        expect(() => parseInputData(createInput(char))).toThrow()
      }
    }
  })

  it('throws error if rover instructions contain invalid characters', () => {
    const createInput = (instruction: string): string => `
      5 5
      1 1 N
      LMRM${instruction}
    `

    const allowedChars = [76, 82, 77] // L, R, M
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      if (allowedChars.includes(i)) {
        expect(() => parseInputData(createInput(char))).not.toThrow()
      } else {
        expect(() => parseInputData(createInput(char))).toThrow()
      }
    }
  })
});
