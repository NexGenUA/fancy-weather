import { getSky } from '../../common/get-sky';

interface IForecast {
  getForecast: object;
}

export const forecastService = {

  forecast: [] = [],
  subscribers: [],

  sendForecast(forecast: Array<object>): void {
    const currentDay = new Date((forecast[0] as any).dt_txt).getDate();

    const makeForecastData = (idx, data): void => {
      if (!this.forecast[idx]) {
        this.forecast[idx] = {
          degree: [],
          cloudy: []
        };
      }
      (this.forecast[idx] as any).degree.push(data.main.temp);
      (this.forecast[idx] as any).cloudy.push(data.weather[0].id);
      (this.forecast[idx] as any).date = data.dt_txt;
    };

    forecast.forEach((data: any) => {
      if (new Date(data.dt_txt).getDate() - 1 === currentDay) {
        makeForecastData(0, data);
      }

      if (new Date(data.dt_txt).getDate() - 2 === currentDay) {
        makeForecastData(1, data);
      }

      if (new Date(data.dt_txt).getDate() - 3 === currentDay) {
        makeForecastData(2, data);
      }
    });

    this.forecast = this.forecast.map(data => {
      const degrees = data.degree;
      const avgSky = {};
      data.cloudy.forEach(d => {
        if (!avgSky[d]) {
          avgSky[d] = 0;
        }
        avgSky[d]++;
      });
      const sky = Object.entries(avgSky);
      sky.sort((a: any, b: any) => b[1] - a[1]);

      data.cloudy = getSky(+sky[0][0], null);
      data.degree = Math.round(degrees.reduce((cur, val) => cur + val) / degrees.length);

      return data;
    });

    this.info();
  },

  info(): void {
    this.subscribers.forEach(component => {
      component.getForecast(this.forecast);
    });
    this.forecast = [];
  },

  subscribe(component: IForecast): void {
    this.subscribers.push(component);
  }
};
