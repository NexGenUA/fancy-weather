export const coordsService = {

  coords: [],
  subscribers: [],

  setCoords(coords: Array<number>): void {
    this.coords = coords;
    this.info();
  },

  info(): void {
    this.subscribers.forEach(component => {
      component.newCoords(this.coords);
    });
  },

  subscribe(component: object): void {
    this.subscribers.push(component);
  }
};
