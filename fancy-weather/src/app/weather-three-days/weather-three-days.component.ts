import { Component, OnInit } from '@angular/core';
import { forecastService } from '../services/get-forecast.services';

export interface WeatherOneDay {
  date: string;
  degree: number;
  cloudy: string;
}

@Component({
  selector: 'app-weather-three-days',
  templateUrl: './weather-three-days.component.html',
  styleUrls: ['./weather-three-days.component.scss']
})
export class WeatherThreeDaysComponent implements OnInit {

  lan = localStorage.getItem('lan') || 'en';

  weather: WeatherOneDay[];

  constructor() { }

  ngOnInit(): void {
    forecastService.subscribe(this);
  }

  getForecast(weather) {
    this.weather = weather;
  }
}
