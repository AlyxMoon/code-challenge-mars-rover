import { Component, HostBinding, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { RoverPosition } from 'src/typings'

@Component({
  selector: 'RoverGrid',
  templateUrl: './RoverGrid.component.html',
  styleUrls: ['./RoverGrid.component.scss'],
})
export class RoverGridComponent {
  @Input() width = 10
  @Input() height = 10
  @Input() rover: RoverPosition = { x: 0, y: 0, d: 'N' }

  get cells (): number[] {
    const cells = Array(this.width * this.height).fill(0)
    return cells
  }

  get roverPositionIndex (): number {
    // normally a grid would go top->bottom and left->right
    // but we need bottom->top and left->right
    // so a bit of translation is required

    const { width, height } = this
    const { x, y } = this.rover

    return ((height - x - 1) * width) + y
  }

  get roverStyles (): { transform: string } {
    let rotation = 0
    if (this.rover.d === 'N') rotation = -90
    if (this.rover.d === 'S') rotation = 90
    if (this.rover.d === 'W') rotation = 180
    if (this.rover.d === 'E') rotation = 0

    return { transform: `rotateZ(${rotation}deg)` }
  }

  @HostBinding('attr.style')
  public get valueAsStyle (): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--cellsPerRow: ${this.width}`)
  }

  constructor (private sanitizer: DomSanitizer) {}
}
