// Core
import status from 'http-status'

const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, CONFLICT } = status

/**
 * Custom BaseError class.
 */

export class BaseError extends Error {
	constructor(message, status = INTERNAL_SERVER_ERROR) {
		super(message)

		Error.stackTraceLimit = 10
		Error.captureStackTrace(this, this.constructor)

		this.name = this.constructor.name
		this.message = message
		this.status = status
	}
}

export class ValidationError extends BaseError {
	constructor(message, status = BAD_REQUEST) {
		super(message, status)
	}
}

export class AuthError extends BaseError {
	constructor(message, status = UNAUTHORIZED) {
		super(message, status)
	}
}

export class UniqueError extends BaseError {
	constructor(message, status = CONFLICT) {
		super(message, status)
	}
}