export const modal = {
	context: {
		remove: {
			title:		"Remove File",
			content:	"Are you sure to remove this file?",
			callback:	() => {},
			confirmation: true
		},
		auth: {
			title:		"Please signin or signup with your",
			content:	`<div class="auth">
							<a class="auth google">Google Account</a>
							<a class="auth github">GitHub Account</a>
						</div>`,
			callback:	() => {},
			confirmation: false
		}
	}
}