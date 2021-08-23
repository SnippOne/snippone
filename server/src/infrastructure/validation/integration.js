import { integrations } from '../configurations/integrations.config.js'

export const integration = {
	type: 'object',
	properties: {
		id: {
			type:		'string',
			minLength:	3,
			maxLength:	16,
		},
		name: {
			type:		'string',
			minLength:	3,
		},
		credentials: {
			type: 'object',
			items: {
				type:	'string',
				enum:	['token', 'username', 'password']
			}
		},
		owner: {
			type: 'string'
		},
		provider: {
			type: 'string',
			enum: Object.keys(integrations)
		},
		snippets: {
			type: 'array'
		}
	},
	required:				[ 'id', 'name', 'provider', 'credentials'],
	additionalProperties:	true,
}
