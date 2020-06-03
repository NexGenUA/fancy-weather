import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { weatherOneDay } from '../services/weather-one-day.services';
import countries from '../../common/countries.json';
import translationWeather from '../../common/translation-weather.json';
import { SwitchLangServices } from '../services/switch-lang.services';
import { getSky } from '../../common/get-sky';
import { SwitchDegreeService } from '../services/switch-degree.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {

  date: Date = new Date();
  cloudyToday = '';
  temperature: number;
  humidity: number | string = '';
  feelsLike: number | string = '';
  city = '';
  country = '';
  sky = '';
  windSpeed = '';
  windDirection = 'south';
  weather: any;
  lan = localStorage.getItem('lan') || 'en';
  feelsLikeText = '';
  humidityText = '';
  fahrenheit = localStorage.getItem('fahrenheit') || 'c';
  newOffset: number;

  constructor(private change: SwitchLangServices, private switchDegree: SwitchDegreeService) {
    this.change.change.subscribe(lan => {
      this.switchLan(lan);
    });
    this.switchDegree.switch.subscribe(degree => {
      this.newDegree(degree);
    });
  }

  ngOnInit(): void {
    interval(1000)
      .subscribe(() => {
        const date = new Date();
        const offset = date.getTimezoneOffset() / 60;

        if (this.newOffset) {
          date.setHours(date.getHours() + offset);
          date.setMinutes(date.getMinutes() + this.newOffset);
        }

        this.date = date;
      });

    weatherOneDay.subscribe(this);
  }

  getOneDayWeather(weather) {
    if (!weather) {
      return;
    }

    this.newOffset = weather.timezone / 60;

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

    this.cloudyToday = getSky(+weatherId);

    this.weather = weather;
  }

  switchLan(lan) {
    this.lan = lan;
    this.getOneDayWeather(this.weather);
  }

  newDegree(degree) {
    this.fahrenheit = degree;
  }
}
