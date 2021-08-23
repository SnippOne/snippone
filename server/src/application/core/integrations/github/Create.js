// Interfaces
import { IntegrationInterface } from '../../../../domain/contracts/app/IntegrationInterface.js'

// Api
import { Api } from './Api.js'

export class Create extends IntegrationInterface {

	constructor({ token }) {
		super()
		this.api = new Api({ token })
	}

	async user() {
		const { data } = await this.api.getUser()

		if (!data) {
			return new Error('User unavailable.')
		}

		const { login } = data

		return { username: login }
	}

	async get(id) {
		const { data } = await this.api.getSnippet(id)

		const { snippet } = await this.snippet(data)

		return { snippet }
	}

	async create(body) {
		const { data } = await this.api.createSnippet(body)

		return { data }
	}

	async update(id, body) {
		const { data } = await this.api.updateSnippet(id, body)

		return { data }
	}

	async delete(id) {
		const { status } = await this.api.deleteSnippet(id)

		return { status }
	}

	async list() {
		const { headers, data } = await this.api.getSnippetsList()

		const { etag } = headers

		return {
			etag,
			getSnippets: async () => await this.snippets(data)
		}
	}

	async snippet(data) {
		const prepare =(async () => {
			const { files } = await this.files(data.files)

			return { ...data, files }
		})()

		const snippet = await Promise.resolve(prepare)

		return { snippet }
	}

	async snippets(data) {
		const prepare = data.map(snippet => (async () => {
			const { files } = await this.files(snippet.files)

			return { ...snippet, files }
		})())

		const snippets = await Promise.all(prepare)

		return { snippets }
	}

	async files(data) {
		const values = Object.values(data)

		const prepare = values.map(file => (async () => {
			const { data } = await this.api.getByUrl(file.raw_url)

			const content = data

			return { ...file, content }
		})())

		const files = await Promise.all(prepare)

		return { files }
	}
}
