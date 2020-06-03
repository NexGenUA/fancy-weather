import { Component, Input } from '@angular/core';
import { WeatherOneDay } from '../weather-three-days/weather-three-days.component';
import { SwitchDegreeService } from '../services/switch-degree.service';

@Component({
  selector: 'app-weather-one-day',
  templateUrl: './weather-one-day.component.html',
  styleUrls: ['./weather-one-day.component.scss']
})
export class WeatherOneDayComponent{

  @Input() day: WeatherOneDay;
  @Input() lan;

  fahrenheit = localStorage.getItem('fahrenheit') || 'c';

  constructor(private degree: SwitchDegreeService) {
    this.degree.switch.subscribe(d => {
      this.switchDegree(d);
    });
  }
  switchDegree(degree) {
    this.fahrenheit = degree;
  }

}
