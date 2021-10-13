import { Component, ElementRef, ViewChild } from '@angular/core'
import { Rover, RoverDirection } from 'src/typings'

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
  roverStartingX = 5
  roverStartingY = 5
  roverStartingD = 'N'
  roverInstructions = 'MLMRM'

  rover: Rover = {
    position: { x: 5, y: 5, d: 'N' },
    instructions: 'MLMRM',
  }
  
  animating = false

  @ViewChild('audioMoving') public _audioMoving!: ElementRef
  audioMoving!: HTMLMediaElement
  @ViewChild('audioTurning') public _audioTurning!: ElementRef
  audioTurning!: HTMLMediaElement
  @ViewChild('audioScream') public _audioScream!: ElementRef
  audioScream!: HTMLMediaElement

  get roverOutOfBounds (): boolean {
    const { width, height } = this
    const { x, y } = this.rover.position

    return x < 0 || y < 0 || x >= width || y >= height
  }

  ngAfterViewInit () {
    this.audioMoving = this._audioMoving.nativeElement
    this.audioTurning = this._audioTurning.nativeElement
    this.audioScream = this._audioScream.nativeElement
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

        if (this.audioMoving && char === 'M') {
          this.audioMoving.play()
        }

        if (this.audioTurning && char !== 'M') {
          this.audioTurning.play()
        }
  
        await waitFor()
      }
    } catch (err) {
      const error = err as Error

      console.log(error.message)

      if (this.audioScream && this.roverOutOfBounds) {
        this.audioScream.play()
      }
    }

    this.animating = false
  }

  begin (): void {
    this.rover.position.x = this.roverStartingX
    this.rover.position.y = this.roverStartingY
    this.rover.position.d = this.roverStartingD as RoverDirection
    this.rover.instructions = this.roverInstructions
    
    this.animating = true
    this.operateRover()
  }
}
