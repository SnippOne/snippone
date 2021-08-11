import config 			from 'config'
import connectSession	from 'connect-mongodb-session'

export class MongoStore {

	constructor(session){

		const MongoSession = connectSession(session)

		const store = new MongoSession({
			uri:			config.databaseUrl,
			databaseName:	config.databaseName,
			collection:		config.databaseCollectionSession
		})

		return store
	}
}