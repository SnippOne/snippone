<template>
  <div class="container">
	<div>
		<router-link to="/">All Snippets List</router-link>
		<snippet :source="snippet"/>
	</div>
  </div>
</template>

<script>
import Snippet from "@/components/Snippet.vue"

export default {
	name: "snippet-page",
	data(){
		return {
			snippet: null,
		}
	},
	created(){
		this.snippet = this.$store.getters.getSnippets
			.find(snippet => snippet.id === this.$route.params.id)
	},
	components: {
		Snippet,
	}
}
</script>