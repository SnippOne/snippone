export function getMethodPath (path, obj) {
	return path.split('.').reduce((o, i) => o[i], obj)
}