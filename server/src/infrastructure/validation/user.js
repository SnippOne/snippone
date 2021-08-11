export const user = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
		},
		auth: {
			type:	'string',
			enum:	['google', 'github']
		},
		name: {
			type:		'string',
			minLength:	3,
		},
		photo: {
			type: 'string',
		}
	},
	required: [ 'id', 'auth', 'name', 'photo' ],
	additionalProperties: true,
}
