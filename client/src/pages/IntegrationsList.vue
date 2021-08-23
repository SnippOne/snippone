<template>
	<div class="container">
		<div class="integrations-list">
			<h1>Integrations</h1>
			<integration v-for="integration in $store.getters.getIntegrations" :data="integration" :key="integration.id" />
			<div class="column has-text-centered">
				<a class="button is-medium" @click.prevent="addIntegration">
					<span>&#43; Add Integration Service</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
// Config
import config from "@/config/integration"

// Components
import Integration from "@/components/Integration.vue"

export default {
	name: "integrations",
	methods: {
		addIntegration(){
			this.$store.dispatch("addIntegration", config.context('add'))
		}
	},
	components: {
		Integration
	}
}
</script>