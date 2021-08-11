<template>
	<main id="app">
		<component :is="layout"/>
		<modal />
	</main>
</template>

<script>
import Vue from "vue"
import VueSelect from "vue-select"
import "vue-select/dist/vue-select.css"

import VueScrollTo from 'vue-scrollto'
import Vuelidate from 'vuelidate'
import BounceLoader from 'vue-spinner/src/BounceLoader'

import defaultLayout from "@/layouts/default.vue"
import homeLayout from "@/layouts/home.vue"
import rawLayout from "@/layouts/raw.vue"

import Editor from "@/components/Editor.vue"
import Modal from "@/components/modals/Modal.vue"

Vue.use(VueScrollTo)
Vue.use(Vuelidate)
Vue.component("bounce-loader", BounceLoader)

Vue.component("default-layout", defaultLayout)
Vue.component("home-layout", homeLayout)
Vue.component("raw-layout", rawLayout)

Vue.component("v-select", VueSelect)
Vue.component("editor", Editor)
Vue.component("modal", Modal)

Vue.config.productionTip = false
Vue.config.debug = true

export default {
	name: "app",
	mounted() {
		// this.api()
	},
	computed: {
		layout(){
			return this.$route.meta.layout || "default-layout"
		}
	},
	methods: {
		api(){
			this.$store.dispatch("fetchProviders")
			this.$store.dispatch("fetchIntegrations")
			this.$store.dispatch("fetchSnippets")
		}
	},
}
</script>

<style lang="scss">
	@import "@/assets/sass/styles.scss";
</style>
