<template>
	<button type="button" @click.prevent="onDownload" title="Download" class="button is-small is-ghost">
		<i class="icon-move-down"></i>
	</button>
</template>

<script>
export default {
	name: "download",
	props: {
		id:		String,
		files:	Array,
		name:	String,
	},
	methods: {
		onDownload(){
			this.$store.dispatch('downloadSnippet', this.id)
		}
	}
}
</script>