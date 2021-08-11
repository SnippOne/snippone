// Core
import status from 'http-status'

export const RootController = (dependencies) => ({
	root(req, res, next) {
		return res.sendStatus(status.OK)
	}
})