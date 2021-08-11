// Api
import { Api } from './Api.js'

// Interfaces
import { IntegrationInterface } from '../../../../domain/contracts/app/IntegrationInterface.js'

export class Create extends IntegrationInterface {

	constructor({ username, password }) {
		super()
		this.api = new Api({ username, password })
		this.username = username
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
		const { data } = await this.api.getSnippet(this.username, id)

		const { snippet } = await this.snippet(data)

		return { snippet }
	}

	async create({ title, is_private, files }) {
		const { data } = await this.api.createSnippet({ title, is_private, files })
		const { snippet } = await this.snippet(data)

		return { snippet }
	}

	async update(id, { description, files }) {
		const username = this.username
		const { data } = await this.api.updateSnippet({ username,  id }, { description, files })

		return { data }
	}

	async delete(id) {
		const { status } = await this.api.deleteSnippet(this.username, id)

		return { status }
	}

	async list() {
		const { headers, data } = await this.api.getSnippetsList(this.username)
		const { etag } = headers
		const { values } = data

		return {
			etag,
			getSnippets: async () => await this.preload(values)
		}
	}

	async preload(data){
		const prepare = data.map(snippet => (async () => {

			const { data } = await this.api.getSnippet(this.username, snippet.id)

			return { ...data }
		})())

		const all = await Promise.all(prepare)

		const { snippets } = await this.snippets(all)

		return { snippets }
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
		const username = this.username
		const keys = Object.keys(data)

		const prepare = keys.map(path => (async () => {

			const { data } = await this.api.getFile({ username, id, path })

			return { filename: path, content: data }
		})())

		const files = await Promise.all(prepare)

		return { files }
	}
}