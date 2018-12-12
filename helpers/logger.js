const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
	level: config.get('logger.level'),
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			silent: config.get('logger.file.enabled'),
			level: config.get('logger.file.level'),
			filename: config.get('logger.file.path'),
		}),
		new winston.transports.Console({
			silent: config.get('logger.console.enabled'),
			level: config.get('logger.console.level'),
		}),
	],
});

module.exports = logger;