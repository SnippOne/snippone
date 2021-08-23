<template>
	<div id="create-snippet" class="is-relative">
		<form name="codeForm" method="post" class="snippet" @submit.prevent="onSubmit">
			<div class="columns is-vcentered" v-if="$store.getters.getIntegrations.length">
				<div class="column is-9">
					<p class="has-text-right">Please select a source to save</p>
				</div>
				<div class="column">
					<div class="control">
						<div class="select is-fullwidth">
							<v-select v-model="snippet.parent" :reduce="snippet => snippet.id" placeholder="Please select an option" label="name" :options="$store.getters.getIntegrations"></v-select>
						</div>
						<div class="error has-text-danger" v-if="!$v.snippet.parent.required">Field is required</div>
					</div>
				</div>
			</div>

			<div class="columns" v-else-if="$store.getters.getAuthStatus">
				<div class="column">
					<p class="has-text-right has-text-link">
						To save data please add integration service in <router-link class="button is-link is-outlined" to="/integrations">Your Integrations</router-link>
					</p>
				</div>
			</div>

			<div class="columns">
				<div class="column is-1">
					<p class="has-text-right">Title</p>
				</div>
				<div class="column">
					<div class="field">
						<div class="control">
							<input v-model="snippet.title" name="title" type="text" class="input" placeholder="Please enter name of the snippet" />
						</div>
					</div>
				</div>
			</div>

			<div class="columns">
				<div class="column is-offset-1">
					<div class="drag-snippet" :class="dragClass" @dragover.prevent @drop.prevent>
						<div class="field" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDropFiles">
							<div class="file is-boxed is-fullwidth" >
								<label class="file-label">
									<input type="file" multiple="multiple" class="file-input" @change="onChooseFiles"/>
									<span class="has-text-centered">
										<span class="file-label file-selection">Drag and Drop or Choose Files</span>
									</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="columns">
				<div class="column loading">
					<editor v-for="file of $store.getters.getFiles" :key="file && file.filename" :source="file" />
				</div>
			</div>

			<div class="columns">
				<div class="column is-offset-1">
					<div class="level">
						<div class="level-left">
							<div class="level-item">
								<a class="button" @click.prevent="addFile">
									<span>+ Add File</span>
								</a>
							</div>
						</div>
						<div class="level-right">
							<div class="level-item">
								<div class="control">
									<label class="checkbox">
										<input v-model="snippet.status" type="checkbox"> Public
									</label>
								</div>
							</div>
							<div class="level-item">
								<div class="control ml-1">
									<button class="button is-link" type="submit" name="save">Save</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
		<bounce-loader color="#3273dc" :loading="loading" />
	</div>
</template>

<script>
// Core
import hash from "crypto-random-string"
import { required, minLength } from 'vuelidate/lib/validators'

// Config
import modalConfig		from "@/config/modal"
import snippetConfig	from "@/config/snippet"
import fileConfig		from "@/config/file"


export default {
	name: "snippet",
	data: () => {
		return {
			messages: 	[],
			loading: 	false,
			dragClass: 	null,
			preloader: 	false,
			snippet: 	snippetConfig.context('create')
		}
	},
	validations: {
		snippet: {
			parent: {
				required
			}
		}
	},
	created(){
		const snippet = this.$store.getters.getSnippetById(this.$route.params.id)

		if (snippet) {
			this.snippet = snippet
			this.$store.dispatch("setFiles", snippet.files)
		} else {
			this.snippet.id = hash({length: 16, type: "url-safe"})
			this.addFile()
		}

		this.$store.subscribe(({ type, payload }) => {
			if (type === 'addSnippet' && payload.id === this.$route.params.id) {
				const snippet = this.$store.getters.getSnippetById(this.$route.params.id)
				this.snippet = snippet
				this.$store.dispatch("setFiles", snippet.files)
			}
		})
	},
	methods: {
		onChooseFiles(event){
			this.addFiles([...event.target.files])
		},
		onDropFiles(event){
			this.addFiles([...event.dataTransfer.files])
			this.dragClass = null
		},
		onDragOver(){
			this.dragClass = "has-background-warning"
		},
		onDragLeave(){
			this.dragClass = null
		},
		onSubmit(){
			if (!this.$store.getters.getAuthStatus) {
				return this.$root.$emit("openModal", modalConfig.context('auth'))
			}

			if (this.$v.$invalid) return

			if (this.snippet) {
				this.snippet.files = this.$store.getters.getFiles

				this.$store.dispatch("updateSnippet", this.snippet)

				this.$router.push("/")
			} else {

				this.$store.dispatch("addSnippet", this.snippet)
				this.$store.dispatch("setSnippetOpen", false)
			}
		},
		addFile() {
			this.$store.dispatch("addFile", fileConfig.context('add', { parent: this.snippet.id }))
		},
		async addFiles(files){
			try {
				this.loading = true
				const data = files.map(async file => {
					return fileConfig.context('add', {
						parent: 	this.snippet.id,
						name: 		file.name,
						mode: 		file.type,
						code: 		await file.text()
					})
				})

				this.$store.dispatch("addFiles", await Promise.all(data)).then(() => this.loading = false)
			} catch (error) {
				throw new Error(error)
			}
		},
	}
}
</script>