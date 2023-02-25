import axios from 'axios';
import config from '../../config';

export const updateWeatherService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/weather`);
  return { result: response.data };
};

export default { updateWeatherService }