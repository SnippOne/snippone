// Model
import { User } from '../models/User.js'

// Repository
import { UserRepositoryInterface } from '../../../../domain/contracts/repository/UserRepositoryInterface.js'

export class UserRepository extends UserRepositoryInterface {

	async createById({ id, auth, name, photo }){
		const data = await User.create({ id, auth, name, photo })

		return data
	}

	async getById(id){
		const data = await User.findOne({ id })
			.select('-_id -__v -created -modified')
			.populate({
				path: 'integrations',
				populate: {
					path: 'provider',
					select: '-_id -__v -modified -created'
				},
				select: '-_id -__v'
			})
			.populate({
				path: 'integrations',
				populate: {
					path: 'snippets',
					select: '-_id -__v -modified -created'
				},
				select: '-_id -__v'
			})
			.lean()

		return data
	}

	async updateById({ id, auth, name, photo }){
		const data = await User.findOneAndUpdate({ id }, { auth, name, photo }, { new: true })

		return data
	}

	async addIntegrationId({ id }, { _id }){
		const data = await User.findOneAndUpdate({ id }, { $push: { "integrations": _id } }, { new: true })

		return data
	}

	async removeIntegrationId({ id }, { _id }){
		const data = await User.findOneAndUpdate({ id }, { $pull: { "integrations": _id } }, { new: true })

		return data
	}
}