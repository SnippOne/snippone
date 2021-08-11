// Core
import config from 'config'
import { Strategy } from 'passport-github2'

const { auth: authConfig } = config

const options = {
	clientID: 		authConfig.githubClientId,
	clientSecret: 	authConfig.githubClientSecret,
	callbackURL: 	authConfig.githubClientCallbackUrl
}

export const githubStrategy = new Strategy(options, (token, refreshToken, profile, done) => {
	return done(null, {
		profile,
		token
	})
})
