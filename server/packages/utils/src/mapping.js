const { isArray, isPlainObject, isArrayBuffer, isFunction } = require('./data-types')

function mapping(schema, data) {
	return  Object.entries(schema)
		.reduce((accumulate, [key, value]) => {

			if (isPlainObject(value)) {
				return mappingPlainObject(accumulate, [key, value], data)
			}

			if (isArray(value)) {
				return mappingArray(accumulate, [key, value], data)
			}

			const alias = value.slice(1,-1)

			if (isArrayBuffer(data[alias])) {
				return mappingArrayBuffer(accumulate, [key, value], data)
			}

			accumulate[key] = data[alias]

			return accumulate

	}, Object.create(null))
}

function mappingPlainObject(accumulate, [key, value], data) {

	if (value.key && value.type) {
		const { change, type } = value
		const alias = value.key.slice(1,-1)
		const entry = data[alias]
		const entryType = entry && entry.constructor.name

		switch (true) {
			case isFunction(change) && entryType === type:
				accumulate[key] = value.change(entry)
			break

			case isArray(change) && entryType === type:
				accumulate[key] = new Map(change).get(entry)
			break

			default:
				accumulate[key] = data[key]
		}

		return accumulate
	}

	if (typeof key === 'string' && key.startsWith('\u007B') && key.endsWith('\u007D')) {
		const alias = key.slice(1,-1)

		for (const [k] of Object.entries(data)) {
			const a = data[k][alias]
			accumulate[a] = mapping(value, data[k])
		}

		return accumulate
	}

	accumulate[key] = mapping(value, data[key])

	return accumulate
}

function mappingArray(accumulate, [key, value], data) {

	const entries = isPlainObject(data[key]) ? Object.values(data[key]) : data[key]

	accumulate[key] = [...entries].map(item => mapping(value[0], item))

	return accumulate
}

function mappingArrayBuffer(accumulate, [key, value], data) {

	const alias = value.slice(1,-1)

	accumulate[key] = Buffer.from(data[alias]).toString('base64')

	return accumulate
}

module.exports = {
	mapping
}