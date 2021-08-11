
/**
 * Structure entities of a user.
 */

export class User {
	constructor({ id = null, name, photo, auth, integrations = [] }){
		this.id = id
		this.name = name
		this.photo = photo
		this.auth = auth
		this.integrations = integrations
	}
}
