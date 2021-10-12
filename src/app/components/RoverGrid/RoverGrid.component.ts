import { Component, HostBinding, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'RoverGrid',
  templateUrl: './RoverGrid.component.html',
  styleUrls: ['./RoverGrid.component.scss'],
})
export class RoverGridComponent {
  @Input() width = 10
  @Input() height = 10

  get cells (): number[] {
    const cells = Array(this.width * this.height).fill(0)
    return cells
  }

  @HostBinding('attr.style')
  public get valueAsStyle (): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--cellsPerRow: ${this.width}`)
  }

  constructor (private sanitizer: DomSanitizer) {}
}
