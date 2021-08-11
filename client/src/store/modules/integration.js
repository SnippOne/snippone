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
		getIntegration(state, index) {
			return state.integrations[index]
		},
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
		fetchIntegrations({ commit }){
			const url = `${config.BASE_API_URL}/integration`
			axios.get(url, {
				withCredentials: true,
			})
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
			axios.get(url, {
				withCredentials: true,
				params: {
					data: {
						...integration
					}
				}
			}).then(() => {
				commit("checkIntegration", {  ...integration, connection: true })
			}).catch(error => {
				if (error) {
					commit("checkIntegration", { ...integration, connection: false })
				}
			})
		},
		saveIntegration({ commit }, integration){
			const url = `${config.BASE_API_URL}/integration`
			axios.post(url, {
				...integration
			}, {
				withCredentials: true,
			}).then((response) => {
				commit("fetchIntegration", integration)
			}).catch((error) => {
			})
		},
		updateIntegration({ commit }, integration){
			const url = `${config.BASE_API_URL}/integration`
			axios.put(url, {
				...integration
			}, {
				withCredentials: true,
			}).then((response) => {
				commit("fetchIntegration", integration)
			}).catch((error) => {
			})
		},
		addIntegration({commit}, data){
			commit("addIntegration", data)
		},
		addIntegrations({commit}, data){
			commit("addIntegrations", data)
		},
		removeIntegration({ commit }, id){
			const url = `${config.BASE_API_URL}/integration`
			axios.delete(url, {
				withCredentials: true,
				params: {
					id
				}
			}).then((response) => {
				commit("removeIntegration", id)
			}).catch((error) => {
			})

		},
	}
}