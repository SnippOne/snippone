<template>
	<div class="container">
		<span class="name">{{ name }}</span>
		<span v-show="mode" class="mode">{{ mode }}</span>

		<span v-if="isImage(content)" class="image">
			<span v-if="isSVG(content)" v-html="content"/>
			<img  v-else :src="content"/>
		</span>
		<span v-else-if="isBuffer(content)" class="image">
			<span v-if="isSVG(base64)" v-html="base64"/>
			<span v-else class="unavailable">Data not available for preview.</span>
		</span>
		<span v-else-if="isSVG(content)" v-html="content" class="image" />

		<codemirror ref="preview" v-else :value="content" :options="options" />

		<div class="actions field has-addons">
			<span class="control" v-if="isVisibleActions">
				<button class="button" @click="onVisible">
					<span>{{ visible ? 'Hide' : 'Show' }}</span>
				</button>
			</span>
			<span class="control">
				<button class="button" @click="onCopy">
					<span>Copy</span>
				</button>
			</span>
		</div>
	</div>
</template>

<script>
// Codemirror
import { codemirror as Codemirror } from "vue-codemirror";

// Codemirror Styles
import "codemirror/lib/codemirror.css";
import "codemirror/theme/idea.css";

// Image Types
import { isImage, isSVG, isBuffer } from "./image-types";

// Config
import editorConfig	from "@/config/editor"

export default {
	name: "preview",
	props: {
		source: {
			type: Object
		}
	},
	data() {
		return {
			visible: false,
			options: editorConfig.context('options.preview', { mode: this.source.type })
		}
	},
	created() {
		const mode = this.source.mode.toLowerCase()

		import(`codemirror/mode/${mode}/${mode}`)
			.then((data) => {
				this.$refs.preview.codemirror.setOption("mode", mode)
				console.log(data)
			})
			.catch((error) => console.log(error))
	},
	computed: {
		name() {
			return this.source.filename;
		},
		type() {
			return this.source.type;
		},
		mode() {
			return this.source.mode;
		},
		content() {
			return this.visible ? this.source.content : this.source.content.split("\n", 2).join("\n")
		},
		base64(){
			return Buffer.from(this.source.content, 'base64')
		},
		isVisibleActions(){
			return this.source.content.split("\n").length > 2
		}
	},
	methods: {
		async onCopy() {
			await this.$copyText(this.source.content)
		},
		onVisible() {
			this.visible = !this.visible
		},
		isImage,
		isSVG,
		isBuffer
	},
	components: {
		Codemirror
	}
};
</script>
