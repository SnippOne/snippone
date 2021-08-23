/**
 * Structure entities of a snippet.
 */

export class Snippet {
	constructor(entities = {}){

		if (entities && typeof entities === 'object' && entities.constructor === Array) {
			return entities.map(entity => new Snippet(entity))
		}

		const { id = null, title, status, files, created } = entities

		this.id = id
		this.title = title
		this.status = status
		this.files = files
		this.created = created
	}
}
