export default {
	// namespaced: true,
	state: {
		files: []
	},
	getters: {
		getFiles(state) {
			return state.files
		},
		getFileByName(state) {
			return (name) => {
				return state.files.find(file => file.filename === name)
			}
		}
	},
	mutations: {
		addFile(state, file) {
			state.files.push(file)
		},
		addFiles(state, files) {
			state.files = state.files.concat(files)
		},
		removeFile(state, id) {
			state.files = state.files.filter(file => file.id !== id)
		},
		updateFile(state, data) {
			state.files = state.files.map((file) => {
				return file.id === data.id ? { ...file, ...data } : file
			})
		},
		setFiles(state, files) {
			state.files = files
		},
		resetFiles(state) {
			state.files = []
		},
	},
	actions: {
		addFile({ commit }, data) {
			commit("addFile", data)
		},
		addFiles({ commit }, data) {
			commit("addFiles", data)
		},
		removeFile({ commit }, id) {
			commit("removeFile", id)
		},
		updateFile({ commit }, data) {
			commit("updateFile", data)
		},
		setFiles({ commit }, data) {
			commit("setFiles", data)
		},
		resetFiles({ commit }) {
			commit("resetFiles")
		},
	}
}