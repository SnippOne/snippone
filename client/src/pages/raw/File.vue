<template>
	<codemirror v-if="content" :value="content" :options="{ readOnly: 'nocursor' }" />
	<div v-else class="no-content">File not found.</div>
</template>

<script>
import { codemirror } from "vue-codemirror"

export default {
	name: "raw-page",
	computed: {
		content(){
			const { content } = this.$store.getters.getFileByName(this.$route.params.name)
			return content
		}
	},
	components: {
		codemirror
	}
}
</script>