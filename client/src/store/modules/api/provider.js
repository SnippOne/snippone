// Core
import axios from 'axios'

// Config
import { config } from "@/config";

export default {
	// namespaced: true,
	state: {
		providers: [],
	},
	getters: {
		getProviders(state) {
			return state.providers
		},
	},
	mutations: {
		fetchProviders(state, provider) {
			if (Array.isArray(provider)) {
				return state.providers = state.providers.concat(provider)
			}
			state.providers = state.providers.push(provider)
		},
	},
	actions: {
		fetchProviders({ commit }){
			const url = `${config.BASE_API_URL}/provider/list`
			axios.get(url, {
				withCredentials: true,
			})
			.then(({ data }) => {
				commit("fetchProviders", data)
			})
			.catch((err) => {
				if (err) {
					throw new Error(err)
				}
			})
		}
	}
}