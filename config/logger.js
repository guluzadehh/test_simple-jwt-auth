const winston = require('winston')

const { combine, timestamp, printf } = winston.format

const myFormat = printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level}: ${message}`
})

const logger = winston.createLogger({
  format: combine(
    timestamp(), myFormat
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
})

module.exports = logger
