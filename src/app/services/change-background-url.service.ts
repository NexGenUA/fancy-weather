import { config } from '../../common/config';

const { FLICKR_KEY } = config;

export const changeBackground = async (tags) => {
  const apiUrl = new URL('https://www.flickr.com/services/rest/?method=flickr.photos.search');
  const response = await fetch(`${apiUrl}&api_key=${FLICKR_KEY}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`)
  const imagesList = await response.json();

  if (imagesList.stat === 'ok') {
    const photos = imagesList.photos.photo.filter(f => f.url_h && f.width_h > f.height_h);
    const idx = Math.floor(Math.random() * photos.length);
    return photos[idx].url_h;
  }
};
