// Core
import status from 'http-status'

// Errors
import { BaseError } from '../../../errors/error.js'

// Domain
import { Events } from '../../Events.js'
import { Integration } from '../../../domain/entities/Integration.js'
import { Snippet } from '../../../domain/entities/Snippet.js'

// Load Integration
import { Load } from '../../core/integrations/Load.js'

// Snippets
import { Mapping } from '../../core/snippets/Mapping.js'


export class GetIntegrationsAll extends Events {

	constructor({ snippetRepository, integrationRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
		this.integrationRepository = integrationRepository
	}

	async execute(data = []) {
		const { SUCCESS, ERROR } = this.types

		try {
			/**
			 * Check integration in database.
			 */
			const data = await this.integrationRepository.getAll()

			if (data) {
				const prepare = data.map(({ id, name, provider, credentials }) => (async () => {
					/**
					 * Init integration.
					 */
					const prepare = new Load(provider.id, credentials)
					const integration = await prepare.load()

					const { getSnippets } = await integration.list()
					const { snippets } = await getSnippets()

					/**
					 * Use a mapping.
					 */
					const mapped = new Mapping(provider.id).from(snippets)

					return  new Integration({ id, name, snippets: new Snippet(mapped) })
				})())


				this.emit(SUCCESS, await Promise.all(prepare))

			} else {
				this.emit(ERROR, new BaseError('That instegrations not found.', status.NOT_FOUND))
			}

		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}