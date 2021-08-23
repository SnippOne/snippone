<template>
	<header class="header">
		<div class="container">
			<nav class="level">
				<div class="level-left">
					<div class="level-item">
						<router-link to="/">
							<img src="@/assets/images/logo.svg" class="logo" title="SnippOne" alt="SnippOne" />
						</router-link>
					</div>
				</div>
				<div class="level-right menu">
					<div class="level-item menu-item" v-if="$store.getters.getAuthStatus">
						<router-link class="has-text-black" to="/">Snippets</router-link>
					</div>
					<div class="level-item menu-item" v-if="$store.getters.getAuthStatus">
						<router-link  class="has-text-black" to="/integrations">Integrations</router-link>
					</div>
					<div class="level-item">
						<a class="button is-add" @click.prevent="onAddSnippet">+ Add Snippet</a>
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
		onAddSnippet() {
			if (this.$router.currentRoute.path !== '/') {
				this.$router.push('/')
			}
		}
	},
	components: {
		Auth
	}
}
</script>
