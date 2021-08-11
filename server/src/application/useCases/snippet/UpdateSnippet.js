// Domain
import { Events } from '../../Events.js'
import { Snippet } from '../../../domain/entities/Snippet.js'

export class UpdateSnippet extends Events {
	constructor({ snippetRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
	}

	execute({ id, title, status, url, files }) {
		const { SUCCESS, ERROR } = this.types

			try {
				const { data } = this.snippetRepository.update({ id, title, status, url, files })
				this.emit(SUCCESS, new Snippet(data))
			} catch (error) {
				this.emit(ERROR, error)
			}
	}
}