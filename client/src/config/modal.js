import { getMethodPath } from './utils'

export default Object.freeze({
	context: (path, props) => getMethodPath(path, {
		auth: {
			title:			"Please signin with your",
			content:		`<span class="auth">
								<a href="/api/auth/google" class="button auth google">Google Account</a>
								<a href="/api/auth/github" class="button auth github">GitHub Account</a>
							</span>`,
			confirmation: 	false,
			...props
		}
	})
})