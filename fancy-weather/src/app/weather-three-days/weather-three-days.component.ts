import { Component, OnInit } from '@angular/core';
import { forecastService } from '../services/get-forecast.service';
import { SwitchLangServices } from '../services/switch-lang.services';

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

  constructor(private change: SwitchLangServices) {
    this.change.change.subscribe(lan => {
      this.lan = lan;
    });
  }

  ngOnInit(): void {
    forecastService.subscribe(this);
  }

  getForecast(weather) {
    this.weather = weather;
  }
}
