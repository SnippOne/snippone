// Core
import path from 'path'

// Global ESM variables
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

/**
 * @class Load
 */
class Load {
	constructor(provider, credential) {
		this.provider = provider
		this.credential = credential
	}

	/**
	 * Loading integration for creation by provider type.
	 *
	 * @returns {*}
	 */
	async load(){
		try {
			const { Create } = await import(path.resolve( __dirname, './', this.provider, 'Create.js'))

			return new Create(this.credential)

		} catch (error) {
			if(error.code === 'ERR_MODULE_NOT_FOUND') {
				throw new Error(`This integration with "${this.provider}" is not supported.`)
			}

			throw new Error(error)
		}
	}
}

export { Load }