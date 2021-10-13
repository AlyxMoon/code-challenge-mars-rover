import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RoverGridComponent } from './components/RoverGrid/RoverGrid.component'
import { RoverInputFormComponent } from './components/RoverInputForm/RoverInputForm.component'

@NgModule({
  declarations: [
    AppComponent,
    RoverGridComponent,
    RoverInputFormComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
