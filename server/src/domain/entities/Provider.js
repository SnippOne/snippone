/**
 * Structure entities of a provider.
 */

export class Provider {
	constructor({ id = null, name, credential, url }){
		this.id = id
		this.name = name
		this.credential = credential
		this.url = url
	}
}
