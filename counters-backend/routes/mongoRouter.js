const express = require('express');
const router = express.Router();
const config = require('../utils/config');

const initialMongoCounter = 33;

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
try {
  mongoose.connect(config.MONGO_URL);
} catch (error) {
  console.log(error);
}

const counterSchema = new mongoose.Schema({
  mongoCounter: Number
});

const Counter = mongoose.model('Counters', counterSchema);

const checkOrInitCounter = async () => {
  const existingCounter = await Counter.findOne({mongoCounter: {$exists:true}});
  if (!existingCounter) {
    const mongoCounter = new Counter({ mongoCounter: initialMongoCounter });
    mongoCounter.save();
    return mongoCounter;
  }
  return existingCounter;
};

checkOrInitCounter();

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