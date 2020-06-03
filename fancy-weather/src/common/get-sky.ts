export const getSky = id => {
  if (id >= 200 && id <= 233) {
      return 'thunder';
    }

  if (id >= 300 && id <= 522) {
    return 'rain';
  }

  if (id >= 600 && id <= 623) {
    return 'snow';
  }

  if (id >= 700 && id <= 751) {
    return 'cloudy';
  }

  if (id >= 801 && id <= 900) {
    return 'party-cloudy';
  }

  if (id === 800) {
    return 'sun';
  }
};

