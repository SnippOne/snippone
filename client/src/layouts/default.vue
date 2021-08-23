<template>
	<div class="content">
		<top-header/>
		<messages />
		<router-view/>
	</div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Messages from "@/components/messages/Messages.vue";

export default {
	components: {
		TopHeader,
		Messages
	}
}
</script>
