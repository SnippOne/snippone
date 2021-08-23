import hash from "crypto-random-string"
import { getMethodPath } from './utils'

export default Object.freeze({
	credentials: {
		token: {
			label: 	"Personal Access Token",
			type: 	"text"
		},
		username: {
			label: 	"Username",
			type: 	"text"
		},
		password: {
			label: 	"App Password",
			type: 	"text"
		},
	},
	context: (path, props) => getMethodPath(path, {
		add: {
			id: 		hash({ length: 16, type: "url-safe" }),
			name: 		null,
			provider: 	null,
			credentials: {
				token: 		null,
				username: 	null,
				password: 	null,
			},
			creating: true,
			...props
		},
		modal: {
			remove: {
				title:			"Remove Integration",
				content:		"Are you sure to remove this integration?",
				confirmation: 	true,
				...props
			}
		}
	})
})
