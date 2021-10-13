import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'RoverInputForm',
  templateUrl: './RoverInputForm.component.html',
  styleUrls: ['./RoverInputForm.component.scss'],
})
export class RoverInputFormComponent {
  @Input() width = 0
  @Input() height = 0

  @Output() widthChange: EventEmitter<number> = new EventEmitter<number>()
  @Output() heightChange: EventEmitter<number> = new EventEmitter<number>()

  onWidthChanged (event: Event): void {
    this.widthChange.emit(parseInt((<HTMLInputElement>event.target).value))
  }

  onHeightChanged (event: Event): void {
    this.heightChange.emit(parseInt((<HTMLInputElement>event.target).value))
  }
}