export const flyTo = (coords, map, marker) => {
  map.flyTo({
    center: coords,
    speed: 2, // make the flying slow
    curve: 1, // change the speed at which it zooms out
    essential: true
    });
  marker.setLngLat(coords).addTo(map);
};
