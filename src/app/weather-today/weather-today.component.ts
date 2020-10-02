import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { weatherOneDay } from '../services/weather-one-day.service';
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
  humidity: number;
  feelsLike: number;
  city = '';
  country = '';
  sky = '';
  windSpeed = '';
  weather: any;
  lan = localStorage.getItem('lan') || 'en';
  windDirection = translationWeather[this.lan].south;
  feelsLikeText = '';
  humidityText = '';
  fahrenheit = localStorage.getItem('fahrenheit') || 'c';
  newOffset: number;

  @Output() weatherText: EventEmitter<object> = new EventEmitter<object>();

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
      this.windDirection = translationWeather[this.lan].north;
    } else if (deg > 225 && deg < 270) {
      this.windDirection = translationWeather[this.lan].west;
    } else if (deg > 45 && deg < 136) {
      this.windDirection = translationWeather[this.lan].east;
    } else {
      this.windDirection = translationWeather[this.lan].south;
    }

    this.cloudyToday = getSky(+weatherId, this.newOffset);

    this.weather = weather;
    this.weatherText.emit({
      temperature: this.temperature,
      sky: this.sky,
      humidityText: this.humidityText,
      humidity: this.humidity,
      feelsLike: this.feelsLike,
      feelsLikeText: this.feelsLikeText,
      windSpeed: this.windSpeed,
      windDirection: this.windDirection,
      fahrenheit: this.fahrenheit
    });
  }

  switchLan(lan) {
    this.lan = lan;
    this.getOneDayWeather(this.weather);
  }

  newDegree(degree) {
    this.fahrenheit = degree;
  }
}
