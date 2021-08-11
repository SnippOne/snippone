// Core
import status from 'http-status'

// Errors
import { BaseError } from '../../../errors/error.js'

// Domain
import { Events } from '../../Events.js'
import { Integration } from '../../../domain/entities/Integration.js'

// Load Integration
import { Load } from '../../core/integrations/Load.js'

// Snippets
import { Mapping } from '../../core/snippets/Mapping.js'


export class GetIntegration extends Events {

	constructor({ snippetRepository, integrationRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
		this.integrationRepository = integrationRepository
	}

	async execute(id) {
		const { SUCCESS, ERROR } = this.types

		try {
			/**
			 * Check integration in database.
			 */
			const data = await this.integrationRepository.getById(id)

			if (data) {
				const { provider, credential } = data

				/**
				 * Init integration.
				 */
				const prepare = new Load(provider.id, credential)
				const integration = await prepare.load()

				const { etag, getSnippets } = await integration.list()

				/**
				 * Checking integration for relevance.
				 */
				if (Object.is(etag, data.etag)) {
					this.emit(SUCCESS, new Integration(data))

					return true
				}

				const { snippets } = await getSnippets()

				/**
				 * Use a mapping.
				 */
				const mapped = new Mapping(provider.id).from(snippets)

				/**
				 * Save to database.
				 */
				const { updatedIds } = await this.snippetRepository.updateMany(mapped)
				const updated = await this.integrationRepository.updateById({ id, etag }, updatedIds)

				this.emit(SUCCESS, new Integration(updated))

			} else {
				this.emit(ERROR, new BaseError('The instegration with ID not found.', status.NOT_FOUND))
			}

		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}