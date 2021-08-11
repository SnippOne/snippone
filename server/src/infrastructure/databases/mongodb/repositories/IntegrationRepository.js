// Core
import mongoose from "mongoose"

// Models
import { Integration } from '../models/Integration.js'
import { Provider } from '../models/Provider.js'
import { Snippet } from '../models/Snippet.js'

// Repository
import { IntegrationRepositoryInterface } from '../../../../domain/contracts/repository/IntegrationRepositoryInterface.js'

export class IntegrationRepository extends IntegrationRepositoryInterface {

	/**
	 * Working with multiple integrations.
	 */
	async getAll(){

		const data = await Integration.find({})
			.populate({ path: 'provider', select: '-__v' })
			.populate({ path: 'snippets', select: '-__v' })
			.lean()

		return data
	}

	async getMany(ids = []){

		const data = await Integration.find({ id: { $in: ids } })
			.populate({ path: 'provider', select: '-__v' })
			.populate({ path: 'snippets', select: '-__v' })
			.lean()

		return data
	}

	/**
	 * Working with single integration.
	 */
	async getById(id) {
		const data = await Integration.findOne({ id })
			.populate({ path: 'provider', select: '-__v' })
			.populate({ path: 'snippets', select: '-__v' })
			.lean()

		// if(!data) {
		// 	throw new Error('Integration with ID not found.')
		// }

		return data
	}

	async createById({ id, name, username, credential, provider, etag }, snippets = []) {

		const { _id } = await Provider.findOne({ id: provider })

		await Integration.create({ id, name, username, credential, etag, snippets, provider: _id })

		const data = await Integration.findOne({ id })
			.populate({ path: 'provider', select: '-__v' })
			.populate({ path: 'snippets', select: '-__v' })
			.lean()

		return data
	}

	async updateById({ id, name, username, credential, etag, provider }, snippets) {

		const { _id } = await Provider.findOne({ id: provider })

		const data = await Integration.findOneAndUpdate({ id }, { name, username, credential, etag, snippets, provider: _id }, { upsert:true, new: true })

		return data
	}

	async deleteById(id) {

		const data = await Integration.findOne({ id })

		if (!data) {
			throw new Error('Integration with ID not found.')
		}

		const { _id, snippets } = data

		await Snippet.deleteMany({ _id: { $in: snippets }})

		await Integration.deleteOne({ id })

		return { _id }
	}

	/**
	 * Working with snippets.
	 */
	async addSnippetId({ id }, { _id }){
		const data = await User.findOneAndUpdate({ id }, { $push: { "snippets": _id } }, { new: true })

		return data
	}

	async removeSnippetId({ id }, { _id }){
		const data = await User.findOneAndUpdate({ id }, { $pull: { "snippets": _id } }, { new: true })

		return data
	}
}