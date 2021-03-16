import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '19878712-8b5821339c38877bcf5918ddb';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getImages = async ({ q, page }) => {
  try {
    const { data } = await axios.get('', {
      params: { q, page },
    });
    return data.hits;
  } catch (error) {
    console.log('error', { error });
    return [];
  }
};

export default getImages;
