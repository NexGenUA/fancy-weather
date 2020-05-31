import { showLatLonServices } from './show-lat-lon.services';
import { config } from '../../common/config';
import { weatherOneDay } from './weather-one-day.services';

const { WEATHER_KEY } = config;

export const flyTo = (coords, map, marker) => {
  // map.flyTo({
  //   center: coords,
  //   speed: 2,
  //   curve: 1,
  //   essential: true
  //   });
  // marker.setLngLat(coords).addTo(map);

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=${WEATHER_KEY}&units=metric`)
    .then(res => res.json())
    .then(res => {
      weatherOneDay.setOneDayWeather(res);
    });
  // showLatLonServices.sendDecimalCoords(coords);
};
