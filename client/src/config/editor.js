import { getMethodPath } from './utils';

export default Object.freeze({
	context: (path, props) => getMethodPath(path, {
		options: {
			edit: {
				tabSize: 		4,
				mode: 			"text/plain",
				theme: 			"idea",
				lineNumbers:	true,
				...props
			},
			preview: {
				readOnly: 		"nocursor",
				mode: 			"text/plain",
				theme: 			"idea",
				lineNumbers: 	true,
				...props
			}
		}
	})
})