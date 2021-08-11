
function loader(path) {
	return new Promise((resolve, reject) => {
		try {
			resolve(require(path))
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	loader
}