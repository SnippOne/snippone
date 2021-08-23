// Core
import config 			from 'config'
import express 			from 'express'
import cors 			from 'cors'
import helmet 			from 'helmet'
import compression 		from 'compression'
import passport 		from 'passport'
import session 			from 'express-session'
import cookieParser 	from 'cookie-parser'

// Swagger
import swaggerJSdoc 	from 'swagger-jsdoc'
import swaggerUi 		from 'swagger-ui-express'
import swaggerConfig 	from '../../../swagger.json'

// Framework
import { FrameworkInterface } from '../../domain/contracts/FrameworkInterface.js'

// Router
import { Routes } from '../../interfaces/routes.js'

// Controllers
import { ErrorController } from '../../interfaces/ErrorController.js'

// Health
import { gracefulShutdown } from '../health/GracefulShutdown.js'

export class Express extends FrameworkInterface {
	constructor(dependencies) {
		super()
		const { Database, Logger, SessionStore } = dependencies
		this.database = new Database()
		this.logger = Logger

		this.sessionStore = new SessionStore(session)
	}

	async start() {
		const app = express()

		app.use(helmet())

		app.use(compression())
		app.use(cors({
			origin: config.clientUrl,
			credentials: true
		}))

		app.use(express.urlencoded({ extended: true }))
		app.use(express.json())
		app.use(cookieParser())

		// Session
		app.use(session({
			name: config.cookieSession.name,
			secret: config.cookieSession.secretKey,
			cookie: {
				originalMaxAge: Number(config.cookieSession.maxAge)
			},
			resave: true,
			saveUninitialized: true,
			store: this.sessionStore
		}))


		// Passport
		app.use(passport.initialize())
		app.use(passport.session())

		// Router
		const routes = Routes(this.database.repositories)
		app.use('/', routes)

		// Swagger
		const swaggerSpec = swaggerJSdoc(swaggerConfig)
		app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

		// Error
		const { errorsNoRouteHandler, errorsHandler } = ErrorController()
		app.use('*', errorsNoRouteHandler)
		app.use(errorsHandler)

		// Shutdown
		// gracefulShutdown(app)

		app.listen(config.port)
	}
}
