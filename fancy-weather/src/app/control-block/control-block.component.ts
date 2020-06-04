import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { coordsService } from '../services/coords.services';
import { SwitchLangServices } from '../services/switch-lang.services';
import translationWeather from '../../common/translation-weather.json';
import { SwitchDegreeService } from '../services/switch-degree.service';
import { changeBackground } from '../services/change-background-url.service';
import { getWeatherService } from '../services/get-weather.service';

@Component({
  selector: 'app-control-block',
  templateUrl: './control-block.component.html',
  styleUrls: ['./control-block.component.scss']
})
export class ControlBlockComponent implements OnInit {
  cityName: string;
  currentLanguage = 'EN';
  showList = false;
  placeholder = 'Enter city';
  lan = localStorage.getItem('lan') || 'en';
  search = 'search';
  error: string;
  fahrenheit = localStorage.getItem('fahrenheit') === 'f';

  @Output() changeBackground: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.change.switchLan(this.lan);
    this.currentLanguage = this.lan;
  }

  constructor(private change: SwitchLangServices, private switchDegree: SwitchDegreeService) {
    this.change.change.subscribe(lan => {
      this.switchLan(lan);
    });
  }


  async getWeather() {
    this.error = '';
    document.getElementById('wrap-app').classList.add('change');
    const coords: any = await getWeatherService(this.cityName);

    if (coords === 404) {
      this.error = translationWeather[this.lan].error;
      document.getElementById('wrap-app').classList.remove('change');
      return;
    }

    if (coords === 500) {
      this.error = translationWeather[this.lan].lost;
      document.getElementById('wrap-app').classList.remove('change');
      return;
    }

    coordsService.setCoords(coords);
    this.cityName = '';
  }

  changeLanguage(event) {
    const span = event.target;
    if (span.classList.contains('lang')) {
      const lan = span.innerHTML.toLowerCase();
      this.currentLanguage = lan;
      this.showList = false;
      this.change.switchLan(lan);
      localStorage.setItem('lan', lan);
    }
  }

  showListBlock() {
    this.showList = !this.showList;
  }

  async refresh() {
    document.getElementById('wrap-app').classList.add('change');
    const tags = localStorage.getItem('tags') || 'day, summer';
    console.log('%c%s', 'color: green; font: 1.1rem/1 Tahoma;', 'Параметры запроса картинки: ' + tags.replace(/,/g, ' '));
    const url = await changeBackground(tags);
    const getImage = await fetch(url);
    await getImage.blob();
    this.changeBackground.emit(url);
    document.getElementById('wrap-app').classList.remove('change');
  }

  switchLan(lan) {
    this.lan = lan;
    this.placeholder = translationWeather[this.lan].placeholder;
    this.search = translationWeather[this.lan].search;
    this.error = this.error ? translationWeather[this.lan].error : '';
  }

  changeDegree(degree) {
    this.fahrenheit = degree !== 'c';
    localStorage.setItem('fahrenheit', degree);
    this.switchDegree.switchDegree(degree);
  }
}
