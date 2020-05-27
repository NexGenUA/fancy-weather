import { Component, OnInit } from '@angular/core';
import { config } from '../../common/config';
import { coordsService } from '../services/coords.services';
const { OPEN_CAGE_KEY } = config;

@Component({
  selector: 'app-control-block',
  templateUrl: './control-block.component.html',
  styleUrls: ['./control-block.component.scss']
})
export class ControlBlockComponent implements OnInit {
  cityName: string;

  ngOnInit(): void {
  }

  getWeather() {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.cityName}&key=${OPEN_CAGE_KEY}&limit=1`)
      .then(res => res.json())
      .then(res => {
        const [latitude, longitude] = Object.values(res.results[0].geometry);
        coordsService.setCoords([longitude, latitude]);
      });
  }
}
