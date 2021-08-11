<template>
	<div class="modal" :class="{'is-active': confirm}">
		<div class="modal-background" @click="onClose"></div>
		<div class="modal-card">
			<button class="delete" aria-label="close" @click="onClose"></button>
			<section class="modal-card-body">
				<div class="mgt-medium">
					<p class="modal-card-title">{{title}}</p>
				</div>
				<div class="mgb-medium" v-html="content"></div>
				<div class="mgb-medium" v-show="confirmation">
					<button class="button is-danger" ref="confirm" @click="onClose">
						<span>Yes</span>
					</button>
					<button class="button" @click="onClose">
						<span>No</span>
					</button>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	name: "modal",
	data(){
		return {
			title:		null,
			content:	null,
			confirmation: false,
			confirm:	false,
		}
	},
	methods: {
		onClose(){
			this.confirm = false
			if (this.$refs.confirm) {
				this.$refs.confirm.removeEventListener("click", this.handleClickConfirmation, true)
			}
		},
		handleClickConfirmation(){
			if (typeof this.callback === "function") {
				this.callback()
			}
		}
	},
	mounted(){
		this.$root.$on("openModal", ({ title, content, callback, confirmation }) => {
			this.title = title
			this.content = content
			this.callback = callback
			this.confirmation = confirmation
			this.confirm = true

			if (this.$refs.confirm) {
				this.$refs.confirm.addEventListener("click", this.handleClickConfirmation)
			}
		})
	},
}
</script>