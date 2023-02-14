const express = require('express');
const router = express.Router();

// this counter is stored in server RAM
let nodeCounter = 0;

router.get('/', (req, res) => {
  res.send(nodeCounter.toString());
});

router.get('/increment', (req, res) => {
  nodeCounter += 1;
  res.send(nodeCounter.toString());
});

router.get('/decrement', (req, res) => {
  nodeCounter -= 1;
  res.send(nodeCounter.toString());
});

router.get('/reset', (req, res) => {
  nodeCounter = 0;
  res.send(nodeCounter.toString());
});

module.exports = router;