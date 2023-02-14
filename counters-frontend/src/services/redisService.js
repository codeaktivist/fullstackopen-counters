import axios from 'axios';

const baseUrl = '/api/redis';

const getCounter = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const incrementCounter = async () => {
  const response = await axios.get(`${baseUrl}/increment`);
  return response.data;
};

const decrementCounter = async () => {
  const response = await axios.get(`${baseUrl}/decrement`);
  return response.data;
};

const resetCounter = async () => {
  const response = await axios.get(`${baseUrl}/reset`);
  return response.data;
};

const redisServices = {
  getCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
};

export default redisServices;