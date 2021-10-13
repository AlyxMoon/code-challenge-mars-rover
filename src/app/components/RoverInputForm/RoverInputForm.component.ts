import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'RoverInputForm',
  templateUrl: './RoverInputForm.component.html',
  styleUrls: ['./RoverInputForm.component.scss'],
})
export class RoverInputFormComponent {
  @Input() animating = false
  @Input() width = 0
  @Input() height = 0
  @Input() roverStartingX = 0
  @Input() roverStartingY = 0
  @Input() roverStartingD = 'N'
  @Input() roverInstructions = 'MLMRM'

  @Output() widthChange: EventEmitter<number> = new EventEmitter<number>()
  @Output() heightChange: EventEmitter<number> = new EventEmitter<number>()
  @Output() roverStartingXChange: EventEmitter<number> = new EventEmitter<number>()
  @Output() roverStartingYChange: EventEmitter<number> = new EventEmitter<number>()
  @Output() roverStartingDChange: EventEmitter<string> = new EventEmitter<string>()
  @Output() roverInstructionsChange: EventEmitter<string> = new EventEmitter<string>()
  @Output() begin: EventEmitter<void> = new EventEmitter<void>()

  onChange (event: Event, property: string): void {
    const element = <HTMLInputElement>event.target
    const value = element.value

    const numProperties = ['width', 'height', 'roverStartingX', 'roverStartingY']

    if (numProperties.includes(property)) {
      const parsed = Math.max(0, Math.min(30, parseInt(value)))
      element.value = `${parsed}`

      switch (property) {
        case 'width': return this.widthChange.emit(parsed)
        case 'height': return this.heightChange.emit(parsed)
        case 'roverStartingX': return this.roverStartingXChange.emit(parsed)
        case 'roverStartingY': return this.roverStartingYChange.emit(parsed)
      }
    }

    if (property === 'roverStartingD') {
      const d = ['N', 'E', 'S', 'W'].includes(value) ? value : 'N'
      element.value = d
      return this.roverStartingDChange.emit(d)
    }

    if (property === 'roverInstructions') {
      const validated = /[^MLR]/g.test(value) ? 'MLMRM' : value
      element.value = validated
      return this.roverInstructionsChange.emit(validated)
    }
  }
}