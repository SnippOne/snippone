// Domain
import { Events } from '../../Events.js'
import { Snippet } from '../../../domain/entities/Snippet.js'

// Load Integration
import { Load } from '../../core/integrations/Load.js'

// Snippets
import { Mapping } from '../../core/snippets/Mapping.js'

export class CreateSnippet extends Events {

	constructor({ snippetRepository, integrationRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
		this.integrationRepository = integrationRepository
	}

	async execute({ title, status, files }, { id }) {
		const { SUCCESS, ERROR } = this.types

		try {
			const { provider, credentials } = await this.integrationRepository.getById(id)

			/**
			 * Use a mapping.
			 */
			const mapping = new Mapping(provider.id)
			const mapped = mapping.to({ title, status, files })

			/**
			 * Init integration.
			 */
			const prepare = new Load(provider.id, credentials)
			const integration = await prepare.load()

			const { snippet } = await integration.create(mapped)

			/**
			 * Use a mapping.
			 */
			const created = mapping.from(snippet)

			const data = await this.snippetRepository.createById(created)

			if (integration) {
				await integrationRepository.addSnippetId(integration, data)
			}

			this.emit(SUCCESS, new Snippet(created))

		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}