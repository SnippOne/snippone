#!/usr/bin/env node

// Core
import dg from 'debug'

// Infrastructure
import { Mongoose } from './infrastructure/databases/mongodb/Mongoose.js'

const debug = dg('db:error')

try {
	const database = new Mongoose()

	await database.connect()

	await import('./infrastructure/databases/mongodb/migrations/index.js')

} catch (error) {
	debug(error)

} finally {
	process.exit(0)
}

// docker exec -it express-server-development /bin/sh

