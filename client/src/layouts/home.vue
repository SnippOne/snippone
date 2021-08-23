<template>
	<div class="content">
		<top-header/>
		<messages />
		<router-view :name="getComponent" v-if="isLoaded"/>
	</div>
</template>

<script>
import store from "@/store"
import TopHeader from "@/components/TopHeader.vue"
import Messages from "@/components/messages/Messages.vue";

export default {
	computed: {
		isLoaded(){
			return !this.$store.getters.getAuthPreloader
		},
		getComponent(){
			return store.getters.getAuthStatus ? "snippets" : "default"
		}
	},
	components: {
		TopHeader,
		Messages
	}
}
</script>
