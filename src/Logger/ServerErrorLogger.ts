import winston from 'winston';
import path from 'path';

const pathToLogFile = path.resolve(
  __dirname,
  '..',
  '..',
  'LogOutput',
  'log.log',
);

const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    }),
    new winston.transports.File({
      filename: pathToLogFile,
      format: winston.format.json(),
    }),
  ],
});

export default logger;
