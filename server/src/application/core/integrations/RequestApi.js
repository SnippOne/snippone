// Core
import fetch from 'node-fetch'
import { URL } from 'url'

// Erorrs
import { BaseError } from '../../../errors/error.js'


/**
 * @class RequestApi
 */
class RequestApi {

	constructor(apiUrl = String(), options = {}) {
		this.apiUrl = apiUrl
		this.options = options
	}

	/**
	 * HTTP request.
	 *
	 * @async
	 * @param {string} url - Basic api URL or full URL.
	 * @param {Object} props - Parameters of a path.
	 * @param {Object} requestHeaders - Override default headers.
	 * @returns
	 */
	async request(url = String(), props = null, { body: requestBody, headers: requestHeaders } = { body: null, headers: null }) {

		const isFormData = requestHeaders['Content-Type'].indexOf('multipart/form-data') !== -1

		const options = {
			...this.options,
			headers: {
				...this.options.headers,
				...requestHeaders
			},
			body: isFormData ? requestBody : JSON.stringify(requestBody)
		}

		const { method, path } = this.format(url, props)
		const response = await fetch(path, { method, ...options })

		const { ok, statusText, status, headers } = response

		const isJsonData = headers.get('content-type').indexOf('application/json') !== -1

		const data = isJsonData ? await response.json() : await response.text()

		if (!ok) {
			const { message } = data

			const error = message && message.error ? message.error : statusText

			throw new BaseError(error, status)
		}

		return { status, headers, data }
	}

	/**
	 * Format a URL with props.
	 *
	 * @param {string} url
	 * @param {Object} props
	 * @returns {*}
	 */
	format(url, props){

		if (url.indexOf('http') !== 0) {
			const prepare = props ? Object.keys(props).reduce((data, value) => data.replace(`{${value}}`, props[value]), url) : url

			const [ method, part ] = prepare.split(' ', 2)
			const path = new URL([ this.apiUrl, part ].join(''))

			return { method, path }
		}

		return { method: 'GET', path: new URL(url) }
	}
}

export { RequestApi }