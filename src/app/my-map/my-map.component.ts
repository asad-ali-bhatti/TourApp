import { Component } from '@angular/core';
import {LatLng, MarkerManager, GoogleMapsAPIWrapper} from "@agm/core";

@Component({
  selector: 'my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['my-map.component.less'],
  providers: [MarkerManager, GoogleMapsAPIWrapper]
})
export class MyMapComponent {
  lat: number = 51.097322;
  lng: number = 10.378885;
  markers: Marker[] = [];

  constructor(public markerManager: MarkerManager){}

  addMarker(marker: Marker){
    this.markers.push(marker);
  }

  mapClick(e){
    console.log(e);
    this.addMarker({lat: e.coords.lat, lng: e.coords.lng, draggable: true})
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
