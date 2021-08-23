export default {
	// namespaced: true,
	state: {
		providers: []
	},
	getters: {
		getProviders(state) {
			return state.providers
		},
		getProviderById(state) {
			return (id) => {
				return state.providers.find(provider => provider.id === id)
			}
		}
	},
	mutations: {
		setProviders(state, providers) {
			state.providers = providers
		}
	},
	actions: {
		setProviders({ commit }, providers) {
			commit("addFile", providers)
		}
	}
}