// Core
import { Router } from 'express'

// Controllers
import { ValidatorController } from '../ValidatorController.js'
import { AuthController } from '../AuthController.js'
import { IntegrationController } from './IntegrationController.js'
import { SnippetController } from './SnippetController.js'

// Validation
import { integration } from '../../infrastructure/validation/integration.js'
import { snippet } from '../../infrastructure/validation/snippet.js'

export const AppRoutes = (repositories) => {
	const router = Router({ mergeParams: true })

	const { isAuth } = AuthController(repositories)

	const {
		getIntegration,
		getIntegrationsAll,
		createIntegration,
		updateIntegration,
		deleteIntegration
	} = IntegrationController(repositories)

	const {
		getSnippet,
		createSnippet,
		updateSnippet,
		deleteSnippet
	} = SnippetController(repositories)

	const { isValidate } = ValidatorController()

	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     Integration:
	 *       type: object
	 *       properties:
	 *         name:
	 *           type: string
	 *           description: The integration's name.
	 *           example: Github
	 */
	router.route('/integration')
		.get(	[ isAuth ], getIntegration)
		.post(	[ isAuth, isValidate(integration) ], createIntegration)
		.put(	[ isAuth, isValidate(integration) ], updateIntegration)
		.delete([ isAuth ], deleteIntegration)

	router.route('/integration/all')
		.get(	[ isAuth ], getIntegrationsAll)

	router.route('/snippet')
		.get(	[ isAuth ], getSnippet)
		.post(	[ isAuth, isValidate(snippet) ], createSnippet)
		.put(	[ isAuth, isValidate(snippet) ], updateSnippet)
		.delete([ isAuth ], deleteSnippet)

	return router
}
