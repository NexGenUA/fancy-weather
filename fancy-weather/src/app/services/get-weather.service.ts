import { config } from '../../common/config';

const { OPEN_CAGE_KEY } = config;

export const getWeatherService = async (cityName) => {

  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${OPEN_CAGE_KEY}&limit=1`);
    const data = await response.json();

    if (!data.results.length) {
      return 404;
    }

    const [latitude, longitude] = Object.values(data.results[0].geometry);
    return [longitude, latitude];
  } catch (e) {
    return 500;
  }
};
