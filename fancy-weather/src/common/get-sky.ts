export const getSky = (id, newOffset) => {

  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;

  if (newOffset) {
    date.setHours(date.getHours() + offset);
    date.setMinutes(date.getMinutes() + newOffset);
  }

  const hour = date.getHours();

  if (id >= 200 && id <= 233) {
    return 'thunder';
  }

  if (id >= 300 && id <= 522) {
    if (hour < 6 || hour > 20 && newOffset) {
      return 'rain-night';
    }
    return 'rain';
  }

  if (id >= 600 && id <= 623) {
    if (hour < 6 || hour > 20 && newOffset) {
      return 'snow-night';
    }
    return 'snow';
  }

  if (id >= 700 && id <= 751) {
    return 'cloudy';
  }

  if (id >= 801 && id <= 900) {
    if (hour < 6 || hour > 20 && newOffset) {
      return 'cloudy-night';
    }
    return 'party-cloudy';
  }

  if (id === 800) {
    if (hour < 6 || hour > 20 && newOffset) {
      return 'moon';
    }
    return 'sun';
  }
};

