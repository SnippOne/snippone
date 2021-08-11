<template>
  <div class="container">
    <h1>Your Snippets List</h1>
    <div class="snippets-list" v-if="$store.getters.getSnippets.length">
      <div class="snippet" v-for="({ id, title, preview, status, files, user, created, provider}) in $store.getters.getSnippets" :key="id">
        <div class="top-panel">
          <div class="head">
            <router-link class="title has-text-link" :to="`/snippets/${id}`">{{ title }}</router-link>
			<div>
				<span class="status">
					<span class="public" v-if="status">Public</span>
					<span class="private" v-else>Private</span>
				</span>
				<span class="files">including {{ files.length }} files</span>
			</div>
          </div>
          <div class="actions">
            <button class="button" @click.prevent="removeSnippet" :data-id="id">Remove</button>
            <download :files="$store.getters.getFiles" :name="title" />
            <router-link :to="`/snippets/${id}`" class="button">Link</router-link>
          </div>
        </div>
        <div class="info-panel">
          <span class="item user">{{ user }}</span>
          <span class="item">
			  <time-ago :datetime="created"/>
		  </span>
          <span class="item">Saved on {{ provider }}</span>
        </div>
        <div class="content" v-if="preview">
			<span class="preview-title">{{ preview.title }}</span>
			<router-link class="example preview" :to="`/snippets/${id}`">
				<codemirror :value="preview.content" :options="options"/>
			</router-link>
		</div>
      </div>
    </div>
    <div class="mgt-medium has-text-centered">
      <a v-scroll-to="'#create-snippet'" class="button is-medium" @click.prevent="addSnippetToggle">+ Add Snippet</a>
    </div>
	<div v-if="this.$store.getters.getSnippetOpen">
		<snippet/>
	</div>
  </div>
</template>

<script>
import { editor } from "@/config/editor"
import { integration } from "@/config/integration"

import { codemirror as Codemirror } from "vue-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/idea.css"

import Snippet from "@/components/Snippet.vue"
import TimeAgo from "@/components/libs/TimeAgo.vue"
import Download from "@/components/libs/Download.vue"

export default {
	name: "snippets",
	data() {
		return {
			isVisibleSnippet: false,
			options: editor.options.preview
		}
	},
	mounted(){
		if (!this.$store.getters.getSnippets.length) {
			this.$store.dispatch("setSnippetOpen", true)
		}
	},
	methods: {
		addSnippetToggle(){
			this.$store.dispatch("setSnippetOpen")
				.then(() => !this.$store.getters.getSnippetOpen && this.$store.dispatch("resetFiles"))
		},
		removeSnippet(event){
			const { id } = event.target.dataset
			this.$store.dispatch("removeSnippet", id)
			this.$store.dispatch("removeStorageFiles", { id })
		},
	},
	components: {
		Snippet,
		TimeAgo,
		Download,
		Codemirror
	}
};
</script>