<template>
	<div class="container">
		<div class="integrations-list">
			<h1>Integrations</h1>
			<integration v-for="integration in getIntegrations" 
				:events="{ onCreate, onUpdate, onRemove }" 
				:data="integration" 
				:key="integration.id" />
		
			<div class="column has-text-centered">
				<a class="button is-medium" @click.prevent="onAdd">
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
	data(){
		return {
			integrations: []
		}
	},
	computed: {
		getIntegrations(){
			return this.$store.getters.getIntegrations.concat(this.integrations)
		}
	},
	methods: {
		onAdd(){
			this.integrations.push(config.context('add'))
		},
		onCreate(payload){
			this.$store.dispatch("saveIntegration", payload)
		},
		onUpdate(payload){
			this.$store.dispatch("updateIntegration", payload)
		},
		onRemove(payload){
			this.$root.$emit("openModal", config.context('modal.remove'), () => {
				const removeIndex = this.integrations.findIndex(({ id }) => id === payload.id)
					removeIndex ? this.integrations.splice(removeIndex, 1) 
								: this.$store.dispatch("removeIntegration", payload)
		
				const message = `The integration ${ payload.name ? `with the name "${payload.name}"` : '' } was deleted.`
				this.$root.$emit("appendMessage", { message })
			})
		}
	},
	components: {
		Integration
	}
}
</script>