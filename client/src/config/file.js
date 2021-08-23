import hash from "crypto-random-string"
import { getMethodPath } from './utils'

export default Object.freeze({
	context: (path, props) => getMethodPath(path, {
		add: {
			id: 	hash({ length: 16, type: "url-safe" }),
			name:	null,
			mode:	"text/plain",
			code:	`/**\r\n* Please add your code here.\r\n*/\n`,
			...props
		},
		modal: {
			remove: {
				title:			"Remove File",
				content:		"Are you sure to remove this file?",
				confirmation: 	true,
				...props
			}
		}
	})
})