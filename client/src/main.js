// Core
import Vue 		from 'vue'

// Store
import store 	from '@/store'

// Router
import router 	from '@/router'

// Components
import App 		from '@/components/App'

Vue.config.productionTip = false

const client = new Vue({
	store,
	router,
	render: h => h(App),
})

client.$mount('#app')

