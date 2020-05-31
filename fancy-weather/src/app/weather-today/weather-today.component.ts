import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { weatherOneDay } from '../services/weather-one-day.services';
import countries from '../../common/countries.json';
import translationWeather from '../../common/translation-weather.json';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {

  date: Date = new Date();
  cloudyToday = 'sun';
  temperature: number | string = '';
  humidity: number | string = '';
  feelsLike: number | string = '';
  city = '';
  country = '';
  sky = '';
  windSpeed = '';
  windDirection = 'south';

  constructor() { }

  ngOnInit(): void {
    interval(1000)
      .subscribe(() => this.date = new Date());

    weatherOneDay.subscribe(this);
  }

  getOneDayWeather(weather) {
    this.temperature = Math.round(weather.main.temp);
    this.humidity = Math.round(weather.main.humidity);
    this.feelsLike = Math.round(weather.main.feels_like);
    this.country = countries[weather.sys.country].en;
    this.city = weather.name;
    this.sky = translationWeather.en.weather[weather.weather[0].id];
    this.windSpeed = `${Math.round(weather.wind.speed)} ${translationWeather.en.ms}`;
    const { deg } = weather.wind;

    if (deg > 135 && deg < 226) {
      this.windDirection = 'north';
    }

    if (deg > 225 && deg < 270) {
      this.windDirection = 'west';
    }

    if (deg > 45 && deg < 136) {
      this.windDirection = 'east';
    }

    console.log(weather);
  }
}
