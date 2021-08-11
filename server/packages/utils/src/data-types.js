
// Types with typeof

function getObjectType(value) {
	return Object.prototype.toString.call(value)
}

function isUndefined(value) {
	return typeof value === 'undefined'
}

function isBoolean(value) {
	return typeof value === 'boolean'
}

function isNumber(value) {
	return typeof value === 'number'
}

function isString(value) {
	return typeof value === 'string'
}

function isObject(value) {
	return typeof value === 'object'
}

function isFunction(value) {
	return typeof value === 'function'
}

function isSymbol(value) {
	return typeof value === 'symbol'
}

function isBigInt(value) {
	return typeof value === 'bigint'
}

// Types with typeof and constructor

function isArray(value) {
	return value && typeof value === 'object' && value.constructor === Array
}

function isPlainObject(value) {
	return value && typeof value === 'object' && value.constructor === Object
}

function isRegExp(value) {
	return value && typeof value === 'object' && value.constructor === RegExp
}

function isMap(value) {
	return value && typeof value === 'object' && (value.constructor === Map || value.constructor === WeakMap)
}

function isSet(value) {
	return value && typeof value === 'object' && (value.constructor === Set || value.constructor === WeakSet)
}

function isBuffer() {
	return value && typeof value === 'object' && value.byteLength !== undefined
}

function isArrayBuffer(value) {
	return value && typeof value === 'object' && value.byteLength !== undefined && value.constructor === ArrayBuffer
}


// Types with instanceof

function isDate(value) {
	return value instanceof Date
}

function isError(value) {
	return value instanceof Error
}

// Types with equal

function isNull(value) {
	return value === null
}

function isEmpty(value) {
	return value === null
		|| value === undefined
		|| isString(value) && value.trim() === ''
		|| isArray(value) && value.length === 0
		|| isObject(value) && Object.keys(value).length === 0
}

module.exports = {
	isUndefined,
	isBoolean,
	isNumber,
	isString,
	isObject,
	isFunction,
	isSymbol,
	isBigInt,
	isArray,
	isPlainObject,
	isRegExp,
	isMap,
	isSet,
	isBuffer,
	isArrayBuffer,
	isDate,
	isError,
	isNull,
	isEmpty,
}