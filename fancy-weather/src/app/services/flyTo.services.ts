import { showLatLowServices } from './showLatLon.services';

export const flyTo = (coords, map, marker) => {
  map.flyTo({
    center: coords,
    speed: 2,
    curve: 1,
    essential: true
    });
  marker.setLngLat(coords).addTo(map);

  showLatLowServices.sendDecimalCoords(coords);
};
