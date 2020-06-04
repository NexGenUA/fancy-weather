export const weatherOneDay = {

  weather: {},
  subscribers: [],

  setOneDayWeather(weather: object): void {
    this.weather = weather;
    this.info();
  },

  info(): void {
    this.subscribers.forEach(component => {
      component.getOneDayWeather(this.weather);
    });
  },

  subscribe(component: object): void {
    this.subscribers.push(component);
  }
};
