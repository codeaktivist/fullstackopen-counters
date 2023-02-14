const express = require('express');
const router = express.Router();

const ip = require('ip');

const version = new Date();

router.get('/env', (req, res) => {
  res.send(process.env.NODE_ENV.toString());
});

router.get('/ip', (req, res) => {
  res.send(ip.address());
});

router.get('/version', (req, res) => {
  res.send(version.toString());
});

module.exports = router;