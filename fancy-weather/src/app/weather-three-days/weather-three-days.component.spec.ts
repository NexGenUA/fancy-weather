import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherThreeDaysComponent } from './weather-three-days.component';

describe('WeatherThreeDaysComponent', () => {
  let component: WeatherThreeDaysComponent;
  let fixture: ComponentFixture<WeatherThreeDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherThreeDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherThreeDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
