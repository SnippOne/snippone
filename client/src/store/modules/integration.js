// Core
import axios from 'axios'

// Config
import { config } from "@/config"

export default {
	// namespaced: true,
	state: {
		integrations: [],
	},
	getters: {
		getIntegrations(state) {
			return state.integrations
		},
		getIntegrationById(state) {
			return (id) => {
				return state.integrations.find(integration => integration.id === id)
			}
		}
	},
	mutations: {
		fetchIntegrations(state, integration) {
			if (Array.isArray(integration)) {
				return state.integrations = state.integrations.concat(integration)
			}
			state.integrations = state.integrations.push(integration)
		},
		fetchIntegration(state, data){
			state.integrations = state.integrations.map((integration) => {
				return integration.id === data.id ? {...integration, ...data} : integration
			})
		},
		checkIntegration(state, { id, connection }){
			state.integrations = state.integrations.map(integration => {
				return integration.id === id ? {...integration, connection} : integration
			})
		},
		addIntegration(state, integration) {
			state.integrations.push(integration)
		},
		addIntegrations(state, integrations) {
 			state.integrations = state.integrations.concat(integrations)
		},
		removeIntegration(state, removeId){
			state.integrations = state.integrations.filter(({ id }) => id !== removeId)
		},
	},
	actions: {
		addIntegration({ commit }, data){
			commit("addIntegration", data)
		},
		addIntegrations({ commit }, data){
			commit("addIntegrations", data)
		},
		fetchIntegrations({ commit }){
			const url = `${config.BASE_API_URL}/integration/all`

			axios.get(url)
				.then(({ data }) => {
					const { integrations } = data
					commit("fetchIntegrations", integrations)
				})
				.catch((err) => {
					if (err) {
						throw new Error(err)
					}
				})
		},
		checkIntegration({ commit }, integration){
			const url = `${config.BASE_API_URL}/integration/check`

			axios.get(url, { data: integration })
				.then(() => commit("checkIntegration", {  ...integration, connection: true }))
				.catch(error => {
					if (error) {
						commit("checkIntegration", { ...integration, connection: false })
					}
				})
		},
		saveIntegration({ commit }, integration){
			const url = `${config.BASE_API_URL}/integration`
			const { id, name, credentials, provider } = integration

			axios.post(url, { id, name, credentials, provider: provider.id })
				.then(() => commit("fetchIntegration", integration))
				.catch(() => {})
		},
		updateIntegration({ commit }, integration){
			const url = `${config.BASE_API_URL}/integration`
			const { id, name, credentials, provider } = integration

			axios.put(url, { id, name, credentials, provider: provider.id })
				.then(() => commit("fetchIntegration", integration))
				.catch(() => {})
		},
		removeIntegration({ commit }, data){
			const { id, creating } = data

			if (creating) {
				return commit("removeIntegration", id)
			}

			const url = `${config.BASE_API_URL}/integration`
			axios.delete(url, {
				withCredentials: 	true,
				data: 				{ id }
			})
			.then(() => commit("removeIntegration", id))
			.catch(() => {})
		}
	}
}