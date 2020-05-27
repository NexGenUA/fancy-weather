import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { config } from '../../common/config';
import { coordsService } from '../services/coords.services';
import { flyTo } from '../services/flyTo.services';
const { MAPBOX_KEY, IP_INFO_TOKEN } = config;
(mapboxgl as any).accessToken = MAPBOX_KEY;
const marker = new mapboxgl.Marker();

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnInit {

  map: any;

  ngOnInit(): void {

    // this.map = new mapboxgl.Map({
    //   container: 'map-box',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   zoom: 11
    // });

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = pos => {
      const { longitude, latitude } = pos.coords;
      const coords: number[] = [+longitude, +latitude];
      flyTo(coords, this.map, marker);
    };

    const error = () => {
      fetch(`https://ipinfo.io/loc?token=${IP_INFO_TOKEN}`)
        .then(res => res.text())
        .then(res => {
          const crd = res.split(/,\s*/);
          const [latitude, longitude] = crd;
          const coords: number[] = [+longitude, +latitude];
          flyTo(coords, this.map, marker);
        });
    };

    // navigator.geolocation.getCurrentPosition(success, error, options);

    coordsService.subscribe(this);
  }

  newCoords(coords) {
    flyTo(coords, this.map, marker);
  }
}
