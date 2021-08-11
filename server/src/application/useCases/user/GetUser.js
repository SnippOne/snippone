import { Events } from "../../Events.js";
import { User } from '../../../domain/entities/User.js'

export class GetUser extends Events {
	constructor({ userRepository, providerRepository }) {
		super()
		this.types = ['CREATED', 'SUCCESS', 'ERROR']
		this.userRepository = userRepository
		this.providerRepository = providerRepository
	}

	async execute({ id, auth, name, photo }) {
		const { CREATED, SUCCESS, ERROR } = this.types

		try {
			const providers = await this.providerRepository.getMany()
			const data = await this.userRepository.getById(id)

			if (data) {
				const receivedUser = new User(data)

				this.emit(SUCCESS, { ...receivedUser, providers })

				return true
			}

			const user = new User({ id, name, photo, auth })
			const created = await this.userRepository.create(user)
			const createdUser = new User(created)

			this.emit(CREATED, { ...createdUser, providers })

		} catch (error) {

			this.emit(ERROR, error)
		}

	}

}