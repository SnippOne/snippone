export const config = (() => {
	const environment = {
		BASE_URL: 		process.env.VUE_APP_BASE_URL,
		BASE_API_URL: 	process.env.VUE_APP_BASE_API_URL,
	}

	for (const [key, value] of Object.entries(environment)) {
		if (typeof value === 'undefined') {
			throw new Error(`Environment config ${key} is not defined.`)
		}
	}

	return environment
})()

