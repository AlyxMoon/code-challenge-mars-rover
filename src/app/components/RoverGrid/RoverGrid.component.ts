import { Component, HostBinding, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { Rover } from 'src/typings'

@Component({
  selector: 'RoverGrid',
  templateUrl: './RoverGrid.component.html',
  styleUrls: ['./RoverGrid.component.scss'],
})
export class RoverGridComponent {
  @Input() width = 10
  @Input() height = 10
  @Input() rover!: Rover
  @Input() animating = false
  @Input() roverOutOfBounds = false

  get cells (): number[] {
    const cells = Array(this.width * this.height).fill(0)
    return cells
  }

  get roverPositionIndex (): number {
    if (!this.rover) return -1
    // normally a grid would go top->bottom and left->right
    // but we need bottom->top and left->right
    // so a bit of translation is required

    const { width, height } = this
    const { x, y } = this.rover.position

    return ((height - y - 1) * width) + x
  }

  get roverStyles (): { [key: string]: string | null } {
    if (!this.rover) return { transform: 'none' }

    let rotation = 0
    if (this.rover.position.d === 'N') rotation = -90
    if (this.rover.position.d === 'S') rotation = 90
    if (this.rover.position.d === 'W') rotation = 180
    if (this.rover.position.d === 'E') rotation = 0

    return { 
      transform: this.roverOutOfBounds ? null : `rotateZ(${rotation}deg)`,
      top: `calc((var(--cellSize) + 1px) * ${this.height - this.rover.position.y - 1})`,
      left: `calc((var(--cellSize) + 1px) * ${this.rover.position.x})`,
    }
  }

  get roverClasses (): string[] {
    const classes: string[] = ['rover']

    if (this.roverOutOfBounds) {
      classes.push('falling')
    }

    return classes
  }

  @HostBinding('attr.style')
  public get valueAsStyle (): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--cellsPerRow: ${this.width}`)
  }

  constructor (private sanitizer: DomSanitizer) {}
}
