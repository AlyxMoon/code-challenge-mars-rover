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
    position: { x: 10, y: 0, d: 'N' },
    instructions: 'MM',
  }

  async operateRover (): Promise<void> {
    await waitFor(1000)
    navigateRover(this.rover)
  }

  constructor () {
    this.operateRover()
  }
}
