import { convertToDMS } from './convertToDmc.service';

export const showLatLowServices = {

  coords: [],
  subscribers: [],

  sendDecimalCoords(coords: Array<number>): void {
    this.coords = convertToDMS(coords);
    this.info();
  },

  info(): void {
    this.subscribers.forEach(component => {
      component.getDMS(this.coords);
    });
  },

  subscribe(component: object): void {
    this.subscribers.push(component);
  }
};
