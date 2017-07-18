import {Component, NgZone, Input, ElementRef, ViewChild, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MapsAPILoader, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {DirectionsMapDirective} from "../directives/directions-map.directive";

declare var google: any;
declare var jQuery:any;

@Component({
  selector: 'my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['my-map.component.less'],
  providers: [GoogleMapsAPIWrapper]
})
export class MyMapComponent implements OnInit {
  // Coordinates of Germany
  lat: number = 51.097322;
  lng: number = 10.378885;
  private zoom: number;
  geoCoder: any;
  markers: Marker[] = [];
  waypoints: WayPoint[] = [];
  map: any;

  public destinationInput: FormControl;
  public destinationOutput: FormControl;

  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

  @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

  @ViewChild(DirectionsMapDirective)
  vc: DirectionsMapDirective;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef : ElementRef
  ){}

  addMarker(marker: Marker){
    this.markers.push(marker);
    var that = this;
    new google.maps.Marker({position: {lat: marker.lat, lng: marker.lng}, map: this.map});
    this.geoCoder.geocode({location: {lat: marker.lat, lng: marker.lng}}, (results, status) => {
      if (status == 'OK')
      {
        that.waypoints.push({location: results[0].formated_address, stopover: true});
        that.vc.waypoints = that.markers;
        that.vc.updateDirections();
      }
    });
  }

  mapClick(e){
    this.addMarker({lat: e.coords.lat, lng: e.coords.lng, draggable: true});
  }

  setupPlaceChangedListener(autocomplete: any, mode: any ) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        var place = google.maps.places.PlaceResult = autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined) {
          return;
        }
        if (mode === 'ORG') {
          this.vc.origin = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()};
          this.vc.originPlaceId = place.place_id;
        } else {
          this.vc.destination = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()}; // its a example aleatory position
          this.vc.destinationPlaceId = place.place_id;
        }

        if (this.vc.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }

        //Update the directions
        this.vc.updateDirections();
        this.zoom = 12;
      });
    });
  }
  ngOnInit(){
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();
    this.zoom = 4;
    this.gmapsApi.getNativeMap().then(map => {
      this.map = map;
    });
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
      });

      let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
      });

      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');
    });
  }


}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

interface WayPoint {
  location: any;
  stopover: boolean;
}
