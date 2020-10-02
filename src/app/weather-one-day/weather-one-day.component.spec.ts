import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherOneDayComponent } from './weather-one-day.component';

describe('WeatherOneDayComponent', () => {
  let component: WeatherOneDayComponent;
  let fixture: ComponentFixture<WeatherOneDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherOneDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherOneDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
