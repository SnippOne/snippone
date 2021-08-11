import dg from 'debug'

// Core
import status from 'http-status'

const debug = dg("error:error")

export const ErrorController = () => ({
	errorsNoRouteHandler(req, res, next) {
		res.status(status.NOT_FOUND).json({ error: 	`${req.originalUrl} is not found.` })
	},
	errorsHandler(error, req, res, next) {
		debug(error)
		res.status(error.status || status.INTERNAL_SERVER_ERROR).json({ error: error.message })
	}
})