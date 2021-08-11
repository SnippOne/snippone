// Domain
import { Events } from '../../Events.js'

export class DeleteIntegration extends Events {
	constructor({ integrationRepository, userRepository }) {
		super()
		this.types = ['SUCCESS', 'ERROR']
		this.integrationRepository = integrationRepository
		this.userRepository = userRepository
	}

	async execute(id, user) {
		const { SUCCESS, ERROR } = this.types

		try {
			const { _id } = await this.integrationRepository.deleteById(id)

			/**
			 * Remove integration from user.
			 */
			if(user){
				await this.userRepository.removeIntegrationId(user, { _id })
			}

			this.emit(SUCCESS)

		} catch (error) {
			this.emit(ERROR, error)
		}
	}
}