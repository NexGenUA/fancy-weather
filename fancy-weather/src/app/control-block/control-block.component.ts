import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { config } from '../../common/config';
import { coordsService } from '../services/coords.services';
const { OPEN_CAGE_KEY, FLICKR_KEY } = config;

@Component({
  selector: 'app-control-block',
  templateUrl: './control-block.component.html',
  styleUrls: ['./control-block.component.scss']
})
export class ControlBlockComponent implements OnInit {
  cityName: string;
  currentLanguage = 'EN';
  showList = false;
  @Output() changeBackground: EventEmitter<string> = new EventEmitter<string>();

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

  changeLanguage(event) {
    const span = event.target;
    if (span.classList.contains('lang')) {
      this.currentLanguage = span.innerHTML;
      this.showList = false;
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
}
