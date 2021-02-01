const winston = require('winston');
const winstondb = require('winston-mongodb');
const dotenv = require('dotenv')

dotenv.config();

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(), //retirar para heroku
    new transports.MongoDB({
      level: 'info',
      db: process.env.DB_CONNECTION,
      collection: 'logs',
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: 'grade-api' }),
    format.timestamp(),
    myFormat
  ),
});

module.exports = { logger };
