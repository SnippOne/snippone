// Domain
import { Events } from '../../Events.js'
import { Integration } from '../../../domain/entities/Integration.js'

// Load Integration
import { Load } from '../../core/integrations/Load.js'

// Snippets
import { Mapping } from '../../core/snippets/Mapping.js'


export class UpdateIntegration extends Events {

	constructor({ integrationRepository, snippetRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.integrationRepository = integrationRepository
		this.snippetRepository = snippetRepository
	}

	async execute({ id, name, provider, credential }) {
		const { SUCCESS, ERROR } = this.types

			try {
				/**
				 * Init integration.
				 */
				const prepare = new Load(provider, credential)
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
				const { updatedIds } = await this.snippetRepository.updateMany(mapped)
				const updated = await this.integrationRepository.updateById({ id, name, username, provider, credential, etag }, updatedIds)

				this.emit(SUCCESS, new Integration(updated))

			} catch (error) {
				this.emit(ERROR, error)
			}
	}
}