import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'fancy-weather';
  coords: Array<number>;

  getCoords(coords) {
    this.coords = coords;
  }
}
