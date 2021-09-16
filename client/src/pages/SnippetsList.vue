<template>
<div class="container">
	<div class="snippets-list">
		<h1>Snippets</h1>

		<div v-if="loading" class="loading">
			<span class="icon-spinner text-center"></span>
		</div>
		<div v-else class="snippet" v-for="({ id, title, status, files, parent }) in snippets" :key="id">
			<div class="top-panel">
				<div class="head">
					<router-link class="title is-6" :to="`/snippets/${id}`">{{ title }}</router-link>
					<span class="status">
						<span class="allowed" v-if="status">Public</span>
						<span class="disallowed" v-else>Private</span>
					</span>
				</div>
				<div class="actions">
					<span class="control">
						<button class="button is-small is-ghost" title="Remove" @click="onRemove(id, title)">
							<i class="icon-remove"></i>
						</button>
					</span>
					<span class="control">
						<download :id="id" />
					</span>
					<span class="control">
						<router-link class="button is-small is-ghost" title="Edit" :to="`/snippets/${id}`">
							<i class="icon-code"></i>
						</router-link>
					</span>
				</div>
			</div>
			<div class="info-panel">
				<span class="item">
					<i class="icon-profile"></i>
					<span class="user">{{ getParentProps(parent).username }}</span>
				</span>
				<!-- <span class="item"><timer :datetime="created" /></span> -->
				<span class="item">Saved on {{ getParentProps(parent).name }}</span>
			</div>
			<div class="files" v-if="files">
				<div class="content" v-for="data in files" :key="data.filename">
					<preview :source="data" />
				</div>
			</div>
		</div>
	</div>
	<div class="mgt-medium has-text-centered">
		<a v-scroll-to="'#create-snippet'" class="button is-medium" @click.prevent="onAdd">+ Add Snippet</a>
	</div>
	<div v-if="isVisibleSnippet">
		<snippet/>
	</div>
</div>
</template>

<script>
import config 		from "@/config/snippet"

import Snippet 		from "@/components/Snippet.vue"
import Timer 		from "@/components/libs/Timer.vue"
import Download 	from "@/components/libs/Download.vue"
import Preview 		from "@/components/files/Preview.vue"

export default {
	name: "snippets",
	data() {
		return {
			snippets: 			[],
			loading: 			true,
			isVisibleSnippet: 	false
		}
	},
	mounted(){
		this.$nextTick(() => {
			this.loading = true
			setTimeout(() => {
				this.snippets = this.$store.getters.getSnippets
				this.loading = false
			})
		})
		
		if (!this.$store.getters.getSnippets.length) {
			this.isVisibleSnippet = true
		}
	},
	methods: {
		getParentProps(parent){
			const { username, name } = this.$store.getters.getIntegrationById(parent)

			return { username, name }
		},
		onAdd(){
			this.isVisibleSnippet = !this.isVisibleSnippet
		},
		onRemove(id, title){
			this.$root.$emit("openModal", config.context('modal.remove'), () => {
				this.$store.dispatch("removeSnippet", id)

				const message = `The snippet ${ title ? `with the name "${title}"` : '' } was deleted.`
				this.$root.$emit("appendMessage", { message })
			})
		}
	},
	components: {
		Snippet,
		Timer,
		Download,
		Preview
	}
};
</script>