export const getTags = weather => {
  const tags = [];
  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;
  const isUp = 0 < (weather.coord?.lat || 1);
  const sky = weather.weather[0]?.main?.toLowerCase() || '';

  let season = '';

  date.setHours(date.getHours() + offset);
  date.setMinutes(date.getMinutes() + (weather.timezone / 60));

  const month = date.getMonth();
  const hour = date.getHours();

  if (hour >= 11 && hour < 18) {
    tags.push('day');
  }

  if (hour >= 18 && hour < 23) {
    tags.push('evening');
  }

  if (hour >= 23 || hour < 5) {
    tags.push('night');
  }

  if (hour >= 5 && hour < 11) {
    tags.push('morning');
  }


  if (month > 10 || month < 2) {
    season = isUp ? 'winter' : 'summer';
  }

  if (month > 1 && month < 5) {
    season = isUp ? 'spring' : 'autumn';
  }

  if (month > 4 && month < 8) {
    season = isUp ? 'summer' : 'winter';
  }

  if (month > 7 && month < 11) {
    season = isUp ? 'autumn' : 'spring';
  }

  tags.push(season, sky);

  localStorage.setItem('tags', tags.join());

  return tags;
};

