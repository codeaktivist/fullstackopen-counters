const express = require('express');
const router = express.Router();
const config = require('../utils/config');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(config.MONGO_URL);

const counterSchema = new mongoose.Schema({
  mongoCounter: Number
});

const Counter = mongoose.model('Counters', counterSchema);

const initCounter = async () => {
  const findCounter = await Counter.findOne({mongoCounter: {$exists:true}});
  if (!findCounter) {
    const mongoCounter = new Counter({ mongoCounter: 0 });
    mongoCounter.save();
    return mongoCounter;
  }
  return findCounter;
};

initCounter();

const getCounter = async () => {
  return await Counter.findOne({mongoCounter: {$exists:true}});
};

router.get('/', async (req, res) => {
  const counter = await getCounter();
  res.send(counter.mongoCounter.toString());
});

router.get('/increment', async (req, res) => {
  const counter = await getCounter();
  counter.mongoCounter += 1;
  const response = await counter.save();
  res.send(response.mongoCounter.toString());
});

router.get('/decrement', async (req, res) => {
  const counter = await getCounter();
  counter.mongoCounter -= 1;
  const response = await counter.save();
  res.send(response.mongoCounter.toString());
});

router.get('/reset', async (req, res) => {
  const counter = await getCounter();
  counter.mongoCounter = 0;
  const response = await counter.save();
  res.send(response.mongoCounter.toString());
});

module.exports = router;