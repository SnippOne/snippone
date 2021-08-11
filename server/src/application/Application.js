export class Application {
	constructor(dependencies){
		const { Auth, Server, Database } = dependencies
		this.auth = new Auth()
		this.database = new Database()
		this.server = new Server(dependencies)
	}

	async start(){
		await this.auth.start()

		if (this.database) {
			await this.database.connect()
		}

		await this.server.start()
	}
}