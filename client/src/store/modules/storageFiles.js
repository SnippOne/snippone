export default {
    // namespaced: true,
    state: {
		storageFiles: [],
    },
    getters: {
        getStorageFiles(state) {
            return state.storageFiles
		},
    },
    mutations: {
		addStorageFiles(state, files) {
            state.storageFiles = state.storageFiles.concat(files)
		},
		removeStorageFiles(state, snippet){
			state.storageFiles = state.storageFiles.filter(file => file.snippet !== snippet.id)
		},
		updateStorageFiles(state, payload){
			const { files, snippet } = payload
			state.storageFiles = state.storageFiles.reduce((storage, file) => {
				if (snippet.id !== file.snippet) {
					storage.push(file)
				}
				return storage
			}, []).concat(files)
		},
        addStorageFile(state, file) {
            state.storageFiles.push(file)
		},
		removeStorageFile(state, id){
			state.storageFiles = state.storageFiles.filter(file => file.id !== id)
		},
		updateStorageFile(state, payload){
			state.storageFiles = state.storageFiles.map((file) => {
				return file.id === payload.id ? {...file, ...payload} : file
			})
		},
    },
    actions: {
		addStorageFiles({commit}, payload){
			commit("addStorageFiles", payload)
		},
		removeStorageFiles({commit}, snippet){
			commit("removeStorageFiles", snippet)
		},
		updateStorageFiles({commit}, payload){
			commit("updateStorageFiles", payload)
		},
		addStorageFile({commit}, payload){
			commit("addStorageFile", payload)
		},
		removeStorageFile({commit}, id){
			commit("removeStorageFile", id)
		},
		updateStorageFile({commit}, payload){
			commit("updateStorageFile", payload)
		},
	}
}