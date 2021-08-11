<template>
	<div class="create-file">
		<div class="editor">
			<div class="columns">
				<div class="column is-1">
					<p class="has-text-right">File</p>
				</div>
				<div class="column">
					<div class="editor-content">
						<div class="columns">
							<div class="column is-9">
								<div class="field">
									<label class="label" v-bind="{ for: `name-${editor.id}` }">Filename with extension</label>
									<div class="control">
										<input type="text" class="input filename" v-model="editor.filename" v-bind="{ id: `name-${editor.id}` }">
									</div>
								</div>
							</div>
							<div class="column is-3">
								<div class="field">
									<label class="label" v-bind="{ for: `mode-${editor.id}` }">Language</label>
									<div class="control">
										<div class="select">
											<v-select
												v-model="editor.mode"
												placeholder="Please select an option"
												label="name"
												:reduce="option => option.mime"
												:options="modes"
												:filter="handleFiltering"
												@input="handleChangeMode"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<codemirror ref="editor" v-model="editor.content" :value="editor.content" :options="options" />
							</div>
						</div>
						<div class="columns mgt-medium">
							<div class="column">
								<button class="button is-danger is-outlined" data-target="modal-confirm" @click.prevent="handleRemoveFile">
									<span>Remove</span>
								</button>
							</div>
							<div class="column is-2 has-text-right">
								<router-link :to="`/files/${editor.id}/raw`" class="button is-light">
									<span>View raw</span>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { modal } from "@/config/modal"
import { editor } from "@/config/editor"

import { CodeMirror, codemirror } from "vue-codemirror"
import "codemirror/mode/meta"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import "codemirror/mode/jsx/jsx"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/idea.css"

export default {
	name: "editor",
	props: {
		source: Object
	},
	data() {
		return {
			editor: null,
			modes: [],
			options: editor.options.edit,
		}
	},
	created() {
		if (this.source) {
			this.editor = this.source
		}
		CodeMirror.modeInfo.forEach(({ name, mime }) => {
			this.modes.push({ name,	mime })
		})
		this.$nextTick(() => this.$el.scrollIntoView())
	},
	updated() {
		this.$store.dispatch("updateFile", this.editor)
	},
	watch: {
		"editor.mode"(){
			this.updateMode()
		}
	},
	methods: {
		updateMode(){
			this.$refs.editor.codemirror.setOption("mode", this.editor.mode)
		},
		handleChangeMode(){
			this.updateMode()
		},
		handleFiltering(modes, query){
			return modes.filter(({ name }) => {
				const nameString = name.toLowerCase()
				const queryString = query.trim().toLowerCase()

				return nameString.indexOf(queryString) === 0
			})
		},
		handleRemoveFile(){
			this.$root.$emit("openModal", {
				...modal.context.remove,
				callback: () => {
					this.$store.dispatch("removeFile", this.editor.id)
				}
			})
		},
	},
	components: {
		codemirror
	}
}
</script>