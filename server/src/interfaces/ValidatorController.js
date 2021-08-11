// Core
import os from 'os'
import status from 'http-status'
import Ajv from 'ajv'

// Errors
import { ValidationError } from '../errors/error.js'

export const ValidatorController = () => ({
	isValidate(validation) {
		return function (req, res, next) {
			const ajv = new Ajv({ allErrors: true }).compile(validation)

			if (ajv(req.body)) {
				next()
			} else {

				const errors = ajv.errors.map(error => `${error.dataPath}: ${error.message}`).join(os.EOL)

				next(new ValidationError(errors, status.BAD_REQUEST))
			}
		}
	}
})
