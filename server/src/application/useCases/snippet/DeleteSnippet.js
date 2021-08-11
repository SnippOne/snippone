// Domain
import { Events } from '../../Events.js'
import { Snippet } from '../../../domain/entities/Snippet.js'

export class DeleteSnippet extends Events {
	constructor({ snippetRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
	}

	execute(id, integration) {
		const { SUCCESS, ERROR } = this.types

		try {
			const { data } = this.snippetRepository.delete(id, integration)
			this.emit(SUCCESS, new Snippet(data))
		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}