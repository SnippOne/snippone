/**
 * Structure entities of a provider.
 */

export class Provider {
	constructor({ id = null, name, credentials, url }){
		this.id = id
		this.name = name
		this.credentials = credentials
		this.url = url
	}
}
