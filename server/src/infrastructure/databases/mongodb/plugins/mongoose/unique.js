// Core
import dg from 'debug'

// Error
import { UniqueError } from '../../../../../errors/error.js'

const debug = dg('db:error')

function isUniqueError(error) {
	return error && (error.name === 'BulkWriteError' || error.name === 'MongoError')
				 && (error.code === 11000 || error.code === 11001)
}

export function unique(schema, options) {
	schema.post(['save', 'create', 'update', 'insert', 'insertMany'], (error, _, next) => {
		if (isUniqueError(error)) {
			debug(error)
			const key = error.message.match(/(\w*index:\s)(\w*)(_\S)/)[2]
			const message = options && options[key]

			throw new UniqueError(message || 'This data already exists.')
		} else {
			next(error)
		}
	})
}