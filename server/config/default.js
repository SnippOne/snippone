'strict mode'

// Core
const dotenv = require('dotenv')
const path = require('path')

const ENV = process.env.NODE_ENV || 'production'

const { error } = dotenv.config()
if (error) {
	throw new Error('Couldn\'t find .env file.')
}

/**
 * List of accessible environment variables.
 */
const env = {
	PORT: 							null,
	DATABASE_NAME: 					null,
	DATABASE_URL: 					null,
	DATABASE_COLLECTION_SESSION: 	null,
	CLIENT_URL: 					null,
	GOOGLE_CLIENT_ID: 				null,
	GOOGLE_CLIENT_SECRET: 			null,
	GOOGLE_CLIENT_CALLBACK_URL: 	null,
	GITHUB_CLIENT_ID: 				null,
	GITHUB_CLIENT_SECRET: 			null,
	GITHUB_CLIENT_CALLBACK_URL: 	null,
	COOKIE_SESSION_NAME: 			null,
	COOKIE_SESSON_SECRECT_KEY: 		null,
	COOKIE_SESSION_MAX_AGE: 		null,
	TOKEN_SECRET: 					null
}


// Custom override
for (const variable of Object.keys(env)) {
	if (typeof process.env[variable] === 'undefined') {
		throw new Error(`Environment variable ${variable} is not defined.`)
	}

	env[variable] = process.env[variable]
}

const config = {
	/**
	 * Seting a port.
	 */
	port: env.PORT,

	/**
	 * Setting the database name.
	 */
	databaseName: env.DATABASE_NAME,

	/**
	 * Setting the database URL.
	 */
	databaseUrl: env.DATABASE_URL,

	/**
	 * Setting the database collection session.
	 */
	databaseCollectionSession: env.DATABASE_COLLECTION_SESSION,

	/**
	 * Client Url.
	 */
	clientUrl: env.CLIENT_URL,

	/**
	 * Setting an authentication data.
	 */
	auth: {

		/**
		 * Google API data.
		 */
		googleClientId: 			env.GOOGLE_CLIENT_ID,
		googleClientSecret: 		env.GOOGLE_CLIENT_SECRET,
		googleClientCallbackUrl: 	env.GOOGLE_CLIENT_CALLBACK_URL,

		/**
		 * Github API data.
		 */
		githubClientId: 			env.GITHUB_CLIENT_ID,
		githubClientSecret: 		env.GITHUB_CLIENT_SECRET,
		githubClientCallbackUrl: 	env.GITHUB_CLIENT_CALLBACK_URL
	},

	security: {
		tokenSecret: env.TOKEN_SECRET
	},

	/**
	 * Setting session cookie.
	 */
	cookieSession: {
		name: 		env.COOKIE_SESSION_NAME,
		secretKey: 	env.COOKIE_SESSON_SECRECT_KEY,
		maxAge: 	env.COOKIE_SESSION_MAX_AGE
	},

	/**
	 * Setting a data log.
	 */
	logger: {
		path: 'logs/error.log'
	},

	/**
	 * Setting the environment type.
	 */
	[ENV]: true
}

// eslint-disable-next-line security/detect-non-literal-require
const configEnv = () => require(path.join(__dirname, 'environments', ENV))

module.exports = Object.assign(config, configEnv())
