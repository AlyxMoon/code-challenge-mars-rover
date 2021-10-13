import { Component, ElementRef, ViewChild } from '@angular/core'
import { Rover, RoverDirection } from 'src/typings'

import parseInputData from '../../utils/parseInputData'
import navigateRover from '../../utils/navigateRover'

@Component({
  selector: 'RoverProblemEntry',
  templateUrl: './RoverProblemEntry.component.html',
  styleUrls: ['./RoverProblemEntry.component.scss'],
})
export class RoverProblemEntryComponent {
  userInput = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM'
  solutionOutput = ''

  onChange (event: Event): void {
    this.userInput = (<HTMLInputElement>event.target).value
  }

  solve (): void {
    try {
      const parsed = parseInputData(this.userInput)
      const options = {
        width: parsed.width,
        height: parsed.height,
        allowGoingOffMap: false,
      }
      
      const solutionsForRovers: string[] = []
      
      for (const rover of parsed.rovers) {
        const solution = navigateRover(rover, options)
        const { x, y, d } = solution.position
        solutionsForRovers.push(`${x} ${y} ${d}`)
      }

      this.solutionOutput = solutionsForRovers.join('\n')
    } catch (err) {
      const error = err as Error

      alert(`Input invalid: ${error.message}`)
    }
    
  }
}
