import { showLatLonServices } from './show-lat-lon.services';
import { config } from '../../common/config';
import { weatherOneDay } from './weather-one-day.services';

const { WEATHER_KEY, YANDEX_KEY } = config;

export const flyTo = async (coords, map, marker) => {
  map.flyTo({
    center: coords,
    speed: 2,
    curve: 1,
    essential: true
    });
  marker.setLngLat(coords).addTo(map);


  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=';

  const json = await fetch(`${weatherUrl}${coords[1]}&lon=${coords[0]}&appid=${WEATHER_KEY}&units=metric`);
  const weather  = await json.json();

  const cities = {
    en: weather.name
  };

  const keys = ['ru', 'be'];
  const translateCities = [];

  keys.forEach(el => {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=';
    const city = fetch(`${url}${YANDEX_KEY}&text=${weather.name || 'no data'}&lang=${el}`)
      .then(
        res => {
          if (res.status !== 200) {
            return weather.name;
          } else {
            return res.json();
          }
        },
        () => {
          return weather.name;
        }
      ).then(res => res);
      translateCities.push(city);
    });

    await Promise.all(translateCities);
    keys.forEach((el, i) => {
      cities[el] = translateCities[i].__zone_symbol__value.text[0]
    });

  weather.city = cities;

  weatherOneDay.setOneDayWeather(weather);
  showLatLonServices.sendDecimalCoords(coords);
};
