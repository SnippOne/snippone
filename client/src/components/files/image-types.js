const types = {
	apng: {
		mime: 'image/apng',
		ext: '.apng'
	},
	avif: {
		mime: 'image/avif',
		ext: '.avif'
	},
	gif: {
		mime: 'image/gif',
		ext: '.gif'
	},
	jpeg: {
		mime: 'image/jpeg',
		ext: ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp']
	},
	png: {
		mime: 'image/png',
		ext: '.png'
	},
	svg: {
		mime: 'image/svg+xml',
		ext: '.svg'
	},
	webp: {
		mime: 'image/webp',
		ext: '.webp'
	}
}

export function isImage(content) {
	return Object.values(types).find(({ mime }) => content.indexOf(mime) !== -1)
}

export function isSVG(content){
	return /(<svg)([^<]*|[^>]*)/.test(content)
}

export function isBuffer(content){
	return Buffer.from(content, 'base64').toString('base64') === content
}