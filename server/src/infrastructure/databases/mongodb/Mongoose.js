// Core
import config from 'config'
import mongoose from 'mongoose'
import dg from 'debug'

// Repositories
import { UserRepository } 			from './repositories/UserRepository.js'
import { ProviderRepository } 		from './repositories/ProviderRepository.js'
import { IntegrationRepository } 	from './repositories/IntegrationRepository.js'
import { SnippetRepository } 		from './repositories/SnippetRepository.js'

//Services
import { DatabaseInterface } from '../../../domain/contracts/DatabaseInterface.js'

// Debug
const debug = dg('db:connection')

export class Mongoose extends DatabaseInterface {
	static connection
	static db
	/**
	 * Creates an instance of MongooseLoader.
	 */
	constructor(options = {}) {
		if (Mongoose.db) {
			return Mongoose.db
		}
		super()

		Mongoose.db = this

		this.options = options
		this.repositories = {
			userRepository: 		new UserRepository(),
			providerRepository: 	new ProviderRepository(),
			integrationRepository: 	new IntegrationRepository(),
			snippetRepository:	 	new SnippetRepository()
		}
	}

	async connect() {
		const mongooseOptions = {
			promiseLibrary: 	global.Promise,
			poolSize: 			10,
			keepAlive: 			30000,
			connectTimeoutMS: 	1000,
			useNewUrlParser: 	true,
			useFindAndModify: 	false,
			useCreateIndex: 	true,
			useUnifiedTopology: true,
			...this.options
		}

		mongoose.connection.on('error', error => {
			debug(error)
		})
		mongoose.connection.once('open', () => {
			debug(`Database connection to ${config.databaseUrl} is successfully completed.`)
		})

		await mongoose.connect(config.databaseUrl, mongooseOptions)

		Mongoose.connection = mongoose.connection
	}
}