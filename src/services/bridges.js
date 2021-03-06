import axios from 'axios';
import config from '../../config';

export const getBridgesService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/bridges`);
  return { result: response.data };
};

export const getSearchNewLightsService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/bridges/searchNewLights`);
  return { result: response.data };
};

export const getNewLightsService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/bridges/newLights`);
  return { result: response.data };
};

export default { getBridgesService, getSearchNewLightsService, getNewLightsService };
