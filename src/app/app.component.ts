import { Component } from '@angular/core'
import { Rover } from 'src/typings'

import navigateRover from './utils/navigateRover'
import waitFor from './utils/waitFor'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  width = 20
  height = 20
  rover: Rover = {
    position: { x: 2, y: 0, d: 'N' },
    instructions: 'MMLMMMMMMRMMMMM',
  }

  async operateRover (): Promise<void> {
    await waitFor()

    const options = {
      width: this.width,
      height: this.height,
      allowGoingOffMap: false,
    }

    try {
      for (const char of this.rover.instructions) {
        navigateRover({
          position: this.rover.position,
          instructions: char,
        }, options)
  
        await waitFor()
      }
    } catch (err) {
      const error = err as Error

      console.log(error.message)
    }
  }

  constructor () {
    this.operateRover()
  }
}
