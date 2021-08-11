// Core
import path		from 'path'
import config	from 'config'
import winston	from 'winston'

const { createLogger, format, transports } = winston

export class Logger {

	static get console(){
		const { combine, timestamp, printf } = format

		return createLogger({
			level:		'error',
			format:		combine(timestamp(), printf(info => `${info.timestamp} ${info.message}`)),
			transports: [
				new winston.transports.Console()
			]
		})
	}

	static get file(){
		const { combine, timestamp, printf } = format
		const filename = path.resolve(path.join(config.logger.path))

		return createLogger({
			level:		'error',
			format:		combine(timestamp(), printf(info => `${info.timestamp} ${info.message}`)),
			transports: [ new transports.File({ filename, level: 'error' }) ],
		})
	}
}
