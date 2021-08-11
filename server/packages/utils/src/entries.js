const { isArray, isPlainObject } = require('./data-types')

function compareEntriesKeys(first, last) {
	return first.every(props => Object.keys(last).includes(props))
}

function deepEntries(path, entry, spliter = '.') {
	return path.split(spliter).reduce((part, i) => part && part[i], entry)
}

function flipEntries(entries) {
	return Object.fromEntries(Object.entries(entries).map(([key, value]) => {
		return isPlainObject(value)
			? [key, flipEntries(value)] : isArray(value)
			? [key, value.map(entry => flipEntries(entry))] : [value, key]
	}))
}

function lineEntriesContent(content, lines = 10) {
	return content.split('\n').slice(0, lines).join('\n')
}

module.exports = {
	compareEntriesKeys,
	deepEntries,
	flipEntries,
	lineEntriesContent
}