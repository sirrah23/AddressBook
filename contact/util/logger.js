const {createLogger, format, transports} = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'contact' },
    transports: []
  });

if(process.env.mode === "test"){
  //Don't want to see log messages when tests are running...
  logger.add(new transports.File({filename: '/dev/null'})) 
} else {
  logger.add(new transports.Console())
}

module.exports = logger