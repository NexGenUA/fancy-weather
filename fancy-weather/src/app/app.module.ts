import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ControlBlockComponent } from './control-block/control-block.component';
import { WeatherTodayComponent } from './weather-today/weather-today.component';
import { WeatherThreeDaysComponent } from './weather-three-days/weather-three-days.component';
import { GeoComponent } from './geo/geo.component';
import { FormsModule } from '@angular/forms';
import { WeatherIconsComponent } from './weather-icons/weather-icons.component';
import { SwitchLangServices } from './services/switch-lang.services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeBe from '@angular/common/locales/be';

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeBe, 'be');

@NgModule({
  declarations: [
    AppComponent,
    ControlBlockComponent,
    WeatherTodayComponent,
    WeatherThreeDaysComponent,
    GeoComponent,
    WeatherIconsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SwitchLangServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
