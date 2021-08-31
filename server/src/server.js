// Core
import dg from 'debug'

// Application
import { Application } 	from './application/Application.js'

// Server
import { Express } 		from './infrastructure/servers/Express.js'

// Database
import { Mongoose } 	from './infrastructure/databases/mongodb/Mongoose.js'

// Logger
import { Logger } 		from './infrastructure/loggers/Logger.js'

// Auth
import { Auth } 		from './infrastructure/auth/Auth.js'

// Stores
import { MongoStore } 	from './infrastructure/stores/sessions/MongoStore.js'

// Debug
const debug = dg('app:start')

try {
	const app = new Application({
		Server:			Express,
		Database:		Mongoose,
		Logger:			Logger,
		Auth:			Auth,
		SessionStore:	MongoStore
	})

	await app.start()

	async function closeGracefully() {
		await app.close()
		process.exit()
	}

	process.on('SIGINT', closeGracefully)
	process.on('SIGTERM', closeGracefully)

	debug('Server is started.')

} catch (error) {
	debug(error)

	debug('Server is stopped.')
	process.exit(0)
}