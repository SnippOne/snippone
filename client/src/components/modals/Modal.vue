<template>
	<div class="modal" :class="{ 'is-active': open }">
		<div class="modal-background" @click="onClose"></div>
		<div class="modal-card">
			<button class="delete" aria-label="close" @click="onClose"></button>
			<div class="card">
				<div class="card-content">
					<h5 class="subtitle is-5" v-html="title"></h5>
					<div class="content" v-html="content"></div>
					<div class="buttons" v-if="confirmation">
						<button @click="onClose" class="button is-light">No</button>
						<button @click="onConfirmation" class="button is-danger">Yes</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "modal",
	data(){
		return {
			title:			null,
			content:		null,
			confirmation:	true,
			open: 			false,
			callback: 		() => {}
		}
	},
	methods: {
		onClose(){
			this.callback = () => {}
			this.open = false
		},
		onConfirmation(){
			this.callback()
			this.open = false
		}
	},
	mounted(){
		this.$root.$on("openModal", ({ title, content, confirmation }, callback = () => {}) => {
			this.title = title
			this.content = content
			this.confirmation = confirmation
			this.callback = callback
			this.open = true
		})
	}
}
</script>