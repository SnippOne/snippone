// Core
import config from 'config'
import { Strategy } from 'passport-google-oauth20'

const { auth: authConfig } = config

const options = {
	clientID: 		authConfig.googleClientId,
	clientSecret: 	authConfig.googleClientSecret,
	callbackURL: 	authConfig.googleClientCallbackUrl
}

export const googleStrategy = new Strategy(options, (token, refreshToken, profile, done) => {
	return done(null, {
		profile,
		token
	})
})
