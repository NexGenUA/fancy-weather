import { showLatLonServices } from '../app/services/show-lat-lon.service';
import { config } from './config';
import { weatherOneDay } from '../app/services/weather-one-day.service';
import { forecastService } from '../app/services/get-forecast.service';
import { changeBackground } from '../app/services/change-background-url.service';
import { getTags } from './get-tags';
import { preloader } from './preloader';

const { WEATHER_KEY, YANDEX_KEY } = config;

export const flyTo = async (coords, map, marker) => {
  const loader = preloader();

  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather?lat=');

  const json = await fetch(`${weatherUrl}${coords[1]}&lon=${coords[0]}&appid=${WEATHER_KEY}&units=metric`);
  const weather  = await json.json();


  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[1]}&lon=${coords[0]}&appid=${WEATHER_KEY}&units=metric`);

  const forecast = await forecastResponse.json();

  const cities = {
    en: weather.name
  };

  const keys = ['ru', 'be'];
  const translateCities = [];
  const controller = new AbortController();
  let isFetchFalse = true;

  keys.forEach(el => {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=';
    const city = fetch(`${url}${YANDEX_KEY}&text=${weather.name || 'no data'}&lang=${el}`, {
      signal: controller.signal
    })
      .then(res => {
          if (res.status !== 200) {
            return { text: [weather.name]};
          } else {
            isFetchFalse = true;
            return res.json();
          }
        },
        () => {
          return { text: [weather.name]};
        }
      );
    translateCities.push(city);
    });

  setTimeout(() => {
    if (isFetchFalse) {
      controller.abort();
    }
  }, 1000);

  await Promise.all(translateCities);

  keys.forEach((el, i) => {
    cities[el] = translateCities[i].__zone_symbol__value.text[0];
  });

  weather.city = cities;

  const tags: string = getTags(weather).join();

  const backgroundUrl = await changeBackground(tags);

  const mainBlock = document.getElementById('wrap-app');
  const getImage = await fetch(backgroundUrl);
  await getImage.blob();

  (mainBlock as HTMLDivElement).style.backgroundImage = `url(${backgroundUrl})`;
  console.log('%c%s', 'color: green; font: 1.1rem/1 Tahoma;', 'Параметры запроса картинки: ' + tags.replace(/,/g, ' '));

  weatherOneDay.setOneDayWeather(weather);
  showLatLonServices.sendDecimalCoords(coords);
  forecastService.sendForecast(forecast.list);
  marker.setLngLat(coords).addTo(map);
  map.flyTo({
    center: coords,
    speed: 2,
    curve: 1,
    essential: true
    });
  document.getElementById('wrap-app').classList.remove('change');
  loader.remove();
};
