<template>
	<div class="container">
		<div class="notification my-2" v-for="({ id, message, type }) in $store.getters.messages" :key="id" :class="type">
			<button class="delete" aria-label="delete" @click.prevent="onRemove(id)" />
			<p>{{ message }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "messages",
	methods: {
		onRemove(id){
			this.$store.dispatch("removeMessage", id)
		}
	}
}
</script>
