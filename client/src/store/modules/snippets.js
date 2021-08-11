// Core
import axios from 'axios'

// Config
import { config } from "@/config"

export default {
	// namespaced: true,
	state: {
		snippets: [],
		open: false,
	},
	getters: {
		getSnippets(state) {
			return state.snippets
		},
		getSnippetOpen(state){
			return state.open
		}
	},
	mutations: {
		addSnippet(state, snippet) {
			state.snippets.push(snippet)
		},
		addSnippets(state, snippets) {
			state.snippets = state.snippets.concat(snippets)
		},
		removeSnippet(state, id){
			state.snippets = state.snippets.filter(snippet => snippet.id !== id)
		},
		updateSnippet(state, data){
			state.snippets = state.snippets.map((snippet) => {
				return snippet.id === data.id ? {...snippet, ...data} : snippet
			})
		},
		setSnippetOpen(state, arg){
			if (typeof arg !== "undefined") {
				return state.open = arg
			} else {
				state.open = !state.open
			}
		},
		fetchSnippets(state, snippets) {
			state.snippets = snippets
		},
	},
	actions: {
		addSnippet({commit}, data){
			commit("addSnippet", data)
		},
		addSnippets({commit}, data){
			commit("addSnippets", data)
		},
		removeSnippet({commit}, id){
			commit("removeSnippet", id)
		},
		updateSnippet({commit}, data){
			commit("updateSnippet", data)
		},
		setSnippetOpen({commit}, arg){
			commit("setSnippetOpen", arg)
		},
		fetchSnippets({ commit }){
			const url = `${config.BASE_API_URL}/snippet`
			axios.get(url, {
				withCredentials: true,
			})
			.then(({ data }) => {
				const { snippets } = data
				commit("fetchSnippets", snippets)
			})
			.catch((err) => {
				if (err) {
					throw new Error(err)
				}
			})
		},
	}
}