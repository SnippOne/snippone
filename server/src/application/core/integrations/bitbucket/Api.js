// Core
import FormData from 'form-data'

// Request
import { RequestApi } from '../RequestApi.js'

// Configuration
import { integrations } from '../../../../infrastructure/configurations/integrations.config.js'

export class Api {

	constructor({ username, password }) {
		const credential = Buffer.from(`${username}:${password}`).toString('base64')

		const request = new RequestApi(integrations.bitbucket.apiUrl, {
			headers: {
				"Authorization": `Basic ${credential}`,
				"Content-Type": "application/json"
			}
		})

		this.request = request.request.bind(request)
	}

	async getUser() {
		const { data } = await this.request('GET /user')

		return { data }
	}

	async getSnippetsList(username) {
		const { headers, data } = await this.request('GET /snippets/{username}', { username })

		return { headers, data }
	}

	async getSnippet(username, id) {
		const { data } = await this.request('GET /snippets/{username}/{id}', { username, id })

		return { data }
	}

	async createSnippet({ title, is_private, files }) {
		const body = new FormData()

		body.append('title', title)
		body.append('is_private', `${is_private}`)

		const values = Object.values(files)

		if (values.length !== 0) {
			let i = 0
			while (i < values.length) {
				body.append('file', Buffer.from(values[i].content, 'utf-8'), { name: 'file', contentType: 'plain/text', filename: values[i].filename })
				i++
			}
		}

		const headers = body.getHeaders()

		const { data } = await this.request('POST /snippets', null, { body, headers: {'Content-Type': headers['content-type'] } })

		return { data }
	}

	async updateSnippet({ username, id }, body) {
		const { data } = await this.request('PUT /snippets/{username}/{id}', { username, id }, { body })

		return { data }
	}

	async deleteSnippet(username, id) {
		const { status } = await this.request('DELETE /snippets/{username}/{id}', { username, id })

		return { status }
	}

	async getFile({ username, id, path }){
		const { data } = await this.request('GET /snippets/{username}/{id}/files/{path}', { username, id, path },  { headers: { "Content-Type": "text/plain" } })

		return { data }
	}

	async getByUrl(url) {
		const { data } = await this.request(url)

		return { data }
	}
}