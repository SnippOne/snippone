// Core
import dg from 'debug'
import config from 'config'
import status from 'http-status'
import passport from 'passport'

// Use Cases
import { GetUser } from '../application/useCases/user/GetUser.js'

// Errors
import { AuthError } from '../errors/error.js'

const debug = dg('router:auth')

export const AuthController = (dependencies) => ({
	isAuth(req, res, next) {
		if (req.session.token) {
			next()
		} else {
			next(new AuthError('Unathorized', status.UNAUTHORIZED))
		}
	},

	async login(req, res, next) {
		debug(req.method, req.originalUrl)

		const { token, passport } = req.session

		if (token) {
			const { id, provider, displayName, photos } = passport.user.profile

			const user = new GetUser(dependencies)

			const { CREATED, SUCCESS, ERROR } = user.types

			user.on(CREATED, results => res.status(status.CREATED).json(results))
			user.on(SUCCESS, results => res.status(status.OK).json(results))
			user.on(ERROR, next)

			await user.execute({
				id,
				auth: 	provider,
				name: 	displayName,
				photo: 	photos[0].value
			})

		} else {
			next(new AuthError('Unathorized', status.UNAUTHORIZED))
		}
	},

	async logout(req, res, next) {
		debug(req.method, req.originalUrl)

		if (req.session) {
			req.session.destroy(err => {
				if (err) {
					return next(err)
				} else {
					return res.redirect(config.clientUrl)
				}
			})
		} else {
			next(new AuthError('Unathorized', status.UNAUTHORIZED))
		}
	},

	async authCallback(req, res) {
		debug(req.method, req.originalUrl)

		req.session.token = req.user.token
		res.redirect(config.clientUrl)
	},

	authGoogle: passport.authenticate('google', { scope: ['profile'] }),
	authGitHub: passport.authenticate('github', { scope: ['user:email'] })
})
