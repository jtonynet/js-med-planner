require('dotenv').config();

function _isEnabled(envVar) {
  return envVar === '1' || envVar === 'true';
}

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "timezone": process.env.DB_TIMEZONE,
    "logging": _isEnabled(process.env.DB_LOGGING,)
  },
  "test": {
    "username": process.env.DB_TEST_USER,
    "password": process.env.DB_TEST_PWD,
    "database": process.env.DB_TEST_NAME,
    "host": process.env.DB_TEST_HOST,
    "dialect": process.env.DB_TEST_DIALECT,
    "port": process.env.DB_TEST_PORT,
    "timezone": process.env.DB_TEST_TIMEZONE,
    "logging": _isEnabled(process.env.DB_TEST_LOGGING)
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "timezone": process.env.DB_TIMEZONE,
    "logging": _isEnabled(process.env.DB_LOGGING),
  }
};