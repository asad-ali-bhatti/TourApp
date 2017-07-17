import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MyMapComponent } from './my-map/my-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpnPt_vLr4wOwyHXz-rIGNH5v4EvVhIbA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
