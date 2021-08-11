import { randomUUID } from 'crypto'

export function hash(schema) {
	if (!schema.options.hash) {
		return false
	}

	schema.add({
		hash: {
			type: String,
		},
	})

	schema.pre('save', function(next) {
		this.hash = randomUUID()
		next()
	})
}