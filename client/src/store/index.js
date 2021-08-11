// Core
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import files from './modules/files'
import storageFiles from './modules/storageFiles'
import snippets from './modules/snippets'
import integration from './modules/integration'

// Api
import provider from './modules/api/provider'

export default new Vuex.Store({
    modules: {
		auth,
		files,
		storageFiles,
		snippets,
		integration,
		provider
    }
})