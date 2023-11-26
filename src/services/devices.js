import axios from 'axios';
import config from '../../config';

export const getDevicesService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/devices`, { params: { type: 'hue' } });
  return { result: response.data };
};

export const setStateService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/devices/${id}`, data, { params: { type: 'hue' } });
  return { result: response.data };
};

export default { getDevicesService };
