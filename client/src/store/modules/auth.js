// Core
import axios from 'axios'

import router from "@/router";
import { config } from "@/config";

export default {
	// namespaced: true,
	state: {
		status: false,
		preloader: true,
		user: null,
		provider: null,
	},
	getters: {
		getAuthStatus(state) {
			return state.status
		},
		getAuthPreloader(state) {
			return state.preloader
		},
		getAuthUser(state) {
			return state.user
		},
		getAuthProvider(state) {
			return state.provider
		},
	},
	mutations: {
		setAuthStatus(state, status) {
			state.status = status
		},
		setAuthPreloader(state, loader) {
			state.preloader = loader
		},
		setAuthUser(state, user) {
			state.user = user
		},
		setAuthProvider(state, provider) {
			state.provider = provider
		},
	},
	actions: {
		authActionLogin({ commit }) {
			const url = `${config.BASE_API_URL}/login`
			axios.post(url, {
				withCredentials: true,
				params: {
					provider: this.getters.getAuthProvider
				}
			})
			.then(({ data }) => {
				commit('setAuthPreloader', false)
				if (data) {
					commit('setAuthStatus', true)
					commit('setAuthUser', data)
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
			axios.get(url, {
				withCredentials: true,
			})
			.then(() => {
				commit('setAuthStatus', false)
				commit('setAuthUser', null)

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
	},
}