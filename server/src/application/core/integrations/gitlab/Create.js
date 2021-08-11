// Api
import { Api } from './Api.js'

// Interfaces
import { IntegrationInterface } from '../../../../domain/contracts/app/IntegrationInterface.js'

export class Create extends IntegrationInterface {

	constructor({ token }){
		super()
		this.api = new Api({ token })
	}

	async user() {
		const { data } = await this.api.getUser()

		if (!data) {
			return new Error('User unavailable.')
		}

		const { username } = data

		return { username }
	}

	async get(id) {
		const { data } = await this.api.getSnippet(id)

		const { snippet } = await this.snippet(data)

		return { snippet }
	}

	async create({ title, status, description, files }) {
		const { data } = await this.api.createSnippet({ title, status, description, files })

		return { data }
	}

	async update(id, { description, files }) {
		const { data } = await this.api.updateSnippet(id, { description, files })

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

	async snippet(data){
		const prepare = (async () => {
			const { files } = await this.files(data.id, data.files)

			return { ...data, files }
		})()

		const snippet = await Promise.resolve(prepare)

		return { snippet }
	}

	async snippets(data){
		const prepare = data.map(snippet => (async () => {
			const { files } = await this.files(snippet.id, snippet.files)

			return { ...snippet, files }
		})())

		const snippets = await Promise.all(prepare)

		return { snippets }
	}

	async files(id, data) {
		const prepare = data.map(file => (async () => {
			const spliter = file.raw_url.split('/')
			const reference = spliter[spliter.length - 2]

			const { path } = file
			const { data } = await this.api.getFile({ id, reference, path })

			return { ...file, content: data }
		})())

		const files = await Promise.all(prepare)

		return { files }
	}
}