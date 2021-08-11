// Core
import passport from 'passport'

// Services
import { AuthInterface } from '../../domain/contracts/AuthInterface.js'

// Strategies
import { githubStrategy } from './passport/githubStrategy.js'
import { googleStrategy } from './passport/googleStrategy.js'

export class Auth extends AuthInterface {
	async start() {
		passport.serializeUser((user, done) => done(null, user))
		passport.deserializeUser((user, done) => done(null, user))

		passport.use(googleStrategy)
		passport.use(githubStrategy)
	}
}