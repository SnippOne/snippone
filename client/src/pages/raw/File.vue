<template>
	<codemirror v-if="content" :value="content" :options="{readOnly: 'nocursor'}"/>
	<span class="no-content" v-else>File not found.</span>
</template>

<script>
import { codemirror } from "vue-codemirror"

export default {
	name: "raw-page",
	data(){
		return {
			content: null
		}
	},
	mounted(){
		const { code } = this.$store.getters.getFiles.find(file => {
        	 return file.id === this.$route.params.id
		})

		if (code) {
			this.content = code
		}
	},
	components: {
		codemirror
	}
}
</script>