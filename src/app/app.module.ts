import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RoverGridComponent } from './components/RoverGrid/RoverGrid.component';

@NgModule({
  declarations: [
    AppComponent,
    RoverGridComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
