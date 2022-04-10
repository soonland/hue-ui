import axios from 'axios';
import config from '../../config';

export const getZonesService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/zones`);
  return { result: response.data };
};

export const setStateService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.post(`${baseUrl}${endpoint}/zones/${id}`, data);
  return { result: response.data };
};

export const addNewZone = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.post(`${baseUrl}${endpoint}/zones`, data);
  console.log('response :', response);
  return { result: response.data };
};

export const deleteService = async (data) => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const { id } = data;
  const response = await axios.delete(`${baseUrl}${endpoint}/zones/${id}`);
  return { result: response.data };
};

export default { getZonesService };
