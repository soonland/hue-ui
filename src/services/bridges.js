import axios from 'axios';
import config from '../../config';

export const getBridgesService = async () => {
  const {
    api: { baseUrl, endpoint },
  } = config;
  const response = await axios.get(`${baseUrl}${endpoint}/bridges`);
  console.log(response);
  return { result: response.data };
};

export default { getBridgesService };
