// Model
import { Provider } from '../models/Provider.js'

// Repository
import { ProviderRepositoryInterface } from '../../../../domain/contracts/repository/ProviderRepositoryInterface.js'

export class ProviderRepository extends ProviderRepositoryInterface {

	async getMany(){
		const data = await Provider.find({})
			.select('-_id -__v -created -modified')
			.lean()

		return data
	}

	async getById(id){
		const data = await Provider.findOne({ id })
			.select('-__v -created -modified')
			.lean()

		return data
	}
}