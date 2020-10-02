export const convertToDMS = (src: number[]): object => {
  const toDMS = (n: number): string => {
    n = Math.abs(n);

    const d = Math.floor(n);
    n = n - d;
    n *= 60;

    const m = Math.floor(n);
    n = n - m;
    n *= 60;

    const s = Math.floor(n);

    return `${d}°${m}′${s}′′`;
  };

  const ns = src[0] > 0 ? 'N' : 'S';
  const ew = src[1] > 0 ? 'E' : 'W';

  const latitude = toDMS(src[0]) + ns;
  const longitude = toDMS(src[1]) + ew;

  return { latitude, longitude };
};
