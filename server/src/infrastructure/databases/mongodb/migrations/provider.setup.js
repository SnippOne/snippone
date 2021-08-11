import { Provider } from '../models/Provider.js'

await Provider.create({
	id: "github",
	name: "Github Gist",
	url: "https://api.github.com/gists",
	credential: ["token"]
})

await Provider.create({
	id: "gitlab",
	name: "GitLab Snippets",
	url: "https://gitlab.com/api/v4/snippets",
	credential: ["token"]
})

await Provider.create({
	id: "bitbucket",
	name: "Bitbucket Snippets",
	url: "https://api.bitbucket.org/2.0/snippets",
	credential: ["username", "password"]
})
