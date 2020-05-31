import { convertToDMS } from './convert-to-dms.service';

export const showLatLonServices = {

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
