<template>
	<main id="app">
		<component :is="layout"/>
		<modal />
		<message-subscriber/>
	</main>
</template>

<script>
// Vue
import Vue from "vue"

// Plugins
import Vuelidate 		from "vuelidate"
import VueScrollTo 		from "vue-scrollto"
import VueClipboard 	from "vue-clipboard2"

// Layouts
import defaultLayout 	from "@/layouts/default.vue"
import homeLayout 		from "@/layouts/home.vue"
import rawLayout 		from "@/layouts/raw.vue"

// Components
import Editor 				from "@/components/Editor.vue"
import Modal 				from "@/components/modals/Modal.vue"
import MessageSubscriber 	from "@/components/messages/MessageSubscriber.vue"

import VueSelect 			from "vue-select"

// Styles
import "vue-select/dist/vue-select.css"

Vue.use(Vuelidate)
Vue.use(VueScrollTo)
Vue.use(VueClipboard)

Vue.component("default-layout", defaultLayout)
Vue.component("home-layout", homeLayout)
Vue.component("raw-layout", rawLayout)

Vue.component("v-select", VueSelect)
Vue.component("editor", Editor)
Vue.component("modal", Modal)
Vue.component("message-subscriber", MessageSubscriber)

Vue.config.productionTip = false
Vue.config.debug = true

export default {
	name: "app",
	computed: {
		layout(){
			return this.$route.meta.layout || "default-layout"
		}
	}
}
</script>

<style lang="scss">
	@import "@/assets/sass/styles.scss";
</style>
