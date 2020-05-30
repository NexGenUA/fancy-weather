import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'fancy-weather';
  coords: Array<number>;
  background: string;

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
}
