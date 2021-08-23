<template>
	<main id="app">
		<component :is="layout"/>
		<modal />
		<message-subscriber/>
	</main>
</template>

<script>
import Vue from "vue"
import VueSelect from "vue-select"
import "vue-select/dist/vue-select.css"

import VueScrollTo from 'vue-scrollto'
import Vuelidate from 'vuelidate'
import VueClipboard from 'vue-clipboard2'
import BounceLoader from 'vue-spinner/src/BounceLoader'

import defaultLayout from "@/layouts/default.vue"
import homeLayout from "@/layouts/home.vue"
import rawLayout from "@/layouts/raw.vue"

import Editor from "@/components/Editor.vue"
import Modal from "@/components/modals/Modal.vue"

import MessageSubscriber from "@/components/messages/MessageSubscriber.vue"

Vue.use(VueScrollTo)
Vue.use(Vuelidate)
Vue.use(VueClipboard)

Vue.component("bounce-loader", BounceLoader)

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
