// Request
import { RequestApi } from '../RequestApi.js'

// Configuration
import { integrations } from '../../../../infrastructure/configurations/integrations.config.js'

export class Api {

	constructor({ token }) {
		const request = new RequestApi(integrations.gitlab.apiUrl, {
			headers: {
				'Content-Type': 	'application/json',
				'PRIVATE-TOKEN':	token
			}
		})

		this.request = request.request.bind(request)
	}

	async getUser() {
		const { data } = await this.request('GET /user')

		return { data }
	}

	async getSnippetsList() {
		const { headers, data } = await this.request('GET /snippets')

		return { headers, data }
	}

	async getSnippet(id) {
		const { data } = await this.request('GET /snippets/{id}', { id })

		return { data }
	}

	async createSnippet(body) {
		const { data } = await this.request('POST /snippets', null, { body })

		return { data }
	}

	async updateSnippet(id, body) {
		const { data } = await this.request('PUT /snippets/{id}', { id }, { body })

		return { data }
	}

	async deleteSnippet(id) {
		const { status } = await this.request('DELETE /snippets/{id}', { id })

		return { status }
	}

	async getFile({ id, reference, path }){
		const { status, headers, data } = await this.request('GET /snippets/{id}/files/{reference}/{path}/raw', { id, reference, path }, { headers: { "Content-Type": "text/plain" } })

		return { status, headers, data }
	}

	async getByUrl(url) {
		const { status, headers, data } = await this.request(url)

		return { status, headers, data }
	}
}