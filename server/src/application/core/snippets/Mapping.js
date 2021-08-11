// Core
import utils from '@snippone/utils'

// Config
import { integrations } from '../../../infrastructure/configurations/integrations.config.js'

export class Mapping {

	constructor(type) {
		this.type = type
	}

	from(data = []) {
		if (utils.isPlainObject(data)) {
			return utils.mapping(integrations[this.type].mapping.from, data)
		}

		return data.map(snippet => {
			return utils.mapping(integrations[this.type].mapping.from, snippet)
		})
	}

	to(data = []) {
		if (utils.isPlainObject(data)) {
			return utils.mapping(integrations[this.type].mapping.to, data)
		}

		return data.map(snippet => {
			return utils.mapping(integrations[this.type].mapping.to, snippet)
		})
	}

}