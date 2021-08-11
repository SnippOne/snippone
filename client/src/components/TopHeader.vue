<template>
	<header class="header">
		<div class="container">
			<nav class="level">
				<div class="level-left">
					<div class="level-item">
						<router-link to="/">
							<img src="@/assets/images/logo-full-slogan-small-font.svg" class="logo" alt="SnippOne" />
						</router-link>
					</div>
				</div>
				<div class="level-right">
					<div class="level-item" v-if="$store.getters.getAuthStatus">
						<router-link class="has-text-black is-uppercase" to="/">Snippets</router-link>
					</div>
					<div class="level-item" v-if="$store.getters.getAuthStatus">
						<router-link  class="has-text-black is-uppercase" to="/integrations">Integrations</router-link>
					</div>
					<div class="level-item">
						<a class="button is-white" @click.prevent="addSnippetToggle">+ Add Snippet</a>
					</div>
					<div class="level-item">
						<auth />
					</div>
				</div>
			</nav>
		</div>
	</header>
</template>

<script>
import Auth from "@/components/Auth.vue"

export default {
	name: "top-header",
	methods: {
		addSnippetToggle(){
			if (this.$router.currentRoute.path !== '/') {
				this.$router.push('/')
			}
			this.$store.dispatch("setSnippetOpen", true)
		}
	},
	components: {
		Auth
	}
}
</script>
