<template>
	<div class="content">
		<top-header/>
		<router-view :name="getComponent" v-if="isLoaded"/>
	</div>
</template>

<script>
import store from "@/store"
import TopHeader from "@/components/TopHeader.vue";

export default {
	components: {
		TopHeader
	},
	computed: {
		isLoaded(){
			return !store.getters.getAuthPreloader
		},
		getComponent(){
			return store.getters.getAuthStatus ? "snippets" : "default"
		}
	},
}
</script>
