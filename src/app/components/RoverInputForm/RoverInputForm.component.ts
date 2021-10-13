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
  @Input() selectedPreset = 0

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

    this.selectedPreset = 0

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

  activatePreset (event: Event): void {
    const element = <HTMLInputElement>event.target
    
    switch (element.value) {
      case '1':
        this.widthChange.emit(6)
        this.heightChange.emit(6)
        this.roverStartingXChange.emit(1)
        this.roverStartingYChange.emit(2)
        this.roverStartingDChange.emit('N')
        this.roverInstructionsChange.emit('LMLMLMLMM')
        break
      case '2':
        this.widthChange.emit(6)
        this.heightChange.emit(6)
        this.roverStartingXChange.emit(3)
        this.roverStartingYChange.emit(3)
        this.roverStartingDChange.emit('E')
        this.roverInstructionsChange.emit('MMRMMRMRRM')
        break
      case '3':
        this.widthChange.emit(6)
        this.heightChange.emit(6)
        this.roverStartingXChange.emit(1)
        this.roverStartingYChange.emit(1)
        this.roverStartingDChange.emit('N')
        this.roverInstructionsChange.emit('MLMM')
    }
  }
}