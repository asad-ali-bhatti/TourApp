import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core'

import { AppComponent } from './app.component';
import { MyMapComponent } from './my-map/my-map.component';
import { DirectionsMapDirective } from './directives/directions-map.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpnPt_vLr4wOwyHXz-rIGNH5v4EvVhIbA',
      libraries: ['places', 'geometry']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
