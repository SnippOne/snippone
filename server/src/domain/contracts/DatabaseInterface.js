
export class DatabaseInterface {
	constructor(){
		this.userRepository = null,
		this.providerRepository = null,
		this.integrationRepository = null
	}
	async connect() {
		throw new Error('Error method is not implemented.')
	}
}