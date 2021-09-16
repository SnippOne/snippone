// Core
import status 	from 'http-status'
import dg		from 'debug'

// Use Cases
import { GetIntegration } 		from '../../application/useCases/integration/GetIntegration.js'
import { GetIntegrationsAll } 	from '../../application/useCases/integration/GetIntegrationsAll.js'
import { CreateIntegration }	from '../../application/useCases/integration/CreateIntegration.js'
import { UpdateIntegration }	from '../../application/useCases/integration/UpdateIntegration.js'
import { DeleteIntegration }	from '../../application/useCases/integration/DeleteIntegration.js'

const debug = dg('router:integration')

export const IntegrationController = (dependencies) => ({

	async createIntegration(req, res, next) {
		debug(req.method, req.originalUrl)

		const { passport } = req.session
		const { profile } = passport.user

		const { id, name, provider, credentials } = req.body

		const integration = new CreateIntegration(dependencies)

		const { CREATED, SUCCESS, ERROR } = integration.types

		integration.on(CREATED, results => res.status(status.CREATED).json(results))
		integration.on(SUCCESS, results => res.status(status.OK).json(results))
		integration.on(ERROR, next)

		await integration.execute({ id, name, credentials, provider }, profile)
	},

	async getIntegration(req, res, next) {
		debug(req.method, req.originalUrl)

		const { id } = req.body

		const integration = new GetIntegration(dependencies)

		const { SUCCESS, ERROR } = integration.types

		integration.on(SUCCESS, results => res.status(status.OK).json(results))
		integration.on(ERROR, next)

		await integration.execute(id)
	},

	async getIntegrationsAll(req, res, next) {
		debug(req.method, req.originalUrl)

		const { id } = req.body

		const integration = new GetIntegrationsAll(dependencies)

		const { SUCCESS, ERROR } = integration.types

		integration.on(SUCCESS, results => res.status(status.OK).json(results))
		integration.on(ERROR, next)

		await integration.execute(id)
	},

	async updateIntegration(req, res, next) {
		debug(req.method, req.originalUrl)

		const { id, name, username, provider, credentials, snippets } = req.body

		const integration = new UpdateIntegration(dependencies)

		const { SUCCESS, ERROR } = integration.types

		integration.on(SUCCESS, results => res.status(status.OK).json(results))
		integration.on(ERROR, next)

		await integration.execute({ id, name, username, provider, credentials, snippets })
	},

	async deleteIntegration(req, res, next) {
		debug(req.method, req.originalUrl)

		const { passport } = req.session
		const { profile } = passport.user

		const { id } = req.body
        console.log("🚀 ~ file: IntegrationController.js ~ line 87 ~ deleteIntegration ~ req.body", req.body)

		const integration = new DeleteIntegration(dependencies)

		const { SUCCESS, ERROR } = integration.types

		integration.on(SUCCESS, results => res.status(status.NO_CONTENT).json(results))
		integration.on(ERROR, next)

		await integration.execute(id, profile)
	}
})