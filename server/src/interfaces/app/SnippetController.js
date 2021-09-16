// Core
import statuses from 'http-status'
import stream from 'stream'
import util from 'util'

// Usecases
import { GetSnippet }		from '../../application/useCases/snippet/GetSnippet.js'
import { CreateSnippet }	from '../../application/useCases/snippet/CreateSnippet.js'
import { UpdateSnippet }	from '../../application/useCases/snippet/UpdateSnippet.js'
import { DeleteSnippet }	from '../../application/useCases/snippet/DeleteSnippet.js'
import { DownloadSnippet }	from '../../application/useCases/snippet/DownloadSnippet.js'

export const SnippetController = (dependencies) => ({

	async createSnippet(req, res, next) {
		const { title, status, files, integration } = req.body

		const snippet = new CreateSnippet(dependencies)

		const { SUCCESS, ERROR } = snippet.types

		snippet.on(SUCCESS, results => res.status(statuses.CREATED).json(results))
		snippet.on(ERROR, next)

		await snippet.execute({ title, status, files }, integration)
	},

	getSnippet(req, res, next) {
		const { id } = req.body

		const snippet = new GetSnippet(dependencies)

		const { SUCCESS, ERROR } = snippet.types

		snippet.on(SUCCESS, results => res.status(statuses.OK).json(results))
		snippet.on(ERROR, next)

		snippet.execute(id)
	},

	updateSnippet(req, res, next) {
		const { id, title, preview, status, links, files } = req.body

		const snippet = new UpdateSnippet(dependencies)

		const { SUCCESS, ERROR } = snippet.types

		snippet.on(SUCCESS, results => res.status(statuses.OK).json(results))
		snippet.on(ERROR, next)

		snippet.execute({ id, title, preview, status, links, files })
	},

	deleteSnippet(req, res, next) {
		const { id, integration } = req.body

		const snippet = new DeleteSnippet(dependencies)

		const { SUCCESS, ERROR } = snippet.types

		snippet.on(SUCCESS, results => res.status(statuses.NO_CONTENT).json(results))
		snippet.on(ERROR, next)

		snippet.execute(id, integration)
	},

	async downloadSnippet(req, res, next) {
		const  { id } = req.params

		const download = new DownloadSnippet(dependencies)

		const { SUCCESS, ERROR } = download.types

		const pipeline = util.promisify(stream.pipeline)

		download.on(SUCCESS, async (name, { zip }) => {
			res.setHeader('Content-Disposition', `attachment; filename=${name}.zip`)

			// zip.pipe(res)
			try {
				await pipeline(zip, res)
			} catch (error) {
				throw new Error(error)
			}
		})

		download.on(ERROR, next)

		await download.execute(id)
	}
})