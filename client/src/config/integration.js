export const integration = {
	credentials: {
		token: {
			label: "Personal Access Token",
			type: "text"
		},
		username: {
			label: "Username",
			type: "text"
		},
		password: {
			label: "App Password",
			type: "text"
		},
	},
	context: {
		add: {
			id: null,
			name: null,
			provider: null,
			credentials: {
				token: null,
				username: null,
				password: null,
			},
			meta: {
				create: true
			}
		}
	}
}

