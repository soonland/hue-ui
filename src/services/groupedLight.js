import axios from 'axios';
import config from '../../config';

export const getGroupedLightService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/groupedLight`);
  return { result: response.data };
};

export const setStateService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/groupedLight/${id}`, data);
  return { result: response.data };
};

export default { getGroupedLightService };
