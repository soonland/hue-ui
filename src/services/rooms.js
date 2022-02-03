import axios from 'axios';
import config from '../../config';

export const getRoomsService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/rooms`);
  return { result: response.data };
};

export const deleteService = async (id) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.delete(`${baseUrl}${endpoint}/rooms/${id}`);
  return { result: response.data };
};

export const setStateService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/rooms/${id}`, data);
  return { result: response.data };
};

export default { getRoomsService };
