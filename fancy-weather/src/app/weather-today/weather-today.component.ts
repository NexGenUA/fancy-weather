import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {

  date: Date = new Date();
  cloudyToday = 'sun';

  constructor() { }

  ngOnInit(): void {
    interval(1000)
      .subscribe(() => this.date = new Date());
  }

}
