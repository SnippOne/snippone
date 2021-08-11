// Domain
import { Events } from '../../Events.js'
import { Snippet } from '../../../domain/entities/Snippet.js'

export class GetSnippet extends Events {
	constructor({ snippetRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
	}

	execute(id) {
		const { SUCCESS, ERROR } = this.types

		try {
			const { data } = this.snippetRepository.get(id)
			this.emit(SUCCESS, new Snippet(data))
		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}