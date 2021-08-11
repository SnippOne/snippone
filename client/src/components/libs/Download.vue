<template>
	<button type="button" @click.prevent="handleDownload" class="button download">Download</button>
</template>

<script>
import jsZip from "jszip"
import fileSaver from "file-saver"

export default {
	name: "download",
	props: {
		files: Array,
		name: String,
	},
	methods: {
		handleDownload(){
			const zip = jsZip()

			this.files.forEach(({ name, code }) => {
				zip.file(name, code)
			})

			zip.generateAsync({ type: "blob" })
				.then((content) => {
					const filename = this.name && this.name.trim().toLowerCase().replace(/\s+/g, "-") || "snippet"
					fileSaver.saveAs(content, `${filename}.zip`)
				})
				.catch(error => {
					throw new error
				})
		}
	}

}
</script>