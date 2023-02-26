import axios from 'axios';
import config from '../../config';

export const updateWeatherService = async (coordinates) => {
  console.log('in service', coordinates);
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/weather`, { params: { coordinates } });
  return { result: response.data };
};

export default { updateWeatherService }