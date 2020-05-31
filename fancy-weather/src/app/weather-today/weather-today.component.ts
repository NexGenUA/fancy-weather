import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { weatherOneDay } from '../services/weather-one-day.services';
import countries from '../../common/countries.json';
import translationWeather from '../../common/translation-weather.json';
import { SwitchLangServices } from '../services/switch-lang.services';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {

  date: Date = new Date();
  cloudyToday = '';
  temperature: number | string = '';
  humidity: number | string = '';
  feelsLike: number | string = '';
  city = '';
  country = '';
  sky = '';
  windSpeed = '';
  windDirection = 'south';
  weather: any;
  lan = 'en';
  feelsLikeText = '';
  humidityText = '';

  constructor(private change: SwitchLangServices) {
    this.change.change.subscribe(lan => {
      this.switchLan(lan);
    })
  }

  ngOnInit(): void {
    interval(1000)
      .subscribe(() => this.date = new Date());

    weatherOneDay.subscribe(this);
  }

  getOneDayWeather(weather) {
    if (!weather) {
      return;
    }

    const weatherId = weather.weather[0].id;
    this.temperature = Math.round(weather.main.temp);
    this.humidity = Math.round(weather.main.humidity);
    this.feelsLike = Math.round(weather.main.feels_like);
    this.country = countries[weather.sys.country]?.[this.lan] || '';
    this.city = weather.city[this.lan];
    this.sky = translationWeather[this.lan].weather[weatherId];
    this.windSpeed = `${Math.round(weather.wind.speed)} ${translationWeather[this.lan].ms}`;
    this.feelsLikeText = translationWeather[this.lan].feel;
    this.humidityText = translationWeather[this.lan].humidity;
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

    if (weatherId >= 200 && weatherId <= 233) {
      this.cloudyToday = 'thunder'
    }

    if (weatherId >= 300 && weatherId <= 522) {
      this.cloudyToday = 'rain'
    }

    if (weatherId >= 600 && weatherId <= 623) {
      this.cloudyToday = 'snow'
    }

    if (weatherId >= 700 && weatherId <= 751) {
      this.cloudyToday = 'cloudy'
    }

    if (weatherId >= 801 && weatherId <= 900) {
      this.cloudyToday = 'party-cloudy'
    }

    if (weatherId === 800) {
      this.cloudyToday = 'sun'
    }

    this.weather = weather;
  }

  switchLan(lan) {
    this.lan = lan;
    this.getOneDayWeather(this.weather);
  }
}
