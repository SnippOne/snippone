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
									<label class="label" v-bind="{ for: `${editor.filename}` }">Filename with extension</label>
									<div class="control">
										<input type="text" class="input filename" v-model="editor.filename" v-bind="{ id: `${editor.filename}` }">
									</div>
								</div>
							</div>
							<div class="column is-3">
								<div class="field">
									<label class="label" v-bind="{ for: `mode-${editor.mode}` }">Language</label>
									<div class="control">
										<div class="select is-fullwidth">
											<v-select
												v-model="editor.mode"
												:reduce="option => option.mime"
												:options="modes"
												:filter="filtering"
												@input="onUpdateMode"
												placeholder="Please select an option"
												label="name"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<codemirror ref="editor" v-model="editor.content" :options="options" />
							</div>
						</div>
						<div class="columns mgt-medium">
							<div class="column">
								<button class="button is-danger is-outlined" data-target="modal-confirm" @click.prevent="onRemoveFile">
									<span>Remove</span>
								</button>
							</div>
							<div class="column is-2 has-text-right">
								<router-link :to="`/files/${editor.filename}/raw`" class="button is-light">
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
// Codemirror
import { CodeMirror, codemirror } from "vue-codemirror"
// import "codemirror/mode/meta"
// import "codemirror/mode/javascript/javascript"
// import "codemirror/mode/css/css"
// import "codemirror/mode/jsx/jsx"

// Codemirror Styles
import "codemirror/lib/codemirror.css"
import "codemirror/theme/idea.css"

// Config
import fileConfig	from "@/config/file"
import editorConfig	from "@/config/editor"

export default {
	name: "editor",
	props: {
		source: Object
	},
	data() {
		return {
			modes: [],
			editor: null,
			options: editorConfig.context('options.edit')
		}
	},
	async created() {
		if (this.source) {
			this.editor = this.source
			if (this.source.mode) {
				const mode = this.source.mode.toLowerCase()
				import(`codemirror/mode/${mode}/${mode}`)
					.then((data) => {
						this.$refs.editor.codemirror.setOption("mode", mode)
						console.log(data)
					})
					.catch((error) => console.log(error))
			}
		}
		CodeMirror.modeInfo.forEach(({ name, mime }) => {
			this.modes.push({ name,	mime })
		})
		// this.$nextTick(() => this.$el.scrollIntoView())
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
		filtering(modes, query){
			return modes.filter(({ name }) => {
				const nameString = name.toLowerCase()
				const queryString = query.trim().toLowerCase()

				return nameString.indexOf(queryString) === 0
			})
		},
		onUpdateMode(){
			this.updateMode()
		},
		onRemoveFile(){
			this.$root.$emit("openModal", fileConfig.context('modal.remove'), () => {
				this.$store.dispatch("removeFile", this.editor.id)
			})
		}
	},
	components: {
		codemirror
	}
}
</script>