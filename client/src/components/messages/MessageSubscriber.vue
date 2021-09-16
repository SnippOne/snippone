<template></template>
<script>
import hash from "crypto-random-string"

export default {
	name: "message-subscriber",
	created() {
		this.$root.$on("appendMessage", ({ message, type } = { type: 'default' }) => {
			const id =  hash({ length: 10 })
			this.$store.dispatch("addMessage", { id, message, type })
		})
	},
	destroyed() {
		this.$root.$off("appendMessage")
	},
	watch: {
		$route(from, to){
			if (from !== to) {
				this.$store.dispatch("resetMessages")
			}
		}
	}
}
</script>
