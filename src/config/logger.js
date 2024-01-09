const winston = require('winston')

const format = winston.format

const myFormat = format.printf(({ timestamp, level, message, stack }) => {
  return `[${timestamp}] ${level}: ${message}\n${stack || ''}`
})

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    myFormat,
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
})

module.exports = logger
