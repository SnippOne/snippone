<template>
	<span class="created-date" v-if="date">Created {{ date }}</span>
</template>

<script>
import { format } from 'timeago.js'

export default {
	name: "timer",
	props: {
		datetime: String,
		locale: String
	},
	data(){
		return {
			date: null
		}
	},
	mounted(){`	`
		this.date = format(this.datetime, this.locale || 'en_US')
	},
}
</script>