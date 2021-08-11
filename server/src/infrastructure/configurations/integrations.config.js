
export const integrations = Object.freeze({
	github: {
		name: "GitHub Gists",
		apiUrl: "https://api.github.com",
		credential: [
			"token"
		],
		mapping: {
			from: {
				id:		"{id}",
				title: 	"{description}",
				status:	"{public}",
				url: 	"{url}",
				files: [
					{
						filename:	"{filename}",
						type:		"{type}",
						mode:		"{language}",
						raw_url:	"{raw_url}",
						content:	"{content}"
					}
				],
				created: "{created_at}",
				updated: "{updated_at}"
			},
			to: {
				description:	"{title}",
				public: 		"{status}",
				files: {
					"{filename}": {
						filename: 	"{filename}",
						type: 		"{type}",
						language: 	"{mode}",
						content: 	"{content}"
					}
				}
			}
		}
	},
	gitlab: {
		name: "GitLab Snippets",
		apiUrl: "https://gitlab.com/api/v4",
		credential: [
			"token"
		],
		mapping: {
			from: {
				id:				"{id}",
				title: 			"{title}",
				description: 	"{description}",
				status: {
					type:	"String",
					key:	"{visibility}",
					change: [
						["internal", false],
						["private",  false],
						["public",   true],
					]
				},
				created: "{created_at}",
				updated: "{updated_at}",
				files: [
					{
						filename: 	"{file_path}",
						raw_url: 	"{raw_url}",
						content: 	"{content}"
					}
				]
			},
			to: {
				title: 		"{title}",
				visibility: {
					type:	"Boolean",
					key:	"{status}",
					change: [
						[false, "private"],
						[true,	"public"],
					]
				},
				files: [
					{
						file_path: 	"{filename}",
						content: 	"{content}"
					}
				]
			}
		}
	},
	bitbucket: {
		name: "Bitbucket Snippets",
		apiUrl: "https://api.bitbucket.org/2.0",
		credential: [
			"username",
			"password"
		],
		mapping: {
			from: {
				id:		"{id}",
				title:	"{title}",
				status:	{
					type:	"Boolean",
					key:	"{is_private}",
					change: value => !value
				},
				created: "{created_on}",
				updated: "{updated_on}",
				files: [
					{
						filename:	"{filename}",
						content:	"{content}"
					}
				]
			},
			to: {	
				title:	"{title}",
				is_private:	{
					type:	"Boolean",
					key:	"{status}",
					change: value => !value
				},
				files: {
					"{filename}": {
						filename:	"{filename}",
						content:	"{content}"
					}
				}
			}
		}
	}
})