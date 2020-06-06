import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fancy-weather';
  coords: Array<number>;
  background: string;
  currentWeatherText: object;

  ngOnInit(): void {
    console.log('%c%s', 'color: green; font: 1.1rem/1 Tahoma;', '---------------------------------------------------------');
    console.log('%c%s', 'color: orange; font: 1.1rem/1 Tahoma;', '| Кодовые слова для озвучивания погоды:   |');
    console.log('%c%s', 'color: coral; font: 1.1rem/1 Tahoma;', '| Для беларускай мовы: "Прагноз надвор\'я" |');
    console.log('%c%s', 'color: aqua; font: 1.1rem/1 Tahoma;', '| Для русского языка: "Прогноз погоды"      |');
    console.log('%c%s', 'color: yellow; font: 1.1rem/1 Tahoma;', '| For english: "Weather forecast"                   |');
    console.log('%c%s', 'color: green; font: 1.1rem/1 Tahoma;', '---------------------------------------------------------');
  }

  switchBackground(backgroundUrl) {
    const img = new Image();

    img.onload = () => {
      this.background = `background-image: url(${backgroundUrl})`;
      img.remove();
    };

    img.onerror = () => {
      this.background = `background-image: url(assets/sun.jpg)`;
      img.remove();
    };

    img.src = backgroundUrl;
  }

  updateWeatherText(weather) {
    this.currentWeatherText = weather;
  }
}
