export default {
	// namespaced: true,
	state: {
		messages: []
	},
	getters: {
		messages(state) {
			return state.messages
		}
	},
	mutations: {
		addMessage(state, message) {
			state.messages.push(message)
		},
		removeMessage(state, id) {
			state.messages = state.messages.filter(message => message.id !== id)
		},
		resetMessages(state) {
			state.messages = []
		}
	},
	actions: {
		addMessage({ commit }, message) {
			commit("addMessage", message)
		},
		removeMessage({ commit }, id) {
			commit("removeMessage", id)
		},
		resetMessages({ commit }) {
			commit("resetMessages")
		}
	}
}