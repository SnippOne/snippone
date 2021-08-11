import { createTerminus } from '@godaddy/terminus'

function beforeShutdown() {
	return new Promise(resolve => setTimeout(resolve, 5000))
}

function healthCheck() {
	return Promise.resolve()
}

const options = {
	signal: 'SIGINT',
	healthChecks: {
		'/healthcheck': healthCheck
	},
	beforeShutdown
}

const gracefulShutdown = server => createTerminus(server, options)

export { gracefulShutdown }