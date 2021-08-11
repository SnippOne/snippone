/**
 * Structure entities of an integration.
 */

export class Integration {
	constructor(entities = {}){

		if (entities && typeof entities === 'object' && entities.constructor === Array) {
			return entities.map(entity => new Integration(entity))
		}

		const { id = null, name, owner, provider, credential, snippets = [] } = entities

		this.id = id
		this.name = name
		this.owner = owner
		this.credential = credential
		this.provider = provider
		this.snippets = snippets
	}
}