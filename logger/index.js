const winston = require('winston')
const { format } = winston
const logger = winston.createLogger({
  level: 'warn',
  transports: [
    new winston.transports.Console({
      level: 'verbose',
      format: winston.format.prettyPrint(log => log.message)
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' })
  ]
})
module.exports = logger
