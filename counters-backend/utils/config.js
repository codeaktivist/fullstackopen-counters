require('dotenv').config();

const ENV = process.env.NODE_ENV || 'unset';

const { PORT, REDIS_URL, MONGO_URL } = ENV === 'production'
  ? {
    PORT: process.env.PORT_PROD || 5001, // Fallback Prod Port if unset
    REDIS_URL: process.env.REDIS_URL_PROD || 'unset prod redis url',
    MONGO_URL: process.env.MONGO_URL_PROD || 'unset prod mongo url'
  }
  : {
    PORT: process.env.PORT_DEV || 3001, // Fallback Prod Port if unset
    REDIS_URL: process.env.REDIS_URL_DEV || 'unset dev redis url',
    MONGO_URL: process.env.MONGO_URL_DEV || 'unset dev mongo url'
  };

module.exports = { ENV, PORT, REDIS_URL, MONGO_URL };