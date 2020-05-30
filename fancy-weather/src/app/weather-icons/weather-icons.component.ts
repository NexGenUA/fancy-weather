import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-icons',
  templateUrl: './weather-icons.component.html',
  styleUrls: ['./weather-icons.component.scss']
})
export class WeatherIconsComponent implements OnInit {

  @Input() weather: string;

  constructor() { }

  ngOnInit(): void {
  }

}
