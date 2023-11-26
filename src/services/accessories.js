import axios from 'axios';
import config from '../../config';

export const getAccessoriesService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/accessories`, { params: { type: 'hue' } });
  return { result: response.data };
};

export const setStateService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/accessories/${id}`, data, { params: { type: 'hue' } });
  return { result: response.data };
};

export const deleteService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/accessories/${id}`, data, { params: { type: 'hue' } });
  return { result: response.data };
};

export default { getAccessoriesService };
