/**
 * Structure entities of an integration.
 */

export class Integration {
	constructor(entities = {}){

		if (entities && typeof entities === 'object' && entities.constructor === Array) {
			return entities.map(entity => new Integration(entity))
		}

		const { id = null, name, username, provider, credentials, snippets = [] } = entities

		this.id = id
		this.name = name
		this.username = username
		this.credentials = credentials
		this.provider = provider
		this.snippets = snippets
	}
}