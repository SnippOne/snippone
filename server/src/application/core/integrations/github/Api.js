// Core
import { Octokit } from '@octokit/core'

export class Api {

	constructor({ token }) {
		const { request } = new Octokit({ auth: token })

		this.request = request
	}

	async getUser() {
		const { data } = await this.request('GET /user')

		return { data }
	}

	async getSnippetsList() {
		const { headers, data } = await this.request('GET /gists')

		return { headers, data }
	}

	async getSnippet(gist_id) {
		const { data } = await this.request('GET /gists/{gist_id}', { gist_id })

		return { data }
	}

	async createSnippet({ description, public, files }) {
		const { data } = await this.request('POST /gists', { description, public, files })

		return { data }
	}

	async updateSnippet(gist_id, { description, public, files }) {
		const { data } = await this.request('PATCH /gists/{gist_id}', { gist_id, description, public, files })

		return { data }
	}

	async deleteSnippet(gist_id) {
		const { status } = await this.request('DELETE /gists/{gist_id}', { gist_id })

		return { status }
	}

	async getByUrl(url) {
		const { headers, data } = await this.request(url)

		return { headers, data }
	}
}


