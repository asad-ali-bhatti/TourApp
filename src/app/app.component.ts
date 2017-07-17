import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {
  title: string = 'Welcome to Tour App';
  lat: number = 51.097322;
  lng: number = 10.378885;
}
