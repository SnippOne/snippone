<template>
	<div class="container">
		<h1>Your Integrations List</h1>
		<integration v-for="integration in $store.getters.getIntegrations" :source="integration" :key="integration.id"/>
		<div class="column has-text-centered">
			<a class="button is-medium" @click.prevent="addIntegration">+ Add Integration Service</a>
		</div>
	</div>
</template>

<script>
import hash from "crypto-random-string"
import Integration from "@/components/Integration.vue"

import { integration } from "@/config/integration"

export default {
	name: "integrations",
	mounted(){
		this.$store.dispatch("addIntegrations", this.$store.getters.getAuthUser.integrations)
		if (!this.$store.getters.getIntegrations.length) {
			this.addIntegration();
		}
	},
	methods: {
		addIntegration(){
			this.$store.dispatch("addIntegration", {
				...integration.context.add,
				id: hash({length: 16, type: "url-safe"})
			})
		},
	},
	components: {
		Integration
	}
}
</script>