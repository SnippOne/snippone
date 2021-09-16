// Domain
import { Events } from '../../Events.js'
import { Snippet } from '../../../domain/entities/Snippet.js'

// Core
import util from 'util'
import ZipStream from 'zip-stream'

export class DownloadSnippet extends Events {
	constructor({ snippetRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.snippetRepository = snippetRepository
	}

	async execute(id) {
		const { SUCCESS, ERROR } = this.types

		try {
			const data = await this.snippetRepository.getById(id)

			if (!data) {
				return this.emit(ERROR)
			}

			const { title, files } = new Snippet(data)

			const name = title ? title.replace(/\s+/g, '-').toLowerCase() : id

			const zip = new ZipStream()

			zip.entry = util.promisify(zip.entry)

			for (let i = 0; i < files.length; i++) {
				await zip.entry(files[i].content, { name: files[i].filename })
			}

			zip.finish()

			this.emit(SUCCESS, name, { zip })
		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}