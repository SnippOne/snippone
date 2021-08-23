import hash from "crypto-random-string"
import { getMethodPath }from './utils'

export default Object.freeze({
	context: (path, props) => getMethodPath(path, {
		create: {
			id: 		hash({ length: 16, type: "url-safe" }),
			title: 		null,
			status: 	false,
			provider: 	null,
			files:		[],
			...props
		},
		modal: {
			remove: {
				title:			"Remove Snippet",
				content:		"Are you sure to remove this snippet?",
				confirmation: 	true,
				...props
			}
		}
	})
})