<template>
	<button type="button" @click.prevent="onDownload" title="Download" class="button is-small is-ghost">
		<i class="icon-move-down"></i>
	</button>
</template>

<script>
import Zip 		from "jszip"
import saver	from "file-saver"

export default {
	name: "download",
	props: {
		files:	Array,
		name:	String,
	},
	methods: {
		onDownload(){
			const zip = Zip()

			this.files.forEach(({ filename, content }) => {
				zip.file(filename, content)
			})

			zip.generateAsync({ type: "blob" })
				.then(content => {
					const filename = this.name && this.name.trim().toLowerCase().replace(/\s+/g, "-")
					saver.saveAs(content, `${filename}.zip`)
				})
				.catch(error => {
					throw new Error(error)
				})
		}
	}
}
</script>