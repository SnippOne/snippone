<template>
	<div class="container">
		<router-link to="/" class="button is-light is-back-link">
			<span>&#129044; Back to Snippets</span>
		</router-link>
		<snippet />
	</div>
</template>

<script>
import Snippet from "@/components/Snippet.vue"

export default {
	name: "snippet-page",
	components: {
		Snippet
	}
}
</script>