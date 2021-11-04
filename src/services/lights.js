import axios from 'axios';
import config from '../../config';

export const getLightsService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/lights`);
  return { result: response.data };
};

export const setStateService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/lights/${id}`, data);
  return { result: response.data };
};

export default { getLightsService, setStateService };
