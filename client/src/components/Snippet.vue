<template>
	<div id="create-snippet" class="is-relative">
		<form name="codeForm" method="post" class="snippet" @submit.prevent="handleSubmit">
			<div class="columns is-vcentered" v-if="$store.getters.getIntegrations.length">
				<div class="column is-9">
					<p class="has-text-right">Please select a source to save</p>
				</div>
				<div class="column">
					<div class="control">
						<div class="select is-fullwidth">
							<v-select v-model="snippet.provider" placeholder="Please select an option" label="name" :options="$store.getters.getIntegrations"></v-select>
						</div>
						<div class="error has-text-danger" v-if="!$v.snippet.provider.required">Field is required</div>
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
						<div class="field" @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDropFiles">
							<div class="file is-boxed is-fullwidth" >
								<label class="file-label">
									<input type="file" multiple="multiple" class="file-input" @change="handleChooseFiles"/>
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
					<editor v-for="file of snippet.files" :key="file.id" :source="file" />
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
import hash from "crypto-random-string"
import { required, minLength } from 'vuelidate/lib/validators'

import { modal } from "@/config/modal"
import { snippet } from "@/config/snippet"
import { file } from "@/config/file"
import { integration } from "@/config/integration"

export default {
	name: "snippet",
	props: {
		source: Object
	},
	data: () => {
		return {
			loading: false,
			dragClass: null,
			preloader: false,
			snippet: snippet.context.create
		}
	},
	validations: {
		snippet: {
			provider: {
				required
			}
		}
	},
	mounted(){
		if (this.source) {
			this.snippet = this.source
		}

		if(!this.$store.getters.getFiles.length && !this.source) {
			this.snippet.id = hash({length: 16, type: "url-safe"})
			this.addFile()
		}

		console.log(this.$store.getters.getIntegrations)
	},
	methods: {
		async handleFiles(files){
			try {
				this.loading = true
				const data = await Promise.all(files.map(async file => {
					return {
						id: hash({length: 16, type: "url-safe"}),
						snippet: this.snippet.id,
						name: file.name,
						mode: file.type,
						code: await file.text()
					}
				}))
				this.$store.dispatch("addFiles", data).then(() => this.loading = false)
			} catch (error) {
				throw error
			}
		},
		handleChooseFiles(event){
			this.handleFiles([...event.target.files])
		},
		handleDropFiles(event){
			this.handleFiles([...event.dataTransfer.files])
			this.dragClass = null
		},
		handleDragOver(){
			this.dragClass = "has-background-warning"
		},
		handleDragLeave(){
			this.dragClass = null
		},
		handleSubmit(){
			if (!this.$store.getters.getAuthStatus) {
				return this.$root.$emit("openModal", modal.context.auth)
			}
			if (this.$v.$invalid) return
			const [ first ] = this.$store.getters.getFiles
			this.snippet.example = first && first.code.split('\n').splice(0, 10).join('\n') || null
			this.snippet.files = this.$store.getters.getFiles.length

			if (this.source) {
				this.$store.dispatch("updateSnippet", this.snippet)
				this.$store.dispatch("updateStorageFiles", {
					files: this.$store.getters.getFiles,
					snippet: this.snippet
				}).then(() => this.$store.dispatch("resetFiles"))
				this.$router.push("/")
			} else {
				this.snippet.created = new Date().toISOString()
				this.$store.dispatch("addStorageFiles", this.$store.getters.getFiles.map((file, index) => {
					return {
						...file,
						name: file.name || `Filename-${index + 1}`
					}
				})).then(() => this.$store.dispatch("resetFiles"))
				this.$store.dispatch("addSnippet", this.snippet)
				this.$store.dispatch("setSnippetOpen", false)
			}
		},
		addFile() {
			this.$store.dispatch("addFile", {
				...file.context.add,
				id: hash({length: 16, type: "url-safe"}),
				snippet: this.snippet.id,
			})
		},
	},
}
</script>