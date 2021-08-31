// Core
import axios from 'axios'

import router from "@/router";
import { config } from "@/config";

export default {
	// namespaced: true,
	state: {
		status: false,
		preloader: true,
		data: null
	},
	getters: {
		getAuthStatus(state) {
			return state.status
		},
		getAuthPreloader(state) {
			return state.preloader
		},
		getAuthData(state) {
			return state.data
		}
	},
	mutations: {
		setAuthStatus(state, status) {
			state.status = status
		},
		setAuthPreloader(state, preloader) {
			state.preloader = preloader
		},
		setAuthData(state, data) {
			state.data = data
		}
	},
	actions: {
		authActionLogin({ commit }) {
			if (this.getters.getAuthStatus) {
				return true
			}

			const url = `${config.BASE_API_URL}/login`

			axios.post(url)
				.then(({ data }) => {
					commit('setAuthPreloader', false)
					if (data) {
						commit('setAuthStatus', true)
						commit('setAuthData', data)

						const { integrations, providers } = data
						commit('setProviders', providers)

						if(!integrations.length) {
							return false
						}

						for (let i = 0; i < integrations.length; i++) {
							const { id, name, credentials, provider, username, snippets } = integrations[i]
							commit('addIntegration', { id, name, credentials, provider, username })

							if(!snippets.length) continue;

							for (let j = 0; j < snippets.length; j++) {
								const { id, title, status, url, files, created } = snippets[j]
								commit('addSnippet', { id, title, status, url, files, created, parent: integrations[i].id })
							}
						}
					}
				})
				.catch((err) => {
					if (err) {
						commit('setAuthPreloader', false)
						commit('setAuthStatus', false)
					}
				})
		},
		authActionLogout({ commit }) {
			const url = `${config.BASE_API_URL}/logout`

			axios.get(url)
				.then(() => {
					commit('setAuthStatus', false)
					commit('setAuthData', null)

					if (router.currentRoute.path !== "/") {
						router.push("/")
					}
				})
				.catch((err) => {
					if (err) {
						throw new Error(err)
					}
				})
		}
	}
}