// Models
import { Snippet } from '../models/Snippet.js'

// Repository
import { SnippetRepositoryInterface } from '../../../../domain/contracts/repository/SnippetRepositoryInterface.js'

export class SnippetRepository extends SnippetRepositoryInterface {

	/**
	 * Working with multiple snippets.
	 */
	 async getAll(){

		const data = await Snippet.find({})

		return data
	}

	async getMany(ids = []){

		const data = await Snippet.find({ id: { $in: ids } })

		return data
	}

	async createMany(data = []) {

		const { insertedIds } = await Snippet.insertMany(data, { rawResult: true })

		return {
			insertedIds: insertedIds ? Object.values(insertedIds) : []
		}
	}

	async updateMany(data = []) {

		await Snippet.bulkWrite(data.map(({ id, title, status, url, files }) => ({
			updateOne: {
				filter: { id },
				update: { title, status, url, files }
			}
		})))

		const snippetsIds = data.map(({ id }) => id)

		const updatedIds = await Snippet.distinct("_id", { id: { $in: snippetsIds }})

		return { updatedIds }
	}

	async deleteMany(data = []) {

		const { deletedIds } = await Snippet.deleteMany({ id: { $in: data } }, { multi: true, rawResult: true })

		return { deletedIds }
	}

	/**
	 * Working with single snippet.
	 */
	async getById(id) {

		const data = await Snippet.findOne({ id })

		return data
	}

	async createById({ id, title, status, url, files }) {

		const data = await Snippet.create({ id, title, status, url, files })

		return data
	}

	async updateById({ id, title, status, url, files }) {

		const data = await Snippet.findOneAndUpdate({ id }, { title, status, url, files }, { new: true })

		return data
	}

	async deleteById(id) {

		const data = await Snippet.deleteOne({ id })

		return data
	}
}