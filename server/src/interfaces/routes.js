// Core
import passport from 'passport'
import { Router } from 'express'

// Controllers
import { RootController } from './RootController.js'
import { AuthController } from './AuthController.js'
// import { ValidatorController } from './ValidatorController.js'

// Routes
import { AppRoutes } from './app/routes.js'

export const Routes = (repositories) => {
	const router = Router({ mergeParams: true })

	const { root } = RootController(repositories)
	const { login, logout, authCallback, isAuth, authGoogle, authGitHub } = AuthController(repositories)
	// const { isValidate } = ValidatorController()

	// auth
	router.get('/', [ isAuth ], root)
	router.get('/logout', [ isAuth ], logout)
	router.post('/login', [ isAuth ], login)

	router.get('/auth/google', authGoogle)
	router.get('/auth/google/callback', [ passport.authenticate('google', { failureRedirect: '/' }) ], authCallback)

	router.get('/auth/github', authGitHub)
	router.get('/auth/github/callback', [ passport.authenticate('github', { failureRedirect: '/' }) ], authCallback)

	// app
	router.use(AppRoutes(repositories))

	return router
}

