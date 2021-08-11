export const snippet = {
	type: 'object',
	properties: {
		integration: {
			type:	'object',
			properties: {
				id: {
					type: 'string'
				}
			}
		},
		title: {
			type:		'string',
			minLength:	3,
		},
		status: {
			type: 'boolean'
		},
		files: {
			type:	'array',
			items: {
				type: 'object',
				properties: {
					filename: {
						type: 'string'
					},
					type: {
						type: 'string'
					},
					mode: {
						type: 'string'
					},
					content: {
						type: 'string'
					}
				}
			}
		}
	},
	required:				[ 'title', 'status', 'files', 'integration' ],
	additionalProperties:	true,
}
