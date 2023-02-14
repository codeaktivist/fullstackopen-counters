const express = require('express');
const router = express.Router();

// this counter is stored in server RAM
let InitialNodeCounter = 11;

router.get('/', (req, res) => {
  res.send(InitialNodeCounter.toString());
});

router.get('/increment', (req, res) => {
  InitialNodeCounter += 1;
  res.send(InitialNodeCounter.toString());
});

router.get('/decrement', (req, res) => {
  InitialNodeCounter -= 1;
  res.send(InitialNodeCounter.toString());
});

router.get('/reset', (req, res) => {
  InitialNodeCounter = 0;
  res.send(InitialNodeCounter.toString());
});

module.exports = router;