// Domain
import { Events } from '../../Events.js'
import { Integration } from '../../../domain/entities/Integration.js'

// Load Integration
import { Load } from '../../core/integrations/Load.js'

// Snippets
import { Mapping } from '../../core/snippets/Mapping.js'

/**
 * @class CreateIntegration
 * @extends {Events}
 */
class CreateIntegration extends Events {
	constructor({ integrationRepository, snippetRepository, providerRepository, userRepository }) {
		super()
		this.types = ['CREATED', 'SUCCESS', 'ERROR']
		this.integrationRepository = integrationRepository
		this.snippetRepository = snippetRepository
		this.providerRepository = providerRepository
		this.userRepository = userRepository
	}

	/**
	 * Create an integration.
	 *
	 * @param {*} { id, name, provider, credentials }
	 * @param {*} user
	 * @returns {*}
	 */
	async execute({ id, name, provider, credentials }, user = null) {
		const { CREATED, SUCCESS, ERROR } = this.types

		try {
			/**
			 * Check integration in database.
			 */
			const data = await this.integrationRepository.getById(id)

			if (data) {
				this.emit(SUCCESS, new Integration(data))

				return true
			}

			/**
			 * Init integration.
			 */
			const prepare = new Load(provider, credentials)
			const integration = await prepare.load()

			const { username } = await integration.user()
			const { etag, getSnippets } = await integration.list()
			const { snippets } = await getSnippets()

			/**
			 * Use a mapping.
			 */
			const mapped = new Mapping(provider).from(snippets)

			/**
			 * Save to database.
			 */
			const { insertedIds } = await this.snippetRepository.createMany(mapped)
			const created = await this.integrationRepository.createById({ id, name, username, credentials, provider, etag }, insertedIds)

			/**
			 * Add integration to user.
			 */
			if (user) {
				await this.userRepository.addIntegrationId(user, created)
			}

			this.emit(CREATED, new Integration(created))

		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}


export { CreateIntegration }