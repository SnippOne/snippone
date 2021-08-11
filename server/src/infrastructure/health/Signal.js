
const types = {
	SIGTERM: 'SIGTERM'
}

const Signal = (type, handler) => {
	const signal = types[type]

	if (!signal) {
		throw new Error(`Type of signal "${type}" is not accessible.`)
	}

	process.on(signal, handler)
}

Signal.types = Object.freeze(types)

export { Signal }