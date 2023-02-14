const express = require('express');
const router = express.Router();
const config = require('../utils/config');

const initialRedisCounter = 0;

const redis = require('redis');
const redisClient = redis.createClient({
  url: config.REDIS_URL
});

redisClient.on('error', err => console.log('Redis Client Error ', err));
redisClient.connect();

const checkOrInitCounter = async () => {
  const existingCounter = await redisClient.get('counter-fso');
  if (!existingCounter) {
    redisClient.set('counter-fso', initialRedisCounter);
    return initialRedisCounter;
  }
  return existingCounter;
};

checkOrInitCounter();

const getCounter = () => {
  return redisClient.get('counter-fso');
};

router.get('/', async (req, res) => {
  const counter = await getCounter();
  res.send((counter || 0).toString());
});

router.get('/increment', async (req, res) => {
  const counter = await getCounter();
  await redisClient.set('counter-fso', Number(counter) + 1);
  res.send((Number(counter) + 1).toString());
});

router.get('/decrement', async (req, res) => {
  const counter = await getCounter();
  await redisClient.set('counter-fso', Number(counter) - 1);
  res.send((Number(counter) - 1).toString());
});

router.get('/reset', async (req, res) => {
  await redisClient.set('counter-fso', 0);
  res.send('0');
});

module.exports = router;