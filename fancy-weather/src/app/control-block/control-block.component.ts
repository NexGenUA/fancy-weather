import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { config } from '../../common/config';
import { coordsService } from '../services/coords.services';
import { SwitchLangServices } from '../services/switch-lang.services';
const { OPEN_CAGE_KEY, FLICKR_KEY } = config;
import translationWeather from '../../common/translation-weather.json';
import { SwitchDegreeService } from '../services/switch-degree.service';

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


  getWeather() {
    this.error = '';
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.cityName}&key=${OPEN_CAGE_KEY}&limit=1`)
      .then(res => res.json())
      .then(res => {
        if (!res.results.length) {
          this.error = translationWeather[this.lan].error;
          return;
        }
        const [latitude, longitude] = Object.values(res.results[0].geometry);
        coordsService.setCoords([longitude, latitude]);
        this.cityName = '';
      });
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

  refresh() {
    const apiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    const tags = 'day,rain,summer';
    fetch(`${apiUrl}&api_key=${FLICKR_KEY}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => {
        if (res.stat === 'ok') {
          const photos = res.photos.photo.filter(f => f.url_h && f.width_h > f.height_h);
          const idx = Math.floor(Math.random() * photos.length);
          this.changeBackground.emit(photos[idx].url_h);
        }
      });
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
